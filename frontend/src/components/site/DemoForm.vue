<template>
  <!-- Request a demo: a dark panel saying what happens next, and the form. Sends to
       POST /api/demo-requests; admins follow it up under Admin > Demo requests. -->
  <div class="relative overflow-hidden rounded-[2rem] border border-slate-200 dark:border-white/10">
    <div class="grid lg:grid-cols-2 gap-0 overflow-hidden">
      <div class="p-8 sm:p-12 bg-slate-900 text-white">
        <h2 class="font-jakarta text-3xl sm:text-4xl font-extrabold tracking-tight">{{ title }}</h2>
        <p class="mt-4 text-slate-300 leading-relaxed">Tell us a little about your school and we'll walk you through eSpace with your own classes and subjects - no obligation.</p>
        <ul class="mt-8 space-y-3">
          <li v-for="b in POINTS" :key="b" class="flex items-start gap-3 text-sm"><AppIcon name="check-circle" class="w-5 h-5 flex-shrink-0 text-indigo-300" />{{ b }}</li>
        </ul>
      </div>
      <div class="bg-white dark:bg-slate-950 p-6 sm:p-10">
        <div v-if="sent" class="h-full flex flex-col items-center justify-center text-center py-10">
          <span class="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300 flex items-center justify-center"><AppIcon name="check-circle" class="w-8 h-8" /></span>
          <h3 class="mt-5 font-jakarta text-2xl font-bold">Thank you!</h3>
          <p class="mt-2 text-slate-600 dark:text-slate-400">We've got your request and will be in touch with {{ form.school_name || 'your school' }} shortly.</p>
        </div>
        <form v-else class="grid sm:grid-cols-2 gap-4" novalidate @submit.prevent="send">
          <label class="sm:col-span-2 block">
            <span class="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">School name *</span>
            <input v-model="form.school_name" type="text" required maxlength="150" :class="[INPUT, errors.school_name ? 'border-rose-400' : 'border-slate-300 dark:border-white/15']">
            <span v-if="errors.school_name" class="mt-1 block text-xs text-rose-600">{{ errors.school_name }}</span>
          </label>
          <label class="block">
            <span class="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Your name *</span>
            <input v-model="form.contact_name" type="text" required maxlength="120" autocomplete="name" :class="[INPUT, errors.contact_name ? 'border-rose-400' : 'border-slate-300 dark:border-white/15']">
            <span v-if="errors.contact_name" class="mt-1 block text-xs text-rose-600">{{ errors.contact_name }}</span>
          </label>
          <label class="block">
            <span class="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Your role</span>
            <input v-model="form.role" type="text" maxlength="80" placeholder="e.g. Head teacher, DOS" :class="[INPUT, 'border-slate-300 dark:border-white/15']">
          </label>
          <label class="block">
            <span class="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Email</span>
            <input v-model="form.email" type="email" maxlength="150" autocomplete="email" :class="[INPUT, errors.email ? 'border-rose-400' : 'border-slate-300 dark:border-white/15']">
            <span v-if="errors.email" class="mt-1 block text-xs text-rose-600">{{ errors.email }}</span>
          </label>
          <label class="block">
            <span class="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Phone</span>
            <input v-model="form.phone" type="tel" maxlength="40" autocomplete="tel" :class="[INPUT, 'border-slate-300 dark:border-white/15']">
          </label>
          <div class="sm:col-span-2">
            <span class="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Number of students</span>
            <span class="flex flex-wrap gap-2">
              <button v-for="s in SIZES" :key="s" type="button" class="px-3 py-1.5 rounded-lg text-sm font-semibold border transition" :class="form.students === s ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 text-slate-600 dark:border-white/15 dark:text-slate-300'" :aria-pressed="form.students === s" @click="form.students = form.students === s ? '' : s">{{ s }}</button>
            </span>
          </div>
          <label class="sm:col-span-2 block">
            <span class="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Anything we should know?</span>
            <textarea v-model="form.message" rows="3" maxlength="2000" :class="[INPUT, 'border-slate-300 dark:border-white/15']"></textarea>
          </label>
          <!-- Never seen by people; only bots fill it in -->
          <input v-model="form.website" type="text" name="website" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true">
          <p v-if="error" class="sm:col-span-2 text-sm text-rose-600">{{ error }}</p>
          <button type="submit" :disabled="sending" class="sm:col-span-2 py-3 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 transition">
            {{ sending ? 'Sending…' : 'Request a demo' }}
          </button>
          <p class="sm:col-span-2 text-[11px] text-slate-400 text-center">We only use these details to arrange your demo.</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import AppIcon from '@/components/common/AppIcon.vue'

withDefaults(defineProps<{ title?: string }>(), { title: 'See eSpace in your school.' })

const INPUT = 'w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500'
const POINTS = ['A walk-through with your own classes and subjects', 'Answers to your questions from the people who build eSpace', 'A quote and a clear plan for your first term']
const SIZES = ['Under 300', '300-600', '600-1,000', 'Over 1,000']

const form = ref({ school_name: '', contact_name: '', role: '', email: '', phone: '', students: '', message: '', website: '' })
const errors = ref<Record<string, string>>({})
const error = ref('')
const sending = ref(false)
const sent = ref(false)

const send = async () => {
  errors.value = {}
  error.value = ''
  const d = form.value
  if (!d.school_name.trim()) errors.value.school_name = 'Please give the school\'s name'
  if (!d.contact_name.trim()) errors.value.contact_name = 'Please give your name'
  if (!d.email.trim() && !d.phone.trim()) errors.value.email = 'Please give an email address or a phone number'
  if (Object.keys(errors.value).length) return
  sending.value = true
  try {
    await axios.post('/api/demo-requests', d)
    sent.value = true
  } catch (err: any) {
    const e = err.response?.data?.errors
    if (e) errors.value = e
    else error.value = err.response?.data?.message || 'Something went wrong - please try again.'
  } finally {
    sending.value = false
  }
}
</script>
