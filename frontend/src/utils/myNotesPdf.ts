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
