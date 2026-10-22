<template>
  <!-- Spot the hazard: a computer lab in 3D with dangers hidden round it - a drink by a keyboard,
       an overloaded socket, a damaged cable, a bag in the aisle... Find them all before the time
       runs out. Each one found says what is wrong, the rule it breaks and what to do. Things done
       right are there too, so think before tapping. Saved for students as 'hazards'. -->
  <div>
    <div class="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
      <RouterLink :to="`/${role}/ict-lab`" class="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Back to the ICT Lab">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </RouterLink>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">ICT Lab · Safety</p>
        <h1 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight">Spot the hazard</h1>
      </div>
    </div>

    <!-- score strip -->
    <div class="grid grid-cols-3 gap-2 mb-3">
      <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2">
        <p class="text-[11px] text-gray-500 dark:text-gray-400">Hazards found</p>
        <p class="text-lg font-bold text-gray-900 dark:text-white tabular-nums leading-tight">{{ found.length }} <span class="text-sm font-semibold text-gray-400">of {{ round.length }}</span></p>
      </div>
      <div class="rounded-xl border px-3 py-2" :class="timeLeft <= 20 && phase === 'play' ? 'border-rose-300 bg-rose-50 dark:bg-rose-900/20 dark:border-rose-800' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'">
        <p class="text-[11px] text-gray-500 dark:text-gray-400">Time left</p>
        <p class="text-lg font-bold tabular-nums leading-tight" :class="timeLeft <= 20 && phase === 'play' ? 'text-rose-600' : 'text-gray-900 dark:text-white'">{{ fmt(timeLeft) }}</p>
      </div>
      <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2">
        <p class="text-[11px] text-gray-500 dark:text-gray-400">Wrong taps · hints</p>
        <p class="text-lg font-bold text-gray-900 dark:text-white tabular-nums leading-tight">{{ wrongTaps }} · {{ hints }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_22rem] gap-4 items-start">
      <section class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 sm:p-3">
        <div v-if="!unsupported" class="relative w-full h-[52vh] min-h-[320px] lg:h-[64vh] rounded-xl overflow-hidden bg-slate-200">
          <div ref="host" class="absolute inset-0 cursor-crosshair" @pointerdown="onDown" @pointerup="onUp"></div>

          <!-- a quick word where the student tapped -->
          <Transition name="dash-pop">
            <div v-if="toast" class="absolute left-1/2 top-3 -translate-x-1/2 max-w-[90%] px-3 py-2 rounded-xl shadow-lg text-sm font-semibold pointer-events-none" :class="toast.good ? 'bg-emerald-600 text-white' : 'bg-gray-900/90 text-white'">{{ toast.text }}</div>
          </Transition>

          <!-- before the start -->
          <div v-if="phase === 'ready'" class="absolute inset-0 bg-gray-900/45 flex items-center justify-center p-4">
            <div class="max-w-sm rounded-2xl bg-white dark:bg-gray-800 p-5 text-center shadow-xl">
              <span class="mx-auto w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center"><AppIcon name="warning" class="w-6 h-6" /></span>
              <p class="mt-2 text-lg font-bold text-gray-900 dark:text-white">Find {{ ROUND_SIZE }} hazards in {{ ROUND_SECONDS / 60 }} minutes</p>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">Something is wrong in this computer lab. Drag to look around, pinch or scroll to zoom in, and tap each danger you see. Some things are done right - tapping those costs you.</p>
              <button type="button" class="btn-primary mt-4" @click="start">Start</button>
            </div>
          </div>

          <div class="absolute bottom-2 left-2 right-2 flex items-end justify-between gap-2 pointer-events-none">
            <span class="hidden sm:inline px-2 py-1 rounded-lg bg-black/45 text-white text-[11px]">Tap a danger · drag to look round · pinch or scroll to zoom</span>
            <div class="flex gap-1.5 pointer-events-auto ml-auto">
              <button type="button" class="px-2.5 py-1 rounded-lg bg-white/90 text-gray-800 text-xs font-semibold shadow-sm hover:bg-white" @click="wholeView">Whole room</button>
              <button v-if="phase === 'play'" type="button" class="px-2.5 py-1 rounded-lg bg-amber-400 text-gray-900 text-xs font-semibold shadow-sm hover:bg-amber-300" @click="hint">Hint</button>
            </div>
          </div>
        </div>
        <p v-else class="text-sm text-gray-500 p-6 text-center">This device cannot show 3D.</p>
      </section>

      <aside class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 lg:sticky lg:top-20 space-y-3">
        <!-- the result -->
        <div v-if="phase === 'done'" class="text-center pb-2 border-b border-gray-100 dark:border-gray-700">
          <span class="mx-auto w-12 h-12 rounded-2xl flex items-center justify-center" :class="score >= 80 ? 'bg-indigo-600 text-white' : 'bg-amber-500 text-white'"><AppIcon :name="score >= 80 ? 'trophy' : 'bulb'" class="w-6 h-6" /></span>
          <p class="mt-2 text-3xl font-bold text-gray-900 dark:text-white tabular-nums">{{ score }}%</p>
          <p class="text-sm text-gray-600 dark:text-gray-300">{{ found.length }} of {{ round.length }} found{{ found.length === round.length ? ` with ${fmt(timeLeft)} to spare` : '' }}</p>
          <p class="mt-1 text-sm font-semibold" :class="score >= 80 ? 'text-indigo-800 dark:text-indigo-200' : 'text-amber-800 dark:text-amber-200'">{{ score >= 80 ? 'Sharp eyes - you would keep this lab safe.' : 'Look at the ones you missed, then try a new room.' }}</p>
          <p v-if="role !== 'student'" class="mt-1 text-xs text-gray-500">Practice - results are only saved for students.</p>
          <div class="mt-3 flex justify-center gap-2">
            <button type="button" class="btn-primary !py-1.5 !text-sm" @click="newRound">New room</button>
            <RouterLink :to="`/${role}/ict-lab/rules`" class="btn-secondary !py-1.5 !text-sm">Lab rules</RouterLink>
          </div>
        </div>

        <!-- the last one found, in full -->
        <div v-if="current" class="rounded-xl border-2 p-3" :class="isFound(current.key) ? 'border-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-800' : 'border-rose-300 bg-rose-50 dark:bg-rose-900/20 dark:border-rose-800'">
          <p class="text-[11px] font-bold uppercase tracking-wide" :class="isFound(current.key) ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'">{{ isFound(current.key) ? 'Hazard found' : 'You missed this one' }}</p>
          <p class="text-base font-bold text-gray-900 dark:text-white leading-snug">{{ current.name }}</p>
          <p class="mt-1 text-sm text-gray-700 dark:text-gray-200"><span class="font-semibold">What is wrong:</span> {{ current.wrong }}</p>
          <p class="mt-1 text-sm text-gray-700 dark:text-gray-200"><span class="font-semibold">What to do:</span> {{ current.fix }}</p>
          <p class="mt-1.5 text-xs text-gray-500 dark:text-gray-400">Rule {{ current.rule + 1 }}: {{ LAB_RULES[current.rule].rule }}</p>
        </div>
        <p v-else-if="phase === 'play'" class="text-sm text-gray-600 dark:text-gray-300">Look carefully: on the benches, on the screens, on the floor and by the walls. Zoom in on anything that looks wrong.</p>

        <!-- the round so far -->
        <div>
          <p class="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5">{{ phase === 'done' ? 'Every hazard in this room' : 'Found so far' }}</p>
          <ul class="space-y-1">
            <li v-for="h in listed" :key="h.key">
              <button type="button" class="w-full text-left flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700/50" @click="showMe(h)">
                <span class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[11px] font-bold" :class="isFound(h.key) ? 'bg-emerald-600' : 'bg-rose-500'">{{ isFound(h.key) ? '✓' : '!' }}</span>
                <span class="flex-1 text-gray-800 dark:text-gray-100">{{ h.name }}</span>
                <span v-if="phase === 'done' && !isFound(h.key)" class="text-xs font-semibold text-indigo-600 dark:text-indigo-300">Show me</span>
              </button>
            </li>
            <li v-for="n in phase === 'done' ? 0 : round.length - found.length" :key="'q' + n" class="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-400">
              <span class="w-5 h-5 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 flex-shrink-0"></span> Not found yet
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick, shallowRef } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import * as THREE from 'three'
import AppIcon from '@/components/common/AppIcon.vue'
import { createWorkbench, type Workbench } from '@/components/ictlab/three/workbench'
import { HAZARDS, DECOYS, centreStation, type Hazard } from '@/components/ictlab/hazards'
import { LAB_RULES } from '@/components/ictlab/labRules'
import { labRoleOf } from '@/components/ictlab/types'

const route = useRoute()
const role = computed(() => labRoleOf(route.path))
const ROUND_SIZE = 8
const ROUND_SECONDS = 120

const phase = ref<'ready' | 'play' | 'done'>('ready')
const round = shallowRef<Hazard[]>([])
const found = ref<string[]>([])
const wrongTaps = ref(0)
const hints = ref(0)
const timeLeft = ref(ROUND_SECONDS)
const current = shallowRef<Hazard | null>(null)
const toast = ref<{ text: string; good: boolean } | null>(null)
const isFound = (k: string) => found.value.includes(k)
const listed = computed(() => (phase.value === 'done' ? round.value : round.value.filter(h => isFound(h.key))))
// Each missed hazard costs 15, each wrong tap 5, each hint 3 (the attempt is scored 100 - 5 a mistake - 3 a hint)
const missed = computed(() => round.value.length - found.value.length)
const score = computed(() => Math.max(0, 100 - missed.value * 15 - wrongTaps.value * 5 - hints.value * 3))
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.max(0, Math.floor(s % 60))).padStart(2, '0')}`

let timer = 0
let toastTimer = 0
function say(text: string, good = false) {
  toast.value = { text, good }
  clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => (toast.value = null), 2200)
}

function start() {
  phase.value = 'play'
  timeLeft.value = ROUND_SECONDS
  clearInterval(timer)
  timer = window.setInterval(() => {
    timeLeft.value -= 1
    if (timeLeft.value <= 0) finish()
  }, 1000)
}
function newRound() {
  clearInterval(timer)
  // a new mix of hazards each time
  round.value = [...HAZARDS].sort(() => Math.random() - 0.5).slice(0, ROUND_SIZE)
  found.value = []
  wrongTaps.value = 0
  hints.value = 0
  current.value = null
  timeLeft.value = ROUND_SECONDS
  phase.value = 'ready'
  placeHazards()
  wholeView()
}
async function finish() {
  if (phase.value !== 'play') return
  clearInterval(timer)
  phase.value = 'done'
  current.value = round.value.find(h => !isFound(h.key)) || current.value
  if (role.value !== 'student') return
  try {
    await axios.post('/api/student/ict-lab/attempts', {
      activity_key: 'hazards',
      level: 'simple',
      steps_total: round.value.length,
      mistakes: missed.value * 3 + wrongTaps.value,
      hints_used: hints.value,
      duration_seconds: ROUND_SECONDS - Math.max(0, timeLeft.value)
    })
  } catch {
    // the result still shows; it just is not kept
  }
}

// ------------------------------------------------------------ 3D
const host = ref<HTMLDivElement | null>(null)
const wb = shallowRef<Workbench | null>(null)
const unsupported = ref(false)
const objects = new Map<string, THREE.Group>()
const decoys = new Map<string, THREE.Group>()
const marks = new Map<string, THREE.Sprite>()
let hintRing: THREE.Sprite | null = null
let hintUntil = 0
const VIEW = { pos: new THREE.Vector3(0.3, 0.95, 3.3), target: new THREE.Vector3(0.3, -0.25, 0.1) }
let camGoal: { pos: THREE.Vector3; target: THREE.Vector3 } | null = null

function spriteTex(paint: (g: CanvasRenderingContext2D) => void) {
  const c = document.createElement('canvas')
  c.width = 128
  c.height = 128
  paint(c.getContext('2d')!)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}
const tickTex = () => spriteTex(g => {
  g.fillStyle = '#16a34a'
  g.beginPath(); g.arc(64, 64, 56, 0, Math.PI * 2); g.fill()
  g.strokeStyle = '#fff'; g.lineWidth = 12; g.lineCap = 'round'; g.lineJoin = 'round'
  g.beginPath(); g.moveTo(36, 66); g.lineTo(56, 86); g.lineTo(94, 44); g.stroke()
})
const missTex = () => spriteTex(g => {
  g.fillStyle = '#e11d48'
  g.beginPath(); g.arc(64, 64, 56, 0, Math.PI * 2); g.fill()
  g.fillStyle = '#fff'; g.font = 'bold 84px sans-serif'; g.textAlign = 'center'; g.fillText('!', 64, 94)
})
const ringTex = () => spriteTex(g => {
  g.strokeStyle = '#facc15'; g.lineWidth = 10
  g.beginPath(); g.arc(64, 64, 52, 0, Math.PI * 2); g.stroke()
})
function marker(tex: THREE.Texture, at: THREE.Vector3Tuple, size = 0.09) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true }))
  s.position.set(at[0], at[1] + 0.12, at[2])
  s.scale.set(size, size, 1)
  s.renderOrder = 20
  return s
}

// Put this round's hazards in the room (and take the others out)
function placeHazards() {
  const w = wb.value
  if (!w) return
  for (const g of objects.values()) w.scene.remove(g)
  objects.clear()
  for (const s of marks.values()) w.scene.remove(s)
  marks.clear()
  for (const h of round.value) {
    const g = h.build()
    g.userData.hazard = h.key
    objects.set(h.key, g)
    w.scene.add(g)
  }
}

function lookAt(at: THREE.Vector3Tuple, dist = 0.9) {
  const target = new THREE.Vector3(...at)
  const aspect = wb.value?.camera.aspect || 1.5
  const d = dist * (aspect < 1.2 ? Math.min(1.8, 1.2 / aspect) : 1)
  camGoal = { pos: target.clone().add(new THREE.Vector3(0.1, 0.45, 1).normalize().multiplyScalar(d)), target }
}
function wholeView() {
  // a tall, narrow view (a phone) stands further back to fit the bench in
  const aspect = wb.value?.camera.aspect || 1.5
  const back = aspect < 1.25 ? Math.min(2.1, 1.25 / aspect) : 1
  camGoal = { pos: VIEW.target.clone().add(VIEW.pos.clone().sub(VIEW.target).multiplyScalar(back)), target: VIEW.target.clone() }
}
function showMe(h: Hazard) {
  current.value = h
  lookAt(h.at)
}

// A tap (not a drag): what is under it?
let downAt: { x: number; y: number } | null = null
const onDown = (e: PointerEvent) => { downAt = { x: e.clientX, y: e.clientY } }
function onUp(e: PointerEvent) {
  if (!downAt || Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y) > 6) return
  downAt = null
  if (phase.value !== 'play' || !wb.value) return
  const hit = wb.value.pick(e, [...objects.values(), ...decoys.values()])
  if (!hit) return
  const hk = hit.userData.hazard as string | undefined
  if (hk) {
    if (isFound(hk)) return
    const h = round.value.find(x => x.key === hk)!
    found.value = [...found.value, hk]
    current.value = h
    const m = marker(tickTex(), h.at)
    marks.set(hk, m)
    wb.value.scene.add(m)
    say(`Found: ${h.name}`, true)
    if (found.value.length === round.value.length) finish()
    return
  }
  const d = DECOYS.find(x => x.key === hit.userData.decoy)
  if (d) {
    wrongTaps.value++
    say(`Not a hazard. ${d.why}`)
  }
}

function hint() {
  const left = round.value.filter(h => !isFound(h.key))
  if (!left.length || !wb.value) return
  hints.value++
  const h = left[Math.floor(Math.random() * left.length)]
  if (hintRing) wb.value.scene.remove(hintRing)
  hintRing = marker(ringTex(), [h.at[0], h.at[1] - 0.12, h.at[2]], 0.3)
  wb.value.scene.add(hintRing)
  hintUntil = performance.now() + 3500
  say('Look inside the yellow ring')
}

onMounted(async () => {
  await nextTick()
  if (!host.value) return
  try {
    wb.value = createWorkbench(host.value, { cameraPosition: VIEW.pos.toArray(), target: VIEW.target.toArray(), minDistance: 0.25, maxDistance: 7 })
  } catch {
    unsupported.value = true
    return
  }
  const w = wb.value
  // look round the room, not behind its walls
  w.controls.minAzimuthAngle = -0.8
  w.controls.maxAzimuthAngle = 0.8
  w.controls.maxPolarAngle = 1.45
  // a wider lens, so the whole bench fits in view
  w.camera.fov = 56
  w.camera.updateProjectionMatrix()
  w.scene.add(centreStation())
  for (const d of DECOYS) {
    const g = d.build()
    g.userData.decoy = d.key
    decoys.set(d.key, g)
    w.scene.add(g)
  }
  newRound()

  w.onFrame(dt => {
    const t = performance.now() / 1000
    for (const h of round.value) {
      const g = objects.get(h.key)
      if (g && h.animate) h.animate(g, t)
    }
    // found marks bob gently
    for (const [k, s] of marks) {
      const h = round.value.find(x => x.key === k)
      if (h) s.position.y = h.at[1] + 0.12 + Math.sin(t * 3) * 0.01
    }
    if (hintRing) {
      const left = hintUntil - performance.now()
      hintRing.material.opacity = Math.max(0, Math.min(1, left / 600)) * (0.6 + 0.4 * Math.sin(t * 10))
      if (left <= 0) {
        w.scene.remove(hintRing)
        hintRing = null
      }
    }
    if (camGoal) {
      const k = 1 - Math.exp(-dt * 3)
      w.camera.position.lerp(camGoal.pos, k)
      w.controls.target.lerp(camGoal.target, k)
      if (w.camera.position.distanceTo(camGoal.pos) < 0.003) camGoal = null
    }
  })
})

// once the round is over, the missed ones are marked too
function markMissed() {
  const w = wb.value
  if (!w) return
  for (const h of round.value) {
    if (isFound(h.key) || marks.has(h.key)) continue
    const m = marker(missTex(), h.at)
    marks.set(h.key, m)
    w.scene.add(m)
  }
}
watch(phase, p => { if (p === 'done') markMissed() })

onBeforeUnmount(() => {
  clearInterval(timer)
  clearTimeout(toastTimer)
  wb.value?.dispose()
})
</script>
