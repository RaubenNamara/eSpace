<template>
  <!-- Plays the slides: full screen (Slide Show), in the window (Reading View), on the slide being
       made (Preview of a transition or the animations), or with a clock (Rehearse Timings). Each
       slide comes as a picture of what doesn't move plus a picture per animated object, so
       transitions and animations are CSS (slideFx below). -->
  <div
    ref="root"
    class="slide-show outline-none select-none"
    :class="mode === 'full' || mode === 'rehearse' ? 'fixed inset-0 z-[80] bg-black' : mode === 'reading' ? 'fixed inset-0 z-[80] bg-[#3b3b3b] flex flex-col' : 'absolute inset-0 z-20'"
    tabindex="0"
    @keydown="onKey"
  >
    <div ref="area" class="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden" @click="onClick">
      <div v-if="!ended" class="relative overflow-hidden" :style="{ width: `${size.w}px`, height: `${size.h}px` }">
        <!-- the slide being left, while the transition runs -->
        <div v-if="leaving !== null && slides[leaving]" class="absolute inset-0" :class="trans.outOnTop ? 'z-20' : 'z-0'" :style="trans.outStyle">
          <img :src="slides[leaving].base" alt="" class="absolute inset-0 w-full h-full" draggable="false">
          <img v-for="l in slides[leaving].layers" :key="l.id" :src="l.url" alt="" class="absolute" :style="boxStyle(l.box)" draggable="false">
        </div>
        <!-- the slide -->
        <div :key="`slide-${at}-${enterKey}`" class="absolute inset-0 z-10" :style="trans.inStyle">
          <img :src="slide.base" alt="" class="absolute inset-0 w-full h-full" draggable="false">
          <img v-for="l in placed" :key="`${l.id}-${l.playing ? started : 'x'}`" :src="l.url" alt="" class="absolute" :style="l.style" draggable="false">
          <template v-for="(m, mi) in slide.media" :key="`m${mi}`">
            <video v-if="m.kind === 'video'" :src="m.src" class="absolute bg-black object-contain" :style="boxStyle(m.box)" :controls="showMediaControls" playsinline @click.stop></video>
            <audio v-else :src="m.src" class="absolute" :style="{ ...boxStyle(m.box), height: 'auto', minWidth: '180px' }" :controls="showMediaControls" @click.stop></audio>
          </template>
          <a v-for="(k, ki) in slide.links" :key="`k${ki}`" :href="k.url" target="_blank" rel="noopener noreferrer" class="absolute cursor-pointer" :style="boxStyle(k.box)" :title="k.url" @click.stop></a>
        </div>
      </div>
      <p v-else class="text-white/80 text-sm">End of slide show, click to exit.</p>
    </div>

    <!-- Reading View: a bar to move through the slides -->
    <div v-if="mode === 'reading'" class="flex-shrink-0 flex items-center gap-3 px-3 py-1.5 bg-[#2b2b2b] text-white text-xs">
      <span>Slide {{ at + 1 }} of {{ slides.length }}</span>
      <button type="button" class="ml-auto px-2 py-1 rounded hover:bg-white/10" :disabled="at === 0 && started <= firstStarted" @click.stop="back">◀ Previous</button>
      <button type="button" class="px-2 py-1 rounded hover:bg-white/10" @click.stop="next">Next ▶</button>
      <button type="button" class="px-2 py-1 rounded bg-white/15 hover:bg-white/25" @click.stop="close">Normal view</button>
    </div>

    <!-- Rehearse Timings: the clock -->
    <div v-if="mode === 'rehearse'" class="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded bg-white text-gray-900 text-xs shadow" @click.stop>
      <span class="font-semibold">Recording</span>
      <button type="button" class="px-2 py-0.5 rounded border" @click="next">Next ▶</button>
      <span class="tabular-nums">{{ clock(slideSeconds) }}</span>
      <span class="text-gray-400">|</span>
      <span class="tabular-nums">{{ clock(totalSeconds) }}</span>
      <button type="button" class="px-2 py-0.5 rounded border" @click="close">Done</button>
    </div>

    <template v-if="mode === 'full'">
      <button type="button" class="absolute top-3 right-3 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white text-xs opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity" @click.stop="close">End Show (Esc)</button>
      <span class="absolute bottom-3 right-4 text-white/50 text-xs">{{ at + 1 }} / {{ slides.length }}</span>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { animDef, fromOffset, transitionDef, type ObjectAnim, type SlideAdvance, type SlideTransition } from './effects'

export interface Box { l: number; t: number; w: number; h: number }
export interface ShowLayer { id: string; url: string; box: Box; anim: ObjectAnim }
export interface ShowSlide {
  base: string
  layers: ShowLayer[]
  media: { kind: 'video' | 'audio'; src: string; box: Box }[]
  links: { url: string; box: Box }[]
  transition?: SlideTransition | null
  advance?: SlideAdvance | null
  narration?: string | null
}

const props = withDefaults(defineProps<{
  slides: ShowSlide[]
  start?: number
  mode?: 'full' | 'reading' | 'preview' | 'rehearse'
  /** width / height of a slide */
  aspect?: number
  playNarrations?: boolean
  useTimings?: boolean
  showMediaControls?: boolean
  loop?: boolean
  /** preview: play the transition into the first slide (from the one before it) */
  previewFrom?: number | null
}>(), { start: 0, mode: 'full', aspect: 16 / 9, playNarrations: true, useTimings: true, showMediaControls: true, loop: false, previewFrom: null })
const emit = defineEmits<{ close: [timings: number[] | null] }>()

const root = ref<HTMLElement | null>(null)
const area = ref<HTMLElement | null>(null)
const at = ref(Math.min(Math.max(0, props.start), Math.max(0, props.slides.length - 1)))
const slide = computed(() => props.slides[at.value] || { base: '', layers: [], media: [], links: [] })
const ended = ref(false)

// ---- the size of the slide on the screen ----
const size = reactive({ w: 0, h: 0 })
const measure = () => {
  const el = area.value
  if (!el) return
  const pad = props.mode === 'reading' ? 24 : 0
  const w = el.clientWidth - pad, h = el.clientHeight - pad
  size.w = Math.max(10, Math.min(w, h * props.aspect))
  size.h = size.w / props.aspect
}
const boxStyle = (b: Box) => ({ left: `${b.l * 100}%`, top: `${b.t * 100}%`, width: `${b.w * 100}%`, height: `${b.h * 100}%` })

// ---- animations: in groups, one group per click ----
interface Planned { id: string; group: number; startAt: number; duration: number }
const plan = computed(() => {
  const layers = [...slide.value.layers].sort((a, b) => a.anim.order - b.anim.order)
  const groups: { auto: boolean; end: number }[] = []
  const planned: Record<string, Planned> = {}
  let cursor = 0, lastBase = 0
  for (const l of layers) {
    const a = l.anim
    const duration = animDef(a.effect)?.key === 'appear' ? 0.01 : Math.max(0.05, a.duration)
    let startAt: number
    if (a.start === 'click' || !groups.length) {
      groups.push({ auto: a.start !== 'click', end: 0 })
      cursor = 0
      lastBase = 0
      startAt = a.delay
    } else if (a.start === 'with') {
      startAt = lastBase + a.delay
    } else {
      lastBase = cursor
      startAt = cursor + a.delay
    }
    if (a.start !== 'with') lastBase = startAt - a.delay
    cursor = Math.max(cursor, startAt + duration)
    groups[groups.length - 1].end = cursor
    planned[l.id] = { id: l.id, group: groups.length - 1, startAt, duration }
  }
  return { groups, planned }
})
/** how many groups have been started on this slide */
const started = ref(0)
const firstStarted = computed(() => (plan.value.groups[0]?.auto ? 1 : 0))
/** when a slide is gone back to, everything on it is already showing */
const instant = ref(false)

const CLIP: Record<string, string> = { left: 'inset(0 100% 0 0)', right: 'inset(0 0 0 100%)', top: 'inset(0 0 100% 0)', bottom: 'inset(100% 0 0 0)' }
const placed = computed(() => slide.value.layers.map(l => {
  const p = plan.value.planned[l.id]
  const def = animDef(l.anim.effect)
  const playing = !instant.value && p.group === started.value - 1
  const style: Record<string, string> = { ...boxStyle(l.box) }
  if (def?.kind === 'entrance' && p.group >= started.value) style.visibility = 'hidden'
  if (playing && def) {
    const far = l.anim.effect === 'fly' ? '120vmax' : '30%'
    const off = fromOffset(l.anim.dir || 'bottom', far)
    style['--dx'] = off.x
    style['--dy'] = off.y
    style['--clip'] = CLIP[l.anim.dir || 'left']
    style.animation = `tsa-${def.key} ${p.duration}s ${def.key === 'bounce' ? 'linear' : 'ease-out'} ${p.startAt}s both`
  }
  return { ...l, style, playing }
}))

// ---- transitions ----
const leaving = ref<number | null>(null)
const enterKey = ref(0)
const OUT_ANIM: Record<string, string> = { push: 'tst-move-out', reveal: 'tst-reveal', uncover: 'tst-move-out', fall: 'tst-fall', drape: 'tst-drape', curtains: 'tst-curtains', wind: 'tst-wind', prestige: 'tst-prestige' }
const IN_ANIM: Record<string, string> = { fade: 'tst-fade', push: 'tst-move-in', wipe: 'tst-clip', split: 'tst-split', bars: 'tst-bars', shape: 'tst-shape', cover: 'tst-move-in', flash: 'tst-flash', zoom: 'tst-zoom' }
const trans = computed(() => {
  const t = slide.value.transition
  const def = transitionDef(t?.type)
  if (leaving.value === null || !t || !def || def.key === 'none' || def.key === 'cut') return { inStyle: {}, outStyle: {}, outOnTop: false }
  const dur = `${Math.max(0.1, t.duration || 1)}s`
  const off = fromOffset(t.dir || (def.key === 'push' ? 'bottom' : 'right'), '100%')
  const vars = { '--dx': off.x, '--dy': off.y, '--clip': CLIP[t.dir || 'right'] }
  const inA = IN_ANIM[def.key], outA = OUT_ANIM[def.key]
  return {
    inStyle: inA ? { ...vars, animation: `${inA} ${dur} ease-in-out both` } : {},
    outStyle: outA ? { ...vars, animation: `${outA} ${dur} ease-in-out both` } : {},
    outOnTop: !!def.out
  }
})

// ---- moving on ----
let timer: number | null = null
const clearTimer = () => { if (timer) { clearTimeout(timer); timer = null } }
const groupEnd = (g: number) => (plan.value.groups[g]?.end || 0) * 1000
const transitionMs = () => (slide.value.transition && !['none', 'cut'].includes(slide.value.transition.type) ? (slide.value.transition.duration || 1) * 1000 : 0)

const schedule = () => {
  clearTimer()
  const groups = plan.value.groups
  if (props.mode === 'preview') {
    // a preview plays everything by itself, then gives the slide back
    const wait = transitionMs() + (started.value ? groupEnd(started.value - 1) : 0) + 350
    timer = window.setTimeout(() => (started.value < groups.length ? (started.value++, schedule()) : close()), wait)
    return
  }
  const adv = slide.value.advance
  if (started.value >= groups.length && props.useTimings && adv?.after != null && props.mode !== 'rehearse') {
    timer = window.setTimeout(next, transitionMs() + (started.value ? groupEnd(started.value - 1) : 0) + adv.after * 1000)
  }
}

let narration: HTMLAudioElement | null = null
const enter = (i: number, opts: { back?: boolean; transition?: boolean } = {}) => {
  clearTimer()
  narration?.pause()
  const from = at.value
  at.value = i
  leaving.value = opts.transition === false || from === i ? null : from
  enterKey.value++
  instant.value = !!opts.back
  started.value = opts.back ? plan.value.groups.length : firstStarted.value
  if (leaving.value !== null) {
    const ms = transitionMs()
    window.setTimeout(() => { if (at.value === i) leaving.value = null }, ms + 50)
  }
  if (props.playNarrations && slide.value.narration && !opts.back) {
    narration = new Audio(slide.value.narration)
    narration.play().catch(() => {})
  }
  markTime()
  schedule()
}

const next = () => {
  if (ended.value) return close()
  if (started.value < plan.value.groups.length) {
    instant.value = false
    started.value++
    schedule()
    return
  }
  if (at.value + 1 < props.slides.length) enter(at.value + 1)
  else if (props.loop && props.mode === 'full') enter(0)
  else if (props.mode === 'full' || props.mode === 'rehearse') { markTime(); clearTimer(); ended.value = true }
  else if (props.mode === 'preview') close()
}
const back = () => {
  if (ended.value) { ended.value = false; return }
  if (started.value > firstStarted.value && !instant.value) { started.value--; instant.value = true; return }
  if (at.value > 0) enter(at.value - 1, { back: true, transition: false })
}
const onClick = (e: MouseEvent) => {
  if (props.mode === 'preview' || props.mode === 'reading') return
  if ((e.target as HTMLElement).closest('a,video,audio,button')) return
  if (!ended.value && slide.value.advance && slide.value.advance.click === false && started.value >= plan.value.groups.length) return
  next()
}
const onKey = (e: KeyboardEvent) => {
  if (props.mode === 'preview') return
  if (['ArrowRight', 'ArrowDown', ' ', 'Enter', 'PageDown', 'n', 'N'].includes(e.key)) { e.preventDefault(); next() }
  else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace', 'p', 'P'].includes(e.key)) { e.preventDefault(); back() }
  else if (e.key === 'Home') enter(0, { transition: false })
  else if (e.key === 'End') enter(props.slides.length - 1, { transition: false })
  else if (e.key === 'Escape') close()
}

// ---- Rehearse Timings ----
const timings = ref<number[]>(props.slides.map(() => 0))
let since = Date.now()
const now = ref(Date.now())
const markTime = () => {
  const t = Date.now()
  if (props.mode === 'rehearse' && lastAt !== null) timings.value[lastAt] += (t - since) / 1000
  since = t
  lastAt = at.value
}
let lastAt: number | null = null
const slideSeconds = computed(() => (now.value - since) / 1000 + (timings.value[at.value] || 0))
const totalSeconds = computed(() => timings.value.reduce((a, b) => a + b, 0) + (now.value - since) / 1000)
const clock = (s: number) => {
  const v = Math.floor(s)
  return `${String(Math.floor(v / 3600)).padStart(2, '0')}:${String(Math.floor(v / 60) % 60).padStart(2, '0')}:${String(v % 60).padStart(2, '0')}`
}
let tickTimer: number | null = null

const close = () => {
  clearTimer()
  narration?.pause()
  if (props.mode === 'rehearse' && !ended.value) markTime()
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
  emit('close', props.mode === 'rehearse' ? timings.value.map(t => Math.round(t)) : null)
}

const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
onMounted(async () => {
  await nextTick()
  measure()
  if (area.value) ro?.observe(area.value)
  root.value?.focus()
  if (props.mode === 'full' || props.mode === 'rehearse') root.value?.requestFullscreen?.().catch(() => {})
  if (props.mode === 'rehearse') tickTimer = window.setInterval(() => { now.value = Date.now() }, 250)
  lastAt = null
  if (props.mode === 'preview' && props.previewFrom !== null && props.slides[props.previewFrom]) {
    at.value = props.previewFrom
    enter(props.start)
  } else {
    enter(at.value, { transition: false })
  }
})
onBeforeUnmount(() => {
  clearTimer()
  narration?.pause()
  ro?.disconnect()
  if (tickTimer) clearInterval(tickTimer)
})
</script>

<style>
/* Animations of things on a slide (tsa-) and transitions between slides (tst-) */
@keyframes tsa-appear { from { opacity: 0 } to { opacity: 1 } }
@keyframes tsa-fade { from { opacity: 0 } }
@keyframes tsa-fly { from { transform: translate(var(--dx), var(--dy)) } }
@keyframes tsa-float { from { opacity: 0; transform: translate(0, var(--dy)) } }
@keyframes tsa-split { from { clip-path: inset(0 50% 0 50%) } to { clip-path: inset(0 0 0 0) } }
@keyframes tsa-wipe { from { clip-path: var(--clip) } to { clip-path: inset(0 0 0 0) } }
@keyframes tsa-shape { from { clip-path: circle(0% at 50% 50%) } to { clip-path: circle(75% at 50% 50%) } }
@keyframes tsa-wheel { from { opacity: 0; transform: rotate(-200deg) scale(.4) } }
@keyframes tsa-bars { 0% { opacity: 0 } 15% { opacity: .55 } 25% { opacity: .1 } 45% { opacity: .8 } 55% { opacity: .35 } 100% { opacity: 1 } }
@keyframes tsa-grow { from { opacity: 0; transform: scale(0) rotate(-90deg) } }
@keyframes tsa-zoom { from { opacity: 0; transform: scale(.3) } }
@keyframes tsa-swivel { from { opacity: 0; transform: perspective(700px) rotateY(90deg) } }
@keyframes tsa-bounce { 0% { transform: translateY(-120vh) } 55% { transform: translateY(0) } 70% { transform: translateY(-14%) } 84% { transform: translateY(0) } 93% { transform: translateY(-4%) } 100% { transform: translateY(0) } }
@keyframes tsa-pulse { 50% { transform: scale(1.1) } }
@keyframes tsa-spin { to { transform: rotate(360deg) } }
@keyframes tsa-teeter { 20% { transform: rotate(5deg) } 40% { transform: rotate(-5deg) } 60% { transform: rotate(3deg) } 80% { transform: rotate(-3deg) } }

@keyframes tst-fade { from { opacity: 0 } }
@keyframes tst-move-in { from { transform: translate(var(--dx), var(--dy)) } }
@keyframes tst-move-out { to { transform: translate(calc(-1 * var(--dx)), calc(-1 * var(--dy))) } }
@keyframes tst-clip { from { clip-path: var(--clip) } to { clip-path: inset(0 0 0 0) } }
@keyframes tst-split { from { clip-path: inset(0 50% 0 50%) } to { clip-path: inset(0 0 0 0) } }
@keyframes tst-bars { 0% { opacity: 0 } 20% { opacity: .5 } 30% { opacity: .15 } 55% { opacity: .8 } 65% { opacity: .4 } 100% { opacity: 1 } }
@keyframes tst-shape { from { clip-path: circle(0% at 50% 50%) } to { clip-path: circle(75% at 50% 50%) } }
@keyframes tst-flash { 0% { opacity: 0; filter: brightness(4) } 40% { opacity: 1; filter: brightness(3) } 100% { filter: brightness(1) } }
@keyframes tst-zoom { from { opacity: 0; transform: scale(.3) } }
@keyframes tst-reveal { to { opacity: 0; transform: translateX(calc(-0.4 * var(--dx))) } }
@keyframes tst-fall { to { transform: perspective(900px) rotateX(-90deg); opacity: .3 } }
@keyframes tst-drape { to { clip-path: inset(100% 0 0 0) } }
@keyframes tst-curtains { to { clip-path: inset(0 50% 0 50%) } }
@keyframes tst-wind { to { opacity: 0; transform: translateX(-100%) skewX(25deg) } }
@keyframes tst-prestige { to { opacity: 0; transform: translateY(60%) rotate(-6deg) scale(.8) } }
.slide-show [style*='tst-fall'] { transform-origin: 50% 100% }
</style>
