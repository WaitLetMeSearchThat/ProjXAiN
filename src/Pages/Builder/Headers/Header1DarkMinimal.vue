<template>
  <div class="w-full"> 
    <header class="sticky top-0 z-50 py-4 px-8 flex items-center justify-between bg-dark-bg/95 backdrop-blur-sm border-b border-gray-700/50">
      
      <a href="#" class="flex items-center space-x-2">
        <div class="w-3 h-3 bg-accent-blue transform rotate-45"></div>
        <span class="text-xl font-extrabold text-white tracking-wider">
          CODECRAFT
        </span>
      </a>

      <nav class="hidden md:flex items-center space-x-8">
        <a href="#" class="text-sm font-medium text-gray-400 hover:text-white transition duration-200">
          Products
        </a>
        <a href="#" class="text-sm font-medium text-white border-b-2 border-accent-blue pb-1">
          Dashboard
        </a>
        <a href="#" class="text-sm font-medium text-gray-400 hover:text-white transition duration-200">
          Pricing
        </a>
        <a href="#" class="text-sm font-medium text-gray-400 hover:text-white transition duration-200">
          Support
        </a>
      </nav>

      <div class="flex items-center space-x-4">
        <button class="px-5 py-2 text-sm font-semibold bg-white text-dark-bg rounded-lg hover:bg-gray-200 transition duration-150 shadow-lg">
          Get Started
        </button>
        
        <button class="md:hidden text-white">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>
    </header>
  </div>
  </template>

<script setup>
// This is a static UI component, no script is needed here.
</script>

<style scoped>
/* Scoped styles are optional, using Tailwind utility classes for this example. */
</style>