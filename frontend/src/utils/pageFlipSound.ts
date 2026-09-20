// A short paper-rustle sound for page turns, synthesized with the Web Audio API rather than an
// external audio file - no asset to source/license, and it works identically everywhere. It's a
// burst of noise shaped by a quick-attack/decay envelope and band-passed to keep the "paper"
// texture instead of reading as raw static.
let audioCtx: AudioContext | null = null

function getContext(): AudioContext | null {
  const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Ctor) return null
  if (!audioCtx) audioCtx = new Ctor()
  if (audioCtx.state === 'suspended') void audioCtx.resume()
  return audioCtx
}

export function playPageFlipSound(volume = 0.35): void {
  try {
    const ctx = getContext()
    if (!ctx) return

    const duration = 0.22
    const bufferSize = Math.floor(ctx.sampleRate * duration)
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      const t = i / bufferSize
      const envelope = Math.pow(1 - t, 2.2) // sharp attack, fast exponential-feeling decay
      data[i] = (Math.random() * 2 - 1) * envelope
    }

    const source = ctx.createBufferSource()
    source.buffer = buffer

    const bandpass = ctx.createBiquadFilter()
    bandpass.type = 'bandpass'
    bandpass.frequency.value = 2200
    bandpass.Q.value = 0.6

    const gain = ctx.createGain()
    gain.gain.value = volume

    source.connect(bandpass)
    bandpass.connect(gain)
    gain.connect(ctx.destination)
    source.start()
  } catch {
    // Web Audio can be blocked or unavailable in some embedded contexts - a missing sound effect
    // isn't worth surfacing an error for.
  }
}
