<template>
  <footer class="bg-gradient-to-b from-gray-900 to-black">
    <!-- Newsletter Section -->
    <div class="py-16 px-6">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Stay in the loop
        </h2>
        <p class="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter for the latest updates, tips, and exclusive offers.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email"
            class="flex-1 px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
          <button class="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-lg hover:opacity-90 transition whitespace-nowrap">
            Subscribe
          </button>
        </div>
        
        <p class="text-gray-500 text-sm mt-4">
          By subscribing, you agree to our Privacy Policy and consent to receive updates.
        </p>
      </div>
    </div>
    
    <!-- Footer Links -->
    <div class="py-8 px-6 border-t border-gray-800">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="flex items-center space-x-2 mb-6 md:mb-0">
            <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-400 rounded-lg"></div>
            <span class="text-xl font-bold text-white">News<span class="text-green-400">Letter</span></span>
          </div>
          
          <nav class="flex flex-wrap justify-center gap-6 mb-6 md:mb-0">
            <a href="#" class="text-gray-400 hover:text-white transition">Home</a>
            <a href="#" class="text-gray-400 hover:text-white transition">About</a>
            <a href="#" class="text-gray-400 hover:text-white transition">Features</a>
            <a href="#" class="text-gray-400 hover:text-white transition">Pricing</a>
            <a href="#" class="text-gray-400 hover:text-white transition">Blog</a>
            <a href="#" class="text-gray-400 hover:text-white transition">Contact</a>
          </nav>
          
          <div class="text-gray-400 text-sm">
            <span class="mr-4">📧 contact@newsletter.com</span>
            <span>📞 +1 (555) 123-4567</span>
          </div>
        </div>
        
        <div class="mt-8 pt-8 border-t border-gray-800 text-center">
          <p class="text-gray-500 text-sm">
            © 2024 Newsletter Signup. All rights reserved. Made with ❤️ for the web community.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>