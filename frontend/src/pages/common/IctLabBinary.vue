<template>
  <!-- Binary and storage: how a computer keeps everything as 1s and 0s. Three parts - bits and
       bytes (a row of 8 bulbs with switches: make and read numbers), letters in binary (ASCII:
       make a letter's code, read a mystery byte, see your name in binary), and storage sizes (order
       the units, fill a 16 GB flash disk, how-many-will-fit questions). Each part is saved for
       students when finished (binary-bits, binary-letters, binary-storage). -->
  <div>
    <div class="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
      <RouterLink :to="`/${role}/ict-lab`" class="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Back to the ICT Lab">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </RouterLink>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">ICT Lab · How a computer works</p>
        <h1 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight">Binary and storage</h1>
      </div>
    </div>

    <!-- the three parts -->
    <div class="mb-4 grid grid-cols-3 gap-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1" role="tablist">
      <button v-for="(p, i) in PARTS" :key="p.key" type="button" role="tab" :aria-selected="part === p.key" class="rounded-lg px-2 py-2 text-left sm:text-center transition-colors" :class="part === p.key ? 'bg-indigo-600 text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'" @click="setPart(p.key)">
        <p class="text-xs sm:text-sm font-bold">{{ i + 1 }}. {{ p.label }} <span v-if="doneParts.has(p.key)">✓</span></p>
        <p class="hidden sm:block text-[11px] opacity-80">{{ p.hint }}</p>
      </button>
    </div>

    <!-- ===================== 1 & 2. The bulbs ===================== -->
    <div v-if="part !== 'storage'" class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_21rem] gap-4 items-start">
      <section class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 sm:p-5">
        <!-- the board: 8 bulbs, each with its switch and its value -->
        <div class="rounded-2xl bg-slate-800 p-3 sm:p-5 shadow-inner">
          <div class="grid grid-cols-8 gap-1.5 sm:gap-3">
            <button
              v-for="(v, i) in PLACE"
              :key="v"
              type="button"
              class="group flex flex-col items-center gap-1.5 sm:gap-2 disabled:cursor-default"
              :disabled="readOnly"
              :aria-label="`Switch for ${v}: ${bits[i] ? 'on' : 'off'}`"
              :aria-pressed="bits[i] === 1"
              @click="flip(i)"
            >
              <!-- the bulb -->
              <svg viewBox="0 0 40 52" class="w-full max-w-[3.25rem]">
                <circle v-if="bits[i]" cx="20" cy="18" r="19" fill="#fde047" opacity="0.35" class="glow" />
                <path d="M20 3a14 14 0 0 0-8 25.5c1.6 1.2 2.4 2.6 2.4 4.5v3h11.2v-3c0-1.9.8-3.3 2.4-4.5A14 14 0 0 0 20 3z" :fill="bits[i] ? '#fde047' : '#475569'" :stroke="bits[i] ? '#eab308' : '#334155'" stroke-width="1.5" />
                <path d="M15 22l2.5 4 2.5-4 2.5 4 2.5-4" fill="none" :stroke="bits[i] ? '#b45309' : '#1e293b'" stroke-width="1.3" />
                <rect x="14.4" y="37" width="11.2" height="7" rx="1.5" fill="#94a3b8" />
                <rect x="16" y="44" width="8" height="4" rx="2" fill="#64748b" />
              </svg>
              <!-- the switch -->
              <span class="w-7 h-12 sm:w-9 sm:h-14 rounded-lg p-1 flex flex-col transition-colors" :class="[bits[i] ? 'bg-emerald-500 justify-start' : 'bg-slate-600 justify-end', readOnly ? '' : 'group-hover:ring-2 ring-white/60']">
                <span class="block h-1/2 rounded-md bg-white shadow"></span>
              </span>
              <span class="text-lg sm:text-2xl font-bold font-mono" :class="bits[i] ? 'text-emerald-300' : 'text-slate-400'">{{ bits[i] }}</span>
              <span class="text-[10px] sm:text-xs font-semibold text-slate-300 tabular-nums">{{ v }}</span>
            </button>
          </div>
          <!-- what it adds up to -->
          <div class="mt-4 rounded-xl bg-slate-900/70 px-3 py-2.5 text-center">
            <p class="font-mono text-slate-300 text-xs sm:text-sm break-words">
              <template v-if="value">{{ sumText }} = </template><b class="text-white text-lg sm:text-2xl">{{ readOnly && !answered ? '?' : value }}</b>
              <span v-if="part === 'letters' && (!readOnly || answered) && letterOf(value)" class="ml-2 text-amber-300 text-lg sm:text-2xl font-bold">= "{{ letterOf(value) }}"</span>
            </p>
          </div>
        </div>
        <div class="mt-3 flex flex-wrap items-center gap-2">
          <button v-if="!readOnly" type="button" class="btn-secondary !py-1.5 !text-sm" @click="bits = [0, 0, 0, 0, 0, 0, 0, 0]">All off</button>
          <p class="text-xs text-gray-500 dark:text-gray-400">Each switch is a <b>bit</b> (1 = on, 0 = off). Eight bits make a <b>byte</b>. Each bulb is worth double the one on its right.</p>
        </div>

        <!-- your name in binary -->
        <div v-if="part === 'letters'" class="mt-4 rounded-xl border border-gray-200 dark:border-gray-700 p-3">
          <label class="text-sm font-bold text-gray-900 dark:text-white" for="nm">Your name in binary</label>
          <input id="nm" v-model="name" maxlength="12" class="mt-1.5 w-full sm:w-64 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-900 text-sm" placeholder="Type your name">
          <div v-if="name.trim()" class="mt-2 flex flex-wrap gap-1.5">
            <span v-for="(c, i) in nameLetters" :key="i" class="rounded-lg bg-slate-800 text-white px-2 py-1 font-mono text-xs"><b class="text-amber-300">{{ c }}</b> {{ byte(c.charCodeAt(0)) }}</span>
          </div>
          <p v-if="nameLetters.length" class="mt-1 text-xs text-gray-500">That is {{ nameLetters.length }} byte{{ nameLetters.length === 1 ? '' : 's' }} - {{ nameLetters.length * 8 }} bits.</p>
        </div>
      </section>

      <!-- the challenge -->
      <aside class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 lg:sticky lg:top-20">
        <template v-if="ch">
          <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
            <span class="font-semibold">Challenge {{ ci + 1 }} of {{ challenges.length }}</span>
            <span class="tabular-nums">{{ wrong }} wrong</span>
          </div>
          <div class="h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden mb-3">
            <div class="h-full bg-indigo-600 transition-all duration-500" :style="{ width: `${(ci / challenges.length) * 100}%` }"></div>
          </div>
          <p class="text-base font-bold text-gray-900 dark:text-white leading-snug">{{ ch.prompt }}</p>
          <p v-if="ch.help" class="mt-1 text-sm text-gray-600 dark:text-gray-300">{{ ch.help }}</p>

          <!-- make it: checked as the switches change -->
          <div v-if="ch.kind === 'make'" class="mt-3">
            <p v-if="value === ch.target" class="rounded-xl bg-emerald-50 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100 p-3 text-sm font-semibold">Yes! {{ byte(ch.target) }} = {{ ch.target }}{{ part === 'letters' ? ` = "${letterOf(ch.target)}"` : '' }}</p>
            <p v-else class="text-xs text-gray-500 dark:text-gray-400">Flip the switches. Now: {{ value }}{{ value > ch.target ? ' - too much, switch something off' : '' }}</p>
          </div>
          <!-- read it: choose -->
          <div v-else class="mt-3 space-y-1.5">
            <button v-for="o in ch.options" :key="o" type="button" class="w-full text-left rounded-xl border-2 px-3 py-2 text-sm font-semibold transition-colors disabled:cursor-default" :class="optClass(o)" :disabled="answered" @click="choose(o)">{{ o }}</button>
            <p v-if="answered" class="text-sm mt-1" :class="picked === ch.answer ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'">{{ picked === ch.answer ? 'Right!' : `It is ${ch.answer}.` }} {{ sumText }} = {{ value }}{{ part === 'letters' ? ` = "${letterOf(value)}"` : '' }}</p>
          </div>

          <div class="mt-4 flex justify-end">
            <button type="button" class="btn-primary !py-1.5 !text-sm" :disabled="!solved" @click="nextChallenge">{{ ci + 1 < challenges.length ? 'Next challenge' : 'Finish' }}</button>
          </div>
        </template>
        <template v-else>
          <div class="text-center py-2">
            <span class="mx-auto w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center"><AppIcon name="trophy" class="w-6 h-6" /></span>
            <p class="mt-2 text-base font-bold text-gray-900 dark:text-white">{{ part === 'bits' ? 'You can count in binary!' : 'You can read and write letters in binary!' }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-300">{{ wrong }} wrong answer{{ wrong === 1 ? '' : 's' }} · score {{ partScore }}%</p>
            <p class="mt-2 text-sm text-gray-700 dark:text-gray-200">{{ part === 'bits' ? 'With 8 bits a byte holds any number from 0 (all off) to 255 (all on) - 256 different values.' : 'Every letter you type is stored as one byte. A page of 2,000 letters takes about 2,000 bytes - 2 KB.' }}</p>
            <div class="mt-4 flex justify-center gap-2">
              <button type="button" class="btn-secondary !py-1.5 !text-sm" @click="startPart(part)">Again</button>
              <button type="button" class="btn-primary !py-1.5 !text-sm" @click="setPart(part === 'bits' ? 'letters' : 'storage')">Next part</button>
            </div>
          </div>
        </template>

        <!-- the letter codes -->
        <details v-if="part === 'letters'" class="mt-4 text-xs" open>
          <summary class="font-bold text-gray-500 dark:text-gray-400 cursor-pointer">Letter codes (ASCII)</summary>
          <div class="mt-1.5 grid grid-cols-4 gap-1 font-mono">
            <span v-for="n in 26" :key="n" class="rounded bg-gray-50 dark:bg-gray-700/60 px-1.5 py-0.5"><b>{{ String.fromCharCode(64 + n) }}</b> {{ 64 + n }}</span>
          </div>
        </details>
      </aside>
    </div>

    <!-- ===================== 3. Storage ===================== -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_21rem] gap-4 items-start">
      <section class="space-y-4">
        <!-- a. order the units -->
        <div class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
          <p class="text-sm font-bold text-gray-900 dark:text-white">a. Put the units in order - tap the smallest first</p>
          <div class="mt-2 flex flex-wrap gap-2">
            <button v-for="u in unitPool" :key="u.key" type="button" class="px-3 py-2 rounded-xl border-2 text-sm font-bold transition-colors disabled:cursor-default" :class="ordered.includes(u.key) ? 'border-emerald-400 bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200' : shake === u.key ? 'border-rose-400 bg-rose-50 text-rose-700 shake' : 'border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 hover:border-indigo-400'" :disabled="ordered.includes(u.key)" @click="tapUnit(u.key)">{{ u.label }}</button>
          </div>
          <!-- the ladder so far -->
          <div class="mt-3 flex flex-wrap items-center gap-1 text-xs">
            <template v-for="(k, i) in ordered" :key="k">
              <span class="px-2 py-1 rounded-lg bg-indigo-600 text-white font-bold">{{ UNITS.find(u => u.key === k)!.label }}</span>
              <span v-if="i + 1 < ordered.length" class="text-gray-500 font-semibold">×{{ UNITS.find(u => u.key === ordered[i + 1])!.times }} →</span>
            </template>
          </div>
          <p v-if="ordered.length === UNITS.length" class="mt-2 text-sm text-emerald-700 dark:text-emerald-300">8 bits = 1 byte, and each unit after that is 1,024 of the one before.</p>
        </div>

        <!-- b. fill the flash disk -->
        <div class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
          <p class="text-sm font-bold text-gray-900 dark:text-white">b. Fill a 16 GB flash disk</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">Tap a file to copy it on. See how fast videos fill it - and how many documents fit.</p>
          <div class="mt-3 flex items-center gap-3">
            <!-- the flash disk -->
            <svg viewBox="0 0 70 40" class="w-16 flex-shrink-0"><rect x="14" y="4" width="52" height="32" rx="5" fill="#1e3a8a" /><rect x="2" y="11" width="14" height="18" rx="2" fill="#cbd5e1" /><rect x="5" y="15" width="4" height="4" fill="#64748b" /><rect x="5" y="21" width="4" height="4" fill="#64748b" /><text x="40" y="24" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">16 GB</text></svg>
            <div class="flex-1">
              <div class="h-7 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden flex">
                <div v-for="(seg, i) in segments" :key="i" class="h-full transition-all duration-500 border-r border-white/40" :style="{ width: `${seg.pct}%`, background: seg.color }" :title="seg.label"></div>
              </div>
              <p class="mt-1 text-xs text-gray-600 dark:text-gray-300 tabular-nums">{{ fmtSize(usedMB) }} used · <b>{{ fmtSize(DISK_MB - usedMB) }} free</b></p>
            </div>
          </div>
          <div class="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
            <button v-for="f in FILES" :key="f.key" type="button" class="text-left rounded-xl border border-gray-200 dark:border-gray-600 px-3 py-2 hover:border-indigo-400 transition-colors" @click="copyFile(f)">
              <span class="inline-block w-2.5 h-2.5 rounded-sm mr-1" :style="{ background: f.color }"></span>
              <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ f.label }}</span>
              <span class="block text-[11px] text-gray-500">{{ fmtSize(f.mb) }}{{ copies[f.key] ? ` · ${copies[f.key]} copied` : '' }}</span>
            </button>
          </div>
          <div class="mt-2 flex items-center gap-2">
            <p v-if="diskMsg" class="flex-1 text-sm font-semibold" :class="diskMsg.bad ? 'text-rose-700 dark:text-rose-300' : 'text-emerald-700 dark:text-emerald-300'">{{ diskMsg.text }}</p>
            <button type="button" class="ml-auto btn-secondary !py-1 !text-xs" @click="emptyDisk">Empty the disk</button>
          </div>
        </div>
      </section>

      <!-- c. questions -->
      <aside class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 lg:sticky lg:top-20">
        <template v-if="sq">
          <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
            <span class="font-semibold">c. Question {{ si + 1 }} of {{ STORAGE_Q.length }}</span>
            <span class="tabular-nums">{{ wrong }} wrong</span>
          </div>
          <p class="text-base font-bold text-gray-900 dark:text-white leading-snug">{{ sq.q }}</p>
          <div class="mt-3 space-y-1.5">
            <button v-for="o in sq.options" :key="o" type="button" class="w-full text-left rounded-xl border-2 px-3 py-2 text-sm font-semibold transition-colors disabled:cursor-default" :class="sqClass(o)" :disabled="spicked !== null" @click="answerStorage(o)">{{ o }}</button>
          </div>
          <p v-if="spicked !== null" class="mt-2 text-sm" :class="spicked === sq.a ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'">{{ spicked === sq.a ? 'Right!' : `It is ${sq.a}.` }} {{ sq.why }}</p>
          <div class="mt-3 flex justify-end">
            <button type="button" class="btn-primary !py-1.5 !text-sm" :disabled="spicked === null" @click="nextStorage">{{ si + 1 < STORAGE_Q.length ? 'Next question' : 'Finish' }}</button>
          </div>
          <p v-if="ordered.length < UNITS.length" class="mt-3 text-xs text-gray-500">Order the units (a) first - it helps.</p>
        </template>
        <div v-else class="text-center py-2">
          <span class="mx-auto w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center"><AppIcon name="trophy" class="w-6 h-6" /></span>
          <p class="mt-2 text-base font-bold text-gray-900 dark:text-white">You know your storage sizes!</p>
          <p class="text-sm text-gray-600 dark:text-gray-300">{{ wrong }} wrong · score {{ partScore }}%</p>
          <button type="button" class="mt-3 btn-secondary !py-1.5 !text-sm" @click="startPart('storage')">Again</button>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import AppIcon from '@/components/common/AppIcon.vue'
import { labRoleOf } from '@/components/ictlab/types'

const route = useRoute()
const role = computed(() => labRoleOf(route.path))

type Part = 'bits' | 'letters' | 'storage'
const PARTS: { key: Part; label: string; hint: string }[] = [
  { key: 'bits', label: 'Bits and bytes', hint: 'count in binary' },
  { key: 'letters', label: 'Letters in binary', hint: 'how text is stored' },
  { key: 'storage', label: 'Storage sizes', hint: 'KB, MB, GB, TB' }
]
const part = ref<Part>('bits')
const doneParts = ref(new Set<Part>())
const wrong = ref(0)
const partScore = computed(() => Math.max(0, 100 - wrong.value * 10))
let started = Date.now()

// ------------------------------------------------------------ the bulbs
const PLACE = [128, 64, 32, 16, 8, 4, 2, 1]
const bits = ref([0, 0, 0, 0, 0, 0, 0, 0])
const value = computed(() => bits.value.reduce((s, b, i) => s + b * PLACE[i], 0))
const sumText = computed(() => PLACE.filter((_, i) => bits.value[i]).join(' + '))
const byte = (n: number) => n.toString(2).padStart(8, '0')
const letterOf = (n: number) => (n >= 65 && n <= 90 ? String.fromCharCode(n) : '')
// your name in binary: its letters A-Z
const name = ref('')
const nameLetters = computed(() => [...name.value.toUpperCase()].filter(c => c >= 'A' && c <= 'Z'))
const setBits = (n: number) => (bits.value = [...byte(n)].map(Number))
function flip(i: number) {
  if (readOnly.value) return
  const b = [...bits.value]
  b[i] = b[i] ? 0 : 1
  bits.value = b
}

// ------------------------------------------------------------ challenges (parts 1 and 2)
interface Challenge { kind: 'make' | 'read'; prompt: string; help?: string; target: number; options?: string[]; answer?: string }
const shuffle = <T,>(a: T[]) => [...a].sort(() => Math.random() - 0.5)
const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)]
function numberOptions(n: number) {
  const s = new Set([n])
  // near misses: a bit read the wrong way round, one bulb off or on
  for (const m of [parseInt([...byte(n)].reverse().join(''), 2), n ^ 1, n ^ 16, n + 8, n - 2]) if (m >= 0 && m <= 255 && s.size < 4) s.add(m)
  while (s.size < 4) s.add(Math.floor(Math.random() * 256))
  return shuffle([...s].map(String))
}
function makeBits(): Challenge[] {
  const easy = pick([3, 5, 6, 9, 10, 12])
  const mid = pick([13, 21, 25, 37, 42, 50])
  const big = pick([100, 129, 150, 200, 77])
  const read1 = pick([7, 11, 18, 24, 33])
  const read2 = pick([65, 96, 130, 170, 240])
  return [
    { kind: 'make', prompt: `Make the number ${easy}`, help: 'Switch on the bulbs that add up to it. Start from the biggest that fits.', target: easy },
    { kind: 'make', prompt: `Make ${mid}`, target: mid },
    { kind: 'read', prompt: 'What number is this?', target: read1, options: numberOptions(read1), answer: String(read1) },
    { kind: 'make', prompt: `Make ${big}`, target: big },
    { kind: 'make', prompt: 'Make the biggest number one byte can hold', help: 'What happens when every bulb is on?', target: 255 },
    { kind: 'read', prompt: 'And this one?', target: read2, options: numberOptions(read2), answer: String(read2) }
  ]
}
function makeLetters(): Challenge[] {
  const word = pick(['ICT', 'BIT', 'CPU', 'RAM', 'USB', 'KEY'])
  const mystery = shuffle(['H', 'Z', 'M', 'W', 'S', 'E', 'P']).slice(0, 2)
  const letterOpts = (c: string) => shuffle([c, ...shuffle([...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].filter(x => x !== c)).slice(0, 3)])
  return [
    ...[...word].map((c, i): Challenge => ({ kind: 'make', prompt: `Spell "${word}" - letter ${i + 1}: make the code for ${c}`, help: `${c} is number ${c.charCodeAt(0)} - look it up in the letter codes.`, target: c.charCodeAt(0) })),
    ...mystery.map((c): Challenge => ({ kind: 'read', prompt: 'A mystery byte arrived. Which letter is it?', help: 'Add up the bulbs, then find the number in the letter codes.', target: c.charCodeAt(0), options: letterOpts(c), answer: c }))
  ]
}
const challenges = ref<Challenge[]>([])
const ci = ref(0)
const ch = computed(() => challenges.value[ci.value] || null)
const picked = ref<string | null>(null)
const answered = computed(() => picked.value !== null)
const readOnly = computed(() => ch.value?.kind === 'read')
const solved = computed(() => (ch.value?.kind === 'make' ? value.value === ch.value.target : answered.value))

function startPart(p: Part) {
  part.value = p
  wrong.value = 0
  started = Date.now()
  picked.value = null
  ci.value = 0
  if (p === 'bits') challenges.value = makeBits()
  if (p === 'letters') challenges.value = makeLetters()
  if (p === 'storage') startStorage()
  prepare()
}
function setPart(p: Part) {
  startPart(p)
}
// each challenge starts with the bulbs ready: off to make a number, showing the byte to read one
function prepare() {
  const c = ch.value
  if (!c) return
  if (c.kind === 'read') setBits(c.target)
  else bits.value = [0, 0, 0, 0, 0, 0, 0, 0]
}
function choose(o: string) {
  if (answered.value || !ch.value) return
  picked.value = o
  if (o !== ch.value.answer) wrong.value++
}
function optClass(o: string) {
  if (!answered.value) return 'border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 hover:border-indigo-400 hover:bg-indigo-50/60 dark:hover:bg-indigo-900/20'
  if (o === ch.value?.answer) return 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200'
  if (o === picked.value) return 'border-rose-400 bg-rose-50 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200'
  return 'border-gray-200 dark:border-gray-700 text-gray-400'
}
function nextChallenge() {
  if (!solved.value) return
  picked.value = null
  ci.value++
  if (ci.value >= challenges.value.length) return finishPart()
  prepare()
}

// ------------------------------------------------------------ storage (part 3)
const UNITS = [
  { key: 'bit', label: 'bit', times: 1 },
  { key: 'byte', label: 'byte', times: 8 },
  { key: 'kb', label: 'kilobyte (KB)', times: 1024 },
  { key: 'mb', label: 'megabyte (MB)', times: 1024 },
  { key: 'gb', label: 'gigabyte (GB)', times: 1024 },
  { key: 'tb', label: 'terabyte (TB)', times: 1024 }
]
const unitPool = ref(shuffle(UNITS))
const ordered = ref<string[]>([])
const shake = ref<string | null>(null)
function tapUnit(k: string) {
  if (ordered.value.includes(k)) return
  if (UNITS[ordered.value.length].key === k) ordered.value = [...ordered.value, k]
  else {
    wrong.value++
    shake.value = k
    setTimeout(() => (shake.value = null), 500)
  }
}

const DISK_MB = 16 * 1024
const FILES = [
  { key: 'doc', label: 'Document', mb: 0.05, color: '#2563eb' },
  { key: 'photo', label: 'Photo', mb: 3, color: '#16a34a' },
  { key: 'song', label: 'Song', mb: 4, color: '#9333ea' },
  { key: 'video', label: 'Video clip', mb: 300, color: '#ea580c' },
  { key: 'film', label: 'Film', mb: 1500, color: '#dc2626' },
  { key: 'game', label: 'Game', mb: 6144, color: '#0f172a' }
]
const copies = ref<Record<string, number>>({})
const diskMsg = ref<{ text: string; bad?: boolean } | null>(null)
const usedMB = computed(() => FILES.reduce((s, f) => s + (copies.value[f.key] || 0) * f.mb, 0))
const segments = computed(() => FILES.filter(f => copies.value[f.key]).map(f => ({ pct: ((copies.value[f.key] * f.mb) / DISK_MB) * 100, color: f.color, label: `${copies.value[f.key]} × ${f.label}` })))
const fmtSize = (mb: number) => (mb >= 1024 ? `${(mb / 1024).toFixed(mb >= 10240 ? 0 : 1)} GB` : mb >= 1 ? `${Math.round(mb)} MB` : `${Math.round(mb * 1024)} KB`)
function copyFile(f: { key: string; label: string; mb: number }) {
  if (usedMB.value + f.mb > DISK_MB) {
    diskMsg.value = { text: `Not enough space for a ${f.label.toLowerCase()} (${fmtSize(f.mb)}) - only ${fmtSize(DISK_MB - usedMB.value)} free. The disk is full!`, bad: true }
    return
  }
  copies.value = { ...copies.value, [f.key]: (copies.value[f.key] || 0) + 1 }
  const fit = Math.floor((DISK_MB - usedMB.value) / f.mb)
  diskMsg.value = { text: `Copied. ${fit.toLocaleString()} more ${f.label.toLowerCase()}${fit === 1 ? '' : 's'} like that would still fit.` }
}
function emptyDisk() {
  copies.value = {}
  diskMsg.value = null
}

const STORAGE_Q = [
  { q: 'How many bits make one byte?', options: ['8', '2', '10', '1,024'], a: '8', why: 'One byte = 8 bits - enough to store one letter.' },
  { q: '1 kilobyte (KB) is how many bytes?', options: ['1,024', '1,000,000', '100', '8'], a: '1,024', why: 'In computers each step up is 1,024 (2 to the power 10) - near enough a thousand.' },
  { q: 'Which is bigger?', options: ['1 GB', '900 MB', 'They are the same', '1,000 KB'], a: '1 GB', why: '1 GB = 1,024 MB, which is more than 900 MB.' },
  { q: 'A song is 4 MB. About how many fit on a 1 GB flash disk?', options: ['256', '25', '4', '4,000'], a: '256', why: '1 GB = 1,024 MB, and 1,024 ÷ 4 = 256.' },
  { q: 'A film is 2 GB. How many fit on a 16 GB flash disk?', options: ['8', '16', '32', '2'], a: '8', why: '16 ÷ 2 = 8.' },
  { q: 'Which can hold the most?', options: ['1 TB hard disk', '32 GB flash disk', 'DVD (4.7 GB)', 'CD (700 MB)'], a: '1 TB hard disk', why: '1 TB = 1,024 GB - far more than the others.' }
]
const si = ref(0)
const spicked = ref<string | null>(null)
const shuffledQ = ref(STORAGE_Q.map(q => ({ ...q, options: shuffle(q.options) })))
const sq = computed(() => shuffledQ.value[si.value] || null)
function startStorage() {
  unitPool.value = shuffle(UNITS)
  ordered.value = []
  emptyDisk()
  si.value = 0
  spicked.value = null
  shuffledQ.value = STORAGE_Q.map(q => ({ ...q, options: shuffle(q.options) }))
}
function answerStorage(o: string) {
  if (spicked.value !== null || !sq.value) return
  spicked.value = o
  if (o !== sq.value.a) wrong.value++
}
function sqClass(o: string) {
  if (spicked.value === null) return 'border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 hover:border-indigo-400 hover:bg-indigo-50/60 dark:hover:bg-indigo-900/20'
  if (o === sq.value?.a) return 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200'
  if (o === spicked.value) return 'border-rose-400 bg-rose-50 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200'
  return 'border-gray-200 dark:border-gray-700 text-gray-400'
}
function nextStorage() {
  spicked.value = null
  si.value++
  if (si.value >= STORAGE_Q.length) finishPart()
}

// ------------------------------------------------------------ saving a finished part
async function finishPart() {
  const p = part.value
  doneParts.value = new Set([...doneParts.value, p])
  if (role.value !== 'student') return
  try {
    // An attempt scores 100 - 5 per mistake: each wrong answer counts as two (10% each)
    await axios.post('/api/student/ict-lab/attempts', {
      activity_key: `binary-${p}`, level: 'simple', steps_total: p === 'storage' ? STORAGE_Q.length : challenges.value.length,
      mistakes: wrong.value * 2, hints_used: 0, duration_seconds: Math.round((Date.now() - started) / 1000)
    })
  } catch {
    // shown anyway
  }
}

startPart('bits')

// parts already finished show their tick
onMounted(async () => {
  if (role.value !== 'student') return
  try {
    const res = await axios.get('/api/student/ict-lab')
    const keys = ((res.data.data.progress || []) as { activity_key: string }[]).map(p => p.activity_key)
    doneParts.value = new Set(PARTS.map(p => p.key).filter(k => keys.includes(`binary-${k}`)))
  } catch {
    // ticks come back as parts are finished
  }
})
</script>

<style scoped>
.glow {
  animation: glow 1.4s ease-in-out infinite;
}
@keyframes glow {
  50% { opacity: 0.15; }
}
.shake {
  animation: shake 0.4s;
}
@keyframes shake {
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}
</style>
