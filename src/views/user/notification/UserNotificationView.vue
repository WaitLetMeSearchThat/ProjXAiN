<template>
  <UserPageShell
    title="User Notification"
    description="A focused notification center that can later plug into Firestore or a messaging service."
  >
    <UserTabs />

    <section class="bg-white rounded-2xl border border-slate-200 p-5">
      <h2 class="text-base font-semibold text-slate-900 mb-4">Notifications</h2>
      <ul v-if="items.length" class="space-y-3">
        <li
          v-for="item in items"
          :key="item.id"
          class="rounded-xl border border-slate-200 p-4"
        >
          <p class="text-sm text-slate-900">{{ item.message }}</p>
          <p class="text-xs text-slate-500 mt-1">{{ item.time }}</p>
        </li>
      </ul>
      <p v-else class="text-sm text-slate-500">No notifications available.</p>
    </section>
  </UserPageShell>
</template>

<script setup>
import { ref } from 'vue'
import UserPageShell from '@/Components/user/UserPageShell.vue'
import UserTabs from '@/Components/user/UserTabs.vue'

const items = ref([
  { id: 'n1', message: 'Your profile was viewed recently.', time: 'Today' },
  { id: 'n2', message: 'A new announcement was posted.', time: 'Yesterday' }
])
</script>
