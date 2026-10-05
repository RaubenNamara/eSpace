<template>
  <!-- What's happened lately: submissions, eNotes finished, revision done, messages - the latest six,
       titled and sized like "Your classes" beside it, so the two columns line up row for row -->
  <section class="flex flex-col">
    <div class="flex items-center gap-2 mb-3">
      <h2 class="flex-1 text-sm font-bold text-gray-900 dark:text-white">Recent activity</h2>
      <RouterLink to="/teacher/chat" class="text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:underline">Chats</RouterLink>
    </div>
    <!-- On a wide screen the class cards set the height and the list fills it (it never stretches
         the row itself); on a phone it simply stacks -->
    <div class="relative flex-1 min-h-[18rem] lg:min-h-0 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
      <EmptyState v-if="!shown.length" :card="false" compact icon="sparkles" tone="gray" title="Nothing yet" message="Submissions, finished eNotes and messages from your students appear here." />
      <ol v-else class="relative lg:absolute lg:inset-4 h-full lg:h-auto flex flex-col gap-1 before:absolute before:left-[15px] before:top-4 before:bottom-4 before:w-px before:bg-gray-200 dark:before:bg-gray-700">
        <!-- A full six share the height evenly; fewer stack from the top -->
        <li v-for="(a, i) in shown" :key="i" class="flex" :class="shown.length === MAX ? 'flex-1' : ''">
          <RouterLink :to="a.to" class="relative w-full min-w-0 flex items-center gap-3 rounded-lg -mx-1 px-1 py-1 hover:bg-gray-50 dark:hover:bg-gray-700/40" :title="`${niceName(a.who)} ${KIND[a.kind].verb} ${a.what}`">
            <span class="relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ring-4 ring-white dark:ring-gray-800" :class="KIND[a.kind].icon">
              <AppIcon :name="KIND[a.kind].name" class="w-4 h-4" />
            </span>
            <span class="min-w-0 flex-1">
              <span class="block text-xs text-gray-800 dark:text-gray-100 leading-snug truncate">
                <span class="font-semibold">{{ niceName(a.who) }}</span> {{ KIND[a.kind].verb }} <span class="font-medium">{{ a.kind === 'message' ? `“${a.what}”` : niceName(a.what) }}</span>
              </span>
              <span class="block text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">{{ timeAgo(a.at) }}</span>
            </span>
          </RouterLink>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import { niceName, timeAgo } from './time'

type Kind = 'submission' | 'enote' | 'revised' | 'message'
const props = defineProps<{ items: { kind: Kind; at: string; who: string; what: string; to: string }[] }>()

const MAX = 6
const shown = computed(() => props.items.slice(0, MAX))

const KIND: Record<Kind, { name: string; verb: string; icon: string }> = {
  submission: { name: 'send', verb: 'submitted', icon: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300' },
  enote: { name: 'book', verb: 'finished reading', icon: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300' },
  revised: { name: 'target', verb: 'revised', icon: 'bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-300' },
  message: { name: 'chat', verb: 'wrote', icon: 'bg-sky-100 text-sky-600 dark:bg-sky-900/40 dark:text-sky-300' }
}
</script>
