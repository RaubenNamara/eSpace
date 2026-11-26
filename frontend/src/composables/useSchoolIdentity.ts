import { ref, computed } from 'vue'
import apiService from '@/services/api'

/**
 * The signed-in user's own school - its name, motto and crest (Admin > Settings) - and where the
 * school year stands (term, year, week of term). Each school's own, from its own database: Tusome
 * never shows one school's identity to another. Loaded once and shared by the sidebar and the
 * dashboards; reset() on sign-out.
 */
export interface SchoolIdentity {
  name: string | null
  motto: string | null
  logo: string | null
  term: { name: string; year: string | null; week: number | null; in_term: boolean; ends: string } | null
}

const identity = ref<SchoolIdentity | null>(null)
let loading: Promise<void> | null = null

function load(force = false): Promise<void> {
  if (loading && !force) return loading
  loading = apiService.get('/school/identity')
    .then((r) => { identity.value = r.data.data })
    .catch(() => { loading = null })
  return loading
}

/** "Term 3 · 2026 · Week 12" (or "Term 3 · 2026 · Holiday" between terms) */
const termLine = computed(() => {
  const t = identity.value?.term
  if (!t) return ''
  const parts = [t.name]
  if (t.year && !t.name.includes(t.year)) parts.push(t.year)
  parts.push(t.in_term && t.week ? `Week ${t.week}` : 'Holiday')
  return parts.join(' · ')
})

/** up to two letters from the school's name, for a crest when the school has not uploaded one */
const initials = computed(() => {
  const words = (identity.value?.name || '').replace(/[^A-Za-z\s']/g, ' ').split(/\s+/)
    .filter(w => w && !/^(of|the|and|st|st\.)$/i.test(w))
  return words.slice(0, 2).map(w => w[0].toUpperCase()).join('')
})

export function useSchoolIdentity() {
  if (!identity.value) load()
  return {
    identity,
    termLine,
    initials,
    reload: () => load(true),
    reset: () => { identity.value = null; loading = null },
  }
}
