<template>
  <!-- The super admin's "Remove photo" on an account: the photo now, and a button that takes it off
       (the account shows its initials until a new one is uploaded). Shows nothing to anyone else,
       or when there is no photo. -->
  <div v-if="canRemove" class="flex items-center gap-3" :class="compact ? '' : 'mb-5'">
    <img v-if="!hideImage" :src="resolveAssetUrl(photo!)" alt="" class="w-14 h-14 rounded-lg object-cover ring-2 ring-gray-200 dark:ring-gray-600">
    <button
      type="button"
      class="text-xs font-medium text-rose-600 dark:text-rose-300 hover:underline disabled:opacity-50"
      :disabled="removing"
      @click="remove"
    >{{ removing ? 'Removing…' : 'Remove photo' }}</button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { apiService } from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'
import { useConfirmStore } from '@/stores/confirm'
import { resolveAssetUrl } from '@/utils/url'

const props = defineProps<{
  type: 'student' | 'teacher' | 'hod' | 'admin'
  id: number
  photo: string | null | undefined
  name?: string
  // the page already shows the photo beside it
  hideImage?: boolean
  compact?: boolean
}>()
const emit = defineEmits<{ removed: [] }>()

const auth = useAuthStore()
const toast = useToastStore()
const confirmDialog = useConfirmStore()

const canRemove = computed(() => auth.user?.role === 'super_admin' && !!props.photo && props.id > 0)
const removing = ref(false)

const remove = async () => {
  const ok = await confirmDialog.open({
    title: 'Remove this profile photo?',
    message: `${props.name ? `${props.name}'s` : 'The'} photo is deleted, and their initials show instead until a new photo is uploaded.`,
    confirmLabel: 'Remove photo',
    danger: true
  })
  if (!ok) return
  removing.value = true
  try {
    await apiService.delete(`/admin/profile-photo/${props.type}/${props.id}`)
    toast.success('Profile photo removed')
    emit('removed')
  } catch (e: any) {
    toast.error(e.response?.data?.message || 'Could not remove the photo')
  } finally {
    removing.value = false
  }
}
</script>
