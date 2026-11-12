<template>
  <!-- The welcome banner's sky, drawn for the time of day: a sun rising in the morning, high at
       midday, setting in the evening, and the moon and stars at night. It fills the banner; the sun
       sits on the right so the greeting on the left stays clear. -->
  <svg class="day-sky absolute inset-0 w-full h-full pointer-events-none select-none" viewBox="0 0 1600 200" preserveAspectRatio="xMaxYMax slice" aria-hidden="true">
    <defs>
      <linearGradient :id="`sky-${uid}`" x1="0" y1="0" x2="1" y2="0">
        <stop v-for="(c, i) in look.sky" :key="i" :offset="i / (look.sky.length - 1)" :stop-color="c" />
      </linearGradient>
      <radialGradient :id="`glow-${uid}`" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" :stop-color="look.glow" stop-opacity="0.85" />
        <stop offset="1" :stop-color="look.glow" stop-opacity="0" />
      </radialGradient>
      <radialGradient :id="`sun-${uid}`" cx="0.4" cy="0.38" r="0.65">
        <stop offset="0" :stop-color="look.sunLight" />
        <stop offset="1" :stop-color="look.sun" />
      </radialGradient>
    </defs>

    <rect width="1600" height="200" :fill="`url(#sky-${uid})`" />
    <circle :cx="look.x" :cy="look.y" :r="look.glowR" :fill="`url(#glow-${uid})`" />

    <!-- night: stars and the moon -->
    <g v-if="period === 'night'">
      <circle v-for="(s, i) in stars" :key="i" :cx="s[0]" :cy="s[1]" :r="s[2]" fill="#fff" class="day-twinkle" :style="{ animationDelay: `${(i % 5) * 0.7}s` }" />
      <mask :id="`moon-${uid}`"><rect width="1600" height="200" fill="#fff" /><circle :cx="look.x + 13" :cy="look.y - 9" r="26" fill="#000" /></mask>
      <circle :cx="look.x" :cy="look.y" r="30" fill="#fdf6d8" :mask="`url(#moon-${uid})`" />
    </g>

    <!-- day: the sun with its slowly turning rays -->
    <g v-else>
      <g class="day-rays" :style="{ transformOrigin: `${look.x}px ${look.y}px` }" :stroke="look.sun" stroke-width="5" stroke-linecap="round" opacity="0.55">
        <line v-for="a in 12" :key="a" :x1="look.x" :y1="look.y - 46" :x2="look.x" :y2="look.y - 60" :transform="`rotate(${a * 30} ${look.x} ${look.y})`" />
      </g>
      <circle :cx="look.x" :cy="look.y" r="34" :fill="`url(#sun-${uid})`" />
    </g>

    <!-- clouds by day -->
    <g v-if="period !== 'night'" :fill="look.cloud" class="day-clouds">
      <path d="M1130 88a18 18 0 0 1 34-8a14 14 0 0 1 24 10h-58z" opacity="0.9" />
      <path d="M1500 70a14 14 0 0 1 27-6a11 11 0 0 1 19 8h-46z" opacity="0.8" />
      <path d="M900 72a12 12 0 0 1 23-5a9 9 0 0 1 16 7h-39z" opacity="0.6" />
    </g>

    <!-- hills in front of a rising or setting sun -->
    <path d="M0 200V188C200 182 400 186 600 182C780 178 900 166 1060 162C1220 158 1320 146 1450 148C1520 149 1570 154 1600 152V200Z" :fill="look.hillBack" />
    <path d="M0 200V194C240 190 480 194 700 190C900 186 1040 176 1220 174C1380 172 1480 166 1600 168V200Z" :fill="look.hillFront" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export type DayPeriod = 'morning' | 'afternoon' | 'evening' | 'night'
// narrow: a phone shows only the right of the scene, so the sun moves nearer the edge to clear the greeting
// sunX: where the sun or moon sits across the 1600-wide scene (a banner with badges on the right moves it left)
const props = defineProps<{ period: DayPeriod; narrow?: boolean; sunX?: number }>()
const uid = Math.random().toString(36).slice(2, 8)

const looks: Record<DayPeriod, { sky: string[]; glow: string; glowR: number; sun: string; sunLight: string; cloud: string; hillBack: string; hillFront: string; x: number; y: number }> = {
  morning: { sky: ['#eaf3ff', '#e2efff', '#ffe6c8', '#ffd2a1'], glow: '#ffd27a', glowR: 150, sun: '#ffab2e', sunLight: '#ffe58a', cloud: '#ffffff', hillBack: '#a9dbb2', hillFront: '#74c088', x: 1400, y: 126 },
  afternoon: { sky: ['#e6f1ff', '#d3e8ff', '#a9d4ff', '#7fbcfb'], glow: '#fff4b5', glowR: 140, sun: '#ffc21a', sunLight: '#fff2a6', cloud: '#ffffff', hillBack: '#96d6a0', hillFront: '#57b26f', x: 1400, y: 96 },
  evening: { sky: ['#fff1e4', '#ffdcc2', '#ffb48a', '#f98a6c'], glow: '#ffb067', glowR: 160, sun: '#ff7a2f', sunLight: '#ffcf6b', cloud: '#ffe9dc', hillBack: '#c18a97', hillFront: '#8d5a7e', x: 1400, y: 130 },
  night: { sky: ['#0c1d58', '#11246a', '#162c78', '#1b3384'], glow: '#9fb6ff', glowR: 110, sun: '#fdf6d8', sunLight: '#fdf6d8', cloud: '#ffffff', hillBack: '#14286a', hillFront: '#0b1b4d', x: 1400, y: 92 },
}
const look = computed(() => ({ ...looks[props.period], x: props.narrow ? 1528 : props.sunX ?? looks[props.period].x }))

const stars: [number, number, number][] = [
  [720, 60, 1.6], [800, 110, 1.2], [880, 50, 1.8], [960, 90, 1.3], [1040, 46, 1.5], [1110, 120, 1.2], [1180, 64, 1.9],
  [1250, 124, 1.3], [1300, 48, 1.4], [1490, 50, 1.7], [1530, 116, 1.3], [1570, 72, 1.5], [1220, 96, 1.1], [1330, 128, 1.2],
]
</script>

<style scoped>
.day-rays { animation: day-turn 60s linear infinite; }
.day-clouds { animation: day-drift 14s ease-in-out infinite alternate; }
.day-twinkle { animation: day-twinkle 3.5s ease-in-out infinite; }
@keyframes day-turn { to { transform: rotate(360deg); } }
@keyframes day-drift { to { transform: translateX(-24px); } }
@keyframes day-twinkle { 50% { opacity: 0.35; } }
@media (prefers-reduced-motion: reduce) {
  .day-rays, .day-clouds, .day-twinkle { animation: none; }
}
</style>
