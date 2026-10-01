<template>
  <!-- A list of records: a table on tablets and up, a card per record on a phone - with search,
       sorting (tap a column heading) and pages. Cells render the row's value unless a
       `#cell-<key>` slot draws them; `#actions` adds per-row buttons; `#toolbar` sits beside the
       search. Columns choose how they appear on a phone card: as its title, its subtitle, a
       labelled field (the default) or not at all. -->
  <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
    <!-- Toolbar -->
    <div v-if="searchKeys.length || $slots.toolbar" class="flex flex-col sm:flex-row sm:items-center gap-2 p-3 border-b border-gray-100 dark:border-gray-700">
      <div v-if="searchKeys.length" class="relative sm:w-72">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        <input v-model="query" type="search" :placeholder="searchPlaceholder" class="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
      </div>
      <div class="flex flex-wrap items-center gap-2 sm:ml-auto">
        <slot name="toolbar" />
      </div>
    </div>

    <slot v-if="loading" name="loading">
      <div class="p-3"><Skeleton variant="list" :count="5" /></div>
    </slot>

    <div v-else-if="!filtered.length" class="p-3">
      <EmptyState :card="false" compact :icon="query ? 'target' : emptyIcon" :title="query ? `Nothing matches “${query}”` : emptyTitle" :message="query ? 'Try another name or word.' : emptyMessage">
        <slot v-if="!query" name="empty-action" />
      </EmptyState>
    </div>

    <template v-else>
      <!-- Tablet and up: a table -->
      <div class="hidden md:block overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-50/80 dark:bg-gray-900/40">
            <tr>
              <th
                v-for="col in columns"
                :key="col.key"
                scope="col"
                class="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 whitespace-nowrap"
                :class="[alignClass(col), col.headerClass]"
              >
                <button v-if="col.sortable" type="button" class="inline-flex items-center gap-1 uppercase tracking-wider hover:text-gray-900 dark:hover:text-white" @click="sortBy(col.key)">
                  {{ col.label }}
                  <svg class="w-3 h-3 transition-transform" :class="[sortKey === col.key ? 'opacity-100' : 'opacity-30', sortKey === col.key && sortDir === 'desc' ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"></path></svg>
                </button>
                <template v-else>{{ col.label }}</template>
              </th>
              <th v-if="$slots.actions" scope="col" class="px-4 py-2.5"><span class="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
            <tr
              v-for="row in pageRows"
              :key="keyOf(row)"
              class="hover:bg-gray-50/70 dark:hover:bg-gray-700/30 transition-colors"
              :class="rowClickable ? 'cursor-pointer' : ''"
              @click="rowClickable && $emit('row-click', row)"
            >
              <td v-for="col in columns" :key="col.key" class="px-4 py-3 text-gray-800 dark:text-gray-100" :class="[alignClass(col), col.cellClass]">
                <slot :name="`cell-${col.key}`" :row="row" :value="valueOf(row, col.key)">{{ display(row, col.key) }}</slot>
              </td>
              <td v-if="$slots.actions" class="px-4 py-3 text-right whitespace-nowrap" @click.stop>
                <slot name="actions" :row="row" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Phone: a card per record -->
      <ul class="md:hidden divide-y divide-gray-100 dark:divide-gray-700">
        <li v-for="row in pageRows" :key="keyOf(row)" class="p-3" :class="rowClickable ? 'cursor-pointer active:bg-gray-50 dark:active:bg-gray-700/40' : ''" @click="rowClickable && $emit('row-click', row)">
          <div v-if="titleCol" class="text-sm font-semibold text-gray-900 dark:text-white leading-snug">
            <slot :name="`cell-${titleCol.key}`" :row="row" :value="valueOf(row, titleCol.key)">{{ display(row, titleCol.key) }}</slot>
          </div>
          <div v-if="subtitleCol" class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            <slot :name="`cell-${subtitleCol.key}`" :row="row" :value="valueOf(row, subtitleCol.key)">{{ display(row, subtitleCol.key) }}</slot>
          </div>
          <dl v-if="fieldCols.length" class="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5">
            <div v-for="col in fieldCols" :key="col.key" class="min-w-0">
              <dt class="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">{{ col.label }}</dt>
              <dd class="text-xs text-gray-800 dark:text-gray-100 truncate">
                <slot :name="`cell-${col.key}`" :row="row" :value="valueOf(row, col.key)">{{ display(row, col.key) }}</slot>
              </dd>
            </div>
          </dl>
          <div v-if="$slots.actions" class="mt-2.5 flex flex-wrap items-center gap-1.5" @click.stop>
            <slot name="actions" :row="row" />
          </div>
        </li>
      </ul>

      <!-- Pages -->
      <div v-if="pageCount > 1" class="flex items-center justify-between gap-2 px-3 py-2.5 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
        <span>{{ firstShown }}–{{ lastShown }} of {{ filtered.length }}</span>
        <div class="flex items-center gap-1">
          <button type="button" class="px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 font-semibold disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-700" :disabled="page === 1" @click="page--">Previous</button>
          <span class="px-2 font-semibold text-gray-700 dark:text-gray-200">{{ page }} / {{ pageCount }}</span>
          <button type="button" class="px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 font-semibold disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-700" :disabled="page === pageCount" @click="page++">Next</button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts" generic="Row extends Record<string, any>">
import { computed, ref, watch } from 'vue'
import Skeleton from './Skeleton.vue'
import EmptyState from './EmptyState.vue'

export interface Column {
  key: string
  label: string
  sortable?: boolean
  align?: 'left' | 'right' | 'center'
  // How the column shows on a phone card
  mobile?: 'title' | 'subtitle' | 'field' | 'hidden'
  headerClass?: string
  cellClass?: string
  // Value used to sort (and shown when there's no cell slot), when not row[key]
  value?: (row: any) => unknown
}

const props = withDefaults(defineProps<{
  columns: Column[]
  rows: Row[]
  rowKey?: string
  // Fields the search box looks in; no search box when empty
  searchKeys?: string[]
  searchPlaceholder?: string
  pageSize?: number
  loading?: boolean
  rowClickable?: boolean
  initialSort?: { key: string; dir: 'asc' | 'desc' }
  emptyTitle?: string
  emptyMessage?: string
  emptyIcon?: string
}>(), {
  rowKey: 'id',
  searchKeys: () => [],
  searchPlaceholder: 'Search…',
  pageSize: 20,
  loading: false,
  rowClickable: false,
  initialSort: undefined,
  emptyTitle: 'Nothing here yet',
  emptyMessage: '',
  emptyIcon: 'clipboard'
})
defineEmits<{ 'row-click': [row: Row] }>()

const query = ref('')
const sortKey = ref<string | null>(props.initialSort?.key ?? null)
const sortDir = ref<'asc' | 'desc'>(props.initialSort?.dir ?? 'asc')
const page = ref(1)

const colFor = (key: string) => props.columns.find(c => c.key === key)
const valueOf = (row: Row, key: string) => {
  const col = colFor(key)
  return col?.value ? col.value(row) : row[key]
}
const display = (row: Row, key: string) => {
  const v = valueOf(row, key)
  return v === null || v === undefined || v === '' ? '–' : v
}
const keyOf = (row: Row) => row[props.rowKey] ?? JSON.stringify(row)
const alignClass = (col: Column) => (col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left')

const titleCol = computed(() => props.columns.find(c => c.mobile === 'title') ?? props.columns[0])
const subtitleCol = computed(() => props.columns.find(c => c.mobile === 'subtitle') ?? null)
const fieldCols = computed(() => props.columns.filter(c => c !== titleCol.value && c !== subtitleCol.value && (c.mobile ?? 'field') === 'field'))

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  let list = !q ? props.rows : props.rows.filter(r => props.searchKeys.some(k => String(r[k] ?? '').toLowerCase().includes(q)))
  if (sortKey.value) {
    const key = sortKey.value
    const dir = sortDir.value === 'asc' ? 1 : -1
    list = [...list].sort((a, b) => {
      const va = valueOf(a, key)
      const vb = valueOf(b, key)
      if (va === vb) return 0
      if (va === null || va === undefined || va === '') return 1
      if (vb === null || vb === undefined || vb === '') return -1
      return (typeof va === 'number' && typeof vb === 'number' ? va - vb : String(va).localeCompare(String(vb), undefined, { numeric: true })) * dir
    })
  }
  return list
})
const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / props.pageSize)))
const pageRows = computed(() => filtered.value.slice((page.value - 1) * props.pageSize, page.value * props.pageSize))
const firstShown = computed(() => (page.value - 1) * props.pageSize + 1)
const lastShown = computed(() => Math.min(filtered.value.length, page.value * props.pageSize))

const sortBy = (key: string) => {
  if (sortKey.value === key) sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  else {
    sortKey.value = key
    sortDir.value = 'asc'
  }
}
watch([query, () => props.rows.length], () => { page.value = 1 })
watch(pageCount, (n) => { if (page.value > n) page.value = n })
</script>
