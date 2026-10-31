<template>
  <!-- The developer portal (tusome.ug/devportal) - the Tusome team only. Its own login, apart from
       every school's accounts (DevPortalController). Schools: enrol (each gets its own database),
       pause and resume. Learners: independent learners' requests - contact, then activate to
       create a login. Activity: everything the team did. -->
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-sans">
    <!-- Sign in -->
    <div v-if="!admin" class="min-h-screen flex items-center justify-center px-4">
      <form class="w-full max-w-sm rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-4" @submit.prevent="login">
        <div>
          <p class="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Tusome</p>
          <h1 class="text-xl font-bold">Developer portal</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400">For the Tusome team only.</p>
        </div>
        <label class="block"><span :class="LABEL">Email</span><input v-model="creds.email" type="email" autocomplete="username" :class="INPUT"></label>
        <label class="block"><span :class="LABEL">Password</span><input v-model="creds.password" type="password" autocomplete="current-password" :class="INPUT"></label>
        <p v-if="loginError" class="text-sm text-rose-600">{{ loginError }}</p>
        <button type="submit" :disabled="busy" class="w-full py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50">{{ busy ? 'Checking...' : 'Login' }}</button>
      </form>
    </div>

    <template v-else>
      <header class="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div class="mx-auto max-w-6xl px-4 py-3 flex flex-wrap items-center gap-3">
          <p class="font-bold"><span class="text-indigo-600 dark:text-indigo-400">Tusome</span> developer portal</p>
          <nav class="flex gap-1 ml-2">
            <button v-for="t in TABS" :key="t.key" type="button" class="px-3 py-1.5 rounded-lg text-sm font-semibold"
              :class="tab === t.key ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'" @click="tab = t.key">
              {{ t.label }}<span v-if="t.key === 'learners' && newRequests" class="ml-1.5 px-1.5 rounded-full bg-rose-500 text-white text-[11px]">{{ newRequests }}</span>
            </button>
          </nav>
          <span class="ml-auto text-sm text-gray-500 dark:text-gray-400">{{ admin.name }}</span>
          <button type="button" class="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:underline" @click="logout">Log out</button>
        </div>
      </header>

      <main class="mx-auto max-w-6xl px-4 py-6 space-y-5">
        <!-- Once-only credentials, after enrolling or activating -->
        <div v-if="shown" class="rounded-2xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 p-4">
          <p class="font-semibold text-emerald-900 dark:text-emerald-100">{{ shown.title }}</p>
          <p class="mt-1 text-sm text-emerald-900 dark:text-emerald-100">Login <b class="font-mono">{{ shown.login }}</b> · password <b class="font-mono">{{ shown.password }}</b></p>
          <p class="mt-1 text-xs text-emerald-800 dark:text-emerald-200">{{ shown.note }} The password is shown only now - copy it before closing.</p>
          <div class="mt-2 flex gap-2">
            <button type="button" class="px-3 py-1.5 rounded-lg text-sm font-semibold bg-emerald-600 text-white" @click="copyShown">{{ copied ? 'Copied' : 'Copy' }}</button>
            <button type="button" class="px-3 py-1.5 rounded-lg text-sm font-semibold text-emerald-900 dark:text-emerald-100" @click="shown = null">Close</button>
          </div>
        </div>

        <!-- Schools -->
        <template v-if="tab === 'schools'">
          <div class="flex items-center justify-between gap-3">
            <h2 class="text-lg font-bold">Schools <span class="text-gray-400 font-normal">{{ schools.length }}</span></h2>
            <button type="button" class="px-3 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700" @click="enrolOpen = !enrolOpen">{{ enrolOpen ? 'Cancel' : 'Enrol a school' }}</button>
          </div>

          <form v-if="enrolOpen" class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 grid sm:grid-cols-2 gap-4" @submit.prevent="enrol">
            <label class="block"><span :class="LABEL">School name *</span><input v-model="enrolForm.name" :class="INPUT" placeholder="Kings College Budo"></label>
            <label class="block">
              <span :class="LABEL">Code * <span class="font-normal text-gray-400">- goes after the @ in every login</span></span>
              <input v-model="enrolForm.code" :class="INPUT" placeholder="kings" @input="enrolForm.code = enrolForm.code.toLowerCase().replace(/[^a-z0-9-]/g, '')">
              <span v-if="enrolForm.code" class="mt-1 block text-xs text-gray-500">Logins will look like <b>amos@{{ enrolForm.code }}</b></span>
            </label>
            <div class="sm:col-span-2">
              <span :class="LABEL">Kind</span>
              <div class="flex flex-wrap gap-2">
                <button v-for="k in KINDS" :key="k.value" type="button" class="px-3 py-1.5 rounded-full text-sm font-semibold border"
                  :class="enrolForm.kind === k.value ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300 dark:border-gray-700'" @click="enrolForm.kind = k.value">{{ k.label }}</button>
              </div>
            </div>
            <label class="block"><span :class="LABEL">First administrator's username *</span><input v-model="enrolForm.admin_username" :class="INPUT" placeholder="admin"></label>
            <label class="block"><span :class="LABEL">Administrator's email *</span><input v-model="enrolForm.admin_email" type="email" :class="INPUT"></label>
            <label class="block"><span :class="LABEL">Contact person</span><input v-model="enrolForm.contact_name" :class="INPUT"></label>
            <label class="block"><span :class="LABEL">Contact phone</span><input v-model="enrolForm.contact_phone" :class="INPUT"></label>
            <label class="block sm:col-span-2">
              <span :class="LABEL">Database name <span class="font-normal text-gray-400">- leave empty to use tusome_{{ (enrolForm.code || 'code').replace(/-/g, '_') }}. On cPanel create it first and give the site's database user all privileges.</span></span>
              <input v-model="enrolForm.db_name" :class="INPUT" placeholder="optional">
            </label>
            <div class="sm:col-span-2 rounded-xl bg-gray-50 dark:bg-gray-800/60 p-3 space-y-2">
              <label class="flex items-center gap-2 text-sm font-semibold"><input v-model="enrolForm.copy_content" type="checkbox" class="rounded"> Copy the shared content now</label>
              <p class="text-xs text-gray-500">The master school's published curriculum, eNotes, books, Item Bank and videos, and the classes S.1-S.6. Can also be done later.</p>
              <label v-if="enrolForm.copy_content" class="block"><span :class="LABEL">Streams in every class</span><input v-model="enrolForm.streams" :class="INPUT" placeholder="A, B, C"></label>
            </div>
            <p v-if="enrolError" class="sm:col-span-2 text-sm text-rose-600 whitespace-pre-line">{{ enrolError }}</p>
            <div class="sm:col-span-2"><button type="submit" :disabled="busy" class="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold disabled:opacity-50">{{ busy ? 'Setting up the database...' : 'Enrol' }}</button></div>
          </form>

          <div class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-x-auto">
            <table class="w-full text-sm">
              <thead><tr class="text-left text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800">
                <th class="px-4 py-2.5 font-semibold">School</th><th class="px-3 py-2.5 font-semibold">Logins end in</th><th class="px-3 py-2.5 font-semibold text-right">Learners</th><th class="px-3 py-2.5 font-semibold text-right">Teachers</th><th class="px-3 py-2.5 font-semibold">Content</th><th class="px-3 py-2.5 font-semibold">Last login</th><th class="px-3 py-2.5 font-semibold">Status</th><th class="px-4 py-2.5"></th>
              </tr></thead>
              <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
                <tr v-for="s in schools" :key="s.id">
                  <td class="px-4 py-3">
                    <p class="font-semibold">{{ s.name }} <span v-if="Number(s.is_master)" class="ml-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">MASTER CONTENT</span></p>
                    <p class="text-xs text-gray-500">{{ s.kind === 'independent' ? 'Independent learners' : 'School' }} · {{ s.database }}<span v-if="!s.reachable" class="text-rose-600"> · database not reachable</span></p>
                  </td>
                  <td class="px-3 py-3 font-mono text-xs">{{ s.code === homeCode ? '(as now)' : '@' + s.code }}</td>
                  <td class="px-3 py-3 text-right tabular-nums">{{ s.students ?? '-' }}</td>
                  <td class="px-3 py-3 text-right tabular-nums">{{ s.teachers ?? '-' }}</td>
                  <td class="px-3 py-3 text-xs text-gray-600 dark:text-gray-300">
                    <template v-if="Number(s.is_master)">The master</template>
                    <template v-else-if="s.content && Object.keys(s.content).length">{{ contentSummary(s.content) }}</template>
                    <span v-else class="text-amber-700 dark:text-amber-300">None yet</span>
                  </td>
                  <td class="px-3 py-3 text-xs text-gray-500">{{ s.last_login ? when(s.last_login) : 'never' }}</td>
                  <td class="px-3 py-3"><span class="px-2 py-0.5 rounded-full text-[11px] font-semibold" :class="s.status === 'active' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200' : 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200'">{{ s.status === 'active' ? 'Active' : 'Paused' }}</span></td>
                  <td class="px-4 py-3 text-right">
                    <div v-if="s.code !== homeCode && !Number(s.is_master)" class="flex justify-end gap-3 whitespace-nowrap">
                      <button type="button" :disabled="busy || !s.reachable" class="text-sm font-semibold text-indigo-700 dark:text-indigo-300 hover:underline disabled:opacity-50" @click="copyContent(s)">{{ copyingId === s.id ? 'Copying...' : 'Copy content' }}</button>
                      <button type="button" :disabled="busy" class="text-sm font-semibold hover:underline" :class="s.status === 'active' ? 'text-amber-700 dark:text-amber-300' : 'text-emerald-700 dark:text-emerald-300'" @click="toggleSchool(s)">{{ s.status === 'active' ? 'Pause' : 'Resume' }}</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400">Copy content brings the master school's published curriculum, eNotes, books, Item Bank and videos - copying again only adds what is new, or fills a new stream. Pausing signs everyone at the school out and stops new logins; nothing is deleted.</p>
        </template>

        <!-- Independent learners -->
        <template v-if="tab === 'learners'">
          <h2 class="text-lg font-bold">Independent learners <span class="text-gray-400 font-normal">requests from tusome.ug/join</span></h2>
          <p v-if="!spaces.length" class="rounded-xl bg-amber-50 dark:bg-amber-900/20 p-3 text-sm text-amber-900 dark:text-amber-100">Enrol an "Independent learners" space first (Schools → Enrol a school → Kind: Independent learners) - activated learners get their logins there.</p>
          <p v-if="!requests.length" class="text-sm text-gray-500">No requests yet.</p>
          <ul class="space-y-3">
            <li v-for="r in requests" :key="r.id" class="rounded-2xl border bg-white dark:bg-gray-900 p-4" :class="r.status === 'new' ? 'border-indigo-300 dark:border-indigo-700' : 'border-gray-200 dark:border-gray-800'">
              <div class="flex flex-col sm:flex-row sm:items-start gap-3">
                <div class="min-w-0 flex-1">
                  <p class="font-semibold">{{ r.first_name }} {{ r.last_name }} <span class="ml-1 text-xs font-normal text-gray-500">{{ r.level }}<template v-if="r.gender"> · {{ r.gender }}</template></span>
                    <span class="ml-2 px-2 py-0.5 rounded-full text-[11px] font-semibold" :class="REQ_STATUS[r.status].chip">{{ REQ_STATUS[r.status].label }}</span></p>
                  <p class="mt-1 flex flex-wrap gap-x-4 text-sm">
                    <a v-if="r.phone" :href="`tel:${r.phone}`" class="text-indigo-600 dark:text-indigo-300 hover:underline">{{ r.phone }}</a>
                    <a v-if="r.email" :href="`mailto:${r.email}`" class="text-indigo-600 dark:text-indigo-300 hover:underline">{{ r.email }}</a>
                  </p>
                  <p v-if="r.message" class="mt-1 text-sm text-gray-600 dark:text-gray-300">{{ r.message }}</p>
                  <p v-if="r.status === 'activated'" class="mt-1 text-sm">Login: <b class="font-mono">{{ r.username }}</b> <span class="text-xs text-gray-500">· {{ when(r.activated_at) }}</span></p>
                  <p class="mt-1 text-[11px] text-gray-400">Asked {{ when(r.created_at) }}</p>
                  <input v-if="r.status !== 'activated'" v-model="notes[r.id]" placeholder="Note (e.g. paid via mobile money, ref ...)" class="mt-2 w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                </div>
                <div v-if="r.status !== 'activated'" class="flex sm:flex-col gap-1.5 flex-shrink-0 sm:w-48">
                  <select v-if="spaces.length" v-model="spaceFor[r.id]" class="px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800" aria-label="Independent space">
                    <option v-for="sp in spaces" :key="sp.code" :value="sp.code">{{ sp.name }} (@{{ sp.code }})</option>
                  </select>
                  <button type="button" :disabled="busy || !spaces.length" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white disabled:opacity-50" @click="activate(r)">Paid - activate</button>
                  <button v-if="r.status !== 'contacted'" type="button" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-300 dark:border-gray-700" @click="setRequest(r, 'contacted')">Mark contacted</button>
                  <button v-if="r.status !== 'declined'" type="button" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-500" @click="setRequest(r, 'declined')">Decline</button>
                </div>
              </div>
            </li>
          </ul>
        </template>

        <!-- Database updates: every school's own database gets each new migration -->
        <template v-if="tab === 'updates'">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 class="text-lg font-bold">Database updates</h2>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ updates?.files ?? 0 }} update files, the latest {{ updates?.latest }}. Every school has its own database, so each update has to reach all of them.</p>
            </div>
            <button type="button" :disabled="busy || !pendingTotal" class="px-3 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50" @click="runUpdates(null)">
              {{ running === 'all' ? 'Updating...' : pendingTotal ? `Update every school (${pendingTotal})` : 'Every school is up to date' }}
            </button>
          </div>

          <div v-if="updateResults" class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 text-sm space-y-1">
            <p class="font-semibold">Last run</p>
            <p v-if="!updateResults.length" class="text-gray-500">Nothing needed running.</p>
            <p v-for="res in updateResults" :key="res.code">
              <b>{{ res.name }}</b>:
              <span v-if="res.skipped" class="text-amber-700 dark:text-amber-300">skipped - {{ res.skipped }}</span>
              <template v-else>
                {{ res.applied.length }} applied
                <span v-if="res.failed" class="text-rose-600"> · stopped at {{ res.failed.file }}: {{ res.failed.message }}</span>
              </template>
            </p>
          </div>

          <ul class="space-y-3">
            <li v-for="s in updates?.schools ?? []" :key="s.id" class="rounded-2xl border bg-white dark:bg-gray-900 p-4" :class="Object.keys(s.failed).length ? 'border-rose-300 dark:border-rose-800' : 'border-gray-200 dark:border-gray-800'">
              <div class="flex flex-wrap items-start gap-3">
                <div class="min-w-0 flex-1">
                  <p class="font-semibold">{{ s.name }} <span class="text-xs font-normal text-gray-500">{{ s.is_home ? '(home database)' : '@' + s.code }}</span></p>
                  <p v-if="s.unrecorded" class="mt-1 text-sm text-amber-800 dark:text-amber-200">The portal doesn't know yet which updates this database already has. If it is up to date (you have been running updates by hand), mark them as already run - nothing is changed in the database.</p>
                  <p v-else-if="!s.pending.length" class="mt-1 text-sm text-emerald-700 dark:text-emerald-300">Up to date</p>
                  <template v-else>
                    <p class="mt-1 text-sm">{{ s.pending.length }} to run:</p>
                    <ul class="mt-1 text-xs font-mono text-gray-600 dark:text-gray-300 max-h-32 overflow-y-auto">
                      <li v-for="f in s.pending" :key="f">{{ f }}<span v-if="s.failed[f]" class="font-sans text-rose-600"> - failed: {{ s.failed[f] }}</span></li>
                    </ul>
                  </template>
                </div>
                <div class="flex flex-col gap-1.5 flex-shrink-0">
                  <button v-if="!s.unrecorded && s.pending.length" type="button" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white disabled:opacity-50" @click="runUpdates(s)">{{ running === s.id ? 'Updating...' : 'Run on this school' }}</button>
                  <button v-if="s.pending.length" type="button" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-300 dark:border-gray-700" @click="markRun(s)">Mark all as already run</button>
                </div>
              </div>
            </li>
          </ul>
          <p class="text-xs text-gray-500 dark:text-gray-400">Updates run school by school, in order. A school stops at its first error, which is shown here and tried again next time - fix the file, then run again. A newly enrolled school starts with the same updates as St Mark's.</p>
        </template>

        <!-- Activity -->
        <template v-if="tab === 'activity'">
          <h2 class="text-lg font-bold">Activity</h2>
          <ul class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
            <li v-for="e in audit" :key="e.id" class="px-4 py-2.5 text-sm flex flex-wrap gap-x-3">
              <span class="font-semibold">{{ e.action.replace(/_/g, ' ') }}</span><span v-if="e.target" class="font-mono text-xs self-center">{{ e.target }}</span>
              <span class="text-gray-600 dark:text-gray-300">{{ e.details }}</span>
              <span class="ml-auto text-xs text-gray-400">{{ e.admin_name }} · {{ when(e.created_at) }}</span>
            </li>
          </ul>
        </template>
      </main>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'

interface School { id: number; code: string; name: string; kind: string; status: string; is_master: number | string; database: string; students: number | null; teachers: number | null; last_login: string | null; reachable: boolean; content: Record<string, number> | null }
type ReqStatus = 'new' | 'contacted' | 'activated' | 'declined'
interface LearnerRequest { id: number; first_name: string; last_name: string; email: string | null; phone: string | null; level: string; gender: string | null; message: string | null; status: ReqStatus; note: string | null; username: string | null; activated_at: string | null; created_at: string }

const API = '/api/devportal'
const LABEL = 'block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1'
const INPUT = 'w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500'
const TABS = [{ key: 'schools', label: 'Schools' }, { key: 'learners', label: 'Independent learners' }, { key: 'updates', label: 'Updates' }, { key: 'activity', label: 'Activity' }] as const
const KINDS = [{ value: 'school', label: 'A school' }, { value: 'independent', label: 'Independent learners' }]
const REQ_STATUS: Record<ReqStatus, { label: string; chip: string }> = {
  new: { label: 'New', chip: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200' },
  contacted: { label: 'Contacted', chip: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200' },
  activated: { label: 'Activated', chip: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200' },
  declined: { label: 'Declined', chip: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300' }
}

const admin = ref<{ id: number; name: string; email: string } | null>(null)
const creds = ref({ email: '', password: '' })
const loginError = ref('')
const busy = ref(false)
const tab = ref<'schools' | 'learners' | 'updates' | 'activity'>('schools')
const schools = ref<School[]>([])
const homeCode = ref('stmark')
const requests = ref<LearnerRequest[]>([])
const spaces = ref<{ code: string; name: string }[]>([])
const audit = ref<any[]>([])
const notes = ref<Record<number, string>>({})
const spaceFor = ref<Record<number, string>>({})
const shown = ref<{ title: string; login: string; password: string; note: string; howTo?: string } | null>(null)
const copied = ref(false)
const enrolOpen = ref(false)
const enrolError = ref('')
const blankEnrol = () => ({ name: '', code: '', kind: 'school', admin_username: 'admin', admin_email: '', contact_name: '', contact_phone: '', db_name: '', copy_content: true, streams: 'A' })
const enrolForm = ref(blankEnrol())

// What a school has from the master, in a few words
const CONTENT_LABELS: Record<string, [string, string]> = { enote_curriculum_topics: ['topic', 'topics'], enote_topics: ['eNote', 'eNotes'], library_books: ['book', 'books'], item_bank_questions: ['paper', 'papers'], videos: ['video', 'videos'] }
const contentSummary = (c: Record<string, number>) => Object.entries(CONTENT_LABELS).filter(([k]) => c[k]).map(([k, [one, many]]) => `${c[k]} ${c[k] === 1 ? one : many}`).join(' · ')
const copyingId = ref<number | null>(null)
const plain = (added: Record<string, number>) => Object.keys(added).length ? Object.entries(added).map(([k, n]) => `${n} ${k}`).join(', ') : 'nothing new - it already has everything'

const newRequests = computed(() => requests.value.filter(r => r.status === 'new').length)
const when = (v: string | null) => (v ? new Date(v.replace(' ', 'T')).toLocaleString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' }) : '')
const message = (err: any, fallback: string) => {
  const e = err.response?.data?.errors
  return e ? Object.entries(e).map(([k, v]) => `${k}: ${v}`).join('\n') : (err.response?.data?.message || fallback)
}

const loadSchools = async () => {
  const res = await axios.get(`${API}/schools`)
  schools.value = res.data.data.schools
  homeCode.value = res.data.data.home_code
}
const loadRequests = async () => {
  const res = await axios.get(`${API}/learner-requests`)
  requests.value = res.data.data.requests
  spaces.value = res.data.data.spaces
  for (const r of requests.value) {
    notes.value[r.id] ??= r.note ?? ''
    spaceFor.value[r.id] ??= spaces.value[0]?.code ?? ''
  }
}
const loadAudit = async () => {
  audit.value = (await axios.get(`${API}/audit`)).data.data.entries
}
const loadAll = () => Promise.all([loadSchools(), loadRequests()]).catch(() => {})
watch(tab, t => {
  if (t === 'activity') loadAudit().catch(() => {})
  if (t === 'updates') loadUpdates().catch(() => {})
})

// ---- Database updates ----
interface SchoolUpdates { id: number; code: string; name: string; status: string; is_home: boolean; unrecorded: boolean; pending: string[]; failed: Record<string, string> }
interface UpdateResult { code: string; name: string; applied: string[]; failed: { file: string; message: string } | null; skipped?: string }
const updates = ref<{ files: number; latest: string | null; schools: SchoolUpdates[] } | null>(null)
const updateResults = ref<UpdateResult[] | null>(null)
const running = ref<number | 'all' | null>(null)
const pendingTotal = computed(() => (updates.value?.schools ?? []).filter(s => !s.unrecorded).reduce((n, s) => n + s.pending.length, 0))
const loadUpdates = async () => {
  updates.value = (await axios.get(`${API}/updates`)).data.data
}
const runUpdates = async (s: SchoolUpdates | null) => {
  const what = s ? `${s.pending.length} update(s) on ${s.name}` : 'the pending updates on every school'
  if (!window.confirm(`Run ${what}? Take a backup first if a school has important data.`)) return
  busy.value = true
  running.value = s ? s.id : 'all'
  try {
    updateResults.value = (await axios.post(`${API}/updates/run`, s ? { school_id: s.id } : {})).data.data.results
    await loadUpdates()
  } catch (err: any) {
    window.alert(message(err, 'Running the updates failed'))
  } finally {
    busy.value = false
    running.value = null
  }
}
const markRun = async (s: SchoolUpdates) => {
  if (!window.confirm(`Mark all ${s.pending.length} update(s) as already in ${s.name}'s database? Nothing is run - only do this if they really are there already.`)) return
  busy.value = true
  try {
    await axios.post(`${API}/updates/baseline`, { school_id: s.id, files: s.pending })
    await loadUpdates()
  } finally {
    busy.value = false
  }
}

// Search engines must never list the portal (the server also sends X-Robots-Tag, see .htaccess)
let robots: HTMLMetaElement | null = null
onMounted(() => {
  robots = document.createElement('meta')
  robots.name = 'robots'
  robots.content = 'noindex, nofollow, noarchive'
  document.head.appendChild(robots)
  document.title = 'Developer portal - Tusome'
})
onBeforeUnmount(() => robots?.remove())

onMounted(async () => {
  try {
    admin.value = (await axios.get(`${API}/me`)).data.data.admin
    await loadAll()
  } catch { /* not signed in */ }
})

const login = async () => {
  busy.value = true
  loginError.value = ''
  try {
    admin.value = (await axios.post(`${API}/login`, creds.value)).data.data.admin
    creds.value.password = ''
    await loadAll()
  } catch (err: any) {
    loginError.value = err.response?.data?.message || 'Could not sign in'
  } finally {
    busy.value = false
  }
}
const logout = async () => {
  await axios.post(`${API}/logout`).catch(() => {})
  admin.value = null
}

const enrol = async () => {
  busy.value = true
  enrolError.value = ''
  try {
    const res = await axios.post(`${API}/schools`, enrolForm.value)
    const d = res.data.data
    const copiedNote = d.content ? ` Copied: ${plain(d.content)}.` : (d.content_error ? ` ${d.content_error}` : ' No content copied yet - use Copy content.')
    shown.value = { title: `${enrolForm.value.name} is ready`, login: d.admin.login, password: d.admin.password, note: 'Give these to the school\'s administrator - they log in at tusome.ug/login and can change the password.' + copiedNote }
    copied.value = false
    enrolForm.value = blankEnrol()
    enrolOpen.value = false
    await loadAll()
  } catch (err: any) {
    enrolError.value = message(err, 'Enrolling failed')
  } finally {
    busy.value = false
  }
}

const copyContent = async (s: School) => {
  const streams = window.prompt(`Copy the shared content into ${s.name}.\n\nThe streams in every class (S.1-S.6), separated by commas:`, 'A')
  if (streams === null) return
  busy.value = true
  copyingId.value = s.id
  try {
    const res = await axios.post(`${API}/schools/${s.id}/content`, { streams })
    window.alert(`${s.name}: ${plain(res.data.data.added)}`)
    await loadSchools()
  } catch (err: any) {
    window.alert(message(err, 'Copying failed'))
  } finally {
    busy.value = false
    copyingId.value = null
  }
}

const toggleSchool = async (s: School) => {
  const status = s.status === 'active' ? 'suspended' : 'active'
  if (status === 'suspended' && !window.confirm(`Pause ${s.name}? Everyone there is signed out and can't log in until you resume it.`)) return
  busy.value = true
  try {
    await axios.put(`${API}/schools/${s.id}`, { status })
    await loadSchools()
  } finally {
    busy.value = false
  }
}

const setRequest = async (r: LearnerRequest, status: ReqStatus) => {
  busy.value = true
  try {
    await axios.put(`${API}/learner-requests/${r.id}`, { status, note: notes.value[r.id] })
    await loadRequests()
  } finally {
    busy.value = false
  }
}

const activate = async (r: LearnerRequest) => {
  busy.value = true
  try {
    const d = (await axios.post(`${API}/learner-requests/${r.id}/activate`, { school_code: spaceFor.value[r.id] })).data.data
    shown.value = {
      title: `${r.first_name} ${r.last_name} can now log in`,
      // the default space: just the username works at login (St Mark's is tried, then this space)
      login: d.is_default_space ? d.username : d.login,
      password: d.password,
      howTo: 'Log in at tusome.ug/login.',
      note: 'Send these to the learner - they log in at tusome.ug/login.'
        + (d.class_found ? '' : ` Their space has no ${r.level} class yet - use Copy content on it first.`)
    }
    copied.value = false
    await loadRequests()
  } catch (err: any) {
    window.alert(message(err, 'Activating failed'))
  } finally {
    busy.value = false
  }
}

const copyShown = async () => {
  if (!shown.value) return
  try {
    await navigator.clipboard.writeText(`Username: ${shown.value.login}\nPassword: ${shown.value.password}\n${shown.value.howTo ?? 'Log in at tusome.ug/login'}`)
    copied.value = true
  } catch { /* the text stays on screen to copy by hand */ }
}
</script>
