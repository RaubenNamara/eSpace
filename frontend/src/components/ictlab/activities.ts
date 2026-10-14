// The ICT Lab's activities: each runs step by step at a Simple, Intermediate or Advanced level. A
// step is done when the student does its `action` in the activity's scene (the scene reports what
// they did; the runner checks it against the step). Step keys are shared across levels, so a
// teacher who links a step to their notes links it at every level.

export type IctLevel = 'simple' | 'intermediate' | 'advanced'
export const LEVELS: { key: IctLevel; label: string; blurb: string }[] = [
  { key: 'simple', label: 'Simple', blurb: 'Guided - the part or tool to use is shown, with tips.' },
  { key: 'intermediate', label: 'Intermediate', blurb: 'Steps to follow, no pointers - hints cost points.' },
  { key: 'advanced', label: 'Advanced', blurb: 'Harder tasks, fewer clues - hints cost points.' }
]

export interface IctStep {
  // Stable id - teachers' note links hang off it
  key: string
  // What the scene must report for the step to be done
  action: string
  title: string
  text: string
  hint?: string
  // Anything the scene needs for this step (the part to glow, which cable end, the colour standard)
  data?: Record<string, string | number>
  // Why doing something else now is wrong, by the action done ('*' for anything) - a lesson,
  // not just "not yet"
  wrong?: Record<string, string>
}

export interface IctActivity {
  key: string
  title: string
  summary: string
  icon: string
  scene: 'parts' | 'rj45' | 'assembly' | 'cleaning'
  topic: string
  // `preset`: actions already done when the level starts (e.g. the motherboard already in the case)
  levels: Record<IctLevel, { intro: string; steps: IctStep[]; preset?: string[] }>
}

// ---- Parts of a computer ----

export interface PcPart {
  key: string
  name: string
  does: string
  fails: string
}

// For the parts showroom: how to recognise each major part, where it sits, and one thing worth knowing
export const PART_DETAILS: Record<string, { looks: string; where: string; fact: string }> = {
  motherboard: { looks: 'A large flat board, usually green or black, covered in tiny circuits, with sockets and slots for everything else.', where: 'Screwed flat against the far side of the case, on small brass posts called standoffs, with its ports poking out of the back.', fact: 'The size most desktop boards follow is called ATX - 30.5 cm by 24.4 cm.' },
  cpu: { looks: 'A small square chip, about 4 cm across, with a shiny metal lid on top and hundreds of tiny contacts or pins underneath.', where: 'In the square socket on the motherboard, under the CPU cooler.', fact: 'A modern processor carries out billions of instructions every second - the speed is given in gigahertz (GHz).' },
  cooler: { looks: 'A block of thin metal fins with a fan on it, and a flat copper or aluminium base.', where: 'Sitting on top of the processor, clamped to the motherboard, with a thin layer of thermal paste between them.', fact: 'Without its cooler a processor would overheat and switch the computer off within seconds.' },
  ram: { looks: 'Long thin sticks with a row of black chips and gold contacts along one edge - often with a metal heat spreader on top.', where: 'Standing upright in the long slots beside the processor, held by clips at each end.', fact: 'Everything in RAM is lost when the power goes off - that is why you save your work to the drive.' },
  psu: { looks: 'A heavy metal box with a fan grille, a mains socket and switch at the back, and a bundle of cables coming out.', where: 'At the top or bottom of the case at the back, so its mains socket is reachable from outside.', fact: 'Never open a power supply - it can hold a dangerous electric charge even after it is unplugged.' },
  hdd: { looks: 'A heavy metal box, about the size of a hand (3.5 inch), with a label on top and connectors at one end.', where: 'In a drive bay at the front of the case, joined to the motherboard by a SATA cable.', fact: 'Inside are spinning disks - often 7,200 turns a minute - so a hard disk should never be knocked while it works.' },
  ssd: { looks: 'A small, light, flat box (2.5 inch) - or an even smaller stick that plugs straight into the motherboard.', where: 'In a drive bay, or (the stick kind, M.2) in a small slot on the motherboard.', fact: 'An SSD has no moving parts, so it is silent, faster and copes better with a bump than a hard disk.' },
  gpu: { looks: 'A long card with its own fans and a metal bracket at one end, where the monitor ports are.', where: 'Plugged into the long PCI Express slot on the motherboard, lying across the case, with its bracket screwed to the back.', fact: 'Many computers have no separate graphics card - the graphics are built into the processor.' },
  optical: { looks: 'A wide flat drive with a tray that slides out at the front.', where: 'In the large bay at the top front of the case.', fact: 'New computers often leave it out - programs now come as downloads or on USB.' },
  casefan: { looks: 'A square fan in a frame, usually 8 to 14 cm across.', where: 'On the back or front of the case - at the front pulling cool air in, at the back pushing hot air out.', fact: 'Dust builds up fastest on fans - cleaning them is the first job of computer maintenance.' },
  cmos: { looks: 'A shiny round coin battery, like a large watch battery (CR2032).', where: 'In a small holder on the motherboard.', fact: 'If the computer forgets the date every time it is unplugged, this battery is flat - and it is cheap to replace.' },
  sata: { looks: 'A thin flat cable, often red, with a small L-shaped plug at each end.', where: 'From the back of a drive to a SATA port on the motherboard.', fact: 'The L-shape means it only fits one way round - never force it.' },
  ports: { looks: 'A metal strip of sockets: USB, network (RJ45), monitor (VGA / HDMI) and sound.', where: 'On the back edge of the motherboard, showing through the back of the case.', fact: 'The coloured sound sockets follow a code: green for speakers, pink for a microphone.' }
}
export const PC_PARTS: Record<string, PcPart> = {
  psu: { key: 'psu', name: 'Power supply unit (PSU)', does: 'Turns the mains AC electricity from the socket into the low-voltage DC every part of the computer runs on.', fails: 'A dead PSU means no lights, no fans, nothing at all when you press the power button.' },
  motherboard: { key: 'motherboard', name: 'Motherboard', does: 'The main circuit board. Every other part plugs into it, and it carries signals and power between them.', fails: 'Swollen capacitors or burnt marks can stop the computer starting, or make it restart at random.' },
  cooler: { key: 'cooler', name: 'CPU cooler (heat sink and fan)', does: 'Draws heat away from the processor through metal fins, and the fan blows it away.', fails: 'Dust in the fins or a stopped fan makes the processor overheat, slow down or switch the computer off.' },
  cpu: { key: 'cpu', name: 'Processor (CPU)', does: 'The "brain" - it carries out the instructions of every program. It sits in a socket under the cooler.', fails: 'Overheating is the usual problem; a failed CPU means no picture and often beep codes.' },
  ram: { key: 'ram', name: 'Memory (RAM)', does: 'Holds the programs and data in use right now, so the processor can reach them quickly. Emptied when the power goes off.', fails: 'Loose or faulty RAM gives beep codes at start-up, blue screens, or no picture.' },
  gpu: { key: 'gpu', name: 'Graphics card (GPU)', does: 'Makes the pictures you see on the monitor. Some computers have graphics built into the processor instead.', fails: 'Lines, flicker or no picture; a dusty fan makes it overheat.' },
  hdd: { key: 'hdd', name: 'Hard disk drive (HDD)', does: 'Stores programs and files permanently on spinning magnetic disks - they stay when the power is off.', fails: 'Clicking sounds, very slow start-up, or "no boot device" messages.' },
  ssd: { key: 'ssd', name: 'Solid-state drive (SSD)', does: 'Stores data permanently like a hard disk, but on memory chips with no moving parts - much faster.', fails: 'Usually fails suddenly with no warning - one more reason to keep backups.' },
  optical: { key: 'optical', name: 'Optical drive (DVD)', does: 'Reads and writes CDs and DVDs.', fails: 'Discs not read, or the tray will not open.' },
  casefan: { key: 'casefan', name: 'Case fan', does: 'Moves air through the case - cool air in at the front, hot air out at the back.', fails: 'A noisy or stopped fan lets heat build up inside the case.' },
  cmos: { key: 'cmos', name: 'CMOS battery', does: 'A coin battery that keeps the date, time and BIOS settings while the computer is switched off.', fails: 'When it runs flat, the date and time reset every time the computer is unplugged.' },
  sata: { key: 'sata', name: 'SATA data cable', does: 'Carries data between a drive (hard disk, SSD, DVD) and the motherboard.', fails: 'A loose cable makes the drive disappear - "no boot device found".' },
  ports: { key: 'ports', name: 'Back-panel ports', does: 'Where you plug things in: USB, monitor (VGA/HDMI), sound, and the RJ45 network port for the internet cable.', fails: 'Bent pins or a loose port; a dead network port means no wired internet.' }
}

// "the processor", "the CPU cooler" - lower case, except names that start with initials
const partName = (part: string) => {
  const n = PC_PARTS[part].name.replace(/ \(.*\)$/, '')
  return /^[A-Z]{2}/.test(n) ? n : n.charAt(0).toLowerCase() + n.slice(1)
}
const find = (part: string, text: string, hint: string): IctStep => ({
  key: `find-${part}`, action: `tap:${part}`, title: `Find the ${partName(part)}`, text, hint, data: { target: part }
})
const which = (part: string, text: string, hint: string): IctStep => ({
  key: `what-${part}`, action: `tap:${part}`, title: 'Which part does this?', text, hint, data: { target: part }
})

const partsActivity: IctActivity = {
  key: 'computer-parts',
  title: 'Parts of a computer',
  summary: 'Open the system unit and find each part - what it does, and how it fails.',
  icon: 'kit',
  scene: 'parts',
  topic: 'Computer hardware',
  levels: {
    simple: {
      intro: 'The side of the computer case is open. Drag to turn it round, and tap each part as you are asked - the one to find glows.',
      steps: [
        find('psu', 'Tap the power supply - the metal box where the mains cable plugs in.', 'It is the box at the top of the case, with a fan grille.'),
        find('motherboard', 'Tap the motherboard - the big green board everything plugs into.', 'It covers most of the back of the case.'),
        find('cooler', 'Tap the CPU cooler - the metal fins with a fan on top of the processor.', 'Look for the round fan on the motherboard, near the top.'),
        find('ram', 'Tap the memory (RAM) - the thin sticks standing in slots beside the cooler.', 'Two long thin sticks, to the right of the cooler.'),
        find('hdd', 'Tap the hard disk drive - the metal box in the drive bay at the front.', 'In the bays on the left, the bigger box.'),
        find('casefan', 'Tap the case fan at the back - it blows hot air out of the case.', 'A round fan on the right-hand edge of the case.')
      ]
    },
    intermediate: {
      intro: 'Find each part by its name. Nothing glows now - a hint costs 3 points, a wrong tap 5.',
      steps: [
        find('psu', 'Tap it in the open case.', 'The box with the fan grille, at the top.'),
        find('motherboard', 'Tap it in the open case.', 'The big board all the others plug into.'),
        find('cpu', 'In a real computer it hides under its cooler - here the cooler has been lifted off beside it.', 'A gold square in its socket, next to the cooler.'),
        find('ram', 'Tap it in the open case.', 'Thin sticks standing in slots.'),
        find('gpu', 'Tap it in the open case.', 'A long card lying across the lower part of the motherboard.'),
        find('ssd', 'Tap it in the open case.', 'The small flat drive under the hard disk.'),
        find('cmos', 'Tap it in the open case.', 'A small round coin battery on the motherboard.'),
        find('sata', 'Find a SATA data cable.', 'A thin red cable running from a drive to the motherboard.'),
        find('optical', 'Tap it in the open case.', 'The wide bay at the top front.'),
        find('ports', 'Tap it in the open case.', 'The strip of sockets on the back edge, near the top.')
      ]
    },
    advanced: {
      intro: 'No names this time - tap the part that does each job. A hint costs 3 points, a wrong tap 5.',
      steps: [
        which('psu', 'Turns mains AC electricity into the DC the computer runs on.', 'Where the mains cable plugs in.'),
        which('cpu', 'Carries out the instructions of every program.', 'The "brain" - a gold square in a socket.'),
        which('ram', 'Holds programs while they run, and loses everything when the power goes.', 'It is short-term memory.'),
        which('hdd', 'Stores files permanently on spinning disks.', 'It has moving parts inside.'),
        which('ssd', 'Stores files permanently with no moving parts.', 'Smaller and faster than a hard disk.'),
        which('cmos', 'Keeps the date and time while the computer is unplugged.', 'A coin-shaped battery.'),
        which('gpu', 'Makes the picture you see on the monitor.', 'A long card with its own fans.'),
        which('casefan', 'Pushes hot air out of the case.', 'On the back edge.'),
        which('sata', 'Carries data between a drive and the motherboard.', 'A thin cable, not a power cable.'),
        which('ports', 'Where the RJ45 network cable connects the computer to the network.', 'On the back of the case.')
      ]
    }
  }
}

// ---- RJ45 termination ----

export type WireKey = 'wo' | 'o' | 'wg' | 'g' | 'b' | 'wb' | 'wbr' | 'br'
export const WIRES: Record<WireKey, { name: string; color: string; stripe: string | null }> = {
  wo: { name: 'White-orange', color: '#f8fafc', stripe: '#f97316' },
  o: { name: 'Orange', color: '#f97316', stripe: null },
  wg: { name: 'White-green', color: '#f8fafc', stripe: '#16a34a' },
  g: { name: 'Green', color: '#16a34a', stripe: null },
  b: { name: 'Blue', color: '#2563eb', stripe: null },
  wb: { name: 'White-blue', color: '#f8fafc', stripe: '#2563eb' },
  wbr: { name: 'White-brown', color: '#f8fafc', stripe: '#92400e' },
  br: { name: 'Brown', color: '#92400e', stripe: null }
}
export const STANDARD: Record<'A' | 'B', WireKey[]> = {
  A: ['wg', 'g', 'wo', 'b', 'wb', 'o', 'wbr', 'br'],
  B: ['wo', 'o', 'wg', 'b', 'wb', 'g', 'wbr', 'br']
}

const end = (n: 1 | 2, standard: 'A' | 'B', guided: boolean): IctStep[] => {
  const sfx = n === 2 ? '-2' : ''
  const on = n === 2 ? ' on the other end' : ''
  const order = STANDARD[standard].map(w => WIRES[w].name).join(', ')
  return [
    { key: `strip${sfx}`, action: `strip${sfx}`, title: `Strip the outer jacket${on}`, text: 'Use the cable stripper to remove about 2-3 cm of the outer jacket, without cutting the wires inside.', hint: 'Choose the Stripper tool.', data: { end: n, standard } },
    { key: `untwist${sfx}`, action: `untwist${sfx}`, title: 'Untwist the pairs', text: 'There are four twisted pairs. Tap each pair to untwist it and straighten the wires.', hint: 'Tap each of the four twisted pairs once.', data: { end: n, standard } },
    { key: `arrange${sfx}`, action: `arrange${sfx}`, title: `Arrange the wires - T568${standard}`, text: guided ? `Put the 8 wires in T568${standard} order, from pin 1 on the left: ${order}. Tap a wire, then a slot.` : `Put the 8 wires in T568${standard} order, from pin 1 on the left. Tap a wire, then a slot, then Check.`, hint: `T568${standard}: ${order}.`, data: { end: n, standard } },
    { key: `trim${sfx}`, action: `trim${sfx}`, title: 'Trim the wires', text: 'Cut the wires straight across, leaving about 1.3 cm - just long enough to reach the end of the connector.', hint: 'Choose the Cutter tool.', data: { end: n, standard } },
    { key: `insert${sfx}`, action: `insert${sfx}`, title: 'Push the wires into the connector', text: 'Hold the RJ45 connector with the clip facing down, and push the wires in until every one reaches the end.', hint: 'Clip down - pin 1 is then on the left.', data: { end: n, standard } },
    { key: `crimp${sfx}`, action: `crimp${sfx}`, title: 'Crimp the connector', text: 'Put the connector in the crimping tool and squeeze firmly - press and hold Crimp.', hint: 'Press and hold the Crimp button until it fills.', data: { end: n, standard } }
  ]
}

const rj45Activity: IctActivity = {
  key: 'rj45',
  title: 'Terminating an RJ45 cable',
  summary: 'Strip, untwist, order, trim, insert, crimp and test a network cable.',
  icon: 'bolt',
  scene: 'rj45',
  topic: 'Computer networks',
  levels: {
    simple: {
      intro: 'Make a straight-through network cable end in the T568B standard. The colour order is shown for you.',
      steps: [
        ...end(1, 'B', true),
        { key: 'test', action: 'test', title: 'Test the cable', text: 'Plug both ends into the cable tester. The lights should come on 1 to 8, in the same order on both sides.', hint: 'Choose the Tester tool.', data: { end: 1, standard: 'B' } }
      ]
    },
    intermediate: {
      intro: 'Make a T568B cable end on your own - no colour guide. A hint costs 3 points, a mistake 5.',
      steps: [
        ...end(1, 'B', false),
        { key: 'test', action: 'test', title: 'Test the cable', text: 'Use the cable tester to check all 8 wires connect in order.', hint: 'Choose the Tester tool.', data: { end: 1, standard: 'B' } }
      ]
    },
    advanced: {
      intro: 'Make a crossover cable: one end in T568A, the other in T568B - then test it. A hint costs 3 points, a mistake 5.',
      steps: [
        ...end(1, 'A', false),
        ...end(2, 'B', false),
        { key: 'test-crossover', action: 'test', title: 'Test the crossover cable', text: 'Use the cable tester. On a crossover cable, pins 1 and 2 light up opposite 3 and 6.', hint: 'Choose the Tester tool.', data: { end: 2, standard: 'B', crossover: 1 } }
      ]
    }
  }
}


// ---- Assembling a computer ----

// The parts fitted from the tray, in the order they appear there
export const ASSEMBLY_PARTS: { key: string; name: string }[] = [
  { key: 'motherboard', name: 'Motherboard' },
  { key: 'cpu', name: 'Processor (CPU)' },
  { key: 'cooler', name: 'CPU cooler' },
  { key: 'ram', name: 'Memory (RAM)' },
  { key: 'psu', name: 'Power supply' },
  { key: 'hdd', name: 'Hard disk drive' },
  { key: 'gpu', name: 'Graphics card' }
]

const SAFETY_FIRST = 'Never work inside a computer that is plugged in - switch it off and unplug the mains cable first.'
const STRAP_FIRST = 'Put on the anti-static wrist strap before touching the parts - static from your body can kill a chip without you even feeling it.'
const PASTE_FIRST = 'Thermal paste goes on the processor before the cooler - without it the processor overheats.'
const CLOSE_FIRST = 'Close the case before switching on - an open case is unsafe, and the fans cannot cool it properly.'

const asm = {
  unplug: { key: 'unplug', action: 'unplug', title: 'Switch off and unplug', text: 'Shut the computer down, switch off at the socket and pull out the mains cable at the back.', hint: 'Use the Mains cable button.', wrong: { '*': SAFETY_FIRST } } as IctStep,
  strap: { key: 'strap', action: 'strap', title: 'Put on the anti-static wrist strap', text: 'Clip the wrist strap to bare metal on the case, so any static in your body goes to the case, not the parts.', hint: 'Use the Wrist strap button.', wrong: { '*': STRAP_FIRST } } as IctStep,
  motherboard: { key: 'motherboard', action: 'place:motherboard', title: 'Fit the motherboard', text: 'Line its ports up with the back panel and lay it on the standoffs, then screw it down.', hint: 'Pick the motherboard from the tray, then tap the big outline in the case.' } as IctStep,
  cpu: (ask: boolean): IctStep => ({ key: 'cpu', action: 'place:cpu', title: 'Fit the processor', text: ask ? 'Lift the socket lever, line the processor up, and lower it in - no pressing.' : 'Lift the socket lever, line up the small gold triangle on the processor with the one on the socket, lower it in and close the lever.', hint: 'Pick the processor, then tap the socket on the motherboard.', data: ask ? { ask: 'cpu' } : undefined, wrong: { 'place:cooler': 'The processor goes in first - the cooler sits on top of it.' } }),
  paste: (ask: boolean): IctStep => ({ key: 'paste', action: 'paste', title: 'Apply thermal paste', text: ask ? 'Put thermal paste on the processor.' : 'Squeeze a small pea-sized dot of thermal paste onto the middle of the processor - the cooler will spread it.', hint: 'Use the Thermal paste button.', data: ask ? { ask: 'paste' } : undefined, wrong: { 'place:cooler': PASTE_FIRST } }),
  cooler: { key: 'cooler', action: 'place:cooler', title: 'Fit the CPU cooler', text: 'Sit the cooler squarely on the processor and fasten it down evenly, corner to corner.', hint: 'Pick the cooler, then tap its outline beside the processor.' } as IctStep,
  cpuFan: { key: 'cpu-fan', action: 'connect:cpu_fan', title: 'Plug in the cooler fan', text: 'Plug the cooler fan cable into the little header marked CPU_FAN, just above the cooler.', hint: 'Tap the small white connector just above the cooler, to its right - its label says CPU_FAN.' } as IctStep,
  ram: (ask: boolean): IctStep => ({ key: 'ram', action: 'place:ram', title: 'Fit the memory (RAM)', text: ask ? 'Open the clips on the memory slots and fit the RAM sticks.' : 'Open the clips, line up the notch on the stick with the bump in the slot, and press both ends down until the clips click.', hint: 'Pick the RAM, then tap the memory slots beside the cooler.', data: ask ? { ask: 'ram' } : undefined }),
  psu: { key: 'psu', action: 'place:psu', title: 'Fit the power supply', text: 'Slide the power supply into its bay at the top with the fan facing out, and screw it in at the back.', hint: 'Pick the power supply, then tap the outline at the top.' } as IctStep,
  atx: { key: 'atx-power', action: 'connect:atx24', title: 'Connect the motherboard power', text: 'Plug the wide 24-pin cable from the power supply into the motherboard - it only fits one way.', hint: 'Tap the 24-PIN connector on the right edge of the motherboard.' } as IctStep,
  hdd: { key: 'hdd', action: 'place:hdd', title: 'Fit the hard disk drive', text: 'Slide the drive into a bay at the front and screw it in.', hint: 'Pick the hard disk, then tap the drive bay outline.' } as IctStep,
  sata: { key: 'sata', action: 'connect:sata', title: 'Connect the drive', text: 'Plug a SATA data cable from the drive into a SATA port on the motherboard, and a SATA power cable from the power supply into the drive.', hint: 'Tap the SATA port on the motherboard, beside the drive.' } as IctStep,
  gpu: { key: 'gpu', action: 'place:gpu', title: 'Fit the graphics card', text: 'Remove the slot cover at the back, then push the card firmly into the long PCI Express slot until it clicks.', hint: 'Pick the graphics card, then tap its outline across the lower motherboard.' } as IctStep,
  panel: { key: 'front-panel', action: 'connect:fpanel', title: 'Connect the front panel', text: 'Plug the case power button and light wires onto the F_PANEL pins at the bottom of the motherboard - without them the power button does nothing.', hint: 'Tap the F_PANEL pins at the bottom of the motherboard.' } as IctStep,
  close: { key: 'close', action: 'close', title: 'Put the side panel back', text: 'Check no cable touches a fan, then slide the side panel on and screw it shut.', hint: 'Use the Side panel button.' } as IctStep,
  plug: { key: 'plug-in', action: 'plug', title: 'Plug the mains cable back in', text: 'Plug the mains cable into the power supply and switch on at the socket.', hint: 'Use the Mains cable button.', wrong: { power: 'It has no power yet - plug the mains cable in first.' } } as IctStep,
  power: { key: 'power-on', action: 'power', title: 'Switch it on', text: 'Press the power button. A healthy computer gives one short beep and starts up.', hint: 'Use the Power button.' } as IctStep
}
// Closing up before the work is done, or switching on with the case open, is its own lesson
asm.close.wrong = { power: CLOSE_FIRST, plug: CLOSE_FIRST }

const assemblyActivity: IctActivity = {
  key: 'assembly',
  title: 'Assembling a computer',
  summary: 'Fit the processor, cooler, memory, drives and cables in the right order - then switch on.',
  icon: 'wrench',
  scene: 'assembly',
  topic: 'Computer hardware',
  levels: {
    simple: {
      intro: 'The motherboard and power supply are already in. Drag each part from the desk into the case (or tap it, then tap where it goes) - what to use glows.',
      preset: ['place:motherboard', 'place:psu', 'connect:atx24', 'place:gpu'],
      steps: [asm.unplug, asm.strap, asm.cpu(false), asm.paste(false), asm.cooler, asm.cpuFan, asm.ram(false), asm.hdd, asm.sata, asm.close, asm.plug, asm.power]
    },
    intermediate: {
      intro: 'Only the motherboard is in. Fit the rest yourself, the right way round - a hint costs 3 points, a mistake 5.',
      preset: ['place:motherboard'],
      steps: [asm.unplug, asm.strap, asm.cpu(true), asm.paste(false), asm.cooler, asm.cpuFan, asm.ram(true), asm.psu, asm.atx, asm.hdd, asm.sata, asm.gpu, asm.close, asm.plug, asm.power]
    },
    advanced: {
      intro: 'An empty case. Build the whole computer - safely, in the right order, and the right way round. A hint costs 3 points, a mistake 5.',
      steps: [asm.unplug, asm.strap, asm.motherboard, asm.cpu(true), asm.paste(true), asm.cooler, asm.cpuFan, asm.ram(true), asm.psu, asm.atx, asm.hdd, asm.sata, asm.gpu, asm.panel, asm.close, asm.plug, asm.power]
    }
  }
}

// ---- Cleaning a computer (dust) ----

// What gets dusty, in the order it is cleaned, and its name in the steps
export const DUSTY: { key: string; name: string; fan: boolean }[] = [
  { key: 'cooler', name: 'CPU cooler', fan: true },
  { key: 'gpu', name: 'graphics card', fan: true },
  { key: 'casefan', name: 'case fan', fan: true },
  { key: 'psu', name: 'power supply grille', fan: false },
  { key: 'ram', name: 'memory slots', fan: false },
  { key: 'floor', name: 'bottom of the case', fan: false }
]

const HOLD_WHY = 'Hold the fan still with a finger first - spun by the air it turns far too fast, which wears it out and can even push power back into the motherboard.'
const cln = {
  unplug: { key: 'unplug', action: 'unplug', title: 'Switch off and unplug', text: 'Shut the computer down, switch off at the socket and pull out the mains cable.', hint: 'Use the Mains cable button (or tap the cable behind the computer).', wrong: { '*': SAFETY_FIRST } } as IctStep,
  outside: { key: 'outside', action: 'outside', title: 'Take it where there is fresh air', text: 'Carry the computer outside, or next to an open window - the dust you blow out must not settle back in the room.', hint: 'Use the Fresh air button.' } as IctStep,
  mask: { key: 'mask', action: 'mask', title: 'Put on a dust mask', text: 'Computer dust is fine and dirty - wear a mask so you do not breathe it in.', hint: 'Use the Dust mask button.' } as IctStep,
  open: { key: 'open-case', action: 'open', title: 'Take the side panel off', text: 'Undo the thumb screws at the back and slide the side panel off.', hint: 'Use the Side panel button (or tap the glass panel).' } as IctStep,
  blower: (ask: boolean): IctStep => ({ key: 'blower', action: 'blower', title: 'Pick up a dust blower', text: ask ? 'Choose your dust blower: a can of compressed air, or an electric blower.' : 'Choose a dust blower: a can of compressed air (held upright), or an electric blower that plugs into the wall socket.', hint: 'Use the Air can or the Electric blower button. An electric blower must be plugged in and switched on before it blows.', data: ask ? { ask: 'blower' } : undefined }),
  hold: (k: string, name: string): IctStep => ({ key: `hold-${k}`, action: `hold:${k}`, title: `Hold the ${name} still`, text: `Choose Hold a fan, then tap the ${name} - your finger keeps it from spinning while you blow.`, hint: `Choose Hold a fan, then tap the ${name}.`, wrong: { [`clean:${k}`]: HOLD_WHY } }),
  clean: (k: string, name: string, text: string): IctStep => ({ key: `clean-${k}`, action: `clean:${k}`, title: `Blow the dust off the ${name}`, text, hint: `With a dust blower in your hand (an electric one plugged in and switched on), press and hold on the ${name} until the dust is gone.` }),
  close: { key: 'close', action: 'close', title: 'Put the side panel back', text: 'Slide the side panel back on and do up the thumb screws.', hint: 'Use the Side panel button.', wrong: { power: CLOSE_FIRST, plug: CLOSE_FIRST } } as IctStep,
  plug: { key: 'plug-in', action: 'plug', title: 'Plug it back in', text: 'Take the computer back, plug the mains cable in and switch on at the socket.', hint: 'Use the Mains cable button.', wrong: { power: 'It has no power yet - plug the mains cable in first.' } } as IctStep,
  power: { key: 'power-on', action: 'power', title: 'Switch it on', text: 'Press the power button - with the dust gone it runs cooler and quieter.', hint: 'Use the Power button.' } as IctStep
}
const C_COOLER = cln.clean('cooler', 'CPU cooler', 'Short bursts of air into the fins of the heat sink - the dust packs in there and makes the processor overheat.')
const C_GPU = cln.clean('gpu', 'graphics card', 'Short bursts over the fans and along the card.')
const C_CASEFAN = cln.clean('casefan', 'case fan', 'Blow through the case fan, from inside towards the back.')
const C_PSU = cln.clean('psu', 'power supply grille', 'Blow through the power supply grille from outside - never open a power supply.')
const C_RAM = cln.clean('ram', 'memory slots', 'Blow the dust out of the memory sticks and their slots.')
const C_FLOOR = cln.clean('floor', 'bottom of the case', 'Blow the dust that has settled on the bottom of the case out through the open side.')

const cleaningActivity: IctActivity = {
  key: 'cleaning',
  title: 'Cleaning a dusty computer',
  summary: 'Blow the dust out of a dirty computer with an air can or an electric blower - unplugged, outside, fans held still.',
  icon: 'leaf',
  scene: 'cleaning',
  topic: 'Computer maintenance',
  levels: {
    simple: {
      intro: 'This computer is full of dust and running hot. Clean it the safe way - what to use glows.',
      steps: [cln.unplug, cln.outside, cln.open, cln.blower(false), cln.hold('cooler', 'CPU cooler fan'), C_COOLER, cln.hold('casefan', 'case fan'), C_CASEFAN, C_PSU, cln.close, cln.plug, cln.power]
    },
    intermediate: {
      intro: 'Clean every dusty part, safely and in a sensible order. A hint costs 3 points, a mistake 5.',
      steps: [cln.unplug, cln.outside, cln.open, cln.blower(true), cln.hold('cooler', 'CPU cooler fan'), C_COOLER, cln.hold('gpu', 'graphics card fans'), C_GPU, cln.hold('casefan', 'case fan'), C_CASEFAN, C_PSU, C_FLOOR, cln.close, cln.plug, cln.power]
    },
    advanced: {
      intro: 'A full clean, the way a technician does it - protect yourself, short bursts only (a long blast counts as a mistake). A hint costs 3 points, a mistake 5.',
      steps: [cln.unplug, cln.outside, cln.mask, cln.open, cln.blower(true), cln.hold('cooler', 'CPU cooler fan'), C_COOLER, cln.hold('gpu', 'graphics card fans'), C_GPU, C_RAM, cln.hold('casefan', 'case fan'), C_CASEFAN, C_PSU, C_FLOOR, cln.close, cln.plug, cln.power]
    }
  }
}

export const ACTIVITIES: IctActivity[] = [partsActivity, assemblyActivity, cleaningActivity, rj45Activity]

// Planned next, shown on the lab's front page
export const COMING: { title: string; summary: string; icon: string }[] = [
  { title: 'Troubleshooting', summary: 'No power, beeps, no display, overheating - find the fault step by step.', icon: 'bulb' }
]

export const activityByKey = (key: string) => ACTIVITIES.find(a => a.key === key) || null
