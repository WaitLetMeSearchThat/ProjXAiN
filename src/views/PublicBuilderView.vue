<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="view-shell min-h-screen py-10 px-4 sm:px-8">
    <div class="view-content max-w-5xl">
      <div class="surface-glass rounded-2xl border border-elegant p-6 sm:p-8 shadow-sm">
        <div class="text-xs font-semibold uppercase tracking-widest text-subtle">Feature Card</div>
        <h1 class="h1 mt-2 text-3xl sm:text-4xl ">Web Builder Studio</h1>
        <p class="mt-3 text-subtle max-w-3xl">
          Build page sections visually with live preview and code export. This is the public entry card for Builder.
        </p>
        <div class="mt-5 flex flex-wrap gap-3">
          <RouterLink
            to="/builder"
            class="builder-primary-btn px-5 py-2.5 rounded-xl  font-semibold transition"
          >
            Open Builder
          </RouterLink>
          <RouterLink
            to="/features"
            class="px-5 py-2.5 rounded-xl border border-elegant text-subtle font-semibold hover:opacity-80 transition"
          >
            Back to Features
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.builder-primary-btn {
  background: linear-gradient(
    135deg,
    var(--accent-primary, #6366f1),
    var(--accent-secondary, #a855f7)
  );
}

.builder-primary-btn:hover {
  filter: brightness(1.08);
}
</style>
