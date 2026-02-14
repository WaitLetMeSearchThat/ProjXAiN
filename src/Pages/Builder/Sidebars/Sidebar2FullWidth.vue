<script setup>
import { ref } from 'vue';

const links = ref([
    { name: 'Dashboard', icon: 'M3 4h18M3 10h18M3 16h18', current: true, href: '#' },
    { name: 'Component Catalog', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z', current: false, href: '#' },
    { name: 'Users & Roles', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20h-5v-2a3 3 0 015-2.75V20zM9 17a2 2 0 00-2-2H5a2 2 0 00-2 2v2h2m4-2h4m-4 0h4m-4 0v-2m4 2v-2', current: false, href: '#' },
    { name: 'Settings', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', current: false, href: '#' },
]);

const selectLink = (selectedLink) => {
    links.value.forEach(link => link.current = (link === selectedLink));
    console.log(`Navigating to ${selectedLink.name}`);
};
</script>

<template>
    <div class="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-xl z-30 transition-width duration-200 hidden md:flex flex-col">
        
        <div class="flex items-center h-16 px-6 border-b border-gray-200 dark:border-gray-700">
            <span class="text-indigo-600 dark:text-white text-3xl font-extrabold tracking-tight">
                App Name
            </span>
        </div>
        
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center">
                <img class="h-10 w-10 rounded-full object-cover border-2 border-indigo-500" src="https://via.placeholder.com/150/500000/FFFFFF?text=JD" alt="User Profile">
                <div class="ml-3">
                    <p class="text-sm font-medium text-gray-900 dark:text-white">Jane Doe</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Admin</p>
                </div>
            </div>
        </div>

        <nav class="flex-1 space-y-2 py-4 px-4">
            <a v-for="link in links" :key="link.name" 
               :href="link.href" 
               @click.prevent="selectLink(link)"
               class="group w-full flex items-center p-3 rounded-lg text-sm font-medium transition duration-150"
               :class="{ 
                   'bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300': link.current, 
                   'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700': !link.current 
               }">
                
                <svg class="h-6 w-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="link.icon"></path>
                </svg>
                <span>{{ link.name }}</span>
            </a>
        </nav>

        <div class="mt-auto py-4 px-4 border-t border-gray-200 dark:border-gray-700">
            <a href="#" class="flex items-center p-3 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 transition duration-150">
                 <svg class="h-6 w-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                Logout
            </a>
        </div>
    </div>
</template>

<style scoped>
/* Ensure the main content area has padding on the left equal to the sidebar width (w-64 -> 16rem or 256px) */
/* The layout wrapper component (AuthenticatedLayout) would need a class like 'md:pl-64' */
</style>x