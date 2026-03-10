<template>
  <div class="view-shell flex items-center justify-center p-4">
    <div class="view-card w-full max-w-md p-6">
      <h1 class="text-2xl font-bold h1">Set New Password</h1>
      <p class="mt-2 text-sm text-subtle">
        First login detected. Update your password to continue.
      </p>

      <form class="mt-6 space-y-4" @submit.prevent="handleSubmit">
        <div>
          <label class="block text-sm font-medium text-slate-100 mb-1">Current Password</label>
          <input
            v-model="form.currentPassword"
            type="password"
            required
            class="w-full text-gray-900 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your student ID"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-100 mb-1">New Password</label>
          <input
            v-model="form.newPassword"
            type="password"
            minlength="8"
            required
            class="w-full rounded-lg border text-gray-900 border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="At least 8 characters"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-100 mb-1">Confirm New Password</label>
          <input
            v-model="form.confirmPassword"
            type="password"
            minlength="8"
            required
            class="w-full text-gray-900 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Re-enter new password"
          />
        </div>

        <p v-if="message" :class="messageType === 'error' ? 'text-rose-600' : 'text-emerald-700'" class="text-sm">
          {{ message }}
        </p>

        <button
          type="submit"
          :disabled="submitting"
          class="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 disabled:opacity-60"
        >
          {{ submitting ? 'Saving...' : 'Update Password' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { completeInitialPasswordSetup } = useAuth()

const submitting = ref(false)
const message = ref('')
const messageType = ref('error')

const form = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const handleSubmit = async () => {
  message.value = ''
  if (form.newPassword !== form.confirmPassword) {
    messageType.value = 'error'
    message.value = 'New password and confirmation do not match.'
    return
  }

  submitting.value = true
  try {
    const result = await completeInitialPasswordSetup(form.currentPassword, form.newPassword)
    if (!result.success) {
      messageType.value = 'error'
      message.value = result.error || 'Failed to update password.'
      return
    }

    messageType.value = 'success'
    message.value = 'Password updated successfully. Redirecting...'
    setTimeout(() => {
      router.push('/student')
    }, 600)
  } finally {
    submitting.value = false
  }
}
</script>
