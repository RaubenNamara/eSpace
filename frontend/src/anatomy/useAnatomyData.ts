import { shallowRef, ref } from 'vue'
import { AnatomyIndex, loadManifest } from './metadata'
import type { AnatomyManifest } from './types'

export const ANATOMY_BASE = `${import.meta.env.BASE_URL}anatomy/bodyparts3d`

// one copy per browser tab: the explorer, the module library and the player share it
let cached: Promise<AnatomyManifest> | null = null

/** The manifest and its index, loaded once and shared between pages */
export function useAnatomyData() {
  const manifest = shallowRef<AnatomyManifest | null>(null)
  const index = shallowRef<AnatomyIndex | null>(null)
  const error = ref<string | null>(null)

  async function load() {
    error.value = null
    try {
      cached ??= loadManifest(`${ANATOMY_BASE}/manifest.json`)
      const m = await cached
      manifest.value = m
      index.value = new AnatomyIndex(m)
    } catch (e) {
      cached = null // let "Try again" fetch again
      error.value = e instanceof Error ? e.message : 'Unknown error'
    }
  }

  return { manifest, index, error, load }
}

/** "The **heart** pumps" -> [{ text: 'The ', bold: false }, { text: 'heart', bold: true }, ...] - rendered without v-html */
export function richText(s: string) {
  return s.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map(p => p.startsWith('**') ? { text: p.slice(2, -2), bold: true } : { text: p, bold: false })
}
