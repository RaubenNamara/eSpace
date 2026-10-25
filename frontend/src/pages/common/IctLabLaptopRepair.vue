<template>
  <!-- Laptop repair: "No bootable device" - the whole job, as a technician does it. Find out why,
       gather the right tools and part, open the laptop and replace the failed SSD (in 3D), make a
       Windows installer USB on another PC, install Windows, then a short check. Each stage is
       saved for students when finished (activity_key laptop-<stage>). Content: components/ictlab/laptopRepair.ts -->
  <div>
    <div class="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
      <RouterLink :to="`/${role}/ict-lab`" class="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Back to the ICT Lab">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </RouterLink>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">ICT Lab · Computer maintenance</p>
        <h1 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight">Laptop repair: "No bootable device"</h1>
      </div>
    </div>

    <!-- the six stages -->
    <div class="mb-4 grid grid-cols-3 lg:grid-cols-6 gap-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1" role="tablist">
      <button v-for="(s, i) in STAGES" :key="s.key" type="button" role="tab" :aria-selected="stage === s.key" class="rounded-lg px-2 py-2 text-left lg:text-center transition-colors" :class="stage === s.key ? 'bg-indigo-600 text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'" @click="go(s.key)">
        <p class="text-xs sm:text-sm font-bold">{{ i + 1 }}. {{ s.label }} <span v-if="done.has(s.key)">✓</span></p>
        <p class="hidden sm:block text-[11px] opacity-80">{{ s.hint }}</p>
      </button>
    </div>

    <!-- ===================== 1. Find the cause ===================== -->
    <div v-if="stage === 'diagnose'" class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_23rem] gap-4 items-start">
      <section class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 sm:p-5">
        <!-- the laptop -->
        <div class="mx-auto max-w-2xl">
          <div class="rounded-t-2xl bg-gray-800 p-2.5 sm:p-3">
            <div class="aspect-[16/10] rounded overflow-hidden font-mono text-[11px] sm:text-sm">
              <div v-if="screenView === 'history'" class="h-full bg-[#e5ddd5] p-3 sm:p-5 flex flex-col justify-end gap-2 font-sans">
                <p class="self-start max-w-[80%] rounded-xl rounded-tl-none bg-white px-3 py-2 text-gray-900 shadow">Hi! My laptop fell off the desk on Friday 😟</p>
                <p class="self-start max-w-[80%] rounded-xl rounded-tl-none bg-white px-3 py-2 text-gray-900 shadow">It worked a bit on Friday, but on Monday it only showed that black message.</p>
                <p class="self-end max-w-[80%] rounded-xl rounded-tr-none bg-[#d9fdd3] px-3 py-2 text-gray-900 shadow">Thank you - that helps a lot. I'll check it.</p>
              </div>
              <div v-else-if="screenView === 'bios-main' || screenView === 'bios-boot'" class="h-full bg-[#0b2d6b] text-gray-100 flex flex-col">
                <p class="bg-[#123f8f] px-3 py-1 font-bold text-white">InsydeH2O Setup Utility</p>
                <div class="flex border-b border-[#2b5cb8] text-xs"><span class="px-3 py-1" :class="screenView === 'bios-main' ? 'bg-gray-200 text-[#0b2d6b] font-bold' : ''">Main</span><span class="px-3 py-1">Security</span><span class="px-3 py-1" :class="screenView === 'bios-boot' ? 'bg-gray-200 text-[#0b2d6b] font-bold' : ''">Boot</span><span class="px-3 py-1">Exit</span></div>
                <div v-if="screenView === 'bios-main'" class="p-3 space-y-1">
                  <p>System Time ........ [10:42:07]</p><p>System Date ........ [24/10/2026]</p><p>CPU ................ Intel Core i5-1135G7</p><p>System Memory ...... 8192 MB</p>
                  <p class="bg-amber-300 text-[#0b2d6b] font-bold px-1">SSD ................ None</p><p>Serial Number ...... TB14-08821</p>
                </div>
                <div v-else class="p-3 space-y-1">
                  <p>Boot Mode .......... [UEFI]</p><p>Secure Boot ........ [Enabled]</p><p class="mt-2 text-white">Boot priority order:</p>
                  <p>1. USB HDD</p><p>2. Network PXE IPv4</p><p class="bg-amber-300 text-[#0b2d6b] font-bold px-1">(Windows Boot Manager - not found)</p>
                </div>
              </div>
              <div v-else-if="screenView === 'error'" class="h-full bg-black text-gray-200 p-3 sm:p-5">
                <p>No Bootable Device -- insert boot disk and press any key</p><p class="mt-1 inline-block w-2 h-4 bg-gray-300 animate-pulse"></p>
              </div>
              <div v-else class="h-full bg-black flex items-center justify-center text-gray-500 font-sans text-xs">Choose a check on the right to start.</div>
            </div>
          </div>
          <div class="mx-auto h-3 w-[104%] -ml-[2%] rounded-b-2xl bg-gray-300 dark:bg-gray-600"></div>
        </div>

        <!-- what a technician learns: every reason for the message -->
        <div v-if="causeRight" class="mt-5">
          <p class="text-sm font-bold text-gray-900 dark:text-white">Why does a laptop say "No bootable device"? Check in this order:</p>
          <div class="mt-2 overflow-x-auto">
            <table class="w-full text-sm">
              <thead><tr class="text-left text-xs text-gray-500 dark:text-gray-400"><th class="py-1.5 pr-3">If ...</th><th class="py-1.5 pr-3">the cause is ...</th><th class="py-1.5">so ...</th></tr></thead>
              <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                <tr v-for="(c, i) in ALL_CAUSES" :key="i" :class="i === 0 ? 'bg-amber-50 dark:bg-amber-900/20' : ''">
                  <td class="py-2 pr-3 font-semibold text-gray-900 dark:text-white">{{ c.when }}</td><td class="py-2 pr-3 text-gray-700 dark:text-gray-200">{{ c.cause }}</td><td class="py-2 text-gray-700 dark:text-gray-200">{{ c.fix }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="mt-1 text-xs text-gray-500">Highlighted: this laptop.</p>
        </div>
      </section>

      <aside class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 lg:sticky lg:top-20 space-y-3">
        <div class="rounded-xl bg-indigo-50 dark:bg-indigo-900/30 p-3 text-sm text-indigo-950 dark:text-indigo-100">
          <b>The job:</b> a student brings a laptop. It switches on, but only shows "No Bootable Device". Find out why before you touch a screwdriver.
        </div>
        <div class="space-y-1.5">
          <button v-for="c in CHECKS" :key="c.key" type="button" class="w-full text-left rounded-xl border-2 px-3 py-2 transition-colors" :class="openCheck === c.key ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' : checked.has(c.key) ? 'border-emerald-300 dark:border-emerald-800' : 'border-gray-200 dark:border-gray-600 hover:border-indigo-300'" @click="doCheck(c.key)">
            <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ checked.has(c.key) ? '✓ ' : '' }}{{ c.label }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ c.how }}</p>
          </button>
        </div>
        <div v-if="openCheckData" class="rounded-xl border border-gray-200 dark:border-gray-600 p-3 text-sm">
          <p><span class="font-semibold text-gray-900 dark:text-white">You see:</span> <span class="text-gray-700 dark:text-gray-200">{{ openCheckData.shows }}</span></p>
          <p class="mt-1"><span class="font-semibold text-gray-900 dark:text-white">It means:</span> <span class="text-gray-700 dark:text-gray-200">{{ openCheckData.means }}</span></p>
        </div>
        <!-- the cause -->
        <div v-if="checked.size >= 3" class="rounded-xl border-2 border-indigo-200 dark:border-indigo-800 p-3">
          <p class="text-sm font-bold text-gray-900 dark:text-white">So what is wrong?</p>
          <div class="mt-2 space-y-1.5">
            <button v-for="c in CAUSES" :key="c.key" type="button" class="w-full text-left rounded-lg border-2 px-2.5 py-1.5 text-sm transition-colors disabled:cursor-default" :class="causePicked === c.key ? (c.right ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30' : 'border-rose-400 bg-rose-50 dark:bg-rose-900/30') : 'border-gray-200 dark:border-gray-600 hover:border-indigo-300'" :disabled="causeRight" @click="pickCause(c.key)">{{ c.text }}</button>
          </div>
          <p v-if="causePicked" class="mt-2 text-sm" :class="causeRight ? 'text-emerald-800 dark:text-emerald-200' : 'text-rose-800 dark:text-rose-200'">{{ CAUSES.find(c => c.key === causePicked)?.why }}</p>
        </div>
        <p v-else class="text-xs text-gray-500">Make at least three checks, then decide what is wrong.</p>
        <button v-if="causeRight" type="button" class="w-full btn-primary" @click="go('tools')">Next: gather the toolkit</button>
      </aside>
    </div>

    <!-- ===================== 2. Toolkit ===================== -->
    <div v-else-if="stage === 'tools'" class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_23rem] gap-4 items-start">
      <section class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 sm:p-5">
        <p class="text-sm font-bold text-gray-900 dark:text-white">The workshop shelf - tap what goes in your toolkit</p>
        <div class="mt-3 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2">
          <button v-for="t in TOOLS" :key="t.key" type="button" class="relative text-left rounded-xl border-2 p-2.5 transition-colors disabled:cursor-default" :class="toolClass(t)" :disabled="toolsRight" @click="toggleTool(t.key)">
            <span class="text-2xl">{{ t.icon }}</span>
            <p class="mt-1 text-xs sm:text-sm font-semibold text-gray-900 dark:text-white leading-snug">{{ t.name }}</p>
            <span v-if="kit.has(t.key)" class="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center">✓</span>
            <p v-if="toolsChecked && (kit.has(t.key) || t.need)" class="mt-1 text-[11px]" :class="kit.has(t.key) === t.need ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'">{{ kit.has(t.key) === t.need ? '' : t.need ? 'Missing! ' : 'Leave it! ' }}{{ t.why }}</p>
          </button>
        </div>
        <div class="mt-3 flex flex-wrap items-center gap-2">
          <button v-if="!toolsRight" type="button" class="btn-primary" :disabled="!kit.size" @click="checkKit">Check my toolkit</button>
          <p v-if="toolsChecked && !toolsRight" class="text-sm text-rose-700 dark:text-rose-300">Not quite - read the notes, change your kit and check again.</p>
          <p v-if="toolsRight" class="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Perfect toolkit. Now choose the right replacement SSD.</p>
        </div>
      </section>
      <aside class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 lg:sticky lg:top-20 space-y-3">
        <template v-if="toolsRight">
          <p class="text-sm font-bold text-gray-900 dark:text-white">Which SSD do you buy?</p>
          <div class="rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 p-2.5 font-mono text-[11px] leading-relaxed text-gray-800 dark:text-gray-200">
            <p class="font-sans text-[10px] font-bold uppercase text-gray-500 mb-1">The sticker under the laptop</p>
            <p v-for="l in STICKER" :key="l" :class="l.startsWith('Storage') ? 'bg-amber-200 dark:bg-amber-700/50' : ''">{{ l }}</p>
          </div>
          <div class="space-y-1.5">
            <button v-for="c in SSD_CHOICES" :key="c.key" type="button" class="w-full text-left rounded-lg border-2 px-2.5 py-1.5 transition-colors disabled:cursor-default" :class="ssdPicked === c.key ? (c.right ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30' : 'border-rose-400 bg-rose-50 dark:bg-rose-900/30') : 'border-gray-200 dark:border-gray-600 hover:border-indigo-300'" :disabled="ssdRight" @click="pickSsd(c.key)">
              <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ c.name }}</p><p class="text-[11px] text-gray-500">{{ c.detail }}</p>
            </button>
          </div>
          <p v-if="ssdPicked" class="text-sm" :class="ssdRight ? 'text-emerald-800 dark:text-emerald-200' : 'text-rose-800 dark:text-rose-200'">{{ SSD_CHOICES.find(c => c.key === ssdPicked)?.why }}</p>
          <button v-if="ssdRight" type="button" class="w-full btn-primary" @click="go('repair')">Next: open the laptop</button>
        </template>
        <p v-else class="text-sm text-gray-600 dark:text-gray-300">A good technician prepares before opening anything: the right tools, the right part, and a way to put Windows back. Choose everything you will need - and nothing that could do damage.</p>
      </aside>
    </div>

    <!-- ===================== 3. Open and repair ===================== -->
    <div v-else-if="stage === 'repair'" class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_22rem] gap-4 items-start">
      <section class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 sm:p-3">
        <LaptopRepair3D ref="scene" :done="repairDone" :screws-out="screwsOut" :target="rStep?.target ?? null" :glow="glow" @tap="onTap" />
      </section>
      <aside class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 lg:sticky lg:top-20">
        <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
          <span class="font-semibold">Step {{ Math.min(ri + 1, REPAIR_STEPS.length) }} of {{ REPAIR_STEPS.length }}</span>
          <span class="tabular-nums">{{ repairWrong }} mistake{{ repairWrong === 1 ? '' : 's' }}</span>
        </div>
        <div class="h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden mb-3"><div class="h-full bg-indigo-600 transition-all duration-500" :style="{ width: `${(ri / REPAIR_STEPS.length) * 100}%` }"></div></div>
        <template v-if="rStep">
          <p class="text-base font-bold text-gray-900 dark:text-white leading-snug">{{ rStep.title }}</p>
          <p class="mt-1 text-sm text-gray-700 dark:text-gray-200">{{ rStep.text }}</p>
          <p v-if="rStep.key === 'screws'" class="mt-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300">{{ screwsOut }} of 9 screws out</p>
          <p v-if="rStep.why" class="mt-2 text-xs rounded-lg px-2.5 py-1.5 bg-amber-50 text-amber-900 dark:bg-amber-900/30 dark:text-amber-100">{{ rStep.why }}</p>
          <button type="button" class="mt-3 btn-secondary !py-1.5 !text-sm" @click="hint">Show me</button>
        </template>
        <p v-if="repairMsg" class="mt-3 text-sm rounded-lg px-2.5 py-2" :class="repairMsg.bad ? 'bg-rose-50 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200' : 'bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200'">{{ repairMsg.text }}</p>
        <div v-if="!rStep" class="mt-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 p-3 text-sm text-emerald-900 dark:text-emerald-100">
          <b>Repaired!</b> The BIOS shows "SSD: 512 GB NVMe" - the laptop sees the new drive. It is empty, so it still says "No bootable device" until Windows is installed.
          <button type="button" class="mt-2 btn-primary !py-1.5 !text-sm" @click="go('usb')">Next: make the installer USB</button>
        </div>
        <!-- the order, as a list -->
        <ol class="mt-4 space-y-0.5 text-xs">
          <li v-for="(s, i) in REPAIR_STEPS" :key="s.key" class="flex gap-1.5" :class="i < ri ? 'text-gray-400 line-through' : i === ri ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-500 dark:text-gray-400'"><span class="tabular-nums w-4">{{ i + 1 }}.</span>{{ s.title }}</li>
        </ol>
      </aside>
    </div>

    <!-- ===================== 4 & 5. The installer USB, installing Windows ===================== -->
    <div v-else-if="stage === 'usb' || stage === 'install'" class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_22rem] gap-4 items-start">
      <section class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 sm:p-3">
        <p class="px-1 pb-2 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">{{ stage === 'usb' ? 'On another working PC' : 'On the repaired laptop' }}</p>
        <WindowsScreen :screen="fScreen || flow[flow.length - 1]" :picked="fPicked" :progress="fProgress" :show-right="fRight" @choose="choose" />
      </section>
      <aside class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 lg:sticky lg:top-20">
        <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
          <span class="font-semibold">Screen {{ Math.min(fi + 1, flow.length) }} of {{ flow.length }}</span>
          <span class="tabular-nums">{{ flowWrong }} wrong</span>
        </div>
        <div class="h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden mb-3"><div class="h-full bg-indigo-600 transition-all duration-500" :style="{ width: `${(fi / flow.length) * 100}%` }"></div></div>
        <template v-if="fScreen">
          <p class="text-base font-bold text-gray-900 dark:text-white leading-snug">{{ fScreen.title }}</p>
          <p class="mt-1 text-sm text-gray-700 dark:text-gray-200">{{ fScreen.task }}</p>
          <p v-if="fWhy" class="mt-2 text-sm rounded-lg px-2.5 py-2 bg-rose-50 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200">{{ fWhy }}</p>
          <div v-if="fRight" class="mt-2 rounded-lg px-2.5 py-2 bg-emerald-50 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100 text-sm">
            <p>{{ fScreen.learn }}</p>
            <button type="button" class="mt-2 btn-primary !py-1.5 !text-sm" @click="nextScreen">{{ fi + 1 < flow.length ? 'Next' : 'Finish' }}</button>
          </div>
        </template>
        <div v-else class="rounded-xl bg-emerald-50 dark:bg-emerald-900/30 p-3 text-sm text-emerald-900 dark:text-emerald-100">
          <template v-if="stage === 'usb'"><b>The installer USB is ready.</b> Take it to the laptop.<button type="button" class="mt-2 block btn-primary !py-1.5 !text-sm" @click="go('install')">Next: install Windows</button></template>
          <template v-else><b>Done!</b> The laptop has a new SSD, a fresh Windows, its licence and its updates. That is a complete repair.<button type="button" class="mt-2 block btn-primary !py-1.5 !text-sm" @click="go('check')">Check what you learnt</button></template>
        </div>
      </aside>
    </div>

    <!-- ===================== 6. Check ===================== -->
    <div v-else class="max-w-2xl mx-auto rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-6">
      <template v-if="cq">
        <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2"><span class="font-semibold">Question {{ cqi + 1 }} of {{ checks.length }}</span><span class="tabular-nums">{{ checkWrong }} wrong</span></div>
        <p class="text-lg font-bold text-gray-900 dark:text-white leading-snug">{{ cq.q }}</p>
        <div class="mt-3 space-y-1.5">
          <button v-for="o in cq.options" :key="o" type="button" class="w-full text-left rounded-xl border-2 px-3 py-2.5 text-sm font-semibold transition-colors disabled:cursor-default" :class="optClass(o)" :disabled="cPicked !== null" @click="answer(o)">{{ o }}</button>
        </div>
        <p v-if="cPicked !== null" class="mt-2 text-sm" :class="cPicked === cq.a ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'">{{ cPicked === cq.a ? 'Right!' : `It is: ${cq.a}.` }} {{ cq.why }}</p>
        <div class="mt-3"><button type="button" class="btn-primary !py-1.5 !text-sm" :disabled="cPicked === null" @click="nextQ">{{ cqi + 1 < checks.length ? 'Next question' : 'Finish' }}</button></div>
      </template>
      <div v-else class="text-center py-4">
        <span class="mx-auto w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center"><AppIcon name="trophy" class="w-6 h-6" /></span>
        <p class="mt-2 text-xl font-bold text-gray-900 dark:text-white">{{ Math.max(0, 100 - checkWrong * 15) }}% - {{ checks.length - checkWrong }} of {{ checks.length }} right</p>
        <p class="mt-1 text-sm text-gray-700 dark:text-gray-200">Diagnose first, prepare the right tools and part, battery out first, install from Microsoft's own tool - that is how a technician works.</p>
        <button type="button" class="mt-3 btn-secondary !py-1.5 !text-sm" @click="startCheck">Again</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import AppIcon from '@/components/common/AppIcon.vue'
import LaptopRepair3D from '@/components/ictlab/LaptopRepair3D.vue'
import WindowsScreen from '@/components/ictlab/WindowsScreen.vue'
import { labRoleOf } from '@/components/ictlab/types'
import {
  STAGES, CHECKS, CAUSES, ALL_CAUSES, TOOLS, SSD_CHOICES, STICKER, REPAIR_STEPS, REPAIR_WRONG, USB_FLOW, INSTALL_FLOW, CHECK,
  type Stage, type Tool
} from '@/components/ictlab/laptopRepair'

const route = useRoute()
const role = computed(() => labRoleOf(route.path))
const stage = ref<Stage>('diagnose')
const done = ref(new Set<Stage>())
let started = Date.now()

async function save(s: Stage, steps: number, mistakes: number) {
  done.value = new Set([...done.value, s])
  if (role.value !== 'student') return
  try {
    await axios.post('/api/student/ict-lab/attempts', {
      activity_key: `laptop-${s}`, level: 'simple', steps_total: steps, mistakes, hints_used: hints.value, duration_seconds: Math.round((Date.now() - started) / 1000)
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
    done.value = new Set(STAGES.map(s => s.key).filter(k => keys.includes(`laptop-${k}`)))
  } catch {
    // ticks come back as stages are finished
  }
})
const hints = ref(0)

function go(s: Stage) {
  stage.value = s
  started = Date.now()
  hints.value = 0
  if (s === 'repair') resetRepair()
  if (s === 'usb' || s === 'install') startFlow(s)
  if (s === 'check') startCheck()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ------------------------------------------------------------------ 1. diagnose
const checked = ref(new Set<string>())
const openCheck = ref<string | null>(null)
const openCheckData = computed(() => CHECKS.find(c => c.key === openCheck.value) || null)
const screenView = computed(() => openCheckData.value?.screen || 'off')
const causePicked = ref<string | null>(null)
const causeRight = computed(() => !!CAUSES.find(c => c.key === causePicked.value)?.right)
const diagWrong = ref(0)
function doCheck(k: string) {
  openCheck.value = k
  checked.value = new Set([...checked.value, k])
}
function pickCause(k: string) {
  if (causeRight.value) return
  causePicked.value = k
  if (!CAUSES.find(c => c.key === k)?.right) diagWrong.value++
  else save('diagnose', CHECKS.length, diagWrong.value * 2)
}

// ------------------------------------------------------------------ 2. toolkit
const kit = ref(new Set<string>())
const toolsChecked = ref(false)
const toolsRight = ref(false)
const toolsWrong = ref(0)
const ssdPicked = ref<string | null>(null)
const ssdRight = computed(() => !!SSD_CHOICES.find(c => c.key === ssdPicked.value)?.right)
function toggleTool(k: string) {
  const s = new Set(kit.value)
  if (s.has(k)) s.delete(k)
  else s.add(k)
  kit.value = s
  toolsChecked.value = false
}
function checkKit() {
  toolsChecked.value = true
  const wrong = TOOLS.filter(t => kit.value.has(t.key) !== t.need).length
  if (wrong) toolsWrong.value += wrong
  toolsRight.value = wrong === 0
}
function toolClass(t: Tool) {
  if (toolsChecked.value && kit.value.has(t.key) !== t.need && (kit.value.has(t.key) || t.need)) return 'border-rose-400 bg-rose-50 dark:bg-rose-900/20'
  if (toolsChecked.value && kit.value.has(t.key) && t.need) return 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20'
  return kit.value.has(t.key) ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' : 'border-gray-200 dark:border-gray-600 hover:border-indigo-300'
}
function pickSsd(k: string) {
  if (ssdRight.value) return
  ssdPicked.value = k
  if (!SSD_CHOICES.find(c => c.key === k)?.right) toolsWrong.value++
  else save('tools', TOOLS.length + 1, toolsWrong.value)
}

// ------------------------------------------------------------------ 3. open and repair
const scene = ref<InstanceType<typeof LaptopRepair3D> | null>(null)
const ri = ref(0)
const rStep = computed(() => REPAIR_STEPS[ri.value] || null)
const repairDone = ref<string[]>([])
const screwsOut = ref(0)
const repairWrong = ref(0)
const repairMsg = ref<{ text: string; bad?: boolean } | null>(null)
const glow = ref(false)
const footUp = ref(false)
const VIEW: Record<string, string> = { screws: 'bottom', foot: 'bottom', pry: 'bottom', battery: 'battery', 'ssd-screw': 'ssd', 'ssd-out': 'ssd', 'ssd-in': 'ssd', 'ssd-fix': 'ssd', fan: 'fan', reconnect: 'battery', close: 'all', test: 'all' }
function resetRepair() {
  ri.value = 0
  repairDone.value = []
  screwsOut.value = 0
  repairWrong.value = 0
  repairMsg.value = null
  glow.value = false
  footUp.value = false
}
function advance(msg?: string) {
  const s = rStep.value!
  repairDone.value = [...repairDone.value, s.key]
  repairMsg.value = msg ? { text: msg } : null
  ri.value++
  glow.value = false
  const next = REPAIR_STEPS[ri.value]
  if (next && VIEW[next.key]) scene.value?.look(VIEW[next.key])
  if (!next) {
    scene.value?.look('all')
    save('repair', REPAIR_STEPS.length, repairWrong.value)
  }
}
function onTap(key: string) {
  const s = rStep.value
  if (!s) return
  const base = key.startsWith('screw:') ? 'screw' : key
  if (s.key === 'screws' && base === 'screw') {
    screwsOut.value++
    if (screwsOut.value >= 9) advance('All nine visible screws are in the tray - but the panel still will not lift...')
    return
  }
  if (s.key === 'foot') {
    if (base === 'foot') {
      footUp.value = true
      scene.value?.peelFoot()
      repairMsg.value = { text: 'Under the rubber foot: one more screw!' }
      return
    }
    if (base === 'hidden' && footUp.value) return advance('Found it - the hidden screw is out.')
  }
  if (base === s.target) {
    const notes: Record<string, string> = {
      'ssd-out': 'Look at it: a burnt chip near the connector. This drive has failed - reseating would not help, so it is replaced.',
      battery: 'Battery disconnected - now it is safe to work on the board.'
    }
    return advance(notes[s.key])
  }
  repairWrong.value++
  repairMsg.value = { text: REPAIR_WRONG[base] || `Not that - ${s.title.toLowerCase()}.`, bad: true }
}
function hint() {
  hints.value++
  glow.value = true
  if (rStep.value && VIEW[rStep.value.key]) scene.value?.look(VIEW[rStep.value.key])
}

// ------------------------------------------------------------------ 4 & 5. screens
const flow = computed(() => (stage.value === 'usb' ? USB_FLOW : INSTALL_FLOW))
const fi = ref(0)
const fScreen = computed(() => flow.value[fi.value] || null)
const fPicked = ref<number | null>(null)
const fRight = ref(false)
const fWhy = ref('')
const fProgress = ref(0)
const flowWrong = ref(0)
let progressTimer = 0
function startFlow(_s: Stage) {
  fi.value = 0
  flowWrong.value = 0
  enterScreen()
}
function enterScreen() {
  fPicked.value = null
  fRight.value = false
  fWhy.value = ''
  fProgress.value = 0
  clearInterval(progressTimer)
  const s = fScreen.value
  if (s?.auto) {
    const t0 = Date.now()
    progressTimer = window.setInterval(() => {
      fProgress.value = Math.min(1, (Date.now() - t0) / s.auto!)
      if (fProgress.value >= 1) {
        clearInterval(progressTimer)
        fRight.value = true
      }
    }, 100)
  }
}
function choose(i: number) {
  const s = fScreen.value
  if (!s?.choices || fRight.value) return
  fPicked.value = i
  const c = s.choices[i]
  if (c.right) {
    fRight.value = true
    fWhy.value = ''
  } else {
    flowWrong.value++
    fWhy.value = c.why || 'Not that one.'
  }
}
function nextScreen() {
  fi.value++
  if (fi.value >= flow.value.length) {
    save(stage.value, flow.value.length, flowWrong.value * 2)
    return
  }
  enterScreen()
}

// ------------------------------------------------------------------ 6. check
const shuffle = <T,>(a: T[]) => [...a].sort(() => Math.random() - 0.5)
const checks = ref(CHECK.map(c => ({ ...c, options: shuffle(c.options) })))
const cqi = ref(0)
const cPicked = ref<string | null>(null)
const checkWrong = ref(0)
const cq = computed(() => checks.value[cqi.value] || null)
function startCheck() {
  checks.value = CHECK.map(c => ({ ...c, options: shuffle(c.options) }))
  cqi.value = 0
  cPicked.value = null
  checkWrong.value = 0
}
function answer(o: string) {
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
function nextQ() {
  cPicked.value = null
  cqi.value++
  if (cqi.value >= checks.value.length) save('check', checks.value.length, checkWrong.value * 3)
}

onBeforeUnmount(() => clearInterval(progressTimer))
</script>
