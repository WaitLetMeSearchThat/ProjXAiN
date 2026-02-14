<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Subjects</h2>
      <button
        @click="showForm = true; editingSubject = null"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Add Subject
      </button>
    </div>

    <!-- Search and Filter -->
    <div class="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by code or title..."
        class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        v-model="filterProgram"
        class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Programs</option>
        <option v-for="program in Object.values(PROGRAM_CODES)" :key="program" :value="program">
          {{ program }}
        </option>
      </select>
      <select
        v-model="filterYearLevel"
        class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Year Levels</option>
        <option v-for="year in Object.values(YEAR_LEVELS)" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
    </div>

    <!-- Prospectus by Program -->
    <div class="space-y-4">
      <div v-if="isLoading" class="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
        Loading subjects...
      </div>
      <div v-else-if="!groupedPrograms.length" class="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
        No subjects found.
      </div>
      <div v-else v-for="program in groupedPrograms" :key="program.program" class="rounded-2xl border border-slate-200 bg-white">
        <button
          class="w-full flex items-center justify-between gap-3 p-4 sm:p-6 text-left hover:bg-slate-50 transition"
          @click="toggleProgram(program.program)"
        >
          <div>
            <div class="text-xs text-slate-500 uppercase tracking-wider">Program</div>
            <div class="text-lg font-bold text-slate-900">{{ program.program }}</div>
          </div>
          <div class="flex items-center gap-3 text-xs text-slate-500">
            <span>{{ program.totalUnits }} units</span>
            <span class="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-200">
              {{ isProgramOpen(program.program) ? '−' : '+' }}
            </span>
          </div>
        </button>

        <div v-if="isProgramOpen(program.program)" class="px-4 pb-4 sm:px-6 sm:pb-6 space-y-4">
          <div v-for="year in program.years" :key="year.year" class="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div class="flex items-center justify-between gap-2 mb-3">
              <h4 class="text-base font-bold text-slate-800">{{ year.year }}</h4>
              <span class="text-xs text-slate-500">{{ year.totalUnits }} units</span>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full text-sm">
                <thead class="text-xs uppercase tracking-wider text-slate-500">
                  <tr class="border-b border-slate-200">
                    <th class="py-2 pr-4 text-left">Code</th>
                    <th class="py-2 pr-4 text-left">Subject</th>
                    <th class="py-2 pr-4 text-left">Units</th>
                    <th class="py-2 pr-4 text-left">Type</th>
                    <th class="py-2 pr-4 text-left">Semesters</th>
                    <th class="py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody class="text-slate-700">
                  <tr
                    v-for="(subject, index) in year.subjects"
                    :key="subject.id"
                    :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-300'"
                    class="border-b border-slate-100 hover:bg-white"
                  >
                    <td class="py-2 pr-4 font-semibold">{{ subject.code }}</td>
                    <td class="py-2 pr-4">{{ subject.title }}</td>
                    <td class="py-2 pr-4">{{ subject.units }}</td>
                    <td class="py-2 pr-4">{{ subject.subjectType || 'Major' }}</td>
                    <td class="py-2 pr-4">{{ subject.semesterOffered?.join(', ') || 'N/A' }}</td>
                    <td class="py-2">
                      <span
                        :class="subject.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                      >
                        {{ subject.isActive ? 'Active' : 'Inactive' }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 text-sm text-gray-700">
      Showing {{ filteredSubjects.length }} subjects across {{ groupedPrograms.length }} programs
    </div>

    <!-- Subject Form Modal -->
    <div v-if="showForm" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click.self="showForm = false">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <SubjectForm
          :subject="editingSubject"
          :is-editing="!!editingSubject"
          @submit="handleSubjectSubmit"
          @cancel="showForm = false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import SubjectForm from './SubjectForm.vue'
import {
  PROGRAM_CODES,
  YEAR_LEVELS,
  QUERY_LIMITS
} from '@/assets/constants'
import { listSubjects, createSubject, updateSubject, deleteSubjectById } from '@/firebase/subjectService'

const subjects = ref([])
const showForm = ref(false)
const editingSubject = ref(null)
const searchQuery = ref('')
const filterProgram = ref('')
const filterYearLevel = ref('')
const isLoading = ref(false)
const openPrograms = ref(new Set())

const filteredSubjects = computed(() => {
  let filtered = subjects.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(subject =>
      subject.code.toLowerCase().includes(query) ||
      subject.title.toLowerCase().includes(query)
    )
  }

  if (filterProgram.value) {
    filtered = filtered.filter(subject => subject.program === filterProgram.value)
  }

  if (filterYearLevel.value) {
    filtered = filtered.filter(subject => subject.yearLevel === filterYearLevel.value)
  }

  return filtered
})

const yearOrder = {
  '1st Year': 1,
  '2nd Year': 2,
  '3rd Year': 3,
  '4th Year': 4
}

const groupedPrograms = computed(() => {
  const byProgram = new Map()
  filteredSubjects.value.forEach((subject) => {
    const program = subject.program || 'Unassigned'
    if (!byProgram.has(program)) byProgram.set(program, [])
    byProgram.get(program).push(subject)
  })
  return Array.from(byProgram.entries()).map(([program, subjects]) => {
    const byYear = new Map()
    subjects.forEach((subject) => {
      const year = subject.yearLevel || 'Unassigned'
      if (!byYear.has(year)) byYear.set(year, [])
      byYear.get(year).push(subject)
    })
    const years = Array.from(byYear.entries())
      .sort((a, b) => (yearOrder[a[0]] || 99) - (yearOrder[b[0]] || 99))
      .map(([year, list]) => ({
        year,
        subjects: list.sort((a, b) => String(a.code).localeCompare(String(b.code))),
        totalUnits: list.reduce((sum, item) => sum + Number(item.units || 0), 0)
      }))
    return {
      program,
      years,
      totalUnits: subjects.reduce((sum, item) => sum + Number(item.units || 0), 0)
    }
  })
})

const toggleProgram = (program) => {
  if (openPrograms.value.has(program)) {
    openPrograms.value.delete(program)
  } else {
    openPrograms.value.add(program)
  }
  openPrograms.value = new Set(openPrograms.value)
}

const isProgramOpen = (program) => openPrograms.value.has(program)

const loadSubjects = async () => {
  try {
    isLoading.value = true
    const result = await listSubjects()
    if (result.success) {
      subjects.value = result.subjects
    } else {
      console.error(result.message)
    }
  } catch (error) {
    console.error('Error loading subjects:', error)
  } finally {
    isLoading.value = false
  }
}

const handleSubjectSubmit = async (subjectData) => {
  try {
    if (editingSubject.value) {
      // Update existing subject
      const result = await updateSubject(editingSubject.value.id, subjectData)
      if (!result.success) throw new Error(result.message)
    } else {
      // Add new subject
      const result = await createSubject(subjectData)
      if (!result.success) throw new Error(result.message)
    }

    showForm.value = false
    editingSubject.value = null
    await loadSubjects()
  } catch (error) {
    console.error('Error saving subject:', error)
    alert('Error saving subject. Please try again.')
  }
}

const editSubject = (subject) => {
  editingSubject.value = { ...subject }
  showForm.value = true
}

const deleteSubject = async (subject) => {
  if (confirm(`Are you sure you want to delete subject ${subject.code}?`)) {
    try {
      const result = await deleteSubjectById(subject.id)
      if (!result.success) throw new Error(result.message)

      await loadSubjects()
    } catch (error) {
      console.error('Error deleting subject:', error)
      alert('Error deleting subject. Please try again.')
    }
  }
}

onMounted(() => {
  loadSubjects()
})
</script>
