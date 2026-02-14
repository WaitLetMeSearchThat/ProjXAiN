<template>
  <section class="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
    <!-- Background elements -->
    <div class="absolute inset-0">
      <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
    </div>
    
    <div class="max-w-6xl mx-auto px-6 relative z-10">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
          Loved by
          <span class="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">thousands</span>
          of developers
        </h2>
        <p class="text-xl text-gray-400 max-w-3xl mx-auto">
          See what our customers are saying about our platform
        </p>
      </div>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Testimonial 1 -->
        <div class="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full mr-4"></div>
            <div>
              <h4 class="font-bold text-white">Alex Johnson</h4>
              <p class="text-sm text-gray-400">CTO at TechCorp</p>
            </div>
          </div>
          
          <div class="flex mb-4">
            <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          </div>
          
          <p class="text-gray-300 italic mb-6">
            "This platform has transformed how we build web applications. The component library saved us hundreds of development hours."
          </p>
          
          <div class="flex items-center text-sm text-gray-400">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span>3 months ago</span>
          </div>
        </div>
        
        <!-- Testimonial 2 -->
        <div class="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mr-4"></div>
            <div>
              <h4 class="font-bold text-white">Sarah Miller</h4>
              <p class="text-sm text-gray-400">Lead Developer at StartupXYZ</p>
            </div>
          </div>
          
          <div class="flex mb-4">
            <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          </div>
          
          <p class="text-gray-300 italic mb-6">
            "The quality of components is exceptional. Our team's productivity increased by 40% since we started using this builder."
          </p>
          
          <div class="flex items-center text-sm text-gray-400">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span>1 month ago</span>
          </div>
        </div>
        
        <!-- Testimonial 3 -->
        <div class="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-400 rounded-full mr-4"></div>
            <div>
              <h4 class="font-bold text-white">Michael Chen</h4>
              <p class="text-sm text-gray-400">Product Manager at GrowthLabs</p>
            </div>
          </div>
          
          <div class="flex mb-4">
            <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          </div>
          
          <p class="text-gray-300 italic mb-6">
            "The best investment we made this year. The support team is incredibly responsive and the documentation is thorough."
          </p>
          
          <div class="flex items-center text-sm text-gray-400">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span>2 weeks ago</span>
          </div>
        </div>
      </div>
      
      <!-- Stats -->
      <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <div class="text-4xl font-bold text-white mb-2">4.9/5</div>
          <div class="text-gray-400">Average Rating</div>
        </div>
        <div>
          <div class="text-4xl font-bold text-white mb-2">2,500+</div>
          <div class="text-gray-400">Happy Customers</div>
        </div>
        <div>
          <div class="text-4xl font-bold text-white mb-2">99.8%</div>
          <div class="text-gray-400">Satisfaction Rate</div>
        </div>
        <div>
          <div class="text-4xl font-bold text-white mb-2">24/7</div>
          <div class="text-gray-400">Support Available</div>
        </div>
      </div>
    </div>
  </section>
</template>