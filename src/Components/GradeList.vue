<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Grades</h2>
      <button
        @click="showForm = true; editingGrade = null"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Add Grade
      </button>
    </div>

    <!-- Search and Filter -->
    <div class="mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by student ID or subject..."
        class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        v-model="filterSemester"
        class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Semesters</option>
        <option v-for="sem in Object.values(SEMESTERS)" :key="sem" :value="sem">
          {{ sem }}
        </option>
      </select>
      <select
        v-model="filterAcademicYear"
        class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Academic Years</option>
        <option value="2024-2025">2024-2025</option>
        <option value="2025-2026">2025-2026</option>
      </select>
      <select
        v-model="filterRemarks"
        class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Remarks</option>
        <option v-for="remark in Object.values(GRADE_REMARKS)" :key="remark" :value="remark">
          {{ remark }}
        </option>
      </select>
      <select
        v-model="filterSection"
        class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Sections</option>
        <option v-for="section in sectionOptions" :key="section" :value="section">
          {{ section }}
        </option>
      </select>
    </div>

    <!-- Grades by Subject + Instructor -->
    <div class="space-y-4">
      <div v-if="isLoading" class="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
        Loading grades...
      </div>
      <div v-else-if="!groupedGrades.length" class="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
        No grades found.
      </div>
      <div
        v-else
        v-for="group in groupedGrades"
        :key="group.key"
        class="rounded-2xl border border-slate-200 bg-white"
      >
        <button
          class="w-full flex items-center justify-between gap-3 p-4 sm:p-6 text-left hover:bg-slate-50 transition"
          @click="toggleGroup(group.key)"
        >
          <div>
            <div class="text-xs text-slate-500 uppercase tracking-wider">Faculty / Subject</div>
            <div class="text-lg font-bold text-slate-900">
              {{ group.instructor || 'N/A' }} • {{ group.subjectCode }}
              <span class="text-slate-500 text-base font-medium">{{ group.subjectTitle }}</span>
            </div>
          </div>
          <div class="flex items-center gap-3 text-xs text-slate-500">
            <span>{{ group.rows.length }} records</span>
            <span class="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-200">
              {{ isGroupOpen(group.key) ? '−' : '+' }}
            </span>
          </div>
        </button>

        <div v-if="isGroupOpen(group.key)" class="px-4 pb-4 sm:px-6 sm:pb-6">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-slate-200">
              <thead class="bg-slate-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Student ID</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Midterm</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Final</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Final Grade</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Remarks</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-slate-100">
                <tr
                  v-for="(grade, index) in group.rows"
                  :key="grade.id"
                  :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-300'"
                  class="hover:bg-white"
                >
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    {{ grade.studentId }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {{ grade.midtermGrade || '-' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {{ grade.finalTermGrade || '-' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    {{ grade.finalGrade ? grade.finalGrade.toFixed(2) : '-' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      :class="grade.remarks === GRADE_REMARKS.PASSED ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    >
                      {{ grade.remarks || 'No Grade' }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="mt-6 flex justify-between items-center">
      <div class="text-sm text-gray-700">
        Showing {{ filteredGrades.length }} grades across {{ groupedGrades.length }} subject groups
      </div>
    </div>

    <!-- Grade Form Modal -->
    <div v-if="showForm" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click.self="showForm = false">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <GradeForm
          :grade="editingGrade"
          :is-editing="!!editingGrade"
          @submit="handleGradeSubmit"
          @cancel="showForm = false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import GradeForm from './GradeForm.vue'
import {
  SEMESTERS,
  GRADE_REMARKS,
  QUERY_LIMITS
} from '@/assets/constants'
import { listGrades, createGrade, updateGrade, deleteGradeById } from '@/firebase/gradeService'

const grades = ref([])
const showForm = ref(false)
const editingGrade = ref(null)
const searchQuery = ref('')
const filterSemester = ref('')
const filterAcademicYear = ref('')
const filterRemarks = ref('')
const filterSection = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(QUERY_LIMITS.DEFAULT)
const isLoading = ref(false)
const openGroups = ref(new Set())

const filteredGrades = computed(() => {
  let filtered = grades.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(grade =>
      grade.studentId.toLowerCase().includes(query) ||
      grade.subjectCode.toLowerCase().includes(query) ||
      grade.subjectTitle.toLowerCase().includes(query)
    )
  }

  if (filterSemester.value) {
    filtered = filtered.filter(grade => grade.semester === filterSemester.value)
  }

  if (filterAcademicYear.value) {
    filtered = filtered.filter(grade => grade.academicYear === filterAcademicYear.value)
  }

  if (filterRemarks.value) {
    filtered = filtered.filter(grade => grade.remarks === filterRemarks.value)
  }

  if (filterSection.value) {
    const section = normalizeSection(filterSection.value)
    filtered = filtered.filter(grade =>
      normalizeSection(grade.programYearSection || '').includes(section)
    )
  }

  return filtered
})

const sectionOptions = computed(() => {
  const set = new Set()
  grades.value.forEach((grade) => {
    const value = String(grade.programYearSection || '').trim()
    if (value) set.add(value)
  })
  return Array.from(set).sort()
})

const normalizeSection = (value) => {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '')
}

const groupedGrades = computed(() => {
  const groups = new Map()
  filteredGrades.value.forEach((grade) => {
    const key = `${grade.subjectCode || ''}__${grade.instructor || grade.instructorId || ''}`
    if (!groups.has(key)) {
      groups.set(key, {
        key,
        subjectCode: grade.subjectCode || 'N/A',
        subjectTitle: grade.subjectTitle || '',
        instructor: grade.instructor || grade.instructorId || 'N/A',
        rows: []
      })
    }
    groups.get(key).rows.push(grade)
  })
  return Array.from(groups.values())
})

const toggleGroup = (key) => {
  if (openGroups.value.has(key)) {
    openGroups.value.delete(key)
  } else {
    openGroups.value.add(key)
  }
  openGroups.value = new Set(openGroups.value)
}

const isGroupOpen = (key) => openGroups.value.has(key)

const loadGrades = async () => {
  try {
    isLoading.value = true
    const result = await listGrades()
    if (result.success) {
      grades.value = result.grades
    } else {
      console.error(result.message)
    }
  } catch (error) {
    console.error('Error loading grades:', error)
  } finally {
    isLoading.value = false
  }
}

const handleGradeSubmit = async (gradeData) => {
  try {
    if (editingGrade.value) {
      // Update existing grade
      const result = await updateGrade(editingGrade.value.id, gradeData)
      if (!result.success) throw new Error(result.message)
    } else {
      // Add new grade
      const result = await createGrade(gradeData)
      if (!result.success) throw new Error(result.message)
    }

    showForm.value = false
    editingGrade.value = null
    await loadGrades()
  } catch (error) {
    console.error('Error saving grade:', error)
    alert('Error saving grade. Please try again.')
  }
}

const editGrade = (grade) => {
  editingGrade.value = { ...grade }
  showForm.value = true
}

const deleteGrade = async (grade) => {
  if (confirm(`Are you sure you want to delete grade for ${grade.subjectCode}?`)) {
    try {
      const result = await deleteGradeById(grade.id)
      if (!result.success) throw new Error(result.message)

      await loadGrades()
    } catch (error) {
      console.error('Error deleting grade:', error)
      alert('Error deleting grade. Please try again.')
    }
  }
}

onMounted(() => {
  loadGrades()
})
</script>
