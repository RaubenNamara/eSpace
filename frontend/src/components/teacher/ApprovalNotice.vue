<template>
  <!-- On a teacher's eNote, book, Item Bank paper or video: waiting for the HOD's approval, or
       returned by the HOD with a note (see backend Services/ContentApproval). Nothing otherwise. -->
  <p v-if="status === 'pending'" class="mt-1.5 flex items-start gap-1.5 rounded-lg bg-amber-50 dark:bg-amber-900/30 px-2 py-1.5 text-[11px] text-amber-900 dark:text-amber-100">
    <span aria-hidden="true">⏳</span>
    <span>Waiting for your HOD's approval<template v-if="sent"> · sent {{ ago(sent) }}</template>. Students will see it once it is approved.</span>
  </p>
  <p v-else-if="status === 'draft' && note" class="mt-1.5 flex items-start gap-1.5 rounded-lg bg-rose-50 dark:bg-rose-900/30 px-2 py-1.5 text-[11px] text-rose-900 dark:text-rose-100">
    <span aria-hidden="true">↩</span>
    <span><b>Returned by your HOD:</b> {{ note }} Make the changes, then publish it again.</span>
  </p>
</template>

<script setup lang="ts">
defineProps<{ status: string; note?: string | null; sent?: string | null }>()

function ago(s: string) {
  const mins = Math.max(0, Math.round((Date.now() - new Date(s.replace(' ', 'T')).getTime()) / 60000))
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins} min ago`
  const h = Math.round(mins / 60)
  if (h < 24) return `${h} h ago`
  const d = Math.round(h / 24)
  return `${d} day${d === 1 ? '' : 's'} ago`
}
</script>
