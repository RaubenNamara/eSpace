<template>
  <!-- Cases (teachers and HODs): record a learner's discipline case - find the learner, say what
       happened and what was done, attach evidence such as a photo or PDF of an apology - and see the
       cases you have reported. Teachers, HODs and the super admin record cases; HODs and admins see
       them all (CaseController). The super admin's are marked as theirs. -->
  <div class="w-full max-w-5xl">
    <PageHeader title="Cases" :description="headerText" icon="document" accent="indigo" />

    <!-- Record a case -->
    <section class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
      <h2 class="dash-bar">Record a case</h2>
      <form class="p-4 sm:p-5 grid sm:grid-cols-2 gap-4" novalidate @submit.prevent="submit">
        <!-- the learner -->
        <div class="sm:col-span-2">
          <label class="lbl" for="case-learner">Learner *</label>
          <div v-if="learner" class="flex items-center gap-3 rounded-xl border border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-2">
            <span class="w-9 h-9 rounded-full bg-indigo-600 text-white text-xs font-semibold flex items-center justify-center flex-shrink-0">{{ initials(learner.name) }}</span>
            <span class="flex-1 min-w-0">
              <span class="block text-sm font-semibold text-gray-900 dark:text-white truncate">{{ learner.name }}</span>
              <span class="block text-xs text-gray-600 dark:text-gray-300">{{ learner.admission_number }}<template v-if="learner.class_label"> &middot; {{ learner.class_label }}</template></span>
            </span>
            <button type="button" class="text-xs font-semibold text-indigo-700 dark:text-indigo-300 hover:underline" @click="learner = null; q = ''">Change</button>
          </div>
          <div v-else class="relative">
            <input id="case-learner" v-model="q" type="search" autocomplete="off" placeholder="Type a name or admission number…" class="inp" :class="errors.student_id ? 'border-rose-400' : ''">
            <ul v-if="results.length" class="absolute z-20 mt-1 w-full max-h-72 overflow-y-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
              <li v-for="r in results" :key="r.id">
                <button type="button" class="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-indigo-50 dark:hover:bg-indigo-900/30" @click="pick(r)">
                  <span class="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 text-[11px] font-semibold flex items-center justify-center flex-shrink-0">{{ initials(r.name) }}</span>
                  <span class="min-w-0">
                    <span class="block text-sm font-medium text-gray-900 dark:text-white truncate">{{ r.name }}</span>
                    <span class="block text-xs text-gray-500 dark:text-gray-400">{{ r.admission_number }}<template v-if="r.class_label"> &middot; {{ r.class_label }}</template></span>
                  </span>
                </button>
              </li>
            </ul>
            <p v-else-if="q.trim().length >= 2 && !searching" class="mt-1 text-xs text-gray-500">No learner matches "{{ q }}".</p>
          </div>
          <p v-if="errors.student_id" class="err">{{ errors.student_id }}</p>
        </div>

        <div>
          <label class="lbl" for="case-date">Date it happened *</label>
          <input id="case-date" v-model="form.occurred_on" type="date" :max="today" class="inp" :class="errors.occurred_on ? 'border-rose-400' : ''">
          <p v-if="errors.occurred_on" class="err">{{ errors.occurred_on }}</p>
        </div>
        <div>
          <label class="lbl" for="case-type">Kind of case *</label>
          <select id="case-type" v-model="form.category" class="inp" :class="errors.category ? 'border-rose-400' : ''">
            <option value="" disabled>Choose…</option>
            <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
          </select>
          <p v-if="errors.category" class="err">{{ errors.category }}</p>
        </div>

        <div class="sm:col-span-2">
          <span class="lbl">How serious *</span>
          <div class="inline-flex rounded-xl border border-gray-300 dark:border-gray-600 p-1 gap-1" role="radiogroup" aria-label="How serious">
            <button v-for="s in SEVERITY" :key="s.key" type="button" role="radio" :aria-checked="form.severity === s.key" class="px-3.5 py-1.5 rounded-lg text-sm font-medium transition" :class="form.severity === s.key ? s.on : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'" @click="form.severity = s.key">{{ s.label }}</button>
          </div>
        </div>

        <div class="sm:col-span-2">
          <label class="lbl" for="case-title">Title *</label>
          <input id="case-title" v-model="form.title" type="text" maxlength="150" placeholder="e.g. Fighting during break" class="inp" :class="errors.title ? 'border-rose-400' : ''">
          <p v-if="errors.title" class="err">{{ errors.title }}</p>
        </div>
        <div class="sm:col-span-2">
          <label class="lbl" for="case-what">What happened *</label>
          <textarea id="case-what" v-model="form.description" rows="4" maxlength="5000" placeholder="Where, when, who was involved, what was said or done…" class="inp" :class="errors.description ? 'border-rose-400' : ''"></textarea>
          <p v-if="errors.description" class="err">{{ errors.description }}</p>
        </div>
        <div class="sm:col-span-2">
          <label class="lbl" for="case-action">Action taken <span class="font-normal text-gray-400">(optional)</span></label>
          <textarea id="case-action" v-model="form.action_taken" rows="2" maxlength="3000" placeholder="e.g. Talked to the learner, wrote an apology, parent called…" class="inp"></textarea>
        </div>

        <!-- evidence -->
        <div class="sm:col-span-2">
          <span class="lbl">Evidence <span class="font-normal text-gray-400">(optional - photos or PDFs, such as a written apology; up to 5, 8 MB each)</span></span>
          <label class="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 px-4 py-4 text-sm text-gray-600 dark:text-gray-300 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20">
            <AppIcon name="paperclip" class="w-5 h-5" />
            <span>Attach a photo or PDF</span>
            <input type="file" multiple accept="image/jpeg,image/png,image/webp,application/pdf" class="sr-only" @change="addFiles">
          </label>
          <ul v-if="files.length" class="mt-2 flex flex-wrap gap-2">
            <li v-for="(f, i) in files" :key="i" class="inline-flex items-center gap-2 rounded-lg bg-gray-100 dark:bg-gray-700 px-2.5 py-1 text-xs text-gray-700 dark:text-gray-200">
              <span class="truncate max-w-[12rem]">{{ f.name }}</span>
              <button type="button" class="text-gray-500 hover:text-rose-600" :aria-label="`Remove ${f.name}`" @click="files.splice(i, 1)">&times;</button>
            </li>
          </ul>
          <p v-if="errors.files" class="err">{{ errors.files }}</p>
        </div>

        <div class="sm:col-span-2 flex flex-wrap items-center gap-3">
          <button type="submit" class="btn-primary" :disabled="saving">{{ saving ? 'Saving…' : 'Submit case' }}</button>
          <p class="text-xs text-gray-500 dark:text-gray-400">HODs and the administration see every case, for the discipline committee. Learners and parents never see them.</p>
        </div>
      </form>
    </section>

    <!-- Your cases -->
    <section class="mt-6">
      <h2 class="text-base font-semibold text-gray-900 dark:text-white mb-2">Cases you reported <span class="text-gray-400 font-normal">({{ cases.length }})</span></h2>
      <div v-if="loading" class="space-y-2"><div v-for="i in 3" :key="i" class="h-20 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 animate-pulse"></div></div>
      <p v-else-if="!cases.length" class="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-8 text-center text-sm text-gray-500">No cases yet. The ones you record appear here.</p>
      <ul v-else class="space-y-3">
        <li v-for="c in cases" :key="c.id" class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
          <div class="flex flex-wrap items-center gap-2">
            <span class="font-semibold text-gray-900 dark:text-white">{{ c.student?.name }}</span>
            <span class="text-xs text-gray-500 dark:text-gray-400">{{ c.student?.admission_number }}<template v-if="c.student?.class_label"> &middot; {{ c.student.class_label }}</template></span>
            <span class="flex-1"></span>
            <span class="chip" :class="sev(c.severity).chip">{{ sev(c.severity).label }}</span>
            <span class="chip" :class="c.status === 'resolved' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'">{{ c.status === 'resolved' ? 'Resolved' : 'Open' }}</span>
          </div>
          <p class="mt-1 text-sm font-medium text-gray-800 dark:text-gray-100">{{ c.title }} <span class="font-normal text-gray-500">&middot; {{ c.category }} &middot; {{ day(c.occurred_on) }}</span></p>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">{{ c.description }}</p>
          <p v-if="c.action_taken" class="mt-1 text-sm text-gray-600 dark:text-gray-300"><b>Action taken:</b> {{ c.action_taken }}</p>
          <p v-if="c.admin_note" class="mt-2 rounded-lg bg-gold-50 dark:bg-gold-400/10 px-3 py-2 text-sm text-gray-700 dark:text-gray-200"><b>Note from the administration:</b> {{ c.admin_note }}</p>
          <div v-if="c.files.length" class="mt-2 flex flex-wrap gap-2"><CaseFile v-for="f in c.files" :key="f.id" :file="f" /></div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import CaseFile from '@/components/cases/CaseFile.vue'
import { useToastStore } from '@/stores/toast'

interface Learner { id: number; name: string; admission_number: string; class_label: string | null }
interface CaseItem {
  id: number; occurred_on: string; category: string; severity: 'minor' | 'serious' | 'major'; title: string; description: string
  action_taken: string | null; status: 'open' | 'resolved'; admin_note: string | null; student?: Learner
  files: { id: number; name: string; mime: string; size: number }[]
}

const SEVERITY = [
  { key: 'minor', label: 'Minor', on: 'bg-indigo-600 text-white', chip: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200' },
  { key: 'serious', label: 'Serious', on: 'bg-amber-500 text-white', chip: 'bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200' },
  { key: 'major', label: 'Major', on: 'bg-rose-600 text-white', chip: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200' }
] as const
const sev = (k: string) => SEVERITY.find(s => s.key === k) || SEVERITY[0]

const route = useRoute()
const isAdmin = route.path.startsWith('/admin')
const headerText = isAdmin
  ? "Record a learner's discipline case, with evidence. It is marked as added by the super admin."
  : "Record a learner's discipline case, with evidence. HODs and the administration see the cases you report."
const base = isAdmin ? '/api/admin/cases' : route.path.startsWith('/hod') ? '/api/hod/cases' : '/api/teacher/cases'
const toast = useToastStore()
const today = new Date().toISOString().slice(0, 10)

const cases = ref<CaseItem[]>([])
const categories = ref<string[]>([])
const loading = ref(true)
const q = ref('')
const results = ref<Learner[]>([])
const searching = ref(false)
const learner = ref<Learner | null>(null)
const files = ref<File[]>([])
const saving = ref(false)
const errors = ref<Record<string, string>>({})
const blank = () => ({ occurred_on: today, category: '', severity: 'minor' as string, title: '', description: '', action_taken: '' })
const form = ref(blank())

const initials = (n: string) => n.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase()
const day = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

let timer: ReturnType<typeof setTimeout> | undefined
watch(q, v => {
  clearTimeout(timer)
  if (v.trim().length < 2) { results.value = []; return }
  timer = setTimeout(async () => {
    searching.value = true
    try {
      const res = await axios.get(`${base}/students`, { params: { q: v.trim() } })
      results.value = res.data.data.students
    } catch { results.value = [] } finally { searching.value = false }
  }, 250)
})
const pick = (r: Learner) => { learner.value = r; results.value = []; errors.value.student_id = '' }

const addFiles = (e: Event) => {
  const input = e.target as HTMLInputElement
  for (const f of Array.from(input.files || [])) {
    if (files.value.length >= 5) { toast.error('Attach at most 5 files'); break }
    if (f.size > 8 * 1024 * 1024) { toast.error(`${f.name} is bigger than 8 MB`); continue }
    files.value.push(f)
  }
  input.value = ''
}

const load = async () => {
  loading.value = true
  try {
    const res = await axios.get(base)
    cases.value = res.data.data.cases
    categories.value = res.data.data.categories
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not load your cases')
  } finally {
    loading.value = false
  }
}

const submit = async () => {
  errors.value = {}
  const f = form.value
  if (!learner.value) errors.value.student_id = 'Find and choose the learner'
  if (!f.category) errors.value.category = 'Choose what kind of case it is'
  if (!f.title.trim()) errors.value.title = 'Give the case a short title'
  if (f.description.trim().length < 10) errors.value.description = 'Say what happened (a sentence or two at least)'
  if (Object.keys(errors.value).length) return
  const data = new FormData()
  data.append('student_id', String(learner.value!.id))
  for (const [k, v] of Object.entries(f)) data.append(k, v)
  files.value.forEach(file => data.append('files[]', file))
  saving.value = true
  try {
    await axios.post(base, data)
    toast.success(`Case recorded for ${learner.value!.name}`)
    form.value = blank()
    learner.value = null
    q.value = ''
    files.value = []
    await load()
  } catch (err: any) {
    const e = err.response?.data?.errors
    if (e) errors.value = e
    else toast.error(err.response?.data?.message || 'The case could not be saved')
  } finally {
    saving.value = false
  }
}

onMounted(load)
</script>

<style scoped>
.lbl { @apply block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1; }
.inp { @apply w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500; }
.err { @apply mt-1 text-xs text-rose-600; }
.chip { @apply px-2 py-0.5 rounded-full text-[11px] font-semibold; }
</style>
