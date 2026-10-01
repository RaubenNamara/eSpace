import type { AnnotationLayerJSON } from '@/types'
import type { MarkingSheetBase, AttemptDetail } from '@/types/virtualLab'
import { createTypedAnswerLayer } from '@/composables/useAnnotationCanvas'

/**
 * Turns one part of a submitted practical (its results table, graph or a written answer) into a
 * fixed-size sheet the teacher marks with the assessment annotation tools. Sheets are always drawn
 * at the same size from the same stored content, so marks line up exactly wherever they are shown
 * again (the teacher reopening the practical, or the student viewing their marked work).
 */
export const SHEET_WIDTH = 800

export interface RenderedSheet {
  width: number
  height: number
  /** PNG drawn behind the marks (table / graph) */
  background: string | null
  /** Text rendered as a read-only annotation layer (written answers) */
  textLayers: AnnotationLayerJSON[]
}

const INK = '#111827'
const MUTED = '#6b7280'
const GRID = '#d1d5db'
const HEAD_BG = '#eef2ff'
const FONT = 'Inter, "Segoe UI", Arial, sans-serif'

function newCanvas(w: number, h: number) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, w, h)
  return { c, ctx }
}

function humanize(col: string) {
  return col.replace(/_/g, ' ').replace(/\b\w/g, (ch) => ch.toUpperCase())
}

function renderTable(base: Extract<MarkingSheetBase, { kind: 'table' }>): RenderedSheet {
  const pad = 28
  const rowH = 44
  const cols = Math.max(1, base.columns.length)
  const height = pad * 2 + rowH * (base.rows.length + 1)
  const { c, ctx } = newCanvas(SHEET_WIDTH, height)
  const tableW = SHEET_WIDTH - pad * 2
  const colW = tableW / cols

  ctx.fillStyle = HEAD_BG
  ctx.fillRect(pad, pad, tableW, rowH)
  ctx.textBaseline = 'middle'
  base.columns.forEach((col, i) => {
    ctx.fillStyle = INK
    ctx.font = `600 17px ${FONT}`
    ctx.fillText(humanize(col), pad + i * colW + 14, pad + rowH / 2, colW - 20)
  })
  base.rows.forEach((row, r) => {
    const y = pad + rowH * (r + 1)
    if (r % 2 === 1) {
      ctx.fillStyle = '#f9fafb'
      ctx.fillRect(pad, y, tableW, rowH)
    }
    row.forEach((cell, i) => {
      ctx.fillStyle = INK
      ctx.font = `17px ${FONT}`
      ctx.fillText(cell === null || cell === undefined || cell === '' ? '-' : String(cell), pad + i * colW + 14, y + rowH / 2, colW - 20)
    })
  })
  ctx.strokeStyle = '#9ca3af'
  ctx.lineWidth = 1.5
  for (let r = 0; r <= base.rows.length + 1; r++) {
    ctx.beginPath(); ctx.moveTo(pad, pad + r * rowH); ctx.lineTo(pad + tableW, pad + r * rowH); ctx.stroke()
  }
  for (let i = 0; i <= cols; i++) {
    ctx.beginPath(); ctx.moveTo(pad + i * colW, pad); ctx.lineTo(pad + i * colW, pad + rowH * (base.rows.length + 1)); ctx.stroke()
  }
  return { width: SHEET_WIDTH, height, background: c.toDataURL('image/png'), textLayers: [] }
}

/** Round axis steps (1, 2, 5 x 10^n) so the gridlines read like real graph paper */
function niceStep(span: number, target: number) {
  const raw = span / Math.max(1, target)
  const mag = Math.pow(10, Math.floor(Math.log10(raw)))
  const n = raw / mag
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * mag
}
function axisRange(values: number[]) {
  let lo = Math.min(...values)
  let hi = Math.max(...values)
  if (!isFinite(lo)) { lo = 0; hi = 1 }
  if (lo === hi) { lo -= 1; hi += 1 }
  const step = niceStep(hi - lo, 8)
  return { lo: Math.floor(lo / step) * step, hi: Math.ceil(hi / step) * step, step }
}
const fmt = (n: number) => String(Math.round(n * 1000) / 1000)

function renderGraph(base: Extract<MarkingSheetBase, { kind: 'graph' }>): RenderedSheet {
  const height = 560
  const { c, ctx } = newCanvas(SHEET_WIDTH, height)
  const L = 84, R = 28, T = 56, B = 70
  const w = SHEET_WIDTH - L - R
  const h = height - T - B
  const pts = base.points
  const xr = axisRange(pts.map((p) => p.x))
  const yr = axisRange(pts.map((p) => p.y))
  const X = (x: number) => L + ((x - xr.lo) / (xr.hi - xr.lo)) * w
  const Y = (y: number) => T + h - ((y - yr.lo) / (yr.hi - yr.lo)) * h

  ctx.fillStyle = INK
  ctx.font = `600 19px ${FONT}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'
  ctx.fillText(base.title || 'Graph', SHEET_WIDTH / 2, 34)

  // minor + major grid
  ctx.lineWidth = 1
  for (let x = xr.lo; x <= xr.hi + 1e-9; x += xr.step / 5) {
    ctx.strokeStyle = '#eef0f3'; ctx.beginPath(); ctx.moveTo(X(x), T); ctx.lineTo(X(x), T + h); ctx.stroke()
  }
  for (let y = yr.lo; y <= yr.hi + 1e-9; y += yr.step / 5) {
    ctx.strokeStyle = '#eef0f3'; ctx.beginPath(); ctx.moveTo(L, Y(y)); ctx.lineTo(L + w, Y(y)); ctx.stroke()
  }
  ctx.font = `14px ${FONT}`
  ctx.fillStyle = MUTED
  for (let x = xr.lo; x <= xr.hi + 1e-9; x += xr.step) {
    ctx.strokeStyle = GRID; ctx.beginPath(); ctx.moveTo(X(x), T); ctx.lineTo(X(x), T + h); ctx.stroke()
    ctx.textAlign = 'center'; ctx.fillText(fmt(x), X(x), T + h + 22)
  }
  for (let y = yr.lo; y <= yr.hi + 1e-9; y += yr.step) {
    ctx.strokeStyle = GRID; ctx.beginPath(); ctx.moveTo(L, Y(y)); ctx.lineTo(L + w, Y(y)); ctx.stroke()
    ctx.textAlign = 'right'; ctx.fillText(fmt(y), L - 10, Y(y) + 5)
  }
  ctx.strokeStyle = '#374151'
  ctx.lineWidth = 1.8
  ctx.strokeRect(L, T, w, h)

  // axis titles
  ctx.fillStyle = INK
  ctx.font = `500 16px ${FONT}`
  ctx.textAlign = 'center'
  ctx.fillText(base.xLabel || 'x', L + w / 2, height - 18)
  ctx.save()
  ctx.translate(24, T + h / 2)
  ctx.rotate(-Math.PI / 2)
  ctx.fillText(base.yLabel || 'y', 0, 0)
  ctx.restore()

  // the student's points, joined left to right, and the recorded best-fit line
  const sorted = [...pts].sort((a, b) => a.x - b.x)
  if (sorted.length >= 2) {
    ctx.strokeStyle = 'rgba(79, 70, 229, 0.85)'
    ctx.lineWidth = 2
    ctx.beginPath()
    sorted.forEach((p, i) => (i ? ctx.lineTo(X(p.x), Y(p.y)) : ctx.moveTo(X(p.x), Y(p.y))))
    ctx.stroke()
  }
  if (base.bestFit && sorted.length >= 2) {
    const x0 = sorted[0].x, x1 = sorted[sorted.length - 1].x
    ctx.save()
    ctx.beginPath(); ctx.rect(L, T, w, h); ctx.clip()
    ctx.strokeStyle = 'rgba(220, 38, 38, 0.9)'
    ctx.setLineDash([9, 6])
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(X(x0), Y(base.bestFit.slope * x0 + base.bestFit.intercept))
    ctx.lineTo(X(x1), Y(base.bestFit.slope * x1 + base.bestFit.intercept))
    ctx.stroke()
    ctx.restore()
  }
  for (const p of pts) {
    ctx.fillStyle = '#4f46e5'
    ctx.beginPath(); ctx.arc(X(p.x), Y(p.y), 6, 0, Math.PI * 2); ctx.fill()
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.5; ctx.stroke()
  }
  return { width: SHEET_WIDTH, height, background: c.toDataURL('image/png'), textLayers: [] }
}

function renderText(base: Extract<MarkingSheetBase, { kind: 'text' }>): RenderedSheet {
  const { layer, height } = createTypedAnswerLayer(base.text?.trim() ? base.text : '(No answer given)', SHEET_WIDTH)
  return { width: SHEET_WIDTH, height, background: null, textLayers: [layer] }
}

export function renderSheet(base: MarkingSheetBase): RenderedSheet {
  if (base.kind === 'table') return renderTable(base)
  if (base.kind === 'graph') return renderGraph(base)
  return renderText(base)
}

export interface MarkingSection {
  key: string
  base: MarkingSheetBase
  /** for answer sections: the answer the per-question marks belong to */
  questionId?: number
  marks?: number
}

/**
 * The parts of a submitted attempt a teacher can mark, in reading order: results table, graph,
 * observations, each written answer (graph-analysis answers after the graph), then conclusion.
 */
export function markingSectionsFor(a: AttemptDetail): MarkingSection[] {
  const out: MarkingSection[] = []
  const rows = a.notebook.filter((n) => n.entry_type === 'result_row')
  if (rows.length) {
    const columns = Object.keys(rows[0].extra || {})
    out.push({
      key: 'results',
      base: { kind: 'table', title: 'Results Table', columns, rows: rows.map((r) => columns.map((col) => (r.extra?.[col] ?? null) as string | number | null)) },
    })
  }
  const snap = a.graph_snapshot
  if (snap && snap.x_column && snap.y_column) {
    const plotted = a.notebook.filter((n) => n.entry_type === 'plot_point')
    const source = plotted.length ? plotted : rows
    const points = source
      .map((r) => ({ x: Number(r.extra?.[snap.x_column!]), y: Number(r.extra?.[snap.y_column!]) }))
      .filter((p) => Number.isFinite(p.x) && Number.isFinite(p.y))
    if (points.length) {
      const fit = snap.gradient !== null && snap.intercept !== null
        ? { slope: snap.gradient, intercept: snap.intercept }
        : null
      out.push({
        key: 'graph',
        base: { kind: 'graph', title: snap.title || 'Graph', xLabel: snap.x_label || snap.x_column, yLabel: snap.y_label || snap.y_column, points, bestFit: fit },
      })
    }
  }
  const graphAnswers = a.answers.filter((ans) => ans.linked_to_graph)
  const otherAnswers = a.answers.filter((ans) => !ans.linked_to_graph)
  for (const ans of graphAnswers) {
    out.push({ key: `answer:${ans.question_id}`, base: { kind: 'text', title: ans.question_text, text: ans.answer_text || '' }, questionId: ans.question_id, marks: ans.question_marks })
  }
  const obs = a.observations.map((o) => o.text).filter((t) => t && t.trim()).join('\n\n')
  if (obs) out.push({ key: 'observations', base: { kind: 'text', title: 'Observations', text: obs } })
  for (const ans of otherAnswers) {
    out.push({ key: `answer:${ans.question_id}`, base: { kind: 'text', title: ans.question_text, text: ans.answer_text || '' }, questionId: ans.question_id, marks: ans.question_marks })
  }
  if (a.conclusion_text && a.conclusion_text.trim()) out.push({ key: 'conclusion', base: { kind: 'text', title: 'Conclusion', text: a.conclusion_text } })
  return out
}

