/**
 * Words for the public website (landing page and /for/* pages) that are not modules, the team or
 * the guide. Kept here so the copy can be changed without touching the page layout.
 *
 * Only say what Tusome really does - nothing here is a quote or a figure from a real school.
 */

/** Where schools, teachers and students write to the Tusome team */
export const SUPPORT_EMAIL = 'support@tusome.ug'

/**
 * The main menu - a few links, for whoever the site is showing (School / Teacher / Student, see
 * components/site/useAudience). `to` is a route; "/#modules" scrolls to that part of the landing page.
 */
export const SITE_NAV: Record<'school' | 'teacher' | 'student', { to: string; label: string }[]> = {
  school: [
    { to: '/#compare', label: 'Before and after' },
    { to: '/#modules', label: 'Modules' },
    { to: '/#faq', label: 'Questions' },
    { to: '/guide', label: 'User guide' }
  ],
  teacher: [
    { to: '/#day', label: 'A teacher\'s day' },
    { to: '/#compare', label: 'Marking' },
    { to: '/#modules', label: 'Modules' },
    { to: '/guide#teacher', label: 'User guide' }
  ],
  student: [
    { to: '/#try', label: 'Try a lesson' },
    { to: '/#lab', label: 'Virtual Lab' },
    { to: '/#modules', label: 'Modules' },
    { to: '/guide#student', label: 'User guide' }
  ]
}

/** "Who it's for" pages, also in the menu */
export const AUDIENCE_LINKS = [
  { to: '/for/schools', label: 'School leaders', icon: 'teacher' },
  { to: '/for/teachers', label: 'Teachers', icon: 'pencil' },
  { to: '/for/students', label: 'Students and families', icon: 'book' }
]

/** The product tour: one entry per screen. The screen itself is drawn by components/site/screens. */
export type TourScreen = 'enotes' | 'map' | 'marking' | 'coverage' | 'dashboard'
export const TOUR: { key: TourScreen; label: string; icon: string; title: string; text: string }[] = [
  { key: 'enotes', label: 'eNotes', icon: 'document', title: 'Notes students actually read', text: 'Page-by-page notes with narration, highlights and page notes - and "continue where you stopped" on any phone.' },
  { key: 'map', label: 'Learning Map', icon: 'map', title: 'Every outcome, every learner', text: 'Each marked answer turns an outcome green, amber or red - so a learner knows what to work on next.' },
  { key: 'marking', label: 'Marking', icon: 'pencil', title: 'Mark on screen, in minutes', text: 'Typed, drawn and uploaded answers in one place, with annotations, comments and marks per question.' },
  { key: 'coverage', label: 'Coverage', icon: 'target', title: 'See the gaps before the exam', text: 'Which topics have an LOA, an AOI, constructs and notes - and which still have nothing.' },
  { key: 'dashboard', label: 'Teacher dashboard', icon: 'chart', title: 'The day, at a glance', text: 'Scripts to mark, live classes, deadlines and the students who have gone quiet - first thing in the morning.' }
]

/** "Your data, your school" */
export const TRUST = [
  { icon: 'users', title: 'Your data stays yours', text: 'Notes, books, assessments and results belong to your school and can be exported at any time.' },
  { icon: 'check-circle', title: 'Only the right people see it', text: 'Students see their own work, teachers see their classes, HODs their department - every page checks the role.' },
  { icon: 'clipboard', title: 'Every change is logged', text: 'Administrators have audit logs of important changes across the school.' },
  { icon: 'key', title: 'Safe sign-in', text: 'Every account has its own password, and a teacher given a temporary one must choose their own the first time they sign in.' },
  { icon: 'bolt', title: 'Light on data', text: 'Notes and books can be saved once and read offline, so learners do not spend data opening them again and again.' },
  { icon: 'kit', title: 'Works on the phones learners have', text: 'Any smartphone, tablet or computer with a browser. Add it to the home screen like an app - no store download.' }
]

/** Why we built Tusome - the team's own words (edit freely) */
export const STORY = {
  title: 'Why we built Tusome',
  paragraphs: [
    'The new curriculum asks teachers to follow every learner, outcome by outcome. On paper that means stacks of scripts, spreadsheets nobody has time to fill in, and report cards typed out by hand at the end of every term.',
    'We built Tusome so that work happens once: a learner reads, attempts and hands in on any phone; a teacher marks on screen; and the Learning Map, the department view and the report card all fill themselves in.'
  ]
}

/** Live totals from /api/public/stats - only shown once they are big enough to mean something */
export const STAT_LABELS: { key: string; label: string; min: number }[] = [
  { key: 'learners', label: 'learners on Tusome', min: 50 },
  { key: 'teachers', label: 'teachers', min: 10 },
  { key: 'note_pages', label: 'pages of eNotes written', min: 50 },
  { key: 'marked', label: 'assessments marked on screen', min: 50 },
  { key: 'books', label: 'books on the shelves', min: 20 },
  { key: 'live_lessons', label: 'live lessons held', min: 20 }
]
