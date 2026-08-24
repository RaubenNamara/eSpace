<!-- A rotary dial control - an alternative to LabSlider for values that read better as a knob
     (e.g. a power supply's voltage). Self-contained HTML/SVG, not a native <input>. -->
<template>
  <div class="flex flex-col items-center gap-1">
    <svg viewBox="0 0 80 80" class="w-14 h-14 select-none cursor-pointer" @pointerdown="onPointerDown">
      <circle cx="40" cy="40" r="34" fill="#e2e8f0" class="dark:fill-gray-600" stroke="#94a3b8" stroke-width="2" />
      <line
        :x1="40 + 12 * Math.cos(angleRad)" :y1="40 + 12 * Math.sin(angleRad)"
        :x2="40 + 30 * Math.cos(angleRad)" :y2="40 + 30 * Math.sin(angleRad)"
        stroke="#4338ca" stroke-width="4" stroke-linecap="round"
      />
      <circle cx="40" cy="40" r="6" fill="#4338ca" />
    </svg>
    <p class="text-[11px] font-semibold text-gray-600 dark:text-gray-300">{{ label }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount } from 'vue'

const props = defineProps<{
  modelValue: number
  min: number
  max: number
  label: string
  disabled?: boolean
}>()
const emit = defineEmits<{ 'update:modelValue': [number] }>()

// Sweeps from -135deg (min) to +135deg (max), a standard dial range.
const START_DEG = -135, END_DEG = 135
const angleRad = computed(() => {
  const frac = (props.modelValue - props.min) / Math.max(1e-6, props.max - props.min)
  const deg = START_DEG + frac * (END_DEG - START_DEG)
  return (deg * Math.PI) / 180
})

function valueFromPointer(ev: PointerEvent, svg: SVGSVGElement) {
  const rect = svg.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  const deg = (Math.atan2(ev.clientY - cy, ev.clientX - cx) * 180) / Math.PI
  let clamped = Math.max(START_DEG, Math.min(END_DEG, deg))
  const frac = (clamped - START_DEG) / (END_DEG - START_DEG)
  return props.min + frac * (props.max - props.min)
}

let dragging = false
let activeCleanup: (() => void) | null = null
function onPointerDown(ev: PointerEvent) {
  if (props.disabled) return
  dragging = true
  const svg = ev.currentTarget as SVGSVGElement
  const move = (e: PointerEvent) => { if (dragging) emit('update:modelValue', valueFromPointer(e, svg)) }
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

// If the component unmounts mid-drag, the matching pointerup may never fire - without this the
// window listeners would stay attached forever.
onBeforeUnmount(() => activeCleanup?.())
</script>
