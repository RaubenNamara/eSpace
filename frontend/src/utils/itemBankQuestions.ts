import axios from 'axios'

// Questions from a paper written in the Item Bank, for reuse in an assessment: fetched once per
// paper (the teacher's own, or a published one from their department) and turned into the
// assessment builder's question shape.

export interface ItemBankPage {
  id: number
  page_number: number
  content: string
  answer_type: 'none' | 'single' | 'multiple' | 'true_false' | 'short' | 'written'
  options: string[]
  correct: unknown
  model_answer: string | null
  marks: number | null
}

const cache = new Map<number, Promise<{ title: string; pages: ItemBankPage[] }>>()

export function fetchPaper(itemId: number) {
  if (!cache.has(itemId)) {
    cache.set(itemId, axios.get(`/api/teacher/itembank/${itemId}/pages`).then(res => ({
      title: res.data.data.paper.title as string,
      pages: (res.data.data.pages || []) as ItemBankPage[]
    })).catch(err => { cache.delete(itemId); throw err }))
  }
  return cache.get(itemId)!
}

export interface BuilderQuestionParts {
  question_type: 'multiple_choice_single' | 'multiple_choice_multiple' | 'true_false' | 'short_answer' | 'structured'
  question_text: string
  marks: number
  options: { option_text: string; is_correct: boolean }[]
  allow_drawing: boolean
}

/** An Item Bank question as an assessment question (null for an information page - nothing to mark) */
export function toAssessmentQuestion(p: ItemBankPage): BuilderQuestionParts | null {
  const marks = p.marks != null ? Number(p.marks) : 1
  const right = Array.isArray(p.correct) ? (p.correct as number[]) : typeof p.correct === 'number' ? [p.correct] : []
  switch (p.answer_type) {
    case 'single':
    case 'multiple':
      return {
        question_type: p.answer_type === 'single' ? 'multiple_choice_single' : 'multiple_choice_multiple',
        question_text: p.content,
        marks,
        options: p.options.map((o, i) => ({ option_text: o, is_correct: right.includes(i) })),
        allow_drawing: false
      }
    case 'true_false':
      return {
        question_type: 'true_false',
        question_text: p.content,
        marks,
        options: [{ option_text: 'True', is_correct: p.correct === true }, { option_text: 'False', is_correct: p.correct === false }],
        allow_drawing: false
      }
    case 'short':
      return { question_type: 'short_answer', question_text: p.content, marks, options: [], allow_drawing: false }
    case 'written':
      return { question_type: 'structured', question_text: p.content, marks, options: [], allow_drawing: true }
    default:
      return null
  }
}
