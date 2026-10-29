<template>
  <!-- Boot-up and BIOS: what happens between pressing Power and the desktop, on a monitor with
       an on-screen key strip (the real keyboard works too). 1. Watch it start: power, POST, the
       boot device, loading the operating system. 2. Fix "no boot device": restart, press DEL in
       time, change the boot order in BIOS Setup, save and exit. 3. Fix a reset clock (CMOS
       battery). 4. Shut down right: what to do at the end of the day, when a program or the whole
       computer freezes, when the power goes, and for printers, routers and phones (Subsidiary ICT
       Topic 1). 5. A short check. Each finished part is saved for students (boot-startup,
       boot-bootfix, boot-cmos, boot-shutdown, boot-check). -->
  <div>
    <div class="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
      <RouterLink :to="`/${role}/ict-lab`" class="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Back to the ICT Lab">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </RouterLink>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">ICT Lab · S.5 Topic 1 · Introduction to ICTs</p>
        <h1 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight">Start-up, BIOS and shut-down</h1>
      </div>
    </div>

    <div class="mb-4 grid grid-cols-2 sm:grid-cols-5 gap-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1" role="tablist">
      <button v-for="(p, i) in PARTS" :key="p.key" type="button" role="tab" :aria-selected="part === p.key" class="rounded-lg px-2 py-2 text-left sm:text-center transition-colors" :class="part === p.key ? 'bg-indigo-600 text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'" @click="setPart(p.key)">
        <p class="text-xs sm:text-sm font-bold">{{ i + 1 }}. {{ p.label }} <span v-if="done.has(p.key)">✓</span></p>
        <p class="hidden sm:block text-[11px] opacity-80">{{ p.hint }}</p>
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_21rem] gap-4 items-start">
      <!-- ===================== the computer ===================== -->
      <section v-if="part !== 'check' && part !== 'shutdown'" class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 sm:p-4">
        <!-- the monitor -->
        <div class="mx-auto max-w-3xl rounded-2xl bg-gray-900 p-2.5 sm:p-3 shadow-lg">
          <div class="relative aspect-[16/10] rounded-md overflow-hidden bg-black text-[11px] sm:text-sm leading-snug font-mono select-none">
            <!-- off -->
            <div v-if="screen === 'off'" class="absolute inset-0 flex items-center justify-center text-gray-600 text-xs font-sans">{{ part === 'startup' ? 'Press the power button to start.' : 'The computer is off.' }}</div>

            <!-- POST -->
            <div v-else-if="screen === 'post'" class="absolute inset-0 p-3 sm:p-5 text-gray-200">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="text-white font-bold">TUSOME LAB PC  -  UEFI BIOS v2.18</p>
                  <p class="text-gray-400">Power-On Self Test (POST)</p>
                </div>
                <div class="rounded border-2 border-emerald-500 text-emerald-400 font-bold px-2 py-1 text-center leading-tight"><p class="text-base sm:text-xl">T</p><p class="text-[9px]">TUSOME</p></div>
              </div>
              <div class="mt-3 space-y-0.5">
                <p v-for="(l, i) in postLines" :key="i" :class="l.tone === 'bad' ? 'text-rose-400' : l.tone === 'ok' ? 'text-emerald-400' : l.tone === 'warn' ? 'text-amber-300' : ''">{{ l.text }}</p>
              </div>
              <p v-if="setupWindow" class="absolute left-3 sm:left-5 bottom-3 sm:bottom-5 text-white bg-gray-800 px-2 py-1 animate-pulse">{{ setupKeyText }}</p>
            </div>

            <!-- an error -->
            <div v-else-if="screen === 'error'" class="absolute inset-0 p-3 sm:p-5 text-gray-200">
              <p v-for="(l, i) in errorLines" :key="i" class="mb-1">{{ l }}</p>
              <p class="mt-2 inline-block bg-gray-200 w-2 h-4 animate-pulse"></p>
            </div>

            <!-- BIOS Setup -->
            <div v-else-if="screen === 'setup'" class="absolute inset-0 flex flex-col bg-[#0b2d6b] text-gray-100">
              <div class="flex items-center justify-between px-2 sm:px-3 py-1 bg-[#123f8f] text-white">
                <span class="font-bold">BIOS Setup Utility</span><span class="text-gray-300 text-[10px] sm:text-xs">{{ biosDate }} {{ biosTime }}</span>
              </div>
              <div class="flex border-b border-[#2b5cb8] text-[10px] sm:text-xs">
                <button v-for="t in TABS" :key="t" type="button" class="px-2 sm:px-3 py-1" :class="tab === t ? 'bg-gray-200 text-[#0b2d6b] font-bold' : 'text-gray-200 hover:bg-[#123f8f]'" @click="tab = t; sel = 0; picking = null">{{ t }}</button>
              </div>
              <div class="flex-1 grid grid-cols-[minmax(0,1fr)_34%] min-h-0">
                <div class="p-2 sm:p-3 overflow-y-auto">
                  <button v-for="(it, i) in items" :key="it.key" type="button" class="w-full flex items-center gap-2 px-1.5 py-[3px] sm:py-1 text-left" :class="sel === i ? 'bg-gray-200 text-[#0b2d6b]' : ''" @click="selectItem(i)">
                    <span class="flex-1 truncate" :class="it.info ? 'text-gray-300' : ''">{{ it.label }}</span>
                    <span class="truncate" :class="sel === i ? 'font-bold' : it.info ? 'text-gray-300' : 'text-white'">{{ it.action ? '' : `[${valueOf(it)}]` }}</span>
                  </button>
                  <!-- the choices for the item picked -->
                  <div v-if="picking" class="mt-2 border-2 border-gray-200 bg-[#0b2d6b] p-1.5">
                    <p class="text-[10px] sm:text-xs text-amber-300 mb-1">{{ picking.label }} - choose:</p>
                    <button v-for="o in picking.options" :key="o" type="button" class="block w-full text-left px-1.5 py-0.5 hover:bg-gray-200 hover:text-[#0b2d6b]" :class="valueOf(picking) === o ? 'text-amber-300' : ''" @click="setValue(picking, o)">{{ o }}</button>
                  </div>
                </div>
                <div class="border-l border-[#2b5cb8] p-2 sm:p-3 text-[10px] sm:text-xs text-gray-300 overflow-y-auto">
                  <p class="text-white font-bold mb-1">Help</p>
                  <p>{{ items[sel]?.help }}</p>
                  <p class="mt-3 text-gray-400 hidden sm:block">Tap an item to change it. In a real BIOS you move with the arrow keys and press Enter.</p>
                </div>
              </div>
              <div class="px-2 sm:px-3 py-1 bg-[#123f8f] text-[9px] sm:text-[11px] text-gray-200">← → tabs · ↑ ↓ items · Enter change · F10 save and exit · Esc exit</div>
              <!-- save? -->
              <div v-if="confirm" class="absolute inset-0 flex items-center justify-center bg-black/40">
                <div class="bg-gray-200 text-[#0b2d6b] border-4 border-double border-[#0b2d6b] p-3 w-64 text-center">
                  <p class="font-bold">{{ confirm === 'save' ? 'Save configuration and reset?' : 'Discard changes and exit?' }}</p>
                  <div class="mt-3 flex justify-center gap-3">
                    <button type="button" class="px-3 py-0.5 bg-[#0b2d6b] text-white" @click="confirmYes">Yes</button>
                    <button type="button" class="px-3 py-0.5 border border-[#0b2d6b]" @click="confirm = null">No</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- loading the operating system -->
            <div v-else-if="screen === 'loading'" class="absolute inset-0 flex flex-col items-center justify-center bg-black text-white font-sans">
              <div class="grid grid-cols-2 gap-1"><span v-for="n in 4" :key="n" class="w-6 h-6 sm:w-8 sm:h-8 bg-sky-500"></span></div>
              <div class="mt-6 w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              <p class="mt-3 text-xs text-gray-300">Starting the operating system...</p>
            </div>

            <!-- the desktop -->
            <div v-else-if="screen === 'desktop'" class="absolute inset-0 font-sans" style="background: linear-gradient(135deg, #0f5b33, #22a45d)">
              <div class="absolute left-3 top-3 space-y-3">
                <div v-for="ic in ['Tusome', 'Files', 'Browser']" :key="ic" class="w-14 text-center text-white text-[10px]"><div class="mx-auto w-8 h-8 rounded-lg bg-white/85 mb-0.5"></div>{{ ic }}</div>
              </div>
              <div class="absolute inset-0 flex items-center justify-center"><div class="rounded-xl bg-white/90 px-5 py-3 text-center text-gray-900 shadow-xl"><p class="text-base font-bold">Welcome!</p><p class="text-xs">The computer started correctly.</p></div></div>
              <div class="absolute bottom-0 inset-x-0 h-6 bg-black/50 flex items-center justify-end px-2 text-[10px] text-white">{{ biosTime }}  {{ biosDate }}</div>
            </div>
          </div>
        </div>
        <!-- the stand, the power button and the keys -->
        <div class="mx-auto w-24 h-5 bg-gray-700 rounded-b-lg"></div>
        <div class="mt-3 flex flex-wrap items-center justify-center gap-1.5">
          <button type="button" class="w-11 h-11 rounded-full border-4 flex items-center justify-center transition-colors" :class="screen === 'off' ? 'border-gray-300 text-gray-500 hover:border-emerald-500 hover:text-emerald-600' : 'border-emerald-500 text-emerald-600'" title="Power button" aria-label="Power button" @click="power">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" d="M12 3v8M7.5 6.5a7 7 0 1 0 9 0" /></svg>
          </button>
          <button v-if="screen !== 'off'" type="button" class="h-9 px-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-xs font-semibold text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600" @click="restart">Restart</button>
          <span class="w-3"></span>
          <button v-for="k in KEYS" :key="k" type="button" class="h-9 min-w-[2.5rem] px-2 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-xs font-bold text-gray-800 dark:text-gray-100 shadow-[0_2px_0_rgba(0,0,0,0.18)] active:translate-y-px" :class="flashKey === k ? 'bg-amber-300 border-amber-400 !text-gray-900' : ''" @click="press(k)">{{ k }}</button>
        </div>
      </section>

      <!-- ===================== shut down right ===================== -->
      <section v-else-if="part === 'shutdown'" class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-6">
        <template v-if="sq">
          <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
            <span class="font-semibold">Situation {{ sqi + 1 }} of {{ shuts.length }}</span>
            <span class="tabular-nums">{{ shutWrong }} wrong</span>
          </div>
          <div class="flex items-start gap-3">
            <span class="w-12 h-12 rounded-2xl bg-slate-800 text-white flex items-center justify-center flex-shrink-0 text-2xl" aria-hidden="true">{{ sq.icon }}</span>
            <div class="min-w-0">
              <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">{{ sq.device }}</p>
              <p class="text-lg font-bold text-gray-900 dark:text-white leading-snug">{{ sq.q }}</p>
            </div>
          </div>
          <p class="mt-3 text-sm font-semibold text-gray-700 dark:text-gray-200">What do you do?</p>
          <div class="mt-2 space-y-1.5 max-w-xl">
            <button v-for="o in sq.options" :key="o" type="button" class="w-full text-left rounded-xl border-2 px-3 py-2.5 text-sm font-semibold transition-colors disabled:cursor-default" :class="shutClass(o)" :disabled="sPicked !== null" @click="answerShut(o)">{{ o }}</button>
          </div>
          <p v-if="sPicked !== null" class="mt-2 text-sm max-w-xl" :class="sPicked === sq.a ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'">{{ sPicked === sq.a ? 'Right!' : `Best: ${sq.a}.` }} {{ sq.why }}</p>
          <div class="mt-3"><button type="button" class="btn-primary !py-1.5 !text-sm" :disabled="sPicked === null" @click="nextShut">{{ sqi + 1 < shuts.length ? 'Next situation' : 'Finish' }}</button></div>
        </template>
        <div v-else class="text-center py-4">
          <span class="mx-auto w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center"><AppIcon name="trophy" class="w-6 h-6" /></span>
          <p class="mt-2 text-xl font-bold text-gray-900 dark:text-white">{{ shutScore }}% - {{ shuts.length - shutWrong }} of {{ shuts.length }} right</p>
          <p class="mt-1 text-sm text-gray-700 dark:text-gray-200">Save, close, shut down from the menu - and force it off only when nothing else works.</p>
          <div class="mt-3 flex justify-center gap-2">
            <button type="button" class="btn-secondary !py-1.5 !text-sm" @click="startShut">Again</button>
            <button type="button" class="btn-primary !py-1.5 !text-sm" @click="setPart('check')">Next part</button>
          </div>
        </div>
      </section>

      <!-- ===================== the check ===================== -->
      <section v-else class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-6">
        <template v-if="cq">
          <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
            <span class="font-semibold">Question {{ cqi + 1 }} of {{ checks.length }}</span>
            <span class="tabular-nums">{{ checkWrong }} wrong</span>
          </div>
          <p class="text-lg font-bold text-gray-900 dark:text-white leading-snug">{{ cq.q }}</p>
          <div class="mt-3 space-y-1.5 max-w-xl">
            <button v-for="o in cq.options" :key="o" type="button" class="w-full text-left rounded-xl border-2 px-3 py-2.5 text-sm font-semibold transition-colors disabled:cursor-default" :class="optClass(o)" :disabled="cPicked !== null" @click="answerCheck(o)">{{ o }}</button>
          </div>
          <p v-if="cPicked !== null" class="mt-2 text-sm" :class="cPicked === cq.a ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'">{{ cPicked === cq.a ? 'Right!' : `It is: ${cq.a}.` }} {{ cq.why }}</p>
          <div class="mt-3"><button type="button" class="btn-primary !py-1.5 !text-sm" :disabled="cPicked === null" @click="nextCheck">{{ cqi + 1 < checks.length ? 'Next question' : 'Finish' }}</button></div>
        </template>
        <div v-else class="text-center py-4">
          <span class="mx-auto w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center"><AppIcon name="trophy" class="w-6 h-6" /></span>
          <p class="mt-2 text-xl font-bold text-gray-900 dark:text-white">{{ checkScore }}% - {{ checks.length - checkWrong }} of {{ checks.length }} right</p>
          <p class="mt-1 text-sm text-gray-700 dark:text-gray-200">Power → POST → boot device → operating system loaded into RAM → desktop.</p>
          <button type="button" class="mt-3 btn-secondary !py-1.5 !text-sm" @click="startCheck">Again</button>
        </div>
      </section>

      <!-- ===================== the guide ===================== -->
      <aside class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 lg:sticky lg:top-20">
        <template v-if="part === 'startup'">
          <p class="text-sm font-bold text-gray-900 dark:text-white mb-2">What happens when you press Power</p>
          <ol class="space-y-2">
            <li v-for="(s, i) in STAGES" :key="s.title" class="flex gap-2.5">
              <span class="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[11px] font-bold transition-colors" :class="stage > i ? 'bg-emerald-600 text-white' : stage === i ? 'bg-indigo-600 text-white animate-pulse' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'">{{ stage > i ? '✓' : i + 1 }}</span>
              <div>
                <p class="text-sm font-semibold" :class="stage >= i ? 'text-gray-900 dark:text-white' : 'text-gray-400'">{{ s.title }}</p>
                <p v-if="stage >= i" class="text-xs text-gray-600 dark:text-gray-300">{{ s.text }}</p>
              </div>
            </li>
          </ol>
          <p v-if="stage >= STAGES.length" class="mt-3 text-sm font-semibold text-emerald-700 dark:text-emerald-300">That is booting. It takes seconds - and happens every time you switch on.</p>
        </template>

        <template v-else-if="part === 'bootfix' || part === 'cmos'">
          <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">{{ part === 'bootfix' ? 'The fault' : 'The fault' }}</p>
          <p class="text-sm font-bold text-gray-900 dark:text-white">{{ part === 'bootfix' ? '"Reboot and select proper boot device"' : 'The clock keeps going back to 2009' }}</p>
          <p class="mt-1 text-sm text-gray-700 dark:text-gray-200">{{ part === 'bootfix' ? 'A student changed the BIOS settings. Now the computer will not start Windows. The disk is fine - the BIOS is looking in the wrong places.' : 'The computer says "CMOS checksum bad" when it starts, and the date and time are wrong.' }}</p>
          <ul class="mt-3 space-y-1.5">
            <li v-for="(g, i) in goals" :key="i" class="flex items-start gap-2 text-sm" :class="g.done ? 'text-gray-500 dark:text-gray-400' : i === goals.findIndex(x => !x.done) ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-600 dark:text-gray-300'">
              <span class="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold" :class="g.done ? 'bg-emerald-600 text-white' : 'border-2 border-gray-300 dark:border-gray-600'">{{ g.done ? '✓' : '' }}</span>
              <span :class="g.done ? 'line-through' : ''">{{ g.text }}</span>
            </li>
          </ul>
          <p v-if="tip" class="mt-3 text-sm rounded-xl px-3 py-2" :class="tip.bad ? 'bg-rose-50 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200' : 'bg-indigo-50 text-indigo-900 dark:bg-indigo-900/30 dark:text-indigo-100'">{{ tip.text }}</p>

          <!-- after the clock is fixed: what really fixes it -->
          <div v-if="part === 'cmos' && cmosFixed && !cmosAnswered" class="mt-3 rounded-xl border-2 border-indigo-200 dark:border-indigo-800 p-3">
            <p class="text-sm font-bold text-gray-900 dark:text-white">The clock is right again. But tomorrow, after the computer was unplugged overnight, it shows 2009 again. What fixes it for good?</p>
            <div class="mt-2 space-y-1.5">
              <button v-for="o in CMOS_FIX" :key="o" type="button" class="w-full text-left rounded-lg border-2 border-gray-200 dark:border-gray-600 px-2.5 py-1.5 text-sm font-semibold hover:border-indigo-400" @click="answerCmos(o)">{{ o }}</button>
            </div>
          </div>
          <div v-if="partDone" class="mt-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 p-3 text-sm text-emerald-900 dark:text-emerald-100">
            <b>Fixed!</b> {{ part === 'bootfix' ? 'The BIOS now looks on the SSD first, finds the operating system, and the computer starts.' : 'Setting the clock works for today; a new CR2032 CMOS battery keeps the settings when the power is off.' }}
            <span class="block mt-1 text-xs">{{ mistakes }} wrong move{{ mistakes === 1 ? '' : 's' }} · score {{ Math.max(0, 100 - mistakes * 10) }}%</span>
            <button type="button" class="mt-2 btn-primary !py-1 !text-xs" @click="setPart(part === 'bootfix' ? 'cmos' : 'shutdown')">Next part</button>
          </div>
        </template>

        <template v-else-if="part === 'shutdown'">
          <p class="text-sm font-bold text-gray-900 dark:text-white">Ways to switch off</p>
          <dl class="mt-2 space-y-2 text-sm">
            <div v-for="w in SWITCH_OFF" :key="w[0]">
              <dt class="font-bold text-gray-900 dark:text-white">{{ w[0] }}</dt>
              <dd class="text-gray-600 dark:text-gray-300">{{ w[1] }}</dd>
            </div>
          </dl>
        </template>

        <template v-else>
          <p class="text-sm font-bold text-gray-900 dark:text-white">Words to know</p>
          <dl class="mt-2 space-y-1.5 text-sm">
            <div v-for="t in TERMS" :key="t[0]"><dt class="inline font-bold text-gray-900 dark:text-white">{{ t[0] }}:</dt> <dd class="inline text-gray-600 dark:text-gray-300">{{ t[1] }}</dd></div>
          </dl>
        </template>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import AppIcon from '@/components/common/AppIcon.vue'
import { labRoleOf } from '@/components/ictlab/types'

const route = useRoute()
const role = computed(() => labRoleOf(route.path))

type Part = 'startup' | 'bootfix' | 'cmos' | 'shutdown' | 'check'
const PARTS: { key: Part; label: string; hint: string }[] = [
  { key: 'startup', label: 'Watch it start', hint: 'power to desktop' },
  { key: 'bootfix', label: 'No boot device', hint: 'change the boot order' },
  { key: 'cmos', label: 'Wrong clock', hint: 'the CMOS battery' },
  { key: 'shutdown', label: 'Shut down right', hint: '7 situations' },
  { key: 'check', label: 'Check', hint: '5 questions' }
]
const part = ref<Part>('startup')
const done = ref(new Set<Part>())
const KEYS = ['Esc', 'F1', 'F2', 'F10', 'Del', 'Enter']
const TERMS = [
  ['Booting', 'Starting a computer: from power on until the operating system is ready.'],
  ['BIOS / UEFI', 'Firmware - a small program kept on a chip on the motherboard. It checks the hardware and starts the operating system.'],
  ['POST', 'Power-On Self Test: the BIOS checks the processor, memory, keyboard and drives.'],
  ['Boot device', 'The drive the operating system is started from - usually the SSD or hard disk.'],
  ['CMOS battery', 'A coin cell that keeps the BIOS settings and the clock while the computer is off.']
]
let started = Date.now()
async function save(p: Part, steps: number, wrong: number, per: number) {
  done.value = new Set([...done.value, p])
  if (role.value !== 'student') return
  try {
    await axios.post('/api/student/ict-lab/attempts', {
      activity_key: `boot-${p}`, level: 'simple', steps_total: steps, mistakes: wrong * per, hints_used: 0, duration_seconds: Math.round((Date.now() - started) / 1000)
    })
  } catch {
    // shown anyway
  }
}
onMounted(async () => {
  window.addEventListener('keydown', onKeydown)
  if (role.value !== 'student') return
  try {
    const res = await axios.get('/api/student/ict-lab')
    const keys = ((res.data.data.progress || []) as { activity_key: string }[]).map(p => p.activity_key)
    done.value = new Set(PARTS.map(p => p.key).filter(k => keys.includes(`boot-${k}`)))
  } catch {
    // ticks come back as parts are finished
  }
})

// ------------------------------------------------------------ the screen and timing
type Screen = 'off' | 'post' | 'error' | 'setup' | 'loading' | 'desktop'
const screen = ref<Screen>('off')
const postLines = ref<{ text: string; tone?: 'ok' | 'bad' | 'warn' }[]>([])
const errorLines = ref<string[]>([])
const setupWindow = ref(false)
const setupKeyText = ref('Press DEL to enter Setup')
const flashKey = ref<string | null>(null)
let timers: number[] = []
const later = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms))
function clearTimers() {
  timers.forEach(t => clearTimeout(t))
  timers = []
}
// one short beep: POST passed
function beep(freq = 880, ms = 140) {
  try {
    const ctx = new AudioContext()
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.frequency.value = freq
    o.type = 'square'
    g.gain.value = 0.04
    o.connect(g).connect(ctx.destination)
    o.start()
    o.stop(ctx.currentTime + ms / 1000)
    o.onended = () => ctx.close()
  } catch {
    // no sound - fine
  }
}

// ------------------------------------------------------------ BIOS settings
const TABS = ['Main', 'Advanced', 'Boot', 'Save & Exit'] as const
type Tab = typeof TABS[number]
interface Item { key: string; label: string; help: string; options?: string[]; info?: boolean; action?: 'save' | 'discard' | 'defaults' }
const SSD = 'Windows Boot Manager (SSD)'
const NET = 'Network: Realtek PXE'
const USB = 'USB: (no disk)'
const TODAY = (() => {
  const d = new Date()
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
})()
const NOW = (() => {
  const d = new Date()
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
})()
const DATES = ['01/01/2009', TODAY, '31/12/1999', '15/06/2030']
const TIMES = ['00:00', NOW, '12:00']
const ITEMS: Record<Tab, Item[]> = {
  Main: [
    { key: 'date', label: 'System Date', help: 'The date the computer keeps. It runs on the CMOS battery when the computer is off.', options: DATES },
    { key: 'time', label: 'System Time', help: 'The time the computer keeps.', options: TIMES },
    { key: 'ver', label: 'BIOS Version', help: 'The firmware on the motherboard\'s BIOS chip.', info: true },
    { key: 'cpu', label: 'Processor', help: 'The processor the BIOS found during POST.', info: true },
    { key: 'ram', label: 'Total Memory', help: 'The RAM the BIOS counted during POST.', info: true },
    { key: 'sata', label: 'SATA Port 1', help: 'The drive plugged into SATA port 1. It is detected - so the disk itself is fine.', info: true }
  ],
  Advanced: [
    { key: 'fan', label: 'CPU Fan Control', help: 'Auto speeds the fan up as the processor warms up.', options: ['Auto', 'Full speed'] },
    { key: 'usb', label: 'USB Legacy Support', help: 'Lets a USB keyboard work before the operating system starts.', options: ['Enabled', 'Disabled'] },
    { key: 'virt', label: 'Virtualization', help: 'Lets the processor run virtual machines.', options: ['Enabled', 'Disabled'] }
  ],
  Boot: [
    { key: 'b1', label: 'Boot Option #1', help: 'The first place the BIOS looks for an operating system to start.', options: [SSD, NET, USB, 'Disabled'] },
    { key: 'b2', label: 'Boot Option #2', help: 'Where it looks next if #1 has nothing to start.', options: [SSD, NET, USB, 'Disabled'] },
    { key: 'b3', label: 'Boot Option #3', help: 'Where it looks last.', options: [SSD, NET, USB, 'Disabled'] },
    { key: 'fast', label: 'Fast Boot', help: 'Skips some POST checks to start faster.', options: ['Disabled', 'Enabled'] }
  ],
  'Save & Exit': [
    { key: 'save', label: 'Save Changes and Reset', help: 'Keep the changes you made and restart the computer. (Same as F10.)', action: 'save' },
    { key: 'discard', label: 'Discard Changes and Exit', help: 'Forget the changes and restart.', action: 'discard' },
    { key: 'defaults', label: 'Restore Defaults', help: 'Put every setting back to the factory settings.', action: 'defaults' }
  ]
}
const INFO: Record<string, string> = { ver: 'v2.18', cpu: 'Intel Core i5-10400', ram: '8192 MB', sata: 'Samsung SSD 870 EVO 500GB' }
const DEFAULTS: Record<string, string> = { date: TODAY, time: NOW, fan: 'Auto', usb: 'Enabled', virt: 'Enabled', b1: SSD, b2: USB, b3: NET, fast: 'Disabled' }
const saved = ref<Record<string, string>>({ ...DEFAULTS })
const editing = ref<Record<string, string>>({ ...DEFAULTS })
const tab = ref<Tab>('Main')
const sel = ref(0)
const picking = ref<Item | null>(null)
const confirm = ref<'save' | 'discard' | null>(null)
const items = computed(() => ITEMS[tab.value])
const valueOf = (it: Item) => (it.info ? INFO[it.key] : editing.value[it.key])
const biosDate = computed(() => (screen.value === 'setup' ? editing.value.date : saved.value.date))
const biosTime = computed(() => (screen.value === 'setup' ? editing.value.time : saved.value.time))
function selectItem(i: number) {
  sel.value = i
  const it = items.value[i]
  if (it.action === 'save') confirm.value = 'save'
  else if (it.action === 'discard') confirm.value = 'discard'
  else if (it.action === 'defaults') {
    editing.value = { ...DEFAULTS }
    say('Defaults loaded - remember to save.')
  } else if (it.options) picking.value = it
}
function setValue(it: Item, v: string) {
  editing.value = { ...editing.value, [it.key]: v }
  picking.value = null
}
function confirmYes() {
  const c = confirm.value
  confirm.value = null
  if (c === 'save') {
    saved.value = { ...editing.value }
    flags.value.saved = true
  } else {
    editing.value = { ...saved.value }
    if (part.value !== 'startup') {
      mistakes.value++
      say('Discarding throws your changes away - the fault is still there.', true)
    }
  }
  reboot()
}

// ------------------------------------------------------------ the parts
const STAGES = [
  { title: 'Power on', text: 'The power supply sends power to the motherboard. Fans spin and the power light comes on.' },
  { title: 'POST', text: 'The BIOS checks the processor, memory (RAM), keyboard and drives. One short beep means all is well.' },
  { title: 'Find a boot device', text: 'The BIOS looks at the boot order and finds a drive with an operating system - here the SSD.' },
  { title: 'Load the operating system', text: 'The operating system is copied from the SSD into RAM, and the processor starts running it.' },
  { title: 'Ready', text: 'The desktop (or login screen) appears. The computer is ready to use.' }
]
const stage = ref(-1)
const mistakes = ref(0)
const tip = ref<{ text: string; bad?: boolean } | null>(null)
const flags = ref({ error: false, entered: false, saved: false, booted: false })
const cmosFixed = ref(false)
const cmosAnswered = ref(false)
const CMOS_FIX = ['Replace the CMOS battery (a CR2032 coin cell)', 'Buy a new hard disk', 'Install the operating system again', 'Set the clock again every morning']
const say = (text: string, bad = false) => (tip.value = { text, bad })

function setPart(p: Part) {
  clearTimers()
  part.value = p
  started = Date.now()
  mistakes.value = 0
  tip.value = null
  stage.value = -1
  flags.value = { error: false, entered: false, saved: false, booted: false }
  cmosFixed.value = false
  cmosAnswered.value = false
  screen.value = 'off'
  tab.value = 'Main'
  sel.value = 0
  picking.value = null
  confirm.value = null
  // each fault starts from settings someone got wrong
  if (p === 'bootfix') saved.value = { ...DEFAULTS, b1: NET, b2: USB, b3: 'Disabled' }
  else if (p === 'cmos') saved.value = { ...DEFAULTS, date: '01/01/2009', time: '00:00' }
  else saved.value = { ...DEFAULTS }
  editing.value = { ...saved.value }
  if (p === 'bootfix') say('Switch it on and see what happens.')
  if (p === 'cmos') say('Switch it on and read the start-up screen.')
  if (p === 'check') startCheck()
  if (p === 'shutdown') startShut()
}

const goals = computed(() => {
  if (part.value === 'bootfix') return [
    { text: 'Switch on and see the error', done: flags.value.error },
    { text: 'Restart, and press DEL while the logo shows to open BIOS Setup', done: flags.value.entered },
    { text: 'On the Boot tab, make the SSD Boot Option #1', done: saved.value.b1 === SSD },
    { text: 'Save changes and reset (F10, then Yes)', done: flags.value.saved && saved.value.b1 === SSD },
    { text: 'The computer starts', done: flags.value.booted }
  ]
  return [
    { text: 'Switch on and read the warning', done: flags.value.error },
    { text: 'Press F1 to open Setup', done: flags.value.entered },
    { text: 'On the Main tab, set today\'s date and the time', done: saved.value.date === TODAY && saved.value.time === NOW },
    { text: 'Save and reset - the computer starts', done: flags.value.booted },
    { text: 'Decide what fixes it for good', done: cmosAnswered.value }
  ]
})
const partDone = computed(() => (part.value === 'bootfix' || part.value === 'cmos') && goals.value.every(g => g.done))

// Power and restart
function power() {
  if (screen.value !== 'off') {
    clearTimers()
    screen.value = 'off'
    stage.value = -1
    return
  }
  boot()
}
function restart() {
  if (screen.value === 'setup') return say('Leave Setup with Save & Exit (or F10).')
  reboot()
}
function reboot() {
  clearTimers()
  screen.value = 'off'
  later(500, boot)
}

// Start-up: POST lines, then the boot device, then the operating system - or an error
function boot() {
  clearTimers()
  screen.value = 'post'
  postLines.value = []
  setupWindow.value = false
  stage.value = 0
  const p = part.value
  const cmosBad = p === 'cmos' && saved.value.date === '01/01/2009'
  const lines: [number, string, ('ok' | 'bad' | 'warn')?][] = [
    [300, 'Processor: Intel Core i5-10400 @ 2.90GHz ........ OK', 'ok'],
    [900, 'Memory test: 8192 MB ........................ OK', 'ok'],
    [1500, 'USB devices: keyboard, mouse ................ OK', 'ok'],
    [2000, 'SATA Port 1: Samsung SSD 870 EVO 500GB ...... OK', 'ok']
  ]
  later(250, () => (stage.value = 1))
  for (const [ms, text, tone] of lines) later(ms, () => postLines.value.push({ text, tone }))
  if (cmosBad) {
    later(2400, () => {
      postLines.value.push({ text: 'CMOS Checksum Bad - Default settings loaded', tone: 'bad' }, { text: 'CMOS battery low. System date and time not set.', tone: 'warn' }, { text: 'Press F1 to Run SETUP', tone: 'warn' })
      flags.value.error = true
      say('Read the warning on the screen - and press F1.')
      beep(440, 120)
      later(200, () => beep(440, 120))
    })
    return // waits for F1
  }
  later(2300, () => {
    beep()
    setupWindow.value = true
    setupKeyText.value = 'Press DEL to enter Setup'
  })
  // DEL can be pressed for about two and a half seconds
  later(4800, () => {
    setupWindow.value = false
    stage.value = 2
    afterPost()
  })
}
function afterPost() {
  // the BIOS tries each boot option in order
  const order = [saved.value.b1, saved.value.b2, saved.value.b3]
  const first = order.find(o => o === SSD || o === NET)
  if (first === NET) postLines.value.push({ text: 'Booting from network: Realtek PXE ...' }, { text: 'PXE-E61: Media test failure, check cable', tone: 'bad' })
  const bootsSsd = order.indexOf(SSD) >= 0 && (order.indexOf(NET) < 0 || order.indexOf(SSD) < order.indexOf(NET))
  later(first === NET ? 1500 : 600, () => {
    if (!bootsSsd) {
      screen.value = 'error'
      errorLines.value = ['Reboot and Select proper Boot device', 'or Insert Boot Media in selected Boot device and press a key']
      if (part.value === 'bootfix') {
        if (flags.value.error && !flags.value.entered) {
          mistakes.value++
          say('Too late - the chance to press DEL passed. Restart, and press DEL while "Press DEL to enter Setup" shows.', true)
        } else if (!flags.value.error) say('There it is. The BIOS found nothing to start. Restart, and press DEL while the logo shows.')
        else say('Still no boot device - the SSD must be Boot Option #1. Restart and go back into Setup.', true)
        flags.value.error = true
      }
      return
    }
    stage.value = 3
    screen.value = 'loading'
    later(2200, () => {
      stage.value = 5
      screen.value = 'desktop'
      flags.value.booted = true
      if (part.value === 'startup' && !done.value.has('startup')) save('startup', STAGES.length, 0, 0)
      if (part.value === 'bootfix') finishFault()
      if (part.value === 'cmos') {
        cmosFixed.value = true
        say('It starts, and the clock is right. One more question...')
      }
    })
  })
}
function finishFault() {
  if (partDone.value) save(part.value, goals.value.length, mistakes.value, 2)
}
function answerCmos(o: string) {
  if (o !== CMOS_FIX[0]) {
    mistakes.value++
    say(o.includes('every morning') ? 'That would work - but every day! Fix the cause instead.' : 'The disk and the operating system are fine - it is only the settings that are forgotten when the power is off.', true)
    return
  }
  cmosAnswered.value = true
  say('Yes - the CMOS battery keeps the settings and clock when the power is off. A flat one loses them.')
  finishFault()
}

// The keys
function press(k: string) {
  flashKey.value = k
  later(180, () => (flashKey.value = null))
  if (screen.value === 'post' && k === 'Del' && setupWindow.value) return enterSetup()
  if (screen.value === 'post' && k === 'F1' && part.value === 'cmos' && flags.value.error && postLines.value.some(l => l.text.includes('F1'))) return enterSetup()
  if (screen.value === 'post' && (k === 'Del' || k === 'F2') && !setupWindow.value) return say('Not now - wait for "Press DEL to enter Setup" to show.', true)
  if (screen.value === 'setup') {
    if (k === 'F10') confirm.value = 'save'
    else if (k === 'Esc') {
      if (picking.value) picking.value = null
      else confirm.value = 'discard'
    } else if (k === 'Enter') selectItem(sel.value)
    return
  }
  if (screen.value === 'error' && part.value === 'bootfix') say('Pressing a key just tries again. Restart, then press DEL during the start-up screen.')
}
function enterSetup() {
  clearTimers()
  setupWindow.value = false
  screen.value = 'setup'
  editing.value = { ...saved.value }
  tab.value = 'Main'
  sel.value = 0
  flags.value.entered = true
  if (part.value === 'bootfix') say('You are in BIOS Setup. Find the boot order on the Boot tab.')
  else if (part.value === 'cmos') say('Set the System Date and System Time on the Main tab, then save.')
  else say('This is BIOS Setup - look around, then Save & Exit or Esc.')
}
function onKeydown(e: KeyboardEvent) {
  if (part.value === 'check' || part.value === 'shutdown') return
  const map: Record<string, string> = { Delete: 'Del', Escape: 'Esc', F1: 'F1', F2: 'F2', F10: 'F10', Enter: 'Enter' }
  const k = map[e.key]
  if (screen.value === 'setup' && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
    e.preventDefault()
    if (e.key === 'ArrowDown') sel.value = Math.min(items.value.length - 1, sel.value + 1)
    if (e.key === 'ArrowUp') sel.value = Math.max(0, sel.value - 1)
    const ti = TABS.indexOf(tab.value)
    if (e.key === 'ArrowRight') { tab.value = TABS[Math.min(TABS.length - 1, ti + 1)]; sel.value = 0; picking.value = null }
    if (e.key === 'ArrowLeft') { tab.value = TABS[Math.max(0, ti - 1)]; sel.value = 0; picking.value = null }
    return
  }
  if (!k) return
  if (k.startsWith('F')) e.preventDefault()
  press(k)
}

// ------------------------------------------------------------ the check
const CHECK = [
  { q: 'What is the BIOS (or UEFI)?', options: ['Firmware on a chip on the motherboard that starts the computer', 'A program you install from the internet', 'Another name for the hard disk', 'The power supply'], a: 'Firmware on a chip on the motherboard that starts the computer', why: 'It is stored on the motherboard, so it works before any disk is read.' },
  { q: 'What does POST do?', options: ['Checks the hardware - processor, memory, keyboard, drives', 'Sends an email', 'Saves your files', 'Downloads updates'], a: 'Checks the hardware - processor, memory, keyboard, drives', why: 'Power-On Self Test - one short beep means it passed.' },
  { q: 'At start-up, where is the operating system copied to?', options: ['RAM', 'The CMOS battery', 'The monitor', 'The keyboard'], a: 'RAM', why: 'The processor runs programs from RAM, so the operating system is loaded from the disk into RAM.' },
  { q: '"Reboot and select proper boot device" - but the disk is detected. What do you check?', options: ['The boot order in BIOS Setup', 'The monitor cable', 'The mouse', 'The printer'], a: 'The boot order in BIOS Setup', why: 'The BIOS must look on the disk with the operating system first.' },
  { q: 'The date resets every time the computer is unplugged. What is wrong?', options: ['The CMOS battery is flat', 'The RAM is full', 'The hard disk is broken', 'There is a virus'], a: 'The CMOS battery is flat', why: 'The coin cell keeps the clock and settings while there is no power.' }
]
const shuffle = <T,>(a: T[]) => [...a].sort(() => Math.random() - 0.5)
const checks = ref(CHECK.map(c => ({ ...c, options: shuffle(c.options) })))
const cqi = ref(0)
const cPicked = ref<string | null>(null)
const checkWrong = ref(0)
const cq = computed(() => checks.value[cqi.value] || null)
const checkScore = computed(() => Math.max(0, 100 - checkWrong.value * 20))
function startCheck() {
  checks.value = CHECK.map(c => ({ ...c, options: shuffle(c.options) }))
  cqi.value = 0
  cPicked.value = null
  checkWrong.value = 0
}
function answerCheck(o: string) {
  if (cPicked.value !== null || !cq.value) return
  cPicked.value = o
  if (o !== cq.value.a) checkWrong.value++
}
function optClass(o: string) {
  if (cPicked.value === null) return 'border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 hover:border-indigo-400 hover:bg-indigo-50/60 dark:hover:bg-indigo-900/20'
  if (o === cq.value?.a) return 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200'
  if (o === cPicked.value) return 'border-rose-400 bg-rose-50 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200'
  return 'border-gray-200 dark:border-gray-700 text-gray-400'
}
function nextCheck() {
  cPicked.value = null
  cqi.value++
  if (cqi.value >= checks.value.length) save('check', checks.value.length, checkWrong.value, 4)
}

// ------------------------------------------------------------ shut down right
// Proper shutdown, forced shutdown and power loss, on a computer and the other devices in the
// lab - the start-up and shut-down practical in Subsidiary ICT Topic 1 (S.5 Term 1).
const SWITCH_OFF = [
  ['Shut down', 'Start → Power → Shut down. Windows closes every program, saves its settings and switches the computer off. Always the first choice.'],
  ['Restart', 'Shuts down and starts again - after installing updates or software, or when the computer is slow or acting strangely.'],
  ['Sleep', 'Keeps your work in RAM on very little power, for a short break. Not for the end of the day.'],
  ['End task', 'Ctrl + Shift + Esc opens Task Manager. Pick the program that is "Not responding" and choose End task - only that program closes.'],
  ['Forced shutdown', 'Hold the power button for 5-10 seconds. The last resort when nothing responds - unsaved work is lost and files can be damaged.'],
  ['UPS', 'A battery box between the wall and the computer. When the power goes it keeps the computer on for a few minutes - time to save and shut down.']
]
const SHUT = [
  { icon: '🖥️', device: 'Desktop computer', q: 'The lesson is over and you have finished for the day.', options: ['Save and close your work, then Start → Shut down, and switch off at the wall once the lights go off', 'Switch off at the wall socket', 'Hold the power button until it goes off', 'Turn off the monitor and leave'], a: 'Save and close your work, then Start → Shut down, and switch off at the wall once the lights go off', why: 'Shut down lets Windows close everything properly. Cutting the power first can lose work and damage files.' },
  { icon: '📝', device: 'Desktop computer', q: 'Word says "Not responding". The mouse still moves and other windows work.', options: ['Ctrl + Shift + Esc, pick Word in Task Manager, End task', 'Hold the power button for 10 seconds', 'Pull out the plug', 'Keep clicking until it answers'], a: 'Ctrl + Shift + Esc, pick Word in Task Manager, End task', why: 'Only one program is stuck, so close only that program. The rest of the computer - and your other work - is fine.' },
  { icon: '🧊', device: 'Desktop computer', q: 'The whole computer has frozen. The mouse, keyboard and Ctrl + Alt + Del do nothing for several minutes.', options: ['Hold the power button for 5-10 seconds, wait, then switch on again', 'Pull the plug out of the wall', 'Open the case and take out the RAM', 'Press every key on the keyboard'], a: 'Hold the power button for 5-10 seconds, wait, then switch on again', why: 'This is the time for a forced shutdown - the last resort. Expect to lose unsaved work; Windows may check the disk as it starts.' },
  { icon: '🔋', device: 'Computer on a UPS', q: 'The power goes off. The computer stays on, and the UPS starts beeping.', options: ['Save your work and shut down properly now', 'Carry on working - the UPS will keep it going', 'Unplug the UPS from the wall', 'Switch off the UPS straight away'], a: 'Save your work and shut down properly now', why: 'A UPS battery only lasts a few minutes. It gives you time to save and shut down before the power runs out.' },
  { icon: '⚡', device: 'Computer, no UPS', q: 'The power went off and the computer went off with it. Now the power is back.', options: ['Switch on, let Windows check the disk if it asks, then see what was saved', 'Switch it on and off quickly a few times to wake it', 'Reinstall Windows', 'Leave it off for a week'], a: 'Switch on, let Windows check the disk if it asks, then see what was saved', why: 'A sudden power loss is like a forced shutdown - work not saved is lost. Many programs offer recovered files when you open them again.' },
  { icon: '🖨️', device: 'Printer', q: 'You want to switch the printer off at the end of the day.', options: ['Press the printer\'s own power button and wait for it to finish, then switch off at the wall', 'Pull out the plug while it is still printing', 'Switch it off from the computer', 'Leave it on all the time'], a: 'Press the printer\'s own power button and wait for it to finish, then switch off at the wall', why: 'The printer parks and seals its ink head as it shuts down. Pulling the plug can leave the ink to dry and block it.' },
  { icon: '📶', device: 'Wi-Fi router', q: 'Nobody in the lab can get on the internet, and the router\'s internet light is red.', options: ['Switch the router off, wait 30 seconds, switch it on and wait for the lights to settle', 'Restart every computer in the lab', 'Hold the reset button to put it back to factory settings', 'Unplug all the network cables'], a: 'Switch the router off, wait 30 seconds, switch it on and wait for the lights to settle', why: 'Restarting a router fixes most connection problems. The reset button wipes its settings - leave that to the technician.' }
]
const PHONE = { icon: '📱', device: 'Smartphone', q: 'Your phone has frozen on one screen and does not respond to touch.', options: ['Hold the power and volume-down buttons together for about 10 seconds to force a restart', 'Take out the SIM card', 'Put it in the fridge to cool', 'Wait until the battery runs flat'], a: 'Hold the power and volume-down buttons together for about 10 seconds to force a restart', why: 'Most phones force-restart this way (check the maker\'s guide). Like a computer, it is a last resort when the screen does not respond.' }
// Seven situations: always the computer ones, the UPS and the router; the printer or the phone in turn
const pickShuts = () => {
  const extra = Math.random() < 0.5 ? PHONE : SHUT[5]
  return [...SHUT.filter((_, i) => i !== 5), extra].map(s => ({ ...s, options: shuffle(s.options) }))
}
const shuts = ref(pickShuts())
const sqi = ref(0)
const sPicked = ref<string | null>(null)
const shutWrong = ref(0)
const sq = computed(() => shuts.value[sqi.value] || null)
// Saved with 3 mistakes per wrong answer - 15 points each, as the server scores it
const shutScore = computed(() => Math.max(0, 100 - shutWrong.value * 15))
function startShut() {
  shuts.value = pickShuts()
  sqi.value = 0
  sPicked.value = null
  shutWrong.value = 0
}
function answerShut(o: string) {
  if (sPicked.value !== null || !sq.value) return
  sPicked.value = o
  if (o !== sq.value.a) shutWrong.value++
}
function shutClass(o: string) {
  if (sPicked.value === null) return 'border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 hover:border-indigo-400 hover:bg-indigo-50/60 dark:hover:bg-indigo-900/20'
  if (o === sq.value?.a) return 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200'
  if (o === sPicked.value) return 'border-rose-400 bg-rose-50 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200'
  return 'border-gray-200 dark:border-gray-700 text-gray-400'
}
function nextShut() {
  sPicked.value = null
  sqi.value++
  if (sqi.value >= shuts.value.length) save('shutdown', shuts.value.length, shutWrong.value, 3)
}

onBeforeUnmount(() => {
  clearTimers()
  window.removeEventListener('keydown', onKeydown)
})
</script>
