/**
 * The public Privacy policy (/privacy, pages/Privacy.vue), in plain words. Only say what Tusome
 * really does - when a feature changes what is kept or who gets it, change this too and the date.
 */
import { SUPPORT_EMAIL } from '@/data/site'

/** Where privacy questions and reports go by email */
export const PRIVACY_EMAIL = SUPPORT_EMAIL

export const PRIVACY_UPDATED = '29 October 2026'

export const PRIVACY_INTRO = 'Tusome holds the work and results of learners, many of them children. This page says what we keep, why, who can see it, and what you can do about it - and how to tell us at once if something is wrong.'

export const PRIVACY_PROMISES = [
  'We never sell anyone\'s data',
  'No adverts, and no advertising or tracking cookies',
  'Each person sees only what their role allows',
  'Every report of a concern reaches the team at once'
]

export const REPORT_CATEGORIES = [
  { value: 'data_exposed', label: 'Someone can see data they should not' },
  { value: 'my_data', label: 'A question or request about my data' },
  { value: 'account_misuse', label: 'An account used by someone else' },
  { value: 'child_safety', label: 'A learner may be at risk' },
  { value: 'inappropriate', label: 'Bullying or inappropriate content' },
  { value: 'other', label: 'Something else' }
]

export interface PrivacySection {
  id: string
  title: string
  paragraphs?: string[]
  items?: { label?: string; text: string }[]
  after?: string
}

export const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    id: 'who',
    title: 'Who we are and who this covers',
    paragraphs: [
      'Tusome is a digital school platform: eNotes, an eLibrary, assessments and marking, live classes, Learning Maps and report cards. Schools use it with their learners, teachers, heads of department and administrators, and can send parents a private weekly update.',
      'Each school decides who gets an account and what Tusome is used for. The school is responsible for its learners\' and staff\'s data; we look after it for the school, and use it only to run Tusome for that school. This policy covers everyone who uses Tusome and everyone who visits this website.'
    ]
  },
  {
    id: 'what',
    title: 'What we keep',
    items: [
      { label: 'Account details', text: 'name, admission number, class and stream, username, and an email address, phone number or profile photo where one is given.' },
      { label: 'Learning', text: 'the notes and books opened and where you stopped, your highlights and page notes, answers, drawings and files handed in, marks and teachers\' comments, Learning Map progress, practicals, and attendance at live classes.' },
      { label: 'Messages', text: 'chats and study group messages, and noticeboard posts.' },
      { label: 'Staff work', text: 'the classes and subjects a teacher has, the work they set and mark, and the activity a school\'s supervision reports are built from.' },
      { label: 'Sign-in and safety', text: 'when an account signs in and from what internet address, and a log of important changes, so misuse can be traced.' },
      { label: 'From this website', text: 'what you write in a demo request or a privacy report.' }
    ],
    after: 'We do not ask for more than the school needs to teach, assess and report.'
  },
  {
    id: 'why',
    title: 'What we use it for',
    items: [
      { text: 'Running the school\'s teaching: lessons, assessments, marking, Learning Maps and report cards.' },
      { text: 'Reports the school asks for, for teachers, heads of department, administrators and parents.' },
      { text: 'Keeping accounts safe, finding misuse, and fixing problems when a school asks for help.' }
    ],
    after: 'We never sell data, never show adverts, and never use learners\' data to market anything.'
  },
  {
    id: 'see',
    title: 'Who can see it',
    items: [
      { label: 'Learners', text: 'their own work, results and messages.' },
      { label: 'Teachers', text: 'the learners in the classes they teach.' },
      { label: 'Heads of department', text: 'their own department.' },
      { label: 'School administrators', text: 'their school.' },
      { label: 'Parents', text: 'their own child\'s weekly update, through a private link the school sends.' },
      { label: 'The Tusome team', text: 'only when needed to run Tusome, help the school, or look into a report.' }
    ],
    after: 'Every page checks the person\'s role before it shows anything.'
  },
  {
    id: 'services',
    title: 'Services we use',
    paragraphs: ['A few features need another company\'s service. Each one gets only what that feature needs:'],
    items: [
      { label: 'Google Gemini', text: 'explains a page of notes aloud (AI Tutor), drafts Activity of Integration scenarios from the curriculum for teachers, and drafts report-card comments. For a report-card comment it is sent the learner\'s first name, subjects and grades - never the full name or admission number.' },
      { label: 'ElevenLabs', text: 'reads the text of eNotes aloud.' },
      { label: 'BigBlueButton', text: 'carries the sound and video of live classes, and the recording when a teacher records one.' },
      { label: 'The school\'s own student information system (SMIS)', text: 'when the school turns it on, keeps Tusome\'s list of learners and classes up to date.' },
      { label: 'Browser notifications', text: 'when you turn them on, a short alert travels through your browser\'s notification service.' },
      { label: 'Our hosting provider', text: 'stores Tusome on its servers.' }
    ]
  },
  {
    id: 'children',
    title: 'Children',
    paragraphs: [
      'Most people on Tusome are learners under 18. Their accounts are made by the school - children cannot sign themselves up. There are no public profiles: a learner\'s work and messages stay inside their school.',
      'A report that a learner may be at risk is the first thing we look at.'
    ]
  },
  {
    id: 'safe',
    title: 'How we keep it safe',
    items: [
      { text: 'Passwords are stored scrambled (hashed) - nobody, including us, can read them.' },
      { text: 'Tusome travels over an encrypted (HTTPS) connection.' },
      { text: 'A teacher given a temporary password must choose their own the first time they sign in.' },
      { text: 'Important changes are logged, so the school can see who did what.' }
    ]
  },
  {
    id: 'keep',
    title: 'How long we keep it',
    paragraphs: [
      'We keep a school\'s data while the school uses Tusome, so learners\' records follow them from class to class. Something removed is hidden at once and can no longer be seen in Tusome.',
      'A school can have its data exported at any time. When a school stops using Tusome, we return its data if it asks, and then delete it.'
    ]
  },
  {
    id: 'rights',
    title: 'Your rights',
    paragraphs: [
      'We handle personal data in line with Uganda\'s Data Protection and Privacy Act, 2019. You can ask to see the data held about you, to have it corrected, or to have it deleted. Learners and parents can ask the school, or write to us and we will work with the school.',
      'If you are not happy with how we answer, you can complain to Uganda\'s Personal Data Protection Office.'
    ]
  },
  {
    id: 'cookies',
    title: 'Cookies and what your browser keeps',
    paragraphs: [
      'Tusome uses one cookie, to keep you signed in. Your browser also keeps your settings (such as dark mode), where you stopped reading, and any notes or books you save to read offline - on your device only. There are no advertising or tracking cookies.'
    ]
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    paragraphs: [
      'When what we keep or who gets it changes, we change this page and the date at the top.'
    ]
  }
]
