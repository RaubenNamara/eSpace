/**
 * Chemicals kept in the bench cupboard of the Apparatus Playground. Each one comes out as a
 * labelled reagent bottle (liquids, which can be poured) or a wide-mouth jar (solids).
 */
export type ChemicalHazard = 'corrosive' | 'irritant' | 'flammable' | 'toxic' | 'oxidising'

export interface LabChemical {
  id: string
  name: string
  formula?: string
  /** Colour of the liquid or powder, as seen through the glass */
  color: string
  state: 'liquid' | 'solid'
  hazard?: ChemicalHazard
}

/** Four cupboard shelves of five: left bay (bottom, top), then right bay (bottom, top). */
export const CUPBOARD_SHELVES: LabChemical[][] = [
  [
    { id: 'hcl', name: 'Dilute Hydrochloric Acid', formula: 'HCl', color: '#eef6f8', state: 'liquid', hazard: 'corrosive' },
    { id: 'h2so4', name: 'Dilute Sulphuric Acid', formula: 'H₂SO₄', color: '#eef6f8', state: 'liquid', hazard: 'corrosive' },
    { id: 'hno3', name: 'Dilute Nitric Acid', formula: 'HNO₃', color: '#f6f3e4', state: 'liquid', hazard: 'corrosive' },
    { id: 'ch3cooh', name: 'Ethanoic Acid', formula: 'CH₃COOH', color: '#eef6f8', state: 'liquid', hazard: 'irritant' },
    { id: 'water', name: 'Distilled Water', formula: 'H₂O', color: '#dff1fb', state: 'liquid' },
  ],
  [
    { id: 'naoh', name: 'Sodium Hydroxide Solution', formula: 'NaOH', color: '#eef6f8', state: 'liquid', hazard: 'corrosive' },
    { id: 'nh3', name: 'Ammonia Solution', formula: 'NH₃(aq)', color: '#eef6f8', state: 'liquid', hazard: 'irritant' },
    { id: 'limewater', name: 'Limewater', formula: 'Ca(OH)₂', color: '#f3f6f7', state: 'liquid', hazard: 'irritant' },
    { id: 'cuso4', name: 'Copper(II) Sulphate Solution', formula: 'CuSO₄', color: '#2b8be0', state: 'liquid', hazard: 'irritant' },
    { id: 'feso4', name: 'Iron(II) Sulphate Solution', formula: 'FeSO₄', color: '#a9d8a0', state: 'liquid', hazard: 'irritant' },
  ],
  [
    { id: 'benedicts', name: "Benedict's Solution", color: '#3f7fe0', state: 'liquid', hazard: 'irritant' },
    { id: 'nacl', name: 'Sodium Chloride', formula: 'NaCl', color: '#fbfbfb', state: 'solid' },
    { id: 'cuo', name: 'Copper(II) Oxide', formula: 'CuO', color: '#1d1d1f', state: 'solid', hazard: 'irritant' },
    { id: 'caco3', name: 'Calcium Carbonate', formula: 'CaCO₃', color: '#ecebe4', state: 'solid' },
    { id: 'zn', name: 'Zinc Granules', formula: 'Zn', color: '#9ca3af', state: 'solid' },
  ],
  [
    { id: 'phenolphthalein', name: 'Phenolphthalein Indicator', color: '#f4f6f7', state: 'liquid', hazard: 'flammable' },
    { id: 'methyl_orange', name: 'Methyl Orange Indicator', color: '#f28c28', state: 'liquid', hazard: 'toxic' },
    { id: 'universal', name: 'Universal Indicator', color: '#3fae4a', state: 'liquid', hazard: 'flammable' },
    { id: 'kmno4', name: 'Potassium Manganate(VII)', formula: 'KMnO₄', color: '#7a1f8f', state: 'liquid', hazard: 'oxidising' },
    { id: 'iodine', name: 'Iodine Solution', formula: 'I₂/KI', color: '#9a5a14', state: 'liquid', hazard: 'irritant' },
  ],
]

export const LAB_CHEMICALS: LabChemical[] = CUPBOARD_SHELVES.flat()
export const chemicalById = (id: string) => LAB_CHEMICALS.find(c => c.id === id)

/** Scene-object props for a chemical's container (read by labObjectFactory and the scene). */
export function chemicalProps(c: LabChemical): Record<string, any> {
  return {
    chemical_id: c.id,
    display_name: c.name,
    formula: c.formula || '',
    color: c.color,
    hazard: c.hazard || '',
    capacity_ml: c.state === 'liquid' ? 250 : 100,
  }
}

export const chemicalObjectType = (c: LabChemical) => (c.state === 'liquid' ? 'reagent_bottle' : 'reagent_jar')
