export type LabAction = 'move' | 'rotate' | 'connect' | 'pour' | 'heat' | 'measure' | 'switch_on' | 'switch_off' | 'zoom' | 'inspect' | 'acknowledge' | 'focus_coarse' | 'focus_fine' | 'select_objective'
export type LabCategory = 'physics' | 'chemistry' | 'biology' | 'agriculture'
export type LabDifficulty = 'beginner' | 'intermediate' | 'advanced'
export type RenderMode = '3d' | '2d'

export interface Vec3 {
  x: number
  y: number
  z: number
}

export interface SceneObjectConfig {
  key: string
  object_type: string
  position: Vec3
  rotation?: { y: number }
  props?: Record<string, any>
  /** Starts off the bench in the apparatus tray until the student picks it and places it. */
  in_tray?: boolean
}

export interface LabObjectDef {
  id: number
  object_type: string
  display_name: string
  category: string
  description: string | null
  default_props: Record<string, any>
  supported_actions: LabAction[]
  icon: string | null
  is_active: boolean
}

export interface ExperimentStep {
  id: number
  step_number: number
  instruction: string
  target_object_key: string | null
  required_action: LabAction
  expected_value: string | null
  tolerance: number | null
  hint: string | null
  feedback_correct: string | null
  feedback_incorrect: string | null
  is_safety_check: boolean
}

export type QuestionStage = 'before_experiment' | 'after_step' | 'after_measurement' | 'after_experiment'
export type QuestionRequirement = 'required' | 'optional' | 'notebook_only'

export interface ExperimentQuestion {
  id: number
  question_number: number
  question_text: string
  question_type: 'short_answer' | 'calculation' | 'observation' | 'procedure'
  stage: QuestionStage
  stage_step_number: number | null
  requirement: QuestionRequirement
  linked_to_graph: boolean
  marks: number
}

export interface GraphConfig {
  enabled: boolean
  title: string | null
  x_column: string | null
  y_column: string | null
  x_label: string | null
  y_label: string | null
  graph_type: 'scatter' | 'line'
  allow_axis_change: boolean
  min_points: number
  show_best_fit: boolean
}

export interface ExperimentDetail {
  id: number
  title: string
  subject_id: number | null
  subject_name: string | null
  topic: string | null
  category: LabCategory
  difficulty: LabDifficulty
  render_mode: RenderMode
  render_component: string | null
  template_key: string | null
  template_version: number | null
  engine_version: string | null
  is_deprecated: boolean
  estimated_duration_minutes: number | null
  competency: string | null
  learning_outcomes: string | null
  prerequisite_knowledge: string | null
  practical_skills: string[]
  created_by: number | null
  objective: string | null
  introduction: string | null
  apparatus: string | null
  materials: string | null
  safety_precautions: string | null
  scene_objects: SceneObjectConfig[]
  conclusion_prompt: string | null
  marks: number
  is_template: boolean
  status: 'draft' | 'published' | 'disabled'
  steps: ExperimentStep[]
  questions: ExperimentQuestion[]
  graph: GraphConfig | null
}

export interface ExperimentSummary {
  id: number
  title: string
  subject_id: number | null
  subject_name: string | null
  topic: string | null
  category: LabCategory
  difficulty: LabDifficulty
  render_mode: RenderMode
  render_component: string | null
  template_key: string | null
  template_version: number | null
  is_deprecated: boolean
  estimated_duration_minutes: number | null
  practical_skills: string[]
  created_by: number | null
  creator_name: string | null
  marks: number
  is_template: boolean
  status: 'draft' | 'published' | 'disabled'
  assignment_count: number
  attempt_count: number
  created_at: string
}

export interface StudentAssignment {
  assignment_id: number
  experiment_id: number
  experiment_title: string
  category: LabCategory
  subject_name: string | null
  topic: string | null
  objective: string | null
  difficulty: LabDifficulty
  estimated_duration_minutes: number | null
  due_date: string | null
  marks: number
  attempt_id: number | null
  attempt_status: 'not_started' | 'in_progress' | 'submitted' | 'graded'
  attempt_score: number | null
}

export interface SkillScore {
  skill_key: string
  skill_name: string
  correct_steps: number
  total_steps: number
  score_percent: number | null
  label: string
  improvement_message: string | null
}

export interface SkillEvidenceExperiment {
  experiment_title: string
  correct: number
  total: number
  latest_activity: string | null
}

export interface SkillEvidenceSummary {
  skill_key: string
  skill_name: string
  experiments: SkillEvidenceExperiment[]
  latest_activity: string | null
}

export interface SkillsOverview {
  strongest_skill: SkillScore | null
  weakest_skill: SkillScore | null
  overall_skill_average: number | null
  skills_with_evidence: number
  skills_total: number
  results_summary: LabSummary
}

export interface RecommendedTemplate {
  id: number
  title: string
  category: LabCategory
  difficulty: LabDifficulty
}

export interface NotebookEntry {
  id: number
  entry_type: 'measurement' | 'calculation' | 'result_row'
  label: string
  value: string
  unit: string | null
  extra: Record<string, any> | null
  created_at: string
}

export interface AttemptState {
  attempt_id: number
  assignment_id: number
  status: 'in_progress' | 'submitted' | 'graded'
  current_step: number
  steps_completed: number
  correct_actions: number
  wrong_actions: number
  hints_used: number
  safety_mistakes: number
  conclusion_text: string | null
  score: number | null
  teacher_feedback: string | null
  due_date: string | null
  marks: number
  experiment: ExperimentDetail
  observations: Record<string, string>
  answers: Record<number, string>
  notebook: NotebookEntry[]
}

export interface TeacherAssignment {
  id: number
  experiment_id: number
  experiment_title: string
  category: LabCategory
  class_id: number
  class_name: string
  term_id: number
  due_date: string | null
  marks: number
  status: 'active' | 'closed'
  attempt_count: number
  submitted_count: number
  graded_count: number
}

export interface AttemptSummary {
  id: number
  student_id: number
  student_name: string
  admission_number: string
  status: 'in_progress' | 'submitted' | 'graded'
  started_at: string | null
  submitted_at: string | null
  time_spent_seconds: number
  steps_completed: number
  correct_actions: number
  wrong_actions: number
  score: number | null
}

export interface AttemptDetail {
  id: number
  student_id: number
  student_name: string
  admission_number: string
  experiment_title: string
  category: LabCategory
  status: string
  started_at: string | null
  submitted_at: string | null
  time_spent_seconds: number
  steps_completed: number
  total_steps: number
  correct_actions: number
  wrong_actions: number
  hints_used: number
  safety_mistakes: number
  conclusion_text: string | null
  score: number | null
  max_marks: number
  teacher_feedback: string | null
  observations: { step_id: number | null; text: string }[]
  answers: {
    question_id: number
    question_text: string
    question_type: string
    stage: QuestionStage
    requirement: QuestionRequirement
    linked_to_graph: boolean
    question_marks: number
    answer_text: string | null
    marks_awarded: number | null
    feedback: string | null
  }[]
  notebook: NotebookEntry[]
  graph_snapshot: {
    title: string | null
    x_column: string | null
    y_column: string | null
    x_label: string | null
    y_label: string | null
    graph_type: 'scatter' | 'line' | null
    point_count: number
    gradient: number | null
    intercept: number | null
    r_squared: number | null
  } | null
  action_log: { step_id: number | null; object_key: string | null; action: string; value: string | null; is_correct: boolean; created_at: string }[]
}

export interface LabResult {
  id: number
  experiment_title: string
  subject_name: string | null
  category: LabCategory
  score: number
  max_marks: number
  percentage: number
  teacher_comment: string | null
  completed_at: string
}

export interface LabSummary {
  experiments_completed: number
  average_percentage: number | null
  recent: LabResult[]
}

export const CATEGORY_ICONS: Record<LabCategory, string> = {
  physics: '⚡',
  chemistry: '🧪',
  biology: '🧬',
  agriculture: '🌾',
}

export const CATEGORY_LABELS: Record<LabCategory, string> = {
  physics: 'Physics',
  chemistry: 'Chemistry',
  biology: 'Biology',
  agriculture: 'Agriculture',
}

export const CATEGORY_COLORS: Record<LabCategory, string> = {
  physics: 'from-indigo-500 to-blue-600',
  chemistry: 'from-emerald-500 to-teal-600',
  biology: 'from-purple-500 to-fuchsia-600',
  agriculture: 'from-amber-500 to-orange-600',
}
