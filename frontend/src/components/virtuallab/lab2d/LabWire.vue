<!-- A clean curved wire between two terminals - never a straight line with ambiguous endpoints.
     Must be placed inside a parent <svg>. Clicking it asks the parent to remove it. -->
<template>
  <g class="cursor-pointer" @click="$emit('remove')">
    <path :d="pathD" fill="none" stroke="#0f172a" stroke-width="8" opacity="0" />
    <path :d="pathD" fill="none" :stroke="color" stroke-width="3" stroke-linecap="round" />
  </g>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  x1: number
  y1: number
  x2: number
  y2: number
  color?: string
}>(), { color: '#dc2626' })

defineEmits<{ remove: [] }>()

// A single quadratic bezier, bowed perpendicular to the line so parallel/overlapping wires stay
// visually distinguishable instead of stacking as straight overlapping lines.
const pathD = computed(() => {
  const mx = (props.x1 + props.x2) / 2
  const my = (props.y1 + props.y2) / 2
  const dx = props.x2 - props.x1
  const dy = props.y2 - props.y1
  const len = Math.max(1, Math.hypot(dx, dy))
  const bow = Math.min(40, len * 0.18)
  const cx = mx - (dy / len) * bow
  const cy = my + (dx / len) * bow
  return `M ${props.x1} ${props.y1} Q ${cx} ${cy} ${props.x2} ${props.y2}`
})
</script>
