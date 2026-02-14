<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
    <RouterLink
      v-for="item in navItems"
      :key="item.to"
      :to="item.to"
      class="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div class="flex items-center gap-3">
        <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white/90">
          <component :is="item.icon" class="h-5 w-5" />
        </span>
        <div>
          <p class="text-sm font-semibold text-slate-900">{{ item.label }}</p>
          <p class="text-xs text-slate-500">{{ item.description }}</p>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { getRoleNavigation } from '@/Components/roleNavigation'

const { role, userProfile } = useAuth()

const resolvedRole = computed(() => role.value || userProfile.value?.role || '')
const navItems = computed(() => getRoleNavigation(resolvedRole.value))
</script>
