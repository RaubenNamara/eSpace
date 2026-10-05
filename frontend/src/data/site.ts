/**
 * Words for the public website (landing page and /for/* pages) that are not modules, the team or
 * the guide. Kept here so the copy can be changed without touching the page layout.
 *
 * Only say what eSpace really does - nothing here is a quote or a figure from a real school.
 */

/** The main menu. `to` is a route; "/#modules" scrolls to that part of the landing page. */
export const SITE_NAV = [
  { to: '/#features', label: 'Why eSpace' },
  { to: '/#modules', label: 'Modules' },
  { to: '/#tour', label: 'Tour' },
  { to: '/#pricing', label: 'Pricing' },
  { to: '/#team', label: 'Team' }
]

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

/** Pricing: no figures on the site - each school gets a quote for its size */
export const PRICING = {
  model: 'One price per learner, per term',
  note: 'Priced by the size of your school. Ask for a quote - it comes with a plan for your first term.',
  included: [
    'Every module - nothing locked behind a higher plan',
    'Accounts for all students, teachers, HODs and admins',
    'Setting up your classes, subjects and terms',
    'Training for teachers, module by module',
    'Your crest on report cards',
    'Updates and new features as they ship',
    'Support from the people who build eSpace'
  ],
  steps: [
    { title: 'Tell us about your school', text: 'Number of learners, classes and what you want to start with.' },
    { title: 'Get a quote and a plan', text: 'One price per learner per term, and a timeline for your first term.' },
    { title: 'Go live', text: 'We set up, train and stay with you through the first weeks.' }
  ]
}

/** "Your data, your school" */
export const TRUST = [
  { icon: 'users', title: 'Your data stays yours', text: 'Notes, books, assessments and results belong to your school and can be exported at any time.' },
  { icon: 'check-circle', title: 'Only the right people see it', text: 'Students see their own work, teachers see their classes, HODs their department - every page checks the role.' },
  { icon: 'clipboard', title: 'Every change is logged', text: 'Administrators have audit logs of important changes across the school.' },
  { icon: 'download', title: 'Backed up', text: 'Administrators can take a full backup of the school\'s data from inside eSpace.' },
  { icon: 'bolt', title: 'Light on data', text: 'Notes and books can be saved once and read offline, so learners do not spend data opening them again and again.' },
  { icon: 'kit', title: 'Works on the phones learners have', text: 'Any smartphone, tablet or computer with a browser. Add it to the home screen like an app - no store download.' }
]

/** Why we built eSpace - the team's own words (edit freely) */
export const STORY = {
  title: 'Why we built eSpace',
  paragraphs: [
    'The new curriculum asks teachers to follow every learner, outcome by outcome. On paper that means stacks of scripts, spreadsheets nobody has time to fill in, and report cards typed out by hand at the end of every term.',
    'We built eSpace so that work happens once: a learner reads, attempts and hands in on any phone; a teacher marks on screen; and the Learning Map, the department view and the report card all fill themselves in.'
  ]
}

/** Live totals from /api/public/stats - only shown once they are big enough to mean something */
export const STAT_LABELS: { key: string; label: string; min: number }[] = [
  { key: 'learners', label: 'learners on eSpace', min: 50 },
  { key: 'teachers', label: 'teachers', min: 10 },
  { key: 'note_pages', label: 'pages of eNotes written', min: 50 },
  { key: 'marked', label: 'assessments marked on screen', min: 50 },
  { key: 'books', label: 'books on the shelves', min: 20 },
  { key: 'live_lessons', label: 'live lessons held', min: 20 }
]
