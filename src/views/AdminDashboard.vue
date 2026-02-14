<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-slate-900">Administrator Dashboard</h1>
      <p class="text-sm text-slate-500">Control access, manage users, and monitor system updates.</p>
    </div>
    <RoleFeatures />
  </div>
</template>

<script setup>
import RoleFeatures from '@/Components/RoleFeatures.vue'
</script>
