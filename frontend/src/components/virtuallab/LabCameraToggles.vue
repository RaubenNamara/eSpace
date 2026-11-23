<template>
  <!-- One small on/off switch per camera; the main (interactive) view is the highlighted one -->
  <div class="inline-flex flex-wrap items-center rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm gap-0.5" :class="compact ? 'p-0.5' : 'p-1'">
    <button
      v-for="v in views"
      :key="v.key"
      type="button"
      role="switch"
      :aria-checked="isOn(v.key)"
      @click="cams.toggle(v.key)"
      class="inline-flex items-center gap-1.5 font-semibold rounded-lg transition-colors"
      :class="[
        compact ? 'px-1.5 py-1 text-[11px]' : 'px-2 py-1.5 text-xs',
        cams.main.value === v.key ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-200' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
      ]"
      :title="titleFor(v)"
    >
      <span
        class="relative inline-flex flex-shrink-0 rounded-full transition-colors"
        :class="[compact ? 'w-6 h-3.5' : 'w-7 h-4', isOn(v.key) ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600']"
        aria-hidden="true"
      >
        <span
          class="absolute top-0.5 left-0.5 rounded-full bg-white shadow transition-transform"
          :class="[compact ? 'w-2.5 h-2.5' : 'w-3 h-3', isOn(v.key) ? (compact ? 'translate-x-2.5' : 'translate-x-3') : 'translate-x-0']"
        ></span>
      </span>
      {{ labels?.[v.key] ?? v.label }}
    </button>
    <button
      type="button"
      @click="cams.toggleAll()"
      class="font-semibold rounded-lg transition-colors text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
      :class="compact ? 'px-1.5 py-1 text-[11px]' : 'px-2 py-1.5 text-xs'"
      :title="cams.allOn.value ? 'Back to the main camera only' : 'Turn every camera on'"
    >{{ cams.allOn.value ? 'Main only' : 'All on' }}</button>
  </div>
</template>

<script setup lang="ts">
import { LAB_VIEWS, type LabViewKey } from './lab3d/cameraViews'
import type { LabCameras } from './lab3d/useLabCameras'

const props = defineProps<{
  cams: LabCameras
  compact?: boolean
  /** Different names for some cameras (the playground calls the bench "Front") */
  labels?: Partial<Record<LabViewKey, string>>
}>()

const views = LAB_VIEWS
const isOn = (key: LabViewKey) => props.cams.shown.value.includes(key)

function titleFor(v: { key: LabViewKey; title: string }) {
  if (props.cams.main.value === v.key) return `${v.title} (main view). Switch off to hand over to the next camera.`
  return `${v.title}. ${isOn(v.key) ? 'On, beside the main view: click its picture to make it the main view, or switch it off here.' : 'Switch on to show it beside the main view.'}`
}
</script>
