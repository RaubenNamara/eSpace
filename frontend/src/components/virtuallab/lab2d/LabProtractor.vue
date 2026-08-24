<!--
  A real measuring instrument, not decoration: a semicircular 0-180 degree scale the student drags
  to position and rotates to align. Purely a rendering + gesture-reporting primitive - alignment
  validation and the actual angle reading belong to whichever renderer has the ray/surface context
  (matches LabTerminal/LabWire: dumb primitive, parent owns interaction state and math). Must be
  placed inside a parent <svg>.
-->
<template>
  <g :transform="`translate(${x} ${y}) rotate(${rotationDeg})`">
    <path :d="arcPath" :fill="armed ? '#eef2ff' : '#f1f6f5'" fill-opacity="0.9" :stroke="armed ? '#4f46e5' : '#94a3b8'" stroke-width="1.5"
      class="cursor-grab active:cursor-grabbing" @pointerdown="$emit('bodyPointerDown', $event)" />
    <g v-for="t in ticks" :key="t.deg">
      <line :x1="t.x1" :y1="t.y1" :x2="t.x2" :y2="t.y2" stroke="#1e293b" :stroke-width="t.major ? 1.4 : 0.8" />
      <text v-if="t.major" :x="t.labelX" :y="t.labelY" text-anchor="middle" class="fill-slate-700 text-[7px] font-semibold pointer-events-none">{{ t.deg }}</text>
    </g>
    <!-- Baseline - the reference edge that must align with the normal/reference line -->
    <line :x1="-radius" y1="0" :x2="radius" y2="0" stroke="#334155" stroke-width="1.5" />
    <!-- Centre crosshair - must sit on the point of incidence for a reading to be valid -->
    <line x1="-8" y1="0" x2="8" y2="0" stroke="#dc2626" stroke-width="1.5" />
    <line x1="0" y1="-8" x2="0" y2="8" stroke="#dc2626" stroke-width="1.5" />
    <!-- Rotate handle -->
    <circle :cx="0" :cy="-radius" r="7" fill="#4f46e5" class="cursor-grab active:cursor-grabbing" @pointerdown.stop="$emit('rotateHandlePointerDown', $event)" />
  </g>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  x: number
  y: number
  rotationDeg: number
  radius?: number
  armed?: boolean
}>(), { radius: 55, armed: false })

defineEmits<{ bodyPointerDown: [PointerEvent]; rotateHandlePointerDown: [PointerEvent] }>()

const arcPath = computed(() => {
  const r = props.radius
  return `M ${-r} 0 A ${r} ${r} 0 0 1 ${r} 0 Z`
})

const ticks = computed(() => {
  const r = props.radius
  const list: { deg: number; x1: number; y1: number; x2: number; y2: number; labelX: number; labelY: number; major: boolean }[] = []
  for (let deg = 0; deg <= 180; deg += 10) {
    const rad = Math.PI - (deg / 180) * Math.PI // 0deg at the right end, 180deg at the left end
    const major = deg % 30 === 0
    const inner = major ? r - 10 : r - 6
    list.push({
      deg,
      x1: Math.cos(rad) * inner, y1: Math.sin(rad) * inner,
      x2: Math.cos(rad) * r, y2: Math.sin(rad) * r,
      labelX: Math.cos(rad) * (r - 20), labelY: Math.sin(rad) * (r - 20),
      major,
    })
  }
  return list
})
</script>
