export type BadgeType = 'platinum' | 'gold' | 'silver' | 'bronze' | 'special'
export type AwardSource = 'automatic' | 'manual' | 'override'
export type AwardStatus = 'active' | 'revoked'

export interface StudentAward {
  id: number
  student_id: number
  rule_id: number | null
  badge_type: BadgeType
  award_title: string
  category: string | null
  subject_id: number | null
  subject_name: string | null
  class_id: number | null
  score: number | null
  average: number | null
  term_id: number
  term_name: string | null
  academic_year: string | null
  award_source: AwardSource
  status: AwardStatus
  admin_override: boolean
  admin_note: string | null
  awarded_at: string
  updated_at: string
  // Present only in admin listings
  student_name?: string
  admission_number?: string
  class_name?: string | null
}

export interface AwardAuditEntry {
  id: number
  action: string
  actor_id: number | null
  actor_role: string | null
  before: Record<string, any> | null
  after: Record<string, any> | null
  note: string | null
  created_at: string
}

export interface AwardDetail extends StudentAward {
  rule_description: string | null
  rule_metric: string | null
  audit: AwardAuditEntry[]
}

export interface AwardSummary {
  platinum: number
  gold: number
  silver: number
  bronze: number
  special: number
}

export interface RewardRule {
  id: number
  badge_type: BadgeType
  award_title: string
  category: 'academic' | 'subject' | 'improvement' | 'attendance' | 'engagement'
  metric: 'overall_average' | 'subject_average' | 'login_count' | 'assignments_completed' | 'improvement_delta' | 'lab_average' | 'lab_subject_average' | 'lab_experiments_completed'
  scope: 'individual' | 'class_top' | 'subject_top'
  subject_id: number | null
  min_value: number | null
  max_value: number | null
  icon: string | null
  is_active: boolean | number
  description: string | null
}

export const BADGE_ICONS: Record<BadgeType, string> = {
  platinum: '💎',
  gold: '🥇',
  silver: '🥈',
  bronze: '🥉',
  special: '⭐',
}

export const BADGE_LABELS: Record<BadgeType, string> = {
  platinum: 'Platinum',
  gold: 'Gold',
  silver: 'Silver',
  bronze: 'Bronze',
  special: 'Special',
}

export const BADGE_COLORS: Record<BadgeType, string> = {
  platinum: 'from-cyan-400 to-blue-500',
  gold: 'from-amber-400 to-yellow-500',
  silver: 'from-gray-300 to-gray-400',
  bronze: 'from-orange-400 to-orange-600',
  special: 'from-purple-400 to-indigo-500',
}
