import * as THREE from 'three'

/**
 * The labelled details of each part and device in the showroom: numbered spots on the 3D model
 * (a CPU socket, the RAM slots, a mouse's scroll wheel...) that a student taps to fly in close
 * and read what that bit is for. Positions are in the model's own coordinates (see
 * three/pcModel.ts and three/devices.ts); `n` is the way the spot faces, so it can be hidden
 * when the model is turned away. Also how each one is turned on the stand to show its working side.
 */
export interface Closeup {
  label: string
  text: string
  at: THREE.Vector3Tuple
  n?: THREE.Vector3Tuple
}

const X: THREE.Vector3Tuple = [1, 0, 0]
const NX: THREE.Vector3Tuple = [-1, 0, 0]
const Y: THREE.Vector3Tuple = [0, 1, 0]
const NY: THREE.Vector3Tuple = [0, -1, 0]

export const CLOSEUPS: Record<string, Closeup[]> = {
  motherboard: [
    { label: 'Processor socket', text: 'Where the processor (CPU) sits. Hundreds of tiny pins touch the pads under the processor; the metal lever locks it down.', at: [-0.047, 0.078, 0.007] },
    { label: 'Memory (DIMM) slots', text: 'The long slots for the memory (RAM) sticks. Clips at each end snap shut when a stick is pushed fully home.', at: [0.042, 0.06, 0.012] },
    { label: 'PCI Express x16 slot', text: 'The long expansion slot for the graphics card - the fastest slot on the board.', at: [0.02, -0.035, 0.013] },
    { label: 'PCI Express x1 slot', text: 'A short expansion slot for smaller cards, such as a Wi-Fi card or an extra network card.', at: [0, -0.075, 0.011] },
    { label: 'Chipset (under its heat sink)', text: 'Directs traffic between the processor and the drives, USB ports and expansion slots. It gets warm, so it wears a small heat sink.', at: [0.04, -0.105, 0.015] },
    { label: 'Power stage (VRM) heat sinks', text: 'The parts under these metal blocks turn 12 volts from the power supply into the steady, low voltage the processor needs.', at: [-0.088, 0.085, 0.018] },
    { label: 'Capacitors', text: 'Small cans that store charge and smooth the power. Swollen or leaking capacitors are a common sign of a dying motherboard.', at: [-0.05, 0.032, 0.01] },
    { label: '24-pin main power connector', text: 'The widest plug from the power supply goes here - it powers the whole motherboard.', at: [0.112, 0.02, 0.016] },
    { label: 'SATA ports', text: 'Small L-shaped sockets for the data cables of hard disks, SSDs and DVD drives.', at: [-0.112, -0.056, 0.01] },
    { label: 'CPU fan header', text: 'A small 4-pin socket for the processor cooler\'s fan. The board speeds the fan up as the processor gets hotter.', at: [0.02, 0.13, 0.01] },
    { label: 'Front-panel header', text: 'The tiny pins where the case\'s power button, reset button and lights connect.', at: [-0.06, -0.142, 0.01] },
    { label: 'CMOS battery', text: 'A coin cell that keeps the clock and BIOS settings while the computer is unplugged.', at: [-0.07, -0.1, 0.007] },
    { label: 'Back-panel ports', text: 'The ports that show at the back of the case: USB, network (RJ45), monitor and sound.', at: [0.112, 0.07, 0.038] }
  ],
  cpu: [
    { label: 'Metal lid (heat spreader)', text: 'Covers the silicon chip and spreads its heat. The cooler presses on it, with thermal paste in between.', at: [0, 0, 0.0046] },
    { label: 'Gold triangle', text: 'Marks pin 1. Line it up with the triangle on the socket - the processor only fits one way.', at: [-0.016, -0.016, 0.002] },
    { label: 'Green board (substrate)', text: 'Carries the chip, with hundreds of gold contact pads underneath that touch the socket\'s pins.', at: [0.017, 0.008, 0.0016] }
  ],
  cooler: [
    { label: 'Fan', text: 'Blows air through the fins to carry the heat away. It is powered from the CPU_FAN header.', at: [0, 0, 0.065] },
    { label: 'Aluminium fins', text: 'Thin metal fins give the heat a large surface to escape from.', at: [0.034, 0.03, 0.03], n: X },
    { label: 'Copper base', text: 'Sits flat on the processor. Copper carries heat very well.', at: [0.034, -0.034, 0.004], n: X }
  ],
  ram: [
    { label: 'Memory chips', text: 'The black chips hold the data. More or bigger chips mean more gigabytes.', at: [0.0165, -0.03, 0.017], n: X },
    { label: 'Gold contacts', text: 'Push into the slot on the motherboard. A notch between them lets the stick fit only one way round.', at: [0.0165, 0.03, 0.002], n: X },
    { label: 'Two sticks', text: 'Two matching sticks in the right slots work together (dual channel) and are faster than one.', at: [0.0165, 0.055, 0.028], n: X }
  ],
  gpu: [
    { label: 'Fans', text: 'Graphics cards get hot. These fans blow air over a heat sink hidden under the cover.', at: [-0.05, -0.04, 0.058], n: NY },
    { label: 'Gold contacts', text: 'Push into the long PCI Express x16 slot on the motherboard.', at: [-0.01, -0.006, 0.002], n: NY },
    { label: 'Metal bracket', text: 'Screws to the back of the case. The monitor plugs into the ports on this bracket.', at: [0.111, -0.012, 0.03], n: X }
  ],
  psu: [
    { label: 'Rating label', text: 'Says how much power it can give (here 500 W) and what mains it takes (220-240 V). Never open a power supply.', at: [-0.02, 0.004, 0.071] },
    { label: 'Mains socket', text: 'The kettle-type power cable from the wall socket plugs in here, at the back of the computer.', at: [0.077, 0.012, 0.03], n: X },
    { label: 'Power switch', text: 'Switches the whole power supply off - the computer gets no power at all.', at: [0.077, -0.02, 0.03], n: X },
    { label: 'Vent grille', text: 'Lets the hot air out. Keep it free of dust.', at: [0.077, 0.03, -0.04], n: X }
  ],
  hdd: [
    { label: 'Label', text: 'Tells the size (3.5 inch), how much it holds (1 TB) and how fast the disks spin (7200 turns a minute).', at: [0, 0.014, 0.02], n: Y },
    { label: 'Sealed case', text: 'Inside are shiny spinning disks (platters) and an arm that reads and writes them. Dropping it can break it.', at: [-0.05, 0.014, -0.03], n: Y },
    { label: 'SATA connectors', text: 'A data cable and a power cable plug in at this end.', at: [0.077, 0, -0.02], n: X }
  ],
  ssd: [
    { label: 'Flash memory inside', text: 'Stores data on memory chips - no moving parts, so it is quiet, fast and does not mind a bump.', at: [0, 0.004, 0], n: Y },
    { label: '2.5-inch size', text: 'Smaller than a 3.5-inch hard disk; it uses the same SATA cables.', at: [0.04, 0.004, 0.026], n: Y }
  ],
  optical: [
    { label: 'Disc tray', text: 'Slides out when you press eject. Put the disc in, label side up.', at: [-0.0885, 0.004, 0], n: NX },
    { label: 'Back connectors', text: 'SATA data and power plug in at the back, inside the case.', at: [0.085, 0, 0], n: X }
  ],
  casefan: [
    { label: 'Blades', text: 'Pull hot air out of the back of the case.', at: [0.006, 0, 0.012], n: X },
    { label: 'Screw holes', text: 'Four screws hold the fan to the case.', at: [0.006, 0.04, 0.04], n: X }
  ],
  ports: [
    { label: 'USB ports', text: 'For keyboards, mice, flash disks and printers.', at: [0.012, 0.04, 0], n: X },
    { label: 'Network (RJ45) port', text: 'The internet cable from the switch or router plugs in here.', at: [0.012, 0.005, 0], n: X },
    { label: 'VGA port', text: 'The blue port for older monitors and projectors.', at: [0.012, -0.025, 0], n: X },
    { label: 'Sound jacks', text: 'Green for speakers or headphones, pink for the microphone.', at: [0.012, -0.055, 0], n: X }
  ],
  keyboard: [
    { label: 'Letter keys (QWERTY)', text: 'Named after the first six letters on the top row.', at: [-0.1, 0.031, -0.005], n: Y },
    { label: 'Space bar', text: 'The longest key - puts a space between words.', at: [-0.02, 0.031, 0.037], n: Y },
    { label: 'Number pad', text: 'Calculator-style keys for typing numbers quickly.', at: [0.155, 0.031, -0.015], n: Y },
    { label: 'USB cable', text: 'Plugs into a USB port on the computer.', at: [0, 0.01, -0.13], n: Y }
  ],
  mouse: [
    { label: 'Left button', text: 'Click to select; double-click to open.', at: [-0.013, 0.033, -0.03], n: Y },
    { label: 'Right button', text: 'Click to open a menu of choices for what you pointed at.', at: [0.013, 0.033, -0.03], n: Y },
    { label: 'Scroll wheel', text: 'Roll it to move up and down a page.', at: [0, 0.036, -0.022], n: Y },
    { label: 'Cable', text: 'Plugs into USB. A wireless mouse has a small USB receiver instead.', at: [0.03, 0.006, -0.14], n: Y }
  ],
  monitor: [
    { label: 'Screen', text: 'An LCD/LED panel made of millions of tiny dots (pixels).', at: [0.1, 0.3, 0.006] },
    { label: 'Power light', text: 'Green when on; orange when it is waiting for a picture (standby).', at: [0.24, 0.115, 0.008] },
    { label: 'Stand', text: 'Holds the screen; on many monitors it tilts.', at: [0, 0.07, -0.016] }
  ],
  printer: [
    { label: 'Paper tray (in)', text: 'Blank paper goes in here.', at: [0, 0.205, -0.2], n: [0, 0.9, -0.45] },
    { label: 'Output tray', text: 'Printed pages come out here.', at: [0, 0.06, 0.2], n: Y },
    { label: 'Control panel', text: 'Buttons and a small screen to switch on, cancel or copy.', at: [0.14, 0.163, 0.08], n: Y }
  ],
  tower: [
    { label: 'Power button', text: 'Press once to switch on. To switch off, use Shut down - do not hold the button.', at: [0, 0.37, 0.214] },
    { label: 'Power light', text: 'Glows while the computer is on.', at: [0.03, 0.37, 0.214] },
    { label: 'Front USB ports', text: 'Handy for flash disks.', at: [-0.03, 0.37, 0.214] },
    { label: 'Drive bay', text: 'Where a DVD drive fits.', at: [0, 0.33, 0.213] },
    { label: 'Air vents', text: 'Cool air comes in here. Keep them clear.', at: [0, 0.15, 0.213] }
  ],
  laptop: [
    { label: 'Screen', text: 'Folds down to close the laptop.', at: [0, 0.126, -0.134], n: [0, 0.25, 0.97] },
    { label: 'Keyboard', text: 'Built in, usually without a number pad.', at: [0, 0.02, -0.035], n: Y },
    { label: 'Touchpad', text: 'Does the job of a mouse - slide a finger to move the pointer, tap to click.', at: [0, 0.019, 0.07], n: Y }
  ]
}

const turn = (x: number, y: number, z: number) => new THREE.Quaternion().setFromEuler(new THREE.Euler(x, y, z))

/** How a model is turned on the stand so its working side faces the student */
export const STAND_TURN: Record<string, THREE.Quaternion> = {
  // the memory sticks lie along, contacts down, chips facing out
  ram: new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(new THREE.Vector3(0, 0, 1), new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0))),
  gpu: turn(-Math.PI / 2, 0, 0), // fans to the front
  psu: turn(0, -0.55, 0), // the label and the back both show
  hdd: turn(Math.PI / 2, 0, 0), // label to the front
  ssd: turn(Math.PI / 2, 0, 0),
  optical: turn(0, Math.PI / 2, 0), // the tray to the front
  casefan: turn(0, -Math.PI / 2, 0),
  ports: turn(0, -Math.PI / 2, 0)
}
