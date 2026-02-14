<script setup>


defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  // CRITICAL FIX: Changed 'slug' to 'routePath' to match the data structure
  // used in landingpage.vue and the static routing strategy.
  routePath: {
    type: String,
    required: true
  }
})
</script>

<template>
  <!-- 
    Tailwind CSS classes replace the custom CSS in the <style> block, 
    achieving the same look (shadow, rounded corners, hover effect).
  -->
  <div 
    class="bg-white rounded-xl border border-gray-100 shadow-2xl 
           transition-all duration-300 hover:shadow-xl hover:shadow-indigo-100"
  >
    <div class="p-6">
      <h2 class="text-xl   nem font-semibold  mb-2">
        {{ title }}
      </h2>
      <p class=" h1 mb-4">
        {{ description }}
      </p>
      
      <router-link 
        :to="routePath" 
        class="inline-block text-indigo-600 font-medium 
               hover:text-indigo-800 transition duration-150 underline-offset-4 hover:underline"
      >
        Learn More
      </router-link>
    </div>
  </div>
</template>