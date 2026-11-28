<template>
  <!-- The welcome banner's sky, drawn for the time of day and the weather where the user is: a sun
       rising in the morning, high at midday, setting in the evening, the moon and stars at night;
       clouds over it when it's cloudy, grey skies and falling rain when it rains, lightning in a
       storm (useWeather). It fills the banner; the sun sits on the right so the greeting on the left
       stays clear. Without weather (no answer yet, or none) it is the plain sky for the time. -->
  <svg class="day-sky absolute inset-0 w-full h-full pointer-events-none select-none" viewBox="0 0 1600 200" preserveAspectRatio="xMaxYMax slice" aria-hidden="true">
    <defs>
      <linearGradient :id="`sky-${uid}`" x1="0" y1="0" x2="1" y2="0">
        <stop v-for="(c, i) in skyColours" :key="i" :offset="i / (skyColours.length - 1)" :stop-color="c" />
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
    <circle :cx="look.x" :cy="look.y" :r="look.glowR" :fill="`url(#glow-${uid})`" :opacity="sunOpacity" />

    <!-- night: stars (on a clear night) and the moon -->
    <g v-if="period === 'night'" :opacity="sunOpacity">
      <template v-if="sky.stars">
        <circle v-for="(s, i) in stars" :key="i" :cx="s[0]" :cy="s[1]" :r="s[2]" fill="#fff" class="day-twinkle" :style="{ animationDelay: `${(i % 5) * 0.7}s` }" />
      </template>
      <mask :id="`moon-${uid}`"><rect width="1600" height="200" fill="#fff" /><circle :cx="look.x + 13" :cy="look.y - 9" r="26" fill="#000" /></mask>
      <circle :cx="look.x" :cy="look.y" r="30" fill="#fdf6d8" :mask="`url(#moon-${uid})`" />
    </g>

    <!-- day: the sun with its slowly turning rays -->
    <g v-else :opacity="sunOpacity">
      <g class="day-rays" :style="{ transformOrigin: `${look.x}px ${look.y}px` }" :stroke="look.sun" stroke-width="5" stroke-linecap="round" opacity="0.55">
        <line v-for="a in 12" :key="a" :x1="look.x" :y1="look.y - 46" :x2="look.x" :y2="look.y - 60" :transform="`rotate(${a * 30} ${look.x} ${look.y})`" />
      </g>
      <circle :cx="look.x" :cy="look.y" r="34" :fill="`url(#sun-${uid})`" />
    </g>

    <!-- fog: soft bands of haze across the scene -->
    <g v-if="sky.fog" class="day-haze" :fill="period === 'night' ? '#5d6a96' : '#ffffff'">
      <rect v-for="(b, i) in fogBands" :key="i" :x="b[0]" :y="b[1]" :width="b[2]" height="9" rx="4.5" :opacity="b[3]" />
    </g>

    <!-- clouds: a few small ones on a fair day, big grey ones when it's overcast or wet -->
    <g v-if="sky.clouds.length" class="day-clouds">
      <path v-for="(c, i) in sky.clouds" :key="i" :d="cloudPath(c[0], c[1], c[2])" :fill="c[3]" :opacity="c[4]" />
    </g>

    <!-- lightning in a storm -->
    <g v-if="sky.lightning" class="day-lightning">
      <rect width="1600" height="200" fill="#ffffff" class="day-flash" />
      <path :d="`M${look.x - 40} ${look.y + 8}l-18 34h16l-12 30l30-40h-16l12-24z`" fill="#fff6b0" class="day-bolt" />
    </g>

    <!-- rain -->
    <g v-if="sky.rain" :stroke="sky.rainColour" stroke-width="2.4" stroke-linecap="round">
      <line v-for="(d, i) in drops" :key="i" class="day-drop" :x1="d[0]" :y1="d[1]" :x2="d[0] - 4" :y2="d[1] + d[2]" :style="{ animationDelay: `${d[3]}s`, animationDuration: `${sky.rainSpeed}s` }" />
    </g>

    <!-- hills in front of a rising or setting sun -->
    <path d="M0 200V188C200 182 400 186 600 182C780 178 900 166 1060 162C1220 158 1320 146 1450 148C1520 149 1570 154 1600 152V200Z" :fill="look.hillBack" />
    <path d="M0 200V194C240 190 480 194 700 190C900 186 1040 176 1220 174C1380 172 1480 166 1600 168V200Z" :fill="look.hillFront" />

    <!-- the weather in words, left of the sun (not on a phone, where the greeting needs the room, nor
         where the banner's own badges and cards run across the sky) -->
    <text v-if="label && !narrow && !noLabel" :x="look.x - 78" :y="look.y + 7" text-anchor="end" class="day-label" :fill="period === 'night' ? '#e6ecff' : '#10296e'">
      {{ label }}
    </text>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWeather, type WeatherCondition } from '@/composables/useWeather'

export type DayPeriod = 'morning' | 'afternoon' | 'evening' | 'night'
// narrow: a phone shows only the right of the scene, so the sun moves nearer the edge to clear the greeting
// sunX: where the sun or moon sits across the 1600-wide scene (a banner with badges on the right moves it left)
// noLabel: a banner whose own content runs across the sky (badges, cards) leaves out the words
const props = defineProps<{ period: DayPeriod; narrow?: boolean; sunX?: number; noLabel?: boolean }>()
const uid = Math.random().toString(36).slice(2, 8)
const { weather, label } = useWeather()

const looks: Record<DayPeriod, { sky: string[]; glow: string; glowR: number; sun: string; sunLight: string; cloud: string; hillBack: string; hillFront: string; x: number; y: number }> = {
  morning: { sky: ['#eaf3ff', '#e2efff', '#ffe6c8', '#ffd2a1'], glow: '#ffd27a', glowR: 150, sun: '#ffab2e', sunLight: '#ffe58a', cloud: '#ffffff', hillBack: '#a9dbb2', hillFront: '#74c088', x: 1400, y: 126 },
  afternoon: { sky: ['#e6f1ff', '#d3e8ff', '#a9d4ff', '#7fbcfb'], glow: '#fff4b5', glowR: 140, sun: '#ffc21a', sunLight: '#fff2a6', cloud: '#ffffff', hillBack: '#96d6a0', hillFront: '#57b26f', x: 1400, y: 96 },
  evening: { sky: ['#fff1e4', '#ffdcc2', '#ffb48a', '#f98a6c'], glow: '#ffb067', glowR: 160, sun: '#ff7a2f', sunLight: '#ffcf6b', cloud: '#ffe9dc', hillBack: '#c18a97', hillFront: '#8d5a7e', x: 1400, y: 130 },
  night: { sky: ['#0c1d58', '#11246a', '#162c78', '#1b3384'], glow: '#9fb6ff', glowR: 110, sun: '#fdf6d8', sunLight: '#fdf6d8', cloud: '#ffffff', hillBack: '#14286a', hillFront: '#0b1b4d', x: 1400, y: 92 },
}
const look = computed(() => ({ ...looks[props.period], x: props.narrow ? 1528 : props.sunX ?? looks[props.period].x }))

// Grey skies for overcast and wet weather, darker for a storm; each keeps a hint of its time of day
const greySkies: Record<DayPeriod, { dull: string[]; storm: string[]; fog: string[] }> = {
  morning: { dull: ['#e6ebf2', '#dbe2ec', '#e3dcd4', '#d6cbbf'], storm: ['#c6ceda', '#b2bccb', '#a2a9b5', '#959aa6'], fog: ['#f1f2f4', '#eceef1', '#eeebe7', '#e7e3de'] },
  afternoon: { dull: ['#e4e9f0', '#d6dee9', '#c6d1df', '#b7c4d5'], storm: ['#c3cbd7', '#acb6c5', '#97a3b5', '#8592a6'], fog: ['#f0f2f4', '#eaedf0', '#e3e7ec', '#dde2e8'] },
  evening: { dull: ['#efe6df', '#e0d3cb', '#cdbcb6', '#bba7a6'], storm: ['#cbc1bd', '#b3a7a5', '#9c8f92', '#877b82'], fog: ['#f3eeea', '#ede6e1', '#e6ddd8', '#ded4d0'] },
  night: { dull: ['#0d1738', '#111d44', '#16234f', '#1b2a5a'], storm: ['#090f26', '#0c1430', '#10193a', '#141f44'], fog: ['#1a2242', '#1f284b', '#242e54', '#29345c'] },
}

type Cloud = [number, number, number, string, number] // x, y, scale, colour, opacity
interface SkyLook { clouds: Cloud[]; rain: number; rainSpeed: number; rainColour: string; lightning: boolean; fog: boolean; stars: boolean; sunDim: number; grey: 'dull' | 'storm' | 'fog' | null }

// The clouds and rain for each kind of weather, placed around the sun (x, y)
function skyFor(c: WeatherCondition | null, x: number, y: number, night: boolean): SkyLook {
  const white = night ? '#c9d2ee' : '#ffffff'
  const light = night ? '#56628c' : '#eef1f5'
  const grey = night ? '#3a4570' : '#c9d0db'
  const dark = night ? '#262f55' : '#9aa3b2'
  // a wide banner shows only the lower part of the scene (about y 65-200), so clouds sit low enough to be seen
  const fair: Cloud[] = [[x - 270, 104, 1, white, 0.9], [x + 100, 96, 0.8, white, 0.8], [x - 500, 100, 0.7, white, 0.6]]
  const over = (col: string, col2: string, o = 1): Cloud[] => [
    [x - 120, 128, 2.3, col2, o], [x - 40, 146, 2.6, col, o], [x - 330, 118, 1.9, col2, o * 0.9],
    [x + 70, 114, 1.7, col, o * 0.9], [x - 560, 128, 1.6, col2, o * 0.8], [x - 800, 110, 1.3, col, o * 0.6],
  ]
  const base: SkyLook = { clouds: night ? [] : fair, rain: 0, rainSpeed: 0.9, rainColour: night ? '#a9b8e6' : '#5f7398', lightning: false, fog: false, stars: true, sunDim: 1, grey: null }
  switch (c) {
    case 'clear':
      return { ...base, clouds: night ? [] : fair.slice(2) }
    case 'partly_cloudy':
      return { ...base, clouds: [...(night ? [] : fair), [x - 70, Math.max(y + 30, 122), 1.6, white, 0.95]], stars: true }
    case 'cloudy':
      return { ...base, clouds: over(light, grey, 0.95), stars: false, sunDim: 0.35, grey: 'dull' }
    case 'fog':
      return { ...base, clouds: [[x - 60, Math.max(y + 26, 122), 1.8, light, 0.7]], fog: true, stars: false, sunDim: 0.3, grey: 'fog' }
    case 'drizzle':
      return { ...base, clouds: over(light, grey), rain: 18, rainSpeed: 1.1, stars: false, sunDim: 0.25, grey: 'dull' }
    case 'rain':
      return { ...base, clouds: over(dark, grey), rain: 36, rainSpeed: 0.8, stars: false, sunDim: 0, grey: 'dull' }
    case 'heavy_rain':
      return { ...base, clouds: over(night ? '#1f2748' : '#7d8696', dark), rain: 64, rainSpeed: 0.6, stars: false, sunDim: 0, grey: 'storm' }
    case 'thunderstorm':
      return { ...base, clouds: over(dark, night ? '#1c2447' : '#7f8898'), rain: 48, rainSpeed: 0.65, lightning: true, stars: false, sunDim: 0, grey: 'storm' }
    default:
      // no weather: the plain sky for the time of day, as it always was
      return { ...base, clouds: night ? [] : fair, rain: 0 }
  }
}

const sky = computed<SkyLook>(() => {
  const w = weather.value
  const night = props.period === 'night'
  const s = skyFor(w?.condition ?? null, look.value.x, look.value.y, night)
  // dry now, but rain is likely in the next few hours: the clouds gather and darken
  if (w?.rain_soon) {
    const gather: Cloud[] = [[look.value.x - 140, 132, 2, night ? '#3a4570' : '#bcc4d1', 0.95], [look.value.x - 380, 120, 1.7, night ? '#2e3863' : '#aeb7c6', 0.9], [look.value.x + 60, 114, 1.5, night ? '#3a4570' : '#c4cbd6', 0.85]]
    return { ...s, clouds: [...s.clouds, ...gather], stars: false, sunDim: Math.min(s.sunDim, 0.55), grey: s.grey ?? 'dull' }
  }
  return s
})

const skyColours = computed(() => (sky.value.grey ? greySkies[props.period][sky.value.grey] : look.value.sky))
const sunOpacity = computed(() => sky.value.sunDim)

// a cloud: a puffy shape sitting on a flat base, (x, y) its base's left end, s its size
const cloudPath = (x: number, y: number, s: number) =>
  `M${x} ${y}a${18 * s} ${18 * s} 0 0 1 ${34 * s} ${-8 * s}a${14 * s} ${14 * s} 0 0 1 ${24 * s} ${10 * s}h${-58 * s}z`

// raindrops fall over the right part of the scene, where the clouds are (fixed spread, so they don't jump)
const drops = computed(() => {
  const n = sky.value.rain
  const x0 = look.value.x - 900
  return Array.from({ length: n }, (_, i): [number, number, number, number] => {
    const r = (k: number) => ((Math.sin((i + 1) * k) * 10000) % 1 + 1) % 1
    return [x0 + r(12.9898) * 1060, 112 + r(78.233) * 50, 10 + r(3.7) * 8, r(5.1) * 1.2]
  })
})

const fogBands: [number, number, number, number][] = [
  [700, 70, 520, 0.55], [980, 96, 600, 0.6], [820, 122, 700, 0.5], [1100, 146, 480, 0.55], [600, 158, 640, 0.45],
]

const stars: [number, number, number][] = [
  [720, 60, 1.6], [800, 110, 1.2], [880, 50, 1.8], [960, 90, 1.3], [1040, 46, 1.5], [1110, 120, 1.2], [1180, 64, 1.9],
  [1250, 124, 1.3], [1300, 48, 1.4], [1490, 50, 1.7], [1530, 116, 1.3], [1570, 72, 1.5], [1220, 96, 1.1], [1330, 128, 1.2],
]
</script>

<style scoped>
.day-rays { animation: day-turn 60s linear infinite; }
.day-clouds { animation: day-drift 14s ease-in-out infinite alternate; }
.day-haze { animation: day-drift 18s ease-in-out infinite alternate; }
.day-twinkle { animation: day-twinkle 3.5s ease-in-out infinite; }
.day-drop { animation-name: day-fall; animation-timing-function: linear; animation-iteration-count: infinite; }
.day-flash { opacity: 0; animation: day-flash 7s infinite; }
.day-bolt { opacity: 0; animation: day-flash 7s infinite; }
.day-label { font: 600 21px/1 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif; }
@keyframes day-turn { to { transform: rotate(360deg); } }
@keyframes day-drift { to { transform: translateX(-24px); } }
@keyframes day-twinkle { 50% { opacity: 0.35; } }
@keyframes day-fall {
  from { transform: translate(0, -24px); opacity: 0; }
  15% { opacity: 0.85; }
  to { transform: translate(-14px, 70px); opacity: 0; }
}
@keyframes day-flash {
  0%, 88%, 92%, 100% { opacity: 0; }
  89% { opacity: 0.55; }
  90% { opacity: 0.1; }
  91% { opacity: 0.4; }
}
@media (prefers-reduced-motion: reduce) {
  .day-rays, .day-clouds, .day-haze, .day-twinkle, .day-drop, .day-flash, .day-bolt { animation: none; }
  .day-drop { opacity: 0.6; }
}
</style>
