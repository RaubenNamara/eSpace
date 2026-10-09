<template>
  <VirtualLabPracticalBrief
    :introduction="introduction"
    :aim="objective || 'To determine the mass of a bottle using the principle of moments.'"
    task="Find the mass of the sample bottle without a balance, then work out how much the boy earns for all 714 bottles at Ugx 25 per gram."
    hypothesis="When the rule balances level, the moment of the 50 g hanger about G equals the moment of the bottle: 50 × d = m × y. So d = (m / 50) × y, and a graph of d against y is a straight line through the origin whose gradient is m / 50."
    hypothesis-note="This is a prediction to test. Your own three balances and your graph decide whether the points lie on a straight line, and what the bottle's mass m is."
    :theory="[
      'Principle of moments: for a body in equilibrium, the sum of clockwise moments about a point equals the sum of anticlockwise moments about that point.',
      'Moment of a force = force × perpendicular distance from the pivot.',
      'The rule is uniform and hangs from its centre G (the 50 cm mark), so its own weight acts through the pivot and has no moment.',
    ]"
    :variables="{
      independent: 'Distance d of the 50 g hanger from G',
      dependent: 'Distance y of the bottle from G at which the rule balances level',
      controlled: 'The same 50 g hanger and the same bottle, the rule hung from its centre G (50 cm mark), and the rule balanced level each time',
      note: 'Measure both distances from G to the thread holding each load, and only read them once the rule has settled level.',
    }"
    :apparatus="APPARATUS"
    :setup-points="SETUP_POINTS"
    :procedure="PROCEDURE"
  >
    <template #diagram>
      <svg viewBox="0 0 520 270" class="w-full h-auto rounded-xl bg-white border border-gray-200 dark:border-gray-700" role="img" aria-label="Set-up: a metre rule hung at its centre G from a retort stand, the 50 g hanger hanging at distance d on one side and the bottle at distance y on the other">
        <!-- retort stand: base, rod, clamp arm -->
        <rect x="440" y="246" width="74" height="10" rx="2" fill="#374151" />
        <rect x="490" y="28" width="7" height="220" fill="#6b7280" />
        <rect x="256" y="30" width="238" height="6" rx="2" fill="#6b7280" />
        <rect x="482" y="24" width="20" height="16" rx="2" fill="#374151" />
        <!-- thread from the clamp to G -->
        <line x1="260" y1="36" x2="260" y2="104" stroke="#334155" stroke-width="1.5" />
        <!-- metre rule, level, hung at G -->
        <rect x="60" y="104" width="400" height="14" rx="2" fill="#f2d39a" stroke="#c8955a" />
        <g stroke="#1f2937" stroke-width="1"><line v-for="i in 41" :key="i" :x1="60 + (i - 1) * 10" y1="104" :x2="60 + (i - 1) * 10" :y2="(i - 1) % 5 === 0 ? 113 : 109" /></g>
        <circle cx="260" cy="104" r="3.5" fill="#dc2626" />
        <!-- 50 g hanger on the left at distance d -->
        <line x1="140" y1="118" x2="140" y2="150" stroke="#334155" stroke-width="1.5" />
        <path d="M140 150 v8 a4 4 0 1 1 -4 4" fill="none" stroke="#475569" stroke-width="2" />
        <line x1="140" y1="166" x2="140" y2="200" stroke="#475569" stroke-width="2" />
        <rect x="124" y="176" width="32" height="8" rx="1.5" fill="#94a3b8" stroke="#475569" />
        <rect x="124" y="186" width="32" height="8" rx="1.5" fill="#94a3b8" stroke="#475569" />
        <rect x="120" y="198" width="40" height="5" rx="1.5" fill="#64748b" />
        <!-- bottle on the right at distance y, tied at the neck -->
        <line x1="370" y1="118" x2="370" y2="148" stroke="#334155" stroke-width="1.5" />
        <rect x="364" y="148" width="12" height="7" rx="1.5" fill="#dc2626" />
        <path d="M366 155 h8 v10 q14 8 14 24 v40 q0 6 -6 6 h-24 q-6 0 -6 -6 v-40 q0 -16 14 -24 z" fill="#bae6fd" fill-opacity="0.7" stroke="#0284c7" stroke-width="1.5" />
        <rect x="353" y="196" width="34" height="14" fill="#16a34a" fill-opacity="0.75" />
        <!-- d and y from G -->
        <line x1="260" y1="90" x2="260" y2="98" stroke="#dc2626" stroke-width="1" />
        <g fill="#2563eb"><path d="M140 84 l8 -4 v8 z M260 84 l-8 -4 v8 z" /></g>
        <line x1="144" y1="84" x2="256" y2="84" stroke="#2563eb" stroke-width="1.5" />
        <g fill="#16a34a"><path d="M260 70 l8 -4 v8 z M370 70 l-8 -4 v8 z" /></g>
        <line x1="264" y1="70" x2="366" y2="70" stroke="#16a34a" stroke-width="1.5" />
        <g font-family="sans-serif" font-weight="700" text-anchor="middle">
          <text x="200" y="79" font-size="13" fill="#2563eb">d</text>
          <text x="315" y="65" font-size="13" fill="#16a34a">y</text>
          <text x="248" y="100" font-size="12" fill="#dc2626">G</text>
          <text x="140" y="222" font-size="11" fill="#0f172a">50 g hanger</text>
          <text x="370" y="254" font-size="11" fill="#0f172a">bottle (mass m)</text>
          <text x="470" y="20" font-size="11" fill="#0f172a">retort stand</text>
          <text x="262" y="134" font-size="9" font-weight="500" fill="#64748b">metre rule, hung at 50 cm</text>
        </g>
      </svg>
    </template>
  </VirtualLabPracticalBrief>
</template>

<script setup lang="ts">
import VirtualLabPracticalBrief from './VirtualLabPracticalBrief.vue'

defineProps<{ introduction?: string | null; objective?: string | null }>()

const APPARATUS = [
  'Metre rule', '50 g hanger', 'Retort stand with a clamp',
  'Two pieces of thread, about 30 cm each (plus a loop to hang the rule)', 'Empty plastic soft-drink bottle (the sample)',
]
const SETUP_POINTS = [
  'The metre rule hangs from the clamp of the retort stand by a thread loop at its centre G, the 50 cm mark, so it can turn freely.',
  'The 50 g hanger hangs from a thread on one side of G, and the bottle from a thread on the other side.',
  'd is the distance from G to the hanger\'s thread; y is the distance from G to the bottle\'s thread.',
  'Readings are taken only when the rule settles level.',
]
const PROCEDURE = [
  'Set up the retort stand on the bench and suspend the metre rule from the clamp by a thread at its centre G (the 50 cm mark), so it balances on its own.',
  'Tie the 50 g hanger to the rule with a thread on one side of G.',
  'Tie the bottle to the rule with the second thread on the other side of G.',
  'Slide the hanger and the bottle along the rule until the rule settles level.',
  'Measure the distance d of the hanger from G and the distance y of the bottle from G.',
  'Move the hanger to a new position, slide the bottle until the rule balances level again, and measure the new d and y.',
  'Repeat once more, so you have three pairs of d and y, and record them in a table.',
  'Plot a graph of d (y-axis) against y (x-axis) and draw the line of best fit through the origin.',
  'Find the gradient of the line and calculate the mass of the bottle: m = 50 × gradient (grams).',
]
</script>
