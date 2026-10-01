<template>
  <!-- A growing list: finished steps stay (compact, ticked) and each new step drops in below them
       in slow motion once the one before it is done. With `stagger`, the list builds up from
       Step 1 one step at a time (used when the page opens). -->
  <TransitionGroup tag="ol" name="step-drop" appear class="relative space-y-2">
    <li
      v-for="(s, i) in revealedSteps"
      :key="s.step_number"
      :ref="(el) => { if (s.step_number === currentStep) currentEl.el = el as HTMLElement | null }"
      :style="{ transitionDelay: stagger ? `${i * 140}ms` : '0ms' }"
      class="step-item flex gap-2.5"
    >
      <!-- Marker + connector line down to the next step -->
      <div class="flex flex-col items-center flex-shrink-0">
        <span
          class="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors duration-500"
          :class="isDone(s.step_number) ? 'bg-emerald-500 text-white' : 'bg-indigo-600 text-white ring-4 ring-indigo-100 dark:ring-indigo-900/50'"
        >
          <svg v-if="isDone(s.step_number)" class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
          <template v-else>{{ s.step_number }}</template>
        </span>
        <span v-if="i < revealedSteps.length - 1" class="w-px flex-1 mt-1 bg-emerald-200 dark:bg-emerald-800"></span>
      </div>

      <!-- Finished step: compact -->
      <div v-if="isDone(s.step_number)" class="flex-1 min-w-0 pb-1">
        <p class="text-[10px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">Step {{ s.step_number }} &middot; Done</p>
        <p class="text-xs text-gray-500 dark:text-gray-400 leading-snug line-clamp-2">{{ s.instruction }}</p>
      </div>

      <!-- Current step: full card with its hint, reset and safety acknowledgement -->
      <div v-else class="flex-1 min-w-0">
        <p class="text-[10px] font-semibold uppercase tracking-wide text-indigo-500 dark:text-indigo-400 mb-1">Step {{ s.step_number }} of {{ steps.length }}</p>
        <div v-if="s.is_safety_check" class="bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 rounded-xl p-3.5">
          <p class="text-sm font-medium text-amber-800 dark:text-amber-200 mb-2.5">{{ s.instruction }}</p>
          <button @click="emit('acknowledge')" class="w-full px-3 py-2.5 text-sm font-semibold rounded-lg bg-amber-600 text-white hover:bg-amber-700 shadow-sm">I Understand - Continue</button>
        </div>
        <div v-else class="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/60 rounded-xl p-3.5">
          <p class="text-sm font-medium text-gray-800 dark:text-gray-100 leading-relaxed">{{ s.instruction }}</p>
        </div>

        <div v-if="hintLevels.length && !s.is_safety_check" class="mt-2">
          <button v-if="hintLevel < hintLevels.length" @click="emit('hint')" class="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
            <AppIcon name="bulb" class="w-4 h-4" /> {{ hintLevel === 0 ? 'Need a hint?' : 'Show me more' }}
          </button>
          <div v-for="(h, hi) in hintLevels.slice(0, hintLevel)" :key="hi" class="text-xs text-gray-500 dark:text-gray-400 mt-1.5 italic bg-gray-50 dark:bg-gray-950/40 rounded-lg p-2.5">{{ h }}</div>
        </div>
        <button @click="emit('reset')" class="inline-flex items-center gap-1 text-xs font-medium text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:underline mt-2">
          <span>↺</span> Reset this step
        </button>
      </div>
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import type { ExperimentStep } from '@/types/virtualLab'
import AppIcon from '@/components/common/AppIcon.vue'

const props = defineProps<{
  steps: ExperimentStep[]
  currentStep: number
  allDone: boolean
  stagger: boolean
  hintLevels: string[]
  hintLevel: number
}>()

const emit = defineEmits<{ acknowledge: []; hint: []; reset: [] }>()

/** Every finished step plus the current one - later steps stay hidden until reached. */
const revealedSteps = computed(() => {
  const sorted = [...props.steps].sort((a, b) => a.step_number - b.step_number)
  return props.allDone ? sorted : sorted.filter(s => s.step_number <= props.currentStep)
})
const isDone = (n: number) => props.allDone || n < props.currentStep

// Keep the newly revealed step in view once it has dropped in
const currentEl: { el: HTMLElement | null } = { el: null }
watch(() => props.currentStep, () => {
  setTimeout(() => currentEl.el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 450)
})
</script>

<style scoped>
/* Each newly reached step drops into the list in slow motion */
.step-drop-enter-active {
  transition: opacity 0.9s ease-out, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}
.step-drop-enter-from {
  opacity: 0;
  transform: translateY(-26px) scale(0.97);
}
@media (prefers-reduced-motion: reduce) {
  .step-drop-enter-active { transition: none; }
}
</style>
