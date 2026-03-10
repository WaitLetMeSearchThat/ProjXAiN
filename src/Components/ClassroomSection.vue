<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import StudentClassroomCards from '@/Components/StudentClassroomCards.vue'
import ClassroomGroupLayout from '@/Components/ClassroomGroupLayout.vue'
import {
  approveClassroomEnrollment,
  canAccessClassroom,
  classroomConfig,
  createClassroomPost,
  getClassroomMemberCounts,
  getClassroomOfferings,
  getClassroomOfferingsByIds,
  joinClassroomByCode,
  getStudentEnrollments,
  rejectClassroomEnrollment,
  subscribePendingRequestsForInstructor,
  subscribeClassroomMembers,
  subscribeClassroomPosts
} from '@/firebase/classroomService'

const { user, role, userProfile } = useAuth()
const route = useRoute()
const router = useRouter()

const offerings = ref([])
const enrollments = ref([])
const selectedClassroomId = ref('')
const selectedSection = ref('ALL')
const weekOffset = ref(0)
const members = ref([])
const posts = ref([])
const pendingRequests = ref([])
const feedInput = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)
const isSubmittingPost = ref(false)
const actionEnrollmentId = ref('')
const joinCodeInput = ref('')
const isJoiningByCode = ref(false)
const memberCounts = ref({})

let stopMembersSub = null
let stopPostsSub = null
let stopPendingSub = null

const resolvedRole = computed(() => role.value || userProfile.value?.role || '')
const isStudent = computed(() => ['role_student', 'users-notverified'].includes(resolvedRole.value))
const isInstructor = computed(() => resolvedRole.value === 'role_instructor')
const sessionStudentId = computed(() => String(userProfile.value?.studentId || localStorage.getItem('studentId') || '').trim())
const sessionName = computed(() => userProfile.value?.displayName || user.value?.displayName || 'Student')
const sessionEmail = computed(() => String(user.value?.email || userProfile.value?.email || '').trim().toLowerCase())
const participantStudentId = computed(() => {
  const explicit = String(sessionStudentId.value || '').trim()
  if (explicit) return explicit
  const fallbackUid = String(user.value?.uid || '').trim()
  return fallbackUid ? `uid_${fallbackUid}` : ''
})
const activeView = computed(() => {
  const view = String(route.query?.view || '').trim().toLowerCase()
  if (view === 'schedule') return 'schedule'
  if (view === 'section') return 'section'
  return 'vclass'
})
const requestedClassroomId = computed(() => String(route.query?.classroom || '').trim())

const approvedEnrollments = computed(() => enrollments.value.filter((item) => item.status === 'approved'))
const pendingEnrollments = computed(() => enrollments.value.filter((item) => item.status === 'pending'))
const joinedClassroomIds = computed(() => new Set(approvedEnrollments.value.map((item) => item.classroomId)))
const subjectCount = computed(() => new Set(approvedEnrollments.value.map((item) => item.subjectCode)).size)
const sectionCount = computed(() => new Set(approvedEnrollments.value.map((item) => item.section)).size)

const instructorCards = computed(() =>
  offerings.value.map((offering) => ({
    ...offering,
    status: 'active'
  }))
)
const vclassCards = computed(() => (isInstructor.value ? instructorCards.value : enrollmentCards.value))
const selectedCard = computed(() => vclassCards.value.find((item) => item.id === selectedClassroomId.value) || null)
const selectedClassroom = computed(() =>
  offerings.value.find((item) => item.id === selectedClassroomId.value)
  || selectedCard.value
  || null
)
const selectedEnrollment = computed(() => enrollments.value.find((item) => item.classroomId === selectedClassroomId.value) || null)
const selectedMemberCount = computed(() => memberCounts.value[selectedClassroomId.value] || 0)
const scheduleSource = computed(() => (isInstructor.value ? offerings.value : enrollmentCards.value))
const sectionOptions = computed(() => {
  const sections = Array.from(new Set(scheduleSource.value.map((item) => String(item.section || '').trim()).filter(Boolean)))
    .sort((a, b) => a.localeCompare(b))
  return ['ALL', ...sections]
})
const filteredOfferings = computed(() => {
  if (selectedSection.value === 'ALL') return offerings.value
  return offerings.value.filter((item) => String(item.section || '').trim() === selectedSection.value)
})
const filteredScheduleSource = computed(() => {
  if (selectedSection.value === 'ALL') return scheduleSource.value
  return scheduleSource.value.filter((item) => String(item.section || '').trim() === selectedSection.value)
})
const weekdayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const weekdayShort = {
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri'
}
const parseTimeToMinutes = (value) => {
  const text = String(value || '').trim().toUpperCase()
  const match = text.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/)
  if (!match) return null
  let hour = Number(match[1])
  const minute = Number(match[2] || 0)
  if (match[3] === 'PM' && hour !== 12) hour += 12
  if (match[3] === 'AM' && hour === 12) hour = 0
  return (hour * 60) + minute
}
const parseScheduleTime = (value) => {
  const parts = String(value || '').split('-').map((part) => part.trim()).filter(Boolean)
  if (!parts.length) return { startMinutes: null, endMinutes: null, startLabel: '', endLabel: '' }
  return {
    startMinutes: parseTimeToMinutes(parts[0]),
    endMinutes: parseTimeToMinutes(parts[1] || ''),
    startLabel: parts[0],
    endLabel: parts[1] || ''
  }
}
const parseScheduleDays = (value) => {
  const tokens = String(value || '')
    .split(/[,&/]| and /i)
    .map((part) => part.trim())
    .filter(Boolean)
  return tokens
    .map((token) => weekdayOrder.find((day) => day.toLowerCase().startsWith(token.toLowerCase().slice(0, 3))))
    .filter(Boolean)
}
const getMonday = (date) => {
  const d = new Date(date)
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}
const formatDateKey = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
const currentWeekStart = computed(() => {
  const monday = getMonday(new Date())
  monday.setDate(monday.getDate() + (weekOffset.value * 7))
  return monday
})
const weekDaysData = computed(() =>
  weekdayOrder.map((dayName, index) => {
    const date = new Date(currentWeekStart.value)
    date.setDate(date.getDate() + index)
    const isToday = formatDateKey(date) === formatDateKey(new Date())
    return {
      dayName,
      shortName: weekdayShort[dayName],
      date,
      dateKey: formatDateKey(date),
      dayNumber: date.getDate(),
      isToday
    }
  })
)
const currentWeekLabel = computed(() => {
  const start = weekDaysData.value[0]?.date
  const end = weekDaysData.value[4]?.date
  if (!start || !end) return ''
  const sameMonth = start.getMonth() === end.getMonth()
  if (sameMonth) {
    return `${start.toLocaleDateString('en-US', { month: 'long' })} ${start.getDate()} - ${end.getDate()}, ${start.getFullYear()}`
  }
  return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${end.getFullYear()}`
})
const scheduleEvents = computed(() =>
  filteredScheduleSource.value.flatMap((classroom) => {
    const time = parseScheduleTime(classroom.scheduleTime)
    const days = parseScheduleDays(classroom.scheduleDay)
    return days.map((dayName) => {
      const dayData = weekDaysData.value.find((item) => item.dayName === dayName)
      if (!dayData) return null
      return {
        dayName,
        dateKey: dayData.dateKey,
        classroom,
        ...time
      }
    }).filter(Boolean)
  })
)
const formatHourLabel = (hour24) => {
  const meridiem = hour24 >= 12 ? 'PM' : 'AM'
  let hour12 = hour24 % 12
  if (hour12 === 0) hour12 = 12
  return `${hour12}:00 ${meridiem}`
}
const timeSlots = computed(() => {
  const rows = []
  for (let hour = 8; hour <= 20; hour += 1) {
    rows.push({
      value: hour * 60,
      label: formatHourLabel(hour)
    })
  }
  return rows
})
const normalizeEventStartToSlotMinutes = (eventStartMinutes) => {
  if (!Number.isFinite(eventStartMinutes)) return null
  if (eventStartMinutes < (8 * 60) || eventStartMinutes > (20 * 60)) return null
  return Math.floor(eventStartMinutes / 60) * 60
}
const eventsByCell = computed(() => {
  const map = new Map()
  scheduleEvents.value.forEach((event) => {
    const slotMinutes = normalizeEventStartToSlotMinutes(event.startMinutes)
    if (!Number.isFinite(slotMinutes)) return
    const key = `${event.dateKey}__${slotMinutes}`
    const rows = map.get(key) || []
    rows.push(event)
    map.set(key, rows)
  })
  return map
})
const getEventsForCell = (dateKey, slotMinutes) => eventsByCell.value.get(`${dateKey}__${slotMinutes}`) || []
const getSubjectColorClass = (subjectCode) => {
  const code = String(subjectCode || '').toUpperCase()
  if (code.includes('DM 103')) return 'bg-blue-500'
  if (code.includes('SIA 101')) return 'bg-emerald-500'
  return 'bg-indigo-500'
}
const enrollmentCards = computed(() => {
  const offeringById = new Map(offerings.value.map((item) => [item.id, item]))
  return enrollments.value.map((enrollment) => {
    const offering = offeringById.get(enrollment.classroomId) || {}
    return {
      id: enrollment.classroomId || offering.id || enrollment.id,
      status: enrollment.status,
      subjectCode: enrollment.subjectCode || offering.subjectCode || 'Subject',
      subjectTitle: enrollment.subjectTitle || offering.subjectTitle || '',
      section: enrollment.section || offering.section || '',
      scheduleDay: enrollment.scheduleDay || offering.scheduleDay || 'TBA',
      scheduleTime: enrollment.scheduleTime || offering.scheduleTime || 'TBA',
      room: enrollment.room || offering.room || '',
      instructorName: offering.instructorName || enrollment.instructorName || '',
      instructorEmail: offering.instructorEmail || enrollment.instructorEmail || ''
    }
  })
})

const canPostToSelectedClassroom = computed(() => {
  if (!selectedClassroom.value) return false
  if (isInstructor.value) return true
  return joinedClassroomIds.value.has(selectedClassroom.value.id)
})
const composerLabel = computed(() => (isInstructor.value ? 'Post section announcement' : 'Post to group timeline'))
const composerPlaceholder = computed(() => {
  if (isInstructor.value) return 'Share an announcement or instruction for this section.'
  return 'Share a message with your classmates.'
})

const resetAlerts = () => {
  errorMessage.value = ''
  successMessage.value = ''
}

const syncSelectedClassroom = () => {
  const requested = requestedClassroomId.value
  const availableIds = new Set(vclassCards.value.map((item) => item.id))
  if (requested && availableIds.has(requested)) {
    selectedClassroomId.value = requested
    return
  }
  if (selectedClassroomId.value && availableIds.has(selectedClassroomId.value)) {
    return
  }
  selectedClassroomId.value = vclassCards.value[0]?.id || ''
}

const loadClassrooms = async () => {
  isLoading.value = true
  resetAlerts()
  try {
    if (participantStudentId.value) {
      const enrollmentResult = await getStudentEnrollments(participantStudentId.value)
      if (enrollmentResult.success) {
        enrollments.value = enrollmentResult.enrollments || []
      }
    } else {
      enrollments.value = []
    }

    if (isInstructor.value) {
      const offeringsResult = await getClassroomOfferings()
      if (!offeringsResult.success) {
        errorMessage.value = 'Unable to load classroom offerings.'
        return
      }
      const email = sessionEmail.value
      offerings.value = (offeringsResult.offerings || []).filter((item) => {
        if (!email) return true
        return String(item.instructorEmail || '').trim().toLowerCase() === email
      })
    } else {
      const ids = enrollments.value.map((row) => row.classroomId).filter(Boolean)
      const offeringsResult = await getClassroomOfferingsByIds(ids)
      offerings.value = offeringsResult.success ? offeringsResult.offerings || [] : []
    }

    syncSelectedClassroom()
    await loadMemberCounts()
  } finally {
    isLoading.value = false
  }
}

const loadMemberCounts = async () => {
  const ids = isInstructor.value
    ? offerings.value.map((row) => row.id).filter(Boolean)
    : approvedEnrollments.value.map((row) => row.classroomId).filter(Boolean)
  const result = await getClassroomMemberCounts(ids)
  if (result.success) {
    memberCounts.value = result.counts || {}
  }
}

const refreshEnrollments = async () => {
  if (!participantStudentId.value) {
    enrollments.value = []
    return
  }
  const result = await getStudentEnrollments(participantStudentId.value)
  if (result.success) {
    enrollments.value = result.enrollments || []
    await loadMemberCounts()
    syncSelectedClassroom()
  }
}

const selectClassroom = (classroomId) => { selectedClassroomId.value = classroomId }
const openSectionOnlyView = (classroomId = '') => {
  const targetClassroomId = String(classroomId || selectedClassroomId.value || '').trim()
  router.push({
    path: route.path,
    query: {
      ...route.query,
      view: 'section',
      ...(targetClassroomId ? { classroom: targetClassroomId } : {})
    }
  })
}
const openVclassView = () => {
  router.push({
    path: route.path,
    query: {
      ...route.query,
      view: 'vclass'
    }
  })
}
const navigateToday = () => { weekOffset.value = 0 }
const navigatePrev = () => { weekOffset.value -= 1 }
const navigateNext = () => { weekOffset.value += 1 }

const handleJoinByCode = async () => {
  if (!isStudent.value) return
  const code = String(joinCodeInput.value || '').trim()
  if (!code) {
    errorMessage.value = 'Enter a classroom code.'
    return
  }
  if (!participantStudentId.value) {
    errorMessage.value = 'Unable to identify your account for classroom enrollment.'
    return
  }
  isJoiningByCode.value = true
  resetAlerts()
  try {
    const result = await joinClassroomByCode({
      joinCode: code,
      studentId: participantStudentId.value,
      isInstructor: isInstructor.value,
      studentName: sessionName.value,
      studentEmail: sessionEmail.value
    })
    if (!result.success) {
      errorMessage.value = result.message || 'Unable to join classroom by code.'
      return
    }
    successMessage.value = result.message || 'Joined V-Classroom.'
    joinCodeInput.value = ''
    await loadClassrooms()
    await refreshEnrollments()
    if (result.classroom?.id) {
      selectedClassroomId.value = result.classroom.id
    }
  } finally {
    isJoiningByCode.value = false
  }
}

const handleApproveRequest = async (enrollment) => {
  if (!isInstructor.value || !enrollment?.id) return
  actionEnrollmentId.value = enrollment.id
  resetAlerts()
  try {
    const result = await approveClassroomEnrollment(enrollment.id)
    if (!result.success) {
      errorMessage.value = result.message || 'Unable to approve request.'
      return
    }
    successMessage.value = result.message || 'Enrollment approved.'
  } finally {
    actionEnrollmentId.value = ''
  }
}

const handleRejectRequest = async (enrollment) => {
  if (!isInstructor.value || !enrollment?.id) return
  actionEnrollmentId.value = enrollment.id
  resetAlerts()
  try {
    const result = await rejectClassroomEnrollment(enrollment.id)
    if (!result.success) {
      errorMessage.value = result.message || 'Unable to reject request.'
      return
    }
    successMessage.value = result.message || 'Enrollment request rejected.'
  } finally {
    actionEnrollmentId.value = ''
  }
}

const stopClassroomSubscriptions = () => {
  if (stopMembersSub) {
    stopMembersSub()
    stopMembersSub = null
  }
  if (stopPostsSub) {
    stopPostsSub()
    stopPostsSub = null
  }
}

const stopPendingRequestsSubscription = () => {
  if (stopPendingSub) {
    stopPendingSub()
    stopPendingSub = null
  }
}

const subscribeGroupData = async (classroomId) => {
  stopClassroomSubscriptions()
  members.value = []
  posts.value = []
  if (!classroomId) return

  const access = await canAccessClassroom({
    classroomId,
    studentId: participantStudentId.value,
    email: sessionEmail.value,
    isInstructor: isInstructor.value
  })
  if (!access.success) return

  stopMembersSub = subscribeClassroomMembers(
    classroomId,
    (rows) => { members.value = rows },
    () => { errorMessage.value = 'Unable to subscribe to classroom members.' }
  )
  stopPostsSub = subscribeClassroomPosts(
    classroomId,
    (rows) => { posts.value = rows },
    () => { errorMessage.value = 'Unable to subscribe to classroom feed.' }
  )
}

const handlePost = async () => {
  const text = String(feedInput.value || '').trim()
  if (!text || !selectedClassroom.value || !canPostToSelectedClassroom.value) return

  isSubmittingPost.value = true
  resetAlerts()
  try {
    const result = await createClassroomPost({
      classroomId: selectedClassroom.value.id,
      body: text,
      authorName: sessionName.value,
      authorEmail: sessionEmail.value,
      authorRole: resolvedRole.value || 'guest',
      studentId: participantStudentId.value,
      isInstructor: isInstructor.value
    })
    if (!result.success) {
      errorMessage.value = result.message || 'Unable to post message.'
      return
    }
    feedInput.value = ''
    successMessage.value = isInstructor.value ? 'Announcement posted to section timeline.' : 'Posted to classroom timeline.'
  } finally {
    isSubmittingPost.value = false
  }
}

const formatDateTime = (value) => {
  if (!value) return 'Just now'
  try {
    const date = typeof value?.toDate === 'function' ? value.toDate() : new Date(value)
    if (Number.isNaN(date.getTime())) return 'Just now'
    return date.toLocaleString()
  } catch (_) {
    return 'Just now'
  }
}

watch(selectedClassroomId, (classroomId) => { subscribeGroupData(classroomId) })
watch([requestedClassroomId, vclassCards], () => { syncSelectedClassroom() })
onMounted(async () => {
  await loadClassrooms()
  if (selectedClassroomId.value) await subscribeGroupData(selectedClassroomId.value)
  if (isInstructor.value) {
    stopPendingSub = subscribePendingRequestsForInstructor(
      sessionEmail.value,
      (rows) => { pendingRequests.value = rows || [] },
      () => { errorMessage.value = 'Unable to subscribe to enrollment requests.' }
    )
  }
})

onUnmounted(() => {
  stopClassroomSubscriptions()
  stopPendingRequestsSubscription()
})
</script>

<template>
  <div class="max-w-7xl mx-auto rounded-[28px] border border-slate-700/60 bg-[#0f1118] text-slate-100 shadow-2xl">
    <div class="mb-8 px-6 py-8 rounded-t-[28px] bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-300">
      <h1 class="text-3xl font-black text-white">Classroom Groups</h1>
      <p class="text-emerald-50/90 mt-2">Join your preferred subject schedule and collaborate in a classroom group page.</p>
      <div class="mt-3 text-xs text-white/90">
        Limits: max {{ classroomConfig.MAX_SUBJECTS }} subjects, max {{ classroomConfig.MAX_SECTIONS }} sections.
      </div>
      <div v-if="isStudent" class="mt-2 text-xs text-white/90">
        Your current load: {{ subjectCount }} subject(s), {{ sectionCount }} section(s)
      </div>
    </div>

    <div class="px-4 pb-6">
      <div v-if="errorMessage" class="mb-3 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
        {{ errorMessage }}
      </div>
      <div v-if="successMessage" class="mb-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
        {{ successMessage }}
      </div>

      <div class="grid grid-cols-1 gap-5" :class="activeView === 'section' ? 'xl:grid-cols-1' : 'xl:grid-cols-[1.15fr_1fr]'">
        <div v-if="activeView === 'schedule'" class="rounded-2xl shadow-xl overflow-hidden bg-[#11141c] border border-slate-700/60">
          <div class="flex flex-wrap items-center justify-between px-4 py-3 bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-600 text-white gap-3">
            <div class="flex items-center gap-2">
              <button @click="navigateToday" class="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-md text-sm font-medium transition-colors">
                Today
              </button>
              <button @click="navigatePrev" class="p-1.5 hover:bg-white/20 rounded-md transition-colors" aria-label="Previous week">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button @click="navigateNext" class="p-1.5 hover:bg-white/20 rounded-md transition-colors" aria-label="Next week">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <h2 class="text-lg font-semibold">{{ currentWeekLabel }}</h2>
            </div>
            <label class="text-sm font-medium text-white">
              Section
              <select v-model="selectedSection" class="ml-2 rounded-lg border border-white/30 bg-white/20 px-2 py-1 text-xs text-white">
                <option v-for="section in sectionOptions" :key="section" :value="section" class="text-slate-900">
                  {{ section === 'ALL' ? 'All Sections' : `Section ${section}` }}
                </option>
              </select>
            </label>
          </div>

          <div class="grid grid-cols-[110px_repeat(5,minmax(0,1fr))] border-b border-slate-700/60">
            <div class="p-2 text-center text-xs font-medium text-slate-400 bg-slate-900/60"></div>
            <div
              v-for="day in weekDaysData"
              :key="day.dateKey"
              :class="[
                'p-2 text-center border-l border-slate-700/60',
                day.isToday ? 'bg-emerald-500/15' : 'bg-slate-900/60'
              ]"
            >
              <div class="text-xs text-slate-400">{{ day.shortName }}</div>
              <div :class="['text-lg font-semibold', day.isToday ? 'text-emerald-300' : 'text-slate-200']">{{ day.dayNumber }}</div>
            </div>
          </div>

          <div class="max-h-[520px] overflow-y-auto">
            <div v-for="slot in timeSlots" :key="slot.value" class="grid grid-cols-[110px_repeat(5,minmax(0,1fr))] border-b border-slate-800/60">
              <div class="p-2 text-xs text-slate-400 text-right pr-3 border-r border-slate-800/60 bg-slate-900/40">{{ slot.label }}</div>
              <div
                v-for="day in weekDaysData"
                :key="`${day.dateKey}-${slot.value}`"
                class="min-h-[86px] border-l border-slate-800/60 p-1.5 bg-slate-950/40"
              >
                <div
                  v-for="event in getEventsForCell(day.dateKey, slot.value)"
                  :key="`${event.classroom.id}-${day.dateKey}-${slot.value}`"
                  class="rounded-md text-white px-2 py-1 text-[11px] mb-1"
                  :class="getSubjectColorClass(event.classroom.subjectCode)"
                >
                  <div class="font-semibold truncate">{{ event.classroom.subjectCode }}</div>
                  <div class="opacity-90 truncate">Room {{ event.classroom.room || 'TBA' }}</div>
                  <div class="opacity-90 truncate">
                    {{ event.classroom.instructorName || event.classroom.instructorEmail || 'Instructor TBA' }}
                  </div>
                  <div class="mt-1 flex flex-wrap gap-1">
                    <button class="rounded bg-white/20 px-1.5 py-0.5 hover:bg-white/30" @click="selectClassroom(event.classroom.id)">
                      Open
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="!filteredScheduleSource.length && !isLoading" class="p-4 text-sm text-slate-400">
            No classroom offerings available for this section.
          </div>
          <div v-if="isLoading" class="p-4 text-sm text-slate-400">
            Loading classrooms...
          </div>
        </div>

        <div v-else-if="activeView === 'vclass'" class="rounded-2xl shadow-xl overflow-hidden bg-[#11141c] border border-slate-700/60">
          <div class="flex flex-wrap items-center justify-between px-4 py-3 bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-600 text-white gap-3">
            <div>
              <h2 class="text-lg font-semibold">{{ isInstructor ? 'Section Group Pages' : 'My Enrolled Subjects' }}</h2>
              <p class="text-xs text-white/80">{{ isInstructor ? 'Open a section to manage its timeline and members.' : 'View your enrolled classes and open their group pages.' }}</p>
            </div>
            <div class="text-xs text-white/90">
              <template v-if="isInstructor">{{ offerings.length }} classrooms</template>
              <template v-else>{{ approvedEnrollments.length }} approved | {{ pendingEnrollments.length }} pending</template>
            </div>
          </div>

          <div v-if="isStudent" class="p-4 border-b border-slate-700/60 bg-slate-900/40">
            <div class="text-sm font-semibold text-slate-200">Join a classroom</div>
            <div class="mt-2 flex flex-wrap gap-2">
              <input v-model="joinCodeInput" type="text" class="flex-1 min-w-[220px] rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500" placeholder="Enter join code" />
              <button class="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-600 disabled:opacity-60" :disabled="isJoiningByCode || !joinCodeInput.trim()" @click="handleJoinByCode">
                {{ isJoiningByCode ? 'Joining...' : 'Join Classroom' }}
              </button>
            </div>
          </div>

          <StudentClassroomCards :cards="vclassCards" :member-counts="memberCounts" :selected-id="selectedClassroomId" @select="selectClassroom" @open-section="openSectionOnlyView" />

          <div v-if="isLoading" class="p-4 text-sm text-slate-400">Loading classrooms...</div>
          <div v-else-if="!vclassCards.length" class="p-4 text-sm text-slate-400">{{ isInstructor ? 'Create a classroom below, then open its group page here.' : 'Join a classroom to see its group page and timeline here.' }}</div>
        </div>

        <div class="space-y-5">
          <div v-if="activeView === 'section'" class="rounded-2xl border border-sky-500/30 bg-sky-500/10 p-4">
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 class="text-sm font-bold text-sky-100">Section-Only View</h3>
                <p class="text-xs text-sky-200/90 mt-1">
                  Showing announcements and modules for
                  <span class="font-semibold">{{ selectedClassroom ? (selectedClassroom.subjectCode + ' - Section ' + selectedClassroom.section) : 'the selected section' }}</span>.
                </p>
              </div>
              <button
                class="rounded-lg border border-sky-300/40 bg-sky-500/20 px-3 py-2 text-xs font-semibold text-sky-100 hover:bg-sky-500/30"
                @click="openVclassView"
              >
                Back to Group Pages
              </button>
            </div>
          </div>
          <ClassroomGroupLayout
            :classroom="selectedClassroom"
            :selected-card="selectedCard"
            :selected-enrollment="selectedEnrollment"
            :selected-member-count="selectedMemberCount"
            :members="members"
            :posts="posts"
            :can-post="canPostToSelectedClassroom"
            :is-instructor="isInstructor"
            :is-submitting-announcement="isSubmittingPost"
            :announcement-draft="feedInput"
            :author-name="sessionName"
            :author-email="sessionEmail"
            :section-only="activeView === 'section'"
            @update:announcement-draft="feedInput = $event"
            @submit-announcement="handlePost"
          />

          <div v-if="isInstructor && activeView !== 'section'" class="rounded-2xl border border-slate-700/60 bg-[#11141c] p-4 shadow-sm">
            <h3 class="text-sm font-bold text-slate-100">Pending Join Requests</h3>
            <p class="text-xs text-slate-500 mt-1">Approve or reject student requests before they can join classrooms.</p>
            <div v-if="pendingRequests.length" class="mt-3 space-y-2 max-h-64 overflow-y-auto pr-1">
              <div v-for="request in pendingRequests" :key="request.id" class="rounded-xl border border-slate-700/60 bg-slate-900/50 p-3">
                <div class="text-sm font-semibold text-slate-100">{{ request.studentName || request.studentId }}</div>
                <div class="text-xs text-slate-400 mt-1">{{ request.subjectCode }} | Section {{ request.section }} | {{ request.studentId }}</div>
                <div class="mt-2 flex gap-2">
                  <button class="rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-60" :disabled="actionEnrollmentId === request.id" @click="handleApproveRequest(request)">{{ actionEnrollmentId === request.id ? 'Saving...' : 'Approve' }}</button>
                  <button class="rounded-lg bg-rose-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-rose-700 disabled:opacity-60" :disabled="actionEnrollmentId === request.id" @click="handleRejectRequest(request)">Reject</button>
                </div>
              </div>
            </div>
            <div v-else class="mt-3 text-xs text-slate-500">No pending requests.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>








