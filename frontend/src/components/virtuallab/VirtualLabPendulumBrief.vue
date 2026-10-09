<template>
  <VirtualLabPracticalBrief
    :introduction="introduction"
    :aim="objective || 'To determine the acceleration due to gravity, g, using a simple pendulum.'"
    hypothesis="The period T of a simple pendulum depends only on its length L: T = 2π√(L/g). So T² is directly proportional to L, and a graph of T² against L is a straight line through the origin with gradient 4π²/g."
    hypothesis-note="This is a prediction to test. Your own timings and graph decide whether T² really is proportional to L, and what value of g they give."
    :variables="{
      independent: 'Length of the pendulum, L (from the point of suspension to the centre of the bob)',
      dependent: 'Period, T (the time for one complete oscillation)',
      controlled: 'The same bob, a small angle of swing (less than about 10°), and the same number of oscillations timed (10)',
      note: 'Timing 10 oscillations and dividing by 10 makes the reaction-time error in each period ten times smaller than timing one swing.',
    }"
    :apparatus="APPARATUS"
    :setup-points="SETUP_POINTS"
    :procedure="PROCEDURE"
  >
    <template #diagram>
      <svg viewBox="0 0 520 280" class="w-full h-auto rounded-xl bg-white border border-gray-200 dark:border-gray-700" role="img" aria-label="Set-up: a pendulum bob hanging on a thread from a clamp on a retort stand, with its length L marked and a small angle of swing">
        <!-- retort stand and clamp -->
        <rect x="40" y="250" width="150" height="12" rx="3" fill="#334155" />
        <rect x="70" y="30" width="8" height="222" fill="#64748b" />
        <rect x="70" y="40" width="180" height="8" fill="#64748b" />
        <rect x="244" y="34" width="22" height="20" rx="3" fill="#475569" />
        <!-- thread and bob (rest position), and the bob at the end of a small swing -->
        <line x1="255" y1="54" x2="255" y2="196" stroke="#0f172a" stroke-width="1.6" />
        <circle cx="255" cy="206" r="11" fill="#b45309" stroke="#78350f" stroke-width="1.5" />
        <line x1="255" y1="54" x2="300" y2="188" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4 3" />
        <circle cx="303" cy="198" r="11" fill="#fcd34d" opacity="0.55" stroke="#b45309" stroke-dasharray="3 2" />
        <path d="M255 96 A42 42 0 0 0 269 94" fill="none" stroke="#2563eb" stroke-width="1.5" />
        <path d="M222 214 Q255 232 290 214" fill="none" stroke="#16a34a" stroke-width="1.5" />
        <path d="M290 214 l-8 -1 l4 7 z" fill="#16a34a" />
        <!-- L, from the point of suspension to the centre of the bob -->
        <line x1="215" y1="54" x2="215" y2="206" stroke="#dc2626" stroke-width="1.5" />
        <path d="M215 54 l-4 8 h8 z M215 206 l-4 -8 h8 z" fill="#dc2626" />
        <line x1="208" y1="54" x2="244" y2="54" stroke="#dc2626" stroke-width="1" stroke-dasharray="3 2" />
        <line x1="208" y1="206" x2="244" y2="206" stroke="#dc2626" stroke-width="1" stroke-dasharray="3 2" />
        <!-- stopwatch -->
        <circle cx="430" cy="150" r="34" fill="#f8fafc" stroke="#0f172a" stroke-width="3" />
        <rect x="424" y="106" width="12" height="10" rx="2" fill="#0f172a" />
        <line x1="430" y1="150" x2="430" y2="126" stroke="#dc2626" stroke-width="2.5" />
        <line x1="430" y1="150" x2="446" y2="158" stroke="#0f172a" stroke-width="2" />
        <g font-family="sans-serif" font-weight="700" text-anchor="middle" fill="#0f172a">
          <text x="200" y="134" font-size="14" fill="#dc2626">L</text>
          <text x="272" y="82" font-size="11" fill="#2563eb">&lt; 10°</text>
          <text x="255" y="248" font-size="11" fill="#16a34a">one oscillation = there and back</text>
          <text x="255" y="22" font-size="11">clamp (point of suspension)</text>
          <text x="232" y="232" font-size="11">bob</text>
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

const APPARATUS = ['Retort stand with a clamp', 'Pendulum bob on a light thread', 'Metre rule (ruler)', 'Stopwatch']
const SETUP_POINTS = [
  'The thread is held firmly in the clamp, so the point of suspension does not move.',
  'L is measured from the point of suspension to the centre of the bob.',
  'The bob swings freely through a small angle - less than about 10° - in one plane, without touching the stand.',
  'One oscillation is a complete swing there and back, timed from the centre of the swing.',
]
const PROCEDURE = [
  'Hang the bob from the clamp and measure the length L of the pendulum with the ruler.',
  'Pull the bob aside through a small angle and release it; start the stopwatch as it passes the centre.',
  'Count 10 complete oscillations and stop the stopwatch; read the time t.',
  'Work out the period: T = t / 10, and then T².',
  'Change the length and repeat - take readings for at least three different lengths.',
  'Record L, t, T and T² in a table.',
  'Plot a graph of T² (y-axis) against L (x-axis) and draw the line of best fit.',
  'Find the gradient of the line; then g = 4π² / gradient.',
]
</script>
