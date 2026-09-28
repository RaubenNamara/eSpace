<template>
  <!-- A dashboard number that counts: up from 0 when it first comes into view, then from its old
       value to the new one whenever it changes (e.g. the dashboard's live refresh), easing off as it
       lands. Text around the number is kept ("85%", "12.5 hrs"); anything that isn't a number
       ("—") is shown as it is. -->
  <span ref="el" class="tabular-nums">{{ shown }}</span>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = withDefaults(defineProps<{
  value: string | number | null | undefined
  // How long the first count from 0 takes; later changes count a little quicker
  duration?: number
}>(), { duration: 1400 })

interface Parsed {
  number: number
  prefix: string
  suffix: string
  decimals: number
}

// "85%" -> 85 + "%", "1,204" -> 1204, "12.5 hrs" -> 12.5 + " hrs"; null when there is no number
function parse(value: string | number | null | undefined): Parsed | null {
  if (typeof value === 'number') {
    if (!isFinite(value)) return null
    const decimals = Number.isInteger(value) ? 0 : Math.min(2, String(value).split('.')[1]?.length ?? 0)
    return { number: value, prefix: '', suffix: '', decimals }
  }
  if (typeof value !== 'string') return null
  const match = value.match(/^(\D*?)(-?\d[\d,]*(?:\.\d+)?)(.*)$/)
  if (!match) return null
  const digits = match[2].replace(/,/g, '')
  return {
    number: parseFloat(digits),
    prefix: match[1],
    suffix: match[3],
    decimals: Math.min(2, digits.split('.')[1]?.length ?? 0)
  }
}

const format = (p: Parsed, n: number) =>
  p.prefix + n.toLocaleString(undefined, { minimumFractionDigits: p.decimals, maximumFractionDigits: p.decimals }) + p.suffix

const reduced = typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
const el = ref<HTMLElement | null>(null)
const shown = ref('')
let current = 0
let frame = 0
let observer: IntersectionObserver | null = null
let started = false

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

function countTo(target: Parsed, duration: number) {
  cancelAnimationFrame(frame)
  const from = current
  if (reduced || from === target.number) {
    current = target.number
    shown.value = format(target, current)
    return
  }
  const start = performance.now()
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration)
    current = from + (target.number - from) * easeOut(t)
    shown.value = format(target, t < 1 ? current : target.number)
    if (t < 1) frame = requestAnimationFrame(step)
    else current = target.number
  }
  frame = requestAnimationFrame(step)
}

function show(value: typeof props.value, first: boolean) {
  const parsed = parse(value)
  if (!parsed) {
    shown.value = value === null || value === undefined ? '' : String(value)
    return
  }
  if (first) {
    current = 0
    shown.value = format(parsed, 0)
  }
  countTo(parsed, first ? props.duration : Math.round(props.duration * 0.7))
}

// First count starts when the number is actually on screen
function start() {
  if (started) return
  started = true
  observer?.disconnect()
  observer = null
  show(props.value, true)
}

watch(() => props.value, (value) => {
  if (!started) {
    const parsed = parse(value)
    shown.value = parsed ? format(parsed, 0) : (value === null || value === undefined ? '' : String(value))
    return
  }
  show(value, false)
})

onMounted(() => {
  const parsed = parse(props.value)
  shown.value = parsed ? format(parsed, 0) : (props.value === null || props.value === undefined ? '' : String(props.value))
  if (!el.value || typeof IntersectionObserver === 'undefined') {
    start()
    return
  }
  observer = new IntersectionObserver(entries => {
    if (entries.some(e => e.isIntersecting)) start()
  })
  observer.observe(el.value)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  observer?.disconnect()
})
</script>
