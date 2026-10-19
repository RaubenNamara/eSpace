<template>
  <VirtualLabPracticalBrief
    :introduction="introduction"
    :aim="objective || 'To investigate how the range of a projectile depends on its angle of projection.'"
    task="Fire a ball from the launcher at the same speed but at different angles of projection, measure how far it lands each time, and find the angle that gives the greatest range."
    hypothesis="For the same launch speed, the range increases with the angle of projection up to 45°, where it is greatest, and then decreases. Angles that add up to 90° (such as 30° and 60°) give the same range, because R = u² sin 2θ / g and sin 2θ is the same for both."
    hypothesis-note="This is a prediction to test. Your own measured ranges decide the answer."
    :theory="[
      'A projectile moves horizontally at a steady speed (u cos θ) while gravity changes its vertical motion (it rises, slows, stops and falls).',
      'Launched and landing at the same height, its range is R = u² sin 2θ / g, where u is the launch speed, θ the angle of projection and g = 9.8 m/s².',
      'sin 2θ is largest (1) when 2θ = 90°, i.e. θ = 45°; and sin 2θ is the same for θ and (90° − θ).',
    ]"
    :variables="{
      independent: 'Angle of projection, θ',
      dependent: 'Range, R (horizontal distance from the launcher to where the ball lands)',
      controlled: 'Launch speed (10 m/s), height of the launcher, the same ball',
      note: 'Measure the range along the ground, from the launcher to where the ball first lands.',
    }"
    :apparatus="APPARATUS"
    :setup-points="SETUP_POINTS"
    :procedure="PROCEDURE"
  >
    <template #diagram>
      <svg viewBox="0 0 520 240" class="w-full h-auto rounded-xl bg-white border border-gray-200 dark:border-gray-700" role="img" aria-label="Set-up: a launcher at an angle of projection theta fires a ball along a curved path; the range R is measured along the ground with a measuring tape">
        <rect x="0" y="196" width="520" height="44" fill="#bbf7d0" />
        <line x1="0" y1="196" x2="520" y2="196" stroke="#15803d" stroke-width="1.5" />
        <!-- launcher -->
        <rect x="30" y="182" width="50" height="14" rx="2" fill="#374151" />
        <g transform="rotate(-40 55 182)"><rect x="55" y="176" width="52" height="12" rx="3" fill="#1d4ed8" /></g>
        <path d="M 95 182 A 40 40 0 0 0 85.6 156.3" fill="none" stroke="#f97316" stroke-width="2" />
        <text x="100" y="172" font-size="14" font-weight="700" fill="#f97316">θ</text>
        <!-- path -->
        <path d="M 95 149 Q 260 -30 430 196" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="7 5" />
        <circle cx="430" cy="190" r="6" fill="#dc2626" />
        <text x="220" y="40" font-size="12" fill="#475569">path of the ball</text>
        <!-- measuring tape and R -->
        <rect x="55" y="204" width="400" height="10" fill="#facc15" stroke="#a16207" stroke-width="0.8" />
        <g stroke="#1f2937"><line v-for="k in 21" :key="k" :x1="55 + (k - 1) * 20" y1="204" :x2="55 + (k - 1) * 20" :y2="(k - 1) % 5 === 0 ? 214 : 209" /></g>
        <g fill="#2563eb"><path d="M55 228 l8 -4 v8 z M430 228 l-8 -4 v8 z" /></g>
        <line x1="59" y1="228" x2="426" y2="228" stroke="#2563eb" stroke-width="1.5" />
        <text x="240" y="224" font-size="14" font-weight="700" fill="#2563eb" text-anchor="middle">R</text>
        <text x="55" y="176" font-size="11" fill="#111827" text-anchor="middle">launcher</text>
        <text x="470" y="186" font-size="11" fill="#111827">landing</text>
      </svg>
    </template>
  </VirtualLabPracticalBrief>
</template>

<script setup lang="ts">
import VirtualLabPracticalBrief from './VirtualLabPracticalBrief.vue'

defineProps<{ introduction?: string | null; objective?: string | null }>()

const APPARATUS = ['Projectile launcher with a clear protractor and pointer for the angle', 'Projectile ball', '30 m measuring tape']
const SETUP_POINTS = [
  'The launcher stands at the start of the measuring tape, which runs along the ground in the direction of firing.',
  'The launch speed is fixed at 10 m/s; only the angle of projection θ is changed.',
  'The range R is the horizontal distance from the launcher to where the ball first lands.',
]
const PROCEDURE = [
  'Place the launcher and lay the measuring tape along the ground from it.',
  'Set the angle of projection to 15°, reading it where the red pointer crosses the protractor on the launcher.',
  'Fire the ball and watch where it lands.',
  'Measure the range R from the launcher to where the ball landed, and record it.',
  'Repeat for angles of 30°, 45°, 60° and 75°.',
  'Record θ and R in a table.',
  'Use your table to answer the questions, then state how the range depends on the angle of projection.',
]
</script>
