<template>
  <!-- Design an eLibrary book's cover: start from a suggestion (every template, in colours picked
       for the book, with its first page as the picture where it has one), then change the
       template, colour, picture and the words on the cover. Same cover look as eNotes. -->
  <div class="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4" @click.self="emit('close')">
    <div class="bg-white dark:bg-gray-800 w-full sm:max-w-3xl max-h-[95vh] sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col overflow-hidden">
      <div class="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="min-w-0">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">Design the cover</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 truncate">How "{{ book.title }}" looks on the shelves</p>
        </div>
        <button @click="emit('close')" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Close">
          <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-5 space-y-6">
        <!-- Suggestions -->
        <div>
          <p class="text-sm font-semibold text-gray-800 dark:text-gray-100">Suggestions</p>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Tap one to start from it, then change anything below.</p>
          <div class="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
            <button
              v-for="(s, i) in suggestions"
              :key="i"
              type="button"
              class="flex-shrink-0 rounded-xl border-2 p-2 pt-3 transition-colors"
              :class="sameAs(s) ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500'"
              :title="`${templateName(s.template)} cover`"
              @click="design = { ...s }"
            >
              <ShelfBook size="sm" :title="s.title" :seed="book.id" :label="label" :cover="s" />
            </button>
          </div>
        </div>

        <div class="grid gap-6 md:grid-cols-[220px_1fr]">
          <!-- Live preview on a little shelf -->
          <div class="flex flex-col items-center">
            <div class="preview-stage">
              <ShelfBook size="lg" :title="design.title || book.title" :seed="book.id" :label="label" :cover="design" />
              <div class="preview-plank" aria-hidden="true"></div>
            </div>
            <p class="mt-3 text-[11px] text-gray-400 text-center">Preview - updates as you edit</p>
          </div>

          <div class="space-y-5 min-w-0">
            <!-- Template -->
            <div>
              <p class="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">Template</p>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  v-for="tpl in COVER_TEMPLATES"
                  :key="tpl.id"
                  type="button"
                  class="rounded-lg border-2 px-2 py-2 text-left transition-colors"
                  :class="design.template === tpl.id ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'"
                  @click="design.template = tpl.id"
                >
                  <span class="block text-xs font-semibold text-gray-800 dark:text-gray-100">{{ tpl.label }}</span>
                  <span class="block text-[10px] leading-tight text-gray-500 dark:text-gray-400">{{ tpl.hint }}</span>
                </button>
              </div>
            </div>

            <!-- Colour -->
            <div>
              <p class="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">Cover colour</p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="c in COVER_COLORS"
                  :key="c"
                  type="button"
                  class="w-8 h-8 rounded-full ring-offset-2 dark:ring-offset-gray-800 transition-shadow"
                  :class="design.color === c ? 'ring-2 ring-indigo-500' : 'hover:ring-2 hover:ring-gray-300'"
                  :style="{ backgroundColor: c }"
                  :aria-label="`Colour ${c}`"
                  @click="design.color = c"
                ></button>
              </div>
            </div>

            <!-- Picture -->
            <div>
              <p class="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">Picture <span class="font-normal text-gray-400">(optional)</span></p>
              <div class="flex flex-wrap items-center gap-2">
                <div v-if="design.image" class="w-12 h-12 rounded-lg bg-cover bg-center border border-gray-200 dark:border-gray-600 flex-shrink-0" :style="{ backgroundImage: `url('${resolveAssetUrl(design.image)}')` }"></div>
                <button type="button" :disabled="uploading" class="px-3 py-2 text-xs font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50" @click="fileInput?.click()">
                  {{ uploading ? 'Uploading…' : design.image ? 'Change picture' : 'Upload a picture' }}
                </button>
                <button v-if="firstPage && design.image !== firstPage" type="button" class="px-3 py-2 text-xs font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" @click="design.image = firstPage">Use the book's page</button>
                <button v-if="design.image" type="button" class="px-3 py-2 text-xs font-medium rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30" @click="design.image = null">No picture</button>
                <input ref="fileInput" type="file" accept="image/jpeg,image/png,image/webp" class="hidden" @change="onPickImage">
              </div>
            </div>

            <!-- Words -->
            <div class="grid gap-3 sm:grid-cols-2">
              <label class="sm:col-span-2 block">
                <span class="text-sm font-semibold text-gray-800 dark:text-gray-100">Title on the cover</span>
                <input v-model="design.title" maxlength="120" :placeholder="book.title" class="mt-1 w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500">
              </label>
              <label class="block">
                <span class="text-sm font-semibold text-gray-800 dark:text-gray-100">Author</span>
                <input v-model="design.author" maxlength="80" placeholder="e.g. M. Nelkon" class="mt-1 w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500">
              </label>
              <label class="block">
                <span class="text-sm font-semibold text-gray-800 dark:text-gray-100">Year</span>
                <input v-model="design.year" maxlength="10" class="mt-1 w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500">
              </label>
            </div>

            <p v-if="errorMessage" class="text-sm text-red-600 dark:text-red-400">{{ errorMessage }}</p>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-2 px-5 py-4 border-t border-gray-200 dark:border-gray-700">
        <button v-if="hadDesign" type="button" :disabled="saving" class="px-3 py-2 text-sm font-medium rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50" @click="save(true)">
          Use the picture cover instead
        </button>
        <div class="flex-1"></div>
        <button type="button" class="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" @click="emit('close')">Cancel</button>
        <button type="button" :disabled="saving || uploading" class="px-4 py-2 text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50" @click="save(false)">
          {{ saving ? 'Saving…' : 'Save cover' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import axios from 'axios'
import ShelfBook from '@/components/library/ShelfBook.vue'
import { COVER_TEMPLATES, COVER_COLORS, parseCoverDesign, type ENoteCoverDesign } from '@/utils/enoteCover'
import { resolveAssetUrl } from '@/utils/url'
import type { LibraryBook } from '@/types/library'

const props = defineProps<{ book: LibraryBook; api: string; label: string }>()
const emit = defineEmits<{ close: []; saved: [design: string | null] }>()

const niceTitle = (t: string) => (t === t.toUpperCase() ? t.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()) : t)

// The book's own cover picture (its first page, or one uploaded) - the natural picture for a design
const firstPage = props.book.cover_image || null
const existing = parseCoverDesign(props.book.cover_design)
const hadDesign = existing !== null

// Every template, each in two colours picked for this book, with its page as the picture
const suggestions = computed<ENoteCoverDesign[]>(() => {
  const base = Math.abs(props.book.id)
  const colours = [COVER_COLORS[base % COVER_COLORS.length], COVER_COLORS[(base + 4) % COVER_COLORS.length]]
  const out: ENoteCoverDesign[] = []
  for (const c of colours) {
    for (const t of COVER_TEMPLATES) {
      out.push({ template: t.id, color: c, image: firstPage, title: niceTitle(props.book.title), author: props.book.author || '', year: String(new Date().getFullYear()) })
    }
  }
  return out
})

const design = ref<ENoteCoverDesign>(existing ?? { ...suggestions.value[0] })
const sameAs = (s: ENoteCoverDesign) => s.template === design.value.template && s.color === design.value.color && s.image === design.value.image
const templateName = (id: string) => COVER_TEMPLATES.find(t => t.id === id)?.label || id

const fileInput = ref<HTMLInputElement | null>(null)
const uploading = ref(false)
const saving = ref(false)
const errorMessage = ref('')

const onPickImage = async (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return
  if (file.size > 8 * 1024 * 1024) {
    errorMessage.value = 'That picture is too large - please use one under 8MB.'
    return
  }
  errorMessage.value = ''
  uploading.value = true
  try {
    const data = new FormData()
    data.append('cover', file)
    data.append('purpose', 'art')
    const res = await axios.post(`${props.api}/${props.book.id}/cover`, data)
    design.value.image = res.data.data.image
  } catch (err: any) {
    errorMessage.value = err.response?.data?.message || 'Could not upload that picture. Try another one.'
  } finally {
    uploading.value = false
  }
}

const save = async (reset: boolean) => {
  saving.value = true
  errorMessage.value = ''
  const payload = reset ? null : { ...design.value, title: design.value.title.trim() || props.book.title }
  try {
    await axios.put(`${props.api}/${props.book.id}`, { cover_design: payload })
    emit('saved', payload ? JSON.stringify(payload) : null)
  } catch (err: any) {
    errorMessage.value = err.response?.data?.errors?.cover_design || err.response?.data?.message || 'Could not save the cover. Please try again.'
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.preview-stage {
  --preview-book-h: 242px;
  position: relative;
  width: 210px;
  height: calc(12px + var(--preview-book-h) + 34px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 12px;
  border-radius: 12px;
  background: linear-gradient(180deg, #f4ede1, #e8dcc7);
  overflow: hidden;
}
.dark .preview-stage {
  background: linear-gradient(180deg, #2b2620, #221e19);
}
.preview-plank {
  position: absolute;
  left: 0;
  right: 0;
  top: calc(12px + var(--preview-book-h));
  height: 14px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.35) 0 3px, transparent 3px), linear-gradient(180deg, #b27a43, #8a5a2b 60%, #6e4520);
  box-shadow: 0 6px 8px -2px rgba(0, 0, 0, 0.35);
}
</style>
