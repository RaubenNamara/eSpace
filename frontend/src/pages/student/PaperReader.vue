<template>
  <!-- A paper written in eSpace, one question at a time: answer, check, see the right answer or
       the model, and move on. The dots along the top show where you are and how you did. -->
  <div class="w-full max-w-3xl mx-auto">
    <button type="button" class="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" @click="router.push('/student/itembank')">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
      Item Bank
    </button>

    <div v-if="loading" class="h-80 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 animate-pulse"></div>
    <EmptyState v-else-if="!data" icon="clipboard" tone="gray" title="This paper isn't available" message="It may have been taken down by your teacher." />
    <EmptyState v-else-if="!data.pages.length" icon="clipboard" tone="gray" :title="data.paper.title" message="No questions in this paper yet." />

    <template v-else>
      <header class="mb-4">
        <p v-if="data.paper.subject" class="text-[11px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">{{ data.paper.subject }}</p>
        <h1 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{{ data.paper.title }}</h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ answered }} of {{ data.pages.length }} answered<template v-if="checkable"> · {{ rightCount }} right</template></p>
        <!-- Where you are, and how each went -->
        <div class="mt-3 flex flex-wrap gap-1.5" role="tablist" aria-label="Questions">
          <button
            v-for="(p, i) in data.pages"
            :key="p.id"
            type="button"
            role="tab"
            :aria-selected="i === index"
            :aria-label="`Question ${i + 1}`"
            class="w-8 h-8 rounded-full text-xs font-bold border-2 transition-colors"
            :class="dotClass(p, i)"
            @click="index = i"
          >{{ i + 1 }}</button>
        </div>
      </header>

      <article class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-6">
        <p class="mb-2 text-xs font-semibold text-gray-400">Question {{ index + 1 }} of {{ data.pages.length }}</p>
        <PracticeQuestion :key="page.id" :question="page" :item-id="data.paper.id" @answered="onAnswered" />
      </article>

      <div class="mt-4 flex items-center justify-between">
        <button type="button" class="btn-secondary" :disabled="index === 0" @click="index--">← Previous</button>
        <button v-if="index < data.pages.length - 1" type="button" class="btn-primary" @click="index++">Next →</button>
        <p v-else class="text-sm font-semibold text-gray-600 dark:text-gray-300">{{ checkable ? `${rightCount} of ${checkable} right` : 'Last question' }}</p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import EmptyState from '@/components/ui/EmptyState.vue'
import PracticeQuestion, { type PaperQuestion } from '@/components/itembank/PracticeQuestion.vue'

type Page = PaperQuestion & { tried: boolean; was_right: boolean | null }
interface Payload { paper: { id: number; title: string; subject: string | null }; pages: Page[] }

const route = useRoute()
const router = useRouter()
const data = ref<Payload | null>(null)
const loading = ref(true)
const index = ref(0)

const page = computed(() => data.value!.pages[index.value])
const answered = computed(() => data.value?.pages.filter(p => p.tried).length || 0)
const checkable = computed(() => data.value?.pages.filter(p => !['written', 'none'].includes(p.answer_type)).length || 0)
const rightCount = computed(() => data.value?.pages.filter(p => p.was_right === true).length || 0)

const dotClass = (p: Page, i: number) => {
  const here = i === index.value ? 'ring-2 ring-offset-2 ring-indigo-400 dark:ring-offset-gray-900' : ''
  if (p.was_right === true) return `${here} border-emerald-500 bg-emerald-500 text-white`
  if (p.was_right === false) return `${here} border-rose-400 bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200`
  if (p.tried) return `${here} border-indigo-400 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200`
  return `${here} border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400`
}

const onAnswered = (right: boolean | null) => {
  const p = page.value
  p.tried = true
  // Keep the best result for the dots
  if (right === true || p.was_right === null) p.was_right = right
}

onMounted(async () => {
  try {
    const res = await axios.get(`/api/student/itembank/${route.params.id}/paper`)
    data.value = res.data.data
  } catch {
    data.value = null
  } finally {
    loading.value = false
  }
})
</script>
