<template>
  <!-- What's happened lately: submissions, eNotes finished, revision done, messages -->
  <section class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5">
    <h2 class="text-sm font-bold text-gray-900 dark:text-white mb-3">Recent activity</h2>
    <EmptyState v-if="!items.length" :card="false" compact icon="sparkles" tone="gray" title="Nothing yet" message="Submissions, finished eNotes and messages from your students appear here." />
    <ol v-else class="relative space-y-3 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-px before:bg-gray-200 dark:before:bg-gray-700">
      <li v-for="(a, i) in items" :key="i">
        <RouterLink :to="a.to" class="relative flex items-start gap-3 rounded-lg -mx-1 px-1 py-0.5 hover:bg-gray-50 dark:hover:bg-gray-700/40">
          <span class="relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ring-4 ring-white dark:ring-gray-800" :class="KIND[a.kind].icon">
            <AppIcon :name="KIND[a.kind].name" class="w-4 h-4" />
          </span>
          <span class="min-w-0 flex-1 pt-0.5">
            <span class="block text-xs text-gray-800 dark:text-gray-100 leading-snug">
              <span class="font-semibold">{{ niceName(a.who) }}</span> {{ KIND[a.kind].verb }} <span class="font-medium">{{ a.kind === 'message' ? `“${a.what}”` : niceName(a.what) }}</span>
            </span>
            <span class="block text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">{{ timeAgo(a.at) }}</span>
          </span>
        </RouterLink>
      </li>
    </ol>
  </section>
</template>

<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import { niceName, timeAgo } from './time'

type Kind = 'submission' | 'enote' | 'revised' | 'message'
defineProps<{ items: { kind: Kind; at: string; who: string; what: string; to: string }[] }>()

const KIND: Record<Kind, { name: string; verb: string; icon: string }> = {
  submission: { name: 'send', verb: 'submitted', icon: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300' },
  enote: { name: 'book', verb: 'finished reading', icon: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300' },
  revised: { name: 'target', verb: 'revised', icon: 'bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-300' },
  message: { name: 'chat', verb: 'wrote', icon: 'bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-300' }
}
</script>
