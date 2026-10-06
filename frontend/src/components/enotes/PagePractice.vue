<template>
  <!-- The Item Bank questions the teacher placed on this page, to try right here: a question
       from a written paper (answer and check), or a page of a past paper. -->
  <div v-if="items.length" class="page-practice mt-6 space-y-3">
    <div v-for="it in items" :key="`${it.item_id}-${it.item_page}`" class="rounded-2xl border border-amber-200 dark:border-amber-800/70 bg-amber-50/50 dark:bg-amber-900/10 p-3 sm:p-4" @mousedown.stop @touchstart.stop>
      <p class="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-amber-700 dark:text-amber-300">
        <span class="w-5 h-5 rounded-md bg-amber-500 text-white flex items-center justify-center text-[10px]">?</span>
        Try this
        <span class="font-normal normal-case tracking-normal text-amber-700/70 dark:text-amber-300/70 truncate">· {{ it.title }}{{ it.kind === 'pdf' ? `, page ${it.item_page}` : '' }}</span>
      </p>
      <PracticeQuestion v-if="it.kind === 'paper' && it.question" :question="it.question" :item-id="it.item_id" :enote-page-id="pageId" />
      <PdfPageView v-else-if="it.kind === 'pdf' && it.file_path" :url="it.file_path" :page="it.item_page" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import PracticeQuestion from '@/components/itembank/PracticeQuestion.vue'
import PdfPageView from '@/components/itembank/PdfPageView.vue'
import { usePagePractice } from '@/composables/usePagePractice'

const props = defineProps<{ topicId: number; pageId: number }>()
const store = usePagePractice(props.topicId)
const items = computed(() => store.forPage(props.pageId))
</script>
