import { reactive } from 'vue'
import axios from 'axios'
import type { PaperQuestion } from '@/components/itembank/PracticeQuestion.vue'

// The Item Bank questions placed on a topic's pages (for the student reading it), fetched once
// per topic and shared by every page's PagePractice block.
export interface PracticeItem {
  item_id: number
  item_page: number
  title: string
  kind: 'paper' | 'pdf'
  file_path: string | null
  question: PaperQuestion | null
}

const stores = new Map<number, { forPage: (pageId: number) => PracticeItem[] }>()

export function usePagePractice(topicId: number) {
  const existing = stores.get(topicId)
  if (existing) return existing
  const state = reactive<{ byPage: Record<string, PracticeItem[]> }>({ byPage: {} })
  axios.get(`/api/student/enotes/topics/${topicId}/practice`)
    .then(res => { state.byPage = res.data.data.by_page || {} })
    .catch(() => { /* no practice shown - the notes still read fine */ })
  const store = { forPage: (pageId: number) => state.byPage[String(pageId)] || [] }
  stores.set(topicId, store)
  return store
}
