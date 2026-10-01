/**
 * The microscope focus model used by the guided microscope experiment - same formula and
 * objective-scaled tolerance as the free-layout engine's inline `microscopeFocusQuality()`.
 */

export type FocusQuality = 'very_blurred' | 'blurred' | 'almost_focused' | 'focused'

/**
 * Higher magnification has a shallower depth of field - a focus that reads "focused" at x40
 * genuinely needs to be re-checked at x400, exactly like a real microscope. `totalMagnification`
 * is the eyepiece x objective figure (40/100/400), matching the object model's own scale.
 */
export function focusQuality(focusPosition: number, optimalFocus: number, baseTolerance: number, totalMagnification: number): FocusQuality {
  const tolerance = baseTolerance * (40 / Math.max(1, totalMagnification))
  const diff = Math.abs(focusPosition - optimalFocus)
  if (diff <= tolerance) return 'focused'
  if (diff <= tolerance * 2) return 'almost_focused'
  if (diff <= tolerance * 4) return 'blurred'
  return 'very_blurred'
}

/** A continuous blur amount (px) from the same underlying error, for a smooth gradient rather
 *  than jumping between four fixed states - the brief's "continuous focus model". */
export function focusBlurPx(focusPosition: number, optimalFocus: number, baseTolerance: number, totalMagnification: number): number {
  const tolerance = baseTolerance * (40 / Math.max(1, totalMagnification))
  const diff = Math.abs(focusPosition - optimalFocus)
  const ratio = diff / Math.max(0.001, tolerance)
  return Math.max(0, Math.min(16, ratio * 3.2))
}
