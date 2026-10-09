<template>
  <div class="min-h-full">
    <!-- Header -->
    <div class="flex items-center gap-2 mb-1">
      <div class="hidden sm:flex w-7 h-7 rounded-lg bg-indigo-600 items-center justify-center flex-shrink-0">
        <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v6.5L4.5 18A2 2 0 006.3 21h11.4a2 2 0 001.8-3L15 9.5V3M8 3h8M7 15h10" /></svg>
      </div>
      <h1 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight">Virtual Lab</h1>
    </div>
    <p v-if="isHod" class="text-xs text-gray-500 dark:text-gray-400 mb-4">The Virtual Lab experiments of {{ hodDepartment?.name || 'your department' }}: publish them to its classes and see where each one is published.</p>
    <p v-else class="text-xs text-gray-500 dark:text-gray-400 mb-4">Share library experiments with departments, oversee every teacher's experiments, and manage the 3D apparatus catalogue.</p>

    <!-- Tabs -->
    <div class="inline-flex flex-wrap gap-1 mb-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-1 shadow-sm">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="activeTab = tab.key"
        class="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-sm font-semibold rounded-lg transition-colors"
        :class="activeTab === tab.key ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
      >
        <AppIcon :name="tab.icon" class="w-4 h-4" />
        {{ tab.label }}
        <span v-if="tab.count !== null" class="px-1.5 py-0.5 rounded-md text-[10px] font-bold" :class="activeTab === tab.key ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700'">{{ tab.count }}</span>
      </button>
    </div>

    <!-- ===================== OVERVIEW ===================== -->
    <div v-if="activeTab === 'overview'">
      <div v-if="!analytics" class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div v-for="i in 4" :key="i" class="h-24 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      </div>
      <template v-else>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <button
            v-for="card in statCards"
            :key="card.label"
            type="button"
            @click="goToExperiments()"
            class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 flex items-center gap-3 text-left hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800 transition-all"
          >
            <span class="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0" :class="card.color"><AppIcon :name="card.icon" class="w-5 h-5" /></span>
            <div class="min-w-0">
              <p class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight">{{ card.value }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ card.label }}</p>
            </div>
          </button>
        </div>

        <h2 class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">By subject</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <button
            v-for="c in analytics.by_category"
            :key="c.category"
            type="button"
            @click="goToExperiments(c.category)"
            class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 text-left hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800 transition-all"
          >
            <div class="flex items-center gap-2.5 mb-3">
              <span class="w-9 h-9 rounded-xl flex items-center justify-center text-white" :class="CATEGORY_COLORS[c.category]"><AppIcon :name="CATEGORY_ICONS[c.category]" class="w-5 h-5" /></span>
              <p class="font-bold text-gray-900 dark:text-white">{{ CATEGORY_LABELS[c.category] }}</p>
            </div>
            <div class="grid grid-cols-2 gap-2 mb-3">
              <div><p class="text-lg font-bold text-gray-900 dark:text-white leading-tight">{{ c.experiment_count }}</p><p class="text-[11px] text-gray-500 dark:text-gray-400">experiments</p></div>
              <div><p class="text-lg font-bold text-gray-900 dark:text-white leading-tight">{{ c.attempt_count }}</p><p class="text-[11px] text-gray-500 dark:text-gray-400">attempts</p></div>
            </div>
            <div class="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 mb-1">
              <span>Average score</span><span class="font-semibold text-gray-700 dark:text-gray-200">{{ c.average_percentage !== null ? c.average_percentage + '%' : 'No marks yet' }}</span>
            </div>
            <div class="h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
              <div class="h-full rounded-full" :class="CATEGORY_COLORS[c.category]" :style="{ width: (c.average_percentage ?? 0) + '%' }"></div>
            </div>
          </button>
        </div>
      </template>
    </div>

    <!-- ===================== EXPERIMENTS ===================== -->
    <div v-else-if="activeTab === 'experiments'">
      <div class="flex flex-wrap items-center gap-2 mb-4">
        <div class="relative flex-1 min-w-[12rem]">
          <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input v-model="search" type="text" placeholder="Search by title or topic..." class="input-field w-full pl-9 text-sm">
        </div>
        <select v-model="expFilters.category" class="input-field text-sm w-auto">
          <option value="">All subjects</option>
          <option v-for="(label, key) in CATEGORY_LABELS" :key="key" :value="key">{{ label }}</option>
        </select>
        <div class="inline-flex gap-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-1">
          <button
            v-for="o in SOURCE_OPTIONS"
            :key="o.key"
            @click="sourceFilter = o.key"
            class="px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
            :class="sourceFilter === o.key ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
          >{{ o.label }}</button>
        </div>
        <select v-if="!isHod" v-model="expFilters.status" class="input-field text-sm w-auto">
          <option value="">All statuses</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="disabled">Hidden</option>
        </select>
      </div>

      <div v-if="visibleExperiments.length && !isHod" class="flex items-center gap-2 mb-3">
        <label class="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 cursor-pointer select-none">
          <input type="checkbox" :checked="allSelected" @change="toggleAll" class="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500">
          Select all
        </label>
        <span class="ml-auto text-xs text-gray-400">{{ visibleExperiments.length }} {{ visibleExperiments.length === 1 ? 'experiment' : 'experiments' }}</span>
      </div>

      <BulkActionBar :count="selected.size" @clear="selected.clear()">
        <button @click="setStatusMany('disabled')" class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">Hide from students</button>
        <button @click="deleteMany" class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-red-600 text-white hover:bg-red-700">Delete</button>
      </BulkActionBar>

      <div v-if="loadingExperiments" class="space-y-3">
        <div v-for="i in 4" :key="i" class="h-24 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      </div>

      <div v-else-if="visibleExperiments.length === 0" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-12 text-center">
        <AppIcon name="beaker" class="w-10 h-10 mx-auto text-gray-300 dark:text-gray-600 mb-2" />
        <p class="text-sm text-gray-500 dark:text-gray-400">No experiments match these filters.</p>
      </div>

      <div v-else class="space-y-6">
        <div v-for="group in groupedExperiments" :key="group.subject">
          <h2 class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
            {{ group.subject }}
            <span class="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-gray-100 dark:bg-gray-700 normal-case">{{ group.experiments.length }}</span>
          </h2>
          <div class="space-y-3">
            <div
              v-for="e in group.experiments"
              :key="e.id"
              role="button"
              tabindex="0"
              @click="openExperiment(e)"
              @keydown.enter="openExperiment(e)"
              class="bg-white dark:bg-gray-800 rounded-2xl border shadow-sm p-4 transition-colors cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md"
              :class="selected.has(e.id) ? 'border-indigo-300 dark:border-indigo-700 ring-1 ring-indigo-100 dark:ring-indigo-900/40' : 'border-gray-200 dark:border-gray-700'"
            >
              <div class="flex items-start gap-3">
                <input v-if="!isHod" type="checkbox" :checked="selected.has(e.id)" @click.stop @change="toggle(e.id)" class="mt-3 w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500 flex-shrink-0" :aria-label="`Select ${e.title}`">
                <span class="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0" :class="CATEGORY_COLORS[e.category]"><AppIcon :name="CATEGORY_ICONS[e.category]" class="w-5 h-5" /></span>

                <div class="min-w-0 flex-1">
                  <div class="flex flex-wrap items-center gap-1.5">
                    <h3 class="font-semibold text-gray-900 dark:text-white leading-snug">{{ e.title }}</h3>
                    <span v-if="e.is_template" class="px-1.5 py-0.5 rounded-md text-[10px] font-bold uppercase bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">Library</span>
                    <span class="px-1.5 py-0.5 rounded-md text-[10px] font-bold uppercase" :class="STATUS_BADGE[e.status]">{{ STATUS_LABEL[e.status] }}</span>
                  </div>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                    {{ [e.subject_name || CATEGORY_LABELS[e.category], e.topic].filter(Boolean).join(', ') }}
                    <span class="text-gray-300 dark:text-gray-600">&middot;</span> {{ e.creator_name || 'System' }}
                    <span class="text-gray-300 dark:text-gray-600">&middot;</span> {{ formatDate(e.created_at) }}
                  </p>
                  <div class="flex flex-wrap items-center gap-1.5 mt-2">
                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                      <AppIcon name="users" class="w-3 h-3" /> {{ e.assignment_count }} {{ e.assignment_count === 1 ? 'class' : 'classes' }}
                    </span>
                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                      <AppIcon name="clipboard" class="w-3 h-3" /> {{ e.attempt_count }} {{ e.attempt_count === 1 ? 'attempt' : 'attempts' }}
                    </span>
                    <span v-if="e.copy_ids?.length" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300" title="Teachers' own copies of this experiment - their classes are listed on this card">
                      <AppIcon name="document" class="w-3 h-3" /> {{ e.copy_ids.length }} teacher {{ e.copy_ids.length === 1 ? 'copy' : 'copies' }}
                    </span>
                  </div>
                  <div v-if="e.is_template" class="flex flex-wrap items-center gap-1.5 mt-2">
                    <span class="text-[11px] font-semibold text-gray-500 dark:text-gray-400">Departments:</span>
                    <span v-for="d in e.shared_departments || []" :key="d.id" class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">{{ d.name }}</span>
                    <span v-if="!(e.shared_departments || []).length" class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">Not shared - no teacher can use it yet</span>
                  </div>
                  <div v-if="(e.publications || []).length" class="mt-2 space-y-1">
                    <div v-for="g in publicationsByDepartment(e)" :key="g.name" class="flex flex-wrap items-center gap-1.5">
                      <span class="text-[11px] font-semibold text-gray-500 dark:text-gray-400">Published in {{ g.name }}:</span>
                      <span
                        v-for="p in g.items"
                        :key="p.assignment_id"
                        class="inline-flex items-center gap-1 pl-2 py-0.5 rounded-full text-[11px] font-medium"
                        :class="[p.by_admin || p.by_hod ? 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300', p.by_admin || p.by_hod ? 'pr-0.5' : 'pr-2']"
                        :title="`${p.class_label} - published by ${p.published_by}${p.term_name ? ', ' + p.term_name : ''}${p.due_date ? ', due ' + formatDate(p.due_date) : ''} - ${p.submitted_count} submitted`"
                      >
                        {{ p.class_label }}
                        <span class="opacity-70">&middot; {{ p.published_by }}</span>
                        <button
                          v-if="p.by_admin || p.by_hod"
                          @click.stop="withdraw(e, p)"
                          class="w-4 h-4 rounded-full flex items-center justify-center hover:bg-violet-200 dark:hover:bg-violet-800"
                          :aria-label="`Withdraw from ${p.class_label}`"
                          title="Withdraw from this class"
                        >&times;</button>
                      </span>
                    </div>
                  </div>
                  <p v-else class="mt-2 text-[11px] text-gray-400">Not published to any class yet.</p>
                </div>

                <div class="flex flex-col sm:flex-row items-end sm:items-center gap-1.5 flex-shrink-0" @click.stop>
                  <button
                    v-if="e.is_template && !isHod"
                    @click="openShare(e)"
                    class="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-sky-600 text-white hover:bg-sky-700"
                    title="Choose which departments' teachers can use and publish this experiment"
                  >
                    <AppIcon name="users" class="w-3.5 h-3.5" /> Departments
                  </button>
                  <button
                    v-if="e.is_template"
                    @click="openPublish(e)"
                    class="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-violet-600 text-white hover:bg-violet-700"
                    title="Publish straight to a class of a department, so its students can do it"
                  >
                    <AppIcon name="send" class="w-3.5 h-3.5" /> Publish to class
                  </button>
                  <template v-if="!isHod">
                  <button
                    v-if="e.status !== 'disabled'"
                    @click="setStatus(e, 'disabled')"
                    class="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                    title="Students can't open it until you restore it"
                  >Hide</button>
                  <button
                    v-else
                    @click="setStatus(e, 'published')"
                    class="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                  >Restore</button>
                  <button
                    @click="deleteOne(e)"
                    class="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40"
                  >
                    <AppIcon name="trash" class="w-3.5 h-3.5" /> Delete
                  </button>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ===================== APPARATUS ===================== -->
    <div v-else>
      <div class="flex flex-wrap items-center gap-2 mb-4">
        <div class="relative flex-1 min-w-[12rem]">
          <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input v-model="objectSearch" type="text" placeholder="Search apparatus..." class="input-field w-full pl-9 text-sm">
        </div>
        <div class="inline-flex flex-wrap gap-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-1">
          <button
            v-for="g in [{ key: '', label: 'All' }, ...OBJECT_GROUPS]"
            :key="g.key"
            @click="objectCategory = g.key"
            class="px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors"
            :class="objectCategory === g.key ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
          >{{ g.label }}</button>
        </div>
      </div>

      <div v-if="loadingObjects" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
        <div v-for="i in 8" :key="i" class="h-28 rounded-2xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      </div>
      <p v-else-if="filteredObjects.length === 0" class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-10 text-center text-sm text-gray-400">No apparatus matches your search.</p>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
        <div
          v-for="o in filteredObjects"
          :key="o.id"
          class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 flex flex-col"
          :class="o.is_active ? '' : 'opacity-60'"
        >
          <div class="flex items-start gap-3">
            <span class="w-11 h-11 rounded-xl bg-gray-50 dark:bg-gray-900/40 flex items-center justify-center text-2xl flex-shrink-0">{{ o.icon || '🔬' }}</span>
            <div class="min-w-0 flex-1">
              <p class="font-semibold text-sm text-gray-900 dark:text-white leading-snug">{{ o.display_name }}</p>
              <p class="text-[11px] text-gray-500 dark:text-gray-400">{{ objectGroupLabel(o.category) }}</p>
            </div>
            <button
              type="button"
              role="switch"
              :aria-checked="o.is_active"
              :title="o.is_active ? 'Active - click to hide from the lab' : 'Hidden - click to make available'"
              @click="toggleObjectActive(o)"
              class="relative inline-flex h-5 w-9 flex-shrink-0 rounded-full transition-colors"
              :class="o.is_active ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'"
            >
              <span class="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform" :class="o.is_active ? 'translate-x-4' : ''"></span>
            </button>
          </div>
          <p v-if="o.description" class="text-[11px] text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">{{ o.description }}</p>
          <div class="flex flex-wrap gap-1 mt-2.5">
            <span v-for="a in o.supported_actions" :key="a" class="px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">{{ humanize(a) }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Share with departments -->
    <div v-if="shareTarget" class="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4" @click.self="shareTarget = null">
      <div class="bg-white dark:bg-gray-800 w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90dvh] flex flex-col">
        <div class="px-5 pt-4 pb-3 border-b border-gray-100 dark:border-gray-700 flex items-start justify-between gap-3">
          <div class="min-w-0">
            <h3 class="font-bold text-gray-900 dark:text-white">Share with departments</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ shareTarget.title }}</p>
          </div>
          <button @click="shareTarget = null" aria-label="Close" class="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">✕</button>
        </div>
        <div class="px-5 py-3 overflow-y-auto flex-1">
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Teachers in the ticked departments will see this experiment in their Department Library and can publish it to their classes. Unticking a department stops new publishing; classes already doing it keep it.</p>
          <div v-if="loadingDepartments" class="py-6 text-center text-xs text-gray-400">Loading departments...</div>
          <p v-else-if="departments.length === 0" class="py-6 text-center text-xs text-gray-400">No departments found. Create departments first.</p>
          <div v-else class="space-y-1.5">
            <label class="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-indigo-700 dark:text-indigo-300 cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
              <input type="checkbox" :checked="shareSelection.size === departments.length" @change="toggleAllDepartments" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
              All departments
            </label>
            <label v-for="d in departments" :key="d.id" class="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50" :class="shareSelection.has(d.id) ? 'border-sky-300 dark:border-sky-700 bg-sky-50/60 dark:bg-sky-900/20' : ''">
              <input type="checkbox" :checked="shareSelection.has(d.id)" @change="shareSelection.has(d.id) ? shareSelection.delete(d.id) : shareSelection.add(d.id)" class="w-4 h-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500">
              <span class="text-sm text-gray-800 dark:text-gray-100">{{ d.name }}</span>
            </label>
          </div>
        </div>
        <div class="px-5 py-3 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-2">
          <button @click="shareTarget = null" class="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">Cancel</button>
          <button @click="saveShare" :disabled="savingShare" class="px-4 py-2 text-sm font-semibold rounded-lg bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-50">{{ savingShare ? 'Saving...' : 'Save' }}</button>
        </div>
      </div>
    </div>

    <!-- Publish to a class -->
    <div v-if="publishTarget" class="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4" @click.self="publishTarget = null">
      <div class="bg-white dark:bg-gray-800 w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90dvh] flex flex-col">
        <div class="px-5 pt-4 pb-3 border-b border-gray-100 dark:border-gray-700 flex items-start justify-between gap-3">
          <div class="min-w-0">
            <h3 class="font-bold text-gray-900 dark:text-white">Publish to a class</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ publishTarget.title }}</p>
          </div>
          <button @click="publishTarget = null" aria-label="Close" class="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">✕</button>
        </div>
        <div class="px-5 py-3 overflow-y-auto flex-1 space-y-3">
          <p class="text-xs text-gray-500 dark:text-gray-400">Students of the department in the chosen class will see it straight away. The experiment is also shared with the department, so its teachers can follow and mark the class's work.</p>
          <p v-if="isHod" class="text-sm text-gray-700 dark:text-gray-200"><span class="text-xs font-semibold text-gray-600 dark:text-gray-300">Department:</span> {{ hodDepartment?.name }}</p>
          <label v-else class="block">
            <span class="text-xs font-semibold text-gray-600 dark:text-gray-300">Department</span>
            <select v-model.number="publishForm.department_id" class="input-field w-full text-sm mt-1">
              <option :value="0" disabled>Choose a department</option>
              <option v-for="d in departments" :key="d.id" :value="d.id">{{ d.name }}</option>
            </select>
          </label>
          <div v-if="publishForm.department_id">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-gray-600 dark:text-gray-300">Classes</span>
              <span v-if="selectedTargetCount" class="text-[11px] font-semibold text-violet-600 dark:text-violet-400">{{ selectedTargetCount }} selected</span>
            </div>
            <div v-if="loadingClasses" class="py-3 text-xs text-gray-400">Loading classes...</div>
            <p v-else-if="!deptClasses.length" class="py-3 text-xs text-amber-600 dark:text-amber-400">No students are enrolled in this department yet.</p>
            <div v-else class="mt-1 space-y-2">
              <div v-for="g in classLevels" :key="g.level" class="rounded-xl border p-2.5" :class="selectedLevels.has(g.level) ? 'border-violet-300 dark:border-violet-700 bg-violet-50/60 dark:bg-violet-900/20' : 'border-gray-200 dark:border-gray-700'">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" :checked="selectedLevels.has(g.level)" @change="toggleLevel(g.level)" class="w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500">
                  <span class="text-sm font-semibold text-gray-800 dark:text-gray-100">{{ g.level }} - all streams</span>
                  <span class="text-[11px] text-gray-400">({{ g.classes.length }})</span>
                </label>
                <div class="flex flex-wrap gap-x-4 gap-y-1.5 mt-2 pl-6">
                  <label v-for="c in g.classes" :key="c.id" class="flex items-center gap-1.5 text-sm" :class="selectedLevels.has(g.level) ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 dark:text-gray-200 cursor-pointer'">
                    <input type="checkbox" :checked="selectedLevels.has(g.level) || selectedClassIds.has(c.id)" :disabled="selectedLevels.has(g.level)" @change="toggleClass(c.id)" class="w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500 disabled:opacity-60">
                    {{ c.label }}
                  </label>
                </div>
              </div>
              <p class="text-[11px] text-gray-400">"All streams" publishes to the whole class level as one assignment, including any stream added to it later.</p>
            </div>
          </div>
          <label class="block">
            <span class="text-xs font-semibold text-gray-600 dark:text-gray-300">Term</span>
            <select v-model.number="publishForm.term_id" class="input-field w-full text-sm mt-1">
              <option :value="0" disabled>Choose a term</option>
              <option v-for="t in terms" :key="t.id" :value="t.id">{{ t.label }}</option>
            </select>
          </label>
          <div class="grid grid-cols-2 gap-3">
            <label class="block">
              <span class="text-xs font-semibold text-gray-600 dark:text-gray-300">Due date <span class="font-normal text-gray-400">(optional)</span></span>
              <input v-model="publishForm.due_date" type="date" class="input-field w-full text-sm mt-1">
            </label>
            <label class="block">
              <span class="text-xs font-semibold text-gray-600 dark:text-gray-300">Marks</span>
              <input v-model="publishForm.marks" type="number" min="1" step="1" :placeholder="String(publishTarget.marks)" class="input-field w-full text-sm mt-1">
            </label>
          </div>
        </div>
        <div class="px-5 py-3 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-2">
          <button @click="publishTarget = null" class="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">Cancel</button>
          <button @click="savePublish" :disabled="!canPublish || publishing" class="px-4 py-2 text-sm font-semibold rounded-lg bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-50">{{ publishing ? 'Publishing...' : 'Publish' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppIcon from '@/components/common/AppIcon.vue'
import BulkActionBar from '@/components/common/BulkActionBar.vue'
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { CATEGORY_ICONS, CATEGORY_LABELS, CATEGORY_COLORS } from '@/types/virtualLab'
import type { ExperimentSummary, ExperimentPublication, LabObjectDef, LabCategory } from '@/types/virtualLab'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'

const router = useRouter()
const route = useRoute()

// The same page serves the admin (whole school) and a HOD (their own department only:
// publishing to its classes, no sharing, hiding or deleting) - see meta.labRole
const isHod = route.meta.labRole === 'hod'
const roleBase = isHod ? 'hod' : 'admin'
const hodDepartment = ref<{ id: number; name: string } | null>(null)

const API_BASE = `/api/${roleBase}/virtual-lab`
const toast = useToastStore()
const confirmDialog = useConfirmStore()

interface Analytics {
  total_experiments: number
  published_experiments: number
  total_assignments: number
  total_attempts: number
  graded_attempts: number
  average_percentage: number | null
  by_category: { category: LabCategory; experiment_count: number; attempt_count: number; average_percentage: number | null }[]
}

type TabKey = 'overview' | 'experiments' | 'apparatus'
const activeTab = ref<TabKey>(isHod ? 'experiments' : 'overview')

const analytics = ref<Analytics | null>(null)
const objects = ref<LabObjectDef[]>([])
const experiments = ref<ExperimentSummary[]>([])
const loadingExperiments = ref(false)
const loadingObjects = ref(false)
const expFilters = ref({ search: '', category: '', status: '' })
const search = ref('')

const tabs = computed<{ key: TabKey; label: string; icon: string; count: number | null }[]>(() => allTabs.value.filter(t => !isHod || t.key !== 'overview'))
const allTabs = computed<{ key: TabKey; label: string; icon: string; count: number | null }[]>(() => [
  { key: 'overview', label: 'Overview', icon: 'chart', count: null },
  // One per card once loaded (teachers' copies are folded into their library card)
  { key: 'experiments', label: 'Experiments', icon: 'beaker', count: experiments.value.length || (analytics.value?.total_experiments ?? null) },
  { key: 'apparatus', label: 'Apparatus', icon: 'kit', count: objects.value.length || null },
])

const statCards = computed(() => {
  const a = analytics.value
  if (!a) return []
  return [
    { label: 'Experiments', value: a.total_experiments, icon: 'beaker', color: 'bg-indigo-600' },
    { label: 'Published to classes', value: a.total_assignments, icon: 'users', color: 'bg-emerald-600' },
    { label: 'Student attempts', value: a.total_attempts, icon: 'clipboard', color: 'bg-amber-500' },
    { label: 'Average score', value: a.average_percentage !== null ? `${a.average_percentage}%` : '-', icon: 'target', color: 'bg-rose-600' },
  ]
})

const STATUS_LABEL: Record<string, string> = { draft: 'Draft', published: 'Published', disabled: 'Hidden' }
const STATUS_BADGE: Record<string, string> = {
  draft: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  published: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  disabled: 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
}

const OBJECT_GROUPS = [
  { key: 'physics', label: 'Physics' },
  { key: 'chemistry', label: 'Chemistry' },
  { key: 'biology', label: 'Biology' },
  { key: 'agriculture', label: 'Agriculture' },
  { key: 'general', label: 'General' },
]
const objectGroupLabel = (c: string) => OBJECT_GROUPS.find(g => g.key === c)?.label ?? 'General'
const objectSearch = ref('')
const objectCategory = ref('')
const filteredObjects = computed(() => {
  const q = objectSearch.value.trim().toLowerCase()
  return objects.value
    .filter(o => !objectCategory.value || o.category === objectCategory.value)
    .filter(o => !q || o.display_name.toLowerCase().includes(q) || (o.description || '').toLowerCase().includes(q))
    .sort((a, b) => a.display_name.localeCompare(b.display_name))
})

const humanize = (s: string) => s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
const formatDate = (d: string) => new Date(d.replace(' ', 'T')).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

// --- Library vs teachers' own experiments ---
const SOURCE_OPTIONS = [
  { key: 'all', label: 'All' },
  { key: 'library', label: 'Library' },
  { key: 'teachers', label: "Teachers'" },
] as const
const sourceFilter = ref<'all' | 'library' | 'teachers'>('all')
const visibleExperiments = computed(() => experiments.value.filter(e =>
  sourceFilter.value === 'all' || (sourceFilter.value === 'library' ? e.is_template : !e.is_template)))

// Experiments grouped under the subject they belong to (falls back to the general category label
// for anything without a subject_id), sorted alphabetically so the list stays stable as it grows.
const groupedExperiments = computed(() => {
  const groups = new Map<string, ExperimentSummary[]>()
  for (const e of visibleExperiments.value) {
    const key = e.subject_name || CATEGORY_LABELS[e.category] || 'Other'
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(e)
  }
  return [...groups.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([subject, exps]) => ({ subject, experiments: exps }))
})

// Overview cards drill down into the Experiments tab - a subject card also filters to it.
const goToExperiments = (category?: string) => {
  if (category !== undefined) expFilters.value.category = category
  activeTab.value = 'experiments'
}

// Opens the experiment exactly like a student would see it (3D diagram + guided procedure) -
// read-only, nothing is saved, same sandboxed route the teacher's "Try it like a student" uses.
const openExperiment = (e: ExperimentSummary) => router.push(`/${roleBase}/virtual-lab/practice/${e.id}`)

// --- Sharing library experiments with departments ---
interface Department { id: number; name: string }
const departments = ref<Department[]>([])
const loadingDepartments = ref(false)
const shareTarget = ref<ExperimentSummary | null>(null)
const shareSelection = reactive(new Set<number>())
const savingShare = ref(false)

const loadDepartments = async () => {
  if (departments.value.length) return
  loadingDepartments.value = true
  try {
    const res = await axios.get('/api/admin/departments')
    const list = Array.isArray(res.data.data) ? res.data.data : res.data.data?.departments || []
    departments.value = list
      .filter((d: any) => !d.deleted_at)
      .map((d: any) => ({ id: Number(d.id), name: d.name }))
      .sort((a: Department, b: Department) => a.name.localeCompare(b.name))
  } catch {
    toast.error('Could not load departments')
  } finally {
    loadingDepartments.value = false
  }
}

const openShare = async (e: ExperimentSummary) => {
  shareTarget.value = e
  shareSelection.clear()
  ;(e.shared_departments || []).forEach(d => shareSelection.add(d.id))
  await loadDepartments()
}

// One card per experiment: its classes, grouped by the department they were published in
const publicationsByDepartment = (e: ExperimentSummary) => {
  const groups = new Map<string, ExperimentPublication[]>()
  for (const p of e.publications || []) {
    const key = p.department_name || 'No department'
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(p)
  }
  return [...groups.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([name, items]) => ({ name, items }))
}

// --- Admin publishing straight to a department's class ---
interface DeptClass { id: number; name: string; label: string }
interface TermOption { id: number; label: string; is_current: boolean }
const publishTarget = ref<ExperimentSummary | null>(null)
const publishForm = reactive({ department_id: 0, term_id: 0, due_date: '', marks: '' as string | number })
const deptClasses = ref<DeptClass[]>([])
const loadingClasses = ref(false)
const terms = ref<TermOption[]>([])
const publishing = ref(false)

// Ticked class levels ("S.1 - all streams") and ticked single streams. A ticked level covers all
// its streams, so their own ticks are dropped and they show as ticked-and-locked.
const selectedLevels = reactive(new Set<string>())
const selectedClassIds = reactive(new Set<number>())
const classLevels = computed(() => {
  const groups = new Map<string, DeptClass[]>()
  for (const c of deptClasses.value) {
    if (!groups.has(c.name)) groups.set(c.name, [])
    groups.get(c.name)!.push(c)
  }
  return [...groups.entries()].map(([level, classes]) => ({ level, classes }))
})
const toggleLevel = (level: string) => {
  if (selectedLevels.has(level)) {
    selectedLevels.delete(level)
    return
  }
  selectedLevels.add(level)
  deptClasses.value.filter(c => c.name === level).forEach(c => selectedClassIds.delete(c.id))
}
const toggleClass = (id: number) => (selectedClassIds.has(id) ? selectedClassIds.delete(id) : selectedClassIds.add(id))
const selectedTargetCount = computed(() => selectedLevels.size + selectedClassIds.size)

const canPublish = computed(() => !!publishForm.department_id && !!publishForm.term_id && selectedTargetCount.value > 0)

const loadTerms = async () => {
  if (terms.value.length) return
  try {
    const res = await axios.get(isHod ? `${API_BASE}/terms` : '/api/admin/terms')
    const list = Array.isArray(res.data.data) ? res.data.data : res.data.data?.terms || []
    terms.value = list.map((t: any) => ({
      id: Number(t.id),
      label: [t.name, t.academic_year?.name].filter(Boolean).join(' - ') + (Number(t.is_current) ? ' (current)' : ''),
      is_current: !!Number(t.is_current),
    }))
  } catch {
    toast.error('Could not load terms')
  }
}

const openPublish = async (e: ExperimentSummary) => {
  publishTarget.value = e
  Object.assign(publishForm, { department_id: 0, term_id: 0, due_date: '', marks: '' })
  selectedLevels.clear()
  selectedClassIds.clear()
  await Promise.all([isHod ? Promise.resolve() : loadDepartments(), loadTerms()])
  publishForm.term_id = terms.value.find(t => t.is_current)?.id ?? 0
  if (isHod) {
    publishForm.department_id = hodDepartment.value?.id ?? 0
    return
  }
  // Start from the department it is already shared with, when there is just one
  const shared = e.shared_departments || []
  if (shared.length === 1) publishForm.department_id = shared[0].id
}

watch(() => publishForm.department_id, async (id) => {
  selectedLevels.clear()
  selectedClassIds.clear()
  deptClasses.value = []
  if (!id) return
  loadingClasses.value = true
  try {
    const res = await axios.get(isHod ? `${API_BASE}/classes` : `${API_BASE}/departments/${id}/classes`)
    deptClasses.value = res.data.data.classes
  } catch {
    toast.error('Could not load the classes')
  } finally {
    loadingClasses.value = false
  }
})

const savePublish = async () => {
  const e = publishTarget.value
  if (!e || !canPublish.value) return
  publishing.value = true
  // One assignment per ticked level (all streams) and per ticked single stream
  const targets = [
    ...[...selectedLevels].map(level => ({ label: `${level} (All Streams)`, body: { scope: 'all_streams', class_group_name: level, class_id: null } })),
    ...[...selectedClassIds].map(id => ({ label: deptClasses.value.find(c => c.id === id)?.label ?? 'class', body: { scope: 'stream', class_id: id, class_group_name: null } })),
  ]
  const done: string[] = []
  const failed: string[] = []
  for (const t of targets) {
    try {
      await axios.post(`${API_BASE}/experiments/${e.id}/publish`, {
        department_id: publishForm.department_id,
        ...t.body,
        term_id: publishForm.term_id,
        due_date: publishForm.due_date || null,
        marks: publishForm.marks === '' ? null : Number(publishForm.marks),
      })
      done.push(t.label)
      if (t.body.class_id) selectedClassIds.delete(t.body.class_id)
      else selectedLevels.delete(t.body.class_group_name as string)
    } catch (err: any) {
      const errors = err.response?.data?.errors
      failed.push(`${t.label}: ${(errors && Object.values(errors)[0]) || err.response?.data?.message || 'could not publish'}`)
    }
  }
  publishing.value = false
  if (done.length) toast.success(`"${e.title}" published to ${done.join(', ')}`)
  if (failed.length) toast.error(failed.join(' | '))
  if (!failed.length) publishTarget.value = null
  if (done.length) await Promise.all([loadExperiments(), loadAnalytics()])
}

const withdraw = async (e: ExperimentSummary, p: ExperimentPublication) => {
  const ok = await confirmDialog.open({
    title: 'Withdraw from class',
    message: `Withdraw "${e.title}" from ${p.class_label} (${p.department_name})? Its students will no longer see it.${p.submitted_count ? ` ${p.submitted_count} submitted ${p.submitted_count === 1 ? 'attempt is' : 'attempts are'} kept, and marks already given stay on report cards.` : ''}`,
    confirmLabel: 'Withdraw',
    danger: true,
  })
  if (!ok) return
  try {
    await axios.delete(`${API_BASE}/assignments/${p.assignment_id}`)
    toast.success(`Withdrawn from ${p.class_label}`)
    await Promise.all([loadExperiments(), loadAnalytics()])
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not withdraw it')
  }
}

const toggleAllDepartments = () => {
  if (shareSelection.size === departments.value.length) shareSelection.clear()
  else departments.value.forEach(d => shareSelection.add(d.id))
}

const saveShare = async () => {
  if (!shareTarget.value) return
  savingShare.value = true
  try {
    await axios.put(`${API_BASE}/experiments/${shareTarget.value.id}/departments`, { department_ids: [...shareSelection] })
    const n = shareSelection.size
    toast.success(n ? `"${shareTarget.value.title}" shared with ${n} department${n === 1 ? '' : 's'}` : `"${shareTarget.value.title}" is no longer shared`)
    shareTarget.value = null
    await loadExperiments()
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not save departments')
  } finally {
    savingShare.value = false
  }
}

// --- Selection ---
const selected = reactive(new Set<number>())
const allSelected = computed(() => visibleExperiments.value.length > 0 && visibleExperiments.value.every(e => selected.has(e.id)))
const toggle = (id: number) => (selected.has(id) ? selected.delete(id) : selected.add(id))
const toggleAll = () => {
  if (allSelected.value) selected.clear()
  else visibleExperiments.value.forEach(e => selected.add(e.id))
}

// --- Loading ---
const loadAnalytics = async () => {
  if (isHod) return
  const res = await axios.get(`${API_BASE}/analytics`)
  analytics.value = res.data.data
}

const loadObjects = async () => {
  loadingObjects.value = true
  try {
    const res = await axios.get(`${API_BASE}/objects`)
    objects.value = res.data.data.objects
  } finally {
    loadingObjects.value = false
  }
}

const loadExperiments = async () => {
  loadingExperiments.value = true
  try {
    const params: Record<string, string> = {}
    for (const [k, v] of Object.entries(expFilters.value)) if (v) params[k] = v
    const res = await axios.get(`${API_BASE}/experiments`, { params })
    experiments.value = res.data.data.experiments
    if (res.data.data.department) hodDepartment.value = res.data.data.department
    const ids = new Set(experiments.value.map(e => e.id))
    for (const id of [...selected]) if (!ids.has(id)) selected.delete(id)
  } finally {
    loadingExperiments.value = false
  }
}

// --- Actions ---
const setStatus = async (e: ExperimentSummary, status: 'disabled' | 'published') => {
  try {
    await axios.put(`${API_BASE}/experiments/${e.id}/status`, { status })
    toast.success(status === 'disabled' ? `"${e.title}" is now hidden from students` : `"${e.title}" restored`)
    await loadExperiments()
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not update the experiment')
  }
}

const setStatusMany = async (status: 'disabled') => {
  const ids = [...selected]
  try {
    await Promise.all(ids.map(id => axios.put(`${API_BASE}/experiments/${id}/status`, { status })))
    toast.success(`${ids.length} experiment(s) hidden from students`)
    selected.clear()
    await loadExperiments()
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not update the experiments')
  }
}

const impactText = (e: ExperimentSummary) => {
  const parts: string[] = []
  if (e.assignment_count) parts.push(`it is published to ${e.assignment_count} ${e.assignment_count === 1 ? 'class' : 'classes'}`)
  if (e.attempt_count) parts.push(`${e.attempt_count} student ${e.attempt_count === 1 ? 'attempt' : 'attempts'} exist`)
  const copies = e.copy_ids?.length
    ? ` Teachers' own copies (${e.copy_ids.length}) are not deleted - they will show as separate cards.`
    : ''
  return (parts.length ? ` ${parts.join(' and ').replace(/^./, c => c.toUpperCase())}.` : '') + copies
}

const deleteOne = async (e: ExperimentSummary) => {
  const ok = await confirmDialog.open({
    title: 'Delete experiment',
    message: `Delete "${e.title}"?${impactText(e)} It will disappear for all students, teachers and HODs. Marks already given stay on report cards. This cannot be undone.`,
    confirmLabel: 'Delete',
    danger: true,
  })
  if (!ok) return
  try {
    await axios.delete(`${API_BASE}/experiments/${e.id}`)
    selected.delete(e.id)
    toast.success(`"${e.title}" deleted`)
    await Promise.all([loadExperiments(), loadAnalytics()])
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not delete the experiment')
  }
}

const deleteMany = async () => {
  const ids = [...selected]
  if (!ids.length) return
  const ok = await confirmDialog.open({
    title: 'Delete experiments',
    message: `Delete ${ids.length} experiment(s)? They will disappear for all students, teachers and HODs, including every class they were published to. Marks already given stay on report cards. This cannot be undone.`,
    confirmLabel: 'Delete',
    danger: true,
  })
  if (!ok) return
  try {
    const res = await axios.post(`${API_BASE}/experiments/bulk-delete`, { ids })
    toast.success(res.data.message || `${ids.length} experiment(s) deleted`)
    selected.clear()
    await Promise.all([loadExperiments(), loadAnalytics()])
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not delete the experiments')
  }
}

const toggleObjectActive = async (o: LabObjectDef) => {
  try {
    await axios.put(`${API_BASE}/objects/${o.id}`, { is_active: !o.is_active })
    o.is_active = !o.is_active
    toast.success(`${o.display_name} ${o.is_active ? 'is available in the lab' : 'is hidden from the lab'}`)
  } catch (err: any) {
    toast.error(err.response?.data?.message || 'Could not update the apparatus')
  }
}

let searchTimer: ReturnType<typeof setTimeout> | null = null
watch(search, (v) => {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => { expFilters.value.search = v.trim() }, 300)
})
watch(() => [expFilters.value.category, expFilters.value.status, expFilters.value.search], loadExperiments)
watch(activeTab, (tab) => {
  if (tab === 'experiments' && experiments.value.length === 0) loadExperiments()
  if (tab === 'apparatus' && objects.value.length === 0) loadObjects()
})

onMounted(() => {
  loadAnalytics()
  loadObjects()
  if (isHod) loadExperiments()
})
</script>
