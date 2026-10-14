/**
 * Reads a list of students from one spreadsheet sheet - a class list or sitting plan as schools
 * keep them: a title row or two, a heading row with NAME (or NAMES) and STREAM (and maybe CLASS),
 * room labels like "S.1A" in between, then a row per student. Returns each student's name and
 * stream, with the sheet row it came from (1-based).
 */
export interface RosterRow { row: number; name: string; stream: string }

const clean = (v: unknown) => String(v ?? '').replace(/\s+/g, ' ').trim()

export function parseRoster(rows: unknown[][]): { rows: RosterRow[]; nameColumn: string; streamColumn: string } {
  // The heading row: the first with a cell saying NAME / NAMES / STUDENT NAME
  let head = -1
  let nameCol = -1
  let streamCol = -1
  for (let i = 0; i < Math.min(rows.length, 15) && head < 0; i++) {
    const cells = (rows[i] || []).map(c => clean(c).toUpperCase())
    const n = cells.findIndex(c => /^(STUDENT'?S? )?NAMES?$|^FULL ?NAMES?$|^NAME OF STUDENT$/.test(c))
    if (n >= 0) {
      head = i
      nameCol = n
      streamCol = cells.findIndex(c => /^STREAM|^STRM$|^CLASS ?STREAM$/.test(c))
    }
  }
  if (head < 0) return { rows: [], nameColumn: '', streamColumn: '' }

  const out: RosterRow[] = []
  for (let i = head + 1; i < rows.length; i++) {
    const r = rows[i] || []
    const name = clean(r[nameCol])
    // skip blanks, room / class labels ("S.1A", "S.3E") and repeated headings
    if (!name || !/[A-Za-z]{2}/.test(name) || /^S\.?\s*\d+\s*[A-Z]?$/i.test(name) || /^NAMES?$/i.test(name)) continue
    if (name.split(' ').length < 2 && name.length < 4) continue
    out.push({ row: i + 1, name, stream: streamCol >= 0 ? clean(r[streamCol]) : '' })
  }
  const headRow = rows[head] || []
  return { rows: out, nameColumn: clean(headRow[nameCol]), streamColumn: streamCol >= 0 ? clean(headRow[streamCol]) : '' }
}
