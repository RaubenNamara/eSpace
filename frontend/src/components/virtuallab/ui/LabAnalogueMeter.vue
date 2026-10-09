<template>
  <!-- A moving-coil meter face: the student reads the needle against the scale themselves - there is
       deliberately no digital readout, since reading an analogue scale is part of the practical. -->
  <svg :viewBox="`0 0 ${W} ${H}`" class="w-full h-auto select-none" role="img" :aria-label="`${label} dial, 0 to ${max} ${unit}`">
    <rect x="1" y="1" :width="W - 2" :height="H - 2" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
    <!-- Mirror strip behind the needle: line the needle up with its reflection to avoid parallax -->
    <path :d="arcPath(R - 26, R - 18)" fill="#e2e8f0" />
    <g v-for="t in ticks" :key="t.i">
      <line :x1="t.x1" :y1="t.y1" :x2="t.x2" :y2="t.y2" stroke="#0f172a" :stroke-width="t.major ? 2 : t.mid ? 1.4 : 0.9" />
      <text v-if="t.major" :x="t.lx" :y="t.ly" text-anchor="middle" font-size="12" font-weight="700" fill="#0f172a">{{ t.text }}</text>
    </g>
    <text :x="CX" :y="CY - 34" text-anchor="middle" font-size="26" font-weight="800" fill="#1e293b" font-family="serif">{{ unit }}</text>
    <text :x="CX" :y="CY - 16" text-anchor="middle" font-size="9" fill="#64748b">0 - {{ max }} {{ unit }}</text>
    <line :x1="CX" :y1="CY" :x2="needle.x" :y2="needle.y" stroke="#dc2626" stroke-width="1.8" stroke-linecap="round" />
    <circle :cx="CX" :cy="CY" r="6" fill="#1e293b" />
    <text v-if="overRange" :x="CX" :y="H - 8" text-anchor="middle" font-size="10" font-weight="700" fill="#dc2626">OVER RANGE</text>
    <text v-else-if="reversed" :x="CX" :y="H - 8" text-anchor="middle" font-size="10" font-weight="700" fill="#dc2626">NEEDLE BELOW ZERO</text>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  value: number
  max: number
  /** Number of smallest scale divisions across the full range (e.g. 50 for 0.02 A on a 0-1 A meter). */
  divisions: number
  /** Every n-th division is numbered. */
  labelEvery: number
  unit: string
  label: string
}>()

const W = 280
const H = 150
const CX = W / 2
const CY = H - 12
const R = 128
const SWEEP = 100 // degrees, -50 to +50

const angle = (frac: number) => ((-SWEEP / 2 + SWEEP * frac) * Math.PI) / 180
const polar = (r: number, a: number) => ({ x: CX + r * Math.sin(a), y: CY - r * Math.cos(a) })

function arcPath(r1: number, r2: number) {
  const a0 = angle(0), a1 = angle(1)
  const p = polar(r2, a0), q = polar(r2, a1), s = polar(r1, a1), t = polar(r1, a0)
  return `M ${p.x} ${p.y} A ${r2} ${r2} 0 0 1 ${q.x} ${q.y} L ${s.x} ${s.y} A ${r1} ${r1} 0 0 0 ${t.x} ${t.y} Z`
}

const ticks = computed(() => Array.from({ length: props.divisions + 1 }, (_, i) => {
  const major = i % props.labelEvery === 0
  const mid = !major && props.labelEvery % 2 === 0 && i % (props.labelEvery / 2) === 0
  const a = angle(i / props.divisions)
  const outer = polar(R - 6, a)
  const inner = polar(R - 6 - (major ? 16 : mid ? 12 : 8), a)
  const lab = polar(R + 6, a)
  const value = (props.max * i) / props.divisions
  return { i, major, mid, x1: outer.x, y1: outer.y, x2: inner.x, y2: inner.y, lx: lab.x, ly: lab.y + 4, text: String(Math.round(value * 100) / 100) }
}))

const overRange = computed(() => props.value > props.max * 1.02)
const reversed = computed(() => props.value < -props.max * 0.01)
// The needle stops just past either end of the scale, like a real meter's end stops
const needle = computed(() => polar(R - 4, angle(Math.max(-0.04, Math.min(1.04, props.value / props.max)))))
</script>
