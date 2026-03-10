<template>
  <div class="view-shell relative">
    <Sidebar v-if="!hideSidebar" />

    <main
      :class="[
        'view-shell min-h-screen',
        hideSidebar ? '' : 'lg:ml-72'
      ]"
    >
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
