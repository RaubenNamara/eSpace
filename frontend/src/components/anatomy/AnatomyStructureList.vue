<template>
  <!-- Text alternative to the 3D view: every organ of the systems that are switched on, as a list -->
  <nav aria-label="Structures in the shown systems">
    <p v-if="!sections.length" class="text-sm text-gray-500">Switch on a body system to list its structures.</p>
    <div v-for="sec in sections" :key="sec.system" class="mb-3">
      <h3 class="text-xs font-bold text-gray-700 dark:text-gray-200 flex items-center gap-1.5">
        <span class="w-2.5 h-2.5 rounded-sm" :style="{ background: SYSTEM_BY_KEY[sec.system].colour }" aria-hidden="true"></span>
        {{ SYSTEM_BY_KEY[sec.system].name }} <span class="font-normal text-gray-500">({{ sec.groups.length }})</span>
      </h3>
      <ul class="mt-1 flex flex-wrap gap-1">
        <li v-for="g in sec.shown" :key="g.key">
          <button
            type="button"
            class="px-2 py-0.5 rounded-md border text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            :class="g.key === selectedKey ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-indigo-400'"
            :aria-pressed="g.key === selectedKey"
            @click="$emit('select', g.key)"
          >{{ g.name }}</button>
        </li>
      </ul>
      <button v-if="sec.groups.length > sec.shown.length" type="button" class="mt-1 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 underline" @click="expanded[sec.system] = true">
        Show all {{ sec.groups.length }}
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import type { AnatomyIndex } from '@/anatomy/metadata'
import type { OrganGroup, ReproSex, SystemKey } from '@/anatomy/types'
import { SYSTEMS, SYSTEM_BY_KEY } from '@/anatomy/systems'
import { contentFor } from '@/anatomy/content'

const props = defineProps<{ index: AnatomyIndex | null; systems: SystemKey[]; selectedKey: string | null; showSensitive: boolean; sex?: ReproSex }>()
defineEmits<{ select: [string] }>()

const expanded = reactive<Partial<Record<SystemKey, boolean>>>({})
const LIMIT = 24

const sections = computed(() => {
  if (!props.index) return []
  const out: { system: SystemKey; groups: OrganGroup[]; shown: OrganGroup[] }[] = []
  for (const def of SYSTEMS) {
    if (!props.systems.includes(def.key)) continue
    if (def.sensitive && !props.showSensitive) continue
    const groups = [...props.index.groups.values()]
      .filter(g => g.system === def.key || g.systems.includes(def.key))
      .filter(g => props.showSensitive || g.system !== 'reproductive')
      .filter(g => !props.sex || props.index!.fitsSex(g.key, props.sex))
    // organs with a written description first, then by name
    groups.sort((a, b) => Number(!!contentFor(b.name)) - Number(!!contentFor(a.name)) || a.name.localeCompare(b.name))
    out.push({ system: def.key, groups, shown: expanded[def.key] ? groups : groups.slice(0, LIMIT) })
  }
  return out
})
</script>
