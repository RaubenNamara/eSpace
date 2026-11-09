<template>
  <!-- One group of a ribbon tab (Clipboard, Font, Paragraph ...): its tools, its name underneath -->
  <div class="flex flex-col px-1.5 border-r border-gray-300 dark:border-gray-600 last:border-r-0">
    <div class="flex-1 flex items-start gap-0.5 min-h-[58px]">
      <slot />
    </div>
    <p class="text-center text-[11px] text-gray-500 dark:text-gray-400 leading-none pt-1 pb-0.5">{{ label }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string }>()
</script>
