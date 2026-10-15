<template>
  <!-- The school's notices sliding past, for any role's dashboard. Tapping one opens it in full
       underneath and counts it as read. Hidden when there are none. -->
  <section v-if="notices.length" class="mb-4">
    <div class="ticker flex items-stretch rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm ring-1 ring-indigo-200 dark:ring-indigo-900">
      <div class="relative z-10 flex items-center gap-2 pl-3 pr-4 bg-indigo-800 text-white flex-shrink-0 ticker-label">
        <AppIcon name="speaker" class="w-5 h-5" />
        <span class="text-sm font-extrabold uppercase tracking-wide">Notices</span>
        <span v-if="unread" class="min-w-[1.25rem] h-5 px-1.5 rounded-full bg-amber-400 text-gray-900 text-xs font-extrabold flex items-center justify-center animate-pulse">{{ unread }}</span>
      </div>
      <div class="relative flex-1 min-w-0 overflow-hidden ticker-window">
        <div class="ticker-track flex w-max" :style="{ animationDuration: `${seconds}s` }">
          <template v-for="copy in copies" :key="copy">
            <button
              v-for="n in notices"
              :key="`${copy}-${n.id}`"
              type="button"
              class="flex items-center gap-2 px-5 py-2.5 whitespace-nowrap text-[0.95rem] hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
              :aria-hidden="copy > 1"
              :tabindex="copy > 1 ? -1 : 0"
              @click="show(n)"
            >
              <span v-if="!n.is_read && !n.mine" class="px-1.5 py-0.5 rounded-md bg-amber-400 text-gray-900 text-[10px] font-extrabold uppercase">New</span>
              <span class="font-bold text-gray-900 dark:text-white">{{ n.title }}</span>
              <span class="text-gray-600 dark:text-gray-300">- {{ oneLine(n.body) }}</span>
              <span class="text-indigo-500 pl-3" aria-hidden="true">●</span>
            </button>
          </template>
        </div>
      </div>
    </div>
    <Transition name="drop">
      <div v-if="opened" class="mt-2 rounded-2xl bg-white dark:bg-gray-800 shadow-sm ring-1 ring-indigo-200 dark:ring-indigo-900 p-4">
        <div class="flex items-start gap-3">
          <div class="min-w-0 flex-1">
            <p class="text-xs font-semibold text-indigo-600 dark:text-indigo-400">{{ niceName(opened.author_name) }} · {{ when(opened.created_at) }}</p>
            <h2 class="text-lg font-bold text-gray-900 dark:text-white">{{ opened.title }}</h2>
            <p class="mt-1 text-[0.95rem] leading-relaxed text-gray-700 dark:text-gray-200 whitespace-pre-line">{{ opened.body }}</p>
            <RouterLink v-if="role !== 'student'" :to="`/${role}/notices`" class="mt-2 inline-block text-sm font-semibold text-indigo-700 dark:text-indigo-300 hover:underline">Open the noticeboard →</RouterLink>
          </div>
          <button type="button" class="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Close" @click="opened = null">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import AppIcon from '@/components/common/AppIcon.vue'
import { niceName } from '@/components/dashboard/teacher/time'
import { useLiveRefresh } from '@/composables/useLiveRefresh'

interface Notice { id: number; title: string; body: string; author_name: string; pinned: boolean; created_at: string; is_read: boolean; mine: boolean }

const props = defineProps<{ role: 'student' | 'teacher' | 'hod' | 'admin' }>()

const notices = ref<Notice[]>([])
const opened = ref<Notice | null>(null)
const unread = computed(() => notices.value.filter(n => !n.is_read && !n.mine).length)
const oneLine = (t: string) => t.replace(/\s+/g, ' ').trim()
const when = (v: string) => {
  const d = new Date(v.replace(' ', 'T'))
  return d.toDateString() === new Date().toDateString() ? 'today' : d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
}
// Enough copies to run wider than any screen (an even number, so sliding half-way loops
// seamlessly), at a steady reading speed whatever the length
const chars = computed(() => notices.value.reduce((n, x) => n + x.title.length + oneLine(x.body).length + 12, 0))
const copies = computed(() => 2 * Math.max(1, Math.ceil(1600 / Math.max(1, chars.value * 8))))
const seconds = computed(() => Math.max(14, (chars.value * copies.value) / 2 / 6))

async function show(n: Notice) {
  opened.value = opened.value?.id === n.id ? null : n
  if (n.is_read || n.mine) return
  n.is_read = true
  try {
    await axios.post(`/api/${props.role}/notices/${n.id}/read`)
  } catch { /* tried again next time it is opened */ }
}

const load = async () => {
  try {
    const res = await axios.get(`/api/${props.role}/notices`)
    notices.value = res.data.data.notices || []
  } catch { /* no ticker */ }
}
useLiveRefresh(load)
onMounted(load)
</script>

<style scoped>
/* The notices slide left, round and round; they stop while the pointer is on them */
.ticker-track {
  animation: ticker linear infinite;
}
.ticker:hover .ticker-track,
.ticker:focus-within .ticker-track {
  animation-play-state: paused;
}
@keyframes ticker {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.ticker-window {
  mask-image: linear-gradient(90deg, transparent, #000 24px, #000 calc(100% - 24px), transparent);
}
.ticker-label::after {
  content: '';
  position: absolute;
  right: -10px;
  top: 0;
  bottom: 0;
  width: 10px;
  background: inherit;
  clip-path: polygon(0 0, 100% 50%, 0 100%);
}
@media (prefers-reduced-motion: reduce) {
  .ticker-track { animation: none; }
  .ticker-window { overflow-x: auto; }
}
.drop-enter-active, .drop-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.drop-enter-from, .drop-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
