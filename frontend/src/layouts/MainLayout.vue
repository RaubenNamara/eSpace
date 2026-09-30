<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Sidebar -->
    <!-- Floats as a framed card off the page edges on desktop (flush on mobile, where an inset
         drawer just wastes thumb-reach), framed like the eNotes / eLibrary bookcase - warm paper,
         a gold border and a recessed edge (.app-frame-sidebar in assets/style.css). -->
    <aside
      v-if="!shouldHideAppChrome"
      class="overflow-hidden fixed left-0 top-3 bottom-3 lg:left-3 lg:top-3 lg:bottom-3 rounded-r-2xl lg:rounded-2xl app-frame-sidebar backdrop-blur-xl transform transition-all duration-300 z-50 flex flex-col"
      :class="[isIconOnly ? 'w-16' : 'w-48 md:w-56', { '-translate-x-full': !sidebarOpen, 'translate-x-0': sidebarOpen }]"
    >

      <!-- Logo/brand header - desktop/tablet only; the mobile drawer skips straight to nav. -->
      <div class="relative hidden lg:block px-4 py-4 border-b app-frame-divider flex-shrink-0">
        <div class="flex items-center gap-3" :class="{ 'justify-center': isIconOnly }">
          <div class="relative w-9 h-9 flex-shrink-0 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <svg class="w-[18px] h-[18px] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <div v-if="!isIconOnly" class="min-w-0">
            <h1 class="text-sm font-bold text-slate-900 dark:text-white tracking-tight leading-tight">eSpace</h1>
            <p class="text-[10.5px] text-slate-600 dark:text-white/40 capitalize font-medium tracking-wide leading-tight mt-0.5">{{ userRole }} Console</p>
          </div>
        </div>
      </div>

      <nav class="sidebar-nav font-jakarta relative flex-1 overflow-y-auto px-3 py-4">
        <!-- System Administration -->
        <div v-if="isAdmin" class="mb-6">
          <div class="mx-3 mb-2.5 h-px bg-slate-300 dark:bg-white/10"></div>
          <div class="space-y-0.5">
            <router-link
              v-for="item in adminMenu"
              :key="item.path"
              :to="item.path"
              :title="isIconOnly ? item.label : undefined"
              class="flex items-center gap-2.5 pl-3.5 pr-2.5 py-1.5 rounded-xl transition-all duration-150 text-sm font-medium group"
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

        <!-- Dashboard -->
        <div v-if="dashboardMenu.length > 0" class="mb-6">
          <div class="mx-3 mb-2.5 h-px bg-slate-300 dark:bg-white/10"></div>
          <div class="space-y-0.5">
            <router-link
              v-for="item in dashboardMenu"
              :key="item.path"
              :to="item.path"
              :title="isIconOnly ? item.label : undefined"
              class="flex items-center gap-2.5 pl-3.5 pr-2.5 py-1.5 rounded-xl transition-all duration-150 text-sm font-medium group"
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

        <!-- Academic Management -->
        <div class="mb-6">
          <div class="mx-3 mb-2.5 h-px bg-slate-300 dark:bg-white/10"></div>
          <div class="space-y-0.5">
            <router-link
              v-for="item in academicMenu"
              :key="item.path"
              :to="item.path"
              :title="isIconOnly ? item.label : undefined"
              class="flex items-center gap-2.5 pl-3.5 pr-2.5 py-1.5 rounded-xl transition-all duration-150 text-sm font-medium group"
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

        <!-- Learning Resources -->
        <div class="mb-6">
          <div class="mx-3 mb-2.5 h-px bg-slate-300 dark:bg-white/10"></div>
          <div class="space-y-0.5">
            <router-link
              v-for="item in resourcesMenu"
              :key="item.path"
              :to="item.path"
              :title="isIconOnly ? item.label : undefined"
              class="flex items-center gap-2.5 pl-3.5 pr-2.5 py-1.5 rounded-xl transition-all duration-150 text-sm font-medium group"
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

        <!-- Assessment & Analytics -->
        <div class="mb-6">
          <div class="mx-3 mb-2.5 h-px bg-slate-300 dark:bg-white/10"></div>
          <div class="space-y-0.5">
            <router-link
              v-for="item in assessmentMenu"
              :key="item.path"
              :to="item.path"
              :title="isIconOnly ? item.label : undefined"
              class="flex items-center gap-2.5 pl-3.5 pr-2.5 py-1.5 rounded-xl transition-all duration-150 text-sm font-medium group"
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
      class="hidden lg:flex fixed top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border border-slate-400 dark:border-white/10 shadow-md items-center justify-center text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all duration-300 z-50"
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
      class="min-h-screen flex flex-col transition-all duration-300 ml-0"
      :class="shouldHideAppChrome ? '' : { 'lg:ml-[248px]': sidebarOpen && !sidebarCollapsed, 'lg:ml-[88px]': sidebarOpen && sidebarCollapsed }"
    >
      <!-- Top Bar - hides on scroll-down and reappears on scroll-up (like the Landing header),
           so it doesn't permanently eat vertical space on long pages. -->
      <header
        v-if="!shouldHideAppChrome"
        class="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-40 transition-transform duration-300"
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

      <main class="flex-1" :class="shouldHideAppChrome ? 'p-0' : (isImmersiveReader ? 'p-0 lg:p-6' : 'p-4 sm:p-6')">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
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
const isAdmin = computed(() => authStore.userRole === 'admin' || authStore.userRole === 'super_admin')

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

// Academic Management Menu
const academicMenu = computed(() => {
  const role = authStore.userRole
  
  if (role === 'student') {
    return [
      { path: '/student/live-classes', label: 'Live Classes', icon: 'VideoCameraIcon' },
      { path: '/student/enotes', label: 'eNotes', icon: 'NoteIcon' },
      { path: '/student/downloads', label: 'Downloads', icon: 'CloudArrowDownIcon' }
    ]
  } else if (role === 'teacher') {
    return [
      { path: '/teacher/classes', label: 'My Classes', icon: 'BookOpenIcon' },
      { path: '/teacher/preview', label: 'Student View', icon: 'AcademicCapIcon' },
      { path: '/teacher/live-classes', label: 'Live Classes', icon: 'VideoCameraIcon' },
      { path: '/teacher/videos', label: 'Videos', icon: 'VideoCameraIcon' }
    ]
  } else if (role === 'hod') {
    return [
      { path: '/hod/teachers', label: 'Teachers', icon: 'UsersIcon' },
      { path: '/hod/students', label: 'Students', icon: 'AcademicCapIcon' },
      { path: '/hod/live-classes', label: 'Live Classes', icon: 'VideoCameraIcon' }
    ]
  } else if (role === 'admin' || role === 'super_admin') {
    return [
      { path: '/admin/students', label: 'Students', icon: 'AcademicCapIcon' },
      { path: '/admin/teachers', label: 'Teachers', icon: 'BriefcaseIcon' },
      { path: '/admin/assign-teachers', label: 'Assign Teachers', icon: 'CheckCircleIcon' },
      { path: '/admin/hods', label: 'HODs', icon: 'UserGroupIcon' },
      { path: '/admin/departments', label: 'Departments', icon: 'BuildingOfficeIcon' },
      { path: '/admin/subjects', label: 'Subjects', icon: 'BookIcon' },
      { path: '/admin/classes', label: 'Classes', icon: 'BuildingLibraryIcon' },
      { path: '/admin/academic-years', label: 'Academic Years', icon: 'CalendarIcon' },
      { path: '/admin/terms', label: 'Terms', icon: 'CalendarDaysIcon' },
      { path: '/admin/enotes-curriculum', label: 'eNotes Curriculum Setup', icon: 'NoteIcon' },
      { path: '/admin/promotion', label: 'Student Promotion', icon: 'AcademicCapIcon' },
      { path: '/admin/live-classes', label: 'Live Classes', icon: 'VideoCameraIcon' }
    ]
  }
  
  return []
})

// Learning Resources Menu
const resourcesMenu = computed(() => {
  const role = authStore.userRole
  
  if (role === 'student') {
    return [
      { path: '/student/library', label: 'eLibrary', icon: 'LibraryIcon' },
      { path: '/student/videos', label: 'Videos', icon: 'VideoCameraIcon' },
      { path: '/student/itembank', label: 'Item Bank', icon: 'QuestionMarkCircleIcon' }
    ]
  } else if (role === 'teacher') {
    return [
      { path: '/teacher/library', label: 'eLibrary', icon: 'LibraryIcon' },
      { path: '/teacher/itembank', label: 'Item Bank', icon: 'QuestionMarkCircleIcon' },
      { path: '/teacher/enotes', label: 'eNotes', icon: 'NoteIcon' }
    ]
  } else if (role === 'hod') {
    return [
      { path: '/hod/enotes', label: 'eNotes', icon: 'NoteIcon' },
      { path: '/hod/library', label: 'eLibrary', icon: 'LibraryIcon' },
      { path: '/hod/videos', label: 'Videos', icon: 'VideoCameraIcon' },
      { path: '/hod/itembank', label: 'Item Bank', icon: 'QuestionMarkCircleIcon' }
    ]
  } else if (role === 'admin' || role === 'super_admin') {
    return [
      { path: '/admin/library', label: 'eLibrary', icon: 'LibraryIcon' },
      { path: '/admin/videos', label: 'Videos', icon: 'VideoCameraIcon' },
      { path: '/admin/itembank', label: 'Item Bank', icon: 'QuestionMarkCircleIcon' },
      { path: '/admin/notes', label: 'eNotes', icon: 'NoteIcon' }
    ]
  }
  
  return []
})

// Assessment & Analytics Menu
const assessmentMenu = computed(() => {
  const role = authStore.userRole
  
  if (role === 'student') {
    return [
      { path: '/student/assignments', label: 'Assessments', icon: 'DocumentTextIcon' },
      { path: '/student/learning-map', label: 'Learning Map', icon: 'MapIcon' },
      { path: '/student/virtual-lab', label: 'Virtual Lab', icon: 'FlaskIcon' },
      { path: '/student/reports', label: 'Reports', icon: 'ChartBarIcon' },
      { path: '/student/achievements', label: 'Achievements', icon: 'TrophyIcon' },
      { path: '/student/academic-history', label: 'Academic History', icon: 'AcademicCapIcon' },
      { path: '/student/chat', label: 'Chats', icon: 'ChatIcon' }
    ]
  } else if (role === 'teacher') {
    return [
      { path: '/teacher/assignments', label: 'Assessments', icon: 'DocumentTextIcon' },
      { path: '/teacher/class-map', label: 'Class Learning Map', icon: 'MapIcon' },
      { path: '/teacher/coverage', label: 'Coverage', icon: 'ChartBarIcon' },
      { path: '/teacher/virtual-lab', label: 'Virtual Lab', icon: 'FlaskIcon' },
      { path: '/teacher/reports', label: 'Reports', icon: 'ChartBarIcon' },
      { path: '/teacher/engagement', label: 'Engagement', icon: 'ChartIcon' },
      { path: '/teacher/marksheet', label: 'Marksheet', icon: 'TableCellsIcon' },
      { path: '/teacher/physical-exams', label: 'Physical Exams', icon: 'DocumentTextIcon' },
      { path: '/teacher/chat', label: 'Chats', icon: 'ChatIcon' }
    ]
  } else if (role === 'hod') {
    return [
      { path: '/hod/assessments', label: 'Assessments', icon: 'DocumentTextIcon' },
      { path: '/hod/analytics', label: 'Analytics', icon: 'ChartIcon' },
      { path: '/hod/reports', label: 'Reports', icon: 'ChartBarIcon' },
      { path: '/hod/charts', label: 'Engagement', icon: 'ChartIcon' },
      { path: '/hod/marksheet', label: 'Marksheet', icon: 'TableCellsIcon' },
      { path: '/hod/physical-exams', label: 'Physical Exams', icon: 'DocumentTextIcon' },
      { path: '/hod/chat', label: 'Chats', icon: 'ChatIcon' }
    ]
  } else if (role === 'admin' || role === 'super_admin') {
    return [
      { path: '/admin/assessments', label: 'Assessments', icon: 'DocumentTextIcon' },
      { path: '/admin/virtual-lab', label: 'Virtual Lab', icon: 'FlaskIcon' },
      { path: '/admin/reports', label: 'Reports', icon: 'ChartBarIcon' },
      { path: '/admin/charts', label: 'Engagement', icon: 'ChartIcon' },
      { path: '/admin/marksheet', label: 'Marksheet', icon: 'TableCellsIcon' },
      { path: '/admin/physical-exams', label: 'Physical Exams', icon: 'DocumentTextIcon' },
      { path: '/admin/rewards', label: 'Rewards & Badges', icon: 'TrophyIcon' },
      { path: '/admin/chat', label: 'Chats', icon: 'ChatIcon' }
    ]
  }

  return []
})

// System Administration Menu (Admin only)
const adminMenu = computed(() => {
  const role = authStore.userRole
  
  if (role === 'admin' || role === 'super_admin') {
    return [
      { path: '/admin/dashboard', label: 'Dashboard', icon: 'DashboardIcon' },
      { path: '/admin/users', label: 'Admin', icon: 'UsersIcon' },
      { path: '/admin/settings', label: 'Settings', icon: 'CogIcon' },
      { path: '/admin/logs', label: 'System Logs', icon: 'DocumentIcon' }
    ]
  }
  
  return []
})

// Dashboard menu for non-admin roles
const dashboardMenu = computed(() => {
  const role = authStore.userRole
  
  if (role === 'student') {
    return [
      { path: '/student/dashboard', label: 'eClass', icon: 'DashboardIcon' }
    ]
  } else if (role === 'teacher') {
    return [
      { path: '/teacher/dashboard', label: 'Dashboard', icon: 'DashboardIcon' }
    ]
  } else if (role === 'hod') {
    return [
      { path: '/hod/dashboard', label: 'Dashboard', icon: 'DashboardIcon' }
    ]
  }
  
  return []
})

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

const MapIcon = icon(['M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'])

export { MapIcon, DashboardIcon, BookOpenIcon, DocumentTextIcon, LibraryIcon, NoteIcon, QuestionMarkCircleIcon, ChatIcon, ChartBarIcon, CogIcon, UsersIcon, VideoCameraIcon, ChartIcon, AcademicCapIcon, BookIcon, CheckCircleIcon, BriefcaseIcon, UserGroupIcon, BuildingOfficeIcon, BuildingLibraryIcon, CalendarIcon, CalendarDaysIcon, KeyIcon, CloudArrowUpIcon, CloudArrowDownIcon, DocumentIcon, TrophyIcon, FlaskIcon, TableCellsIcon }

// Sidebar menu items reference icons by name (e.g. icon: 'BookOpenIcon') so the menu arrays stay
// plain, serialisable data - <component :is="item.icon"> can't resolve a local script-setup
// binding from a runtime string on its own, so this map is what actually turns that name back
// into the component for rendering.
const iconMap: Record<string, any> = {
  DashboardIcon, BookOpenIcon, DocumentTextIcon, LibraryIcon, NoteIcon, QuestionMarkCircleIcon,
  ChatIcon, ChartBarIcon, CogIcon, UsersIcon, VideoCameraIcon, ChartIcon, AcademicCapIcon, BookIcon,
  CheckCircleIcon, BriefcaseIcon, UserGroupIcon, BuildingOfficeIcon, BuildingLibraryIcon,
  CalendarIcon, CalendarDaysIcon, KeyIcon, CloudArrowUpIcon, CloudArrowDownIcon, DocumentIcon, TrophyIcon, FlaskIcon,
  TableCellsIcon, MapIcon
}
</script>

<style scoped>
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
