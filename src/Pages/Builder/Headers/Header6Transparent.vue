<template>
  <header class="header-transparent bg-transparent absolute top-0 left-0 right-0 z-50">
    <div class="max-w-7xl mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="logo text-2xl font-bold text-white drop-shadow-lg">
          Transparent<span class="text-blue-400">Nav</span>
        </div>
        
        <nav class="hidden md:flex items-center space-x-8">
          <a href="#" class="text-white/90 hover:text-white font-medium transition-colors">Home</a>
          <a href="#" class="text-white/90 hover:text-white font-medium transition-colors">Features</a>
          <a href="#" class="text-white/90 hover:text-white font-medium transition-colors">Pricing</a>
          <a href="#" class="text-white/90 hover:text-white font-medium transition-colors">About</a>
          <a href="#" class="text-white/90 hover:text-white font-medium transition-colors">Contact</a>
        </nav>
        
        <div class="flex items-center space-x-4">
          <button class="text-white/90 hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
          <button class="bg-white/10 backdrop-blur-sm text-white px-6 py-2 rounded-lg border border-white/20 hover:bg-white/20 transition">
            Sign In
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header-transparent {
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(10px);
}
</style>