import { onBeforeUnmount, onMounted } from 'vue'

/**
 * Public pages only: lets the site grow on very large screens (the html.site-scale rules in
 * style.css). Removed again on leaving, so the app keeps its normal size.
 */
export function useSiteScale() {
  onMounted(() => document.documentElement.classList.add('site-scale'))
  onBeforeUnmount(() => document.documentElement.classList.remove('site-scale'))
}
