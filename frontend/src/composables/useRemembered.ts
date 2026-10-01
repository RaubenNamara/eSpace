import { watch, type Ref } from 'vue'
import { usePersistedRef } from './usePersistedRef'

/**
 * A page's remembered choice (a class, a term, a subject...): the last one picked, kept across
 * visits (usePersistedRef), and put back to a sensible default - the teacher's own class, the
 * current term - when it isn't one of the options any more (or never was). So a page opens on
 * something useful instead of "Select a class to see...".
 *
 *   const term = useRemembered('reports:term', termIds, () => currentTermId.value)
 *
 * `options` is the list of values the choice may take; while it's empty (still loading) the
 * stored value is left alone.
 */
export function useRemembered<T>(key: string, options: Ref<T[]>, fallback: () => T | null): Ref<T | null> {
  const value = usePersistedRef<T | null>(`remember:${key}`, null)
  watch(
    options,
    (list) => {
      if (!list.length) return
      if (value.value === null || !list.includes(value.value)) {
        const next = fallback()
        value.value = next !== null && list.includes(next) ? next : list[0]
      }
    },
    { immediate: true }
  )
  return value
}
