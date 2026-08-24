import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // State
  const isDarkMode = ref(false)

  // Actions
  function loadTheme() {
    const stored = localStorage.getItem('theme')
    
    if (stored) {
      isDarkMode.value = stored === 'dark'
    } else {
      // Check system preference
      isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    
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
