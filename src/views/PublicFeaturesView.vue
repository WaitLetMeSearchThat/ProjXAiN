<script setup>
import EnhancedNav from '@/Components/EnhancedNav.vue'
</script>

<template>
  <div class="view-shell py-10 px-4 sm:px-8">
    <div class="view-content space-y-7">
      <div class="relative overflow-hidden rounded-3xl border border-elegant surface-glass p-6 sm:p-9 shadow-2xl">
        <div class="absolute -top-16 -right-20 h-56 w-56 rounded-full theme-orb-primary blur-3xl"></div>
        <div class="absolute -bottom-20 -left-20 h-64 w-64 rounded-full theme-orb-secondary blur-3xl"></div>

        <div class="relative">
          <div class="theme-pill inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
            Public Portal
          </div>
          <h1 class="h1 mt-3 text-3xl sm:text-5xl font-black leading-tight">
            Project Features Hub
          </h1>
          <p class="text-subtle mt-3 max-w-3xl text-sm sm:text-base">
            Discover the platform capabilities through feature cards with guided access, security notes, and direct launch actions.
          </p>

        </div>
      </div>

      <EnhancedNav />
    </div>
  </div>
</template>
<style scoped>

.features-text-primary {
  color: var(--text-primary, #f1f5f9);
}

.features-accent {
  color: var(--accent-primary, #818cf8);
}

.theme-pill {
  color: var(--accent-primary, #818cf8);
  background: color-mix(in srgb, var(--accent-primary, #818cf8) 16%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent-primary, #818cf8) 40%, transparent);
}

.theme-orb-primary {
  background: color-mix(in srgb, var(--accent-primary, #818cf8) 30%, transparent);
}

.theme-orb-secondary {
  background: color-mix(in srgb, var(--accent-secondary, #c084fc) 28%, transparent);
}
</style>
