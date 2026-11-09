// Access-style query design (the QBE grid) to SQLite SQL: a field per column with its sort, show,
// criteria and "or" rows and, with Totals on, Group By / Sum / Avg / Count / Min / Max.
// Criteria are written the Access way:  >50   "Kampala"   Like "A*"   Between 10 And 20
// Is Null   Not "Boy"   In ("S.1","S.2")   #01/02/2026#   Yes / No

export type Total = 'Group By' | 'Sum' | 'Avg' | 'Count' | 'Min' | 'Max' | 'Where'
export interface QueryColumn { field: string; sort: '' | 'Ascending' | 'Descending'; show: boolean; criteria: string; or: string; total: Total }
export interface QueryDesign { tables: string[]; columns: QueryColumn[]; totals: boolean }

export const q = (name: string) => `"${name.replace(/"/g, '""')}"`
const str = (s: string) => `'${s.replace(/'/g, "''")}'`

/** [Field] / [Table].[Field] / Table.Field  ->  "Table"."Field" */
export function expr(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\.\[([^\]]+)\]/g, (_, t, f) => `${q(t)}.${q(f)}`)
    .replace(/\[([^\]]+)\]/g, (_, f) => q(f))
}

/** A field cell: "Table.Field", "Table.*", "Field", or "Name: expression" */
export function fieldParts(field: string): { sql: string; alias: string | null; star: boolean } {
  const f = field.trim()
  const named = f.match(/^([^:[\]"]+):\s*(.+)$/)
  if (named) return { sql: `(${expr(named[2])})`, alias: named[1].trim(), star: false }
  const dotted = f.match(/^([^.[\]]+)\.(\*|[^.]+)$/)
  if (dotted) return { sql: dotted[2] === '*' ? `${q(dotted[1])}.*` : `${q(dotted[1])}.${q(dotted[2])}`, alias: null, star: dotted[2] === '*' }
  if (f === '*') return { sql: '*', alias: null, star: true }
  return { sql: f.includes('[') ? expr(f) : q(f), alias: null, star: false }
}

export function value(raw: string): string {
  const v = raw.trim()
  let m
  if ((m = v.match(/^"(.*)"$/s)) || (m = v.match(/^'(.*)'$/s))) return str(m[1])
  if ((m = v.match(/^#(\d{1,2})\/(\d{1,2})\/(\d{4})#$/))) return str(`${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`)
  if ((m = v.match(/^#(\d{4}-\d{2}-\d{2})#$/))) return str(m[1])
  if (/^(yes|true)$/i.test(v)) return '1'
  if (/^(no|false)$/i.test(v)) return '0'
  if (/^-?\d+(\.\d+)?$/.test(v)) return v
  if (/\[/.test(v)) return expr(v)
  return str(v)
}
const likeValue = (raw: string) => {
  const v = value(raw)
  return v.startsWith("'") ? v.replace(/\*/g, '%').replace(/\?/g, '_') : v
}

/** One criteria cell for a column expression */
export function criterion(col: string, raw: string): string | null {
  const c = raw.trim()
  if (!c) return null
  let m
  if ((m = c.match(/^between\s+(.+?)\s+and\s+(.+)$/i))) return `${col} BETWEEN ${value(m[1])} AND ${value(m[2])}`
  if (/^is\s+null$/i.test(c)) return `${col} IS NULL`
  if (/^is\s+not\s+null$/i.test(c)) return `${col} IS NOT NULL`
  if ((m = c.match(/^(not\s+)?like\s+(.+)$/i))) return `${col} ${m[1] ? 'NOT ' : ''}LIKE ${likeValue(m[2])}`
  if ((m = c.match(/^(not\s+)?in\s*\((.+)\)$/i))) return `${col} ${m[1] ? 'NOT ' : ''}IN (${m[2].split(',').map(value).join(', ')})`
  if ((m = c.match(/^(<>|<=|>=|=|<|>)\s*(.+)$/))) return `${col} ${m[1]} ${value(m[2])}`
  if ((m = c.match(/^not\s+(.+)$/i))) return `${col} <> ${value(m[1])}`
  if (/[*?]/.test(c) && /^".*"$|^'.*'$/.test(c)) return `${col} LIKE ${likeValue(c)}`
  return `${col} = ${value(c)}`
}

/**
 * The SQL for a design. Joins: tables that share a field name are joined on it (Access draws
 * that line by itself when the names match, e.g. StudentID).
 */
export function designToSql(d: QueryDesign, fieldsOf: (table: string) => string[]): string {
  const cols = d.columns.filter(c => c.field.trim())
  if (!d.tables.length) throw new Error('Add a table to the query')
  const select: string[] = []
  const where: string[] = []
  const orWhere: string[] = []
  const group: string[] = []
  const having: string[] = []
  const order: string[] = []
  for (const c of cols) {
    const p = fieldParts(c.field)
    const total = d.totals ? c.total : null
    let sql = p.sql
    if (total && !['Group By', 'Where'].includes(total)) sql = `${total.toUpperCase()}(${p.sql})`
    const label = p.alias || (total && !['Group By', 'Where'].includes(total) ? `${total}Of${c.field.split('.').pop()}` : null)
    if (c.show && total !== 'Where') select.push(label ? `${sql} AS ${q(label)}` : sql)
    if (!p.star) {
      const crit = criterion(sql, c.criteria)
      if (crit) (total && !['Group By', 'Where'].includes(total) ? having : where).push(crit)
      const or = criterion(sql, c.or)
      if (or) orWhere.push(or)
      if (total === 'Group By') group.push(p.sql)
      if (c.sort) order.push(`${label ? q(label) : sql} ${c.sort === 'Descending' ? 'DESC' : 'ASC'}`)
    }
  }
  let from = q(d.tables[0])
  const joined = [d.tables[0]]
  for (const t of d.tables.slice(1)) {
    const mine = new Set(fieldsOf(t).map(f => f.toLowerCase()))
    let on: string | null = null
    for (const other of joined) {
      const shared = fieldsOf(other).find(f => mine.has(f.toLowerCase()))
      if (shared) { on = `${q(other)}.${q(shared)} = ${q(t)}.${q(fieldsOf(t).find(f => f.toLowerCase() === shared.toLowerCase())!)}`; break }
    }
    from += on ? ` INNER JOIN ${q(t)} ON ${on}` : `, ${q(t)}`
    joined.push(t)
  }
  let sql = `SELECT ${select.length ? select.join(', ') : '*'}\nFROM ${from}`
  const w = where.length ? `(${where.join(' AND ')})` : ''
  if (w || orWhere.length) sql += `\nWHERE ${[w, ...orWhere.map(o => `(${o})`)].filter(Boolean).join(' OR ')}`
  if (group.length) sql += `\nGROUP BY ${group.join(', ')}`
  if (having.length) sql += `\nHAVING ${having.join(' AND ')}`
  if (order.length) sql += `\nORDER BY ${order.join(', ')}`
  return sql + ';'
}

export const blankColumn = (): QueryColumn => ({ field: '', sort: '', show: true, criteria: '', or: '', total: 'Group By' })
