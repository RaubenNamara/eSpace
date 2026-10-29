<template>
  <div>
    <PageHeader
      title="ICT Lab"
      :description="role === 'teacher'
        ? 'Hands-on practicals from the Subsidiary ICT syllabus, step by step. Open one to try it, and link its steps to your eNotes.'
        : 'Hands-on practicals from the Subsidiary ICT syllabus, step by step - at a Simple, Intermediate or Advanced level.'"
      icon="keyboard"
      accent="indigo"
    >
      <template v-if="role === 'teacher' || role === 'hod'" #actions>
        <RouterLink :to="`/${role}/ict-lab/results`" class="btn-primary">Class results</RouterLink>
      </template>
    </PageHeader>

    <!-- Practicals the student's teachers have set: the ones still to do first -->
    <section v-if="role === 'student' && tasks.length" class="mb-6">
      <h2 class="mb-2 text-sm font-bold text-gray-900 dark:text-white">Set by your teacher</h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-2.5">
        <RouterLink
          v-for="t in tasks"
          :key="t.id"
          :to="taskLink(t)"
          class="flex items-center gap-3 rounded-2xl border p-3.5 hover:shadow-md transition-shadow"
          :class="t.standing.done ? 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800' : overdue(t) ? 'border-rose-300 dark:border-rose-700 bg-rose-50 dark:bg-rose-900/20' : 'border-indigo-300 dark:border-indigo-700 bg-indigo-50/60 dark:bg-indigo-900/20'"
        >
          <span class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white" :class="t.standing.done ? 'bg-emerald-600' : overdue(t) ? 'bg-rose-600' : 'bg-indigo-600'">
            <AppIcon :name="t.standing.done ? 'check-circle' : 'clipboard'" class="w-5 h-5" />
          </span>
          <div class="min-w-0 flex-1">
            <p class="font-bold text-gray-900 dark:text-white leading-snug">{{ t.title }}<span v-if="t.has_levels" class="font-semibold text-gray-500 dark:text-gray-400"> · {{ levelLabel(t.level) }}</span></p>
            <p class="text-xs" :class="t.standing.done ? 'text-emerald-700 dark:text-emerald-300 font-semibold' : overdue(t) ? 'text-rose-700 dark:text-rose-300 font-semibold' : 'text-gray-600 dark:text-gray-300'">{{ taskStatus(t) }}</p>
            <p v-if="t.note" class="text-xs text-gray-500 dark:text-gray-400 truncate">"{{ t.note }}"<template v-if="t.teacher_name"> - {{ t.teacher_name }}</template></p>
          </div>
          <svg class="w-5 h-5 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </RouterLink>
      </div>
    </section>

    <!-- Start here: the lab rules -->
    <RouterLink
      :to="`/${role}/ict-lab/rules`"
      class="mb-6 flex items-center gap-4 rounded-2xl border p-4 hover:shadow-md transition-shadow"
      :class="!rulesDue ? 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800' : 'border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20'"
    >
      <span class="w-12 h-12 rounded-2xl text-white flex items-center justify-center flex-shrink-0 shadow-sm" :class="!rulesDue ? 'bg-indigo-600' : 'bg-amber-500'"><AppIcon :name="rulesPassed ? 'check-circle' : 'warning'" class="w-6 h-6" /></span>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-bold uppercase tracking-wide" :class="!rulesDue ? 'text-indigo-600 dark:text-indigo-300' : 'text-amber-700 dark:text-amber-300'">Start here · safety first</p>
        <p class="text-lg font-bold text-gray-900 dark:text-white leading-snug">Computer lab rules</p>
        <p class="text-sm text-gray-600 dark:text-gray-300">
          {{ rulesPassed ? `Lab pass earned - best ${rulesBest}%. Look over the rules any time.` : 'How to stay safe and look after the computers. Learn the 12 rules, then judge real situations to earn your lab pass.' }}
        </p>
      </div>
      <svg class="w-5 h-5 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
    </RouterLink>

    <!-- The practicals, in syllabus order: class and term, topic, and the outcome each one covers -->
    <section v-for="s in SECTIONS" :key="s.title" class="mb-8">
      <div class="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">{{ s.when }}</p>
        <h2 class="text-base font-bold text-gray-900 dark:text-white">{{ s.title }}</h2>
      </div>
      <p v-if="s.note" class="-mt-2 mb-3 text-sm text-gray-600 dark:text-gray-300">{{ s.note }}</p>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <template v-for="item in s.items" :key="item">
          <!-- a step-by-step activity, at three levels -->
          <article
            v-if="activity(item)"
            class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 flex flex-col"
          >
            <div class="flex items-start gap-4">
              <span class="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <AppIcon :name="activity(item)!.icon" class="w-6 h-6" />
              </span>
              <div class="min-w-0 flex-1">
                <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">{{ OUTCOME[item] }}</p>
                <p class="text-lg font-bold text-gray-900 dark:text-white leading-snug">{{ activity(item)!.title }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-300">{{ activity(item)!.summary }}</p>
              </div>
            </div>
            <div class="mt-3 grid grid-cols-3 gap-2">
              <RouterLink
                v-for="l in LEVELS"
                :key="l.key"
                :to="{ path: `/${role}/ict-lab/${item}`, query: { level: l.key } }"
                class="group rounded-xl border border-gray-200 dark:border-gray-700 px-3 py-2 hover:border-indigo-400 hover:bg-indigo-50/60 dark:hover:bg-indigo-900/20 transition-colors"
                :title="l.blurb"
              >
                <p class="text-sm font-bold text-gray-900 dark:text-white">{{ l.label }}</p>
                <p class="text-[11px] text-gray-500 dark:text-gray-400">{{ activity(item)!.levels[l.key].steps.length }} steps</p>
                <p v-if="best(item, l.key) !== null" class="mt-1 text-[11px] font-bold" :class="(best(item, l.key) ?? 0) >= 80 ? 'text-emerald-600 dark:text-emerald-300' : 'text-amber-600 dark:text-amber-300'">
                  Best {{ best(item, l.key) }}%
                </p>
                <p v-else class="mt-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-300 group-hover:underline">{{ role === 'student' ? 'Start' : 'Try it' }}</p>
              </RouterLink>
            </div>
            <p v-if="role === 'teacher' && linkCount(item)" class="mt-3 text-xs text-gray-500 dark:text-gray-400">
              <AppIcon name="document" class="w-3.5 h-3.5 inline -mt-0.5" /> {{ linkCount(item) }} step{{ linkCount(item) === 1 ? '' : 's' }} linked to your eNotes
            </p>
          </article>

          <!-- a practical with its own page -->
          <div
            v-else-if="CARDS[item]"
            class="relative flex items-center gap-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:shadow-md hover:border-indigo-300 transition"
          >
            <span class="w-12 h-12 rounded-2xl text-white flex items-center justify-center flex-shrink-0 shadow-sm" :class="CARDS[item].badge">
              <AppIcon v-if="CARDS[item].icon" :name="CARDS[item].icon!" class="w-6 h-6" />
              <span v-else class="font-mono text-[11px] font-bold leading-tight text-center">{{ CARDS[item].mark }}</span>
            </span>
            <div class="min-w-0 flex-1">
              <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">{{ OUTCOME[item] }}</p>
              <p class="text-lg font-bold text-gray-900 dark:text-white leading-snug">
                <!-- the whole card opens the practical; the showroom's quiz button sits above the link -->
                <RouterLink :to="`/${role}/ict-lab/${CARDS[item].path}`" class="after:absolute after:inset-0 after:rounded-2xl focus:outline-none">{{ CARDS[item].title }}</RouterLink>
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-300">{{ CARDS[item].text }}</p>
              <div v-if="item === 'showroom'" class="relative z-10 mt-2 flex flex-wrap items-center gap-2">
                <RouterLink :to="`/${role}/ict-lab/showroom`" class="btn-primary !py-1.5 !text-sm">Explore</RouterLink>
                <RouterLink :to="{ path: `/${role}/ict-lab/showroom`, query: { quiz: 1 } }" class="btn-secondary !py-1.5 !text-sm">Test yourself</RouterLink>
              </div>
              <p v-if="progressOf(item)" class="mt-1 text-xs font-bold" :class="progressOf(item)!.good ? 'text-emerald-600 dark:text-emerald-300' : 'text-amber-600 dark:text-amber-300'">{{ progressOf(item)!.text }}</p>
            </div>
            <svg v-if="item !== 'showroom'" class="w-5 h-5 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { LEVELS, activityByKey, type IctLevel } from '@/components/ictlab/activities'
import { labRoleOf, type IctLink, type IctProgress, type IctTask } from '@/components/ictlab/types'
import { PASS_MARK, RULES_KEY } from '@/components/ictlab/labRules'

const route = useRoute()
const role = computed(() => labRoleOf(route.path))

/**
 * The lab follows the NCDC Subsidiary ICT syllabus (Advanced Secondary, 2025): each practical sits
 * under the topic it belongs to and shows the learning outcome it covers.
 */
const SECTIONS: { when: string; title: string; note?: string; items: string[] }[] = [
  { when: 'S.5 Term 1 · Topic 1', title: 'Introduction to ICTs', items: ['boot'] },
  { when: 'S.5 Term 2 · Topic 3', title: 'Computer Hardware', items: ['showroom', 'computer-parts', 'journey', 'connect', 'assembly', 'cleaning', 'troubleshoot', 'hazards'] },
  { when: 'S.5 Term 2 · Topic 4', title: 'Computer Software', items: ['laptop-repair'] },
  { when: 'S.6 Term 1 · Topic 7', title: 'The Internet and Digital Communications', items: ['online-safety'] }
]

// The outcome (or the skill) each practical covers, shown on its card
const OUTCOME: Record<string, string> = {
  boot: '1b · start-up, shut-down and their problems',
  showroom: '3a · classify hardware and its functions',
  'computer-parts': '3a · the parts inside the system unit',
  journey: '3a · input, processing, output and storage',
  connect: '1b, 3b · connect the parts into a working system',
  assembly: '3b · assemble a computer system',
  cleaning: '3c · routine maintenance',
  troubleshoot: '3c · troubleshoot a computer that will not work',
  hazards: '3c · safe handling in the lab',
  'laptop-repair': '3c, 4b · replace a drive, install the operating system',
  'online-safety': '7b, 7d · secure access and cyber threats'
}

// Practicals with their own page
const CARDS: Record<string, { path: string; title: string; text: string; badge: string; icon?: string; mark?: string }> = {
  boot: { path: 'boot', title: 'Start-up, BIOS and shut-down', text: 'Watch a computer start - power, POST, boot device, operating system - fix "no boot device" and a clock that keeps resetting, then shut down right: frozen programs, forced shutdown, power cuts, printers and routers.', badge: 'bg-blue-900', mark: 'BIOS' },
  showroom: { path: 'showroom', title: 'Parts and devices showroom', text: 'Every part inside a computer and 22 devices around it in 3D - and whether each is an input, output, storage, communication or processing device.', badge: 'bg-indigo-600', icon: 'photo' },
  journey: { path: 'journey', title: 'Inside a computer: the journey of one key', text: 'Press a letter and follow it in 3D - keyboard, cable, motherboard, processor, memory, graphics card, monitor and hard disk.', badge: 'bg-amber-500', icon: 'bolt' },
  hazards: { path: 'hazards', title: 'Spot the hazard', text: 'A computer lab in 3D with 8 dangers hidden round it - a drink by a keyboard, an overloaded socket, a damaged cable. Find them before time runs out.', badge: 'bg-rose-600', icon: 'warning' },
  'laptop-repair': { path: 'laptop-repair', title: 'Laptop repair: "No bootable device"', text: 'Find why the laptop will not start, pack the right toolkit, replace the failed SSD in 3D, make a Windows USB and install Windows step by step.', badge: 'bg-gray-800', icon: 'kit' },
  'online-safety': { path: 'online-safety', title: 'Is it safe online?', text: 'Sort an inbox of real and scam messages, spot fake websites from the address bar, and test how strong a password is.', badge: 'bg-slate-800', icon: 'key' }
}

const activity = (key: string) => activityByKey(key)

const progress = ref<IctProgress[]>([])
const links = ref<IctLink[]>([])
const tasks = ref<IctTask[]>([])
onMounted(async () => {
  if (role.value !== 'student' && role.value !== 'teacher') return
  try {
    const res = await axios.get(`/api/${role.value}/ict-lab`)
    progress.value = res.data.data.progress || []
    links.value = res.data.data.links || []
    tasks.value = res.data.data.tasks || []
  } catch {
    // the activities still work without scores and links
  }
})

const best = (activityKey: string, level: IctLevel) => progress.value.find(p => p.activity_key === activityKey && p.level === level)?.best ?? null
const rulesBest = computed(() => best(RULES_KEY, 'simple'))
const rulesPassed = computed(() => (rulesBest.value ?? 0) >= PASS_MARK)
// Only a student who has not passed yet sees the rules card in amber
const rulesDue = computed(() => role.value === 'student' && !rulesPassed.value)
const startsWith = (prefix: string) => progress.value.filter(p => p.activity_key.startsWith(prefix)).length


// The line under a card: the best score, or how many parts are done
function progressOf(item: string): { text: string; good: boolean } | null {
  const bestOf = (k: string) => {
    const b = best(k, 'simple')
    return b === null ? null : { text: `Best ${b}%`, good: b >= 80 }
  }
  const parts = (prefix: string, total: number, word: string) => {
    const n = startsWith(prefix)
    return n ? { text: `${n} of ${total} ${word} done`, good: true } : null
  }
  switch (item) {
    case 'showroom': return bestOf('parts-quiz')
    case 'journey': return bestOf('journey')
    case 'hazards': return bestOf('hazards')
    case 'boot': return parts('boot-', 5, 'parts')
    case 'laptop-repair': return parts('laptop-', 6, 'stages')
    case 'online-safety': return parts('safety-', 3, 'parts')
    default: return null
  }
}

// A practical set by the teacher: where it opens, and how the student stands on it
const STEP_BY_STEP = ['computer-parts', 'connect', 'assembly', 'cleaning', 'troubleshoot']
const taskLink = (t: IctTask) =>
  STEP_BY_STEP.includes(t.practical) ? { path: `/${role.value}/ict-lab/${t.practical}`, query: { level: t.level } }
    : t.practical === 'showroom' ? { path: `/${role.value}/ict-lab/showroom`, query: { quiz: 1 } }
      : { path: `/${role.value}/ict-lab/${t.practical}` }
const levelLabel = (l: string) => LEVELS.find(x => x.key === l)?.label || l
const dueDate = (d: string) => new Date(d.replace(' ', 'T'))
const overdue = (t: IctTask) => !t.standing.done && !!t.due_at && dueDate(t.due_at).getTime() < Date.now()
function taskStatus(t: IctTask): string {
  if (t.standing.done) return `Done${t.standing.best !== null ? ` - ${t.standing.best}%` : ''}`
  const due = t.due_at ? dueDate(t.due_at).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' }) : ''
  const parts = t.standing.parts ? ` · ${t.standing.parts} part${t.standing.parts === 1 ? '' : 's'} done` : ''
  if (overdue(t)) return `Was due ${due} - do it now${parts}`
  return (due ? `Due ${due}` : 'To do') + parts
}

const linkCount = (activityKey: string) => links.value.filter(l => l.activity_key === activityKey).length
</script>
