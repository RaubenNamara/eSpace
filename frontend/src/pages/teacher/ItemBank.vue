<template>
  <div class="w-full">
    <PageHeader title="Item Bank" description="Past papers, practice questions and revision packs - students open them right in eSpace." icon="clipboard" accent="amber" :active-filters="activeFilterCount">
      <template #actions>
        <button type="button" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold bg-amber-600 text-white hover:bg-amber-700 shadow-sm shadow-amber-500/20" @click="openCreateModal">
          <AppIcon name="upload" class="w-4 h-4" />
          <span class="hidden sm:inline">Add a paper</span><span class="sm:hidden">Add</span>
        </button>
      </template>
      <template #filters>
        <div class="relative">
          <svg class="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"></path></svg>
          <input v-model="search" type="search" placeholder="Search papers" class="w-full md:w-48 pl-8 pr-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
        </div>
        <PickerDropdown v-model="subjectFilter" label="Subject" :options="subjectOptions" align="right" />
      </template>
      <StatStrip v-model="statusFilter" :items="statItems" hide-when-empty />
    </PageHeader>

    <p v-if="assignmentsError" class="mb-4 text-sm text-rose-600 dark:text-rose-300">{{ assignmentsError }}</p>

    <Skeleton v-if="loading && !resources.length" variant="cards" :count="6" />

    <EmptyState v-else-if="!resources.length" icon="clipboard" tone="amber" title="No papers yet" message="Add a PDF - a past paper, a set of practice questions, a revision pack - and students open it in the browser. The first page becomes its cover.">
      <button type="button" class="px-4 py-2 rounded-xl text-sm font-semibold bg-amber-600 text-white hover:bg-amber-700" @click="openCreateModal">Add your first paper</button>
    </EmptyState>

    <template v-else>
      <!-- Class tabs: one per class (all-streams papers sit under their class) -->
      <nav v-if="classTabs.length > 2" class="flex gap-1.5 mb-4 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-1 [scrollbar-width:none]" aria-label="Classes">
        <button
          v-for="g in classTabs"
          :key="g.name"
          type="button"
          class="flex-shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold border transition-colors"
          :class="activeClassName === g.name
            ? 'bg-amber-600 border-amber-600 text-white shadow-sm shadow-amber-500/20'
            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-amber-300 dark:hover:border-amber-700'"
          @click="activeClassName = g.name"
        >
          {{ g.label }}
          <span class="px-1.5 rounded-md text-[11px] font-bold" :class="activeClassName === g.name ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300'">{{ g.count }}</span>
        </button>
      </nav>

      <div v-if="visibleIds.length" class="flex items-center gap-2 mb-3">
        <label class="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 cursor-pointer select-none">
          <input
            type="checkbox"
            :checked="bulk.allSelected(visibleIds)"
            class="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-amber-600 focus:ring-amber-500"
            @change="bulk.toggleAll(visibleIds)"
          >
          Select all
        </label>
      </div>

      <BulkActionBar :count="bulk.selectedCount.value" @clear="bulk.clear()">
        <button class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" @click="bulkSetStatus('published')">Publish</button>
        <button class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" @click="bulkSetStatus('draft')">Draft</button>
        <button class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" @click="bulkSetStatus('archived')">Archive</button>
        <button class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" title="Students can download these and save them for offline reading" @click="bulkSetDownload(true)">Allow download</button>
        <button class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" title="Students can only read these inside eSpace" @click="bulkSetDownload(false)">No download</button>
        <button class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" @click="bulkExport">Export CSV</button>
        <button class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors" @click="bulkDeleteSelected">Delete</button>
      </BulkActionBar>

      <EmptyState v-if="!activeClassSubjectShelves.length" compact icon="clipboard" tone="gray" title="Nothing matches" message="Try another class, subject or status.">
        <button type="button" class="text-sm font-semibold text-amber-600 dark:text-amber-300 hover:underline" @click="clearFilters">Clear filters</button>
      </EmptyState>

      <div v-else class="shelf-row flex flex-wrap items-start gap-x-5 gap-y-7">
        <Bookshelf
          v-for="shelf in activeClassSubjectShelves"
          :key="shelf.name"
          :title="shelf.name"
          :count="shelf.resources.length"
          spines
        >
          <ShelfSlot
            v-for="resource in shelf.resources"
            :key="resource.id"
            :label="resource.title"
            :title="`Updated ${formatDate(resource.updated_at || resource.created_at)}`"
            @open="previewResource = resource"
          >
            <template #cover="{ size }">
              <ShelfBook
                flat
                :size="size"
                :title="resource.title"
                :seed="resource.id"
                :label="subjectTag(resource.subject_name, resource.subject_code)"
                :cover-image="resource.cover_image"
                :pages="resource.total_pages"
              />
            </template>
            <ShelfBook
              spine-out
              :selected="bulk.isSelected(resource.id)"
              :title="resource.title"
              :seed="resource.id"
              :label="subjectTag(resource.subject_name, resource.subject_code)"
              :cover-image="resource.cover_image"
              :pages="resource.total_pages"
            />

            <template #details>
              <label class="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400 cursor-pointer select-none mb-1.5">
                <input
                  type="checkbox"
                  :checked="bulk.isSelected(resource.id)"
                  class="w-3.5 h-3.5 rounded border-gray-300 dark:border-gray-600 text-amber-600 focus:ring-amber-500"
                  @change="bulk.toggle(resource.id)"
                >
                Select
              </label>
              <div class="flex items-center gap-1.5">
                <span class="px-1.5 py-0.5 rounded-full text-[10px] font-semibold" :class="statusChip(resource.status)">{{ resource.status.charAt(0).toUpperCase() + resource.status.slice(1) }}</span>
                <span class="text-[10px] text-gray-400 dark:text-gray-500 truncate">{{ 'PDF' }}<template v-if="resource.total_pages"> · {{ resource.total_pages }} pages</template><template v-if="resource.file_size"> · {{ formatFileSize(resource.file_size) }}</template></span>
              </div>
              <p class="mt-1 text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug">{{ resource.title }}</p>
              <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ audienceLabel(resource) }}</p>

              <!-- Published: how far the class has got, opening the full list -->
              <template v-if="resource.status === 'published'">
                <p v-if="!resource.audience" class="mt-1.5 text-[11px] text-gray-400">No students in this class yet</p>
                <button v-else type="button" class="mt-1.5 w-full text-left group/r" title="See who has opened it" @click.stop="readersFor = resource">
                  <span class="flex items-center gap-2">
                    <span class="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                      <span class="block h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500" :style="{ width: reach(resource) + '%' }"></span>
                    </span>
                    <span class="text-[11px] font-semibold tabular-nums text-gray-500 dark:text-gray-400">{{ reach(resource) }}%</span>
                  </span>
                  <span class="block text-[11px] text-gray-500 dark:text-gray-400 group-hover/r:text-amber-600 dark:group-hover/r:text-amber-300">
                    {{ resource.readers || 0 }} of {{ resource.audience }} opened
                  </span>
                </button>
              </template>
              <p v-else-if="resource.status === 'draft'" class="mt-1.5 flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
                Students can't see it yet
                <button type="button" class="font-semibold text-amber-600 dark:text-amber-300 hover:underline" @click.stop="publishOne(resource)">Publish</button>
              </p>

              <div class="flex items-center -ml-1.5 mt-0.5">
                <button class="p-1.5 min-w-[34px] min-h-[34px] flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Edit" @click.stop="editResource(resource)">
                  <AppIcon name="pencil" class="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
                <button class="p-1.5 min-w-[34px] min-h-[34px] flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-colors" title="Delete" @click.stop="deleteResource(resource.id)">
                  <AppIcon name="trash" class="w-4 h-4 text-red-600 dark:text-red-400" />
                </button>
                <span v-if="Number(resource.allow_download)" class="ml-auto inline-flex items-center gap-1 text-[10px] text-gray-400" title="Students can download this paper">
                  <AppIcon name="download" class="w-3.5 h-3.5" /> Downloadable
                </span>
              </div>
            </template>
          </ShelfSlot>
        </Bookshelf>
      </div>

      <!-- The same books as a list: how far each class has got, and quick actions -->
      <section v-if="activeClassResources.length" class="mt-8">
        <h2 class="text-sm font-bold text-gray-900 dark:text-white mb-2">Who's opened them</h2>
        <ul class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
          <li v-for="resource in readingList" :key="resource.id" class="p-3 flex items-center gap-3">
            <button type="button" class="w-10 h-[53px] flex-shrink-0 overflow-hidden rounded-sm" :title="`Open ${resource.title}`" @click="previewResource = resource">
              <span class="block origin-top-left scale-[0.43] pointer-events-none">
                <ShelfBook flat size="sm" :title="resource.title" :seed="resource.id" :label="subjectTag(resource.subject_name, resource.subject_code)" :cover-image="resource.cover_image" :pages="resource.total_pages" />
              </span>
            </button>
            <div class="min-w-0 flex-1">
              <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ resource.title }}</p>
              <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                {{ resource.subject_name }} · {{ audienceLabel(resource) }}<template v-if="resource.total_pages"> · {{ resource.total_pages }} pages</template>
              </p>
              <button v-if="resource.status === 'published' && resource.audience" type="button" class="mt-1 w-full max-w-sm flex items-center gap-2 group/r" title="See who has opened it" @click="readersFor = resource">
                <span class="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <span class="block h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500" :style="{ width: reach(resource) + '%' }"></span>
                </span>
                <span class="text-[11px] whitespace-nowrap text-gray-500 dark:text-gray-400 group-hover/r:text-amber-600 dark:group-hover/r:text-amber-300">{{ resource.readers || 0 }}/{{ resource.audience }} opened</span>
              </button>
              <p v-else-if="resource.status === 'published'" class="mt-1 text-[11px] text-gray-400">No students in this class yet</p>
              <p v-else class="mt-1 flex items-center gap-2 text-[11px]">
                <span class="px-1.5 py-0.5 rounded-full font-semibold" :class="statusChip(resource.status)">{{ resource.status === 'draft' ? 'Draft' : 'Archived' }}</span>
                <button v-if="resource.status === 'draft'" type="button" class="font-semibold text-amber-600 dark:text-amber-300 hover:underline" @click="publishOne(resource)">Publish</button>
              </p>
            </div>
            <div class="flex items-center flex-shrink-0">
              <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" title="Edit" @click="editResource(resource)">
                <AppIcon name="pencil" class="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
              <button class="hidden sm:flex p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40" title="Delete" @click="deleteResource(resource.id)">
                <AppIcon name="trash" class="w-4 h-4 text-red-500 dark:text-red-400" />
              </button>
            </div>
          </li>
        </ul>
      </section>
    </template>

    <!-- Upload/Edit Modal -->
    <div v-if="showResourceModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ editingResource ? 'Edit Resource' : 'Upload Item Bank' }}
          </h3>
          <button @click="closeResourceModal" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-6">
          <form @submit.prevent="saveResource">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
              <input
                v-model="resourceForm.title"
                type="text"
                required
                placeholder="Enter resource title..."
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea
                v-model="resourceForm.description"
                rows="3"
                placeholder="Enter a short description..."
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              ></textarea>
            </div>

            <!-- Cover (existing resources) - the shelf shows this like a real book's cover -->
            <div v-if="editingResource" class="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg p-3 flex items-center gap-4">
              <ShelfBook
                size="sm"
                :title="resourceForm.title || editingResource.title"
                :seed="editingResource.id"
                :label="subjectTag(editingResource.subject_name, editingResource.subject_code)"
                :cover-image="editingResource.cover_image"
                :pages="editingResource.total_pages"
              />
              <div class="min-w-0 flex-1 space-y-2">
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Cover</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {{ editingResource.cover_image
                    ? (isAutoCover(editingResource.cover_image) ? 'Using the first page of the file.' : 'Using your own picture.')
                    : 'No picture - a printed cover with the title is shown.' }}
                </p>
                <div class="flex flex-wrap gap-2">
                  <button type="button" @click="coverFileInput?.click()" :disabled="coverBusy" class="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50">
                    Upload picture
                  </button>
                  <button type="button" @click="useFirstPageCover" :disabled="coverBusy" class="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50">
                    Use first page
                  </button>
                  <button v-if="editingResource.cover_image" type="button" @click="removeCover" :disabled="coverBusy" class="px-2.5 py-1.5 text-xs font-medium rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 disabled:opacity-50">
                    Remove
                  </button>
                  <span v-if="coverBusy" class="text-xs text-gray-400 self-center">Working&hellip;</span>
                </div>
                <input ref="coverFileInput" type="file" accept="image/jpeg,image/png,image/webp" class="hidden" @change="onCoverFileSelected">
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject *</label>
                <select
                  v-model="resourceForm.subject_id"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  :disabled="!assignments?.subjects || assignments.subjects.length === 0"
                >
                  <option value="">Select Subject</option>
                  <option v-for="subject in assignments?.subjects" :key="subject.id" :value="subject.id">{{ subject.name }}</option>
                </select>
                <p v-if="!assignments?.subjects || assignments.subjects.length === 0" class="text-xs text-red-600 dark:text-red-400 mt-1">
                  No subjects available. Please ensure you are assigned to a department with subjects.
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Class *</label>
                <TeacherClassSelector v-model="resourceForm.classTarget" />
              </div>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
              <select
                v-model="resourceForm.status"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <ItemBankTopicsPicker v-if="editingResource" ref="topicsPicker" :key="editingResource.id" :resource-id="editingResource.id" />

            <label class="flex items-center gap-2 mb-4 px-3 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer">
              <input v-model="resourceForm.allow_download" type="checkbox" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
              <span class="text-sm text-gray-700 dark:text-gray-300">Allow students to download this file</span>
            </label>

            <div v-if="!editingResource" class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">PDF file *</label>
              <label
                class="flex flex-col items-center justify-center gap-2 px-4 py-6 rounded-xl border-2 border-dashed cursor-pointer text-center transition-colors"
                :class="dragging ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20' : resourceForm.file ? 'border-amber-300 dark:border-amber-700 bg-amber-50/60 dark:bg-amber-900/10' : 'border-gray-300 dark:border-gray-600 hover:border-amber-400 dark:hover:border-amber-600'"
                @dragover.prevent="dragging = true"
                @dragleave.prevent="dragging = false"
                @drop.prevent="onDrop"
              >
                <input type="file" accept="application/pdf" class="sr-only" @change="handleFileSelect">
                <span class="w-11 h-11 rounded-xl flex items-center justify-center bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300">
                  <AppIcon :name="resourceForm.file ? 'clipboard' : 'upload'" class="w-5 h-5" />
                </span>
                <template v-if="resourceForm.file">
                  <span class="text-sm font-semibold text-gray-900 dark:text-white break-all">{{ resourceForm.file.name }}</span>
                  <span class="text-xs text-gray-500 dark:text-gray-400">{{ formatFileSize(resourceForm.file.size) }} · tap to choose another</span>
                </template>
                <template v-else>
                  <span class="text-sm font-semibold text-gray-900 dark:text-white">Drop a PDF here, or tap to choose</span>
                  <span class="text-xs text-gray-500 dark:text-gray-400">Up to 50MB - downloadable only if you tick Allow above</span>
                </template>
              </label>
              <div v-if="saving && uploadProgress > 0" class="mt-2">
                <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <span>Uploading&hellip;</span>
                  <span>{{ uploadProgress }}%</span>
                </div>
                <div class="h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <div class="h-full rounded-full bg-indigo-600 transition-all duration-150" :style="{ width: uploadProgress + '%' }"></div>
                </div>
              </div>
            </div>
            <p v-else class="text-xs text-gray-500 dark:text-gray-400 mb-4">
              The PDF file can't be replaced here - delete this resource and upload a new one if you need to change the document.
            </p>

            <div class="flex justify-end space-x-3">
              <button
                type="button"
                @click="closeResourceModal"
                class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ saving ? (uploadProgress > 0 ? `Uploading... ${uploadProgress}%` : 'Saving...') : (editingResource ? 'Update Resource' : 'Upload') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- PDF Preview -->
    <ItemBankPdfViewer v-if="previewResource" :resource="previewResource" @close="previewResource = null" />
    <AudiencePanel
      v-if="readersFor"
      :title="readersFor.title"
      :subtitle="`${audienceLabel(readersFor)} · ${readersFor.subject_name || ''}`"
      :endpoint="`/api/teacher/itembank/${readersFor.id}/readers`"
      icon="clipboard"
      verb="opened"
      :tracks-progress="false"
      @close="readersFor = null"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import axios from 'axios'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatStrip, { type StatItem } from '@/components/ui/StatStrip.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import Skeleton from '@/components/ui/Skeleton.vue'
import PickerDropdown, { type PickerOption } from '@/components/common/PickerDropdown.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import AudiencePanel from '@/components/common/AudiencePanel.vue'
import ItemBankPdfViewer from '@/components/itembank/ItemBankPdfViewer.vue'
import TeacherClassSelector from '@/components/teacher/TeacherClassSelector.vue'
import BulkActionBar from '@/components/common/BulkActionBar.vue'
import ItemBankTopicsPicker from '@/components/itembank/ItemBankTopicsPicker.vue'
import Bookshelf from '@/components/library/Bookshelf.vue'
import ShelfBook from '@/components/library/ShelfBook.vue'
import ShelfSlot from '@/components/library/ShelfSlot.vue'
import { renderPdfCover } from '@/utils/pdfCover'
import { subjectTag } from '@/utils/subjectTag'
import { orderShelves } from '@/utils/shelfOrder'
import { resolveAssetUrl } from '@/utils/url'
import type { ItemBankResource, ItemBankResourceForm } from '@/types/itembank'
import type { ENoteAssignments } from '@/types/enotes'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'
import { useBulkSelection } from '@/composables/useBulkSelection'
import { usePersistedRef } from '@/composables/usePersistedRef'
import { downloadBlob } from '@/utils/downloadBlob'

const toast = useToastStore()
const confirmDialog = useConfirmStore()
const bulk = useBulkSelection<number>()

const API_BASE = '/api'

const resources = ref<ItemBankResource[]>([])
const assignments = ref<ENoteAssignments | null>(null)
const assignmentsError = ref<string | null>(null)
const loading = ref(false)
const saving = ref(false)
const uploadProgress = ref(0)

const statusFilter = usePersistedRef<string | null>('teacher-itembank:status', null)
const subjectFilter = usePersistedRef<string>('teacher-itembank:subject', '')
const search = ref('')
const dragging = ref(false)
const readersFor = ref<ItemBankResource | null>(null)

const showResourceModal = ref(false)
const editingResource = ref<ItemBankResource | null>(null)
const topicsPicker = ref<InstanceType<typeof ItemBankTopicsPicker> | null>(null)
const previewResource = ref<ItemBankResource | null>(null)
const resourceForm = ref<ItemBankResourceForm>({
  title: '',
  description: '',
  subject_id: '',
  classTarget: { scope: 'stream', class_id: null, class_group_name: null },
  status: 'draft',
  allow_download: false,
  file: null
})

const stats = computed(() => ({
  total: resources.value.length,
  draft: resources.value.filter(r => r.status === 'draft').length,
  published: resources.value.filter(r => r.status === 'published').length,
  archived: resources.value.filter(r => r.status === 'archived').length
}))

const statItems = computed<StatItem[]>(() => [
  { label: 'All papers', value: stats.value.total, tone: 'gray' },
  { label: 'Published', value: stats.value.published, key: 'published', tone: 'emerald' },
  { label: 'Draft', value: stats.value.draft, key: 'draft', tone: 'amber' },
  { label: 'Archived', value: stats.value.archived, key: 'archived', tone: 'gray' }
])
const subjectOptions = computed<PickerOption<string>[]>(() => [
  { value: '', label: 'All subjects' },
  ...(assignments.value?.subjects ?? []).map(s => ({ value: String(s.id), label: s.name }))
])
const activeFilterCount = computed(() => (subjectFilter.value ? 1 : 0) + (search.value.trim() ? 1 : 0))

const filteredResources = computed(() => {
  const q = search.value.trim().toLowerCase()
  return resources.value.filter(resource => {
    const matchesStatus = !statusFilter.value || resource.status === statusFilter.value
    const matchesSubject = !subjectFilter.value || resource.subject_id === parseInt(subjectFilter.value)
    const matchesSearch = !q || [resource.title, resource.description].some(t => (t || '').toLowerCase().includes(q))
    return matchesStatus && matchesSubject && matchesSearch
  })
})

// One tab per class ("All Streams" papers under their class), then one shelf per subject.
// A class is always open - the last one used, or the first - with "All" beside them.
const ALL = '__all'
const classOf = (resource: ItemBankResource) => resource.class_group_name || resource.class_name || 'Unassigned'
const activeClassName = usePersistedRef<string>('teacher-itembank:class', '')
const classTabs = computed(() => {
  const names = [...new Set(resources.value.map(classOf))].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  return [
    { name: ALL, label: 'All classes', count: filteredResources.value.length },
    ...names.map(name => ({ name, label: name, count: filteredResources.value.filter(r => classOf(r) === name).length }))
  ]
})
watch(classTabs, (tabs) => {
  if (!resources.value.length) return
  if (!tabs.some(t => t.name === activeClassName.value)) activeClassName.value = tabs[1]?.name ?? ALL
}, { immediate: true })

const activeClassResources = computed(() => activeClassName.value === ALL
  ? filteredResources.value
  : filteredResources.value.filter(r => classOf(r) === activeClassName.value))

// Share of the class that has opened it
const reach = (resource: ItemBankResource) => resource.audience ? Math.min(100, Math.round(((resource.readers || 0) / resource.audience) * 100)) : 0
// Published first, the least-opened on top - that's where a nudge helps most
const readingList = computed(() => [...activeClassResources.value].sort((a, b) =>
  (a.status === 'published' ? 0 : 1) - (b.status === 'published' ? 0 : 1) || reach(a) - reach(b)))
const audienceLabel = (resource: ItemBankResource) => resource.class_group_name
  ? `${resource.class_group_name} (All Streams)`
  : resource.class_stream_name ? `${resource.class_name}-${resource.class_stream_name}` : (resource.class_name || '')
const statusChip = (status: string) => status === 'published'
  ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200'
  : status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'

const activeClassSubjectShelves = computed(() => {
  const map = new Map<string, ItemBankResource[]>()
  activeClassResources.value.forEach(resource => {
    const name = resource.subject_name || 'Other'
    if (!map.has(name)) map.set(name, [])
    map.get(name)!.push(resource)
  })
  return orderShelves(Array.from(map, ([name, resources]) => ({ name, resources })), g => g.resources)
})

const visibleIds = computed(() => activeClassResources.value.map(r => r.id))

const bulkSetStatus = async (status: 'draft' | 'published' | 'archived') => {
  const ids = bulk.selectedArray()
  if (ids.length === 0) return
  try {
    await axios.post(`${API_BASE}/teacher/itembank/bulk-status`, { ids, status })
    toast.success(`${ids.length} resource(s) updated`)
    bulk.clear()
    await loadResources()
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to update resources')
  }
}

// Downloading (and saving for offline reading) is off unless the teacher allows it
const bulkSetDownload = async (allow: boolean) => {
  const ids = bulk.selectedArray()
  if (ids.length === 0) return
  try {
    await axios.post(`${API_BASE}/teacher/itembank/bulk-download`, { ids, allow })
    toast.success(`${ids.length} resource(s) ${allow ? 'can now be downloaded' : 'no longer downloadable'}`)
    bulk.clear()
    await loadResources()
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to update resources')
  }
}

const publishOne = async (resource: ItemBankResource) => {
  try {
    await axios.post(`${API_BASE}/teacher/itembank/bulk-status`, { ids: [resource.id], status: 'published' })
    toast.success(`"${resource.title}" is now visible to students`)
    await loadResources()
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to publish')
  }
}

const bulkDeleteSelected = async () => {
  const ids = bulk.selectedArray()
  if (ids.length === 0) return
  if (!await confirmDialog.open({ title: 'Delete resources', message: `Are you sure you want to delete ${ids.length} resource(s)? This cannot be undone.`, confirmLabel: 'Delete', danger: true })) return
  try {
    await axios.post(`${API_BASE}/teacher/itembank/bulk-delete`, { ids })
    toast.success(`${ids.length} resource(s) deleted`)
    bulk.clear()
    await loadResources()
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to delete resources')
  }
}

const bulkExport = async () => {
  const ids = bulk.selectedArray()
  try {
    const response = await axios.post(`${API_BASE}/teacher/itembank/bulk-export`, { ids }, { responseType: 'blob' })
    downloadBlob(response.data, 'item-bank.csv')
  } catch (error) {
    toast.error('Failed to export resources')
  }
}

const clearFilters = () => {
  statusFilter.value = null
  subjectFilter.value = ''
  search.value = ''
}

const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const formatFileSize = (bytes: number | null) => {
  if (!bytes) return ''
  const mb = bytes / (1024 * 1024)
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`
}

const loadResources = async () => {
  try {
    loading.value = true
    const response = await axios.get(`${API_BASE}/teacher/itembank`)
    if (response.data.success) {
      resources.value = response.data.data.resources || []
      generateMissingCovers()
    }
  } catch (error) {
    console.error('Failed to load item bank:', error)
  } finally {
    loading.value = false
  }
}

// ---- Covers ----
// Every PDF gets its real first page as its shelf cover, rendered here in the teacher's browser
// (the server has no PDF renderer) and uploaded once. Runs quietly in the background, one
// resource at a time, only for those without a cover yet; each is tried at most once per visit.
const isAutoCover = (path?: string | null) => !!path && /\/auto_[^/]*$/.test(path)
const coverAttempted = new Set<number>()
let generatingCovers = false

const uploadCover = async (resourceId: number, blob: Blob, auto: boolean, totalPages?: number) => {
  const data = new FormData()
  data.append('cover', blob, auto ? 'first-page.jpg' : 'cover')
  data.append('auto', auto ? '1' : '0')
  if (totalPages) data.append('total_pages', String(totalPages))
  const response = await axios.post(`${API_BASE}/teacher/itembank/${resourceId}/cover`, data)
  const coverImage: string = response.data.data.cover_image
  for (const target of [resources.value.find(r => r.id === resourceId), editingResource.value?.id === resourceId ? editingResource.value : null]) {
    if (!target) continue
    target.cover_image = coverImage
    if (auto && totalPages) target.total_pages = totalPages
  }
}

const generateMissingCovers = async () => {
  if (generatingCovers) return
  generatingCovers = true
  try {
    for (;;) {
      const resource = resources.value.find(r => !r.cover_image && !coverAttempted.has(r.id))
      if (!resource) break
      coverAttempted.add(resource.id)
      try {
        const { blob, totalPages } = await renderPdfCover(resolveAssetUrl(resource.file_path))
        await uploadCover(resource.id, blob, true, totalPages)
      } catch (error: any) {
        // 409: the server's database doesn't have the cover columns yet - stop trying
        if (error?.response?.status === 409) break
        console.warn(`Could not create a cover for item bank resource ${resource.id}:`, error)
      }
    }
  } finally {
    generatingCovers = false
  }
}

const coverFileInput = ref<HTMLInputElement | null>(null)
const coverBusy = ref(false)

const onCoverFileSelected = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file || !editingResource.value) return
  coverBusy.value = true
  try {
    await uploadCover(editingResource.value.id, file, false)
    toast.success('Cover updated')
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Could not upload that picture')
  } finally {
    coverBusy.value = false
  }
}

const useFirstPageCover = async () => {
  if (!editingResource.value) return
  coverBusy.value = true
  try {
    const { blob, totalPages } = await renderPdfCover(resolveAssetUrl(editingResource.value.file_path))
    // A deliberate choice, so it replaces a custom picture too: clear first, then upload as auto
    if (editingResource.value.cover_image && !isAutoCover(editingResource.value.cover_image)) {
      await axios.delete(`${API_BASE}/teacher/itembank/${editingResource.value.id}/cover`)
    }
    await uploadCover(editingResource.value.id, blob, true, totalPages)
    toast.success('Cover set to the first page')
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Could not read the first page of this file')
  } finally {
    coverBusy.value = false
  }
}

const removeCover = async () => {
  if (!editingResource.value) return
  coverBusy.value = true
  try {
    await axios.delete(`${API_BASE}/teacher/itembank/${editingResource.value.id}/cover`)
    const id = editingResource.value.id
    editingResource.value.cover_image = null
    const listed = resources.value.find(r => r.id === id)
    if (listed) listed.cover_image = null
    // Don't let the background generator immediately put the first page back
    coverAttempted.add(id)
    toast.success('Cover removed')
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Could not remove the cover')
  } finally {
    coverBusy.value = false
  }
}

const loadAssignments = async () => {
  try {
    const response = await axios.get(`${API_BASE}/teacher/enotes/assignments`)
    if (response.data.success) {
      assignments.value = response.data.data
      assignmentsError.value = null
    } else {
      assignmentsError.value = response.data.message || 'Failed to load assignments'
    }
  } catch (error: any) {
    assignmentsError.value = error.response?.data?.message || 'Failed to load assignments. Please ensure you are assigned to a department.'
  }
}

const openCreateModal = () => {
  editingResource.value = null
  // The subject on view is the likely one
  resourceForm.value = { title: '', description: '', subject_id: subjectFilter.value, classTarget: { scope: 'stream', class_id: null, class_group_name: null }, status: 'draft', allow_download: false, file: null }
  showResourceModal.value = true
}

const editResource = (resource: ItemBankResource) => {
  editingResource.value = resource
  resourceForm.value = {
    title: resource.title,
    description: resource.description || '',
    subject_id: resource.subject_id?.toString() || '',
    classTarget: resource.class_group_name
      ? { scope: 'all_streams', class_id: null, class_group_name: resource.class_group_name }
      : { scope: 'stream', class_id: resource.class_id, class_group_name: null },
    status: resource.status,
    allow_download: !!Number(resource.allow_download),
    file: null
  }
  showResourceModal.value = true
}

const closeResourceModal = () => {
  showResourceModal.value = false
  editingResource.value = null
}

// A chosen file names the paper too, if the teacher hasn't typed a title yet
const pickFile = (file: File | null) => {
  if (file && file.type !== 'application/pdf' && !/\.pdf$/i.test(file.name)) {
    toast.warning('Item Bank takes PDF files only')
    return false
  }
  resourceForm.value.file = file
  if (file && !resourceForm.value.title.trim()) {
    resourceForm.value.title = file.name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').trim()
  }
  return true
}
const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!pickFile(target.files?.[0] || null)) target.value = ''
}
const onDrop = (event: DragEvent) => {
  dragging.value = false
  pickFile(event.dataTransfer?.files?.[0] || null)
}

const saveResource = async () => {
  try {
    saving.value = true
    uploadProgress.value = 0

    if (editingResource.value) {
      await axios.put(`${API_BASE}/teacher/itembank/${editingResource.value.id}`, {
        title: resourceForm.value.title,
        description: resourceForm.value.description,
        subject_id: resourceForm.value.subject_id,
        scope: resourceForm.value.classTarget.scope,
        class_id: resourceForm.value.classTarget.class_id,
        class_group_name: resourceForm.value.classTarget.class_group_name,
        status: resourceForm.value.status,
        allow_download: resourceForm.value.allow_download
      })
      if (!(await topicsPicker.value?.save() ?? true)) toast.warning('Saved, but the topics could not be saved - try again')
    } else {
      if (!resourceForm.value.file) {
        toast.warning('Please select a PDF file')
        return
      }
      const formData = new FormData()
      formData.append('title', resourceForm.value.title)
      formData.append('description', resourceForm.value.description)
      formData.append('subject_id', resourceForm.value.subject_id)
      formData.append('scope', resourceForm.value.classTarget.scope)
      if (resourceForm.value.classTarget.class_id !== null) formData.append('class_id', String(resourceForm.value.classTarget.class_id))
      if (resourceForm.value.classTarget.class_group_name !== null) formData.append('class_group_name', resourceForm.value.classTarget.class_group_name)
      formData.append('status', resourceForm.value.status)
      formData.append('allow_download', resourceForm.value.allow_download ? '1' : '0')
      formData.append('file', resourceForm.value.file)

      await axios.post(`${API_BASE}/teacher/itembank`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          if (e.total) uploadProgress.value = Math.round((e.loaded * 100) / e.total)
        }
      })
    }

    closeResourceModal()
    await loadResources()
  } catch (error: any) {
    console.error('Failed to save resource:', error)
    toast.error(error.response?.data?.message || 'Failed to save resource')
  } finally {
    saving.value = false
    uploadProgress.value = 0
  }
}

const deleteResource = async (id: number) => {
  if (!await confirmDialog.open({ title: 'Delete resource', message: 'Are you sure you want to delete this resource?', confirmLabel: 'Delete', danger: true })) return
  try {
    await axios.delete(`${API_BASE}/teacher/itembank/${id}`)
    await loadResources()
    toast.success('Resource deleted')
  } catch (error) {
    console.error('Failed to delete resource:', error)
    toast.error('Failed to delete resource. Please try again.')
  }
}

onMounted(async () => {
  await Promise.all([loadResources(), loadAssignments()])
})
</script>
