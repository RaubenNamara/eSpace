// Single source of truth for turning marks into a percentage and letter grade.
// Mirrors backend/app/Utils/Grading.php — keep both in sync if thresholds change.

interface GradeBand {
  min: number
  grade: string
}

const SCALE: GradeBand[] = [
  { min: 80, grade: 'A' },
  { min: 70, grade: 'B' },
  { min: 60, grade: 'C' },
  { min: 50, grade: 'D' },
  { min: 40, grade: 'E' },
  { min: 0, grade: 'F' }
]

export function percentageToGrade(percentage: number): string {
  for (const band of SCALE) {
    if (percentage >= band.min) {
      return band.grade
    }
  }
  return 'F'
}

export interface GradeSummary {
  marks_awarded: number
  total_marks: number
  percentage: number
  grade: string
}

export function computeGradeSummary(marksAwarded: number, totalMarks: number): GradeSummary {
  const percentage = totalMarks > 0 ? Math.round((marksAwarded / totalMarks) * 10000) / 100 : 0

  return {
    marks_awarded: marksAwarded,
    total_marks: totalMarks,
    percentage,
    grade: percentageToGrade(percentage)
  }
}
