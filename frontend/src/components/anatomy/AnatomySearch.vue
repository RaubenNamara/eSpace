<template>
  <div class="relative">
    <label for="anatomy-search" class="sr-only">Search the body by name</label>
    <div class="relative">
      <svg class="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke-width="2" /><path stroke-linecap="round" stroke-width="2" d="M20 20l-3.5-3.5" /></svg>
      <input
        id="anatomy-search"
        ref="input"
        v-model="query"
        type="search"
        role="combobox"
        autocomplete="off"
        :aria-expanded="open && results.length > 0"
        aria-controls="anatomy-search-results"
        :aria-activedescendant="active >= 0 ? `anatomy-result-${active}` : undefined"
        placeholder="Search: heart, femur, liver…"
        class="w-full pl-8 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
        @focus="open = true"
        @blur="onBlur"
        @keydown.down.prevent="move(1)"
        @keydown.up.prevent="move(-1)"
        @keydown.enter.prevent="choose(active >= 0 ? active : 0)"
        @keydown.esc="open = false"
      />
    </div>
    <ul
      v-if="open && query.trim().length >= 2"
      id="anatomy-search-results"
      role="listbox"
      class="absolute z-20 mt-1 w-full max-h-72 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg py-1"
    >
      <li v-if="!results.length" class="px-3 py-2 text-sm text-gray-500">No structure called "{{ query }}" in this model.</li>
      <li
        v-for="(r, i) in results"
        :id="`anatomy-result-${i}`"
        :key="r.type + r.key"
        role="option"
        :aria-selected="i === active"
        class="px-3 py-1.5 cursor-pointer flex items-center gap-2"
        :class="i === active ? 'bg-indigo-50 dark:bg-indigo-900/30' : 'hover:bg-gray-50 dark:hover:bg-gray-800'"
        @mousedown.prevent="choose(i)"
        @mouseenter="active = i"
      >
        <span class="w-2.5 h-2.5 rounded-sm flex-shrink-0" :style="{ background: SYSTEM_BY_KEY[r.system]?.colour }" aria-hidden="true"></span>
        <span class="min-w-0 flex-1">
          <span class="block text-sm text-gray-900 dark:text-white truncate">{{ r.name }}</span>
          <span class="block text-[11px] text-gray-500">{{ SYSTEM_BY_KEY[r.system]?.name }}<template v-if="r.type === 'group' && r.parts > 1"> · {{ r.parts }} parts</template><template v-if="r.type === 'structure'"> · single part</template></span>
        </span>
      </li>
    </ul>
    <p class="sr-only" aria-live="polite">{{ open && query.trim().length >= 2 ? `${results.length} results` : '' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { AnatomyIndex, SearchResult } from '@/anatomy/metadata'
import type { DetailLevel, ReproSex, SystemKey } from '@/anatomy/types'
import { SYSTEM_BY_KEY } from '@/anatomy/systems'

const props = defineProps<{ index: AnatomyIndex | null; level: DetailLevel; hidden?: SystemKey[]; sex?: ReproSex }>()
const emit = defineEmits<{ select: [SearchResult] }>()

const query = ref('')
const open = ref(false)
const active = ref(-1)
const results = computed(() => props.index
  ? props.index.search(query.value, props.level, 25).filter(r => !props.hidden?.includes(r.system))
    // only the chosen sex's reproductive organs
    .filter(r => !props.sex || (r.type === 'group' ? props.index!.fitsSex(r.key, props.sex) : !props.index!.structure(r.key)?.sex || props.index!.structure(r.key)?.sex === props.sex))
  : [])
watch(results, () => { active.value = results.value.length ? 0 : -1 })

function move(d: number) {
  open.value = true
  if (!results.value.length) return
  active.value = (active.value + d + results.value.length) % results.value.length
}
function choose(i: number) {
  const r = results.value[i]
  if (!r) return
  emit('select', r)
  query.value = r.name
  open.value = false
}
function onBlur() { setTimeout(() => { open.value = false }, 120) }
</script>
