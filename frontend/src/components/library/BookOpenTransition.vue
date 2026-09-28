<template>
  <!-- Opening a book from the shelf, like a real bookcase: the books around it slide apart and
       fade, the room dims, and the book comes forward out of its place - turning from its spine to
       its cover - to the middle of the screen, where it waits, closed, with "Start reading" and
       "Cancel". Start reading swings the cover open to the first page, then `opened` fires for the
       page to go on to the reader. Cancel plays it all back: the book returns to its place on the
       shelf and the others slide back, then `closed` fires. -->
  <Teleport to="body">
    <div class="bot-root" role="dialog" aria-modal="true" :aria-label="`Open ${title}`">
      <div ref="backdrop" class="bot-backdrop" @click="cancel"></div>
      <div class="bot-stage">
        <div ref="book" class="bot-book" :style="bookBox">
          <div ref="shift" class="bot-shift">
            <!-- The first page, under the cover: the topic's learning outcomes, ticked off one by one
                 while the reader gets ready ("Preparing your notes..."), or the title page when
                 there are none to list -->
            <div ref="pageEl" class="bot-page">
              <div v-if="mode === 'resume'" class="bot-page-inner">
                <p class="bot-page-label">Welcome back</p>
                <p class="bot-page-title">Page {{ resume?.page }}</p>
                <span class="bot-page-rule"></span>
                <p class="bot-page-sub">Picking up where you left off</p>
              </div>
              <div v-else-if="outcomeList.length" class="bot-outcomes">
                <p ref="headEl" class="bot-outcomes-head">In this topic you will<span v-if="pageIndex > 0" class="bot-outcomes-cont"> (continued)</span></p>
                <ul class="bot-outcomes-list">
                  <li
                    v-for="(outcome, i) in currentChunk"
                    :key="`${pageIndex}-${i}`"
                    class="bot-outcome"
                    :class="{ 'is-shown': i < revealed }"
                  >
                    <span class="bot-outcome-tick" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                    </span>
                    <span class="bot-outcome-text">{{ outcome }}</span>
                  </li>
                </ul>
                <p v-if="pageCount > 1" class="bot-page-count">{{ pageIndex + 1 }} / {{ pageCount }}</p>
              </div>
              <!-- Sizes every outcome at the page's width (hidden), to know how many fit on a page -->
              <ul v-if="outcomeList.length" ref="measureEl" class="bot-outcomes-list bot-measure" aria-hidden="true">
                <li v-for="(outcome, i) in outcomeList" :key="i" class="bot-outcome is-shown">
                  <span class="bot-outcome-tick"></span>
                  <span class="bot-outcome-text">{{ outcome }}</span>
                </li>
              </ul>
              <div v-else class="bot-page-inner">
                <p v-if="label" class="bot-page-label">{{ label }}</p>
                <p class="bot-page-title">{{ title }}</p>
                <span class="bot-page-rule"></span>
                <p v-if="subtitle" class="bot-page-sub">{{ subtitle }}</p>
              </div>
              <!-- Getting the reader ready -->
              <div v-if="phase === 'opening'" class="bot-prep">
                <span class="bot-prep-bar"><span :class="{ 'is-done': prepared }"></span></span>
                <span class="bot-prep-text">{{ prepared ? 'Ready' : 'Preparing your notes…' }}</span>
              </div>
            </div>
            <!-- Full pages of outcomes, turned over to the left (they stay, stacked, on the left) -->
            <div v-for="(leaf, i) in leaves" :key="`leaf-${i}`" :ref="el => setLeafRef(el as HTMLElement | null, i)" class="bot-leaf">
              <div class="bot-leaf-front bot-page">
                <div class="bot-outcomes">
                  <p class="bot-outcomes-head">In this topic you will<span v-if="leaf.page > 0" class="bot-outcomes-cont"> (continued)</span></p>
                  <ul class="bot-outcomes-list">
                    <li v-for="(outcome, j) in leaf.items" :key="j" class="bot-outcome is-shown">
                      <span class="bot-outcome-tick" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
                      </span>
                      <span class="bot-outcome-text">{{ outcome }}</span>
                    </li>
                  </ul>
                  <p class="bot-page-count">{{ leaf.page + 1 }} / {{ pageCount }}</p>
                </div>
              </div>
              <div class="bot-leaf-back"></div>
            </div>
            <!-- The cover: front face is the book's own cover, back face the inside of the board -->
            <div ref="cover" class="bot-cover">
              <div class="bot-cover-front">
                <div class="bot-cover-scale" :style="{ transform: `scale(${coverScale})` }">
                  <slot />
                </div>
              </div>
              <!-- Inside of the front board - the left page once the book is open -->
              <div class="bot-cover-back">
                <div v-if="outcomeList.length" class="bot-page-inner">
                  <p v-if="label" class="bot-page-label">{{ label }}</p>
                  <p class="bot-page-title">{{ title }}</p>
                  <span class="bot-page-rule"></span>
                  <p v-if="subtitle" class="bot-page-sub">{{ subtitle }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- While the learning outcomes are being listed: pause to read at your own pace -->
        <Transition name="bot-actions">
          <div v-if="phase === 'opening' && listing" class="bot-actions" :style="actionsBox">
            <button ref="pauseButton" type="button" class="bot-btn" :class="paused ? 'bot-btn-read' : 'bot-btn-cancel'" @click="togglePause">
              <svg v-if="paused" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
              <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 5h4v14H6zM14 5h4v14h-4z"></path></svg>
              {{ paused ? 'Continue' : 'Pause' }}
            </button>
            <span v-if="paused" class="bot-paused-note">Paused - take your time to read</span>
          </div>
        </Transition>

        <!-- Under the book once it has arrived -->
        <Transition name="bot-actions">
          <div v-if="phase === 'ready'" class="bot-actions" :style="actionsBox">
            <!-- Been here before: carry on from their page (the main choice), or start over -->
            <template v-if="resume">
              <button ref="startButton" type="button" class="bot-btn bot-btn-read" @click="startReading('resume')">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
                Continue reading
                <span class="bot-btn-sub">page {{ resume.page }} of {{ resume.total }}</span>
              </button>
              <button type="button" class="bot-btn bot-btn-cancel" @click="startReading('fresh')">Start from the beginning</button>
            </template>
            <button v-else ref="startButton" type="button" class="bot-btn bot-btn-read" @click="startReading('fresh')">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
              Start reading
            </button>
            <button type="button" class="bot-btn bot-btn-cancel" @click="cancel">Cancel</button>
          </div>
        </Transition>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = defineProps<{
  // The book's own element on the shelf (ShelfSlot), where it comes out from and returns to
  from: HTMLElement | null
  title: string
  label?: string
  subtitle?: string
  // Listed on the first page once the book is open (eNotes' learning outcomes)
  outcomes?: string[]
  // Gets the reader ready (loads it and its content) while the outcomes are listed; the book
  // opens into the reader once this has finished
  prepare?: () => Promise<unknown>
  // The page a returning reader stopped on: offers "Continue reading" (the main choice) or
  // "Start from the beginning" instead of a plain "Start reading"
  resume?: { page: number; total: number } | null
}>()
// opened: 'resume' to go back to the student's page, 'fresh' to begin at page 1
const emit = defineEmits<{ opened: [mode: 'resume' | 'fresh']; closed: [] }>()
const mode = ref<'resume' | 'fresh'>('fresh')

// The cover slot is a flat ShelfBook at size 'lg' (180 x 242), scaled up to the open book's size
const COVER_W = 180
const COVER_H = 242

const vw = window.innerWidth
const vh = window.innerHeight
// Phones can't show the open spread side by side: the book is sized to the screen instead, and
// once open the right-hand page (the outcomes) stays centred while the left page slides off
// the edge, like holding an open book up close
const narrow = vw < 640
const H = Math.round(Math.min(vh * 0.58, 440, narrow ? (vw * 0.8) * COVER_H / COVER_W : Infinity))
const W = Math.round(H * COVER_W / COVER_H)
const OPEN_SHIFT = narrow ? 0 : W / 2
const coverScale = H / COVER_H
const bookLeft = Math.round((vw - W) / 2)
const bookTop = Math.round((vh - H) / 2) - 24
const bookBox = computed(() => ({ width: `${W}px`, height: `${H}px`, left: `${bookLeft}px`, top: `${bookTop}px` }))
const actionsBox = computed(() => ({ top: `${bookTop + H + 22}px` }))

type Phase = 'arriving' | 'ready' | 'opening' | 'closing'
const phase = ref<Phase>('arriving')

// Learning outcomes: as many as fit on a page, each ticked in turn with time to read it; a full
// page is turned over and the list carries on on the next
const OUTCOME_STEP = 1300 // between one outcome and the next
const PAGE_HOLD = 1800 // a full page stays up this long before it's turned
const TURN_TIME = 1100
const FINAL_HOLD = 2600 // the last page stays up this long before the notes open
const outcomeList = computed(() => (props.outcomes ?? []).map(o => String(o).trim()).filter(Boolean))
const chunks = ref<string[][]>([])
const pageIndex = ref(0)
const pageCount = computed(() => chunks.value.length)
const currentChunk = computed(() => chunks.value[pageIndex.value] ?? [])
const revealed = ref(0)
const prepared = ref(false)
const leaves = ref<{ page: number; items: string[] }[]>([])
const leafEls: HTMLElement[] = []
const setLeafRef = (el: HTMLElement | null, i: number) => { if (el) leafEls[i] = el }
const pageEl = ref<HTMLElement | null>(null)
const headEl = ref<HTMLElement | null>(null)
const measureEl = ref<HTMLElement | null>(null)
let stopped = false

// Waits that stand still while the student has paused (only time not paused counts)
const paused = ref(false)
const listing = ref(false)
const pauseButton = ref<HTMLButtonElement | null>(null)
let turning: Animation | null = null
const wait = (ms: number) => new Promise<void>(resolve => {
  let left = ms
  let last = performance.now()
  const tick = () => {
    if (stopped) return resolve()
    const now = performance.now()
    if (!paused.value) left -= now - last
    last = now
    if (left <= 0) resolve()
    else timer = setTimeout(tick, 50)
  }
  tick()
})

function togglePause() {
  paused.value = !paused.value
  // A page caught mid-turn holds still too
  if (turning) {
    if (paused.value) turning.pause()
    else turning.play()
  }
}

// Splits the outcomes into pages by their real height at the page's width: the page's inside
// height, less its heading, the page number and the "Preparing your notes" bar at its foot
function paginate() {
  const list = outcomeList.value
  const page = pageEl.value
  const items = Array.from(measureEl.value?.children ?? []) as HTMLElement[]
  if (!list.length || !page || items.length !== list.length) {
    chunks.value = list.length ? [list] : []
    return
  }
  const style = getComputedStyle(page)
  const inside = page.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom)
  const heading = headEl.value?.offsetHeight ?? 34
  const GAP = 9
  const room = inside - heading - 12 - 22 - 40
  const pages: string[][] = []
  let current: string[] = []
  let used = 0
  items.forEach((item, i) => {
    const h = item.offsetHeight
    if (current.length && used + GAP + h > room) {
      pages.push(current)
      current = []
      used = 0
    }
    used += (current.length ? GAP : 0) + h
    current.push(list[i])
  })
  if (current.length) pages.push(current)
  chunks.value = pages
}

// Ticks in each outcome of the page on show, then turns full pages over until all are listed
async function listOutcomes() {
  listing.value = true
  await nextTick()
  pauseButton.value?.focus()
  for (let pg = 0; pg < chunks.value.length && !stopped; pg++) {
    pageIndex.value = pg
    revealed.value = 0
    const count = chunks.value[pg].length
    for (let i = 1; i <= count && !stopped; i++) {
      revealed.value = i
      await wait(reduced ? 0 : OUTCOME_STEP)
    }
    if (pg < chunks.value.length - 1 && !stopped) {
      await wait(reduced ? 0 : PAGE_HOLD)
      await turnPage(pg)
    }
  }
  if (!stopped) await wait(reduced ? 0 : FINAL_HOLD)
  listing.value = false
  paused.value = false
}

// A full page turns over to the left, showing the next (still empty) page under it
async function turnPage(pg: number) {
  leaves.value.push({ page: pg, items: chunks.value[pg] })
  const i = leaves.value.length - 1
  pageIndex.value = pg + 1
  revealed.value = 0
  await nextTick()
  const el = leafEls[i]
  if (!el) return
  // Each turned page rests a touch above the one before, so they stack on the left
  const rest = -(170 - i * 1.5)
  const turn = el.animate([{ transform: 'rotateY(0deg)' }, { transform: `rotateY(${rest}deg)` }], {
    duration: reduced ? 1 : TURN_TIME,
    easing: EASE_IN_OUT,
    fill: 'both'
  })
  others.push(turn)
  turning = turn
  if (paused.value) turn.pause()
  await turn.finished.catch(() => {})
  turning = null
  await wait(reduced ? 0 : 300)
}

const backdrop = ref<HTMLElement | null>(null)
const book = ref<HTMLElement | null>(null)
const shift = ref<HTMLElement | null>(null)
const cover = ref<HTMLElement | null>(null)
const startButton = ref<HTMLButtonElement | null>(null)

const EASE_OUT = 'cubic-bezier(0.2, 0.8, 0.2, 1)'
const EASE_IN_OUT = 'cubic-bezier(0.65, 0, 0.35, 1)'
const FLY_AT = 150
const FLY_TIME = 1500
const OPEN_TIME = 1500
const HOLD_OPEN = 450

// The animations that bring the book out, played backwards to put it back
const outward: Animation[] = []
let slotFade: Animation | null = null
const others: Animation[] = []
let timer: ReturnType<typeof setTimeout> | null = null
const reduced = !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

function play(el: Element | null, keyframes: Keyframe[], options: KeyframeAnimationOptions, list: Animation[] = others) {
  if (!el) return null
  const animation = el.animate(keyframes, { fill: 'both', ...options })
  list.push(animation)
  return animation
}

onMounted(() => {
  const from = props.from
  if (!from || !book.value) {
    emit('opened', props.resume ? 'resume' : 'fresh')
    return
  }

  // Its neighbours on the shelf slide apart and fade; the book leaves its own place
  const siblings = Array.from(from.parentElement?.children ?? []).filter(el => el.classList.contains('shelf-slot')) as HTMLElement[]
  const index = siblings.indexOf(from)
  siblings.forEach((el, i) => {
    if (el === from) {
      slotFade = el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, delay: FLY_AT, fill: 'both' })
      return
    }
    const away = i < index ? -1 : 1
    const near = Math.max(0, 6 - Math.abs(i - index)) // the nearest move furthest
    play(el, [
      { transform: 'translateX(0)', opacity: 1 },
      { transform: `translateX(${away * (40 + near * 14)}px)`, opacity: 0 }
    ], { duration: 900, delay: Math.abs(i - index) * 30, easing: EASE_OUT }, outward)
  })

  // The room dims
  play(backdrop.value, [{ opacity: 0 }, { opacity: 1 }], { duration: 900, easing: 'ease-out' }, outward)

  // The book comes forward from its place on the shelf, turning from its spine to its cover
  const r = from.getBoundingClientRect()
  const dx = r.left + r.width / 2 - (bookLeft + W / 2)
  const dy = r.top + r.height / 2 - (bookTop + H / 2)
  const k = Math.max(0.12, r.height / H)
  const fly = play(book.value, [
    { transform: `translate(${dx}px, ${dy}px) scale(${k}) rotateY(78deg)`, opacity: 0.2, offset: 0 },
    { transform: `translate(${dx}px, ${dy - 30}px) scale(${k * 1.15}) rotateY(55deg)`, opacity: 1, offset: 0.25 },
    { transform: 'translate(0, 0) scale(1) rotateY(0deg)', opacity: 1, offset: 1 }
  ], { duration: reduced ? 1 : FLY_TIME, delay: reduced ? 0 : FLY_AT, easing: EASE_OUT }, outward)

  fly?.finished.then(async () => {
    if (phase.value !== 'arriving') return
    phase.value = 'ready'
    await nextTick()
    startButton.value?.focus()
  }).catch(() => {})

  document.addEventListener('keydown', onKey)
})

// Start reading: the cover swings open to the left and the open book slides so the spread is
// centred; the reader starts getting ready straight away. Once open, the learning outcomes are
// ticked in one by one, and the book goes on into the reader when both the list is done and the
// reader is ready (never waiting more than a few seconds on a slow connection).
const PREPARE_LIMIT = 8000
function startReading(how: 'resume' | 'fresh' = 'fresh') {
  if (phase.value !== 'ready') return
  mode.value = how
  phase.value = 'opening'
  const time = reduced ? 1 : OPEN_TIME

  const ready = Promise.race([
    (props.prepare?.() ?? Promise.resolve()).catch(() => undefined),
    new Promise(resolve => setTimeout(resolve, PREPARE_LIMIT))
  ]).then(() => { prepared.value = true })

  play(cover.value, [{ transform: 'rotateY(0deg)' }, { transform: 'rotateY(-172deg)' }], { duration: time, easing: EASE_IN_OUT })
  play(shift.value, [{ transform: 'translateX(0)' }, { transform: `translateX(${OPEN_SHIFT}px)` }], { duration: time, easing: EASE_IN_OUT })

  paginate()
  // A returning reader goes straight back to their page - the outcomes are listed on a fresh start
  const listed = wait(time - 200).then(() => (how === 'fresh' && outcomeList.value.length ? listOutcomes() : wait(reduced ? 0 : 900)))

  Promise.all([ready, listed]).then(() => {
    if (stopped) return
    timer = setTimeout(() => emit('opened', mode.value), reduced ? 0 : HOLD_OPEN)
  })
}

// Cancel: everything plays back - the book returns to its place and the shelf closes up again
function cancel() {
  if (phase.value !== 'ready' && phase.value !== 'arriving') return
  phase.value = 'closing'
  outward.forEach(a => a.reverse())
  // The book's own place fills again just as it lands back in it
  if (slotFade) {
    slotFade.cancel()
    slotFade = props.from?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, delay: reduced ? 0 : FLY_TIME - 200, fill: 'both' }) ?? null
  }
  Promise.all(outward.map(a => a.finished)).catch(() => {}).then(() => emit('closed'))
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') cancel()
  // Space pauses / continues the outcomes (unless a button has focus - it handles Space itself)
  if ((e.key === ' ' || e.key === 'Spacebar') && listing.value && !(document.activeElement instanceof HTMLButtonElement)) {
    e.preventDefault()
    togglePause()
  }
}

onBeforeUnmount(() => {
  stopped = true
  if (timer) clearTimeout(timer)
  document.removeEventListener('keydown', onKey)
  outward.forEach(a => a.cancel())
  others.forEach(a => a.cancel())
  slotFade?.cancel()
})
</script>

<style scoped>
.bot-root {
  position: fixed;
  inset: 0;
  z-index: 80;
}

.bot-backdrop {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, rgba(30, 20, 10, 0.55), rgba(10, 6, 2, 0.85));
  backdrop-filter: blur(3px);
  opacity: 0;
}

.bot-stage {
  position: absolute;
  inset: 0;
  perspective: 1600px;
  pointer-events: none;
}

.bot-book {
  position: absolute;
  transform-style: preserve-3d;
  will-change: transform, opacity;
}

.bot-shift {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
}

/* First page: cream paper with the title set like a title page */
.bot-page {
  position: absolute;
  inset: 0;
  border-radius: 2px 6px 6px 2px;
  background:
    linear-gradient(90deg, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0) 8%),
    linear-gradient(180deg, #fbf6ea, #f1e8d4);
  box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.6), inset -1px 0 0 rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 12%;
}

.bot-page-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.bot-page-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #8a6a3a;
}

.bot-page-title {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(18px, 3.2vh, 28px);
  line-height: 1.2;
  color: #2b2116;
}

.bot-page-rule {
  width: 40px;
  height: 1px;
  background: #b89b6a;
}

.bot-page-sub {
  font-size: 12px;
  font-style: italic;
  color: #6b5a42;
}

/* Learning outcomes on the first page */
.bot-outcomes {
  width: 100%;
  align-self: flex-start;
  text-align: left;
}

.bot-outcomes-head {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(14px, 2.3vh, 19px);
  font-style: italic;
  color: #6b4f24;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #d9c49c;
}

.bot-outcomes-list {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.bot-outcome {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  opacity: 0;
  transform: translateX(-10px);
  transition: opacity 0.45s ease, transform 0.45s ease;
}

.bot-outcome.is-shown {
  opacity: 1;
  transform: none;
}

.bot-outcome-tick {
  flex-shrink: 0;
  width: 17px;
  height: 17px;
  margin-top: 1px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: #3f7d4e;
  transform: scale(0);
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) 0.25s;
}

.bot-outcome-tick svg {
  width: 11px;
  height: 11px;
}

.bot-outcome.is-shown .bot-outcome-tick {
  transform: scale(1);
}

.bot-outcome-text {
  font-size: clamp(11px, 1.6vh, 13px);
  line-height: 1.4;
  color: #2b2116;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.bot-outcomes-cont {
  font-size: 0.75em;
  color: #9c8057;
}

.bot-page-count {
  position: absolute;
  right: 12%;
  bottom: calc(6% + 34px);
  font-size: 10px;
  color: #9c8057;
}

/* Hidden copy of every outcome at the page's width, for measuring */
.bot-measure {
  position: absolute;
  left: 12%;
  right: 12%;
  top: 0;
  visibility: hidden;
  pointer-events: none;
}

/* A page of outcomes turning over to the left, hinged at the spine */
.bot-leaf {
  position: absolute;
  inset: 0;
  transform-origin: left center;
  transform-style: preserve-3d;
}

.bot-leaf-front,
.bot-leaf-back {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.bot-leaf-front {
  box-shadow: -4px 0 12px -6px rgba(0, 0, 0, 0.3);
}

.bot-leaf-back {
  position: absolute;
  inset: 0;
  transform: rotateY(180deg);
  border-radius: 6px 2px 2px 6px;
  background:
    linear-gradient(270deg, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0) 8%),
    linear-gradient(180deg, #f7f0e0, #ece1c9);
  box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.5);
}

/* "Preparing your notes..." along the foot of the page */
.bot-prep {
  position: absolute;
  left: 12%;
  right: 12%;
  bottom: 6%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.bot-prep-bar {
  position: relative;
  width: 100%;
  height: 3px;
  border-radius: 999px;
  background: rgba(107, 79, 36, 0.15);
  overflow: hidden;
}

.bot-prep-bar span {
  position: absolute;
  top: 0;
  bottom: 0;
  left: -40%;
  width: 40%;
  border-radius: 999px;
  background: #b8913f;
  animation: bot-prep-slide 1.2s ease-in-out infinite;
}

.bot-prep-bar span.is-done {
  left: 0;
  width: 100%;
  background: #3f7d4e;
  animation: none;
  transition: width 0.3s ease;
}

@keyframes bot-prep-slide {
  0% { left: -40%; }
  100% { left: 100%; }
}

.bot-prep-text {
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #8a6a3a;
}

/* The cover board, hinged on its left edge (the spine) */
.bot-cover {
  position: absolute;
  inset: 0;
  transform-origin: left center;
  transform-style: preserve-3d;
}

.bot-cover-front,
.bot-cover-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 2px 6px 6px 2px;
  overflow: hidden;
}

.bot-cover-front {
  box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.7);
}

.bot-cover-scale {
  width: 180px;
  height: 242px;
  transform-origin: top left;
}

/* Inside of the front board once it has swung open */
.bot-cover-back {
  transform: rotateY(180deg);
  border-radius: 6px 2px 2px 6px;
  background:
    linear-gradient(270deg, rgba(0, 0, 0, 0.18), rgba(0, 0, 0, 0) 10%),
    linear-gradient(180deg, #efe4cc, #e2d3b3);
  box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 12%;
}

/* Start reading / Cancel */
.bot-actions {
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px 12px;
  padding: 0 16px;
  pointer-events: auto;
}

.bot-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 22px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  transition: transform 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease;
}

.bot-btn:hover {
  transform: translateY(-1px);
}

.bot-btn:focus-visible {
  outline: 2px solid #fde68a;
  outline-offset: 3px;
}

.bot-btn-read {
  color: #2b1d0e;
  background: linear-gradient(180deg, #fbe7b0, #e9c46a);
  box-shadow: 0 8px 20px -6px rgba(233, 196, 106, 0.6);
}

.bot-btn-read:hover {
  box-shadow: 0 10px 26px -6px rgba(233, 196, 106, 0.8);
}

.bot-btn-cancel {
  color: #f5ecdc;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.35);
}

.bot-btn-cancel:hover {
  background: rgba(255, 255, 255, 0.18);
}

.bot-btn-sub {
  font-size: 11px;
  font-weight: 500;
  opacity: 0.7;
}

.bot-paused-note {
  align-self: center;
  font-size: 12px;
  font-style: italic;
  color: #f5ecdc;
  opacity: 0.85;
}

.bot-actions-enter-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.bot-actions-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.bot-actions-enter-from,
.bot-actions-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
