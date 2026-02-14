<template>
  <header class="bg-gradient-to-r from-gray-900 to-gray-800">
    <div class="max-w-7xl mx-auto">
      <!-- Top Bar -->
      <div class="px-6 py-3 border-b border-gray-700/50 flex justify-between items-center">
        <div class="text-sm text-gray-400">
          <span class="text-green-400">●</span> All systems operational
        </div>
        <div class="flex items-center space-x-6 text-sm">
          <a href="#" class="text-gray-400 hover:text-white">Status</a>
          <a href="#" class="text-gray-400 hover:text-white">Support</a>
          <a href="#" class="text-gray-400 hover:text-white">Sales: +1 (800) 123-4567</a>
        </div>
      </div>
      
      <!-- Main Navigation -->
      <div class="px-6 py-4 flex items-center justify-between">
        <!-- Left Section -->
        <div class="flex items-center space-x-8">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg"></div>
            <span class="text-xl font-bold text-white">Split<span class="text-cyan-400">Nav</span></span>
          </div>
          
          <nav class="hidden md:flex items-center space-x-6">
            <a href="#" class="text-gray-300 hover:text-white font-medium">Platform</a>
            <a href="#" class="text-gray-300 hover:text-white font-medium">Solutions</a>
            <a href="#" class="text-gray-300 hover:text-white font-medium">Integrations</a>
          </nav>
        </div>
        
        <!-- Right Section -->
        <div class="flex items-center space-x-6">
          <nav class="hidden md:flex items-center space-x-6">
            <a href="#" class="text-gray-300 hover:text-white font-medium">Pricing</a>
            <a href="#" class="text-gray-300 hover:text-white font-medium">Documentation</a>
            <a href="#" class="text-gray-300 hover:text-white font-medium">Enterprise</a>
          </nav>
          
          <div class="flex items-center space-x-4">
            <button class="text-gray-400 hover:text-white">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </button>
            <button class="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition">
              Contact Sales
            </button>
            <div class="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full border border-gray-600"></div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>