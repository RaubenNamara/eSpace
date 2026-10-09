import type { NotebookEntry } from '@/types/virtualLab'

/**
 * Results-table headings for columns whose key doesn't read well humanized; every other column is
 * humanized from its key ("titre_ml" -> "titre ml") as before. Shared by the student notebook and
 * the teacher's grading view so both show the same table.
 */
export const RESULT_COLUMN_LABELS: Record<string, string> = {
  metal_number: 'Sample',
  reference_cm: 'Reference (cm)',
  air_reading_cm: 'Air reading (cm)',
  water_reading_cm: 'Water reading (cm)',
  e_a_cm: 'eₐ (cm)',
  e_w_cm: 'e_w (cm)',
  loss_cm: 'eₐ − e_w (cm)',
  relative_density: 'Relative density',
  density_kgm3: 'Density (kg/m³)',
  verdict: 'Silver test',
  length_m: 'L (m)',
  oscillations: 'Oscillations',
  time_s: 't (s)',
  time_20_s: 't for 20 osc. (s)',
  period_s: 'T (s)',
  period_squared_s2: 'T² (s²)',
  u_cm: 'u (cm)',
  v_cm: 'v (cm)',
  uv_cm2: 'uv (cm²)',
  u_plus_v_cm: '(u + v) (cm)',
  x_m: 'x (m)',
  length_cm: 'l (cm)',
  current_a: 'I (A)',
  voltage_v: 'V (V)',
}

export const resultColumnLabel = (col: string) => RESULT_COLUMN_LABELS[col] ?? col.replace(/_/g, ' ')

export const resultCell = (col: string, value: unknown) => (value == null ? '-' : col === 'metal_number' ? `M${value}` : value)

/** Tailwind classes for a verdict cell, so a pass/fail conclusion stands out in the table. */
export const resultCellClass = (col: string, value: unknown) => {
  if (col !== 'verdict' || value == null) return ''
  return String(value).startsWith('Consistent') ? 'font-semibold text-emerald-700 dark:text-emerald-400' : 'font-semibold text-red-600 dark:text-red-400'
}

/** The six-sample silver density practical: separate samples, compared against silver's range. */
export const isSilverDensityRows = (rows: NotebookEntry[]) => rows.some(r => r.extra && 'metal_number' in r.extra && 'density_kgm3' in r.extra)
export const SILVER_DENSITY_BAND = { min: 10200, max: 10500, label: 'Pure silver (10200-10500 kg/m³)' }
