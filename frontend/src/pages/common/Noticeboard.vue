<template>
  <!-- The school noticeboard - the same page for students, teachers, HODs and admins (the role
       comes from the URL). Opening a notice marks it read; staff can post, and see who has read
       their notices. -->
  <div class="w-full max-w-4xl">
    <PageHeader title="Noticeboard" :description="canPost ? 'School notices - post one, and see who has read it.' : 'Notices from your school and your teachers.'" icon="speaker" accent="indigo">
      <template v-if="canPost" #actions>
        <button type="button" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700" @click="openNew">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          Post a notice
        </button>
      </template>
      <StatStrip v-if="notices.length" v-model="filter" :items="statItems" />
    </PageHeader>

    <Skeleton v-if="loading" variant="list" :count="3" />
    <EmptyState v-else-if="!notices.length" icon="speaker" tone="indigo" title="No notices yet" :message="canPost ? 'Post a notice for the school, your students or a class - and see who has read it.' : 'When your school or teachers post a notice, it shows up here.'">
      <button v-if="canPost" type="button" class="inline-flex px-4 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700" @click="openNew">Post a notice</button>
    </EmptyState>
    <EmptyState v-else-if="!shown.length" compact icon="speaker" title="Nothing here" message="Try another filter." />

    <ul v-else class="space-y-3">
      <li v-for="n in shown" :key="n.id" class="rounded-2xl border bg-white dark:bg-gray-800 overflow-hidden" :class="!n.is_read && !n.mine ? 'border-indigo-300 dark:border-indigo-700 ring-1 ring-indigo-100 dark:ring-indigo-900/40' : 'border-gray-200 dark:border-gray-700'">
        <button type="button" class="w-full text-left p-4 sm:p-5 flex items-start gap-3" :aria-expanded="openId === n.id" @click="toggle(n)">
          <span class="mt-1.5 w-2 h-2 flex-shrink-0 rounded-full" :class="!n.is_read && !n.mine ? 'bg-indigo-500' : 'bg-transparent'"></span>
          <div class="min-w-0 flex-1">
            <p class="flex flex-wrap items-center gap-2">
              <span class="font-semibold text-gray-900 dark:text-white" :class="!n.is_read && !n.mine ? '' : 'font-medium'">{{ n.title }}</span>
              <span v-if="n.pinned" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">Pinned</span>
            </p>
            <p class="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{{ niceName(n.author_name) }} · {{ n.audience_label }} · {{ timeAgo(n.created_at) }}<template v-if="n.expires_on"> · until {{ shortDate(n.expires_on) }}</template></p>
            <p v-if="openId !== n.id" class="mt-1.5 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{{ n.body }}</p>
          </div>
          <svg class="w-4 h-4 mt-1 flex-shrink-0 text-gray-400 transition" :class="openId === n.id ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        <div v-if="openId === n.id" class="px-4 sm:px-5 pb-5 pl-9 sm:pl-10">
          <p class="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-line leading-relaxed">{{ n.body }}</p>

          <!-- Read receipts, for the author -->
          <div v-if="n.can_manage" class="mt-4 rounded-xl bg-gray-50 dark:bg-gray-900/40 p-3">
            <p v-if="!receipts[n.id]" class="text-xs text-gray-500">Counting readers…</p>
            <template v-else>
              <div class="flex items-center gap-3">
                <div class="flex-1 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden"><div class="h-full bg-emerald-500" :style="{ width: `${receipts[n.id].total ? Math.round(receipts[n.id].read / receipts[n.id].total * 100) : 0}%` }"></div></div>
                <span class="text-sm font-semibold text-gray-800 dark:text-gray-100 tabular-nums">Read by {{ receipts[n.id].read }} of {{ receipts[n.id].total }}</span>
              </div>
              <details v-if="receipts[n.id].not_read.length" class="mt-2">
                <summary class="cursor-pointer text-xs font-semibold text-indigo-600 dark:text-indigo-300">{{ receipts[n.id].not_read.length }} haven't read it yet</summary>
                <p class="mt-2 text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{{ receipts[n.id].not_read.map(s => niceName(s.name)).join(', ') }}</p>
              </details>
            </template>
            <button type="button" class="mt-3 text-xs font-semibold text-rose-600 hover:underline" @click="remove(n)">Remove this notice</button>
          </div>
        </div>
      </li>
    </ul>

    <!-- Post a notice -->
    <div v-if="draft" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4" role="dialog" aria-modal="true">
      <div class="absolute inset-0 bg-black/50" @click="draft = null"></div>
      <form class="relative w-full sm:max-w-lg max-h-[90dvh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white dark:bg-gray-800 p-6" @submit.prevent="post">
        <h2 class="text-lg font-bold text-gray-900 dark:text-white">Post a notice</h2>
        <label class="mt-4 block">
          <span class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Title</span>
          <input v-model="draft.title" type="text" maxlength="150" class="w-full px-3 py-2.5 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white" :class="errors.title ? 'border-rose-400' : 'border-gray-300 dark:border-gray-600'">
          <span v-if="errors.title" class="mt-1 block text-xs text-rose-600">{{ errors.title }}</span>
        </label>
        <label class="mt-3 block">
          <span class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Notice</span>
          <textarea v-model="draft.body" rows="5" maxlength="5000" class="w-full px-3 py-2.5 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white" :class="errors.body ? 'border-rose-400' : 'border-gray-300 dark:border-gray-600'"></textarea>
          <span v-if="errors.body" class="mt-1 block text-xs text-rose-600">{{ errors.body }}</span>
        </label>
        <div class="mt-3">
          <span class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Who is it for?</span>
          <div class="flex flex-wrap gap-2">
            <button v-for="a in options.audiences" :key="a" type="button" class="px-3 py-1.5 rounded-lg text-sm font-semibold border" :class="draft.audience === a ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200'" @click="draft.audience = a">{{ AUDIENCE[a] }}</button>
          </div>
          <select v-if="draft.audience === 'class'" v-model.number="draft.class_id" class="mt-2 w-full py-2 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white">
            <option :value="0" disabled>Choose the class</option>
            <option v-for="c in options.classes" :key="c.id" :value="c.id">{{ c.label }}</option>
          </select>
          <select v-if="draft.audience === 'level'" v-model="draft.class_level" class="mt-2 w-full py-2 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white">
            <option value="" disabled>Choose the class</option>
            <option v-for="l in options.levels" :key="l" :value="l">{{ l }} - all streams</option>
          </select>
          <span v-if="errors.audience" class="mt-1 block text-xs text-rose-600">{{ errors.audience }}</span>
        </div>
        <div class="mt-3 grid sm:grid-cols-2 gap-3">
          <label class="block">
            <span class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Show until (optional)</span>
            <input v-model="draft.expires_on" type="date" class="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm">
          </label>
          <label v-if="role !== 'teacher'" class="flex items-center gap-2.5 text-sm text-gray-700 dark:text-gray-200 sm:pt-6">
            <input v-model="draft.pinned" type="checkbox" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
            Pin to the top
          </label>
        </div>
        <div class="mt-6 flex justify-end gap-2">
          <button type="button" class="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" @click="draft = null">Cancel</button>
          <button type="submit" :disabled="posting" class="px-5 py-2 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60">{{ posting ? 'Posting…' : 'Post' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import { niceName, timeAgo } from '@/components/dashboard/teacher/time'
import { useToastStore } from '@/stores/toast'

interface Notice {
  id: number
  title: string
  body: string
  author_name: string
  author_role: string
  audience: string
  audience_label: string
  pinned: boolean
  expires_on: string | null
  created_at: string
  is_read: boolean
  mine: boolean
  can_manage: boolean
}

const AUDIENCE: Record<string, string> = { everyone: 'Everyone', students: 'All students', staff: 'All staff', class: 'One class', level: 'All streams of a class' }

const route = useRoute()
const toast = useToastStore()
const role = computed(() => route.path.split('/')[1])
const api = computed(() => `/api/${role.value}/notices`)

const notices = ref<Notice[]>([])
const loading = ref(true)
const canPost = ref(false)
const filter = ref<string | null>(null)
const openId = ref<number | null>(null)
const receipts = ref<Record<number, { read: number; total: number; not_read: { id: number; name: string }[] }>>({})

const statItems = computed<StatItem[]>(() => [
  { label: 'Unread', value: notices.value.filter(n => !n.is_read && !n.mine).length, key: 'unread', tone: 'indigo' },
  { label: 'All notices', value: notices.value.length, key: 'all', tone: 'gray' },
  ...(canPost.value ? [{ label: 'Posted by me', value: notices.value.filter(n => n.mine).length, key: 'mine', tone: 'emerald' as const }] : [])
])
const shown = computed(() => notices.value.filter(n => filter.value === 'unread' ? !n.is_read && !n.mine : filter.value === 'mine' ? n.mine : true))
const shortDate = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })

const load = async () => {
  try {
    const res = await axios.get(api.value)
    notices.value = res.data.data.notices || []
    canPost.value = !!res.data.data.can_post
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not load the noticeboard')
  } finally {
    loading.value = false
  }
}

const toggle = async (n: Notice) => {
  openId.value = openId.value === n.id ? null : n.id
  if (openId.value !== n.id) return
  if (!n.is_read && !n.mine) {
    n.is_read = true
    axios.post(`${api.value}/${n.id}/read`).catch(() => {})
  }
  if (n.can_manage && !receipts.value[n.id]) {
    try {
      const res = await axios.get(`${api.value}/${n.id}/readers`)
      receipts.value[n.id] = res.data.data
    } catch { /* receipts are a nice-to-have */ }
  }
}

const remove = async (n: Notice) => {
  if (!window.confirm(`Remove "${n.title}" from the noticeboard?`)) return
  try {
    await axios.delete(`${api.value}/${n.id}`)
    notices.value = notices.value.filter(x => x.id !== n.id)
    toast.success('Notice removed')
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not remove it')
  }
}

// Posting
const options = ref<{ audiences: string[]; classes: { id: number; label: string; level: string }[]; levels: string[] }>({ audiences: [], classes: [], levels: [] })
const draft = ref<{ title: string; body: string; audience: string; class_id: number; class_level: string; expires_on: string; pinned: boolean } | null>(null)
const errors = ref<Record<string, string>>({})
const posting = ref(false)

const openNew = async () => {
  errors.value = {}
  if (!options.value.audiences.length) {
    try {
      const res = await axios.get(`${api.value}/options`)
      options.value = res.data.data
    } catch {
      toast.error('Could not load who you can post to')
      return
    }
  }
  if (!options.value.audiences.length || (role.value === 'teacher' && !options.value.classes.length)) {
    toast.error('You can post once you teach a class')
    return
  }
  draft.value = { title: '', body: '', audience: options.value.audiences[0], class_id: options.value.classes.length === 1 ? options.value.classes[0].id : 0, class_level: '', expires_on: '', pinned: false }
}

const post = async () => {
  if (!draft.value) return
  errors.value = {}
  posting.value = true
  try {
    await axios.post(api.value, draft.value)
    draft.value = null
    toast.success('Notice posted')
    await load()
  } catch (err: any) {
    if (err.response?.data?.errors) errors.value = err.response.data.errors
    else toast.error(err.response?.data?.message || 'Could not post')
  } finally {
    posting.value = false
  }
}

onMounted(load)
</script>
