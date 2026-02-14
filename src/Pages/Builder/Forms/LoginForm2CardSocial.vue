<script setup>
import { ref } from 'vue';

const links = ref([
    { name: 'Dashboard', icon: 'M3 4h18M3 10h18M3 16h18', current: true, href: '#' },
    { name: 'Components', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z', current: false, href: '#' },
    { name: 'Users', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20h-5v-2a3 3 0 015-2.75V20zM9 17a2 2 0 00-2-2H5a2 2 0 00-2 2v2h2m4-2h4m-4 0h4m-4 0v-2m4 2v-2', current: false, href: '#' },
    { name: 'Settings', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', current: false, href: '#' },
]);

const userNavigation = ref([
    { name: 'Your Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', href: '#' },
    { name: 'Sign out', icon: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1', href: '#' },
]);

const selectLink = (selectedLink) => {
    links.value.forEach(link => link.current = (link === selectedLink));
    console.log(`Navigating to ${selectedLink.name}`);
};
</script>

<template>
    <div class="fixed top-0 left-0 h-full w-20 bg-gray-800 dark:bg-gray-900 shadow-xl z-30 transition-width duration-200 hidden md:flex flex-col">
        
        <div class="flex items-center justify-center h-16 border-b border-gray-700 dark:border-gray-800">
            <span class="text-white text-2xl font-bold tracking-widest">
                LV
            </span>
        </div>
        
        <nav class="flex-1 space-y-2 py-4 px-2">
            <a v-for="link in links" :key="link.name" 
               :href="link.href" 
               @click.prevent="selectLink(link)"
               class="group w-full flex flex-col items-center p-3 rounded-xl transition duration-150"
               :class="{ 
                   'bg-indigo-600 text-white shadow-lg': link.current, 
                   'text-gray-400 hover:bg-gray-700 hover:text-white': !link.current 
               }">
                
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="link.icon"></path>
                </svg>
                <span class="text-xs mt-1">{{ link.name }}</span>
            </a>
        </nav>

        <div class="mt-auto py-4 px-2 border-t border-gray-700 dark:border-gray-800">
            <a v-for="item in userNavigation" :key="item.name" 
               :href="item.href"
               class="group w-full flex flex-col items-center p-3 rounded-xl transition duration-150 text-gray-400 hover:bg-gray-700 hover:text-white">
                
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon"></path>
                </svg>
                <span class="text-xs mt-1">{{ item.name }}</span>
            </a>
        </div>
    </div>
</template>

<style scoped>
/* Ensure the main content area has padding on the left equal to the sidebar width (w-20 -> 5rem or 80px) */
/* The layout wrapper component (AuthenticatedLayout) would need a class like 'md:pl-20' */
</style>