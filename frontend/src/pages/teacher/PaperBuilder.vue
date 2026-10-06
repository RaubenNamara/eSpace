<template>
  <!-- Writing an Item Bank paper in eSpace, one question per page - the question in the same
       editor as eNotes (text, pictures, equations, video), and how it's answered: choices,
       true/false, a short answer, or a written answer with a model answer. Students check their
       answers as they go; any question can also be placed on an eNote page. -->
  <div class="w-full">
    <button type="button" class="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" @click="router.push('/teacher/itembank')">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
      Item Bank
    </button>
    <PageHeader :title="paper?.title || 'Paper'" :description="`${pages.length} question${pages.length === 1 ? '' : 's'} · ${paper?.status === 'published' ? 'students can open it' : 'a draft - only you can see it'}`" icon="clipboard" accent="amber">
      <template #actions>
        <span class="hidden sm:inline text-xs text-gray-400 self-center">{{ saveLabel }}</span>
        <button type="button" class="btn-secondary" @click="previewing = !previewing">{{ previewing ? 'Back to writing' : 'Try it as a student' }}</button>
        <button type="button" class="btn-primary" :disabled="!pages.length" @click="togglePublish">{{ paper?.status === 'published' ? 'Unpublish' : 'Publish' }}</button>
      </template>
    </PageHeader>

    <div v-if="loading" class="grid lg:grid-cols-[16rem_1fr] gap-4">
      <div class="h-80 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 animate-pulse"></div>
      <div class="h-96 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 animate-pulse"></div>
    </div>

    <div v-else class="grid lg:grid-cols-[16rem_1fr] gap-4 items-start">
      <!-- The questions -->
      <aside class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 lg:sticky lg:top-20">
        <ol class="space-y-1 max-h-[60vh] overflow-y-auto">
          <li v-for="(p, i) in pages" :key="p.id">
            <button
              type="button"
              class="w-full flex items-start gap-2 rounded-xl px-2.5 py-2 text-left"
              :class="current?.id === p.id ? 'bg-amber-50 dark:bg-amber-900/25 ring-1 ring-amber-300 dark:ring-amber-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700/40'"
              @click="select(p.id)"
            >
              <span class="mt-0.5 w-6 h-6 flex-shrink-0 rounded-lg bg-gray-100 dark:bg-gray-700 text-[11px] font-bold flex items-center justify-center text-gray-700 dark:text-gray-200">{{ i + 1 }}</span>
              <span class="min-w-0 flex-1">
                <span class="block text-xs text-gray-800 dark:text-gray-100 line-clamp-2">{{ glimpse(p) || 'New question' }}</span>
                <span class="block text-[10px] font-semibold" :class="hasKey(p) ? 'text-gray-400' : 'text-amber-600 dark:text-amber-400'">{{ TYPE_LABEL[p.answer_type] }}<template v-if="!hasKey(p)"> · no answer set</template></span>
              </span>
            </button>
          </li>
        </ol>
        <button type="button" class="mt-2 w-full px-3 py-2 rounded-xl text-sm font-semibold bg-amber-600 text-white hover:bg-amber-700" @click="addQuestion">+ Add a question</button>
      </aside>

      <!-- The question being written -->
      <section v-if="current" class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 sm:p-5 min-w-0">
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <h2 class="text-sm font-bold text-gray-900 dark:text-white">Question {{ currentIndex + 1 }}</h2>
          <div class="ml-auto flex items-center gap-1">
            <button type="button" class="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30" :disabled="currentIndex === 0" title="Move up" @click="move(-1)">↑</button>
            <button type="button" class="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30" :disabled="currentIndex === pages.length - 1" title="Move down" @click="move(1)">↓</button>
            <button type="button" class="px-2 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20" @click="remove">Delete</button>
          </div>
        </div>

        <!-- As a student would see it -->
        <div v-if="previewing" class="rounded-xl border border-dashed border-gray-300 dark:border-gray-600 p-4">
          <PracticeQuestion :question="current" :item-id="paperId" preview />
        </div>

        <template v-else>
          <CKEditor
            :key="current.id"
            v-model="current.content"
            placeholder="Write the question - text, a picture, a diagram, an equation…"
            min-height="160px"
            @update:model-value="queueSave"
          />

          <!-- How it's answered -->
          <div class="mt-4">
            <p class="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1.5">How students answer</p>
            <div class="flex flex-wrap gap-1.5">
              <button
                v-for="t in TYPES"
                :key="t"
                type="button"
                class="px-3 py-1.5 rounded-lg text-xs font-semibold border"
                :class="current.answer_type === t ? 'bg-amber-600 border-amber-600 text-white' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-300'"
                @click="setType(t)"
              >{{ TYPE_LABEL[t] }}</button>
            </div>
          </div>

          <!-- Choices -->
          <div v-if="current.answer_type === 'single' || current.answer_type === 'multiple'" class="mt-3 space-y-1.5">
            <p class="text-[11px] text-gray-500 dark:text-gray-400">{{ current.answer_type === 'single' ? 'Tick the one right answer.' : 'Tick every right answer.' }}</p>
            <div v-for="(_o, i) in current.options" :key="i" class="flex items-center gap-2">
              <input
                :type="current.answer_type === 'single' ? 'radio' : 'checkbox'"
                :name="`correct-${current.id}`"
                class="w-4 h-4 text-emerald-600 border-gray-300"
                :checked="isCorrect(i)"
                :aria-label="`Choice ${letters[i]} is right`"
                @change="toggleCorrect(i)"
              >
              <span class="w-5 text-xs font-bold text-gray-400">{{ letters[i] }}</span>
              <input v-model="current.options[i]" type="text" maxlength="500" class="flex-1 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm dark:text-white" :placeholder="`Choice ${letters[i]}`" @input="queueSave">
              <button type="button" class="p-1 text-gray-400 hover:text-rose-500" :aria-label="`Remove choice ${letters[i]}`" @click="removeOption(i)">✕</button>
            </div>
            <button v-if="current.options.length < 8" type="button" class="text-xs font-semibold text-amber-700 dark:text-amber-300 hover:underline" @click="addOption">+ Add a choice</button>
          </div>

          <!-- True / false -->
          <div v-else-if="current.answer_type === 'true_false'" class="mt-3 flex gap-2">
            <button v-for="v in [true, false]" :key="String(v)" type="button" class="px-4 py-2 rounded-xl border text-sm font-semibold" :class="current.correct === v ? 'border-emerald-400 bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'" @click="current.correct = v; queueSave()">{{ v ? 'True' : 'False' }} is right</button>
          </div>

          <!-- Short answer -->
          <div v-else-if="current.answer_type === 'short'" class="mt-3">
            <label class="block text-[11px] text-gray-500 dark:text-gray-400 mb-1">Answers to accept - one per line. Capitals, spaces and a full stop don't matter.</label>
            <textarea :value="shortText" rows="3" class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm dark:text-white" placeholder="ammeter&#10;an ammeter" @input="setShort(($event.target as HTMLTextAreaElement).value)"></textarea>
          </div>

          <!-- Model answer (written, and helpful for any type) -->
          <div v-if="current.answer_type !== 'none'" class="mt-3">
            <label class="block text-[11px] text-gray-500 dark:text-gray-400 mb-1">{{ current.answer_type === 'written' ? 'Model answer - students compare theirs with it' : 'Explanation shown after they answer (optional)' }}</label>
            <TypedAnswerEditor
              :key="`model-${current.id}`"
              :model-value="current.model_answer || ''"
              :placeholder="current.answer_type === 'written' ? 'What a full-marks answer says' : 'Why the answer is right - optional'"
              @update:model-value="setModel"
            />
          </div>

          <div v-if="current.answer_type !== 'none'" class="mt-3 flex items-center gap-2">
            <label class="text-xs text-gray-500 dark:text-gray-400" :for="`marks-${current.id}`">Marks</label>
            <input :id="`marks-${current.id}`" v-model.number="current.marks" type="number" min="0" max="100" step="0.5" class="w-20 px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm dark:text-white" @input="queueSave">
          </div>
        </template>
      </section>

      <EmptyState v-else icon="clipboard" tone="amber" title="No questions yet" message="Add the first question - write it like an eNote page, then choose how students answer it.">
        <button type="button" class="btn-primary" @click="addQuestion">Add a question</button>
      </EmptyState>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import CKEditor from '@/components/teacher/CKEditor.vue'
import TypedAnswerEditor from '@/components/assignment/TypedAnswerEditor.vue'
import PracticeQuestion, { type PaperQuestion } from '@/components/itembank/PracticeQuestion.vue'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'

type Q = PaperQuestion & { options: string[]; correct?: any; model_answer?: string | null }
const TYPES = ['single', 'multiple', 'true_false', 'short', 'written', 'none'] as const
const TYPE_LABEL: Record<string, string> = { single: 'One right choice', multiple: 'Several right choices', true_false: 'True or false', short: 'Short answer', written: 'Written answer', none: 'No answer (information)' }
const letters = 'ABCDEFGH'

const route = useRoute()
const router = useRouter()
const toast = useToastStore()
const confirmDialog = useConfirmStore()
const paperId = computed(() => Number(route.params.id))
const paper = ref<{ id: number; title: string; status: string } | null>(null)
const pages = ref<Q[]>([])
const currentId = ref<number | null>(null)
const loading = ref(true)
const previewing = ref(false)
const saving = ref<'idle' | 'saving' | 'saved' | 'error'>('idle')
const dirty = new Set<number>()
let timer: number | null = null

const current = computed(() => pages.value.find(p => p.id === currentId.value) || null)
const currentIndex = computed(() => pages.value.findIndex(p => p.id === currentId.value))
const saveLabel = computed(() => ({ idle: '', saving: 'Saving…', saved: 'All changes saved', error: 'Not saved' }[saving.value]))

const glimpse = (p: Q) => (p.content || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 90)
const hasKey = (p: Q) => {
  switch (p.answer_type) {
    case 'single': return typeof p.correct === 'number'
    case 'multiple': return Array.isArray(p.correct) && p.correct.length > 0
    case 'true_false': return typeof p.correct === 'boolean'
    case 'short': return Array.isArray(p.correct) && p.correct.length > 0
    case 'written': return !!p.model_answer
    default: return true
  }
}

const load = async () => {
  const res = await axios.get(`/api/teacher/itembank/${paperId.value}/pages`)
  paper.value = res.data.data.paper
  pages.value = (res.data.data.pages || []).map((p: Q) => ({ ...p, options: p.options || [] }))
  if (!currentId.value || !pages.value.some(p => p.id === currentId.value)) currentId.value = pages.value[0]?.id ?? null
}

// ---- Saving: changes queue for a moment, then each changed question is sent ----
const queueSave = () => {
  if (current.value) dirty.add(current.value.id)
  saving.value = 'idle'
  if (timer) clearTimeout(timer)
  timer = window.setTimeout(flush, 900)
}
const flush = async (): Promise<boolean> => {
  if (timer) { clearTimeout(timer); timer = null }
  if (!dirty.size) return true
  saving.value = 'saving'
  const ids = [...dirty]
  dirty.clear()
  try {
    for (const id of ids) {
      const p = pages.value.find(x => x.id === id)
      if (!p) continue
      await axios.put(`/api/teacher/itembank/pages/${id}`, {
        content: p.content,
        answer_type: p.answer_type,
        options: p.options,
        correct: p.correct ?? null,
        model_answer: p.model_answer ?? null,
        marks: p.marks
      })
    }
    saving.value = 'saved'
    return true
  } catch (err: any) {
    ids.forEach(id => dirty.add(id))
    saving.value = 'error'
    toast.error(err.response?.data?.message || 'Your changes could not be saved - check the connection')
    return false
  }
}

const select = async (id: number) => {
  if (!await flush()) return
  currentId.value = id
}

const addQuestion = async () => {
  if (!await flush()) return
  try {
    const res = await axios.post(`/api/teacher/itembank/${paperId.value}/pages`, current.value ? { after: current.value.page_number } : {})
    await load()
    currentId.value = res.data.data.page.id
    previewing.value = false
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not add a question')
  }
}

const remove = async () => {
  if (!current.value) return
  if (!await confirmDialog.open({ title: 'Delete question', message: 'Delete this question? If it is placed on an eNote page, it comes off that page too.', confirmLabel: 'Delete', danger: true })) return
  const idx = currentIndex.value
  try {
    dirty.delete(current.value.id)
    await axios.delete(`/api/teacher/itembank/pages/${current.value.id}`)
    await load()
    currentId.value = pages.value[Math.min(idx, pages.value.length - 1)]?.id ?? null
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not delete the question')
  }
}

const move = async (d: number) => {
  if (!await flush()) return
  const i = currentIndex.value
  const j = i + d
  if (j < 0 || j >= pages.value.length) return
  const list = [...pages.value]
  ;[list[i], list[j]] = [list[j], list[i]]
  pages.value = list
  try {
    await axios.post(`/api/teacher/itembank/${paperId.value}/pages/reorder`, { ids: list.map(p => p.id) })
    await load()
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not move the question')
    await load()
  }
}

// ---- Answer key editing ----
const setType = (t: Q['answer_type']) => {
  const p = current.value
  if (!p || p.answer_type === t) return
  p.answer_type = t
  p.correct = t === 'multiple' ? [] : t === 'short' ? [] : null
  if ((t === 'single' || t === 'multiple') && p.options.length < 2) p.options = [...p.options, '', ''].slice(0, Math.max(p.options.length, 4))
  queueSave()
}
const isCorrect = (i: number) => {
  const c = current.value?.correct
  return current.value?.answer_type === 'single' ? c === i : Array.isArray(c) && c.includes(i)
}
const toggleCorrect = (i: number) => {
  const p = current.value!
  if (p.answer_type === 'single') p.correct = i
  else {
    const list: number[] = Array.isArray(p.correct) ? [...p.correct] : []
    p.correct = list.includes(i) ? list.filter(x => x !== i) : [...list, i].sort()
  }
  queueSave()
}
const addOption = () => { current.value!.options.push(''); queueSave() }
const removeOption = (i: number) => {
  const p = current.value!
  p.options.splice(i, 1)
  // Answer keys point at positions - shift them past the removed choice
  if (p.answer_type === 'single') p.correct = p.correct === i ? null : (typeof p.correct === 'number' && p.correct > i ? p.correct - 1 : p.correct)
  else if (Array.isArray(p.correct)) p.correct = (p.correct as number[]).filter(x => x !== i).map(x => (x > i ? x - 1 : x))
  queueSave()
}
const shortText = computed(() => (Array.isArray(current.value?.correct) ? (current.value!.correct as string[]).join('\n') : ''))
const setShort = (v: string) => { current.value!.correct = v.split('\n').map(s => s.trim()).filter(Boolean); queueSave() }
// The model answer is formatted text (bold, lists...) from the same editor students answer in
const setModel = (html: string) => {
  const empty = !html.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, '').trim()
  current.value!.model_answer = empty ? null : html
  queueSave()
}

const togglePublish = async () => {
  if (!paper.value) return
  if (!await flush()) return
  const missing = pages.value.filter(p => !hasKey(p)).length
  const next = paper.value.status === 'published' ? 'draft' : 'published'
  if (next === 'published' && missing && !await confirmDialog.open({ title: 'Publish without answers?', message: `${missing} question${missing === 1 ? ' has' : 's have'} no answer set - students won't be able to check ${missing === 1 ? 'it' : 'them'}. Publish anyway?`, confirmLabel: 'Publish' })) return
  try {
    await axios.put(`/api/teacher/itembank/${paperId.value}`, { status: next })
    paper.value.status = next
    toast.success(next === 'published' ? 'Published - students can open it now' : 'Back to draft')
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not change that')
  }
}

onBeforeRouteLeave(async () => { await flush() })
onBeforeUnmount(() => { if (timer) clearTimeout(timer) })
onMounted(async () => {
  try {
    await load()
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not open the paper')
  } finally {
    loading.value = false
  }
})
</script>
