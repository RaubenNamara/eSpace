import { reactive } from 'vue'
import axios from 'axios'
import { useToastStore } from '@/stores/toast'

// A student's "explain it back" sentences for one topic, fetched once and shared by every page's
// ExplainItBack box (the reader renders many pages at once).
interface Store {
  get: (pageId: number) => string | null
  save: (pageId: number, body: string) => Promise<boolean>
}

const stores = new Map<number, Store>()

export function useExplanations(topicId: number): Store {
  const existing = stores.get(topicId)
  if (existing) return existing

  const state = reactive<{ byPage: Record<string, string> }>({ byPage: {} })
  axios.get(`/api/student/enotes/topics/${topicId}/explanations`)
    .then(res => { state.byPage = res.data.data.explanations || {} })
    .catch(() => { /* the boxes still work - they just start empty */ })

  const store: Store = {
    get: pageId => state.byPage[String(pageId)] || null,
    save: async (pageId, body) => {
      const text = body.trim()
      try {
        await axios.put(`/api/student/enotes/pages/${pageId}/explanation`, { body: text })
        if (text) state.byPage[String(pageId)] = text
        else delete state.byPage[String(pageId)]
        return true
      } catch (err: any) {
        useToastStore().error(err.response?.data?.message || 'Could not save that - try again')
        return false
      }
    }
  }
  stores.set(topicId, store)
  return store
}
