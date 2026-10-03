<template>
  <!-- A "⋯" button opening a short list of actions - for rows that would otherwise carry a long
       line of icon buttons. The menu is fixed-positioned on the page, so a scrolling or clipped
       container never cuts it off. -->
  <button
    ref="trigger"
    type="button"
    class="p-2 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-700"
    :aria-label="label"
    :title="label"
    aria-haspopup="menu"
    :aria-expanded="open"
    @click.stop="toggle"
  >
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.8"></circle><circle cx="12" cy="12" r="1.8"></circle><circle cx="19" cy="12" r="1.8"></circle></svg>
  </button>
  <Teleport to="body">
    <div
      v-if="open"
      ref="menu"
      role="menu"
      class="fixed z-[60] min-w-[200px] py-1.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl"
      :style="position"
    >
      <template v-for="(item, i) in items" :key="item.label">
        <div v-if="item.divider && i > 0" class="my-1 border-t border-gray-100 dark:border-gray-700"></div>
        <button
          type="button"
          role="menuitem"
          class="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-left"
          :class="item.danger ? 'text-rose-600 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-900/20' : 'text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700'"
          @click="choose(item)"
        >
          <AppIcon v-if="item.icon" :name="item.icon" class="w-4 h-4 flex-shrink-0 opacity-70" />
          {{ item.label }}
        </button>
      </template>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, nextTick, onBeforeUnmount } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'

export interface ActionItem {
  label: string
  // An AppIcon name
  icon?: string
  danger?: boolean
  // A thin line above this item
  divider?: boolean
  run: () => void
}

withDefaults(defineProps<{ items: ActionItem[]; label?: string }>(), { label: 'More actions' })

const open = ref(false)
const trigger = ref<HTMLElement | null>(null)
const menu = ref<HTMLElement | null>(null)
const position = ref<Record<string, string>>({})

const place = () => {
  const b = trigger.value?.getBoundingClientRect()
  if (!b) return
  const h = menu.value?.offsetHeight ?? 0
  const w = menu.value?.offsetWidth ?? 200
  // Below the button, right edges aligned; above it when there's no room underneath
  const top = b.bottom + 4 + h > window.innerHeight ? Math.max(8, b.top - 4 - h) : b.bottom + 4
  const left = Math.min(Math.max(8, b.right - w), window.innerWidth - w - 8)
  position.value = { top: `${top}px`, left: `${left}px` }
}

const onOutside = (e: Event) => {
  const t = e.target as Node
  if (menu.value?.contains(t) || trigger.value?.contains(t)) return
  close()
}
const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }

const close = () => {
  open.value = false
  document.removeEventListener('pointerdown', onOutside, true)
  document.removeEventListener('keydown', onKey)
  window.removeEventListener('scroll', close, true)
  window.removeEventListener('resize', close)
}

const toggle = async () => {
  if (open.value) return close()
  open.value = true
  position.value = { visibility: 'hidden' }
  await nextTick()
  place()
  document.addEventListener('pointerdown', onOutside, true)
  document.addEventListener('keydown', onKey)
  window.addEventListener('scroll', close, true)
  window.addEventListener('resize', close)
}

const choose = (item: ActionItem) => {
  close()
  item.run()
}

onBeforeUnmount(close)
</script>
