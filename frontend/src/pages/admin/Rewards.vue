<template>
  <div class="p-4 sm:p-6">
    <div class="mb-6">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">Rewards &amp; Badges</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400">Badges are awarded automatically whenever marks are graded and returned. Monitor, override or revoke them here, and configure the rules that drive them.</p>
    </div>

    <!-- Tabs -->
    <div class="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
      <button
        @click="activeTab = 'awards'"
        class="px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors"
        :class="activeTab === 'awards' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'"
      >
        Awards
      </button>
      <button
        @click="activeTab = 'rules'"
        class="px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors"
        :class="activeTab === 'rules' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'"
      >
        Rules &amp; Thresholds
      </button>
    </div>

    <!-- ============================ AWARDS TAB ============================ -->
    <div v-if="activeTab === 'awards'">
      <!-- Filters -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-5">
        <div class="flex flex-wrap items-end gap-3">
          <div>
            <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Search Student</label>
            <input v-model="filters.search" type="text" placeholder="Name or admission no." class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white min-w-[180px]">
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Class</label>
            <select v-model="filters.class_id" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white min-w-[140px]">
              <option value="">All</option>
              <option v-for="c in classes" :key="c.id" :value="c.id">{{ c.name }}{{ c.stream_name ? ' - ' + c.stream_name : '' }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Subject</label>
            <select v-model="filters.subject_id" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white min-w-[140px]">
              <option value="">All</option>
              <option v-for="s in subjects" :key="s.id" :value="s.id">{{ s.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Badge Level</label>
            <select v-model="filters.badge_type" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white min-w-[130px]">
              <option value="">All</option>
              <option value="platinum">💎 Platinum</option>
              <option value="gold">🥇 Gold</option>
              <option value="silver">🥈 Silver</option>
              <option value="bronze">🥉 Bronze</option>
              <option value="special">⭐ Special</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Term</label>
            <select v-model="filters.term_id" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white min-w-[140px]">
              <option value="">All</option>
              <option v-for="t in terms" :key="t.id" :value="t.id">{{ t.name }}{{ t.academic_year ? ' - ' + t.academic_year : '' }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Status</label>
            <select v-model="filters.status" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white min-w-[120px]">
              <option value="">All</option>
              <option value="active">Active</option>
              <option value="revoked">Revoked</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Source</label>
            <select v-model="filters.award_source" class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white min-w-[130px]">
              <option value="">All</option>
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
              <option value="override">Override</option>
            </select>
          </div>
        </div>
      </div>

      <div v-if="loading" class="flex items-center justify-center py-16">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>

      <div v-else-if="awards.length === 0" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center text-gray-500 dark:text-gray-400">
        No awards match these filters.
      </div>

      <div v-else class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">Student</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">Badge</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">Score/Avg</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">Class/Subject</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">Term</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">Source</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">Status</th>
                <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="a in awards" :key="a.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/40">
                <td class="px-4 py-3">
                  <p class="font-medium text-gray-900 dark:text-white whitespace-nowrap">{{ a.student_name }}</p>
                  <p class="text-xs text-gray-400 dark:text-gray-500">{{ a.admission_number }}</p>
                </td>
                <td class="px-4 py-3">
                  <p class="whitespace-nowrap"><span>{{ BADGE_ICONS[a.badge_type] }}</span> {{ a.award_title }}</p>
                  <p class="text-xs text-gray-400 dark:text-gray-500">{{ BADGE_LABELS[a.badge_type] }}</p>
                </td>
                <td class="px-4 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  {{ a.average !== null ? a.average + '%' : (a.score !== null ? a.score + '%' : '-') }}
                </td>
                <td class="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {{ a.class_name || '-' }}{{ a.subject_name ? ' / ' + a.subject_name : '' }}
                </td>
                <td class="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">{{ a.term_name }}{{ a.academic_year ? ', ' + a.academic_year : '' }}</td>
                <td class="px-4 py-3">
                  <span class="px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap" :class="sourceBadgeClass(a.award_source)">{{ a.award_source }}</span>
                </td>
                <td class="px-4 py-3">
                  <span class="px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap" :class="a.status === 'active' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'">
                    {{ a.status }}
                  </span>
                </td>
                <td class="px-4 py-3 text-right whitespace-nowrap">
                  <button @click="openDetail(a.id)" class="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="totalPages > 1" class="flex items-center justify-center gap-3 py-4 border-t border-gray-200 dark:border-gray-700">
          <button :disabled="page <= 1" @click="page--" class="px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-40">Previous</button>
          <span class="text-sm text-gray-500 dark:text-gray-400">Page {{ page }} of {{ totalPages }}</span>
          <button :disabled="page >= totalPages" @click="page++" class="px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-40">Next</button>
        </div>
      </div>
    </div>

    <!-- ============================ RULES TAB ============================ -->
    <div v-else>
      <div class="flex justify-end mb-4">
        <button @click="openRuleForm(null)" class="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
          + Add Rule
        </button>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">Badge</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">Title</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">Metric</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">Scope</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">Range</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">Active</th>
                <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="r in rules" :key="r.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/40">
                <td class="px-4 py-3 whitespace-nowrap">{{ BADGE_ICONS[r.badge_type] }} {{ BADGE_LABELS[r.badge_type] }}</td>
                <td class="px-4 py-3">
                  <p class="text-gray-900 dark:text-white whitespace-nowrap">{{ r.award_title }}</p>
                  <p class="text-xs text-gray-400 dark:text-gray-500">{{ r.description }}</p>
                </td>
                <td class="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">{{ r.metric }}</td>
                <td class="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">{{ r.scope }}</td>
                <td class="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {{ r.min_value !== null ? '≥ ' + r.min_value : '' }}{{ r.max_value !== null ? ' - ' + r.max_value : '' }}
                </td>
                <td class="px-4 py-3">
                  <button
                    @click="toggleRuleActive(r)"
                    class="px-2 py-0.5 text-xs font-medium rounded-full"
                    :class="r.is_active ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'"
                  >
                    {{ r.is_active ? 'Active' : 'Disabled' }}
                  </button>
                </td>
                <td class="px-4 py-3 text-right whitespace-nowrap space-x-2">
                  <button @click="openRuleForm(r)" class="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">Edit</button>
                  <button @click="deleteRule(r)" class="text-xs font-medium text-red-600 dark:text-red-400 hover:underline">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ============================ AWARD DETAIL MODAL ============================ -->
    <div v-if="activeAward" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4" @click.self="activeAward = null">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex items-center justify-between sticky top-0">
          <h2 class="text-lg font-bold text-white">{{ BADGE_ICONS[activeAward.badge_type] }} {{ activeAward.award_title }}</h2>
          <button @click="activeAward = null" class="text-white/80 hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div class="p-6 space-y-5">
          <div class="grid grid-cols-2 gap-3 text-sm">
            <p><span class="text-gray-400">Student:</span> <span class="font-medium text-gray-900 dark:text-white">{{ activeAward.student_name }} ({{ activeAward.admission_number }})</span></p>
            <p><span class="text-gray-400">Class:</span> {{ activeAward.class_name || '-' }}</p>
            <p><span class="text-gray-400">Subject:</span> {{ activeAward.subject_name || '-' }}</p>
            <p><span class="text-gray-400">Term:</span> {{ activeAward.term_name }} ({{ activeAward.academic_year }})</p>
            <p><span class="text-gray-400">Score/Average:</span> {{ activeAward.average ?? activeAward.score ?? '-' }}%</p>
            <p><span class="text-gray-400">Status:</span> {{ activeAward.status }}</p>
            <p><span class="text-gray-400">Source:</span> {{ activeAward.award_source }}</p>
            <p><span class="text-gray-400">Awarded:</span> {{ formatDate(activeAward.awarded_at) }}</p>
          </div>
          <p v-if="activeAward.rule_description" class="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/40 rounded-lg p-3">
            <strong>Why this was awarded:</strong> {{ activeAward.rule_description }}
          </p>
          <p v-if="activeAward.admin_note" class="text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3">
            <strong>Admin note:</strong> {{ activeAward.admin_note }}
          </p>

          <!-- Actions -->
          <div class="flex flex-wrap gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
            <button
              v-if="activeAward.status === 'active'"
              @click="doRevoke"
              class="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-600 text-white hover:bg-red-700"
            >
              Revoke
            </button>
            <button
              v-else
              @click="doRestore"
              class="px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Restore
            </button>
            <button @click="showOverrideForm = !showOverrideForm" class="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
              Override
            </button>
          </div>

          <!-- Override form -->
          <div v-if="showOverrideForm" class="bg-gray-50 dark:bg-gray-900/40 rounded-lg p-4 space-y-3">
            <div>
              <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Badge Level</label>
              <select v-model="overrideForm.badge_type" class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
                <option value="platinum">💎 Platinum</option>
                <option value="gold">🥇 Gold</option>
                <option value="silver">🥈 Silver</option>
                <option value="bronze">🥉 Bronze</option>
                <option value="special">⭐ Special</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Award Title</label>
              <input v-model="overrideForm.award_title" type="text" class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Note explaining override (required)</label>
              <textarea v-model="overrideForm.admin_note" rows="2" class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"></textarea>
            </div>
            <button @click="doOverride" class="px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Save Override</button>
          </div>

          <!-- Audit trail -->
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-2">History</p>
            <div class="space-y-2 max-h-48 overflow-y-auto">
              <div v-for="entry in activeAward.audit" :key="entry.id" class="text-xs border-l-2 border-gray-200 dark:border-gray-700 pl-3">
                <p class="font-medium text-gray-700 dark:text-gray-300">{{ entry.action }}<span v-if="entry.actor_role"> by {{ entry.actor_role }}</span></p>
                <p v-if="entry.note" class="text-gray-500 dark:text-gray-400">{{ entry.note }}</p>
                <p class="text-gray-400 dark:text-gray-500">{{ formatDate(entry.created_at) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================ RULE FORM MODAL ============================ -->
    <div v-if="showRuleForm" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4" @click.self="showRuleForm = false">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-3">
        <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-2">{{ ruleForm.id ? 'Edit Rule' : 'Add Rule' }}</h2>

        <div>
          <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Badge Level</label>
          <select v-model="ruleForm.badge_type" class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
            <option value="platinum">💎 Platinum</option>
            <option value="gold">🥇 Gold</option>
            <option value="silver">🥈 Silver</option>
            <option value="bronze">🥉 Bronze</option>
            <option value="special">⭐ Special</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Award Title</label>
          <input v-model="ruleForm.award_title" type="text" class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Description</label>
          <input v-model="ruleForm.description" type="text" class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Metric</label>
            <select v-model="ruleForm.metric" class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
              <option value="overall_average">Overall Average</option>
              <option value="subject_average">Subject Average</option>
              <option value="login_count">Login Count</option>
              <option value="assignments_completed">Assignments Completed</option>
              <option value="improvement_delta">Improvement (vs. previous term)</option>
              <option value="lab_average">Virtual Lab Average (any subject)</option>
              <option value="lab_subject_average">Virtual Lab Average (specific subject)</option>
              <option value="lab_experiments_completed">Virtual Lab Experiments Completed</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Scope</label>
            <select v-model="ruleForm.scope" class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
              <option value="individual">Individual (threshold)</option>
              <option value="class_top">Top in Class</option>
              <option value="subject_top">Top in Subject</option>
            </select>
          </div>
        </div>
        <div v-if="ruleForm.metric === 'subject_average' || ruleForm.metric === 'lab_subject_average'">
          <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Subject</label>
          <select v-model="ruleForm.subject_id" class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
            <option :value="null">Any subject (ranked per class)</option>
            <option v-for="s in subjects" :key="s.id" :value="s.id">{{ s.name }}</option>
          </select>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Minimum Value</label>
            <input v-model.number="ruleForm.min_value" type="number" step="0.01" class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Maximum Value</label>
            <input v-model.number="ruleForm.max_value" type="number" step="0.01" class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
          </div>
        </div>
        <label class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <input v-model="ruleForm.is_active" type="checkbox">
          Active
        </label>

        <div class="flex justify-end gap-2 pt-2">
          <button @click="showRuleForm = false" class="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">Cancel</button>
          <button @click="saveRule" class="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import axios from 'axios'
import { BADGE_ICONS, BADGE_LABELS } from '@/types/reward'
import type { StudentAward, AwardDetail, RewardRule, BadgeType } from '@/types/reward'

const API_BASE = '/api/admin'

const activeTab = ref<'awards' | 'rules'>('awards')

// --- Awards tab state ---
const filters = ref({
  search: '', class_id: '', subject_id: '', badge_type: '', term_id: '', status: '', award_source: '',
})
const awards = ref<StudentAward[]>([])
const total = ref(0)
const page = ref(1)
const perPage = 20
const loading = ref(false)
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / perPage)))

const classes = ref<{ id: number; name: string; stream_name?: string | null }[]>([])
const subjects = ref<{ id: number; name: string }[]>([])
const terms = ref<{ id: number; name: string; academic_year: string | null }[]>([])

const activeAward = ref<AwardDetail | null>(null)
const showOverrideForm = ref(false)
const overrideForm = ref({ badge_type: 'gold' as BadgeType, award_title: '', admin_note: '' })

const sourceBadgeClass = (source: string) => {
  const map: Record<string, string> = {
    automatic: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    manual: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
    override: 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200',
  }
  return map[source] || 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
}

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })

const loadFilters = async () => {
  const [classesRes, subjectsRes, termsRes] = await Promise.all([
    axios.get(`${API_BASE}/classes`),
    axios.get(`${API_BASE}/subjects`),
    axios.get(`${API_BASE}/report-cards/terms`),
  ])
  classes.value = classesRes.data.data
  subjects.value = subjectsRes.data.data
  terms.value = termsRes.data.data.terms
}

const loadAwards = async () => {
  loading.value = true
  try {
    const params: Record<string, string | number> = { page: page.value, per_page: perPage }
    Object.entries(filters.value).forEach(([key, value]) => {
      if (value !== '') params[key] = value
    })
    const res = await axios.get(`${API_BASE}/rewards`, { params })
    awards.value = res.data.data.awards
    total.value = res.data.data.total
  } catch (err) {
    awards.value = []
  } finally {
    loading.value = false
  }
}

const openDetail = async (id: number) => {
  showOverrideForm.value = false
  try {
    const res = await axios.get(`${API_BASE}/rewards/${id}`)
    activeAward.value = res.data.data
    overrideForm.value = {
      badge_type: activeAward.value!.badge_type,
      award_title: activeAward.value!.award_title,
      admin_note: '',
    }
  } catch (err) {
    activeAward.value = null
  }
}

const doRevoke = async () => {
  if (!activeAward.value) return
  await axios.put(`${API_BASE}/rewards/${activeAward.value.id}/revoke`, {})
  await openDetail(activeAward.value.id)
  await loadAwards()
}

const doRestore = async () => {
  if (!activeAward.value) return
  await axios.put(`${API_BASE}/rewards/${activeAward.value.id}/restore`, {})
  await openDetail(activeAward.value.id)
  await loadAwards()
}

const doOverride = async () => {
  if (!activeAward.value) return
  if (!overrideForm.value.admin_note.trim()) return
  await axios.put(`${API_BASE}/rewards/${activeAward.value.id}/override`, overrideForm.value)
  showOverrideForm.value = false
  await openDetail(activeAward.value.id)
  await loadAwards()
}

watch(filters, () => { page.value = 1; loadAwards() }, { deep: true })
watch(page, loadAwards)

// --- Rules tab state ---
const rules = ref<RewardRule[]>([])
const showRuleForm = ref(false)
const ruleForm = ref<Partial<RewardRule>>({})

const loadRules = async () => {
  const res = await axios.get(`${API_BASE}/reward-rules`)
  rules.value = res.data.data.rules
}

const openRuleForm = (rule: RewardRule | null) => {
  ruleForm.value = rule
    ? { ...rule, is_active: !!rule.is_active }
    : { badge_type: 'special', award_title: '', category: 'academic', metric: 'overall_average', scope: 'individual', subject_id: null, min_value: null, max_value: null, is_active: true, description: '' }
  showRuleForm.value = true
}

const saveRule = async () => {
  const payload = {
    ...ruleForm.value,
    min_value: (ruleForm.value.min_value as unknown) === '' || ruleForm.value.min_value === undefined ? null : ruleForm.value.min_value,
    max_value: (ruleForm.value.max_value as unknown) === '' || ruleForm.value.max_value === undefined ? null : ruleForm.value.max_value,
  }
  if (ruleForm.value.id) {
    await axios.put(`${API_BASE}/reward-rules/${ruleForm.value.id}`, payload)
  } else {
    await axios.post(`${API_BASE}/reward-rules`, payload)
  }
  showRuleForm.value = false
  await loadRules()
}

const toggleRuleActive = async (rule: RewardRule) => {
  await axios.put(`${API_BASE}/reward-rules/${rule.id}`, { is_active: !rule.is_active })
  await loadRules()
}

const deleteRule = async (rule: RewardRule) => {
  await axios.delete(`${API_BASE}/reward-rules/${rule.id}`)
  await loadRules()
}

watch(activeTab, (tab) => {
  if (tab === 'rules' && rules.value.length === 0) loadRules()
})

onMounted(async () => {
  await Promise.all([loadFilters(), loadAwards()])
})
</script>
