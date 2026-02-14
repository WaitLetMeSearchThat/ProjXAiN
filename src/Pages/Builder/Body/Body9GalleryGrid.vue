<template>
  <section class="py-20 bg-gradient-to-b from-gray-900 to-black">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
          Featured
          <span class="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">Projects</span>
        </h2>
        <p class="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
          Explore stunning websites built with our components
        </p>
        
        <!-- Filter Tabs -->
        <div class="flex flex-wrap justify-center gap-4 mb-12">
          <button 
            v-for="category in categories" 
            :key="category.id"
            @click="activeCategory = category.id"
            :class="[
              'px-6 py-2 rounded-full font-medium transition-all',
              activeCategory === category.id 
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' 
                : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
            ]"
          >
            {{ category.name }}
          </button>
        </div>
      </div>
      
      <!-- Gallery Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Project 1 -->
        <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
          <div class="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
          
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <h3 class="text-xl font-bold text-white mb-2">E-commerce Platform</h3>
            <p class="text-gray-300 mb-4">Modern online store with seamless checkout experience</p>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-400">By: TechCorp</span>
              <a href="#" class="text-pink-400 hover:text-pink-300 font-medium text-sm">
                View Details →
              </a>
            </div>
          </div>
          
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <span class="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                E-commerce
              </span>
              <div class="text-yellow-400 flex">
                <svg v-for="i in 5" :key="i" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Nexus Store</h3>
            <p class="text-gray-400 text-sm">Fully responsive design with advanced filtering</p>
          </div>
        </div>
        
        <!-- Project 2 -->
        <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
          <div class="aspect-video bg-gradient-to-br from-green-500/20 to-cyan-500/20"></div>
          
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <h3 class="text-xl font-bold text-white mb-2">SaaS Dashboard</h3>
            <p class="text-gray-300 mb-4">Analytics dashboard with real-time data visualization</p>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-400">By: DataLabs</span>
              <a href="#" class="text-pink-400 hover:text-pink-300 font-medium text-sm">
                View Details →
              </a>
            </div>
          </div>
          
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <span class="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                Analytics
              </span>
              <div class="text-yellow-400 flex">
                <svg v-for="i in 5" :key="i" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Insight Pro</h3>
            <p class="text-gray-400 text-sm">Interactive charts and customizable widgets</p>
          </div>
        </div>
        
        <!-- Project 3 -->
        <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
          <div class="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20"></div>
          
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <h3 class="text-xl font-bold text-white mb-2">Portfolio Website</h3>
            <p class="text-gray-300 mb-4">Creative portfolio with smooth animations</p>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-400">By: DesignStudio</span>
              <a href="#" class="text-pink-400 hover:text-pink-300 font-medium text-sm">
                View Details →
              </a>
            </div>
          </div>
          
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <span class="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
                Portfolio
              </span>
              <div class="text-yellow-400 flex">
                <svg v-for="i in 5" :key="i" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Creative Showcase</h3>
            <p class="text-gray-400 text-sm">Minimal design with focus on content</p>
          </div>
        </div>
        
        <!-- Project 4 -->
        <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
          <div class="aspect-video bg-gradient-to-br from-yellow-500/20 to-orange-500/20"></div>
          
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <h3 class="text-xl font-bold text-white mb-2">Learning Platform</h3>
            <p class="text-gray-300 mb-4">Interactive courses with progress tracking</p>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-400">By: EduTech Inc</span>
              <a href="#" class="text-pink-400 hover:text-pink-300 font-medium text-sm">
                View Details →
              </a>
            </div>
          </div>
          
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <span class="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium">
                Education
              </span>
              <div class="text-yellow-400 flex">
                <svg v-for="i in 5" :key="i" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">LearnHub</h3>
            <p class="text-gray-400 text-sm">Video lessons with interactive quizzes</p>
          </div>
        </div>
        
        <!-- Project 5 -->
        <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
          <div class="aspect-video bg-gradient-to-br from-cyan-500/20 to-blue-500/20"></div>
          
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <h3 class="text-xl font-bold text-white mb-2">Travel Blog</h3>
            <p class="text-gray-300 mb-4">Beautiful travel stories with photo galleries</p>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-400">By: Wanderlust Co</span>
              <a href="#" class="text-pink-400 hover:text-pink-300 font-medium text-sm">
                View Details →
              </a>
            </div>
          </div>
          
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <span class="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium">
                Blog
              </span>
              <div class="text-yellow-400 flex">
                <svg v-for="i in 5" :key="i" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Travel Diaries</h3>
            <p class="text-gray-400 text-sm">Responsive design with map integration</p>
          </div>
        </div>
        
        <!-- Project 6 -->
        <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
          <div class="aspect-video bg-gradient-to-br from-red-500/20 to-rose-500/20"></div>
          
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <h3 class="text-xl font-bold text-white mb-2">Fitness App</h3>
            <p class="text-gray-300 mb-4">Workout tracking and progress analytics</p>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-400">By: FitTech</span>
              <a href="#" class="text-pink-400 hover:text-pink-300 font-medium text-sm">
                View Details →
              </a>
            </div>
          </div>
          
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <span class="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium">
                Fitness
              </span>
              <div class="text-yellow-400 flex">
                <svg v-for="i in 5" :key="i" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">FitTrack Pro</h3>
            <p class="text-gray-400 text-sm">Mobile-first design with dark mode</p>
          </div>
        </div>
      </div>
      
      <div class="text-center mt-12">
        <button class="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-lg hover:opacity-90 transition">
          View All Projects
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const categories = [
  { id: 'all', name: 'All Projects' },
  { id: 'ecommerce', name: 'E-commerce' },
  { id: 'saas', name: 'SaaS' },
  { id: 'portfolio', name: 'Portfolio' },
  { id: 'education', name: 'Education' },
  { id: 'blog', name: 'Blog' }
]

const activeCategory = ref('all')
</script>