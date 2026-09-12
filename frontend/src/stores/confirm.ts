import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface ConfirmOptions {
  title?: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  /** Styles the confirm button red instead of indigo, for destructive actions. */
  danger?: boolean
}

/**
 * App-wide confirmation dialog, replacing native confirm() - ConfirmDialog.vue (mounted once in
 * App.vue) renders the current request and resolves the promise `open()` returned once the user
 * picks an option, so call sites just `if (!await confirmStore.open({...})) return` exactly like
 * they used to check `if (!confirm(...)) return`.
 */
export const useConfirmStore = defineStore('confirm', () => {
  const visible = ref(false)
  const options = ref<Required<ConfirmOptions> | null>(null)
  let resolver: ((value: boolean) => void) | null = null

  function open(opts: ConfirmOptions): Promise<boolean> {
    options.value = {
      title: opts.title ?? 'Are you sure?',
      message: opts.message,
      confirmLabel: opts.confirmLabel ?? 'Confirm',
      cancelLabel: opts.cancelLabel ?? 'Cancel',
      danger: opts.danger ?? false
    }
    visible.value = true
    return new Promise(resolve => { resolver = resolve })
  }

  function resolve(value: boolean) {
    visible.value = false
    resolver?.(value)
    resolver = null
  }

  return { visible, options, open, resolve }
})
