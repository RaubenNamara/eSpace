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

export interface AskOptions extends ConfirmOptions {
  /** Placeholder shown in the text box */
  placeholder?: string
  /** What the box starts with */
  value?: string
  /** Allow an empty answer (e.g. an optional reason) */
  optional?: boolean
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
  // ask(): a text box in the same dialog, in place of native prompt()
  const input = ref<{ placeholder: string; optional: boolean } | null>(null)
  const text = ref('')

  function open(opts: ConfirmOptions): Promise<boolean> {
    options.value = {
      title: opts.title ?? 'Are you sure?',
      message: opts.message,
      confirmLabel: opts.confirmLabel ?? 'Confirm',
      cancelLabel: opts.cancelLabel ?? 'Cancel',
      danger: opts.danger ?? false
    }
    input.value = null
    visible.value = true
    return new Promise(resolve => { resolver = resolve })
  }

  function resolve(value: boolean) {
    visible.value = false
    resolver?.(value)
    resolver = null
  }

  /** Like open(), with a text box: the text typed, or null when cancelled */
  async function ask(opts: AskOptions): Promise<string | null> {
    const ok = open(opts)
    input.value = { placeholder: opts.placeholder ?? '', optional: opts.optional ?? false }
    text.value = opts.value ?? ''
    const confirmed = await ok
    const answer = text.value.trim()
    input.value = null
    return confirmed ? answer : null
  }

  return { visible, options, input, text, open, ask, resolve }
})
