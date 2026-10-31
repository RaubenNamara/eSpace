<template>
  <!-- Login slips to print and cut out: one card per student with their login and first password
       (LoginSlipController). /slips?class_id= for a class, ?student_id= for one student. Opened in
       its own tab from a teacher's class page or the admin's Students page. -->
  <div class="slips-page min-h-screen bg-gray-100 text-gray-900">
    <div class="no-print sticky top-0 z-10 bg-white border-b border-gray-200">
      <div class="mx-auto max-w-4xl px-4 py-3 flex flex-wrap items-center gap-3">
        <p class="font-semibold">Login slips <span v-if="slips.length" class="font-normal text-gray-500">· {{ slips.length }} {{ slips.length === 1 ? 'student' : 'students' }}</span></p>
        <p class="text-xs text-gray-500 flex-1 min-w-[12rem]">Print, cut along the dashed lines and hand each student their slip. A password a student has changed is never printed.</p>
        <button type="button" :disabled="!slips.length" class="px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50" @click="print">Print</button>
      </div>
    </div>

    <p v-if="loading" class="no-print py-16 text-center text-sm text-gray-500">Preparing the slips... this takes a few seconds for a big class.</p>
    <p v-else-if="error" class="no-print py-16 text-center text-sm text-red-600">{{ error }}</p>

    <div v-else class="sheet mx-auto bg-white">
      <div v-for="s in slips" :key="s.student_id" class="slip">
        <p class="text-[10px] font-semibold uppercase tracking-widest text-gray-500 truncate">{{ school || 'Tusome' }} · Tusome</p>
        <p class="mt-1 text-base font-bold leading-tight truncate">{{ s.name }}</p>
        <p class="text-xs text-gray-600">{{ s.class || '' }}<template v-if="s.class && s.admission_number"> · </template>{{ s.admission_number }}</p>
        <dl class="mt-2 grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5 text-sm">
          <dt class="text-gray-500">Login</dt><dd class="font-mono font-bold">{{ s.login }}</dd>
          <dt class="text-gray-500">Password</dt>
          <dd v-if="s.password" class="font-mono font-bold">{{ s.password }}</dd>
          <dd v-else class="text-xs text-gray-600">The one you chose. Forgot it? Ask your teacher to reset it.</dd>
        </dl>
        <p class="mt-2 text-[11px] text-gray-500">Log in at <b>tusome.ug/login</b><template v-if="s.password"> - then change your password (your name, top right).</template></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

interface Slip { student_id: number; name: string; admission_number: string; class: string | null; login: string; password: string | null }

const route = useRoute()
const auth = useAuthStore()
const slips = ref<Slip[]>([])
const school = ref<string | null>(null)
const loading = ref(true)
const error = ref('')

const print = () => window.print()

onMounted(async () => {
  const role = auth.userRole
  const base = role === 'admin' || role === 'super_admin' ? '/api/admin' : '/api/teacher'
  const params: Record<string, string> = {}
  if (route.query.class_id) params.class_id = String(route.query.class_id)
  if (route.query.student_id) params.student_id = String(route.query.student_id)
  try {
    const res = await axios.get(`${base}/login-slips`, { params })
    slips.value = res.data.data.slips
    school.value = res.data.data.school
    document.title = 'Login slips - Tusome'
    if (route.query.print === '1' && slips.value.length) setTimeout(print, 300)
  } catch (err: any) {
    error.value = err.response?.data?.message || 'The slips could not be prepared.'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* A4: two slips across, cut along the dashed lines */
.sheet {
  width: 210mm;
  max-width: 100%;
  padding: 8mm;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.slip {
  border: 1px dashed #9ca3af;
  padding: 4mm 5mm;
  margin: -0.5px;
  break-inside: avoid;
  min-width: 0;
}
@media (max-width: 640px) {
  .sheet { grid-template-columns: 1fr; padding: 4mm; }
}
@media print {
  .no-print { display: none !important; }
  .slips-page { background: #fff; }
  .sheet { width: auto; padding: 0; grid-template-columns: 1fr 1fr; }
  @page { size: A4; margin: 10mm; }
}
</style>
