<template>
  <div class="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
    <div class="max-w-7xl mx-auto space-y-6">
      
      <!-- Student Info Row - Single horizontal layout -->
      <div class="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
        <div class="flex flex-col md:flex-row items-center gap-6">
          <!-- Avatar -->
          <div class="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg flex-shrink-0">
            {{ studentInfo.initials }}
          </div>
          
          <!-- Student Details -->
          <div class="flex-1 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8 text-center md:text-left">
            <div>
              <h2 class="text-2xl font-bold text-gray-800">{{ studentInfo.name }}</h2>
              <p class="text-gray-500">{{ studentInfo.email }}</p>
            </div>
            
            <div class="flex flex-wrap justify-center md:justify-start gap-4">
              <div class="text-center px-4 py-2 bg-gray-50 rounded-lg">
                <span class="block text-xs text-gray-500 uppercase tracking-wide">Student ID</span>
                <span class="block font-bold text-gray-800">{{ studentInfo.studentId || 'N/A' }}</span>
              </div>
              <div class="text-center px-4 py-2 bg-gray-50 rounded-lg">
                <span class="block text-xs text-gray-500 uppercase tracking-wide">Program</span>
                <span class="block font-bold text-gray-800">{{ studentInfo.program || 'N/A' }}</span>
              </div>
              <div class="text-center px-4 py-2 bg-gray-50 rounded-lg">
                <span class="block text-xs text-gray-500 uppercase tracking-wide">Year & Section</span>
                <span class="block font-bold text-gray-800">{{ studentInfo.yearLevel }} - {{ studentInfo.section }}</span>
              </div>
              <div class="text-center px-4 py-2 bg-gray-50 rounded-lg">
                <span class="block text-xs text-gray-500 uppercase tracking-wide">Status</span>
                <span :class="statusBadgeClass" class="block font-medium">
                  {{ studentInfo.status || 'Unknown' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <!-- Left Column -->
        <div class="space-y-6">
          <!-- Current Grades Card -->
          <div class="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
            <div class="flex justify-between items-center mb-4">
              <h3 class="font-bold text-lg text-gray-800">Current Grades</h3>
              <span v-if="currentGrades.length" class="text-sm text-gray-500">{{ currentSemester }}</span>
            </div>
            
            <div v-if="loading.grades" class="text-center py-4 text-gray-500">
              Loading grades...
            </div>
            
            <div v-else-if="currentGrades.length" class="space-y-3">
              <div v-for="grade in currentGrades" :key="grade.id" class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <span class="font-medium text-gray-800">{{ grade.subjectCode }}</span>
                  <span class="text-gray-500 text-sm ml-2">{{ grade.subjectTitle }}</span>
                </div>
               <div class="text-right">
                  <span :class="getGradeClass(grade.finalGrade)" class="font-bold text-lg">
                    {{ grade.finalGrade || 'N/A' }}
                  </span>
                  <span :class="getRemarksClass(grade.remarks)" class="block text-xs">
                    {{ grade.remarks || 'No Grade' }}
                  </span> 
                </div>
              </div>
              
              <!-- GPA Summary -->
              <div class="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                <span class="font-medium text-gray-600">Semester GPA</span>
                <span :class="gpaClass" class="text-2xl font-bold">{{ semesterGPA }}</span>
              </div>
            </div>
            
            <div v-else class="text-center py-4 text-gray-500">
              No grades available for this semester.
            </div>
            
            <button class="w-full mt-4 py-2 bg-indigo-50 text-indigo-700 font-medium rounded-xl border border-indigo-200 hover:bg-indigo-100 transition-colors">
              View Full Transcript
            </button>
          </div>

          <!-- Grade Inquiry Tickets Card -->
          <div class="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
            <div class="flex justify-between items-center mb-4">
              <h3 class="font-bold text-lg text-gray-800">My Grade Inquiries</h3>
              <span class="text-sm text-gray-500">{{ myTickets.length }} ticket(s)</span>
            </div>
            
            <div v-if="loading.tickets" class="text-center py-4 text-gray-500">
              Loading tickets...
            </div>
            
            <div v-else-if="myTickets.length" class="space-y-3">
              <div v-for="ticket in myTickets.slice(0, 5)" :key="ticket.id" class="p-3 bg-gray-50 rounded-lg">
                <div class="flex justify-between items-start">
                  <div>
                    <span class="font-medium text-gray-800">{{ ticket.service || 'Grade Inquiry' }}</span>
                    <span class="block text-xs text-gray-500">{{ ticket.ticketId }}</span>
                  </div>
                  <span :class="getTicketStatusClass(ticket.status)" class="px-2 py-1 rounded-full text-xs font-medium">
                    {{ ticket.status }}
                  </span>
                </div>
                <p class="text-sm text-gray-600 mt-1">{{ ticket.processNote }}</p>
              </div>
            </div>
            
            <div v-else class="text-center py-4 text-gray-500">
              No grade inquiry tickets.
            </div>
            
            <button class="w-full mt-4 py-2 bg-indigo-50 text-indigo-700 font-medium rounded-xl border border-indigo-200 hover:bg-indigo-100 transition-colors">
              Create New Inquiry
            </button>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-6">
          <!-- Recent Announcements Card -->
          <div class="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
            <div class="flex justify-between items-center mb-4">
              <h3 class="font-bold text-lg text-gray-800">Recent Announcements</h3>
              <button class="text-sm text-indigo-600 hover:underline">View All</button>
            </div>
            
            <div v-if="loading.announcements" class="text-center py-4 text-gray-500">
              Loading announcements...
            </div>
            
            <div v-else-if="announcements.length" class="space-y-4">
              <div v-for="post in announcements.slice(0, 4)" :key="post.id" class="border-b border-gray-100 pb-4 last:border-0">
                <div class="flex flex-wrap items-center gap-x-2 text-xs text-gray-500 mb-1">
                  <span class="font-medium text-gray-700">{{ post.author }}</span>
                  <span>·</span>
                  <span>{{ formatTimeAgo(toMillis(post.createdAt)) }}</span>
                  <span>·</span>
                  <span class="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">{{ post.category }}</span>
                </div>
                <h4 class="font-semibold text-gray-800">{{ post.title }}</h4>
                <p class="text-gray-600 text-sm mt-1 line-clamp-2">{{ String(post.content || '').slice(0, 120) }}</p>
              </div>
            </div>
            
            <div v-else class="text-center py-4 text-gray-500">
              No announcements available.
            </div>
          </div>

          <!-- Quick Actions Card -->
          <div class="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
            <h3 class="font-bold text-lg text-gray-800 mb-4">Quick Actions</h3>
            
            <div class="grid grid-cols-2 gap-3">
              <button class="flex flex-col items-center justify-center p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span class="text-sm font-medium text-indigo-700">View Grades</span>
              </button>
              
              <button class="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <span class="text-sm font-medium text-purple-700">Grade Inquiry</span>
              </button>
              
              <button class="flex flex-col items-center justify-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span class="text-sm font-medium text-green-700">Calendar</span>
              </button>
              
              <button class="flex flex-col items-center justify-center p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-orange-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span class="text-sm font-medium text-orange-700">Prospectus</span>
              </button>
            </div>
          </div>

          <!-- Academic Summary Card -->
          <div class="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
            <h3 class="font-bold text-lg text-gray-800 mb-4">Academic Summary</h3>
            
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Total Credits Earned</span>
                <span class="font-bold text-gray-800">{{ academicSummary.totalUnits }} units</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Subjects Passed</span>
                <span class="font-bold text-green-600">{{ academicSummary.subjectsPassed }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Subjects Failed</span>
                <span class="font-bold text-red-600">{{ academicSummary.subjectsFailed }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Overall GPA</span>
                <span :class="academicSummary.gpa >= 75 ? 'text-green-600' : 'text-red-600'" class="font-bold">
                  {{ academicSummary.gpa.toFixed(2) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { useAuth } from '@/composables/useAuth'
import { STUDENT_STATUS, GRADE_REMARKS, GRADE_PASSING_SCORE } from '@/assets/constants'

const { user, userProfile } = useAuth()

// Loading states
const loading = ref({
  student: true,
  grades: true,
  announcements: true,
  tickets: true
})

// Data refs
const studentData = ref(null)
const grades = ref([])
const announcements = ref([])
const myTickets = ref([])

// Unsubscribe functions for real-time listeners
let unsubscribeTickets = null

// Helper functions
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
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days} day ago`
  const weeks = Math.floor(days / 7)
  if (weeks < 4) return `${weeks} week ago`
  const months = Math.floor(days / 30)
  return `${months} month ago`
}

// Computed properties
const studentInfo = computed(() => {
  if (!studentData.value) {
    // Fallback to userProfile if student data not loaded
    return {
      name: userProfile.value?.displayName || user.value?.displayName || user.value?.email || 'Student',
      initials: getInitials(userProfile.value?.displayName || user.value?.displayName || 'Student'),
      email: userProfile.value?.email || user.value?.email || '',
      studentId: userProfile.value?.studentId || '',
      program: 'Loading...',
      yearLevel: '-',
      section: '-',
      status: 'Loading...'
    }
  }
  
  return {
    name: studentData.value.fullName || studentData.value.studentId || 'Student',
    initials: getInitials(studentData.value.fullName),
    email: studentData.value.email || user.value?.email || '',
    studentId: studentData.value.studentId || '',
    program: studentData.value.program || '-',
    yearLevel: studentData.value.yearLevel || '-',
    section: studentData.value.section || '-',
    status: studentData.value.status || 'Unknown'
  }
})

const statusBadgeClass = computed(() => {
  const status = studentInfo.value.status
  if (status === STUDENT_STATUS.REGULAR) return 'text-green-600'
  if (status === STUDENT_STATUS.IRREGULAR) return 'text-orange-600'
  if (status === STUDENT_STATUS.GRADUATED) return 'text-blue-600'
  if (status === STUDENT_STATUS.DROPPED || status === STUDENT_STATUS.INACTIVE) return 'text-red-600'
  return 'text-gray-600'
})

const currentSemester = computed(() => {
  // Get the most recent semester from grades
  if (!grades.value.length) return 'Current'
  const latest = grades.value[0]
  return latest.semester ? `${latest.semester} ${latest.academicYear || ''}` : 'Current'
})

const currentGrades = computed(() => {
  // Return grades sorted by subject code
  return grades.value.slice(0, 8)
})

const semesterGPA = computed(() => {
  if (!grades.value.length) return '0.00'
  
  let totalPoints = 0
  let count = 0
  
  grades.value.forEach(grade => {
    if (grade.finalGrade && typeof grade.finalGrade === 'number') {
      totalPoints += grade.finalGrade
      count++
    }
  })
  
  if (count === 0) return '0.00'
  return (totalPoints / count).toFixed(2)
})

const gpaClass = computed(() => {
  const gpa = parseFloat(semesterGPA.value)
  if (gpa >= 80) return 'text-green-600'
  if (gpa >= 75) return 'text-blue-600'
  if (gpa >= 70) return 'text-orange-600'
  return 'text-red-600'
})

const academicSummary = computed(() => {
  let totalUnits = 0
  let subjectsPassed = 0
  let subjectsFailed = 0
  let totalGradePoints = 0
  let gradeCount = 0
  
  grades.value.forEach(grade => {
    // Assuming each subject is roughly 3 units
    const units = grade.units || 3
    totalUnits += units
    
    if (grade.remarks === GRADE_REMARKS.PASSED || (grade.finalGrade && grade.finalGrade >= GRADE_PASSING_SCORE)) {
      subjectsPassed++
      if (grade.finalGrade) {
        totalGradePoints += grade.finalGrade
        gradeCount++
      }
    } else if (grade.remarks === GRADE_REMARKS.FAILED) {
      subjectsFailed++
    }
  })
  
  const gpa = gradeCount > 0 ? totalGradePoints / gradeCount : 0
  
  return {
    totalUnits,
    subjectsPassed,
    subjectsFailed,
    gpa
  }
})

// Style helper functions
const getGradeClass = (grade) => {
  if (!grade) return 'text-gray-400'
  if (grade >= 80) return 'text-green-600'
  if (grade >= 75) return 'text-blue-600'
  if (grade >= 70) return 'text-orange-600'
  return 'text-red-600'
}

const getRemarksClass = (remarks) => {
  if (remarks === GRADE_REMARKS.PASSED) return 'text-green-600'
  if (remarks === GRADE_REMARKS.FAILED) return 'text-red-600'
  return 'text-gray-500'
}

const getTicketStatusClass = (status) => {
  const s = String(status || '').toLowerCase()
  if (s.includes('approved') || s.includes('completed')) return 'bg-green-100 text-green-800'
  if (s.includes('pending') || s.includes('submitted')) return 'bg-yellow-100 text-yellow-800'
  if (s.includes('rejected') || s.includes('denied')) return 'bg-red-100 text-red-800'
  return 'bg-gray-100 text-gray-800'
}

// Data loading functions
const loadStudentData = async () => {
  try {
    const studentId = userProfile.value?.studentId
    if (!studentId) {
      // Try to find student by email
      const email = user.value?.email || userProfile.value?.email
      if (email) {
        const studentsRef = collection(db, 'students')
        const q = query(studentsRef, where('email', '==', email.toLowerCase()))
        const snapshot = await getDocs(q)
        if (!snapshot.empty) {
          const doc = snapshot.docs[0]
          studentData.value = { id: doc.id, ...doc.data() }
        }
      }
    } else {
      // Fetch by studentId
      const studentsRef = collection(db, 'students')
      const q = query(studentsRef, where('studentId', '==', studentId))
      const snapshot = await getDocs(q)
      if (!snapshot.empty) {
        const doc = snapshot.docs[0]
        studentData.value = { id: doc.id, ...doc.data() }
      }
    }
  } catch (error) {
    console.error('Error loading student data:', error)
  } finally {
    loading.value.student = false
  }
}

const loadGrades = async () => {
  try {
    const studentId = userProfile.value?.studentId || studentData.value?.studentId
    if (!studentId) {
      loading.value.grades = false
      return
    }

    const gradesRef = collection(db, 'grades')
    // Query by studentId - try both normalized and non-normalized
    // Note: Removed orderBy to avoid requiring a composite index
    let q = query(gradesRef, where('studentId', '==', studentId))
    let snapshot = await getDocs(q)
    
    if (snapshot.empty) {
      // Try normalized version
      const normalizedId = studentId.replace(/\s+/g, '').toUpperCase()
      q = query(gradesRef, where('studentIdNormalized', '==', normalizedId))
      snapshot = await getDocs(q)
    }
    
    // Sort results in memory by academicYear (desc) then semester (desc)
    const gradesData = snapshot.docs.map(doc => doc.data())
    grades.value = gradesData.sort((a, b) => {
      // Sort by academicYear descending
      const ayA = a.academicYear || ''
      const ayB = b.academicYear || ''
      if (ayA !== ayB) {
        return ayB.localeCompare(ayA)
      }
      // Then by semester descending
      const semOrder = { '1st Sem': 3, '2nd Sem': 2, 'Summer': 1 }
      const semA = semOrder[a.semester] || 0
      const semB = semOrder[b.semester] || 0
      return semB - semA
    })
  } catch (error) {
    console.error('Error loading grades:', error)
  } finally {
    loading.value.grades = false
  }
}

const loadAnnouncements = async () => {
  try {
    const announcementsRef = collection(db, 'announcements')
    const q = query(announcementsRef, orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    
    announcements.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error loading announcements:', error)
  } finally {
    loading.value.announcements = false
  }
}

// Initialize data on mount
onMounted(async () => {
  await loadStudentData()
  await loadGrades()
  await loadAnnouncements()
  
  // Set up real-time listener for tickets
  const studentId = userProfile.value?.studentId || studentData.value?.studentId
  if (studentId) {
    const { subscribeStudentTickets } = await import('@/firebase/ticketService')
    unsubscribeTickets = subscribeStudentTickets(
      studentId,
      (tickets) => {
        myTickets.value = tickets
        loading.value.tickets = false
      },
      (error) => {
        console.error('Error loading tickets:', error)
        loading.value.tickets = false
      }
    )
  } else {
    loading.value.tickets = false
  }
})

// Cleanup on unmount
onUnmounted(() => {
  if (unsubscribeTickets) {
    unsubscribeTickets()
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
