import { usePersistedRef } from '@/composables/usePersistedRef'

// How a student likes their own notes to look - plain, or a ruled, handwritten-style notebook.
// Used while typing a page summary and for the "My notes" PDF; remembered on this device.
export type NotesStyle = 'plain' | 'notebook'

let shared: ReturnType<typeof usePersistedRef<NotesStyle>> | null = null

export function useNotesStyle() {
  shared ??= usePersistedRef<NotesStyle>('my-notes-style', 'plain')
  return shared
}
