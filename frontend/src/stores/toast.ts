import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface ToastMessage {
  id: number
  type: ToastType
  message: string
}

const DEFAULT_DURATION_MS = 4000
const ERROR_DURATION_MS = 6000

/**
 * App-wide toast queue, replacing native alert() for one-off success/error/info messages -
 * ToastContainer.vue (mounted once in App.vue) renders whatever's in the queue so any component
 * can push a message without needing its own overlay markup.
 */
export const useToastStore = defineStore('toast', () => {
  const toasts = ref<ToastMessage[]>([])
  let nextId = 1

  function push(type: ToastType, message: string, duration = type === 'error' ? ERROR_DURATION_MS : DEFAULT_DURATION_MS) {
    const id = nextId++
    toasts.value.push({ id, type, message })
    if (duration > 0) {
      setTimeout(() => dismiss(id), duration)
    }
    return id
  }

  function dismiss(id: number) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  const success = (message: string, duration?: number) => push('success', message, duration)
  const error = (message: string, duration?: number) => push('error', message, duration)
  const info = (message: string, duration?: number) => push('info', message, duration)
  const warning = (message: string, duration?: number) => push('warning', message, duration)

  return { toasts, push, dismiss, success, error, info, warning }
})
