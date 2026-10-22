/**
 * Chat TypeScript Interfaces
 */

export type ConversationType = 'direct' | 'group' | 'class' | 'announcement'
export type ChatRole = 'student' | 'teacher' | 'hod' | 'admin'
export type AttachmentType = 'image' | 'audio' | 'video' | 'file'

export interface ChatContact {
  id: number
  first_name: string
  last_name: string
  role: ChatRole
  department_name?: string
  is_online?: boolean
  last_active_at?: string | null
}

export interface ChatClassGroup {
  class_id: number
  class_name: string
  stream_name: string | null
  department_id: number
  department_name: string | null
}

export interface ConversationLastMessage {
  message: string
  attachment_type: AttachmentType | null
  sender_name: string
  is_mine?: boolean
  /** my last message: sent / delivered / read (ticks in the chat list) */
  status?: 'sent' | 'delivered' | 'read' | null
  created_at: string
}

export interface Conversation {
  id: number
  type: ConversationType
  name: string
  class_id: number | null
  department_id: number | null
  updated_at: string
  is_online?: boolean
  last_active_at?: string | null
  // Direct chats: the other person
  other_id?: number | null
  other_role?: ChatRole | null
  last_message: ConversationLastMessage | null
  unread_count?: number
  /** Others typing / recording in this conversation right now */
  activity?: ChatActivity[]
  participants?: { id: number; role: ChatRole; name: string; is_online?: boolean; last_active_at?: string | null }[]
}

export interface ReplyPreview {
  id: number
  message: string
  sender_name: string | null
}

export interface ChatMessage {
  id: number
  sender_id: number
  sender_role: ChatRole
  sender_name: string
  is_mine?: boolean
  /** is_mine messages: read by everyone else (same as status === 'read') */
  is_read?: boolean
  /** is_mine messages: one grey tick (sent), two grey (delivered), two blue (read) */
  status?: 'sent' | 'delivered' | 'read' | null
  message: string
  attachment: string | null
  attachment_type: AttachmentType | null
  attachment_name: string | null
  attachment_size: number | null
  reply_to: ReplyPreview | null
  created_at: string
}

export interface ChatActivity {
  name: string
  activity: 'typing' | 'recording'
}

/** Live state of the open conversation, polled with its messages */
export interface ChatThreadStatus {
  activity: ChatActivity[]
  /** Direct chats: the other person */
  presence: { is_online: boolean; last_active_at: string | null; seen_seconds_ago?: number | null } | null
}
