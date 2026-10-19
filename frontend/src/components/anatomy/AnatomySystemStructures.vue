<template>
  <section aria-labelledby="all-structures-title">
    <div class="flex items-center justify-between gap-2">
      <h2 id="all-structures-title" class="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        All structures <span class="font-normal normal-case text-gray-400">({{ total }})</span>
      </h2>
      <button type="button" class="text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 hover:underline" @click="openAll = !openAll">
        {{ openAll ? 'Collapse all' : 'Expand all' }}
      </button>
    </div>

    <label :for="`structure-filter-${system}`" class="sr-only">Filter structures</label>
    <input
      :id="`structure-filter-${system}`"
      v-model="query"
      type="search"
      placeholder="Filter: femur, artery, lobe…"
      class="mt-2 w-full px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:border-indigo-500 focus:ring-indigo-500"
    />

    <p v-if="!regions.length" class="mt-3 text-sm text-gray-500">No structure matches "{{ query }}".</p>

    <div class="mt-2 space-y-1.5">
      <details
        v-for="r in regions"
        :key="r.name"
        class="group rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        :open="openAll || !!query || r.items.some(i => i.key === selectedKey)"
      >
        <summary class="flex items-center gap-2 px-3 py-2 cursor-pointer select-none list-none bg-gray-50 dark:bg-gray-900/40 hover:bg-gray-100 dark:hover:bg-gray-900/70">
          <span class="text-sm font-semibold text-gray-800 dark:text-gray-100">{{ r.name }}</span>
          <span class="text-[11px] text-gray-500">{{ r.items.length }}</span>
          <svg class="w-4 h-4 ml-auto text-gray-400 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 9l6 6 6-6" /></svg>
        </summary>
        <ul class="max-h-72 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700/60">
          <li v-for="i in r.items" :key="i.key">
            <button
              type="button"
              class="w-full flex items-center gap-2 text-left px-3 py-1.5 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500"
              :class="i.key === selectedKey ? 'bg-indigo-600 text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'"
              :aria-pressed="i.key === selectedKey"
              @click="$emit('select', i.key)"
            >
              <span class="truncate flex-1">{{ i.name }}</span>
              <span v-if="i.parts > 1" class="flex-shrink-0 text-[10px]" :class="i.key === selectedKey ? 'text-white/80' : 'text-gray-400'">{{ i.parts }} parts</span>
            </button>
          </li>
        </ul>
      </details>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { AnatomyIndex } from '@/anatomy/metadata'
import type { ReproSex, SystemKey } from '@/anatomy/types'
import { normaliseQuery } from '@/anatomy/metadata'
import { regionOf, REGION_ORDER } from '@/anatomy/regions'

const props = defineProps<{ index: AnatomyIndex; system: SystemKey; selectedKey: string | null; showSensitive: boolean; sex?: ReproSex }>()
defineEmits<{ select: [string] }>()

const query = ref('')
const openAll = ref(false)
watch(() => props.system, () => { query.value = ''; openAll.value = false })

/** every organ/structure group of this system (not the skin cover, reproductive only when allowed) */
const all = computed(() => {
  const height = props.index.manifest.height ?? 1.72
  return [...props.index.groups.values()]
    .filter(g => g.system === props.system || g.systems.includes(props.system))
    .filter(g => props.showSensitive || g.system !== 'reproductive')
    .filter(g => !props.sex || props.index.fitsSex(g.key, props.sex))
    .filter(g => !g.ids.every(id => props.index.structure(id)?.cover))
    .map(g => ({ key: g.key, name: g.name, parts: g.ids.filter(id => !props.index.structure(id)?.cover).length, region: regionOf(g.centre, height) }))
})
const total = computed(() => all.value.length)

/** left/right pairs side by side: sort by the name without the side */
const sortKey = (n: string) => n.toLowerCase().replace(/\b(left|right)\b/, '').replace(/\s+/g, ' ').trim() + ' ' + n.toLowerCase()

const regions = computed(() => {
  const q = normaliseQuery(query.value)
  const words = q ? q.split(' ') : []
  const items = all.value.filter(i => !words.length || words.every(w => normaliseQuery(i.name).includes(w)))
  return REGION_ORDER
    .map(name => ({ name, items: items.filter(i => i.region === name).sort((a, b) => sortKey(a.name).localeCompare(sortKey(b.name))) }))
    .filter(r => r.items.length)
})
</script>
