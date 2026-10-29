<template>
  <!-- The public Privacy policy (/privacy), and "Report a concern": a report reaches every super
       admin at once (PrivacyReportController). The words are in data/privacy.ts. -->
  <div class="site-plain min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-white overflow-x-clip">
    <SiteHeader on-dark />

    <main>
      <section class="relative overflow-hidden bg-indigo-950 pt-28 sm:pt-36 pb-14 sm:pb-20 text-white">
        <div class="absolute inset-0" aria-hidden="true">
          <div class="absolute -top-48 -right-40 w-[42rem] h-[42rem] rounded-full bg-indigo-600/30 blur-3xl"></div>
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.07)_1px,transparent_0)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"></div>
        </div>
        <div class="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <span class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-indigo-100">
            <span class="w-1.5 h-1.5 rounded-full bg-indigo-300"></span>Last updated {{ PRIVACY_UPDATED }}
          </span>
          <h1 class="mt-5 font-jakarta text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.08]">Privacy policy</h1>
          <p class="mt-5 max-w-2xl text-base sm:text-lg text-white/80 leading-relaxed">{{ PRIVACY_INTRO }}</p>
          <div class="mt-8 flex flex-wrap gap-3">
            <a href="#report" class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-indigo-950 bg-white hover:bg-indigo-50 transition">Report a concern</a>
            <a :href="`mailto:${PRIVACY_EMAIL}`" class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-white ring-1 ring-white/25 hover:bg-white/10 transition">{{ PRIVACY_EMAIL }}</a>
          </div>
        </div>
      </section>

      <!-- The promises, then the policy -->
      <section class="py-14 sm:py-20">
        <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div class="grid sm:grid-cols-2 gap-3">
            <div v-for="p in PRIVACY_PROMISES" :key="p" class="flex items-start gap-3 rounded-2xl bg-indigo-50/70 dark:bg-indigo-500/10 p-4 text-sm font-semibold text-indigo-950 dark:text-indigo-100">
              <AppIcon name="check-circle" class="w-5 h-5 flex-shrink-0 text-indigo-600 dark:text-indigo-300" />{{ p }}
            </div>
          </div>

          <nav class="mt-12 rounded-2xl border border-slate-200 dark:border-white/10 p-5" aria-label="On this page">
            <p class="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">On this page</p>
            <ol class="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm list-decimal list-inside text-slate-700 dark:text-slate-300">
              <li v-for="s in PRIVACY_SECTIONS" :key="s.id"><a :href="`#${s.id}`" class="hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline">{{ s.title }}</a></li>
              <li><a href="#report" class="hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline">Report a concern</a></li>
            </ol>
          </nav>

          <article class="mt-12 space-y-12">
            <section v-for="(s, i) in PRIVACY_SECTIONS" :id="s.id" :key="s.id" class="scroll-mt-28">
              <h2 class="font-jakarta text-2xl sm:text-3xl font-extrabold tracking-tight">{{ i + 1 }}. {{ s.title }}</h2>
              <p v-for="para in s.paragraphs ?? []" :key="para" class="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed">{{ para }}</p>
              <ul v-if="s.items" class="mt-4 space-y-2.5">
                <li v-for="item in s.items" :key="item.label + item.text" class="flex gap-3 text-slate-700 dark:text-slate-300 leading-relaxed">
                  <span class="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0"></span>
                  <span><b v-if="item.label" class="font-semibold text-slate-900 dark:text-white">{{ item.label }}</b>{{ item.label ? ' - ' : '' }}{{ item.text }}</span>
                </li>
              </ul>
              <p v-if="s.after" class="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed">{{ s.after }}</p>
            </section>
          </article>
        </div>
      </section>

      <!-- Report a concern -->
      <section id="report" class="scroll-mt-20 py-14 sm:py-20 bg-indigo-50/60 dark:bg-indigo-950/20">
        <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div class="overflow-hidden rounded-[2rem] border border-slate-200 dark:border-white/10 grid lg:grid-cols-[1fr_1.2fr]">
            <div class="p-8 sm:p-10 bg-indigo-950 text-white">
              <h2 class="font-jakarta text-3xl font-extrabold tracking-tight">Report a concern</h2>
              <p class="mt-4 text-slate-300 leading-relaxed">Data someone should not see, an account used by someone else, a learner who may be at risk, bullying - tell us. It goes straight to the Tusome team, and we look at every report.</p>
              <ul class="mt-6 space-y-3 text-sm">
                <li class="flex items-start gap-3"><AppIcon name="check-circle" class="w-5 h-5 flex-shrink-0 text-indigo-300" />Reaches the team the moment you send it</li>
                <li class="flex items-start gap-3"><AppIcon name="check-circle" class="w-5 h-5 flex-shrink-0 text-indigo-300" />You don't have to sign in or give your name</li>
                <li class="flex items-start gap-3"><AppIcon name="check-circle" class="w-5 h-5 flex-shrink-0 text-indigo-300" />Leave a way to reach you if you want an answer</li>
              </ul>
              <p class="mt-6 text-sm text-slate-300">Or write to <a :href="`mailto:${PRIVACY_EMAIL}`" class="font-semibold text-white underline">{{ PRIVACY_EMAIL }}</a>.</p>
              <p class="mt-4 rounded-xl bg-white/10 p-3.5 text-sm text-white/90">If a child is in danger right now, call the police on <b>999</b> or the free child helpline <b>Sauti 116</b>, and tell the school.</p>
            </div>
            <div class="bg-white dark:bg-slate-950 p-6 sm:p-10">
              <div v-if="sent" class="h-full flex flex-col items-center justify-center text-center py-10">
                <span class="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300 flex items-center justify-center"><AppIcon name="check-circle" class="w-8 h-8" /></span>
                <h3 class="mt-5 font-jakarta text-2xl font-bold">Thank you</h3>
                <p class="mt-2 text-slate-600 dark:text-slate-400">Your report has reached the Tusome team.{{ form.contact.trim() ? ' We will get back to you.' : '' }}</p>
              </div>
              <form v-else class="space-y-4" novalidate @submit.prevent="send">
                <label class="block">
                  <span class="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">What is it about? *</span>
                  <select v-model="form.category" :class="[INPUT, errors.category ? 'border-rose-400' : 'border-slate-300 dark:border-white/15']">
                    <option value="">Choose one</option>
                    <option v-for="c in REPORT_CATEGORIES" :key="c.value" :value="c.value">{{ c.label }}</option>
                  </select>
                  <span v-if="errors.category" class="mt-1 block text-xs text-rose-600">{{ errors.category }}</span>
                </label>
                <label class="block">
                  <span class="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">What happened? *</span>
                  <textarea v-model="form.message" rows="5" maxlength="4000" placeholder="Where you saw it, when, and who it is about if you know" :class="[INPUT, errors.message ? 'border-rose-400' : 'border-slate-300 dark:border-white/15']"></textarea>
                  <span v-if="errors.message" class="mt-1 block text-xs text-rose-600">{{ errors.message }}</span>
                </label>
                <div class="grid sm:grid-cols-2 gap-4">
                  <label class="block">
                    <span class="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Your name (optional)</span>
                    <input v-model="form.contact_name" type="text" maxlength="120" autocomplete="name" :class="[INPUT, 'border-slate-300 dark:border-white/15']">
                  </label>
                  <label class="block">
                    <span class="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Email or phone (optional)</span>
                    <input v-model="form.contact" type="text" maxlength="150" autocomplete="email" :class="[INPUT, 'border-slate-300 dark:border-white/15']">
                  </label>
                </div>
                <!-- Never shown: only bots fill it in -->
                <input v-model="form.website" type="text" name="website" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true">
                <p v-if="error" class="text-sm text-rose-600">{{ error }}</p>
                <button type="submit" :disabled="sending" class="w-full sm:w-auto px-6 py-3 rounded-2xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 transition">
                  {{ sending ? 'Sending...' : 'Send report' }}
                </button>
              </form>
            </div>
          </div>
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
import { PRIVACY_EMAIL, PRIVACY_INTRO, PRIVACY_PROMISES, PRIVACY_SECTIONS, PRIVACY_UPDATED, REPORT_CATEGORIES } from '@/data/privacy'

usePageMeta(() => ({
  title: 'Privacy policy - Tusome',
  description: 'How Tusome looks after the data of schools, learners, parents and teachers, and how to report a concern.',
  path: '/privacy'
}))
useSiteScale()

const INPUT = 'w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500'
const form = ref({ category: '', message: '', contact_name: '', contact: '', website: '' })
const errors = ref<Record<string, string>>({})
const error = ref('')
const sending = ref(false)
const sent = ref(false)

const send = async () => {
  errors.value = {}
  error.value = ''
  if (!form.value.category) errors.value.category = 'Please choose what it is about'
  if (form.value.message.trim().length < 10) errors.value.message = 'Please tell us a little more about what happened'
  if (Object.keys(errors.value).length) return
  sending.value = true
  try {
    await axios.post('/api/privacy-reports', form.value)
    sent.value = true
  } catch (err: any) {
    const e = err.response?.data?.errors
    if (e) errors.value = e
    else error.value = err.response?.data?.message || `Something went wrong - please try again, or write to ${PRIVACY_EMAIL}.`
  } finally {
    sending.value = false
  }
}
</script>
