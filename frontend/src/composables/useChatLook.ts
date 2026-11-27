/**
 * How the chat looks for this person: colour theme and font style (bubbles always have the classic
 * tail; the font, text size and doodle wallpaper are the same for everyone).
 * Chosen in the "Chat look" panel (components/chat/ChatLookPanel.vue) and remembered on this
 * device for the signed-in account. The themes themselves are CSS in assets/whatsapp.css
 * (.wa[data-chat-theme=...]); this only says which one is on and loads the Script font when needed.
 */
import { computed, reactive, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'

export const CHAT_THEMES = [
  { key: 'classic', label: 'Tusome', out: '#dce4f8', outText: '#111b21', accent: '#1b3fa0', wall: '#faf5e8' },
  { key: 'ocean', label: 'Ocean', out: '#0284c7', outText: '#ffffff', accent: '#0284c7', wall: '#eaf6fb' },
  { key: 'violet', label: 'Violet', out: 'linear-gradient(135deg,#6d28d9,#a855f7)', outText: '#ffffff', accent: '#7c3aed', wall: '#f4f1fd' },
  { key: 'sunset', label: 'Sunset', out: 'linear-gradient(135deg,#f97316,#e11d74)', outText: '#ffffff', accent: '#ea580c', wall: '#fff5ec' },
  { key: 'forest', label: 'Forest', out: '#047857', outText: '#ffffff', accent: '#059669', wall: '#ecf7f1' },
  { key: 'blush', label: 'Blush', out: '#ffd9e4', outText: '#3b0d1c', accent: '#db2777', wall: '#fff4f7' },
  { key: 'mint', label: 'Mint', out: '#c9f5e3', outText: '#06281d', accent: '#0d9488', wall: '#f0fbf7' },
  { key: 'graphite', label: 'Graphite', out: '#18181b', outText: '#fafafa', accent: '#27272a', wall: '#f1f1f3' },
] as const

/**
 * How the messages are drawn: upright, slanted, in a slanted serif book face, or in a handwriting
 * font. A style with its own font names it (family for CSS, google for loading it).
 */
export const CHAT_FONT_STYLES = [
  { key: 'normal', label: 'Normal' },
  { key: 'italic', label: 'Italic' },
  { key: 'serif', label: 'Italic Serif', family: "'Lora'", google: 'Lora:ital,wght@1,400;1,600;1,700' },
  { key: 'script', label: 'Script / Cursive', family: "'Dancing Script'", google: 'Dancing+Script:wght@400;600;700' },
] as const
export type ChatFontStyle = (typeof CHAT_FONT_STYLES)[number]

/** the chat's font and message size (Plus Jakarta Sans is loaded by index.html) */
const CHAT_FONT = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif"
const MESSAGE_SIZE = '14.6px'

type Keys<T extends readonly { key: string }[]> = T[number]['key']
export interface ChatLook {
  theme: Keys<typeof CHAT_THEMES>
  fontStyle: Keys<typeof CHAT_FONT_STYLES>
}
export const DEFAULT_LOOK: ChatLook = { theme: 'classic', fontStyle: 'normal' }

const look = reactive<ChatLook>({ ...DEFAULT_LOOK })
let loadedFor = ''

const valid = <T extends readonly { key: string }[]>(list: T, v: unknown, fallback: Keys<T>): Keys<T> =>
  list.some(i => i.key === v) ? (v as Keys<T>) : fallback

const loadedStyleFonts = new Set<string>()
/** A font style's own font (Italic Serif, Script), fetched only when someone picks or previews it */
export function loadStyleFont(key: string) {
  const style = CHAT_FONT_STYLES.find(s => s.key === key)
  if (!style || !('google' in style) || loadedStyleFonts.has(key)) return
  loadedStyleFonts.add(key)
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?family=${style.google}&display=swap`
  document.head.appendChild(link)
}

export function useChatLook() {
  const auth = useAuthStore()
  const storageKey = computed(() => `tusome.chatLook.${auth.userRole || 'user'}.${(auth.user as any)?.id ?? ''}`)

  // read this account's choice once per sign-in (older saved fonts and sizes are simply ignored)
  if (loadedFor !== storageKey.value) {
    loadedFor = storageKey.value
    let saved: Partial<ChatLook> = {}
    try { saved = JSON.parse(localStorage.getItem(storageKey.value) || '{}') } catch { /* none, or storage blocked */ }
    Object.assign(look, {
      theme: valid(CHAT_THEMES, saved.theme, DEFAULT_LOOK.theme),
      fontStyle: valid(CHAT_FONT_STYLES, saved.fontStyle, DEFAULT_LOOK.fontStyle),
    })
  }
  loadStyleFont(look.fontStyle)

  watch(look, () => {
    loadStyleFont(look.fontStyle)
    try { localStorage.setItem(storageKey.value, JSON.stringify(look)) } catch { /* private window */ }
  }, { deep: true })

  /** Put on the chat's .wa root: v-bind="rootAttrs" */
  const rootAttrs = computed(() => ({
    'data-chat-theme': look.theme,
    'data-chat-fontstyle': look.fontStyle,
    style: { '--wa-font': CHAT_FONT, '--wa-msg-size': MESSAGE_SIZE },
  }))

  const reset = () => Object.assign(look, DEFAULT_LOOK)

  return { look, rootAttrs, reset }
}
