import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import type { Workbench } from './workbench'
import { WALL_Z } from './labRoom'

/**
 * Mains power the way it is in a Ugandan classroom: a UK-style double switched socket on the wall
 * above the bench (BS 1363 - a rocker switch over each outlet, red flag showing when on) and a
 * 3-pin plug on a cable to the computer. The plug can be dragged into an outlet (it snaps in) or
 * pulled out (it drops onto the bench); the switches rock on and off. A device has power only when
 * its plug is in AND its outlet is switched on.
 */
export interface Outlet {
  /** where a plug sits when it is pushed in (world) */
  pose: { pos: THREE.Vector3; quat: THREE.Quaternion }
  rocker: THREE.Object3D
  flag: THREE.Mesh
  on: boolean
}
export interface Plug {
  group: THREE.Group
  cable: THREE.Mesh
  /** the outlet it is in, or null */
  inOutlet: number | null
  rest: { pos: THREE.Vector3; quat: THREE.Quaternion }
  /** where its cable goes (world) - a function, so it can follow a moving device */
  deviceEnd: () => THREE.Vector3
}
export interface PowerKit {
  socket: THREE.Group
  outlets: Outlet[]
  plugs: Plug[]
  setSwitch: (outlet: number, on: boolean, animate?: boolean) => void
  setPlug: (plug: number, outlet: number | null, animate?: boolean) => Promise<void>
  /** is a plug in a switched-on outlet */
  powered: (plug: number) => boolean
  /** keep the cables following their plugs - call every frame */
  update: () => void
}

const white = () => new THREE.MeshStandardMaterial({ color: 0xf4f4f0, roughness: 0.35 })
const slot = new THREE.MeshStandardMaterial({ color: 0x1c1917, roughness: 0.9 })

/** A short click, for switches and buttons */
let audio: AudioContext | null = null
export function click(pitch = 1) {
  try {
    audio ??= new AudioContext()
    const len = 0.03
    const buf = audio.createBuffer(1, Math.floor(audio.sampleRate * len), audio.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 6)
    const src = audio.createBufferSource()
    src.buffer = buf
    src.playbackRate.value = pitch
    const g = audio.createGain()
    g.gain.value = 0.35
    src.connect(g).connect(audio.destination)
    src.start()
  } catch {
    // no sound on this device
  }
}

/** A UK 3-pin plug: the body faces +z, its pins point -z (into the wall), the cable leaves the bottom */
function buildPlug(color: number) {
  const g = new THREE.Group()
  const body = new THREE.Mesh(new RoundedBoxGeometry(0.046, 0.05, 0.026, 3, 0.006), new THREE.MeshStandardMaterial({ color, roughness: 0.45 }))
  g.add(body)
  const grip = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.004, 0.027), new THREE.MeshStandardMaterial({ color: color === 0xf4f4f0 ? 0xe2e2dc : 0x262626, roughness: 0.6 }))
  grip.position.y = -0.012
  g.add(grip)
  const brass = new THREE.MeshStandardMaterial({ color: 0xc9a227, metalness: 0.9, roughness: 0.3 })
  const earth = new THREE.Mesh(new THREE.BoxGeometry(0.004, 0.008, 0.022), brass)
  earth.position.set(0, 0.011, -0.024)
  const live = new THREE.Mesh(new THREE.BoxGeometry(0.0065, 0.004, 0.018), brass)
  live.position.set(0.011, -0.011, -0.022)
  const neutral = live.clone()
  neutral.position.x = -0.011
  g.add(earth, live, neutral)
  g.traverse(o => { o.castShadow = true })
  return g
}

/** The point the cable leaves a plug from (in the plug's frame) */
const TAIL = new THREE.Vector3(0, -0.026, 0.002)

export function buildPowerKit(wb: Workbench, opts: {
  /** where the socket sits on the wall (x, height above the bench) */
  socketX: number
  socketY?: number
  plugs: { deviceEnd: () => THREE.Vector3; rest: THREE.Vector3; color?: number; startIn?: number | null }[]
  switchesOn?: boolean[]
}): PowerKit {
  const scene = wb.scene
  const socket = new THREE.Group()
  const plate = new THREE.Mesh(new RoundedBoxGeometry(0.146, 0.086, 0.01, 3, 0.004), white())
  plate.receiveShadow = true
  plate.castShadow = true
  socket.add(plate)
  const outlets: Outlet[] = []
  const y = opts.socketY ?? 0.13
  socket.position.set(opts.socketX, y, WALL_Z + 0.005)
  scene.add(socket)

  for (const side of [-1, 1]) {
    const cx = side * 0.036
    // the three holes: earth on top, live and neutral below
    const e = new THREE.Mesh(new THREE.BoxGeometry(0.005, 0.009, 0.002), slot)
    e.position.set(cx, -0.002, 0.0051)
    const l = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.005, 0.002), slot)
    l.position.set(cx + 0.011, -0.022, 0.0051)
    const n = l.clone()
    n.position.x = cx - 0.011
    socket.add(e, l, n)
    // the rocker switch above it, with a red flag that shows when it is on
    const rocker = new THREE.Group()
    const rk = new THREE.Mesh(new RoundedBoxGeometry(0.016, 0.011, 0.006, 2, 0.0015), white())
    rk.position.z = 0.003
    rocker.add(rk)
    const flag = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.003, 0.001), new THREE.MeshStandardMaterial({ color: 0xdc2626, emissive: 0x7f1d1d, emissiveIntensity: 0.6 }))
    flag.position.set(0, 0.003, 0.0064)
    rocker.add(flag)
    rocker.position.set(cx, 0.026, 0.005)
    socket.add(rocker)
    // the plug's place: over the holes, sticking out of the wall
    const pos = socket.localToWorld(new THREE.Vector3(cx, -0.008, 0.005 + 0.013))
    outlets.push({ pose: { pos, quat: new THREE.Quaternion() }, rocker, flag, on: false })
  }
  socket.updateMatrixWorld(true)
  for (const [i, o] of outlets.entries()) {
    const cx = (i === 0 ? -1 : 1) * 0.036
    o.pose.pos.copy(socket.localToWorld(new THREE.Vector3(cx, -0.008, 0.018)))
  }

  const setSwitch = (i: number, on: boolean, animate = true) => {
    const o = outlets[i]
    if (!o) return
    if (animate && o.on !== on) click(on ? 1.2 : 0.9)
    o.on = on
    o.rocker.rotation.x = on ? 0.32 : -0.32
    o.flag.visible = on
  }
  outlets.forEach((_o, i) => setSwitch(i, !!opts.switchesOn?.[i], false))

  // the plugs, each with its cable
  const LYING = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0.2))
  const plugs: Plug[] = opts.plugs.map(p => {
    const group = buildPlug(p.color ?? 0x1f1f1f)
    const cable = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshStandardMaterial({ color: p.color === 0xf4f4f0 ? 0xe7e5e4 : 0x18181b, roughness: 0.55 }))
    cable.castShadow = true
    scene.add(group, cable)
    const plug: Plug = { group, cable, inOutlet: null, rest: { pos: p.rest.clone(), quat: LYING.clone() }, deviceEnd: p.deviceEnd }
    return plug
  })

  const setPlug = async (i: number, outlet: number | null, animate = true) => {
    const p = plugs[i]
    if (!p) return
    const pose = outlet === null ? p.rest : outlets[outlet].pose
    p.inOutlet = outlet
    if (animate) {
      await wb.moveTo(p.group, pose.pos, pose.quat, 420, outlet === null ? 0.04 : 0.02)
      click(outlet === null ? 0.7 : 1)
    } else {
      p.group.position.copy(pose.pos)
      p.group.quaternion.copy(pose.quat)
    }
  }
  opts.plugs.forEach((p, i) => { setPlug(i, p.startIn ?? null, false) })

  // cables: from the plug's tail, down the wall and along the bench to the device
  const lastTail = plugs.map(() => new THREE.Vector3(9, 9, 9))
  const lastEnd = plugs.map(() => new THREE.Vector3(9, 9, 9))
  const update = () => {
    plugs.forEach((p, i) => {
      const tail = p.group.localToWorld(TAIL.clone())
      const end = p.deviceEnd()
      if (tail.distanceTo(lastTail[i]) < 0.0008 && end.distanceTo(lastEnd[i]) < 0.0008) return
      lastTail[i].copy(tail)
      lastEnd[i].copy(end)
      const down = tail.clone().add(new THREE.Vector3(0, -0.05, 0.01))
      down.y = Math.max(0.004, down.y)
      const mid = down.clone().lerp(end, 0.5)
      mid.y = 0.004
      const pts = [tail, down, mid, end]
      p.cable.geometry.dispose()
      p.cable.geometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 48, 0.0032, 8, false)
    })
  }
  update()

  return {
    socket,
    outlets,
    plugs,
    setSwitch,
    setPlug,
    powered: i => plugs[i]?.inOutlet !== null && plugs[i]?.inOutlet !== undefined && outlets[plugs[i].inOutlet!]?.on === true,
    update
  }
}

/**
 * Lets the plugs be dragged: grab one, move it, let go near an outlet and it goes in (anywhere
 * else and it is out). A tap without moving counts as a tap. Listens before the scene's own
 * pointer handling and keeps the event to itself when a plug is grabbed.
 */
export function attachPlugDragging(
  wb: Workbench,
  kit: PowerKit,
  onDrop: (plug: number, outlet: number | null) => void,
  onTap?: (plug: number) => void
) {
  let active = -1
  let moved = false
  let sx = 0
  let sy = 0
  const plane = new THREE.Plane()
  const v = new THREE.Vector3()
  const c = wb.canvas
  const down = (ev: PointerEvent) => {
    const groups = kit.plugs.map(p => p.group)
    const hit = wb.pick(ev, groups)
    if (!hit) return
    active = groups.indexOf(hit as THREE.Group)
    sx = ev.clientX
    sy = ev.clientY
    moved = false
    wb.controls.enabled = false
    wb.camera.getWorldDirection(v)
    plane.setFromNormalAndCoplanarPoint(v.clone().negate(), hit.position.clone())
    ev.stopImmediatePropagation()
  }
  const move = (ev: PointerEvent) => {
    if (active < 0) return
    ev.stopImmediatePropagation()
    if (!moved && Math.hypot(ev.clientX - sx, ev.clientY - sy) < 6) return
    moved = true
    if (wb.pointOnPlane(ev, plane, v)) kit.plugs[active].group.position.copy(v)
  }
  const up = (ev: PointerEvent) => {
    if (active < 0) return
    const i = active
    active = -1
    wb.controls.enabled = true
    ev.stopImmediatePropagation()
    if (!moved) {
      onTap?.(i)
      return
    }
    const r = c.getBoundingClientRect()
    let best: number | null = null
    let bestD = 70
    kit.outlets.forEach((o, k) => {
      const s = wb.toScreen(o.pose.pos)
      const d = Math.hypot(s.x - (ev.clientX - r.left), s.y - (ev.clientY - r.top))
      if (d < bestD) {
        bestD = d
        best = k
      }
    })
    onDrop(i, best)
  }
  c.addEventListener('pointerdown', down, { capture: true })
  c.addEventListener('pointermove', move, { capture: true })
  c.addEventListener('pointerup', up, { capture: true })
  return { busy: () => active >= 0 }
}
