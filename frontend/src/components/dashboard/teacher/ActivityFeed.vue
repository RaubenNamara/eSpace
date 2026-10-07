<template>
  <!-- What students did lately - submissions, eNotes finished, revision done, messages - as a row
       of chips drifting slowly right to left. Hover (or tap) holds it still; with "reduce motion"
       on, or when every chip already fits, it is a still row you can scroll yourself. -->
  <section class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 min-w-0">
    <div class="flex items-center gap-2.5 mb-2.5">
      <span class="w-8 h-8 flex-shrink-0 rounded-xl flex items-center justify-center bg-indigo-600 text-white shadow-sm shadow-indigo-500/20"><AppIcon name="sparkles" class="w-4 h-4" /></span>
      <h2 class="text-sm font-bold text-gray-900 dark:text-white">Recently</h2>
      <span class="flex-1 text-xs text-gray-400 dark:text-gray-500">what your students did</span>
      <RouterLink to="/teacher/chat" class="text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">Chats</RouterLink>
    </div>
    <p v-if="!items.length" class="text-xs text-gray-500 dark:text-gray-400">Submissions, finished eNotes and messages from your students appear here.</p>
    <div
      v-else
      ref="viewport"
      class="ticker relative"
      :class="moving ? 'overflow-hidden is-moving' : 'overflow-x-auto pb-1 -mb-1 scrollbar-thin'"
      @click="held = !held"
    >
      <div class="ticker-track flex w-max" :class="{ held }" :style="moving ? { animationDuration: `${duration}s` } : undefined">
        <!-- Moving, the chips are laid out twice so the loop has no seam -->
        <div v-for="copy in (moving ? 2 : 1)" :key="copy" ref="copies" class="flex gap-2 pr-2" :aria-hidden="copy === 2 ? 'true' : undefined">
          <RouterLink
            v-for="(a, i) in items"
            :key="`${copy}-${i}`"
            :to="a.to"
            :tabindex="copy === 2 ? -1 : undefined"
            class="flex-shrink-0 inline-flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors whitespace-nowrap"
            :title="`${niceName(a.who)} ${KIND[a.kind].verb} ${a.what}`"
            @click.stop
          >
            <span class="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" :class="KIND[a.kind].icon"><AppIcon :name="KIND[a.kind].name" class="w-3.5 h-3.5" /></span>
            <span class="text-xs text-gray-600 dark:text-gray-300">
              <b class="text-gray-800 dark:text-gray-100">{{ shortName(a.who) }}</b>{{ ' ' + KIND[a.kind].verb + ' ' }}{{ what(a) }}
              <span class="text-gray-400">{{ ' · ' + timeAgo(a.at) }}</span>
            </span>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { niceName, timeAgo } from './time'

type Kind = 'submission' | 'enote' | 'revised' | 'message'
type Item = { kind: Kind; at: string; who: string; what: string; to: string }
const props = defineProps<{ items: Item[] }>()

// "Faith Akello" -> "Faith A."
const shortName = (n: string) => {
  const parts = niceName(n).split(/\s+/).filter(Boolean)
  return parts.length > 1 ? `${parts[0]} ${parts[parts.length - 1][0]}.` : parts[0] || n
}
const what = (a: Item) => {
  if (a.kind !== 'message') return niceName(a.what)
  return `“${a.what.length > 50 ? a.what.slice(0, 50).trimEnd() + '…' : a.what}”`
}

const KIND: Record<Kind, { name: string; verb: string; icon: string }> = {
  submission: { name: 'clipboard', verb: 'handed in', icon: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300' },
  enote: { name: 'book', verb: 'finished', icon: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300' },
  revised: { name: 'target', verb: 'revised', icon: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300' },
  message: { name: 'chat', verb: 'wrote', icon: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300' }
}

// Move only when the chips don't all fit, and never for someone who asked for less motion
const viewport = ref<HTMLElement | null>(null)
const copies = ref<HTMLElement[]>([])
const overflowing = ref(false)
const held = ref(false)
const reduceMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
const moving = computed(() => !reduceMotion && overflowing.value)
// About 40px a second, whatever the number of chips
const contentWidth = ref(0)
const duration = computed(() => Math.max(20, Math.round(contentWidth.value / 40)))

const measure = () => {
  const box = viewport.value
  const first = copies.value[0]
  if (!box || !first) return
  contentWidth.value = first.scrollWidth
  overflowing.value = first.scrollWidth > box.clientWidth + 4
}
let observer: ResizeObserver | null = null
onMounted(() => {
  nextTick(measure)
  if (typeof ResizeObserver !== 'undefined') {
    observer = new ResizeObserver(() => measure())
    watch(viewport, (el, old) => {
      if (old) observer?.unobserve(old)
      if (el) observer?.observe(el)
    }, { immediate: true })
  }
})
watch(() => props.items, () => nextTick(measure), { deep: true })
onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
.is-moving {
  /* Chips fade in at the right edge and out at the left */
  -webkit-mask-image: linear-gradient(to right, transparent, #000 2.5rem, #000 calc(100% - 2.5rem), transparent);
  mask-image: linear-gradient(to right, transparent, #000 2.5rem, #000 calc(100% - 2.5rem), transparent);
}
.is-moving .ticker-track {
  animation: ticker linear infinite;
}
.is-moving:hover .ticker-track,
.is-moving:focus-within .ticker-track,
.ticker-track.held {
  animation-play-state: paused;
}
@keyframes ticker {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
</style>
