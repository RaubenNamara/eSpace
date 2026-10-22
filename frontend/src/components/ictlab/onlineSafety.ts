/**
 * Is it safe online? (pages/common/IctLabOnlineSafety.vue): the messages in the practice inbox,
 * the websites to judge, and the password check. Everything is made up - no real person - but
 * the tricks are the ones students really meet: Mobile Money "account blocked" messages, prizes
 * never entered, early exam results, look-alike web addresses.
 */

/** A piece of a message: plain text, a suspicious detail to tap, or a link (with where it really goes) */
export type Piece = string | { t: string; clue?: string; href?: string }

export interface Mail {
  id: string
  fromName: string
  fromAddr: Piece
  subject: string
  time: string
  scam: boolean
  body: Piece[][]
  /** Why it is safe - or the summary of the tricks */
  verdict: string
}

export const MAILS: Mail[] = [
  {
    id: 'momo', fromName: 'MTN MoMo', scam: true, time: '08:12',
    fromAddr: { t: 'support@mtn-m0mo-ug.com', clue: 'Look closely: "m0mo" has a zero, not the letter o - and it is not MTN\'s real address.' },
    subject: 'URGENT: Your Mobile Money account will be BLOCKED',
    body: [
      [{ t: 'Dear customer,', clue: 'No name - real companies that know you use your name.' }],
      ['We noticed unusual activity. ', { t: 'Your account will be blocked in 24 hours', clue: 'A threat and a deadline - scammers rush you so you do not stop to think.' }, ' unless you confirm your details.'],
      [{ t: 'Reply with your MoMo PIN', clue: 'MTN never asks for your PIN. Nobody genuine ever does.' }, ' or verify here: ', { t: 'mtn.co.ug/verify', href: 'http://momo-verify-account.xyz/pin', clue: 'The link shows mtn.co.ug, but really goes to momo-verify-account.xyz.' }],
      ['MTN Customer Care']
    ],
    verdict: 'A scam. A fake address, a threat with a deadline, a link that goes somewhere else, and a request for your PIN. Delete it, and tell an adult. If worried, call MTN on the number on their official website.'
  },
  {
    id: 'tusome', fromName: 'Tusome', scam: false, time: '07:30',
    fromAddr: 'no-reply@tusome.ug',
    subject: 'New assessment: Computer networks',
    body: [
      ['Hello Sarah,'],
      ['Your ICT teacher has set a new assessment, "Computer networks", due on Friday.'],
      ['Open Tusome as usual to start it.'],
      ['- Tusome']
    ],
    verdict: 'Safe. It comes from the real address, uses your name, asks for nothing, and tells you to open Tusome yourself rather than giving a login link.'
  },
  {
    id: 'prize', fromName: 'Promo Team', scam: true, time: 'Yesterday',
    fromAddr: { t: 'winner@lucky-draw-prize.com', clue: 'A random "prize" address, not a company you know.' },
    subject: 'CONGRATULATIONS!!! You have WON UGX 5,000,000',
    body: [
      [{ t: 'Congratulations lucky winner!!!', clue: 'You never entered any draw. If it sounds too good to be true, it is.' }],
      ['Your phone number was selected in our international draw.'],
      ['To receive your money, ', { t: 'send a processing fee of UGX 50,000', clue: 'Real prizes never ask you to pay first. This is how the scam takes your money.' }, ' to 0790 000 111 today.'],
      [{ t: 'Tell nobody until you receive your prize.', clue: 'Keeping it secret stops someone from warning you.' }]
    ],
    verdict: 'A scam. You cannot win a draw you never entered, and a real prize never costs money to collect. Never send money to claim a prize.'
  },
  {
    id: 'teacher', fromName: 'Mr Okello (ICT)', scam: false, time: 'Yesterday',
    fromAddr: 'okello@stmark.sc.ug',
    subject: 'Homework: networks worksheet',
    body: [
      ['Good afternoon S.2,'],
      ['As we said in class, please complete the attached worksheet on network devices before Thursday\'s lesson.'],
      ['📎 networks-worksheet.pdf'],
      ['Mr Okello']
    ],
    verdict: 'Safe. It comes from the school\'s own address, from a teacher you know, about something said in class, and the attachment is a PDF you expected.'
  },
  {
    id: 'uneb', fromName: 'UNEB Results', scam: true, time: 'Mon',
    fromAddr: { t: 'results@uneb-results-check.net', clue: 'Not an official UNEB address - anyone can buy a name like this.' },
    subject: 'Get your results EARLY before everyone else',
    body: [
      ['Results are ready! ', { t: 'Be the first to see yours - before the official release.', clue: 'Nobody can see results before they are released. It is bait.' }],
      ['Log in with your index number and ', { t: 'your email password', clue: 'No results site needs your email password. They want your account.' }, ' at ', { t: 'uneb.ac.ug/results', href: 'http://uneb-results-check.net/login', clue: 'The link pretends to be uneb.ac.ug but goes to uneb-results-check.net.' }],
      ['Offer ends tonight.']
    ],
    verdict: 'A scam. Early results do not exist, the address and link are fake, and it asks for your email password. Results come only through the school and official channels.'
  },
  {
    id: 'fakegoogle', fromName: 'Google Security', scam: true, time: 'Sun',
    fromAddr: { t: 'security@goggle-mail.co', clue: '"goggle" with two g\'s - a look-alike of google.' },
    subject: 'Someone has your password',
    body: [
      ['Someone signed in to your account from Russia.'],
      ['If this was not you, ', { t: 'click below and enter your password to secure your account', clue: 'A real alert never asks you to type your password into a link.' }, ':'],
      [{ t: 'SECURE MY ACCOUNT', href: 'http://goggle-mail.co/signin', clue: 'The button goes to goggle-mail.co, not google.com.' }]
    ],
    verdict: 'A scam ("phishing"). It frightens you so you type your password into a fake page. If you are worried, open your account yourself by typing the real address.'
  },
  {
    id: 'realgoogle', fromName: 'Google', scam: false, time: 'Sun',
    fromAddr: 'no-reply@accounts.google.com',
    subject: 'Security alert: new sign-in on Windows',
    body: [
      ['Hi Sarah,'],
      ['Your Google Account was just signed in to on a new Windows device.'],
      ['If this was you, you do not need to do anything. If not, open your Google Account yourself and check your security settings.'],
      ['- The Google Accounts team']
    ],
    verdict: 'Safe. The real google.com address, your name, no link to type a password into - it tells you to go to your account yourself.'
  }
]

export interface Site {
  id: string
  /** The address, split so the real domain can be shown */
  url: { scheme: 'https' | 'http'; before: string; domain: string; after: string }
  title: string
  kind: 'login' | 'shop' | 'prize' | 'momo'
  real: boolean
  why: string
}

export const SITES: Site[] = [
  { id: 'tusome', url: { scheme: 'https', before: 'www.', domain: 'tusome.ug', after: '/login' }, title: 'Tusome - Sign in', kind: 'login', real: true, why: 'Real. The domain - the part just before the first single "/" - is tusome.ug.' },
  { id: 'tusome-fake', url: { scheme: 'https', before: 'tusome.ug.', domain: 'login-secure.com', after: '/signin' }, title: 'Tusome - Sign in', kind: 'login', real: false, why: 'Fake. It starts with tusome.ug, but the real domain is what comes just before the first "/" - login-secure.com. The padlock only means the connection is private, not that the site is honest.' },
  { id: 'mtn', url: { scheme: 'https', before: 'www.', domain: 'mtn.co.ug', after: '/momo' }, title: 'MTN MoMo', kind: 'momo', real: true, why: 'Real. The domain is mtn.co.ug - MTN Uganda\'s own.' },
  { id: 'momo-bonus', url: { scheme: 'http', before: '', domain: 'mtn-momo-bonus.win', after: '/claim' }, title: 'Claim your FREE MoMo bonus!', kind: 'prize', real: false, why: 'Fake. The domain is mtn-momo-bonus.win, not mtn.co.ug; "Not secure" (http) on a page asking for your PIN; and a free bonus is bait.' },
  { id: 'google', url: { scheme: 'https', before: '', domain: 'accounts.google.com', after: '/signin' }, title: 'Sign in - Google Accounts', kind: 'login', real: true, why: 'Real. accounts.google.com is Google\'s own sign-in page.' },
  { id: 'faceb', url: { scheme: 'https', before: 'www.', domain: 'faceb00k-security.help', after: '/verify' }, title: 'Facebook - Verify your account', kind: 'login', real: false, why: 'Fake. "faceb00k" uses zeros, and the domain ends .help - not facebook.com.' },
  { id: 'shop', url: { scheme: 'https', before: 'www.', domain: 'jumia.ug', after: '/phones' }, title: 'Phones | Jumia Uganda', kind: 'shop', real: true, why: 'Real. jumia.ug is the shop\'s own domain. Still check prices and reviews before buying.' },
  { id: 'phone-deal', url: { scheme: 'https', before: 'jumia.ug-', domain: 'phone-deals.shop', after: '/iphone-50000' }, title: 'iPhone 15 for UGX 50,000!!!', kind: 'shop', real: false, why: 'Fake. The domain is phone-deals.shop (the "jumia.ug-" is just part of the name), and a phone for a tiny price is a trap to take your money.' }
]

/** Very common passwords - always weak */
const COMMON = ['password', '123456', '12345678', 'qwerty', 'abc123', 'letmein', 'welcome', 'iloveyou', 'admin', 'monkey', 'football', 'uganda', 'kampala', 'jesus', 'password1', '111111', '000000']

export interface PasswordCheck {
  label: string
  ok: boolean
}

/** How strong a password is: 0-4, the checklist, and roughly how long a computer takes to guess it */
export function passwordStrength(pw: string) {
  const lower = /[a-z]/.test(pw)
  const upper = /[A-Z]/.test(pw)
  const digit = /[0-9]/.test(pw)
  const symbol = /[^A-Za-z0-9]/.test(pw)
  const low = pw.toLowerCase()
  const common = COMMON.some(c => low.includes(c)) || /^(.)\1+$/.test(pw) || /1234|abcd|qwer/.test(low)
  const year = /(19|20)\d\d/.test(pw)
  const checks: PasswordCheck[] = [
    { label: 'At least 12 characters', ok: pw.length >= 12 },
    { label: 'Small and CAPITAL letters', ok: lower && upper },
    { label: 'A number', ok: digit },
    { label: 'A symbol like ! # ? @', ok: symbol },
    { label: 'Not a common word or pattern', ok: pw.length > 0 && !common },
    { label: 'No birth year', ok: pw.length > 0 && !year }
  ]
  const pool = (lower ? 26 : 0) + (upper ? 26 : 0) + (digit ? 10 : 0) + (symbol ? 32 : 0) || 1
  // ten billion guesses a second; a common password or pattern is found almost at once
  let seconds = common ? 0.001 : Math.pow(pool, pw.length) / 1e10
  if (year && !common) seconds /= 1000
  const passed = checks.filter(c => c.ok).length
  const score = !pw ? 0 : common || pw.length < 8 ? 0 : Math.min(4, Math.max(1, passed - 2))
  return { score, checks, crack: crackTime(seconds) }
}

function crackTime(s: number) {
  if (s < 1) return 'instantly'
  const units: [number, string][] = [[60, 'second'], [60, 'minute'], [24, 'hour'], [365, 'day'], [1000, 'year'], [1000, 'thousand years'], [1000, 'million years']]
  let v = s
  let name = 'second'
  for (const [step, n] of units) {
    name = n
    if (v < step) break
    v /= step
  }
  if (name === 'million years' && v >= 14000) return 'longer than the age of the universe'
  const r = Math.round(v)
  return `about ${r.toLocaleString()} ${name}${r === 1 || name.includes(' ') ? '' : 's'}`
}

export const PASSWORD_Q = [
  { q: 'Which password is the strongest?', options: ['Mango!River7Sky#Blue', 'password123', 'Brian2009', 'qwerty'], a: 'Mango!River7Sky#Blue', why: 'Long, with small and capital letters, numbers and symbols, and no name or year. A few random words joined together are long and easy to remember.' },
  { q: 'Which is a good password habit?', options: ['A different password for each account', 'Your birthday, so you remember it', 'Writing it on a note stuck to the screen', 'Sharing it with your best friend'], a: 'A different password for each account', why: 'If one site is hacked, your other accounts stay safe.' },
  { q: 'A message asks you to log in through its link. What do you do?', options: ['Open the website yourself by typing its address', 'Click the link and log in quickly', 'Reply with your password', 'Forward it to your friends'], a: 'Open the website yourself by typing its address', why: 'Links in messages can lead to fake pages. Typing the address yourself takes you to the real one.' },
  { q: 'What is 2-step verification?', options: ['A code sent to your phone as well as your password', 'Typing your password twice', 'Having two passwords on a sticky note', 'Logging in on two computers'], a: 'A code sent to your phone as well as your password', why: 'Even if someone steals your password, they cannot get in without the code on your phone.' }
]
