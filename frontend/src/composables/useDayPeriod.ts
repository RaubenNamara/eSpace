import { computed, onUnmounted, ref } from 'vue'
import type { DayPeriod } from '@/components/dashboard/DaySky.vue'

/**
 * The time of day on the user's clock - morning, afternoon, evening or night - kept up to date
 * while the page is open, with the greeting that goes with it. Every dashboard's banner uses this,
 * so the sky (sun or moon) always matches the greeting.
 */
export const periodAt = (h: number): DayPeriod =>
  h >= 5 && h < 12 ? 'morning' : h >= 12 && h < 16 ? 'afternoon' : h >= 16 && h < 19 ? 'evening' : 'night'

export function useDayPeriod() {
  const period = ref<DayPeriod>(periodAt(new Date().getHours()))
  const timer = window.setInterval(() => { period.value = periodAt(new Date().getHours()) }, 60_000)
  // a phone shows only the right of the sky, so the sun moves nearer the edge there
  const narrowQuery = window.matchMedia('(max-width: 639px)')
  const narrow = ref(narrowQuery.matches)
  const onNarrow = (e: MediaQueryListEvent) => { narrow.value = e.matches }
  narrowQuery.addEventListener('change', onNarrow)
  onUnmounted(() => { window.clearInterval(timer); narrowQuery.removeEventListener('change', onNarrow) })

  const greeting = computed(() => (period.value === 'morning' ? 'Good morning' : period.value === 'afternoon' ? 'Good afternoon' : 'Good evening'))
  return { period, narrow, greeting }
}
