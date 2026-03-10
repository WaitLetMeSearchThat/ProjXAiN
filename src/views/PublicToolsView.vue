<script setup>
import Tools from '@/views/Tools.vue'
</script>

<template>
  <div class="view-shell min-h-screen">
    <div class="view-content pt-8">
      <div class="surface-glass rounded-2xl border border-elegant p-5 sm:p-6 shadow-sm mb-6">
        <div class="text-xs font-semibold uppercase tracking-widest text-subtle">Feature Card</div>
        <h1 class="h1 mt-2 text-2xl sm:text-3xl font-black">Tools Library</h1>
        <p class="mt-2 text-sm sm:text-base text-subtle">
          Public learning resources, curated references, and technical guides for web programming.
        </p>
      </div>
    </div>
    <Tools />
  </div>
</template>
