<template>
  <section class="py-20 bg-gradient-to-b from-gray-900 to-black">
    <div class="max-w-6xl mx-auto px-6">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left Content -->
        <div>
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
            Get in
            <span class="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">touch</span>
          </h2>
          <p class="text-xl text-gray-400 mb-10">
            Have questions? We're here to help. Send us a message and we'll respond as soon as possible.
          </p>
          
          <div class="space-y-8">
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <h4 class="font-bold text-white mb-2">Email Us</h4>
                <p class="text-gray-400">support@webbuilder.com</p>
                <p class="text-sm text-gray-500">Typically replies within 4 hours</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                </svg>
              </div>
              <div>
                <h4 class="font-bold text-white mb-2">Live Chat</h4>
                <p class="text-gray-400">Available 24/7</p>
                <p class="text-sm text-gray-500">Instant support from our team</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <div>
                <h4 class="font-bold text-white mb-2">Visit Us</h4>
                <p class="text-gray-400">123 Tech Street, San Francisco</p>
                <p class="text-sm text-gray-500">CA 94107, United States</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Right Form -->
        <div class="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
          <form @submit.prevent="handleSubmit">
            <div class="space-y-6">
              <div>
                <label class="block text-gray-300 mb-2 font-medium">Full Name</label>
                <input 
                  type="text" 
                  v-model="form.name"
                  class="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="John Doe"
                  required
                >
              </div>
              
              <div>
                <label class="block text-gray-300 mb-2 font-medium">Email Address</label>
                <input 
                  type="email" 
                  v-model="form.email"
                  class="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="john@example.com"
                  required
                >
              </div>
              
              <div>
                <label class="block text-gray-300 mb-2 font-medium">Company</label>
                <input 
                  type="text" 
                  v-model="form.company"
                  class="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Your company (optional)"
                >
              </div>
              
              <div>
                <label class="block text-gray-300 mb-2 font-medium">Subject</label>
                <select 
                  v-model="form.subject"
                  class="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled selected>Select a subject</option>
                  <option value="support">Technical Support</option>
                  <option value="sales">Sales Inquiry</option>
                  <option value="partnership">Partnership</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label class="block text-gray-300 mb-2 font-medium">Message</label>
                <textarea 
                  v-model="form.message"
                  rows="5"
                  class="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                  placeholder="Tell us about your project or question..."
                  required
                ></textarea>
              </div>
              
              <div class="flex items-center">
                <input 
                  type="checkbox" 
                  id="newsletter"
                  v-model="form.newsletter"
                  class="w-4 h-4 bg-gray-900 border-gray-700 rounded focus:ring-blue-500 focus:ring-2"
                >
                <label for="newsletter" class="ml-2 text-gray-400">
                  Subscribe to our newsletter for updates and tips
                </label>
              </div>
              
              <button 
                type="submit"
                class="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-lg hover:opacity-90 transition flex items-center justify-center"
                :disabled="isSubmitting"
              >
                <span v-if="!isSubmitting">Send Message</span>
                <span v-else class="flex items-center">
                  <svg class="animate-spin h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  company: '',
  subject: '',
  message: '',
  newsletter: false
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  alert('Message sent successfully!')
  form.value = {
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    newsletter: false
  }
  isSubmitting.value = false
}
</script>