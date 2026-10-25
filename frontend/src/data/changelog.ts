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
    date: '2026-10-24', area: 'ICT Lab', icon: 'wrench',
    title: 'Laptop repair: "No bootable device", from start to finish',
    text: 'Students work through a real repair: find out why a laptop says "No bootable device" from the screen, the BIOS and the owner, pack the right toolkit and choose the matching SSD, then open the laptop in 3D - screws, the one hidden under a foot, the battery first - and swap the failed drive. They make a Windows installer USB with Microsoft\'s own tool and install Windows screen by screen, through to activation and updates.'
  },
  {
    date: '2026-10-23', area: 'Heads of department', icon: 'check-circle',
    title: 'HODs approve teachers\' work, and chat with the department',
    text: 'eNotes, library books, Item Bank papers and videos now wait for the head of department, grouped by class on a new Approvals page. Approve to publish it, or return it to the teacher with a note. The HOD can also see which teachers are online now and when the others were last on, message any teacher, student or whole class in the department, and read their students\' chats.'
  },
  {
    date: '2026-10-22', area: 'ICT Lab', icon: 'keyboard',
    title: 'Lab rules, online safety, Build a network, Binary, a typing tutor and more',
    text: 'Students learn the computer lab rules and judge real situations to earn a lab pass, then hunt for dangers hidden in a 3D computer lab, fix start-up faults in BIOS Setup, spot scam messages and fake websites, count in binary with light switches, build a classroom network mission by mission - switch, printer, router, Wi-Fi - and fix a broken one, and learn to touch-type in 16 lessons - the key lights up and the hand shows which finger to use - and follow one key press through the computer in 3D: input, process, output and storage. In the showroom every part and device turns in HD 3D, with numbered details to fly in to - the processor socket, the memory slots, a mouse\'s scroll wheel - and a Test yourself quiz.'
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
