import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // State
  const isDarkMode = ref(false)

  // Actions
  function loadTheme() {
    // Light unless the person chose dark with the toggle - the device's own dark setting is not followed
    let stored: string | null = null
    try { stored = localStorage.getItem('theme') } catch { /* private mode */ }
    isDarkMode.value = stored === 'dark'

    applyTheme()
  }

  function setTheme(dark: boolean) {
    isDarkMode.value = dark
    localStorage.setItem('theme', dark ? 'dark' : 'light')
    applyTheme()
  }

  function toggleTheme() {
    setTheme(!isDarkMode.value)
  }

  function applyTheme() {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return {
    isDarkMode,
    loadTheme,
    setTheme,
    toggleTheme
  }
})
