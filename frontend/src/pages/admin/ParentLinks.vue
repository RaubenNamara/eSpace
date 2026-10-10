<template>
  <!-- Parent links: give a parent or guardian a private, read-only link to their child's weekly
       update - no account needed - and, with an email address, the same update every week.
       Turning a link off stops both. -->
  <div class="w-full">
    <PageHeader title="Parents" description="Private weekly updates for parents and guardians - a link to open any time, and an email every week." icon="users" accent="indigo">
      <template #actions>
        <button type="button" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700" @click="openNew">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          Add a parent
        </button>
      </template>
      <StatStrip v-if="links.length" v-model="filter" :items="statItems" />
      <template #filters>
        <div class="relative w-full sm:w-72">
          <svg class="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"></path></svg>
          <input v-model="search" type="search" placeholder="Search learner, parent or email" class="w-full pl-8 pr-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500">
        </div>
      </template>
    </PageHeader>

    <!-- Weekly email -->
    <div v-if="links.length" class="mb-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 flex flex-col sm:flex-row sm:items-center gap-3">
      <AppIcon name="send" class="hidden sm:block w-5 h-5 text-indigo-500 flex-shrink-0" />
      <p class="flex-1 text-sm text-gray-600 dark:text-gray-300">
        <b class="text-gray-900 dark:text-white">Weekly email:</b> {{ emailCount }} {{ emailCount === 1 ? 'parent gets' : 'parents get' }} the update by email. It goes out every week on its own once the server's weekly job is set up - or send this week's now.
      </p>
      <button type="button" :disabled="sending || !emailCount" class="px-4 py-2 rounded-xl text-sm font-semibold border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50" @click="sendNow">{{ sending ? 'Sending…' : 'Send this week\'s now' }}</button>
    </div>

    <Skeleton v-if="loading" variant="list" :count="4" />
    <EmptyState v-else-if="!links.length" icon="users" tone="indigo" title="No parents added yet" message="Add a parent or guardian to a learner: they get a private link to a weekly update - what was read and handed in, results, and what's due - and, with an email, the same update every week.">
      <button type="button" class="inline-flex px-4 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700" @click="openNew">Add a parent</button>
    </EmptyState>
    <EmptyState v-else-if="!shown.length" compact icon="users" title="No one matches" message="Try another search or filter." />

    <ul v-else class="space-y-2.5">
      <li v-for="l in shown" :key="l.id" class="rounded-2xl border bg-white dark:bg-gray-800 p-4 flex flex-col lg:flex-row lg:items-center gap-3" :class="l.revoked_at ? 'border-gray-200 dark:border-gray-700 opacity-60' : 'border-gray-200 dark:border-gray-700'">
        <div class="min-w-0 flex-1">
          <p class="font-semibold text-gray-900 dark:text-white">
            {{ l.guardian_name }}<span v-if="l.relationship" class="font-normal text-gray-500 dark:text-gray-400"> · {{ l.relationship }}</span>
            <span v-if="l.revoked_at" class="ml-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">Turned off</span>
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-300">For <b>{{ niceName(l.student_name) }}</b><span v-if="l.class_label"> · {{ l.class_label }}</span><span v-if="l.admission_number" class="text-gray-400"> · {{ l.admission_number }}</span></p>
          <p class="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-gray-500 dark:text-gray-400">
            <span v-if="l.guardian_email">{{ l.guardian_email }}{{ l.send_digest ? '' : ' (no weekly email)' }}</span>
            <span v-if="l.guardian_phone">{{ l.guardian_phone }}</span>
            <span>{{ l.last_viewed_at ? `Opened ${timeAgo(l.last_viewed_at)}` : 'Not opened yet' }}</span>
            <span v-if="l.last_digest_at">Last email {{ timeAgo(l.last_digest_at) }}</span>
          </p>
        </div>
        <div v-if="!l.revoked_at" class="flex flex-wrap items-center gap-2">
          <button type="button" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700" @click="copy(l)">
            <AppIcon name="paperclip" class="w-4 h-4" />{{ copiedId === l.id ? 'Copied' : 'Copy link' }}
          </button>
          <a :href="linkFor(l)" target="_blank" rel="noopener" class="px-3 py-1.5 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Preview</a>
          <ActionMenu :items="[{ label: 'Edit', icon: 'pencil', run: () => openEdit(l) }, { label: 'Turn off this link', icon: 'trash', danger: true, divider: true, run: () => revoke(l) }]" />
        </div>
      </li>
    </ul>

    <!-- Add / edit -->
    <div v-if="editing" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4" role="dialog" aria-modal="true">
      <div class="absolute inset-0 bg-black/50" @click="editing = null"></div>
      <form class="relative w-full sm:max-w-lg max-h-[90dvh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white dark:bg-gray-800 p-6" @submit.prevent="save">
        <h2 class="text-lg font-bold text-gray-900 dark:text-white">{{ editing.id ? 'Edit parent' : 'Add a parent or guardian' }}</h2>

        <!-- The learner -->
        <div v-if="!editing.id" class="mt-5">
          <label class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Learner</label>
          <div v-if="editing.student" class="flex items-center gap-3 rounded-xl border border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-2">
            <span class="flex-1 text-sm"><b>{{ niceName(editing.student.name) }}</b><span class="text-gray-500"> · {{ editing.student.class_label || 'No class' }}</span></span>
            <button type="button" class="text-sm font-semibold text-indigo-700 dark:text-indigo-300" @click="editing.student = null">Change</button>
          </div>
          <template v-else>
            <input v-model="studentQuery" type="search" placeholder="Type a name or admission number" class="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" @input="findStudents">
            <ul v-if="studentResults.length" class="mt-2 max-h-48 overflow-y-auto rounded-xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
              <li v-for="s in studentResults" :key="s.id">
                <button type="button" class="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700" @click="editing.student = s">
                  <b class="text-gray-900 dark:text-white">{{ niceName(s.name) }}</b><span class="text-gray-500"> · {{ s.class_label || 'No class' }}<template v-if="s.admission_number"> · {{ s.admission_number }}</template></span>
                </button>
              </li>
            </ul>
            <p v-if="errors.student_id" class="mt-1 text-xs text-rose-600">{{ errors.student_id }}</p>
          </template>
        </div>

        <div class="mt-4 grid sm:grid-cols-2 gap-3">
          <label class="block sm:col-span-2">
            <span class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Parent or guardian's name *</span>
            <input v-model="editing.guardian_name" type="text" maxlength="120" class="w-full px-3 py-2.5 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white" :class="errors.guardian_name ? 'border-rose-400' : 'border-gray-300 dark:border-gray-600'">
            <span v-if="errors.guardian_name" class="mt-1 block text-xs text-rose-600">{{ errors.guardian_name }}</span>
          </label>
          <label class="block">
            <span class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Relationship</span>
            <input v-model="editing.relationship" type="text" maxlength="40" placeholder="e.g. Mother, Uncle" class="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          </label>
          <label class="block">
            <span class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Phone</span>
            <input v-model="editing.guardian_phone" type="tel" maxlength="40" class="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          </label>
          <label class="block sm:col-span-2">
            <span class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Email</span>
            <input v-model="editing.guardian_email" type="email" maxlength="150" class="w-full px-3 py-2.5 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white" :class="errors.guardian_email ? 'border-rose-400' : 'border-gray-300 dark:border-gray-600'">
            <span v-if="errors.guardian_email" class="mt-1 block text-xs text-rose-600">{{ errors.guardian_email }}</span>
          </label>
          <label class="sm:col-span-2 flex items-center gap-2.5 text-sm text-gray-700 dark:text-gray-200">
            <input v-model="editing.send_digest" type="checkbox" class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
            Email the update every week
          </label>
        </div>

        <div class="mt-6 flex justify-end gap-2">
          <button type="button" class="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" @click="editing = null">Cancel</button>
          <button type="submit" :disabled="saving" class="px-5 py-2 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60">{{ saving ? 'Saving…' : editing.id ? 'Save' : 'Create link' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConfirmStore } from '@/stores/confirm'
import { computed, onMounted, ref, watch } from 'vue'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import ActionMenu from '@/components/ui/ActionMenu.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { niceName, timeAgo } from '@/components/dashboard/teacher/time'
import { useToastStore } from '@/stores/toast'
const confirmDialog = useConfirmStore()

interface ParentLink {
  id: number
  student_id: number
  student_name: string
  admission_number: string | null
  class_label: string | null
  token: string
  guardian_name: string
  relationship: string | null
  guardian_email: string | null
  guardian_phone: string | null
  send_digest: boolean
  created_at: string
  revoked_at: string | null
  last_viewed_at: string | null
  last_digest_at: string | null
}
interface StudentHit { id: number; name: string; admission_number: string | null; class_label: string | null }
interface Draft {
  id?: number
  student: StudentHit | null
  guardian_name: string
  relationship: string
  guardian_email: string
  guardian_phone: string
  send_digest: boolean
}

const toast = useToastStore()
const links = ref<ParentLink[]>([])
const loading = ref(true)
const search = ref('')
const filter = ref<string | null>(null)
const sending = ref(false)
const copiedId = ref<number | null>(null)

const active = computed(() => links.value.filter(l => !l.revoked_at))
const emailCount = computed(() => active.value.filter(l => l.guardian_email && l.send_digest).length)
const statItems = computed<StatItem[]>(() => [
  { label: 'Active links', value: active.value.length, key: 'active', tone: 'indigo' },
  { label: 'Opened', value: active.value.filter(l => l.last_viewed_at).length, key: 'opened', tone: 'emerald', hint: 'at least once' },
  { label: 'Weekly email', value: emailCount.value, key: 'email', tone: 'sky' },
  { label: 'Turned off', value: links.value.length - active.value.length, key: 'off', tone: 'gray' }
])
const shown = computed(() => {
  const q = search.value.trim().toLowerCase()
  return links.value.filter(l => {
    if (filter.value === 'active' && l.revoked_at) return false
    if (filter.value === 'opened' && (l.revoked_at || !l.last_viewed_at)) return false
    if (filter.value === 'email' && (l.revoked_at || !l.guardian_email || !l.send_digest)) return false
    if (filter.value === 'off' && !l.revoked_at) return false
    return !q || [l.student_name, l.guardian_name, l.guardian_email, l.admission_number].join(' ').toLowerCase().includes(q)
  })
})

const linkFor = (l: ParentLink) => `${window.location.origin}/parent/${l.token}`

const load = async () => {
  try {
    const res = await axios.get('/api/admin/parent-links')
    links.value = res.data.data.links || []
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not load parent links')
  } finally {
    loading.value = false
  }
}

const copy = async (l: ParentLink) => {
  try {
    await navigator.clipboard.writeText(linkFor(l))
    copiedId.value = l.id
    setTimeout(() => { if (copiedId.value === l.id) copiedId.value = null }, 2000)
  } catch {
    // No clipboard access (an older browser, or not https): show the link to copy by hand
    await confirmDialog.ask({ title: 'Copy this link', message: 'Select the link and copy it.', value: linkFor(l), optional: true, confirmLabel: 'Done', cancelLabel: 'Close' })
  }
}

// Add / edit
const editing = ref<Draft | null>(null)
const errors = ref<Record<string, string>>({})
const saving = ref(false)
const studentQuery = ref('')
const studentResults = ref<StudentHit[]>([])
let searchTimer: number | undefined

const openNew = () => {
  errors.value = {}
  studentQuery.value = ''
  studentResults.value = []
  editing.value = { student: null, guardian_name: '', relationship: '', guardian_email: '', guardian_phone: '', send_digest: true }
}
const openEdit = (l: ParentLink) => {
  errors.value = {}
  editing.value = {
    id: l.id,
    student: { id: l.student_id, name: l.student_name, admission_number: l.admission_number, class_label: l.class_label },
    guardian_name: l.guardian_name,
    relationship: l.relationship ?? '',
    guardian_email: l.guardian_email ?? '',
    guardian_phone: l.guardian_phone ?? '',
    send_digest: l.send_digest
  }
}
const findStudents = () => {
  window.clearTimeout(searchTimer)
  searchTimer = window.setTimeout(async () => {
    if (studentQuery.value.trim().length < 2) { studentResults.value = []; return }
    try {
      const res = await axios.get('/api/admin/parent-links/students', { params: { q: studentQuery.value.trim() } })
      studentResults.value = res.data.data.students || []
    } catch { studentResults.value = [] }
  }, 250)
}

const save = async () => {
  const d = editing.value
  if (!d) return
  errors.value = {}
  saving.value = true
  const body = { student_id: d.student?.id ?? 0, guardian_name: d.guardian_name, relationship: d.relationship, guardian_email: d.guardian_email, guardian_phone: d.guardian_phone, send_digest: d.send_digest }
  try {
    const res = d.id ? await axios.put(`/api/admin/parent-links/${d.id}`, body) : await axios.post('/api/admin/parent-links', body)
    const link: ParentLink = res.data.data.link
    const i = links.value.findIndex(l => l.id === link.id)
    if (i >= 0) links.value[i] = link
    else links.value.unshift(link)
    editing.value = null
    toast.success(d.id ? 'Saved' : 'Link created - copy it and send it to the parent')
    if (!d.id) copy(link)
  } catch (err: any) {
    if (err.response?.data?.errors) errors.value = err.response.data.errors
    else toast.error(err.response?.data?.message || 'Could not save')
  } finally {
    saving.value = false
  }
}

const revoke = async (l: ParentLink) => {
  if (!await confirmDialog.open({ title: 'Turn off this link', message: `Turn off ${l.guardian_name}'s link? It stops working at once, and the weekly email stops too.`, confirmLabel: 'Turn off', danger: true })) return
  try {
    await axios.delete(`/api/admin/parent-links/${l.id}`)
    l.revoked_at = new Date().toISOString()
    toast.success('Link turned off')
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not turn it off')
  }
}

const sendNow = async () => {
  sending.value = true
  try {
    const res = await axios.post('/api/admin/parent-links/send', { site_url: window.location.origin })
    const r = res.data.data
    if (r.failed && !r.sent) toast.error(`${r.failed} could not be sent - check the server's email settings`)
    else toast.success(`${r.sent} sent${r.failed ? `, ${r.failed} failed` : ''}`)
    await load()
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not send')
  } finally {
    sending.value = false
  }
}

watch(() => editing.value?.student, s => { if (s && editing.value && !editing.value.id) studentResults.value = [] })
onMounted(load)
</script>
