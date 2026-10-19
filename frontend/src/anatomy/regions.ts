/** Body regions for grouping structure lists, from a structure's position in the model
 *  (y up from the feet, |x| = distance from the midline). Approximate, for browsing only. */
export const REGION_ORDER = ['Head', 'Neck', 'Arms & hands', 'Chest', 'Abdomen', 'Pelvis', 'Legs & feet'] as const
export type Region = typeof REGION_ORDER[number]

export function regionOf(centre: [number, number, number] | number[], height: number): Region {
  const h = centre[1] / height
  const ax = Math.abs(centre[0])
  // the arms hang beside the trunk, away from the midline
  if (ax > 0.17 && h > 0.4 && h < 0.84) return 'Arms & hands'
  if (h > 0.87) return 'Head'
  if (h > 0.81) return 'Neck'
  if (h > 0.645) return 'Chest'
  if (h > 0.55) return 'Abdomen'
  if (h > 0.47) return 'Pelvis'
  return 'Legs & feet'
}
