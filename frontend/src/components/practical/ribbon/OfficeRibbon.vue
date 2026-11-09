<template>
  <!-- An Office ribbon: the tabs on the app's colour (as in Word, Excel and PowerPoint), and the
       chosen tab's tools below in labelled groups (RibbonGroup) -->
  <div class="office-ribbon flex-shrink-0 select-none" @mousedown="keepFocus">
    <div class="flex items-end gap-0.5 px-2 text-[13px] text-white overflow-x-auto" :class="color">
      <button
        v-for="t in tabs"
        :key="t"
        type="button"
        class="px-3 pt-1.5 pb-1.5 whitespace-nowrap rounded-t-sm transition-colors"
        :class="t === active ? 'bg-[#f3f3f3] text-gray-900 font-semibold dark:bg-gray-800 dark:text-white' : 'hover:bg-white/15'"
        @click="$emit('update:active', t)"
      >{{ t }}</button>
    </div>
    <div ref="tools" class="bg-[#f3f3f3] dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 overflow-x-auto" @scroll="placeMenus">
      <div class="flex items-stretch min-w-max px-1 py-1 text-gray-800 dark:text-gray-100">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineProps<{ tabs: string[]; active: string; color: string }>()
defineEmits<{ 'update:active': [string] }>()

// the ribbon's buttons never take the cursor out of the document, so typing carries on
const keepFocus = (e: MouseEvent) => {
  const el = e.target as HTMLElement
  if (el.closest('input, select, textarea, [data-ribbon-allow-focus]')) return
  e.preventDefault()
}

// The row of tools scrolls sideways, which would cut off a dropdown under it - so each dropdown
// (an element placed at top-full, or .rb-menu) is put on the screen, fixed, under its button.
const tools = ref<HTMLElement | null>(null)
const placeMenus = () => {
  const root = tools.value
  if (!root) return
  root.querySelectorAll<HTMLElement>('.top-full, .rb-menu').forEach(el => {
    const anchor = el.parentElement
    if (!anchor || !el.offsetParent) return
    const r = anchor.getBoundingClientRect()
    const w = el.offsetWidth
    const rightAligned = el.classList.contains('right-0')
    el.style.position = 'fixed'
    el.style.zIndex = '60'
    el.style.top = `${r.bottom + 2}px`
    el.style.left = `${Math.max(8, Math.min(rightAligned ? r.right - w : r.left, window.innerWidth - w - 8))}px`
    el.style.right = 'auto'
    el.style.marginTop = '0'
  })
}
let observer: MutationObserver | null = null
onMounted(() => {
  if (!tools.value || typeof MutationObserver === 'undefined') return
  observer = new MutationObserver(placeMenus)
  observer.observe(tools.value, { childList: true, subtree: true })
  window.addEventListener('resize', placeMenus)
})
onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener('resize', placeMenus)
})
</script>

<style>
.office-ribbon .rb-big { display: inline-flex; flex-direction: column; align-items: center; justify-content: flex-start; gap: 2px; min-width: 46px; padding: 3px 5px; border-radius: 3px; font-size: 11.5px; line-height: 1.15; }
.office-ribbon .rb-sm { display: inline-flex; align-items: center; gap: 4px; height: 24px; padding: 0 5px; border-radius: 3px; font-size: 12px; white-space: nowrap; }
.office-ribbon .rb-ic { display: inline-flex; align-items: center; justify-content: center; width: 26px; height: 24px; border-radius: 3px; font-size: 13px; }
.office-ribbon .rb-big:hover, .office-ribbon .rb-sm:hover, .office-ribbon .rb-ic:hover { background: #dadada; }
.dark .office-ribbon .rb-big:hover, .dark .office-ribbon .rb-sm:hover, .dark .office-ribbon .rb-ic:hover { background: #4b5563; }
.office-ribbon .rb-on { background: #c5c5c5 !important; }
.dark .office-ribbon .rb-on { background: #6b7280 !important; }
.office-ribbon button:disabled, .office-ribbon label[aria-disabled='true'] { opacity: .4; pointer-events: none; }
.office-ribbon .rb-select { height: 24px; padding: 0 4px; border: 1px solid #c8c8c8; border-radius: 2px; background: #fff; font-size: 12px; }
.dark .office-ribbon .rb-select { background: #374151; border-color: #4b5563; }
</style>
