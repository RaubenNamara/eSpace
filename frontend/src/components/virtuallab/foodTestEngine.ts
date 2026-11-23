/**
 * Food tests and enzyme activity (O-level Biology): what a test tube looks like after the student
 * has put things into it, and what a student should record - observation, and the deductions to
 * choose from. Pure logic, no 3D: VirtualLabSceneFoodTests draws whatever this returns.
 *
 * The wording follows the way Ugandan O-level practical guides record food tests ("Turbid solution
 * turned to a blue-black solution", "Starch present"), so what students practise here is what they
 * write in the exam.
 */

/** How much of a food substance a sample holds */
export type Level = 0 | 1 | 2 | 3 // none, little, moderate, much
export const LEVEL_WORDS = ['absent', 'little', 'moderate', 'much'] as const

export interface Composition {
  starch: Level
  reducing: Level
  nonReducing: Level
  protein: Level
  vitaminC: Level
  lipid: Level
}
export const NO_FOOD: Composition = { starch: 0, reducing: 0, nonReducing: 0, protein: 0, vitaminC: 0, lipid: 0 }

/** How a liquid looks before any reagent: colourless (sugars, vitamin C) or turbid (starch, protein) */
export type Appearance = 'colourless' | 'turbid' | 'milky'

export type ReagentId = 'iodine' | 'benedicts' | 'hcl' | 'naoh' | 'cuso4' | 'dcpip' | 'ethanol' | 'water' | 'starch' | 'amylase' | 'boiled_amylase'

export interface ReagentDef {
  id: ReagentId
  name: string
  /** Colour in the bottle */
  color: string
  /** How it is normally added: drops or 1 cm³ */
  dose: 'drops' | 'cm3'
  doseLabel: string
}

export const REAGENTS: Record<ReagentId, ReagentDef> = {
  iodine: { id: 'iodine', name: 'Iodine solution', color: '#9a5a14', dose: 'drops', doseLabel: '3 drops' },
  benedicts: { id: 'benedicts', name: "Benedict's solution", color: '#2f6fd6', dose: 'cm3', doseLabel: '1 cm³' },
  hcl: { id: 'hcl', name: 'Dilute hydrochloric acid', color: '#eef6f8', dose: 'cm3', doseLabel: '1 cm³' },
  naoh: { id: 'naoh', name: 'Sodium hydroxide solution', color: '#f1f5f9', dose: 'cm3', doseLabel: '1 cm³' },
  cuso4: { id: 'cuso4', name: 'Copper(II) sulphate solution', color: '#3b82f6', dose: 'drops', doseLabel: '3 drops' },
  dcpip: { id: 'dcpip', name: 'DCPIP solution', color: '#1d3fa8', dose: 'cm3', doseLabel: '1 cm³' },
  ethanol: { id: 'ethanol', name: 'Ethanol', color: '#f8fafc', dose: 'cm3', doseLabel: '1 cm³' },
  water: { id: 'water', name: 'Cold distilled water', color: '#e0f2fe', dose: 'cm3', doseLabel: '10 cm³' },
  starch: { id: 'starch', name: 'Starch suspension', color: '#eef0ea', dose: 'cm3', doseLabel: '2 cm³' },
  amylase: { id: 'amylase', name: 'Amylase (saliva) solution', color: '#f5f5f4', dose: 'cm3', doseLabel: '1 cm³' },
  boiled_amylase: { id: 'boiled_amylase', name: 'Boiled amylase solution', color: '#f5f5f4', dose: 'cm3', doseLabel: '1 cm³' },
}

/** A food sample the practical provides (e.g. "Food mixture Q") */
export interface FoodSample {
  key: string
  label: string
  composition: Composition
  appearance: Appearance
  /** Colour of the sample itself */
  color: string
}

/** Everything that has gone into one test tube, and what has been done to it */
export interface TubeState {
  /** Food (merged from every sample/tube poured in) */
  food: Composition
  hasFood: boolean
  appearance: Appearance
  foodColor: string
  /** Reagents added, with the number of doses */
  reagents: Partial<Record<ReagentId, number>>
  shaken: boolean
  /** Seconds spent in a boiling water bath since Benedict's was added */
  boiledWithBenedict: number
  /** Seconds spent boiling with acid (hydrolysis of non-reducing sugar) before Benedict's */
  boiledWithAcid: number
  /** Seconds boiled with nothing but food in it (destroys vitamin C) */
  boiledFoodOnly: number
  /** Drops of food added to DCPIP */
  dcpipDrops: number
  /** Ethanol extract poured into cold water (emulsion test) */
  pouredIntoWater: boolean
  /** Enzyme work: fraction of starch still undigested, seconds since enzyme was added */
  starchLeft: number
  enzymeSeconds: number
}

export function emptyTube(): TubeState {
  return {
    food: { ...NO_FOOD }, hasFood: false, appearance: 'colourless', foodColor: '#f8fafc', reagents: {}, shaken: false,
    boiledWithBenedict: 0, boiledWithAcid: 0, boiledFoodOnly: 0, dcpipDrops: 0, pouredIntoWater: false, starchLeft: 1, enzymeSeconds: 0,
  }
}

const has = (t: TubeState, r: ReagentId) => (t.reagents[r] ?? 0) > 0
const maxLevel = (a: Level, b: Level) => (a > b ? a : b) as Level

/** Pours a food sample (or the contents of another tube) into a tube */
export function addFood(t: TubeState, food: Composition, appearance: Appearance, color: string) {
  ;(Object.keys(t.food) as (keyof Composition)[]).forEach((k) => { t.food[k] = maxLevel(t.food[k], food[k]) })
  if (!t.hasFood || appearance === 'turbid') t.appearance = appearance
  t.foodColor = color
  t.hasFood = true
}

export function addReagent(t: TubeState, r: ReagentId) {
  t.reagents[r] = (t.reagents[r] ?? 0) + 1
  if (r === 'starch') { t.starchLeft = 1; t.enzymeSeconds = 0 }
  if (r === 'amylase' || r === 'boiled_amylase') t.enzymeSeconds = 0
}

/** The food a tube would pass on if poured/dropped elsewhere (boiling has destroyed its vitamin C) */
export function foodOf(t: TubeState): Composition {
  return { ...t.food, vitaminC: t.boiledFoodOnly >= 8 ? 0 : t.food.vitaminC }
}

// --- Enzyme activity ------------------------------------------------------------------------------
/** Rate (per second) amylase digests starch at a temperature: best near body temperature, very slow
 *  in the cold, destroyed (denatured) from about 60 °C */
export function amylaseRate(tempC: number): number {
  if (tempC >= 60) return 0
  const optimum = 37
  // Narrow below the optimum: in an ice bath the enzyme is almost inactive
  const spread = tempC < optimum ? 8 : 9
  return 0.075 * Math.exp(-((tempC - optimum) ** 2) / (2 * spread * spread))
}

/** Advances a tube by dt seconds at a temperature, and whether it is in a boiling bath */
export function tick(t: TubeState, dt: number, tempC: number) {
  const boiling = tempC >= 95
  if (boiling) {
    if (has(t, 'benedicts')) t.boiledWithBenedict += dt
    else if (has(t, 'hcl')) t.boiledWithAcid += dt
    else if (t.hasFood && Object.keys(t.reagents).length === 0) t.boiledFoodOnly += dt
  }
  if (has(t, 'starch') && (has(t, 'amylase') || has(t, 'boiled_amylase'))) {
    t.enzymeSeconds += dt
    // Boiled enzyme has been denatured; a live one is denatured the moment it is boiled too
    if (has(t, 'amylase') && !has(t, 'boiled_amylase')) t.starchLeft *= Math.exp(-amylaseRate(tempC) * dt)
  }
}

// --- What the tube looks like ---------------------------------------------------------------------
export type TestKind = 'starch' | 'reducing' | 'non_reducing' | 'protein' | 'vitamin_c' | 'lipid' | 'spot_starch' | 'none'

export interface Look {
  /** Liquid colour and how cloudy it is (0 clear - 1 opaque) */
  color: string
  cloudy: number
  /** Coloured solid settled at the bottom (0 - 1 of the liquid) */
  precipitate: { color: string; amount: number } | null
  /** Black specks floating (little starch) */
  specks: boolean
  test: TestKind
  /** Ready to be recorded: the observation in exam wording, and the deductions to choose from */
  observation: string | null
  deductions: string[]
  /** What a careful student should conclude (shown nowhere - for checking and teacher notes) */
  correct: string | null
  /** Why it cannot be recorded yet (e.g. still needs boiling) */
  waiting: string | null
}

const start = (t: TubeState) => (t.appearance === 'turbid' ? 'Turbid solution' : t.appearance === 'milky' ? 'Milky solution' : 'Colourless solution')

export const DEDUCTIONS: Record<Exclude<TestKind, 'none'>, string[]> = {
  starch: ['Much starch present', 'Moderate starch present', 'Little starch present', 'Starch absent'],
  reducing: ['Much reducing sugars present', 'Moderate reducing sugars present', 'Little reducing sugars present', 'Reducing sugars absent'],
  non_reducing: ['Non-reducing sugars present', 'Non-reducing sugars absent'],
  protein: ['Proteins present', 'Proteins absent'],
  vitamin_c: ['Vitamin C present', 'Vitamin C absent'],
  lipid: ['Lipids present', 'Lipids absent'],
  spot_starch: ['Starch present', 'Starch absent'],
}

/** Benedict's colour after boiling: blue, green, yellow precipitate, orange/brick-red precipitate */
function benedictStage(level: Level, seconds: number): number {
  return Math.min(level, Math.floor(seconds / 3))
}
const BENEDICT_LOOK = [
  { color: '#2f6fd6', ppt: null },
  { color: '#3f9b57', ppt: null },
  { color: '#b6b23a', ppt: { color: '#e2c22a', amount: 0.25 } },
  { color: '#c7792a', ppt: { color: '#c2410c', amount: 0.4 } },
] as const
function benedictWords(stage: number): string {
  if (stage === 0) return 'remained blue'
  if (stage === 1) return 'turned to a green solution'
  if (stage === 2) return 'turned to a green solution, then a yellow precipitate'
  return 'turned to a green solution, to a yellow precipitate and finally an orange (brick-red) precipitate'
}

export function lookOf(t: TubeState): Look {
  const base: Look = {
    color: t.hasFood ? t.foodColor : '#e9f2f6', cloudy: t.appearance === 'turbid' ? 0.55 : t.appearance === 'milky' ? 0.85 : 0.05,
    precipitate: null, specks: false, test: 'none', observation: null, deductions: [], correct: null, waiting: null,
  }

  // Vitamin C: food added drop by drop to blue DCPIP
  if (has(t, 'dcpip')) {
    const v = t.food.vitaminC
    const need = v === 3 ? 3 : v === 2 ? 7 : v === 1 ? 12 : Infinity
    const f = Math.min(1, t.dcpipDrops / need)
    const out: Look = { ...base, test: 'vitamin_c', cloudy: 0.05, deductions: DEDUCTIONS.vitamin_c }
    out.color = f >= 1 ? '#f3f4f6' : mix('#1d3fa8', v ? '#e5e7eb' : '#8fb0e8', v ? f : Math.min(1, t.dcpipDrops / 12) * 0.5)
    if (t.dcpipDrops === 0) out.waiting = 'Add the food solution drop by drop and watch the blue colour.'
    else if (f >= 1) { out.observation = `Blue DCPIP solution turned colourless after ${t.dcpipDrops} drops`; out.correct = 'Vitamin C present' }
    else if (t.dcpipDrops >= 12 && !v) { out.observation = 'Blue DCPIP solution remained blue (turned only to pale blue)'; out.correct = 'Vitamin C absent' }
    else out.waiting = 'Keep adding drops one at a time until the blue disappears, or until about 12 drops.'
    return out
  }

  // Lipids: ethanol extract poured into cold water
  if (has(t, 'ethanol') && has(t, 'water')) {
    const out: Look = { ...base, test: 'lipid', deductions: DEDUCTIONS.lipid }
    if (!t.pouredIntoWater) { out.waiting = 'Pour the shaken ethanol extract into cold water.'; return out }
    if (t.food.lipid) { out.color = '#fbfaf6'; out.cloudy = 0.9; out.observation = 'Colourless solution turned into a milky (white) emulsion'; out.correct = 'Lipids present' }
    else { out.color = '#eef6f8'; out.cloudy = 0.05; out.observation = 'Colourless solution remained colourless'; out.correct = 'Lipids absent' }
    return out
  }
  if (has(t, 'ethanol')) {
    return { ...base, test: 'lipid', deductions: DEDUCTIONS.lipid, waiting: t.shaken ? 'Now pour this into a test tube of cold water.' : 'Shake the tube to dissolve any fat in the ethanol.' }
  }

  // Sugars: Benedict's, boiled (after acid hydrolysis for non-reducing sugars)
  if (has(t, 'benedicts')) {
    const acid = has(t, 'hcl')
    const hydrolysed = acid && t.boiledWithAcid >= 6 && has(t, 'naoh')
    // Amylase turns starch into maltose, a reducing sugar: the more starch digested, the more sugar
    const digested = has(t, 'starch') && has(t, 'amylase') ? 1 - t.starchLeft : 0
    const maltose: Level = digested > 0.8 ? 3 : digested > 0.5 ? 2 : digested > 0.2 ? 1 : 0
    const level = maxLevel(maxLevel(t.food.reducing, maltose), hydrolysed ? t.food.nonReducing : 0)
    const stage = benedictStage(level, t.boiledWithBenedict)
    const look = BENEDICT_LOOK[stage]
    const kind: TestKind = acid ? 'non_reducing' : 'reducing'
    const out: Look = { ...base, test: kind, deductions: DEDUCTIONS[kind], color: look.color, cloudy: stage >= 2 ? 0.45 : 0.1, precipitate: look.ppt ? { ...look.ppt } : null }
    if (acid && !has(t, 'naoh')) { out.waiting = 'Neutralise the acid with sodium hydroxide before adding Benedict\'s.'; return out }
    if (t.boiledWithBenedict < 9) { out.waiting = 'Boil the tube in the boiling water bath and watch the colour change.'; return out }
    out.observation = `${start(t)} turned blue and on boiling ${benedictWords(stage)}`
    if (kind === 'reducing') out.correct = DEDUCTIONS.reducing[3 - level]
    else out.correct = hydrolysed && t.food.nonReducing ? 'Non-reducing sugars present' : 'Non-reducing sugars absent'
    return out
  }
  if (has(t, 'hcl')) {
    return { ...base, test: 'non_reducing', deductions: DEDUCTIONS.non_reducing, waiting: t.boiledWithAcid >= 6 ? 'Cool it, then add sodium hydroxide to neutralise the acid.' : 'Boil the food with the acid in the boiling water bath first.' }
  }

  // Protein: sodium hydroxide then copper(II) sulphate (Biuret)
  if (has(t, 'cuso4') || (has(t, 'naoh') && !has(t, 'iodine'))) {
    const out: Look = { ...base, test: 'protein', deductions: DEDUCTIONS.protein }
    if (!has(t, 'naoh')) { out.color = '#8cb6f0'; out.waiting = 'Add sodium hydroxide solution as well.'; return out }
    if (!has(t, 'cuso4')) { out.waiting = 'Now add copper(II) sulphate solution drop by drop.'; return out }
    if (!t.shaken) { out.color = '#7da7ea'; out.waiting = 'Shake the tube.'; return out }
    if (t.food.protein) { out.color = '#7b3fa0'; out.cloudy = 0.15; out.observation = `${start(t)}${t.appearance === 'turbid' ? ' cleared and' : ''} turned to a purple solution`; out.correct = 'Proteins present' }
    else { out.color = '#5b8fe0'; out.cloudy = 0.08; out.observation = `${start(t)} turned to a blue solution`; out.correct = 'Proteins absent' }
    return out
  }

  // Starch: iodine
  if (has(t, 'iodine')) {
    // Enzyme work: what is left of the starch decides the colour
    const s: Level = has(t, 'starch') ? (t.starchLeft > 0.55 ? 3 : t.starchLeft > 0.25 ? 2 : t.starchLeft > 0.08 ? 1 : 0) : t.food.starch
    const out: Look = { ...base, test: has(t, 'starch') ? 'spot_starch' : 'starch', deductions: has(t, 'starch') ? DEDUCTIONS.spot_starch : DEDUCTIONS.starch }
    if (s === 3) { out.color = '#14122b'; out.cloudy = 0.7; out.observation = `${start(t)} turned to a blue-black solution` }
    else if (s === 2) { out.color = '#23367f'; out.cloudy = 0.4; out.observation = `${start(t)} turned to a blue solution` }
    else if (s === 1) { out.color = '#b0742a'; out.specks = true; out.cloudy = 0.15; out.observation = 'Specks of black particles formed in a brown solution' }
    else { out.color = '#b8791e'; out.cloudy = 0.05; out.observation = `${start(t)} turned to a brown (yellow-brown) solution` }
    if (out.test === 'spot_starch') {
      // A drop of the mixture next to iodine on the white tile
      out.observation = ['The iodine remained brown (yellow-brown) on the tile', 'The iodine turned dark brown with black specks on the tile', 'The iodine turned blue on the tile', 'The iodine turned blue-black on the tile'][s]
      out.correct = s > 0 ? 'Starch present' : 'Starch absent'
    } else out.correct = DEDUCTIONS.starch[3 - s]
    return out
  }

  // Enzyme mixture still digesting (no reagent yet)
  if (has(t, 'starch')) base.color = '#eef0ea'
  return base
}

/** Translucent-mark test on filter paper */
export function translucentMark(food: Composition | null, dried: boolean): { observation: string | null; correct: string | null } {
  if (!food || !dried) return { observation: null, correct: null }
  return food.lipid
    ? { observation: 'A permanent translucent mark was formed on the filter paper', correct: 'Lipids present' }
    : { observation: 'The filter paper remained clear (no translucent mark) after drying', correct: 'Lipids absent' }
}

/** Mixes two #rrggbb colours */
export function mix(a: string, b: string, f: number): string {
  const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16)
  const ch = (p: number, s: number) => (p >> s) & 255
  const c = (s: number) => Math.round(ch(pa, s) + (ch(pb, s) - ch(pa, s)) * f)
  return '#' + ((c(16) << 16) | (c(8) << 8) | c(0)).toString(16).padStart(6, '0')
}
