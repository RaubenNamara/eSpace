<template>
  <!-- The eSpace app around a tour screen: a slim sidebar and a top bar, as in the real app -->
  <div class="w-full h-full flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-sans text-[0.6875rem]">
    <aside class="w-[9.375rem] flex-shrink-0 border-r border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-3 flex flex-col gap-0.5">
      <div class="mb-3 px-1"><Wordmark size="sm" /></div>
      <span v-for="m in menu" :key="m.label" class="flex items-center gap-2 px-2 py-1.5 rounded-lg" :class="m.label === active ? 'bg-indigo-50 text-indigo-700 font-semibold dark:bg-indigo-500/15 dark:text-indigo-200' : 'text-slate-500 dark:text-slate-400'">
        <AppIcon :name="m.icon" class="w-3.5 h-3.5" />{{ m.label }}
      </span>
    </aside>
    <div class="flex-1 min-w-0 flex flex-col">
      <div class="h-10 flex-shrink-0 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 flex items-center justify-between px-4">
        <span class="w-56 h-6 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center px-2 text-[0.625rem] text-slate-400">Search topics, notes, assessments…</span>
        <span class="flex items-center gap-2">
          <span class="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[0.625rem] font-bold">{{ user[0] }}</span>
          <span class="leading-tight"><span class="block font-semibold">{{ user }}</span><span class="block text-[0.5625rem] text-slate-400 capitalize">{{ role }}</span></span>
        </span>
      </div>
      <div class="flex-1 min-h-0 p-4 overflow-hidden"><slot /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Wordmark from '@/components/brand/Wordmark.vue'
import AppIcon from '@/components/common/AppIcon.vue'

const props = defineProps<{ role: 'student' | 'teacher'; active: string; user: string }>()

const MENUS = {
  student: [
    { label: 'Dashboard', icon: 'chart' }, { label: 'eNotes', icon: 'document' }, { label: 'eLibrary', icon: 'book' },
    { label: 'Videos', icon: 'video' }, { label: 'Live Classes', icon: 'video' }, { label: 'Assessments', icon: 'pencil' },
    { label: 'Learning Map', icon: 'map' }, { label: 'Achievements', icon: 'trophy' }, { label: 'Chats', icon: 'chat' }
  ],
  teacher: [
    { label: 'Dashboard', icon: 'chart' }, { label: 'My Classes', icon: 'users' }, { label: 'eNotes', icon: 'document' },
    { label: 'eLibrary', icon: 'book' }, { label: 'Assessments', icon: 'pencil' }, { label: 'Class Learning Map', icon: 'map' },
    { label: 'Coverage', icon: 'target' }, { label: 'Engagement', icon: 'trend' }, { label: 'Marksheet', icon: 'clipboard' }
  ]
}
const menu = computed(() => MENUS[props.role])
</script>
