<script setup>
import { ref, computed, defineAsyncComponent, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import ThemeSelector from '@/Components/ThemeSelector.vue'
import { useAuth } from '@/composables/useAuth'

const LoginModal = defineAsyncComponent(() =>
  import('@/Components/LoginModal.vue')
)

const navLinks = ref([
  { name: 'Home', to: '/' },
  { name: 'Builder', to: '/builder' },
  { name: 'Tools', to: '/tools' },
])

const isMenuOpen = ref(false)
const isLoginOpen = ref(false)
const isScrolled = ref(false)

const router = useRouter()
const route = useRoute()
const { user, userProfile, role, isAuthenticated, logout } = useAuth()

/* -------------------------------
   USER DISPLAY LOGIC
-------------------------------- */
const displayName = computed(() => {
  return (
    user.value?.displayName ||
    userProfile.value?.displayName ||
    userProfile.value?.name ||
    user.value?.email ||
    'Student'
  )
})

const avatarUrl = computed(() => user.value?.photoURL || '')

const initials = computed(() => {
  const name = displayName.value || ''
  const parts = name.split(' ').filter(Boolean)
  return parts.slice(0, 2).map(p => p[0].toUpperCase()).join('') || 'ST'
})

/* -------------------------------
   NAVIGATION LOGIC
-------------------------------- */
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

function openLogin() {
  isLoginOpen.value = true
  closeMenu()
}

function closeLogin() {
  isLoginOpen.value = false
}

function handleLoginSuccess() {
  closeLogin()
}

async function handleLogout() {
  await logout()
  router.push('/')
}

/* -------------------------------
   SCROLL SHADOW EFFECT
-------------------------------- */
function handleScroll() {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <!-- FIXED HEADER -->
  <header
    class="fixed top-0 left-0 w-full  backdrop-blur-2xl z-50 transition-all duration-300"
    :class="[
      isScrolled
        ? ''
        : ''
    ]"
  >
    <div style="margin-top:-12px;"class="max-w-7xl  mx-auto  py-2 my-6 mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">

        <!-- LOGO -->
        <RouterLink
          to="/"
          class="text-2xl glass-effect  mt-6 hover:bg-gradient-to-r from-emerald-600 to-teal-700 px-4 py-2 rounded-lg font-bold text-emerald-600 hover:text-white transition"
        >
          Project X
        </RouterLink>

        <!-- DESKTOP NAV -->
        <nav class="hidden md:flex text-white bg-gradient-to-r from-emerald-700 to-emerald-200 hover:scale-110 items-center rounded-xl shadow-2xl space-x-6   px-12 py-5 backdrop-blur-2xl ">
          <RouterLink
            v-for="link in navLinks"
            :key="link.name"
            :to="link.to"
            class="relative px-4 py-2  backdrop-blur-2xl bg-gray-100 hover:scale-110  rounded-md px-3 mt-6 text-sm font-bold transition"
            :class="
              route.path === link.to
                ? 'text-emerald-500'
                : 'text-emerald-950 hover:text-indigo-700'
            "
          >
            {{ link.name }}

            <!-- Active underline -->
            <span
              v-if="route.path === link.to"
              class="absolute left-0 -bottom-1 w-full h-0.5 bg-indigo-600 rounded-full"
            />
          </RouterLink>
        </nav>

        <!-- RIGHT SECTION -->
        <div class="flex items-center glass-effect shadow-2xl p-2 rounded-lg mt-6 gap-4">

          <!-- AUTHENTICATED USER -->
          <template v-if="isAuthenticated">
             <!-- Avatar -->
              <div class="w-9 h-9 my-auto rounded-full overflow-hidden bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                <img
                  v-if="avatarUrl"
                  :src="avatarUrl"
                  class="w-full h-full object-cover"
                />
                <span v-else>{{ initials }}</span>
              </div>
            <div class="hidden sm:flex items-center gap-3 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm">

             

              <!-- Name -->
          

              <!-- Logout -->
              <button
                @click="handleLogout"
                class="text-sm text-gray-600  transition"
              >
                Logout
              </button>

            </div>
          </template>

          <!-- NOT AUTHENTICATED -->
          <template v-else>
            <button
              @click="openLogin"
              class="px-4 py-2  text-sm  font-semibold text-white rounded-lg bg-gradient-to-r from-emerald-600 to-teal-700 hover:scale-105 transition"
            >
              Login
            </button>
          </template>
<div class="hover:scale-110 bg-gray-100/30 rounded-lg">
          <ThemeSelector />
</div>
          <!-- MOBILE MENU BUTTON -->
          <button
            @click="toggleMenu"
            class="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            <svg
              v-if="!isMenuOpen"
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>

            <svg
              v-else
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

        </div>
      </div>
    </div>

    <!-- MOBILE MENU -->
    <div
      v-if="isMenuOpen"
      class="md:hidden bg-white border-t border-gray-200"
    >
      <div class="px-4 py-3 space-y-2">

        <RouterLink
          v-for="link in navLinks"
          :key="link.name"
          :to="link.to"
          @click="closeMenu"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
        >
          {{ link.name }}
        </RouterLink>

        <template v-if="isAuthenticated">
          <button
            @click="handleLogout"
            class="w-full text-left px-3 py-2 rounded-md text-base font-semibold text-gray-700 border border-gray-200 hover:bg-gray-50"
          >
            Logout
          </button>
        </template>

        <template v-else>
          <button
            @click="openLogin"
            class="w-full px-3 py-2 rounded-md text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Login
          </button>
        </template>

      </div>
    </div>
  </header>

  <!-- Spacer (IMPORTANT for fixed nav) -->
  <div class="h-16"></div>

  <!-- LOGIN MODAL -->
  <LoginModal
    :isOpen="isLoginOpen"
    @close="closeLogin"
    @login-success="handleLoginSuccess"
  />
</template>
