import jsPDF from 'jspdf'

export interface MyNote {
  kind: 'enote' | 'book' | 'paper'
  kind_label: string
  id: string
  subject: string
  source_id: number
  source: string
  page: number
  page_title: string | null
  text: string
  updated_at: string
}

/**
 * A student's own notes as an A4 PDF they can keep: grouped by subject, then by the topic or book
 * each was written on, page by page. Plain text only - their words, not the school's content.
 */
export function buildMyNotesPdf(notes: MyNote[], who: { name: string; class_label: string | null; admission_number: string | null }, school: string | null): jsPDF {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const W = 210
  const M = 18
  const width = W - M * 2
  let y = 0

  const newPage = () => { doc.addPage(); y = M }
  const room = (h: number) => { if (y + h > 297 - 18) newPage() }
  const title = (s: string) => s.replace(/\b\w+/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())

  // Header
  doc.setFillColor(79, 70, 229)
  doc.rect(0, 0, W, 34, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  doc.text('My notes', M, 16)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  const line2 = [title(who.name), who.class_label, who.admission_number].filter(Boolean).join('  ·  ')
  doc.text(line2, M, 23)
  const line3 = [school ? title(school) : null, `Downloaded ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`].filter(Boolean).join('  ·  ')
  doc.text(line3, M, 28.5)
  y = 44

  doc.setTextColor(71, 85, 105)
  doc.setFontSize(9.5)
  doc.text(`${notes.length} ${notes.length === 1 ? 'note' : 'notes'} written while reading on eSpace.`, M, y)
  y += 8

  let subject = ''
  let source = ''
  for (const n of notes) {
    if (n.subject !== subject) {
      subject = n.subject
      source = ''
      room(16)
      y += 3
      doc.setDrawColor(226, 232, 240)
      doc.line(M, y, W - M, y)
      y += 7
      doc.setTextColor(15, 23, 42)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(14)
      doc.text(subject, M, y)
      y += 6
    }
    const key = `${n.kind}:${n.source_id}`
    if (key !== source) {
      source = key
      room(12)
      y += 2
      doc.setTextColor(79, 70, 229)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(11)
      const head = doc.splitTextToSize(`${title(n.source)}`, width - 22) as string[]
      doc.text(head, M, y)
      doc.setTextColor(148, 163, 184)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.text(n.kind_label.toUpperCase(), W - M, y, { align: 'right' })
      y += head.length * 5 + 1
    }
    // The note (measured in the size it's written in)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10.5)
    const body = doc.splitTextToSize(n.text.trim(), width - 6) as string[]
    const label = `Page ${n.page}${n.page_title && n.page_title.toLowerCase() !== 'page' ? ` - ${n.page_title}` : ''}`
    room(6 + Math.min(body.length, 6) * 4.8)
    doc.setTextColor(100, 116, 139)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8.5)
    doc.text(label, M, y)
    y += 4.5
    doc.setTextColor(30, 41, 59)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10.5)
    for (const l of body) {
      room(5)
      doc.setDrawColor(199, 210, 254)
      doc.setLineWidth(0.6)
      doc.line(M + 0.3, y - 3.4, M + 0.3, y + 1)
      doc.text(l, M + 4, y)
      y += 4.8
    }
    y += 3
  }

  // Footer on every page
  const pages = doc.getNumberOfPages()
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i)
    doc.setTextColor(148, 163, 184)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.text(`${title(who.name)} - my notes from eSpace`, M, 297 - 9)
    doc.text(`${i} / ${pages}`, W - M, 297 - 9, { align: 'right' })
  }
  return doc
}

// ---- Notebook style: ruled A4 paper, a red margin, handwriting-style text, blue headings ----

let handFont: string | null = null
// Patrick Hand (SIL Open Font License - public/fonts/PatrickHand-OFL.txt), fetched once
async function loadHandFont(): Promise<string> {
  if (handFont) return handFont
  const res = await fetch('/fonts/PatrickHand-Regular.ttf')
  if (!res.ok) throw new Error('font')
  const bytes = new Uint8Array(await res.arrayBuffer())
  let bin = ''
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
  handFont = btoa(bin)
  return handFont
}

/**
 * The same notes as buildMyNotesPdf(), written out like an exercise book: every line of writing
 * sits on a ruled line, headings in blue, the student's name and date in the corner.
 */
export async function buildNotebookPdf(notes: MyNote[], who: { name: string; class_label: string | null; admission_number: string | null }, school: string | null): Promise<jsPDF> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  doc.addFileToVFS('PatrickHand.ttf', await loadHandFont())
  doc.addFont('PatrickHand.ttf', 'PatrickHand', 'normal')
  doc.setFont('PatrickHand', 'normal')

  const W = 210
  const H = 297
  const LINE = 8 // mm between rules
  const TOP = 30 // first rule
  const MARGIN_X = 26 // the red margin
  const LEFT = MARGIN_X + 4
  const RIGHT = W - 14
  const width = RIGHT - LEFT
  const title = (s: string) => s.replace(/\b\w+/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
  const INK: [number, number, number] = [31, 41, 55]
  const BLUE: [number, number, number] = [29, 78, 216]

  let row = 0 // which ruled line we're on
  const lastRow = Math.floor((H - 16 - TOP) / LINE)

  const paper = (pageNo: number) => {
    doc.setFillColor(255, 253, 247)
    doc.rect(0, 0, W, H, 'F')
    doc.setDrawColor(191, 219, 254)
    doc.setLineWidth(0.25)
    for (let yy = TOP; yy < H - 10; yy += LINE) doc.line(0, yy, W, yy)
    doc.setDrawColor(248, 113, 113)
    doc.setLineWidth(0.4)
    doc.line(MARGIN_X, 0, MARGIN_X, H)
    // Corner, like the "DATE / PAGE" box of an exercise book
    doc.setTextColor(...BLUE)
    doc.setFontSize(10)
    doc.text(`Page ${pageNo}`, RIGHT, 12, { align: 'right' })
    doc.text(new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }), RIGHT, 17, { align: 'right' })
  }
  const yOf = (r: number) => TOP + r * LINE - 1.6
  const nextRow = (n = 1) => {
    row += n
    if (row > lastRow) {
      doc.addPage()
      paper(doc.getNumberOfPages())
      row = 1
    }
  }
  const write = (text: string, opts: { size?: number; color?: [number, number, number]; x?: number; align?: 'center' } = {}) => {
    doc.setFontSize(opts.size ?? 14)
    doc.setTextColor(...(opts.color ?? INK))
    if (opts.align === 'center') doc.text(text, W / 2 + MARGIN_X / 2, yOf(row), { align: 'center' })
    else doc.text(text, opts.x ?? LEFT, yOf(row))
  }

  paper(1)
  // Title, centred and underlined
  row = 1
  write('My notes', { size: 22, color: BLUE, align: 'center' })
  const tw = doc.getTextWidth('My notes')
  doc.setDrawColor(...BLUE)
  doc.setLineWidth(0.4)
  doc.line(W / 2 + MARGIN_X / 2 - tw / 2, yOf(row) + 1.4, W / 2 + MARGIN_X / 2 + tw / 2, yOf(row) + 1.4)
  nextRow()
  write([title(who.name), who.class_label, who.admission_number, school ? title(school) : null].filter(Boolean).join('  ·  '), { size: 11, color: [100, 116, 139], align: 'center' })
  nextRow(2)

  let subject = ''
  let source = ''
  let n = 0
  for (const note of notes) {
    if (note.subject !== subject) {
      subject = note.subject
      source = ''
      n++
      if (row > 3) nextRow()
      write(`${n}.  ${subject}`, { size: 17, color: BLUE })
      nextRow()
    }
    const key = `${note.kind}:${note.source_id}`
    if (key !== source) {
      source = key
      doc.setFontSize(14.5)
      for (const l of doc.splitTextToSize(`${title(note.source)} :`, width) as string[]) {
        write(l, { size: 14.5, color: BLUE })
        nextRow()
      }
    }
    const label = `Page ${note.page}${note.page_title && note.page_title.toLowerCase() !== 'page' ? ` - ${note.page_title}` : ''}`
    write(label, { size: 11, color: [100, 116, 139], x: LEFT + 4 })
    nextRow()
    doc.setFontSize(14)
    for (const para of note.text.trim().split(/\n+/)) {
      const lines = doc.splitTextToSize(para, width - 8) as string[]
      lines.forEach((l, i) => {
        if (i === 0) {
          write('•', { x: LEFT + 2 })
        }
        write(l, { x: LEFT + 7 })
        nextRow()
      })
    }
    nextRow()
  }

  return doc
}
