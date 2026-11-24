/**
 * Sounds for the projectile launcher, made in the browser (Web Audio) so there is no file to load
 * or licence: the spring releasing as the ball leaves the barrel, a whoosh that travels with the ball
 * for as long as it flies (moving left to right, louder when it is fast, softer at the top), and a
 * soft thud when it lands. Everything passes through an outdoor echo. Silent if the browser has no
 * Web Audio or blocks it.
 */
let ctx: AudioContext | null = null
let bus: GainNode | null = null

function audio(): AudioContext | null {
  try {
    if (!ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AC) return null
      ctx = new AC()
    }
    // a click on Fire is the user's gesture, so the context may start here
    if (ctx.state === 'suspended') void ctx.resume()
    return ctx
  } catch {
    return null
  }
}

/**
 * Where every sound goes: straight out, and into an echo - a delay feeding back into itself through
 * a low-pass filter, so each repeat comes back softer and duller, like a sound off the trees.
 */
function out(ac: AudioContext): GainNode {
  if (bus) return bus
  bus = ac.createGain()
  bus.gain.value = 1
  bus.connect(ac.destination)
  const delay = ac.createDelay(1.5)
  delay.delayTime.value = 0.32
  const feedback = ac.createGain()
  feedback.gain.value = 0.38
  const tone = ac.createBiquadFilter()
  tone.type = 'lowpass'
  tone.frequency.value = 1800
  const wet = ac.createGain()
  wet.gain.value = 0.42
  bus.connect(delay)
  delay.connect(tone).connect(feedback).connect(delay)
  tone.connect(wet).connect(ac.destination)
  return bus
}

function noiseBuffer(ac: AudioContext, seconds: number, fade: boolean): AudioBuffer {
  const frames = Math.max(1, Math.floor(ac.sampleRate * seconds))
  const buf = ac.createBuffer(1, frames, ac.sampleRate)
  const data = buf.getChannelData(0)
  for (let i = 0; i < frames; i++) data[i] = (Math.random() * 2 - 1) * (fade ? (1 - i / frames) ** 2 : 1)
  return buf
}

/** A short burst of noise through a filter: the "click" / "thud" part of each sound */
function noiseBurst(ac: AudioContext, at: number, length: number, freq: number, q: number, peak: number, to: AudioNode) {
  const src = ac.createBufferSource()
  src.buffer = noiseBuffer(ac, length, true)
  const filter = ac.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = freq
  filter.Q.value = q
  const gain = ac.createGain()
  gain.gain.setValueAtTime(peak, at)
  gain.gain.exponentialRampToValueAtTime(0.0001, at + length)
  src.connect(filter).connect(gain).connect(to)
  src.start(at)
  src.stop(at + length + 0.02)
}

/** A falling tone: the body of the spring "thunk" and of the landing thud */
function drop(ac: AudioContext, at: number, from: number, to: number, length: number, peak: number, dest: AudioNode, type: OscillatorType = 'sine') {
  const osc = ac.createOscillator()
  osc.type = type
  osc.frequency.setValueAtTime(from, at)
  osc.frequency.exponentialRampToValueAtTime(to, at + length)
  const gain = ac.createGain()
  gain.gain.setValueAtTime(0.0001, at)
  gain.gain.exponentialRampToValueAtTime(peak, at + 0.006)
  gain.gain.exponentialRampToValueAtTime(0.0001, at + length)
  osc.connect(gain).connect(dest)
  osc.start(at)
  osc.stop(at + length + 0.02)
}

/** Panned to where the ball is: -1 far left, 1 far right */
function panner(ac: AudioContext, pan: number): AudioNode {
  if (typeof ac.createStereoPanner !== 'function') return out(ac)
  const p = ac.createStereoPanner()
  p.pan.value = Math.max(-1, Math.min(1, pan))
  p.connect(out(ac))
  return p
}

/** The launcher fires, at the launcher's place on screen: the catch clicks, the spring thumps */
export function playLaunchSound(pan = -0.6): void {
  const ac = audio()
  if (!ac) return
  try {
    const dest = panner(ac, pan)
    const t = ac.currentTime + 0.01
    noiseBurst(ac, t, 0.035, 3200, 1.2, 0.5, dest)                 // the catch releasing
    drop(ac, t, 180, 55, 0.2, 0.55, dest)                           // the spring's thump
    drop(ac, t + 0.005, 520, 300, 0.24, 0.08, dest, 'triangle')     // a little spring twang
  } catch {
    // a missing sound effect is not worth an error
  }
}

/**
 * The whoosh of the ball through the air, for the whole (slow-motion) flight. The scene calls
 * update() every frame with where the ball is across the screen and how fast it is going, and
 * stop() when it lands.
 */
export interface FlightSound { update(pan: number, speed: number): void; stop(): void }
const NO_SOUND: FlightSound = { update() {}, stop() {} }

export function startFlightSound(): FlightSound {
  const ac = audio()
  if (!ac) return NO_SOUND
  try {
    const src = ac.createBufferSource()
    src.buffer = noiseBuffer(ac, 2, false)
    src.loop = true
    const filter = ac.createBiquadFilter()
    filter.type = 'bandpass'
    filter.Q.value = 0.9
    filter.frequency.value = 900
    const gain = ac.createGain()
    gain.gain.value = 0.0001
    const pan = typeof ac.createStereoPanner === 'function' ? ac.createStereoPanner() : null
    src.connect(filter).connect(gain)
    if (pan) gain.connect(pan).connect(out(ac))
    else gain.connect(out(ac))
    src.start()
    let stopped = false
    return {
      // speed 0..1: louder and higher when the ball is fast (just after launch, just before landing)
      update(p: number, speed: number) {
        if (stopped) return
        const now = ac.currentTime
        const s = Math.max(0, Math.min(1, speed))
        gain.gain.setTargetAtTime(0.03 + 0.16 * s, now, 0.05)
        filter.frequency.setTargetAtTime(500 + 1100 * s, now, 0.05)
        if (pan) pan.pan.setTargetAtTime(Math.max(-1, Math.min(1, p)), now, 0.05)
      },
      stop() {
        if (stopped) return
        stopped = true
        const now = ac.currentTime
        gain.gain.cancelScheduledValues(now)
        gain.gain.setTargetAtTime(0.0001, now, 0.03)
        src.stop(now + 0.2)
      },
    }
  } catch {
    return NO_SOUND
  }
}

/** The ball lands on the floor where it is on screen: a soft, dull thud */
export function playLandingSound(pan = 0.5): void {
  const ac = audio()
  if (!ac) return
  try {
    const dest = panner(ac, pan)
    const t = ac.currentTime + 0.005
    drop(ac, t, 130, 60, 0.18, 0.45, dest)
    noiseBurst(ac, t, 0.07, 400, 0.9, 0.24, dest)
  } catch {
    // ditto
  }
}
