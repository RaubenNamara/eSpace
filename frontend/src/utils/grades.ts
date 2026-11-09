/**
 * The one set of grade colours used everywhere a grade is shown - marksheets, results, report
 * cards, the Learning Map and dashboards - so an A looks the same on every page. Gold marks the
 * top grades (a seal on results); red only the lowest.
 */
export const GRADE_HEX: Record<string, string> = {
  A: '#059669', // emerald - excellent
  B: '#1b3fa0', // brand blue - very good
  C: '#d97706', // amber - satisfactory
  D: '#ea580c', // orange - basic
  E: '#dc2626', // red - elementary
  F: '#b91c1c'
}

export const GRADE_BG: Record<string, string> = {
  A: 'bg-emerald-600',
  B: 'bg-indigo-600',
  C: 'bg-amber-600',
  D: 'bg-orange-600',
  E: 'bg-red-600',
  F: 'bg-red-700'
}

/** Tailwind background class for a grade badge (grey when there is no grade) */
export const gradeBg = (grade?: string | null) => (grade ? GRADE_BG[grade] || 'bg-gray-400' : 'bg-gray-300')

/** Hex colour for a grade, for SVG and canvas drawing */
export const gradeHex = (grade?: string | null) => (grade ? GRADE_HEX[grade] || '#6b7280' : '#9ca3af')

/** The top grades earn the gold seal */
export const isHonours = (grade?: string | null) => grade === 'A' || grade === 'B'
