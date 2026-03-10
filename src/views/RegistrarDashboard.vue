<template>
  <div class="view-shell">
    <div class="view-content space-y-6">
      <div class="view-header">
        <h1 class="text-3xl font-bold text-slate-900">Registrar Office</h1>
        <p class="text-sm text-slate-500">Oversee enrollment workflows and student records.</p>
      </div>
      <div class="view-card p-6">
        <RoleFeatures />
      </div>
      <div class="view-card p-6">
        <GradeInquiryChatbot />
      </div>
    </div>
  </div>
</template>

<script setup>
import RoleFeatures from '@/Components/RoleFeatures.vue'
import GradeInquiryChatbot from '@/Components/GradeInquiryChatbot.vue';
</script>
