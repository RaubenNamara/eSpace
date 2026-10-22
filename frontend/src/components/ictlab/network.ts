/**
 * Build a network (pages/common/IctLabNetwork.vue): the classroom floor plan, the devices, which
 * cables make sense (and why the others do not), finding a way through the cables for a ping,
 * and the five missions - connect a classroom, share a printer, go online, fix a broken network,
 * add Wi-Fi. Plain data and functions; the page draws it and handles the dragging.
 */

export type DevType = 'pc' | 'printer' | 'switch' | 'router' | 'modem' | 'ap' | 'laptop' | 'tablet' | 'wall' | 'cloud'
export type SlotKind = 'desk' | 'cabinet' | 'ceiling'

export interface Dev {
  id: string
  type: DevType
  name: string
  ip?: string
  /** The slot it stands in; null = still in the tray */
  slot: string | null
  /** Built into the room (the internet line, the cloud) or already in place (laptop, tablet) */
  fixed?: { x: number; y: number }
  /** Wireless devices: joined the lab Wi-Fi */
  joined?: boolean
}
export interface Cable {
  id: string
  a: string
  b: string
  /** Looks fine but does not work (mission 4) - the cable tester finds it */
  broken?: boolean
}
export interface Slot {
  id: string
  kind: SlotKind
  x: number
  y: number
  label: string
}

export const VIEW_W = 1000
export const VIEW_H = 600

/** Where things can go in the classroom */
export const SLOTS: Slot[] = [
  { id: 'd1', kind: 'desk', x: 150, y: 140, label: 'Desk 1' },
  { id: 'd2', kind: 'desk', x: 150, y: 300, label: 'Desk 2' },
  { id: 'd3', kind: 'desk', x: 150, y: 460, label: 'Desk 3' },
  { id: 'd4', kind: 'desk', x: 390, y: 460, label: 'Desk 4' },
  { id: 'd5', kind: 'desk', x: 390, y: 140, label: 'Printer table' },
  { id: 'c1', kind: 'cabinet', x: 745, y: 170, label: 'Cabinet shelf 1' },
  { id: 'c2', kind: 'cabinet', x: 745, y: 300, label: 'Cabinet shelf 2' },
  { id: 'c3', kind: 'cabinet', x: 745, y: 430, label: 'Cabinet shelf 3' },
  { id: 'ce', kind: 'ceiling', x: 520, y: 300, label: 'Ceiling (middle of the room)' }
]
export const slotById = (id: string | null) => SLOTS.find(s => s.id === id) || null

/** Which slot each kind of device belongs in */
export const SLOT_FOR: Record<DevType, SlotKind | null> = {
  pc: 'desk', printer: 'desk', laptop: 'desk', tablet: 'desk', switch: 'cabinet', router: 'cabinet', modem: 'cabinet', ap: 'ceiling', wall: null, cloud: null
}

export const TYPE_NAME: Record<DevType, string> = {
  pc: 'Computer', printer: 'Printer', switch: 'Switch', router: 'Router', modem: 'Modem', ap: 'Wireless access point', laptop: 'Laptop', tablet: 'Tablet', wall: 'Internet line', cloud: 'The internet'
}
export const TYPE_INFO: Record<DevType, string> = {
  pc: 'A computer on the network. Its network card has an RJ45 port for one cable.',
  printer: 'A network printer: plugged into the switch, every computer can print to it.',
  switch: 'Joins the devices in one room or building into a network (a LAN). Each device has its own cable to the switch - a star.',
  router: 'Joins your network to other networks - like the internet. It gives every device an address (IP address).',
  modem: 'Turns the signal on the internet provider\'s line into network data, and back.',
  ap: 'Sends the network over radio waves (Wi-Fi), so laptops, tablets and phones can join without a cable.',
  laptop: 'A portable computer. It joins the network by Wi-Fi.',
  tablet: 'A touch-screen device. It joins the network by Wi-Fi.',
  wall: 'The line from the Internet Service Provider (ISP) coming into the school.',
  cloud: 'Millions of networks joined together - the internet.'
}

const END = new Set<DevType>(['pc', 'printer', 'laptop', 'tablet'])
/** How many cables each kind of device takes */
const MAX_CABLES: Record<DevType, number> = { pc: 1, printer: 1, laptop: 1, tablet: 0, switch: 8, router: 5, modem: 2, ap: 1, wall: 1, cloud: 0 }

/** Why a cable between two devices is wrong - or null when it is right */
export function cableProblem(a: Dev, b: Dev, cables: Cable[], devs: Dev[]): string | null {
  if (a.id === b.id) return null
  const [x, y] = [a.type, b.type].sort() as [DevType, DevType]
  const pair = `${x}-${y}`
  if (cables.some(c => (c.a === a.id && c.b === b.id) || (c.a === b.id && c.b === a.id))) return `${a.name} and ${b.name} are already joined.`
  if (a.type === 'tablet' || b.type === 'tablet') return 'A tablet has no network port - it joins by Wi-Fi.'
  if (END.has(a.type) && END.has(b.type)) return 'Do not join computers and printers to each other - give each one its own cable to the switch.'
  if (END.has(a.type) || END.has(b.type)) {
    const other = END.has(a.type) ? b : a
    if (other.type === 'modem') return 'Computers reach the internet through the router. The modem connects to the router, not to a computer.'
    if (other.type === 'wall') return 'That socket is the line from the internet provider - it goes into the modem.'
    if (other.type === 'ap') return 'The access point is for wireless devices. Give the computer a cable to the switch.'
  }
  if (pair === 'modem-switch') return 'Put the router between the switch and the modem - the router is what joins your network to the internet.'
  if (pair === 'switch-wall' || pair === 'router-wall' || pair === 'ap-wall') return 'The internet provider\'s line goes into the modem first.'
  if (pair === 'ap-modem' || pair === 'ap-router') return 'Plug the access point into the switch, like the other devices in the room.'
  // ports
  const used = (d: Dev) => cables.filter(c => c.a === d.id || c.b === d.id).length
  for (const d of [a, b]) if (used(d) >= MAX_CABLES[d.type]) return `${d.name} has no free port for another cable.`
  // a router takes one cable from the modem (its WAN port); a modem one from the router and one from the wall
  const linkedTo = (d: Dev, t: DevType) => cables.some(c => (c.a === d.id || c.b === d.id) && devs.find(o => o.id === (c.a === d.id ? c.b : c.a))?.type === t)
  if (pair === 'modem-router' && (linkedTo(a.type === 'router' ? a : b, 'modem') || linkedTo(a.type === 'modem' ? a : b, 'router'))) return 'The router and modem need only one cable between them.'
  return null
}

/** Every link: cables, the internet line to the cloud, and Wi-Fi */
export function links(devs: Dev[], cables: Cable[]) {
  const out: { a: string; b: string; cable?: Cable; wifi?: boolean }[] = cables.map(c => ({ a: c.a, b: c.b, cable: c }))
  out.push({ a: 'wall', b: 'cloud' })
  const ap = devs.find(d => d.type === 'ap' && d.slot)
  if (ap) for (const d of devs) if (d.joined) out.push({ a: d.id, b: ap.id, wifi: true })
  return out
}

/** The way from one device to another (device ids, in order), or null */
export function findPath(devs: Dev[], cables: Cable[], from: string, to: string): string[] | null {
  const ls = links(devs, cables)
  const prev = new Map<string, string>([[from, from]])
  const q = [from]
  while (q.length) {
    const n = q.shift()!
    if (n === to) break
    for (const l of ls) {
      const m = l.a === n ? l.b : l.b === n ? l.a : null
      if (m && !prev.has(m)) {
        prev.set(m, n)
        q.push(m)
      }
    }
  }
  if (!prev.has(to)) return null
  const path = [to]
  while (path[0] !== from) path.unshift(prev.get(path[0])!)
  return path
}

/** Everything reachable from a device (to show how far a ping gets) */
export function reachable(devs: Dev[], cables: Cable[], from: string) {
  const seen = new Set([from])
  const q = [from]
  const ls = links(devs, cables)
  while (q.length) {
    const n = q.shift()!
    for (const l of ls) {
      const m = l.a === n ? l.b : l.b === n ? l.a : null
      if (m && !seen.has(m)) {
        seen.add(m)
        q.push(m)
      }
    }
  }
  return seen
}

// ------------------------------------------------------------------ missions
export interface MissionState {
  devs: Dev[]
  cables: Cable[]
  pinged: boolean
  printed: boolean
  /** Devices that opened a website */
  browsed: Set<string>
}
export interface Mission {
  id: string
  title: string
  short: string
  intro: string
  /** Words to know */
  terms: { term: string; means: string }[]
  /** Devices for the tray, and what is already in place */
  setup: () => { devs: Dev[]; cables: Cable[] }
  tools: ('ping' | 'print' | 'web')[]
  goals: { text: string; done: (s: MissionState) => boolean }[]
  done: string
}

const pcs = (n = 4, placed = false): Dev[] =>
  Array.from({ length: n }, (_, i) => ({ id: `pc${i + 1}`, type: 'pc' as const, name: `PC ${i + 1}`, ip: `192.168.1.${11 + i}`, slot: placed ? ['d1', 'd2', 'd3', 'd4'][i] : null }))
const roomFixed = (): Dev[] => [
  { id: 'wall', type: 'wall', name: 'Internet line', slot: null, fixed: { x: 905, y: 120 } },
  { id: 'cloud', type: 'cloud', name: 'The internet', slot: null, fixed: { x: 955, y: 40 } }
]
let cableNo = 0
const cable = (a: string, b: string, broken = false): Cable => ({ id: `k${++cableNo}`, a, b, broken })

/** The network after mission 1, 2 or 3 is finished */
function built(stage: 1 | 2 | 3) {
  const devs: Dev[] = [...pcs(4, true), { id: 'sw', type: 'switch', name: 'Switch', slot: 'c2' }, ...roomFixed()]
  const cables = ['pc1', 'pc2', 'pc3', 'pc4'].map(p => cable(p, 'sw'))
  if (stage >= 2) {
    devs.push({ id: 'prn', type: 'printer', name: 'Printer', ip: '192.168.1.20', slot: 'd5' })
    cables.push(cable('prn', 'sw'))
  }
  if (stage >= 3) {
    devs.push({ id: 'rtr', type: 'router', name: 'Router', ip: '192.168.1.1', slot: 'c1' }, { id: 'mdm', type: 'modem', name: 'Modem', slot: 'c3' })
    cables.push(cable('sw', 'rtr'), cable('rtr', 'mdm'), cable('mdm', 'wall'))
  }
  return { devs, cables }
}

const onDesks = (s: MissionState, ids: string[]) => ids.every(id => slotById(s.devs.find(d => d.id === id)?.slot ?? null)?.kind === 'desk')
const joined = (s: MissionState, a: string, b: string) => s.cables.some(c => (c.a === a && c.b === b) || (c.a === b && c.b === a))
const devOfType = (s: MissionState, t: DevType) => s.devs.find(d => d.type === t)
const online = (s: MissionState, id: string) => {
  const p = findPath(s.devs, s.cables, id, 'cloud')
  return !!p && !pathBroken(s.cables, p)
}
/** The first broken cable along a path, if any */
export function brokenOn(cables: Cable[], path: string[]) {
  for (let i = 0; i + 1 < path.length; i++) {
    const c = cables.find(k => (k.a === path[i] && k.b === path[i + 1]) || (k.b === path[i] && k.a === path[i + 1]))
    if (c?.broken) return { cable: c, at: i }
  }
  return null
}
const pathBroken = (cables: Cable[], path: string[]) => !!brokenOn(cables, path)

export const MISSIONS: Mission[] = [
  {
    id: 'm1',
    title: 'Connect the classroom',
    short: 'Four computers and a switch',
    intro: 'This classroom has four computers that cannot talk to each other. Put the switch in the network cabinet and the computers on the desks, give each computer a cable to the switch, then ping one computer from another to test it.',
    terms: [
      { term: 'Network', means: 'Two or more computers joined so they can share data and devices.' },
      { term: 'LAN', means: 'Local Area Network - a network in one room, building or school.' },
      { term: 'Switch', means: 'The box every device in the LAN plugs into. It passes data to the right device.' },
      { term: 'Star topology', means: 'Every device has its own cable to the middle (the switch). One broken cable stops only that device.' },
      { term: 'Ping', means: 'A test message: "are you there?". A reply means the two devices are connected.' }
    ],
    setup: () => ({ devs: [...pcs(4), { id: 'sw', type: 'switch', name: 'Switch', slot: null }, ...roomFixed()], cables: [] }),
    tools: ['ping'],
    goals: [
      { text: 'Put the switch in the network cabinet', done: s => slotById(devOfType(s, 'switch')?.slot ?? null)?.kind === 'cabinet' },
      { text: 'Put the four computers on the desks', done: s => onDesks(s, ['pc1', 'pc2', 'pc3', 'pc4']) },
      { text: 'Give every computer a cable to the switch', done: s => ['pc1', 'pc2', 'pc3', 'pc4'].every(p => joined(s, p, 'sw')) },
      { text: 'Ping one computer from another - and get a reply', done: s => s.pinged }
    ],
    done: 'You built a LAN in a star topology: every computer has its own cable to the switch.'
  },
  {
    id: 'm2',
    title: 'Share a printer',
    short: 'One printer for every computer',
    intro: 'The class has one printer. Put it on the printer table and connect it to the switch - then every computer can print to it. Print something to test it.',
    terms: [
      { term: 'Sharing', means: 'One of the main reasons for a network: many computers use one printer, one internet line, the same files.' },
      { term: 'Network printer', means: 'A printer with its own network port and address, joined to the switch.' },
      { term: 'IP address', means: 'Each device\'s number on the network, like 192.168.1.20 - so data reaches the right one.' }
    ],
    setup: () => {
      const b = built(1)
      b.devs.push({ id: 'prn', type: 'printer', name: 'Printer', ip: '192.168.1.20', slot: null })
      return b
    },
    tools: ['ping', 'print'],
    goals: [
      { text: 'Put the printer on the printer table', done: s => devOfType(s, 'printer')?.slot === 'd5' },
      { text: 'Connect the printer to the switch', done: s => joined(s, 'prn', 'sw') },
      { text: 'Print from one of the computers', done: s => s.printed }
    ],
    done: 'Every computer can now share one printer through the switch.'
  },
  {
    id: 'm3',
    title: 'Go online',
    short: 'Router, modem and the internet',
    intro: 'Now join the school\'s network to the internet. The internet provider\'s line comes in through the wall. You need a modem for that line and a router to join your LAN to it. Then open a website.',
    terms: [
      { term: 'ISP', means: 'Internet Service Provider - the company that brings the internet line to the school.' },
      { term: 'Modem', means: 'Turns the signal on the ISP\'s line into network data, and back.' },
      { term: 'Router', means: 'Joins your LAN to the internet and sends data the right way between them. It gives each device its IP address.' },
      { term: 'WAN', means: 'Wide Area Network - networks over a large area. The internet is the biggest WAN.' }
    ],
    setup: () => {
      const b = built(2)
      b.devs.push({ id: 'rtr', type: 'router', name: 'Router', ip: '192.168.1.1', slot: null }, { id: 'mdm', type: 'modem', name: 'Modem', slot: null })
      return b
    },
    tools: ['ping', 'print', 'web'],
    goals: [
      { text: 'Put the router and the modem in the network cabinet', done: s => ['rtr', 'mdm'].every(id => slotById(s.devs.find(d => d.id === id)?.slot ?? null)?.kind === 'cabinet') },
      { text: 'Connect the switch to the router', done: s => joined(s, 'sw', 'rtr') },
      { text: 'Connect the router to the modem', done: s => joined(s, 'rtr', 'mdm') },
      { text: 'Connect the modem to the internet line', done: s => joined(s, 'mdm', 'wall') },
      { text: 'Open a website from a computer', done: s => [...s.browsed].some(id => id.startsWith('pc')) }
    ],
    done: 'Your LAN reaches the internet: computer → switch → router → modem → the ISP\'s line.'
  },
  {
    id: 'm4',
    title: 'Fix the network',
    short: 'Find the faults and repair them',
    intro: 'The ICT teacher says: "Some computers cannot get online and the printer is not working." Use Ping and Open a website to find where the data stops. Tap a cable to test it with the cable tester, and replace any broken one.',
    terms: [
      { term: 'Troubleshooting', means: 'Finding a fault step by step: test, see where it fails, fix, test again.' },
      { term: 'Cable tester', means: 'Checks that all 8 wires in a network cable work.' },
      { term: 'Request timed out', means: 'A ping got no reply - something on the way is not connected.' }
    ],
    setup: () => {
      const b = built(3)
      // one cable is missing and one looks fine but is broken
      const pcLost = ['pc1', 'pc2', 'pc3', 'pc4'][Math.floor(Math.random() * 4)]
      b.cables = b.cables.filter(c => !(c.a === pcLost && c.b === 'sw'))
      const breakable = b.cables.filter(c => c.a === 'prn' || (c.a === 'sw' && c.b === 'rtr') || (c.a.startsWith('pc')))
      breakable[Math.floor(Math.random() * breakable.length)].broken = true
      return b
    },
    tools: ['ping', 'print', 'web'],
    goals: [
      { text: 'Every computer can open a website', done: s => ['pc1', 'pc2', 'pc3', 'pc4'].every(p => online(s, p) && s.browsed.has(p)) },
      { text: 'The printer prints again', done: s => s.printed && !s.cables.some(c => c.broken) && joined(s, 'prn', 'sw') }
    ],
    done: 'You found the faults by testing, fixed them, and tested again - that is troubleshooting.'
  },
  {
    id: 'm5',
    title: 'Add Wi-Fi',
    short: 'An access point for laptops and tablets',
    intro: 'A laptop and a tablet need the network, but they have no cable. Put a wireless access point on the ceiling, connect it to the switch, then join each one to the lab\'s Wi-Fi with the right password - and open a website.',
    terms: [
      { term: 'Wi-Fi', means: 'A wireless network: data travels by radio waves instead of cables.' },
      { term: 'Access point', means: 'Sends the network out by Wi-Fi. It is plugged into the switch.' },
      { term: 'SSID', means: 'The name of a Wi-Fi network, like Tusome-Lab.' },
      { term: 'Wi-Fi password', means: 'Keeps strangers off the network. Never join unknown open networks.' }
    ],
    setup: () => {
      const b = built(3)
      b.devs.push(
        { id: 'ap', type: 'ap', name: 'Access point', slot: null },
        { id: 'lap', type: 'laptop', name: 'Laptop', ip: '192.168.1.31', slot: null, fixed: { x: 560, y: 140 } },
        { id: 'tab', type: 'tablet', name: 'Tablet', ip: '192.168.1.32', slot: null, fixed: { x: 580, y: 470 } }
      )
      return b
    },
    tools: ['ping', 'web'],
    goals: [
      { text: 'Put the access point on the ceiling', done: s => devOfType(s, 'ap')?.slot === 'ce' },
      { text: 'Connect the access point to the switch', done: s => joined(s, 'ap', 'sw') },
      { text: 'Join the laptop and the tablet to the lab Wi-Fi', done: s => ['lap', 'tab'].every(id => s.devs.find(d => d.id === id)?.joined) },
      { text: 'Open a website on the laptop and on the tablet', done: s => s.browsed.has('lap') && s.browsed.has('tab') }
    ],
    done: 'Wired and wireless devices now share one network and one internet line.'
  }
]

/** The Wi-Fi networks the laptop and tablet can see */
export const WIFI_LIST = [
  { ssid: 'Tusome-Lab', secure: true, note: 'The lab network (name on the access point)' },
  { ssid: 'FREE_WiFi_FAST', secure: false, note: 'Open - no password' },
  { ssid: 'Neighbour-5G', secure: true, note: '' }
]
export const WIFI_PASSWORDS = ['Lab2026!', 'password', '12345678']
export const WIFI_KEY = 'Lab2026!'
