<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white dark:bg-[#202c33] rounded-xl w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col">
      <div class="p-5 border-b border-gray-200 dark:border-white/5 flex items-center gap-2">
        <button v-if="mode === 'list'" @click="backToChooser" class="p-1.5 -ml-1.5 hover:bg-gray-100 dark:hover:bg-[#2a3942] rounded-lg transition-colors flex-shrink-0">
          <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex-1">
          {{ mode === 'choose' ? 'New Chat' : (tabs.find(t => t.key === activeTab)?.label || 'New Chat') }}
        </h3>
        <button @click="$emit('close')" class="p-2 hover:bg-gray-100 dark:hover:bg-[#2a3942] rounded-lg transition-colors">
          <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Step 1: choose a group -->
      <div v-if="mode === 'choose'" class="flex-1 overflow-y-auto p-4 space-y-2">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="chooseGroup(tab.key)"
          class="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border border-gray-200 dark:border-white/10 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-gray-50 dark:hover:bg-[#2a3942] transition-colors text-left"
        >
          <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br text-white" :class="groupAccent(tab.key)">
            <svg v-if="tab.key === 'classes'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4"></path>
            </svg>
            <svg v-else-if="isTeacherLikeTab(tab.key)" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ tab.label }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ tab.key === 'classes' ? `${(classGroups || []).length} group${(classGroups || []).length === 1 ? '' : 's'}` : `${groupContacts(tab.key).length} ${groupContacts(tab.key).length === 1 ? 'person' : 'people'}` }}
            </p>
          </div>
          <svg class="w-4 h-4 text-gray-300 dark:text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>

      <!-- Step 2: pick someone within the chosen group -->
      <template v-else>
        <div class="px-5 pt-4">
          <input
            v-model="search"
            type="text"
            placeholder="Search..."
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-[#2a3942] dark:text-white"
            autofocus
          >
        </div>

        <div class="flex-1 overflow-y-auto p-2 mt-2">
          <template v-if="activeTab === 'classes'">
            <button
              v-for="cls in filteredClassGroups"
              :key="`${cls.class_id}-${cls.department_id}`"
              @click="$emit('select-class', cls)"
              class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2a3942] transition-colors text-left"
            >
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4"></path>
                </svg>
              </div>
              <div class="min-w-0">
                <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ cls.class_name }}{{ cls.stream_name ? ' - ' + cls.stream_name : '' }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ cls.department_name }} class group</p>
              </div>
            </button>
            <p v-if="filteredClassGroups.length === 0" class="text-center text-sm text-gray-400 py-8">No classes found</p>
          </template>

          <template v-else>
            <button
              v-for="contact in filteredContacts"
              :key="`${contact.role}-${contact.id}`"
              @click="$emit('select-contact', contact)"
              class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2a3942] transition-colors text-left"
            >
              <div class="relative flex-shrink-0">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-semibold text-sm">
                  {{ (contact.first_name[0] || '') + (contact.last_name[0] || '') }}
                </div>
                <span
                  v-if="contact.is_online"
                  class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-800"
                  title="Online"
                ></span>
              </div>
              <div class="min-w-0">
                <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ contact.first_name }} {{ contact.last_name }}</p>
                <p v-if="contact.department_name" class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ contact.department_name }}</p>
                <p v-else-if="contact.is_online" class="text-xs text-emerald-600 dark:text-emerald-400">Online</p>
              </div>
            </button>
            <p v-if="filteredContacts.length === 0" class="text-center text-sm text-gray-400 py-8">No contacts found</p>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ChatContact, ChatClassGroup } from '@/types/chat'

interface ContactTab {
  key: string
  label: string
  contacts: ChatContact[]
}

const props = defineProps<{ contactTabs: ContactTab[]; classGroups?: ChatClassGroup[] }>()
defineEmits<{ close: []; 'select-contact': [ChatContact]; 'select-class': [ChatClassGroup] }>()

const search = ref('')
const activeTab = ref(props.contactTabs[0]?.key || '')
const mode = ref<'choose' | 'list'>('choose')

const tabs = computed(() => {
  const t = props.contactTabs.map(t => ({ key: t.key, label: t.label }))
  if (props.classGroups && props.classGroups.length > 0) {
    t.push({ key: 'classes', label: 'My Classes' })
  }
  return t
})

const chooseGroup = (key: string) => {
  activeTab.value = key
  search.value = ''
  mode.value = 'list'
}

const backToChooser = () => {
  mode.value = 'choose'
  search.value = ''
}

const groupContacts = (key: string) => props.contactTabs.find(t => t.key === key)?.contacts || []

const isTeacherLikeTab = (key: string) => key === 'teachers' || key === 'colleagues'

const groupAccentPalette: Record<string, string> = {
  classes: 'from-indigo-500 to-purple-600',
  teachers: 'from-amber-500 to-orange-600',
  colleagues: 'from-amber-500 to-orange-600'
}
const groupAccent = (key: string) => groupAccentPalette[key] || 'from-emerald-500 to-teal-600'

const filteredContacts = computed(() => {
  const tab = props.contactTabs.find(t => t.key === activeTab.value)
  if (!tab) return []
  const q = search.value.trim().toLowerCase()
  if (!q) return tab.contacts
  return tab.contacts.filter(c => `${c.first_name} ${c.last_name}`.toLowerCase().includes(q))
})

const filteredClassGroups = computed(() => {
  const groups = props.classGroups || []
  const q = search.value.trim().toLowerCase()
  if (!q) return groups
  return groups.filter(g => g.class_name.toLowerCase().includes(q) || (g.department_name || '').toLowerCase().includes(q))
})
</script>
