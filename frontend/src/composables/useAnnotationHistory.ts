import { computed, ref } from 'vue'
import type { Canvas } from 'fabric'

const MAX_HISTORY = 50

/**
 * Undo/redo stack over Fabric canvas snapshots. Callers push a snapshot after each meaningful
 * change (add/remove/modify) - NOT on every intermediate drag frame, since Fabric's
 * "object:modified" event (which callers should hook this to) only fires once per gesture on
 * mouse-up, avoiding the "excessive history states while dragging" problem by construction.
 */
export function useAnnotationHistory(customProps: string[]) {
  const stack = ref<Record<string, any>[]>([])
  const index = ref(-1)
  // Exposed (not just internal) so callers can wrap sequences that legitimately fire multiple
  // Fabric object:added/removed events they don't want individually recorded - e.g. an in-progress
  // shape-drag preview (added at mouse:down, resized during mouse:move) or a bulk reload from props.
  const suspended = ref(false)

  const canUndo = computed(() => index.value > 0)
  const canRedo = computed(() => index.value < stack.value.length - 1)

  function reset(canvas: Canvas | null) {
    const initial = canvas ? canvas.toObject(customProps) : { objects: [] }
    stack.value = [initial]
    index.value = 0
  }

  function push(canvas: Canvas) {
    if (suspended.value) return
    const state = canvas.toObject(customProps)
    stack.value = stack.value.slice(0, index.value + 1)
    stack.value.push(state)
    if (stack.value.length > MAX_HISTORY) {
      stack.value.shift()
    } else {
      index.value++
    }
    if (stack.value.length <= MAX_HISTORY) {
      index.value = stack.value.length - 1
    }
  }

  async function restore(canvas: Canvas, state: Record<string, any>) {
    suspended.value = true
    try {
      await canvas.loadFromJSON(state)
      canvas.requestRenderAll()
    } finally {
      suspended.value = false
    }
  }

  async function undo(canvas: Canvas) {
    if (!canUndo.value) return
    index.value--
    await restore(canvas, stack.value[index.value])
  }

  async function redo(canvas: Canvas) {
    if (!canRedo.value) return
    index.value++
    await restore(canvas, stack.value[index.value])
  }

  return { push, undo, redo, reset, canUndo, canRedo, suspended }
}
