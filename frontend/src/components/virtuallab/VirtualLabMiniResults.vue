<template>
  <!-- A compact copy of the Results Table for the steps panel, so the student sees each reading go in
       without leaving the lab (including in full screen). -->
  <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-900/30 p-2.5">
    <div class="flex items-center justify-between gap-2 mb-1.5">
      <p class="text-[10px] font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">Results so far</p>
      <span class="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">{{ rows.length }} {{ rows.length === 1 ? 'row' : 'rows' }}</span>
    </div>
    <p v-if="!rows.length" class="text-[11px] text-gray-400 dark:text-gray-500">Readings appear here as you record them.</p>
    <div v-else class="overflow-x-auto max-h-56 overflow-y-auto">
      <table class="w-full text-[11px] border-collapse">
        <thead class="sticky top-0 bg-gray-100 dark:bg-gray-800">
          <tr class="text-left text-gray-500 dark:text-gray-400">
            <th class="px-1.5 py-1 font-semibold">#</th>
            <th v-for="col in columns" :key="col" class="px-1.5 py-1 font-semibold whitespace-nowrap" :class="RESULT_COLUMN_LABELS[col] ? '' : 'capitalize'">{{ resultColumnLabel(col) }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, i) in rows"
            :key="row.id"
            class="border-t border-gray-200 dark:border-gray-700 transition-colors duration-700"
            :class="row.id === highlightId ? 'bg-emerald-100 dark:bg-emerald-900/30' : ''"
          >
            <td class="px-1.5 py-1 text-gray-400 tabular-nums">{{ i + 1 }}</td>
            <td v-for="col in columns" :key="col" class="px-1.5 py-1 text-gray-800 dark:text-gray-100 tabular-nums whitespace-nowrap" :class="resultCellClass(col, row.extra?.[col])">{{ resultCell(col, row.extra?.[col]) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RESULT_COLUMN_LABELS, resultColumnLabel, resultCell, resultCellClass } from './resultColumns'
import type { NotebookEntry } from '@/types/virtualLab'

defineProps<{ rows: NotebookEntry[]; columns: string[]; highlightId?: number | null }>()
</script>
