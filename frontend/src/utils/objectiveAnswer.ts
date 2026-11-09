/**
 * A multiple-choice or true/false answer in words. The stored answer is the option's id ("115"),
 * a JSON list of ids ("[21,23]") for choose-all questions, or 'true' / 'false'. Options come in
 * display order, so the letter is the one the learner saw. Never returns an id.
 */
interface ObjectiveQuestion {
  question_type: string
  options?: { id: number | string; option_text: string }[]
}

const GONE = '(This option is no longer on the question)'

export function objectiveAnswerText(question: ObjectiveQuestion, answer: string | null | undefined): string {
  if (answer === null || answer === undefined || answer === '') return ''
  if (question.question_type === 'true_false') {
    if (answer === 'true') return 'True'
    if (answer === 'false') return 'False'
  }
  const options = question.options || []
  const describe = (id: unknown) => {
    const i = options.findIndex(o => String(o.id) === String(id))
    return i < 0 ? GONE : `${String.fromCharCode(65 + i)}. ${options[i].option_text}`
  }
  if (question.question_type === 'multiple_choice_multiple') {
    let picked: unknown
    try { picked = JSON.parse(answer) } catch { return GONE }
    return Array.isArray(picked) ? picked.map(describe).join('\n') : GONE
  }
  return describe(answer)
}
