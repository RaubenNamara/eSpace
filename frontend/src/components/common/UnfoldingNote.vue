<template>
  <!-- A student's own note on a page, folded away as a small "My note" tab at the bottom of the
       page. Clicking the tab unfolds the note like a folded slip of paper: a small folded square
       opens out to the right into a strip, then opens up (or down, in a page's flow) to its full
       size, fold creases flattening as it opens. Used by the eLibrary / Item Bank reader (floating
       over the book) and the eNotes reader (at the foot of each page).
       mousedown/touchstart .stop: in the eNotes reader this sits inside page-flip's page, whose
       drag-to-flip listener would otherwise swallow focusing the textarea. -->
  <div
    class="unfolding-note"
    :class="floating ? 'is-floating absolute left-3 bottom-3 z-40 pointer-events-none' : 'is-inline relative mt-6'"
    @mousedown.stop
    @touchstart.stop
  >
    <Transition name="note-tab">
      <button
        v-if="!open && (hasText || showAdd)"
        type="button"
        class="note-tab pointer-events-auto inline-flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full shadow-lg ring-1 ring-black/5 dark:ring-white/10 text-xs font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all"
        :class="hasText ? 'bg-white/95 dark:bg-gray-800/95 text-gray-700 dark:text-gray-100' : 'bg-white/80 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400'"
        :title="hasText ? 'Open my note on this page' : 'Write a note on this page'"
        @click="emit('update:open', true)"
      >
        <span
          class="note-tab-icon w-7 h-7 rounded-md flex items-center justify-center shadow-sm"
          :class="hasText ? [style.swatch, 'has-note'] : 'bg-gray-100 dark:bg-gray-700 border border-dashed border-gray-300 dark:border-gray-600'"
        >
          <svg class="w-4 h-4" :class="hasText ? 'text-white drop-shadow' : 'text-gray-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="hasText" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14M5 12h14"></path>
          </svg>
        </span>
        <span>{{ hasText ? tabLabel : addLabel }}</span>
        <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </Transition>

    <Transition name="note-unfold">
      <div
        v-if="open"
        class="note-card pointer-events-auto rounded-2xl bg-white dark:bg-gray-800 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden flex flex-col"
        :class="floating ? 'w-[22rem] max-w-full' : 'w-full max-w-md'"
      >
        <div class="note-card-body flex-1 min-h-0 p-3 flex flex-col" :class="style.panel">
          <div class="flex items-center justify-between gap-2 mb-1.5 flex-shrink-0">
            <p class="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide flex items-center gap-1.5 min-w-0">
              <span class="w-2.5 h-2.5 rounded-full flex-shrink-0" :class="style.swatch"></span><span class="truncate">{{ heading }}</span>
            </p>
            <div class="flex items-center gap-2 flex-shrink-0">
              <span class="text-[11px] text-gray-400">{{ status === 'saving' ? 'Saving…' : status === 'saved' ? 'Saved' : '' }}</span>
              <SummaryColorPicker :model-value="color" @update:model-value="emit('update:color', $event)" />
              <button type="button" @click="emit('update:open', false)" class="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors" title="Fold the note away">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
          <textarea
            :value="modelValue"
            @input="onInput"
            :rows="floating ? 5 : 4"
            maxlength="2000"
            placeholder="What did you understand from this page? (only you can see this)"
            class="flex-1 w-full text-sm px-3 py-2 rounded-lg border placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 resize-none"
            :class="style.box"
          ></textarea>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SummaryColorPicker from '@/components/enotes/SummaryColorPicker.vue'
import { summaryStyleOf, type SummaryColor } from '@/composables/useSummaryColor'

const props = withDefaults(defineProps<{
  modelValue: string
  open: boolean
  color: SummaryColor
  status?: 'idle' | 'saving' | 'saved'
  heading?: string
  // Over the book (eLibrary / Item Bank) rather than in the page's own flow (eNotes)
  floating?: boolean
  // Show an "Add my note" tab on pages that have no note yet
  showAdd?: boolean
  tabLabel?: string
  addLabel?: string
}>(), {
  status: 'idle',
  heading: 'My Note',
  floating: false,
  showAdd: false,
  tabLabel: 'My note',
  addLabel: 'Add my note'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:open': [value: boolean]
  'update:color': [value: SummaryColor]
  input: []
}>()

const hasText = computed(() => !!props.modelValue.trim())
const style = computed(() => summaryStyleOf(props.color))

const onInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLTextAreaElement).value)
  emit('input')
}
</script>

<style scoped>
/* The tab pops up from the page's bottom edge (after a folding note has had a moment to close) */
.note-tab-enter-active {
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s, opacity 0.25s ease 0.15s;
}
.note-tab-leave-active {
  transition: transform 0.15s ease, opacity 0.15s ease;
}
.note-tab-enter-from,
.note-tab-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.85);
}
.note-tab-icon.has-note {
  animation: note-wiggle 0.6s ease 0.5s 1;
}
@keyframes note-wiggle {
  0%, 100% { transform: rotate(0); }
  30% { transform: rotate(-10deg); }
  60% { transform: rotate(8deg); }
}

/* In a page's flow the tab and card share one spot: the note folding away is lifted out of the
   flow so the tab can take its place straight away */
.is-inline .note-unfold-leave-active {
  position: absolute;
  top: 0;
  left: 0;
}
.is-floating .note-unfold-leave-active {
  position: absolute;
  bottom: 0;
  left: 0;
}

/* The unfold. Floating (over the book): the note sits at the bottom, so it opens right, then up.
   Inline (a page's foot): it opens right, then down into the space below the tab. The paper keeps
   its colour the whole time so its shape reads against a white page; the writing comes last. */
.note-card {
  position: relative;
}
.is-floating .note-card {
  transform-origin: left bottom;
}
.is-inline .note-card {
  transform-origin: left top;
}
.is-floating .note-unfold-enter-active {
  animation: note-unfold-up 1.05s cubic-bezier(0.65, 0, 0.35, 1) both;
}
.is-floating .note-unfold-leave-active {
  animation: note-unfold-up 0.6s cubic-bezier(0.65, 0, 0.35, 1) reverse both;
}
.is-inline .note-unfold-enter-active {
  animation: note-unfold-down 1.05s cubic-bezier(0.65, 0, 0.35, 1) both;
}
.is-inline .note-unfold-leave-active {
  animation: note-unfold-down 0.6s cubic-bezier(0.65, 0, 0.35, 1) reverse both;
}
.note-unfold-enter-active .note-card-body > * {
  animation: note-writing 1.05s ease both;
}
/* Fold creases: two vertical folds (the strip's three panels) and one horizontal fold */
.note-card::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  background:
    linear-gradient(90deg, transparent calc(33.3% - 6px), rgba(0, 0, 0, 0.16) 33.3%, rgba(255, 255, 255, 0.5) calc(33.3% + 1px), transparent calc(33.3% + 7px)),
    linear-gradient(90deg, transparent calc(66.6% - 6px), rgba(0, 0, 0, 0.16) 66.6%, rgba(255, 255, 255, 0.5) calc(66.6% + 1px), transparent calc(66.6% + 7px)),
    linear-gradient(180deg, transparent calc(50% - 6px), rgba(0, 0, 0, 0.14) 50%, rgba(255, 255, 255, 0.5) calc(50% + 1px), transparent calc(50% + 7px));
}
.note-unfold-enter-active::after {
  animation: note-crease 1.05s ease both;
}
.note-unfold-leave-active::after {
  animation: note-crease 0.6s ease reverse both;
}
/* Shading along the flap that is still turning open */
.note-card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0;
}
.is-floating .note-unfold-enter-active::before {
  animation: note-flap-up 1.05s cubic-bezier(0.65, 0, 0.35, 1) both;
}
.is-inline .note-unfold-enter-active::before {
  animation: note-flap-down 1.05s cubic-bezier(0.65, 0, 0.35, 1) both;
}

@keyframes note-unfold-up {
  0% {
    opacity: 0;
    clip-path: inset(calc(100% - 46px) calc(100% - 46px) 0 0 round 10px);
    transform: translateY(8px) rotate(-6deg) scale(0.9);
  }
  12% {
    opacity: 1;
    clip-path: inset(calc(100% - 46px) calc(100% - 46px) 0 0 round 10px);
    transform: none;
  }
  50%, 56% {
    clip-path: inset(calc(100% - 46px) 0 0 0 round 10px);
    transform: none;
  }
  100% {
    opacity: 1;
    clip-path: inset(0 0 0 0 round 16px);
    transform: none;
  }
}
@keyframes note-unfold-down {
  0% {
    opacity: 0;
    clip-path: inset(0 calc(100% - 46px) calc(100% - 46px) 0 round 10px);
    transform: translateY(-8px) rotate(6deg) scale(0.9);
  }
  12% {
    opacity: 1;
    clip-path: inset(0 calc(100% - 46px) calc(100% - 46px) 0 round 10px);
    transform: none;
  }
  50%, 56% {
    clip-path: inset(0 0 calc(100% - 46px) 0 round 10px);
    transform: none;
  }
  100% {
    opacity: 1;
    clip-path: inset(0 0 0 0 round 16px);
    transform: none;
  }
}
@keyframes note-flap-up {
  0%, 12% { opacity: 1; box-shadow: inset -34px 0 22px -20px rgba(0, 0, 0, 0.45); }
  50%, 56% { opacity: 1; box-shadow: inset 0 34px 22px -20px rgba(0, 0, 0, 0.45); }
  100% { opacity: 1; box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0); }
}
@keyframes note-flap-down {
  0%, 12% { opacity: 1; box-shadow: inset -34px 0 22px -20px rgba(0, 0, 0, 0.45); }
  50%, 56% { opacity: 1; box-shadow: inset 0 -34px 22px -20px rgba(0, 0, 0, 0.45); }
  100% { opacity: 1; box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0); }
}
@keyframes note-crease {
  0%, 55% { opacity: 1; }
  100% { opacity: 0; }
}
@keyframes note-writing {
  0%, 70% { opacity: 0; }
  100% { opacity: 1; }
}
/* Windows' "Animation effects" off (reduced motion): still unfold, just without the flap/wiggle */
@media (prefers-reduced-motion: reduce) {
  .note-unfold-enter-active::before,
  .note-tab-icon.has-note {
    animation: none;
  }
}
</style>
