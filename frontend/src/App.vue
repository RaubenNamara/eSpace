<template>
  <div id="app" :class="{ 'dark': themeStore.isDarkMode }">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useThemeStore } from './stores/theme'

const themeStore = useThemeStore()

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
