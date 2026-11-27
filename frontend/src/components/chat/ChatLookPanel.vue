<template>
  <!-- "Chat look": colour theme and font style (Normal, Italic, Italic Serif, Script / Cursive), with a
       live preview. The wallpaper is always the doodles.
       Sits inside the chat's .wa root, so the preview uses the same theme colours as the chat.
       Phone: a short bottom sheet with small tiles; computer: a panel on the right. -->
  <div class="fixed inset-0 z-50 flex items-end sm:items-stretch sm:justify-end bg-black/40 backdrop-blur-[1px]" @click.self="emit('close')">
    <aside
      role="dialog"
      aria-modal="true"
      aria-label="Chat look"
      class="look-sheet w-full sm:w-[380px] max-h-[86dvh] sm:max-h-none sm:h-full flex flex-col bg-[var(--wa-panel)] text-[var(--wa-text)] rounded-t-[28px] sm:rounded-none sm:rounded-l-[28px] shadow-2xl"
    >
      <!-- grab handle (phone) -->
      <div class="sm:hidden flex justify-center pt-2 pb-0.5" aria-hidden="true">
        <span class="w-10 h-1 rounded-full bg-[var(--wa-border)]"></span>
      </div>

      <header class="flex items-center gap-2 px-4 sm:px-5 pt-1.5 sm:pt-5 pb-2.5">
        <div class="min-w-0 flex-1">
          <h2 class="text-[16px] sm:text-lg font-bold leading-tight">Chat look</h2>
          <p class="text-[12px] text-[var(--wa-muted)] truncate">Only you see this, on this device</p>
        </div>
        <button
          type="button"
          class="h-8 px-3 rounded-full text-[12px] font-semibold text-[var(--wa-chip-on-text)] bg-[var(--wa-chip-on)] hover:brightness-95"
          title="Back to the standard look"
          @click="reset"
        >Reset</button>
        <button ref="closeBtn" type="button" class="w-8 h-8 rounded-full flex items-center justify-center text-[var(--wa-icon)] bg-[var(--wa-search)] hover:brightness-95" aria-label="Close" @click="emit('close')">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.4" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </header>

      <div class="wa-scroll flex-1 overflow-y-auto px-4 sm:px-5 pb-[max(1rem,env(safe-area-inset-bottom))] space-y-4 sm:space-y-6">
        <!-- live preview -->
        <div class="wa-wallpaper rounded-2xl overflow-hidden ring-1 ring-[var(--wa-border)]">
          <div class="relative px-2.5 py-2.5 sm:px-3 sm:py-4 space-y-1">
            <div class="flex justify-start"><div class="wa-bubble wa-bubble-in wa-tail-in px-2.5 py-1 max-w-[82%]">Did you finish the notes? 📗</div></div>
            <div class="flex justify-end">
              <div class="wa-bubble wa-bubble-out wa-tail-out px-2.5 py-1 max-w-[82%]">
                Yes! Let's revise at 4
                <span class="ml-1 text-[10.5px] text-[var(--wa-muted)] inline-flex items-center gap-0.5 align-bottom">4:02 PM
                  <svg class="w-4 h-[13px]" viewBox="0 0 18 15" fill="none" :style="{ color: 'var(--wa-tick-read)' }"><path d="M1.5 7.6l3.4 3.4L11.5 4.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /><path d="M7.5 9.9l1.1 1.1L15.2 4.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        <section>
          <h3 :class="HEADING">Colour theme</h3>
          <div class="grid grid-cols-4 gap-1.5 sm:gap-2">
            <button
              v-for="t in CHAT_THEMES"
              :key="t.key"
              type="button"
              class="flex flex-col items-center gap-1 rounded-xl py-1.5 transition-colors"
              :class="look.theme === t.key ? 'bg-[var(--wa-chip-on)]' : 'hover:bg-[var(--wa-hover)]'"
              :aria-pressed="look.theme === t.key"
              :title="t.label"
              @click="look.theme = t.key"
            >
              <!-- a tiny chat: the wallpaper colour with an incoming and an outgoing bubble -->
              <span
                class="relative w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] overflow-hidden ring-1 transition-shadow"
                :class="look.theme === t.key ? 'ring-2 ring-[var(--wa-green)]' : 'ring-black/10 dark:ring-white/10'"
                :style="{ background: t.wall }"
              >
                <span class="absolute left-1.5 top-2 w-6 h-2.5 rounded-full shadow-sm" :style="{ background: t.in }"></span>
                <span class="absolute right-1.5 bottom-2 w-7 h-2.5 rounded-full" :style="{ background: t.out }"></span>
                <span v-if="look.theme === t.key" class="absolute inset-0 flex items-center justify-center bg-black/25">
                  <svg class="w-5 h-5 text-white drop-shadow" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                </span>
              </span>
              <span class="text-[11px] sm:text-[12px] font-medium leading-none" :class="look.theme === t.key ? 'text-[var(--wa-chip-on-text)]' : 'text-[var(--wa-muted)]'">{{ t.label }}</span>
            </button>
          </div>
        </section>

        <section>
          <h3 :class="HEADING">Font style</h3>
          <div class="grid grid-cols-4 gap-1.5 sm:gap-2">
            <button
              v-for="s in CHAT_FONT_STYLES"
              :key="s.key"
              type="button"
              class="flex flex-col items-center justify-center gap-1 h-[62px] sm:h-[68px] px-1 rounded-xl border transition-colors text-center"
              :class="look.fontStyle === s.key ? 'border-[var(--wa-green)] bg-[var(--wa-chip-on)] text-[var(--wa-chip-on-text)]' : 'border-[var(--wa-border)] hover:bg-[var(--wa-hover)]'"
              :aria-pressed="look.fontStyle === s.key"
              :aria-label="s.label"
              :title="s.label"
              @click="look.fontStyle = s.key"
            >
              <span
                class="block leading-none"
                :class="s.key === 'script' ? 'text-[22px]' : s.key === 'normal' ? 'text-[19px]' : 'italic text-[19px]'"
                :style="'family' in s ? { fontFamily: `${s.family}, ${s.key === 'script' ? 'cursive' : 'serif'}` } : undefined"
              >Aa</span>
              <span class="block w-full text-[10.5px] sm:text-[11px] leading-tight opacity-75 truncate">{{ SHORT[s.key] ?? s.label }}</span>
            </button>
          </div>
        </section>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { CHAT_THEMES, CHAT_FONT_STYLES, useChatLook, loadStyleFont } from '@/composables/useChatLook'

const emit = defineEmits<{ close: [] }>()
const { look, reset } = useChatLook()
const HEADING = 'mb-2 text-[11px] font-bold uppercase tracking-wider text-[var(--wa-muted)]'
// labels that fit a small card (the full name is the button's text for screen readers too)
const SHORT: Record<string, string> = { serif: 'Serif', script: 'Script' }
const closeBtn = ref<HTMLButtonElement | null>(null)

const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') emit('close') }
onMounted(() => {
  CHAT_FONT_STYLES.forEach(s => loadStyleFont(s.key)) // each style shows in its own font
  window.addEventListener('keydown', onKey)
  closeBtn.value?.focus()
})
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<style scoped>
/* the sheet slides up on a phone, in from the right on a computer */
.look-sheet { animation: look-up 0.22s ease-out; }
@media (min-width: 640px) { .look-sheet { animation-name: look-in; } }
@keyframes look-up { from { transform: translateY(24px); opacity: 0; } to { transform: none; opacity: 1; } }
@keyframes look-in { from { transform: translateX(24px); opacity: 0; } to { transform: none; opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .look-sheet { animation: none; } }
</style>
