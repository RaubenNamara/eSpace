<template>
  <div
    class="annotation-canvas"
    :style="{ maxWidth: width + 'px', aspectRatio: `${width} / ${height}` }"
    @pointerenter="isHovered = true"
    @pointerleave="isHovered = false"
  >
    <canvas ref="baseCanvasRef" :width="width" :height="height" class="annotation-layer annotation-layer--base"></canvas>

    <canvas
      v-for="(_layer, i) in readonlyLayers"
      :key="`readonly-${i}`"
      :ref="(el) => setReadonlyEl(i, el)"
      :width="width"
      :height="height"
      class="annotation-layer"
      @click="onReadonlyClick(i, $event)"
    ></canvas>

    <canvas
      v-if="isEditable"
      ref="editCanvasRef"
      :width="width"
      :height="height"
      class="annotation-layer annotation-layer--interactive"
    ></canvas>
    <canvas v-else ref="readonlyEditCanvasRef" :width="width" :height="height" class="annotation-layer"></canvas>

    <input ref="imageFileInputRef" type="file" accept="image/*" class="annotation-canvas__hidden-input" @change="onImageFileSelected">

    <CommentPopup
      v-if="activePopup"
      :mode="activePopup.mode"
      :x="activePopup.screenX"
      :y="activePopup.screenY"
      :initial-text="activePopup.text"
      :placeholder="tool === 'comment' ? 'Enter comment...' : 'Type your text...'"
      @save="onPopupSave"
      @close="activePopup = null"
    />

    <ScoreBoxDialog
      v-if="activeScoreDialog"
      :x="activeScoreDialog.screenX"
      :y="activeScoreDialog.screenY"
      @save="onScoreSave"
      @close="activeScoreDialog = null"
    />

    <EquationDialog
      v-if="activeEquationDialog"
      :initial-source="activeEquationDialog.initialSource"
      @insert="onEquationInsert"
      @close="activeEquationDialog = null"
    />

    <SignaturePad
      v-if="activeSignatureDialog"
      @insert="onSignatureInsert"
      @close="activeSignatureDialog = null"
    />

    <TextFormatToolbar
      v-if="textStyleSnapshot"
      :style-snapshot="textStyleSnapshot"
      @toggle="toggleTextFormat"
      @set-font-family="(v: string) => applyTextFormat({ fontFamily: v })"
      @set-font-size="(v: number) => applyTextFormat({ fontSize: v })"
      @set-color="(v: string) => applyTextFormat({ fill: v })"
      @set-align="setTextAlign"
      @set-line-height="setLineHeight"
      @set-width="setTextWidth"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, computed, watch, onMounted, onBeforeUnmount, nextTick, type ComponentPublicInstance } from 'vue'
import { Canvas, StaticCanvas, Point, Textbox } from 'fabric'
import type { FabricObject } from 'fabric'
import type { AnnotationLayerJSON, AnnotationLayerMode, AnnotationTool } from '@/types'
import { EMPTY_ANNOTATION_LAYER, EMPTY_ANNOTATION_LAYERS } from '@/types'
import CommentPopup from './CommentPopup.vue'
import ScoreBoxDialog from './ScoreBoxDialog.vue'
import EquationDialog from './EquationDialog.vue'
import SignaturePad from './SignaturePad.vue'
import TextFormatToolbar, { type TextStyleSnapshot } from './TextFormatToolbar.vue'
import { useAnnotationHistory } from '@/composables/useAnnotationHistory'
import {
  createInteractiveCanvas,
  createStaticCanvas,
  serializeLayer,
  loadLayer,
  createShapeObject,
  createTextObject,
  createMarkObject,
  createCommentMarker,
  createImageObject,
  createScoreBoxObject,
  configureFreeDrawingBrush,
  DEFAULT_TEXT_FONT_SIZE,
  DEFAULT_TEXT_BOX_WIDTH
} from '@/composables/useAnnotationCanvas'
import { ANNOTATION_CUSTOM_PROPS } from '@/types'

interface Props {
  background?: string | null
  width: number
  height: number
  readonlyLayers?: AnnotationLayerJSON[]
  editableLayer?: AnnotationLayerJSON
  mode?: AnnotationLayerMode
  tool?: AnnotationTool
  color?: string
  strokeWidth?: number
  readonly?: boolean
  // When true and no background image is set, leave the base layer transparent instead of
  // filling white - used when this canvas is stacked as a pure annotation overlay on top of
  // another element (e.g. a PDF page canvas) that already provides the page background itself.
  transparent?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  background: null,
  readonlyLayers: () => EMPTY_ANNOTATION_LAYERS,
  editableLayer: () => EMPTY_ANNOTATION_LAYER,
  mode: 'readonly',
  tool: 'select',
  color: '#000000',
  strokeWidth: 3,
  readonly: false,
  transparent: false
})

const emit = defineEmits<{
  (e: 'update:editableLayer', layer: AnnotationLayerJSON): void
  (e: 'comment-click', comment: { text: string }): void
}>()

const baseCanvasRef = ref<HTMLCanvasElement | null>(null)
const editCanvasRef = ref<HTMLCanvasElement | null>(null)
const readonlyEditCanvasRef = ref<HTMLCanvasElement | null>(null)
const imageFileInputRef = ref<HTMLInputElement | null>(null)
const backgroundImage = ref<HTMLImageElement | null>(null)

const readonlyEls: (HTMLCanvasElement | null)[] = []
const staticCanvases: StaticCanvas[] = []
let interactiveCanvas: Canvas | null = null
let readonlyEditStaticCanvas: StaticCanvas | null = null

const isEditable = computed(() => !props.readonly && props.mode !== 'readonly')
const customProps = ANNOTATION_CUSTOM_PROPS as string[]

const history = useAnnotationHistory(customProps)

function setReadonlyEl(i: number, el: Element | ComponentPublicInstance | null) {
  readonlyEls[i] = (el as HTMLCanvasElement) || null
}

// --- Selection state (for the "Clear Selected" toolbar button) ---
const selectedCount = ref(0)

function emitCurrentLayer() {
  if (!interactiveCanvas) return
  const serialized = serializeLayer(interactiveCanvas, props.width, props.height)
  emit('update:editableLayer', serialized)
}

// Fabric fires object:added/removed/modified SYNCHRONOUSLY from inside its own internal
// sequences (e.g. PencilBrush._finalizeAndAddPath does canvas.add(path) - which fires
// object:added and runs this handler - BEFORE Fabric's own canvas.requestRenderAll()/
// path.setCoords()/'path:created' calls that immediately follow it). If anything in here throws
// (serialization, the Vue emit triggering a parent re-render that touches this canvas, etc.),
// the exception propagates straight up through Fabric's internal call stack and aborts whatever
// Fabric was doing next - which for a freshly-drawn stroke means the render call that would
// actually paint it never runs: the live drag preview (already cleared by then) is gone and the
// finished stroke never gets baked onto the visible canvas. Deferring to a microtask moves this
// entirely outside Fabric's synchronous sequence, and the try/catch is a second line of defense
// in case anything here still throws even once deferred.
function onHistoryEvent() {
  if (!interactiveCanvas) return
  const canvas = interactiveCanvas
  queueMicrotask(() => {
    try {
      history.push(canvas)
      if (canvas === interactiveCanvas) emitCurrentLayer()
    } catch (err) {
      console.error('[AnnotationCanvas] onHistoryEvent failed:', err)
    }
  })
}

// --- Drawing background image (plain 2D, same technique as before - kept independent of the
// Fabric layers so we never have to route background images through Fabric's own API) ---
function redrawBase() {
  const canvas = baseCanvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if (backgroundImage.value) {
    ctx.drawImage(backgroundImage.value, 0, 0, canvas.width, canvas.height)
  } else if (!props.transparent) {
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
}

function loadBackground() {
  if (!props.background) {
    backgroundImage.value = null
    redrawBase()
    return
  }
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.onload = () => {
    backgroundImage.value = img
    redrawBase()
  }
  img.onerror = () => {
    backgroundImage.value = null
    redrawBase()
  }
  img.src = props.background
}

// --- Readonly layers (fabric.StaticCanvas - no interaction/event overhead, and objects on them
// are structurally unreachable by the eraser or any editing tool on the interactive layer) ---
// Guarded against overlapping invocations with a call token: if some caller passes a fresh
// array/object reference on every render (React/Vue-reactivity churn upstream), two calls can
// otherwise race on the same DOM element - the second tries to construct a Fabric StaticCanvas
// on an element the first hasn't finished disposing yet, which throws "canvas already
// initialized" and, left uncaught, can abort the rest of the caller's async setup sequence.
let readonlyRenderToken = 0

async function renderReadonlyLayers() {
  const myToken = ++readonlyRenderToken
  staticCanvases.forEach(c => c.dispose())
  staticCanvases.length = 0
  await nextTick()
  if (myToken !== readonlyRenderToken) return // superseded by a newer call - abort quietly
  for (let i = 0; i < props.readonlyLayers.length; i++) {
    if (myToken !== readonlyRenderToken) return
    const el = readonlyEls[i]
    if (!el) continue
    // Defensive: a stale instantiation this call didn't know about may not have released the
    // element yet (Fabric marks it via a `data-fabric` attribute on construction).
    if (el.hasAttribute('data-fabric')) el.removeAttribute('data-fabric')
    const canvas = createStaticCanvas(el, props.width, props.height)
    await loadLayer(canvas, props.readonlyLayers[i], props.width, props.height)
    if (myToken !== readonlyRenderToken) {
      canvas.dispose()
      return
    }
    staticCanvases.push(canvas)
  }
}

// --- The one editable layer, OR (when this whole instance is readonly) a static render of
// props.editableLayer composited alongside the readonly layers ---
async function initEditableOrReadonly(initialLayer?: AnnotationLayerJSON) {
  const layer = initialLayer ?? props.editableLayer
  if (isEditable.value) {
    const el = editCanvasRef.value
    if (!el) return
    interactiveCanvas = createInteractiveCanvas(el, props.width, props.height)
    wireInteractiveEvents(interactiveCanvas)
    await loadLayer(interactiveCanvas, layer, props.width, props.height)
    history.reset(interactiveCanvas)
  } else {
    const el = readonlyEditCanvasRef.value
    if (!el) return
    readonlyEditStaticCanvas = createStaticCanvas(el, props.width, props.height)
    await loadLayer(readonlyEditStaticCanvas, layer, props.width, props.height)
  }
}

// --- Tool-driven interaction ---
let dragStart: { x: number; y: number } | null = null
let previewObject: FabricObject | null = null
let pendingPopupPoint: { x: number; y: number } | null = null

const activePopup = ref<{ mode: 'view' | 'edit'; screenX: number; screenY: number; canvasPoint: { x: number; y: number }; text: string } | null>(null)
const activeScoreDialog = ref<{ screenX: number; screenY: number; canvasPoint: { x: number; y: number } } | null>(null)
const activeEquationDialog = ref<{ canvasPoint: { x: number; y: number }; initialSource?: string; editTarget?: FabricObject } | null>(null)
const activeSignatureDialog = ref<{ canvasPoint: { x: number; y: number } } | null>(null)
const isHovered = ref(false)
let clipboardObject: FabricObject | null = null

function applyToolMode(canvas: Canvas) {
  const t = props.tool
  const isFreehand = t === 'pen' || t === 'pencil' || t === 'highlighter'
  canvas.isDrawingMode = isFreehand
  canvas.selection = t === 'select'
  canvas.getObjects().forEach(o => {
    o.selectable = t === 'select'
    // Objects must stay evented (hit-testable) for the eraser too, or mouse:down's
    // `if (e.target) canvas.remove(e.target)` never has a target to remove - Fabric simply can't
    // detect what's under the cursor for a non-evented object, so nothing was ever erasable.
    o.evented = t === 'select' || t === 'eraser'
  })
  if (isFreehand) {
    configureFreeDrawingBrush(canvas, t, props.color, props.strokeWidth)
  }
  if (t !== 'select') {
    canvas.discardActiveObject()
    canvas.requestRenderAll()
  }
}

function wireInteractiveEvents(canvas: Canvas) {
  applyToolMode(canvas)

  canvas.on('path:created', (e: any) => {
    const path = e.path as FabricObject
    Object.assign(path, {
      annotationId: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      annotationType: props.tool,
      createdAt: new Date().toISOString()
    })
    canvas.requestRenderAll()
  })

  canvas.on('object:added', () => {
    canvas.requestRenderAll()
    onHistoryEvent()
  })
  canvas.on('object:removed', () => {
    canvas.requestRenderAll()
    onHistoryEvent()
  })
  canvas.on('object:modified', () => {
    canvas.requestRenderAll()
    onHistoryEvent()
  })
  canvas.on('selection:created', (e: any) => { selectedCount.value = e.selected?.length || 0; refreshActiveTextObject() })
  canvas.on('selection:updated', (e: any) => { selectedCount.value = e.selected?.length || 0; refreshActiveTextObject() })
  canvas.on('selection:cleared', () => { selectedCount.value = 0; activeTextObject.value = null })

  // Rich-text formatting toolbar visibility/state - kept in sync with whichever text annotation
  // is currently active/being edited, independent of the generic selection tracking above (which
  // only fires on canvas-level selection changes, not on cursor movement or in-progress typing).
  canvas.on('text:editing:entered', () => refreshActiveTextObject())
  canvas.on('text:editing:exited', () => refreshActiveTextObject())
  canvas.on('text:selection:changed', () => { textStyleVersion.value++ })
  // Typing itself never fires object:added/removed/modified (those only cover whole-object
  // add/remove/drag/resize/rotate gestures) - without also hooking text:changed here, a typed
  // answer was never actually reaching the undo stack or the debounced autosave unless the
  // student happened to click away from the box afterwards. Every keystroke queues through the
  // same onHistoryEvent() microtask used everywhere else, so the parent's own save-debounce still
  // collapses rapid typing into one network request.
  canvas.on('text:changed', () => {
    textStyleVersion.value++
    onHistoryEvent()
  })

  // Keep a text annotation's box within the visible page bounds while being dragged, "where
  // possible" (spec section 5) - only applied to text so it never changes how other tools behave.
  canvas.on('object:moving', (e: any) => {
    const obj = e.target
    if (!obj || obj.annotationType !== 'text') return
    const w = obj.getScaledWidth ? obj.getScaledWidth() : (obj.width ?? 0)
    const h = obj.getScaledHeight ? obj.getScaledHeight() : (obj.height ?? 0)
    obj.left = Math.min(Math.max(obj.left ?? 0, 0), Math.max(0, props.width - w))
    obj.top = Math.min(Math.max(obj.top ?? 0, 0), Math.max(0, props.height - h))
  })

  canvas.on('mouse:down', (e: any) => {
    const point = { x: e.scenePoint.x, y: e.scenePoint.y }
    const t = props.tool

    if (t === 'eraser') {
      if (e.target) canvas.remove(e.target)
      return
    }

    if (e.target) return // let Fabric's own select/edit interaction handle clicks on existing objects

    if (t === 'pan') {
      startPan(e.e as PointerEvent)
      return
    }

    if (t === 'tick' || t === 'cross') {
      const obj = createMarkObject(t, point, props.color)
      canvas.add(obj)
      canvas.setActiveObject(obj)
      return
    }

    if (t === 'text') {
      const obj = createTextObject(point, props.color, DEFAULT_TEXT_FONT_SIZE, textBoxWidth())
      canvas.add(obj)
      canvas.setActiveObject(obj)
      obj.enterEditing()
      obj.selectAll()
      return
    }

    if (t === 'comment') {
      pendingPopupPoint = point
      activePopup.value = {
        mode: 'edit',
        screenX: e.e.offsetX ?? point.x,
        screenY: e.e.offsetY ?? point.y,
        canvasPoint: point,
        text: ''
      }
      return
    }

    if (t === 'image') {
      pendingPopupPoint = point
      imageFileInputRef.value?.click()
      return
    }

    if (t === 'equation') {
      activeEquationDialog.value = { canvasPoint: point }
      return
    }

    if (t === 'signature') {
      activeSignatureDialog.value = { canvasPoint: point }
      return
    }

    if (t === 'score') {
      activeScoreDialog.value = {
        screenX: e.e.offsetX ?? point.x,
        screenY: e.e.offsetY ?? point.y,
        canvasPoint: point
      }
      return
    }

    if (t === 'line' || t === 'arrow' || t === 'rectangle' || t === 'circle' || t === 'triangle' || t === 'underline') {
      dragStart = point
      history.suspended.value = true
      previewObject = createShapeObject(t, point, point, props.color, props.strokeWidth)
      if (previewObject) canvas.add(previewObject)
      return
    }
  })

  canvas.on('mouse:move', (e: any) => {
    if (!dragStart || !previewObject) return
    const point = { x: e.scenePoint.x, y: e.scenePoint.y }
    canvas.remove(previewObject)
    previewObject = createShapeObject(props.tool, dragStart, point, props.color, props.strokeWidth)
    if (previewObject) canvas.add(previewObject)
    canvas.requestRenderAll()
  })

  canvas.on('mouse:up', () => {
    if (dragStart && previewObject) {
      history.suspended.value = false
      canvas.setActiveObject(previewObject)
      onHistoryEvent()
    }
    dragStart = null
    previewObject = null
  })

  // Double-click an existing equation object to re-open the dialog pre-filled with its source,
  // re-render, and replace it in place (Part 13's "editable later" requirement).
  canvas.on('mouse:dblclick', (e: any) => {
    const target = e.target as any
    if (target?.annotationType === 'equation' && target.equationSource) {
      activeEquationDialog.value = {
        canvasPoint: { x: target.left ?? 0, y: target.top ?? 0 },
        initialSource: target.equationSource,
        editTarget: target
      }
    }
  })
}

// --- Rich-text formatting (Textbox annotations only) -----------------------------------------
// The formatting toolbar is a plain HTML overlay, not part of the Fabric canvas, so clicking its
// buttons never fires Fabric's own mouse:down/selection handlers - it drives the active text
// object directly through Fabric's IText selection-style API instead.
// shallowRef, not ref: a plain ref() would deep-wrap the Fabric object itself in a reactive
// Proxy. Fabric's own canvas holds the RAW (un-proxied) object in its internal objects array and
// keys some internal state off that raw reference's identity - mutating the Vue-proxied copy via
// obj.set(...)/setSelectionStyles(...) would silently diverge from what the canvas actually
// tracks/renders, making every formatting button appear to do nothing. Every other Fabric
// reference in this file (interactiveCanvas, previewObject, clipboardObject, etc.) is a plain
// non-reactive variable for the same reason - this one needs to be reactive (the template reads
// it) but must stay shallow.
const activeTextObject = shallowRef<InstanceType<typeof Textbox> | null>(null)
// Bumped on every style-relevant change (selection move, typing) so textStyleSnapshot recomputes
// even when the identity of activeTextObject itself hasn't changed.
const textStyleVersion = ref(0)

function refreshActiveTextObject() {
  const obj = interactiveCanvas?.getActiveObject() as any
  activeTextObject.value = obj && obj.annotationType === 'text' ? obj : null
  textStyleVersion.value++
}

// Fabric stores rich-text overrides per character range; reading "the current style" means
// reading the style at the cursor (or the start of the current selection), falling back to the
// object's own top-level property for any character position with no per-character override.
function getCursorCharStyle(obj: any): Record<string, any> {
  try {
    const idx = obj.isEditing ? (obj.selectionStart ?? 0) : 0
    const len = obj.text?.length ?? 0
    if (len === 0) return {}
    const probeStart = Math.min(idx, Math.max(0, len - 1))
    const styles = obj.getSelectionStyles ? obj.getSelectionStyles(probeStart, probeStart + 1, true) : []
    return styles?.[0] || {}
  } catch {
    return {}
  }
}

const textStyleSnapshot = computed<TextStyleSnapshot | null>(() => {
  void textStyleVersion.value
  const obj = activeTextObject.value as any
  if (!obj) return null
  const charStyle = getCursorCharStyle(obj)
  return {
    bold: (charStyle.fontWeight ?? obj.fontWeight) === 'bold',
    italic: (charStyle.fontStyle ?? obj.fontStyle) === 'italic',
    underline: !!(charStyle.underline ?? obj.underline),
    fontFamily: charStyle.fontFamily ?? obj.fontFamily ?? 'Arial, Helvetica, sans-serif',
    fontSize: Math.round(charStyle.fontSize ?? obj.fontSize ?? DEFAULT_TEXT_FONT_SIZE),
    color: charStyle.fill ?? obj.fill ?? '#000000',
    align: obj.textAlign ?? 'left',
    lineHeight: obj.lineHeight ?? 1.3,
    width: Math.round(obj.width ?? DEFAULT_TEXT_BOX_WIDTH)
  }
})

// Applies to the current text selection (a real, non-empty highlighted range while editing) if
// one exists, otherwise to the whole object - matches section 4's "apply to selected text, or the
// whole object if the whole object is selected" rule. Re-focuses the hidden textarea Fabric uses
// to capture keystrokes afterwards, since clicking an HTML toolbar button steals DOM focus away
// from it (Fabric keeps the object "in editing" regardless, but the user couldn't otherwise keep
// typing without clicking back into the text box first).
function applyTextFormat(patch: Record<string, any>, wholeObjectOnly = false) {
  const obj = activeTextObject.value as any
  if (!obj || !interactiveCanvas) return
  const start = obj.selectionStart ?? 0
  const end = obj.selectionEnd ?? 0
  const hasRealSelection = obj.isEditing && end > start
  if (hasRealSelection && !wholeObjectOnly) {
    obj.setSelectionStyles(patch, start, end)
  } else {
    obj.set(patch)
  }
  obj.dirty = true
  interactiveCanvas.requestRenderAll()
  textStyleVersion.value++
  onHistoryEvent()
  if (obj.isEditing) obj.hiddenTextarea?.focus()
}

function toggleTextFormat(key: 'bold' | 'italic' | 'underline') {
  const snap = textStyleSnapshot.value
  if (!snap) return
  if (key === 'bold') applyTextFormat({ fontWeight: snap.bold ? 'normal' : 'bold' })
  else if (key === 'italic') applyTextFormat({ fontStyle: snap.italic ? 'normal' : 'italic' })
  else applyTextFormat({ underline: !snap.underline })
}

// Alignment/line-height/width are paragraph-level Fabric properties (not per-character), so these
// always apply to the whole text object even mid-selection.
function setTextAlign(align: string) {
  applyTextFormat({ textAlign: align }, true)
}
function setLineHeight(lineHeight: number) {
  applyTextFormat({ lineHeight }, true)
}
function setTextWidth(width: number) {
  const obj = activeTextObject.value as any
  if (!obj || !interactiveCanvas) return
  obj.set({ width: Math.max(60, width) })
  obj.initDimensions?.()
  obj.setCoords()
  interactiveCanvas.requestRenderAll()
  textStyleVersion.value++
  onHistoryEvent()
}

// A generously-sized typing area ("big enough" to actually write in), but capped to the page's
// own width minus margins so it can never overflow off either edge of the canvas.
function textBoxWidth(): number {
  return Math.min(420, Math.max(220, props.width - 80))
}

// --- "Click T -> a text box immediately appears, cursor immediately active" (spec section 3) ---
// Click-to-place (the mouse:down 'text' branch above) still works for adding a second/third box
// once already in Text mode - this only fires on the transition INTO the text tool itself.
let textCascadeStep = 0
function createTextAtDefault() {
  if (!interactiveCanvas) return
  const offset = (textCascadeStep % 6) * 24
  textCascadeStep++
  const obj = createTextObject({ x: 40 + offset, y: 60 + offset }, props.color, DEFAULT_TEXT_FONT_SIZE, textBoxWidth())
  interactiveCanvas.add(obj)
  interactiveCanvas.setActiveObject(obj)
  obj.enterEditing()
  obj.selectAll()
  interactiveCanvas.requestRenderAll()
}

// --- Pan tool: scrolls the nearest scrollable ancestor instead of drawing ---
let panScrollEl: HTMLElement | null = null
let panLast: { x: number; y: number } | null = null

function findScrollableAncestor(el: HTMLElement | null): HTMLElement | null {
  let node = el?.parentElement || null
  while (node) {
    if (node.scrollHeight > node.clientHeight || node.scrollWidth > node.clientWidth) return node
    node = node.parentElement
  }
  return null
}

function startPan(e: PointerEvent) {
  panScrollEl = panScrollEl || findScrollableAncestor(editCanvasRef.value)
  panLast = { x: e.clientX, y: e.clientY }
  window.addEventListener('pointermove', onPanMove)
  window.addEventListener('pointerup', stopPan, { once: true })
}

function onPanMove(e: PointerEvent) {
  if (!panLast || !panScrollEl) return
  panScrollEl.scrollLeft -= e.clientX - panLast.x
  panScrollEl.scrollTop -= e.clientY - panLast.y
  panLast = { x: e.clientX, y: e.clientY }
}

function stopPan() {
  panLast = null
  window.removeEventListener('pointermove', onPanMove)
}

// --- Comment / text popup save ---
function onPopupSave(text: string) {
  if (!activePopup.value || !text.trim() || !interactiveCanvas || !pendingPopupPoint) {
    activePopup.value = null
    return
  }
  const marker = createCommentMarker(pendingPopupPoint, text)
  interactiveCanvas.add(marker)
  interactiveCanvas.setActiveObject(marker)
  activePopup.value = null
  pendingPopupPoint = null
}

// --- Score box popup save ---
function onScoreSave(text: string) {
  if (!activeScoreDialog.value || !text.trim() || !interactiveCanvas) {
    activeScoreDialog.value = null
    return
  }
  const obj = createScoreBoxObject(activeScoreDialog.value.canvasPoint, text)
  interactiveCanvas.add(obj)
  interactiveCanvas.setActiveObject(obj)
  activeScoreDialog.value = null
}

// --- Equation dialog insert/update ---
async function onEquationInsert(payload: { dataUrl: string; source: string; width: number; height: number }) {
  if (!activeEquationDialog.value || !interactiveCanvas) {
    activeEquationDialog.value = null
    return
  }
  const { canvasPoint, editTarget } = activeEquationDialog.value
  if (editTarget) {
    interactiveCanvas.remove(editTarget as any)
  }
  const img = await createImageObject(payload.dataUrl, canvasPoint, props.width, props.height, 'equation', { equationSource: payload.source })
  interactiveCanvas.add(img)
  interactiveCanvas.setActiveObject(img)
  activeEquationDialog.value = null
}

// --- Signature pad insert ---
async function onSignatureInsert(payload: { dataUrl: string; width: number; height: number }) {
  if (!activeSignatureDialog.value || !interactiveCanvas) {
    activeSignatureDialog.value = null
    return
  }
  const img = await createImageObject(payload.dataUrl, activeSignatureDialog.value.canvasPoint, props.width, props.height, 'signature')
  interactiveCanvas.add(img)
  interactiveCanvas.setActiveObject(img)
  activeSignatureDialog.value = null
}

// --- Keyboard shortcuts: Delete/Backspace removes the selection, Ctrl+Z/Ctrl+Y (or
// Ctrl+Shift+Z) undo/redo, Ctrl+C/Ctrl+V clones the selection. Scoped to when the pointer is
// over THIS canvas (isHovered) so multiple mounted AnnotationCanvas instances on one page don't
// all react to the same keypress, and skipped while typing in a text object or any HTML input. ---
function onKeydown(e: KeyboardEvent) {
  if (!isHovered.value || !interactiveCanvas) return
  const target = e.target as HTMLElement | null
  if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return
  const activeObject = interactiveCanvas.getActiveObject() as any
  if (activeObject?.isEditing) return

  const ctrlKey = e.ctrlKey || e.metaKey

  if ((e.key === 'Delete' || e.key === 'Backspace') && activeObject) {
    e.preventDefault()
    clearSelected()
    return
  }

  if (ctrlKey && e.key.toLowerCase() === 'z' && !e.shiftKey) {
    e.preventDefault()
    undo()
    return
  }

  if (ctrlKey && (e.key.toLowerCase() === 'y' || (e.key.toLowerCase() === 'z' && e.shiftKey))) {
    e.preventDefault()
    redo()
    return
  }

  if (ctrlKey && e.key.toLowerCase() === 'c' && activeObject) {
    e.preventDefault()
    clipboardObject = activeObject
    return
  }

  if (ctrlKey && e.key.toLowerCase() === 'v' && clipboardObject) {
    e.preventDefault()
    clipboardObject.clone(customProps).then((cloned) => {
      if (!interactiveCanvas) return
      cloned.set({ left: (cloned.left ?? 0) + 20, top: (cloned.top ?? 0) + 20 })
      Object.assign(cloned, {
        annotationId: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        createdAt: new Date().toISOString()
      })
      interactiveCanvas.add(cloned)
      interactiveCanvas.setActiveObject(cloned)
    })
  }
}

// --- Image tool file handling ---
async function onImageFileSelected(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file || !interactiveCanvas || !pendingPopupPoint) return
  const reader = new FileReader()
  reader.onload = async () => {
    const dataUrl = reader.result as string
    const img = await createImageObject(dataUrl, pendingPopupPoint!, props.width, props.height)
    interactiveCanvas!.add(img)
    interactiveCanvas!.setActiveObject(img)
    pendingPopupPoint = null
  }
  reader.readAsDataURL(file)
}

// --- Readonly-layer comment markers: click to view (StaticCanvas has no interaction of its own,
// so this is a plain DOM click handler that hit-tests objects manually) ---
function onReadonlyClick(i: number, e: MouseEvent) {
  const canvas = staticCanvases[i]
  const el = readonlyEls[i]
  if (!canvas || !el) return
  const rect = el.getBoundingClientRect()
  const x = (e.clientX - rect.left) * (el.width / rect.width)
  const y = (e.clientY - rect.top) * (el.height / rect.height)
  const point = new Point(x, y)
  const objects = canvas.getObjects()
  for (let j = objects.length - 1; j >= 0; j--) {
    const obj = objects[j] as any
    if (obj.annotationType === 'comment' && obj.containsPoint(point)) {
      activePopup.value = {
        mode: 'view',
        screenX: e.clientX - rect.left,
        screenY: e.clientY - rect.top,
        canvasPoint: { x, y },
        text: obj.commentText || ''
      }
      emit('comment-click', { text: obj.commentText || '' })
      return
    }
  }
}

// --- Toolbar-exposed actions ---
async function undo() {
  if (!interactiveCanvas) return
  await history.undo(interactiveCanvas)
  emitCurrentLayer()
}
async function redo() {
  if (!interactiveCanvas) return
  await history.redo(interactiveCanvas)
  emitCurrentLayer()
}
function clearAll() {
  if (!interactiveCanvas) return
  interactiveCanvas.remove(...interactiveCanvas.getObjects())
}
function clearSelected() {
  if (!interactiveCanvas) return
  const active = interactiveCanvas.getActiveObjects()
  if (!active.length) return
  interactiveCanvas.discardActiveObject()
  interactiveCanvas.remove(...active)
}

defineExpose({ undo, redo, clearAll, clearSelected })

// --- Reactive wiring ---
watch(() => props.tool, () => {
  if (interactiveCanvas) applyToolMode(interactiveCanvas)
})

watch(() => props.tool, (newTool, oldTool) => {
  if (newTool === 'text' && oldTool !== 'text') {
    createTextAtDefault()
  }
})

watch(() => [props.color, props.strokeWidth], () => {
  if (interactiveCanvas && interactiveCanvas.isDrawingMode) {
    configureFreeDrawingBrush(interactiveCanvas, props.tool, props.color, props.strokeWidth)
  }
})

watch(() => props.background, loadBackground)

// Don't watch readonlyLayers at all - let the parent control when to reload
// This prevents the canvas from being reloaded when the parent re-renders with the same data

// Do NOT watch editableLayer - this prevents the canvas from being reloaded when the parent
// updates the prop with changes that originated from this canvas itself. The canvas should
// only load the initial layer on mount and then manage its own state internally.

watch(() => [props.width, props.height], async () => {
  redrawBase()
  if (interactiveCanvas) {
    interactiveCanvas.setDimensions({ width: props.width, height: props.height })
    await loadLayer(interactiveCanvas, props.editableLayer, props.width, props.height)
    history.reset(interactiveCanvas)
  }
  if (readonlyEditStaticCanvas) {
    readonlyEditStaticCanvas.setDimensions({ width: props.width, height: props.height })
    await loadLayer(readonlyEditStaticCanvas, props.editableLayer, props.width, props.height)
  }
  try {
    await renderReadonlyLayers()
  } catch (err) {
    console.error('Failed to render readonly annotation layers:', err)
  }
})

// If the attempt gets locked mid-edit (e.g. a 403 from the teacher already having reopened
// marking), `readonly` flips reactively without necessarily remounting this component - tear
// down the interactive canvas and rebuild as a readonly static render of its last-known content.
watch(isEditable, async () => {
  const lastLayer = interactiveCanvas ? serializeLayer(interactiveCanvas, props.width, props.height) : props.editableLayer
  interactiveCanvas?.dispose()
  interactiveCanvas = null
  readonlyEditStaticCanvas?.dispose()
  readonlyEditStaticCanvas = null
  await nextTick()
  await initEditableOrReadonly(lastLayer)
})

onMounted(async () => {
  loadBackground()
  await nextTick()
  // Readonly layers are supplementary (teacher-authoring/student-answer context shown during
  // marking); a failure rendering them must never prevent the interactive canvas below from
  // being set up - that's the one actually being drawn/written on, and an uncaught rejection
  // here would otherwise abort the rest of this function before initEditableOrReadonly() runs.
  try {
    await renderReadonlyLayers()
  } catch (err) {
    console.error('Failed to render readonly annotation layers:', err)
  }
  await initEditableOrReadonly()
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  interactiveCanvas?.dispose()
  readonlyEditStaticCanvas?.dispose()
  staticCanvases.forEach(c => c.dispose())
  window.removeEventListener('pointermove', onPanMove)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
.annotation-canvas {
  position: relative;
  width: 100%;
}

.annotation-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.annotation-layer--interactive {
  cursor: crosshair;
  touch-action: none;
}

.annotation-canvas__hidden-input {
  display: none;
}
</style>
