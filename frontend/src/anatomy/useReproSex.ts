import { ref, watch } from 'vue'
import type { ReproSex } from './types'

const KEY = 'anatomy.reproSex'
const read = (): ReproSex => { try { return localStorage.getItem(KEY) === 'male' ? 'male' : 'female' } catch { return 'female' } }

// one setting for the whole app (Explorer and system pages), remembered on this device
const reproSex = ref<ReproSex>(typeof window !== 'undefined' ? read() : 'female')
watch(reproSex, v => { try { localStorage.setItem(KEY, v) } catch { /* private mode */ } })

/** which reproductive organs are shown: female (Human Reference Atlas) or male (BodyParts3D) */
export function useReproSex() { return reproSex }
