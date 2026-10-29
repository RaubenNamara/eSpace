/**
 * The Tusome user guide (/guide): one part per role, each a list of short how-tos. Plain data, so
 * the guide page can search it and new sections are easy to add.
 */
import { SUPPORT_EMAIL } from './site'

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
    blurb: 'Signing in, finding your way around, and using Tusome on a phone.',
    topics: [
      {
        id: 'sign-in', title: 'Signing in', icon: 'users',
        intro: 'Your school gives you your account - a username (or email) and a password.',
        steps: ['Open your school\'s Tusome address and choose Sign in.', 'Enter your username or email, and your password.', 'Teachers given a temporary password are asked to choose a new one straight away.', 'Forgot your password? Choose "Forgot password" on the sign-in page and follow the email.'],
        tips: ['Sign out on shared computers - your account opens your marks and messages.']
      },
      {
        id: 'layout', title: 'Finding your way around', icon: 'map',
        intro: 'Everything you can use is in the menu on the left. On a phone, students have a bar at the bottom - Home, Learn, Work, Chats and More (More opens the full menu); everyone else taps the ☰ button.',
        steps: ['The dashboard is your home page - what needs you today, in small cards. Each card shows a few things; tap "Show more" to open it up.', 'The search box at the top finds notes, assessments and books by name.', 'The bell shows notifications; the speech bubble opens your chats.', 'Tap your name (top right) for your profile, password and sign out.'],
        tips: ['The moon/sun button switches between dark and light mode.', 'Most lists remember the class and filters you last used.', 'User guide and Support are at the bottom of the menu, and in the menu under your name.']
      },
      {
        id: 'phone', title: 'Using Tusome on a phone', icon: 'keyboard',
        intro: 'Tusome works in the browser on any phone - nothing to install.',
        steps: ['Open Tusome in Chrome (or your phone\'s browser) - on the school website, tap the Sign in button at the bottom right.', 'Use the browser menu\'s "Add to Home screen" (or "Install app") to open it like an app, on phones and iPads.', 'On small screens, filters fold into a Filters button at the top of each page, and long lists become short cards.', 'Some lists on the dashboard (like the learners who need attention) slide sideways - swipe to see more.'],
        tips: ['When the school updates Tusome, the app picks up the new version as soon as you open it.']
      },
      {
        id: 'offline', title: 'Working offline', icon: 'download',
        intro: 'Notes and books can be saved to your device and read with no internet at all.',
        steps: ['On an eNote or book, choose Save for offline.', 'Open Downloads to see everything saved on this device and how much space it uses.', 'Read, highlight and write notes as usual when offline.', 'When you\'re back online, your notes and highlights are sent automatically.'],
        tips: ['Saved copies are kept for 30 days and renewed whenever you\'re online.']
      },
      {
        id: 'help', title: 'Getting help', icon: 'chat',
        intro: `Stuck? This guide is open from the menu at any time (User guide). For anything else, here is who to ask.`,
        steps: [
          'Your account, password, class or subjects: ask your school\'s Tusome administrator - they can reset a password or move you to the right class straight away.',
          'Your work, marks or a lesson: ask your teacher, or message them in Chats.',
          `Something in Tusome is not working: write to Tusome support at ${SUPPORT_EMAIL} (Support, at the bottom of the menu, opens an email for you).`,
          'In your email, say your school, whether you are a student, teacher, HOD or admin, the page you were on and what happened - a screenshot helps a lot.'
        ],
        tips: ['Never send your password to anyone, support included - Tusome support will never ask for it.']
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
        intro: 'Open Tusome and your dashboard shows what matters today, in a few small cards.',
        steps: ['The school\'s notices slide across the top - tap one to read it in full.', 'Pending assessments lists the work waiting for you, overdue first, with a Start button on each.', 'Jump in takes you straight to eNotes, Live classes, the eLibrary, the Item Bank and more - tap "Show more" for the rest.', 'My classes shows your subjects; My notes shows the notes you wrote most recently.', 'If a live class has started, a red banner at the top lets you join in one tap.'],
      },
      {
        id: 's-enotes', title: 'Reading eNotes', icon: 'document',
        intro: 'eNotes are your teachers\' notes, read page by page like a book.',
        steps: ['Open eNotes and tap a topic on the shelf (or "Continue reading").', 'Turn pages with Previous and Next, or by swiping from the edge of the page.', 'Tap the speaker to listen to a page read aloud.', 'Select text to highlight it in a colour - only you see your highlights.', 'Every page has its own "Add my summary" tab at its foot - two pages side by side each have one. Tap it to write what you understood from that page.', 'Tusome remembers your page, so you can carry on next time.'],
        tips: ['The summary tabs stay in view at the foot of the book, even on a long page - you never have to scroll down to find them.', 'Some pages end with a quick assessment on that page\'s learning outcome - try it while it\'s fresh.']
      },
      {
        id: 's-library', title: 'eLibrary, Item Bank and Videos', icon: 'book',
        steps: ['eLibrary holds textbooks and slides; Item Bank holds past papers and practice packs.', 'Tap a book to open it in the reader. Each page on show has its own "Add my note" tab - tap it to write as you read.', 'Zoom in for small print; your note tabs stay in place while the page scrolls under them.', 'Videos play in the browser - some can be saved to watch offline.', 'Books your teacher allows can be downloaded.'],
        tips: ['Find the page hard to read? The Reading focus colour button lays a soft colour over the whole page, all the way down as you scroll.']
      },
      {
        id: 's-ictlab', title: 'The ICT Lab', icon: 'keyboard',
        intro: 'Hands-on computer activities in 3D. Start with the computer lab rules, then the Parts and devices showroom (every part inside a computer and 22 everyday devices - input, output, storage, networking and power, laptops and tablets), Connecting a computer, Parts of a computer, Assembling one, Cleaning a dusty one, Troubleshooting real faults, and terminating a network cable - one step at a time.',
        steps: ['Open Virtual Lab in the menu, then ICT Lab.', 'Start with Computer lab rules: tap each of the 12 rules to see why it matters, then choose Check what I know and decide whether each situation is allowed. 80% earns your lab pass.', 'In the showroom, pick a group (Inside the computer, Input, Output, Storage, Communication & power, Computers) and a device. Drag to turn it, pinch or scroll to zoom, and read what it does and how it connects.', 'Tap a numbered dot on a part to fly in close and read what that detail is - the processor socket, the memory slots, a mouse\'s scroll wheel. Labels hides the numbers; Turn starts or stops it turning.', 'Choose Test yourself for 10 questions: name the part on the stand, pick the part that does a job, and name a marked detail on the motherboard.', 'Boot-up and BIOS: press the power button and watch each stage of starting up. Then fix two faults: "no boot device" (restart, press Del while the start-up screen shows, put the SSD first in the boot order on the Boot tab, then F10 to save) and a clock that resets (F1, set the date and time, and decide what fixes it for good).', 'Laptop repair: "No bootable device" is a whole repair job in 6 stages. Find the cause: read the screen, look in the BIOS, check the boot order and ask what happened, then decide what is wrong - and see every reason a laptop can say this. Toolkit: pick the right tools (and leave the hammer), then choose the SSD that matches the sticker under the laptop. Open and repair in 3D: unplug, strap on, undo the screws (one hides under a rubber foot), pry the panel, disconnect the battery first, swap the SSD, clean the fan, close it up and test. Then make a Windows installer USB on another PC with Microsoft\'s Media Creation Tool, and install Windows on the laptop screen by screen - boot menu, Custom install, the empty drive, first-time setup and updates. A short check ends it.', 'Is it safe online? has 3 parts: sort an inbox into safe messages and scams (tap anything suspicious, and tap a link to see where it really goes), judge websites from their address bar, and test passwords with the strength meter - try made-up ones, nothing is saved.', 'Play Spot the hazard: a computer lab in 3D with 8 dangers hidden round it. Drag to look around, zoom in, and tap each one within 2 minutes - each tells you what is wrong and what to do. Things done right are there too; tapping them costs points. Hint shows a ring round one you have not found.', 'Open Inside a computer and press any letter: follow it in 3D from the keyboard, down the cable, along the motherboard to the processor, memory and graphics card, onto the monitor - and, when you save, to the hard disk. Each stop is marked Input, Process, Output or Storage; five questions at the end check what you learnt.', 'Pick an activity and a level: Simple shows you what to use, Intermediate gives the steps without pointers, Advanced gives harder tasks.', 'Read the step, then do it - tap the part, pick a part from the tray and tap where it goes, or use the tool. When you get it right the step is ticked and the next one appears.', 'Connecting a computer: drag a cable\'s plug onto the port it goes in at the back of the computer (or tap the plug, then the port) (HDMI for the monitor, USB for the keyboard and mouse, green for speakers, pink for a microphone, the LAN port for the network cable). Plug in at the wall and switch on last, then press the power button - and watch the monitor start up. A plug let go anywhere else goes back to its place.', 'A wrong move counts as a mistake and tells you why. A hint costs 3 points, a mistake 5 - but after two tries on a step (or a long time stuck) the hint shows by itself, free, and what to use glows.', 'Drag to turn the computer round, pinch or scroll to zoom. In Assembling, drag a part from the desk into the case.', 'In Cleaning, choose the air can or the electric blower - the electric one must be plugged into the wall socket and switched on (the computer stays unplugged). Then press and hold on the dust.', 'At the end you see your score; your best score for each level shows on the ICT Lab page.'],
        tips: ['"Read about this" on a step opens the page of your teacher\'s eNotes that explains it.', 'At Advanced the ports have no names - match each plug by its shape and colour.']
      },
      {
        id: 's-anatomy', title: 'The Anatomy Explorer', icon: 'beaker',
        intro: 'A real 3D model of the human body for biology - turn it, zoom in and click any part to read what it does.',
        steps: ['Open Virtual Lab in the menu, then Anatomy Explorer.', 'Choose a body system to show (skeleton, muscles, heart and blood vessels and more), search for a part, or open a system on its own.', 'Click a part to read its name and what it does.', 'Open the heart close-up to watch it pump - the valves and the blood flowing, inside and outside.', '"Modules, tours & quizzes" has step-by-step tours and quizzes on each system.']
      },
      {
        id: 's-live', title: 'Joining live classes', icon: 'video',
        steps: ['Open Live Classes - "Next up" shows the next lesson and how long until it starts.', 'When the teacher starts the lesson, a red Live now banner appears with Join now.', 'The lesson opens in a new tab; close it when you\'re done.', 'Missed one? Look under Past classes - recorded lessons have a Watch button.'],
      },
      {
        id: 's-assess', title: 'Attempting assessments', icon: 'pencil',
        intro: 'Assessments are grouped by what needs doing: Overdue, In progress, To do, Waiting for marks, Marked.',
        steps: ['Open Assessments and tap Start (or Continue for one you began).', 'Answer each question - type, choose, draw or upload as the question asks.', 'Your answers are saved as you go, so you can come back.', 'Tap Submit when you\'re finished. You can\'t change answers after submitting.', 'When it\'s marked, tap See result for your score and your teacher\'s feedback.'],
        tips: ['When a teacher sets a new assessment you get a notification, it shows under Pending assessments on your dashboard, and a red number on Assessments in the menu (Work on a phone) counts the new ones you have not started.', 'LOA, AOI and EOC show what kind of assessment it is - each one counts on your Learning Map.', 'Late work can only be handed in if your teacher allows it.']
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
        id: 's-notices', title: 'Notices from the school', icon: 'speaker',
        steps: ['Notices slide across the top of your dashboard; new ones say NEW and the label shows how many.', 'Tap a notice to read it in full underneath - that counts as read, and your teacher can see you have read it.', 'Rest a finger or the pointer on the notices to stop them moving.']
      },
      {
        id: 's-more', title: 'Achievements, history and chats', icon: 'trophy',
        steps: ['Achievements shows your badges and your class growth board - improvement counts, not just top marks.', 'Academic History lists every class and year you\'ve been part of.', 'Chats lets you message your teachers and classmates, with photos and voice notes.']
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
        intro: 'Your day in a few small cards - each shows a few things and opens up with "Show more".',
        steps: ['The school\'s notices slide across the top; tap one to read it.', 'To mark lists each assessment with scripts waiting, with a Mark button - "Mark next" opens the oldest script.', 'Jump in goes straight to Assessments, eNotes, Live classes, My week, the Marksheet and more.', 'Today shows your live lessons and the assessments closing soon.', 'Need attention lists learners who may be slipping, from Early warning, each with a Message button. On a phone, swipe sideways through them.', 'My classes shows each class with how many learners need support - tap one for its Learning Map.'],
        tips: ['Tap the students figure beside your department\'s name to see everyone enrolled.']
      },
      {
        id: 't-classes', title: 'My Classes and Student View', icon: 'users',
        steps: ['My Classes shows every stream with its students, results and work to mark - "Yours" marks the ones you teach.', 'Open a stream for its students, assessments, eNotes reading and progress.', 'Tap a student to see their report, message them or de-enrol them from your account.', 'Student View shows any of your classes exactly as its students see it.'],
      },
      {
        id: 't-enotes', title: 'Writing eNotes', icon: 'document',
        steps: ['Open eNotes and choose New topic. Pick the subject, the class stream(s) and (ideally) the curriculum topic.', 'Add pages: text, pictures, equations, tables and more. Add narration if you like.', 'Design a cover, then Publish when it\'s ready.', 'Use Duplicate to give the same topic to other streams. Streams that already have it are greyed out, so a stream never gets it twice.', 'Copies of a published topic can be published straight away or kept as drafts. When a topic has draft copies, "Publish them" publishes them all in one click and tells the students.', 'The topic\'s LOA and AOI reach every stream that has a published copy.', '"Who\'s reading" and Reading insights show who has opened it and the pages students stop on.'],
        tips: ['Share with colleagues to let others in your department copy a topic.',]
      },
      {
        id: 't-content', title: 'eLibrary, Item Bank and Videos', icon: 'upload',
        steps: ['Choose Add (or Upload) and drop in a PDF, slides or a video.', 'Pick the subject and class - a whole class level or one stream.', 'Publish to put it on students\' shelves; keep it as a draft until it\'s ready.', 'The reach bar on each item shows how many students have opened or watched it - tap it for the list.'],
        tips: ['Book covers: add your own picture when you upload, use the first page of the file, or choose Design a cover to pick a suggested design and edit its words and colours.']
      },
      {
        id: 't-ictlab', title: 'The ICT Lab and linking it to your notes', icon: 'keyboard',
        steps: ['Open Virtual Lab in the menu, then ICT Lab. Try any activity at any level - your own runs are not saved.', 'Computer lab rules comes first for students: 12 rules, then situations to judge. A student who scores 80% has a lab pass, shown on their ICT Lab page.', 'The Parts and devices showroom shows every part and 22 devices in HD 3D, with numbered details to fly in to - useful on a projector when teaching input, output, storage and networking. Test yourself checks what students know.', 'Beside every step is a page icon. Tap it to link that step to one of your eNotes - the whole topic, or one page.', 'Students on that step then see "Read about this", which opens your page. A link works at every level.', 'Students\' best scores for each activity and level are kept as they finish.'],
        tips: ['Each student\'s best Test yourself and lab rules scores are kept like any activity.', 'The Anatomy Explorer (Virtual Lab, then Anatomy Explorer) gives biology lessons a 3D human body, with tours and quizzes.']
      },
      {
        id: 't-ictlab-results', title: 'ICT Lab results and setting a practical', icon: 'clipboard',
        intro: 'See how far each learner has got in the ICT Lab, and set a class a practical to do - like an assessment.',
        steps: ['Open ICT Lab and choose Class results, then pick the class.', 'Every practical has a column: the learner\'s best score, or for a practical in parts (Start-up and shut-down, Laptop repair, Is it safe online?) the parts done until they are all done. Green is 80% or more.', 'Choose Set a practical: pick the practical, the level for a step-by-step one, the classes, a due date and a note if you like, then Set it.', 'Every learner in those classes is told, and it shows at the top of their ICT Lab under Set by your teacher - overdue ones in red.', 'Under Set for the class, each practical shows how many have done it and the average; tap "not done yet" for those learners by name. Only attempts made after you set it count.', 'The bin removes a practical you set from the class\'s list; the learners\' scores stay.']
      },
      {
        id: 't-department', title: 'Your colleagues\' work', icon: 'users',
        intro: 'eNotes, eLibrary, Item Bank and Videos each have two tabs: your own work, and Department - everything the other teachers in your department have added.',
        steps: ['Open Department on any of the four pages: the work is grouped by teacher, with its class and whether it is published.', 'Read, Open or Play opens it - a colleague\'s eNote opens in the reader, their book in the book viewer.', 'You can only change your own work. If your HOD lets you edit colleagues\' work, Edit and Delete appear beside theirs too.'],
        tips: ['Want a colleague\'s eNote for your own class? Use Shared by colleagues to copy it - the copy is yours to change.']
      },
      {
        id: 't-live', title: 'Live classes', icon: 'video',
        steps: ['Choose Schedule class, set the time, class and whether to record.', 'Students see it under Coming up and get a reminder.', 'Tap Start when it\'s time; the Live now banner shows Join, Attendance and End.', 'Past classes keep attendance and recordings; "Schedule again" repeats a lesson a week later.'],
      },
      {
        id: 't-assess', title: 'Setting assessments', icon: 'pencil',
        intro: 'The Assessments page groups your work by what needs you: Waiting to be marked, Open now, Opening soon, Drafts, Closed.',
        steps: ['Choose New assessment and pick its kind: LOA, AOI or EOC.', 'Link it to the learning outcomes, topic or construct it assesses.', 'Add questions - multiple choice, typed, drawn, annotated PDFs or file uploads - with marks.', 'Set when it opens and closes, and whether late work is allowed.', 'Publish to send it to the class.'],
        tips: ['A draft saves itself a few seconds after each change - the line under the title says when it was last saved. A new assessment starts saving once it has a due date and a question with marks. A published one saves only when you press Save, so students never see half-made changes. If the internet goes off or the page closes first, your work is kept on that device and offered back ("Restore it") the next time you open the assessment.', 'Linking assessments to the curriculum is what fills in the Learning Map and report cards.','Catching up or working ahead? Under Curriculum Alignment, "Counts in" is the term whose marks and report cards it goes into (the current term), and "Topic from" can be any year, class and term - an S.5 topic for your S.6 class, last term\'s topic, or next term\'s. The topic shows on the class\'s Learning Map, marked "From S.5 · 2025".']
      },
      {
        id: 't-marking', title: 'Marking', icon: 'check-circle',
        steps: ['Tap "Mark" on an assessment (or on your dashboard\'s To mark card).', 'Mark each answer on screen - write on drawings and PDFs in red, blue or green ink with the tools beside the part\'s label.', 'Your marks save as you go - "Marks saved" pops up to say so.', 'Add feedback, then return the script to the student.', 'Returned results update the student\'s Learning Map straight away.']
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
        id: 't-chat', title: 'Chats', icon: 'chat',
        steps: ['Open Chats (the speech bubble at the top, or Chats in the menu).', 'Tap the new chat button to message a colleague, a student, or one of your classes - a class message goes to its group chat, which every student in it sees.', 'Send photos, files and voice notes; grey ticks mean delivered, blue ticks read.', 'Your HOD can message you, or every teacher in the department at once - that is your department\'s teachers group, and you can reply in it.'],
        tips: ['Clear chat removes the messages from your view only.']
      },
      {
        id: 't-notices', title: 'Posting a notice', icon: 'speaker',
        steps: ['Open Noticeboard and tap Post a notice.', 'Choose one of your classes (or all its streams), write the notice, and post.', 'It slides across the top of your students\' dashboards until they read it.', 'Open your notice to see how many have read it - and who hasn\'t yet.']
      },
      {
        id: 't-results', title: 'Marksheets and physical exams', icon: 'chart',
        steps: ['Marksheets: every mark for a class and subject, with averages and grades - Download CSV for a spreadsheet.', 'Physical Exams: record a test sat on paper, type in the marks (Enter moves to the next learner) and choose if it counts on report cards.', 'Report cards are made by the school\'s admin.'],
      }
    ]
  },
  {
    key: 'hod',
    label: 'HODs',
    blurb: 'Leading a department: your teachers, coverage and results across classes.',
    topics: [
      {
        id: 'h-overview', title: 'Your department at a glance', icon: 'chart',
        steps: ['The dashboard shows the assessments set lately, and shortcuts to the Term report, Assessments, Marksheet and Analytics.', 'Need attention counts the learners who may be slipping, by reason.', 'Teachers shows who was in this week and how many scripts each has waiting.', 'Curriculum mastery and class comparisons are in the Term report and Analytics.', 'Marksheets and Physical Exams work across every class in the department.']
      },
      {
        id: 'h-marking', title: 'Who has marked what', icon: 'check-circle',
        intro: 'Marking shows every teacher in your department this term - what they set for the department\'s subjects, how much they have marked, and what is still waiting.',
        steps: ['Open Marking (under Assessment in the menu) and pick the term.', 'Each teacher shows scripts handed in, marked (out of everything handed in, with a bar), and still to mark with the oldest one\'s age - amber when a script has waited more than 7 days.', 'The figures at the top - all marked, still marking, scripts over 7 days, set nothing - list just those teachers when you tap them.', 'Tap a teacher for each assessment: handed in, marked and waiting. See the scripts and marks opens the submissions with each learner\'s mark; "didn\'t hand in" lists those learners by name.', 'Send a reminder notifies the teacher, with a message already written from what needs following up.'],
        tips: ['Assessments now shows, for every assessment, how many are marked, how many are still to mark and when it was last marked.']
      },
      {
        id: 'h-term-report', title: 'The term report for staff meetings', icon: 'document',
        steps: ['Open Term report and pick the term.', 'It shows the department\'s figures, every class\'s streams side by side (streams behind are marked), curriculum mastery, the learners who need attention and what each teacher has done.', 'Press Print - the app\'s menus are left off the page.'],
        tips: ['Analytics and Engagement show the same department in charts, and who is reading, watching and attending.']
      },
      {
        id: 'h-warning', title: 'Early warning for the department', icon: 'warning',
        steps: ['Early warning lists learners across your whole department with low or falling results, who have gone quiet, or who are missing deadlines.', 'Filter by class or by signal, and message a learner from the list.'],
      },
      {
        id: 'h-content', title: 'Books, videos and past papers for the department', icon: 'upload',
        intro: 'eLibrary, Videos and Item Bank work just like a teacher\'s - and what you add can go to the whole department.',
        steps: ['Open eLibrary (or Videos, or Item Bank) and choose Add.', 'Choose who gets it: the whole department, every stream of one class, or a single stream.', 'Design a cover for a book, or use your own picture.', 'Teachers\' uploads in your department show here too, with who added them.'],
      },
      {
        id: 'h-editors', title: 'Who may edit colleagues\' work', icon: 'users',
        intro: 'Every teacher in your department sees the eNotes, books, papers and videos the others have added - but changes only their own.',
        steps: ['Open Teachers.', 'Turn on Edit colleagues\' work for a teacher who should be able to change everyone\'s work in the department - for example a subject lead.', 'The teacher is told, and Edit and Delete appear for them on the Department tab of each page. Turn it off to take it back.']
      },
      {
        id: 'h-teach', title: 'Teaching your own classes', icon: 'teacher',
        intro: 'An HOD who also teaches can switch to the teacher view and use every teacher module for their own classes.',
      },
      {
        id: 'h-chat', title: 'Messaging your teachers', icon: 'chat',
        steps: ['Open Chats and tap the new chat button.', 'Choose Teachers to message one teacher in your department, or All teachers to write to every teacher at once - it opens your department\'s teachers group, and everyone in it can reply.', 'A new teacher in the department joins the group the next time you open it.'],
        tips: ['You only see the chats you are in - other people\'s chats stay private.', 'On the dashboard and the Teachers page, a green dot means the teacher is online now; grey shows when they were last on.']
      }
    ]
  },
  {
    key: 'admin',
    label: 'Admins',
    blurb: 'Setting up and running the school\'s Tusome.',
    topics: [
      {
        id: 'a-setup', title: 'Setting up the school', icon: 'wrench',
        steps: ['Add academic years and terms. The current term follows the calendar - when a term starts it becomes the current one by itself (you can turn that off on Terms).', 'Add classes and their streams (e.g. S.1 A, S.1 B).', 'Add departments and their subjects.', 'Set the school details and crest under Settings - they appear on report cards.'],
      },
      {
        id: 'a-dashboard', title: 'Your dashboard and school activity', icon: 'sparkles',
        steps: ['Finish setting up lists what is still missing in the school\'s setup, each with a Fix button that takes you straight there.', 'Jump in: enrol students, see who is enrolled, Supervision, post a notice, Teachers, bulk enrolment, Reports and Settings.', 'Signed in this week and Enrolment show who is using Tusome and where the learners are.', 'School activity (Today, 7 days or 30 days) shows who signed in, when, from where and on what device, and what each teacher and HOD did - or "Viewed only".', 'Student sign-ins has the full list of students\' sign-ins.']
      },
      {
        id: 'a-people', title: 'Accounts and enrolment', icon: 'users',
        steps: ['Add students, teachers and HODs (teachers can also be imported from a spreadsheet).', 'Assign teachers to departments and HODs to lead them.', 'A super admin can remove anyone\'s profile photo - a wrong or unsuitable picture: open Edit on the student, teacher, HOD or admin and choose Remove photo. Their initials show until a new photo is uploaded.', 'Enrol students in their class and departments.', 'Reset passwords when someone is locked out; teachers then choose their own.', 'Suspend a teacher to stop them signing in at once (they are signed out everywhere) - their eNotes, assessments and other work stay for students.', 'Delete a teacher who has left: they can no longer sign in and their work disappears from Tusome, but students keep the marks they earned. Restore them, with their work, within 30 days if it was a mistake; after that it is gone for good.'],
      },
      {
        id: 'a-supervise', title: 'Supervising departments and teachers', icon: 'target',
        intro: 'Supervision follows up teaching across the school, one term at a time - down to each teacher and each assessment.',
        steps: ['Open Supervision and pick the term. The figures at the top count the teachers to follow up - tap one to list only those teachers.', 'Each department card shows work set, scripts waiting to be marked, how many learners handed in, and teachers who have set nothing. Tap a card for just that department\'s teachers.', 'The Marked column shows how much each teacher has marked out of everything handed in, with a bar, and when they last marked.', 'Tap a teacher to see every assessment they set: handed in, waiting to be marked (and for how long), and marked. Marks lists every script handed in with the learner\'s mark and when it was marked - or Not marked, and when it came in.', 'Tap "didn\'t hand in" on an assessment for those learners by name, class and admission number.', 'Send a reminder notifies the teacher - the message is already written from what needs following up, and you can change it.', 'Print report opens the teacher follow-up report for the term (or one department): who missed the marking deadline, who has not marked yet, who set nothing, whose learners are not handing in, classes with nothing set or published, and who has not signed in. Press Print - it comes out with the school\'s name and lines for the Director of Studies and the head teacher to sign.'],
        tips: ['A teacher is flagged when they have set nothing this term, have scripts waiting more than 7 days, fewer than half their learners hand in, or have not signed in for 14 days.']
      },
      {
        id: 'a-content', title: 'The school\'s eLibrary, videos and past papers', icon: 'book',
        steps: ['Open eLibrary (or Videos, or Item Bank) and choose Add.', 'Pick the department, then who gets it: the whole department, every stream of one class, or a single stream.', 'Give a book a cover: your own picture, the first page of the file, or Design a cover to choose a suggested design and edit it.', 'Everything teachers and HODs upload is listed here as well.'],
      },
      {
        id: 'a-bulk-enrol', title: 'Enrolling many students in a subject from a spreadsheet', icon: 'users',
        intro: 'For optional subjects: a workbook with a sheet per subject (a sitting plan or class list), each listing student names and streams.',
        steps: ['Open Bulk subject enrolment (under People) and choose the file. Check the class and the academic year.', 'Each sheet shows how many students it lists, with its subject already picked when the sheet name matches one - change it if needed. A sheet can go into more than one subject.', 'Press Check the names. Tusome finds each student in that class by name and stream, even with small spelling slips or the names in a different order.', 'Names it is not sure of are shown first: choose the right student from the list, or leave them out. Students already in the subject are skipped.', 'Press Enrol. Each student is enrolled under their own stream; running the same sheet again never enrols anyone twice.'],
        tips: ['The sheet needs a NAME (or NAMES) column and a STREAM column. Titles, room labels like "S.1A" and blank rows are skipped.']
      },
      {
        id: 'a-year', title: 'End of term, promotion and the new year', icon: 'clock',
        intro: 'End of term (in the menu, and on the dashboard in a term\'s last four weeks) lists what is left before the term closes.',
        steps: ['Marking finished: open the teacher report to see who still has scripts to mark.', 'Paper exam marks entered: every paper exam set to count on report cards needs a mark for each learner.', 'Report cards made: tap a class to open Reports with it chosen. Read the check at the top - each subject\'s assessments, how many learners have a mark, and who has none - then press Generate all. Download Class PDF puts the whole class in one file to print.', 'In the last term of the year, use Promotion to move students up to their next class. Their history stays in Academic History.', 'Add the next term on Terms, so dashboards and report cards move on.'],
        tips: ['The current term changes by itself when the next term starts. To choose it by hand instead, turn off "Change the current term by date" on Terms.', 'A learner with no mark at all this term cannot have a report card yet - Generate all skips them and lists their names.']
      },
      {
        id: 'a-run', title: 'Reports, analytics and logs', icon: 'chart',
        steps: ['Reports: student competency reports (LOA, AOI, EOC) and report cards. The Curriculum mastery tab shows how much of the curriculum has an assessment linked, and how students are doing, subject by subject.', 'Report Cards: pick the term and a class, check what is still missing, then Generate all - or make one learner\'s card at a time. Download Class PDF prints the class.', 'Engagement and analytics show activity across the whole school.', 'Rewards & Badges sets the rules for achievements.', 'Demo requests lists schools that asked for a demo on the website.', 'System Logs shows every sign-in; Chats lets you read conversations across the school.']
      },
      {
        id: 'a-parents', title: 'Parents and the weekly update', icon: 'users',
        intro: 'Give a parent or guardian a private, read-only link to their child\'s week - no account or password.',
        steps: ['Open Parents and tap Add a parent. Find the learner, then type the parent\'s name - and their email for the weekly email.', 'The link is copied for you: send it to the parent by SMS or email.', 'The page shows what was read and handed in this week, results, outcomes achieved and what is due next.', 'Turn off a link at any time - it stops working at once, and the email stops too.'],
        tips: ['Send this week\'s now emails every parent who hasn\'t had one today. For a weekly email on its own, ask whoever runs the server to add the weekly job.']
      },
      {
        id: 'a-notices', title: 'Noticeboard and exam dates', icon: 'speaker',
        steps: ['Noticeboard: post to everyone, all students, all staff, or a class - pin important ones to the top, and set a date for it to come down.', 'Notices slide across the top of everyone\'s dashboard until they have read them.', 'Exam dates: add each exam (for one class or every class).']
      }
    ]
  }
]
