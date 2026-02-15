<template>
  <div>
    <!-- Mobile Drawer Button -->
    <button
      v-if="isAuthenticated"
      @click="isDrawerOpen = true"
      class="fixed top-4 left-4 z-[200] lg:hidden 
             bg-gray-950 backdrop-blur-xl 
             border 
             p-2 rounded-xl shadow-2xl rounded-lg"
    >
      ☰
    </button>

    <!-- Sidebar -->
    <transition name="slide">
      <aside
        v-if="isAuthenticated"
        :class="[
          'fixed lg:sticky top-0 left-0 z-[150]',
          'flex flex-col w-72 min-h-screen',
          'bg-gray-950 text-white backdrop-blur-2xl border-r border-white/20 shadow-2xl',
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        ]"
      >
        <!-- User Header -->
        <div class="px-6 py-6 border-b border-white/10">
          <div class="flex items-center gap-4">
            <div class="relative">
              <div class="w-14 h-14 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <img
                  v-if="avatarUrl"
                  :src="avatarUrl"
                  class="w-full h-full object-cover"
                />
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center text-white font-bold text-lg"
                >
                  {{ initials }}
                </div>
              </div>
            </div>

            <div>
              <div class="text-white font-semibold text-lg truncate max-w-[150px]">
                {{ displayName }}
              </div>
              <div class="text-white/60 text-sm">
                {{ roleLabel }}
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <RouterLink
            v-for="item in visibleNavItems"
            :key="item.label"
            :to="item.to"
            class="group flex items-center mx-4 gap-3 px-4 py-3 rounded-lg 
                   text-white hover:text-white 
                   hover:bg-white/10 transition-all duration-300"
          >
            <span
              class="w-10 h-10 rounded-xl  flex items-center justify-center 
                     bg-white/10   group-hover:bg-white/20 transition"
            >
              <component :is="item.icon" class="w-5 h-5 text-teal-300" />
            </span>
            <span class="font-medium">
              {{ item.label }}
            </span>
          </RouterLink>
        </nav>

       

        <!-- Bottom Actions -->
        <div class="p-4 border-t border-white/10 space-y-3">
          <button
            @click="openProfile"
            class="w-full py-3 rounded-xl 
                   bg-white/10 hover:bg-white/20 
                   text-white font-medium transition"
          >
            ⚙ Profile Settings
          </button>

          <button
            @click="handleLogout"
            class="w-full py-3 rounded-2xl 
                   bg-red-500/70 hover:bg-red-500
                   text-white font-medium transition"
          >
            Logout
          </button>
        </div>
      </aside>
    </transition>

    <!-- Mobile Overlay -->
    <div
      v-if="isDrawerOpen"
      @click="isDrawerOpen = false"
      class="fixed inset-0 bg-black/40 z-[140] lg:hidden"
    ></div>    <!-- Profile Modal -->
    <transition name="fade">
      <div
        v-if="showProfile"
        class="fixed inset-0 z-[300] bg-black/50 backdrop-blur-sm 
               flex items-center justify-center p-4"
      >
        <div
          class="w-full max-w-5xl 
                 bg-white rounded-3xl shadow-2xl p-6 md:p-8"
        >
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-2xl font-bold text-slate-900">Profile</h3>
              <p class="text-sm text-slate-500">Update your details. Student ID is locked.</p>
            </div>
            <button
              class="text-slate-400 hover:text-slate-700 transition"
              @click="showProfile = false"
            >
              ✕
            </button>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
            <!-- Left Profile Card -->
            <div class="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div class="flex flex-col items-center text-center">
                <div class="w-28 h-28 rounded-full overflow-hidden shadow-lg border-4 border-white bg-white">
                  <img
                    v-if="avatarPreview || avatarUrl"
                    :src="avatarPreview || avatarUrl"
                    class="w-full h-full object-cover"
                  />
                  <div
                    v-else
                    class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 
                           flex items-center justify-center text-white text-2xl font-bold"
                  >
                    {{ initials }}
                  </div>
                </div>
                <div class="mt-4 text-lg font-semibold text-slate-900">
                  {{ displayName }}
                </div>
                <div class="text-sm text-slate-500">
                  {{ roleLabel }}
                </div>
                <input
                  type="file"
                  class="mt-4 text-xs text-slate-500"
                  @change="handleAvatar"
                />
              </div>

              <div class="mt-6 grid grid-cols-3 gap-3 text-center">
                <div class="rounded-2xl bg-white border border-slate-200 p-3">
                  <div class="text-xs text-slate-400 uppercase tracking-wide">Program</div>
                  <div class="text-sm font-semibold text-slate-900 truncate">
                    {{ profileForm.program || 'N/A' }}
                  </div>
                </div>
                <div class="rounded-2xl bg-white border border-slate-200 p-3">
                  <div class="text-xs text-slate-400 uppercase tracking-wide">Year</div>
                  <div class="text-sm font-semibold text-slate-900 truncate">
                    {{ profileForm.yearLevel || 'N/A' }}
                  </div>
                </div>
                <div class="rounded-2xl bg-white border border-slate-200 p-3">
                  <div class="text-xs text-slate-400 uppercase tracking-wide">Section</div>
                  <div class="text-sm font-semibold text-slate-900 truncate">
                    {{ profileForm.section || 'N/A' }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Details -->
            <div class="space-y-6">
              <div class="rounded-3xl border border-slate-200 p-6">
                <div class="flex items-center justify-between mb-4">
                  <h4 class="text-base font-semibold text-slate-900">Details</h4>
                  <span class="text-xs text-slate-400 uppercase tracking-widest">Profile</span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="text-xs text-slate-500 uppercase tracking-wider">Student ID</label>
                    <input
                      v-model="profileForm.studentId"
                      class="input-modern mt-2 bg-slate-100 text-slate-500 cursor-not-allowed"
                      placeholder="Student ID"
                      readonly
                    />
                  </div>
                  <div>
                    <label class="text-xs text-slate-500 uppercase tracking-wider">Full Name</label>
                    <input
                      v-model="profileForm.fullName"
                      class="input-modern mt-2"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label class="text-xs text-slate-500 uppercase tracking-wider">Email</label>
                    <input
                      v-model="profileForm.email"
                      class="input-modern mt-2"
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <label class="text-xs text-slate-500 uppercase tracking-wider">Program</label>
                    <input
                      v-model="profileForm.program"
                      class="input-modern mt-2"
                      placeholder="Program"
                    />
                  </div>
                  <div>
                    <label class="text-xs text-slate-500 uppercase tracking-wider">Year Level</label>
                    <input
                      v-model="profileForm.yearLevel"
                      class="input-modern mt-2"
                      placeholder="Year Level"
                    />
                  </div>
                  <div>
                    <label class="text-xs text-slate-500 uppercase tracking-wider">Section</label>
                    <input
                      v-model="profileForm.section"
                      class="input-modern mt-2"
                      placeholder="Section"
                    />
                  </div>
                </div>
              </div>

              <div class="flex justify-end gap-3">
                <button
                  class="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 transition"
                  @click="showProfile = false"
                >
                  Cancel
                </button>

                <button
                  class="px-5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
                  :disabled="isSavingProfile"
                  @click="saveProfile"
                >
                  {{ isSavingProfile ? 'Saving...' : 'Save Changes' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, h, ref, reactive, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { getRoleNavigation } from '@/Components/roleNavigation'
import { updateStudentByStudentId } from '@/firebase/studentService'
import GradeInquiryChatbot from '@/Components/GradeInquiryChatbot.vue'

const { user, role, userProfile, logout } = useAuth()
const router = useRouter()

const isAuthenticated = computed(() => !!user.value)

const displayName = computed(() => {
  return user.value?.displayName || user.value?.email || 'User'
})

const avatarUrl = computed(() => user.value?.photoURL || '')

const initials = computed(() => {
  const name = displayName.value || ''
  const parts = name.split(' ').filter(Boolean)
  return parts.slice(0, 2).map(p => p[0].toUpperCase()).join('') || 'ST'
})

const roleLabel = computed(() => {
  const label = role.value || userProfile.value?.role
  return label ? label.replace('role_', '').toUpperCase() : 'GUEST'
})

const handleLogout = async () => {
  await logout()
  router.push('/')
}

const showProfile = ref(false)
const isDrawerOpen = ref(false)
const showRegistrarChat = ref(false)

// Define resolvedRole BEFORE using it in watch
const resolvedRole = computed(() => role.value || userProfile.value?.role || '')

watch(
  resolvedRole,
  (role) => {
    if (role === 'role_registrar') {
      showRegistrarChat.value = true
    }
  },
  { immediate: true }
)
const isSavingProfile = ref(false)
const avatarPreview = ref(null)

const profileForm = reactive({
  studentId: '',
  fullName: '',
  email: '',
  program: '',
  yearLevel: '',
  section: ''
})

const openProfile = () => {
  const profileRoute = resolvedRole.value === 'role_student' ? '/student/profile' : '/user/profile'
  router.push(profileRoute)
  isDrawerOpen.value = false
}

const handleAvatar = (e) => {
  const file = e.target.files[0]
  if (file) {
    avatarPreview.value = URL.createObjectURL(file)
  }
}

const saveProfile = async () => {
  const studentId = userProfile.value?.studentId || localStorage.getItem('studentId') || ''
  if (!studentId) return

  isSavingProfile.value = true

  const update = {
    fullName: profileForm.fullName,
    email: profileForm.email,
    program: profileForm.program,
    yearLevel: profileForm.yearLevel,
    section: profileForm.section
  }

  const result = await updateStudentByStudentId(studentId, update)

  if (result.success) {
    const merged = { ...(userProfile.value || {}), ...update }
    localStorage.setItem('userProfile', JSON.stringify(merged))
  }

  isSavingProfile.value = false
  showProfile.value = false
}

const LogoutIcon = {
  render() {
    return h('svg',
      {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      },
      [
        h('path', { d: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' }),
        h('path', { d: 'M16 17l5-5-5-5' }),
        h('path', { d: 'M21 12H9' })
      ])
  }
}

const visibleNavItems = computed(() => getRoleNavigation(resolvedRole.value))
</script>

<style>
.input-modern {
  @apply w-full px-4 py-3 rounded-xl border border-slate-200
         focus:ring-2 focus:ring-slate-900 outline-none transition;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

