<template>
  <div class="relative w-full h-full" :class="{ 'mx-auto max-w-[560px]': capWidthForToggle }">
    <div ref="hostRef" class="book-flipbook-host w-full h-full"></div>
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
  }>(),
  { mode: 'image', images: () => [], startPage: 0, showCover: true, muted: false, preferSinglePage: false }
)

const emit = defineEmits<{ flip: [page: number] }>()

const hostRef = ref<HTMLElement | null>(null)
const stagingRef = ref<HTMLElement | null>(null)
let flip: PageFlip | null = null
let resizeObserver: ResizeObserver | null = null

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

  if (props.mode === 'html') {
    flip.loadFromHTML(Array.from(stagingRef.value!.children) as HTMLElement[])
  } else {
    flip.loadFromImages(props.images)
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
  // resize event) needs an explicit nudge to actually re-fit.
  resizeObserver = new ResizeObserver(() => flip?.update())
  resizeObserver.observe(host)
}

function destroy() {
  resizeObserver?.disconnect()
  resizeObserver = null

  // In html mode, loadFromHTML() moved our page elements into StPageFlip's own internal
  // ".stf__block" wrapper - its destroy() below detaches that whole wrapper (taking our page
  // elements with it) without ever handing them back anywhere. Without rescuing them first, the
  // staging area is empty on the next build(), which bails out immediately (see its guard
  // clause) - the reader then silently keeps showing the old layout until a full page reload
  // re-renders the #pages slot from scratch. Move them back into the staging area ourselves so
  // every subsequent rebuild (a preference toggle, a breakpoint change, ...) has pages to load.
  if (flip && props.mode === 'html' && stagingRef.value) {
    const block = hostRef.value?.querySelector(':scope > .stf__wrapper > .stf__block')
    if (block) {
      Array.from(block.children).forEach((el) => stagingRef.value!.appendChild(el))
    }
  }

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
  destroy()
})

watch(() => props.preferSinglePage, () => rebuild())

// A different book (new document/topic) replaces pages wholesale - rebuild rather than
// updateFrom*, since the aspect ratio (pageWidth/pageHeight) may have changed too. Image mode
// reacts to its own prop; html mode has no single prop to watch (content arrives via slot), so
// the parent calls `rebuild()` explicitly once its new pages have rendered.
watch(() => props.images, () => {
  if (props.mode !== 'image') return
  destroy()
  nextTick(build)
})

function rebuild() {
  destroy()
  nextTick(build)
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

.book-flipbook-staging {
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  pointer-events: none;
  z-index: -1;
}
</style>
