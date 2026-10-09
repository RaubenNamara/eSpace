/**
 * Circuit physics for the torch-bulb filament practical (VirtualLabSceneBulbResistance.vue).
 *
 * Unlike circuitEngine.ts (which only checks "is everything in one connected loop"), this solves the
 * actual network the student wired: every component is a two-terminal element, every lead joins two
 * terminals into one node, and the node voltages come from nodal analysis (G·v = i, Gaussian
 * elimination). So a voltmeter wired in series really does starve the circuit of current, an ammeter
 * across the bulb really does short it out, and moving the crocodile clip really does change the
 * readings - nothing is looked up from a table.
 *
 * Terminal ids are `${key}:a` / `${key}:b`. For the cells and both meters, `a` is the negative (black)
 * terminal and `b` the positive (red) one.
 */

export type Side = 'a' | 'b'
export interface Lead { from: string; to: string }

export interface Element {
  key: string
  /** 'source' = EMF in series with an internal resistance; 'resistor' = plain resistance. */
  kind: 'source' | 'resistor'
  /** Ohms. A source uses this as its internal resistance. */
  r: number
  /** Volts, sources only: V(b) - V(a) on open circuit. */
  emf?: number
}

export const term = (key: string, side: Side) => `${key}:${side}`

// --- Nodes ---------------------------------------------------------------------------------------

/** Union-find over terminals: every lead merges the two terminals it joins into one node. */
export function buildNodes(elements: Element[], leads: Lead[]): Map<string, number> {
  const parent = new Map<string, string>()
  const find = (t: string): string => {
    if (!parent.has(t)) parent.set(t, t)
    let root = t
    while (parent.get(root) !== root) root = parent.get(root)!
    parent.set(t, root)
    return root
  }
  elements.forEach((e) => { find(term(e.key, 'a')); find(term(e.key, 'b')) })
  leads.forEach((l) => {
    const ra = find(l.from), rb = find(l.to)
    if (ra !== rb) parent.set(ra, rb)
  })
  const ids = new Map<string, number>()
  const nodeOf = new Map<string, number>()
  parent.forEach((_, t) => {
    const root = find(t)
    if (!ids.has(root)) ids.set(root, ids.size)
    nodeOf.set(t, ids.get(root)!)
  })
  return nodeOf
}

// --- Solving -------------------------------------------------------------------------------------

export interface Solution {
  /** Potential at a terminal (volts, relative to an arbitrary reference). */
  potential: (t: string) => number
  /** Current through an element from its b terminal to its a terminal (A). For a meter, b is +,
   *  so this is exactly what an ammeter reads; for the cells it is the current they deliver. */
  currentBA: (key: string) => number
  /** V(b) - V(a) across an element. For a voltmeter this is its reading. */
  voltageBA: (key: string) => number
}

/** A tiny conductance from every node to the reference keeps floating parts of an unfinished circuit
 *  solvable (they simply sit at 0 V) without visibly affecting a real circuit. */
const LEAK_S = 1e-9

export function solve(elements: Element[], leads: Lead[]): Solution {
  const nodeOf = buildNodes(elements, leads)
  const n = Math.max(...nodeOf.values(), -1) + 1
  const G = Array.from({ length: n }, () => new Array<number>(n).fill(0))
  const I = new Array<number>(n).fill(0)
  for (let i = 0; i < n; i++) G[i][i] += LEAK_S

  elements.forEach((e) => {
    const a = nodeOf.get(term(e.key, 'a'))!
    const b = nodeOf.get(term(e.key, 'b'))!
    const g = 1 / Math.max(1e-6, e.r)
    if (a !== b) {
      G[a][a] += g; G[b][b] += g; G[a][b] -= g; G[b][a] -= g
    }
    // Norton equivalent of an EMF with internal resistance: E/r pushed into b, drawn out of a
    if (e.kind === 'source' && e.emf && a !== b) {
      I[b] += e.emf * g
      I[a] -= e.emf * g
    }
  })

  const v = gaussianSolve(G, I)
  const potential = (t: string) => {
    const id = nodeOf.get(t)
    return id === undefined ? 0 : v[id] ?? 0
  }
  const byKey = new Map(elements.map(e => [e.key, e]))
  const voltageBA = (key: string) => potential(term(key, 'b')) - potential(term(key, 'a'))
  const currentBA = (key: string) => {
    const e = byKey.get(key)
    if (!e) return 0
    const vba = voltageBA(key)
    // Inside a source the EMF drives current from a up to b, so b->a current is (Vba - E)/r
    return e.kind === 'source' ? (vba - (e.emf ?? 0)) / Math.max(1e-6, e.r) : vba / Math.max(1e-6, e.r)
  }
  return { potential, currentBA, voltageBA }
}

function gaussianSolve(A: number[][], bIn: number[]): number[] {
  const n = bIn.length
  const M = A.map((row, i) => [...row, bIn[i]])
  for (let col = 0; col < n; col++) {
    let pivot = col
    for (let r = col + 1; r < n; r++) if (Math.abs(M[r][col]) > Math.abs(M[pivot][col])) pivot = r
    if (Math.abs(M[pivot][col]) < 1e-15) continue
    ;[M[col], M[pivot]] = [M[pivot], M[col]]
    for (let r = 0; r < n; r++) {
      if (r === col) continue
      const f = M[r][col] / M[col][col]
      if (f === 0) continue
      for (let c = col; c <= n; c++) M[r][c] -= f * M[col][c]
    }
  }
  return M.map((row, i) => (Math.abs(row[i]) < 1e-15 ? 0 : row[n] / row[i]))
}

// --- Topology checks -----------------------------------------------------------------------------

/**
 * True when the given elements, and only they, form one simple series loop: no element has both of
 * its terminals on the same node (shorted), every node joins exactly two of their terminals, and they
 * are all one connected ring. Terminals of anything not in `loopKeys` (e.g. the voltmeter) are ignored,
 * so a voltmeter connected in parallel doesn't break the loop - but one wired in series does, because
 * then its neighbours no longer share a node with each other.
 */
export function isSeriesLoop(loopKeys: string[], nodeOf: Map<string, number>): boolean {
  const degree = new Map<number, number>()
  const adj = new Map<number, number[]>()
  for (const key of loopKeys) {
    const a = nodeOf.get(term(key, 'a'))
    const b = nodeOf.get(term(key, 'b'))
    if (a === undefined || b === undefined || a === b) return false
    degree.set(a, (degree.get(a) ?? 0) + 1)
    degree.set(b, (degree.get(b) ?? 0) + 1)
    adj.set(a, [...(adj.get(a) ?? []), b])
    adj.set(b, [...(adj.get(b) ?? []), a])
  }
  if ([...degree.values()].some(d => d !== 2)) return false
  if (degree.size !== loopKeys.length) return false
  const start = degree.keys().next().value as number
  const seen = new Set<number>([start])
  const stack = [start]
  while (stack.length) {
    const cur = stack.pop()!
    for (const nb of adj.get(cur) ?? []) if (!seen.has(nb)) { seen.add(nb); stack.push(nb) }
  }
  return seen.size === degree.size
}

/** True when element `x` sits across exactly the same two nodes as element `y` (i.e. in parallel). */
export function isAcross(x: string, y: string, nodeOf: Map<string, number>): boolean {
  const xa = nodeOf.get(term(x, 'a')), xb = nodeOf.get(term(x, 'b'))
  const ya = nodeOf.get(term(y, 'a')), yb = nodeOf.get(term(y, 'b'))
  if (xa === undefined || xb === undefined || ya === undefined || yb === undefined) return false
  if (xa === xb || ya === yb) return false
  return (xa === ya && xb === yb) || (xa === yb && xb === ya)
}

// --- Apparatus constants -------------------------------------------------------------------------

/** Constantan, SWG 28 (d = 0.376 mm, A = 1.11e-7 m²), resistivity 4.9e-7 Ωm -> about 4.4 Ω per metre. */
export const CONSTANTAN_OHM_PER_M = 4.4
export const CELLS_EMF_V = 3.0
/** Two partly-used dry cells - their internal resistance is why the bulbs looked dim. */
export const CELLS_INTERNAL_OHM = 1.2
export const AMMETER_OHM = 0.05
export const VOLTMETER_OHM = 5000
export const SWITCH_CLOSED_OHM = 0.002
/** Fraction by which the filament's resistance rises at its hottest normal working temperature. */
export const FILAMENT_HOT_RISE = 0.08

// --- What the scene reports back to the page -----------------------------------------------------

/** The five lengths the practical's results table asks for (metres). */
export const BULB_TARGET_LENGTHS = [0.2, 0.3, 0.4, 0.5, 0.6]

/** One completed reading pair: what the student read off the meters, and what the meters really showed. */
export interface BulbTrial {
  x_m: number
  voltage_v: number
  current_a: number
  true_voltage_v: number
  true_current_a: number
  /** Switch K was closed again before the filament had cooled. */
  warm_start: boolean
  /** How long K had been closed when the second reading was recorded (s). */
  on_seconds: number
}

/** Running tally of how the student handled the apparatus - feeds the practical assessment. */
export interface BulbLabRecord {
  distractor_picks: number
  /** K closed while the wiring had a real fault (short circuit, meter in the wrong place or reversed). */
  wiring_faults: number
  ammeter_reversed: number
  voltmeter_reversed: number
  /** Tried to slide the crocodile clip with K closed. */
  length_change_while_on: number
  /** Tried to record a reading with K open. */
  record_while_open: number
  /** K left closed long enough to heat the filament unnecessarily. */
  left_on: number
  /** K closed again before the bulb had cooled. */
  warm_starts: number
  /** Opened K with only one of the two readings recorded. */
  incomplete_pairs: number
}

export const emptyLabRecord = (): BulbLabRecord => ({
  distractor_picks: 0, wiring_faults: 0, ammeter_reversed: 0, voltmeter_reversed: 0, length_change_while_on: 0,
  record_while_open: 0, left_on: 0, warm_starts: 0, incomplete_pairs: 0,
})
