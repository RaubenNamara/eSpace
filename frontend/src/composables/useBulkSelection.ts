import { computed, shallowRef } from 'vue'

/**
 * Generic checkbox-selection state for a list page's bulk action bar. `visibleIds` is whatever
 * the caller currently considers selectable (usually the filtered/paginated rows on screen) -
 * `allSelected`/`toggleAll` are always relative to that list, not the full unfiltered dataset.
 *
 * Uses shallowRef (not ref) for the Set: Vue's deep-unwrap typing (UnwrapRef) can't distribute
 * over a generic T constrained to `number | string`, which produces spurious TS2345/TS2322
 * errors under a plain ref - shallowRef sidesteps that since it never tries to unwrap the value,
 * which is fine here since the Set is always swapped wholesale, never mutated in place.
 */
export function useBulkSelection<T extends number | string>() {
  const selected = shallowRef<Set<T>>(new Set())

  const selectedCount = computed(() => selected.value.size)
  const hasSelection = computed(() => selected.value.size > 0)

  function isSelected(id: T): boolean {
    return selected.value.has(id)
  }

  function toggle(id: T): void {
    const next = new Set(selected.value)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    selected.value = next
  }

  function allSelected(visibleIds: T[]): boolean {
    return visibleIds.length > 0 && visibleIds.every(id => selected.value.has(id))
  }

  function toggleAll(visibleIds: T[]): void {
    if (allSelected(visibleIds)) {
      const next = new Set(selected.value)
      visibleIds.forEach(id => next.delete(id))
      selected.value = next
    } else {
      selected.value = new Set([...selected.value, ...visibleIds])
    }
  }

  function clear(): void {
    selected.value = new Set()
  }

  function selectedArray(): T[] {
    return Array.from(selected.value)
  }

  return { selected, selectedCount, hasSelection, isSelected, toggle, allSelected, toggleAll, clear, selectedArray }
}
