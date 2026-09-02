/**
 * Constructs - the EOC (Elements of Construct) definition layer: a named competency tied to a
 * Department, Subject, Level (O Level / A Level) and Assessment Objective (AO1-AO8), grouping one
 * or more existing curriculum topics (see curriculum.ts) each with their own learning outcomes.
 * Deliberately independent of academic year/term.
 */

import type { CurriculumDepartmentOption, CurriculumSubjectOption } from './curriculum'

export type ConstructLevel = 'O Level' | 'A Level'
export type AssessmentObjective = 'AO1' | 'AO2' | 'AO3' | 'AO4' | 'AO5' | 'AO6' | 'AO7' | 'AO8'

export interface ConstructMeta {
  departments: CurriculumDepartmentOption[]
  subjects: CurriculumSubjectOption[]
  levels: ConstructLevel[]
  assessment_objectives: AssessmentObjective[]
}

export interface ConstructTopicOption {
  /** Representative curriculum_topic_id (lowest id in the group) - stable key for this group. */
  id: number
  /** Every underlying curriculum_topic_id this group represents (one per class-stream, e.g.
   *  S.1-A/S.1-B/S.1-C) - all of them get linked when the construct is saved. */
  topic_ids: number[]
  topic: string
  theme_branch: string
  competence: string
  /** The class level (e.g. "S.1"), not a specific stream - streams are merged into one entry. */
  class_stream_name: string
  academic_year_name: string | null
  term_name: string | null
  learning_outcomes: string[]
}

export interface Construct {
  id: number
  name: string
  department_id: number
  subject_id: number
  level: ConstructLevel
  assessment_objective: AssessmentObjective
  description: string | null
  department_name?: string
  subject_name?: string
  topic_count?: number
  topics?: ConstructTopicOption[]
  created_at: string
  updated_at: string
}

export interface ConstructForm {
  name: string
  department_id: number | ''
  subject_id: number | ''
  level: ConstructLevel | ''
  assessment_objective: AssessmentObjective | ''
  description: string
  topic_ids: number[]
}
