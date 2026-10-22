<template>
  <!-- Is it safe online? Three parts: an inbox to sort into safe and scam (tap the suspicious
       details, see where links really go), websites to judge from their address bar, and a
       password strength meter with questions. Each finished part is saved for students
       (safety-mail, safety-web, safety-password). Nothing typed into the password box leaves the page. -->
  <div>
    <div class="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
      <RouterLink :to="`/${role}/ict-lab`" class="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Back to the ICT Lab">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </RouterLink>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">ICT Lab · Safety</p>
        <h1 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight">Is it safe online?</h1>
      </div>
    </div>

    <div class="mb-4 grid grid-cols-3 gap-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1" role="tablist">
      <button v-for="(p, i) in PARTS" :key="p.key" type="button" role="tab" :aria-selected="part === p.key" class="rounded-lg px-2 py-2 text-left sm:text-center transition-colors" :class="part === p.key ? 'bg-indigo-600 text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'" @click="part = p.key">
        <p class="text-xs sm:text-sm font-bold">{{ i + 1 }}. {{ p.label }} <span v-if="done.has(p.key)">✓</span></p>
        <p class="hidden sm:block text-[11px] opacity-80">{{ p.hint }}</p>
      </button>
    </div>

    <!-- ===================== 1. The inbox ===================== -->
    <div v-if="part === 'mail'" class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
      <div class="px-4 py-2.5 border-b border-gray-200 dark:border-gray-700 flex flex-wrap items-center gap-2 bg-gray-50 dark:bg-gray-900/40">
        <p class="text-sm font-bold text-gray-900 dark:text-white flex-1">📥 Inbox - sarah.n@school.ug</p>
        <p class="text-xs text-gray-600 dark:text-gray-300">Sorted {{ mailDone.length }} of {{ MAILS.length }} · {{ mailWrong }} wrong · {{ cluesFound }} of {{ totalClues }} warning signs found</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-[18rem_minmax(0,1fr)] min-h-[28rem]">
        <!-- the list -->
        <ul class="border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 max-h-64 md:max-h-none overflow-y-auto">
          <li v-for="m in MAILS" :key="m.id">
            <button type="button" class="w-full text-left px-4 py-3 border-b border-gray-100 dark:border-gray-700/60 flex gap-2.5" :class="openId === m.id ? 'bg-indigo-50 dark:bg-indigo-900/30' : 'hover:bg-gray-50 dark:hover:bg-gray-700/40'" @click="openMail(m.id)">
              <span class="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white" :class="verdictOf(m.id) === null ? 'bg-slate-500' : (verdictOf(m.id) === 'scam') === m.scam ? (m.scam ? 'bg-rose-600' : 'bg-emerald-600') : 'bg-amber-500'">
                {{ verdictOf(m.id) === null ? m.fromName[0] : m.scam ? '!' : '✓' }}
              </span>
              <span class="min-w-0 flex-1">
                <span class="flex items-baseline gap-2"><span class="text-sm truncate flex-1" :class="verdictOf(m.id) === null ? 'font-bold text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'">{{ m.fromName }}</span><span class="text-[11px] text-gray-500 flex-shrink-0">{{ m.time }}</span></span>
                <span class="block text-xs truncate" :class="verdictOf(m.id) === null ? 'text-gray-800 dark:text-gray-100 font-semibold' : 'text-gray-500'">{{ m.subject }}</span>
              </span>
            </button>
          </li>
        </ul>

        <!-- the open message -->
        <div v-if="mail" class="p-4 sm:p-5">
          <p class="text-lg font-bold text-gray-900 dark:text-white leading-snug">{{ mail.subject }}</p>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
            <b>{{ mail.fromName }}</b> &lt;<Bit :p="mail.fromAddr" :mid="mail.id" k="from" />&gt;
          </p>
          <div class="mt-4 space-y-3 text-[15px] text-gray-800 dark:text-gray-100 leading-relaxed">
            <p v-for="(line, li) in mail.body" :key="li"><template v-for="(p, pi) in line" :key="pi"><Bit :p="p" :mid="mail.id" :k="`${li}-${pi}`" /></template></p>
          </div>

          <!-- where a link really goes -->
          <p v-if="linkShown" class="mt-4 rounded-lg bg-gray-900 text-gray-100 px-3 py-2 text-xs font-mono break-all">🔗 This link really goes to: <b class="text-amber-300">{{ linkShown }}</b></p>

          <div class="mt-5 rounded-xl bg-gray-50 dark:bg-gray-900/40 p-3">
            <template v-if="verdictOf(mail.id) === null">
              <p class="text-xs text-gray-600 dark:text-gray-300 mb-2">Tap anything that looks suspicious - the sender, the words, the links. Then decide:</p>
              <div class="flex flex-wrap gap-2">
                <button type="button" class="px-4 py-2 rounded-xl border-2 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-semibold text-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/30" @click="decide('safe')">✓ It is safe</button>
                <button type="button" class="px-4 py-2 rounded-xl border-2 border-rose-500 text-rose-800 dark:text-rose-200 font-semibold text-sm hover:bg-rose-50 dark:hover:bg-rose-900/30" @click="decide('scam')">⚠ It is a scam - report it</button>
              </div>
            </template>
            <template v-else>
              <p class="text-sm font-bold" :class="(verdictOf(mail.id) === 'scam') === mail.scam ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'">
                {{ (verdictOf(mail.id) === 'scam') === mail.scam ? 'Right!' : 'Not quite.' }}
              </p>
              <p class="text-sm text-gray-700 dark:text-gray-200 mt-0.5">{{ mail.verdict }}</p>
              <ul v-if="mail.scam" class="mt-2 space-y-1">
                <li v-for="c in cluesOf(mail)" :key="c.key" class="text-xs flex gap-1.5" :class="found.has(`${mail.id}:${c.key}`) ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-600 dark:text-gray-300'">
                  <span>{{ found.has(`${mail.id}:${c.key}`) ? '✓' : '•' }}</span><span><b>"{{ c.t }}"</b> - {{ c.clue }}</span>
                </li>
              </ul>
              <button v-if="nextUnsorted" type="button" class="mt-3 btn-primary !py-1.5 !text-sm" @click="openMail(nextUnsorted)">Next message</button>
            </template>
          </div>
        </div>
      </div>
      <div v-if="mailDone.length === MAILS.length" class="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-emerald-50 dark:bg-emerald-900/20 text-sm">
        <b>Inbox sorted - {{ mailScore }}%.</b> Remember: check the sender's address, be suspicious of threats, prizes and deadlines, look where a link really goes, and never give a password or PIN.
        <button type="button" class="ml-2 btn-primary !py-1 !text-xs" @click="part = 'web'">Next: websites</button>
      </div>
    </div>

    <!-- ===================== 2. Websites ===================== -->
    <div v-else-if="part === 'web'" class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_20rem] gap-4 items-start">
      <section v-if="site" class="rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 overflow-hidden shadow-sm">
        <!-- a browser -->
        <div class="bg-gray-100 dark:bg-gray-900 px-3 pt-2">
          <div class="flex items-center gap-1.5 mb-2"><span class="w-3 h-3 rounded-full bg-rose-400"></span><span class="w-3 h-3 rounded-full bg-amber-400"></span><span class="w-3 h-3 rounded-full bg-emerald-400"></span>
            <span class="ml-3 px-3 py-1 rounded-t-lg bg-white dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-200 truncate max-w-[60%]">{{ site.title }}</span></div>
        </div>
        <div class="px-3 py-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
          <span class="text-gray-400">‹ ›</span>
          <div class="flex-1 min-w-0 rounded-full bg-gray-100 dark:bg-gray-900 px-3 py-1.5 text-sm font-mono flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
            <span v-if="site.url.scheme === 'https'" title="Secure connection">🔒</span>
            <span v-else class="text-[11px] font-sans font-semibold text-rose-600">⚠ Not secure</span>
            <span class="url"><span class="text-gray-500">{{ site.url.scheme }}://{{ site.url.before }}</span><span :class="webPicked !== null ? 'bg-amber-200 text-gray-900 rounded font-bold' : 'text-gray-900 dark:text-white'">{{ site.url.domain }}</span><span class="text-gray-500">{{ site.url.after }}</span></span>
          </div>
        </div>
        <!-- the page -->
        <div class="p-6 min-h-[18rem] flex items-center justify-center" :class="site.kind === 'prize' ? 'bg-gradient-to-br from-yellow-200 to-amber-400' : site.kind === 'momo' ? 'bg-yellow-300' : 'bg-gray-50 dark:bg-gray-900'">
          <div v-if="site.kind === 'login' || site.kind === 'momo'" class="w-full max-w-xs rounded-xl bg-white shadow p-5 text-gray-900">
            <p class="text-lg font-bold">{{ site.title.split(' - ')[0].replace('Sign in', '').trim() || 'Sign in' }}</p>
            <p class="text-xs text-gray-500 mb-3">{{ site.kind === 'momo' ? 'Mobile Money' : 'Sign in to continue' }}</p>
            <div class="h-9 rounded-lg border border-gray-300 mb-2 px-2 flex items-center text-xs text-gray-400">{{ site.kind === 'momo' ? 'Phone number' : 'Email or username' }}</div>
            <div class="h-9 rounded-lg border border-gray-300 mb-3 px-2 flex items-center text-xs text-gray-400">{{ site.kind === 'momo' ? 'PIN' : 'Password' }}</div>
            <div class="h-9 rounded-lg bg-indigo-600 text-white text-sm font-semibold flex items-center justify-center">Continue</div>
          </div>
          <div v-else-if="site.kind === 'prize'" class="text-center text-gray-900">
            <p class="text-3xl font-black">🎁 FREE BONUS!</p>
            <p class="mt-1 font-bold">UGX 500,000 for the first 100 people</p>
            <div class="mt-3 mx-auto max-w-[14rem] space-y-2"><div class="h-9 rounded-lg bg-white/90 text-xs text-gray-500 flex items-center px-2">Phone number</div><div class="h-9 rounded-lg bg-white/90 text-xs text-gray-500 flex items-center px-2">MoMo PIN</div><div class="h-9 rounded-lg bg-rose-600 text-white text-sm font-bold flex items-center justify-center">CLAIM NOW</div></div>
          </div>
          <div v-else class="w-full grid grid-cols-2 sm:grid-cols-3 gap-3 text-gray-900">
            <div v-for="n in 3" :key="n" class="rounded-xl bg-white shadow p-3 text-center">
              <div class="h-16 rounded-lg bg-gray-200 mb-2 flex items-center justify-center text-2xl">📱</div>
              <p class="text-xs font-semibold">{{ site.id === 'phone-deal' ? 'iPhone 15 Pro' : ['Tecno Spark', 'Samsung A15', 'Infinix Hot'][n - 1] }}</p>
              <p class="text-xs font-bold" :class="site.id === 'phone-deal' ? 'text-rose-600' : 'text-gray-700'">UGX {{ site.id === 'phone-deal' ? '50,000' : ['420,000', '650,000', '480,000'][n - 1] }}</p>
            </div>
          </div>
        </div>
      </section>

      <aside class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 lg:sticky lg:top-20">
        <template v-if="site">
          <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
            <span class="font-semibold">Website {{ webI + 1 }} of {{ sites.length }}</span>
            <span class="tabular-nums">{{ webWrong }} wrong</span>
          </div>
          <p class="text-base font-bold text-gray-900 dark:text-white">Is this the real website?</p>
          <p class="text-xs text-gray-600 dark:text-gray-300 mt-1">Look at the address bar. The real domain is the part just before the first single "/".</p>
          <div v-if="webPicked === null" class="mt-3 grid grid-cols-2 gap-2">
            <button type="button" class="px-3 py-2.5 rounded-xl border-2 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-semibold text-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/30" @click="judgeSite(true)">Real</button>
            <button type="button" class="px-3 py-2.5 rounded-xl border-2 border-rose-500 text-rose-800 dark:text-rose-200 font-semibold text-sm hover:bg-rose-50 dark:hover:bg-rose-900/30" @click="judgeSite(false)">Fake</button>
          </div>
          <template v-else>
            <p class="mt-3 text-sm font-bold" :class="webPicked === site.real ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'">{{ webPicked === site.real ? 'Right!' : 'Not quite.' }}</p>
            <p class="text-sm text-gray-700 dark:text-gray-200 mt-0.5">{{ site.why }}</p>
            <div class="mt-3 flex justify-end"><button type="button" class="btn-primary !py-1.5 !text-sm" @click="nextSite">{{ webI + 1 < sites.length ? 'Next website' : 'Finish' }}</button></div>
          </template>
        </template>
        <div v-else class="text-center py-2">
          <span class="mx-auto w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center"><AppIcon name="trophy" class="w-6 h-6" /></span>
          <p class="mt-2 text-base font-bold text-gray-900 dark:text-white">{{ webScore }}% - {{ sites.length - webWrong }} of {{ sites.length }} right</p>
          <p class="mt-1 text-sm text-gray-700 dark:text-gray-200">Check the domain every time, type important addresses yourself, and remember: a padlock means private, not honest.</p>
          <div class="mt-3 flex justify-center gap-2">
            <button type="button" class="btn-secondary !py-1.5 !text-sm" @click="startWeb">Again</button>
            <button type="button" class="btn-primary !py-1.5 !text-sm" @click="part = 'password'">Next: passwords</button>
          </div>
        </div>
      </aside>
    </div>

    <!-- ===================== 3. Passwords ===================== -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_20rem] gap-4 items-start">
      <section class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-5">
        <p class="text-sm font-bold text-gray-900 dark:text-white">Test a password</p>
        <p class="text-xs text-gray-500 dark:text-gray-400">Try made-up passwords - not your real one. Nothing you type here is saved or sent anywhere.</p>
        <div class="mt-3 flex gap-2">
          <input v-model="pw" :type="showPw ? 'text' : 'password'" autocomplete="off" spellcheck="false" class="flex-1 rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-900 font-mono" placeholder="Type a password to test">
          <button type="button" class="btn-secondary !py-1.5 !text-sm" @click="showPw = !showPw">{{ showPw ? 'Hide' : 'Show' }}</button>
        </div>
        <!-- the meter -->
        <div class="mt-3 grid grid-cols-4 gap-1.5">
          <span v-for="n in 4" :key="n" class="h-2.5 rounded-full transition-colors" :style="{ background: n <= strength.score ? METER[strength.score].color : '#e5e7eb' }"></span>
        </div>
        <p class="mt-1.5 text-sm font-bold" :style="{ color: METER[strength.score].color }">{{ pw ? METER[strength.score].label : '' }}</p>
        <p v-if="pw" class="text-sm text-gray-700 dark:text-gray-200">A computer guessing 10 billion passwords a second would crack it <b>{{ strength.crack }}</b>.</p>
        <ul class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          <li v-for="c in strength.checks" :key="c.label" class="flex items-center gap-2 text-sm" :class="c.ok ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-500 dark:text-gray-400'">
            <span class="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold" :class="c.ok ? 'bg-emerald-600 text-white' : 'border-2 border-gray-300 dark:border-gray-600'">{{ c.ok ? '✓' : '' }}</span>{{ c.label }}
          </li>
        </ul>
        <div class="mt-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 p-3 text-sm text-indigo-950 dark:text-indigo-100">
          <b>Tip - a passphrase:</b> join three or four random words with numbers and symbols, like <span class="font-mono">Mango!River7Sky#Blue</span>. Long, strong, and easy to remember. Try one above.
        </div>
      </section>

      <aside class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 lg:sticky lg:top-20">
        <template v-if="pq">
          <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
            <span class="font-semibold">Question {{ pqi + 1 }} of {{ pqs.length }}</span>
            <span class="tabular-nums">{{ pwWrong }} wrong</span>
          </div>
          <p class="text-base font-bold text-gray-900 dark:text-white leading-snug">{{ pq.q }}</p>
          <div class="mt-3 space-y-1.5">
            <button v-for="o in pq.options" :key="o" type="button" class="w-full text-left rounded-xl border-2 px-3 py-2 text-sm font-semibold transition-colors disabled:cursor-default" :class="pqClass(o)" :disabled="pqPicked !== null" @click="answerPw(o)">{{ o }}</button>
          </div>
          <p v-if="pqPicked !== null" class="mt-2 text-sm" :class="pqPicked === pq.a ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'">{{ pqPicked === pq.a ? 'Right!' : 'Not quite.' }} {{ pq.why }}</p>
          <div class="mt-3 flex justify-end"><button type="button" class="btn-primary !py-1.5 !text-sm" :disabled="pqPicked === null" @click="nextPw">{{ pqi + 1 < pqs.length ? 'Next question' : 'Finish' }}</button></div>
        </template>
        <div v-else class="text-center py-2">
          <span class="mx-auto w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center"><AppIcon name="trophy" class="w-6 h-6" /></span>
          <p class="mt-2 text-base font-bold text-gray-900 dark:text-white">{{ pwScore }}% - {{ pqs.length - pwWrong }} of {{ pqs.length }} right</p>
          <p class="mt-1 text-sm text-gray-700 dark:text-gray-200">Long passphrases, a different one for each account, 2-step verification on - and never share them.</p>
          <button type="button" class="mt-3 btn-secondary !py-1.5 !text-sm" @click="startPw">Again</button>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineComponent, h, type PropType } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import AppIcon from '@/components/common/AppIcon.vue'
import { labRoleOf } from '@/components/ictlab/types'
import { MAILS, SITES, PASSWORD_Q, passwordStrength, type Mail, type Piece } from '@/components/ictlab/onlineSafety'

const route = useRoute()
const role = computed(() => labRoleOf(route.path))

type Part = 'mail' | 'web' | 'password'
const PARTS: { key: Part; label: string; hint: string }[] = [
  { key: 'mail', label: 'Spot the scam', hint: 'an inbox to sort' },
  { key: 'web', label: 'Real or fake website?', hint: 'read the address bar' },
  { key: 'password', label: 'Strong passwords', hint: 'and good habits' }
]
const part = ref<Part>('mail')
const done = ref(new Set<Part>())
const started = Date.now()
const shuffle = <T,>(a: T[]) => [...a].sort(() => Math.random() - 0.5)

async function save(p: Part, steps: number, wrong: number) {
  done.value = new Set([...done.value, p])
  if (role.value !== 'student') return
  try {
    // An attempt scores 100 - 5 per mistake: each wrong answer counts as `per` mistakes
    const per = p === 'mail' ? 3 : p === 'web' ? 2 : 5
    await axios.post('/api/student/ict-lab/attempts', {
      activity_key: `safety-${p}`, level: 'simple', steps_total: steps, mistakes: wrong * per, hints_used: 0, duration_seconds: Math.round((Date.now() - started) / 1000)
    })
  } catch {
    // shown anyway
  }
}
onMounted(async () => {
  if (role.value !== 'student') return
  try {
    const res = await axios.get('/api/student/ict-lab')
    const keys = ((res.data.data.progress || []) as { activity_key: string }[]).map(p => p.activity_key)
    done.value = new Set(PARTS.map(p => p.key).filter(k => keys.includes(`safety-${k}`)))
  } catch {
    // ticks come back as parts are finished
  }
})

// ------------------------------------------------------------ 1. the inbox
const openId = ref(MAILS[0].id)
const mail = computed(() => MAILS.find(m => m.id === openId.value) || null)
const verdicts = ref<Record<string, 'safe' | 'scam'>>({})
const found = ref(new Set<string>())
const linkShown = ref('')
const verdictOf = (id: string) => verdicts.value[id] ?? null
const mailDone = computed(() => Object.keys(verdicts.value))
const mailWrong = computed(() => MAILS.filter(m => verdicts.value[m.id] && (verdicts.value[m.id] === 'scam') !== m.scam).length)
const mailScore = computed(() => Math.max(0, 100 - mailWrong.value * 15))
const nextUnsorted = computed(() => MAILS.find(m => !verdicts.value[m.id])?.id || null)
// every suspicious detail in a message, with a key for it
function cluesOf(m: Mail) {
  const out: { key: string; t: string; clue: string }[] = []
  if (typeof m.fromAddr !== 'string' && m.fromAddr.clue) out.push({ key: 'from', t: m.fromAddr.t, clue: m.fromAddr.clue })
  m.body.forEach((line, li) => line.forEach((p, pi) => { if (typeof p !== 'string' && p.clue) out.push({ key: `${li}-${pi}`, t: p.t, clue: p.clue }) }))
  return out
}
const totalClues = MAILS.reduce((s, m) => s + cluesOf(m).length, 0)
const cluesFound = computed(() => found.value.size)
function openMail(id: string) {
  openId.value = id
  linkShown.value = ''
}
function decide(v: 'safe' | 'scam') {
  if (!mail.value || verdicts.value[mail.value.id]) return
  verdicts.value = { ...verdicts.value, [mail.value.id]: v }
  if (mailDone.value.length === MAILS.length) save('mail', MAILS.length, mailWrong.value)
}
// A piece of a message: tap a suspicious bit to flag it; tap a link to see where it really goes
const Bit = defineComponent({
  props: { p: { type: [String, Object] as PropType<Piece>, required: true }, mid: { type: String, required: true }, k: { type: String, required: true } },
  setup(props) {
    return () => {
      const p = props.p
      if (typeof p === 'string') return h('span', p)
      const key = `${props.mid}:${props.k}`
      const flagged = found.value.has(key)
      const sorted = !!verdicts.value[props.mid]
      const cls = [
        'rounded px-0.5 transition-colors cursor-pointer',
        p.href ? 'text-blue-700 dark:text-blue-300 underline' : '',
        flagged ? 'bg-rose-200 dark:bg-rose-800/60 ring-2 ring-rose-400' : sorted && p.clue ? 'bg-amber-100 dark:bg-amber-900/40' : 'hover:bg-amber-50 dark:hover:bg-amber-900/30'
      ]
      return h('span', {
        class: cls,
        role: 'button',
        tabindex: 0,
        onClick: () => {
          if (p.href) linkShown.value = p.href
          if (p.clue && !sorted) found.value = new Set([...found.value, key])
        }
      }, [p.t, flagged ? h('span', { class: 'ml-1 text-[10px] font-bold text-rose-700 dark:text-rose-300' }, '⚑') : null])
    }
  }
})

// ------------------------------------------------------------ 2. websites
const sites = ref(shuffle(SITES))
const webI = ref(0)
const webPicked = ref<boolean | null>(null)
const webWrong = ref(0)
const site = computed(() => sites.value[webI.value] || null)
const webScore = computed(() => Math.max(0, 100 - webWrong.value * 10))
function startWeb() {
  sites.value = shuffle(SITES)
  webI.value = 0
  webPicked.value = null
  webWrong.value = 0
}
function judgeSite(real: boolean) {
  if (!site.value || webPicked.value !== null) return
  webPicked.value = real
  if (real !== site.value.real) webWrong.value++
}
function nextSite() {
  webPicked.value = null
  webI.value++
  if (webI.value >= sites.value.length) save('web', sites.value.length, webWrong.value)
}

// ------------------------------------------------------------ 3. passwords
const pw = ref('')
const showPw = ref(false)
const strength = computed(() => passwordStrength(pw.value))
const METER = [
  { label: 'Very weak', color: '#e11d48' },
  { label: 'Weak', color: '#ea580c' },
  { label: 'Fair', color: '#ca8a04' },
  { label: 'Strong', color: '#16a34a' },
  { label: 'Very strong', color: '#15803d' }
]
const pqs = ref(PASSWORD_Q.map(q => ({ ...q, options: shuffle(q.options) })))
const pqi = ref(0)
const pqPicked = ref<string | null>(null)
const pwWrong = ref(0)
const pq = computed(() => pqs.value[pqi.value] || null)
const pwScore = computed(() => Math.max(0, 100 - pwWrong.value * 25))
function startPw() {
  pqs.value = PASSWORD_Q.map(q => ({ ...q, options: shuffle(q.options) }))
  pqi.value = 0
  pqPicked.value = null
  pwWrong.value = 0
}
function answerPw(o: string) {
  if (pqPicked.value !== null || !pq.value) return
  pqPicked.value = o
  if (o !== pq.value.a) pwWrong.value++
}
function pqClass(o: string) {
  if (pqPicked.value === null) return 'border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 hover:border-indigo-400 hover:bg-indigo-50/60 dark:hover:bg-indigo-900/20'
  if (o === pq.value?.a) return 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200'
  if (o === pqPicked.value) return 'border-rose-400 bg-rose-50 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200'
  return 'border-gray-200 dark:border-gray-700 text-gray-400'
}
function nextPw() {
  pqPicked.value = null
  pqi.value++
  if (pqi.value >= pqs.value.length) save('password', pqs.value.length, pwWrong.value)
}
</script>
