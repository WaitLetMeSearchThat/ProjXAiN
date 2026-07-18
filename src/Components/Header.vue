<script setup>
import { computed, defineAsyncComponent, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import ThemeSelector from '@/Components/ThemeSelector.vue'
import { useAuth } from '@/composables/useAuth'
import { getRoleDefaultRoute } from '@/Components/roleNavigation'

const LoginModal = defineAsyncComponent(() =>
  import('@/Components/LoginModal.vue')
)

const navLinks = ref([
  { name: 'HOME', to: { name: 'home' } },
  { name: 'FEATURES', to: { name: 'features' } },
  { name: 'RESOURCES', to: { name: 'features-tools' } },
{ name: 'IDE', to: '/builder' },
  { name: 'AI', to: '/grade-inquiry' },
  { name: 'COMPONENTS', to: '/builder' },
])

const isMenuOpen = ref(false)
const isLoginOpen = ref(false)
const isScrolled = ref(false)

const router = useRouter()
const route = useRoute()
const { user, userProfile, role, isAuthenticated, logout } = useAuth()
const resolvedRole = computed(() => role.value || userProfile.value?.role || '')
const roleLabel = computed(() => {
  const labels = {
    role_admin: 'Administrator',
    role_instructor: 'Instructor',
    role_student: 'Student',
    role_registrar: 'Registrar'
  }

  return labels[resolvedRole.value] || 'Portal User'
})

const displayName = computed(() => {
  return (
    user.value?.displayName ||
    userProfile.value?.displayName ||
    userProfile.value?.name ||
    (userProfile.value?.studentId ? `Student ${userProfile.value.studentId}` : '') ||
    roleLabel.value
  )
})

const avatarUrl = computed(() => user.value?.photoURL || '')

const initials = computed(() => {
  const name = displayName.value || ''
  const parts = name.split(' ').filter(Boolean)
  return parts.slice(0, 2).map((part) => part[0].toUpperCase()).join('') || 'ST'
})

const dashboardRoute = computed(() => getRoleDefaultRoute(resolvedRole.value))
const dashboardLabel = computed(() => {
  const labels = {
    role_admin: 'Admin Dashboard',
    role_instructor: 'Faculty Dashboard',
    role_student: 'Student Dashboard',
    role_registrar: 'Registrar Dashboard',
  }

  return labels[resolvedRole.value] || 'Dashboard'
})

function isActiveLink(link) {
  if (typeof link.to === 'string') {
    return route.path === link.to
  }

  if (link.to?.name) {
    return route.name === link.to.name
  }

  if (link.to?.path) {
    return route.path === link.to.path
  }

  return false
}

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
  closeMenu()
  router.push('/')
}

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
  <header
    class="fixed top-4  min-w-4xl max-w-5xl  left-1/2 z-50 w-[calc(100%-2rem)] -translate-x-1/2 rounded-xl shadow-2xl backdrop-blur-2xl transition-all duration-300"
    :class="[isScrolled ? 'bg-gray-900/80' : 'bg-white/80']"
  >
    <div class="sticky  max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between gap-4">
        <RouterLink
          to="/"
          class="glass-effect rounded-lg px-3 py-2 text-2xl font-bold text-emerald-600 transition hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-700 hover:text-white"
        >
      BCC
        </RouterLink>

        <nav class="hidden items-center space-x-4 rounded-xl bg-gray-100 px-4  md:flex">
          <RouterLink
            v-for="link in navLinks"
            :key="link.name"
            :to="link.to"
            class="relative rounded-md px-3 py-3 text-sm transition hover:scale-110 backdrop-blur-2xl"
            :class="isActiveLink(link) ? 'text-emerald-500' : 'text-emerald-950 hover:text-indigo-700'"
          >
            {{ link.name }}
            <span
              v-if="isActiveLink(link)"
              class="absolute left-0 -bottom-1 h-0.5 w-full rounded-full bg-indigo-600"
            />
          </RouterLink>
        </nav>

        <div class="glass-effect flex items-center gap-3 rounde d-lg p-2 shadow-2xl">
          <ThemeSelector class="hidden lg:block" />

          <template v-if="isAuthenticated">
            <div class="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-indigo-500 text-xs font-bold text-white">
              <img v-if="avatarUrl" :src="avatarUrl" class="h-full w-full object-cover" />
              <span v-else>{{ initials }}</span>
            </div>
            <div class="hidden text-right leading-tight xl:block">
              <div class="text-xs font-semibold text-slate-500">Signed in as</div>
              <div class="text-sm font-bold text-slate-800">{{ displayName }}</div>
            </div>
            <RouterLink
              :to="dashboardRoute"
              class="hidden rounded-lg bg-gradient-to-r from-emerald-600 to-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:scale-105 md:block"
            >
              {{ dashboardLabel }}
            </RouterLink>
            <button
              @click="handleLogout"
              class="hidden rounded-lg border border-slate-200 bg-white/90 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:block"
            >
              Logout
            </button>
          </template>

          <template v-else>
            <button
              @click="openLogin"
              class="hidden rounded-lg bg-gradient-to-r from-emerald-600 to-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:scale-105 md:block"
            >
              Login
            </button>
          </template>

          <button @click="toggleMenu" class="rounded-md p-2 text-gray-600 hover:bg-gray-100 md:hidden">
            <svg v-if="!isMenuOpen" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>

            <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div v-if="isMenuOpen" class="mx-4 mb-6 rounded-xl border-t border-gray-200 bg-white px-4 md:hidden">
      <div class="space-y-3 px-4 py-3">
        <ThemeSelector />

        <RouterLink
          v-for="link in navLinks"
          :key="link.name"
          :to="link.to"
          @click="closeMenu"
          class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
        >
          {{ link.name }}
        </RouterLink>

        <template v-if="isAuthenticated">
          <RouterLink
            :to="dashboardRoute"
            @click="closeMenu"
            class="block w-full rounded-md bg-emerald-600 px-3 py-2 text-base font-semibold text-white hover:bg-emerald-700"
          >
            {{ dashboardLabel }}
          </RouterLink>
          <button
            @click="handleLogout"
            class="w-full rounded-md border border-gray-200 px-3 py-2 text-left text-base font-semibold text-gray-700 hover:bg-gray-50"
          >
            Logout
          </button>
        </template>

        <template v-else>
          <button
            @click="openLogin"
            class="w-full rounded-2xl bg-emerald-400 px-3 py-2 text-base font-semibold text-white hover:bg-emerald-700"
          >
            Login
          </button>
        </template>
      </div>
    </div>
  </header>

  <div class="h-20"></div>

  <LoginModal
    :isOpen="isLoginOpen"
    @close="closeLogin"
    @login-success="handleLoginSuccess"
  />
</template>