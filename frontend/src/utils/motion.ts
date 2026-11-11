import type { Router } from 'vue-router'
import type { AxiosInstance } from 'axios'

/**
 * Tusome's sense of life, on every page without each page asking for it:
 *
 * - a gold progress bar along the top that follows the page and the data it loads
 * - each page arrives in its own way: the heading wipes in, cards and rows follow one by one
 * - figures count up, and things further down arrive as you scroll to them
 * - link cards lean towards the pointer, taps give a small gold ring
 * - confetti for moments worth marking (an honours result)
 *
 * It stays out of the way where it would get in it: the 3D labs, readers, chat and live classes.
 * All of it steps aside when the device asks for reduced motion, and while printing.
 */

const calm = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const EASE = 'cubic-bezier(0.2, 0.7, 0.2, 1)'
const BOUNCE = 'cubic-bezier(0.34, 1.45, 0.64, 1)'
const GOLD = '#d9a520'

// Pages that do their own drawing or move all the time: no entrances there
const QUIET = /(virtual-lab|ict-lab|anatomy|science-lab|\/chat|study-groups|live-class|live-quiz|enotes\/\d|library\/(read|book)|\/mark|annotate|preview)/i
let quiet = false

// --- The progress bar -------------------------------------------------------------------------

let bar: HTMLDivElement | null = null
let busy = 0
let value = 0
let trickle: ReturnType<typeof setInterval> | undefined
let hideTimer: ReturnType<typeof setTimeout> | undefined

function paintBar() {
  if (bar) bar.style.transform = `scaleX(${value})`
}
function barStart() {
  if (!bar) return
  clearTimeout(hideTimer)
  busy++
  if (trickle) return
  bar.style.opacity = '1'
  value = 0.08
  paintBar()
  trickle = setInterval(() => {
    value += (0.92 - value) * 0.12
    paintBar()
  }, 160)
}
function barDone() {
  if (!bar) return
  busy = Math.max(0, busy - 1)
  if (busy > 0) return
  clearInterval(trickle)
  trickle = undefined
  value = 1
  paintBar()
  hideTimer = setTimeout(() => {
    if (bar) bar.style.opacity = '0'
    hideTimer = setTimeout(() => {
      value = 0
      paintBar()
    }, 260)
  }, 180)
}

/**
 * The bar follows the requests a page makes as it opens. Background checks (new messages,
 * notifications, live refresh) happen later and don't move it.
 */
let pageLoadingUntil = 0
function watchRequests(client: AxiosInstance) {
  client.interceptors.request.use((config) => {
    if (performance.now() < pageLoadingUntil) {
      ;(config as unknown as { _bar?: boolean })._bar = true
      barStart()
    }
    return config
  })
  const finish = (config: unknown) => {
    const c = config as { _bar?: boolean } | undefined
    if (c?._bar) {
      c._bar = false
      barDone()
    }
  }
  client.interceptors.response.use(
    (res) => { finish(res.config); return res },
    (err) => { finish(err?.config); return Promise.reject(err) },
  )
}

// --- Pages arriving ---------------------------------------------------------------------------

type Keyframes = Keyframe[]
const ENTRANCES: { frames: Keyframes; easing: string; origin?: string }[] = [
  { frames: [{ opacity: 0, transform: 'translateY(22px)' }, { opacity: 1, transform: 'none' }], easing: EASE },
  { frames: [{ opacity: 0, transform: 'scale(0.94)' }, { opacity: 1, transform: 'none' }], easing: BOUNCE },
  { frames: [{ opacity: 0, transform: 'translateX(-24px)' }, { opacity: 1, transform: 'none' }], easing: EASE },
  // like a page turning down from the top
  { frames: [{ opacity: 0, transform: 'perspective(800px) rotateX(-20deg) translateY(14px)' }, { opacity: 1, transform: 'none' }], easing: EASE, origin: 'top center' },
  { frames: [{ opacity: 0, transform: 'translateX(24px) scale(0.98)' }, { opacity: 1, transform: 'none' }], easing: EASE },
]
let entrance = ENTRANCES[0]
let freshUntil = 0

const BLOCKS = 'h1, .stat-card, .dash-box, .rounded-2xl, .rounded-3xl, tbody tr, ul > li, ol > li'
const FIGURES = '.stat-num, p.text-2xl.font-bold, p.text-3xl.font-bold, p.text-4xl.font-bold, p.text-5xl.font-bold, .figure'
const seen = new WeakSet<Element>()
const waiting = new Set<Element>()
let flushing = 0
let io: IntersectionObserver | null = null

function inPage(el: Element) {
  return !!el.closest('main, [data-motion]')
}
function skip(el: Element) {
  return !!el.closest('.absolute, .fixed, .sticky, aside, nav, [role=dialog], [role=alertdialog], [role=menu], [role=listbox], [aria-hidden=true], .no-motion, canvas, svg')
}

function play(el: HTMLElement, delay: number, quick = false) {
  if (el.matches('h1') && !quick) {
    el.animate([{ clipPath: 'inset(-10% 100% -10% 0)', opacity: 0.2 }, { clipPath: 'inset(-10% -2% -10% 0)', opacity: 1 }], { duration: 700, easing: EASE, fill: 'backwards' })
    return
  }
  if (quick) {
    el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 220, easing: 'ease-out', fill: 'backwards' })
    return
  }
  if (entrance.origin) el.style.transformOrigin = entrance.origin
  const anim = el.animate(entrance.frames, { duration: 560, easing: entrance.easing, fill: 'backwards', delay })
  if (entrance.origin) anim.onfinish = () => (el.style.transformOrigin = '')
}

/** "1,250" or "86%" counts up by itself; dates, grades, words and "8/10" don't */
const NUMBER = /^((?:[A-Z]{3})?[\s ]*)([-−]?)(\d[\d,]*)(\.\d+)?(%?)$/
function countUp(el: HTMLElement, delay: number) {
  if (el.children.length || el.closest('.no-count')) return
  const original = el.textContent?.trim() ?? ''
  const m = original.match(NUMBER)
  if (!m) return
  const target = Number(m[3].replace(/,/g, ''))
  if (!target) return
  const write = (n: number) => `${m[1]}${m[2]}${n.toLocaleString('en-US')}${m[5]}`
  let last = write(0)
  el.textContent = last
  const start = performance.now() + delay
  const step = (now: number) => {
    // Vue changed the figure meanwhile: leave it alone
    if (el.textContent !== last) return
    const t = Math.max(0, Math.min(1, (now - start) / 950))
    if (t >= 1) {
      el.textContent = original
      return
    }
    last = write(Math.round(target * (1 - (1 - t) ** 4)))
    el.textContent = last
    requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

function flush() {
  flushing = 0
  const fresh = performance.now() < freshUntil
  const vh = window.innerHeight
  let order = 0
  let rows = 0
  const items = [...waiting].sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
  waiting.clear()
  for (const el of items) {
    if (!el.isConnected || !(el instanceof HTMLElement)) continue
    const isRow = el.matches('tbody tr, ul > li, ol > li')
    if (isRow && ++rows > 24) continue
    if (!isRow && !el.matches('h1') && el.parentElement?.closest('[data-m]')) continue
    el.setAttribute('data-m', '')
    if (el.getBoundingClientRect().top > vh && fresh) {
      io?.observe(el)
      continue
    }
    if (fresh) play(el, Math.min(order++ * 60, 760))
    else play(el, 0, true)
  }
}

function collect(node: Node) {
  if (quiet || !(node instanceof Element) || calm() || document.body.classList.contains('printing')) return
  if (node.closest('[role=listbox], [role=menu], .no-motion')) return
  const add = (el: Element) => {
    if (!seen.has(el) && inPage(el) && !skip(el)) {
      seen.add(el)
      waiting.add(el)
    }
  }
  if (node.matches(BLOCKS)) add(node)
  node.querySelectorAll(BLOCKS).forEach(add)
  if (performance.now() < freshUntil) {
    const figures = node.matches(FIGURES) ? [node, ...node.querySelectorAll(FIGURES)] : [...node.querySelectorAll(FIGURES)]
    figures.forEach((f, i) => {
      if (!seen.has(f) && inPage(f) && f instanceof HTMLElement) {
        seen.add(f)
        countUp(f, 140 + i * 90)
      }
    })
  }
  if (waiting.size && !flushing) flushing = requestAnimationFrame(flush)
}

// --- Cards that lean, taps that ring ----------------------------------------------------------

const LEANS = 'a.rounded-2xl, a.rounded-xl.border, a.stat-card, button.stat-card-action, [data-tilt]'
let leaning: HTMLElement | null = null
function stopLean() {
  if (leaning) {
    leaning.style.transform = ''
    leaning.style.transition = 'transform 0.35s ease-out'
    leaning = null
  }
}
function lean(e: PointerEvent) {
  const card = quiet ? null : ((e.target as Element | null)?.closest?.(LEANS) as HTMLElement | null)
  if (card !== leaning) stopLean()
  if (!card || !inPage(card)) return
  leaning = card
  const r = card.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  card.style.transition = 'transform 0.08s linear'
  card.style.transform = `perspective(900px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg) translateY(-2px)`
}

function ring(e: PointerEvent) {
  if (quiet) return
  const hit = (e.target as Element | null)?.closest?.('button, a.rounded-2xl, a.stat-card, a[class*="btn-"], .hub-tab, .hub-link')
  if (!hit || (hit as HTMLButtonElement).disabled) return
  const dot = document.createElement('span')
  dot.setAttribute('aria-hidden', 'true')
  dot.style.cssText = `position:fixed;left:${e.clientX - 20}px;top:${e.clientY - 20}px;width:40px;height:40px;border-radius:50%;border:2px solid ${GOLD};pointer-events:none;z-index:95`
  document.body.appendChild(dot)
  dot.animate([{ transform: 'scale(0.2)', opacity: 0.9 }, { transform: 'scale(1.5)', opacity: 0 }], { duration: 420, easing: 'ease-out' }).onfinish = () => dot.remove()
}

// --- Confetti ---------------------------------------------------------------------------------

interface Piece { x: number; y: number; vx: number; vy: number; spin: number; angle: number; size: number; color: string; star: boolean }
const COLORS = ['#d9a520', '#edc95a', '#1b3fa0', '#3a5fc4', '#faf5e8', '#ffffff']

function star(ctx: CanvasRenderingContext2D, r: number) {
  ctx.beginPath()
  for (let i = 0; i < 10; i++) {
    const a = (Math.PI / 5) * i - Math.PI / 2
    const d = i % 2 ? r * 0.45 : r
    ctx.lineTo(Math.cos(a) * d, Math.sin(a) * d)
  }
  ctx.closePath()
  ctx.fill()
}

/** Gold stars and blue and cream paper from the top: something worth celebrating */
export function confetti(count = 140) {
  if (calm()) return
  const pieces: Piece[] = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: -20 - Math.random() * 260,
    vx: (Math.random() - 0.5) * 3,
    vy: 1 + Math.random() * 3,
    spin: (Math.random() - 0.5) * 0.3,
    angle: Math.random() * 6,
    size: 6 + Math.random() * 6,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    star: Math.random() < 0.22,
  }))
  const canvas = document.createElement('canvas')
  canvas.setAttribute('aria-hidden', 'true')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:80'
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')!
  const started = performance.now()
  const frame = (now: number) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const age = now - started
    for (const p of pieces) {
      p.vy += 0.12
      p.x += p.vx
      p.y += p.vy
      p.angle += p.spin
      ctx.save()
      ctx.globalAlpha = Math.max(0, 1 - (age - 1800) / 700)
      ctx.translate(p.x, p.y)
      ctx.rotate(p.angle)
      if (p.star) {
        ctx.fillStyle = GOLD
        star(ctx, p.size * 0.9)
      } else {
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size / 1.5)
      }
      ctx.restore()
    }
    if (age < 2500) requestAnimationFrame(frame)
    else canvas.remove()
  }
  requestAnimationFrame(frame)
}

// --- Starting up ------------------------------------------------------------------------------

function hideSplash() {
  const splash = document.getElementById('splash')
  if (!splash) return
  const wait = Math.max(0, 700 - performance.now())
  setTimeout(() => {
    if (calm()) {
      splash.remove()
      return
    }
    splash.animate([{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(1.06)' }], { duration: 360, easing: 'ease-in', fill: 'forwards' }).onfinish = () => splash.remove()
  }, wait)
}

export function installMotion(router: Router, clients: AxiosInstance[]) {
  bar = document.createElement('div')
  bar.className = 'route-bar'
  bar.setAttribute('aria-hidden', 'true')
  document.body.appendChild(bar)
  clients.forEach(watchRequests)

  const nameHash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7)
  router.beforeEach(() => {
    pageLoadingUntil = performance.now() + 3000
    barStart()
  })
  router.afterEach((to) => {
    barDone()
    quiet = QUIET.test(to.path) || !!to.meta?.immersiveReader
    entrance = ENTRANCES[nameHash(String(to.name ?? to.path)) % ENTRANCES.length]
    // A page's data usually lands within this time, and arrives with the full show
    freshUntil = performance.now() + 2600
    pageLoadingUntil = performance.now() + 2600
  })
  router.onError(() => barDone())
  router.isReady().then(hideSplash, hideSplash)
  // Never leave the loading screen up, whatever happens while starting
  setTimeout(hideSplash, 8000)

  if (!calm()) {
    io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          io?.unobserve(e.target)
          ;(e.target as HTMLElement).animate(entrance.frames, { duration: 480, easing: entrance.easing })
        }
      }
    }, { rootMargin: '0px 0px -6% 0px' })

    new MutationObserver((records) => {
      for (const r of records) r.addedNodes.forEach(collect)
    }).observe(document.body, { childList: true, subtree: true })

    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      document.addEventListener('pointermove', lean, { passive: true })
      document.addEventListener('pointerleave', stopLean)
    }
    document.addEventListener('pointerdown', ring, { passive: true })
  }
  // Nothing half-way through an animation on paper
  window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing')
    document.getAnimations().forEach((a) => a.finish())
  })
  window.addEventListener('afterprint', () => document.body.classList.remove('printing'))
}
