<template>
  <!-- Every module, one at a time in a browser window: pick one from the list (or let it play
       through them by itself until you do). Modules with a hand-drawn tour screen show it; the
       rest show their page drawn from data/modules.ts (screens/ScreenModule.vue). -->
  <div>
    <div class="flex gap-1.5 overflow-x-auto [scrollbar-width:none] -mx-4 px-4 lg:mx-0 lg:px-0" role="tablist" aria-label="Module groups">
      <button
        v-for="c in [{ key: 'all', label: 'All' }, ...CATEGORIES]"
        :key="c.key"
        type="button"
        role="tab"
        :aria-selected="filter === c.key"
        class="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition"
        :class="filter === c.key ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 dark:bg-white/5 dark:text-slate-300 dark:border-white/10'"
        @click="setFilter(c.key as ModuleCategory | 'all')"
      >{{ c.label }}</button>
    </div>

    <div class="mt-6 grid lg:grid-cols-[19rem_minmax(0,1fr)] gap-6 lg:gap-8 items-start">
      <!-- the list (a strip of chips on a phone) -->
      <ul class="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-y-auto lg:max-h-[34rem] [scrollbar-width:thin] -mx-4 px-4 lg:mx-0 lg:px-0 lg:pr-2 pb-1" aria-label="Modules">
        <li v-for="m in list" :key="m.key" class="flex-shrink-0">
          <button
            type="button"
            class="relative w-full overflow-hidden text-left rounded-xl px-3 py-2.5 flex items-center gap-3 transition"
            :class="m.key === active.key ? 'bg-white dark:bg-slate-900 shadow-md ring-1 ring-indigo-200 dark:ring-indigo-500/30' : 'hover:bg-white/70 dark:hover:bg-white/5'"
            :aria-current="m.key === active.key"
            @click="choose(m)"
          >
            <span class="w-9 h-9 flex-shrink-0 rounded-lg flex items-center justify-center transition" :class="m.key === active.key ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300'"><AppIcon :name="m.icon" class="w-4 h-4" /></span>
            <span class="min-w-0">
              <span class="block text-sm font-semibold whitespace-nowrap lg:whitespace-normal" :class="m.key === active.key ? 'text-indigo-800 dark:text-indigo-200' : 'text-slate-800 dark:text-slate-100'">{{ m.name }}</span>
              <span class="hidden lg:block text-xs text-slate-500 dark:text-slate-400 truncate">{{ m.short }}</span>
            </span>
            <!-- playing by itself: how long until the next one -->
            <span v-if="playing && m.key === active.key" :key="`${m.key}-${cycle}`" class="absolute left-0 bottom-0 h-0.5 bg-indigo-500 explorer-progress" :style="{ animationDuration: `${STEP_MS}ms` }"></span>
          </button>
        </li>
      </ul>

      <!-- the module, in the app -->
      <div @mouseenter="hovering = true" @mouseleave="hovering = false">
        <Transition name="screen" mode="out-in">
          <div :key="active.key">
            <ScaledFrame :url="`tusome / ${active.name.toLowerCase()}`">
              <component :is="REAL[active.key]" v-if="REAL[active.key]" />
              <ScreenModule v-else :module="active" />
            </ScaledFrame>
          </div>
        </Transition>
        <div class="mt-5 flex flex-wrap items-start justify-between gap-4">
          <div class="max-w-xl">
            <p class="font-jakarta text-xl font-bold">{{ active.name }}</p>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{{ active.short }}</p>
            <p class="mt-2 flex flex-wrap gap-1">
              <span v-for="r in active.roles" :key="r" class="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-200">{{ ROLE_LABEL[r] }}</span>
            </p>
          </div>
          <button type="button" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition" @click="$emit('open', active)">
            More about {{ active.name }}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch, type Component } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'
import ScaledFrame from './ScaledFrame.vue'
import ScreenModule from './screens/ScreenModule.vue'
import ScreenENotes from './screens/ScreenENotes.vue'
import ScreenMap from './screens/ScreenMap.vue'
import ScreenMarking from './screens/ScreenMarking.vue'
import ScreenCoverage from './screens/ScreenCoverage.vue'
import { MODULES, CATEGORIES, ROLE_LABEL, type ModuleCategory, type EModule } from '@/data/modules'

defineEmits<{ open: [EModule] }>()

// The hand-drawn screens, for the modules that have one
const REAL: Record<string, Component> = { enotes: ScreenENotes, learningmap: ScreenMap, assessments: ScreenMarking, coverage: ScreenCoverage }
const STEP_MS = 5000

const filter = ref<ModuleCategory | 'all'>('all')
const list = computed(() => (filter.value === 'all' ? MODULES : MODULES.filter(m => m.category === filter.value)))
const active = ref<EModule>(MODULES[0])
const cycle = ref(0)

// Plays through by itself until the visitor picks one - and pauses while the pointer is over it
// or the section is off screen
const userPicked = ref(false)
const hovering = ref(false)
const inView = ref(false)
const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const playing = computed(() => !userPicked.value && !hovering.value && inView.value && !reduced)
let timer = 0

const choose = (m: EModule) => {
  userPicked.value = true
  active.value = m
}
const setFilter = (k: ModuleCategory | 'all') => {
  filter.value = k
  active.value = list.value[0]
  cycle.value++
}
const next = () => {
  const l = list.value
  const i = l.findIndex(m => m.key === active.value.key)
  active.value = l[(i + 1) % l.length]
  cycle.value++
}

watch(playing, on => {
  clearInterval(timer)
  if (on) {
    cycle.value++
    timer = window.setInterval(next, STEP_MS)
  }
}, { immediate: false })

let observer: IntersectionObserver | null = null
onMounted(() => {
  const el = document.getElementById('modules')
  if (el && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => { inView.value = entries.some(e => e.isIntersecting) }, { threshold: 0.25 })
    observer.observe(el)
  }
})
onBeforeUnmount(() => {
  clearInterval(timer)
  observer?.disconnect()
})
</script>

<style scoped>
@keyframes explorer-fill { from { width: 0; } to { width: 100%; } }
.explorer-progress { animation-name: explorer-fill; animation-timing-function: linear; animation-fill-mode: forwards; }
.screen-enter-active, .screen-leave-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.screen-enter-from { opacity: 0; transform: translateY(8px) scale(0.99); }
.screen-leave-to { opacity: 0; transform: translateY(-6px) scale(0.99); }
</style>
