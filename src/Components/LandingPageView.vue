<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router'; 



// --- Modal Logic ---
const showModal = ref(false)
const modalTopic = ref(''); 
const modalRoute = ref('/'); // Stores the explicit route path

function openModal(topic, routePath) { // Accepts the route path
    modalTopic.value = topic; 
    modalRoute.value = routePath; // Saves the route path
    showModal.value = true; 
}

function closeModal() { 
    showModal.value = false;
    modalTopic.value = ''; 
    modalRoute.value = '/'; // Reset route path
}

const handleEscape = (e) => {
    if (e.key === 'Escape' && showModal.value) closeModal()
}

// --- Lifecycle Hooks for keyboard listener ---
onMounted(() => {
    document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
    <div class=" min-h-screen w-screen flex items-center">

        <div class="flex w-full absolute top-0 right-0 justify-end">
            <ThemeSelector />
        </div>

        <div class="shadow-2xl max-w-7xl mx-auto w-full h-auto rounded-xl">

            <div class="lg:flex lg:space-x-12 sm:pt-8 md:px-8 sm:px-6 s-px-6 px-4">

                <div class="nem lg:w-1/2 w-auto text-center lg:text-right text:shadow-lg">
                    <h1 class="nem title text-4xl sm:text-4xl md:text-4xl lg:text-6xl font-extrabold
                               text-gray-700 hover:text-purple-400
                               leading-tight max-w-xl mx-auto lg:mx-0">
                        FUTURE PROGRAMMERS HUB
                    </h1>
                    <p class="nem text-gray-600 italic px-2 mt-0 mb-2">
                        Bachelor of Science in Information Systems
                    </p>
                    <hr class=" my-2 border-t border-gray-400">
                    <p class="h1 text-gray-700 font-bold text-base sm:text-lg">
                        The HUB is an information and learning platform for interested BSIS Students of Bacolod City College to enhance their skills and build real-world projects.
                    </p>

                    <div class="flex justify-end pt-4 hidden lg:flex">
                    </div>
                </div>

                <div class="lg:w-1/2 justify-center lg:mt-0 rounded-2xl overflow-hidden">
                    <div class="auto mx-auto justify-center h-full border-4 mr-2
                                 border-gray-400 md:hover:scale-105 transition duration-300 rounded-2xl">
                        <img src="/images/bcc.jpg" alt="Hero Image"
                            class="w-full h-full object-cover rounded-xl border-2
                                   border-gray-400 shadow-2xl" />
                    </div>
                </div>
            </div>

            <div class="lg:hidden overflow-hidden justify-center flex py-4">
            </div>


            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-0 gap-4 py-4 lg:py-12">

                <div @click="openModal('Web Development', '/modules/web-development')" 
                     class="bg-gray-50 border border-gray-100 mx-4 p-4 rounded-2xl shadow-xl hover:shadow-xl hover:scale-105 cursor-pointer flex items-start space-x-4">
                    <div class="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4v-4H5a2 2 0 01-2-2V5z"/>
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-lg font-bold text-gray-600 mb-0.5">Web Development</h3>
                    </div>
                </div>

                <div @click="openModal('Process Management', '/modules/process-management')" 
                     class="bg-gray-50 border border-gray-100 mx-4 p-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer flex items-start space-x-4">
                    <div class="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-lg font-bold text-gray-600 mb-0.5">Process Management</h3>
                    </div>
                </div>

                <div @click="openModal('Fundamentals of Programming', '/modules/fundamentals')" 
                     class="bg-gray-50 border border-gray-100 mx-4 p-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer flex items-start space-x-4">
                    <div class="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-lg font-bold text-gray-600">Fundamentals of Programming</h3>
                    </div>
                </div>
            </div>

            <div v-if="showModal" class="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
                <div class=" rounded-lg border-rev shadow-2xl max-w-2xl w-full relative">

                    <button @click="closeModal"
                            class="absolute top-4 right-4 z-20 text-2xl font-extrabold text-gray-400 hover:nem p-2 rounded-full transition"
                            aria-label="Close Modal">
                        ✕
                    </button>

                    <div class="p-4 text-left">
                        <h1 class="text-3xl font-extrabold text-gray-800 mb-2 border-b pb-2">
                            {{ modalTopic }} Module Guide
                        </h1>
                        <p class="text-sm font-medium text-purple-600 mb-6">
                            Preview & Key Learning Outcomes
                        </p>

                        <div class="space-y-4 text-gray-700">
                            <p>
                                This module, **{{ modalTopic }}**, focuses on the practical application of core development principles. You'll move from theoretical knowledge to building real-world projects.
                            </p>
                            <ul class="list-disc list-inside ml-4 text-sm text-gray-600">
                                <li>Hands-on coding exercises.</li>
                                <li>Best practices for version control.</li>
                                <li>Peer code reviews and feedback.</li>
                            </ul>
                        </div>

                        <hr class="my-6 border-t border-gray-200">

                        <div class="flex justify-center">
                            <RouterLink 
                                :to="modalRoute" 
                                @click="closeModal"
                                class="px-8 py-3 rounded-xl bg-purple-600 text-white font-semibold shadow-lg hover:bg-pink-700 transition duration-300 transform hover:scale-105"
                            >
                            </RouterLink>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>