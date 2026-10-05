<template>
  <!-- "See it in action": a tab per screen, moving on by itself until someone picks one -->
  <div>
    <div class="flex gap-1.5 overflow-x-auto [scrollbar-width:none] -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center" role="tablist" aria-label="Product tour">
      <button
        v-for="(s, i) in TOUR"
        :key="s.key"
        type="button"
        role="tab"
        :aria-selected="index === i"
        class="relative flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold overflow-hidden transition"
        :class="index === i ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 dark:bg-white/5 dark:text-slate-300 dark:border-white/10'"
        @click="pick(i)"
      >
        <AppIcon :name="s.icon" class="w-4 h-4" />{{ s.label }}
        <!-- Time left on this screen while the tour plays -->
        <span v-if="index === i && playing" :key="tick" class="absolute left-0 bottom-0 h-0.5 bg-indigo-400 tour-bar" :style="{ animationDuration: `${STEP_MS}ms` }"></span>
      </button>
    </div>

    <div class="mt-8 grid lg:grid-cols-[1fr_20rem] gap-8 items-center" @mouseenter="hover = true" @mouseleave="hover = false">
      <Transition name="fade" mode="out-in">
        <TourStage :key="current.key" :screen="current" />
      </Transition>
      <Transition name="fade" mode="out-in">
        <div :key="current.key" class="lg:order-none">
          <p class="text-sm font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-300">{{ current.label }}</p>
          <h3 class="mt-2 font-jakarta text-2xl font-extrabold tracking-tight">{{ current.title }}</h3>
          <p class="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">{{ current.text }}</p>
          <button type="button" class="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 bg-white text-slate-800 hover:border-slate-300 dark:bg-white/5 dark:border-white/10 dark:text-white" @click="$emit('watch', index)">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            Watch the full tour
          </button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'
import TourStage from './TourStage.vue'
import { TOUR } from '@/data/site'

defineEmits<{ watch: [index: number] }>()

const STEP_MS = 6000
const index = ref(0)
const current = computed(() => TOUR[index.value])
// Plays until someone picks a tab; pauses while the pointer is over it
const auto = ref(true)
const hover = ref(false)
const playing = computed(() => auto.value && !hover.value)
const tick = ref(0)

const pick = (i: number) => { auto.value = false; index.value = i }

let timer: number | undefined
let left = STEP_MS
let last = 0
const loop = (t: number) => {
  if (last && playing.value && !document.hidden) left -= t - last
  last = t
  if (left <= 0) { index.value = (index.value + 1) % TOUR.length; left = STEP_MS; tick.value++ }
  if (!playing.value) { left = STEP_MS }
  timer = requestAnimationFrame(loop)
}
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) auto.value = false
  timer = requestAnimationFrame(loop)
})
onBeforeUnmount(() => { if (timer) cancelAnimationFrame(timer) })
</script>

<style scoped>
.tour-bar { animation-name: tour-fill; animation-timing-function: linear; animation-fill-mode: forwards; width: 0; }
@keyframes tour-fill { to { width: 100%; } }
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
