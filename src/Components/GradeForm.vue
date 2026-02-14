<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6">{{ isEditing ? 'Edit Grade' : 'Add New Grade' }}</h2>

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
          <label class="block text-sm font-medium text-gray-700 mb-1">Subject Code</label>
          <input
            v-model="form.subjectCode"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., DM 103"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Subject Title</label>
          <input
            v-model="form.subjectTitle"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Business Process Management"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Instructor ID</label>
          <input
            v-model="form.instructorId"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., INST001"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
          <input
            v-model="form.academicYear"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 2024-2025"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Semester</label>
          <select
            v-model="form.semester"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Semester</option>
            <option v-for="sem in Object.values(SEMESTERS)" :key="sem" :value="sem">
              {{ sem }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Program Year Section</label>
          <input
            v-model="form.programYearSection"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., BSIS-3-F"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Midterm Grade</label>
          <input
            v-model.number="form.midtermGrade"
            type="number"
            min="0"
            max="100"
            step="0.01"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0.00"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Final Term Grade</label>
          <input
            v-model.number="form.finalTermGrade"
            type="number"
            min="0"
            max="100"
            step="0.01"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0.00"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
          <select
            v-model="form.remarks"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Remarks</option>
            <option v-for="remark in Object.values(GRADE_REMARKS)" :key="remark" :value="remark">
              {{ remark }}
            </option>
          </select>
        </div>
      </div>

      <!-- Computed Final Grade Display -->
      <div v-if="computedFinalGrade !== null" class="bg-gray-50 p-4 rounded-md">
        <p class="text-sm text-gray-600">
          Computed Final Grade: <span class="font-bold text-lg">{{ computedFinalGrade.toFixed(2) }}</span>
        </p>
        <p class="text-sm text-gray-600">
          Auto Remarks: <span class="font-bold">{{ autoRemarks }}</span>
        </p>
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
          {{ isLoading ? 'Saving...' : (isEditing ? 'Update Grade' : 'Add Grade') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import {
  GRADE_FIELDS,
  SEMESTERS,
  GRADE_REMARKS,
  GRADE_PASSING_SCORE,
  gradeTemplate,
  gradeUtils
} from '@/assets/constants'
import { serverTimestamp } from 'firebase/firestore'

const props = defineProps({
  grade: {
    type: Object,
    default: () => ({ ...gradeTemplate })
  },
  isEditing: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit', 'cancel'])

const isLoading = ref(false)
const form = reactive({ ...props.grade })

const computedFinalGrade = computed(() => {
  if (form.midtermGrade !== null && form.finalTermGrade !== null) {
    return gradeUtils.computeFinalGrade(form.midtermGrade, form.finalTermGrade)
  }
  return null
})

const autoRemarks = computed(() => {
  if (computedFinalGrade.value !== null) {
    return gradeUtils.getRemarks(computedFinalGrade.value)
  }
  return ''
})

const handleSubmit = async () => {
  isLoading.value = true
  try {
    const finalGrade = computedFinalGrade.value
    const remarks = form.remarks || autoRemarks.value

    const gradeData = {
      ...form,
      [GRADE_FIELDS.FINAL_GRADE]: finalGrade,
      [GRADE_FIELDS.REMARKS]: remarks,
      updatedAt: serverTimestamp()
    }

    emit('submit', gradeData)
  } catch (error) {
    console.error('Error saving grade:', error)
    alert('Error saving grade. Please try again.')
  } finally {
    isLoading.value = false
  }
}

// Watch for prop changes to update form
watch(() => props.grade, (newGrade) => {
  Object.assign(form, newGrade)
}, { deep: true })

// Auto-update remarks when computed
watch(autoRemarks, (newRemarks) => {
  if (!form.remarks && newRemarks) {
    form.remarks = newRemarks
  }
})
</script>
