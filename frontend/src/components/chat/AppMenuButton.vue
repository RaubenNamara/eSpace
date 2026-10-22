<template>
  <!-- Chat runs full screen like WhatsApp Web; this brings Tusome's own menu in over it -->
  <button type="button" class="p-1.5 -ml-1.5 rounded-full" title="Tusome menu" aria-label="Open the Tusome menu" @click="openAppSidebar">
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { openAppSidebar } from '@/utils/appSidebar'
</script>
