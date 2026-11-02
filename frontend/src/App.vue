<template>
  <div id="app" :class="{ 'dark': themeStore.isDarkMode }">
    <router-view />
    <ToastContainer />
    <ConfirmDialog />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useThemeStore } from './stores/theme'
import { useAuthStore } from './stores/auth'
import ToastContainer from './components/common/ToastContainer.vue'
import ConfirmDialog from './components/common/ConfirmDialog.vue'

const themeStore = useThemeStore()
const authStore = useAuthStore()

// Every tab shares one sign-in (the same browser cookie). When another tab signs out, or signs in
// as someone else, this tab would otherwise go on looking like the old account while the server
// answers as the new one ("Insufficient permissions" everywhere). So it follows: back to the
// login page, or reloaded as whoever is signed in now.
const accountOf = (raw: string | null) => {
  try {
    const u = raw ? JSON.parse(raw) : null
    return u ? `${u.role}:${u.id}` : ''
  } catch {
    return ''
  }
}
const onStorage = (e: StorageEvent) => {
  if (e.key !== 'user' && e.key !== null) return
  const mine = authStore.user ? `${authStore.user.role}:${authStore.user.id}` : ''
  const now = accountOf(localStorage.getItem('user'))
  if (now === mine) return
  if (!now) window.location.href = '/login'
  else window.location.reload()
}
onMounted(() => window.addEventListener('storage', onStorage))
onBeforeUnmount(() => window.removeEventListener('storage', onStorage))

onMounted(() => {
  // Reads the saved/system preference and applies it - themeStore.isDarkMode is a reactive
  // Pinia ref, so binding straight to it in the template (rather than a local copy that only
  // updated via a $subscribe callback registered too late to catch this call) keeps #app in
  // sync with every other dark: class in the app, not just document.documentElement.
  themeStore.loadTheme()
})
</script>

<style>
#app {
  min-height: 100vh;
  transition: background-color 0.3s ease, color 0.3s ease;
}

#app.dark {
  background-color: #0f172a;
  color: #f1f5f9;
}

#app:not(.dark) {
  background-color: #ffffff;
  color: #1e293b;
}
</style>
