<template>
  <!-- What a page or list shows when there's nothing in it yet: an icon, a short title, one
       sentence of why or what next, and the action that fills it (slot) -->
  <div
    class="text-center"
    :class="[
      card ? 'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700' : '',
      compact ? 'px-4 py-6' : 'px-6 py-10 sm:py-14'
    ]"
  >
    <div class="mx-auto rounded-2xl flex items-center justify-center" :class="[compact ? 'w-11 h-11' : 'w-14 h-14', TONE[tone]]">
      <AppIcon :name="icon" :class="compact ? 'w-5 h-5' : 'w-7 h-7'" />
    </div>
    <p class="font-semibold text-gray-900 dark:text-white" :class="compact ? 'mt-2.5 text-sm' : 'mt-4 text-base'">{{ title }}</p>
    <p v-if="message" class="mx-auto max-w-md text-gray-500 dark:text-gray-400" :class="compact ? 'mt-0.5 text-xs' : 'mt-1 text-sm'">{{ message }}</p>
    <div v-if="$slots.default" class="flex flex-wrap items-center justify-center gap-2" :class="compact ? 'mt-3' : 'mt-5'">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'

type Tone = 'indigo' | 'emerald' | 'violet' | 'amber' | 'rose' | 'sky' | 'gray'

withDefaults(defineProps<{
  title: string
  message?: string
  // An AppIcon name
  icon?: string
  tone?: Tone
  // Framed as a card (default) or plain, inside something that already is one
  card?: boolean
  compact?: boolean
}>(), { icon: 'sparkles', tone: 'indigo', card: true, compact: false })

const TONE: Record<Tone, string> = {
  indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300',
  emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300',
  violet: 'bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-300',
  amber: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300',
  rose: 'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-300',
  sky: 'bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-300',
  gray: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300'
}
</script>
