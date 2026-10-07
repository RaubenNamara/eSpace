<template>
  <!-- The top of every dashboard, on the same warm paper and gold border as the sidebar: the date, a
       greeting, one sentence of where things stand (figures picked out in indigo), chips and the
       main actions - and a strip under it for the week. A soft gold sun or moon for the time of day. -->
  <section class="mb-5 rounded-2xl overflow-hidden app-frame-sidebar">
    <div class="relative overflow-hidden px-5 py-6 sm:px-7 sm:py-7">
      <div class="pointer-events-none absolute inset-0" aria-hidden="true">
        <svg class="absolute inset-0 w-full h-full opacity-[0.35] dark:opacity-[0.15]" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="hero-dots" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="rgba(150,110,55,0.35)" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#hero-dots)" />
        </svg>
        <!-- Morning and afternoon: a sun; evening: a moon and stars -->
        <svg v-if="period !== 'evening'" class="absolute -right-12 -top-12 lg:right-[21rem] lg:top-auto lg:-bottom-20 w-52 h-52 opacity-40 dark:opacity-25" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="19" fill="#f2c96d" />
          <g stroke="#e6b450" stroke-width="2.5" stroke-linecap="round">
            <line v-for="i in 12" :key="i" x1="50" y1="15" x2="50" y2="23" :transform="`rotate(${i * 30} 50 50)`" />
          </g>
        </svg>
        <svg v-else class="absolute -right-6 -top-6 lg:right-[21rem] lg:top-3 w-36 h-36 opacity-40 dark:opacity-30" viewBox="0 0 100 100">
          <path d="M62 18a34 34 0 1 0 20 52A28 28 0 0 1 62 18z" fill="#e6c27a" />
          <circle cx="22" cy="24" r="1.8" fill="#d4a24c" /><circle cx="84" cy="30" r="1.4" fill="#d4a24c" /><circle cx="30" cy="80" r="1.2" fill="#d4a24c" />
        </svg>
      </div>

      <div class="relative flex flex-col lg:flex-row lg:items-center gap-5">
        <div class="flex-1 min-w-0">
          <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-800/70 dark:text-amber-200/60">{{ date }}</p>
          <h1 class="mt-1 text-[26px] sm:text-[32px] font-extrabold tracking-tight leading-tight text-gray-900 dark:text-white">{{ title }}</h1>
          <p v-if="parts.length" class="mt-2 text-[15px] sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">
            <template v-for="(part, i) in parts" :key="i"><b v-if="part.strong" class="font-bold px-1.5 py-px rounded-md" :class="part.alert ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-200' : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200'">{{ part.text }}</b><template v-else>{{ part.text }}</template></template>
          </p>
          <div class="mt-3.5 flex flex-wrap items-center gap-2 text-xs">
            <template v-for="c in chips" :key="c.text">
              <component
                :is="c.to ? 'RouterLink' : c.onClick ? 'button' : 'span'"
                :to="c.to"
                :type="c.onClick ? 'button' : undefined"
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold"
                :class="[CHIP[c.tone || 'glass'], (c.to || c.onClick) ? 'hover:ring-indigo-300 dark:hover:ring-indigo-600' : '']"
                @click="c.onClick?.()"
              >
                <AppIcon v-if="c.icon" :name="c.icon" class="w-3.5 h-3.5" />{{ c.text }}
              </component>
            </template>
            <slot name="chips" />
          </div>
        </div>

        <div v-if="actions.length" class="grid grid-cols-2 gap-2 lg:w-[19rem] flex-shrink-0">
          <component
            :is="a.to ? 'RouterLink' : 'button'"
            v-for="(a, i) in actions"
            :key="a.label"
            :to="a.to"
            :type="a.to ? undefined : 'button'"
            class="relative inline-flex items-center justify-center gap-1.5 rounded-xl font-semibold transition min-w-0"
            :class="i === 0
              ? `col-span-2 py-2.5 px-3 text-sm text-white shadow-md hover:-translate-y-px ${a.danger ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/25' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/25'}`
              : 'py-2 text-[13px] bg-white/80 dark:bg-gray-800/70 ring-1 ring-amber-900/15 dark:ring-amber-200/10 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800'"
            @click="a.onClick?.()"
          >
            <AppIcon :name="a.icon" class="w-4 h-4 flex-shrink-0" :class="i === 0 ? '' : 'text-indigo-500 dark:text-indigo-300'" />
            <span class="truncate">{{ a.label }}</span>
            <span v-if="a.badge" class="absolute -top-1.5 -right-1.5 min-w-[1.25rem] h-5 px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">{{ a.badge > 99 ? '99+' : a.badge }}</span>
          </component>
        </div>
      </div>
    </div>

    <div v-if="$slots.default" class="px-5 sm:px-7 py-4 border-t border-amber-900/10 dark:border-amber-200/10 bg-white/55 dark:bg-black/15">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'

export interface HeroPart { text: string; strong?: boolean; alert?: boolean }
export interface HeroChip { text: string; icon?: string; tone?: 'solid' | 'glass' | 'warn'; to?: string; onClick?: () => void }
export interface HeroAction { label: string; icon: string; to?: string; onClick?: () => void; badge?: number; danger?: boolean }

withDefaults(defineProps<{
  date: string
  title: string
  parts?: HeroPart[]
  chips?: HeroChip[]
  actions?: HeroAction[]
}>(), { parts: () => [], chips: () => [], actions: () => [] })

// One look for every role: indigo for what matters, the paper's gold for the rest
const CHIP = {
  solid: 'bg-indigo-600 text-white',
  glass: 'bg-white/70 dark:bg-gray-800/60 text-gray-700 dark:text-gray-200 ring-1 ring-amber-900/15 dark:ring-amber-200/10',
  warn: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200 ring-1 ring-amber-300/60 dark:ring-amber-700/50'
}

const period = computed(() => {
  const h = new Date().getHours()
  return h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening'
})
</script>
