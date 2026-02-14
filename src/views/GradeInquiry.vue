<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-100 via-white to-slate-100">
    <div class="relative py-12 px-4  mx-auto sm:px-8">
      <div class="pointer-events-none absolute inset-0 opacity-60">
        <div class="absolute top-8  h-40 w-40 rounded-full bg-blue-200/50 blur-3xl"></div>
        <div class="absolute bottom-12 left-12 h-48 w-48 rounded-full bg-amber-200/50 blur-3xl"></div>
      </div>
      <GradeInquiryChatbot />
    </div>
  </div>
</template>

<script setup>
import GradeInquiryChatbot from '@/Components/GradeInquiryChatbot.vue'
import Sidebar from '@/Components/Sidebar.vue';

</script>
