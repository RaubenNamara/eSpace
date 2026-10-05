/** Live Quiz answer colours, in order A-D (repeating after D). Muted enough for a projector. */
export const OPTION_TONES = [
  { solid: 'bg-indigo-600', soft: 'bg-indigo-600/90 hover:bg-indigo-600', bar: 'bg-indigo-500' },
  { solid: 'bg-amber-500', soft: 'bg-amber-500/90 hover:bg-amber-500', bar: 'bg-amber-400' },
  { solid: 'bg-emerald-600', soft: 'bg-emerald-600/90 hover:bg-emerald-600', bar: 'bg-emerald-500' },
  { solid: 'bg-rose-600', soft: 'bg-rose-600/90 hover:bg-rose-600', bar: 'bg-rose-500' }
]

/** A countdown that runs smoothly between polls: set it from the server's seconds-left */
export function makeCountdown() {
  let deadline = 0
  return {
    set(secondsLeft: number | null) {
      deadline = secondsLeft === null ? 0 : performance.now() + secondsLeft * 1000
    },
    left(): number | null {
      return deadline ? Math.max(0, (deadline - performance.now()) / 1000) : null
    }
  }
}
