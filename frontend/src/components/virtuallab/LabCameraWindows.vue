<template>
  <!-- Every camera that is on besides the main one, stacked beside the main view inside the lab
       itself; click one to make it the main view -->
  <div v-if="extra.length" class="flex-shrink-0 h-full w-[30%] min-w-[130px] max-w-[340px] flex flex-col gap-1 p-1 bg-slate-900">
    <button
      v-for="key in extra"
      :key="key"
      type="button"
      @click="cams.makeMain(key)"
      class="group relative flex-1 min-h-0 w-full rounded-lg overflow-hidden bg-slate-700 ring-2 ring-transparent hover:ring-indigo-500"
      :title="`Make ${labelOf(key)} the main view`"
    >
      <canvas :ref="el => setLabInsetCanvas(key, el as HTMLCanvasElement | null)" class="block w-full h-full"></canvas>
      <span class="absolute left-1.5 bottom-1.5 px-2 py-0.5 rounded-md bg-gray-900/75 text-white text-[11px] font-semibold">{{ labelOf(key) }}</span>
      <span class="absolute right-1.5 top-1.5 px-1.5 py-0.5 rounded-md bg-indigo-600 text-white text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Make main</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { LAB_VIEW_LABEL, setLabInsetCanvas, type LabViewKey } from './lab3d/cameraViews'
import type { LabCameras } from './lab3d/useLabCameras'

const props = defineProps<{
  cams: LabCameras
  labels?: Partial<Record<LabViewKey, string>>
}>()

const extra = computed(() => props.cams.shown.value.slice(1))
const labelOf = (key: LabViewKey) => props.labels?.[key] ?? LAB_VIEW_LABEL[key]
</script>
