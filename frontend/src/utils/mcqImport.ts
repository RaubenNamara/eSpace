/**
 * Reads multiple-choice questions written as plain text (pasted, or from a Word / text file):
 *
 *   1. What is the SI unit of length?        (or "1)", "Q1.", "Question 1:")
 *   A. Kilogram                              (or "a)", "(a)", "A:", "A -")
 *   *B. Metre                                ("*" marks the right choice)
 *   C. Second
 *   Answer: B                                (or "Ans: B", "Correct answer: B")
 *
 * A question's text may run over several lines before its first choice. The answer is optional:
 * the teacher picks any that are missing before the questions are added.
 */
export interface ImportedMcq {
  question_text: string
  options: { option_text: string; is_correct: boolean }[]
  marks: number
}

const QUESTION = /^\s*(?:q(?:uestion)?\s*)?(\d{1,3})\s*[.):-]\s*(.*)$/i
const OPTION = /^\s*(\*)?\s*\(?([a-f])\s*[.):\-]\s*(\*)?\s*(.+?)\s*(\*)?\s*$/i
const ANSWER = /^\s*(?:correct\s+)?(?:answer|ans)\s*[:.\-]?\s*\(?([a-f])\)?\b/i

export function parseMcqText(raw: string): ImportedMcq[] {
  const lines = raw.replace(/\r\n?/g, '\n').split('\n').map(l => l.replace(/ /g, ' ').trimEnd())
  const out: ImportedMcq[] = []
  let cur: { text: string[]; options: { option_text: string; is_correct: boolean }[]; answer: string | null } | null = null

  const finish = () => {
    if (!cur) return
    const text = cur.text.join(' ').replace(/\s+/g, ' ').trim()
    if (text && cur.options.length >= 2) {
      if (cur.answer) {
        const i = cur.answer.charCodeAt(0) - 97
        cur.options.forEach((o, j) => { o.is_correct = j === i })
      }
      // only one right answer: if several were starred, keep the first
      let seen = false
      cur.options.forEach(o => { if (o.is_correct) { if (seen) o.is_correct = false; seen = true } })
      out.push({ question_text: text, options: cur.options, marks: 1 })
    }
    cur = null
  }

  let gap = false
  for (const line of lines) {
    if (!line.trim()) { gap = true; continue }
    const afterGap = gap
    gap = false
    const ans = line.match(ANSWER)
    if (ans && cur) { cur.answer = ans[1].toLowerCase(); continue }
    const q = line.match(QUESTION)
    // a numbered line starts a question - unless we are still in one with no choices yet
    // (then "1." inside the text, e.g. a numbered stem, is just more of the question)
    if (q && !(cur && cur.options.length === 0 && !q[2])) {
      finish()
      cur = { text: [q[2]], options: [], answer: null }
      continue
    }
    const o = line.match(OPTION)
    if (o && cur) {
      const expected = String.fromCharCode(97 + cur.options.length)
      if (o[2].toLowerCase() === expected) {
        cur.options.push({ option_text: o[4].replace(/\s*\*$/, '').trim(), is_correct: !!(o[1] || o[3] || o[5]) })
        continue
      }
    }
    // after a blank line, a question that already has its choices is finished: this starts the next
    if (cur && afterGap && cur.options.length >= 2) {
      finish()
      cur = { text: [line.trim()], options: [], answer: null }
      continue
    }
    if (cur) {
      // more of the question (before its choices) or of the last choice (after)
      if (cur.options.length === 0) cur.text.push(line.trim())
      else cur.options[cur.options.length - 1].option_text += ` ${line.trim()}`
    } else if (line.trim()) {
      // an unnumbered first question
      cur = { text: [line.trim()], options: [], answer: null }
    }
  }
  finish()
  return out
}
