<template>
  <span class="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 whitespace-nowrap">
    {{ label }}: <strong>{{ value }}</strong>{{ unit }}
  </span>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
  unit?: string
}>()
</script>
