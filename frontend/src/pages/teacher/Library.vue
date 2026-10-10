<template>
  <div class="w-full">
    <PageHeader title="eLibrary" :description="COPY[role].description" icon="book" accent="emerald" :active-filters="activeFilterCount">
      <template #actions>
        <button type="button" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-500/20" @click="openCreateModal">
          <AppIcon name="upload" class="w-4 h-4" />
          <span class="hidden sm:inline">Add a book</span><span class="sm:hidden">Add</span>
        </button>
      </template>
      <template #filters>
        <div class="relative">
          <svg class="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"></path></svg>
          <input v-model="search" type="search" placeholder="Search books" class="w-full md:w-48 pl-8 pr-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
        </div>
        <PickerDropdown v-if="role === 'admin'" v-model="departmentFilter" label="Department" :options="departmentOptions" align="right" />
        <PickerDropdown v-model="subjectFilter" label="Subject" :options="subjectOptions" align="right" />
      </template>
      <StatStrip v-model="statusFilter" :items="statItems" hide-when-empty />
    </PageHeader>

    <p v-if="assignmentsError" class="mb-4 text-sm text-rose-600 dark:text-rose-300">{{ assignmentsError }}</p>

    <Skeleton v-if="loading && !books.length" variant="cards" :count="6" />

    <EmptyState v-else-if="!books.length" icon="book" tone="emerald" :title="COPY[role].emptyTitle" :message="COPY[role].emptyMessage">
      <button type="button" class="px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700" @click="openCreateModal">Add your first book</button>
    </EmptyState>

    <template v-else>
      <!-- Class tabs: one per class (all-streams books sit under their class) -->
      <nav v-if="classTabs.length > 2" class="flex gap-1.5 mb-4 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-1 [scrollbar-width:none]" aria-label="Classes">
        <button
          v-for="g in classTabs"
          :key="g.name"
          type="button"
          class="flex-shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold border transition-colors"
          :class="activeClassName === g.name
            ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm shadow-emerald-500/20'
            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-emerald-300 dark:hover:border-emerald-700'"
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
            class="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-emerald-600 focus:ring-emerald-500"
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

      <EmptyState v-if="!activeClassSubjectShelves.length" compact icon="book" tone="gray" title="No books match" message="Try another class, subject or status.">
        <button type="button" class="text-sm font-semibold text-emerald-600 dark:text-emerald-300 hover:underline" @click="clearFilters">Clear filters</button>
      </EmptyState>

      <div v-else class="shelf-row flex flex-wrap items-start gap-x-5 gap-y-7">
        <Bookshelf
          v-for="shelf in activeClassSubjectShelves"
          :key="shelf.name"
          :title="shelf.name"
          :count="shelf.books.length"
          spines
        >
          <ShelfSlot
            v-for="book in shelf.books"
            :key="book.id"
            :label="book.title"
            :title="`Updated ${formatDate(book.updated_at || book.created_at)}`"
            @open="previewBook = book"
          >
            <template #cover="{ size }">
              <ShelfBook
                flat
                :size="size"
                :title="book.title"
                :seed="book.id"
                :label="subjectTag(book.subject_name, book.subject_code)"
                :cover-image="book.cover_image" :cover="designOf(book)"
                :author="book.author"
                :pages="book.total_pages"
              />
            </template>
            <ShelfBook
              spine-out
              :selected="bulk.isSelected(book.id)"
              :title="book.title"
              :seed="book.id"
              :label="subjectTag(book.subject_name, book.subject_code)"
              :cover-image="book.cover_image" :cover="designOf(book)"
              :author="book.author"
              :pages="book.total_pages"
            />

            <template #details>
              <label class="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400 cursor-pointer select-none mb-1.5">
                <input
                  type="checkbox"
                  :checked="bulk.isSelected(book.id)"
                  class="w-3.5 h-3.5 rounded border-gray-300 dark:border-gray-600 text-emerald-600 focus:ring-emerald-500"
                  @change="bulk.toggle(book.id)"
                >
                Select
              </label>
              <div class="flex items-center gap-1.5">
                <span class="px-1.5 py-0.5 rounded-full text-[10px] font-semibold" :class="statusChip(book.status)">{{ book.status.charAt(0).toUpperCase() + book.status.slice(1) }}</span>
                <span class="text-[10px] text-gray-400 dark:text-gray-500 truncate">{{ (book.file_type || 'pdf').toUpperCase() }}<template v-if="book.total_pages"> · {{ book.total_pages }} pages</template><template v-if="book.file_size"> · {{ formatFileSize(book.file_size) }}</template></span>
              </div>
              <p class="mt-1 text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug">{{ book.title }}</p>
              <p v-if="book.author" class="text-[11px] italic text-gray-500 dark:text-gray-400 truncate">{{ book.author }}</p>
              <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">{{ audienceLabel(book) }}</p>
              <p v-if="role !== 'teacher' && book.uploader_name" class="text-[11px] text-gray-400 dark:text-gray-500 truncate">By {{ book.uploader_name }}</p>

              <!-- Published: how far the class has got, opening the full list -->
              <template v-if="book.status === 'published'">
                <p v-if="!book.audience" class="mt-1.5 text-[11px] text-gray-400">No students in this class yet</p>
                <button v-else type="button" class="mt-1.5 w-full text-left group/r" title="See who has read it" @click.stop="readersFor = book">
                  <span class="flex items-center gap-2">
                    <span class="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                      <span class="block h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" :style="{ width: reach(book) + '%' }"></span>
                    </span>
                    <span class="text-[11px] font-semibold tabular-nums text-gray-500 dark:text-gray-400">{{ reach(book) }}%</span>
                  </span>
                  <span class="block text-[11px] text-gray-500 dark:text-gray-400 group-hover/r:text-emerald-600 dark:group-hover/r:text-emerald-300">
                    {{ book.readers || 0 }} of {{ book.audience }} opened<template v-if="book.finished"> · {{ book.finished }} finished</template>
                  </span>
                </button>
              </template>
              <p v-else-if="book.status === 'draft'" class="mt-1.5 flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
                Students can't see it yet
                <button type="button" class="font-semibold text-emerald-600 dark:text-emerald-300 hover:underline" @click.stop="publishOne(book)">Publish</button>
              </p>

              <div class="flex items-center -ml-1.5 mt-0.5">
                <button class="p-1.5 min-w-[34px] min-h-[34px] flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Edit" @click.stop="editBook(book)">
                  <AppIcon name="pencil" class="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
                <button class="p-1.5 min-w-[34px] min-h-[34px] flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition-colors" title="Delete" @click.stop="deleteBook(book.id)">
                  <AppIcon name="trash" class="w-4 h-4 text-red-600 dark:text-red-400" />
                </button>
                <span v-if="book.allow_download" class="ml-auto inline-flex items-center gap-1 text-[10px] text-gray-400" title="Students can download this book">
                  <AppIcon name="download" class="w-3.5 h-3.5" /> Downloadable
                </span>
              </div>
            </template>
          </ShelfSlot>
        </Bookshelf>
      </div>

      <!-- The same books as a list: how far each class has got, and quick actions -->
      <section v-if="activeClassBooks.length" class="mt-8">
        <h2 class="text-sm font-bold text-gray-900 dark:text-white mb-2">Who's reading</h2>
        <ul class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
          <li v-for="book in readingList" :key="book.id" class="p-3 flex items-center gap-3">
            <button type="button" class="w-10 h-[53px] flex-shrink-0 overflow-hidden rounded-sm" :title="`Open ${book.title}`" @click="previewBook = book">
              <span class="block origin-top-left scale-[0.43] pointer-events-none">
                <ShelfBook flat size="sm" :title="book.title" :seed="book.id" :label="subjectTag(book.subject_name, book.subject_code)" :cover-image="book.cover_image" :cover="designOf(book)" :author="book.author" :pages="book.total_pages" />
              </span>
            </button>
            <div class="min-w-0 flex-1">
              <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ book.title }}</p>
              <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                {{ book.subject_name }} · {{ audienceLabel(book) }}<template v-if="book.total_pages"> · {{ book.total_pages }} pages</template>
              </p>
              <button v-if="book.status === 'published' && book.audience" type="button" class="mt-1 w-full max-w-sm flex items-center gap-2 group/r" title="See who has read it" @click="readersFor = book">
                <span class="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <span class="block h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" :style="{ width: reach(book) + '%' }"></span>
                </span>
                <span class="text-[11px] whitespace-nowrap text-gray-500 dark:text-gray-400 group-hover/r:text-emerald-600 dark:group-hover/r:text-emerald-300">{{ book.readers || 0 }}/{{ book.audience }} opened<template v-if="book.finished"> · {{ book.finished }} done</template></span>
              </button>
              <p v-else-if="book.status === 'published'" class="mt-1 text-[11px] text-gray-400">No students in this class yet</p>
              <p v-else class="mt-1 flex items-center gap-2 text-[11px]">
                <span class="px-1.5 py-0.5 rounded-full font-semibold" :class="statusChip(book.status)">{{ book.status === 'draft' ? 'Draft' : 'Archived' }}</span>
                <button v-if="book.status === 'draft'" type="button" class="font-semibold text-emerald-600 dark:text-emerald-300 hover:underline" @click="publishOne(book)">Publish</button>
              </p>
            </div>
            <div class="flex items-center flex-shrink-0">
              <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" title="Edit" @click="editBook(book)">
                <AppIcon name="pencil" class="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
              <button class="hidden sm:flex p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40" title="Delete" @click="deleteBook(book.id)">
                <AppIcon name="trash" class="w-4 h-4 text-red-500 dark:text-red-400" />
              </button>
            </div>
          </li>
        </ul>
      </section>
    </template>

    <!-- Upload/Edit Modal -->
    <div v-if="showBookModal" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ editingBook ? 'Edit Book' : 'Upload Resource' }}
          </h3>
          <button @click="closeBookModal" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-6">
          <form @submit.prevent="saveBook">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
              <input
                v-model="bookForm.title"
                type="text"
                required
                placeholder="Enter book/document title..."
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea
                v-model="bookForm.description"
                rows="3"
                placeholder="Enter a short description..."
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              ></textarea>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Author</label>
              <input
                v-model="bookForm.author"
                type="text"
                maxlength="100"
                placeholder="e.g. M. Nelkon (printed on the book's cover)"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
            </div>

            <!-- Book cover (existing books) - the shelf shows this like a real book's cover -->
            <div v-if="editingBook" class="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg p-3 flex items-center gap-4">
              <ShelfBook
                size="sm"
                :title="bookForm.title || editingBook.title"
                :seed="editingBook.id"
                :label="subjectTag(editingBook.subject_name, editingBook.subject_code)"
                :cover-image="editingBook.cover_image"
                :cover="designOf(editingBook)"
                :author="bookForm.author"
                :pages="editingBook.total_pages"
              />
              <div class="min-w-0 flex-1 space-y-2">
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Book cover</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {{ editingBook.cover_design
                    ? 'A cover designed in eSpace.'
                    : editingBook.cover_image
                      ? (isAutoCover(editingBook.cover_image) ? 'Using the first page of the file.' : 'Using your own picture.')
                      : 'No picture - a printed jacket with the title and author is shown.' }}
                </p>
                <div class="flex flex-wrap gap-2">
                  <button type="button" :disabled="coverBusy" class="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50" @click="showCoverEditor = true">
                    <AppIcon name="sparkles" class="w-3.5 h-3.5" />{{ editingBook.cover_design ? 'Edit the design' : 'Design a cover' }}
                  </button>
                  <button type="button" @click="coverFileInput?.click()" :disabled="coverBusy" class="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50">
                    Upload picture
                  </button>
                  <button v-if="editingBook.file_type === 'pdf'" type="button" @click="useFirstPageCover" :disabled="coverBusy" class="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50">
                    Use first page
                  </button>
                  <button v-if="editingBook.cover_image" type="button" @click="removeCover" :disabled="coverBusy" class="px-2.5 py-1.5 text-xs font-medium rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 disabled:opacity-50">
                    Remove
                  </button>
                  <span v-if="coverBusy" class="text-xs text-gray-400 self-center">Working&hellip;</span>
                </div>
                <input ref="coverFileInput" type="file" accept="image/jpeg,image/png,image/webp" class="hidden" @change="onCoverFileSelected">
              </div>
            </div>

            <!-- Book cover (new books) - optional: without one, a PDF's first page becomes the cover -->
            <div v-if="!editingBook" class="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg p-3 flex items-center gap-4">
              <ShelfBook
                size="sm"
                :title="bookForm.title || 'New book'"
                :seed="0"
                :cover-image="newCoverPreview"
                :author="bookForm.author"
              />
              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Book cover</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">{{ newCoverFile ? `Your picture: ${newCoverFile.name}` : 'Optional - choose a picture, or the first page of a PDF becomes the cover.' }}</p>
                <div class="flex flex-wrap gap-2">
                  <button type="button" class="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700" @click="newCoverInput?.click()">{{ newCoverFile ? 'Change picture' : 'Choose a cover picture' }}</button>
                  <button v-if="newCoverFile" type="button" class="px-2.5 py-1.5 text-xs font-medium rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30" @click="setNewCover(null)">Remove</button>
                </div>
                <input ref="newCoverInput" type="file" accept="image/jpeg,image/png,image/webp" class="hidden" @change="setNewCover(($event.target as HTMLInputElement).files?.[0] || null); ($event.target as HTMLInputElement).value = ''">
              </div>
            </div>

            <div v-if="role === 'admin'" class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department *</label>
              <select
                v-model="bookForm.department_id"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                @change="onFormDepartmentChange"
              >
                <option value="">Select Department</option>
                <option v-for="d in libOptions?.departments || []" :key="d.id" :value="String(d.id)">{{ d.name }}</option>
              </select>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject *</label>
                <select
                  v-model="bookForm.subject_id"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  :disabled="!subjectChoices.length"
                >
                  <option value="">Select Subject</option>
                  <option v-for="subject in subjectChoices" :key="subject.id" :value="String(subject.id)">{{ subject.name }}</option>
                </select>
                <p v-if="!subjectChoices.length" class="text-xs text-red-600 dark:text-red-400 mt-1">
                  {{ role === 'admin' ? (bookForm.department_id ? 'This department has no subjects yet.' : 'Choose the department first.') : 'No subjects available. Please ensure you are assigned to a department with subjects.' }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ role === 'teacher' ? 'Class *' : 'Who is it for? *' }}</label>
                <TeacherClassSelector v-if="role === 'teacher'" v-model="bookForm.classTarget" />
                <DepartmentAudiencePicker v-else v-model="bookForm.classTarget" :levels="formDepartment?.levels || []" :disabled="!formDepartment" />
                <p v-if="formDepartment && missingLevels.length" class="mt-1 text-[11px] text-amber-700 dark:text-amber-300">
                  No {{ missingLevels.join(', ') }} learners are enrolled in {{ formDepartment.name }} yet{{ role === 'admin' ? ' - enrol them (Dashboard → Enrol students) and those classes appear here' : '' }}.
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                <select
                  v-model="bookForm.status"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <label class="flex items-center gap-2 mt-7 px-3 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer h-fit">
                <input v-model="bookForm.allow_download" type="checkbox" class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                <span class="text-sm text-gray-700 dark:text-gray-300">Allow students to download this file</span>
              </label>
            </div>

            <div v-if="!editingBook" class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">File *</label>
              <label
                class="flex flex-col items-center justify-center gap-2 px-4 py-6 rounded-xl border-2 border-dashed cursor-pointer text-center transition-colors"
                :class="dragging ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : bookForm.file ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50/60 dark:bg-emerald-900/10' : 'border-gray-300 dark:border-gray-600 hover:border-emerald-400 dark:hover:border-emerald-600'"
                @dragover.prevent="dragging = true"
                @dragleave.prevent="dragging = false"
                @drop.prevent="onDrop"
              >
                <input type="file" :accept="LIBRARY_FILE_ACCEPT" class="sr-only" @change="handleFileSelect">
                <span class="w-11 h-11 rounded-xl flex items-center justify-center bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300">
                  <AppIcon :name="bookForm.file ? 'book' : 'upload'" class="w-5 h-5" />
                </span>
                <template v-if="bookForm.file">
                  <span class="text-sm font-semibold text-gray-900 dark:text-white break-all">{{ bookForm.file.name }}</span>
                  <span class="text-xs text-gray-500 dark:text-gray-400">{{ formatFileSize(bookForm.file.size) }} · tap to choose another</span>
                </template>
                <template v-else>
                  <span class="text-sm font-semibold text-gray-900 dark:text-white">Drop a file here, or tap to choose</span>
                  <span class="text-xs text-gray-500 dark:text-gray-400">PDF, PPT or PPTX, up to 50MB - students read it in the browser</span>
                </template>
              </label>
              <p v-if="fileError" class="text-xs text-red-600 dark:text-red-400 mt-1">{{ fileError }}</p>
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
            <div v-else class="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
              <div class="flex items-center justify-between gap-3">
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Current file: <span class="font-medium text-gray-700 dark:text-gray-300 uppercase">{{ editingBook.file_type }}</span>
                  <span v-if="editingBook.file_size"> &middot; {{ formatFileSize(editingBook.file_size) }}</span>
                </p>
                <button
                  type="button"
                  @click="showReplaceFile = !showReplaceFile"
                  class="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex-shrink-0"
                >
                  {{ showReplaceFile ? 'Cancel' : 'Replace File' }}
                </button>
              </div>
              <div v-if="showReplaceFile" class="mt-3">
                <input
                  type="file"
                  :accept="LIBRARY_FILE_ACCEPT"
                  @change="handleReplaceFileSelect"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white text-sm"
                >
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">PDF, PPT, or PPTX, up to 50MB. Replaces the file immediately - metadata below is saved separately via "Update Book".</p>
                <p v-if="fileError" class="text-xs text-red-600 dark:text-red-400 mt-1">{{ fileError }}</p>
                <button
                  type="button"
                  @click="replaceFile"
                  :disabled="!replaceFileInput || replacingFile"
                  class="mt-2 px-3 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ replacingFile ? (replaceProgress > 0 ? `Uploading... ${replaceProgress}%` : 'Uploading...') : 'Upload Replacement' }}
                </button>
                <div v-if="replacingFile && replaceProgress > 0" class="mt-2">
                  <div class="h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                    <div class="h-full rounded-full bg-indigo-600 transition-all duration-150" :style="{ width: replaceProgress + '%' }"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex justify-end space-x-3">
              <button
                type="button"
                @click="closeBookModal"
                class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ saving ? (uploadProgress > 0 ? `Uploading... ${uploadProgress}%` : 'Saving...') : (editingBook ? 'Update Book' : 'Upload') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Document Preview -->
    <LibraryCoverEditor
      v-if="showCoverEditor && editingBook"
      :book="editingBook"
      :api="libApi"
      :label="subjectTag(editingBook.subject_name, editingBook.subject_code)"
      @close="showCoverEditor = false"
      @saved="onDesignSaved"
    />
    <LibraryDocumentViewer v-if="previewBook" :book="previewBook" @close="previewBook = null" />
    <AudiencePanel
      v-if="readersFor"
      :title="readersFor.title"
      :subtitle="`${audienceLabel(readersFor)} · ${readersFor.subject_name || ''}`"
      :endpoint="`${libApi}/${readersFor.id}/readers`"
      icon="book"
      verb="read"
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
import LibraryDocumentViewer from '@/components/library/LibraryDocumentViewer.vue'
import LibraryCoverEditor from '@/components/library/LibraryCoverEditor.vue'
import { parseCoverDesign } from '@/utils/enoteCover'
import TeacherClassSelector from '@/components/teacher/TeacherClassSelector.vue'
import DepartmentAudiencePicker, { type AudienceLevel } from '@/components/library/DepartmentAudiencePicker.vue'
import { useAuthStore } from '@/stores/auth'
import BulkActionBar from '@/components/common/BulkActionBar.vue'
import Bookshelf from '@/components/library/Bookshelf.vue'
import ShelfBook from '@/components/library/ShelfBook.vue'
import ShelfSlot from '@/components/library/ShelfSlot.vue'
import { renderPdfCover } from '@/utils/pdfCover'
import { subjectTag } from '@/utils/subjectTag'
import { orderShelves } from '@/utils/shelfOrder'
import { resolveAssetUrl } from '@/utils/url'
import type { LibraryBook, LibraryBookForm } from '@/types/library'
import type { ENoteAssignments } from '@/types/enotes'
import { LIBRARY_FILE_ACCEPT, LIBRARY_FILE_ERROR, isAllowedLibraryFile } from '@/utils/libraryFileValidation'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'
import { useBulkSelection } from '@/composables/useBulkSelection'
import { usePersistedRef } from '@/composables/usePersistedRef'
import { downloadBlob } from '@/utils/downloadBlob'

const toast = useToastStore()
const confirmDialog = useConfirmStore()
const bulk = useBulkSelection<number>()

const API_BASE = '/api'

// The same shelves for a teacher (their own books), a HOD (the department's) and an admin (the
// school's, uploading into any department)
const authStore = useAuthStore()
const role: 'teacher' | 'hod' | 'admin' = authStore.userRole === 'hod' ? 'hod' : authStore.userRole === 'teacher' ? 'teacher' : 'admin'
const libApi = `${API_BASE}/${role}/library`
const COPY = {
  teacher: { description: 'Textbooks, notes and slides for your classes - students read them right in eSpace.', emptyTitle: 'Your shelves are empty', emptyMessage: 'Add a PDF or PowerPoint - a textbook, revision notes, slides - and students read it in the browser. The first page becomes its cover.' },
  hod: { description: "Your department's books - yours and your teachers' - for the whole department, a class or one stream.", emptyTitle: "The department's shelves are empty", emptyMessage: 'Add a textbook or set of notes for the whole department, every stream of a class, or a single stream. The first page becomes its cover.' },
  admin: { description: "The school's books, in every department - upload one and choose the department and who it's for.", emptyTitle: "The school's shelves are empty", emptyMessage: "Add a textbook for a department - the whole department, every stream of a class, or one stream. Teachers' books show up here too." }
}

interface LibraryOptions { departments: { id: number; name: string; code: string; subjects: { id: number; name: string; code: string }[]; levels: AudienceLevel[] }[]; all_levels?: string[] }
const libOptions = ref<LibraryOptions | null>(null)
const loadLibraryOptions = async () => {
  try {
    const response = await axios.get(`${libApi}/options`)
    libOptions.value = response.data.data
  } catch {
    assignmentsError.value = 'Could not load departments and classes'
  }
}

const books = ref<LibraryBook[]>([])
const assignments = ref<ENoteAssignments | null>(null)
const assignmentsError = ref<string | null>(null)
const loading = ref(false)
const saving = ref(false)
const uploadProgress = ref(0)
const fileError = ref('')
const showReplaceFile = ref(false)
const replaceFileInput = ref<File | null>(null)
const replacingFile = ref(false)
const replaceProgress = ref(0)

const statusFilter = usePersistedRef<string | null>(`${role}-library:status`, null)
const subjectFilter = usePersistedRef<string>(`${role}-library:subject`, '')
const departmentFilter = usePersistedRef<string>(`${role}-library:department`, '')
const search = ref('')
const dragging = ref(false)
const readersFor = ref<LibraryBook | null>(null)

const showBookModal = ref(false)
const editingBook = ref<LibraryBook | null>(null)
const previewBook = ref<LibraryBook | null>(null)
const bookForm = ref<LibraryBookForm>({
  title: '',
  description: '',
  subject_id: '',
  classTarget: { scope: 'stream', class_id: null, class_group_name: null },
  status: 'draft',
  allow_download: false,
  author: '',
  file: null
})

const stats = computed(() => ({
  total: books.value.length,
  draft: books.value.filter(b => b.status === 'draft').length,
  published: books.value.filter(b => b.status === 'published').length,
  archived: books.value.filter(b => b.status === 'archived').length
}))

const statItems = computed<StatItem[]>(() => [
  { label: 'All books', value: stats.value.total, tone: 'gray' },
  { label: 'Published', value: stats.value.published, key: 'published', tone: 'emerald' },
  { label: 'Draft', value: stats.value.draft, key: 'draft', tone: 'amber' },
  { label: 'Archived', value: stats.value.archived, key: 'archived', tone: 'gray' }
])
// A teacher's subjects; for a HOD or admin, the subjects their books are in
const subjectOptions = computed<PickerOption<string>[]>(() => {
  const subjects = role === 'teacher'
    ? (assignments.value?.subjects ?? []).map(s => ({ id: s.id, name: s.name }))
    : [...new Map(books.value.filter(b => b.subject_id && (!departmentFilter.value || String(b.department_id) === departmentFilter.value)).map(b => [b.subject_id, { id: b.subject_id as number, name: b.subject_name || '' }])).values()].sort((a, b) => a.name.localeCompare(b.name))
  return [{ value: '', label: 'All subjects' }, ...subjects.map(s => ({ value: String(s.id), label: s.name }))]
})
const departmentOptions = computed<PickerOption<string>[]>(() => [
  { value: '', label: 'All departments' },
  ...(libOptions.value?.departments ?? []).map(d => ({ value: String(d.id), label: d.name }))
])
const activeFilterCount = computed(() => (subjectFilter.value ? 1 : 0) + (departmentFilter.value ? 1 : 0) + (search.value.trim() ? 1 : 0))

// The upload form: which department's subjects and classes to offer
const formDepartment = computed(() => {
  const deps = libOptions.value?.departments ?? []
  return role === 'hod' ? deps[0] || null : deps.find(d => String(d.id) === bookForm.value.department_id) || null
})
// Class levels the school has that this department has no learners in (so they can't be chosen)
const missingLevels = computed(() => {
  const have = new Set((formDepartment.value?.levels ?? []).map(l => l.name))
  return (libOptions.value?.all_levels ?? []).filter(n => !have.has(n))
})
const subjectChoices = computed(() => (role === 'teacher' ? assignments.value?.subjects ?? [] : formDepartment.value?.subjects ?? []))
const onFormDepartmentChange = () => {
  bookForm.value.subject_id = ''
  bookForm.value.classTarget = { scope: 'department', class_id: null, class_group_name: null }
}

const filteredBooks = computed(() => {
  const q = search.value.trim().toLowerCase()
  return books.value.filter(book => {
    const matchesStatus = !statusFilter.value || book.status === statusFilter.value
    const matchesSubject = !subjectFilter.value || book.subject_id === parseInt(subjectFilter.value)
    if (departmentFilter.value && String(book.department_id) !== departmentFilter.value) return false
    const matchesSearch = !q || [book.title, book.author, book.description].some(t => (t || '').toLowerCase().includes(q))
    return matchesStatus && matchesSubject && matchesSearch
  })
})

// One tab per class ("All Streams" books under their class), then one shelf per subject.
// A class is always open - the last one used, or the first - with "All" beside them.
const ALL = '__all'
const classOf = (book: LibraryBook) => book.class_group_name || book.class_name || 'Whole department'
const activeClassName = usePersistedRef<string>(`${role}-library:class`, '')
const classTabs = computed(() => {
  const names = [...new Set(books.value.map(classOf))].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  return [
    { name: ALL, label: 'All classes', count: filteredBooks.value.length },
    ...names.map(name => ({ name, label: name, count: filteredBooks.value.filter(b => classOf(b) === name).length }))
  ]
})
watch(classTabs, (tabs) => {
  if (!books.value.length) return
  if (!tabs.some(t => t.name === activeClassName.value)) activeClassName.value = tabs[1]?.name ?? ALL
}, { immediate: true })

const activeClassBooks = computed(() => activeClassName.value === ALL
  ? filteredBooks.value
  : filteredBooks.value.filter(b => classOf(b) === activeClassName.value))

// Published first, the least-read on top - that's where a nudge helps most
const readingList = computed(() => [...activeClassBooks.value].sort((a, b) =>
  (a.status === 'published' ? 0 : 1) - (b.status === 'published' ? 0 : 1) || reach(a) - reach(b)))

const audienceLabel = (book: LibraryBook) => {
  const who = book.class_group_name
    ? `${book.class_group_name} (All Streams)`
    : book.class_stream_name ? `${book.class_name}-${book.class_stream_name}` : (book.class_name || 'Whole department')
  return role === 'admin' && book.department_name && book.department_name !== book.subject_name ? `${book.department_name} · ${who}` : who
}
// Share of the class that has opened it
const reach = (book: LibraryBook) => book.audience ? Math.min(100, Math.round(((book.readers || 0) / book.audience) * 100)) : 0
const statusChip = (status: string) => status === 'published'
  ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200'
  : status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'

const activeClassSubjectShelves = computed(() => {
  const map = new Map<string, LibraryBook[]>()
  activeClassBooks.value.forEach(book => {
    const name = book.subject_name || 'Other'
    if (!map.has(name)) map.set(name, [])
    map.get(name)!.push(book)
  })
  return orderShelves(Array.from(map, ([name, books]) => ({ name, books })), g => g.books)
})

const visibleIds = computed(() => activeClassBooks.value.map(b => b.id))

const bulkSetStatus = async (status: 'draft' | 'published' | 'archived') => {
  const ids = bulk.selectedArray()
  if (ids.length === 0) return
  try {
    await axios.post(`${libApi}/bulk-status`, { ids, status })
    toast.success(`${ids.length} resource(s) updated`)
    bulk.clear()
    await loadBooks()
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to update resources')
  }
}

// Downloading (and saving for offline reading) is off unless the teacher allows it
const bulkSetDownload = async (allow: boolean) => {
  const ids = bulk.selectedArray()
  if (ids.length === 0) return
  try {
    await axios.post(`${libApi}/bulk-download`, { ids, allow })
    toast.success(`${ids.length} resource(s) ${allow ? 'can now be downloaded' : 'no longer downloadable'}`)
    bulk.clear()
    await loadBooks()
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to update resources')
  }
}

const publishOne = async (book: LibraryBook) => {
  try {
    await axios.post(`${libApi}/bulk-status`, { ids: [book.id], status: 'published' })
    toast.success(`"${book.title}" is now on your students' shelves`)
    await loadBooks()
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to publish book')
  }
}

const bulkDeleteSelected = async () => {
  const ids = bulk.selectedArray()
  if (ids.length === 0) return
  if (!await confirmDialog.open({ title: 'Delete resources', message: `Are you sure you want to delete ${ids.length} resource(s)? This cannot be undone.`, confirmLabel: 'Delete', danger: true })) return
  try {
    await axios.post(`${libApi}/bulk-delete`, { ids })
    toast.success(`${ids.length} resource(s) deleted`)
    bulk.clear()
    await loadBooks()
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to delete resources')
  }
}

const bulkExport = async () => {
  const ids = bulk.selectedArray()
  try {
    const response = await axios.post(`${libApi}/bulk-export`, { ids }, { responseType: 'blob' })
    downloadBlob(response.data, 'library.csv')
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

const loadBooks = async () => {
  try {
    loading.value = true
    const response = await axios.get(`${libApi}`)
    if (response.data.success) {
      books.value = response.data.data.books || []
      generateMissingCovers()
    }
  } catch (error) {
    console.error('Failed to load library:', error)
  } finally {
    loading.value = false
  }
}

// ---- Book covers ----
// Every PDF gets its real first page as its shelf cover, rendered here in the teacher's browser
// (the server has no PDF renderer) and uploaded once. Runs quietly in the background, one book at
// a time, only for PDFs that don't have a cover yet; each book is tried at most once per visit.
const isAutoCover = (path?: string | null) => !!path && /\/auto_[^/]*$/.test(path)
const coverAttempted = new Set<number>()
let generatingCovers = false

const uploadCover = async (bookId: number, blob: Blob, auto: boolean, totalPages?: number) => {
  const data = new FormData()
  data.append('cover', blob, auto ? 'first-page.jpg' : 'cover')
  data.append('auto', auto ? '1' : '0')
  if (totalPages) data.append('total_pages', String(totalPages))
  const response = await axios.post(`${libApi}/${bookId}/cover`, data)
  const coverImage: string = response.data.data.cover_image
  for (const target of [books.value.find(b => b.id === bookId), editingBook.value?.id === bookId ? editingBook.value : null]) {
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
      const book = books.value.find(b => b.file_type === 'pdf' && !b.cover_image && !coverAttempted.has(b.id))
      if (!book) break
      coverAttempted.add(book.id)
      try {
        const { blob, totalPages } = await renderPdfCover(resolveAssetUrl(book.file_path))
        await uploadCover(book.id, blob, true, totalPages)
      } catch (error) {
        console.warn(`Could not create a cover for book ${book.id}:`, error)
      }
    }
  } finally {
    generatingCovers = false
  }
}

const coverFileInput = ref<HTMLInputElement | null>(null)
const coverBusy = ref(false)

// ---- Designed covers ----
const showCoverEditor = ref(false)
const designOf = (book: LibraryBook) => parseCoverDesign(book.cover_design)
const setDesign = (id: number, design: string | null) => {
  for (const target of [books.value.find(b => b.id === id), editingBook.value?.id === id ? editingBook.value : null]) {
    if (target) target.cover_design = design
  }
}
const onDesignSaved = (design: string | null) => {
  if (editingBook.value) setDesign(editingBook.value.id, design)
  showCoverEditor.value = false
  toast.success(design ? 'Cover saved' : 'Back to the picture cover')
}
// Choosing a picture cover means the picture shows - a design would otherwise stay on top
const dropDesign = async () => {
  const book = editingBook.value
  if (!book?.cover_design) return
  await axios.put(`${libApi}/${book.id}`, { cover_design: null })
  setDesign(book.id, null)
}

const onCoverFileSelected = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file || !editingBook.value) return
  coverBusy.value = true
  try {
    await uploadCover(editingBook.value.id, file, false)
    await dropDesign()
    toast.success('Cover updated')
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Could not upload that picture')
  } finally {
    coverBusy.value = false
  }
}

const useFirstPageCover = async () => {
  if (!editingBook.value) return
  coverBusy.value = true
  try {
    const { blob, totalPages } = await renderPdfCover(resolveAssetUrl(editingBook.value.file_path))
    // A deliberate choice, so it replaces a custom picture too: clear first, then upload as auto
    if (editingBook.value.cover_image && !isAutoCover(editingBook.value.cover_image)) {
      await axios.delete(`${libApi}/${editingBook.value.id}/cover`)
    }
    await uploadCover(editingBook.value.id, blob, true, totalPages)
    await dropDesign()
    toast.success('Cover set to the first page')
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Could not read the first page of this file')
  } finally {
    coverBusy.value = false
  }
}

const removeCover = async () => {
  if (!editingBook.value) return
  coverBusy.value = true
  try {
    await axios.delete(`${libApi}/${editingBook.value.id}/cover`)
    const id = editingBook.value.id
    editingBook.value.cover_image = null
    const listed = books.value.find(b => b.id === id)
    if (listed) listed.cover_image = null
    // Don't let the background generator immediately put the first page back
    coverAttempted.add(id)
    await dropDesign()
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
  editingBook.value = null
  fileError.value = ''
  showReplaceFile.value = false
  replaceFileInput.value = null
  // The subject on view is the likely one
  bookForm.value = {
    title: '', description: '', subject_id: subjectFilter.value,
    department_id: role === 'admin' ? departmentFilter.value : '',
    classTarget: role === 'teacher' ? { scope: 'stream', class_id: null, class_group_name: null } : { scope: 'department', class_id: null, class_group_name: null },
    status: 'draft', allow_download: false, author: '', file: null
  }
  showBookModal.value = true
}

const editBook = (book: LibraryBook) => {
  editingBook.value = book
  fileError.value = ''
  showReplaceFile.value = false
  replaceFileInput.value = null
  bookForm.value = {
    title: book.title,
    description: book.description || '',
    subject_id: book.subject_id?.toString() || '',
    department_id: book.department_id ? String(book.department_id) : '',
    classTarget: book.class_group_name
      ? { scope: 'all_streams', class_id: null, class_group_name: book.class_group_name }
      : book.class_id ? { scope: 'stream', class_id: book.class_id, class_group_name: null } : { scope: 'department', class_id: null, class_group_name: null },
    status: book.status,
    allow_download: !!book.allow_download,
    author: book.author || '',
    file: null
  }
  showBookModal.value = true
}

// A cover picture chosen while adding a book, shown on the little book beside it
const newCoverInput = ref<HTMLInputElement | null>(null)
const newCoverFile = ref<File | null>(null)
const newCoverPreview = ref<string | null>(null)
const setNewCover = (file: File | null) => {
  if (newCoverPreview.value) URL.revokeObjectURL(newCoverPreview.value)
  if (file && !/^image\/(jpeg|png|webp)$/.test(file.type)) {
    toast.warning('Choose a JPG, PNG or WebP picture')
    file = null
  }
  newCoverFile.value = file
  newCoverPreview.value = file ? URL.createObjectURL(file) : null
}

const closeBookModal = () => {
  setNewCover(null)
  showBookModal.value = false
  editingBook.value = null
}

// A chosen file names the book too, if the teacher hasn't typed a title yet
const pickFile = (file: File | null) => {
  if (file && !isAllowedLibraryFile(file)) {
    fileError.value = LIBRARY_FILE_ERROR
    bookForm.value.file = null
    return false
  }
  fileError.value = ''
  bookForm.value.file = file
  if (file && !bookForm.value.title.trim()) {
    bookForm.value.title = file.name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').trim()
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

const handleReplaceFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0] || null
  if (file && !isAllowedLibraryFile(file)) {
    fileError.value = LIBRARY_FILE_ERROR
    replaceFileInput.value = null
    target.value = ''
    return
  }
  fileError.value = ''
  replaceFileInput.value = file
}

const replaceFile = async () => {
  if (!editingBook.value || !replaceFileInput.value) return
  try {
    replacingFile.value = true
    replaceProgress.value = 0
    const formData = new FormData()
    formData.append('file', replaceFileInput.value)

    const response = await axios.post(`${libApi}/${editingBook.value.id}/replace-file`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (e) => {
        if (e.total) replaceProgress.value = Math.round((e.loaded * 100) / e.total)
      }
    })

    if (response.data.success) {
      editingBook.value = { ...editingBook.value, ...response.data.data }
      showReplaceFile.value = false
      replaceFileInput.value = null
      coverAttempted.delete(editingBook.value!.id)
      await loadBooks()
      const refreshed = books.value.find(b => b.id === editingBook.value?.id)
      if (refreshed && editingBook.value) editingBook.value.cover_image = refreshed.cover_image
    }
  } catch (error: any) {
    console.error('Failed to replace file:', error)
    fileError.value = error.response?.data?.message || 'Failed to replace file'
  } finally {
    replacingFile.value = false
    replaceProgress.value = 0
  }
}

const saveBook = async () => {
  try {
    saving.value = true
    uploadProgress.value = 0

    if (editingBook.value) {
      await axios.put(`${libApi}/${editingBook.value.id}`, {
        title: bookForm.value.title,
        description: bookForm.value.description,
        subject_id: bookForm.value.subject_id,
        ...(role === 'admin' ? { department_id: bookForm.value.department_id } : {}),
        scope: bookForm.value.classTarget.scope,
        class_id: bookForm.value.classTarget.class_id,
        class_group_name: bookForm.value.classTarget.class_group_name,
        status: bookForm.value.status,
        allow_download: bookForm.value.allow_download,
        author: bookForm.value.author
      })
    } else {
      if (!bookForm.value.file) {
        toast.warning('Please select a PDF, PPT, or PPTX file')
        return
      }
      const formData = new FormData()
      formData.append('title', bookForm.value.title)
      formData.append('description', bookForm.value.description)
      formData.append('subject_id', bookForm.value.subject_id)
      if (role === 'admin') formData.append('department_id', bookForm.value.department_id || '')
      formData.append('scope', bookForm.value.classTarget.scope)
      if (bookForm.value.classTarget.class_id !== null) formData.append('class_id', String(bookForm.value.classTarget.class_id))
      if (bookForm.value.classTarget.class_group_name !== null) formData.append('class_group_name', bookForm.value.classTarget.class_group_name)
      formData.append('status', bookForm.value.status)
      formData.append('allow_download', bookForm.value.allow_download ? '1' : '0')
      formData.append('author', bookForm.value.author)
      formData.append('file', bookForm.value.file)

      const created = await axios.post(`${libApi}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          if (e.total) uploadProgress.value = Math.round((e.loaded * 100) / e.total)
        }
      })
      // The cover picture chosen with it (the book has to exist first)
      const newId = created.data?.data?.id
      if (newId && newCoverFile.value) {
        coverAttempted.add(newId)
        try {
          await uploadCover(newId, newCoverFile.value, false)
        } catch {
          toast.warning('The book was added, but its cover picture could not be saved - set it with Edit')
        }
      }
    }

    closeBookModal()
    await loadBooks()
  } catch (error: any) {
    console.error('Failed to save book:', error)
    toast.error(error.response?.data?.message || 'Failed to save book')
  } finally {
    saving.value = false
    uploadProgress.value = 0
  }
}

const deleteBook = async (id: number) => {
  if (!await confirmDialog.open({ title: 'Delete book', message: 'Are you sure you want to delete this book?', confirmLabel: 'Delete', danger: true })) return
  try {
    await axios.delete(`${libApi}/${id}`)
    await loadBooks()
    toast.success('Book deleted')
  } catch (error) {
    console.error('Failed to delete book:', error)
    toast.error('Failed to delete book. Please try again.')
  }
}

onMounted(async () => {
  await Promise.all([loadBooks(), role === 'teacher' ? loadAssignments() : loadLibraryOptions()])
})
</script>
