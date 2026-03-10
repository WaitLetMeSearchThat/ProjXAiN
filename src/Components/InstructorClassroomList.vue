<script setup>
import { computed, onMounted, ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import {
  createVirtualClassroom,
  deactivateClassroomOffering,
  getClassroomOfferings,
  regenerateClassroomJoinCode,
  updateClassroomOffering
} from '@/firebase/classroomService'

const { user, userProfile } = useAuth()

const offerings = ref([])
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const isSubmitting = ref(false)
const editingId = ref('')
const editForm = ref({ subjectCode: '', subjectTitle: '', section: '' })
const createForm = ref({ subjectCode: '', subjectTitle: '', section: '' })

const instructorEmail = computed(() =>
  String(user.value?.email || userProfile.value?.email || '').trim().toLowerCase()
)

const instructorClassrooms = computed(() =>
  offerings.value.filter((item) => String(item.instructorEmail || '').trim().toLowerCase() === instructorEmail.value)
)

const resetAlerts = () => {
  errorMessage.value = ''
  successMessage.value = ''
}

const loadClassrooms = async () => {
  isLoading.value = true
  resetAlerts()
  try {
    const result = await getClassroomOfferings()
    if (!result.success) {
      errorMessage.value = 'Unable to load classrooms.'
      return
    }
    offerings.value = result.offerings || []
  } finally {
    isLoading.value = false
  }
}

const startEdit = (room) => {
  editingId.value = room.id
  editForm.value = {
    subjectCode: room.subjectCode || '',
    subjectTitle: room.subjectTitle || '',
    section: room.section || ''
  }
}

const cancelEdit = () => {
  editingId.value = ''
  editForm.value = { subjectCode: '', subjectTitle: '', section: '' }
}

const saveEdit = async (room) => {
  if (!editingId.value) return
  isSubmitting.value = true
  resetAlerts()
  try {
    const result = await updateClassroomOffering(room.id, {
      ...editForm.value,
      instructorEmail: instructorEmail.value,
      instructorName: instructorEmail.value
    })
    if (!result.success) {
      errorMessage.value = result.message || 'Unable to update classroom.'
      return
    }
    successMessage.value = 'Classroom updated.'
    cancelEdit()
    await loadClassrooms()
  } finally {
    isSubmitting.value = false
  }
}

const handleCreate = async () => {
  if (!createForm.value.subjectCode || !createForm.value.subjectTitle || !createForm.value.section) {
    errorMessage.value = 'Subject code, title, and section are required.'
    return
  }
  isSubmitting.value = true
  resetAlerts()
  try {
    const result = await createVirtualClassroom({
      subjectCode: createForm.value.subjectCode,
      subjectTitle: createForm.value.subjectTitle,
      section: createForm.value.section,
      scheduleDay: 'TBA',
      scheduleTime: 'TBA',
      room: 'TBA',
      instructorEmail: instructorEmail.value,
      instructorName: instructorEmail.value
    })
    if (!result.success) {
      errorMessage.value = result.message || 'Unable to create classroom.'
      return
    }
    successMessage.value = result.message || 'Classroom created.'
    createForm.value = { subjectCode: '', subjectTitle: '', section: '' }
    await loadClassrooms()
  } finally {
    isSubmitting.value = false
  }
}

const handleDelete = async (room) => {
  isSubmitting.value = true
  resetAlerts()
  try {
    const result = await deactivateClassroomOffering(room.id)
    if (!result.success) {
      errorMessage.value = result.message || 'Unable to remove classroom.'
      return
    }
    successMessage.value = 'Classroom removed.'
    await loadClassrooms()
  } finally {
    isSubmitting.value = false
  }
}

const handleRegenerate = async (room) => {
  isSubmitting.value = true
  resetAlerts()
  try {
    const result = await regenerateClassroomJoinCode(room.id)
    if (!result.success) {
      errorMessage.value = result.message || 'Unable to regenerate join code.'
      return
    }
    successMessage.value = 'Join code regenerated.'
    await loadClassrooms()
  } finally {
    isSubmitting.value = false
  }
}

onMounted(loadClassrooms)
</script>

<template>
  <div class="max-w-6xl mx-auto rounded-[28px] border border-slate-700/60 bg-[#0f1118] text-slate-100 shadow-2xl">
    <div class="px-6 py-6 border-b border-slate-700/60 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-300 rounded-t-[28px]">
      <h1 class="text-2xl font-black text-white">My Created Classrooms</h1>
      <p class="text-sm text-emerald-50/90 mt-1">
        Instructor: {{ instructorEmail || 'Unknown' }}
      </p>
    </div>

    <div class="p-6">
      <div v-if="successMessage" class="mb-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="mb-4 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
        {{ errorMessage }}
      </div>

      <div class="rounded-2xl border border-slate-700/60 bg-slate-900/50 p-4 mb-6">
        <h2 class="text-sm font-semibold text-slate-100">Create Classroom</h2>
        <div class="mt-3 grid gap-3 sm:grid-cols-3">
          <input
            v-model="createForm.subjectCode"
            type="text"
            class="rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
            placeholder="Subject code"
          />
          <input
            v-model="createForm.subjectTitle"
            type="text"
            class="rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
            placeholder="Subject title"
          />
          <input
            v-model="createForm.section"
            type="text"
            class="rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
            placeholder="Section"
          />
        </div>
        <button
          class="mt-3 rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-600 disabled:opacity-60"
          :disabled="isSubmitting"
          @click="handleCreate"
        >
          {{ isSubmitting ? 'Saving...' : 'Create Classroom' }}
        </button>
      </div>

      <div v-if="isLoading" class="text-sm text-slate-400">Loading classrooms...</div>

      <div v-else-if="!instructorClassrooms.length" class="text-sm text-slate-400">
        No classrooms created yet.
      </div>

      <div v-else class="grid gap-4 sm:grid-cols-2">
        <div
          v-for="room in instructorClassrooms"
          :key="room.id"
          class="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-4 shadow-lg"
        >
          <div class="text-lg font-bold text-slate-100">
            {{ room.subjectCode }} - Section {{ room.section }}
          </div>
          <div class="text-sm text-slate-400">{{ room.subjectTitle }}</div>

          <div class="mt-3 space-y-1 text-xs text-slate-300">
            <div><span class="font-semibold text-slate-200">Schedule:</span> {{ room.scheduleDay }} | {{ room.scheduleTime }}</div>
            <div><span class="font-semibold text-slate-200">Room:</span> {{ room.room || 'TBA' }}</div>
            <div><span class="font-semibold text-slate-200">Join Code:</span> {{ room.joinCode || 'N/A' }}</div>
          </div>

          <div v-if="editingId === room.id" class="mt-4 space-y-2">
            <input
              v-model="editForm.subjectCode"
              type="text"
              class="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-xs text-slate-100"
              placeholder="Subject code"
            />
            <input
              v-model="editForm.subjectTitle"
              type="text"
              class="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-xs text-slate-100"
              placeholder="Subject title"
            />
            <input
              v-model="editForm.section"
              type="text"
              class="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-xs text-slate-100"
              placeholder="Section"
            />
            <div class="flex flex-wrap gap-2">
              <button
                class="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-600 disabled:opacity-60"
                :disabled="isSubmitting"
                @click="saveEdit(room)"
              >
                Save
              </button>
              <button class="rounded-lg border border-slate-600 px-3 py-1.5 text-xs text-slate-200" @click="cancelEdit">
                Cancel
              </button>
            </div>
          </div>

          <div v-else class="mt-4 flex flex-wrap gap-2">
            <button
              class="rounded-lg border border-slate-600 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-800"
              :disabled="isSubmitting"
              @click="startEdit(room)"
            >
              Edit
            </button>
            <button
              class="rounded-lg border border-emerald-500/50 px-3 py-1.5 text-xs text-emerald-200 hover:bg-emerald-500/10"
              :disabled="isSubmitting"
              @click="handleRegenerate(room)"
            >
              Regenerate Code
            </button>
            <button
              class="rounded-lg border border-rose-500/50 px-3 py-1.5 text-xs text-rose-200 hover:bg-rose-500/10"
              :disabled="isSubmitting"
              @click="handleDelete(room)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
