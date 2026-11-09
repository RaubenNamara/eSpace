<template>
  <!-- Create a study group without leaving Chats: a goal, an optional subject and date, and the classmates -->
  <div class="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4" @click.self="$emit('close')">
    <form class="w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-white dark:bg-gray-800 p-5" @submit.prevent="create">
      <h2 class="text-lg font-bold text-gray-900 dark:text-white">Create study group</h2>
      <label class="mt-4 block">
        <span class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">What are you revising?</span>
        <input v-model="form.goal" maxlength="200" required placeholder="e.g. Photosynthesis before Friday's test" class="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white">
      </label>
      <div class="mt-3 grid grid-cols-2 gap-3">
        <label class="block">
          <span class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Subject</span>
          <select v-model.number="form.subject_id" class="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white">
            <option :value="0">Any</option>
            <option v-for="s in subjects" :key="s.id" :value="s.id">{{ s.name }}</option>
          </select>
        </label>
        <label class="block">
          <span class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">By when</span>
          <input v-model="form.target_date" type="date" :min="today" class="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white">
        </label>
      </div>
      <div class="mt-3">
        <span class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Classmates <span class="font-normal text-gray-400">({{ form.members.size }}/{{ maxMembers - 1 }})</span></span>
        <input v-model="search" placeholder="Search classmates" class="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white">
        <ul class="mt-2 max-h-56 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700 rounded-xl border border-gray-200 dark:border-gray-700">
          <li v-if="loading" class="px-3 py-3 text-sm text-gray-400">Loading classmates…</li>
          <template v-else>
            <li v-for="c in shownClassmates" :key="c.id">
              <label class="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/40" :class="{ 'opacity-50': !form.members.has(c.id) && form.members.size >= maxMembers - 1 }">
                <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-indigo-600" :checked="form.members.has(c.id)" :disabled="!form.members.has(c.id) && form.members.size >= maxMembers - 1" @change="toggleMember(c.id)">
                <span class="text-sm text-gray-800 dark:text-gray-100">{{ niceName(c.name) }}</span>
              </label>
            </li>
            <li v-if="!shownClassmates.length" class="px-3 py-3 text-sm text-gray-400">No classmates match.</li>
          </template>
        </ul>
      </div>
      <div class="mt-5 flex justify-end gap-2">
        <button type="button" class="btn-secondary" @click="$emit('close')">Cancel</button>
        <button type="submit" class="btn-primary" :disabled="saving || !form.goal.trim() || !form.members.size">{{ saving ? 'Creating…' : 'Create group' }}</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import axios from 'axios'
import { niceName } from '@/components/dashboard/teacher/time'
import { useToastStore } from '@/stores/toast'

interface Person { id: number; name: string }

const emit = defineEmits<{ close: []; created: [id: number] }>()
const toast = useToastStore()
const classmates = ref<Person[]>([])
const subjects = ref<Person[]>([])
const maxMembers = ref(5)
const loading = ref(true)
const saving = ref(false)
const search = ref('')
const form = reactive({ goal: '', subject_id: 0, target_date: '', members: new Set<number>() })
const today = new Date().toISOString().slice(0, 10)

const shownClassmates = computed(() => {
  const q = search.value.trim().toLowerCase()
  return classmates.value.filter(c => !q || c.name.toLowerCase().includes(q)).slice(0, 80)
})
const toggleMember = (id: number) => {
  const s = new Set(form.members)
  if (s.has(id)) s.delete(id)
  else s.add(id)
  form.members = s
}

onMounted(async () => {
  try {
    const res = await axios.get('/api/student/study-groups')
    classmates.value = res.data.data.classmates || []
    subjects.value = res.data.data.subjects || []
    maxMembers.value = res.data.data.max_members || 5
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not load your classmates')
  } finally {
    loading.value = false
  }
})

const create = async () => {
  saving.value = true
  try {
    const res = await axios.post('/api/student/study-groups', {
      goal: form.goal,
      subject_id: form.subject_id || null,
      target_date: form.target_date || null,
      member_ids: [...form.members]
    })
    toast.success('Study group created')
    emit('created', res.data.data.id)
  } catch (err: any) {
    const errors = err.response?.data?.errors
    toast.error((errors && Object.values(errors)[0]) as string || err.response?.data?.message || 'Could not create the group')
  } finally {
    saving.value = false
  }
}
</script>
