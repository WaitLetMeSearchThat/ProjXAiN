<template>
  <div class="view-shell">
    <div class="view-content">
      <div class="view-header mb-6">
        <h1 class="text-3xl font-bold text-slate-900">Faculty Portal</h1>
        <p class="text-sm text-slate-500">Manage your classes, grades, and announcements.</p>
      </div>
      <div class="view-card p-6">
        <RoleFeatures />
      </div>
    </div>
  </div>
</template>

<script setup>
import RoleFeatures from '@/Components/RoleFeatures.vue'
</script>
