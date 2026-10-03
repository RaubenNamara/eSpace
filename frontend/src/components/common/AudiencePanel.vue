<template>
  <!-- Who has watched a video / read a book: every student it's aimed at, how far they got, and
       a quick message to any of them. A side panel on wide screens, a bottom sheet on a phone. -->
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-end sm:items-stretch sm:justify-end bg-black/40" @click.self="$emit('close')">
      <aside class="w-full sm:w-[26rem] max-h-[88vh] sm:max-h-none flex flex-col bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-none shadow-2xl">
        <div class="p-5 pb-3">
          <div class="flex items-start gap-3">
            <span class="w-11 h-11 rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-300 flex items-center justify-center flex-shrink-0">
              <AppIcon :name="icon" class="w-5 h-5" />
            </span>
            <div class="min-w-0 flex-1">
              <p class="text-base font-bold text-gray-900 dark:text-white leading-tight truncate">{{ title }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ subtitle }}</p>
            </div>
            <button type="button" class="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Close" @click="$emit('close')">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <div class="mt-4 grid grid-cols-3 gap-2">
            <div v-for="f in facts" :key="f.label" class="rounded-xl bg-gray-50 dark:bg-gray-700/50 p-3">
              <p class="text-[10px] font-bold uppercase tracking-wider text-gray-400">{{ f.label }}</p>
              <p class="text-lg font-bold" :class="f.tone">{{ f.value }}</p>
            </div>
          </div>

          <div class="mt-4 flex gap-1 p-1 rounded-xl bg-gray-100 dark:bg-gray-900/50 overflow-x-auto [scrollbar-width:none]">
            <button
              v-for="t in tabs"
              :key="t.key"
              type="button"
              class="flex-1 flex-shrink-0 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors"
              :class="tab === t.key ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'"
              @click="tab = t.key"
            >{{ t.label }} <span class="text-gray-400">{{ t.count }}</span></button>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto px-5 pb-5">
          <Skeleton v-if="loading" variant="list" :count="5" />
          <EmptyState v-else-if="!shown.length" compact icon="users" tone="gray" :title="emptyTitle" />
          <ul v-else class="divide-y divide-gray-100 dark:divide-gray-700">
            <li v-for="s in shown" :key="s.id" class="py-2.5 flex items-center gap-3">
              <span class="w-9 h-9 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0" :class="s.gender === 'female' ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-200' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200'">{{ initials(s.name) }}</span>
              <div class="min-w-0 flex-1">
                <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ niceName(s.name) }}</p>
                <div v-if="s.percent !== null" class="mt-1 flex items-center gap-2">
                  <span class="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                    <span class="block h-full rounded-full" :class="s.completed ? 'bg-emerald-500' : 'bg-amber-500'" :style="{ width: Math.max(s.percent, 3) + '%' }"></span>
                  </span>
                  <span class="text-[11px] font-semibold tabular-nums w-9 text-right" :class="s.completed ? 'text-emerald-600 dark:text-emerald-300' : 'text-gray-500 dark:text-gray-400'">{{ s.completed ? 'Done' : s.percent + '%' }}</span>
                </div>
                <p class="text-[11px] text-gray-400 truncate">{{ s.class_label }}<template v-if="s.current_page"> · page {{ s.current_page }}</template><template v-if="s.notes"> · {{ s.notes }} {{ s.notes === 1 ? 'note' : 'notes' }}</template><template v-if="s.last_at"> · {{ timeAgo(s.last_at) }}</template><template v-else-if="!isOpened(s)"> · not opened yet</template></p>
              </div>
              <RouterLink :to="`/teacher/chat?student=${s.id}`" class="p-2 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-300" :title="`Message ${niceName(s.name)}`">
                <AppIcon name="chat" class="w-4 h-4" />
              </RouterLink>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import AppIcon from '@/components/common/AppIcon.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import { timeAgo, initials, niceName } from '@/components/dashboard/teacher/time'

interface Viewer {
  id: number
  name: string
  gender: string | null
  class_label: string | null
  percent: number | null
  // Set where only opening is recorded (no "how far")
  opened?: boolean
  notes?: number
  current_page?: number | null
  last_at: string | null
  completed: boolean
}

const props = withDefaults(defineProps<{
  title: string
  subtitle: string
  // GET endpoint returning { students: [...] }
  endpoint: string
  icon?: string
  // How progress is described: "watched" for a video, "read" for a book
  verb?: string
  // false: only "opened or not" is known - no finished/part-way split or average
  tracksProgress?: boolean
}>(), { icon: 'video', verb: 'watched', tracksProgress: true })
defineEmits<{ close: [] }>()

const students = ref<Viewer[]>([])
const loading = ref(true)
type Tab = 'all' | 'done' | 'watching' | 'opened' | 'not'
const isOpened = (s: Viewer) => s.opened ?? s.percent !== null
const tab = ref<Tab>('all')

const groups = computed(() => ({
  all: students.value,
  done: students.value.filter(s => s.completed),
  watching: students.value.filter(s => !s.completed && s.percent !== null),
  opened: students.value.filter(isOpened),
  // Most useful nudge list: who hasn't opened it at all
  not: students.value.filter(s => !isOpened(s))
}))
const tabs = computed(() => props.tracksProgress ? [
  { key: 'all' as Tab, label: 'All', count: groups.value.all.length },
  { key: 'done' as Tab, label: 'Finished', count: groups.value.done.length },
  { key: 'watching' as Tab, label: props.verb === 'read' ? 'Reading' : 'Watching', count: groups.value.watching.length },
  { key: 'not' as Tab, label: 'Not opened', count: groups.value.not.length }
] : [
  { key: 'all' as Tab, label: 'All', count: groups.value.all.length },
  { key: 'opened' as Tab, label: 'Opened', count: groups.value.opened.length },
  { key: 'not' as Tab, label: 'Not opened', count: groups.value.not.length }
])
// Furthest along (or most recent) first, so the list reads like a leaderboard
const shown = computed(() => [...groups.value[tab.value]].sort((a, b) =>
  (b.percent ?? -1) - (a.percent ?? -1) || (b.last_at || '').localeCompare(a.last_at || '')))
const emptyTitle = computed(() => ({ all: 'No students in this class yet', done: 'Nobody has finished it yet', watching: 'Nobody is part-way through', opened: 'Nobody has opened it yet', not: 'Everyone has opened it' }[tab.value]))

const facts = computed(() => {
  const total = students.value.length
  const opened = total - groups.value.not.length
  const seen = students.value.filter(s => s.percent !== null)
  const avg = seen.length ? Math.round(seen.reduce((n, s) => n + (s.percent ?? 0), 0) / seen.length) : null
  if (!props.tracksProgress) {
    const notes = students.value.reduce((n, s) => n + (s.notes || 0), 0)
    return [
      { label: 'Opened', value: loading.value ? '–' : `${opened}/${total}`, tone: 'text-gray-900 dark:text-white' },
      { label: 'Reach', value: loading.value || !total ? '–' : `${Math.round((opened / total) * 100)}%`, tone: 'text-emerald-600 dark:text-emerald-300' },
      { label: 'Notes', value: loading.value ? '–' : notes, tone: 'text-amber-600 dark:text-amber-300' }
    ]
  }
  return [
    { label: 'Opened', value: loading.value ? '–' : `${opened}/${total}`, tone: 'text-gray-900 dark:text-white' },
    { label: 'Finished', value: loading.value ? '–' : groups.value.done.length, tone: 'text-emerald-600 dark:text-emerald-300' },
    { label: `Avg ${props.verb}`, value: avg === null ? '–' : `${avg}%`, tone: 'text-amber-600 dark:text-amber-300' }
  ]
})

onMounted(async () => {
  try {
    const res = await axios.get(props.endpoint)
    students.value = res.data?.data?.students ?? []
  } catch {
    students.value = []
  } finally {
    loading.value = false
  }
})
</script>
