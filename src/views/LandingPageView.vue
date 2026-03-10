<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import ThemeSelector from '@/Components/ThemeSelector.vue'

import Calendar from '@/Components/Calendar.vue'

import RouteNotice from '../Components/RouteNotice.vue';
// ------------------------------
// Modal Logic
// ------------------------------
const showModal = ref(false)
const modalTopic = ref('')
const modalRoute = ref('/')

function openModal(topic, routePath) {
  // Modal and route navigation disabled for now.
  return
}

function closeModal() {
  showModal.value = false
  modalTopic.value = ''
  modalRoute.value = '/'
}

const handleEscape = (e) => {
  if (e.key === 'Escape' && showModal.value) closeModal()
}

onMounted(() => document.addEventListener('keydown', handleEscape))
onUnmounted(() => document.removeEventListener('keydown', handleEscape))

// ------------------------------
// Card Hover Logic
// ------------------------------
const hoveredIndex = ref(null)
function onHoverCard(index) { hoveredIndex.value = index }
function onLeaveCards() { hoveredIndex.value = null }

// ------------------------------
// Hero Text Split
// ------------------------------
const line1 = ref('Future '.split(''))
const line2 = ref('Programmers'.split(''))
const line3 = ref('Hub'.split(''))
</script>

<template>
  <RouteNotice
      v-model="showAuthNotice"
      v-if="isAuthenticated"
      title="Authentication Successful."
      :message="`Welcome, ${sessionName}`"
      primary-label="Proceed"
      @primary="handleProceed"
    />
    
    <div class="min-h-screen w-screen flex items-center">

    <!-- Theme Selector -->
    <div class="flex w-full absolute top-0 right-0 justify-end">
      <ThemeSelector />
    </div>

    <!-- Main Container -->
    <div class="shadow-2xl max-w-7xl mx-auto w-full h-auto rounded-lg">

      <!-- HERO SECTION -->
      <div class="lg:flex lg:space-x-12 sm:pt-8 md:px-8 sm:px-6 px-4">

        <!-- Left Side Text -->
        <div class="lg:w-1/2 w-auto text-center lg:text-right">

          <!-- Animated Hero Text -->
          <h1 class="text-3xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold leading-tight max-w-xl mx-auto lg:mx-0 neon-gradient">
            <span v-for="(letter, index) in line1" :key="'l1-'+index"
                  class="inline-block   animate-pop hover:animate-hover-pop sharp-letter">
              {{ letter }}
            </span>
            <br />
            <span v-for="(letter, index) in line2" :key="'l2-'+index"
                  class="inline-block animate-pop hover:animate-hover-pop sharp-letter">
              {{ letter }}
            </span>
                        <br />
              <span v-for="(letter, index) in line3" :key="'l3-'+index"
                  class="inline-block animate-pop hover:animate-hover-pop sharp-letter">
              {{ letter }}
            </span>
          </h1>

          <p class="h1 italic px-2 mt-0 mb-2">
            Bachelor of Science in Information Systems
          </p>

          <hr class="my-2 border-t border-gray-400">

          <p class="h1 font-bold text-base sm:text-lg">
            The HUB is an information and learning platform for BSIS students of Bacolod City College designed to enhance their skills through hands-on development.
          </p>

        </div>

        <!-- Right Side Image -->
        <div class="lg:w-1/2 justify-center lg:mt-0 rounded-2xl overflow-hidden">
          <div class="mx-auto justify-center h-full border-4 mr-2 border-gray-400 hover:scale-105 transition duration-300 rounded-2xl">
            <img src="/images/bcc.jpg"
                 alt="Hero Image"
                 class="w-full h-full object-cover rounded-xl border-2 border-gray-400 shadow-2xl" />
          </div>
        </div>
      </div>

      <!-- Extra spacing for mobile -->
      <div class="lg:hidden overflow-hidden justify-center flex py-4"></div>

      <!-- ========================================= -->
      <!--              3 SUBJECT CARDS              -->
      <!-- ========================================= -->
      <div 
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-0 gap-4 py-4 lg:py-12"
        @mouseleave="onLeaveCards"
      >
        <template v-for="(card, index) in [
          { title: 'Road Map', color: 'yellow', route: '/modules/web-development', icon: 'M3 5a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4v-4H5a2 2 0 01-2-2V5z' },
          { title: 'Process Management', color: 'purple', route: '/modules/process-management', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
          { title: 'Features', color: 'blue', route: '/features', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' }
        ]">
          <div
            @mouseenter="onHoverCard(index)"
            @click="openModal(card.title, card.route)"
            class="card-animate bg-gray-50 border border-gray-100 mx-4 p-4 rounded-2xl shadow-xl cursor-pointer flex items-start space-x-4"
            :style="hoveredIndex === index
              ? 'transform: scale(1.15) translateY(-12px); z-index:10; filter: brightness(1);'
              : hoveredIndex !== null
                ? 'transform: scale(0.92); filter: brightness(0.6);'
                : ''"
          >
            <div :class="`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-${card.color}-100 text-${card.color}-600`">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      :d="card.icon"/>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-bold text-gray-600 mb-0.5">{{ card.title }}</h3>
            </div>
          </div>
        </template>
      </div>

      <!-- ========================================= -->
      <!--                 MODAL                    -->
      <!-- ========================================= -->
      <div v-if="showModal" class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="rounded-lg border shadow-2xl max-w-5xl w-full relative bg-white">

          <button 
            @click="closeModal"
            class="absolute top-4 right-4 text-2xl font-extrabold text-gray-400 hover:text-gray-600 p-2 transition"
          >✕</button>

          <div class="p-6 text-left">
            <h1 class="text-3xl font-extrabold text-gray-800 mb-2 border-b pb-2">
              {{ modalTopic }} : Final Output Presentation (Calendar of Activities)
            </h1>

            <p class="text-sm font-medium text-purple-600 mb-6">
           Tips: Subconscious is important, do not feed yourself that you wont be able to make it. First Enemy is the self.
            </p>

            <div v-if="modalTopic !== 'Process Management'" class="space-y-4 text-gray-700">
              <p>
                This module, <strong>{{ modalTopic }}</strong>, focuses on the practical application of core development principles. You'll move from theoretical knowledge to building real-world projects.
              </p>

              <ul class="list-disc list-inside ml-4 text-sm text-gray-600">
                <li>Hands-on coding exercises.</li>
                <li>Best practices for version control.</li>
                <li>Peer code reviews and collaboration.</li>
              </ul>
            </div>
            <div v-if="modalTopic === 'Process Management'" class="space-y-4 text-gray-700">
                <p>
                    This is the schedule for the <strong>{{ modalTopic }}</strong> module. Below you can find the presentation schedule for each group.
                </p>
            </div>

            <Calendar v-if="modalTopic === 'Process Management'" class="mt-4" />

            <hr class="my-6 border-t border-gray-200">

            <div class="flex justify-center">
              <RouterLink 
                :to="modalRoute"
                @click="closeModal"
                class="px-8 py-3 rounded-xl bg-purple-600 text-white font-semibold shadow-lg hover:bg-purple-700 transition duration-300 transform hover:scale-105"
              >
                Proceed
              </RouterLink>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>    <Footer />
</template>

<style scoped>
/* --------------------------------- */
/* CARD ANIMATION */
.card-animate {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

/* --------------------------------- */

@keyframes gradient-move {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-pop {
  display: inline-block;
  transform: scale(0.8) skewX(-5deg);
  opacity: 0;
  animation: pop-in 0.6s forwards;
}

@keyframes pop-in {
  0%   { transform: scale(0.8) skewX(-5deg); opacity: 0; }
  60%  { transform: scale(1.2) skewX(0deg); opacity: 1; }
  100% { transform: scale(1) skewX(0deg); opacity: 1; }
}

.hover\:animate-hover-pop:hover {
  animation: hover-pop 0.3s forwards;
}

@keyframes hover-pop {
  0%   { transform: scale(1) skewX(0deg); }
  50%  { transform: scale(1.2) skewX(-3deg) rotate(-2deg); }
  100% { transform: scale(1) skewX(0deg) rotate(0deg); }
}

.sharp-letter {
  text-shadow:
    0 0 2px #fff,
    0 0 6px #fff,
    0 0 8px rgba(255,255,255,0.8),
    0 0 10px rgba(0,0,0,0.2);
  font-family: 'Orbitron', sans-serif; /* futuristic sharper font */
}
</style>
