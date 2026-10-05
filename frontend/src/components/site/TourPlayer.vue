<template>
  <!-- "Watch the tour": every screen in turn, full screen, with a caption - like a short video.
       Space pauses, arrows step, Esc closes. -->
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="site-plain fixed inset-0 z-[80] bg-slate-950/[0.97] backdrop-blur-sm flex flex-col" role="dialog" aria-modal="true" aria-label="eSpace product tour" @click.self="close">
        <div class="mx-auto w-full max-w-5xl px-4 pt-4 sm:pt-6 flex items-center gap-1.5">
          <span v-for="(s, i) in TOUR" :key="s.key" class="flex-1 h-1 rounded-full bg-white/20 overflow-hidden">
            <span class="block h-full bg-white" :style="{ width: `${i < index ? 100 : i === index ? progress * 100 : 0}%` }"></span>
          </span>
        </div>
        <div class="mx-auto w-full max-w-5xl px-4 pt-3 flex items-center justify-between text-white">
          <p class="text-sm font-semibold">{{ index + 1 }} / {{ TOUR.length }} · {{ current.label }}</p>
          <div class="flex items-center gap-1">
            <button type="button" class="p-2 rounded-lg hover:bg-white/10" :aria-label="paused ? 'Play' : 'Pause'" @click="paused = !paused">
              <svg v-if="paused" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
            </button>
            <button type="button" class="p-2 rounded-lg hover:bg-white/10" aria-label="Close" @click="close">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
        </div>

        <div class="flex-1 min-h-0 mx-auto w-full max-w-5xl px-4 py-4 flex flex-col justify-center">
          <div class="relative">
            <Transition name="slide" mode="out-in">
              <TourStage :key="current.key" :screen="current" />
            </Transition>
            <!-- Tap left / right half to step -->
            <button type="button" class="absolute inset-y-0 left-0 w-1/4" aria-label="Previous" @click="step(-1)"></button>
            <button type="button" class="absolute inset-y-0 right-0 w-1/4" aria-label="Next" @click="step(1)"></button>
          </div>
          <Transition name="fade" mode="out-in">
            <div :key="current.key" class="mt-5 text-center text-white max-w-2xl mx-auto">
              <h3 class="font-jakarta text-xl sm:text-2xl font-extrabold">{{ current.title }}</h3>
              <p class="mt-2 text-sm sm:text-base text-slate-300">{{ current.text }}</p>
            </div>
          </Transition>
          <div v-if="finished" class="mt-6 flex justify-center gap-3">
            <button type="button" class="px-5 py-2.5 rounded-xl text-sm font-semibold text-white border border-white/20 hover:bg-white/10" @click="restart">Watch again</button>
            <router-link to="/#demo" class="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700" @click="close">Request a demo</router-link>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import TourStage from './TourStage.vue'
import { TOUR } from '@/data/site'

const props = defineProps<{ open: boolean; start?: number }>()
const emit = defineEmits<{ close: [] }>()

const STEP_MS = 5500
const index = ref(0)
const current = computed(() => TOUR[index.value])
const progress = ref(0)
const paused = ref(false)
const finished = ref(false)

let raf = 0
let last = 0
const loop = (t: number) => {
  if (last && !paused.value && !finished.value) progress.value += (t - last) / STEP_MS
  last = t
  if (progress.value >= 1) {
    if (index.value < TOUR.length - 1) { index.value++; progress.value = 0 } else { progress.value = 1; finished.value = true }
  }
  raf = requestAnimationFrame(loop)
}

const step = (d: number) => {
  index.value = Math.min(TOUR.length - 1, Math.max(0, index.value + d))
  progress.value = 0
  finished.value = false
}
const restart = () => { index.value = 0; progress.value = 0; finished.value = false; paused.value = false }
const close = () => emit('close')

const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowRight') step(1)
  else if (e.key === 'ArrowLeft') step(-1)
  else if (e.key === ' ') { e.preventDefault(); paused.value = !paused.value }
}

watch(() => props.open, open => {
  if (open) {
    index.value = props.start ?? 0
    progress.value = 0
    finished.value = false
    paused.value = false
    last = 0
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    raf = requestAnimationFrame(loop)
  } else {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', onKey)
    cancelAnimationFrame(raf)
  }
})
onBeforeUnmount(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKey)
  cancelAnimationFrame(raf)
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-enter-active, .slide-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.slide-enter-from { opacity: 0; transform: translateX(24px); }
.slide-leave-to { opacity: 0; transform: translateX(-24px); }
</style>
