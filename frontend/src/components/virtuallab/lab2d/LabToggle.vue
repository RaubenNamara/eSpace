<template>
  <button
    type="button"
    :disabled="disabled"
    @click="$emit('update:modelValue', !modelValue)"
    class="relative inline-flex items-center h-6 w-11 rounded-full transition-colors disabled:opacity-50"
    :class="modelValue ? 'bg-emerald-600' : 'bg-gray-300 dark:bg-gray-600'"
  >
    <span class="inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform" :class="modelValue ? 'translate-x-5' : 'translate-x-0.5'" />
  </button>
</template>

<script setup lang="ts">
defineProps<{ modelValue: boolean; disabled?: boolean }>()
defineEmits<{ 'update:modelValue': [boolean] }>()
</script>
