<template>
  <!-- A teacher's own work, or their department colleagues' (see DepartmentWork.vue) -->
  <div class="mb-4 inline-flex rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1" role="tablist" aria-label="Whose work">
    <button
      v-for="o in options"
      :key="o.value"
      type="button"
      role="tab"
      :aria-selected="modelValue === o.value"
      class="px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-colors"
      :class="modelValue === o.value ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
      @click="$emit('update:modelValue', o.value)"
    >{{ o.label }}</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ modelValue: 'mine' | 'department'; mineLabel: string }>()
defineEmits<{ 'update:modelValue': ['mine' | 'department'] }>()
const options = computed(() => [
  { value: 'mine' as const, label: props.mineLabel },
  { value: 'department' as const, label: 'Department' }
])
</script>
