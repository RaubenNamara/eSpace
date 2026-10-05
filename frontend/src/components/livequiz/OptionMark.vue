<template>
  <!-- The letter-and-shape mark of a Live Quiz answer (A triangle, B diamond, C circle, D square),
       so options can be told apart by shape as well as colour - from the back of the class too -->
  <span class="inline-flex items-center justify-center rounded-lg text-white font-extrabold flex-shrink-0" :class="[OPTION_TONES[index % 4].solid, size === 'lg' ? 'w-12 h-12 text-lg' : 'w-9 h-9 text-sm']">
    <svg :class="size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path :d="SHAPES[index % 4]" /></svg>
    <span class="sr-only">{{ letter }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { OPTION_TONES } from './tones'

const props = withDefaults(defineProps<{ index: number; size?: 'md' | 'lg' }>(), { size: 'md' })
const SHAPES = [
  'M10 2l8.5 15h-17z', // triangle
  'M10 1.5l8.5 8.5-8.5 8.5-8.5-8.5z', // diamond
  'M10 2a8 8 0 100 16 8 8 0 000-16z', // circle
  'M3 3h14v14H3z' // square
]
const letter = computed(() => 'ABCDEFGH'[props.index] ?? '')
</script>
