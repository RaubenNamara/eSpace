<template>
  <!-- Exam dates: the exams students count down to. Each student sees a countdown and a revision
       plan for the next exam set for their class (or for everyone). -->
  <div class="w-full max-w-3xl">
    <PageHeader title="Exam dates" description="Add the exams students count down to - each one gets a countdown and a week-by-week revision plan." icon="target" accent="indigo" />

    <form class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-5 grid sm:grid-cols-2 gap-3" @submit.prevent="add">
      <label class="block sm:col-span-2">
        <span class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Exam</span>
        <input v-model="draft.title" type="text" maxlength="120" placeholder="e.g. S.4 Mock exams" class="w-full px-3 py-2.5 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white" :class="errors.title ? 'border-rose-400' : 'border-gray-300 dark:border-gray-600'">
        <span v-if="errors.title" class="mt-1 block text-xs text-rose-600">{{ errors.title }}</span>
      </label>
      <label class="block">
        <span class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">For</span>
        <select v-model="draft.class_level" class="w-full py-2.5 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          <option value="">Every class</option>
          <option v-for="l in levels" :key="l" :value="l">{{ l }}</option>
        </select>
      </label>
      <div class="grid grid-cols-2 gap-3">
        <label class="block">
          <span class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">First day</span>
          <input v-model="draft.starts_on" type="date" class="w-full px-2 py-2 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm" :class="errors.starts_on ? 'border-rose-400' : 'border-gray-300 dark:border-gray-600'">
        </label>
        <label class="block">
          <span class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Last day</span>
          <input v-model="draft.ends_on" type="date" class="w-full px-2 py-2 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm" :class="errors.ends_on ? 'border-rose-400' : 'border-gray-300 dark:border-gray-600'">
        </label>
      </div>
      <p v-if="errors.starts_on || errors.ends_on" class="sm:col-span-2 text-xs text-rose-600">{{ errors.starts_on || errors.ends_on }}</p>
      <div class="sm:col-span-2 flex justify-end">
        <button type="submit" :disabled="saving" class="px-5 py-2 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60">{{ saving ? 'Adding…' : 'Add exam' }}</button>
      </div>
    </form>

    <Skeleton v-if="loading" class="mt-5" variant="list" :count="3" />
    <EmptyState v-else-if="!exams.length" class="mt-5" compact icon="target" title="No exams yet" message="Add the next exam above - students see the countdown straight away." />
    <ul v-else class="mt-5 space-y-2">
      <li v-for="e in exams" :key="e.id" class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 flex items-center gap-3" :class="isPast(e) ? 'opacity-60' : ''">
        <span class="w-12 flex-shrink-0 text-center rounded-xl bg-indigo-50 dark:bg-indigo-900/30 py-1.5">
          <span class="block text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-300">{{ month(e.starts_on) }}</span>
          <span class="block text-lg font-extrabold text-gray-900 dark:text-white leading-tight">{{ day(e.starts_on) }}</span>
        </span>
        <div class="min-w-0 flex-1">
          <p class="font-semibold text-gray-900 dark:text-white truncate">{{ e.title }}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ e.class_level || 'Every class' }}<template v-if="e.ends_on && e.ends_on !== e.starts_on"> · until {{ month(e.ends_on) }} {{ day(e.ends_on) }}</template>{{ isPast(e) ? ' · over' : '' }}</p>
        </div>
        <button type="button" class="p-2 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20" :aria-label="`Remove ${e.title}`" @click="remove(e)">
          <AppIcon name="trash" class="w-4 h-4" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useConfirmStore } from '@/stores/confirm'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { useToastStore } from '@/stores/toast'
const confirmDialog = useConfirmStore()

interface Exam { id: number; title: string; class_level: string | null; starts_on: string; ends_on: string | null }

const toast = useToastStore()
const exams = ref<Exam[]>([])
const levels = ref<string[]>([])
const loading = ref(true)
const saving = ref(false)
const errors = ref<Record<string, string>>({})
const draft = ref({ title: '', class_level: '', starts_on: '', ends_on: '' })

const month = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString(undefined, { month: 'short' })
const day = (d: string) => new Date(`${d}T12:00:00`).getDate()
const isPast = (e: Exam) => (e.ends_on || e.starts_on) < new Date().toISOString().slice(0, 10)

const load = async () => {
  try {
    const res = await axios.get('/api/admin/exam-dates')
    exams.value = res.data.data.exams || []
    levels.value = res.data.data.levels || []
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not load exam dates')
  } finally {
    loading.value = false
  }
}

const add = async () => {
  errors.value = {}
  saving.value = true
  try {
    await axios.post('/api/admin/exam-dates', draft.value)
    toast.success('Exam added')
    draft.value = { title: '', class_level: draft.value.class_level, starts_on: '', ends_on: '' }
    await load()
  } catch (err: any) {
    if (err.response?.data?.errors) errors.value = err.response.data.errors
    else toast.error(err.response?.data?.message || 'Could not add the exam')
  } finally {
    saving.value = false
  }
}

const remove = async (e: Exam) => {
  if (!await confirmDialog.open({ title: 'Remove exam date', message: `Remove ${e.title}?`, confirmLabel: 'Remove', danger: true })) return
  try {
    await axios.delete(`/api/admin/exam-dates/${e.id}`)
    exams.value = exams.value.filter(x => x.id !== e.id)
  } catch {
    toast.error('Could not remove it')
  }
}

onMounted(load)
</script>
