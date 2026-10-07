<template>
  <!-- Early warning on the dashboard: the students who need a word right now, the first few by
       name with why, and the way to the full list. Tells the dashboard how many there are. -->
  <section class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-5 flex flex-col">
    <header class="flex items-center gap-2.5 mb-3">
      <span class="w-8 h-8 flex-shrink-0 rounded-xl flex items-center justify-center bg-indigo-600 text-white shadow-sm shadow-indigo-500/20"><AppIcon name="warning" class="w-4 h-4" /></span>
      <h2 class="flex-1 text-base font-bold text-gray-900 dark:text-white">Needs a word</h2>
      <span v-if="!loading && flagged" class="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-300 tabular-nums">{{ flagged }}</span>
    </header>

    <div v-if="loading" class="space-y-2.5"><div v-for="i in Math.min(3, limit)" :key="i" class="h-10 rounded-lg bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div></div>
    <div v-else-if="!flagged" class="flex-1 flex items-center gap-3 py-2">
      <span class="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300 flex items-center justify-center flex-shrink-0"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg></span>
      <p class="text-xs text-gray-500 dark:text-gray-400">Nobody is slipping in your classes right now.</p>
    </div>
    <ul v-else class="space-y-3">
      <li v-for="(s, i) in top" :key="s.id" class="flex items-center gap-3">
        <span class="w-9 h-9 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0" :class="i % 2 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-200'">{{ initials(niceName(s.name)) }}</span>
        <span class="min-w-0 flex-1">
          <span class="block text-sm font-semibold text-gray-900 dark:text-white truncate">{{ niceName(s.name) }} <span class="font-normal text-gray-400">{{ s.class_label }}</span></span>
          <span class="block text-xs truncate" :class="i % 2 ? 'text-amber-600 dark:text-amber-300' : 'text-rose-600 dark:text-rose-300'">{{ reason(s) }}</span>
        </span>
        <RouterLink :to="`/teacher/chat?student=${s.id}`" class="text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline flex-shrink-0">Message</RouterLink>
      </li>
    </ul>
    <RouterLink to="/teacher/early-warning" class="mt-auto pt-4 inline-block text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">{{ flagged ? 'Everyone on the early-warning list' : 'Open early warning' }} →</RouterLink>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { apiService } from '@/services/api'
import AppIcon from '@/components/common/AppIcon.vue'
import { initials, niceName } from '@/components/dashboard/teacher/time'

interface Row { id: number; name: string; class_label: string; signals: { key: string; text: string }[]; needs_teacher: boolean }
// limit: how many students to name (fewer when the card sits beside something short)
const props = withDefaults(defineProps<{ limit?: number }>(), { limit: 4 })
const emit = defineEmits<{ count: [n: number] }>()
const rows = ref<Row[]>([])
const loading = ref(true)

const needing = computed(() => rows.value.filter(r => r.needs_teacher))
const flagged = computed(() => needing.value.length)
const top = computed(() => needing.value.slice(0, props.limit))
const reason = (s: Row) => s.signals.filter(g => g.key !== 'never').map(g => g.text).join(' · ')

onMounted(async () => {
  try {
    const res = await apiService.get('/teacher/early-warning')
    rows.value = res.data.data.students || []
  } catch {
    rows.value = []
  } finally {
    loading.value = false
    emit('count', flagged.value)
  }
})
</script>
