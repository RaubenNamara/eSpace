import { ref, watch, type Ref } from 'vue'

/**
 * A ref whose value survives navigation and reloads via localStorage - used for "remembered
 * filters" (status/subject/class/search) so leaving a list page and coming back doesn't silently
 * reset it to "show everything". Falls back to `defaultValue` and degrades to a plain in-memory
 * ref (no persistence, no throw) if localStorage is unavailable (private browsing, quota, etc).
 */
export function usePersistedRef<T>(key: string, defaultValue: T): Ref<T> {
  let initial = defaultValue
  try {
    const stored = localStorage.getItem(key)
    if (stored !== null) initial = JSON.parse(stored) as T
  } catch {
    // ignore - fall back to defaultValue
  }

  const value = ref(initial) as Ref<T>

  watch(value, (val) => {
    try {
      localStorage.setItem(key, JSON.stringify(val))
    } catch {
      // ignore - storage unavailable, filter just won't persist this time
    }
  })

  return value
}
