<template>
  <div class="mb-10">
    <div class="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">

      <!-- Preview Header -->
      <div class="flex items-center justify-between px-5 py-3 bg-black/30 border-b border-white/10">
        <div class="flex items-center gap-2">
          <div class="flex gap-1.5">
            <div class="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div class="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div class="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          <span class="text-xs font-mono text-gray-500">Live Preview</span>
        </div>
        <div class="px-2 py-1 bg-green-500/20 rounded-full text-xs font-medium text-green-400 border border-green-500/30">
          Active
        </div>
      </div>

      <!-- Live Preview Content -->
      <div class="p-0">
        <div class="component-card flex flex-col min-h-[500px] bg-gray-900" id="component-preview">
          <div id="header-slot">
            <component :is="headerComponent" />
          </div>
          <div id="body-slot" class="flex-grow flex flex-col">
            <component :is="bodyComponent" />
          </div>
          <div id="footer-slot">
            <component :is="footerComponent" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  headerComponent: {
    type: Object,
    default: null
  },
  bodyComponent: {
    type: Object,
    default: null
  },
  footerComponent: {
    type: Object,
    default: null
  }
});
</script>

<style scoped>
/* Component Preview Styling */
.component-card {
  min-height: 500px;
  background: linear-gradient(135deg, #111827, #0f172a);
}

/* Smooth transitions */
#header-slot,
#body-slot,
#footer-slot {
  transition: all 0.2s ease;
}
</style>
