/**
 * The ICT Lab typing tutor (pages/common/IctLabTyping.vue): the keyboard, which finger presses
 * each key, and the lessons - home row first, then the top and bottom rows, capitals, sentences,
 * numbers and a one-minute speed test. Each lesson's practice text is made fresh every time from
 * the keys learnt so far, using real words where it can.
 */

export type Finger = 'lp' | 'lr' | 'lm' | 'li' | 'ri' | 'rm' | 'rr' | 'rp' | 'th'

export const FINGER_NAME: Record<Finger, string> = {
  lp: 'left little finger', lr: 'left ring finger', lm: 'left middle finger', li: 'left first finger',
  ri: 'right first finger', rm: 'right middle finger', rr: 'right ring finger', rp: 'right little finger', th: 'thumb'
}
/** Soft colours for each finger's keys - the same on both hands */
export const FINGER_COLOR: Record<Finger, string> = {
  lp: '#fde2e4', rp: '#fde2e4', lr: '#fdf0c8', rr: '#fdf0c8', lm: '#dbeafe', rm: '#dbeafe', li: '#d3f2df', ri: '#d3f2df', th: '#e5e7eb'
}
export const FINGER_DARK: Record<Finger, string> = {
  lp: '#e11d48', rp: '#e11d48', lr: '#d97706', rr: '#d97706', lm: '#2563eb', rm: '#2563eb', li: '#15874a', ri: '#15874a', th: '#475569'
}

export interface Key {
  id: string
  label: string
  /** What it types, and with Shift */
  ch?: string
  shift?: string
  finger: Finger
  /** Width in key units */
  w?: number
}

const k = (ch: string, shift: string, finger: Finger, label = ch.toUpperCase()): Key => ({ id: ch, label, ch, shift, finger })

export const ROWS: Key[][] = [
  [k('`', '~', 'lp', '`'), k('1', '!', 'lp'), k('2', '@', 'lr'), k('3', '#', 'lm'), k('4', '$', 'li'), k('5', '%', 'li'), k('6', '^', 'ri'), k('7', '&', 'ri'), k('8', '*', 'rm'), k('9', '(', 'rr'), k('0', ')', 'rp'), k('-', '_', 'rp'), k('=', '+', 'rp'), { id: 'backspace', label: 'Backspace', finger: 'rp', w: 2 }],
  [{ id: 'tab', label: 'Tab', finger: 'lp', w: 1.5 }, k('q', 'Q', 'lp'), k('w', 'W', 'lr'), k('e', 'E', 'lm'), k('r', 'R', 'li'), k('t', 'T', 'li'), k('y', 'Y', 'ri'), k('u', 'U', 'ri'), k('i', 'I', 'rm'), k('o', 'O', 'rr'), k('p', 'P', 'rp'), k('[', '{', 'rp', '['), k(']', '}', 'rp', ']'), { ...k('\\', '|', 'rp', '\\'), w: 1.5 }],
  [{ id: 'caps', label: 'Caps Lock', finger: 'lp', w: 1.8 }, k('a', 'A', 'lp'), k('s', 'S', 'lr'), k('d', 'D', 'lm'), k('f', 'F', 'li'), k('g', 'G', 'li'), k('h', 'H', 'ri'), k('j', 'J', 'ri'), k('k', 'K', 'rm'), k('l', 'L', 'rr'), k(';', ':', 'rp', ';'), k("'", '"', 'rp', "'"), { id: 'enter', label: 'Enter', finger: 'rp', w: 2.2 }],
  [{ id: 'lshift', label: 'Shift', finger: 'lp', w: 2.4 }, k('z', 'Z', 'lp'), k('x', 'X', 'lr'), k('c', 'C', 'lm'), k('v', 'V', 'li'), k('b', 'B', 'li'), k('n', 'N', 'ri'), k('m', 'M', 'ri'), k(',', '<', 'rm', ','), k('.', '>', 'rr', '.'), k('/', '?', 'rp', '/'), { id: 'rshift', label: 'Shift', finger: 'rp', w: 2.6 }],
  [{ id: 'space', label: '', ch: ' ', finger: 'th', w: 7 }]
]

/** For a character: the key that types it, and whether Shift is needed */
const CHAR_KEY = new Map<string, { key: Key; shift: boolean }>()
for (const row of ROWS) {
  for (const key of row) {
    if (key.ch !== undefined) CHAR_KEY.set(key.ch, { key, shift: false })
    if (key.shift !== undefined) CHAR_KEY.set(key.shift, { key, shift: true })
  }
}
export const keyFor = (ch: string) => CHAR_KEY.get(ch) || null
/** Shift is pressed by the little finger of the other hand */
export const shiftFor = (key: Key) => (key.finger.startsWith('l') ? 'rshift' : 'lshift')
export const HOME_KEYS = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';']

export interface TypingLesson {
  id: string
  section: string
  title: string
  /** The keys this lesson adds (shown as chips) */
  newKeys: string
  /** Every letter or mark the practice may use */
  keys: string
  kind: 'drill' | 'words' | 'capitals' | 'sentences' | 'numbers' | 'timed'
  /** Words a minute to aim for */
  target: number
  tip: string
}

const HOME = 'asdfjkl;'
export const TYPING_LESSONS: TypingLesson[] = [
  { id: 'l01', section: 'Home row', title: 'F and J', newKeys: 'fj', keys: 'fj', kind: 'drill', target: 8, tip: 'Feel the small bumps on F and J - your first fingers rest there. Press the space bar with your thumb.' },
  { id: 'l02', section: 'Home row', title: 'D and K', newKeys: 'dk', keys: 'fjdk', kind: 'drill', target: 8, tip: 'Middle fingers on D and K. Keep your first fingers on F and J.' },
  { id: 'l03', section: 'Home row', title: 'S and L', newKeys: 'sl', keys: 'fjdksl', kind: 'drill', target: 9, tip: 'Ring fingers on S and L. Fingers curved, wrists off the desk.' },
  { id: 'l04', section: 'Home row', title: 'A and ;', newKeys: 'a;', keys: HOME, kind: 'drill', target: 9, tip: 'Little fingers on A and ;. That is the whole home row - every finger goes back here after each key.' },
  { id: 'l05', section: 'Home row', title: 'G, H and home row words', newKeys: 'gh', keys: HOME + 'gh', kind: 'words', target: 10, tip: 'Reach G with your left first finger and H with your right, then come straight back.' },
  { id: 'l06', section: 'Top row', title: 'E and I', newKeys: 'ei', keys: HOME + 'ghei', kind: 'words', target: 10, tip: 'Middle fingers reach up for E and I. Do not look down - look at the screen.' },
  { id: 'l07', section: 'Top row', title: 'R and U', newKeys: 'ru', keys: HOME + 'gheiru', kind: 'words', target: 11, tip: 'First fingers reach up for R and U.' },
  { id: 'l08', section: 'Top row', title: 'T and Y', newKeys: 'ty', keys: HOME + 'gheiruty', kind: 'words', target: 11, tip: 'First fingers again - a longer reach, up and in, for T and Y.' },
  { id: 'l09', section: 'Top row', title: 'W and O', newKeys: 'wo', keys: HOME + 'gheirutywo', kind: 'words', target: 12, tip: 'Ring fingers reach up for W and O.' },
  { id: 'l10', section: 'Top row', title: 'Q and P', newKeys: 'qp', keys: HOME + 'gheirutywoqp', kind: 'words', target: 12, tip: 'Little fingers reach up for Q and P. The whole top row is yours now.' },
  { id: 'l11', section: 'Bottom row', title: 'V, B, N and M', newKeys: 'vbnm', keys: HOME + 'gheirutywoqpvbnm', kind: 'words', target: 12, tip: 'First fingers reach down: V and B on the left, N and M on the right.' },
  { id: 'l12', section: 'Bottom row', title: 'C, X, Z, comma and full stop', newKeys: 'cxz,.', keys: 'abcdefghijklmnopqrstuvwxyz;,.', kind: 'words', target: 13, tip: 'Middle finger for C and comma, ring finger for X and full stop, little finger for Z.' },
  { id: 'l13', section: 'Sentences', title: 'Capital letters', newKeys: '⇧', keys: 'abcdefghijklmnopqrstuvwxyz.,', kind: 'capitals', target: 13, tip: 'Hold Shift with the little finger of the OTHER hand, then press the letter.' },
  { id: 'l14', section: 'Sentences', title: 'Full sentences', newKeys: '?\'', keys: 'all', kind: 'sentences', target: 14, tip: 'A space after every full stop, comma and question mark. Keep a steady rhythm.' },
  { id: 'l15', section: 'Numbers', title: 'The number row', newKeys: '0-9', keys: '0123456789', kind: 'numbers', target: 10, tip: 'Reach up from the home row: 4 and 5 with the left first finger, 6 and 7 with the right.' },
  { id: 'l16', section: 'Speed test', title: 'One-minute speed test', newKeys: '1 min', keys: 'all', kind: 'timed', target: 20, tip: 'Type for one minute. Accuracy first - speed comes with practice.' }
]

/** At least this accuracy passes a lesson (and opens the next one) */
export const TYPING_PASS = 90

const WORDS = (
  'a as ask asks all add adds dad dads sad lad lads fad fall falls flask flasks salad salads glad has had hall halls half gas dash lash flash shall jag lag hag sag ' +
  'he she her here hide side ride idea feel feet see seed deed fled field shield like likes life file fire hire dial deal real seal sail rail hail fair hair dear fear ' +
  'red rid rule rules sure user users rude dug hug rug fur jar far car star sir stir hurt rush just jest dust rust trust ' +
  'the they there their that this then thus try tray stay day days yes yet type types year early ready style key keys item items its it tie tide tidy ' +
  'we were where what why who how owl low slow show snow word words world work worse wise wish wait water write wrote two wow ' +
  'quite quiet quit quick quote paper page pages pupil pop top stop step help hope open drop people power print printer report ' +
  'van very vote move moved mouse menu name names number numbers bag bad big but bus job jobs mobile network monitor button brown more mind ' +
  'computer computers class classes school science lesson lessons cable cables code click clock disk disks box fix exam excel zoom zero size text next ' +
  'keyboard screen data save saved file files folder email internet password teacher student students learn learning safe safety virus delete'
).split(' ')

const SENTENCES = [
  'The computer lab is a safe place to learn.',
  'Save your work often so you do not lose it.',
  'A mouse and a keyboard are input devices.',
  'The monitor shows what the computer is doing.',
  'Never share your password with a friend.',
  'Is the printer switched on?',
  'Shut down the computer before you switch off the socket.',
  'We use the internet to find information for our lessons.',
  'Scan every flash disk for viruses before you open it.',
  'The processor is the brain of the computer.',
  'Data is stored on the hard disk when the power is off.',
  'Keep your fingers on the home row and look at the screen.',
  'Do you know where the fire extinguisher is?',
  "Don't eat or drink near the computers.",
  'Type slowly at first, then a little faster each day.'
]

const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)]

/** The practice text for a lesson - about `length` characters */
export function practiceText(lesson: TypingLesson, length = 140): string {
  const allowed = new Set(lesson.keys === 'all' ? [] : [...lesson.keys])
  const fits = (w: string) => lesson.keys === 'all' || [...w].every(c => allowed.has(c))
  const out: string[] = []
  const size = () => out.join(' ').length

  if (lesson.kind === 'sentences' || (lesson.kind === 'timed')) {
    const pool = [...SENTENCES].sort(() => Math.random() - 0.5)
    let i = 0
    while (size() < (lesson.kind === 'timed' ? 900 : length)) out.push(pool[i++ % pool.length])
    return out.join(' ')
  }
  if (lesson.kind === 'numbers') {
    while (size() < length) {
      const n = 1 + Math.floor(Math.random() * 3)
      out.push(Array.from({ length: n + 1 }, () => pick([...lesson.keys])).join(''))
    }
    return out.join(' ')
  }
  const words = WORDS.filter(fits)
  const letters = [...lesson.keys].filter(c => c !== ';' || lesson.kind === 'drill')
  const fresh = [...lesson.newKeys].filter(c => allowed.has(c))
  if (lesson.kind === 'capitals') {
    while (size() < length) {
      const w = pick(words)
      out.push(w[0].toUpperCase() + w.slice(1) + (Math.random() < 0.2 ? '.' : ''))
    }
    return out.join(' ')
  }
  while (size() < length) {
    // drills: small groups of the keys, leaning on the new ones; later lessons: real words
    if (lesson.kind === 'drill' || words.length < 8 || Math.random() < 0.15) {
      const n = 2 + Math.floor(Math.random() * 3)
      out.push(Array.from({ length: n }, () => (Math.random() < 0.55 && fresh.length ? pick(fresh) : pick(letters))).join(''))
    } else {
      const w = pick(words)
      // make sure the new keys turn up often
      out.push(fresh.length && ![...w].some(c => fresh.includes(c)) && Math.random() < 0.5 ? pick(words.filter(x => [...x].some(c => fresh.includes(c))).concat(w)) : w)
    }
  }
  return out.join(' ')
}
