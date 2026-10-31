/**
 * A mark as people write it: whole marks with no decimals (20.00 -> "20", 1.00 -> "1"); a real
 * half mark keeps it (2.50 -> "2.5"). Empty -> "-".
 */
export function fmtMarks(value: number | string | null | undefined): string {
  if (value === null || value === undefined || value === '') return '-'
  const n = Number(value)
  if (!Number.isFinite(n)) return String(value)
  return String(Math.round(n * 100) / 100)
}
