<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6">{{ isEditing ? 'Edit Subject' : 'Add New Subject' }}</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Subject Code</label>
          <input
            v-model="form.code"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., DM 103"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Subject Title</label>
          <input
            v-model="form.title"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Business Process Management"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Units</label>
          <input
            v-model.number="form.units"
            type="number"
            min="0"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="3"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Lecture Units</label>
          <input
            v-model.number="form.lectureUnits"
            type="number"
            min="0"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="2"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Lab Units</label>
          <input
            v-model.number="form.labUnits"
            type="number"
            min="0"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="1"
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
          <label class="block text-sm font-medium text-gray-700 mb-1">Semester Offered</label>
          <div class="space-y-2">
            <div v-for="semester in Object.values(SEMESTERS)" :key="semester" class="flex items-center">
              <input
                :id="semester"
                v-model="form.semesterOffered"
                :value="semester"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label :for="semester" class="ml-2 block text-sm text-gray-900">
                {{ semester }}
              </label>
            </div>
          </div>
        </div>

        <div class="flex items-center">
          <input
            v-model="form.isActive"
            type="checkbox"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label class="ml-2 block text-sm text-gray-900">Is Active</label>
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
          {{ isLoading ? 'Saving...' : (isEditing ? 'Update Subject' : 'Add Subject') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import {
  SUBJECT_FIELDS,
  PROGRAM_CODES,
  YEAR_LEVELS,
  SEMESTERS,
  subjectTemplate
} from '@/assets/constants'

const props = defineProps({
  subject: {
    type: Object,
    default: () => ({ ...subjectTemplate })
  },
  isEditing: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit', 'cancel'])

const isLoading = ref(false)
const form = reactive({
  ...props.subject,
  semesterOffered: props.subject.semesterOffered || []
})

const handleSubmit = async () => {
  isLoading.value = true
  try {
    const subjectData = {
      ...form,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }

    emit('submit', subjectData)
  } catch (error) {
    console.error('Error saving subject:', error)
    alert('Error saving subject. Please try again.')
  } finally {
    isLoading.value = false
  }
}

// Watch for prop changes to update form
watch(() => props.subject, (newSubject) => {
  Object.assign(form, {
    ...newSubject,
    semesterOffered: newSubject.semesterOffered || []
  })
}, { deep: true })
</script>
