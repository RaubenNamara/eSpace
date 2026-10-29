<template>
  <!-- ICT Lab class results (teacher and HOD): every learner in a class stream against every
       practical - best score, or parts done - and the practicals set for the class, with who has
       done each. A teacher sets a practical for their classes from here, like an assessment. -->
  <div>
    <PageHeader
      title="ICT Lab results"
      description="How far each learner has got with every practical, and the practicals set for the class."
      icon="keyboard"
      accent="indigo"
    >
      <template #actions>
        <RouterLink :to="`/${role}/ict-lab`" class="btn-secondary">ICT Lab</RouterLink>
        <button v-if="data?.can_set && data.classes.length" type="button" class="btn-primary" @click="openSet">Set a practical</button>
      </template>
      <template #filters>
        <select v-model.number="classId" aria-label="Class" class="w-full sm:w-56 py-2 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white">
          <option v-for="c in data?.classes || []" :key="c.id" :value="c.id">{{ c.name }} · {{ c.learners }} learners</option>
        </select>
      </template>
    </PageHeader>

    <div v-if="loading && !data" class="space-y-3">
      <div v-for="i in 3" :key="i" class="h-20 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
    </div>

    <EmptyState
      v-else-if="data && !data.classes.length"
      title="No classes yet"
      message="Once learners are enrolled in your department's classes, their ICT Lab results show here."
    />

    <template v-else-if="data">
      <!-- Practicals set for this class -->
      <section class="mb-6">
        <h2 class="mb-2 text-sm font-bold text-gray-900 dark:text-white">Set for {{ className }}</h2>
        <p v-if="!data.tasks.length" class="rounded-2xl border border-dashed border-gray-300 dark:border-gray-600 p-4 text-sm text-gray-500 dark:text-gray-400">
          Nothing set yet.<template v-if="data.can_set"> Choose <b>Set a practical</b> to give this class one to do - each learner is told, and it shows at the top of their ICT Lab.</template>
        </p>
        <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-2.5">
          <article v-for="t in data.tasks" :key="t.id" class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3.5">
            <div class="flex items-start gap-2">
              <div class="min-w-0 flex-1">
                <p class="font-bold text-gray-900 dark:text-white leading-snug">{{ t.title }}<span v-if="t.has_levels" class="font-semibold text-gray-500 dark:text-gray-400"> · {{ levelLabel(t.level) }}</span></p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {{ t.due_at ? `Due ${niceDate(t.due_at)}` : 'No due date' }} · set {{ niceDate(t.created_at) }}<template v-if="!t.mine && t.teacher_name"> by {{ t.teacher_name }}</template>
                </p>
                <p v-if="t.note" class="text-xs text-gray-600 dark:text-gray-300 mt-0.5">"{{ t.note }}"</p>
              </div>
              <button v-if="t.mine" type="button" class="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30" aria-label="Remove this practical" title="Remove" @click="removeTask(t)">
                <AppIcon name="trash" class="w-4 h-4" />
              </button>
            </div>
            <div class="mt-2.5 h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
              <div class="h-full bg-emerald-500" :style="{ width: `${t.total ? (t.done * 100) / t.total : 0}%` }"></div>
            </div>
            <div class="mt-1.5 flex flex-wrap items-center gap-x-3 text-[11px] text-gray-600 dark:text-gray-300">
              <span><b class="tabular-nums">{{ t.done }}</b> of {{ t.total }} done</span>
              <span v-if="averageOf(t) !== null">average {{ averageOf(t) }}%</span>
              <button v-if="t.done < t.total" type="button" class="font-semibold text-indigo-600 dark:text-indigo-300 hover:underline" @click="openTask = openTask === t.id ? 0 : t.id">
                {{ openTask === t.id ? 'Hide' : `${t.total - t.done} not done yet` }}
              </button>
            </div>
            <ul v-if="openTask === t.id" class="mt-2 max-h-60 overflow-y-auto rounded-lg bg-gray-50 dark:bg-gray-900/40 divide-y divide-gray-200 dark:divide-gray-700">
              <li v-for="l in notDone(t)" :key="l.id" class="px-3 py-1.5 flex items-center gap-2 text-xs">
                <span class="flex-1 min-w-0 truncate text-gray-900 dark:text-white">{{ niceName(l.name) }}</span>
                <span v-if="t.by_student[l.id]?.parts" class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200">Started</span>
                <span class="text-gray-500 dark:text-gray-400">{{ l.admission_number }}</span>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <!-- Every learner against every practical -->
      <section>
        <div class="mb-2 flex flex-wrap items-center gap-3">
          <h2 class="text-sm font-bold text-gray-900 dark:text-white">Every practical</h2>
          <input v-model="search" type="search" placeholder="Find a learner" class="ml-auto w-full sm:w-56 py-1.5 px-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white">
        </div>
        <p class="mb-2 text-xs text-gray-500 dark:text-gray-400">
          Best score at any level. A practical in parts shows the parts done until all are, then the average.
          <span class="inline-flex items-center gap-1 ml-1"><span class="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span>80% or more</span>
          <span class="inline-flex items-center gap-1 ml-1"><span class="w-2.5 h-2.5 rounded-sm bg-amber-400"></span>below 80% or not finished</span>
        </p>
        <div class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700 text-left">
                <th class="sticky left-0 z-10 bg-white dark:bg-gray-800 px-3 py-2 font-semibold text-gray-700 dark:text-gray-200 min-w-[11rem]">Learner</th>
                <th class="px-2 py-2 font-semibold text-gray-700 dark:text-gray-200 text-center whitespace-nowrap">Done</th>
                <th v-for="p in data.practicals" :key="p.key" class="px-2 py-2 align-bottom" :title="p.title">
                  <span class="block w-16 text-[11px] font-semibold leading-tight text-gray-600 dark:text-gray-300">{{ SHORT[p.key] || p.title }}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!shownLearners.length">
                <td :colspan="data.practicals.length + 2" class="px-3 py-6 text-center text-gray-500 dark:text-gray-400">{{ search ? 'No learner matches.' : 'No learners in this class.' }}</td>
              </tr>
              <tr v-for="l in shownLearners" :key="l.id" class="border-b last:border-0 border-gray-100 dark:border-gray-700/60">
                <td class="sticky left-0 bg-white dark:bg-gray-800 px-3 py-1.5">
                  <p class="font-semibold text-gray-900 dark:text-white truncate max-w-[14rem]">{{ niceName(l.name) }}</p>
                  <p class="text-[11px] text-gray-500 dark:text-gray-400">{{ l.admission_number }}</p>
                </td>
                <td class="px-2 py-1.5 text-center tabular-nums font-semibold" :class="doneCount(l) ? 'text-gray-900 dark:text-white' : 'text-gray-400'">{{ doneCount(l) }}/{{ data.practicals.length }}</td>
                <td v-for="p in data.practicals" :key="p.key" class="px-2 py-1.5 text-center">
                  <span
                    v-if="l.results[p.key]"
                    class="inline-block min-w-[2.75rem] px-1.5 py-0.5 rounded-md text-[11px] font-bold tabular-nums"
                    :class="cellTone(l.results[p.key])"
                    :title="cellTitle(p, l.results[p.key])"
                  >{{ cellText(p, l.results[p.key]) }}</span>
                  <span v-else class="text-gray-300 dark:text-gray-600">–</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </template>

    <!-- Set a practical -->
    <div v-if="setOpen && data" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" @click.self="setOpen = false">
      <form class="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-gray-800 shadow-xl p-5 space-y-4" @submit.prevent="saveTask">
        <div>
          <h2 class="text-lg font-bold text-gray-900 dark:text-white">Set a practical</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">Each learner in the classes you choose is told, and sees it at the top of their ICT Lab. Only attempts after you set it count.</p>
        </div>
        <label class="block">
          <span class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Practical</span>
          <select v-model="form.practical" required class="w-full py-2 pl-3 pr-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white">
            <option v-for="p in data.practicals" :key="p.key" :value="p.key">{{ p.title }}</option>
          </select>
        </label>
        <div v-if="chosen?.levels">
          <span class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Level</span>
          <div class="grid grid-cols-3 gap-2">
            <button v-for="l in LEVELS" :key="l.key" type="button" class="rounded-xl border px-3 py-2 text-sm font-semibold" :class="form.level === l.key ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200' : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200'" @click="form.level = l.key">{{ l.label }}</button>
          </div>
        </div>
        <div>
          <span class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Classes</span>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-44 overflow-y-auto">
            <label v-for="c in data.classes" :key="c.id" class="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 px-2.5 py-1.5 text-sm text-gray-800 dark:text-gray-100 cursor-pointer" :class="form.class_ids.includes(c.id) ? 'border-indigo-400 bg-indigo-50/60 dark:bg-indigo-900/20' : ''">
              <input v-model="form.class_ids" type="checkbox" :value="c.id" class="rounded text-indigo-600">
              {{ c.name }}
            </label>
          </div>
        </div>
        <label class="block">
          <span class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due <span class="font-normal text-gray-400">(optional)</span></span>
          <input v-model="form.due_at" type="datetime-local" class="w-full py-2 px-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white">
        </label>
        <label class="block">
          <span class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Note to the class <span class="font-normal text-gray-400">(optional)</span></span>
          <input v-model="form.note" type="text" maxlength="500" placeholder="e.g. Aim for 80% or more" class="w-full py-2 px-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white">
        </label>
        <div class="flex justify-end gap-2 pt-1">
          <button type="button" class="btn-secondary" @click="setOpen = false">Cancel</button>
          <button type="submit" class="btn-primary" :disabled="saving || !form.class_ids.length">{{ saving ? 'Setting…' : 'Set it' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { niceName } from '@/components/dashboard/teacher/time'
import { LEVELS, type IctLevel } from '@/components/ictlab/activities'
import { labRoleOf, type IctClassTask, type IctStanding } from '@/components/ictlab/types'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'

interface Practical { key: string; title: string; parts: number; levels: boolean }
interface Learner { id: number; name: string; admission_number: string | null; results: Record<string, IctStanding> }
interface Results {
  classes: { id: number; name: string; learners: number }[]
  class_id: number | null
  practicals: Practical[]
  learners: Learner[]
  tasks: IctClassTask[]
  can_set: boolean
}

// Column headings short enough to sit over a narrow column (the full name is the tooltip)
const SHORT: Record<string, string> = {
  rules: 'Lab rules',
  boot: 'Start-up & shut-down',
  showroom: 'Showroom quiz',
  'computer-parts': 'Parts of a computer',
  journey: 'Journey of a key',
  connect: 'Connecting',
  assembly: 'Assembling',
  cleaning: 'Cleaning',
  troubleshoot: 'Trouble-shooting',
  hazards: 'Spot the hazard',
  'laptop-repair': 'Laptop repair',
  'online-safety': 'Safe online'
}

const route = useRoute()
const role = computed(() => labRoleOf(route.path))
const toast = useToastStore()
const confirmDialog = useConfirmStore()

const data = ref<Results | null>(null)
const loading = ref(true)
// a class can be opened straight from a link (?class_id=)
const classId = ref(Number(route.query.class_id) || 0)
const search = ref('')
const openTask = ref(0)

const load = async () => {
  loading.value = true
  try {
    const res = await axios.get(`/api/${role.value}/ict-lab/results`, { params: { class_id: classId.value || undefined } })
    data.value = res.data.data
    if (data.value?.class_id && classId.value !== data.value.class_id) classId.value = data.value.class_id
  } catch (e: any) {
    toast.error(e.response?.data?.message || 'Could not load the results')
  } finally {
    loading.value = false
  }
}
onMounted(load)
watch(classId, (v, old) => { if (old && v !== data.value?.class_id) { openTask.value = 0; load() } })

const className = computed(() => data.value?.classes.find(c => c.id === classId.value)?.name || 'this class')
const shownLearners = computed(() => {
  const q = search.value.trim().toLowerCase()
  const list = data.value?.learners || []
  return q ? list.filter(l => l.name.toLowerCase().includes(q) || (l.admission_number || '').toLowerCase().includes(q)) : list
})

const levelLabel = (l: string) => LEVELS.find(x => x.key === l)?.label || l
const niceDate = (d: string) => new Date(d.replace(' ', 'T')).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })
const doneCount = (l: Learner) => Object.values(l.results).filter(r => r.done).length

const cellText = (p: Practical, r: IctStanding) => (r.done ? `${r.best}%` : `${r.parts}/${p.parts}`)
const cellTone = (r: IctStanding) =>
  r.done && (r.best ?? 0) >= 80 ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200' : 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200'
const cellTitle = (p: Practical, r: IctStanding) =>
  `${p.title}: ${r.done ? `best ${r.best}%` : `${r.parts} of ${p.parts} parts done`}${r.last_at ? ` · last ${niceDate(r.last_at)}` : ''}`

const notDone = (t: IctClassTask) => (data.value?.learners || []).filter(l => !t.by_student[l.id]?.done)
const averageOf = (t: IctClassTask) => {
  const scores = Object.values(t.by_student).filter(s => s.done && s.best !== null).map(s => s.best as number)
  return scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null
}

// Setting a practical
const setOpen = ref(false)
const saving = ref(false)
const form = ref<{ practical: string; level: IctLevel; class_ids: number[]; due_at: string; note: string }>({ practical: 'assembly', level: 'simple', class_ids: [], due_at: '', note: '' })
const chosen = computed(() => data.value?.practicals.find(p => p.key === form.value.practical) || null)
const openSet = () => {
  form.value = { practical: form.value.practical || 'assembly', level: 'simple', class_ids: classId.value ? [classId.value] : [], due_at: '', note: '' }
  setOpen.value = true
}
const saveTask = async () => {
  saving.value = true
  try {
    const res = await axios.post(`/api/${role.value}/ict-lab/tasks`, {
      practical: form.value.practical,
      level: chosen.value?.levels ? form.value.level : 'simple',
      class_ids: form.value.class_ids,
      due_at: form.value.due_at || null,
      note: form.value.note || null
    })
    const n = res.data.data?.learners_told ?? 0
    toast.success(`Practical set - ${n} learner${n === 1 ? '' : 's'} told`)
    setOpen.value = false
    await load()
  } catch (e: any) {
    const errors = e.response?.data?.errors
    toast.error((errors && Object.values(errors)[0]) || e.response?.data?.message || 'Could not set the practical')
  } finally {
    saving.value = false
  }
}

const removeTask = async (t: IctClassTask) => {
  const ok = await confirmDialog.open({
    title: 'Remove this practical?',
    message: `"${t.title}" is taken off ${className.value}'s list. Their scores stay.`,
    confirmLabel: 'Remove',
    danger: true
  })
  if (!ok) return
  try {
    await axios.delete(`/api/${role.value}/ict-lab/tasks/${t.id}`)
    toast.success('Practical removed')
    await load()
  } catch (e: any) {
    toast.error(e.response?.data?.message || 'Could not remove it')
  }
}
</script>
