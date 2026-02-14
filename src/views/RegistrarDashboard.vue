<template>
  <div class="p-6 m-4 bg-white rounded-lg shadow-2xl">
    <div class="mb-6 px-2 ">
      <h1 class="text-3xl font-bold  text-slate-900">Registrar Office</h1>
      <p class="text-sm text-slate-500">Oversee enrollment workflows and student records.</p>
    
    <RoleFeatures />  </div>
    <GradeInquiryChatbot />
  </div>

</template>

<script setup>
import RoleFeatures from '@/Components/RoleFeatures.vue'
import GradeInquiryChatbot from '@/Components/GradeInquiryChatbot.vue';
</script>
