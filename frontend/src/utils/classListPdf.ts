import jsPDF from 'jspdf'

/**
 * Class lists as a PDF: one A4 page per stream, every learner on that one page. Big streams
 * (S.5 A has ~180 learners) flow into 2, 3 or 4 columns with a smaller font until they fit.
 */
export interface ClassListStudent {
  admission_number: string | null
  first_name: string
  last_name: string
  gender: string | null
}

export interface ClassListStream {
  /** e.g. "S.1 A" */
  title: string
  students: ClassListStudent[]
}

const PAGE_W = 210
const PAGE_H = 297
const MARGIN = 10
const HEADER_H = 26
const FOOTER_H = 7
const GAP = 4 // between columns
const MAX_ROW = 7 // mm - small streams don't get huge rows
const MIN_ROW = 3.3 // mm - below this it stops being readable

const PT_TO_MM = 0.3528

function sexOf(g: string | null) {
  return g === 'male' ? 'M' : g === 'female' ? 'F' : ''
}

/** Shortens text with "..." until it fits the width (in mm) at the current font. */
function fit(doc: jsPDF, text: string, width: number) {
  if (doc.getTextWidth(text) <= width) return text
  let t = text
  while (t.length > 1 && doc.getTextWidth(t + '...') > width) t = t.slice(0, -1)
  return t.trimEnd() + '...'
}

/** Fewest columns whose rows still fit the page at a readable height. */
function layoutFor(n: number, usableH: number) {
  for (const cols of [1, 2, 3, 4]) {
    const rowsPerCol = Math.max(1, Math.ceil(n / cols))
    const rowH = Math.min(MAX_ROW, usableH / (rowsPerCol + 1)) // +1 for the column heading row
    // One column is only worth it while names stay roomy; otherwise go wider
    if (rowH >= (cols === 1 ? 4.6 : MIN_ROW) || cols === 4) return { cols, rowsPerCol, rowH: Math.max(rowH, 2.6) }
  }
  return { cols: 4, rowsPerCol: Math.ceil(n / 4), rowH: MIN_ROW }
}

export function buildClassListPdf(streams: ClassListStream[], school: string | null, scopeLabel: string): jsPDF {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

  streams.forEach((stream, pageIndex) => {
    if (pageIndex > 0) doc.addPage()
    const list = [...stream.students].sort((a, b) =>
      `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`, undefined, { sensitivity: 'base' }))
    const boys = list.filter(s => s.gender === 'male').length
    const girls = list.filter(s => s.gender === 'female').length

    // Header
    doc.setTextColor(20, 20, 20)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.text((school || 'School').toUpperCase(), PAGE_W / 2, MARGIN + 5, { align: 'center' })
    doc.setFontSize(16)
    doc.text(`${stream.title} - Class List`, PAGE_W / 2, MARGIN + 12.5, { align: 'center' })
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9.5)
    doc.text(`${list.length} learners  ·  Boys ${boys}  ·  Girls ${girls}`, PAGE_W / 2, MARGIN + 18, { align: 'center' })
    doc.setDrawColor(60, 60, 60)
    doc.setLineWidth(0.4)
    doc.line(MARGIN, MARGIN + HEADER_H - 4, PAGE_W - MARGIN, MARGIN + HEADER_H - 4)

    // Table, flowing down then across the columns
    const top = MARGIN + HEADER_H
    const usableH = PAGE_H - top - MARGIN - FOOTER_H
    const { cols, rowsPerCol, rowH } = layoutFor(list.length, usableH)
    const colW = (PAGE_W - 2 * MARGIN - GAP * (cols - 1)) / cols
    // Column widths inside each table column: No. | Reg No. | Name | Sex (they scale with the font)
    const widths = (pt: number) => {
      doc.setFontSize(pt)
      const noW = doc.getTextWidth('000') + 2
      const regW = Math.max(doc.getTextWidth('00-00000') + 2.5, doc.getTextWidth('Reg No.') + 2)
      const sexW = doc.getTextWidth('Sex') + 2
      return { noW, regW, sexW, nameW: colW - noW - regW - sexW }
    }
    // Long names: shrink the font (down to 80%) so they fit before any get cut short with "..."
    let fontPt = Math.min(11, (rowH * 0.62) / PT_TO_MM)
    doc.setFontSize(fontPt)
    const widestName = Math.max(0, ...list.map(s => doc.getTextWidth(`${s.first_name} ${s.last_name}`.trim())))
    const room = widths(fontPt).nameW - 1.5
    if (widestName > room) fontPt = Math.max(fontPt * 0.8, fontPt * (room / widestName))
    const { noW, regW, sexW, nameW } = widths(fontPt)
    const baseline = rowH * 0.7

    for (let c = 0; c < cols; c++) {
      const x = MARGIN + c * (colW + GAP)
      const rows = list.slice(c * rowsPerCol, (c + 1) * rowsPerCol)
      if (!rows.length) continue
      // Heading row
      doc.setFillColor(230, 233, 240)
      doc.rect(x, top, colW, rowH, 'F')
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(fontPt)
      doc.text('No.', x + 0.8, top + baseline)
      doc.text('Reg No.', x + noW, top + baseline)
      doc.text('Name', x + noW + regW, top + baseline)
      doc.text('Sex', x + colW - sexW + 0.8, top + baseline)
      doc.setFont('helvetica', 'normal')
      rows.forEach((s, i) => {
        const y = top + rowH * (i + 1)
        if (i % 2 === 1) { doc.setFillColor(246, 247, 250); doc.rect(x, y, colW, rowH, 'F') }
        const n = c * rowsPerCol + i + 1
        doc.text(String(n), x + 0.8, y + baseline)
        doc.text(fit(doc, s.admission_number || '', regW - 1), x + noW, y + baseline)
        doc.text(fit(doc, `${s.first_name} ${s.last_name}`.trim(), nameW - 1.5), x + noW + regW, y + baseline)
        doc.text(sexOf(s.gender), x + colW - sexW + 0.8, y + baseline)
      })
      // Thin frame round the column
      doc.setDrawColor(170, 170, 170)
      doc.setLineWidth(0.15)
      doc.rect(x, top, colW, rowH * (rows.length + 1))
    }

    // Footer
    doc.setFontSize(8)
    doc.setTextColor(110, 110, 110)
    doc.text(`${scopeLabel}  ·  Printed ${today}`, MARGIN, PAGE_H - MARGIN + 2)
    doc.text(`Page ${pageIndex + 1} of ${streams.length}`, PAGE_W - MARGIN, PAGE_H - MARGIN + 2, { align: 'right' })
  })
  return doc
}
