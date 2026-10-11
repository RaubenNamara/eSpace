/**
 * The eSpace user guide (/guide): one part per role, each a list of short how-tos. Plain data, so
 * the guide page can search it and new sections are easy to add.
 */
export interface GuideTopic {
  id: string
  title: string
  // An AppIcon name
  icon: string
  intro?: string
  steps?: string[]
  tips?: string[]
}

export interface GuidePart {
  key: 'start' | 'student' | 'teacher' | 'hod' | 'admin'
  label: string
  blurb: string
  topics: GuideTopic[]
}

export const GUIDE: GuidePart[] = [
  {
    key: 'start',
    label: 'Getting started',
    blurb: 'Signing in, finding your way around, and using eSpace on a phone.',
    topics: [
      {
        id: 'sign-in', title: 'Signing in', icon: 'users',
        intro: 'Your school gives you your account - a username (or email) and a password.',
        steps: ['Open your school\'s eSpace address and choose Sign in.', 'Enter your username or email, and your password.', 'Teachers given a temporary password are asked to choose a new one straight away.', 'Forgot your password? Choose "Forgot password" on the sign-in page and follow the email.'],
        tips: ['Sign out on shared computers - your account opens your marks and messages.']
      },
      {
        id: 'layout', title: 'Finding your way around', icon: 'map',
        intro: 'Everything you can use is in the menu on the left (tap the ☰ button on a phone).',
        steps: ['The dashboard is your home page - what\'s due, what\'s new and what to do next.', 'The search box at the top finds notes, assessments and books by name.', 'The bell shows notifications; the speech bubble opens your chats.', 'Tap your name (top right) for your profile, password and sign out.'],
        tips: ['The moon/sun button switches between dark and light mode.', 'Most lists remember the class and filters you last used.']
      },
      {
        id: 'phone', title: 'Using eSpace on a phone', icon: 'keyboard',
        intro: 'eSpace works in the browser on any phone - nothing to install.',
        steps: ['Open eSpace in Chrome (or your phone\'s browser) - on the school website, tap the Sign in button at the bottom right.', 'Use the browser menu\'s "Add to Home screen" (or "Install app") to open it like an app, on phones and iPads.', 'On small screens, filters fold into a Filters button at the top of each page.'],
        tips: ['When the school updates eSpace, the app picks up the new version as soon as you open it.']
      },
      {
        id: 'offline', title: 'Working offline', icon: 'download',
        intro: 'Notes and books can be saved to your device and read with no internet at all.',
        steps: ['On an eNote or book, choose Save for offline.', 'Open Downloads to see everything saved on this device and how much space it uses.', 'Read, highlight and write notes as usual when offline.', 'When you\'re back online, your notes and highlights are sent automatically.'],
        tips: ['Saved copies are kept for 30 days and renewed whenever you\'re online.']
      }
    ]
  },
  {
    key: 'student',
    label: 'Students',
    blurb: 'Reading, revising, attempting assessments and following your own progress.',
    topics: [
      {
        id: 's-dashboard', title: 'Your dashboard (eClass)', icon: 'sparkles',
        intro: 'Open eSpace and your dashboard shows what matters today.',
        steps: ['The banner at the top sums up your day, with a button for the most useful thing to do now.', 'Your week shows work due and live classes day by day - overdue work is in red.', '"What to do next" lists the most useful things to do, in order; Scores shows your latest results.', 'Your Learning Map, achievements and the newest books follow below.', 'If a live class has started, a red banner at the top lets you join in one tap.'],
      },
      {
        id: 's-enotes', title: 'Reading eNotes', icon: 'document',
        intro: 'eNotes are your teachers\' notes, read page by page like a book.',
        steps: ['Open eNotes and tap a topic on the shelf (or "Continue reading").', 'Turn pages with Previous and Next, or by swiping from the edge of the page.', 'Tap the speaker to listen to a page read aloud.', 'Select text to highlight it in a colour - only you see your highlights.', 'Every page has its own "Add my summary" tab at its foot - two pages side by side each have one. Tap it to write what you understood from that page.', 'eSpace remembers your page, so you can carry on next time.'],
        tips: ['The summary tabs stay in view at the foot of the book, even on a long page - you never have to scroll down to find them.', 'Some pages end with a quick assessment on that page\'s learning outcome - try it while it\'s fresh.']
      },
      {
        id: 's-library', title: 'eLibrary, Item Bank and Videos', icon: 'book',
        steps: ['eLibrary holds textbooks and slides; Item Bank holds past papers and practice packs.', 'Tap a book to open it in the reader. Each page on show has its own "Add my note" tab - tap it to write as you read.', 'Zoom in for small print; your note tabs stay in place while the page scrolls under them.', 'Videos play in the browser - some can be saved to watch offline.', 'Books your teacher allows can be downloaded.'],
        tips: ['Find the page hard to read? The Reading focus colour button lays a soft colour over the whole page, all the way down as you scroll.']
      },
      {
        id: 's-live', title: 'Joining live classes', icon: 'video',
        steps: ['Open Live Classes - "Next up" shows the next lesson and how long until it starts.', 'When the teacher starts the lesson, a red Live now banner appears with Join now.', 'The lesson opens in a new tab; close it when you\'re done.', 'Missed one? Look under Past classes - recorded lessons have a Watch button.'],
      },
      {
        id: 's-assess', title: 'Attempting assessments', icon: 'pencil',
        intro: 'Assessments are grouped by what needs doing: Overdue, In progress, To do, Waiting for marks, Marked.',
        steps: ['Open Assessments and tap Start (or Continue for one you began).', 'Answer each question - type, choose, draw or upload as the question asks.', 'Your answers are saved as you go, so you can come back.', 'Tap Submit when you\'re finished. You can\'t change answers after submitting.', 'When it\'s marked, tap See result for your score and your teacher\'s feedback.'],
        tips: ['LOA, AOI and EOC show what kind of assessment it is - each one counts on your Learning Map.', 'Late work can only be handed in if your teacher allows it.']
      },
      {
        id: 's-map', title: 'Your Learning Map', icon: 'map',
        intro: 'Every learning outcome for your class this year - and how you\'re doing on each.',
        steps: ['Green means achieved, amber developing, red needs support, grey not assessed yet.', 'Pick a subject, then a term, to see its topics.', 'Open a topic to see each outcome and the assessments behind it.', '"My report" prints a summary of what you can do.'],
      },
      {
        id: 's-notes', title: 'My notes - and downloading them', icon: 'pencil',
        intro: 'Every note you write on a page of an eNote, a library book or a past paper is kept in one place.',
        steps: ['While reading, tap the summary tab at the foot of a page and write what you understood.', 'Open My notes and pick a subject - your notes are grouped by topic, each one on its own page.', 'Delete a note you no longer need with the Delete button on its page.', 'Tap Download PDF to save them to your phone or computer - they are yours to keep, even after you finish school.'],
        tips: ['Search or filter first to download just one subject.']
      },
      {
        id: 's-questions', title: 'Asking a question on an eNote', icon: 'chat',
        steps: ['While reading, tap the speech-bubble button at the top.', 'Write your question - tick "About page" to say which page.', 'Classmates and your teacher answer; the teacher can mark the best answer.', 'You get a notification when someone answers.'],
      },
      {
        id: 's-exams', title: 'Exam plan and countdown', icon: 'target',
        steps: ['When your school adds an exam for your class, your dashboard shows the days left.', 'Exam plan lists what to revise each week - the topics you scored lowest on first.', 'Tap Revise to open the topic\'s eNotes, and tick each topic when you have revised it.'],
      },
      {
        id: 's-notices', title: 'The noticeboard', icon: 'speaker',
        steps: ['New notices show on your dashboard and on the Noticeboard.', 'Open a notice to read it - your teacher can see that you have read it.'],
      },
      {
        id: 's-more', title: 'Reports, achievements and chats', icon: 'trophy',
        steps: ['Reports shows your end-of-term report cards once your class teacher generates them.', 'Achievements shows your badges and your class growth board - improvement counts, not just top marks.', 'Academic History lists every class and year you\'ve been part of.', 'Chats lets you message your teachers and classmates, with photos and voice notes.'],
      }
    ]
  },
  {
    key: 'teacher',
    label: 'Teachers',
    blurb: 'Creating content, setting and marking assessments, and following every class.',
    topics: [
      {
        id: 't-dashboard', title: 'Your dashboard', icon: 'sparkles',
        steps: ['The banner at the top sums up your day; below it, today\'s timeline shows your lessons and live classes in order.', 'Marking shows how many scripts are waiting and opens the next one - or says you\'re all caught up.', '"Needs a word" lists learners who may be slipping, from Early warning.', '"Your classes" shows each class\'s hand-in and reading rates and this week\'s topics.', '"Recently" scrolls through the latest submissions, finished eNotes and messages.'],
      },
      {
        id: 't-classes', title: 'My Classes and Student View', icon: 'users',
        steps: ['My Classes shows every stream with its students, results and work to mark - "Yours" marks the ones you teach.', 'Open a stream for its students, assessments, eNotes reading and progress.', 'Tap a student to see their report, message them or de-enrol them from your account.', 'Student View shows any of your classes exactly as its students see it.'],
      },
      {
        id: 't-enotes', title: 'Writing eNotes', icon: 'document',
        steps: ['Open eNotes and choose New topic. Pick the subject, class and (ideally) the curriculum topic.', 'Add pages: text, pictures, equations, tables and more. Add narration if you like.', 'Design a cover, then Publish when it\'s ready.', 'Use Duplicate to give the same topic to other streams - copies stay linked.', '"Who\'s reading" and Reading insights show who has opened it and the pages students stop on.'],
        tips: ['Share with colleagues to let others in your department copy a topic.']
      },
      {
        id: 't-content', title: 'eLibrary, Item Bank and Videos', icon: 'upload',
        steps: ['Choose Add (or Upload) and drop in a PDF, slides or a video.', 'Pick the subject and class - a whole class level or one stream.', 'Publish to put it on students\' shelves; keep it as a draft until it\'s ready.', 'The reach bar on each item shows how many students have opened or watched it - tap it for the list.'],
        tips: ['Book covers: add your own picture when you upload, use the first page of the file, or choose Design a cover to pick a suggested design and edit its words and colours.']
      },
      {
        id: 't-live', title: 'Live classes', icon: 'video',
        steps: ['Choose Schedule class, set the time, class and whether to record.', 'Students see it under Coming up and get a reminder.', 'Tap Start when it\'s time; the Live now banner shows Join, Attendance and End.', 'Past classes keep attendance and recordings; "Schedule again" repeats a lesson a week later.'],
      },
      {
        id: 't-assess', title: 'Setting assessments', icon: 'pencil',
        intro: 'The Assessments page groups your work by what needs you: Waiting to be marked, Open now, Opening soon, Drafts, Closed.',
        steps: ['Choose New assessment and pick its kind: LOA, AOI or EOC.', 'Link it to the learning outcomes, topic or construct it assesses.', 'Add questions - multiple choice, typed, drawn, annotated PDFs or file uploads - with marks.', 'Set when it opens and closes, and whether late work is allowed.', 'Publish to send it to the class.'],
        tips: ['Linking assessments to the curriculum is what fills in the Learning Map and report cards.']
      },
      {
        id: 't-marking', title: 'Marking', icon: 'check-circle',
        steps: ['Tap "Mark N" on an assessment (or a script on your dashboard).', 'Mark each answer on screen - you can write on drawings and PDFs.', 'Add feedback, then return the script to the student.', 'Returned results update the student\'s Learning Map straight away.'],
      },
      {
        id: 't-insight', title: 'Learning Map, coverage and engagement', icon: 'map',
        steps: ['Class Learning Map shows each outcome for a stream - "Reteach next" lists the ones most students need help with.', 'Create a support group from any outcome to send revision to the students who need it.', 'Coverage shows which topics still need an assessment, an AOI, EOCs or eNotes.', 'Engagement shows who is reading, watching and attending - message the quiet ones.'],
      },
      {
        id: 't-warning', title: 'Early warning', icon: 'warning',
        intro: 'The learners in your classes who may be slipping, before the report card shows it.',
        steps: ['Open Early warning from the menu.', 'Each learner shows why: low results (under 50%), falling results this term, gone quiet (not signed in for 14 days) or 2+ missed deadlines.', 'Tap a figure at the top to see only that kind; pick a class to narrow it down.', 'Message a learner straight from the list.'],
        tips: ['"Never signed in" is kept apart - those learners need their login, not a nudge.']
      },
      {
        id: 't-comments', title: 'Your comment bank for marking', icon: 'chat',
        steps: ['Under every feedback box, tap a saved comment to add it.', 'Wrote something you\'ll use again? Tap + Save.', 'Tap All to search your comments or delete ones you don\'t need. The ones you use most come first.'],
      },
      {
        id: 't-scheme', title: 'Scheme of work', icon: 'clipboard',
        steps: ['Open Scheme of work, pick the subject and the class.', 'Give each topic a week - or tap Auto-plan to spread the unplanned ones over the rest of their term.', 'Tick a topic when you have taught it. Topics whose week has passed without a tick show as Behind.', 'Each topic shows what already covers it: eNotes, outcomes assessed and an AOI.'],
      },
      {
        id: 't-questions', title: 'Student questions on eNotes', icon: 'chat',
        steps: ['Student questions lists questions on your eNotes that still need an answer.', 'Open one to answer it - or mark a classmate\'s good answer as the best.', 'You can also open the questions from the speech-bubble button while previewing a topic.'],
      },
      {
        id: 't-notices', title: 'Posting a notice', icon: 'speaker',
        steps: ['Open Noticeboard and tap Post a notice.', 'Choose one of your classes (or all its streams), write the notice, and post.', 'Open your notice to see how many have read it - and who hasn\'t yet.'],
      },
      {
        id: 't-results', title: 'Marksheets, physical exams and report cards', icon: 'chart',
        steps: ['Marksheets: every mark for a class and subject, with averages and grades - Download CSV for a spreadsheet.', 'Physical Exams: record a test sat on paper, type in the marks (Enter moves to the next learner) and choose if it counts on report cards.', 'Report Cards: class teachers generate a full report for each learner - or all missing ones at once - then print.', 'UNEB assessment: each learner\'s Activities of Integration, CA score and evidence for your subjects, and what is still missing before the UNEB deadline.'],
      }
    ]
  },
  {
    key: 'hod',
    label: 'HODs',
    blurb: 'Leading a department: approvals, coverage and results across classes.',
    topics: [
      {
        id: 'h-overview', title: 'Your department at a glance', icon: 'chart',
        steps: ['The HOD dashboard summarises teachers, classes, content and results in your department.', 'Performance and mastery views compare classes and subjects.', 'Marksheets and Physical Exams work across every class in the department.'],
      },
      {
        id: 'h-warning', title: 'Early warning for the department', icon: 'warning',
        steps: ['Early warning lists learners across your whole department with low or falling results, who have gone quiet, or who are missing deadlines.', 'Filter by class or by signal, and message a learner from the list.'],
      },
      {
        id: 'h-approve', title: 'Approving content', icon: 'check-circle',
        steps: ['Open Approvals to see eLibrary books and other content waiting for review.', 'Open an item to check it, then approve it (or send it back).', 'Approved content appears on students\' shelves.'],
      },
      {
        id: 'h-content', title: 'Books, videos and past papers for the department', icon: 'upload',
        intro: 'eLibrary, Videos and Item Bank work just like a teacher\'s - and what you add can go to the whole department.',
        steps: ['Open eLibrary (or Videos, or Item Bank) and choose Add.', 'Choose who gets it: the whole department, every stream of one class, or a single stream.', 'Design a cover for a book, or use your own picture.', 'Teachers\' uploads in your department show here too, with who added them.'],
      },
      {
        id: 'h-uneb', title: 'UNEB school-based assessment', icon: 'clipboard',
        steps: ['Open UNEB assessment, pick the subject, class and stream.', 'Each learner shows their LIN, Activities of Integration marked, the continuous-assessment (CA) score, project and evidence.', 'Status shows what is still missing: no LIN, missed work, or AOIs still to mark.', 'Use Import LINs to add learners\' UNEB numbers from a spreadsheet, then Export for the submission file.'],
      },
      {
        id: 'h-teach', title: 'Teaching your own classes', icon: 'teacher',
        intro: 'An HOD who also teaches can switch to the teacher view and use every teacher module for their own classes.',
      }
    ]
  },
  {
    key: 'admin',
    label: 'Admins',
    blurb: 'Setting up and running the school\'s eSpace.',
    topics: [
      {
        id: 'a-setup', title: 'Setting up the school', icon: 'wrench',
        steps: ['Add academic years and terms, and mark the current one.', 'Add classes and their streams (e.g. S.1 A, S.1 B).', 'Add departments and their subjects.', 'Set the school details and crest under Settings - they appear on report cards.'],
      },
      {
        id: 'a-people', title: 'Accounts and enrolment', icon: 'users',
        steps: ['Add students, teachers and HODs (teachers can also be imported from a spreadsheet).', 'Assign teachers to departments and HODs to lead them.', 'Enrol students in their class and departments.', 'Reset passwords when someone is locked out; teachers then choose their own.'],
      },
      {
        id: 'a-supervise', title: 'Supervising departments and teachers', icon: 'target',
        intro: 'Supervision follows up teaching across the school, one term at a time - down to each teacher and each assessment.',
        steps: ['Open Supervision and pick the term. The figures at the top count the teachers to follow up - tap one to list only those teachers.', 'Each department card shows work set, scripts waiting to be marked, how many learners handed in, and teachers who have set nothing. Tap a card for just that department\'s teachers.', 'Tap a teacher to see every assessment they set: handed in, waiting to be marked (and for how long), and marked.', 'Tap "didn\'t hand in" on an assessment for those learners by name, class and admission number.', 'Send a reminder notifies the teacher - the message is already written from what needs following up, and you can change it.'],
        tips: ['A teacher is flagged when they have set nothing this term, have scripts waiting more than 7 days, fewer than half their learners hand in, or have not signed in for 14 days.']
      },
      {
        id: 'a-content', title: 'The school\'s eLibrary, videos and past papers', icon: 'book',
        steps: ['Open eLibrary (or Videos, or Item Bank) and choose Add.', 'Pick the department, then who gets it: the whole department, every stream of one class, or a single stream.', 'Give a book a cover: your own picture, the first page of the file, or Design a cover to choose a suggested design and edit it.', 'Everything teachers and HODs upload is listed here as well.'],
      },
      {
        id: 'a-uneb', title: 'UNEB school-based assessment', icon: 'clipboard',
        steps: ['Open UNEB assessment and choose Settings: enter the centre number, what the CA score is out of, and the submission deadline.', 'Pick a subject and class to see every learner\'s Activities of Integration, CA score, project and evidence.', 'The figures at the top show who is not ready yet - no LIN, missed work, or AOIs still to mark.', 'Import LINs from a spreadsheet, then Export the class when everyone is ready.'],
        tips: ['The deadline shows on the page as a countdown - amber in the last two weeks.']
      },
      {
        id: 'a-year', title: 'Promotion and the new year', icon: 'clock',
        steps: ['At the end of the year, use Promotion to move students up to their next class.', 'Their history stays in Academic History.', 'Open the new year\'s first term to start fresh.'],
      },
      {
        id: 'a-run', title: 'Reports, analytics and logs', icon: 'chart',
        steps: ['Report Cards: generate and publish end-of-term reports.', 'Engagement and analytics show activity across the whole school.', 'Rewards & Badges sets the rules for achievements.', 'Demo requests lists schools that asked for a demo on the website.', 'System Logs shows sign-ins; Backup keeps copies of the data.'],
      },
      {
        id: 'a-parents', title: 'Parents and the weekly update', icon: 'users',
        intro: 'Give a parent or guardian a private, read-only link to their child\'s week - no account or password.',
        steps: ['Open Parents and tap Add a parent. Find the learner, then type the parent\'s name - and their email for the weekly email.', 'The link is copied for you: send it to the parent by SMS or email.', 'The page shows what was read and handed in this week, results, outcomes achieved and what is due next.', 'Turn off a link at any time - it stops working at once, and the email stops too.'],
        tips: ['Send this week\'s now emails every parent who hasn\'t had one today. For a weekly email on its own, ask whoever runs the server to add the weekly job.']
      },
      {
        id: 'a-notices', title: 'Noticeboard and exam dates', icon: 'speaker',
        steps: ['Noticeboard: post to everyone, all students, all staff, or a class - pin important ones to the top, and set a date for it to come down.', 'Exam dates: add each exam (for one class or every class). Students then see a countdown and a week-by-week revision plan.'],
      }
    ]
  }
]
