import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue'

/**
 * Public site: elements with class "reveal" fade up as they scroll into view (once). With reduced
 * motion, or no IntersectionObserver, they are simply shown. The .reveal styles are in style.css.
 *
 * Pass `source` when the page swaps its content without remounting (e.g. /for/teachers ->
 * /for/students): the new elements are picked up whenever it changes.
 */
export function useReveal(source?: () => unknown) {
  let observer: IntersectionObserver | null = null
  const scan = () => {
    const els = document.querySelectorAll('.reveal:not(.in)')
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(el => el.classList.add('in'))
      return
    }
    observer ??= new IntersectionObserver(entries => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); observer?.unobserve(e.target) }
    }, { threshold: 0.12 })
    els.forEach(el => observer!.observe(el))
  }
  onMounted(scan)
  if (source) watch(source, () => nextTick(scan))
  onBeforeUnmount(() => observer?.disconnect())
}
