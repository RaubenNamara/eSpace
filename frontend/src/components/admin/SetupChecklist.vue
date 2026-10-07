<template>
  <!-- What is still missing in the school's setup, each with a way straight to the fix. What's
       done folds away under one line, so the card shrinks as the school gets set up. -->
  <section class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-5">
    <header class="flex items-center gap-4">
      <!-- Progress ring -->
      <div class="relative w-14 h-14 flex-shrink-0">
        <svg viewBox="0 0 36 36" class="w-14 h-14 -rotate-90">
          <circle cx="18" cy="18" r="15.5" fill="none" stroke-width="3.5" class="stroke-gray-100 dark:stroke-gray-700" />
          <circle cx="18" cy="18" r="15.5" fill="none" stroke-width="3.5" stroke-linecap="round"
            :class="allDone ? 'stroke-emerald-500' : 'stroke-indigo-500'"
            :stroke-dasharray="`${pct * 0.974} 100`" pathLength="97.4" />
        </svg>
        <span class="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-900 dark:text-white tabular-nums">{{ done }}/{{ total }}</span>
      </div>
      <div class="min-w-0 flex-1">
        <h2 class="text-base font-bold text-gray-900 dark:text-white">{{ allDone ? 'The school is fully set up' : 'Finish setting up the school' }}</h2>
        <p class="text-xs text-gray-500 dark:text-gray-400">
          {{ allDone ? 'Everything teachers and students rely on is in place.' : `${total - done} thing${total - done === 1 ? '' : 's'} left - each one links straight to where it's fixed.` }}
        </p>
      </div>
      <button type="button" class="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700" title="Check again" aria-label="Check again" @click="load">
        <svg class="w-4 h-4" :class="{ 'animate-spin': loading }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
      </button>
    </header>

    <div v-if="loading && !items.length" class="mt-4 space-y-2">
      <div v-for="i in 4" :key="i" class="h-12 rounded-xl bg-gray-100 dark:bg-gray-700/50 animate-pulse"></div>
    </div>

    <ul v-else class="mt-4 space-y-2">
      <li v-for="item in todo" :key="item.key">
        <RouterLink :to="item.link" class="group flex items-start gap-3 rounded-xl border border-amber-200/70 dark:border-amber-800/60 bg-amber-50/60 dark:bg-amber-900/10 px-3 py-2.5 hover:border-amber-300 dark:hover:border-amber-700 transition-colors">
          <span class="mt-0.5 w-5 h-5 rounded-full border-2 border-amber-400 flex-shrink-0"></span>
          <span class="min-w-0 flex-1">
            <span class="block text-sm font-semibold text-gray-900 dark:text-white">{{ item.title }}</span>
            <span class="block text-xs text-gray-600 dark:text-gray-300">
              <b v-if="item.count > 1 || !/^[A-Z]/.test(item.detail)" class="tabular-nums">{{ item.count }}</b>{{ ' ' + item.detail }}
            </span>
            <span v-if="item.examples.length" class="mt-1 flex flex-wrap gap-1">
              <span v-for="ex in item.examples" :key="ex" class="px-1.5 py-0.5 rounded bg-white dark:bg-gray-800 border border-amber-200 dark:border-amber-800 text-[10px] font-medium text-amber-900 dark:text-amber-200">{{ ex }}</span>
              <span v-if="item.count > item.examples.length" class="px-1.5 py-0.5 text-[10px] text-amber-800 dark:text-amber-300">+{{ item.count - item.examples.length }} more</span>
            </span>
          </span>
          <span class="self-center text-xs font-semibold text-amber-800 dark:text-amber-300 group-hover:underline whitespace-nowrap">Fix →</span>
        </RouterLink>
      </li>
    </ul>

    <!-- Done -->
    <div v-if="doneItems.length" class="mt-3">
      <button type="button" class="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200" :aria-expanded="showDone" @click="showDone = !showDone">
        <svg class="w-3.5 h-3.5 transition-transform" :class="showDone ? 'rotate-90' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.4" d="M9 5l7 7-7 7"></path></svg>
        {{ doneItems.length }} done
      </button>
      <ul v-if="showDone" class="mt-2 space-y-1">
        <li v-for="item in doneItems" :key="item.key" class="flex items-center gap-3 px-3 py-1.5">
          <span class="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
          </span>
          <span class="text-sm text-gray-500 dark:text-gray-400"><b class="font-semibold text-gray-700 dark:text-gray-200">{{ item.title }}</b> - {{ item.detail }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { apiService } from '@/services/api'

interface Item { key: string; title: string; count: number; done: boolean; detail: string; link: string; examples: string[] }
export interface SetupFigures { students: number; teachers: number; classes: number; students_active_week: number; teachers_active_week: number }

const emit = defineEmits<{ figures: [figures: SetupFigures, currentTerm: string | null]; progress: [done: number, total: number] }>()

const items = ref<Item[]>([])
const loading = ref(true)
const showDone = ref(false)

const todo = computed(() => items.value.filter(i => !i.done))
const doneItems = computed(() => items.value.filter(i => i.done))
const done = computed(() => doneItems.value.length)
const total = computed(() => items.value.length || 1)
const pct = computed(() => Math.round((done.value / total.value) * 100))
const allDone = computed(() => items.value.length > 0 && todo.value.length === 0)

const load = async () => {
  loading.value = true
  try {
    const res = await apiService.get('/admin/setup-checklist')
    items.value = res.data.data.items || []
    emit('figures', res.data.data.figures, res.data.data.current_term)
    emit('progress', done.value, items.value.length)
  } catch {
    items.value = []
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>
