/**
 * Sounds for the projectile launcher, made in the browser (Web Audio) so there is no file to load
 * or licence: the spring releasing with a click as the ball leaves the barrel, and a soft thud when
 * the ball lands. Quiet by design, and silent if the browser has no Web Audio or blocks it.
 */
let ctx: AudioContext | null = null

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

/** A short burst of noise through a filter: the "click" / "thud" part of each sound */
function noiseBurst(ac: AudioContext, at: number, length: number, freq: number, q: number, peak: number) {
  const frames = Math.max(1, Math.floor(ac.sampleRate * length))
  const buf = ac.createBuffer(1, frames, ac.sampleRate)
  const data = buf.getChannelData(0)
  for (let i = 0; i < frames; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / frames) ** 2
  const src = ac.createBufferSource()
  src.buffer = buf
  const filter = ac.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = freq
  filter.Q.value = q
  const gain = ac.createGain()
  gain.gain.setValueAtTime(peak, at)
  gain.gain.exponentialRampToValueAtTime(0.0001, at + length)
  src.connect(filter).connect(gain).connect(ac.destination)
  src.start(at)
  src.stop(at + length + 0.02)
}

/** A falling tone: the body of the spring "thunk" and of the landing thud */
function drop(ac: AudioContext, at: number, from: number, to: number, length: number, peak: number, type: OscillatorType = 'sine') {
  const osc = ac.createOscillator()
  osc.type = type
  osc.frequency.setValueAtTime(from, at)
  osc.frequency.exponentialRampToValueAtTime(to, at + length)
  const gain = ac.createGain()
  gain.gain.setValueAtTime(0.0001, at)
  gain.gain.exponentialRampToValueAtTime(peak, at + 0.006)
  gain.gain.exponentialRampToValueAtTime(0.0001, at + length)
  osc.connect(gain).connect(ac.destination)
  osc.start(at)
  osc.stop(at + length + 0.02)
}

/** The launcher fires: the catch clicks, the spring thumps, and a short twang rings off */
export function playLaunchSound(): void {
  const ac = audio()
  if (!ac) return
  try {
    const t = ac.currentTime + 0.01
    noiseBurst(ac, t, 0.035, 3200, 1.2, 0.5)           // the catch releasing
    drop(ac, t, 180, 55, 0.18, 0.55)                    // the spring's thump
    drop(ac, t + 0.005, 520, 300, 0.22, 0.08, 'triangle') // a little spring twang
    noiseBurst(ac, t + 0.02, 0.12, 900, 0.8, 0.18)      // air as the ball leaves
  } catch {
    // a missing sound effect is not worth an error
  }
}

/** The ball lands on the floor: a soft, dull thud */
export function playLandingSound(): void {
  const ac = audio()
  if (!ac) return
  try {
    const t = ac.currentTime + 0.005
    drop(ac, t, 130, 60, 0.16, 0.4)
    noiseBurst(ac, t, 0.06, 400, 0.9, 0.22)
  } catch {
    // ditto
  }
}
