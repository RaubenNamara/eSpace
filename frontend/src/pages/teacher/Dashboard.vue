<template>
  <!-- The teacher's home, in the same format as the students': notices sliding past, then cream
       cards with dark-green title bars - what is waiting to be marked, shortcuts, today, who
       needs attention and each class. Each card shows a few and opens up for the rest. -->
  <div class="w-full">
    <!-- Greeting, the department and its students -->
    <header class="mb-3 flex flex-col sm:flex-row sm:items-end gap-x-3 gap-y-2">
      <div class="min-w-0 flex-1">
        <p class="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{{ todayLabel }}</p>
        <h1 class="text-2xl sm:text-[1.7rem] font-extrabold tracking-tight text-gray-900 dark:text-white truncate">{{ greeting }}, {{ firstName }}</h1>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <select
          v-if="myDepartments.length > 1"
          :value="activeDepartmentId"
          :disabled="switchingDepartment"
          class="rounded-xl border-0 ring-1 ring-gray-200 dark:ring-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 pl-3 pr-8 py-1.5 text-sm font-semibold focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          @change="switchDepartment(($event.target as HTMLSelectElement).value)"
        >
          <option v-for="dept in myDepartments" :key="dept.id" :value="dept.id">{{ dept.name }}{{ dept.is_primary ? ' (Primary)' : '' }}</option>
        </select>
        <span v-else-if="analytics.department" class="px-3 py-1.5 rounded-xl bg-indigo-800 text-white text-sm font-bold">{{ analytics.department.name }}</span>
        <button v-if="analytics.department" type="button" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700 text-sm font-semibold text-gray-800 dark:text-gray-100 hover:ring-indigo-300" @click="openViewEnrolledModal">
          <AppIcon name="users" class="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          {{ analytics.total_enrollments ? `${analytics.total_enrollments.toLocaleString()} students` : 'Enrolled students' }}
        </button>
      </div>
    </header>

    <NoticesTicker role="teacher" />

    <div v-if="!overview && !overviewError" class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
      <div class="lg:col-span-2"><Skeleton variant="list" :count="4" /></div>
      <Skeleton variant="list" :count="3" />
    </div>
    <EmptyState v-else-if="!overview" class="mb-6" card tone="rose" icon="clipboard" title="Today's overview couldn't load" :message="overviewError">
      <button type="button" class="px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700" @click="retryOverview">Try again</button>
    </EmptyState>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
      <div class="lg:col-span-2 flex flex-col gap-4 min-w-0">
        <!-- To mark -->
        <section class="dash-box">
          <h2 class="dash-bar">To mark <span v-if="marking.waiting" class="px-2 py-0.5 rounded-full bg-amber-400 text-gray-900 text-xs font-extrabold">{{ marking.waiting }}</span>
            <RouterLink v-if="overview.mark_next[0]" :to="`/teacher/assignments/${overview.mark_next[0].assignment_id}/submissions?submission=${overview.mark_next[0].submission_id}`" class="dash-bar-link">Mark next →</RouterLink>
            <RouterLink v-else to="/teacher/assignments" class="dash-bar-link">Assessments</RouterLink>
          </h2>
          <div v-if="!markingRows.length" class="p-4 flex items-center gap-3">
            <span class="w-10 h-10 flex-shrink-0 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 flex items-center justify-center"><AppIcon name="check" class="w-5 h-5" /></span>
            <p class="text-[0.95rem] text-gray-700 dark:text-gray-200">All marked{{ marking.marked_week ? ` - ${marking.marked_week} marked this week` : '' }}. Nothing waiting.</p>
          </div>
          <TransitionGroup v-else tag="ul" name="dash-pop" class="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3">
            <li v-for="m in shown('marking', markingRows)" :key="m.assignment_id" class="min-w-0">
              <RouterLink :to="`/teacher/assignments/${m.assignment_id}/submissions`" class="dash-chip group">
                <span class="dash-chip-badge bg-indigo-700">{{ shortClass(m.class_name) }}</span>
                <span class="min-w-0 flex-1">
                  <span class="block text-sm font-bold text-gray-900 dark:text-white truncate">{{ m.title }}</span>
                  <span class="block text-xs text-gray-500 dark:text-gray-400 truncate">{{ m.waiting }} to mark · {{ m.submitted }} of {{ m.expected }} handed in</span>
                </span>
                <span class="flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold text-white bg-indigo-600 group-hover:bg-indigo-700 transition">Mark</span>
              </RouterLink>
            </li>
          </TransitionGroup>
          <button v-if="markingRows.length > LIMIT.marking" type="button" class="dash-more" :aria-expanded="!!open.marking" @click="toggle('marking')">
            {{ open.marking ? 'Show less' : `Show ${markingRows.length - LIMIT.marking} more` }}
            <svg class="w-4 h-4 transition-transform duration-300" :class="open.marking ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" /></svg>
          </button>
        </section>

        <!-- Shortcuts to the main modules -->
        <section class="dash-box">
          <h2 class="dash-bar">Jump in</h2>
          <TransitionGroup tag="nav" name="dash-pop" class="grid grid-cols-4 gap-1 sm:gap-2 p-2 sm:p-3" aria-label="Shortcuts">
            <RouterLink v-for="s in shown('jump', shortcuts)" :key="s.to" :to="s.to" class="group flex flex-col items-center gap-1.5 rounded-xl py-2.5 px-1 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition min-w-0">
              <span class="w-11 h-11 rounded-2xl flex items-center justify-center bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100 dark:bg-indigo-950/50 dark:text-indigo-300 dark:ring-indigo-900 group-hover:bg-indigo-600 group-hover:text-white transition"><AppIcon :name="s.icon" class="w-5 h-5" /></span>
              <span class="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-100 text-center leading-tight">{{ s.label }}</span>
            </RouterLink>
          </TransitionGroup>
          <button v-if="shortcuts.length > LIMIT.jump" type="button" class="dash-more" :aria-expanded="!!open.jump" @click="toggle('jump')">
            {{ open.jump ? 'Show less' : `Show ${shortcuts.length - LIMIT.jump} more` }}
            <svg class="w-4 h-4 transition-transform duration-300" :class="open.jump ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" /></svg>
          </button>
        </section>
      </div>

      <div class="flex flex-col gap-4 min-w-0">
        <!-- Today, and what is coming up -->
        <section class="dash-box">
          <h2 class="dash-bar">Today <RouterLink to="/teacher/planner" class="dash-bar-link">My week</RouterLink></h2>
          <div v-if="!agenda.length" class="p-4 flex items-center gap-3">
            <p class="flex-1 text-[0.95rem] text-gray-700 dark:text-gray-200">Nothing scheduled for the next seven days.</p>
            <RouterLink to="/teacher/live-classes" class="flex-shrink-0 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold">Schedule</RouterLink>
          </div>
          <TransitionGroup v-else tag="ul" name="dash-pop" class="p-3 space-y-2">
            <li v-for="it in shown('today', agenda)" :key="`${it.kind}-${it.id}`">
              <RouterLink :to="it.kind === 'live' ? '/teacher/live-classes' : `/teacher/assignments/${it.id}/submissions`" class="dash-chip">
                <span class="dash-chip-badge" :class="it.kind === 'live' ? 'bg-red-600' : 'bg-indigo-700'"><AppIcon :name="it.kind === 'live' ? 'camera' : 'clipboard'" class="w-4 h-4" /></span>
                <span class="min-w-0 flex-1">
                  <span class="block text-sm font-bold text-gray-900 dark:text-white truncate">{{ it.title }}</span>
                  <span class="block text-xs text-gray-500 dark:text-gray-400 truncate">{{ it.kind === 'live' ? 'Live class' : 'Closes' }} {{ when(it.at) }}{{ it.class_name ? ` · ${it.class_name}` : '' }}</span>
                </span>
              </RouterLink>
            </li>
          </TransitionGroup>
          <button v-if="agenda.length > LIMIT.today" type="button" class="dash-more" :aria-expanded="!!open.today" @click="toggle('today')">
            {{ open.today ? 'Show less' : `Show ${agenda.length - LIMIT.today} more` }}
            <svg class="w-4 h-4 transition-transform duration-300" :class="open.today ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" /></svg>
          </button>
        </section>

        <!-- Who needs attention: a swipeable row on a phone, a list with "Show more" on a wider screen -->
        <section class="dash-box">
          <h2 class="dash-bar">Need attention <span v-if="needing.length" class="px-2 py-0.5 rounded-full bg-amber-400 text-gray-900 text-xs font-extrabold">{{ needing.length }}</span><RouterLink to="/teacher/early-warning" class="dash-bar-link">All</RouterLink></h2>
          <p v-if="!warningLoaded" class="p-4 text-sm text-gray-500 dark:text-gray-400">Checking…</p>
          <p v-else-if="!needing.length" class="p-4 text-[0.95rem] text-gray-700 dark:text-gray-200">No one is slipping right now.</p>
          <template v-else>
          <!-- Phone: swipe through them -->
          <ul class="md:hidden flex gap-2 overflow-x-auto snap-x snap-mandatory p-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Learners who need attention">
            <li v-for="st in needing.slice(0, 20)" :key="`m-${st.id}`" class="snap-start flex-shrink-0 w-[15.5rem] rounded-xl bg-white/80 dark:bg-gray-900/40 ring-1 ring-black/5 dark:ring-gray-700 p-2.5">
              <div class="flex items-center gap-2">
                <span class="dash-chip-badge bg-gray-800 dark:bg-gray-600">{{ initials(niceName(st.name)) }}</span>
                <span class="min-w-0">
                  <span class="block text-sm font-semibold text-gray-900 dark:text-white truncate">{{ niceName(st.name) }}</span>
                  <span class="block text-xs text-gray-500 dark:text-gray-400 truncate">{{ st.class_label }}</span>
                </span>
              </div>
              <p class="mt-1.5 text-xs text-red-600 dark:text-red-400 line-clamp-2 min-h-[2rem]">{{ reason(st) }}</p>
              <RouterLink :to="`/teacher/chat?student=${st.id}`" class="mt-1.5 block text-center px-2.5 py-1 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700">Message</RouterLink>
            </li>
            <li v-if="needing.length > 20" class="snap-start flex-shrink-0 w-32 flex items-center justify-center">
              <RouterLink to="/teacher/early-warning" class="text-sm font-semibold text-indigo-700 dark:text-indigo-300">See all {{ needing.length }} →</RouterLink>
            </li>
          </ul>
          <!-- Wider screens: a few, then more on request -->
          <TransitionGroup tag="ul" name="dash-pop" class="hidden md:block p-3 space-y-2">
            <li v-for="st in shown('word', needing)" :key="st.id" class="dash-chip">
              <span class="dash-chip-badge bg-gray-800 dark:bg-gray-600">{{ initials(niceName(st.name)) }}</span>
              <span class="min-w-0 flex-1">
                <span class="block text-sm font-bold text-gray-900 dark:text-white truncate">{{ niceName(st.name) }} <span class="font-medium text-gray-500 dark:text-gray-400">{{ st.class_label }}</span></span>
                <span class="block text-xs text-red-600 dark:text-red-400 truncate">{{ reason(st) }}</span>
              </span>
              <RouterLink :to="`/teacher/chat?student=${st.id}`" class="flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-200 dark:ring-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40">Message</RouterLink>
            </li>
          </TransitionGroup>
          </template>
          <button v-if="needing.length > LIMIT.word" type="button" class="dash-more !hidden md:!flex" :aria-expanded="!!open.word" @click="toggle('word')">
            {{ open.word ? 'Show less' : `Show ${needing.length - LIMIT.word} more` }}
            <svg class="w-4 h-4 transition-transform duration-300" :class="open.word ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" /></svg>
          </button>
        </section>

        <!-- My classes -->
        <section class="dash-box">
          <h2 class="dash-bar">My classes <RouterLink to="/teacher/class-map" class="dash-bar-link">Learning Map</RouterLink></h2>
          <p v-if="!overview.classes.length" class="p-4 text-[0.95rem] text-gray-500 dark:text-gray-400">No classes yet.</p>
          <TransitionGroup v-else tag="div" name="dash-pop" class="grid grid-cols-2 gap-2 p-3">
            <RouterLink v-for="c in shown('classes', overview.classes)" :key="`${c.class_id}-${c.subject_id}`" :to="`/teacher/class-map?subject=${c.subject_id}&level=${encodeURIComponent(c.level)}&stream=${c.class_id}`" class="dash-chip">
              <span class="dash-chip-badge bg-indigo-700">{{ shortClass(c.class_name) }}</span>
              <span class="min-w-0">
                <span class="block text-sm font-bold text-gray-900 dark:text-white truncate">{{ c.class_name }}</span>
                <span class="block text-xs truncate" :class="c.need_support ? 'text-red-600 dark:text-red-400 font-semibold' : 'text-gray-500 dark:text-gray-400'">{{ c.need_support ? `${c.need_support} need support` : `${c.students} learners` }}</span>
              </span>
            </RouterLink>
          </TransitionGroup>
          <button v-if="overview.classes.length > LIMIT.classes" type="button" class="dash-more" :aria-expanded="!!open.classes" @click="toggle('classes')">
            {{ open.classes ? 'Show less' : `Show ${overview.classes.length - LIMIT.classes} more` }}
            <svg class="w-4 h-4 transition-transform duration-300" :class="open.classes ? 'rotate-180' : ''" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" /></svg>
          </button>
        </section>
      </div>
    </div>

    <!-- View Enrolled Students Modal -->
    <div v-if="showViewEnrolledModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <!-- Header -->
        <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-5 flex-shrink-0">
          <div class="flex items-center justify-between gap-4">
            <div class="min-w-0">
              <h2 class="text-xl sm:text-xl font-bold text-gray-900 dark:text-white truncate">Enrolled Students in {{ analytics.department?.name }}</h2>
              <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">View students enrolled in your department</p>
            </div>
            <button @click="showViewEnrolledModal = false" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-1.5 transition-colors flex-shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Filters -->
        <div class="p-6 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-950">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Academic Year</label>
              <select
                v-model="viewFilters.academic_year"
                @change="fetchEnrolledStudents"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Academic Years</option>
                <option v-for="year in analytics.by_academic_year" :key="year.academic_year" :value="year.academic_year">
                  {{ year.academic_year }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Class</label>
              <select
                v-model="viewFilters.class_id"
                @change="fetchEnrolledStudents"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Classes</option>
                <option v-for="cls in analytics.by_class" :key="cls.class_name" :value="cls.class_name">
                  {{ cls.class_name }} ({{ cls.level }} - {{ cls.stream_name }})
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stream</label>
              <select
                v-model="viewFilters.stream_name"
                @change="fetchEnrolledStudents"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Streams</option>
                <option v-for="stream in analytics.by_stream" :key="stream.stream_name" :value="stream.stream_name">
                  {{ stream.stream_name }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Enrolled Students Table -->
        <div class="flex-1 overflow-y-auto">
          <div v-if="loadingEnrolled" class="flex items-center justify-center h-64">
            <div class="text-gray-500 dark:text-gray-400">Loading enrolled students...</div>
          </div>
          <div v-else-if="enrolledStudentsList.length === 0" class="flex items-center justify-center h-64">
            <div class="text-gray-500 dark:text-gray-400">No enrolled students found</div>
          </div>
          <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-950">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Admission No</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Department</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Class</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stream</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Academic Year</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="student in enrolledStudentsList" :key="student.enrollment_id">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {{ student.first_name }} {{ student.last_name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ student.admission_number }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ student.department_name || 'N/A' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ student.class_name || 'N/A' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ student.stream_name || 'N/A' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ student.academic_year || 'N/A' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    @click="deEnrollStudent(student.enrollment_id, student.first_name, student.last_name)"
                    class="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
                  >
                    De-enroll
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-6 py-4 bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-700 flex justify-end flex-shrink-0">
          <button
            @click="showViewEnrolledModal = false"
            class="btn-secondary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import NoticesTicker from '@/components/dashboard/NoticesTicker.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import { niceName } from '@/components/dashboard/teacher/time'
import { useLiveRefresh } from '@/composables/useLiveRefresh'
import apiService from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import Skeleton from '@/components/ui/Skeleton.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import type { AgendaItem } from '@/components/dashboard/teacher/TodayTimeline.vue'
import type { MarkingSummary } from '@/components/dashboard/teacher/MarkingCard.vue'
import type { ClassHealthItem, WeekTopics } from '@/components/dashboard/teacher/ClassHealth.vue'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'

const toast = useToastStore()
const confirmDialog = useConfirmStore()

const authStore = useAuthStore()

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
})

// ---- The day at a glance (GET /teacher/dashboard/overview) ----
interface Overview {
  teacher: { first_name: string; last_name: string }
  today: { to_mark: number; live_today: number; due_week: number; support: { groups: number; members: number; revised: number } }
  live_today: { id: number; title: string; at: string; status: string; class_name: string | null }[]
  mark_next: { submission_id: number; assignment_id: number; assignment: string; category: string | null; student: string; class_name: string | null; submitted_at: string | null }[]
  marking?: MarkingSummary | null
  week_topics?: WeekTopics | null
  agenda: AgendaItem[]
  classes: ClassHealthItem[]
  activity: { kind: 'submission' | 'enote' | 'revised' | 'message'; at: string; who: string; what: string; to: string }[]
}
const overview = ref<Overview | null>(null)
// Why the overview couldn't load (shown instead of leaving the placeholders up for ever)
const overviewError = ref('')
const loadOverview = async () => {
  try {
    const response = await apiService.get('/teacher/dashboard/overview')
    if (response.data?.success) {
      overview.value = response.data.data
      overviewError.value = ''
    } else if (!overview.value) {
      overviewError.value = response.data?.message || 'The server did not send the overview.'
    }
  } catch (error: any) {
    console.error('Failed to load the dashboard overview:', error)
    // A quiet refresh that fails keeps what is already on screen
    if (!overview.value) {
      const status = error?.response?.status
      overviewError.value = (status ? `Error ${status}: ` : '') + (error?.response?.data?.message || error?.message || 'The request failed.')
    }
  }
}
const retryOverview = () => {
  overviewError.value = ''
  loadOverview()
}

const firstName = computed(() => {
  const n = overview.value?.teacher.first_name || authStore.userName || ''
  return n === n.toUpperCase() ? n.charAt(0) + n.slice(1).toLowerCase() : n
})
const todayLabel = new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })

// ---- each card shows a few, and opens up to show the rest
const LIMIT = { marking: 4, jump: 4, today: 3, word: 3, classes: 4 } as const
type CardKey = keyof typeof LIMIT
const open = ref<Partial<Record<CardKey, boolean>>>({})
const toggle = (k: CardKey) => { open.value = { ...open.value, [k]: !open.value[k] } }
const shown = <T,>(k: CardKey, list: T[]) => (open.value[k] ? list : list.slice(0, LIMIT[k]))

const shortcuts = [
  { label: 'New assessment', to: '/teacher/assignments/create', icon: 'clipboard' },
  { label: 'eNotes', to: '/teacher/enotes', icon: 'book' },
  { label: 'Live classes', to: '/teacher/live-classes', icon: 'camera' },
  { label: 'My week', to: '/teacher/planner', icon: 'clock' },
  { label: 'Marksheet', to: '/teacher/marksheet', icon: 'chart' },
  { label: 'Item Bank', to: '/teacher/itembank', icon: 'target' },
  { label: 'Learning Map', to: '/teacher/class-map', icon: 'map' },
  { label: 'Reports', to: '/teacher/reports', icon: 'trend' }
]
const toDate = (v: string) => new Date(v.replace(' ', 'T'))
const when = (v: string) => {
  const d = toDate(v)
  const time = d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
  if (d.toDateString() === new Date().toDateString()) return `today, ${time}`
  return `${d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })}, ${time}`
}
// "S.1-A" stays; longer names shorten to their first letters
const shortClass = (n: string | null) => (!n ? '-' : n.length <= 4 ? n : n.replace(/[^A-Za-z0-9.]/g, '').slice(0, 4))
const initials = (n: string) => n.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase()

// what is waiting to be marked, most first
const markingRows = computed(() => marking.value.by_assignment.filter(r => r.waiting > 0).slice().sort((p, q) => q.waiting - p.waiting))
// today's lessons and closing assessments, then what is coming up
const agenda = computed(() => (overview.value?.agenda ?? []).slice().sort((p, q) => toDate(p.at).getTime() - toDate(q.at).getTime()))

// ---- who needs attention (the early-warning list)
interface WarningRow { id: number; name: string; class_label: string; signals: { key: string; text: string }[]; needs_teacher: boolean }
const warning = ref<WarningRow[]>([])
const warningLoaded = ref(false)
const needing = computed(() => warning.value.filter(r => r.needs_teacher))
const reason = (r: WarningRow) => r.signals.filter(g => g.key !== 'never').map(g => g.text).join(' · ')
const loadWarning = async () => {
  try {
    const res = await apiService.get('/teacher/early-warning')
    warning.value = res.data.data.students || []
  } catch {
    warning.value = []
  } finally {
    warningLoaded.value = true
  }
}
// Older servers send no marking summary: build one from the queue
const marking = computed<MarkingSummary>(() => overview.value?.marking || {
  marked_week: 0,
  waiting: overview.value?.today.to_mark || 0,
  oldest_at: overview.value?.mark_next[0]?.submitted_at || null,
  by_assignment: []
})

const loadingAnalytics = ref(false)
const loadingEnrolled = ref(false)
const showViewEnrolledModal = ref(false)

const myDepartments = ref<{ id: number; name: string; code: string; is_primary: boolean }[]>([])
const activeDepartmentId = ref<number | null>(null)
const switchingDepartment = ref(false)

const analytics = ref({
  total_enrollments: 0,
  recent_enrollments: 0,
  by_class: [] as any[],
  by_academic_year: [] as any[],
  by_stream: [] as any[],
  by_gender: {
    male: 0,
    female: 0,
    other: 0
  },
  department: null as any
})

const enrolledStudentsList = ref<any[]>([])

const viewFilters = ref({
  academic_year: '',
  class_id: '',
  stream_name: ''
})

// silent: the live refresh (no loading state; the counters just move to the new numbers)
const loadAnalytics = async (silent = false) => {
  if (!silent) loadingAnalytics.value = true
  try {
    const response = await apiService.get('/teacher/dashboard')
    if (response.data?.success && response.data?.data) {
      analytics.value = response.data.data
    }
  } catch (error) {
    if (!silent) console.error('Failed to load analytics:', error)
  } finally {
    if (!silent) loadingAnalytics.value = false
  }
}

useLiveRefresh(() => { loadAnalytics(true); loadOverview() })

const loadMyDepartments = async () => {
  try {
    const response = await apiService.get('/teacher/departments')
    if (response.data?.success) {
      myDepartments.value = response.data.data.departments || []
      activeDepartmentId.value = response.data.data.active_department_id
    }
  } catch (error) {
    console.error('Failed to load departments:', error)
  }
}

const switchDepartment = async (departmentId: string) => {
  const id = Number(departmentId)
  if (!id || id === activeDepartmentId.value) return

  switchingDepartment.value = true
  try {
    const response = await apiService.put('/teacher/departments/active', { department_id: id })
    if (response.data?.success) {
      activeDepartmentId.value = id
      overview.value = null
      overviewError.value = ''
      await Promise.all([loadAnalytics(), loadOverview()])
    } else {
      toast.error(response.data?.message || 'Failed to switch department')
    }
  } catch (error: any) {
    console.error('Failed to switch department:', error)
    toast.error(error.response?.data?.message || 'Failed to switch department')
  } finally {
    switchingDepartment.value = false
  }
}

const fetchEnrolledStudents = async () => {
  loadingEnrolled.value = true
  try {
    const params: any = {}
    if (viewFilters.value.academic_year) {
      params.academic_year = viewFilters.value.academic_year
    }
    if (viewFilters.value.class_id) {
      params.class_name = viewFilters.value.class_id
    }
    if (viewFilters.value.stream_name) {
      params.stream_name = viewFilters.value.stream_name
    }

    const response = await apiService.get('/teacher/students/enrolled', { params })

    if (response.data?.success && response.data?.data) {
      enrolledStudentsList.value = response.data.data
    } else {
      console.error('API returned error:', response.data?.message)
    }
  } catch (error) {
    console.error('Failed to fetch enrolled students:', error)
  } finally {
    loadingEnrolled.value = false
  }
}

const openViewEnrolledModal = async () => {
  await fetchEnrolledStudents()
  showViewEnrolledModal.value = true
}

const deEnrollStudent = async (enrollmentId: number, firstName: string, lastName: string) => {
  if (!await confirmDialog.open({
    title: 'De-enroll student',
    message: `De-enroll ${firstName} ${lastName} from your account?\n\nThey'll lose access to your assignments, eNotes, and other content, but stay fully enrolled with every other teacher in the department.`,
    confirmLabel: 'De-enroll',
    danger: true
  })) {
    return
  }

  const reason = (await confirmDialog.ask({ title: 'Reason', message: 'Why is this learner leaving your class? (optional)', placeholder: 'e.g. changed stream', optional: true, confirmLabel: 'De-enroll', danger: true })) ?? null
  if (reason === null) return
  const reasonText = reason || undefined

  try {
    const response = await apiService.delete(`/teacher/students/${enrollmentId}`, { data: { reason: reasonText } })

    if (response.data?.success) {
      // Refresh the enrolled students list
      await fetchEnrolledStudents()
      // Refresh analytics
      await loadAnalytics()
      toast.success('Student de-enrolled successfully')
    } else {
      console.error('De-enroll failed:', response.data?.message)
      toast.error('Failed to de-enroll student: ' + (response.data?.message || 'Unknown error'))
    }
  } catch (error) {
    console.error('Failed to de-enroll student:', error)
    toast.error('Failed to de-enroll student. Please try again.')
  }
}

onMounted(() => {
  loadOverview()
  loadAnalytics()
  loadMyDepartments()
  loadWarning()
})
</script>
