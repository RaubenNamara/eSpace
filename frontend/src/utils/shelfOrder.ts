// Ordering for the eNotes/eLibrary bookcases: newest books first on each shelf, and the shelves
// holding the most recently added books first - so empty subject shelves sink to the end instead
// of leaving gaps between full ones.

type Dated = { published_at?: string | null; created_at?: string | null }

export const addedAt = (item: Dated): number =>
  new Date(item.published_at || item.created_at || 0).getTime() || 0

/** Sorts each shelf's items newest first, then the shelves by their newest item (empty last). */
export function orderShelves<G extends { name: string }, T extends Dated>(
  groups: G[],
  itemsOf: (group: G) => T[]
): G[] {
  groups.forEach(group => itemsOf(group).sort((a, b) => addedAt(b) - addedAt(a)))
  const latest = (group: G) => {
    const items = itemsOf(group)
    return items.length ? addedAt(items[0]) : -1
  }
  return groups.sort((a, b) => latest(b) - latest(a) || a.name.localeCompare(b.name))
}
