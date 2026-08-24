import { Canvas, StaticCanvas, PencilBrush, Rect, Circle, Line, Triangle, Path, Textbox, Group, FabricImage } from 'fabric'
import type { FabricObject } from 'fabric'
import type { AnnotationCustomProps, AnnotationLayerJSON, AnnotationTool } from '@/types'
import { ANNOTATION_CUSTOM_PROPS } from '@/types'

/**
 * Fabric.js engine toolkit shared by AnnotationCanvas.vue. Kept framework-light (no Vue refs/DOM
 * ownership here - the component owns canvas elements via template refs) so the pieces that are
 * genuinely reusable/testable (canvas setup, coordinate normalization, object factories) live
 * here, while tool-driven event wiring (which needs direct access to template refs and reactive
 * props) stays in the component itself.
 */

export function createInteractiveCanvas(el: HTMLCanvasElement, width: number, height: number): Canvas {
  const canvas = new Canvas(el, {
    width,
    height,
    selection: true,
    preserveObjectStacking: true,
    // Fabric enables retina/HiDPI scaling by default, which multiplies the canvas's internal
    // pixel buffer by devicePixelRatio and scales the context to compensate. Combined with our
    // percentage-based CSS sizing (width/height:100%, scaling the element to fit its container
    // rather than a fixed pixel size), the two scaling systems fight each other and can leave
    // freshly-drawn/added objects rendered outside the visible area - looking like they vanish
    // the instant a stroke or object is committed. Disabled to keep pixel math simple and 1:1,
    // matching the plain-Canvas2D engine this replaced (which never did any DPR scaling either).
    enableRetinaScaling: false,
    renderOnAddRemove: true
  })
  canvas.freeDrawingBrush = new PencilBrush(canvas)
  // Fabric's interactive Canvas replaces `el` in the DOM with its own wrapper div containing the
  // lower canvas (baked/static objects) AND a second, dynamically-created upper canvas
  // (contextTop - used for the live free-drawing brush preview and for rendering the currently
  // active/selected object during interaction, for performance). Vue's scoped-CSS attribute
  // (data-v-xxxx) is only present on elements written in the component's template, so it never
  // reaches this dynamically-created upper canvas even though Fabric copies its className - the
  // net effect is the upper canvas renders at its native intrinsic pixel size instead of being
  // scaled to fill the container like the lower canvas, causing whatever's drawn on it (the live
  // stroke, or any freshly-created/selected object) to appear at the wrong position/size or
  // seem to "disappear" the moment Fabric bakes it back onto the correctly-sized lower canvas.
  // Fix: size and position both canvases with inline styles, which apply regardless of scoping.
  const layerStyle = 'position:absolute; top:0; left:0; width:100%; height:100%; display:block; touch-action:none; cursor:crosshair;'
  canvas.wrapperEl.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:100%;'
  canvas.lowerCanvasEl.style.cssText = layerStyle
  canvas.upperCanvasEl.style.cssText = layerStyle
  return canvas
}

export function createStaticCanvas(el: HTMLCanvasElement, width: number, height: number): StaticCanvas {
  const canvas = new StaticCanvas(el, { width, height, enableRetinaScaling: false })
  canvas.lowerCanvasEl.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:100%; display:block;'
  return canvas
}

// --- Normalization: only left/top/scaleX/scaleY need adjusting when a canvas is resized (e.g.
// PDF re-rendered at a different zoom scale) - every other Fabric property (width/height/radius/
// fontSize/strokeWidth/path commands/angle) is intrinsic to the object's own local coordinate
// space and is already scaled correctly by Fabric's transform model via scaleX/scaleY. Nested
// Group children are relative to their parent group's local space, not the canvas, so only
// top-level objects are touched - never recurse into a Group's own `.objects`.
export function normalizeLayer(json: AnnotationLayerJSON, width: number, height: number): AnnotationLayerJSON {
  if (!width || !height) return json
  return {
    ...json,
    objects: (json.objects || []).map(obj => ({
      ...obj,
      left: (obj.left ?? 0) / width,
      top: (obj.top ?? 0) / height,
      scaleX: (obj.scaleX ?? 1) / width,
      scaleY: (obj.scaleY ?? 1) / height
    }))
  }
}

export function denormalizeLayer(json: AnnotationLayerJSON, width: number, height: number): AnnotationLayerJSON {
  if (!json?.objects) return json
  return {
    ...json,
    objects: json.objects.map(obj => ({
      ...obj,
      left: (obj.left ?? 0) * width,
      top: (obj.top ?? 0) * height,
      scaleX: (obj.scaleX ?? 0) * width,
      scaleY: (obj.scaleY ?? 0) * height
    }))
  }
}

export function serializeLayer(canvas: Canvas | StaticCanvas, width: number, height: number): AnnotationLayerJSON {
  const raw = canvas.toObject(ANNOTATION_CUSTOM_PROPS as string[])
  return normalizeLayer(raw, width, height)
}

export async function loadLayer(canvas: Canvas | StaticCanvas, json: AnnotationLayerJSON | undefined, width: number, height: number): Promise<void> {
  const denormalized = json?.objects?.length ? denormalizeLayer(json, width, height) : { objects: [] }
  try {
    await canvas.loadFromJSON(denormalized)
  } catch (err) {
    // Malformed/corrupt saved JSON must not crash the whole canvas (Part 42 bug #11) - fall back
    // to a blank layer so the student/teacher can still work; the corrupt row is left untouched
    // in the DB (nothing here re-saves over it) rather than silently discarding real work.
    console.error('Failed to restore annotation layer, starting blank:', err)
    canvas.clear()
  } finally {
    // loadFromJSON internally toggles renderOnAddRemove off (to batch-add without a render per
    // object) and is meant to restore it once loading finishes - but if it throws partway
    // through (caught above), that restore never runs, leaving renderOnAddRemove stuck false for
    // the rest of the canvas's life. That means every future canvas.add() (including the object
    // Fabric's free-drawing brush creates when a stroke is released) silently stops triggering a
    // render: the live in-progress stroke still shows (drawn separately, straight into the
    // "upper" context while dragging) but the finalized object never gets painted onto the main
    // canvas - it looks like the drawing vanishes the instant the mouse is released. Force it
    // back on unconditionally as a safety net, whether or not the try block above failed.
    ;(canvas as any).renderOnAddRemove = true
  }
  canvas.requestRenderAll()
}

function genId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function tagObject(obj: FabricObject, tool: AnnotationTool, custom?: Partial<AnnotationCustomProps>) {
  Object.assign(obj, {
    annotationId: genId(),
    annotationType: tool,
    createdAt: new Date().toISOString(),
    ...custom
  })
}

export function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '')
  const bigint = parseInt(clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

// --- Object factories: pure creation, no canvas.add() side effects (callers add + select) ---

export function createShapeObject(
  tool: AnnotationTool,
  start: { x: number; y: number },
  end: { x: number; y: number },
  color: string,
  strokeWidth: number
): FabricObject | null {
  const common = { stroke: color, strokeWidth, fill: 'transparent', selectable: true }
  const left = Math.min(start.x, end.x)
  const top = Math.min(start.y, end.y)
  const w = Math.max(1, Math.abs(end.x - start.x))
  const h = Math.max(1, Math.abs(end.y - start.y))

  let obj: FabricObject | null = null
  if (tool === 'line' || tool === 'underline') {
    obj = new Line([start.x, start.y, end.x, end.y], { ...common })
  } else if (tool === 'arrow') {
    const angle = Math.atan2(end.y - start.y, end.x - start.x)
    const headLength = Math.max(12, strokeWidth * 4)
    const shaft = new Line([start.x, start.y, end.x, end.y], { stroke: color, strokeWidth })
    const head = new Triangle({
      left: end.x,
      top: end.y,
      originX: 'center',
      originY: 'center',
      width: headLength,
      height: headLength,
      fill: color,
      angle: (angle * 180) / Math.PI + 90
    })
    obj = new Group([shaft, head], { selectable: true })
  } else if (tool === 'rectangle') {
    obj = new Rect({ ...common, left, top, width: w, height: h })
  } else if (tool === 'circle') {
    const radius = Math.max(1, Math.hypot(end.x - start.x, end.y - start.y) / 2)
    obj = new Circle({ ...common, left: start.x - radius, top: start.y - radius, radius })
  } else if (tool === 'triangle') {
    obj = new Triangle({ ...common, left, top, width: w, height: h })
  }

  if (obj) tagObject(obj, tool)
  return obj
}

export function createTextObject(point: { x: number; y: number }, color: string, fontSize: number): Textbox {
  const obj = new Textbox('', {
    left: point.x,
    top: point.y,
    width: 200,
    fontSize,
    fill: color,
    editable: true
  })
  tagObject(obj, 'text')
  return obj
}

// Renders a student's typed answer as a read-only Fabric Textbox layer so it can sit underneath
// an interactive marking canvas - the only way a teacher can circle/underline/comment directly on
// typed text with the same pen tools used everywhere else, rather than just reading it as plain
// HTML with no annotation surface at all. Returns both the normalized layer (for persistence-shape
// consistency with every other layer in the system) and the pixel height the text actually needs,
// so the caller can size its canvas to fit the answer instead of guessing a fixed height.
export function createTypedAnswerLayer(text: string, width: number): { layer: AnnotationLayerJSON; height: number } {
  const padding = 24
  const textbox = new Textbox(text || '', {
    left: padding,
    top: padding,
    originX: 'left',
    originY: 'top',
    width: width - padding * 2,
    fontSize: 16,
    lineHeight: 1.4,
    fill: '#111827',
    selectable: false,
    evented: false,
    editable: false
  })
  const height = Math.max(200, Math.ceil(textbox.height) + padding * 2)

  // Fabric's per-object toObject() on a Textbox that was never attached to a canvas serializes
  // without the wrapped-line/style bookkeeping Textbox normally finalizes on first render, which
  // silently produces JSON loadFromJSON can't paint any visible text from. Route it through a
  // throwaway StaticCanvas instead - the exact same serialization path serializeLayer() (and every
  // other saved annotation in this app) already goes through, which is what actually renders.
  const tempEl = document.createElement('canvas')
  const tempCanvas = new StaticCanvas(tempEl, { width, height, renderOnAddRemove: false })
  tempCanvas.add(textbox)
  const raw = tempCanvas.toObject(ANNOTATION_CUSTOM_PROPS as string[]).objects[0]
  tempCanvas.dispose()

  return { layer: normalizeLayer({ objects: [raw] }, width, height), height }
}

export function createMarkObject(tool: 'tick' | 'cross', point: { x: number; y: number }, color: string): Path {
  const size = 24
  const path =
    tool === 'tick'
      ? `M ${-size * 0.5} 0 L ${-size * 0.15} ${size * 0.4} L ${size * 0.5} ${-size * 0.4}`
      : `M ${-size * 0.35} ${-size * 0.35} L ${size * 0.35} ${size * 0.35} M ${size * 0.35} ${-size * 0.35} L ${-size * 0.35} ${size * 0.35}`
  const obj = new Path(path, {
    left: point.x,
    top: point.y,
    originX: 'center',
    originY: 'center',
    stroke: tool === 'tick' ? '#16a34a' : '#dc2626',
    strokeWidth: 4,
    fill: '',
    strokeLineCap: 'round'
  })
  tagObject(obj, tool, { annotationType: tool })
  void color
  return obj
}

export function createCommentMarker(point: { x: number; y: number }, text: string): Group {
  const circle = new Circle({ radius: 10, fill: '#f59e0b', originX: 'center', originY: 'center' })
  const label = new Textbox('!', {
    fontSize: 12,
    fontWeight: 'bold',
    fill: '#ffffff',
    originX: 'center',
    originY: 'center',
    textAlign: 'center',
    width: 20,
    editable: false
  })
  const group = new Group([circle, label], { left: point.x, top: point.y, originX: 'center', originY: 'center' })
  tagObject(group, 'comment', { commentText: text })
  return group
}

export async function createImageObject(
  dataUrl: string,
  point: { x: number; y: number },
  canvasWidth: number,
  canvasHeight: number,
  tool: AnnotationTool = 'image',
  custom?: Partial<AnnotationCustomProps>
): Promise<FabricImage> {
  const img = await FabricImage.fromURL(dataUrl)
  const maxWidth = canvasWidth * 0.4
  const scale = img.width ? Math.min(1, maxWidth / img.width) : 1
  img.set({
    left: point.x - (img.width || 0) * scale * 0.5,
    top: point.y - (img.height || 0) * scale * 0.5,
    scaleX: scale,
    scaleY: scale
  })
  void canvasHeight
  tagObject(img, tool, custom)
  return img
}

export function createScoreBoxObject(point: { x: number; y: number }, text: string): Group {
  const label = new Textbox(text, {
    fontSize: 14,
    fontWeight: 'bold',
    fill: '#1d4ed8',
    textAlign: 'center',
    width: 60,
    editable: true
  })
  const box = new Rect({
    width: 70,
    height: 30,
    fill: '#eff6ff',
    stroke: '#1d4ed8',
    strokeWidth: 1.5,
    rx: 4,
    ry: 4
  })
  label.set({ left: 5, top: 6 })
  const group = new Group([box, label], { left: point.x, top: point.y })
  tagObject(group, 'score', { scoreValue: text })
  return group
}

export function configureFreeDrawingBrush(canvas: Canvas, tool: AnnotationTool, color: string, strokeWidth: number) {
  const brush = canvas.freeDrawingBrush as PencilBrush
  if (tool === 'highlighter') {
    brush.color = hexToRgba(color, 0.3)
    brush.width = Math.max(strokeWidth * 4, 12)
  } else if (tool === 'pencil') {
    brush.color = color
    brush.width = Math.min(strokeWidth, 2)
  } else {
    brush.color = color
    brush.width = strokeWidth
  }
}

export function tagFreehandPath(path: FabricObject, tool: AnnotationTool) {
  tagObject(path, tool)
}
