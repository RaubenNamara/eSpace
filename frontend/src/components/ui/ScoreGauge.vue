<template>
  <!-- A half-circle meter from red through amber to green, with a needle at `value` (0-100) -->
  <svg viewBox="0 0 120 70" role="img" :aria-label="label">
    <defs>
      <linearGradient :id="gradId" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stop-color="#dc2626" />
        <stop offset="45%" stop-color="#f59e0b" />
        <stop offset="100%" stop-color="#15874a" />
      </linearGradient>
    </defs>
    <path d="M12 62 A48 48 0 0 1 108 62" fill="none" :stroke="`url(#${gradId})`" stroke-width="10" stroke-linecap="round" />
    <g :style="{ transform: `rotate(${angle}deg)`, transformOrigin: '60px 62px', transition: 'transform 1s cubic-bezier(.3,1.4,.5,1)' }">
      <path d="M60 62 L57 60 L60 22 L63 60 Z" class="fill-gray-900 dark:fill-white" />
    </g>
    <circle cx="60" cy="62" r="5" class="fill-gray-900 dark:fill-white" />
    <text x="12" y="70" font-size="7" class="fill-gray-400">Low</text>
    <text x="108" y="70" font-size="7" text-anchor="end" class="fill-gray-400">High</text>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ value: number; label?: string }>()
const gradId = `gauge-${Math.random().toString(36).slice(2, 8)}`
const angle = computed(() => -90 + (Math.min(100, Math.max(0, props.value)) / 100) * 180)
</script>
