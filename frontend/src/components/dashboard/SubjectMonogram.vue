<template>
  <!-- A subject's badge: its initials in heavy white letters over a sweeping ring (thick at the lower
       right; the letters' outline cuts it where they cross), on the subject's own colour. Drawn here,
       so every subject gets one from its code. -->
  <svg class="w-full h-full block" viewBox="0 0 120 100" preserveAspectRatio="xMidYMid slice" role="img" :aria-label="code">
    <defs>
      <linearGradient :id="`mg-bg-${uid}`" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" :stop-color="color" />
        <stop offset="1" stop-color="#061a55" />
      </linearGradient>
    </defs>
    <rect width="120" height="100" :fill="`url(#mg-bg-${uid})`" />
    <g transform="rotate(-18 60 54)">
      <path :d="ring" fill="#fff" fill-rule="evenodd" />
    </g>
    <text x="60" y="64" text-anchor="middle" :textLength="code.length > 2 ? 78 : 58" lengthAdjust="spacingAndGlyphs"
      font-family="'Plus Jakarta Sans', 'Arial Black', Arial, sans-serif" font-weight="900" font-size="33" fill="#fff"
      :stroke="strokeColor" stroke-width="5" stroke-linejoin="round" paint-order="stroke">{{ code }}</text>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ code: string; color: string }>()
const uid = Math.random().toString(36).slice(2, 8)
// a crescent ring: an outer ellipse less an inner one nudged up and left, thick at the lower right
const ellipse = (cx: number, cy: number, rx: number, ry: number) =>
  `M${cx - rx} ${cy}a${rx} ${ry} 0 1 0 ${rx * 2} 0a${rx} ${ry} 0 1 0 ${-rx * 2} 0z`
const ring = ellipse(60, 55, 47, 29) + ellipse(56.5, 50.5, 41.5, 21.5)
// the letters' outline matches the background where they sit, so the ring looks cut where it crosses
// (the middle of the gradient, between the subject's colour and navy)
const strokeColor = computed(() => {
  const m = /^#?([0-9a-f]{6})$/i.exec(props.color.trim())
  if (!m) return '#0b1f5e'
  const a = parseInt(m[1], 16), b = 0x061a55
  const mix = (sh: number) => Math.round(((a >> sh) & 255) * 0.5 + ((b >> sh) & 255) * 0.5)
  return `rgb(${mix(16)}, ${mix(8)}, ${mix(0)})`
})
</script>
