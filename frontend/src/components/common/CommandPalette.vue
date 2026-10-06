<template>
  <!-- Jump anywhere by typing (Ctrl/Cmd + K): every page in this role's menu, a few quick
       actions, and - from two letters on - the school's own content (topics, notes, assessments,
       books). Arrow keys move, Enter opens, Esc closes. -->
  <Teleport to="body">
    <Transition name="cp-fade">
      <div v-if="open" class="fixed inset-0 z-[80] bg-slate-900/40 backdrop-blur-[2px] flex items-start justify-center px-3 pt-[12vh]" @mousedown.self="close">
        <div class="w-full max-w-xl rounded-2xl bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden" role="dialog" aria-label="Go to">
          <div class="flex items-center gap-3 px-4 border-b border-gray-100 dark:border-gray-800">
            <svg class="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input
              ref="input"
              v-model="query"
              type="text"
              placeholder="Go to a page, or search notes, topics, assessments…"
              class="flex-1 py-4 bg-transparent border-0 focus:ring-0 focus:outline-none text-base text-gray-900 dark:text-white placeholder-gray-400"
              role="combobox"
              aria-autocomplete="list"
              :aria-activedescendant="flat[active] ? `cp-${active}` : undefined"
              @keydown.down.prevent="move(1)"
              @keydown.up.prevent="move(-1)"
              @keydown.enter.prevent="choose(flat[active])"
              @keydown.esc.prevent="close"
            >
            <kbd class="hidden sm:inline-flex px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-700 text-[10px] font-semibold text-gray-400">Esc</kbd>
          </div>

          <div class="max-h-[55vh] overflow-y-auto py-2" role="listbox">
            <template v-for="section in sections" :key="section.title">
              <p v-if="section.items.length" class="px-4 pt-2 pb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">{{ section.title }}</p>
              <button
                v-for="item in section.items"
                :id="`cp-${item.index}`"
                :key="item.key"
                type="button"
                role="option"
                :aria-selected="item.index === active"
                class="w-full flex items-center gap-3 px-4 py-2 text-left"
                :class="item.index === active ? 'bg-indigo-50 dark:bg-indigo-900/30' : ''"
                @mouseenter="active = item.index"
                @click="choose(item)"
              >
                <span class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" :class="item.index === active ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'">
                  <component :is="item.icon" v-if="item.icon" class="w-4 h-4" />
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                </span>
                <span class="flex-1 min-w-0">
                  <span class="block text-sm font-medium text-gray-900 dark:text-white truncate">{{ item.label }}</span>
                  <span v-if="item.hint" class="block text-xs text-gray-500 dark:text-gray-400 truncate">{{ item.hint }}</span>
                </span>
                <span v-if="item.index === active" class="text-[11px] text-gray-400">↵</span>
              </button>
            </template>
            <p v-if="!flat.length && !loading" class="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">Nothing matches “{{ query }}”.</p>
            <p v-if="loading" class="px-4 py-2 text-xs text-gray-400">Searching…</p>
          </div>

          <div class="hidden sm:flex items-center gap-3 px-4 py-2 border-t border-gray-100 dark:border-gray-800 text-[11px] text-gray-400">
            <span><kbd class="font-semibold">↑↓</kbd> move</span><span><kbd class="font-semibold">↵</kbd> open</span>
            <span class="ml-auto">Open this any time with <kbd class="font-semibold">{{ isMac ? '⌘' : 'Ctrl' }} K</kbd></span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch, type Component } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { SEARCH_TYPE_LABELS, type SearchSuggestion } from '@/types/search'

export interface PaletteGroup { name: string; items: { path: string; label: string; icon: string }[] }
export interface PaletteAction { label: string; hint?: string; run: () => void; icon?: Component }
interface Item { key: string; label: string; hint?: string; icon?: Component; index: number; go: () => void }

const props = defineProps<{ groups: PaletteGroup[]; icons: Record<string, Component>; role: string; actions: PaletteAction[] }>()

const router = useRouter()
const open = ref(false)
const query = ref('')
const active = ref(0)
const input = ref<HTMLInputElement | null>(null)
const results = ref<SearchSuggestion[]>([])
const loading = ref(false)
const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)
let timer: number | null = null

// Matching: every typed word must appear somewhere in the label (or its group)
const matches = (text: string) => {
  const words = query.value.trim().toLowerCase().split(/\s+/).filter(Boolean)
  const hay = text.toLowerCase()
  return words.every(w => hay.includes(w))
}

const sections = computed(() => {
  let i = 0
  const pages: Item[] = []
  for (const g of props.groups) {
    for (const p of g.items) {
      if (matches(`${p.label} ${g.name}`)) pages.push({ key: p.path, label: p.label, hint: g.name, icon: props.icons[p.icon], index: 0, go: () => router.push(p.path) })
    }
  }
  const acts: Item[] = props.actions.filter(a => matches(`${a.label} ${a.hint || ''}`)).map((a, n) => ({ key: `a${n}`, label: a.label, hint: a.hint, icon: a.icon, index: 0, go: a.run }))
  const found: Item[] = results.value.map(r => ({
    key: `${r.type}-${r.id}`,
    label: r.title,
    hint: [SEARCH_TYPE_LABELS[r.type] || r.type, r.subject_name].filter(Boolean).join(' · '),
    index: 0,
    go: () => (r.is_file ? window.open(r.url, '_blank') : router.push(r.url))
  }))
  const q = query.value.trim()
  const everywhere: Item[] = q.length >= 2 ? [{ key: 'all', label: `Search everywhere for “${q}”`, hint: 'Every result, with filters', index: 0, go: () => router.push({ path: `/${props.role}/search`, query: { q } }) }] : []
  const list = [
    { title: q ? 'Pages' : 'Go to', items: q ? pages.slice(0, 8) : pages.slice(0, 6) },
    { title: 'Actions', items: acts },
    { title: 'In the school', items: found },
    { title: '', items: everywhere }
  ]
  for (const s of list) for (const it of s.items) it.index = i++
  return list
})
const flat = computed(() => sections.value.flatMap(s => s.items))

const move = (d: number) => {
  const n = flat.value.length
  if (!n) return
  active.value = (active.value + d + n) % n
  nextTick(() => document.getElementById(`cp-${active.value}`)?.scrollIntoView({ block: 'nearest' }))
}
const choose = (item?: Item) => {
  if (!item) return
  close()
  item.go()
}

const show = async () => {
  open.value = true
  query.value = ''
  results.value = []
  active.value = 0
  await nextTick()
  input.value?.focus()
}
const close = () => { open.value = false }

watch(query, q => {
  active.value = 0
  if (timer) clearTimeout(timer)
  if (q.trim().length < 2) { results.value = []; return }
  timer = window.setTimeout(async () => {
    loading.value = true
    try {
      const res = await axios.get(`/api/${props.role}/search/suggestions`, { params: { q: q.trim() } })
      results.value = (res.data.data.suggestions || []).slice(0, 6)
    } catch {
      results.value = []
    } finally {
      loading.value = false
    }
  }, 220)
})

const onKey = (e: KeyboardEvent) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    open.value ? close() : show()
  }
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  if (timer) clearTimeout(timer)
})

defineExpose({ show })
</script>

<style scoped>
.cp-fade-enter-active, .cp-fade-leave-active { transition: opacity 0.15s ease; }
.cp-fade-enter-from, .cp-fade-leave-to { opacity: 0; }
</style>
