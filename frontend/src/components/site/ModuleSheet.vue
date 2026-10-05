<template>
  <!-- One module, opened from its card on the landing page: what it does, who uses it, and where
       the guide explains it. A centred panel on wide screens, a bottom sheet on phones.
       Arrow keys / the arrows step through the modules; Esc closes. -->
  <Teleport to="body">
    <Transition name="sheet">
      <div v-if="module" class="site-plain fixed inset-0 z-[70] flex items-end sm:items-center justify-center sm:p-6" role="dialog" aria-modal="true" :aria-label="module.name" @keydown="onKey">
        <div class="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" @click="emit('close')"></div>
        <div ref="panel" tabindex="-1" class="sheet-panel relative w-full sm:max-w-lg max-h-[88dvh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 shadow-2xl outline-none">
          <div class="sm:hidden mx-auto mt-3 w-10 h-1.5 rounded-full bg-slate-200 dark:bg-white/15"></div>
          <div class="p-6 sm:p-8">
            <div class="flex items-start gap-4">
              <span class="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300"><AppIcon :name="module.icon" class="w-7 h-7" /></span>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-bold uppercase tracking-widest text-slate-400">{{ category }}</p>
                <h3 class="font-jakarta text-2xl font-extrabold tracking-tight">{{ module.name }}</h3>
              </div>
              <button type="button" class="p-2 -m-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-white/10" aria-label="Close" @click="emit('close')">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            <p class="mt-5 text-slate-600 dark:text-slate-300 leading-relaxed">{{ module.short }}</p>

            <ul class="mt-5 space-y-2.5">
              <li v-for="f in module.features" :key="f" class="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-200">
                <AppIcon name="check-circle" class="w-4 h-4 mt-0.5 flex-shrink-0 text-indigo-500" />{{ f }}
              </li>
            </ul>

            <div class="mt-6">
              <p class="text-xs font-bold uppercase tracking-widest text-slate-400">Used by</p>
              <p class="mt-2 flex flex-wrap gap-1.5">
                <span v-for="r in module.roles" :key="r" class="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200">{{ ROLE_LABEL[r] }}</span>
              </p>
            </div>

            <div class="mt-8 flex flex-wrap items-center gap-3">
              <router-link v-if="module.guide" :to="`/guide#${module.guide}`" class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700" @click="emit('close')">
                How it works, step by step
              </router-link>
              <a href="#demo" class="inline-flex px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-slate-300" @click="emit('close')">Request a demo</a>
            </div>
          </div>

          <!-- Step through the modules -->
          <div class="flex items-center justify-between gap-2 px-4 sm:px-6 py-3 border-t border-slate-100 dark:border-white/10 text-sm">
            <button type="button" class="inline-flex items-center gap-1.5 px-2 py-1.5 rounded-lg font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 min-w-0" @click="emit('step', -1)">
              <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
              <span class="truncate">{{ prevName }}</span>
            </button>
            <span class="text-xs text-slate-400 flex-shrink-0">{{ position }}</span>
            <button type="button" class="inline-flex items-center gap-1.5 px-2 py-1.5 rounded-lg font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 min-w-0" @click="emit('step', 1)">
              <span class="truncate">{{ nextName }}</span>
              <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { CATEGORIES, ROLE_LABEL, type EModule } from '@/data/modules'

const props = defineProps<{ module: EModule | null; list: EModule[] }>()
const emit = defineEmits<{ close: []; step: [dir: number] }>()

const panel = ref<HTMLElement | null>(null)
const index = computed(() => (props.module ? props.list.findIndex(m => m.key === props.module!.key) : -1))
const at = (d: number) => props.list[(index.value + d + props.list.length) % props.list.length]
const prevName = computed(() => at(-1)?.name ?? '')
const nextName = computed(() => at(1)?.name ?? '')
const position = computed(() => `${index.value + 1} of ${props.list.length}`)
const category = computed(() => CATEGORIES.find(c => c.key === props.module?.category)?.label ?? '')

const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
  else if (e.key === 'ArrowRight') emit('step', 1)
  else if (e.key === 'ArrowLeft') emit('step', -1)
}

// Keep the page still behind the sheet, and put keyboard focus in it
watch(() => !!props.module, open => {
  document.body.style.overflow = open ? 'hidden' : ''
  if (open) nextTick(() => panel.value?.focus())
})
</script>

<style scoped>
.sheet-enter-active, .sheet-leave-active { transition: opacity 0.2s ease; }
.sheet-enter-active .sheet-panel, .sheet-leave-active .sheet-panel { transition: transform 0.25s ease; }
.sheet-enter-from, .sheet-leave-to { opacity: 0; }
.sheet-enter-from .sheet-panel, .sheet-leave-to .sheet-panel { transform: translateY(24px); }
</style>
