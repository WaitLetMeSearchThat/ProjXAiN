<template>
  <header class="bg-white border-b border-gray-200">
    <div class="max-w-6xl mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Left Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <a href="#" class="text-gray-600 hover:text-gray-900 font-medium">Products</a>
          <a href="#" class="text-gray-600 hover:text-gray-900 font-medium">Solutions</a>
          <a href="#" class="text-gray-600 hover:text-gray-900 font-medium">Resources</a>
        </nav>
        
        <!-- Centered Logo -->
        <div class="absolute left-1/2 transform -translate-x-1/2">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg"></div>
            <span class="text-2xl font-bold text-gray-900">Centra<span class="text-blue-600">Lite</span></span>
          </div>
        </div>
        
        <!-- Right Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <a href="#" class="text-gray-600 hover:text-gray-900 font-medium">Pricing</a>
          <a href="#" class="text-gray-600 hover:text-gray-900 font-medium">Contact</a>
          <button class="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
            Get Started
          </button>
        </nav>
        
        <!-- Mobile Menu -->
        <button class="md:hidden text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      
      <!-- Bottom Bar -->
      <div class="mt-4 hidden md:flex justify-center space-x-6 text-sm">
        <a href="#" class="text-gray-500 hover:text-gray-900">Web Development</a>
        <a href="#" class="text-gray-500 hover:text-gray-900">Mobile Apps</a>
        <a href="#" class="text-gray-500 hover:text-gray-900">Cloud Solutions</a>
        <a href="#" class="text-gray-500 hover:text-gray-900">AI Integration</a>
        <a href="#" class="text-gray-500 hover:text-gray-900">Consulting</a>
      </div>
    </div>
  </header>
</template>