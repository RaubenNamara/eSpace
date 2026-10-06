<template>
  <!-- Early warning on the dashboard: how many of the teacher's students need a word right now,
       the first few by name with why, and the way to the full list. -->
  <section class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
    <header class="flex items-center gap-2 mb-2">
      <span class="w-7 h-7 rounded-lg flex items-center justify-center" :class="flagged ? 'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-300' : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300'">
        <AppIcon name="warning" class="w-4 h-4" />
      </span>
      <h3 class="flex-1 text-sm font-bold text-gray-900 dark:text-white">Early warning</h3>
      <span v-if="!loading && flagged" class="text-lg font-bold tabular-nums text-rose-600 dark:text-rose-400">{{ flagged }}</span>
    </header>

    <div v-if="loading" class="space-y-2"><div v-for="i in 3" :key="i" class="h-9 rounded-lg bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div></div>
    <p v-else-if="!flagged" class="text-xs text-gray-500 dark:text-gray-400">No student needs a word right now - nobody is slipping in your classes.</p>
    <template v-else>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">{{ flagged }} student{{ flagged === 1 ? '' : 's' }} may be slipping - a word now can turn it round.</p>
      <ul class="space-y-1.5">
        <li v-for="s in top" :key="s.id" class="flex items-start gap-2 rounded-lg bg-gray-50 dark:bg-gray-900/40 px-2.5 py-1.5">
          <span class="min-w-0 flex-1">
            <span class="block text-xs font-semibold text-gray-900 dark:text-white truncate">{{ niceName(s.name) }} <span class="font-normal text-gray-400">{{ s.class_label }}</span></span>
            <span class="block text-[11px] text-rose-700 dark:text-rose-300 truncate">{{ s.signals.filter(g => g.key !== 'never').map(g => g.text).join(' · ') }}</span>
          </span>
          <RouterLink :to="`/teacher/chat?student=${s.id}`" class="text-[11px] font-semibold text-indigo-600 dark:text-indigo-300 hover:underline flex-shrink-0">Message</RouterLink>
        </li>
      </ul>
    </template>
    <RouterLink to="/teacher/early-warning" class="mt-3 inline-block text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">{{ flagged ? 'See everyone' : 'Open early warning' }} →</RouterLink>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { apiService } from '@/services/api'
import AppIcon from '@/components/common/AppIcon.vue'
import { niceName } from '@/components/dashboard/teacher/time'

interface Row { id: number; name: string; class_label: string; signals: { key: string; text: string }[]; needs_teacher: boolean }
const rows = ref<Row[]>([])
const loading = ref(true)

const needing = computed(() => rows.value.filter(r => r.needs_teacher))
const flagged = computed(() => needing.value.length)
const top = computed(() => needing.value.slice(0, 4))

onMounted(async () => {
  try {
    const res = await apiService.get('/teacher/early-warning')
    rows.value = res.data.data.students || []
  } catch {
    rows.value = []
  } finally {
    loading.value = false
  }
})
</script>
