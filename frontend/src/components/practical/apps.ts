// ICT practicals worked inside Tusome (backend: Utils/Practical.php). Each app keeps the work as
// one file in its own format and makes the real Office file when someone downloads it.

export type PracticalApp = 'word' | 'excel' | 'powerpoint' | 'access'

export interface PracticalAppInfo {
  app: PracticalApp
  label: string
  short: string
  letter: string
  /** what is saved on the server */
  saveType: string
  /** what a download is */
  downloadExt: string
  /** Office files a teacher can start from */
  opens: string
  bar: string
  badge: string
  soft: string
}

export const PRACTICAL_APPS: Record<PracticalApp, PracticalAppInfo> = {
  word: { app: 'word', label: 'Word processing', short: 'Word', letter: 'W', saveType: 'text/html', downloadExt: 'docx', opens: '.docx', bar: 'bg-[#185abd]', badge: 'bg-[#185abd] text-white', soft: 'bg-blue-50 text-[#185abd] dark:bg-blue-900/30 dark:text-blue-200' },
  excel: { app: 'excel', label: 'Spreadsheet', short: 'Excel', letter: 'X', saveType: 'application/json', downloadExt: 'xlsx', opens: '.xlsx', bar: 'bg-[#107c41]', badge: 'bg-[#107c41] text-white', soft: 'bg-emerald-50 text-[#107c41] dark:bg-emerald-900/30 dark:text-emerald-200' },
  powerpoint: { app: 'powerpoint', label: 'Presentation', short: 'PowerPoint', letter: 'P', saveType: 'application/json', downloadExt: 'pptx', opens: '', bar: 'bg-[#c43e1c]', badge: 'bg-[#c43e1c] text-white', soft: 'bg-orange-50 text-[#c43e1c] dark:bg-orange-900/30 dark:text-orange-200' },
  access: { app: 'access', label: 'Database', short: 'Access', letter: 'A', saveType: 'application/x-sqlite3', downloadExt: 'sqlite', opens: '.sqlite,.db,.csv', bar: 'bg-[#a4373a]', badge: 'bg-[#a4373a] text-white', soft: 'bg-rose-50 text-[#a4373a] dark:bg-rose-900/30 dark:text-rose-200' }
}

export const practicalInfo = (app?: string | null): PracticalAppInfo | null =>
  app && app in PRACTICAL_APPS ? PRACTICAL_APPS[app as PracticalApp] : null

/** What every editor offers the workspace around it */
export interface PracticalEditorApi {
  /** the work in Tusome's format, to save */
  save: () => Promise<Blob>
  /** an Office file (.docx, .xlsx ...) opened into the editor */
  importFile?: (file: File) => Promise<void>
  /** the work as a real Office file, to download */
  exportFile: () => Promise<Blob>
}

/** A mark given inside a practical's viewer, for the marking page around it to show */
export interface QuestionMarked { submissionId: number; questionId: number; marks: number | null; feedback: string }
export const QUESTION_MARKED = 'tusome:question-marked'
export const announceQuestionMarked = (detail: QuestionMarked) => window.dispatchEvent(new CustomEvent(QUESTION_MARKED, { detail }))

export const safeFileName = (t: string) => t.replace(/[\\/:*?"<>|]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 80) || 'Practical'

export const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}
