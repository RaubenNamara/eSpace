<template>
  <!-- The eSpace word logo: an indigo "e" and "Space", set tight in Plus Jakarta Sans. Scales
       with `size`; `light` is for dark backgrounds that aren't the dark theme (e.g. a hero image). -->
  <span class="inline-flex items-baseline font-jakarta font-extrabold tracking-tight leading-none select-none" :class="SIZE[size]" aria-label="eSpace">
    <span class="text-indigo-600 dark:text-indigo-400 pr-[0.02em]">e</span>
    <span :class="light ? 'text-white' : 'text-slate-900 dark:text-white'">Space</span>
    <span class="ml-[0.06em] inline-block w-[0.22em] h-[0.22em] rounded-full bg-indigo-600 dark:bg-indigo-400 self-start mt-[0.12em]" aria-hidden="true"></span>
  </span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ size?: 'sm' | 'md' | 'lg' | 'xl'; light?: boolean }>(), { size: 'md', light: false })

const SIZE = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-4xl',
  xl: 'text-6xl sm:text-7xl'
} as const
</script>
