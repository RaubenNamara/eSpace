<template>
  <!-- Study groups: a few classmates revising together towards a goal. Each group is a chat, so
       talking happens in Chats; this page starts groups and keeps the goal and date in view. -->
  <div class="w-full">
    <PageHeader title="Study groups" description="Revise with up to four classmates - agree what you're working on and by when, then talk it through in Chats." icon="users" accent="indigo">
      <template #actions>
        <button type="button" class="btn-primary" @click="openNew">Start a group</button>
      </template>
    </PageHeader>

    <div v-if="loading" class="grid sm:grid-cols-2 gap-3">
      <div v-for="i in 2" :key="i" class="h-36 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 animate-pulse"></div>
    </div>

    <EmptyState v-else-if="!groups.length" icon="users" tone="indigo" title="No study groups yet" message="Pick a topic, a date and a few classmates - revising together is easier to keep going.">
      <button type="button" class="btn-primary" @click="openNew">Start a group</button>
    </EmptyState>

    <div v-else class="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
      <article v-for="g in groups" :key="g.id" class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 flex flex-col">
        <p v-if="g.subject" class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">{{ g.subject }}</p>
        <h3 class="mt-0.5 text-base font-bold text-gray-900 dark:text-white">{{ g.goal }}</h3>
        <p v-if="g.target_date" class="mt-1 text-xs" :class="daysTo(g.target_date) < 0 ? 'text-gray-400' : daysTo(g.target_date) <= 2 ? 'text-rose-600 dark:text-rose-400 font-semibold' : 'text-gray-500 dark:text-gray-400'">
          {{ targetLabel(g.target_date) }}
        </p>
        <div class="mt-3 flex -space-x-2">
          <span v-for="m in g.members" :key="m.id" class="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-200 text-[11px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-gray-800" :title="niceName(m.name)">{{ initials(m.name) }}</span>
        </div>
        <p class="mt-1.5 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{{ g.members.map(m => niceName(m.name).split(' ')[0]).join(', ') }}</p>
        <div class="mt-auto pt-3 flex items-center gap-2">
          <RouterLink :to="`/student/chat?conversation=${g.id}`" class="flex-1 text-center px-3 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700">Open chat</RouterLink>
          <ActionMenu :label="`More for ${g.goal}`" :items="[
            { label: 'Change the date', icon: 'clock', run: () => changeDate(g) },
            { label: 'Leave group', icon: 'trash', danger: true, divider: true, run: () => leave(g) }
          ]" />
        </div>
      </article>
    </div>
    <p v-if="groups.length" class="mt-4 text-xs text-gray-400">Study group chats can be seen by your school's heads of department, like every chat in eSpace.</p>

    <!-- Start a group -->
    <div v-if="showNew" class="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4" @click.self="showNew = false">
      <form class="w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-white dark:bg-gray-800 p-5" @submit.prevent="create">
        <h2 class="text-lg font-bold text-gray-900 dark:text-white">Start a study group</h2>
        <label class="mt-4 block">
          <span class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">What are you revising?</span>
          <input v-model="form.goal" maxlength="200" required placeholder="e.g. Photosynthesis before Friday's test" class="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white">
        </label>
        <div class="mt-3 grid grid-cols-2 gap-3">
          <label class="block">
            <span class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Subject</span>
            <select v-model.number="form.subject_id" class="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white">
              <option :value="0">Any</option>
              <option v-for="s in subjects" :key="s.id" :value="s.id">{{ s.name }}</option>
            </select>
          </label>
          <label class="block">
            <span class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">By when</span>
            <input v-model="form.target_date" type="date" :min="today" class="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white">
          </label>
        </div>
        <div class="mt-3">
          <span class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Classmates <span class="font-normal text-gray-400">({{ form.members.size }}/{{ maxMembers - 1 }})</span></span>
          <input v-model="search" placeholder="Search classmates" class="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white">
          <ul class="mt-2 max-h-56 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700 rounded-xl border border-gray-200 dark:border-gray-700">
            <li v-for="c in shownClassmates" :key="c.id">
              <label class="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/40" :class="{ 'opacity-50': !form.members.has(c.id) && form.members.size >= maxMembers - 1 }">
                <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-indigo-600" :checked="form.members.has(c.id)" :disabled="!form.members.has(c.id) && form.members.size >= maxMembers - 1" @change="toggleMember(c.id)">
                <span class="text-sm text-gray-800 dark:text-gray-100">{{ niceName(c.name) }}</span>
              </label>
            </li>
            <li v-if="!shownClassmates.length" class="px-3 py-3 text-sm text-gray-400">No classmates match.</li>
          </ul>
        </div>
        <div class="mt-5 flex justify-end gap-2">
          <button type="button" class="btn-secondary" @click="showNew = false">Cancel</button>
          <button type="submit" class="btn-primary" :disabled="saving || !form.goal.trim() || !form.members.size">{{ saving ? 'Starting…' : 'Start group' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import ActionMenu from '@/components/ui/ActionMenu.vue'
import { niceName, initials } from '@/components/dashboard/teacher/time'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'

interface Group { id: number; name: string; goal: string; subject: string | null; target_date: string | null; mine: boolean; members: { id: number; name: string }[] }
interface Person { id: number; name: string }

const router = useRouter()
const toast = useToastStore()
const confirmDialog = useConfirmStore()
const groups = ref<Group[]>([])
const classmates = ref<Person[]>([])
const subjects = ref<Person[]>([])
const maxMembers = ref(5)
const loading = ref(true)
const showNew = ref(false)
const saving = ref(false)
const search = ref('')
const form = reactive({ goal: '', subject_id: 0, target_date: '', members: new Set<number>() })

const today = new Date().toISOString().slice(0, 10)
const daysTo = (d: string) => Math.round((Date.parse(`${d}T00:00:00`) - Date.parse(`${today}T00:00:00`)) / 86400000)
const targetLabel = (d: string) => {
  const n = daysTo(d)
  const when = new Date(`${d}T00:00:00`).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })
  if (n < 0) return `Was due ${when}`
  if (n === 0) return 'Today'
  if (n === 1) return 'Tomorrow'
  return `${when} · in ${n} days`
}
const shownClassmates = computed(() => {
  const q = search.value.trim().toLowerCase()
  return classmates.value.filter(c => !q || c.name.toLowerCase().includes(q)).slice(0, 80)
})

const load = async () => {
  try {
    const res = await axios.get('/api/student/study-groups')
    groups.value = res.data.data.groups || []
    classmates.value = res.data.data.classmates || []
    subjects.value = res.data.data.subjects || []
    maxMembers.value = res.data.data.max_members || 5
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not load your study groups')
  } finally {
    loading.value = false
  }
}

const openNew = () => {
  form.goal = ''
  form.subject_id = 0
  form.target_date = ''
  form.members = new Set()
  search.value = ''
  showNew.value = true
}
const toggleMember = (id: number) => {
  const s = new Set(form.members)
  if (s.has(id)) s.delete(id)
  else s.add(id)
  form.members = s
}

const create = async () => {
  saving.value = true
  try {
    const res = await axios.post('/api/student/study-groups', {
      goal: form.goal,
      subject_id: form.subject_id || null,
      target_date: form.target_date || null,
      member_ids: [...form.members]
    })
    showNew.value = false
    toast.success('Study group started')
    router.push(`/student/chat?conversation=${res.data.data.id}`)
  } catch (err: any) {
    const errors = err.response?.data?.errors
    toast.error((errors && Object.values(errors)[0]) as string || err.response?.data?.message || 'Could not start the group')
  } finally {
    saving.value = false
  }
}

const changeDate = async (g: Group) => {
  const value = window.prompt('New date (YYYY-MM-DD) - leave empty for no date', g.target_date || '')
  if (value === null) return
  try {
    await axios.put(`/api/student/study-groups/${g.id}`, { target_date: value.trim() })
    await load()
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not change the date')
  }
}

const leave = async (g: Group) => {
  if (!await confirmDialog.open({ title: 'Leave group', message: `Leave "${g.goal}"? You can be added to a new group any time.`, confirmLabel: 'Leave', danger: true })) return
  try {
    await axios.post(`/api/student/study-groups/${g.id}/leave`)
    groups.value = groups.value.filter(x => x.id !== g.id)
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not leave the group')
  }
}

onMounted(load)
</script>
