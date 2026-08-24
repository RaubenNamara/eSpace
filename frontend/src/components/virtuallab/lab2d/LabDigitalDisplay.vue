<template>
  <div class="bg-gray-900 rounded-lg px-2.5 py-1.5 text-center">
    <span class="font-mono tabular-nums" :class="sizeClass" :style="{ color }">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  text: string
  color?: string
  size?: 'sm' | 'md' | 'lg'
}>(), { color: '#34d399', size: 'md' })

const sizeClass = computed(() => ({ sm: 'text-xs', md: 'text-sm', lg: 'text-lg' }[props.size]))
</script>
