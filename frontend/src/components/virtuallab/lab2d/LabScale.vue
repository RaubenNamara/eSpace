<!-- A labelled value track with a draggable marker, e.g. "0V ────●──── 12V" for a power supply.
     Distinct from LabSlider (a native range input) - this is the illustrated-track style the
     brief's power-supply example shows, but still a real, direct-manipulation control. -->
<template>
  <div class="w-full">
    <p class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1.5 text-center">{{ label }}: {{ modelValue.toFixed(1) }}{{ unit }}</p>
    <div class="flex items-center gap-2 text-[10px] text-gray-400 dark:text-gray-500">
      <span>{{ min }}{{ unit }}</span>
      <div ref="trackEl" class="relative flex-1 h-2 rounded-full bg-gray-200 dark:bg-gray-600 cursor-pointer" @pointerdown="onPointerDown">
        <div class="absolute top-1/2 -translate-y-1/2 h-2 rounded-full bg-indigo-500" :style="{ width: pct + '%' }" />
        <div class="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-indigo-600 shadow" :style="{ left: `calc(${pct}% - 8px)` }" />
      </div>
      <span>{{ max }}{{ unit }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'

const props = defineProps<{
  modelValue: number
  min: number
  max: number
  label: string
  unit?: string
  disabled?: boolean
}>()
const emit = defineEmits<{ 'update:modelValue': [number] }>()

const pct = computed(() => Math.max(0, Math.min(100, ((props.modelValue - props.min) / Math.max(1e-6, props.max - props.min)) * 100)))
const trackEl = ref<HTMLDivElement | null>(null)

function valueFromClientX(clientX: number): number {
  const el = trackEl.value!
  const rect = el.getBoundingClientRect()
  const frac = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
  return props.min + frac * (props.max - props.min)
}

let dragging = false
let activeCleanup: (() => void) | null = null
function onPointerDown(ev: PointerEvent) {
  if (props.disabled) return
  dragging = true
  emit('update:modelValue', valueFromClientX(ev.clientX))
  const move = (e: PointerEvent) => { if (dragging) emit('update:modelValue', valueFromClientX(e.clientX)) }
  const up = () => {
    dragging = false
    window.removeEventListener('pointermove', move)
    window.removeEventListener('pointerup', up)
    activeCleanup = null
  }
  window.addEventListener('pointermove', move)
  window.addEventListener('pointerup', up)
  activeCleanup = up
}

// If the component unmounts mid-drag (e.g. the learner navigates away while still holding the
// track), the matching pointerup may never fire - without this, the window listeners would stay
// attached forever.
onBeforeUnmount(() => activeCleanup?.())
</script>
