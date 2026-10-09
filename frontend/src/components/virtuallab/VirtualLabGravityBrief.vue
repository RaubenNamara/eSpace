<template>
  <VirtualLabPracticalBrief
    :introduction="introduction"
    task="As a Physics learner, use the experimental setup to carry out a scientific investigation and determine the acceleration due to gravity. Use your experimental results to verify whether the value of g is approximately 10 m/s²."
    :aim="objective || 'To determine the value of acceleration due to gravity, g, using a simple pendulum.'"
    hypothesis="The acceleration due to gravity is approximately 10 m/s²."
    hypothesis-note="This is the claim you are testing - you must determine g from your own measurements, not take it as given."
    :theory="THEORY"
    :variables="{
      independent: 'Length of the pendulum, l',
      dependent: 'Time for 20 oscillations, t; period, T; and T²',
      controlled: 'Mass of the bob, a small angle of displacement, the same bob, thread and retort stand, wind conditions and the timing method',
      note: 'Keep the amplitude (the angle of swing) small - below about 10° - because T = 2π√(l/g) is only true for small swings.',
    }"
    :apparatus="APPARATUS"
    :setup-points="SETUP_POINTS"
    :procedure="PROCEDURE"
  >
    <template #diagram>
      <svg viewBox="0 0 520 280" class="w-full h-auto rounded-xl bg-white border border-gray-200 dark:border-gray-700" role="img" aria-label="Set-up: pendulum bob on a thread from a clamp on a retort stand, metre rule beside it, l measured from the point of suspension to the centre of the bob, stopwatch">
        <rect x="40" y="250" width="150" height="12" rx="3" fill="#334155" />
        <rect x="70" y="30" width="8" height="222" fill="#64748b" />
        <rect x="70" y="40" width="180" height="8" fill="#64748b" />
        <rect x="244" y="34" width="22" height="20" rx="3" fill="#475569" />
        <rect x="290" y="54" width="16" height="170" fill="#facc15" stroke="#a16207" />
        <g stroke="#1f2937" stroke-width="1"><line v-for="i in 17" :key="i" x1="290" :x2="(i - 1) % 5 === 0 ? 300 : 295" :y1="54 + (i - 1) * 10" :y2="54 + (i - 1) * 10" /></g>
        <line x1="255" y1="54" x2="255" y2="196" stroke="#0f172a" stroke-width="1.6" />
        <circle cx="255" cy="206" r="11" fill="#b45309" stroke="#78350f" stroke-width="1.5" />
        <circle cx="255" cy="206" r="2" fill="#fff" />
        <line x1="255" y1="54" x2="232" y2="190" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4 3" />
        <path d="M255 92 A38 38 0 0 1 248 91" fill="none" stroke="#2563eb" stroke-width="1.5" />
        <line x1="215" y1="54" x2="215" y2="206" stroke="#dc2626" stroke-width="1.5" />
        <path d="M215 54 l-4 8 h8 z M215 206 l-4 -8 h8 z" fill="#dc2626" />
        <line x1="208" y1="54" x2="250" y2="54" stroke="#dc2626" stroke-width="1" stroke-dasharray="3 2" />
        <line x1="208" y1="206" x2="252" y2="206" stroke="#dc2626" stroke-width="1" stroke-dasharray="3 2" />
        <circle cx="430" cy="150" r="34" fill="#f8fafc" stroke="#0f172a" stroke-width="3" />
        <rect x="424" y="106" width="12" height="10" rx="2" fill="#0f172a" />
        <text x="430" y="156" text-anchor="middle" font-family="monospace" font-size="15" font-weight="700" fill="#0f172a">0:00.00</text>
        <g font-family="sans-serif" font-weight="700" text-anchor="middle" fill="#0f172a">
          <text x="200" y="134" font-size="14" fill="#dc2626">l</text>
          <text x="236" y="80" font-size="11" fill="#2563eb">small θ</text>
          <text x="255" y="22" font-size="11">point of suspension (clamp)</text>
          <text x="255" y="236" font-size="11">bob - l is to its centre</text>
          <text x="330" y="140" font-size="11" transform="rotate(90 330 140)">metre rule</text>
          <text x="430" y="206" font-size="11">stopwatch</text>
          <text x="115" y="244" font-size="11">retort stand</text>
        </g>
      </svg>
    </template>
  </VirtualLabPracticalBrief>
</template>

<script setup lang="ts">
import VirtualLabPracticalBrief from './VirtualLabPracticalBrief.vue'

defineProps<{ introduction?: string | null; objective?: string | null }>()

const THEORY = [
  'For a simple pendulum swinging through a small angle: T² = (4π²/g) l, where T is the period (s), l the length (m) and g the acceleration due to gravity (m/s²).',
  'So a graph of T² against l is a straight line through the origin with gradient S = ΔT²/Δl = 4π²/g.',
  'Rearranging: g = 4π² / S.',
]
const APPARATUS = [
  'One piece of thread, about 110.0 cm', 'One pendulum bob', 'One metre rule', 'One retort stand with clamp',
  'One stopwatch / stop clock', 'Two small pieces of wood (to grip the thread in the clamp)',
]
const SETUP_POINTS = [
  'The bob hangs freely on the thread from the clamp of the retort stand.',
  'The metre rule stands beside the pendulum, reading down from the point of suspension.',
  'The length l is measured from the point of suspension to the centre of the bob - not to the top of the bob.',
  'The bob swings through a small angle in one vertical plane, and the stand stays still.',
  'One complete oscillation: from the starting position, through one complete swing and back to the starting position.',
]
const PROCEDURE = [
  'Suspend the pendulum bob from the retort stand using the thread.',
  'Position the metre rule beside the pendulum.',
  'Adjust the length to l = 0.100 m, measured from the point of suspension to the centre of the bob.',
  'Displace the bob sideways through a small angle.',
  'Release the bob gently, without giving it an extra push.',
  'Allow the oscillations to become regular.',
  'Start the stopwatch and count 20 complete oscillations.',
  'Stop the stopwatch immediately after the 20th oscillation.',
  'Record the time t for 20 oscillations.',
  'Calculate the period T = t / 20.',
  'Calculate T².',
  'Repeat for l = 0.200, 0.300, 0.400, 0.500 and 0.600 m.',
  'Record all the results in the table.',
  'Plot a graph of T² against l.',
  'Determine the gradient S.',
  'Calculate g = 4π² / S.',
  'Compare your value of g with 10 m/s².',
]
</script>
