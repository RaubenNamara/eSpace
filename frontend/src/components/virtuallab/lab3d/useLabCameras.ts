import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { LAB_VIEWS, flyActiveRoomTo, normalLens, resetLabCameras, setLabInsets, snapshotBenchPose, type LabViewKey } from './cameraViews'

/**
 * The lab's camera toggles. Any number of cameras can be on: the first one is the main,
 * interactive view and the rest show as live windows down the right of the lab (clicking a
 * window, or the name of a camera that is already on, makes it the main view).
 *
 * `flyMain` moves the main camera; by default the bench view goes back through the scene's own
 * goToView('bench') (each practical frames its own apparatus) and the others are fixed room views.
 */
export function useLabCameras(opts: { benchView: () => void; flyMain?: (key: LabViewKey) => void }) {
  const shown = ref<LabViewKey[]>(['bench'])
  const main = computed(() => shown.value[0])
  const allOn = computed(() => shown.value.length === LAB_VIEWS.length)

  function fly(key: LabViewKey) {
    if (key !== 'top') normalLens()
    if (opts.flyMain) return opts.flyMain(key)
    if (key === 'bench') opts.benchView()
    else flyActiveRoomTo(key)
  }

  function makeMain(key: LabViewKey) {
    if (key === main.value) return
    // Remember what the bench view looked like so its window shows the same thing
    if (main.value === 'bench') snapshotBenchPose()
    shown.value = [key, ...shown.value.filter(k => k !== key)]
    fly(key)
  }

  /** On/off. Turning a camera on adds its window; turning off the main view hands over to the next one. */
  function toggle(key: LabViewKey) {
    if (!shown.value.includes(key)) {
      if (main.value === 'bench') snapshotBenchPose()
      shown.value = [...shown.value, key]
      return
    }
    if (shown.value.length === 1) return // at least one camera stays on
    if (key === main.value) {
      const next = shown.value[1]
      if (key === 'bench') snapshotBenchPose()
      shown.value = shown.value.filter(k => k !== key)
      fly(next)
    } else {
      shown.value = shown.value.filter(k => k !== key)
    }
  }

  /** All cameras on, or back to just the main one. */
  function toggleAll() {
    if (allOn.value) { shown.value = [main.value]; return }
    if (main.value === 'bench') snapshotBenchPose()
    shown.value = [main.value, ...LAB_VIEWS.map(v => v.key).filter(k => k !== main.value)]
  }

  watch(shown, v => setLabInsets(v.slice(1), makeMain), { immediate: true })
  onBeforeUnmount(() => { normalLens(); resetLabCameras() })

  return { shown, main, allOn, toggle, toggleAll, makeMain }
}

export type LabCameras = ReturnType<typeof useLabCameras>
