<template>
  <VirtualLabPracticalBrief
    :introduction="introduction"
    :aim="objective || 'To determine the relative density of metal samples by spring extension.'"
    task="Find the relative density and the density of each sample M1 to M6, and advise your friends which ones, if any, could be pure silver (10 200 to 10 500 kg/m³)."
    hypothesis="The extension in air, e_a, is proportional to the sample's weight. In water the upthrust (the weight of water displaced) reduces it to e_w, so e_a - e_w is proportional to the sample's volume. So R.D. = e_a / (e_a - e_w), and only samples with R.D. between 10.2 and 10.5 can be pure silver."
    hypothesis-note="This is a prediction to test. All six samples have the same mass, so your readings in water decide which ones are denser, and whether any match silver."
    :theory="[
      'Archimedes\' principle: a body fully immersed in a fluid experiences an upthrust equal to the weight of the fluid it displaces.',
      'Relative density = weight in air / loss of weight in water = e_a / (e_a - e_w), since the spring\'s extension is proportional to the force on it (Hooke\'s law).',
      'Density = R.D. × density of water = 1000 × R.D. (kg/m³).',
    ]"
    :variables="{
      independent: 'The metal sample, M1 to M6 (all 100 g)',
      dependent: 'The pointer reading in water, giving the extension e_w (and so the relative density)',
      controlled: 'The same spring and its reference reading, the same 100 g mass, the same water, and each sample fully immersed without touching the beaker',
      note: 'Take every reading only after the pointer stops moving, and read the rule at eye level with the pointer.',
    }"
    :apparatus="APPARATUS"
    :setup-points="SETUP_POINTS"
    :procedure="PROCEDURE"
  >
    <template #diagram>
      <svg viewBox="0 0 520 280" class="w-full h-auto rounded-xl bg-white border border-gray-200 dark:border-gray-700" role="img" aria-label="Set-up: a spring with a pointer hung from a retort stand beside a vertical rule; the metal sample hangs on a thread, first in air and then fully immersed in a beaker of water">
        <g v-for="p in PANELS" :key="p.label">
          <!-- retort stand -->
          <rect :x="p.cx - 96" y="258" width="70" height="9" rx="2" fill="#374151" />
          <rect :x="p.cx - 86" y="26" width="7" height="234" fill="#6b7280" />
          <rect :x="p.cx - 86" y="28" width="90" height="6" rx="2" fill="#6b7280" />
          <!-- spring, pointer and the hanging thread -->
          <path :d="springPath(p.cx, 34, p.pointerY)" fill="none" stroke="#475569" stroke-width="2" />
          <line :x1="p.cx" :y1="p.pointerY" :x2="p.cx + 44" :y2="p.pointerY" stroke="#dc2626" stroke-width="2" />
          <path :d="`M${p.cx + 44} ${p.pointerY} l-6 -3 v6 z`" fill="#dc2626" />
          <line :x1="p.cx" :y1="p.pointerY" :x2="p.cx" :y2="p.sampleY" stroke="#334155" stroke-width="1.3" />
          <!-- vertical rule beside the pointer -->
          <rect :x="p.cx + 46" y="34" width="14" height="150" fill="#f2d39a" stroke="#c8955a" />
          <g stroke="#1f2937" stroke-width="1"><line v-for="i in 31" :key="i" :x1="p.cx + 46" :y1="34 + (i - 1) * 5" :x2="p.cx + ((i - 1) % 5 === 0 ? 55 : 51)" :y2="34 + (i - 1) * 5" /></g>
          <!-- reference (unloaded) pointer position and the extension -->
          <line :x1="p.cx - 16" :y1="REF_Y" :x2="p.cx + 46" :y2="REF_Y" stroke="#64748b" stroke-width="1" stroke-dasharray="3 2" />
          <line :x1="p.cx + 70" :y1="REF_Y" :x2="p.cx + 70" :y2="p.pointerY" :stroke="p.color" stroke-width="1.5" />
          <path :d="`M${p.cx + 70} ${REF_Y} l-3 6 h6 z M${p.cx + 70} ${p.pointerY} l-3 -6 h6 z`" :fill="p.color" />
          <!-- beaker of water -->
          <path :d="`M${p.cx - 34} 186 v62 q0 8 8 8 h52 q8 0 8 -8 v-62`" fill="none" stroke="#64748b" stroke-width="2" />
          <rect :x="p.cx - 33" y="200" width="66" height="55" rx="6" fill="#bae6fd" fill-opacity="0.6" />
          <!-- the metal sample -->
          <rect :x="p.cx - 11" :y="p.sampleY" width="22" height="18" rx="2" fill="#cbd5e1" stroke="#475569" stroke-width="1.5" />
          <g font-family="sans-serif" font-weight="700" text-anchor="middle">
            <text :x="p.cx + 86" :y="(REF_Y + p.pointerY) / 2 + 4" font-size="12" :fill="p.color">{{ p.ext }}</text>
            <text :x="p.cx - 20" y="16" font-size="12" fill="#0f172a">{{ p.label }}</text>
          </g>
        </g>
        <g font-family="sans-serif" font-size="9" fill="#64748b" text-anchor="middle">
          <text x="102" y="75" text-anchor="end">reference</text>
          <text x="342" y="75" text-anchor="end">reference</text>
          <text x="120" y="180">sample (100 g)</text>
          <text x="360" y="276">fully under water</text>
        </g>
      </svg>
    </template>
  </VirtualLabPracticalBrief>
</template>

<script setup lang="ts">
import VirtualLabPracticalBrief from './VirtualLabPracticalBrief.vue'

defineProps<{ introduction?: string | null; objective?: string | null }>()

// Unloaded pointer position, and each panel's spring end / sample position: the sample hangs
// above the beaker in air, then lower and fully under water - where the upthrust shortens the spring
const REF_Y = 72
const PANELS = [
  { label: '(a) In air', cx: 120, pointerY: 120, sampleY: 150, ext: 'e_a', color: '#2563eb' },
  { label: '(b) In water', cx: 360, pointerY: 104, sampleY: 222, ext: 'e_w', color: '#16a34a' },
]
// A zigzag coil from the clamp (top) down to the pointer (bottom)
const springPath = (cx: number, top: number, bottom: number) => {
  const turns = 9
  const step = (bottom - top - 8) / (turns * 2)
  let d = `M${cx} ${top} v4`
  for (let i = 0; i < turns * 2; i++) d += ` l${i % 2 ? -12 : 12} ${step}`
  return d + ` L${cx} ${bottom}`
}

const APPARATUS = [
  'Retort stand with a clamp', 'Spring with a pointer', 'Metre rule (held upright beside the pointer)',
  'Thread', 'Beaker of water', 'Six metal samples, M1 to M6, each of mass 100 g',
]
const SETUP_POINTS = [
  'The spring hangs from the clamp of the retort stand, with its pointer against an upright metre rule.',
  'With nothing attached, the pointer\'s position is the reference reading.',
  'Each sample hangs from the spring on a thread, first in air just above the beaker.',
  'The sample is then lowered until it is completely under water, without touching the sides or bottom of the beaker.',
  'e_a = reading in air - reference; e_w = reading in water - reference.',
]
const PROCEDURE = [
  'Set up the retort stand, hang the spring from the clamp, and stand the metre rule upright beside the pointer.',
  'With nothing on the spring, record the pointer position as the reference reading.',
  'Hang sample M1 on the spring\'s thread just above the beaker; when the pointer stops moving, record the reading in air.',
  'Lower M1 until it is completely under water without touching the beaker; when the pointer settles, record the reading in water.',
  'Remove M1 and repeat the readings in air and in water for M2, M3, M4, M5 and M6.',
  'For each sample, calculate e_a = air reading - reference and e_w = water reading - reference.',
  'Calculate the relative density R.D. = e_a / (e_a - e_w), and the density = 1000 × R.D. (kg/m³).',
  'Plot the density of each sample against its sample number, and compare with pure silver (10 200 to 10 500 kg/m³).',
]
</script>
