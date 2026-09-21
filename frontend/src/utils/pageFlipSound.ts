// A real recorded page-turn sound (not a synthesized approximation - Web Audio noise synthesis
// was tried first but never convincingly read as paper, see git history) - "Turning Page in a
// Book" by XpMonster.
import pageFlipUrl from '@/assets/sounds/page-flip.mp3'

// A small pool of <audio> elements rather than one shared instance, so flipping pages quickly
// (faster than one playback finishes) still triggers a fresh sound instead of cutting the
// previous one off or being silently dropped.
const POOL_SIZE = 4
const pool: HTMLAudioElement[] = []
let nextIndex = 0

function getPooledAudio(): HTMLAudioElement {
  if (pool.length < POOL_SIZE) {
    const audio = new Audio(pageFlipUrl)
    audio.preload = 'auto'
    pool.push(audio)
  }
  const audio = pool[nextIndex]
  nextIndex = (nextIndex + 1) % POOL_SIZE
  return audio
}

// Callers are responsible for only calling this once per actual flip - BookFlipbook.vue gates
// its own 'flip' event listener against StPageFlip firing twice per turn (once turning, once
// landing), since it's the one place that actually knows the flip animation's duration.
export function playPageFlipSound(volume = 0.6): void {
  try {
    const audio = getPooledAudio()
    audio.currentTime = 0
    audio.volume = Math.min(1, Math.max(0, volume))
    void audio.play().catch(() => {
      // Autoplay can be blocked until the user has interacted with the page at all - not worth
      // surfacing an error for a missing sound effect.
    })
  } catch {
    // Ditto for any other playback failure (unsupported format, element not ready, ...).
  }
}
