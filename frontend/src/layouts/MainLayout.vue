<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Sidebar -->
    <!-- Floats as a framed card off the page edges on desktop (flush on mobile, where an inset
         drawer just wastes thumb-reach), framed like the eNotes / eLibrary bookcase - warm paper,
         a gold border and a recessed edge (.app-frame-sidebar in assets/style.css). -->
    <aside
      v-if="!shouldHideAppChrome"
      class="print:hidden overflow-hidden fixed left-0 top-3 bottom-3 lg:left-3 lg:top-3 lg:bottom-3 rounded-r-2xl lg:rounded-2xl app-frame-sidebar backdrop-blur-xl transform transition-all duration-300 z-50 flex flex-col"
      :class="[isIconOnly ? 'w-16' : 'w-48 md:w-56', { '-translate-x-full': !sidebarOpen, 'translate-x-0': sidebarOpen }]"
    >

      <!-- Logo/brand header - desktop/tablet only; the mobile drawer skips straight to nav. -->
      <div class="relative hidden lg:block px-4 py-4 border-b app-frame-divider flex-shrink-0">
        <!-- The eSpace word logo; just the "e" mark when the sidebar is folded to icons -->
        <div class="flex items-center gap-3" :class="{ 'justify-center': isIconOnly }">
          <img v-if="isIconOnly" src="/favicon.svg" alt="eSpace" class="w-9 h-9 rounded-xl shadow-lg shadow-indigo-500/25">
          <div v-else class="min-w-0">
            <h1 class="leading-none"><Wordmark size="sm" /></h1>
            <p class="text-[10.5px] text-slate-600 dark:text-white/40 capitalize font-medium tracking-wide leading-tight mt-1">{{ userRole }} Console</p>
          </div>
        </div>
      </div>

      <nav class="sidebar-nav font-jakarta relative flex-1 overflow-y-auto px-3 py-4">
        <!-- The menu in named groups. Open, a group is just its items under a thin line (the
             names stay out of the way); the line is also the fold - click it and the group folds
             up into a single row with its name, so a teacher can tuck away what they don't use.
             Folds are remembered per role. With the sidebar narrowed to icons there is nowhere
             for a name to go, so every group stays open there. -->
        <section v-for="group in menuGroups" :key="group.key" class="nav-group" :class="{ 'is-folded': isFolded(group.key) }">
          <button
            v-if="!isIconOnly"
            type="button"
            class="nav-fold"
            :aria-expanded="!isFolded(group.key)"
            :aria-controls="`nav-group-${group.key}`"
            :title="isFolded(group.key) ? `Show ${group.name}` : `Fold ${group.name} away`"
            @click="toggleFold(group.key)"
          >
            <span class="nav-fold-line" aria-hidden="true"></span>
            <span class="nav-fold-label">
              <span class="truncate">{{ group.name }}</span>
              <span v-if="groupHasActive(group)" class="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" title="You are on a page in here"></span>
              <span class="ml-auto text-[10px] font-semibold text-slate-400 dark:text-white/30 tabular-nums">{{ group.items.length }}</span>
            </span>
            <svg class="nav-fold-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.4" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          <div v-else class="mx-3 mb-2.5 h-px bg-slate-300 dark:bg-white/10"></div>

          <div :id="`nav-group-${group.key}`" class="nav-fold-body" :inert="!isIconOnly && isFolded(group.key) ? true : undefined">
            <div class="nav-fold-inner space-y-0.5">
              <router-link
                v-for="(item, i) in group.items"
                :key="item.path"
                :to="item.path"
                :title="isIconOnly ? item.label : undefined"
                :style="{ '--i': i }"
                class="nav-item flex items-center gap-2.5 pl-3.5 pr-2.5 py-1.5 rounded-xl transition-all duration-150 text-sm font-medium group"
                :class="[isActive(item.path) ? 'bg-indigo-500/10 dark:bg-white/12 text-indigo-700 dark:text-white shadow-inner shadow-indigo-500/5 dark:shadow-white/5' : 'text-slate-800 dark:text-white/55 hover:bg-black/5 dark:hover:bg-white/[0.07] hover:text-slate-900 dark:hover:text-white', isIconOnly ? 'justify-center px-0' : '']"
              >
                <div class="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-150"
                  :class="isActive(item.path) ? 'bg-indigo-500 text-white shadow shadow-indigo-500/30 dark:shadow-indigo-500/40' : 'text-slate-600 dark:text-white/40 group-hover:text-slate-900 dark:group-hover:text-white/80'"
                >
                  <component :is="iconMap[item.icon]" class="w-4 h-4" />
                </div>
                <span v-if="!isIconOnly" class="truncate">{{ item.label }}</span>
              </router-link>
            </div>
          </div>
        </section>
      </nav>

      <!-- Footer -->
      <div class="relative border-t app-frame-divider flex-shrink-0">
        <div class="p-2.5">
          <button
            @click="handleLogout"
            :title="isIconOnly ? 'Logout' : undefined"
            class="flex items-center gap-2.5 pl-3.5 pr-2.5 py-1.5 rounded-xl text-red-600 hover:bg-red-50 dark:text-rose-300 dark:hover:bg-rose-500/15 dark:hover:text-rose-200 w-full transition-colors duration-150 group"
            :class="isIconOnly ? 'justify-center px-0' : ''"
          >
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            <span v-if="!isIconOnly" class="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>

    <!-- Collapse/expand toggle - a small circular arrow straddling the sidebar's right edge,
         desktop only. Sits outside the sidebar (rather than inside it) so it isn't clipped by
         the sidebar's own overflow-hidden, and its `left` tracks the sidebar's current width. -->
    <button
      v-if="sidebarOpen && !shouldHideAppChrome"
      @click="sidebarCollapsed = !sidebarCollapsed"
      :title="isIconOnly ? 'Expand sidebar' : 'Collapse sidebar'"
      class="print:!hidden hidden lg:flex fixed top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border border-slate-400 dark:border-white/10 shadow-md items-center justify-center text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all duration-300 z-50"
      :style="{ left: sidebarToggleLeftPx + 'px' }"
    >
      <svg class="w-3.5 h-3.5 transition-transform duration-300" :class="{ 'rotate-180': isIconOnly }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
    </button>

    <!-- Mobile/tablet backdrop - closes the sidebar on outside tap instead of pushing content -->
    <div
      v-if="sidebarOpen && !shouldHideAppChrome"
      @click="sidebarOpen = false"
      class="fixed inset-0 bg-black/50 z-40 lg:hidden"
    ></div>

    <!-- Main Content -->
    <div
      class="print:!ml-0 min-h-screen flex flex-col transition-all duration-300 ml-0"
      :class="shouldHideAppChrome ? '' : { 'lg:ml-[248px]': sidebarOpen && !sidebarCollapsed, 'lg:ml-[88px]': sidebarOpen && sidebarCollapsed }"
    >
      <!-- Top Bar - hides on scroll-down and reappears on scroll-up (like the Landing header),
           so it doesn't permanently eat vertical space on long pages. -->
      <header
        v-if="!shouldHideAppChrome"
        class="print:hidden bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-40 transition-transform duration-300"
        :class="[{ '-translate-y-full': headerHidden }, isImmersiveReader ? 'hidden lg:block' : '']"
      >
        <div class="flex items-center justify-between px-6 py-3">
          <div class="flex items-center gap-2 flex-shrink-0">
            <button
              @click="sidebarOpen = !sidebarOpen"
              class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
            >
              <svg class="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>

          <!-- Global Search (student/teacher only) -->
          <GlobalSearchBar v-if="userRole === 'student' || userRole === 'teacher' || userRole === 'hod' || userRole === 'admin'" class="hidden md:block flex-1 mx-4" />
          <button
            v-if="menuGroups.length"
            type="button"
            class="hidden lg:inline-flex items-center gap-1.5 mr-3 px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            title="Jump to any page or search (Ctrl/Cmd + K)"
            @click="paletteRef?.show()"
          >
            Go to <kbd class="px-1 rounded bg-gray-100 dark:bg-gray-700 text-[10px]">{{ isMacKey ? '⌘' : 'Ctrl' }} K</kbd>
          </button>

          <div class="flex items-center space-x-4">
            <!-- Mobile search shortcut -->
            <router-link
              v-if="userRole === 'student' || userRole === 'teacher'"
              :to="`/${userRole}/search`"
              class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg class="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </router-link>
            <!-- Role Switcher (for dual-role users) -->
            <div v-if="hasDualRoles" class="relative">
              <button 
                @click="showRoleSwitcher = !showRoleSwitcher"
                class="flex items-center space-x-2 px-3 py-2 rounded-lg bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 hover:shadow-md transition-colors duration-150"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4-4m-4 4l4 4"></path>
                </svg>
                <span class="text-sm font-medium capitalize">{{ activeRole }}</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              <!-- Role Switcher Dropdown -->
              <div v-if="showRoleSwitcher" class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                <div class="p-2">
                  <button
                    @click="switchToRole('hod')"
                    class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    :class="activeRole === 'hod' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    <span class="text-sm font-medium">HOD Mode</span>
                  </button>
                  <button
                    @click="switchToRole('teacher')"
                    class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    :class="activeRole === 'teacher' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                    <span class="text-sm font-medium">Teacher Mode</span>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Dark Mode toggle -->
            <button
              @click="toggleTheme"
              class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              :title="isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
            >
              <svg v-if="isDarkMode" class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              <svg v-else class="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
            </button>

            <!-- Messages (eSpace's own chat) -->
            <router-link
              :to="`/${userRole}/chat`"
              class="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Messages"
            >
              <svg class="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              <span
                v-if="chatBadge.unreadCount > 0"
                class="absolute top-0.5 right-0.5 min-w-[16px] h-4 px-1 bg-indigo-600 rounded-full text-[10px] leading-4 text-white font-semibold text-center"
              >
                {{ chatBadge.unreadCount > 9 ? '9+' : chatBadge.unreadCount }}
              </span>
            </router-link>

            <!-- Notifications -->
            <div class="relative" ref="notificationsContainer">
              <button
                @click="showNotifications = !showNotifications"
                class="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <svg class="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
                <span
                  v-if="unreadNotificationCount > 0"
                  class="absolute top-0.5 right-0.5 min-w-[16px] h-4 px-1 bg-red-500 rounded-full text-[10px] leading-4 text-white font-semibold text-center"
                >
                  {{ unreadNotificationCount > 9 ? '9+' : unreadNotificationCount }}
                </span>
              </button>

              <NotificationPanel
                v-if="showNotifications"
                @unread-change="unreadNotificationCount = $event"
                @navigate="showNotifications = false"
              />
            </div>

            <!-- User Profile -->
            <div v-if="userRole === 'student' || userRole === 'teacher' || userRole === 'hod'" ref="profileDropdownRef" class="relative">
              <button
                @click="showProfileDropdown = !showProfileDropdown"
                class="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                :aria-expanded="showProfileDropdown"
                aria-haspopup="menu"
              >
                <div class="w-10 h-10 rounded-full overflow-hidden bg-indigo-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                  <img v-if="userPhotoUrl" :src="resolveAssetUrl(userPhotoUrl)" alt="" class="w-full h-full object-cover">
                  <span v-else>{{ userInitials }}</span>
                </div>
                <div class="hidden md:block text-left">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ userName }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 capitalize">{{ userRole }}</p>
                </div>
                <svg class="w-4 h-4 text-gray-400 hidden md:block transition-transform" :class="{ 'rotate-180': showProfileDropdown }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <div
                v-if="showProfileDropdown"
                role="menu"
                class="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-1.5 z-50"
              >
                <div class="px-4 py-2.5 border-b border-gray-100 dark:border-gray-700">
                  <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">{{ userName }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 capitalize">{{ userRole }}</p>
                </div>
                <!-- A student's photo is admin/HOD-managed (it appears on official report
                     cards), not self-service - so this entry (which opens the photo section of
                     ProfileSettingsModal) is hidden for students; only Change Password remains. -->
                <button
                  v-if="userRole !== 'student'"
                  role="menuitem"
                  @click="openProfileSection('photo')"
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2.5 transition-colors"
                >
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  Profile
                </button>
                <button
                  role="menuitem"
                  @click="openProfileSection('password')"
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2.5 transition-colors"
                >
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 10-8 0v4h8z"></path>
                  </svg>
                  Change Password
                </button>
                <div class="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                <button
                  role="menuitem"
                  @click="handleLogout"
                  class="w-full text-left px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 flex items-center gap-2.5 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  Logout
                </button>
              </div>
            </div>
            <div v-else class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-full overflow-hidden bg-indigo-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                <img v-if="userPhotoUrl" :src="resolveAssetUrl(userPhotoUrl)" alt="" class="w-full h-full object-cover">
                <span v-else>{{ userInitials }}</span>
              </div>
              <div class="hidden md:block">
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ userName }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 capitalize">{{ userRole }}</p>
              </div>
            </div>
          </div>
          <!-- Students on a phone: the places they go most, one thumb-tap away at the bottom of the
       screen; "More" opens the full menu. Hidden while reading (the reader has its own controls). -->
  <nav
    v-if="showStudentTabs"
    class="lg:hidden print:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-t border-gray-200 dark:border-gray-800 pb-[env(safe-area-inset-bottom)]"
    aria-label="Main"
  >
    <div class="grid grid-cols-5">
      <RouterLink
        v-for="tab in STUDENT_TABS"
        :key="tab.path"
        :to="tab.path"
        class="relative flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-semibold"
        :class="isActive(tab.path) || tab.also.some(p => isActive(p)) ? 'text-indigo-600 dark:text-indigo-300' : 'text-gray-500 dark:text-gray-400'"
      >
        <span v-if="isActive(tab.path) || tab.also.some(p => isActive(p))" class="absolute top-0 inset-x-6 h-0.5 rounded-full bg-indigo-500"></span>
        <component :is="iconMap[tab.icon]" class="w-5 h-5" />
        {{ tab.label }}
        <span v-if="tab.path === '/student/chat' && chatBadge.unreadCount > 0" class="absolute top-1 right-[calc(50%-1.25rem)] min-w-[16px] h-4 px-1 rounded-full bg-rose-500 text-white text-[9px] leading-4 text-center">{{ chatBadge.unreadCount > 9 ? '9+' : chatBadge.unreadCount }}</span>
      </RouterLink>
      <button type="button" class="flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-semibold text-gray-500 dark:text-gray-400" aria-label="Open the full menu" @click="sidebarOpen = true">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        More
      </button>
    </div>
  </nav>
  <CommandPalette v-if="menuGroups.length" ref="paletteRef" :groups="menuGroups" :icons="iconMap" :role="menuRole" :actions="paletteActions" />
  </div>
      </header>

      <ProfileSettingsModal v-if="showProfileModal" :focus-section="profileModalFocusSection" @close="showProfileModal = false" />

      <!-- Page Content -->
      <!-- No network: say so, and (students) point at what still works -->
      <div v-if="!offline.online && !shouldHideAppChrome" class="flex items-center justify-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100 text-xs font-medium">
        <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636a9 9 0 010 12.728M5.636 18.364a9 9 0 010-12.728M3 3l18 18" /></svg>
        <span>You're offline<template v-if="authStore.userRole === 'student'"> - your saved eNotes still open.</template></span>
        <router-link v-if="authStore.userRole === 'student' && route.path !== '/student/downloads'" to="/student/downloads" class="underline font-semibold">Downloads</router-link>
      </div>
      <div v-else-if="offline.pending > 0 && authStore.userRole === 'student' && !shouldHideAppChrome" class="px-4 py-1 text-center bg-indigo-50 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200 text-[11px]">
        Sending {{ offline.pending }} {{ offline.pending === 1 ? 'change' : 'changes' }} you made offline…
      </div>

      <main class="flex-1 print:!p-0" :class="[shouldHideAppChrome ? 'p-0' : (isImmersiveReader ? 'p-0 lg:p-6' : 'p-4 sm:p-6'), showStudentTabs ? 'pb-24 lg:pb-6' : '']">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePersistedRef } from '@/composables/usePersistedRef'
import Wordmark from '@/components/brand/Wordmark.vue'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '../stores/auth'
import { useThemeStore } from '../stores/theme'
import { useChatBadgeStore } from '../stores/chatBadge'
import { useReadModeStore } from '../stores/readMode'
import ProfileSettingsModal from '../components/profile/ProfileSettingsModal.vue'
import NotificationPanel from '../components/notifications/NotificationPanel.vue'
import GlobalSearchBar from '../components/search/GlobalSearchBar.vue'
import CommandPalette, { type PaletteAction } from '../components/common/CommandPalette.vue'
import { resolveAssetUrl } from '@/utils/url'
import { offline } from '@/utils/offline/enotes'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const themeStore = useThemeStore()
const chatBadge = useChatBadgeStore()
const readModeStore = useReadModeStore()

// Sidebar starts open on desktop (>=1024px, Tailwind's `lg` breakpoint) and closed on
// mobile/tablet, where it behaves as an overlay (see the `lg:ml-64` / backdrop below)
// instead of pushing content into an already-narrow viewport.
const DESKTOP_BREAKPOINT = 1024
const sidebarOpen = ref(typeof window !== 'undefined' ? window.innerWidth >= DESKTOP_BREAKPOINT : true)
const showRoleSwitcher = ref(false)

// Collapsible sidebar (desktop only): stays exactly as the user left it - expanded or icon-only
// rail - until they click the collapse arrow, rather than auto-collapsing after a hover timeout.
// While collapsed, each nav item's native `title` attribute (set below) shows its label on hover.
const sidebarCollapsed = ref(false)

const isIconOnly = computed(() => sidebarCollapsed.value)

// The eNotes reader (ENotePreview.vue) is its own full-bleed, full-height page - it already
// renders its own header and manages its own viewport height. Below `lg` there's no room to
// spare for this shell's own sticky header + `<main>` padding on top of that, so both are
// dropped on mobile/tablet for routes that opt in, letting the reader claim the whole screen
// instead of being squeezed into whatever's left over.
const isImmersiveReader = computed(() => !!route.meta.immersiveReader)

// Read Mode (a full-screen focus mode either reader can toggle, on top of just being an immersive
// route) needs the app shell's own chrome gone entirely - on *every* breakpoint, not just
// mobile/tablet like isImmersiveReader's own default behavior above, since desktop is a
// first-class target for Read Mode too. Based purely on the shared store (not on route meta like
// isImmersiveReader above) since LibraryPdfViewer's Read Mode is a modal, not a routed page - its
// route never carries immersiveReader meta, even though it should hide the shell's chrome the
// same way eNotes' Read Mode does.
const shouldHideAppChrome = computed(() => readModeStore.isActive)

// Pixel offset for the collapse-arrow button: it sits centered on the sidebar's right edge,
// which is 12px (the `lg:left-3` inset) plus the sidebar's own width - since the button is 24px
// wide, centering it there means its own `left` equals the width exactly (the two 12s cancel).
const sidebarToggleLeftPx = computed(() => (isIconOnly.value ? 64 : 224))

const applyResponsiveSidebar = () => {
  sidebarOpen.value = window.innerWidth >= DESKTOP_BREAKPOINT
  if (!sidebarOpen.value) {
    // Mobile's sidebar is a manually-toggled full-width overlay - the collapsed icon-only rail
    // is a desktop-only affordance, so drop any collapsed state left over from a resize.
    sidebarCollapsed.value = false
  }
}

// Top bar hide-on-scroll: hidden while scrolling down past a small threshold, shown again on
// any scroll up or near the top - mirrors the Landing page header behaviour.
const HEADER_SHOW_THRESHOLD_PX = 80
const headerHidden = ref(false)
let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0

const handleHeaderScroll = () => {
  const currentY = window.scrollY
  if (currentY < HEADER_SHOW_THRESHOLD_PX) {
    headerHidden.value = false
  } else if (currentY > lastScrollY) {
    headerHidden.value = true
  } else if (currentY < lastScrollY) {
    headerHidden.value = false
  }
  lastScrollY = currentY
}

// Presence heartbeat: while any authenticated page (not just chat) is open, periodically tell
// the backend this user is active - lets chat show an online dot for everyone,
// not just people currently viewing the chat screen itself.
const PRESENCE_PING_INTERVAL_MS = 30000
let presenceTimer: ReturnType<typeof setInterval> | null = null

const sendPresencePing = () => {
  axios.post('/api/presence/ping').catch(() => {
    // Best-effort - a missed heartbeat just means this user briefly shows as offline.
  })
}

// Notification bell: poll the unread count in the background so the badge stays current even
// while the dropdown itself is closed; the dropdown (NotificationPanel) fetches the full list
// only when opened.
const NOTIFICATIONS_POLL_INTERVAL_MS = 30000
const unreadNotificationCount = ref(0)
const showNotifications = ref(false)
const notificationsContainer = ref<HTMLElement | null>(null)
let notificationsTimer: ReturnType<typeof setInterval> | null = null

const fetchUnreadNotificationCount = () => {
  axios.get('/api/notifications/unread-count')
    .then(res => { unreadNotificationCount.value = res.data.data.count })
    .catch(() => {
      // Best-effort - the badge just stays at its last known value.
    })
}

const handleOutsideNotificationClick = (event: MouseEvent) => {
  if (showNotifications.value && notificationsContainer.value && !notificationsContainer.value.contains(event.target as Node)) {
    showNotifications.value = false
  }
}

const profileDropdownRef = ref<HTMLElement | null>(null)
const handleOutsideProfileDropdownClick = (event: MouseEvent) => {
  if (showProfileDropdown.value && profileDropdownRef.value && !profileDropdownRef.value.contains(event.target as Node)) {
    showProfileDropdown.value = false
  }
}

// Messages badge (header chat icon): backed by the shared chatBadge store (see
// stores/chatBadge.ts) rather than local state, so a chat page can force an immediate refresh
// right after marking a conversation read instead of the badge sitting stale until the next
// poll tick. Only student/teacher are real chat participants with a personal unread count -
// HOD/admin only ever get read-only department/school-wide monitoring access to chat, so
// there's no "unread for me" concept to show a badge for (the store's refresh() is a no-op for
// those roles).
const MESSAGES_POLL_INTERVAL_MS = 30000
let messagesTimer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  window.addEventListener('resize', applyResponsiveSidebar)
  window.addEventListener('scroll', handleHeaderScroll, { passive: true })
  sendPresencePing()
  presenceTimer = setInterval(sendPresencePing, PRESENCE_PING_INTERVAL_MS)

  fetchUnreadNotificationCount()
  notificationsTimer = setInterval(fetchUnreadNotificationCount, NOTIFICATIONS_POLL_INTERVAL_MS)
  document.addEventListener('mousedown', handleOutsideNotificationClick)
  document.addEventListener('mousedown', handleOutsideProfileDropdownClick)

  chatBadge.refresh()
  messagesTimer = setInterval(() => chatBadge.refresh(), MESSAGES_POLL_INTERVAL_MS)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', applyResponsiveSidebar)
  window.removeEventListener('scroll', handleHeaderScroll)
  if (presenceTimer) clearInterval(presenceTimer)
  if (notificationsTimer) clearInterval(notificationsTimer)
  document.removeEventListener('mousedown', handleOutsideNotificationClick)
  document.removeEventListener('mousedown', handleOutsideProfileDropdownClick)
  if (messagesTimer) clearInterval(messagesTimer)
})
const isDarkMode = computed(() => themeStore.isDarkMode)

const userRole = computed(() => authStore.userRole || 'Guest')
const activeRole = computed(() => authStore.activeRole || authStore.userRole || 'Guest')
const hasDualRoles = computed(() => authStore.hasDualRoles)
const userName = computed(() => {
  const user = authStore.user as any
  return user?.first_name || user?.username || 'User'
})
const userInitials = computed(() => {
  const name = userName.value
  return name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
})
const userPhotoUrl = computed(() => (authStore.user as any)?.profile_photo || null)

const showProfileModal = ref(false)
const showProfileDropdown = ref(false)
const profileModalFocusSection = ref<'photo' | 'password'>('photo')
const openProfileSection = (section: 'photo' | 'password') => {
  profileModalFocusSection.value = section
  showProfileModal.value = true
  showProfileDropdown.value = false
}

interface NavItem { path: string; label: string; icon: string }
interface NavGroup { key: string; name: string; items: NavItem[] }

// The sidebar, by role, in named groups (see the template for how a group folds away)
const MENU: Record<string, NavGroup[]> = {
  student: [
    { key: 'home', name: 'Home', items: [
      { path: '/student/dashboard', label: 'eClass', icon: 'DashboardIcon' }
    ] },
    { key: 'learning', name: 'Learning', items: [
      { path: '/student/live-classes', label: 'Live Classes', icon: 'VideoCameraIcon' },
      { path: '/student/enotes', label: 'eNotes', icon: 'NoteIcon' },
      { path: '/student/my-notes', label: 'My notes', icon: 'NoteIcon' },
      { path: '/student/downloads', label: 'Downloads', icon: 'CloudArrowDownIcon' }
    ] },
    { key: 'revision', name: 'Revision', items: [
      { path: '/student/assignments', label: 'Assessments', icon: 'DocumentTextIcon' },
      { path: '/student/revision', label: 'Daily Revision', icon: 'BulbIcon' },
      { path: '/student/live-quiz', label: 'Live Quiz', icon: 'BoltIcon' },
      { path: '/student/exam-plan', label: 'Exam Planner', icon: 'TargetIcon' }
    ] },
    { key: 'resources', name: 'Resources', items: [
      { path: '/student/library', label: 'eLibrary', icon: 'LibraryIcon' },
      { path: '/student/videos', label: 'Videos', icon: 'VideoCameraIcon' },
      { path: '/student/itembank', label: 'Item Bank', icon: 'QuestionMarkCircleIcon' },
      { path: '/student/virtual-lab', label: 'Virtual Lab', icon: 'FlaskIcon' }
    ] },
    { key: 'progress', name: 'Progress', items: [
      { path: '/student/reports', label: 'Reports', icon: 'ChartBarIcon' },
      { path: '/student/academic-history', label: 'Academic History', icon: 'AcademicCapIcon' },
      { path: '/student/achievements', label: 'Achievements', icon: 'TrophyIcon' },
      { path: '/student/learning-map', label: 'Learning Map', icon: 'MapIcon' }
    ] },
    { key: 'community', name: 'Community', items: [
      { path: '/student/chat', label: 'Chats', icon: 'ChatIcon' },
      { path: '/student/study-groups', label: 'Study groups', icon: 'UserGroupIcon' },
      { path: '/student/notices', label: 'Noticeboard', icon: 'MegaphoneIcon' }
    ] }
  ],
  teacher: [
    { key: 'home', name: 'Home', items: [
      { path: '/teacher/dashboard', label: 'Dashboard', icon: 'DashboardIcon' }
    ] },
    { key: 'teaching', name: 'Teaching', items: [
      { path: '/teacher/classes', label: 'My Classes', icon: 'BookOpenIcon' },
      { path: '/teacher/live-classes', label: 'Live Classes', icon: 'VideoCameraIcon' }
    ] },
    { key: 'content', name: 'Content', items: [
      { path: '/teacher/enotes', label: 'eNotes', icon: 'NoteIcon' },
      { path: '/teacher/library', label: 'eLibrary', icon: 'LibraryIcon' },
      { path: '/teacher/videos', label: 'Videos', icon: 'VideoCameraIcon' },
      { path: '/teacher/itembank', label: 'Item Bank', icon: 'QuestionMarkCircleIcon' },
      { path: '/teacher/virtual-lab', label: 'Virtual Lab', icon: 'FlaskIcon' }
    ] },
    { key: 'assessment', name: 'Assessment', items: [
      { path: '/teacher/assignments', label: 'Assessments', icon: 'DocumentTextIcon' },
      { path: '/teacher/marksheet', label: 'Marksheet', icon: 'TableCellsIcon' },
      { path: '/teacher/physical-exams', label: 'Physical Exams', icon: 'DocumentTextIcon' },
      { path: '/teacher/uneb-assessment', label: 'UNEB assessment', icon: 'CheckCircleIcon' },
      { path: '/teacher/reports', label: 'Reports', icon: 'ChartBarIcon' }
    ] },
    { key: 'insights', name: 'Insights', items: [
      { path: '/teacher/class-map', label: 'Class Learning Map', icon: 'MapIcon' },
      { path: '/teacher/engagement', label: 'Engagement', icon: 'ChartIcon' },
      { path: '/teacher/coverage', label: 'Coverage', icon: 'ChartBarIcon' },
      { path: '/teacher/scheme', label: 'Scheme of work', icon: 'ClipboardListIcon' }
    ] },
    { key: 'community', name: 'Community', items: [
      { path: '/teacher/chat', label: 'Chats', icon: 'ChatIcon' }
    ] }
  ],
  hod: [
    { key: 'home', name: 'Home', items: [
      { path: '/hod/dashboard', label: 'Dashboard', icon: 'DashboardIcon' }
    ] },
    { key: 'department', name: 'Department', items: [
      { path: '/hod/teachers', label: 'Teachers', icon: 'UsersIcon' },
      { path: '/hod/students', label: 'Students', icon: 'AcademicCapIcon' },
      { path: '/hod/live-classes', label: 'Live Classes', icon: 'VideoCameraIcon' }
    ] },
    { key: 'content', name: 'Content', items: [
      { path: '/hod/enotes', label: 'eNotes', icon: 'NoteIcon' },
      { path: '/hod/library', label: 'eLibrary', icon: 'LibraryIcon' },
      { path: '/hod/videos', label: 'Videos', icon: 'VideoCameraIcon' },
      { path: '/hod/itembank', label: 'Item Bank', icon: 'QuestionMarkCircleIcon' }
    ] },
    { key: 'assessment', name: 'Assessment', items: [
      { path: '/hod/assessments', label: 'Assessments', icon: 'DocumentTextIcon' },
      { path: '/hod/marksheet', label: 'Marksheet', icon: 'TableCellsIcon' },
      { path: '/hod/physical-exams', label: 'Physical Exams', icon: 'DocumentTextIcon' },
      { path: '/hod/uneb-assessment', label: 'UNEB assessment', icon: 'CheckCircleIcon' },
      { path: '/hod/reports', label: 'Reports', icon: 'ChartBarIcon' }
    ] },
    { key: 'insights', name: 'Insights', items: [
      { path: '/hod/term-report', label: 'Term report', icon: 'ClipboardListIcon' },
      { path: '/hod/analytics', label: 'Analytics', icon: 'ChartIcon' },
      { path: '/hod/early-warning', label: 'Early warning', icon: 'BellAlertIcon' },
      { path: '/hod/charts', label: 'Engagement', icon: 'ChartIcon' }
    ] },
    { key: 'community', name: 'Community', items: [
      { path: '/hod/chat', label: 'Chats', icon: 'ChatIcon' },
      { path: '/hod/notices', label: 'Noticeboard', icon: 'MegaphoneIcon' }
    ] }
  ],
  admin: [
    { key: 'home', name: 'Home', items: [
      { path: '/admin/dashboard', label: 'Dashboard', icon: 'DashboardIcon' }
    ] },
    { key: 'people', name: 'People', items: [
      { path: '/admin/students', label: 'Students', icon: 'AcademicCapIcon' },
      { path: '/admin/teachers', label: 'Teachers', icon: 'BriefcaseIcon' },
      { path: '/admin/hods', label: 'HODs', icon: 'UserGroupIcon' },
      { path: '/admin/assign-teachers', label: 'Assign Teachers', icon: 'CheckCircleIcon' },
      { path: '/admin/promotion', label: 'Student Promotion', icon: 'AcademicCapIcon' },
      { path: '/admin/parent-links', label: 'Parents', icon: 'UserGroupIcon' }
    ] },
    { key: 'setup', name: 'School setup', items: [
      { path: '/admin/departments', label: 'Departments', icon: 'BuildingOfficeIcon' },
      { path: '/admin/subjects', label: 'Subjects', icon: 'BookIcon' },
      { path: '/admin/classes', label: 'Classes', icon: 'BuildingLibraryIcon' },
      { path: '/admin/academic-years', label: 'Academic Years', icon: 'CalendarIcon' },
      { path: '/admin/terms', label: 'Terms', icon: 'CalendarDaysIcon' },
      { path: '/admin/exam-dates', label: 'Exam dates', icon: 'TargetIcon' },
      { path: '/admin/enotes-curriculum', label: 'eNotes Curriculum Setup', icon: 'NoteIcon' }
    ] },
    { key: 'content', name: 'Content', items: [
      { path: '/admin/notes', label: 'eNotes', icon: 'NoteIcon' },
      { path: '/admin/library', label: 'eLibrary', icon: 'LibraryIcon' },
      { path: '/admin/videos', label: 'Videos', icon: 'VideoCameraIcon' },
      { path: '/admin/itembank', label: 'Item Bank', icon: 'QuestionMarkCircleIcon' },
      { path: '/admin/live-classes', label: 'Live Classes', icon: 'VideoCameraIcon' },
      { path: '/admin/virtual-lab', label: 'Virtual Lab', icon: 'FlaskIcon' }
    ] },
    { key: 'assessment', name: 'Assessment', items: [
      { path: '/admin/assessments', label: 'Assessments', icon: 'DocumentTextIcon' },
      { path: '/admin/marksheet', label: 'Marksheet', icon: 'TableCellsIcon' },
      { path: '/admin/physical-exams', label: 'Physical Exams', icon: 'DocumentTextIcon' },
      { path: '/admin/uneb-assessment', label: 'UNEB assessment', icon: 'CheckCircleIcon' },
      { path: '/admin/reports', label: 'Reports', icon: 'ChartBarIcon' },
      { path: '/admin/rewards', label: 'Rewards & Badges', icon: 'TrophyIcon' },
      { path: '/admin/charts', label: 'Engagement', icon: 'ChartIcon' }
    ] },
    { key: 'community', name: 'Community', items: [
      { path: '/admin/chat', label: 'Chats', icon: 'ChatIcon' },
      { path: '/admin/notices', label: 'Noticeboard', icon: 'MegaphoneIcon' }
    ] },
    { key: 'system', name: 'System', items: [
      { path: '/admin/users', label: 'Admin', icon: 'UsersIcon' },
      { path: '/admin/settings', label: 'Settings', icon: 'CogIcon' },
      { path: '/admin/demo-requests', label: 'Demo requests', icon: 'BriefcaseIcon' },
      { path: '/admin/logs', label: 'System Logs', icon: 'DocumentIcon' }
    ] }
  ]
}

const menuRole = computed(() => (authStore.userRole === 'super_admin' ? 'admin' : authStore.userRole || ''))
const menuGroups = computed<NavGroup[]>(() => MENU[menuRole.value] || [])

// Folded groups, remembered per role in this browser
const foldStore = usePersistedRef<Record<string, string[]>>('sidebar-folds', {})
const isFolded = (key: string) => !isIconOnly.value && (foldStore.value[menuRole.value] || []).includes(key)
const toggleFold = (key: string) => {
  const folded = new Set(foldStore.value[menuRole.value] || [])
  if (folded.has(key)) folded.delete(key)
  else folded.add(key)
  foldStore.value = { ...foldStore.value, [menuRole.value]: [...folded] }
}
// ---- Students' bottom tab bar on phones ----
const STUDENT_TABS = [
  { path: '/student/dashboard', label: 'Home', icon: 'DashboardIcon', also: [] as string[] },
  { path: '/student/enotes', label: 'Learn', icon: 'NoteIcon', also: ['/student/library', '/student/videos', '/student/live-classes', '/student/my-notes'] },
  { path: '/student/revision', label: 'Revise', icon: 'BulbIcon', also: ['/student/assignments', '/student/live-quiz', '/student/exam-plan', '/student/itembank'] },
  { path: '/student/chat', label: 'Chats', icon: 'ChatIcon', also: ['/student/study-groups', '/student/notices'] }
]
const showStudentTabs = computed(() => menuRole.value === 'student' && !shouldHideAppChrome.value && !isImmersiveReader.value)

// ---- The command palette (Ctrl/Cmd + K) ----
const paletteRef = ref<InstanceType<typeof CommandPalette> | null>(null)
const isMacKey = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)
const paletteActions = computed<PaletteAction[]>(() => {
  const go = (path: string) => () => router.push(path)
  const common: PaletteAction[] = [{ label: themeStore.isDarkMode ? 'Switch to light mode' : 'Switch to dark mode', hint: 'Appearance', run: () => themeStore.toggleTheme() }]
  const byRole: Record<string, PaletteAction[]> = {
    student: [
      { label: "Do today's revision", hint: 'Daily Revision', run: go('/student/revision') },
      { label: 'Join a live quiz', hint: 'Live Quiz', run: go('/student/live-quiz') },
      { label: 'Start a study group', hint: 'Study groups', run: go('/student/study-groups') },
      { label: 'Download my notes as PDF', hint: 'My notes', run: go('/student/my-notes') }
    ],
    teacher: [
      { label: 'New assessment', hint: 'Assessments', run: go('/teacher/assignments/create') },
      { label: 'Plan my week', hint: 'My week', run: go('/teacher/planner') },
      { label: 'Copy a past term', hint: 'Assessments', run: go('/teacher/term-copy') }
    ],
    hod: [
      { label: 'Print the term report', hint: 'Term report', run: go('/hod/term-report') },
      { label: 'Who needs attention', hint: 'Early warning', run: go('/hod/early-warning') }
    ],
    admin: [
      { label: 'Finish setting up the school', hint: 'Dashboard checklist', run: go('/admin/dashboard') },
      { label: 'Add a student', hint: 'Students', run: go('/admin/students') },
      { label: 'Add a teacher', hint: 'Teachers', run: go('/admin/teachers') },
      { label: 'Post a notice', hint: 'Noticeboard', run: go('/admin/notices') }
    ]
  }
  return [...(byRole[menuRole.value] || []), ...common]
})

const groupHasActive = (group: NavGroup) => isFolded(group.key) && group.items.some(item => isActive(item.path))

function isActive(path: string): boolean {
  return route.path === path || route.path.startsWith(path + '/')
}

function toggleTheme() {
  themeStore.toggleTheme()
}

async function handleLogout() {
  await authStore.logout()
  router.push('/login')
}

function switchToRole(role: string) {
  authStore.switchRole(role)
  showRoleSwitcher.value = false
  
  // Navigate to appropriate dashboard based on role
  if (role === 'hod') {
    router.push('/hod/dashboard')
  } else if (role === 'teacher') {
    router.push('/teacher/dashboard')
  }
}
</script>

<!-- Icon Components (simplified - in production use @heroicons/vue) -->
<script lang="ts">
import { h } from 'vue'

// Sidebar icons are resolved dynamically via item.icon (a string name) through iconMap below, so
// they can't be plain .vue SFCs or `template` strings - Vite ships Vue's runtime-only build, which
// has no in-browser template compiler, so a `{ template: '<svg>...' }` object silently renders
// nothing. Building each icon from h() instead sidesteps runtime compilation entirely.
type PathAttrs = string | Record<string, string>

function icon(paths: PathAttrs[], viewBox = '0 0 24 24') {
  return {
    render() {
      return h(
        'svg',
        { class: 'w-5 h-5', fill: 'none', stroke: 'currentColor', viewBox },
        paths.map((p) =>
          h(
            'path',
            typeof p === 'string'
              ? { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: p }
              : p
          )
        )
      )
    }
  }
}

const DashboardIcon = icon(['M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'])

const BookOpenIcon = icon(['M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'])

const DocumentTextIcon = icon(['M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'])

const LibraryIcon = icon(['M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'])

const NoteIcon = icon(['M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'])

const QuestionMarkCircleIcon = icon(['M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'])

const ChatIcon = icon(['M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'])

const ChartBarIcon = icon(['M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'])

const CogIcon = icon([
  'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
  'M15 12a3 3 0 11-6 0 3 3 0 016 0z'
])

const UsersIcon = icon(['M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'])

const VideoCameraIcon = icon(['M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'])

const ChartIcon = icon(['M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z'])

const TrophyIcon = icon(['M8 21h8m-4-4v4M6 4h12v3a6 6 0 01-12 0V4zM6 4H3v1a4 4 0 004 4M18 4h3v1a4 4 0 01-4 4'])

const FlaskIcon = icon(['M9.75 3v5.25L4.5 18a1.5 1.5 0 001.32 2.25h12.36A1.5 1.5 0 0019.5 18l-5.25-9.75V3M8.25 3h7.5M8.25 14.25h7.5'])

const AcademicCapIcon = icon([
  { d: 'M12 14l9-5-9-5-9 5 9 5z' },
  { d: 'M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' },
  { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222' }
])

const BookIcon = icon(['M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'])

const CheckCircleIcon = icon(['M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'])

const BriefcaseIcon = icon(['M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'])

const UserGroupIcon = icon(['M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'])

const BuildingOfficeIcon = icon(['M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'])

const BuildingLibraryIcon = icon(['M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'])

const CalendarIcon = icon(['M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'])

const CalendarDaysIcon = icon(['M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'])

const KeyIcon = icon(['M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z'])

const CloudArrowDownIcon = icon(['M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10'])
const CloudArrowUpIcon = icon(['M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'])

const DocumentIcon = icon(['M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'])

const TableCellsIcon = icon(['M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5M8.25 4.5v15M15.75 4.5v15'], '0 0 24 24')

const MegaphoneIcon = icon(['M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z'])

const TargetIcon = icon(['M12 21a9 9 0 100-18 9 9 0 000 18z', 'M12 17a5 5 0 100-10 5 5 0 000 10z', 'M12 13a1 1 0 100-2 1 1 0 000 2z'])

const ClipboardListIcon = icon(['M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'])

const ChatQuestionIcon = icon(['M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01', 'M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'])

const BoltIcon = icon(['M13 10V3L4 14h7v7l9-11h-7z'])

const BulbIcon = icon(['M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'])

const BellAlertIcon = icon(['M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'])

const MapIcon = icon(['M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'])

export { MegaphoneIcon, TargetIcon, ClipboardListIcon, ChatQuestionIcon, BoltIcon, BulbIcon, BellAlertIcon, MapIcon, DashboardIcon, BookOpenIcon, DocumentTextIcon, LibraryIcon, NoteIcon, QuestionMarkCircleIcon, ChatIcon, ChartBarIcon, CogIcon, UsersIcon, VideoCameraIcon, ChartIcon, AcademicCapIcon, BookIcon, CheckCircleIcon, BriefcaseIcon, UserGroupIcon, BuildingOfficeIcon, BuildingLibraryIcon, CalendarIcon, CalendarDaysIcon, KeyIcon, CloudArrowUpIcon, CloudArrowDownIcon, DocumentIcon, TrophyIcon, FlaskIcon, TableCellsIcon }

// Sidebar menu items reference icons by name (e.g. icon: 'BookOpenIcon') so the menu arrays stay
// plain, serialisable data - <component :is="item.icon"> can't resolve a local script-setup
// binding from a runtime string on its own, so this map is what actually turns that name back
// into the component for rendering.
const iconMap: Record<string, any> = {
  DashboardIcon, BookOpenIcon, DocumentTextIcon, LibraryIcon, NoteIcon, QuestionMarkCircleIcon,
  ChatIcon, ChartBarIcon, CogIcon, UsersIcon, VideoCameraIcon, ChartIcon, AcademicCapIcon, BookIcon,
  CheckCircleIcon, BriefcaseIcon, UserGroupIcon, BuildingOfficeIcon, BuildingLibraryIcon,
  CalendarIcon, CalendarDaysIcon, KeyIcon, CloudArrowUpIcon, CloudArrowDownIcon, DocumentIcon, TrophyIcon, FlaskIcon,
  TableCellsIcon, MapIcon, BoltIcon, BulbIcon, BellAlertIcon, MegaphoneIcon, TargetIcon, ClipboardListIcon, ChatQuestionIcon
}
</script>

<style scoped>
/* ---- Sidebar groups and their fold ---- */
.nav-group { margin-bottom: 1.25rem; transition: margin 0.35s ease; }
.nav-group.is-folded { margin-bottom: 0.35rem; }

/* Open: a thin line (the group's name hidden), with a chevron that shows on hover.
   Folded: the line gives way to the group's name in a soft row. */
.nav-fold {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  width: calc(100% - 0.75rem);
  margin: 0 0.375rem 0.55rem;
  min-height: 0.9rem;
  padding: 0 0.375rem;
  border-radius: 0.75rem;
  color: rgb(100 116 139);
  transition: background-color 0.2s, padding 0.3s ease, margin 0.3s ease;
}
.nav-fold:focus-visible { outline: 2px solid rgb(99 102 241); outline-offset: 1px; }
.nav-fold-line {
  flex: 1 1 auto;
  height: 1px;
  background: rgb(203 213 225);
  transform-origin: left;
  transition: transform 0.3s ease, opacity 0.2s ease;
}
.dark .nav-fold-line { background: rgba(255, 255, 255, 0.1); }
.nav-fold-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex: 0 1 0;
  min-width: 0;
  max-width: 0;
  overflow: hidden;
  opacity: 0;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
  transition: opacity 0.25s ease 0.05s, max-width 0.3s ease;
}
.nav-fold-chevron {
  width: 0.8rem;
  height: 0.8rem;
  flex-shrink: 0;
  opacity: 0;
  transition: opacity 0.2s, transform 0.3s ease;
}
.nav-fold:hover .nav-fold-chevron,
.nav-fold:focus-visible .nav-fold-chevron { opacity: 0.75; }
.nav-fold:hover .nav-fold-line { background: rgb(148 163 184); }
.dark .nav-fold:hover .nav-fold-line { background: rgba(255, 255, 255, 0.22); }
/* Touch screens have no hover - keep the chevron faintly visible so the fold can be found */
@media (hover: none) { .nav-fold-chevron { opacity: 0.45; } }

.is-folded .nav-fold {
  min-height: 2rem;
  margin-bottom: 0;
  padding: 0 0.6rem 0 0.9rem;
  background: rgba(15, 23, 42, 0.035);
}
.dark .is-folded .nav-fold { background: rgba(255, 255, 255, 0.04); color: rgba(255, 255, 255, 0.5); }
.is-folded .nav-fold:hover { background: rgba(15, 23, 42, 0.07); color: rgb(30 41 59); }
.dark .is-folded .nav-fold:hover { background: rgba(255, 255, 255, 0.08); color: rgba(255, 255, 255, 0.85); }
.is-folded .nav-fold-line { transform: scaleX(0); opacity: 0; flex: 0 0 0; }
.is-folded .nav-fold-label { flex: 1 1 auto; max-width: 100%; opacity: 1; }
.is-folded .nav-fold-chevron { opacity: 0.6; transform: rotate(-90deg); }

/* The fold itself: the group's height closes up while its items tip back like a page
   folding away, one after another */
.nav-fold-body {
  display: grid;
  grid-template-rows: 1fr;
  transition: grid-template-rows 0.38s cubic-bezier(0.4, 0, 0.2, 1);
}
.is-folded .nav-fold-body { grid-template-rows: 0fr; }
.nav-fold-inner { min-height: 0; overflow: hidden; perspective: 700px; }
.nav-fold-body .nav-item {
  transform-origin: top center;
  transition: background-color 0.15s, color 0.15s, box-shadow 0.15s,
    transform 0.34s cubic-bezier(0.3, 0.7, 0.4, 1) calc(var(--i, 0) * 22ms),
    opacity 0.26s ease calc(var(--i, 0) * 22ms);
}
.is-folded .nav-fold-body .nav-item { transform: rotateX(-80deg) translateY(-0.4rem); opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .nav-fold-body, .nav-fold-body .nav-item, .nav-fold, .nav-fold-line, .nav-fold-label, .nav-fold-chevron { transition: none; }
}

.sidebar-nav {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.12) transparent;
}
.sidebar-nav::-webkit-scrollbar {
  width: 6px;
}
.sidebar-nav::-webkit-scrollbar-track {
  background: transparent;
}
.sidebar-nav::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.12);
  border-radius: 999px;
}
.sidebar-nav::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
