// A Univer workbook (what the spreadsheet saves) to and from a real .xlsx (ExcelJS): values,
// formulas, fonts, fills, borders, alignment, number formats, merged cells, column widths and
// row heights - what an ICT spreadsheet practical uses.
import type ExcelJSNs from 'exceljs'

type Any = Record<string, any>
const loadExcel = async () => ((await import('exceljs')) as any).default as typeof ExcelJSNs

const BORDER_TO_X: Record<number, string> = { 1: 'thin', 2: 'hair', 3: 'dotted', 4: 'dashed', 5: 'dashDot', 6: 'dashDotDot', 7: 'double', 8: 'medium', 9: 'mediumDashed', 10: 'mediumDashDot', 11: 'mediumDashDotDot', 12: 'slantDashDot', 13: 'thick' }
const BORDER_FROM_X: Record<string, number> = Object.fromEntries(Object.entries(BORDER_TO_X).map(([k, v]) => [v, Number(k)]))
const H_TO_X: Record<number, string> = { 1: 'left', 2: 'center', 3: 'right', 4: 'justify' }
const V_TO_X: Record<number, string> = { 1: 'top', 2: 'middle', 3: 'bottom' }
const H_FROM_X: Record<string, number> = { left: 1, center: 2, right: 3, justify: 4 }
const V_FROM_X: Record<string, number> = { top: 1, middle: 2, bottom: 3 }

const argb = (rgb?: string | null) => (rgb ? 'FF' + rgb.replace('#', '').toUpperCase().padStart(6, '0').slice(-6) : undefined)
const rgbOf = (c?: { argb?: string } | null) => (c?.argb ? '#' + c.argb.slice(-6) : null)

/** A sheet's floating pictures, from the snapshot's drawing resource */
const drawingsOf = (snapshot: Any, sheetId: string): Any[] => {
  const res = (snapshot.resources || []).find((r: Any) => r.name === 'SHEET_DRAWING_PLUGIN')
  if (!res?.data) return []
  try {
    const all = typeof res.data === 'string' ? JSON.parse(res.data) : res.data
    return Object.values(all?.[sheetId]?.data || {}) as Any[]
  } catch {
    return []
  }
}

const COL_PX = 88
const ROW_PX = 24

/** Univer snapshot -> .xlsx */
export async function workbookToXlsx(snapshot: Any): Promise<Blob> {
  const ExcelJS = await loadExcel()
  const wb = new ExcelJS.Workbook()
  wb.creator = 'Tusome'
  const styles: Any = snapshot.styles || {}
  const styleOf = (s: unknown): Any => (typeof s === 'string' ? styles[s] || {} : (s as Any) || {})

  for (const sheetId of snapshot.sheetOrder || Object.keys(snapshot.sheets || {})) {
    const sh: Any = snapshot.sheets[sheetId]
    if (!sh) continue
    const ws = wb.addWorksheet(String(sh.name || 'Sheet').slice(0, 31))
    const cols: Any = sh.columnData || {}
    for (const c of Object.keys(cols)) if (cols[c]?.w) ws.getColumn(Number(c) + 1).width = cols[c].w / 7
    const rowsData: Any = sh.rowData || {}
    for (const r of Object.keys(rowsData)) if (rowsData[r]?.h) ws.getRow(Number(r) + 1).height = rowsData[r].h * 0.75

    const cells: Any = sh.cellData || {}
    for (const r of Object.keys(cells)) {
      for (const c of Object.keys(cells[r] || {})) {
        const cd: Any = cells[r][c]
        if (!cd) continue
        const cell = ws.getCell(Number(r) + 1, Number(c) + 1)
        const text = cd.p?.body?.dataStream ? String(cd.p.body.dataStream).replace(/\r\n$|\r$/, '').replace(/\r/g, '\n') : null
        if (cd.f) cell.value = { formula: String(cd.f).replace(/^=/, ''), result: cd.v ?? undefined } as any
        else if (cd.v !== undefined && cd.v !== null && cd.v !== '') cell.value = cd.t === 3 ? Boolean(cd.v) : cd.v
        else if (text) cell.value = text

        const st = styleOf(cd.s)
        if (!Object.keys(st).length) continue
        const font: Any = {}
        if (st.bl) font.bold = true
        if (st.it) font.italic = true
        if (st.ul?.s) font.underline = true
        if (st.st?.s) font.strike = true
        if (st.fs) font.size = st.fs
        if (st.ff) font.name = st.ff
        if (st.cl?.rgb) font.color = { argb: argb(st.cl.rgb) }
        if (Object.keys(font).length) cell.font = font
        if (st.bg?.rgb) cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: argb(st.bg.rgb) } } as any
        const al: Any = {}
        if (st.ht && H_TO_X[st.ht]) al.horizontal = H_TO_X[st.ht]
        if (st.vt && V_TO_X[st.vt]) al.vertical = V_TO_X[st.vt]
        if (st.tb === 3) al.wrapText = true
        if (st.tr?.a) al.textRotation = st.tr.a
        if (Object.keys(al).length) cell.alignment = al
        if (st.n?.pattern) cell.numFmt = st.n.pattern
        if (st.bd) {
          const b: Any = {}
          for (const [k, side] of [['t', 'top'], ['r', 'right'], ['b', 'bottom'], ['l', 'left']] as const) {
            const e = st.bd[k]
            if (e) b[side] = { style: BORDER_TO_X[e.s] || 'thin', color: e.cl?.rgb ? { argb: argb(e.cl.rgb) } : undefined }
          }
          if (Object.keys(b).length) cell.border = b
        }
      }
    }
    for (const m of sh.mergeData || []) {
      try { ws.mergeCells(m.startRow + 1, m.startColumn + 1, m.endRow + 1, m.endColumn + 1) } catch { /* overlapping */ }
    }
    if (sh.freeze && (sh.freeze.ySplit || sh.freeze.xSplit)) ws.views = [{ state: 'frozen', xSplit: sh.freeze.xSplit || 0, ySplit: sh.freeze.ySplit || 0 }]

    // pictures and charts floating over the cells (Univer's drawing plugin)
    for (const img of drawingsOf(snapshot, sheetId)) {
      const m = String(img.source || '').match(/^data:image\/(png|jpe?g|gif);base64,(.+)$/)
      if (!m) continue
      const from = img.sheetTransform?.from || { row: 0, column: 0 }
      const id = wb.addImage({ base64: m[2], extension: (m[1] === 'jpg' ? 'jpeg' : m[1]) as 'png' | 'jpeg' | 'gif' })
      ws.addImage(id, { tl: { col: from.column, row: from.row } as any, ext: { width: img.transform?.width || 320, height: img.transform?.height || 200 } })
    }
  }
  if (!wb.worksheets.length) wb.addWorksheet('Sheet1')
  const buf = await wb.xlsx.writeBuffer()
  return new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
}

const excelSerial = (d: Date) => (d.getTime() - Date.UTC(1899, 11, 30)) / 86400000

/** .xlsx -> Univer snapshot */
export async function xlsxToWorkbook(data: ArrayBuffer, name = 'Workbook'): Promise<Any> {
  const ExcelJS = await loadExcel()
  const wb = new ExcelJS.Workbook()
  await wb.xlsx.load(data)
  const snapshot: Any = { id: `wb-${Date.now()}`, name, appVersion: '', locale: 'enUS', styles: {}, sheetOrder: [], sheets: {} }
  wb.eachSheet((ws, index) => {
    const id = `sheet-${index}`
    const cellData: Any = {}
    const mergeData: Any[] = []
    const columnData: Any = {}
    const rowData: Any = {}
    let maxR = 0, maxC = 0
    ws.columns?.forEach((col: Any, i: number) => { if (col?.width) columnData[i] = { w: Math.round(col.width * 7) } })
    ws.eachRow({ includeEmpty: false }, (row, r) => {
      if (row.height) rowData[r - 1] = { h: Math.round(row.height / 0.75) }
      row.eachCell({ includeEmpty: false }, (cell, c) => {
        maxR = Math.max(maxR, r); maxC = Math.max(maxC, c)
        const cd: Any = {}
        const v: any = cell.value
        if (cell.isMerged && cell.master !== cell) return
        if (v && typeof v === 'object' && 'formula' in v) {
          cd.f = '=' + v.formula
          if (v.result !== undefined && typeof v.result !== 'object') cd.v = v.result
        } else if (v && typeof v === 'object' && 'sharedFormula' in v) {
          cd.f = '=' + (cell as any).formula
          if (v.result !== undefined && typeof v.result !== 'object') cd.v = v.result
        } else if (v instanceof Date) {
          cd.v = excelSerial(v); cd.t = 2
        } else if (v && typeof v === 'object' && 'richText' in v) {
          cd.v = v.richText.map((t: Any) => t.text).join(''); cd.t = 1
        } else if (v && typeof v === 'object' && 'text' in v) {
          cd.v = v.text; cd.t = 1
        } else if (typeof v === 'number') {
          cd.v = v; cd.t = 2
        } else if (typeof v === 'boolean') {
          cd.v = v ? 1 : 0; cd.t = 3
        } else if (v !== null && v !== undefined) {
          cd.v = String(v); cd.t = 1
        }
        const st: Any = {}
        const f: Any = cell.font || {}
        if (f.bold) st.bl = 1
        if (f.italic) st.it = 1
        if (f.underline) st.ul = { s: 1 }
        if (f.strike) st.st = { s: 1 }
        if (f.size) st.fs = f.size
        if (f.name) st.ff = f.name
        if (rgbOf(f.color)) st.cl = { rgb: rgbOf(f.color) }
        const fill: Any = cell.fill
        if (fill?.type === 'pattern' && fill.pattern !== 'none' && rgbOf(fill.fgColor)) st.bg = { rgb: rgbOf(fill.fgColor) }
        const al: Any = cell.alignment || {}
        if (H_FROM_X[al.horizontal]) st.ht = H_FROM_X[al.horizontal]
        if (V_FROM_X[al.vertical]) st.vt = V_FROM_X[al.vertical]
        if (al.wrapText) st.tb = 3
        if (cell.numFmt && cell.numFmt !== 'General') st.n = { pattern: cell.numFmt }
        else if (v instanceof Date) st.n = { pattern: 'dd/mm/yyyy' }
        const bd: Any = {}
        const b: Any = cell.border || {}
        for (const [side, k] of [['top', 't'], ['right', 'r'], ['bottom', 'b'], ['left', 'l']] as const) {
          if (b[side]?.style) bd[k] = { s: BORDER_FROM_X[b[side].style] || 1, cl: { rgb: rgbOf(b[side].color) || '#000000' } }
        }
        if (Object.keys(bd).length) st.bd = bd
        if (Object.keys(st).length) cd.s = st
        if (Object.keys(cd).length) {
          cellData[r - 1] ||= {}
          cellData[r - 1][c - 1] = cd
        }
      })
    })
    const merges: string[] = (ws as any).model?.merges || []
    for (const ref of merges) {
      const [a, z] = ref.split(':')
      const ca = ws.getCell(a), cz = ws.getCell(z)
      mergeData.push({ startRow: Number(ca.row) - 1, startColumn: Number(ca.col) - 1, endRow: Number(cz.row) - 1, endColumn: Number(cz.col) - 1 })
    }
    snapshot.sheetOrder.push(id)
    snapshot.sheets[id] = {
      id, name: ws.name, rowCount: Math.max(1000, maxR + 50), columnCount: Math.max(26, maxC + 5),
      defaultColumnWidth: COL_PX, defaultRowHeight: ROW_PX, cellData, mergeData, columnData, rowData
    }
  })
  return snapshot
}

/** A new, empty workbook */
export const blankWorkbook = (name = 'Workbook'): Any => ({
  id: `wb-${Date.now()}`, name, appVersion: '', locale: 'enUS', styles: {}, sheetOrder: ['sheet-1'],
  sheets: { 'sheet-1': { id: 'sheet-1', name: 'Sheet1', rowCount: 1000, columnCount: 26, defaultColumnWidth: COL_PX, defaultRowHeight: ROW_PX, cellData: {} } }
})
