<template>
  <!-- Learning on your own (/join): a learner in no school asks to join. The Tusome team contacts
       them, takes payment, and activates them in the developer portal, which creates the login
       (LearnerRequestController, DevPortalController::activateLearner). -->
  <div class="site-plain min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-white overflow-x-clip">
    <SiteHeader on-dark />

    <main>
      <section class="relative overflow-hidden bg-indigo-950 pt-28 sm:pt-36 pb-14 sm:pb-20 text-white">
        <div class="absolute inset-0" aria-hidden="true">
          <div class="absolute -top-48 -right-40 w-[42rem] h-[42rem] rounded-full bg-indigo-600/30 blur-3xl"></div>
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.07)_1px,transparent_0)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"></div>
        </div>
        <div class="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <span class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-indigo-100">
            <span class="w-1.5 h-1.5 rounded-full bg-indigo-300"></span>For learners on their own
          </span>
          <h1 class="mt-5 font-jakarta text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.08]">Learn with Tusome, wherever you are</h1>
          <p class="mt-5 max-w-2xl text-base sm:text-lg text-white/80 leading-relaxed">Notes, books and practice for your class, on any phone - even if your school isn't on Tusome. Tell us who you are and we will contact you to get you started.</p>
        </div>
      </section>

      <section class="py-10 sm:py-14">
        <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 grid gap-6">
          <ol class="grid sm:grid-cols-3 gap-3">
            <li v-for="(s, i) in STEPS" :key="s" class="rounded-2xl bg-indigo-50/70 dark:bg-indigo-500/10 p-4 text-sm">
              <span class="block text-xs font-bold text-indigo-700 dark:text-indigo-300">Step {{ i + 1 }}</span>
              <span class="mt-1 block font-semibold text-indigo-950 dark:text-indigo-100">{{ s }}</span>
            </li>
          </ol>

          <div v-if="sent" class="rounded-3xl border border-slate-200 dark:border-white/10 p-8 sm:p-12 text-center">
            <span class="mx-auto w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300 flex items-center justify-center"><AppIcon name="check-circle" class="w-8 h-8" /></span>
            <h2 class="mt-5 font-jakarta text-2xl font-bold">Thank you, {{ form.first_name }}</h2>
            <p class="mt-2 text-slate-600 dark:text-slate-400">We have your request and will contact you on {{ form.phone || form.email }}.</p>
          </div>

          <form v-else class="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 p-5 sm:p-8 grid sm:grid-cols-2 gap-4" novalidate @submit.prevent="send">
            <label class="block">
              <span :class="LABEL">First name *</span>
              <input v-model="form.first_name" type="text" maxlength="50" autocomplete="given-name" :class="[INPUT, errors.first_name ? 'border-rose-400' : '']">
              <span v-if="errors.first_name" :class="ERR">{{ errors.first_name }}</span>
            </label>
            <label class="block">
              <span :class="LABEL">Last name *</span>
              <input v-model="form.last_name" type="text" maxlength="50" autocomplete="family-name" :class="[INPUT, errors.last_name ? 'border-rose-400' : '']">
              <span v-if="errors.last_name" :class="ERR">{{ errors.last_name }}</span>
            </label>
            <div class="sm:col-span-2">
              <span :class="LABEL">Your class *</span>
              <div class="flex flex-wrap gap-2">
                <button v-for="l in LEVELS" :key="l" type="button" :aria-pressed="form.level === l" class="px-4 py-2 rounded-full border text-sm font-semibold transition"
                  :class="form.level === l ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:border-indigo-400'"
                  @click="form.level = l">{{ l }}</button>
              </div>
              <span v-if="errors.level" :class="ERR">{{ errors.level }}</span>
            </div>
            <label class="block">
              <span :class="LABEL">Phone number</span>
              <input v-model="form.phone" type="tel" maxlength="40" autocomplete="tel" placeholder="07..." :class="[INPUT, errors.phone ? 'border-rose-400' : '']">
              <span v-if="errors.phone" :class="ERR">{{ errors.phone }}</span>
            </label>
            <label class="block">
              <span :class="LABEL">Email</span>
              <input v-model="form.email" type="email" maxlength="150" autocomplete="email" :class="[INPUT, errors.email ? 'border-rose-400' : '']">
              <span v-if="errors.email" :class="ERR">{{ errors.email }}</span>
            </label>
            <label class="block">
              <span :class="LABEL">Gender</span>
              <select v-model="form.gender" :class="INPUT">
                <option value="">Prefer not to say</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </label>
            <label class="block sm:col-span-2">
              <span :class="LABEL">Anything we should know? (optional)</span>
              <textarea v-model="form.message" rows="3" maxlength="1000" placeholder="e.g. the subjects you need most, or a parent's number to call" :class="INPUT"></textarea>
            </label>
            <!-- Never shown: only bots fill it in -->
            <input v-model="form.website" type="text" name="website" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true">
            <p v-if="error" class="sm:col-span-2 text-sm text-rose-600">{{ error }}</p>
            <div class="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-3">
              <button type="submit" :disabled="sending" class="px-7 py-3 rounded-2xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 transition">{{ sending ? 'Sending...' : 'Ask to join' }}</button>
              <p class="text-xs text-slate-500 dark:text-slate-400">A phone number or an email is needed, so we can reach you.</p>
            </div>
          </form>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import AppIcon from '@/components/common/AppIcon.vue'
import SiteHeader from '@/components/site/SiteHeader.vue'
import SiteFooter from '@/components/site/SiteFooter.vue'
import { usePageMeta } from '@/components/site/usePageMeta'
import { useSiteScale } from '@/components/site/useSiteScale'

usePageMeta(() => ({
  title: 'Learn on your own - Tusome',
  description: 'Notes, books and practice for your class on any phone, even if your school is not on Tusome.',
  path: '/join'
}))
useSiteScale()

const STEPS = ['Ask to join below', 'We call you and you pay', 'You get your login']
const LEVELS = ['S.1', 'S.2', 'S.3', 'S.4', 'S.5', 'S.6']
const LABEL = 'block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1'
const ERR = 'mt-1 block text-xs text-rose-600'
const INPUT = 'w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500'

const form = ref({ first_name: '', last_name: '', level: '', phone: '', email: '', gender: '', message: '', website: '' })
const errors = ref<Record<string, string>>({})
const error = ref('')
const sending = ref(false)
const sent = ref(false)

const send = async () => {
  errors.value = {}
  error.value = ''
  const f = form.value
  if (!f.first_name.trim()) errors.value.first_name = 'Please give your first name'
  if (!f.last_name.trim()) errors.value.last_name = 'Please give your last name'
  if (!f.level) errors.value.level = 'Please choose your class'
  if (!f.phone.trim() && !f.email.trim()) errors.value.phone = 'Please give a phone number or an email address'
  if (Object.keys(errors.value).length) return
  sending.value = true
  try {
    await axios.post('/api/learner-requests', f)
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
