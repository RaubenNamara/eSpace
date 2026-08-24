<!-- A small hover/selection tooltip showing an apparatus name and what's available on it - never
     all technical controls permanently, just what applies right now. Positioned absolutely; the
     parent is responsible for wrapping it in a relatively-positioned container. -->
<template>
  <div
    class="absolute z-10 pointer-events-none bg-gray-900/95 text-white text-[11px] rounded-lg px-2.5 py-1.5 shadow-lg whitespace-nowrap -translate-x-1/2"
    :style="{ left: x + 'px', top: y + 'px' }"
  >
    <p class="font-semibold">{{ title }}</p>
    <p v-if="subtitle" class="text-gray-300">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  x: number
  y: number
  title: string
  subtitle?: string
}>()
</script>
