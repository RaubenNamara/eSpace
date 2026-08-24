// User Types
export type UserRole = 'student' | 'teacher' | 'hod' | 'admin' | 'super_admin'

export interface User {
  id: number
  username: string
  email: string
  role: UserRole
  profile_photo?: string
  phone?: string
  is_active: boolean
  email_verified_at?: string
  teacher_id?: number // For HODs who are also teachers
  first_name?: string
  last_name?: string
  admission_number?: string
}

export interface AuthPayload {
  user?: User
  csrf_token?: string
  token?: string
  message?: string
}

export interface AuthApiResponse {
  success: boolean
  message?: string
  data?: AuthPayload
  user?: User
  csrf_token?: string
  token?: string
  errors?: Record<string, string[]>
}

export interface AuthResponse {
  success: boolean
  message: string
  user?: User
  csrf_token?: string
}

export interface LoginCredentials {
  identifier: string
  password: string
  remember?: boolean
}

export interface RegisterData {
  username: string
  email: string
  password: string
  role: UserRole
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  errors?: Record<string, string>
}

export interface PaginatedResponse<T> {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

// Student Types
export interface Student {
  id: number
  user_id: number
  admission_number: string
  first_name: string
  last_name: string
  date_of_birth: string
  gender: 'male' | 'female' | 'other'
  address?: string
  class_id?: number
  stream_id?: number
  admission_date: string
  parent_guardian_name: string
  parent_guardian_phone: string
  parent_guardian_email?: string
}

// Teacher Types
export interface Teacher {
  id: number
  user_id: number
  employee_number: string
  first_name: string
  last_name: string
  date_of_birth: string
  gender: 'male' | 'female' | 'other'
  address?: string
  department_id?: number
  qualification?: string
  specialization?: string
  hire_date: string
  phone?: string
}

// Department Types
export interface Department {
  id: number
  name: string
  code: string
  description?: string
  head_id?: number
  created_at: string
  updated_at?: string
}

// Class Types
export interface Class {
  id: number
  name: string
  level: 'A Level' | 'O Level'
  academic_year_id: number
  stream_name: string
  created_at: string
  updated_at?: string
}

export interface Stream {
  id: number
  class_id: number
  name: string
  created_at: string
  updated_at?: string
  class?: Class
}

// Academic Year Types
export interface AcademicYear {
  id: number
  name: string
  start_date: string
  end_date: string
  is_current: number
  created_at: string
  updated_at?: string
  terms?: Term[]
  term_count?: number
}

// Term Types
export type TermName = 'Term 1' | 'Term 2' | 'Term 3'

export interface Term {
  id: number
  academic_year_id: number
  name: TermName
  start_date: string
  end_date: string
  is_current: number
  created_at: string
  updated_at?: string
  academic_year?: AcademicYear
}

export interface Subject {
  id: number
  name: string
  code: string
  department_id?: number
  description?: string
  created_at: string
  updated_at?: string
}

export interface ClassSubject {
  id: number
  class_id: number
  subject_id: number
  teacher_id: number
  term_id: number
}

// Assignment Types
export type AssignmentType = 'essay' | 'scenario' | 'objective' | 'file_upload' | 'mixed'
export type AssignmentStatus = 'draft' | 'published' | 'archived'
export type QuestionType = 'multiple_choice_single' | 'multiple_choice_multiple' | 'true_false' | 'fill_blank' | 'short_answer' | 'essay' | 'structured' | 'scenario'

export interface Assignment {
  id: number
  teacher_id: number
  subject_id?: number
  class_id?: number
  stream_id?: number
  class_subject_id?: number
  topic_id?: number
  title: string
  description?: string
  type: AssignmentType
  total_marks: number
  due_date: string
  deadline_at?: string
  open_at?: string
  instructions?: string
  attachments?: any[]
  rubric?: any
  category?: string
  duration_minutes?: number
  pass_mark?: number
  allow_late_submission: boolean
  attempts_allowed: number
  shuffle_questions: boolean
  shuffle_options: boolean
  show_marks_immediately: boolean
  show_answers_after_submission: boolean
  allow_save_resume: boolean
  status: AssignmentStatus
  is_published: boolean
  published_at?: string
  created_at: string
  updated_at?: string
  deleted_at?: string
  // Joined fields from API
  subject_name?: string
  class_name?: string
  stream_name?: string
  question_count?: number
  submission_count?: number
  pending_submission_count?: number
}

export type ResponseType = 'text' | 'rich_text' | 'multiple_choice' | 'canvas' | 'pdf_annotation' | 'file_upload'
export type AttachmentType = 'none' | 'image' | 'pdf'

export interface AssignmentQuestion {
  id: number
  assignment_id: number
  parent_question_id?: number
  question_type: QuestionType
  question_text: string
  scenario_text?: string
  marks: number
  display_order: number
  allow_drawing: boolean
  response_type?: ResponseType
  attachment_type?: AttachmentType
  attachment_path?: string
  created_at: string
  updated_at?: string
  deleted_at?: string
  options?: AssignmentQuestionOption[]
  question_annotations?: Record<number, AnnotationLayerJSON>
}

export interface AssignmentQuestionOption {
  id: number
  question_id: number
  option_text: string
  is_correct: boolean
  display_order: number
  created_at: string
  updated_at?: string
}

export interface AssignmentSubmission {
  id: number
  assignment_id: number
  student_id: number
  attempt_number: number
  started_at?: string
  submitted_at?: string
  status: 'in_progress' | 'submitted' | 'marking' | 'graded' | 'returned'
  auto_score?: number
  manual_score?: number
  total_score?: number
  percentage?: number
  marked_by?: number
  marked_at?: string
  released_at?: string
  content?: string
  attachments?: any[]
  is_draft: boolean
  marks_obtained?: number
  feedback?: string
  graded_at?: string
  graded_by?: number
  created_at: string
  updated_at?: string
  deleted_at?: string
  // Joined fields from API
  student_name?: string
  student_email?: string
  assignment_title?: string
  answers?: AssignmentAnswer[]
}

export interface AssignmentAnswer {
  id: number
  submission_id: number
  question_id: number
  answer_text?: string
  drawing_path?: string
  answer_mode?: 'typed' | 'canvas' | 'pdf_upload' | 'image_upload'
  student_attachment_path?: string
  student_attachment_original_name?: string
  auto_mark?: number
  manual_mark?: number
  teacher_feedback?: string
  marked_at?: string
  created_at: string
  updated_at?: string
  // Joined fields from API
  question_text?: string
  question_type?: QuestionType
  question_marks?: number
  scenario_text?: string
}

export interface AssignmentAnnotation {
  id: number
  submission_id: number
  question_id?: number
  teacher_id: number
  type: 'pen' | 'highlighter' | 'text' | 'shape' | 'comment'
  page_number: number
  x: number
  y: number
  width?: number
  height?: number
  color?: string
  stroke_width?: number
  content?: string
  points?: string
  annotation_data?: AnnotationLayerJSON
  created_at: string
  updated_at?: string
}

// Sentinel page_number used for the teacher-marking layer drawn over a rasterized typed answer
// (as opposed to page 0, the student's own blank "Learner annotation layer" canvas, or pages 1..N,
// an uploaded PDF's real pages) - chosen well above any realistic PDF page count so it can never
// collide with a real page. page_number columns are UNSIGNED, so this must stay positive.
export const TYPED_ANSWER_PAGE = 9999

// --- Annotation system (canvas/PDF question authoring, student answers, teacher marking) ---
// Powered by Fabric.js. Object positions are Fabric's native absolute pixel coordinates while an
// editor is live, but persistence always goes through AnnotationCanvas's normalize/denormalize
// layer (divide/multiply by canvas width/height) so annotations stay correctly aligned when the
// workspace is resized or the PDF is re-rendered at a different zoom scale.
export type AnnotationTool =
  | 'select'
  | 'pan'
  | 'pen'
  | 'pencil'
  | 'highlighter'
  | 'eraser'
  | 'text'
  | 'line'
  | 'arrow'
  | 'rectangle'
  | 'circle'
  | 'triangle'
  | 'image'
  | 'equation'
  | 'signature'
  | 'comment'
  | 'tick'
  | 'cross'
  | 'underline'
  | 'score'

// Fabric.js canvas.toObject()/loadFromJSON() shape - loosely typed since Fabric's per-object JSON
// schema is large and version-dependent. Each object also carries the custom metadata below,
// included in serialization via canvas.toObject(ANNOTATION_CUSTOM_PROPS).
export interface AnnotationLayerJSON {
  version?: string
  objects?: Record<string, any>[]
  background?: string
  [key: string]: any
}

// Stable reference for an empty layer, used as a prop default factory return value (`() =>
// EMPTY_ANNOTATION_LAYER`, not `() => ({ objects: [] })`). Vue re-invokes default factories on
// every parent re-render for any prop the parent doesn't explicitly bind, so a fresh object
// literal there produces a new reference each time even though nothing changed - which cascades
// into computeds/watchers downstream (e.g. AnnotationCanvas's readonly-layers watcher) doing
// unnecessary teardown/rebuild work. Returning this same frozen object every time avoids that.
export const EMPTY_ANNOTATION_LAYER: AnnotationLayerJSON = Object.freeze({ objects: [] })
export const EMPTY_ANNOTATION_LAYERS: AnnotationLayerJSON[] = []

export interface AnnotationCustomProps {
  annotationId?: string
  annotationType?: AnnotationTool
  authorId?: number
  authorRole?: 'student' | 'teacher'
  pageNumber?: number
  equationSource?: string
  commentText?: string
  scoreValue?: string
  createdAt?: string
}

export const ANNOTATION_CUSTOM_PROPS: (keyof AnnotationCustomProps)[] = [
  'annotationId',
  'annotationType',
  'authorId',
  'authorRole',
  'pageNumber',
  'equationSource',
  'commentText',
  'scoreValue',
  'createdAt'
]

export type AnnotationLayerMode = 'teacher-question' | 'student-answer' | 'teacher-marking' | 'readonly'

export interface QuestionAnnotation {
  id: number
  question_id: number
  teacher_id: number
  page_number: number
  annotation_data: AnnotationLayerJSON
  created_at: string
  updated_at?: string
}

export interface StudentAnswerAnnotation {
  id: number
  submission_id: number
  question_id: number
  student_id: number
  page_number: number
  annotation_data: AnnotationLayerJSON
  created_at: string
  updated_at?: string
}

export interface QuestionMark {
  id: number
  submission_id: number
  question_id: number
  marks_awarded: number | null
  feedback?: string
  marked_by?: number
  marked_at?: string
  created_at: string
  updated_at?: string
}

export interface AssignmentStats {
  total: number
  draft: number
  published: number
  active: number
  awaiting_marking: number
  total_submissions: number
}

// Library Types
export interface LibraryBook {
  id: number
  title: string
  author?: string
  isbn?: string
  subject_id?: number
  description?: string
  file_path: string
  file_type: string
  file_size?: number
  cover_image?: string
  total_pages?: number
  uploaded_by: number
  is_approved: boolean
  approved_by?: number
  approved_at?: string
  assigned_to?: 'class' | 'stream' | 'department' | 'school'
  assigned_id?: number
}

export interface LibraryProgress {
  id: number
  book_id: number
  student_id: number
  current_page: number
  pages_read: number
  percentage_completed: number
  last_read_at?: string
  time_spent_minutes: number
}

// Note Types
export interface Note {
  id: number
  subject_id: number
  topic_id?: number
  subtopic_id?: number
  title: string
  content: string
  created_by: number
  is_published: boolean
  published_at?: string
  is_approved: boolean
  approved_by?: number
  approved_at?: string
  assigned_to?: 'class' | 'stream' | 'department' | 'school'
  assigned_id?: number
}

// Item Bank Types
export interface ItemBankQuestion {
  id: number
  subject_id: number
  topic_id?: number
  question_text: string
  question_type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay' | 'fill_blank'
  difficulty: 'easy' | 'medium' | 'hard'
  options?: any
  correct_answer: string
  explanation?: string
  marks: number
  created_by: number
  is_approved: boolean
  approved_by?: number
  approved_at?: string
  tags?: string[]
}

// Chat Types
export interface ChatConversation {
  id: number
  type: 'direct' | 'group' | 'class' | 'announcement'
  name?: string
  created_by: number
}

export interface ChatMessage {
  id: number
  conversation_id: number
  sender_id: number
  message: string
  attachment?: string
  is_read: boolean
  read_at?: string
  created_at: string
}

// Notification Types
export interface Notification {
  id: number
  user_id: number
  type: string
  title: string
  message: string
  data?: any
  is_read: boolean
  read_at?: string
  created_at: string
}

// Live Class Types
export interface LiveClass {
  id: number
  class_subject_id: number
  title: string
  description?: string
  scheduled_start: string
  scheduled_end: string
  actual_start?: string
  actual_end?: string
  meeting_id?: string
  meeting_url?: string
  is_recorded: boolean
  recording_url?: string
  status: 'scheduled' | 'started' | 'ended' | 'cancelled'
  created_by: number
}

// Dashboard Analytics Types
export interface DashboardAnalytics {
  subjects_enrolled: number
  assignments_completed: number
  pending_assignments: number
  average_score: number
  books_read: number
  topics_completed: number
  learning_time: number
  unread_messages: number
  assignment_deadlines: Assignment[]
  announcements: Notification[]
  recent_uploads: LibraryBook[]
}
