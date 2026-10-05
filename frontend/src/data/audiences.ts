/**
 * The "Who it's for" pages: /for/schools, /for/teachers, /for/students. One entry per page;
 * pages/ForAudience.vue lays them out. Only claim what eSpace really does.
 */
import type { Role } from './modules'
import type { TourScreen } from './site'

export interface Audience {
  key: 'schools' | 'teachers' | 'students'
  eyebrow: string
  title: string
  intro: string
  // Search engines and link previews
  metaTitle: string
  metaDescription: string
  // Before -> with eSpace
  shifts: { before: string; after: string }[]
  benefits: { icon: string; title: string; text: string }[]
  // Which modules to list (by who uses them) and which tour screen to show
  roles: Role[]
  screen: TourScreen
  guide: string
  faq: { q: string; a: string }[]
  cta: string
}

export const AUDIENCES: Audience[] = [
  {
    key: 'schools',
    eyebrow: 'For head teachers, DOS and school owners',
    title: 'Run a competency-based school - without the paperwork.',
    intro: 'eSpace puts learning, assessment and reporting in one place, so leaders see coverage, engagement and results across every class as they happen - and report cards come out of the work already done.',
    metaTitle: 'eSpace for school leaders - curriculum coverage, results and report cards',
    metaDescription: 'See curriculum coverage, engagement and competency-based results across every class, and generate report cards from marked work. eSpace for head teachers and directors of studies.',
    shifts: [
      { before: 'Finding out a topic was never assessed when the exam comes', after: 'Coverage by topic, every week - LOA, AOI, constructs and notes' },
      { before: 'Report cards typed by hand at the end of every term', after: 'Report cards generated from marked work, with your crest' },
      { before: 'No idea which learners have stopped engaging', after: 'Engagement by class, and the quiet learners named' },
      { before: 'Notes and past papers scattered across phones and flash disks', after: 'One library the whole school uses, online and offline' }
    ],
    benefits: [
      { icon: 'target', title: 'Curriculum coverage', text: 'Which topics have outcomes assessed, an AOI, constructs and notes - for every class and subject.' },
      { icon: 'trend', title: 'Engagement', text: 'Who is reading, watching and attending, and who has gone quiet - so support starts early.' },
      { icon: 'clipboard', title: 'Marksheets and report cards', text: 'Every mark for a class in one sheet, and competency report cards generated at the end of term.' },
      { icon: 'users', title: 'Departments that run themselves', text: 'Heads of department approve shared content and follow their teachers\' classes in their own view.' },
      { icon: 'wrench', title: 'Set up for you', text: 'Classes, streams, subjects, terms and accounts are set up with you, and promotion between years is one step.' },
      { icon: 'check-circle', title: 'Your data, your school', text: 'Content and results belong to the school, only the right roles see them, and admins can back everything up.' }
    ],
    roles: ['hod', 'admin'],
    screen: 'coverage',
    guide: '/guide#admin',
    faq: [
      { q: 'How is eSpace priced?', a: 'One price per learner, per term, depending on the size of your school. Every module is included. Ask for a quote and we will send it with a plan for your first term.' },
      { q: 'Do we need new computers or a server?', a: 'No. eSpace runs in the browser on the phones, tablets and computers your school and learners already have. We host it for you.' },
      { q: 'How long does it take to get going?', a: 'Usually a few weeks. We set up your classes, subjects and accounts, then train teachers module by module.' }
    ],
    cta: 'See eSpace with your school\'s own classes.'
  },
  {
    key: 'teachers',
    eyebrow: 'For teachers and heads of department',
    title: 'Spend your time teaching - not chasing paper.',
    intro: 'Write notes once, set competency-based assessments, mark them on screen and see straight away which outcomes your class still needs. eSpace keeps track of who has read, watched and handed in.',
    metaTitle: 'eSpace for teachers - eNotes, LOA/AOI/EOC assessment and on-screen marking',
    metaDescription: 'Write interactive eNotes, build LOA, AOI and EOC assessments, mark typed, drawn and uploaded work on screen, and see your class Learning Map. eSpace for teachers.',
    shifts: [
      { before: 'Carrying piles of scripts home to mark', after: 'Mark on screen between lessons, with ticks, comments and marks per question' },
      { before: 'Guessing which outcomes the class has not got', after: 'A class Learning Map that shows what to reteach' },
      { before: 'Writing the same notes on the board for every stream', after: 'eNotes written once, read page by page by every class' },
      { before: 'Not knowing who even opened the notes', after: '"Who has read" and "who watched" for every note and video' }
    ],
    benefits: [
      { icon: 'document', title: 'Interactive eNotes', text: 'Page-by-page notes with pictures, narration and practice - students continue where they stopped.' },
      { icon: 'pencil', title: 'LOA, AOI and EOC assessments', text: 'Typed, drawn, annotated or uploaded answers, linked to learning outcomes, topics and constructs.' },
      { icon: 'check-circle', title: 'Marking on screen', text: 'Annotate, comment and mark per question; auto-marked questions are done for you.' },
      { icon: 'map', title: 'Class Learning Map', text: 'Every outcome for every learner - and support groups for those who need it.' },
      { icon: 'video', title: 'Live classes and videos', text: 'Schedule online lessons with one-tap join and attendance, and share short videos.' },
      { icon: 'chat', title: 'Chats', text: 'Message a student, a class group or a colleague - with photos and voice notes.' }
    ],
    roles: ['teacher'],
    screen: 'marking',
    guide: '/guide#teacher',
    faq: [
      { q: 'Do I need to be good with computers?', a: 'No. If you can use a smartphone you can use eSpace. We train every teacher, module by module, and the user guide has step-by-step help.' },
      { q: 'Can I reuse my existing notes and past papers?', a: 'Yes. Upload books, slides and past papers to the library and item bank, and turn your notes into eNotes page by page.' },
      { q: 'Does it work for practical subjects?', a: 'Yes - learners can draw and upload photos of their work, and the Virtual Lab runs science practicals with real apparatus and readings.' }
    ],
    cta: 'Bring eSpace to your school.'
  },
  {
    key: 'students',
    eyebrow: 'For students and their families',
    title: 'Everything for your classes, in your pocket.',
    intro: 'Notes, books, videos, live lessons and assessments in one place - on the phone you already have, even offline. And a Learning Map that shows exactly what you can already do and what to work on next.',
    metaTitle: 'eSpace for students - notes, books, videos and your Learning Map',
    metaDescription: 'Read your notes page by page, revise from the library and past papers, join live lessons, hand in assessments and see your Learning Map - on any phone, even offline.',
    shifts: [
      { before: 'Copying notes you could not read off the board', after: 'Clear notes page by page, with narration, on your phone' },
      { before: 'Waiting weeks to know how you did', after: 'Marks and comments as soon as your teacher marks' },
      { before: 'Not knowing what to revise', after: 'A Learning Map that shows which outcomes to work on' },
      { before: 'Missing a lesson means missing the notes', after: 'Notes, videos and recordings to catch up from home' }
    ],
    benefits: [
      { icon: 'document', title: 'Notes that read themselves', text: 'Page-by-page eNotes with narration, highlights and your own page notes.' },
      { icon: 'download', title: 'Offline', text: 'Save notes and books to your phone and read them without internet.' },
      { icon: 'pencil', title: 'Assessments', text: 'Attempt and hand in from your phone - type, draw or upload a photo of your work.' },
      { icon: 'map', title: 'Your Learning Map', text: 'See which outcomes you have achieved, by subject and topic, and what is next.' },
      { icon: 'book', title: 'Library and past papers', text: 'Textbooks and practice papers linked to your topics, ready for revision.' },
      { icon: 'trophy', title: 'Achievements', text: 'Badges for good results and for improving - and a streak for reading every day.' }
    ],
    roles: ['student'],
    screen: 'enotes',
    guide: '/guide#student',
    faq: [
      { q: 'What phone do I need?', a: 'Any smartphone with a browser. You can add eSpace to your home screen like an app - no download from a store.' },
      { q: 'Does it use a lot of data?', a: 'Save notes and books once and read them offline as often as you like. Work done offline is sent when you are back online.' },
      { q: 'How do I get an account?', a: 'Your school gives you one. If your school is not on eSpace yet, ask your head teacher to request a demo.' }
    ],
    cta: 'Want eSpace at your school? Tell your head teacher - or ask for a demo.'
  }
]

export const audienceByKey = (key: string) => AUDIENCES.find(a => a.key === key)
