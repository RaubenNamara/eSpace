import { computed } from 'vue'
import { usePersistedRef } from './usePersistedRef'

// The colour a student picks for their own "My Summary" notes, so their writing stands apart
// from the teacher's page content. One choice shared by the eNotes reader and the library PDF
// viewer, remembered on this device. Class strings are written out in full so Tailwind keeps them.
export const SUMMARY_COLORS = [
  {
    value: 'yellow',
    label: 'Sticky yellow',
    swatch: 'bg-yellow-300',
    box: 'bg-yellow-50 border-yellow-300 text-yellow-950 dark:bg-yellow-900/30 dark:border-yellow-700 dark:text-yellow-100 focus:ring-yellow-400',
    panel: 'bg-yellow-100/70 dark:bg-yellow-900/20'
  },
  {
    value: 'blue',
    label: 'Blue',
    swatch: 'bg-sky-400',
    box: 'bg-sky-50 border-sky-300 text-sky-950 dark:bg-sky-900/30 dark:border-sky-700 dark:text-sky-100 focus:ring-sky-400',
    panel: 'bg-sky-100/70 dark:bg-sky-900/20'
  },
  {
    value: 'green',
    label: 'Green',
    swatch: 'bg-emerald-400',
    box: 'bg-emerald-50 border-emerald-300 text-emerald-950 dark:bg-emerald-900/30 dark:border-emerald-700 dark:text-emerald-100 focus:ring-emerald-400',
    panel: 'bg-emerald-100/70 dark:bg-emerald-900/20'
  },
  {
    value: 'pink',
    label: 'Pink',
    swatch: 'bg-pink-400',
    box: 'bg-pink-50 border-pink-300 text-pink-950 dark:bg-pink-900/30 dark:border-pink-700 dark:text-pink-100 focus:ring-pink-400',
    panel: 'bg-pink-100/70 dark:bg-pink-900/20'
  },
  {
    value: 'purple',
    label: 'Purple',
    swatch: 'bg-violet-400',
    box: 'bg-violet-50 border-violet-300 text-violet-950 dark:bg-violet-900/30 dark:border-violet-700 dark:text-violet-100 focus:ring-violet-400',
    panel: 'bg-violet-100/70 dark:bg-violet-900/20'
  },
  {
    value: 'orange',
    label: 'Orange',
    swatch: 'bg-orange-400',
    box: 'bg-orange-50 border-orange-300 text-orange-950 dark:bg-orange-900/30 dark:border-orange-700 dark:text-orange-100 focus:ring-orange-400',
    panel: 'bg-orange-100/70 dark:bg-orange-900/20'
  }
] as const

export type SummaryColor = typeof SUMMARY_COLORS[number]['value']

export function useSummaryColor() {
  const summaryColor = usePersistedRef<SummaryColor>('student-summary-color', 'yellow')
  const summaryStyle = computed(() => SUMMARY_COLORS.find(c => c.value === summaryColor.value) ?? SUMMARY_COLORS[0])
  return { summaryColor, summaryStyle }
}
