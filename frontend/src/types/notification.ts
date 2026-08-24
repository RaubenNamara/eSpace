export interface NotificationItem {
  id: number
  type: string
  title: string
  message: string
  data: Record<string, any> | null
  is_read: boolean
  created_at: string
}
