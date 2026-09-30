import axios from 'axios'

// A suggested Activity of Integration (Teacher\AoiScenarioController / GeminiAoiScenarioService)
export interface AoiSuggestion {
  title: string
  scenario: string
  // What the learner is given to work with (materials, data...) - may be empty
  support: string
  tasks: { text: string; marks: number }[]
  // For the teacher only: what a good response contains
  expected_answer: string
  marking_guide: { criterion: string; look_for: string }[]
}

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const paragraphs = (text: string) => text
  .split(/\n{2,}|\r\n\r\n/)
  .map(p => p.trim())
  .filter(Boolean)
  .map(p => `<p>${escapeHtml(p).replace(/\n/g, '<br>')}</p>`)
  .join('')

/** The scenario as the learner sees it: the scenario, then what they're given */
export function scenarioHtml(s: AoiSuggestion): string {
  const support = s.support.trim()
  return paragraphs(s.scenario) + (support ? `<p><strong>Support:</strong> ${escapeHtml(support).replace(/\n/g, '<br>')}</p>` : '')
}

/** The assessment's marking guide (assignments.rubric) - shown to the teacher when marking */
export function markingGuideJson(s: AoiSuggestion): string {
  return JSON.stringify({ kind: 'aoi_marking_guide', title: s.title, criteria: s.marking_guide, expected_answer: s.expected_answer || null })
}

export const totalMarks = (s: AoiSuggestion) => s.tasks.reduce((n, t) => n + Number(t.marks), 0)

/** Adds the suggestion as the assessment's scenario question, its tasks as sub-questions */
export async function addScenarioQuestion(assignmentId: number, s: AoiSuggestion, curriculumTopicId: number | null): Promise<void> {
  await axios.post(`/api/teacher/assignments/${assignmentId}/questions`, {
    question_type: 'scenario',
    question_text: null,
    scenario_text: scenarioHtml(s),
    marks: totalMarks(s),
    display_order: 0,
    allow_drawing: false,
    response_type: 'text',
    curriculum_topic_id: curriculumTopicId,
    sub_questions: s.tasks.map((t, i) => ({ question_text: t.text, marks: t.marks, display_order: i }))
  })
}

/**
 * A complete draft AOI from a suggestion - the assessment, its link to the topic(s), the scenario
 * question with its tasks, and the marking guide - for the teacher to review in the builder.
 * Returns the new assessment's id.
 */
export async function createAoiDraft(opts: {
  suggestion: AoiSuggestion
  title: string
  subjectId: number
  classTarget: { scope: 'stream' | 'all_streams'; class_id: number | null; class_group_name: string | null }
  academicYear: string
  termId: number | null
  dueDate: string
  topicIds: number[]
  enoteTopicId?: number | null
  weight?: string | number | null
  openAt?: string | null
}): Promise<number> {
  const s = opts.suggestion
  const response = await axios.post('/api/teacher/assignments', {
    title: opts.title,
    total_marks: totalMarks(s),
    due_date: opts.dueDate,
    open_at: opts.openAt || null,
    subject_id: opts.subjectId,
    scope: opts.classTarget.scope,
    class_id: opts.classTarget.class_id,
    class_group_name: opts.classTarget.class_group_name,
    enote_topic_id: opts.enoteTopicId || '',
    assessment_category: 'AOI',
    academic_year: opts.academicYear,
    term_id: opts.termId,
    weight: opts.weight || null,
    rubric: markingGuideJson(s)
  })
  const id = Number(response.data.data.id)
  if (opts.topicIds.length) {
    await axios.put(`/api/teacher/assignments/${id}/curriculum`, { topic_ids: opts.topicIds })
  }
  await addScenarioQuestion(id, s, opts.topicIds[0] ?? null)
  return id
}
