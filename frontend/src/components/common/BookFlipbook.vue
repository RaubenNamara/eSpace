<template>
  <div class="relative w-full h-full">
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
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
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
  }>(),
  { mode: 'image', images: () => [], startPage: 0, showCover: true, muted: false }
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

function build() {
  const host = hostRef.value
  if (!host || !props.pageWidth || !props.pageHeight) return
  if (props.mode === 'image' && props.images.length === 0) return
  if (props.mode === 'html' && !stagingRef.value?.children.length) return

  flip = new PageFlip(host, {
    width: props.pageWidth,
    height: props.pageHeight,
    size: 'stretch',
    // A minWidth far larger than the book ever gets stretched to keeps StPageFlip's internal
    // "container narrower than 2x minWidth -> single page" check permanently true on mobile.
    minWidth: isMobile.value ? 4000 : 300,
    maxWidth: 2000,
    minHeight: 400,
    maxHeight: 2800,
    showCover: props.showCover,
    maxShadowOpacity: 0.5,
    flippingTime: FLIPPING_TIME,
    mobileScrollSupport: true,
    startPage: props.startPage,
  })

  // StPageFlip's constructor also applies `minWidth` as this container's own inline CSS
  // min-width (so it never gets squeezed smaller than one page in a normal fluid layout) - but
  // that fights us on mobile, where minWidth is inflated on purpose just to force single-page
  // mode. Strip it back off so the actual layout width still comes from the real container, and
  // only the internal single/two-page threshold check sees the inflated value.
  host.style.minWidth = ''

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

.book-flipbook-staging {
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  pointer-events: none;
  z-index: -1;
}
</style>
