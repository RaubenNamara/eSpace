<template>
  <!-- What students said each page means, in their own words ("Explain it back") - the quickest
       way to spot a page that was misunderstood. -->
  <div class="w-full max-w-5xl">
    <button type="button" class="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" @click="router.push('/teacher/enotes')">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
      eNotes
    </button>
    <PageHeader title="In their own words" :description="data ? `${data.topic.title} - what students said each page means. Read a page's answers together to spot a misunderstanding.` : 'Loading…'" icon="chat" accent="indigo">
      <template #actions>
        <RouterLink v-if="data" :to="`/teacher/enotes/builder/${data.topic.id}`" class="btn-secondary">Edit the notes</RouterLink>
      </template>
      <StatStrip v-if="data" :items="statItems" />
    </PageHeader>

    <div v-if="loading" class="space-y-3"><div v-for="i in 3" :key="i" class="h-32 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 animate-pulse"></div></div>
    <EmptyState v-else-if="data && !data.total" icon="chat" tone="indigo" title="No explanations yet" message="Under every page, students can explain it back in one sentence. As they do, their words show up here, page by page." />

    <template v-else-if="data">
      <label class="mb-3 inline-flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 cursor-pointer">
        <input v-model="onlyAnswered" type="checkbox" class="w-3.5 h-3.5 rounded border-gray-300 text-indigo-600"> Only pages with answers
      </label>
      <section v-for="p in shownPages" :key="p.id" class="mb-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
        <header class="flex items-baseline gap-2 mb-2">
          <h2 class="text-sm font-bold text-gray-900 dark:text-white">Page {{ p.number }}<span v-if="meaningful(p.title)" class="font-normal text-gray-500 dark:text-gray-400"> · {{ p.title }}</span></h2>
          <span class="ml-auto text-xs text-gray-400">{{ p.explanations.length }} answer{{ p.explanations.length === 1 ? '' : 's' }}</span>
        </header>
        <p v-if="!p.explanations.length" class="text-xs text-gray-400">No one has explained this page yet.</p>
        <ul v-else class="grid md:grid-cols-2 gap-2">
          <li v-for="(e, i) in p.explanations" :key="i" class="rounded-xl bg-gray-50 dark:bg-gray-900/40 px-3 py-2">
            <p class="text-sm text-gray-800 dark:text-gray-100">“{{ e.body }}”</p>
            <p class="mt-1 text-[11px] text-gray-500 dark:text-gray-400">{{ niceName(e.student) }}<template v-if="e.class"> · {{ e.class }}</template> · {{ timeAgo(e.at) }}</p>
          </li>
        </ul>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import { niceName, timeAgo } from '@/components/dashboard/teacher/time'
import { useToastStore } from '@/stores/toast'

interface PageRow { id: number; number: number; title: string; explanations: { student: string; class: string; body: string; at: string }[] }
interface Payload { topic: { id: number; title: string }; pages: PageRow[]; total: number }

const route = useRoute()
const router = useRouter()
const toast = useToastStore()
const data = ref<Payload | null>(null)
const loading = ref(true)
const onlyAnswered = ref(false)

const meaningful = (t: string) => !!t && !['page', 'new page'].includes(t.trim().toLowerCase())
const shownPages = computed(() => (data.value?.pages || []).filter(p => !onlyAnswered.value || p.explanations.length))
const statItems = computed<StatItem[]>(() => {
  const d = data.value!
  const students = new Set(d.pages.flatMap(p => p.explanations.map(e => e.student))).size
  return [
    { label: 'Explanations', value: d.total, tone: 'indigo' },
    { label: 'Students', value: students, tone: 'sky' },
    { label: 'Pages explained', value: `${d.pages.filter(p => p.explanations.length).length}/${d.pages.length}`, tone: 'emerald' }
  ]
})

onMounted(async () => {
  try {
    const res = await axios.get(`/api/teacher/enotes/topics/${route.params.id}/explanations`)
    data.value = res.data.data
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not load the explanations')
  } finally {
    loading.value = false
  }
})
</script>
