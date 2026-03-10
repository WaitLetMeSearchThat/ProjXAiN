<template>
  <div class="view-shell">
    <div class="relative view-content py-12 sm:px-8">
      <div class="max-w-6xl mx-auto mb-6 rounded-2xl border border-elegant surface-glass p-5 sm:p-6 shadow-sm">
        <div class="text-xs font-semibold uppercase tracking-widest text-subtle">Public Feature Card</div>
        <h1 class="mt-2 text-2xl sm:text-3xl font-black h1">Assistant Chatbot</h1>
        <p class="mt-2 text-sm sm:text-base text-subtle">
          Public users can chat freely with the Assistant. Student-specific records are only shown after student ID and school email verification.
        </p>
      </div>
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
