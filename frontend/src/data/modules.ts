/**
 * What eSpace does - one entry per module. The landing page shows them as cards; the user guide
 * (/guide) uses the same list so the two never disagree.
 */
export type ModuleCategory = 'learn' | 'assess' | 'insight' | 'connect'
export type Role = 'student' | 'teacher' | 'hod' | 'admin'

export interface EModule {
  key: string
  name: string
  // An AppIcon name
  icon: string
  category: ModuleCategory
  roles: Role[]
  // One line for the landing page
  short: string
  // A few things it does - shown when a module card is opened on the landing page
  features: string[]
  // Its topic in the user guide (data/guide.ts), e.g. 's-enotes'
  guide?: string
}

export const CATEGORIES: { key: ModuleCategory; label: string; blurb: string }[] = [
  { key: 'learn', label: 'Learn', blurb: 'Content students actually open' },
  { key: 'assess', label: 'Assess', blurb: 'Competency-based, end to end' },
  { key: 'insight', label: 'Insight', blurb: 'See who needs what' },
  { key: 'connect', label: 'Connect', blurb: 'Teachers and learners, together' }
]

export const ROLE_LABEL: Record<Role, string> = { student: 'Students', teacher: 'Teachers', hod: 'HODs', admin: 'Admins' }

export const MODULES: EModule[] = [
  { key: 'enotes', name: 'eNotes', icon: 'document', category: 'learn', roles: ['student', 'teacher', 'hod'], short: 'Interactive notes read page by page - with narration, highlights, page notes and "continue where you stopped".', features: ["Read page by page, with narration", "Highlights and private page notes", "Continue where you stopped", "A quick assessment on the page it belongs to", "Teachers see who has read each topic"], guide: 's-enotes' },
  { key: 'library', name: 'eLibrary', icon: 'book', category: 'learn', roles: ['student', 'teacher', 'hod', 'admin'], short: 'Textbooks and slides on a real bookshelf - read in the browser, annotate, and see who has opened each one.', features: ["Books open like real books on a shelf", "Pick up where you stopped", "Annotate as you read", "Save to the phone to read offline", "Teachers see who has opened each book"], guide: 's-library' },
  { key: 'itembank', name: 'Item Bank', icon: 'clipboard', category: 'learn', roles: ['student', 'teacher', 'hod', 'admin'], short: 'Past papers and practice packs, linked to curriculum topics, for revision at any time.', features: ["Past papers linked to curriculum topics", "Practice packs for revision", "Teachers choose what can be downloaded", "Read in the browser or offline"], guide: 's-library' },
  { key: 'videos', name: 'Videos', icon: 'video', category: 'learn', roles: ['student', 'teacher', 'hod', 'admin'], short: 'Short lessons and practical demos - with a "who watched" view for every video.', features: ["Downloaded once, then plays without buffering", "Who watched, and how far", "Arranged by class and subject"], guide: 't-content' },
  { key: 'offline', name: 'Offline downloads', icon: 'download', category: 'learn', roles: ['student'], short: 'Save notes and books to the device and keep learning without internet; work syncs back when online.', features: ["Save eNotes and books to the phone", "Answer assessments without internet", "Everything syncs when you are back online"], guide: 'offline' },
  { key: 'virtuallab', name: 'Virtual Lab', icon: 'beaker', category: 'learn', roles: ['student', 'teacher', 'hod', 'admin'], short: 'Science practicals in a 3D lab - real apparatus, readings, graphs and a notebook the teacher marks.', features: ["A 3D lab with real school apparatus", "Readings, tables and graphs", "A practical notebook the teacher marks", "Experiments shared across the department"] },
  { key: 'live', name: 'Live Classes', icon: 'video', category: 'connect', roles: ['student', 'teacher'], short: 'Scheduled online lessons with one-tap join, attendance and recordings to catch up on.', features: ["One-tap join from the dashboard", "Attendance taken for you", "Recordings to catch up on"], guide: 's-live' },
  { key: 'assessments', name: 'Assessments', icon: 'pencil', category: 'assess', roles: ['student', 'teacher', 'hod', 'admin'], short: 'Build LOA, AOI and EOC assessments - typed, drawn, annotated or uploaded - and mark them on screen.', features: ["LOA, AOI and EOC assessments", "Typed, drawn, annotated or uploaded answers", "Auto-marked questions where they fit", "Marks and comments per question", "Linked to outcomes, topics and constructs"], guide: 't-assess' },
  { key: 'livequiz', name: 'Live Quiz', icon: 'bolt', category: 'assess', roles: ['student', 'teacher'], short: 'Play an assessment\'s questions live in class - students answer on their phones, with a leaderboard.', features: ['Students join with a 6-digit code', 'Answers shown as bars, then a leaderboard', 'Scores can count on the Learning Map'], guide: 't-livequiz' },
  { key: 'physical', name: 'Physical exams', icon: 'clipboard', category: 'assess', roles: ['teacher', 'hod', 'admin'], short: 'Type in marks for tests sat on paper and choose whether each one counts on report cards.', features: ["Enter marks learner by learner, fast", "Marks above the maximum are flagged", "Choose whether it counts on the report card"], guide: 't-results' },
  { key: 'learningmap', name: 'Learning Map', icon: 'map', category: 'insight', roles: ['student', 'teacher', 'hod'], short: 'Every learning outcome for the class, green, amber or red for each learner - and what to reteach.', features: ["Green, amber or red for every outcome", "A class view of every learner", "Support groups for reteaching", "Next steps for each learner"], guide: 's-map' },
  { key: 'reports', name: 'Report cards', icon: 'document', category: 'assess', roles: ['student', 'teacher', 'hod', 'admin'], short: 'End-of-term competency reports generated from real results, printed with the school\'s crest.', features: ["Generated from marked work", "Your school crest and layout", "A \"What I can do\" competency report"], guide: 't-results' },
  { key: 'marksheet', name: 'Marksheets', icon: 'chart', category: 'insight', roles: ['teacher', 'hod', 'admin'], short: 'Every mark for a class and subject in one sheet, with averages, grades and a CSV download.', features: ["Every mark for a class in one sheet", "Averages and grade spread", "Download as a spreadsheet (CSV)"], guide: 't-results' },
  { key: 'engagement', name: 'Engagement', icon: 'trend', category: 'insight', roles: ['teacher', 'hod', 'admin'], short: 'Who is reading, watching and attending - and the quiet students to reach out to early.', features: ["Who is reading, watching and attending", "Quiet learners named, so support starts early", "Compare classes at a glance"], guide: 't-insight' },
  { key: 'coverage', name: 'Curriculum coverage', icon: 'target', category: 'insight', roles: ['teacher', 'hod'], short: 'Which topics have outcomes assessed, an AOI, EOCs and notes - and where the gaps are.', features: ["Outcomes assessed for every topic", "Topics still missing an AOI, EOC or notes", "Suggested AOI scenarios with marking guides"], guide: 't-insight' },
  { key: 'revision', name: 'Daily Revision', icon: 'bulb', category: 'learn', roles: ['student'], short: 'Five quick questions a day from your own assessments - wrong ones come back tomorrow.', features: ['Spaced repetition: right answers come back later and later', 'Weakest topics first', 'A daily streak'], guide: 's-revision' },
  { key: 'earlywarning', name: 'Early warning', icon: 'warning', category: 'insight', roles: ['teacher', 'hod'], short: 'The learners who may be slipping - low or falling results, gone quiet, missing deadlines.', features: ['Four signals from results and activity', 'For your classes, or the whole department', 'Message a learner straight from the list'], guide: 't-warning' },
  { key: 'parents', name: 'Parent updates', icon: 'users', category: 'connect', roles: ['admin'], short: 'A private weekly update for each parent - a link to open any time, and an email every week.', features: ['No parent account or password needed', 'Reading, work handed in, results and what is due', 'Turn a link off at any time'], guide: 'a-parents' },
  { key: 'scheme', name: 'Scheme of work', icon: 'clipboard', category: 'insight', roles: ['teacher', 'hod'], short: 'Plan a week for every curriculum topic, tick it off when taught - and see where a class is behind.', features: ['Auto-plan over the term', 'Behind, this week and coming up at a glance', 'What already covers each topic'], guide: 't-scheme' },
  { key: 'examplan', name: 'Exam plan', icon: 'target', category: 'learn', roles: ['student', 'admin'], short: 'A countdown to the next exam and a week-by-week revision plan - weakest topics first.', features: ['Exam dates set by the school', 'Weakest topics first, subjects mixed', 'Tick off each topic as you revise'], guide: 's-exams' },
  { key: 'achievements', name: 'Achievements', icon: 'trophy', category: 'connect', roles: ['student', 'admin'], short: 'Badges for results and improvement, learning streaks, and a growth board that celebrates progress.', features: ["Badges for good results and for improving", "Learning streaks", "A growth board that celebrates progress"], guide: 's-more' },
  { key: 'noticeboard', name: 'Noticeboard', icon: 'speaker', category: 'connect', roles: ['student', 'teacher', 'hod', 'admin'], short: 'School and class notices with read receipts - see who has read them, and who hasn\'t.', features: ['For everyone, students, staff or a class', 'Pin notices and set when they come down', 'Read receipts for the person who posted'], guide: 't-notices' },
  { key: 'chats', name: 'Chats', icon: 'chat', category: 'connect', roles: ['student', 'teacher', 'hod', 'admin'], short: 'Built-in messaging between teachers and students, with photos, voice notes and replies.', features: ["One-to-one and group chats", "Photos and voice notes", "Filter by unread, people or groups"], guide: 's-more' }
]
