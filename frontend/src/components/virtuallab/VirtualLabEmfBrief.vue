<template>
  <VirtualLabPracticalBrief
    :introduction="introduction"
    task="Carry out a scientific investigation to determine the internal resistance and emf of the battery."
    :aim="objective || 'To determine the internal resistance and electromotive force (emf) of a battery.'"
    hypothesis="The battery has an internal resistance, so its terminal voltage V falls as the current I it supplies rises, following V = E - Ir."
    hypothesis-note="Test this with your own readings: the graph of V against I tells you both r and E."
    :theory="THEORY"
    :variables="{
      independent: 'Length of constantan wire, l (the external resistance)',
      dependent: 'Current, I, and terminal voltage, V',
      controlled: 'The same battery, constantan wire, ammeter, voltmeter and circuit; the same temperature as far as possible',
      note: 'A uniform wire has R ∝ l, so a longer wire means more external resistance, a smaller current and a terminal voltage closer to the emf.',
    }"
    :apparatus="APPARATUS"
    :setup-points="SETUP_POINTS"
    :procedure="PROCEDURE"
  >
    <template #diagram>
      <svg viewBox="0 0 520 270" class="w-full h-auto rounded-xl bg-white border border-gray-200 dark:border-gray-700" role="img" aria-label="Circuit: two cells, switch K, ammeter and constantan wire P in series, voltmeter across the cells">
        <g stroke="#0f172a" stroke-width="2" fill="none">
          <!-- loop: cells (top left) -> K -> ammeter -> wire P (bottom) -> back -->
          <path d="M60 80 H112 M128 80 H152 M168 80 H262 M298 80 H360 M396 80 H470 V200 H452 M268 200 H60 V80" />
          <line x1="112" y1="66" x2="112" y2="94" /><line x1="128" y1="73" x2="128" y2="87" stroke-width="4" />
          <line x1="152" y1="66" x2="152" y2="94" /><line x1="168" y1="73" x2="168" y2="87" stroke-width="4" />
          <circle cx="262" cy="80" r="3" fill="#0f172a" /><circle cx="298" cy="80" r="3" fill="#0f172a" />
          <line x1="262" y1="80" x2="294" y2="64" />
          <circle cx="378" cy="80" r="17" fill="#fff" />
          <!-- voltmeter across the cells -->
          <path d="M98 80 V30 H122 M158 30 H182 V80" />
          <circle cx="140" cy="30" r="17" fill="#fff" />
        </g>
        <line x1="268" y1="200" x2="452" y2="200" stroke="#64748b" stroke-width="2.5" />
        <rect x="262" y="210" width="200" height="14" rx="2" fill="#f2d39a" stroke="#c8955a" />
        <g stroke="#1f2937" stroke-width="1"><line v-for="i in 21" :key="i" :x1="262 + (i - 1) * 10" y1="210" :x2="262 + (i - 1) * 10" :y2="(i - 1) % 5 === 0 ? 218 : 215" /></g>
        <path d="M262 192 l6 8 l-6 8 M458 192 l-6 8 l6 8" stroke="#dc2626" stroke-width="3" fill="none" />
        <g fill="#dc2626"><path d="M268 240 l8 -4 v8 z M452 240 l-8 -4 v8 z" /></g>
        <line x1="272" y1="240" x2="448" y2="240" stroke="#dc2626" stroke-width="1.5" />
        <g font-family="sans-serif" font-weight="700" fill="#0f172a" text-anchor="middle">
          <text x="140" y="112" font-size="12">two dry cells</text>
          <text x="104" y="104" font-size="12">+</text><text x="175" y="104" font-size="13">&minus;</text>
          <text x="280" y="56" font-size="14">K</text>
          <text x="378" y="85" font-size="15">A</text>
          <text x="140" y="35" font-size="15">V</text>
          <text x="360" y="190" font-size="14">P</text>
          <text x="360" y="258" font-size="13" fill="#dc2626">l</text>
          <text x="200" y="18" font-size="10" font-weight="500" fill="#64748b">voltmeter across the battery: terminal voltage V</text>
        </g>
      </svg>
    </template>
  </VirtualLabPracticalBrief>
</template>

<script setup lang="ts">
import VirtualLabPracticalBrief from './VirtualLabPracticalBrief.vue'

defineProps<{ introduction?: string | null; objective?: string | null }>()

const THEORY = [
  'E = V + Ir, so V = E - Ir, which can be written V = -rI + E.',
  'Compare with y = mx + c: y = V, x = I, gradient m = -r and intercept c = E.',
  'So for a graph of V against I: gradient s = ΔV/ΔI = -r, giving r = -s; and the V-axis intercept is the emf E (at I = 0 the terminal voltage equals the emf).',
]
const APPARATUS = [
  'Two dry cells', 'Double cell holder', 'One switch (K)', 'Connecting wires, about 20 cm each', 'One metre rule',
  'Constantan wire, SWG 28, about 110 cm', 'Two pieces of Sellotape', 'Two crocodile clips', 'One voltmeter, range 0-3 V', 'One ammeter, range 0-1 A',
]
const SETUP_POINTS = [
  'The two cells (in the double holder), switch K, the ammeter and the constantan wire P are all in series.',
  'The voltmeter is connected across the battery terminals, so it measures the terminal voltage V.',
  'The ammeter, in series, measures the current I the battery supplies.',
  'Wire P is fixed along the metre rule with Sellotape; the two crocodile clips select its effective length l, which acts as the variable external resistance.',
]
const PROCEDURE = [
  'Set up the circuit as shown in the experimental setup.',
  'Fix the constantan wire along the metre rule using Sellotape.',
  'Connect the two crocodile clips to the constantan wire.',
  'Ensure the ammeter is connected in series.',
  'Connect the voltmeter across the battery terminals.',
  'Set the effective length of constantan wire to l = 10.0 cm.',
  'Close switch K.',
  'Allow the readings to stabilise.',
  'Read the ammeter and record the current I.',
  'Read the voltmeter and record the terminal voltage V.',
  'Open switch K after taking the readings.',
  'Change the length to 20.0 cm and repeat the measurement.',
  'Repeat the procedure for 30.0 cm, 40.0 cm and 50.0 cm.',
  'Record all readings in the results table.',
  'Plot a graph of V against I.',
  'Determine the gradient of the graph.',
  'Use r = -gradient to determine the internal resistance.',
  'Determine the V-axis intercept - it is the emf E of the battery.',
]
</script>
