<template>
  <!-- The oldest submissions waiting to be marked, each one tap from its marking page -->
  <section class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
    <div class="flex items-center gap-2 mb-3">
      <h2 class="flex-1 text-sm font-bold text-gray-900 dark:text-white">Mark next</h2>
      <span v-if="total" class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200">{{ total }} waiting</span>
      <RouterLink to="/teacher/assignments" class="text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">All assessments</RouterLink>
    </div>
    <EmptyState v-if="!items.length" :card="false" compact icon="sparkles" tone="emerald" title="All caught up" message="Nothing is waiting to be marked. New submissions will show up here." />
    <ul v-else class="divide-y divide-gray-100 dark:divide-gray-700 -mx-1">
      <li v-for="s in items" :key="s.submission_id">
        <RouterLink :to="`/teacher/assignments/${s.assignment_id}/submissions?submission=${s.submission_id}`" class="flex items-center gap-3 px-1 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/40 group">
          <span class="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200 text-xs font-bold flex items-center justify-center flex-shrink-0">{{ initials(s.student) }}</span>
          <span class="flex-1 min-w-0">
            <span class="block text-sm font-semibold text-gray-900 dark:text-white truncate">{{ niceName(s.student) }}</span>
            <span class="block text-[11px] text-gray-500 dark:text-gray-400 truncate">
              <span v-if="s.category" class="font-bold text-indigo-600 dark:text-indigo-300">{{ s.category }}</span>
              {{ niceName(s.assignment) }}<template v-if="s.class_name"> · {{ s.class_name }}</template> · {{ timeAgo(s.submitted_at) }}
            </span>
          </span>
          <span class="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white group-hover:bg-indigo-700">Mark</span>
        </RouterLink>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import EmptyState from '@/components/ui/EmptyState.vue'
import { initials, niceName, timeAgo } from './time'

defineProps<{
  items: { submission_id: number; assignment_id: number; assignment: string; category: string | null; student: string; class_name: string | null; submitted_at: string | null }[]
  total: number
}>()
</script>
