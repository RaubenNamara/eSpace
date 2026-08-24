<template>
  <div>
    <p class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">{{ label }}: {{ modelValue }}{{ unit }}</p>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
      type="range" :min="min" :max="max" :step="step" :disabled="disabled"
      class="w-full accent-indigo-600 disabled:opacity-50"
    >
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  modelValue: number
  unit?: string
  min: number
  max: number
  step: number
  disabled?: boolean
}>()
defineEmits<{ 'update:modelValue': [number] }>()
</script>
