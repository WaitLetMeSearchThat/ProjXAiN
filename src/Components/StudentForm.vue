<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6">{{ isEditing ? 'Edit Student' : 'Add New Student' }}</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
          <input
            v-model="form.studentId"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 21-1234"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            v-model="form.fullName"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="LASTNAME, FIRSTNAME M."
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            v-model="form.email"
            type="email"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="student@email.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Program</label>
          <select
            v-model="form.program"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Program</option>
            <option v-for="program in Object.values(PROGRAM_CODES)" :key="program" :value="program">
              {{ program }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Year Level</label>
          <select
            v-model="form.yearLevel"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Year</option>
            <option v-for="year in Object.values(YEAR_LEVELS)" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Section</label>
          <select
            v-model="form.section"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Section</option>
            <option v-for="section in SECTIONS" :key="section" :value="section">
              {{ section }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            v-model="form.status"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Status</option>
            <option v-for="status in Object.values(STUDENT_STATUS)" :key="status" :value="status">
              {{ status }}
            </option>
          </select>
        </div>

        <div class="flex items-center">
          <input
            v-model="form.isEnrolled"
            type="checkbox"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label class="ml-2 block text-sm text-gray-900">Currently Enrolled</label>
        </div>
      </div>

      <div class="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          @click="$emit('cancel')"
          class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="isLoading"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {{ isLoading ? 'Saving...' : (isEditing ? 'Update Student' : 'Add Student') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import {
  STUDENT_STATUS,
  STUDENT_FIELDS,
  PROGRAM_CODES,
  YEAR_LEVELS,
  SECTIONS,
  COLLECTIONS,
  studentTemplate,
  gradeUtils
} from '@/assets/constants'
import { serverTimestamp } from 'firebase/firestore'

const props = defineProps({
  student: {
    type: Object,
    default: () => ({ ...studentTemplate })
  },
  isEditing: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit', 'cancel'])

const isLoading = ref(false)
const form = reactive({ ...props.student })

const handleSubmit = async () => {
  isLoading.value = true
  try {
    // Parse name components
    const nameComponents = gradeUtils.parseStudentName(form.fullName)
    const studentData = {
      ...form,
      [STUDENT_FIELDS.LAST_NAME]: nameComponents.lastName,
      [STUDENT_FIELDS.FIRST_NAME]: nameComponents.firstName,
      [STUDENT_FIELDS.MIDDLE_NAME]: nameComponents.middleName,
      [STUDENT_FIELDS.EXTENSION_NAME]: nameComponents.extensionName,
      updatedAt: serverTimestamp()
    }

    emit('submit', studentData)
  } catch (error) {
    console.error('Error saving student:', error)
    alert('Error saving student. Please try again.')
  } finally {
    isLoading.value = false
  }
}

// Watch for prop changes to update form
watch(() => props.student, (newStudent) => {
  Object.assign(form, newStudent)
}, { deep: true })
</script>
