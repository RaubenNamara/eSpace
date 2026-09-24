<template>
  <div>
    <!-- Header - icon and title share a row with the filters/action, so the dropdowns line up
         exactly with the heading instead of floating above it; the subtitle drops to its own
         full-width line underneath. -->
    <div class="flex items-center gap-2 mb-1">
      <div class="flex items-center gap-2 flex-shrink-0">
        <div class="hidden sm:flex w-7 h-7 rounded-lg bg-indigo-600 items-center justify-center flex-shrink-0">
          <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <h1 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight whitespace-nowrap">eLibrary</h1>
      </div>

      <div class="flex items-center gap-2 min-w-0">
        <div class="flex flex-nowrap items-center gap-2 overflow-x-auto -mx-1 px-1 sm:mx-0 sm:px-0 min-w-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <select v-model="statusFilter" class="flex-shrink-0 max-w-[92px] truncate px-2.5 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
            <option value="">Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>

          <select
            v-model="subjectFilter"
            class="flex-shrink-0 max-w-[92px] truncate px-2.5 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            :disabled="!assignments?.subjects || assignments.subjects.length === 0"
          >
            <option value="">Subjects</option>
            <option v-for="subject in assignments?.subjects" :key="subject.id" :value="subject.id">{{ subject.name }}</option>
          </select>

          <select
            v-model="classFilter"
            class="flex-shrink-0 max-w-[92px] truncate px-2.5 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            :disabled="!assignments?.classes || assignments.classes.length === 0"
          >
            <option value="">Classes</option>
            <option v-for="cls in assignments?.classes" :key="cls.id" :value="cls.id">
              {{ cls.name }} ({{ cls.level }}{{ cls.stream_name ? ' - ' + cls.stream_name : '' }})
            </option>
          </select>

          <div v-if="assignmentsError" class="flex-shrink-0 text-red-600 dark:text-red-400 text-xs whitespace-nowrap">{{ assignmentsError }}</div>
        </div>

        <button
          v-if="books.length > 0"
          @click="openCreateModal"
          class="flex-shrink-0 px-2.5 py-1 text-xs bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1.5 shadow-sm shadow-indigo-500/20 whitespace-nowrap"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          <span class="sm:hidden">Upload</span><span class="hidden sm:inline">Upload Resource</span>
        </button>
      </div>
    </div>
    <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">Upload PDF or PowerPoint (PPT/PPTX) resources for your classes - students preview them in the browser.</p>

    <!-- Stats - clickable to filter the list below; the count sits as a corner badge so each
         card is shorter and the label can be centered. -->
    <div class="grid grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
      <button
        @click="statusFilter = ''"
        class="relative bg-white dark:bg-gray-800 rounded-xl px-1 py-2 sm:p-4 shadow-sm border transition-shadow hover:shadow-md text-center"
        :class="statusFilter === '' ? 'border-indigo-300 dark:border-indigo-700 ring-1 ring-indigo-100 dark:ring-indigo-900/30' : 'border-gray-200 dark:border-gray-700'"
      >
        <span class="block sm:absolute sm:top-2 sm:right-3 text-base sm:text-lg font-bold leading-tight text-gray-900 dark:text-white">{{ stats.total }}</span>
        <p class="text-[11px] sm:text-sm text-gray-500 dark:text-gray-400"><span class="sm:hidden">Total</span><span class="hidden sm:inline">Total Books</span></p>
      </button>
      <button
        @click="statusFilter = 'draft'"
        class="relative bg-white dark:bg-gray-800 rounded-xl px-1 py-2 sm:p-4 shadow-sm border transition-shadow hover:shadow-md text-center"
        :class="statusFilter === 'draft' ? 'border-yellow-300 dark:border-yellow-700 ring-1 ring-yellow-100 dark:ring-yellow-900/30' : 'border-gray-200 dark:border-gray-700'"
      >
        <span class="block sm:absolute sm:top-2 sm:right-3 text-base sm:text-lg font-bold leading-tight text-yellow-600 dark:text-yellow-400">{{ stats.draft }}</span>
        <p class="text-[11px] sm:text-sm text-gray-500 dark:text-gray-400">Draft</p>
      </button>
      <button
        @click="statusFilter = 'published'"
        class="relative bg-white dark:bg-gray-800 rounded-xl px-1 py-2 sm:p-4 shadow-sm border transition-shadow hover:shadow-md text-center"
        :class="statusFilter === 'published' ? 'border-green-300 dark:border-green-700 ring-1 ring-green-100 dark:ring-green-900/30' : 'border-gray-200 dark:border-gray-700'"
      >
        <span class="block sm:absolute sm:top-2 sm:right-3 text-base sm:text-lg font-bold leading-tight text-green-600 dark:text-green-400">{{ stats.published }}</span>
        <p class="text-[11px] sm:text-sm text-gray-500 dark:text-gray-400">Published</p>
      </button>
      <button
        @click="statusFilter = 'archived'"
        class="relative bg-white dark:bg-gray-800 rounded-xl px-1 py-2 sm:p-4 shadow-sm border transition-shadow hover:shadow-md text-center"
        :class="statusFilter === 'archived' ? 'border-gray-400 dark:border-gray-500 ring-1 ring-gray-200 dark:ring-gray-700' : 'border-gray-200 dark:border-gray-700'"
      >
        <span class="block sm:absolute sm:top-2 sm:right-3 text-base sm:text-lg font-bold leading-tight text-gray-600 dark:text-gray-400">{{ stats.archived }}</span>
        <p class="text-[11px] sm:text-sm text-gray-500 dark:text-gray-400">Archived</p>
      </button>
    </div>

    <!-- Books -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      <p class="mt-4 text-gray-600 dark:text-gray-400">Loading library...</p>
    </div>

    <div v-else-if="filteredBooks.length === 0" class="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
      <p class="text-gray-600 dark:text-gray-400 mb-4">{{ books.length === 0 ? 'No resources uploaded yet' : 'No books match your filters' }}</p>
      <button v-if="books.length === 0" @click="openCreateModal" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
        Upload Your First Resource
      </button>
      <button v-else @click="clearFilters" class="px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
        Clear filters
      </button>
    </div>

    <!-- Browse by Class: one docket per class -->
    <template v-else-if="!activeClassName">
      <h2 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">Browse by Class</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        <button
          v-for="group in classGroups"
          :key="group.name"
          @click="activeClassName = group.name"
          class="text-left bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 p-5 sm:p-6 group overflow-hidden relative"
        >
          <div
            class="absolute -right-6 -top-6 w-28 h-28 rounded-full opacity-10 transition-transform duration-300 group-hover:scale-125"
            :class="classPalette(group.name).solid"
          ></div>
          <div
            class="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-white shadow-sm flex-shrink-0 mb-3 sm:mb-4"
            :class="classPalette(group.name).solid"
          >
            <svg class="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <h3 class="relative text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {{ group.name }}
          </h3>
          <span
            class="relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
            :class="classPalette(group.name).softText"
          >
            {{ group.books.length }} {{ group.books.length === 1 ? 'book' : 'books' }}
          </span>
        </button>
      </div>
    </template>

    <!-- Class bookcase: one shelf per subject -->
    <template v-else>
      <div class="flex items-center gap-2 mb-4">
        <button
          @click="activeClassName = null"
          class="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          All Classes
        </button>
        <span class="text-gray-300 dark:text-gray-600">/</span>
        <span class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ activeClassName }}</span>
      </div>

      <div class="flex items-center gap-2 mb-3">
        <label class="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 cursor-pointer select-none">
          <input
            type="checkbox"
            :checked="bulk.allSelected(visibleIds)"
            @change="bulk.toggleAll(visibleIds)"
            class="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
          >
          Select all
        </label>
      </div>

      <BulkActionBar :count="bulk.selectedCount.value" @clear="bulk.clear()">
        <button @click="bulkSetStatus('published')" class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Publish</button>
        <button @click="bulkSetStatus('draft')" class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Draft</button>
        <button @click="bulkSetStatus('archived')" class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Archive</button>
        <button @click="bulkExport" class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">Export CSV</button>
        <button @click="bulkDeleteSelected" class="px-2.5 py-1 min-h-[32px] text-xs font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors">Delete</button>
      </BulkActionBar>

      <div v-if="activeClassSubjectShelves.length === 0" class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <p class="text-gray-500 dark:text-gray-400">No books in this class match these filters.</p>
      </div>

      <div v-else class="grid gap-x-5 gap-y-7 md:grid-cols-2 xl:grid-cols-3">
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
              <ShelfBook flat :size="size"
              :title="book.title"
              :seed="book.id"
              :label="subjectTag(book.subject_name, book.subject_code)"
              :cover-image="book.cover_image"
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
              :cover-image="book.cover_image"
              :author="book.author"
              :pages="book.total_pages"
            />

            <template #details>
              <label class="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400 cursor-pointer select-none mb-1.5">
                <input
                  type="checkbox"
                  :checked="bulk.isSelected(book.id)"
                  @change="bulk.toggle(book.id)"
                  class="w-3.5 h-3.5 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
                >
                Select
              </label>
            <div class="flex items-center gap-1.5">
              <span
                class="px-1.5 py-0.5 rounded-full text-[10px] font-semibold"
                :class="book.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  book.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'"
              >
                {{ book.status.charAt(0).toUpperCase() + book.status.slice(1) }}
              </span>
              <span class="text-[10px] text-gray-400 dark:text-gray-500 truncate">{{ (book.file_type || 'pdf').toUpperCase() }} &middot; {{ formatFileSize(book.file_size) }}</span>
            </div>
            <p class="mt-1 text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug">{{ book.title }}</p>
            <p v-if="book.author" class="text-[11px] italic text-gray-500 dark:text-gray-400 truncate">{{ book.author }}</p>
            <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">
              {{ book.class_group_name ? `${book.class_group_name} (All Streams)` : book.class_stream_name ? `${book.class_name} - ${book.class_stream_name}` : book.class_name }}
            </p>
            <div class="flex items-center -ml-1.5 mt-0.5">
                  <button
                    @click.stop="editBook(book)"
                    class="p-1.5 min-w-[34px] min-h-[34px] flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button
                    @click.stop="deleteBook(book.id)"
                    class="p-1.5 min-w-[34px] min-h-[34px] flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <svg class="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
            </div>
            </template>
          </ShelfSlot>
        </Bookshelf>
      </div>
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
                :author="bookForm.author"
                :pages="editingBook.total_pages"
              />
              <div class="min-w-0 flex-1 space-y-2">
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Book cover</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {{ editingBook.cover_image
                    ? (isAutoCover(editingBook.cover_image) ? 'Using the first page of the file.' : 'Using your own picture.')
                    : 'No picture - a printed jacket with the title and author is shown.' }}
                </p>
                <div class="flex flex-wrap gap-2">
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

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject *</label>
                <select
                  v-model="bookForm.subject_id"
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
                <TeacherClassSelector v-model="bookForm.classTarget" />
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
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">File (PDF, PPT, or PPTX) *</label>
              <input
                type="file"
                :accept="LIBRARY_FILE_ACCEPT"
                required
                @change="handleFileSelect"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              >
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">PDF, PPT, or PPTX, up to 50MB. Students preview it in-browser.</p>
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
                class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ saving ? (uploadProgress > 0 ? `Uploading... ${uploadProgress}%` : 'Saving...') : (editingBook ? 'Update Book' : 'Upload') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Document Preview -->
    <LibraryDocumentViewer v-if="previewBook" :book="previewBook" @close="previewBook = null" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import LibraryDocumentViewer from '@/components/library/LibraryDocumentViewer.vue'
import TeacherClassSelector from '@/components/teacher/TeacherClassSelector.vue'
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

const statusFilter = usePersistedRef('teacher-library-status-filter', '')
const subjectFilter = usePersistedRef('teacher-library-subject-filter', '')
const classFilter = usePersistedRef('teacher-library-class-filter', '')

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

const filteredBooks = computed(() => {
  return books.value.filter(book => {
    const matchesStatus = !statusFilter.value || book.status === statusFilter.value
    const matchesSubject = !subjectFilter.value || book.subject_id === parseInt(subjectFilter.value)
    const matchesClass = !classFilter.value || book.class_id === parseInt(classFilter.value)
    return matchesStatus && matchesSubject && matchesClass
  })
})

// Books are browsed class first (one docket per class, "All Streams" books under their class
// group), then stand on one shelf per subject inside the class - same shape as teacher eNotes.
const activeClassName = ref<string | null>(null)

const classGroups = computed(() => {
  const map = new Map<string, { name: string; books: LibraryBook[] }>()
  for (const book of filteredBooks.value) {
    const name = book.class_group_name || book.class_name || 'Unassigned'
    if (!map.has(name)) map.set(name, { name, books: [] })
    map.get(name)!.books.push(book)
  }
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
})

const activeClassBooks = computed(() => classGroups.value.find(g => g.name === activeClassName.value)?.books ?? [])

const activeClassSubjectShelves = computed(() => {
  const map = new Map<string, LibraryBook[]>()
  activeClassBooks.value.forEach(book => {
    const name = book.subject_name || 'Other'
    if (!map.has(name)) map.set(name, [])
    map.get(name)!.push(book)
  })
  return orderShelves(Array.from(map, ([name, books]) => ({ name, books })), g => g.books)
})

const classPalettes = [
  { solid: 'bg-emerald-600', softText: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
  { solid: 'bg-blue-600', softText: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  { solid: 'bg-indigo-600', softText: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' },
  { solid: 'bg-amber-600', softText: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
  { solid: 'bg-rose-600', softText: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' },
  { solid: 'bg-violet-600', softText: 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' }
]
const classPalette = (name: string) => {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0
  return classPalettes[hash % classPalettes.length]
}

const visibleIds = computed(() => activeClassBooks.value.map(b => b.id))

const bulkSetStatus = async (status: 'draft' | 'published' | 'archived') => {
  const ids = bulk.selectedArray()
  if (ids.length === 0) return
  try {
    await axios.post(`${API_BASE}/teacher/library/bulk-status`, { ids, status })
    toast.success(`${ids.length} resource(s) updated`)
    bulk.clear()
    await loadBooks()
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to update resources')
  }
}

const bulkDeleteSelected = async () => {
  const ids = bulk.selectedArray()
  if (ids.length === 0) return
  if (!await confirmDialog.open({ title: 'Delete resources', message: `Are you sure you want to delete ${ids.length} resource(s)? This cannot be undone.`, confirmLabel: 'Delete', danger: true })) return
  try {
    await axios.post(`${API_BASE}/teacher/library/bulk-delete`, { ids })
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
    const response = await axios.post(`${API_BASE}/teacher/library/bulk-export`, { ids }, { responseType: 'blob' })
    downloadBlob(response.data, 'library.csv')
  } catch (error) {
    toast.error('Failed to export resources')
  }
}

const clearFilters = () => {
  statusFilter.value = ''
  subjectFilter.value = ''
  classFilter.value = ''
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
    const response = await axios.get(`${API_BASE}/teacher/library`)
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
  const response = await axios.post(`${API_BASE}/teacher/library/${bookId}/cover`, data)
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

const onCoverFileSelected = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file || !editingBook.value) return
  coverBusy.value = true
  try {
    await uploadCover(editingBook.value.id, file, false)
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
      await axios.delete(`${API_BASE}/teacher/library/${editingBook.value.id}/cover`)
    }
    await uploadCover(editingBook.value.id, blob, true, totalPages)
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
    await axios.delete(`${API_BASE}/teacher/library/${editingBook.value.id}/cover`)
    const id = editingBook.value.id
    editingBook.value.cover_image = null
    const listed = books.value.find(b => b.id === id)
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
  editingBook.value = null
  fileError.value = ''
  showReplaceFile.value = false
  replaceFileInput.value = null
  bookForm.value = { title: '', description: '', subject_id: '', classTarget: { scope: 'stream', class_id: null, class_group_name: null }, status: 'draft', allow_download: false, author: '', file: null }
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
    classTarget: book.class_group_name
      ? { scope: 'all_streams', class_id: null, class_group_name: book.class_group_name }
      : { scope: 'stream', class_id: book.class_id, class_group_name: null },
    status: book.status,
    allow_download: !!book.allow_download,
    author: book.author || '',
    file: null
  }
  showBookModal.value = true
}

const closeBookModal = () => {
  showBookModal.value = false
  editingBook.value = null
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0] || null
  if (file && !isAllowedLibraryFile(file)) {
    fileError.value = LIBRARY_FILE_ERROR
    bookForm.value.file = null
    target.value = ''
    return
  }
  fileError.value = ''
  bookForm.value.file = file
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

    const response = await axios.post(`${API_BASE}/teacher/library/${editingBook.value.id}/replace-file`, formData, {
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
      await axios.put(`${API_BASE}/teacher/library/${editingBook.value.id}`, {
        title: bookForm.value.title,
        description: bookForm.value.description,
        subject_id: bookForm.value.subject_id,
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
      formData.append('scope', bookForm.value.classTarget.scope)
      if (bookForm.value.classTarget.class_id !== null) formData.append('class_id', String(bookForm.value.classTarget.class_id))
      if (bookForm.value.classTarget.class_group_name !== null) formData.append('class_group_name', bookForm.value.classTarget.class_group_name)
      formData.append('status', bookForm.value.status)
      formData.append('allow_download', bookForm.value.allow_download ? '1' : '0')
      formData.append('author', bookForm.value.author)
      formData.append('file', bookForm.value.file)

      await axios.post(`${API_BASE}/teacher/library`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          if (e.total) uploadProgress.value = Math.round((e.loaded * 100) / e.total)
        }
      })
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
    await axios.delete(`${API_BASE}/teacher/library/${id}`)
    await loadBooks()
    toast.success('Book deleted')
  } catch (error) {
    console.error('Failed to delete book:', error)
    toast.error('Failed to delete book. Please try again.')
  }
}

onMounted(async () => {
  await Promise.all([loadBooks(), loadAssignments()])
})
</script>
