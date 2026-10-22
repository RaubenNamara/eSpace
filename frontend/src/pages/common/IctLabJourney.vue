<template>
  <!-- Inside a computer: one keypress, followed in 3D. The student presses a letter; a glowing
       packet carrying its code (A = 01000001) travels from the keyboard, down the cable, along the
       motherboard to the processor, the memory and the graphics card, out to the monitor - where
       the letter appears - and, on Save, to the hard disk. Each stop is tagged Input, Process,
       Output or Storage. A short check at the end is saved for students (activity_key 'journey'). -->
  <div>
    <div class="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
      <RouterLink :to="`/${role}/ict-lab`" class="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Back to the ICT Lab">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </RouterLink>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">ICT Lab · How a computer works</p>
        <h1 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight">Inside a computer: the journey of one key</h1>
      </div>
    </div>

    <!-- Input - Process - Output - Storage, lit for the stop we are at -->
    <div class="mb-3 grid grid-cols-4 gap-1.5">
      <div v-for="p in IPOS" :key="p.key" class="rounded-xl px-2 py-2 text-center border transition-colors" :class="stage && stage.ipos === p.key ? 'bg-indigo-600 border-indigo-600 text-white' : seen.has(p.key) ? 'bg-indigo-50 border-indigo-200 text-indigo-800 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-200' : 'bg-white border-gray-200 text-gray-500 dark:bg-gray-800 dark:border-gray-700'">
        <p class="text-xs sm:text-sm font-bold">{{ p.label }}</p>
        <p class="hidden sm:block text-[11px] opacity-80">{{ p.hint }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_22rem] gap-4 items-start">
      <section class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 sm:p-3">
        <div v-if="!unsupported" class="relative w-full h-[50vh] min-h-[320px] lg:h-[62vh] rounded-xl overflow-hidden bg-slate-200">
          <div ref="host" class="absolute inset-0"></div>
          <!-- what is travelling -->
          <div v-if="letter && stageIndex >= 0" class="absolute top-2 left-2 px-3 py-1.5 rounded-xl bg-gray-900/85 text-white shadow">
            <p class="text-[10px] uppercase tracking-wide text-gray-300">Travelling now</p>
            <p class="font-mono text-sm"><b class="text-amber-300 text-base">{{ letter }}</b> = {{ binary }}</p>
          </div>
          <span class="absolute bottom-2 left-2 px-2 py-1 rounded-lg bg-black/45 text-white text-[11px] pointer-events-none">Drag to look around · pinch to zoom</span>
        </div>
        <p v-else class="text-sm text-gray-500 p-6 text-center">This device cannot show 3D.</p>
      </section>

      <aside class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 lg:sticky lg:top-20">
        <!-- 0. Press a letter -->
        <template v-if="phase === 'start'">
          <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">Let's begin</p>
          <p class="text-base font-bold text-gray-900 dark:text-white">Press any letter on your keyboard</p>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">We will follow that one key press all the way through the computer - and watch it appear on the screen.</p>
          <p class="mt-3 text-xs text-gray-500">No keyboard? Tap a letter:</p>
          <div class="mt-1.5 grid grid-cols-7 gap-1">
            <button v-for="c in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'" :key="c" type="button" class="h-8 rounded-md border border-gray-300 dark:border-gray-600 text-sm font-bold hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 shadow-[0_2px_0_rgba(0,0,0,0.12)]" @click="begin(c)">{{ c }}</button>
          </div>
        </template>

        <!-- 1-8. The stops -->
        <template v-else-if="phase === 'tour' && stage">
          <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
            <span class="font-semibold">Stop {{ stageIndex + 1 }} of {{ STAGES.length }}</span>
            <span class="px-2 py-0.5 rounded-full font-bold text-white" :style="{ background: IPOS_COLOR[stage.ipos] }">{{ IPOS.find(p => p.key === stage!.ipos)?.label }}</span>
          </div>
          <div class="h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden mb-3">
            <div class="h-full bg-indigo-600 transition-all duration-500" :style="{ width: `${((stageIndex + 1) / STAGES.length) * 100}%` }"></div>
          </div>
          <p class="text-base font-bold text-gray-900 dark:text-white leading-snug">{{ fill(stage.title) }}</p>
          <p class="mt-1.5 text-sm text-gray-700 dark:text-gray-200">{{ fill(stage.text) }}</p>
          <p v-if="stage.part" class="mt-2 text-xs rounded-lg px-2.5 py-1.5 bg-amber-50 text-amber-900 dark:bg-amber-900/30 dark:text-amber-100"><b>Part:</b> {{ stage.part }}</p>
          <div class="mt-4 flex items-center gap-2">
            <button type="button" class="btn-secondary !py-1.5 !text-sm" :disabled="stageIndex === 0" @click="go(stageIndex - 1)">‹ Back</button>
            <button type="button" class="btn-secondary !py-1.5 !text-sm" @click="go(stageIndex)">Replay</button>
            <button type="button" class="btn-primary !py-1.5 !text-sm ml-auto" :disabled="moving" @click="stageIndex + 1 < STAGES.length ? go(stageIndex + 1) : startCheck()">
              {{ stageIndex + 1 < STAGES.length ? (STAGES[stageIndex + 1].save ? 'Save the work ›' : 'Next stop ›') : 'Check myself' }}
            </button>
          </div>
          <label class="mt-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <input v-model="autoPlay" type="checkbox" class="rounded border-gray-300 text-indigo-600"> Play on by itself
          </label>
        </template>

        <!-- The check -->
        <template v-else-if="phase === 'check'">
          <template v-if="checkQ">
            <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
              <span class="font-semibold">Question {{ checkI + 1 }} of {{ CHECK.length }}</span>
              <span class="tabular-nums">{{ checkRight }} right</span>
            </div>
            <p class="text-base font-bold text-gray-900 dark:text-white leading-snug">{{ fill(checkQ.q) }}</p>
            <div class="mt-3 space-y-1.5">
              <button
                v-for="o in checkQ.options"
                :key="o"
                type="button"
                class="w-full text-left rounded-xl border-2 px-3 py-2.5 text-sm font-semibold transition-colors disabled:cursor-default"
                :class="optionClass(o)"
                :disabled="picked !== null"
                @click="answer(o)"
              >{{ fill(o) }}</button>
            </div>
            <div v-if="picked !== null" class="mt-3 rounded-xl p-3" :class="picked === checkQ.a ? 'bg-emerald-50 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100' : 'bg-rose-50 text-rose-900 dark:bg-rose-900/30 dark:text-rose-100'">
              <p class="text-sm font-bold">{{ picked === checkQ.a ? 'Right!' : `It is: ${fill(checkQ.a)}` }}</p>
              <p class="text-sm mt-0.5">{{ fill(checkQ.why) }}</p>
              <div class="mt-2.5 flex justify-end">
                <button type="button" class="btn-primary !py-1.5 !text-sm" @click="nextCheck">{{ checkI + 1 < CHECK.length ? 'Next question' : 'See my result' }}</button>
              </div>
            </div>
          </template>
          <div v-else class="text-center py-2">
            <span class="mx-auto w-12 h-12 rounded-2xl flex items-center justify-center" :class="checkScore >= 80 ? 'bg-indigo-600 text-white' : 'bg-amber-500 text-white'"><AppIcon :name="checkScore >= 80 ? 'trophy' : 'bulb'" class="w-6 h-6" /></span>
            <p class="mt-2 text-3xl font-bold text-gray-900 dark:text-white tabular-nums">{{ checkScore }}%</p>
            <p class="text-sm text-gray-600 dark:text-gray-300">{{ checkRight }} of {{ CHECK.length }} right</p>
            <p class="mt-2 text-sm font-semibold" :class="checkScore >= 80 ? 'text-indigo-800 dark:text-indigo-200' : 'text-amber-800 dark:text-amber-200'">
              {{ checkScore >= 80 ? 'You know how a computer turns a key press into a letter on the screen.' : 'Take the journey again and watch each stop closely.' }}
            </p>
            <p v-if="role !== 'student'" class="mt-1 text-xs text-gray-500">Practice - results are only saved for students.</p>
            <div class="mt-4 flex flex-wrap justify-center gap-2">
              <button type="button" class="btn-secondary" @click="restart">Another letter</button>
              <RouterLink :to="`/${role}/ict-lab`" class="btn-primary">Back to the ICT Lab</RouterLink>
            </div>
          </div>
        </template>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick, shallowRef } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import * as THREE from 'three'
import AppIcon from '@/components/common/AppIcon.vue'
import { createWorkbench, type Workbench } from '@/components/ictlab/three/workbench'
import { buildPc, setEmissive, type PcRig, type PcPartKey } from '@/components/ictlab/three/pcModel'
import { buildDevice } from '@/components/ictlab/three/devices'
import { labRoleOf } from '@/components/ictlab/types'

const route = useRoute()
const role = computed(() => labRoleOf(route.path))

type Ipos = 'input' | 'process' | 'output' | 'storage'
const IPOS: { key: Ipos; label: string; hint: string }[] = [
  { key: 'input', label: 'Input', hint: 'data goes in' },
  { key: 'process', label: 'Process', hint: 'it is worked on' },
  { key: 'output', label: 'Output', hint: 'the result comes out' },
  { key: 'storage', label: 'Storage', hint: 'it is kept' }
]
const IPOS_COLOR: Record<Ipos, string> = { input: '#15874a', process: '#b45309', output: '#2563eb', storage: '#7c3aed' }

// ------------------------------------------------------------ the stops
interface Stage {
  ipos: Ipos
  title: string
  text: string
  part?: string
  /** The route the packet takes (built once the scene is laid out) */
  path: () => THREE.Vector3[]
  /** Go round and round (the processor working) */
  loops?: number
  /** Where the camera looks */
  focus: () => THREE.Vector3
  view: THREE.Vector3Tuple
  /** What glows */
  glow?: () => THREE.Object3D[]
  /** Something that happens when the packet arrives */
  arrive?: () => void
  save?: boolean
}

const letter = ref('')
const binary = computed(() => (letter.value ? letter.value.charCodeAt(0).toString(2).padStart(8, '0') : ''))
const fill = (s: string) => s.replace(/\{L\}/g, letter.value || 'A').replace(/\{B\}/g, binary.value || '01000001').replace(/\{N\}/g, String((letter.value || 'A').charCodeAt(0)))

// world positions, filled in once the scene is built
const W: Record<string, THREE.Vector3> = {}
const P = (k: string) => W[k].clone()
const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z)

const STAGES: Stage[] = [
  {
    ipos: 'input', title: 'You press {L}',
    text: 'The keyboard is an input device. A tiny chip inside it notices which key went down and turns {L} into a code the computer understands: the number {N}, sent as eight 1s and 0s - {B}.',
    part: 'Keyboard - an input device',
    path: () => [P('key'), P('key').add(V(0, 0.03, 0)), P('kbOut')],
    focus: () => P('key'), view: [0.04, 0.17, 0.24]
  },
  {
    ipos: 'input', title: 'Down the cable to the USB port',
    text: 'The code races down the keyboard cable as quick pulses of electricity - on for 1, off for 0 - and goes in through a USB port at the back of the system unit.',
    part: 'USB cable and USB port',
    path: () => cablePath.kb,
    focus: () => V(0.3, 0.08, -0.02), view: [0.25, 0.42, 0.62],
    glow: () => [rig!.ports]
  },
  {
    ipos: 'process', title: 'Along the motherboard',
    text: 'Inside, the motherboard is the road. Thin copper lines called traces carry {B} from the USB port to the processor. (The processor\'s cooler has been lifted off so you can see.)',
    part: 'Motherboard',
    path: () => [P('usbIn'), ...board([[0.09, 0.125], [0.03, 0.135], [-0.02, 0.12], [-0.047, 0.078]])],
    focus: () => P('mbCentre'), view: [0, 0.03, 0.42],
    glow: () => [rig!.parts.motherboard]
  },
  {
    ipos: 'process', title: 'The processor works on it',
    text: 'The processor (CPU) is the brain. It reads the code {B}, sees it means the letter {L}, and works out what to do: add {L} to your document and show it on the screen. It does billions of steps like this every second.',
    part: 'Processor (CPU)',
    path: () => circle(P('cpu'), 0.022),
    loops: 2,
    focus: () => P('cpu'), view: [0, 0.02, 0.2],
    glow: () => [rig!.parts.cpu]
  },
  {
    ipos: 'process', title: 'Memory holds your work',
    text: 'The processor puts {L} into memory (RAM), where the whole document is kept while you work - RAM is very fast for the processor to reach. But RAM forgets everything when the power goes off.',
    part: 'Memory (RAM)',
    path: () => [P('cpu'), ...board([[0, 0.09]]), P('ram'), ...board([[0, 0.07]]), P('cpu')],
    focus: () => P('ram').add(V(-0.03, 0, 0)), view: [0, 0.03, 0.24],
    glow: () => [rig!.parts.ram]
  },
  {
    ipos: 'output', title: 'The graphics card draws it',
    text: 'To show {L}, the processor sends it to the graphics card. The graphics card draws the new picture of your screen - every dot (pixel) - many times a second.',
    part: 'Graphics card (GPU)',
    path: () => [P('cpu'), ...board([[-0.02, 0.0], [0.02, -0.035]]), P('gpu')],
    focus: () => P('gpu'), view: [0, 0.06, 0.3],
    glow: () => [rig!.parts.gpu]
  },
  {
    ipos: 'output', title: '{L} appears on the monitor',
    text: 'The picture leaves through the graphics card\'s port, along the monitor cable, and the monitor - an output device - lights up its pixels. There is your {L}!',
    part: 'Monitor - an output device',
    path: () => cablePath.monitor,
    focus: () => P('screen'), view: [0.06, 0.06, 0.62],
    glow: () => [monitor],
    arrive: () => { typed.value += letter.value; drawScreen() }
  },
  {
    ipos: 'storage', title: 'Save: kept on the hard disk', save: true,
    text: 'You press Save. The processor copies your document from memory, down the SATA cable, onto the hard disk. Storage keeps your work even when the computer is switched off - unlike RAM.',
    part: 'Hard disk drive - storage',
    path: () => [P('cpu'), ...board([[-0.08, -0.02], [-0.112, -0.056]]), P('sataMid'), P('hdd')],
    focus: () => P('hdd').add(V(-0.05, 0.0, 0.04)), view: [0.04, 0.12, 0.34],
    glow: () => [rig!.parts.hdd],
    arrive: () => { saved.value = true; drawScreen() }
  }
]

// ------------------------------------------------------------ flow
const phase = ref<'start' | 'tour' | 'check'>('start')
const stageIndex = ref(-1)
const stage = computed(() => STAGES[stageIndex.value] || null)
const seen = ref(new Set<Ipos>())
const moving = ref(false)
const autoPlay = ref(false)
const typed = ref('Hello ')
const saved = ref(false)
let startedAt = 0

function begin(c: string) {
  if (phase.value !== 'start') return
  letter.value = c.toUpperCase()
  typed.value = 'Hello '
  saved.value = false
  drawScreen()
  startedAt = Date.now()
  phase.value = 'tour'
  go(0)
}
function restart() {
  phase.value = 'start'
  stageIndex.value = -1
  seen.value = new Set()
  typed.value = 'Hello '
  saved.value = false
  drawScreen()
  glowOnly([])
  packet.visible = false
  camGoal = { pos: OVERVIEW.pos.clone(), target: OVERVIEW.target.clone() }
}
const onKey = (e: KeyboardEvent) => {
  if (phase.value === 'start' && /^[a-z]$/i.test(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey) begin(e.key)
}

function go(i: number) {
  const s = STAGES[i]
  if (!s || !wb.value) return
  // the screen as it was before this stop: the letter shows from the monitor stop on, "saved" only once saved
  typed.value = 'Hello ' + (i > 6 ? letter.value : '')
  saved.value = false
  drawScreen()
  stageIndex.value = i
  seen.value = new Set([...seen.value, s.ipos])
  // the key first: the camera and the packet start from the key just pressed
  if (i === 0) pressKey()
  const f = s.focus()
  // a tall, narrow view (a phone) stands further back to fit the same things in
  const aspect = wb.value.camera.aspect
  const back = aspect < 1.2 ? Math.min(1.9, 1.2 / aspect) : 1
  camGoal = { pos: f.clone().add(V(...s.view).multiplyScalar(back)), target: f }
  glowOnly(s.glow?.() || [])
  run(s)
}

// ------------------------------------------------------------ the check
interface Check { q: string; options: string[]; a: string; why: string }
const CHECK: Check[] = [
  { q: 'Which part was the INPUT device in the journey?', options: ['Keyboard', 'Monitor', 'Processor', 'Hard disk'], a: 'Keyboard', why: 'You typed {L} on the keyboard - it puts data into the computer.' },
  { q: 'What travelled down the cable when you pressed {L}?', options: ['A code of 1s and 0s ({B})', 'A tiny letter {L}', 'Water', 'A picture of the screen'], a: 'A code of 1s and 0s ({B})', why: 'Computers work with binary: {L} is the number {N}, sent as {B}.' },
  { q: 'Which part PROCESSES the data - works out what to do?', options: ['Processor (CPU)', 'Keyboard', 'USB cable', 'Monitor'], a: 'Processor (CPU)', why: 'The processor is the brain of the computer.' },
  { q: 'Where is your document kept WHILE you work - and lost if the power goes off?', options: ['Memory (RAM)', 'Hard disk', 'Monitor', 'Keyboard'], a: 'Memory (RAM)', why: 'RAM is fast, but it forgets everything when the power goes off.' },
  { q: 'Which part keeps your work after the computer is switched off?', options: ['Hard disk', 'Memory (RAM)', 'Graphics card', 'Processor (CPU)'], a: 'Hard disk', why: 'Storage - the hard disk or SSD - keeps data without power. That is why you Save.' }
]
const checkI = ref(0)
const picked = ref<string | null>(null)
const checkRight = ref(0)
const shuffled = ref<Check[]>([])
const checkQ = computed(() => shuffled.value[checkI.value] || null)
const checkScore = computed(() => Math.round((checkRight.value / CHECK.length) * 100))
function startCheck() {
  shuffled.value = CHECK.map(c => ({ ...c, options: [...c.options].sort(() => Math.random() - 0.5) }))
  checkI.value = 0
  picked.value = null
  checkRight.value = 0
  phase.value = 'check'
  autoPlay.value = false
}
function answer(o: string) {
  if (picked.value !== null || !checkQ.value) return
  picked.value = o
  if (o === checkQ.value.a) checkRight.value++
}
function optionClass(o: string) {
  if (picked.value === null) return 'border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 hover:border-indigo-400 hover:bg-indigo-50/60 dark:hover:bg-indigo-900/20'
  if (checkQ.value && o === checkQ.value.a) return 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200'
  if (o === picked.value) return 'border-rose-400 bg-rose-50 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200'
  return 'border-gray-200 dark:border-gray-700 text-gray-400'
}
async function nextCheck() {
  picked.value = null
  checkI.value++
  if (checkI.value < CHECK.length || role.value !== 'student') return
  try {
    // An attempt scores 100 - 5 per mistake: each wrong answer counts as four, 20% a question
    await axios.post('/api/student/ict-lab/attempts', {
      activity_key: 'journey',
      level: 'simple',
      steps_total: CHECK.length,
      mistakes: (CHECK.length - checkRight.value) * 4,
      hints_used: 0,
      duration_seconds: Math.round((Date.now() - startedAt) / 1000)
    })
  } catch {
    // the result still shows; it just is not kept
  }
}

// ------------------------------------------------------------ 3D
const host = ref<HTMLDivElement | null>(null)
const wb = shallowRef<Workbench | null>(null)
const unsupported = ref(false)
let rig: PcRig | null = null
let computer: THREE.Group
let kb: THREE.Group
let monitor: THREE.Group
let keyCap: THREE.Mesh
let packet: THREE.Group
const trail: THREE.Mesh[] = []
let screenCanvas: HTMLCanvasElement
let screenTex: THREE.CanvasTexture
const cablePath = { kb: [] as THREE.Vector3[], monitor: [] as THREE.Vector3[] }
const OVERVIEW = { pos: V(0.02, 0.5, 0.95), target: V(0, 0.14, -0.08) }
let camGoal: { pos: THREE.Vector3; target: THREE.Vector3 } | null = null

// points on the motherboard (its own x, y), a little in front of it
function board(pts: [number, number][]) {
  return pts.map(([x, y]) => rig!.parts.motherboard.localToWorld(V(x, y, 0.016)))
}
// a ring in the motherboard's plane round a point
function circle(c: THREE.Vector3, r: number) {
  const pts: THREE.Vector3[] = []
  for (let i = 0; i <= 16; i++) {
    const a = (i / 16) * Math.PI * 2
    pts.push(c.clone().add(V(Math.cos(a) * r, Math.sin(a) * r, 0.012)))
  }
  return pts
}

function tube(points: THREE.Vector3[], radius: number, color: number) {
  const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 80, radius, 10, false), new THREE.MeshStandardMaterial({ color, roughness: 0.6 }))
  m.castShadow = true
  return m
}

// The monitor's screen: a word processor with the document being typed
function drawScreen() {
  if (!screenCanvas) return
  const g = screenCanvas.getContext('2d')!
  const w = screenCanvas.width
  const h = screenCanvas.height
  g.fillStyle = '#e8f3ec'
  g.fillRect(0, 0, w, h)
  g.fillStyle = '#115633'
  g.fillRect(0, 0, w, 54)
  g.fillStyle = '#fff'
  g.font = 'bold 28px sans-serif'
  g.fillText(saved.value ? 'My story - Saved' : 'My story - not saved', 22, 37)
  g.fillStyle = '#ffffff'
  g.fillRect(40, 80, w - 80, h - 120)
  g.fillStyle = '#111827'
  g.font = 'bold 88px sans-serif'
  g.fillText(typed.value, 80, 230)
  const tw = g.measureText(typed.value).width
  g.fillStyle = '#15874a'
  g.fillRect(84 + tw, 160, 6, 84)
  if (saved.value) {
    g.fillStyle = '#7c3aed'
    g.beginPath()
    g.roundRect(w - 330, h - 120, 270, 56, 14)
    g.fill()
    g.fillStyle = '#fff'
    g.font = 'bold 30px sans-serif'
    g.fillText('Saved to disk', w - 300, h - 82)
  }
  screenTex.needsUpdate = true
}

// The key for the letter: a cap that lights up and goes down
function keyPos(c: string) {
  const rows = ['1234567890', 'qwertyuiop', 'asdfghjkl', 'zxcvbnm']
  const r = rows.findIndex(row => row.includes(c.toLowerCase()))
  const col = rows[r].indexOf(c.toLowerCase()) + 1
  return V(-0.19 + col * 0.0195 + r * 0.004, 0.027, -0.045 + r * 0.02)
}
let pressT = 0
function pressKey() {
  if (!keyCap) return
  keyCap.position.copy(keyPos(letter.value || 'A'))
  keyCap.visible = true
  pressT = 0.0001
  kb.updateMatrixWorld(true)
  W.key = kb.localToWorld(keyCap.position.clone())
}

function glowOnly(objs: THREE.Object3D[]) {
  for (const o of [kb, monitor, rig?.ports, ...(rig ? Object.values(rig.parts) : [])]) if (o) setEmissive(o, 0, 0)
  glowing = objs
}
let glowing: THREE.Object3D[] = []

// The packet moving along a route
let trip: { curve: THREE.CatmullRomCurve3; t: number; ms: number; done: () => void } | null = null
function run(s: Stage) {
  const pts = s.path()
  const all = s.loops ? Array.from({ length: s.loops }, () => pts).flat() : pts
  packet.visible = true
  moving.value = true
  const curve = new THREE.CatmullRomCurve3(all)
  const len = curve.getLength()
  trip = {
    curve,
    t: 0,
    ms: Math.max(1600, Math.min(4200, len * 3200)) * (s.loops ? 1.4 : 1),
    done: () => {
      moving.value = false
      s.arrive?.()
      if (autoPlay.value && phase.value === 'tour') {
        window.setTimeout(() => {
          if (!autoPlay.value || phase.value !== 'tour' || moving.value) return
          if (stageIndex.value + 1 < STAGES.length) go(stageIndex.value + 1)
        }, 2600)
      }
    }
  }
}

onMounted(async () => {
  window.addEventListener('keydown', onKey)
  await nextTick()
  if (!host.value) return
  try {
    wb.value = createWorkbench(host.value, { cameraPosition: OVERVIEW.pos.toArray(), target: OVERVIEW.target.toArray(), minDistance: 0.08, maxDistance: 1.8, near: 0.005 })
  } catch {
    unsupported.value = true
    return
  }
  const w = wb.value
  w.controls.enablePan = false

  // the system unit, open side to us, on the right
  rig = buildPc()
  computer = new THREE.Group()
  computer.add(rig.shell)
  for (const k of Object.keys(rig.parts) as PcPartKey[]) computer.add(rig.parts[k])
  computer.add(rig.cables.sata, rig.cables.atx24, rig.cables.cpu_fan, rig.cables.fpanel)
  rig.parts.cooler.visible = false
  rig.cables.cpu_fan.visible = false
  computer.position.set(0.3, 0, -0.14)
  w.scene.add(computer)

  // the monitor on the left, the keyboard in front
  monitor = buildDevice('monitor')
  monitor.position.set(-0.3, 0, -0.2)
  w.scene.add(monitor)
  kb = buildDevice('keyboard')
  kb.position.set(-0.13, 0, 0.2)
  w.scene.add(kb)
  keyCap = new THREE.Mesh(new THREE.BoxGeometry(0.0165, 0.009, 0.0165), new THREE.MeshStandardMaterial({ color: 0x22c55e, emissive: 0x16a34a, emissiveIntensity: 0.9 }))
  keyCap.visible = false
  kb.add(keyCap)

  // the document on the monitor's screen
  screenCanvas = document.createElement('canvas')
  screenCanvas.width = 1024
  screenCanvas.height = 576
  screenTex = new THREE.CanvasTexture(screenCanvas)
  screenTex.colorSpace = THREE.SRGBColorSpace
  screenTex.anisotropy = 8
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.282), new THREE.MeshBasicMaterial({ map: screenTex, toneMapped: false }))
  screen.position.set(0, 0.275, 0.0075)
  monitor.add(screen)
  drawScreen()

  w.scene.updateMatrixWorld(true)
  // the places the packet passes
  W.key = kb.localToWorld(keyPos('A'))
  W.kbOut = kb.localToWorld(V(0, 0.01, -0.15))
  W.usbIn = rig.ports.localToWorld(V(0.0, 0.05, 0.0))
  W.usbOut = rig.ports.localToWorld(V(0.012, 0.05, 0.0))
  W.mbCentre = rig.parts.motherboard.localToWorld(V(0, 0, 0))
  W.cpu = rig.parts.cpu.localToWorld(V(0, 0, 0.004))
  W.ram = rig.parts.ram.localToWorld(V(0.0075, 0.0, 0.034))
  W.gpu = rig.parts.gpu.localToWorld(V(0, -0.016, 0.11))
  W.gpuOut = rig.parts.gpu.localToWorld(V(0.112, -0.012, 0.03))
  W.hdd = rig.parts.hdd.localToWorld(V(0.074, 0, -0.02))
  W.sataMid = rig.parts.hdd.localToWorld(V(0.11, -0.02, 0.0))
  W.screen = monitor.localToWorld(V(0, 0.275, 0.01))
  W.monIn = monitor.localToWorld(V(0.08, 0.16, -0.035))

  // the keyboard cable: round the front of the system unit to the USB port at the back
  const back = W.usbOut.x + 0.04
  cablePath.kb = [W.kbOut, V(W.kbOut.x + 0.05, 0.006, W.kbOut.z - 0.04), V(0.1, 0.006, 0.06), V(back + 0.02, 0.006, 0.06), V(back + 0.02, 0.006, W.usbOut.z), V(back, W.usbOut.y, W.usbOut.z), W.usbOut]
  w.scene.add(tube(cablePath.kb, 0.003, 0x1c1f24))
  // the monitor cable: out of the graphics card at the back, behind the system unit, up to the monitor
  cablePath.monitor = [W.gpuOut, V(back, W.gpuOut.y, W.gpuOut.z), V(back + 0.02, 0.006, W.gpuOut.z - 0.04), V(back - 0.05, 0.006, -0.3), V(-0.1, 0.006, -0.3), V(W.monIn.x, 0.006, W.monIn.z - 0.04), V(W.monIn.x, W.monIn.y - 0.06, W.monIn.z - 0.01), W.monIn, W.screen]
  w.scene.add(tube(cablePath.monitor.slice(0, -1), 0.0035, 0x1e3a8a))

  // the packet: a bright bead with a light, and a fading trail
  packet = new THREE.Group()
  const bead = new THREE.Mesh(new THREE.SphereGeometry(0.0075, 20, 14), new THREE.MeshBasicMaterial({ color: 0xfde047, toneMapped: false }))
  packet.add(bead)
  const halo = new THREE.Mesh(new THREE.SphereGeometry(0.014, 20, 14), new THREE.MeshBasicMaterial({ color: 0xfacc15, transparent: true, opacity: 0.28, depthWrite: false, toneMapped: false }))
  packet.add(halo)
  const light = new THREE.PointLight(0xfacc15, 0.6, 0.25)
  packet.add(light)
  packet.visible = false
  w.scene.add(packet)
  for (let i = 0; i < 7; i++) {
    const t = new THREE.Mesh(new THREE.SphereGeometry(0.0055 * (1 - i / 9), 12, 10), new THREE.MeshBasicMaterial({ color: 0xfacc15, transparent: true, opacity: 0.55 * (1 - i / 7), depthWrite: false, toneMapped: false }))
    t.visible = false
    trail.push(t)
    w.scene.add(t)
  }

  const tmp = new THREE.Vector3()
  w.onFrame(dt => {
    // fans turn
    for (const s of rig!.spinners) s.obj.rotation[s.axis] += dt * s.speed
    // the key goes down and comes back up
    if (pressT > 0) {
      pressT += dt
      keyCap.position.y = 0.027 - Math.sin(Math.min(1, pressT / 0.35) * Math.PI) * 0.004
      if (pressT > 0.35) pressT = 0
    }
    // what glows, pulses
    const pulse = 0.1 + 0.08 * Math.sin(performance.now() / 220)
    for (const o of glowing) setEmissive(o, 0xfacc15, pulse)
    // the packet on its way
    if (trip) {
      trip.t = Math.min(1, trip.t + (dt * 1000) / trip.ms)
      const e = trip.t < 0.5 ? 2 * trip.t * trip.t : 1 - (-2 * trip.t + 2) ** 2 / 2
      trip.curve.getPointAt(e, tmp)
      packet.position.copy(tmp)
      trail.forEach((m, i) => {
        const u = e - (i + 1) * 0.018
        m.visible = u > 0 && trip!.t < 1
        if (m.visible) trip!.curve.getPointAt(u, m.position)
      })
      if (trip.t >= 1) {
        const done = trip.done
        trip = null
        trail.forEach(m => (m.visible = false))
        done()
      }
    }
    halo.scale.setScalar(1 + 0.25 * Math.sin(performance.now() / 130))
    // the camera glides to each stop
    if (camGoal) {
      const k = 1 - Math.exp(-dt * 3)
      w.camera.position.lerp(camGoal.pos, k)
      w.controls.target.lerp(camGoal.target, k)
      if (w.camera.position.distanceTo(camGoal.pos) < 0.002) camGoal = null
    }
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  wb.value?.dispose()
})
</script>
