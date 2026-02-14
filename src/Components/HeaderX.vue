<script setup>
import { ref } from 'vue';

// Define your primary routes/navigation links
// 'to' should match the 'path' defined in your router configuration (router/index.js)
const navLinks = ref([
    { name: 'Home', to: '/' },
    { name: 'Dashboard', to: '/dashboard' },
    { name: 'Profile', to: '/profile' },
    { name: 'Settings', to: '/settings' },
]);

// Simple state for a mobile responsive menu
const isMenuOpen = ref(false);

function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value;
}
</script>

<template>
    <header class="backdrop-blur shadow-2xl sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex-shrink-0">
                    <RouterLink to="/" class="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition duration-150">
                        APP-NAME
                    </RouterLink>
                </div>

                <nav class="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <RouterLink
                        v-for="link in navLinks"
                        :key="link.name"
                        :to="link.to"
                        class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition duration-150"
                        active-class="bg-indigo-50 text-indigo-700"
                    >
                        {{ link.name }}
                    </RouterLink>
                </nav>

                <div class="sm:hidden">
                    <button @click="toggleMenu" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg v-if="!isMenuOpen" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <div v-if="isMenuOpen" class="sm:hidden border-t border-gray-100 pb-2 pt-4">
            <div class="space-y-1 px-2">
                <RouterLink
                    v-for="link in navLinks"
                    :key="link.name"
                    :to="link.to"
                    @click="closeMenu"
                    class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition duration-150"
                    active-class="bg-indigo-100 text-indigo-800"
                >
                    {{ link.name }}
                </RouterLink>
            </div>
        </div>
    </header>
</template>