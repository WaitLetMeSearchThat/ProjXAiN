<template>
  <header class="bg-gray-900 h-16 border-b border-gray-800">
    <div class="h-full flex items-center">
      <!-- Sidebar Toggle -->
      <button class="px-4 h-full border-r border-gray-800 hover:bg-gray-800 transition">
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      
      <!-- Logo -->
      <div class="px-6 flex items-center">
        <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-3"></div>
        <span class="text-xl font-bold text-white">Dashboard<span class="text-blue-400">Pro</span></span>
      </div>
      
      <!-- Navigation -->
      <nav class="ml-8 flex space-x-1">
        <a href="#" class="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition">
          Overview
        </a>
        <a href="#" class="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition">
          Analytics
        </a>
        <a href="#" class="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition">
          Reports
        </a>
        <a href="#" class="px-4 py-2 text-sm text-blue-400 bg-blue-400/10 rounded-lg transition">
          Settings
        </a>
      </nav>
      
      <!-- Right Side -->
      <div class="ml-auto flex items-center space-x-4 px-6">
        <button class="text-gray-400 hover:text-white">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
          </svg>
        </button>
        <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full"></div>
      </div>
    </div>
  </header>
</template>