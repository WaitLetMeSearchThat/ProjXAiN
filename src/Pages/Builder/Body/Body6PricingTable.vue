<template>
  <section class="py-20 bg-gradient-to-b from-gray-900 to-black">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
          Simple, transparent
          <span class="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">pricing</span>
        </h2>
        <p class="text-xl text-gray-400 max-w-3xl mx-auto">
          Choose the perfect plan for your needs. All plans include our core features.
        </p>
      </div>
      
      <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <!-- Basic Plan -->
        <div class="bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
          <div class="mb-8">
            <h3 class="text-2xl font-bold text-white mb-4">Basic</h3>
            <p class="text-gray-400 mb-6">Perfect for individuals and small projects</p>
            <div class="flex items-baseline mb-2">
              <span class="text-5xl font-bold text-white">$19</span>
              <span class="text-gray-400 ml-2">/month</span>
            </div>
            <p class="text-sm text-gray-400">Billed annually or $24 month-to-month</p>
          </div>
          
          <button class="w-full py-3 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition mb-8">
            Get Started
          </button>
          
          <div class="space-y-4">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-300">Up to 5 projects</span>
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-300">Basic analytics</span>
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-300">Email support</span>
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-300">1GB storage</span>
            </div>
          </div>
        </div>
        
        <!-- Pro Plan (Featured) -->
        <div class="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-2xl border-2 border-blue-500 relative transform scale-105">
          <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span class="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-medium">
              MOST POPULAR
            </span>
          </div>
          
          <div class="mb-8">
            <h3 class="text-2xl font-bold text-white mb-4">Professional</h3>
            <p class="text-gray-400 mb-6">For growing teams and businesses</p>
            <div class="flex items-baseline mb-2">
              <span class="text-5xl font-bold text-white">$49</span>
              <span class="text-gray-400 ml-2">/month</span>
            </div>
            <p class="text-sm text-gray-400">Billed annually or $59 month-to-month</p>
          </div>
          
          <button class="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:opacity-90 transition mb-8">
            Start Free Trial
          </button>
          
          <div class="space-y-4">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-300">Unlimited projects</span>
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-300">Advanced analytics</span>
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-300">Priority support</span>
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-300">100GB storage</span>
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-300">Team collaboration</span>
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-300">API access</span>
            </div>
          </div>
        </div>
        
        <!-- Enterprise Plan -->
        <div class="bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
          <div class="mb-8">
            <h3 class="text-2xl font-bold text-white mb-4">Enterprise</h3>
            <p class="text-gray-400 mb-6">For large organizations</p>
            <div class="flex items-baseline mb-2">
              <span class="text-5xl font-bold text-white">$199</span>
              <span class="text-gray-400 ml-2">/month</span>
            </div>
            <p class="text-sm text-gray-400">Custom billing available</p>
          </div>
          
          <button class="w-full py-3 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition mb-8">
            Contact Sales
          </button>
          
          <div class="space-y-4">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-300">Everything in Pro</span>
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-300">Custom solutions</span>
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-300">Dedicated support</span>
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-300">On-premise deployment</span>
            </div>
            <div class="flex items-center">
              <svg class="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-300">SLA 99.9% uptime</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-16 text-center">
        <p class="text-gray-400">
          All plans include a 30-day money-back guarantee.
          <a href="#" class="text-blue-400 hover:text-blue-300 font-medium">Compare all features →</a>
        </p>
      </div>
    </div>
  </section>
</template>