<template>
  <div class="bg-white p-6 rounded-3xl shadow-xl border border-slate-100">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h2 class="text-2xl font-black text-slate-900">Student Management</h2>
        <p class="text-sm text-slate-500">Search, filter, and maintain student records.</p>
      </div>
      <button
        @click="showForm = true; editingStudent = null"
        class="px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
      >
        Add Student
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
      <div class="rounded-2xl border border-slate-100 bg-slate-50 p-4">
        <div class="text-xs uppercase tracking-wider text-slate-500">Total Students</div>
        <div class="text-2xl font-bold text-slate-900 mt-2">{{ students.length }}</div>
      </div>
      <div class="rounded-2xl border border-slate-100 bg-slate-50 p-4">
        <div class="text-xs uppercase tracking-wider text-slate-500">Enrolled</div>
        <div class="text-2xl font-bold text-slate-900 mt-2">{{ enrolledCount }}</div>
      </div>
      <div class="rounded-2xl border border-slate-100 bg-slate-50 p-4">
        <div class="text-xs uppercase tracking-wider text-slate-500">Filtered</div>
        <div class="text-2xl font-bold text-slate-900 mt-2">{{ filteredStudents.length }}</div>
      </div>
    </div>

    <!-- Search and Filter -->
    <div class="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by ID or name..."
        class="px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900"
      />
      <select
        v-model="filterProgram"
        class="px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900"
      >
        <option value="">All Programs</option>
        <option v-for="program in Object.values(PROGRAM_CODES)" :key="program" :value="program">
          {{ program }}
        </option>
      </select>
      <select
        v-model="filterYearLevel"
        class="px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900"
      >
        <option value="">All Year Levels</option>
        <option v-for="year in Object.values(YEAR_LEVELS)" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
      <select
        v-model="filterStatus"
        class="px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900"
      >
        <option value="">All Statuses</option>
        <option v-for="status in Object.values(STUDENT_STATUS)" :key="status" :value="status">
          {{ status }}
        </option>
      </select>
    </div>

    <!-- Students Table -->
    <div class="overflow-x-auto border border-slate-100 rounded-2xl">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-slate-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrolled</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
          <tr v-if="isLoading">
            <td colspan="9" class="px-6 py-8 text-center text-sm text-slate-500">Loading students...</td>
          </tr>
          <tr v-else-if="!paginatedStudents.length">
            <td colspan="9" class="px-6 py-8 text-center text-sm text-slate-500">No students match your filters.</td>
          </tr>
          <tr
            v-else
            v-for="(student, index) in paginatedStudents"
            :key="student.id"
            :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-300'"
            class="hover:bg-white"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ student.studentId }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ student.fullName }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ student.email }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ student.program }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ student.yearLevel }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ student.section }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                :class="student.status === STUDENT_STATUS.REGULAR ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
              >
                {{ student.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ student.isEnrolled ? 'Yes' : 'No' }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                @click="editStudent(student)"
                class="text-indigo-600 hover:text-indigo-900 mr-3"
              >
                Edit
              </button>
              <button
                @click="deleteStudent(student)"
                class="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="mt-6 flex justify-between items-center">
      <div class="text-sm text-gray-700">
        Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredStudents.length) }} of {{ filteredStudents.length }} students
      </div>
      <div class="flex space-x-2">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
        class="px-3 py-1 border border-slate-200 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
      >
        Previous
      </button>
        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
        class="px-3 py-1 border border-slate-200 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
      >
        Next
      </button>
      </div>
    </div>

    <!-- Student Form Modal -->
    <div v-if="showForm" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click.self="showForm = false">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <StudentForm
          :student="editingStudent"
          :is-editing="!!editingStudent"
          @submit="handleStudentSubmit"
          @cancel="showForm = false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import StudentForm from './StudentForm.vue'
import {
  STUDENT_STATUS,
  PROGRAM_CODES,
  YEAR_LEVELS,
  QUERY_LIMITS
} from '@/assets/constants'
import { listStudents, createStudent, updateStudent, deleteStudentById } from '@/firebase/studentService'

const students = ref([])
const showForm = ref(false)
const editingStudent = ref(null)
const searchQuery = ref('')
const filterProgram = ref('')
const filterYearLevel = ref('')
const filterStatus = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(QUERY_LIMITS.DEFAULT)
const isLoading = ref(false)

const enrolledCount = computed(() => students.value.filter(s => s.isEnrolled).length)

const filteredStudents = computed(() => {
  let filtered = students.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(student =>
      student.studentId.toLowerCase().includes(query) ||
      student.fullName.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query)
    )
  }

  if (filterProgram.value) {
    filtered = filtered.filter(student => student.program === filterProgram.value)
  }

  if (filterYearLevel.value) {
    filtered = filtered.filter(student => student.yearLevel === filterYearLevel.value)
  }

  if (filterStatus.value) {
    filtered = filtered.filter(student => student.status === filterStatus.value)
  }

  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredStudents.value.length / itemsPerPage.value)
})

const paginatedStudents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredStudents.value.slice(start, end)
})

const loadStudents = async () => {
  try {
    isLoading.value = true
    const result = await listStudents()
    if (result.success) {
      students.value = result.students
    } else {
      console.error(result.message)
    }
  } catch (error) {
    console.error('Error loading students:', error)
  } finally {
    isLoading.value = false
  }
}

const handleStudentSubmit = async (studentData) => {
  try {
    if (editingStudent.value) {
      // Update existing student
      const result = await updateStudent(editingStudent.value.id, studentData)
      if (!result.success) throw new Error(result.message)
    } else {
      // Add new student
      const result = await createStudent(studentData)
      if (!result.success) throw new Error(result.message)
    }

    showForm.value = false
    editingStudent.value = null
    await loadStudents()
  } catch (error) {
    console.error('Error saving student:', error)
    alert('Error saving student. Please try again.')
  }
}

const editStudent = (student) => {
  editingStudent.value = { ...student }
  showForm.value = true
}

const deleteStudent = async (student) => {
  if (confirm(`Are you sure you want to delete student ${student.fullName}?`)) {
    try {
      const result = await deleteStudentById(student.id)
      if (!result.success) throw new Error(result.message)

      await loadStudents()
    } catch (error) {
      console.error('Error deleting student:', error)
      alert('Error deleting student. Please try again.')
    }
  }
}

onMounted(() => {
  loadStudents()
})
</script>
