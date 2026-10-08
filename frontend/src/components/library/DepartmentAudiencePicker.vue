<template>
  <!-- Who a HOD's or admin's book is for, within one department: everyone in the department, every
       stream of a class, or one stream - each with how many learners that is. -->
  <select
    :value="encoded"
    :disabled="disabled || !levels.length"
    required
    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white disabled:opacity-60"
    @change="choose(($event.target as HTMLSelectElement).value)"
  >
    <option value="" disabled>{{ levels.length ? 'Who is it for?' : 'No learners in this department yet' }}</option>
    <option value="dept">Whole department · {{ total.toLocaleString() }} learners</option>
    <optgroup v-for="l in levels" :key="l.name" :label="l.name">
      <option :value="`g:${l.name}`">{{ l.name }} - all streams · {{ l.learners.toLocaleString() }}</option>
      <option v-for="s in l.streams" :key="s.id" :value="`s:${s.id}`">{{ s.name }} · {{ s.learners.toLocaleString() }}</option>
    </optgroup>
  </select>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ClassTarget } from '@/components/teacher/TeacherClassSelector.vue'

export interface AudienceLevel { name: string; learners: number; streams: { id: number; name: string; learners: number }[] }

const props = defineProps<{ modelValue: ClassTarget; levels: AudienceLevel[]; disabled?: boolean }>()
const emit = defineEmits<{ 'update:modelValue': [value: ClassTarget] }>()

const total = computed(() => props.levels.reduce((n, l) => n + l.learners, 0))

const encoded = computed(() => {
  const t = props.modelValue
  if (t.scope === 'department') return 'dept'
  if (t.class_group_name) return `g:${t.class_group_name}`
  if (t.class_id) return `s:${t.class_id}`
  return ''
})

const choose = (value: string) => {
  if (value === 'dept') emit('update:modelValue', { scope: 'department', class_id: null, class_group_name: null })
  else if (value.startsWith('g:')) emit('update:modelValue', { scope: 'all_streams', class_id: null, class_group_name: value.slice(2) })
  else if (value.startsWith('s:')) emit('update:modelValue', { scope: 'stream', class_id: Number(value.slice(2)), class_group_name: null })
}
</script>
