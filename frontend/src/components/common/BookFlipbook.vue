<template>
  <div class="relative w-full h-full" :class="{ 'mx-auto max-w-[560px]': capWidthForToggle }">
    <!-- v-if (not just a :key bump) forces Vue to fully unmount and later remount this element on
         every rebuild - StPageFlip's own destroy() calls `this.block.remove()` on this exact node
         (raw DOM removal, entirely outside Vue's reconciliation), permanently detaching it from
         the document. Without this, Vue has no reason to know the element it's still holding a
         reference to (hostRef) is no longer actually in the page, and happily keeps reusing that
         orphaned node forever after - the book silently renders into a detached DOM subtree
         nobody can see. destroy() awaits a tick with showHost false before build() flips it back
         true and awaits another - two full reactivity flushes, not one :key bump processed in the
         same pass as StPageFlip's own removal, which raced Vue's own patch for the same node and
         threw ("insertBefore" on the now-parentless old element) rather than reliably recovering. -->
    <div v-if="showHost" ref="hostRef" class="book-flipbook-host w-full h-full"></div>
    <!-- HTML mode's staging area: the parent renders one element per page into this slot, and
         `loadFromHTML` physically moves (not clones) each one into the host above - Vue keeps
         patching them normally afterward since they're still the same DOM nodes, just relocated. -->
    <div v-if="mode === 'html'" ref="stagingRef" class="book-flipbook-staging">
      <slot name="pages" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * A real page-turning book (drag a corner to curl the page, or click near an edge), powered by
 * the `page-flip` (StPageFlip) engine - the same kind of effect as heyzine.com/flip-book, rather
 * than a scripted CSS rotation. Two modes: `image` (every page a pre-rendered picture, e.g. PDF
 * pages already rasterized by pdf.js) and `html` (every page a live DOM element, e.g. rich text
 * content that should stay interactive/reactive rather than being flattened to a bitmap).
 */
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { PageFlip } from 'page-flip'
import { playPageFlipSound } from '@/utils/pageFlipSound'

const props = withDefaults(
  defineProps<{
    mode?: 'image' | 'html'
    images?: string[]
    /** The base page pixel size used as the book's fixed aspect ratio. */
    pageWidth: number
    pageHeight: number
    startPage?: number
    showCover?: boolean
    muted?: boolean
    /** A reader's own choice to always see one page at a time, even where there'd be room for
     *  two - a prop (like `muted`), not this component's own persisted ref, so the parent's
     *  header toggle takes effect immediately instead of only after a reload: two independent
     *  usePersistedRef() calls reading the same localStorage key are still two unrelated reactive
     *  values, and only re-sync on a fresh read (i.e. a reload) - they don't watch each other. */
    preferSinglePage?: boolean
    /** Only a press near the book's outer left/right edge can start a page turn (drag or tap),
     *  like reaching for the edge of a real page - a touch anywhere else on the page (reading,
     *  scrolling, selecting text) never flips it. The Prev/Next buttons are unaffected. */
    edgeFlipOnly?: boolean
  }>(),
  { mode: 'image', images: () => [], startPage: 0, showCover: true, muted: false, preferSinglePage: false, edgeFlipOnly: true }
)

const emit = defineEmits<{ flip: [page: number] }>()

const hostRef = ref<HTMLElement | null>(null)
const showHost = ref(true)
const stagingRef = ref<HTMLElement | null>(null)
let flip: PageFlip | null = null
let resizeObserver: ResizeObserver | null = null
let canvasResizeObserver: ResizeObserver | null = null
// Shared debounce timer between the host resizeObserver (below, in build()) and the
// pageWidth/pageHeight watcher further down - both ultimately want the same thing (a rebuild
// once the container/aspect-ratio has actually settled), and coalescing both sources through one
// timer avoids two overlapping rebuilds firing back to back for the same underlying size change.
let pageSizeRebuildTimer: ReturnType<typeof setTimeout> | null = null

// How long one flip's turning animation takes - also passed to PageFlip's own `flippingTime`
// setting below, so the two stay in sync.
const FLIPPING_TIME = 700

// Set right before a programmatic (not drag/click) page turn - e.g. Read Aloud auto-advancing to
// the next page once narration ends - so the flip sound only ever plays for an actual reader
// gesture, not a turn the app triggered on its own. Consumed and reset by the next 'flip' event.
let suppressNextFlipSound = false

// StPageFlip fires its own 'flip' event twice per single page turn - once as the turn starts and
// again when the page finishes landing on the other side - so playing a sound on every event
// doubles up. Only the first one (the actual turn) should make a sound; anything else firing
// before one flip's animation would even be done landing is that same turn's second event, not a
// new flip, so it's ignored.
let lastFlipSoundAt = 0

// Below this width, force single-page-at-a-time flipping instead of StPageFlip's two-page
// spread, which gets cramped not just on phones but on tablets too - two 700px-reference pages
// side by side need real desktop width to not feel cramped. Matches Tailwind's `lg` breakpoint,
// so phones and tablets (portrait and most landscape) get single-page, and only laptop/desktop
// widths get the two-page spread.
const MOBILE_QUERY = '(max-width: 1023px)'
const mq = typeof window !== 'undefined' ? window.matchMedia(MOBILE_QUERY) : null
const isMobile = ref(mq?.matches ?? false)

// A phone/tablet is already narrower than the natural single/two-page threshold below (minWidth
// 300 * 2 = 600px), so StPageFlip already renders it single-page at its own full natural width -
// nothing extra needed there. Only a *manual* toggle on an actually-wide desktop screen needs
// help, since the screen being wider than 600px is exactly why it wasn't already single-page.
// This caps the container's own CSS width in that one case only, rather than trying to inflate
// StPageFlip's `minWidth` setting to trick its internal threshold check: minWidth doubles as
// literal CSS min-width on the book's own container (see page-flip's UI.ts), so an inflated
// value forces the container itself that wide - overflowing it to thousands of pixels wide on a
// desktop window, and (when this was mistakenly also applied to the already-narrow phone case)
// shrinking a phone's book down to a fraction of its actual screen width for no reason.
const capWidthForToggle = computed(() => props.preferSinglePage && !isMobile.value)

// Width of the strip along each outer edge of the book that can start a page turn
function edgeZone(bookWidth: number) {
  return Math.min(90, Math.max(36, bookWidth * 0.08))
}

function pointX(e: MouseEvent | TouchEvent): number | null {
  if ('touches' in e) return e.touches[0]?.clientX ?? null
  return e.clientX
}

// Capture-phase guard on the host: page-flip's own mousedown/touchstart listeners live further
// down the tree, so stopping a press here (anywhere but the outer edges) means page-flip never
// registers it and can't start a drag or a click-to-flip from it. Not preventDefault - text
// selection, focusing the summary box, links and buttons inside the page all still work.
function guardFlipStart(e: MouseEvent | TouchEvent) {
  if (!props.edgeFlipOnly) return
  const block = hostRef.value?.querySelector('.stf__block') as HTMLElement | null
  const x = pointX(e)
  if (!block || x === null) return
  const r = block.getBoundingClientRect()
  const zone = edgeZone(r.width)
  if (x - r.left > zone && r.right - x > zone) e.stopPropagation()
}

// A pointer cursor near the turnable edges, so readers can find them
function markEdgeHover(e: MouseEvent) {
  const host = hostRef.value
  if (!host || !props.edgeFlipOnly) return
  const block = host.querySelector('.stf__block') as HTMLElement | null
  if (!block) return
  const r = block.getBoundingClientRect()
  const zone = edgeZone(r.width)
  const nearEdge = e.clientY >= r.top && e.clientY <= r.bottom && (e.clientX - r.left <= zone || r.right - e.clientX <= zone)
  host.classList.toggle('near-flip-edge', nearEdge)
}

function build() {
  const host = hostRef.value
  if (!host || !props.pageWidth || !props.pageHeight) return
  if (props.mode === 'image' && props.images.length === 0) return
  if (props.mode === 'html' && !stagingRef.value?.children.length) return

  flip = new PageFlip(host, {
    width: props.pageWidth,
    height: props.pageHeight,
    size: 'stretch',
    minWidth: 300,
    maxWidth: 2000,
    minHeight: 400,
    maxHeight: 2800,
    showCover: props.showCover,
    maxShadowOpacity: 0.5,
    flippingTime: FLIPPING_TIME,
    mobileScrollSupport: true,
    startPage: props.startPage,
  })

  // StPageFlip's constructor also applies minWidth/minHeight as this container's own inline CSS
  // min-width/min-height (so it never gets squeezed smaller than one page in a normal fluid
  // layout) - but on a genuinely narrow phone, the *actual* available width (screen width minus
  // padding/sidebars) can be less than even this small 300px floor, forcing the container wider
  // than its real space and breaking the layout entirely. The single/two-page decision is
  // already handled by our own container sizing (the template's max-w-[560px] binding) and
  // "stretch" mode's own self-fitting (via the ResizeObserver below), so this floor serves no
  // purpose here - strip it back off unconditionally.
  host.style.minWidth = ''
  host.style.minHeight = ''

  host.addEventListener('mousedown', guardFlipStart, true)
  host.addEventListener('touchstart', guardFlipStart, { capture: true, passive: true })
  host.addEventListener('mousemove', markEdgeHover)

  if (props.mode === 'html') {
    flip.loadFromHTML(Array.from(stagingRef.value!.children) as HTMLElement[])
  } else {
    flip.loadFromImages(props.images)
    // Image mode draws every page onto one <canvas>, and page-flip only ever sets that canvas's
    // actual bitmap resolution (not just its CSS box) once, during its own internal construction -
    // at a point that, empirically (verified with headless-browser measurements taken at several
    // points after construction, including a full animation frame and a macrotask later), can
    // still read stale/constrained dimensions rather than this container's real, current size.
    // No fixed delay reliably outlasts that: how long it takes depends on what triggered the
    // resize (a real Fullscreen API transition can easily take longer than a synthetic CSS toggle
    // does), so guessing one just trades an unreliable early read for a slower, still-unreliable
    // one. A canvas has no ResizeObserver-adjacent API of its own to report bitmap staleness, but
    // its own on-screen box size is exactly the thing that needs to eventually stay in sync with
    // it, so watching that directly (rather than the host, which merely contains this canvas)
    // catches the moment it actually finishes changing - and correcting it while re-running that
    // check on every future resize besides makes the fix self-healing for as long as this book
    // exists, not just at construction. Left uncorrected, later drawing happens in the wrong pixel
    // space while CSS stretches the result to the canvas's real (correct) size, showing up as the
    // book being gapped, cut off, or both, depending on which way the two sizes disagree.
    const canvasEl = host.querySelector('.stf__canvas') as HTMLCanvasElement | null
    if (canvasEl) {
      canvasResizeObserver = new ResizeObserver(() => {
        if (canvasEl.width !== canvasEl.clientWidth || canvasEl.height !== canvasEl.clientHeight) {
          canvasEl.width = canvasEl.clientWidth
          canvasEl.height = canvasEl.clientHeight
          flip?.update()
        }
      })
      canvasResizeObserver.observe(canvasEl)
    }
  }
  flip.on('flip', (e) => {
    const now = Date.now()
    if (!props.muted && !suppressNextFlipSound && now - lastFlipSoundAt >= FLIPPING_TIME) {
      playPageFlipSound()
      lastFlipSoundAt = now
    }
    suppressNextFlipSound = false
    emit('flip', e.data)
  })

  // "stretch" mode fits the book to its container, but only recalculates on PageFlip's own
  // internal resize listener - toggling fullscreen (or any container resize outside a window
  // resize event) needs an explicit nudge to actually re-fit. calculateBoundsRect() (what this
  // recomputes) always reads the container's live CSS size, so a plain update() - no rebuild
  // needed - keeps it correctly positioned; image mode's separate canvas-bitmap staleness (see
  // the canvasResizeObserver above) is a different problem, handled independently of this.
  resizeObserver = new ResizeObserver(() => flip?.update())
  resizeObserver.observe(host)
}

async function destroy() {
  resizeObserver?.disconnect()
  resizeObserver = null
  canvasResizeObserver?.disconnect()
  canvasResizeObserver = null

  // In html mode, loadFromHTML() moved our page elements into StPageFlip's own internal
  // ".stf__block" wrapper - its destroy() below detaches that whole wrapper (taking our page
  // elements with it) without ever handing them back anywhere. Without rescuing them first, the
  // staging area is empty on the next build(), which bails out immediately (see its guard
  // clause) - the reader then silently keeps showing the old layout until a full page reload
  // re-renders the #pages slot from scratch. Move them back into the staging area ourselves so
  // every subsequent rebuild (a preference toggle, a breakpoint change, ...) has pages to load.
  // Done *before* hostRef unmounts below, while it's still genuinely attached and queryable.
  if (flip && props.mode === 'html' && stagingRef.value) {
    const block = hostRef.value?.querySelector(':scope > .stf__wrapper > .stf__block')
    if (block) {
      Array.from(block.children).forEach((el) => stagingRef.value!.appendChild(el))
    }
  }

  // Unmount hostRef through Vue's own reconciliation *first*, while it's still genuinely attached
  // - only *then* let StPageFlip's own destroy() run its raw `.remove()` calls against a subtree
  // Vue has already cleanly detached (harmless no-ops at that point). The reverse order is what
  // actually broke: StPageFlip's `this.block.remove()` sets hostRef's parentNode to null, and
  // Vue's own v-if-driven unmount - which needs that parentNode to know where to insert the
  // comment-node placeholder v-if leaves behind - throws instead of recovering when it runs after.
  showHost.value = false
  await nextTick()

  flip?.destroy()
  flip = null
}

function handleMqChange(e: MediaQueryListEvent) {
  if (e.matches === isMobile.value) return
  isMobile.value = e.matches
  rebuild()
}

onMounted(() => {
  nextTick(build)
  mq?.addEventListener('change', handleMqChange)
})
onBeforeUnmount(() => {
  mq?.removeEventListener('change', handleMqChange)
  if (pageSizeRebuildTimer) clearTimeout(pageSizeRebuildTimer)
  destroy()
})

watch(() => props.preferSinglePage, () => rebuild())

// PageFlip captures width/height once at construction (`new PageFlip(...)`) and never re-reads
// them - the host's own resizeObserver below only re-fits the *existing* aspect ratio to a
// resized container, it doesn't pick up a genuinely different ratio. A parent computing a
// dynamic pageWidth/pageHeight (e.g. to match its container's own aspect ratio exactly, avoiding
// letterboxing) needs a real rebuild for a changed ratio to actually take effect.
//
// Guarded and debounced: a parent measuring its own container via ResizeObserver (as
// ENotePreview/LibraryPdfViewer both do) can report several changes in quick succession while a
// layout transition (e.g. entering/exiting Read Mode) settles, or - transiently, mid-measurement -
// an invalid value. rebuild() tears the whole book down and reconstructs it from scratch
// (destroy() removes PageFlip's DOM subtree entirely, and html mode's build() aborts without
// content if the staging area briefly disagrees with what destroy() just rescued into it), so
// firing it repeatedly for values that were never meant to stick risks a genuine race between
// overlapping destroy/build cycles - filtering bad values and coalescing bursts into one rebuild
// after things settle avoids that outright, rather than trying to reason about the interleaving.
watch(() => [props.pageWidth, props.pageHeight], ([w, h]) => {
  if (!w || !h || w <= 0 || h <= 0) return
  if (pageSizeRebuildTimer) clearTimeout(pageSizeRebuildTimer)
  pageSizeRebuildTimer = setTimeout(rebuild, 50)
})

// A different book (new document/topic) replaces pages wholesale - rebuild rather than
// updateFrom*, since the aspect ratio (pageWidth/pageHeight) may have changed too. Image mode
// reacts to its own prop; html mode has no single prop to watch (content arrives via slot), so
// the parent calls `rebuild()` explicitly once its new pages have rendered.
watch(() => props.images, () => {
  if (props.mode !== 'image') return
  rebuild()
})

// destroy() unmounts hostRef (v-if="showHost" -> false) rather than just clearing PageFlip's own
// state, since StPageFlip's own destroy() rips that exact DOM node out from under Vue via a raw
// .remove() call - see destroy()'s and the template's comments. Bringing it back needs its own
// separate reactivity flush (an awaited nextTick) before build() can use a genuinely fresh
// hostRef.value, the same way destroy() needs its own flush before letting StPageFlip loose.
async function rebuild() {
  await destroy()
  showHost.value = true
  await nextTick()
  build()
}

function flipNext(opts?: { silent?: boolean }) {
  if (opts?.silent) suppressNextFlipSound = true
  flip?.flipNext()
}
function flipPrev(opts?: { silent?: boolean }) {
  if (opts?.silent) suppressNextFlipSound = true
  flip?.flipPrev()
}
function turnToPage(page: number, opts?: { silent?: boolean }) {
  if (opts?.silent) suppressNextFlipSound = true
  flip?.turnToPage(page)
}
function getCurrentPageIndex(): number { return flip?.getCurrentPageIndex() ?? 0 }

defineExpose({ flipNext, flipPrev, turnToPage, getCurrentPageIndex, rebuild })
</script>

<style scoped>
.book-flipbook-host :deep(*) {
  box-sizing: border-box;
}

/* page-flip's own injected stylesheet has a typo - ".sft__wrapper" instead of ".stf__wrapper" -
   so its position:relative/width:100%/height:100% never actually reaches the real element. Its
   child .stf__block (position:absolute, sized to 100% of that) then has no correctly-positioned
   ancestor to size itself against, which is what was producing the wrong-sized, cut-off book.
   Reapplying the same rule here under the correct class name, scoped to just this component. */
.book-flipbook-host :deep(.stf__wrapper) {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.book-flipbook-host.near-flip-edge,
.book-flipbook-host.near-flip-edge :deep(*) {
  cursor: pointer;
}

.book-flipbook-staging {
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  pointer-events: none;
  z-index: -1;
}
</style>
