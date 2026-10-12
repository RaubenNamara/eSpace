<template>
  <VirtualLabPracticalBrief
    :introduction="introduction"
    :aim="objective || 'To determine the mass of a metre rule using the principle of moments.'"
    task="Carry out a scientific investigation on the metre rule provided that can help the laboratory assistant to measure the masses of the metre rules."
    hypothesis="When the rule balances on the pivot, the moment of the 100 g mass equals the moment of the rule's own weight acting at its centre of gravity C: 100 x = M z. So x = (M / 100) z, and a graph of x against z is a straight line through the origin whose gradient is M / 100."
    hypothesis-note="This is a prediction to test. Your own balance points and graph decide whether the points lie on a straight line, and what the mass M of the rule is."
    :theory="[
      'Principle of moments: for a body in equilibrium, the sum of clockwise moments about a point equals the sum of anticlockwise moments about that point (F₁ × d₁ = F₂ × d₂).',
      'The whole weight of the metre rule acts at its centre of gravity C - the point where the rule balances when suspended alone.',
      'x is the distance from the pivot to the 100 g mass and z the distance from the pivot to C, so 100 x = M z.',
    ]"
    :variables="{
      independent: 'Position of the 100 g mass, a (and so its distance x from the pivot)',
      dependent: 'Balance point P (and so the distance z from the pivot to C)',
      controlled: 'The same metre rule and 100 g mass, its centre of gravity C, and the rule balanced level each time',
      note: 'Read every position from the metre rule\'s own scale: C and P where the thread loop is, a where the mass\'s thread is.',
    }"
    :apparatus="APPARATUS"
    :setup-points="SETUP_POINTS"
    :procedure="PROCEDURE"
  >
    <template #diagram>
      <svg viewBox="0 0 520 270" class="w-full h-auto rounded-xl bg-white border border-gray-200 dark:border-gray-700" role="img" aria-label="Set-up: a metre rule hung by a thread loop from a retort stand clamp; the 100 g mass hangs at distance x on one side of the pivot and the centre of gravity C is at distance z on the other">
        <!-- retort stand -->
        <rect x="430" y="248" width="84" height="10" rx="2" fill="#374151" />
        <rect x="478" y="30" width="7" height="220" fill="#6b7280" />
        <rect x="196" y="32" width="290" height="6" rx="2" fill="#6b7280" />
        <rect x="470" y="26" width="22" height="16" rx="2" fill="#374151" />
        <!-- thread loop at the pivot P -->
        <line x1="200" y1="38" x2="200" y2="108" stroke="#334155" stroke-width="1.5" />
        <ellipse cx="200" cy="112" rx="5" ry="9" fill="none" stroke="#334155" stroke-width="1.5" />
        <!-- metre rule, 0 cm on the left -->
        <rect x="40" y="108" width="420" height="14" rx="2" fill="#f2d39a" stroke="#c8955a" />
        <g stroke="#1f2937" stroke-width="1"><line v-for="i in 43" :key="i" :x1="40 + (i - 1) * 10" y1="108" :x2="40 + (i - 1) * 10" :y2="(i - 1) % 5 === 0 ? 117 : 113" /></g>
        <!-- C, the centre of gravity, and the rule's weight there -->
        <circle cx="250" cy="115" r="3.5" fill="#dc2626" />
        <line x1="250" y1="122" x2="250" y2="168" stroke="#dc2626" stroke-width="1.5" />
        <path d="M250 172 l-4 -8 h8 z" fill="#dc2626" />
        <!-- 100 g mass at a, on a thread -->
        <line x1="110" y1="122" x2="110" y2="160" stroke="#334155" stroke-width="1.5" />
        <path d="M110 160 v6 a4 4 0 1 1 -4 4" fill="none" stroke="#475569" stroke-width="2" />
        <rect x="93" y="176" width="34" height="22" rx="3" fill="#94a3b8" stroke="#475569" />
        <!-- x and z from the pivot -->
        <line x1="200" y1="88" x2="200" y2="102" stroke="#334155" stroke-width="1" />
        <g fill="#2563eb"><path d="M110 92 l8 -4 v8 z M196 92 l-8 -4 v8 z" /></g>
        <line x1="114" y1="92" x2="192" y2="92" stroke="#2563eb" stroke-width="1.5" />
        <g fill="#16a34a"><path d="M204 140 l8 -4 v8 z M246 140 l-8 -4 v8 z" /></g>
        <line x1="208" y1="140" x2="242" y2="140" stroke="#16a34a" stroke-width="1.5" />
        <g font-family="sans-serif" font-weight="700" text-anchor="middle">
          <text x="153" y="86" font-size="13" fill="#2563eb">x</text>
          <text x="225" y="157" font-size="13" fill="#16a34a">z</text>
          <text x="262" y="104" font-size="12" fill="#dc2626">C</text>
          <text x="214" y="104" font-size="12" fill="#0f172a">P</text>
          <text x="250" y="188" font-size="10" fill="#dc2626">W = Mg</text>
          <text x="110" y="214" font-size="11" fill="#0f172a">100 g</text>
          <text x="40" y="138" font-size="10" fill="#0f172a">0 cm</text>
          <text x="455" y="138" font-size="10" fill="#0f172a">100 cm</text>
          <text x="470" y="18" font-size="11" fill="#0f172a">retort stand</text>
        </g>
      </svg>
    </template>
  </VirtualLabPracticalBrief>
</template>

<script setup lang="ts">
import VirtualLabPracticalBrief from './VirtualLabPracticalBrief.vue'

defineProps<{ introduction?: string | null; objective?: string | null }>()

const APPARATUS = ['1 metre rule', '1 mass of 100 g (on a mass hanger)', '1 retort stand with a clamp', '1 piece of thread, about 50 cm long']
const SETUP_POINTS = [
  'The metre rule hangs from the clamp of the retort stand by a thread loop - the loop is the pivot P, and the rule can slide through it.',
  'With nothing else on it, the rule balances at its centre of gravity C.',
  'The 100 g mass hangs from a thread at a mark a near the 0 cm end, on one side of the pivot; C is on the other side.',
  'x = P − a is the distance from the pivot to the mass; z = C − P is the distance from the pivot to C.',
]
const PROCEDURE = [
  'Set up the retort stand and hang the metre rule from the clamp by the thread loop.',
  'With nothing else on the rule, slide it through the loop until it balances level. Record this balance point C, the centre of gravity of the rule.',
  'Hang the 100 g mass from a thread at the 10.0 cm mark.',
  'Slide the rule through the loop until it balances level again, and record the position of the pivot P.',
  'Repeat with the mass at the 15.0, 20.0, 25.0 and 30.0 cm marks.',
  'Record a and P in a table, and work out x = P − a and z = C − P for each.',
  'Plot a graph of x (y-axis) against z (x-axis) and draw the line of best fit.',
  'Find the gradient s of the line and calculate the mass of the metre rule: M = 100 s (grams).',
]
</script>
