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
  last_message: ConversationLastMessage | null
  unread_count?: number
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
  /** Only meaningful for is_mine messages in a direct (1:1) chat - the other person has read up to this message. */
  is_read?: boolean
  message: string
  attachment: string | null
  attachment_type: AttachmentType | null
  attachment_name: string | null
  attachment_size: number | null
  reply_to: ReplyPreview | null
  created_at: string
}
