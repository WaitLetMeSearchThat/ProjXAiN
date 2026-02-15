<template>
  <nav class="mb-6 flex flex-wrap gap-2">
    <RouterLink
      v-for="tab in tabs"
      :key="tab.to"
      :to="tab.to"
      class="px-4 py-2 rounded-xl text-sm font-medium transition-colors"
      :class="isActive(tab.to) ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'"
    >
      {{ tab.label }}
    </RouterLink>
  </nav>
</template>

<script setup>
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()
const base = route.path.startsWith('/student/') ? '/student' : '/user'

const tabs = [
  { label: 'Profile', to: `${base}/profile` },
  { label: 'Post', to: `${base}/post` },
  { label: 'Notification', to: `${base}/notification` }
]

const isActive = (path) => route.path === path
</script>
