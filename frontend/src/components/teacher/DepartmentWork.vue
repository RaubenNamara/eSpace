<template>
  <!-- The other teachers' work in this department - eNotes, books, papers or videos - grouped by
       teacher. Everyone can open it; only its teacher changes it, or a teacher the HOD has allowed
       to edit colleagues' work (can_edit from the server, Services/DepartmentContent). -->
  <div>
    <p class="mb-3 text-sm text-gray-600 dark:text-gray-300">
      {{ anyEditable
        ? `Your colleagues' ${noun}. Your HOD lets you edit them too.`
        : `Your colleagues' ${noun} - open any of them. Only the teacher who added one can change it.` }}
    </p>

    <div v-if="loading && !items.length" class="space-y-3">
      <div v-for="i in 3" :key="i" class="h-24 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 animate-pulse"></div>
    </div>

    <EmptyState v-else-if="!items.length" compact icon="users" tone="gray" :title="`No ${noun} from colleagues yet`" :message="`When other teachers in your department add ${noun}, they show here.`" />

    <div v-else class="space-y-4">
      <section v-for="g in groups" :key="g.owner" class="dash-box">
        <h2 class="dash-bar">
          {{ g.owner || 'Unknown teacher' }}
          <span class="px-2 py-0.5 rounded-full text-xs font-extrabold tabular-nums bg-indigo-600 text-white">{{ g.items.length }}</span>
        </h2>
        <ul class="divide-y divide-gray-100 dark:divide-gray-700/60">
          <li v-for="it in g.items" :key="it.id" class="px-4 py-2.5 flex items-center gap-3">
            <div class="min-w-0 flex-1">
              <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ it.title }}</p>
              <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ it.detail }}</p>
            </div>
            <span class="hidden sm:inline px-2 py-0.5 rounded-full text-[10px] font-semibold flex-shrink-0" :class="chip(it.status)">{{ statusLabel(it.status) }}</span>
            <button type="button" class="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex-shrink-0" @click="$emit('open', it.raw)">{{ openLabel }}</button>
            <template v-if="it.canEdit">
              <button type="button" class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex-shrink-0" title="Edit" @click="$emit('edit', it.raw)">
                <AppIcon name="pencil" class="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </button>
              <button type="button" class="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 flex-shrink-0" title="Delete" @click="$emit('remove', it.raw)">
                <AppIcon name="trash" class="w-4 h-4 text-red-600 dark:text-red-400" />
              </button>
            </template>
            <span v-else class="hidden md:inline text-[11px] text-gray-400 flex-shrink-0" title="Only the teacher who added it can change it">View only</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '@/components/common/AppIcon.vue'
import EmptyState from '@/components/ui/EmptyState.vue'

export interface DeptItem {
  id: number
  title: string
  owner: string
  detail: string
  status: string
  canEdit: boolean
  raw: unknown
}

const props = defineProps<{ items: DeptItem[]; loading: boolean; noun: string; openLabel?: string }>()
defineEmits<{ open: [unknown]; edit: [unknown]; remove: [unknown] }>()

const openLabel = computed(() => props.openLabel || 'Open')
const anyEditable = computed(() => props.items.some(i => i.canEdit))
const groups = computed(() => {
  const out: { owner: string; items: DeptItem[] }[] = []
  for (const it of props.items) {
    const g = out.find(x => x.owner === it.owner)
    if (g) g.items.push(it)
    else out.push({ owner: it.owner, items: [it] })
  }
  return out.sort((a, b) => a.owner.localeCompare(b.owner))
})
const statusLabel = (s: string) => ({ published: 'Published', draft: 'Draft', archived: 'Archived' } as Record<string, string>)[s] || s
const chip = (s: string) => s === 'published'
  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200'
  : s === 'draft' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
</script>
