<!--
  A connection point on a piece of circuit apparatus. Must be placed inside a parent <svg>. The
  parent owns all drag/connect state (a terminal only reports pointer events); this keeps the
  primitive reusable for any two-terminal (or more) apparatus, not just circuit components.
-->
<template>
  <g
    class="cursor-pointer"
    @pointerdown="$emit('pointerdown', $event)"
    @pointerenter="$emit('pointerenter')"
    @pointerleave="$emit('pointerleave')"
    @click.stop
  >
    <!-- Oversized, invisible hit-area so touch users don't need pixel-perfect precision. -->
    <circle :cx="x" :cy="y" r="14" fill="transparent" />
    <circle
      :cx="x" :cy="y" :r="active ? 7 : 5.5"
      :fill="color"
      :stroke="active ? '#4f46e5' : '#1e293b'"
      :stroke-width="active ? 2.5 : 1.5"
      class="transition-all"
    />
  </g>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  x: number
  y: number
  /** Highlighted as a valid/selected target - larger, indigo ring. */
  active?: boolean
  connected?: boolean
}>(), { active: false, connected: false })

defineEmits<{ pointerdown: [PointerEvent]; pointerenter: []; pointerleave: [] }>()

const color = computed(() => (props.connected ? '#16a34a' : '#71717a'))
</script>
