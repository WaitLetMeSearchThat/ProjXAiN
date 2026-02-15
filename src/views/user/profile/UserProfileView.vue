<template>
  <UserPageShell
    :title="isStudent ? 'Student Profile' : 'User Profile'"
    :description="isStudent ? 'Academic identity, profile highlights, and peer network in one place.' : 'Centralized profile details for a cleaner and scalable user module.'"
  >
    <UserTabs />

    <div v-if="isStudent" class="space-y-5">
      <section class="rounded-[28px] overflow-hidden border border-slate-700/60 bg-[#0f1118] text-slate-100 shadow-2xl">
        <div
          class="h-40 sm:h-56 bg-cover bg-center relative"
          :style="coverStyle"
        >
          <div class="absolute inset-0 bg-gradient-to-b from-black/15 via-black/25 to-[#0f1118]"></div>
        </div>

        <div class="px-5 sm:px-8 pb-6">
          <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 -mt-14 sm:-mt-16 relative z-10">
            <div class="flex items-end gap-4">
              <div class="h-24 w-24 sm:h-28 sm:w-28 rounded-full border-4 border-[#0f1118] bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-xl">
                {{ initials }}
              </div>
              <div class="pb-2">
                <h2 class="text-2xl sm:text-3xl font-bold leading-tight">{{ fullName }}</h2>
                <p class="text-slate-300 text-sm">{{ program }} • {{ yearLevel }} {{ section }}</p>
                <p class="text-slate-400 text-xs mt-1">{{ email }}</p>
              </div>
            </div>

            <button class="self-start lg:self-auto rounded-xl px-5 py-2.5 bg-indigo-500/20 hover:bg-indigo-500/35 border border-indigo-400/40 text-indigo-100 font-semibold transition">
              + Follow
            </button>
          </div>

          <div class="mt-5 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
            <article>
              <h3 class="text-base font-semibold">About</h3>
              <p class="mt-2 text-slate-300 text-sm leading-relaxed">
                {{ profileBio }}
              </p>
              <p class="mt-3 text-xs text-slate-400">
                Student ID: <span class="text-slate-200 font-medium">{{ studentId }}</span> • Status: <span class="text-slate-200 font-medium">{{ roleText }}</span>
              </p>

              <div class="mt-5 flex flex-wrap gap-2">
                <button class="rounded-xl border border-slate-600 px-4 py-2 text-sm font-semibold hover:bg-slate-800 transition">Send message</button>
                <button class="rounded-xl border border-slate-600 px-4 py-2 text-sm font-semibold hover:bg-slate-800 transition">More</button>
              </div>
            </article>

            <article class="space-y-3">
              <div
                v-for="item in academicItems"
                :key="item.title"
                class="rounded-xl border border-slate-700 bg-slate-900/55 p-3"
              >
                <div class="text-sm font-semibold text-slate-100">{{ item.title }}</div>
                <div class="text-xs text-slate-300 mt-1">{{ item.detail }}</div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="rounded-3xl border border-slate-700/60 bg-[#11141c] text-slate-100 p-4 sm:p-6 shadow-xl">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-semibold">People In Your Program</h3>
          <button class="text-sm text-slate-300 hover:text-white transition">See all</button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <article
            v-for="peer in suggestedPeers"
            :key="peer.name"
            class="rounded-2xl border border-slate-700 bg-slate-900/60 p-4"
          >
            <div class="flex items-center gap-3">
              <div class="h-11 w-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center font-bold">
                {{ peer.initials }}
              </div>
              <div>
                <p class="font-semibold text-slate-100">{{ peer.name }}</p>
                <p class="text-xs text-slate-400">{{ peer.meta }}</p>
              </div>
            </div>
            <button class="mt-4 rounded-xl px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-sm font-semibold transition">
              Follow
            </button>
          </article>
        </div>
      </section>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <article class="bg-white rounded-2xl border border-slate-200 p-5 lg:col-span-1">
        <div class="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-xl font-semibold">
          {{ initials }}
        </div>
        <h2 class="text-lg font-semibold text-slate-900 mt-4">{{ displayName }}</h2>
        <p class="text-sm text-slate-600">{{ roleText }}</p>
      </article>

      <article class="bg-white rounded-2xl border border-slate-200 p-5 lg:col-span-2">
        <h3 class="text-base font-semibold text-slate-900 mb-4">Account Information</h3>
        <dl class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <dt class="text-slate-500">Full Name</dt>
            <dd class="text-slate-900 font-medium">{{ fullName }}</dd>
          </div>
          <div>
            <dt class="text-slate-500">Email</dt>
            <dd class="text-slate-900 font-medium">{{ email }}</dd>
          </div>
          <div>
            <dt class="text-slate-500">Student ID</dt>
            <dd class="text-slate-900 font-medium">{{ studentId }}</dd>
          </div>
          <div>
            <dt class="text-slate-500">Program</dt>
            <dd class="text-slate-900 font-medium">{{ program }}</dd>
          </div>
        </dl>
      </article>
    </div>
  </UserPageShell>
</template>

<script setup>
import { computed } from 'vue'
import { useAuth } from '@/composables/useAuth'
import UserPageShell from '@/Components/user/UserPageShell.vue'
import UserTabs from '@/Components/user/UserTabs.vue'
import techCover from '@/assets/frontend-tech.png'

const { user, role, userProfile } = useAuth()

const resolvedRole = computed(() => role.value || userProfile.value?.role || '')
const isStudent = computed(() => resolvedRole.value === 'role_student')

const roleText = computed(() => {
  const map = {
    role_admin: 'Administrator',
    role_student: 'Student',
    role_instructor: 'Instructor',
    role_registrar: 'Registrar'
  }
  return map[resolvedRole.value] || 'User'
})

const displayName = computed(() =>
  userProfile.value?.fullName ||
  userProfile.value?.displayName ||
  user.value?.displayName ||
  user.value?.email ||
  'User'
)

const initials = computed(() => {
  const parts = String(displayName.value).trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return 'U'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
})

const fullName = computed(() => userProfile.value?.fullName || displayName.value)
const email = computed(() => userProfile.value?.email || user.value?.email || 'N/A')
const studentId = computed(() => userProfile.value?.studentId || localStorage.getItem('studentId') || 'N/A')
const program = computed(() => userProfile.value?.program || 'N/A')
const yearLevel = computed(() => userProfile.value?.yearLevel || 'Year not set')
const section = computed(() => userProfile.value?.section || 'Section not set')

const coverStyle = computed(() => ({
  backgroundImage: `url('${techCover}')`
}))

const profileBio = computed(() =>
  `${fullName.value} is currently enrolled in ${program.value}. Focused on building practical technology skills while balancing coursework, projects, and collaborative activities.`
)

const academicItems = computed(() => [
  { title: 'Bacolod City College', detail: `${program.value} • ${yearLevel.value} • Section ${section.value}` },
  { title: 'Current Standing', detail: `Student ID: ${studentId.value}` },
  { title: 'Academic Focus', detail: 'Information systems, data workflow, and software problem-solving.' }
])

const suggestedPeers = computed(() => {
  const base = [
    { name: 'Alyssa Manalo', meta: `${program.value} ${yearLevel.value}`, initials: 'AM' },
    { name: 'Daryl Reyes', meta: `${program.value} Section ${section.value}`, initials: 'DR' },
    { name: 'Trisha Gomez', meta: 'Tech community member', initials: 'TG' }
  ]
  return base
})
</script>
