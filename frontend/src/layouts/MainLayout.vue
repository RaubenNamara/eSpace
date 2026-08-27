<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Sidebar -->
    <aside 
      class="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl transform transition-transform duration-300 z-50 flex flex-col border-r border-slate-700/50"
      :class="{ '-translate-x-full': !sidebarOpen, 'translate-x-0': sidebarOpen }"
    >
      <div class="p-6 border-b border-slate-700/50 flex-shrink-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-sm">
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <div>
            <h1 class="text-xl font-bold text-white tracking-tight">eSpace</h1>
            <p class="text-xs text-indigo-300/80 capitalize font-medium">{{ userRole }}</p>
          </div>
        </div>
      </div>
      
      <nav class="flex-1 overflow-y-auto p-4 space-y-1">
        <!-- System Administration -->
        <div v-if="isAdmin" class="mb-4">
          <div class="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center space-x-2">
            <div class="w-2 h-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500"></div>
            <span>System Administration</span>
          </div>
          <div class="mt-1 space-y-1">
            <router-link
              v-for="item in adminMenu"
              :key="item.path"
              :to="item.path"
              class="flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium group"
              :class="isActive(item.path) ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/30' : 'text-slate-300 hover:bg-gradient-to-r hover:from-rose-500/10 hover:to-pink-500/10 hover:text-white'"
            >
              <div class="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                :class="isActive(item.path) ? 'bg-white/20' : 'bg-gradient-to-br from-rose-500/20 to-pink-500/20 group-hover:from-rose-500/30 group-hover:to-pink-500/30'"
              >
                <component :is="iconMap[item.icon]" class="w-5 h-5" />
              </div>
              <span>{{ item.label }}</span>
            </router-link>
          </div>
        </div>

        <!-- Dashboard -->
        <div v-if="dashboardMenu.length > 0" class="mb-4">
          <div class="mt-1 space-y-1">
            <router-link
              v-for="item in dashboardMenu"
              :key="item.path"
              :to="item.path"
              class="flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium group"
              :class="isActive(item.path) ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30' : 'text-slate-300 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-cyan-500/10 hover:text-white'"
            >
              <div class="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                :class="isActive(item.path) ? 'bg-white/20' : 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 group-hover:from-blue-500/30 group-hover:to-cyan-500/30'"
              >
                <component :is="iconMap[item.icon]" class="w-5 h-5" />
              </div>
              <span>{{ item.label }}</span>
            </router-link>
          </div>
        </div>

        <!-- Academic Management -->
        <div class="mb-4">
          <div class="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center space-x-2">
            <div class="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            <span>Academic Management</span>
          </div>
          <div class="mt-1 space-y-1">
            <router-link
              v-for="item in academicMenu"
              :key="item.path"
              :to="item.path"
              class="flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium group"
              :class="isActive(item.path) ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-300 hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10 hover:text-white'"
            >
              <div class="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                :class="isActive(item.path) ? 'bg-white/20' : 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20 group-hover:from-indigo-500/30 group-hover:to-purple-500/30'"
              >
                <component :is="iconMap[item.icon]" class="w-5 h-5" />
              </div>
              <span>{{ item.label }}</span>
            </router-link>
          </div>
        </div>

        <!-- Learning Resources -->
        <div class="mb-4">
          <div class="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center space-x-2">
            <div class="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></div>
            <span>Learning Resources</span>
          </div>
          <div class="mt-1 space-y-1">
            <router-link
              v-for="item in resourcesMenu"
              :key="item.path"
              :to="item.path"
              class="flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium group"
              :class="isActive(item.path) ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30' : 'text-slate-300 hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-teal-500/10 hover:text-white'"
            >
              <div class="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                :class="isActive(item.path) ? 'bg-white/20' : 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20 group-hover:from-emerald-500/30 group-hover:to-teal-500/30'"
              >
                <component :is="iconMap[item.icon]" class="w-5 h-5" />
              </div>
              <span>{{ item.label }}</span>
            </router-link>
          </div>
        </div>

        <!-- Assessment & Analytics -->
        <div class="mb-4">
          <div class="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center space-x-2">
            <div class="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500"></div>
            <span>Assessment & Analytics</span>
          </div>
          <div class="mt-1 space-y-1">
            <router-link
              v-for="item in assessmentMenu"
              :key="item.path"
              :to="item.path"
              class="flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium group"
              :class="isActive(item.path) ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30' : 'text-slate-300 hover:bg-gradient-to-r hover:from-orange-500/10 hover:to-amber-500/10 hover:text-white'"
            >
              <div class="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                :class="isActive(item.path) ? 'bg-white/20' : 'bg-gradient-to-br from-orange-500/20 to-amber-500/20 group-hover:from-orange-500/30 group-hover:to-amber-500/30'"
              >
                <component :is="iconMap[item.icon]" class="w-5 h-5" />
              </div>
              <span>{{ item.label }}</span>
            </router-link>
          </div>
        </div>
      </nav>
      
      <div class="p-4 border-t border-slate-700/50 flex-shrink-0 space-y-2">
        <button
          @click="toggleTheme"
          class="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-700/50 w-full transition-all duration-200 group"
        >
          <div class="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-slate-600/30 to-slate-700/30 group-hover:from-slate-600/50 group-hover:to-slate-700/50 transition-all duration-200">
            <svg v-if="isDarkMode" class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <svg v-else class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </div>
          <span>{{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}</span>
        </button>
        
        <button
          @click="handleLogout"
          class="flex items-center space-x-3 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 w-full transition-all duration-200 group"
        >
          <div class="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-rose-500/20 to-pink-500/20 group-hover:from-rose-500/30 group-hover:to-pink-500/30 transition-all duration-200">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
          </div>
          <span>Logout</span>
        </button>
      </div>
    </aside>

    <!-- Mobile/tablet backdrop - closes the sidebar on outside tap instead of pushing content -->
    <div
      v-if="sidebarOpen"
      @click="sidebarOpen = false"
      class="fixed inset-0 bg-black/50 z-40 lg:hidden"
    ></div>

    <!-- Main Content -->
    <div class="min-h-screen flex flex-col transition-all duration-300 ml-0" :class="{ 'lg:ml-64': sidebarOpen }">
      <!-- Top Bar -->
      <header class="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-40">
        <div class="flex items-center justify-between px-6 py-4">
          <button
            @click="sidebarOpen = !sidebarOpen"
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
          >
            <svg class="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>

          <!-- Global Search (student/teacher only) -->
          <GlobalSearchBar v-if="userRole === 'student' || userRole === 'teacher'" class="hidden md:block flex-1 mx-4" />

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
                class="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all duration-200"
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
            
            <!-- Messages (WhatsApp-style) -->
            <router-link
              :to="`/${userRole}/chat`"
              class="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Messages"
            >
              <svg class="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5.003L2 22l5.157-1.316A9.933 9.933 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm5.29 14.146c-.223.626-1.276 1.226-1.767 1.279-.452.05-.995.093-3.201-.688-2.697-.996-4.42-3.723-4.556-3.897-.13-.174-1.09-1.45-1.09-2.766 0-1.316.69-1.963.936-2.234.222-.244.483-.305.644-.305.16 0 .322 0 .462.007.148.008.348-.056.545.417.223.532.756 1.848.822 1.983.066.135.11.293.022.47-.088.176-.132.284-.26.44-.13.156-.276.348-.394.468-.13.13-.267.271-.115.53.153.26.68 1.13 1.462 1.83 1.007.9 1.855 1.18 2.116 1.31.26.13.412.11.564-.066.153-.176.652-.762.826-1.024.174-.26.348-.216.588-.13.24.088 1.53.72 1.792.85.26.13.435.196.5.305.065.11.065.635-.157 1.26z"></path>
              </svg>
              <span
                v-if="chatBadge.unreadCount > 0"
                class="absolute top-0.5 right-0.5 min-w-[16px] h-4 px-1 bg-green-500 rounded-full text-[10px] leading-4 text-white font-semibold text-center"
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
            <button
              v-if="userRole === 'student'"
              @click="showProfileModal = true"
              class="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              title="Update photo & password"
            >
              <div class="w-10 h-10 rounded-full overflow-hidden bg-indigo-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                <img v-if="userPhotoUrl" :src="resolveAssetUrl(userPhotoUrl)" alt="" class="w-full h-full object-cover">
                <span v-else>{{ userInitials }}</span>
              </div>
              <div class="hidden md:block text-left">
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ userName }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 capitalize">{{ userRole }}</p>
              </div>
            </button>
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

      <ProfileSettingsModal v-if="showProfileModal" @close="showProfileModal = false" />

      <!-- Page Content -->
      <main class="p-6 flex-1">
        <router-view />
      </main>

      <!-- Footer -->
      <footer class="mt-8 flex-shrink-0">
        <div class="h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
        <div class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div class="px-4 sm:px-6 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-500/20 flex-shrink-0">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <div>
                <p class="text-sm font-bold text-gray-900 dark:text-white tracking-tight">eSpace</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">Empowering Secondary Education</p>
              </div>
            </div>

            <div class="flex flex-wrap items-center justify-center gap-3 text-xs">
              <span class="px-2.5 py-1 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-600 dark:text-indigo-400 font-semibold capitalize">
                {{ userRole }} Portal
              </span>
              <span class="text-gray-400 dark:text-gray-500">&copy; {{ currentYear }} eSpace. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
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
import ProfileSettingsModal from '../components/profile/ProfileSettingsModal.vue'
import NotificationPanel from '../components/notifications/NotificationPanel.vue'
import GlobalSearchBar from '../components/search/GlobalSearchBar.vue'
import { resolveAssetUrl } from '@/utils/url'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const themeStore = useThemeStore()
const chatBadge = useChatBadgeStore()

const currentYear = new Date().getFullYear()

// Sidebar starts open on desktop (>=1024px, Tailwind's `lg` breakpoint) and closed on
// mobile/tablet, where it behaves as an overlay (see the `lg:ml-64` / backdrop below)
// instead of pushing content into an already-narrow viewport.
const DESKTOP_BREAKPOINT = 1024
const sidebarOpen = ref(typeof window !== 'undefined' ? window.innerWidth >= DESKTOP_BREAKPOINT : true)
const showRoleSwitcher = ref(false)

const applyResponsiveSidebar = () => {
  sidebarOpen.value = window.innerWidth >= DESKTOP_BREAKPOINT
}

// Presence heartbeat: while any authenticated page (not just chat) is open, periodically tell
// the backend this user is active - lets chat show a WhatsApp-style online dot for everyone,
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

// Messages badge (WhatsApp-style icon): backed by the shared chatBadge store (see
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
  sendPresencePing()
  presenceTimer = setInterval(sendPresencePing, PRESENCE_PING_INTERVAL_MS)

  fetchUnreadNotificationCount()
  notificationsTimer = setInterval(fetchUnreadNotificationCount, NOTIFICATIONS_POLL_INTERVAL_MS)
  document.addEventListener('mousedown', handleOutsideNotificationClick)

  chatBadge.refresh()
  messagesTimer = setInterval(() => chatBadge.refresh(), MESSAGES_POLL_INTERVAL_MS)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', applyResponsiveSidebar)
  if (presenceTimer) clearInterval(presenceTimer)
  if (notificationsTimer) clearInterval(notificationsTimer)
  document.removeEventListener('mousedown', handleOutsideNotificationClick)
  if (messagesTimer) clearInterval(messagesTimer)
})
const isDarkMode = computed(() => themeStore.isDarkMode)
const isAdmin = computed(() => authStore.userRole === 'admin' || authStore.userRole === 'super_admin')

const userRole = computed(() => authStore.userRole || 'Guest')
const activeRole = computed(() => authStore.activeRole || authStore.userRole || 'Guest')
const hasDualRoles = computed(() => authStore.hasDualRoles)
const userName = computed(() => {
  const user = authStore.user as any
  console.log('MainLayout userName - user object:', user)
  console.log('MainLayout userName - first_name:', user?.first_name)
  console.log('MainLayout userName - username:', user?.username)
  const name = user?.first_name || user?.username || 'User'
  console.log('MainLayout userName - final:', name)
  return name
})
const userInitials = computed(() => {
  const name = userName.value
  return name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
})
const userPhotoUrl = computed(() => (authStore.user as any)?.profile_photo || null)

const showProfileModal = ref(false)

// Academic Management Menu
const academicMenu = computed(() => {
  const role = authStore.userRole
  
  if (role === 'student') {
    return [
      { path: '/student/classes', label: 'My Classes', icon: 'BookOpenIcon' },
      { path: '/student/live-classes', label: 'Live Classes', icon: 'VideoCameraIcon' },
      { path: '/student/enotes', label: 'eNotes', icon: 'NoteIcon' }
    ]
  } else if (role === 'teacher') {
    return [
      { path: '/teacher/classes', label: 'My Classes', icon: 'BookOpenIcon' },
      { path: '/teacher/preview', label: 'Preview as Student', icon: 'AcademicCapIcon' },
      { path: '/teacher/live-classes', label: 'Live Classes', icon: 'VideoCameraIcon' },
      { path: '/teacher/enotes', label: 'eNotes', icon: 'NoteIcon' }
    ]
  } else if (role === 'hod') {
    return [
      { path: '/hod/teachers', label: 'Teachers', icon: 'UsersIcon' },
      { path: '/hod/students', label: 'Students', icon: 'AcademicCapIcon' },
      { path: '/hod/subjects', label: 'Subjects', icon: 'BookIcon' },
      { path: '/hod/live-classes', label: 'Live Classes', icon: 'VideoCameraIcon' }
    ]
  } else if (role === 'admin' || role === 'super_admin') {
    return [
      { path: '/admin/students', label: 'Students', icon: 'AcademicCapIcon' },
      { path: '/admin/teachers', label: 'Teachers', icon: 'BriefcaseIcon' },
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
      { path: '/teacher/videos', label: 'Videos', icon: 'VideoCameraIcon' },
      { path: '/teacher/itembank', label: 'Item Bank', icon: 'QuestionMarkCircleIcon' }
    ]
  } else if (role === 'hod') {
    return [
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
      { path: '/student/virtual-lab', label: 'Virtual Lab', icon: 'FlaskIcon' },
      { path: '/student/reports', label: 'Reports', icon: 'ChartBarIcon' },
      { path: '/student/achievements', label: 'Achievements', icon: 'TrophyIcon' },
      { path: '/student/academic-history', label: 'Academic History', icon: 'AcademicCapIcon' },
      { path: '/student/chat', label: 'Chats', icon: 'ChatIcon' }
    ]
  } else if (role === 'teacher') {
    return [
      { path: '/teacher/assignments', label: 'Assessments', icon: 'DocumentTextIcon' },
      { path: '/teacher/virtual-lab', label: 'Virtual Lab', icon: 'FlaskIcon' },
      { path: '/teacher/reports', label: 'Reports', icon: 'ChartBarIcon' },
      { path: '/teacher/marksheet', label: 'Marksheet', icon: 'TableCellsIcon' },
      { path: '/teacher/chat', label: 'Chats', icon: 'ChatIcon' }
    ]
  } else if (role === 'hod') {
    return [
      { path: '/hod/analytics', label: 'Analytics', icon: 'ChartIcon' },
      { path: '/hod/reports', label: 'Reports', icon: 'ChartBarIcon' },
      { path: '/hod/marksheet', label: 'Marksheet', icon: 'TableCellsIcon' },
      { path: '/hod/chat', label: 'Chats', icon: 'ChatIcon' }
    ]
  } else if (role === 'admin' || role === 'super_admin') {
    return [
      { path: '/admin/assessments', label: 'Assessments', icon: 'DocumentTextIcon' },
      { path: '/admin/virtual-lab', label: 'Virtual Lab', icon: 'FlaskIcon' },
      { path: '/admin/reports', label: 'Reports', icon: 'ChartBarIcon' },
      { path: '/admin/marksheet', label: 'Marksheet', icon: 'TableCellsIcon' },
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
      { path: '/student/dashboard', label: 'Dashboard', icon: 'DashboardIcon' }
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

<!-- Icon Components (simplified - in生产环境 use @heroicons/vue) -->
<script lang="ts">
const DashboardIcon = {
  template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>`
}

const BookOpenIcon = {
  template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`
}

const DocumentTextIcon = {
  template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`
}

const LibraryIcon = {
  template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`
}

const NoteIcon = {
  template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>`
}

const QuestionMarkCircleIcon = {
  template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
}

const ChatIcon = {
  template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>`
}

const ChartBarIcon = {
  template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>`
}

const CogIcon = {
  template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`
}

const UsersIcon = {
  template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`
}

const VideoCameraIcon = {
  template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>`
}

const ChartIcon = {
  template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>`
}

const TrophyIcon = {
  template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 21h8m-4-4v4M6 4h12v3a6 6 0 01-12 0V4zM6 4H3v1a4 4 0 004 4M18 4h3v1a4 4 0 01-4 4"></path></svg>`
}

const FlaskIcon = {
  template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 3v5.25L4.5 18a1.5 1.5 0 001.32 2.25h12.36A1.5 1.5 0 0019.5 18l-5.25-9.75V3M8.25 3h7.5M8.25 14.25h7.5"></path></svg>`
}

const AcademicCapIcon = {
  template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"></path><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>`
}

const BookIcon = {
  template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`
}

const CheckCircleIcon = {
  template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
}

const BriefcaseIcon = {
  template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`
}

const UserGroupIcon = {
  template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>`
}

const BuildingOfficeIcon = {
  template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>`
}

const BuildingLibraryIcon = {
  template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`
}

const CalendarIcon = {
  template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>`
}

const CalendarDaysIcon = {
  template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>`
}

const KeyIcon = {
  template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>`
}

const CloudArrowUpIcon = {
  template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>`
}

const DocumentIcon = {
  template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`
}

export { DashboardIcon, BookOpenIcon, DocumentTextIcon, LibraryIcon, NoteIcon, QuestionMarkCircleIcon, ChatIcon, ChartBarIcon, CogIcon, UsersIcon, VideoCameraIcon, ChartIcon, AcademicCapIcon, BookIcon, CheckCircleIcon, BriefcaseIcon, UserGroupIcon, BuildingOfficeIcon, BuildingLibraryIcon, CalendarIcon, CalendarDaysIcon, KeyIcon, CloudArrowUpIcon, DocumentIcon, TrophyIcon, FlaskIcon }

// Sidebar menu items reference icons by name (e.g. icon: 'BookOpenIcon') so the menu arrays stay
// plain, serialisable data - <component :is="item.icon"> can't resolve a local script-setup
// binding from a runtime string on its own, so this map is what actually turns that name back
// into the component for rendering.
const iconMap: Record<string, any> = {
  DashboardIcon, BookOpenIcon, DocumentTextIcon, LibraryIcon, NoteIcon, QuestionMarkCircleIcon,
  ChatIcon, ChartBarIcon, CogIcon, UsersIcon, VideoCameraIcon, ChartIcon, AcademicCapIcon, BookIcon,
  CheckCircleIcon, BriefcaseIcon, UserGroupIcon, BuildingOfficeIcon, BuildingLibraryIcon,
  CalendarIcon, CalendarDaysIcon, KeyIcon, CloudArrowUpIcon, DocumentIcon, TrophyIcon, FlaskIcon
}
</script>
