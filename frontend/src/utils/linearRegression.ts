export interface RegressionResult {
  slope: number
  intercept: number
  r2: number
}

/**
 * Least-squares linear regression over real recorded points only - used for the live best-fit
 * preview while a student is still recording readings. The frozen per-attempt value shown after
 * submission comes from the server-side mirror of this same math (backend/app/Utils/GraphMath.php),
 * computed once at submit time so it can never drift from what the student actually saw.
 */
export function linearRegression(points: { x: number; y: number }[]): RegressionResult | null {
  const n = points.length
  if (n < 2) return null

  let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0
  for (const p of points) {
    sumX += p.x
    sumY += p.y
    sumXY += p.x * p.y
    sumXX += p.x * p.x
  }

  const denominator = (n * sumXX) - (sumX * sumX)
  if (Math.abs(denominator) < 1e-12) return null // all points share the same x

  const slope = ((n * sumXY) - (sumX * sumY)) / denominator
  const intercept = (sumY - (slope * sumX)) / n

  const meanY = sumY / n
  let ssTotal = 0, ssResidual = 0
  for (const p of points) {
    const predicted = (slope * p.x) + intercept
    ssTotal += (p.y - meanY) ** 2
    ssResidual += (p.y - predicted) ** 2
  }
  const r2 = ssTotal > 0 ? 1 - (ssResidual / ssTotal) : 1

  return {
    slope: Math.round(slope * 10000) / 10000,
    intercept: Math.round(intercept * 10000) / 10000,
    r2: Math.round(Math.max(0, Math.min(1, r2)) * 10000) / 10000,
  }
}
