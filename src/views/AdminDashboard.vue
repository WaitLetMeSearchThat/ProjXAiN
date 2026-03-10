<template>
  <div class="view-shell">
    <div class="view-content">
      <div class="view-header mb-6">
        <h1 class="text-3xl font-bold text-slate-900">Administrator Dashboard</h1>
        <p class="text-sm text-slate-500">Control access, manage users, and monitor system updates.</p>
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
