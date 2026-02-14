<template>
  <div class="flex min-h-screen bg-gray-100 relative">
    <Sidebar v-if="!hideSidebar" />

    <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from '@/Components/Sidebar.vue'

const route = useRoute()
const hideSidebar = computed(() => Boolean(route.meta?.hideSidebar))
</script>
