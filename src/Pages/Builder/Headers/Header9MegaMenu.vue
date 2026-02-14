<template>
  <header class="bg-gray-900 border-b border-gray-800">
    <div class="max-w-7xl mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <div class="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl"></div>
          <span class="text-2xl font-bold text-white">Mega<span class="text-purple-400">Menu</span></span>
        </div>
        
        <!-- Main Navigation -->
        <nav class="hidden lg:flex items-center space-x-1">
          <div class="group relative">
            <button class="px-4 py-2 text-gray-300 hover:text-white font-medium flex items-center space-x-1">
              <span>Products</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            <!-- Mega Menu Dropdown -->
            <div class="absolute hidden group-hover:block w-screen max-w-4xl left-1/2 transform -translate-x-1/2 mt-2 p-6 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl">
              <div class="grid grid-cols-3 gap-8">
                <div>
                  <h3 class="text-white font-semibold mb-4">Web Solutions</h3>
                  <div class="space-y-3">
                    <a href="#" class="block text-gray-400 hover:text-white">E-commerce</a>
                    <a href="#" class="block text-gray-400 hover:text-white">CMS</a>
                    <a href="#" class="block text-gray-400 hover:text-white">Portfolios</a>
                    <a href="#" class="block text-gray-400 hover:text-white">Blogs</a>
                  </div>
                </div>
                <div>
                  <h3 class="text-white font-semibold mb-4">Mobile Apps</h3>
                  <div class="space-y-3">
                    <a href="#" class="block text-gray-400 hover:text-white">iOS</a>
                    <a href="#" class="block text-gray-400 hover:text-white">Android</a>
                    <a href="#" class="block text-gray-400 hover:text-white">Cross-platform</a>
                    <a href="#" class="block text-gray-400 hover:text-white">PWA</a>
                  </div>
                </div>
                <div>
                  <h3 class="text-white font-semibold mb-4">Enterprise</h3>
                  <div class="space-y-3">
                    <a href="#" class="block text-gray-400 hover:text-white">CRM Systems</a>
                    <a href="#" class="block text-gray-400 hover:text-white">ERP Solutions</a>
                    <a href="#" class="block text-gray-400 hover:text-white">Custom Software</a>
                    <a href="#" class="block text-gray-400 hover:text-white">Cloud Migration</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <a href="#" class="px-4 py-2 text-gray-300 hover:text-white font-medium">Pricing</a>
          <a href="#" class="px-4 py-2 text-gray-300 hover:text-white font-medium">Resources</a>
          <a href="#" class="px-4 py-2 text-gray-300 hover:text-white font-medium">Company</a>
        </nav>
        
        <!-- CTA -->
        <div class="flex items-center space-x-4">
          <button class="text-gray-400 hover:text-white">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
          <button class="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition">
            Start Free Trial
          </button>
        </div>
      </div>
    </div>
  </header>
</template>