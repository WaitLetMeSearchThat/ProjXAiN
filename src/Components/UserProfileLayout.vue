<template>
  <div class="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- LEFT COLUMN: Profile card & suggestions (mirrors image concept) -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Profile card – redesigned to match image concept (Helena Christensen style) -->
        <div class="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
          <div class="flex flex-col items-center text-center">
            <!-- Avatar with initials (gradient as in image concept) -->
            <div class="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg">
              {{ profile.initials }}
            </div>
            <!-- Name & role -->
            <h2 class="text-xl font-bold text-gray-800">{{ profile.name }}</h2>
            <p class="text-gray-500 text-sm">{{ profile.roleText }}</p>

            <!-- "mutual connections" style line from image -->
            <p class="text-xs text-gray-400 mt-2">4 mutual connections included: Alex Merced and Michele A. Griggs</p>

            <!-- Followers/following stats (image shows numbers) -->
            <div class="flex justify-center gap-6 my-4">
              <div class="text-center">
                <span class="block font-bold text-gray-800">{{ profile.following }}</span>
                <span class="text-xs text-gray-500">Following</span>
              </div>
              <div class="text-center">
                <span class="block font-bold text-gray-800">{{ profile.followers }}</span>
                <span class="text-xs text-gray-500">Followers</span>
              </div>
            </div>

            <!-- Action buttons: Send message + More (exactly as in image) -->
            <div class="flex gap-2 w-full">
              <button class="flex-1 py-2 bg-indigo-50 text-indigo-700 font-medium rounded-xl border border-indigo-200 hover:bg-indigo-100 transition-colors text-sm">
                Send message
              </button>
              <button class="px-4 py-2 bg-indigo-50 text-indigo-700 font-medium rounded-xl border border-indigo-200 hover:bg-indigo-100 transition-colors text-sm">
                More
              </button>
            </div>

            <!-- "People who follow Helena also follow" section (from image) -->
            <div class="w-full mt-6 pt-4 border-t border-gray-100">
              <p class="text-xs font-semibold text-gray-500 mb-3 text-left">People who follow Helena also follow</p>
              <!-- Two suggested followers exactly as in image (static concept) but we'll use dynamic if available -->
              <div v-if="suggestions.length >= 2" class="space-y-3">
                <div v-for="(item, idx) in suggestions.slice(0,2)" :key="idx" class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-semibold text-xs">
                    {{ item.initials }}
                  </div>
                  <div class="text-left">
                    <p class="font-medium text-gray-800 text-sm">{{ item.name }}</p>
                    <p class="text-xs text-gray-500">{{ item.role }} · Live</p>
                  </div>
                </div>
              </div>
              <!-- Fallback static concept from image if no dynamic data -->
              <div v-else class="space-y-3">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-semibold text-xs">JC</div>
                  <div class="text-left">
                    <p class="font-medium text-gray-800 text-sm">Jennifer Choe · 3rd</p>
                    <p class="text-xs text-gray-500">Marketing Coordinator · Live</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-semibold text-xs">SG</div>
                  <div class="text-left">
                    <p class="font-medium text-gray-800 text-sm">Stephen Gilbert-Rivera · 3rd</p>
                    <p class="text-xs text-gray-500">Web, eCommerce, Apps Developer | Software Engineer · Live</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Suggestion card (existing but matches image layout) -->
        <div class="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold text-gray-800">Suggestion</h3>
            <button class="text-sm text-indigo-600 hover:underline">View More</button>
          </div>
          <div class="space-y-3">
            <div v-for="(suggestion, idx) in suggestions.slice(0,4)" :key="idx" class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-semibold text-sm">
                {{ suggestion.initials }}
              </div>
              <div>
                <p class="font-medium text-gray-800">{{ suggestion.name }}</p>
                <p class="text-xs text-gray-500">{{ suggestion.role }}</p>
              </div>
            </div>
            <div v-if="!suggestions.length" class="text-sm text-gray-500">No suggestions available.</div>
          </div>
        </div>
      </div>

      <!-- MIDDLE COLUMN: Feed posts (mirroring image concept) -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Post input area (matches image: "Post a Project / Post a Job") -->
        <div class="bg-white rounded-2xl shadow-md p-4 border border-gray-200 flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex-shrink-0"></div>
          <input type="text" placeholder="Post a Project" class="w-full bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
          <button class="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors whitespace-nowrap">
            Post a Job
          </button>
        </div>

        <!-- Feed posts – dynamic, but we'll keep the visual structure from image -->
        <div v-for="(post, idx) in feedPosts" :key="idx" class="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
          <div class="flex items-start gap-3">
            <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {{ post.initials }}
            </div>
            <div class="flex-1">
              <div class="flex flex-wrap items-center gap-x-2 text-sm">
                <span class="font-bold text-gray-800">{{ post.author }}</span>
                <span class="text-gray-400">·</span>
                <span class="text-gray-500">{{ post.timeAgo }}</span>
                <span class="text-gray-400">·</span>
                <span class="text-gray-500">{{ post.category }}</span>
              </div>
              <h4 class="font-bold text-lg mt-2 text-gray-800">{{ post.title }}</h4>
              <div class="flex items-center gap-3 mt-1 text-sm">
                <span class="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs">{{ post.badge }}</span>
              </div>
              <p class="text-gray-600 text-sm mt-3 leading-relaxed">
                {{ post.preview }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN: Top profiles & comment stats (image concept) -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Top Profiles card (as in image) -->
        <div class="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
          <h3 class="font-bold text-gray-800 mb-4">Top Profiles</h3>
          <div class="space-y-4">
            <div v-for="(entry, idx) in topProfiles" :key="idx" class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-semibold text-sm">
                  {{ entry.initials }}
                </div>
                <div>
                  <p class="font-medium text-gray-800">{{ entry.name }}</p>
                  <p class="text-xs text-gray-500">{{ entry.role }}</p>
                </div>
              </div>
              <div class="flex gap-1">
                <button class="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded hover:bg-indigo-100">Follow</button>
                <button class="text-xs bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700">Hire</button>
              </div>
            </div>
            <div v-if="!topProfiles.length" class="text-sm text-gray-500">No profiles to show.</div>
          </div>
        </div>

        <!-- Comments summary (as in image concept) -->
        <div class="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-1">
              <span class="font-bold text-gray-800">{{ commentStats.total }}</span>
              <span class="text-gray-500 text-sm">Comments</span>
            </div>
            <div class="flex items-center gap-1">
              <span class="font-bold text-gray-800">{{ commentStats.mine }}</span>
              <span class="text-gray-500 text-sm">My Comments</span>
            </div>
          </div>
          <div class="mt-4 flex items-center gap-2">
            <div class="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
            <input type="text" placeholder="Add a comment..." class="w-full bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { useAuth } from '@/composables/useAuth'

const { user, role, userProfile } = useAuth()

const loading = ref(false)
const people = ref([])
const announcements = ref([])
const tickets = ref([])

const normalizeRole = (roleId) => {
  const map = {
    role_admin: 'Administrator',
    role_student: 'Student',
    role_instructor: 'Instructor',
    role_registrar: 'Registrar'
  }
  return map[roleId] || 'Member'
}

const getInitials = (name) => {
  const text = String(name || '').trim()
  if (!text) return 'U'
  const parts = text.split(/\s+/).filter(Boolean)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
}

const toMillis = (value) => {
  if (!value) return 0
  if (value?.toDate) return value.toDate().getTime()
  if (value instanceof Date) return value.getTime()
  const parsed = Date.parse(String(value))
  return Number.isNaN(parsed) ? 0 : parsed
}

const formatTimeAgo = (millis) => {
  if (!millis) return 'just now'
  const diffMs = Date.now() - millis
  const mins = Math.max(1, Math.floor(diffMs / 60000))
  if (mins < 60) return `${mins} min ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs} hr ago`
  return `${Math.floor(hrs / 24)} day ago`
}

const currentIdentity = computed(() => {
  const resolvedRole = role.value || userProfile.value?.role || ''
  const uid = user.value?.uid || userProfile.value?.uid || ''
  const email = String(user.value?.email || userProfile.value?.email || '').toLowerCase()
  const studentId = String(userProfile.value?.studentId || '').trim()

  const matched = people.value.find((entry) => {
    const entryEmail = String(entry.email || '').toLowerCase()
    return (
      (uid && entry.uid && entry.uid === uid) ||
      (studentId && entry.studentId && entry.studentId === studentId) ||
      (email && entryEmail && entryEmail === email)
    )
  })

  const fallbackName =
    userProfile.value?.displayName ||
    userProfile.value?.fullName ||
    user.value?.displayName ||
    user.value?.email ||
    'User'

  return {
    uid,
    name: matched?.name || fallbackName,
    roleText: matched?.role || normalizeRole(resolvedRole),
    email: matched?.email || email
  }
})

const profile = computed(() => {
  const me = currentIdentity.value
  const myAnnouncements = announcements.value.filter((item) => item.author === me.name).length
  const myTickets = tickets.value.filter((item) => {
    const createdByUid = String(item.createdByUid || '')
    const createdByEmail = String(item.createdByEmail || '').toLowerCase()
    return (me.uid && createdByUid === me.uid) || (me.email && createdByEmail === me.email)
  }).length

  return {
    name: me.name,
    initials: getInitials(me.name),
    roleText: me.roleText,
    following: people.value.length,
    followers: myAnnouncements + myTickets
  }
})

const feedPosts = computed(() => {
  const posts = announcements.value
    .slice()
    .sort((a, b) => toMillis(b.createdAt) - toMillis(a.createdAt))
    .slice(0, 3)
    .map((item) => ({
      author: item.author || 'Anonymous',
      initials: getInitials(item.author || 'Anonymous'),
      timeAgo: formatTimeAgo(toMillis(item.createdAt)),
      category: item.category || 'general',
      title: item.title || 'Untitled Announcement',
      badge: item.isPinned ? 'Pinned' : 'Announcement',
      preview: String(item.content || '').slice(0, 180) || 'No content.'
    }))

  if (posts.length) return posts

  return [
    {
      author: profile.value.name,
      initials: profile.value.initials,
      timeAgo: 'just now',
      category: 'profile',
      title: 'Welcome to User Profile',
      badge: 'System',
      preview: 'No announcements available yet. This panel will display recent posts from Firestore.'
    }
  ]
})

const suggestions = computed(() =>
  people.value
    .filter((entry) => entry.name !== profile.value.name)
    .slice(0, 6)
    .map((entry) => ({
      name: entry.name,
      role: entry.role,
      initials: getInitials(entry.name)
    }))
)

const topProfiles = computed(() => {
  const activityMap = new Map()
  tickets.value.forEach((ticket) => {
    const id = String(ticket.studentId || ticket.createdByUid || '')
    if (!id) return
    activityMap.set(id, (activityMap.get(id) || 0) + 1)
  })

  return people.value
    .slice()
    .sort((a, b) => (activityMap.get(b.studentId || b.uid || '') || 0) - (activityMap.get(a.studentId || a.uid || '') || 0))
    .slice(0, 3)
    .map((entry) => ({
      name: entry.name,
      role: entry.role,
      initials: getInitials(entry.name)
    }))
})

const commentStats = computed(() => {
  const me = currentIdentity.value
  let total = 0
  let mine = 0

  announcements.value.forEach((item) => {
    const comments = Array.isArray(item.comments) ? item.comments : []
    total += comments.length
    comments.forEach((comment) => {
      const byUid = String(comment?.userId || '')
      const byEmail = String(comment?.email || '').toLowerCase()
      if ((me.uid && byUid === me.uid) || (me.email && byEmail === me.email)) {
        mine += 1
      }
    })
  })

  return { total, mine }
})

const loadData = async () => {
  loading.value = true
  try {
    const [studentsSnap, instructorsSnap, userRolesSnap, announcementsSnap, ticketsSnap] = await Promise.all([
      getDocs(collection(db, 'students')),
      getDocs(collection(db, 'instructors')),
      getDocs(collection(db, 'userRoles')),
      getDocs(collection(db, 'announcements')),
      getDocs(collection(db, 'gradeInquiryTickets'))
    ])

    const roleByEmail = new Map()
    userRolesSnap.forEach((docSnap) => {
      const data = docSnap.data() || {}
      const key = String(data.email || '').toLowerCase()
      if (key) roleByEmail.set(key, normalizeRole(data.roleId))
    })

    const studentPeople = []
    studentsSnap.forEach((docSnap) => {
      const data = docSnap.data() || {}
      const email = String(data.email || '').toLowerCase()
      studentPeople.push({
        uid: '',
        studentId: String(data.studentId || docSnap.id || ''),
        name: data.fullName || data.studentId || 'Student',
        email,
        role: roleByEmail.get(email) || 'Student'
      })
    })

    const instructorPeople = []
    instructorsSnap.forEach((docSnap) => {
      const data = docSnap.data() || {}
      const email = String(data.email || '').toLowerCase()
      instructorPeople.push({
        uid: String(data.instructorId || docSnap.id || ''),
        studentId: '',
        name: data.fullName || data.instructorId || 'Instructor',
        email,
        role: roleByEmail.get(email) || 'Instructor'
      })
    })

    // SQL-like merge: UNION students + instructors + role identities, dedupe by email/name
    const merged = new Map()
    ;[...studentPeople, ...instructorPeople].forEach((entry) => {
      const key = entry.email || `${entry.name}_${entry.role}`
      if (!merged.has(key)) merged.set(key, entry)
    })
    people.value = Array.from(merged.values())

    announcements.value = announcementsSnap.docs.map((docSnap) => {
      const data = docSnap.data() || {}
      return {
        id: docSnap.id,
        title: data.title || '',
        category: data.category || 'general',
        content: data.content || '',
        author: data.author || 'Anonymous',
        createdAt: data.createdAt || null,
        comments: Array.isArray(data.comments) ? data.comments : [],
        isPinned: Boolean(data.isPinned)
      }
    })

    tickets.value = ticketsSnap.docs.map((docSnap) => {
      const data = docSnap.data() || {}
      return { id: docSnap.id, ...data }
    })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>