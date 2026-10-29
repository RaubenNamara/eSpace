/**
 * "What's new" on the landing page - recent improvements, newest first, in plain words.
 * Add an entry when something a school would notice ships (the git log is the source).
 * Keep it to things that are live, and to the last few months.
 */
export interface ChangelogEntry {
  date: string // YYYY-MM-DD
  area: string // a module name, as on the landing page
  icon: string // AppIcon name
  title: string
  text: string
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    date: '2026-10-29', area: 'Assessments', icon: 'pencil',
    title: 'Assessments save themselves while you set them',
    text: 'A draft assessment now saves itself a few seconds after every change - questions, marks, settings - and the line under its title says when. If the internet goes off or the page is closed first, the work is kept on that device and offered back the next time it is opened. A published assessment still waits for Save, so learners never see half-made changes, and Tusome asks before you leave with changes not saved.'
  },
  {
    date: '2026-10-29', area: 'Heads of department', icon: 'check-circle',
    title: 'Admins and HODs see who has marked what, and how far they have got',
    text: 'A new Marking page shows every teacher in the department this term: scripts handed in, how many they have marked, and what is still waiting - and for how long. Tap a teacher for each assessment, open its scripts and marks, see who did not hand in, and send a reminder. The Assessments list now shows marked and still to mark for every assessment. The admin\'s Supervision page has the same Marked column for every teacher in the school, with each script\'s mark.'
  },
  {
    date: '2026-10-29', area: 'ICT Lab', icon: 'clipboard',
    title: 'ICT Lab results for the class, and practicals set like an assessment',
    text: 'Teachers see every learner in a class against every ICT Lab practical - best score, or parts done. They can set a class a practical with a level and a due date: every learner is told, it shows at the top of their ICT Lab, and the teacher sees who has done it and the average.'
  },
  {
    date: '2026-10-28', area: 'Virtual Lab', icon: 'keyboard',
    title: 'The ICT Lab follows the Subsidiary ICT syllabus',
    text: 'The ICT Lab is now laid out by the new A-level Subsidiary ICT syllabus - class, term and topic - and every practical shows the learning outcome it covers. New: shutting down the right way (frozen programs, forced shutdown, power cuts, printers and routers), and the parts showroom now teaches and tests input, output, storage, communication and processing devices. Typing, binary, Build a network and RJ45 cabling, which the syllabus does not cover, have been taken out.'
  },
  {
    date: '2026-10-28', area: 'Students', icon: 'pencil',
    title: 'New assessments never go unnoticed',
    text: 'Every learner an assessment is for is told the moment it is published - including those in the other streams it was sent to - with the subject and when to hand it in. It shows under Pending assessments on the dashboard, ahead of old overdue work, and a red number on Assessments in the menu counts the new ones not started yet.'
  },
  {
    date: '2026-10-28', area: 'Assessments', icon: 'pencil',
    title: 'Assess any topic - catching up or working ahead',
    text: 'A teacher can now set an assessment on a topic from another term, another class or another year - an S.5 topic for an S.6 class, last term\'s topic, or next term\'s - and its marks still count in the term it is given, on this term\'s report cards. The topic shows on the class\'s and the learner\'s Learning Map, labelled with where it comes from.'
  },
  {
    date: '2026-10-27', area: 'Teachers', icon: 'users',
    title: 'See your department\'s work',
    text: 'eNotes, the eLibrary, the Item Bank and Videos now have a Department tab: every teacher sees what the other teachers in their department have added, and can open it. Each teacher still changes only their own work - unless their head of department lets them edit colleagues\' work, from the Teachers page.'
  },
  {
    date: '2026-10-26', area: 'Everyone', icon: 'chat',
    title: 'Help is one tap away',
    text: 'The user guide and Tusome support (support@tusome.ug) are now at the bottom of the menu for everyone, and in the menu under your name. The guide is up to date with every recent change, and has a new Getting help section on who to ask about what.'
  },
  {
    date: '2026-10-25', area: 'School admin', icon: 'check-circle',
    title: 'End of term: report cards for a whole class, and a teacher report to print',
    text: 'A new End of term checklist shows what is left before a term closes - marking, paper exam marks, report cards class by class, promotion and the next term. Report cards for a whole class are made in one go, after a check of which learners still have no marks. The current term now changes by itself when the next one starts. And the teacher follow-up report prints who missed the marking deadline, who has not marked, who set nothing, whose learners are not handing in and which classes had nothing this term.'
  },
  {
    date: '2026-10-24', area: 'ICT Lab', icon: 'wrench',
    title: 'Laptop repair: "No bootable device", from start to finish',
    text: 'Students work through a real repair: find out why a laptop says "No bootable device" from the screen, the BIOS and the owner, pack the right toolkit and choose the matching SSD, then open the laptop in 3D - screws, the one hidden under a foot, the battery first - and swap the failed drive. They make a Windows installer USB with Microsoft\'s own tool and install Windows screen by screen, through to activation and updates.'
  },
  {
    date: '2026-10-23', area: 'Heads of department', icon: 'chat',
    title: 'HODs see who is online, and message their teachers',
    text: 'On the dashboard and the Teachers page a green dot shows which teachers are online now, and the others show when they were last on. The HOD can message any teacher in the department, or all of them at once in the department\'s teachers group.'
  },
  {
    date: '2026-10-22', area: 'ICT Lab', icon: 'keyboard',
    title: 'Lab rules, online safety, Spot the hazard and more',
    text: 'Students learn the computer lab rules and judge real situations to earn a lab pass, then hunt for dangers hidden in a 3D computer lab, fix start-up faults in BIOS Setup, spot scam messages and fake websites, and follow one key press through the computer in 3D: input, process, output and storage. In the showroom every part and device turns in HD 3D, with numbered details to fly in to - the processor socket, the memory slots, a mouse\'s scroll wheel - and a Test yourself quiz.'
  },
  {
    date: '2026-10-15', area: 'Everyone', icon: 'sparkles',
    title: 'A cleaner Tusome in green, white and black',
    text: 'Simple dashboards for every role - school notices sliding past, the work waiting, shortcuts and classes in small cards that open up for more - and a My activity report for students: what they have done and not done over a week, a month, a term or the year.'
  },
  {
    date: '2026-10-05', area: 'Students', icon: 'target',
    title: 'Questions on eNotes and notes to keep',
    text: 'A place to ask questions while reading, and every note a student writes - downloadable as a PDF to keep for good.'
  },
  {
    date: '2026-10-05', area: 'Teachers', icon: 'clipboard',
    title: 'Scheme of work, comment bank and noticeboard',
    text: 'Plan a week for every topic and see where a class is behind, mark faster with saved comments, and post notices with read receipts.'
  },
  {
    date: '2026-10-05', area: 'Live Quiz', icon: 'bolt',
    title: 'Live Quiz, Daily Revision, early warning and parent updates',
    text: 'Play an assessment live in class on students\' phones; five revision questions a day with a streak; a list of learners who may be slipping; and a private weekly update for parents.'
  },
  {
    date: '2026-10-03', area: 'Teachers', icon: 'sparkles',
    title: 'A cleaner, faster teacher side',
    text: 'Assessments, the Class Learning Map, Coverage, Reports, Engagement, eNotes and the eLibrary all have clearer pages that work just as well on a phone.'
  },
  {
    date: '2026-10-02', area: 'Virtual Lab', icon: 'beaker',
    title: 'A full science lab to explore',
    text: 'Glass cabinets of apparatus by subject, benches with cupboards, running taps - and new apparatus like the sonometer, Kundt\'s tube and a Van de Graaff generator.'
  },
  {
    date: '2026-10-01', area: 'Virtual Lab', icon: 'beaker',
    title: 'Practicals marked like a real book',
    text: 'Students do science practicals in a 3D lab with real school apparatus, record readings and graphs, and the teacher marks the notebook on screen.'
  },
  {
    date: '2026-10-01', area: 'Videos', icon: 'video',
    title: 'Videos that play without buffering',
    text: 'A video downloads once and then plays smoothly, even on a slow connection - arranged by class and subject like the eLibrary.'
  },
  {
    date: '2026-09-30', area: 'Learning Map', icon: 'map',
    title: 'Support groups and a "What I can do" report',
    text: 'Group the learners who need an outcome again, get suggested AOI scenarios with marking guides, and print a competency report for each learner.'
  },
  {
    date: '2026-09-29', area: 'Assessments', icon: 'pencil',
    title: 'Answer assessments offline',
    text: 'Learners can attempt and hand in work without internet - it is sent when the phone reconnects.'
  },
  {
    date: '2026-09-28', area: 'eLibrary', icon: 'book',
    title: 'Books that open like real books',
    text: 'Shelf books open page by page, stay sharp on phones, and pick up exactly where the learner stopped.'
  },
  {
    date: '2026-09-28', area: 'Item Bank', icon: 'clipboard',
    title: 'Teachers choose what can be downloaded',
    text: 'Allow or block downloads of past papers and practice packs - one at a time or all at once.'
  }
]
