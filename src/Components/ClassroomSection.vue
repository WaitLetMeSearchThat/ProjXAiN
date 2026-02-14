<script setup>
import { ref, computed } from 'vue'

/* --------------------------
   MOCK DATA
---------------------------*/
const mockClassrooms = ref([
  {
    id: 'WD-101',
    name: 'Web Development',
    section: 'BSIT 2D',
    instructor: 'Prof. Maria Santos',
    schedule: 'Mon & Wed • 1:00PM - 3:00PM',
    room: 'Room 305',
    status: 'active',
    joined: false,
    modules: [
      { title: 'HTML & CSS', route: '/modules/html-css' },
      { title: 'Vue Fundamentals', route: '/modules/vue' }
    ]
  },
  {
    id: 'PM-201',
    name: 'Process Management',
    section: 'BSIT 4B',
    instructor: 'Dr. John Reyes',
    schedule: 'Tue & Thu • 9:00AM - 10:30AM',
    room: 'Room 210',
    status: 'active',
    joined: true,
    modules: [
      { title: 'Agile Methodology', route: '/modules/agile' },
      { title: 'SDLC Models', route: '/modules/sdlc' }
    ]
  }
])

/* --------------------------
   STATE
---------------------------*/
const selectedClassroom = ref(null)
const showModal = ref(false)

const openDetails = (classroom) => {
  selectedClassroom.value = classroom
  showModal.value = true
}

const joinClass = (classroom) => {
  classroom.joined = true
}

const leaveClass = (classroom) => {
  classroom.joined = false
}
</script>

<template>
  <div class="max-w-7xl mx-auto    bg-gray-300 rounded-xl">

    <!-- Header -->
    <div class="mb-10 px-6 py-10 p-4 rounded-t-xl bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-200">
      <h1 class="text-3xl font-black text-white">Subject Classrooms</h1>
      <p class="text-slate-200 mt-2">Join and access your assigned subject classes.</p>
    </div>

    <!-- Classroom Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 mx-4 pb-4 gap-8">
      <div
        v-for="classroom in mockClassrooms"
        :key="classroom.id"
        class="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition"
      >

        <!-- Header -->
        <div class="flex justify-between items-start">
          <div>
            <p class="text-xs uppercase tracking-widest text-slate-400 font-semibold">
              Subject
            </p>
            <h2 class="text-xl font-bold text-slate-900 mt-2">
              {{ classroom.name }}
            </h2>
            <p class="text-sm text-slate-500 mt-1">
              {{ classroom.section }}
            </p>
          </div>

          <span
            class="px-3 py-1 rounded-full text-xs font-semibold"
            :class="classroom.joined
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-slate-100 text-slate-600'"
          >
            {{ classroom.joined ? 'Joined' : 'Not Joined' }}
          </span>
        </div>

        <!-- Details -->
        <div class="mt-5 text-sm text-slate-600 space-y-1">
          <p><strong>Instructor:</strong> {{ classroom.instructor }}</p>
          <p><strong>Schedule:</strong> {{ classroom.schedule }}</p>
          <p><strong>Room:</strong> {{ classroom.room }}</p>
        </div>

        <!-- Buttons -->
        <div class="mt-6 flex gap-3">
          <button
            v-if="!classroom.joined"
            @click="joinClass(classroom)"
            class="flex-1 bg-slate-900 text-white py-2 rounded-xl font-semibold hover:bg-slate-800 transition"
          >
            Join Subject Class
          </button>

          <button
            v-else
            @click="leaveClass(classroom)"
            class="flex-1 bg-rose-500 text-white py-2 rounded-xl font-semibold hover:bg-rose-600 transition"
          >
            Leave Class
          </button>

          <button
            @click="openDetails(classroom)"
            class="px-4 py-2 border border-slate-300 rounded-xl text-sm hover:bg-slate-100 transition"
          >
            Details
          </button>
        </div>

        <!-- Modules -->
        <div v-if="classroom.joined" class="mt-6">
          <p class="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2">
            Modules
          </p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="module in classroom.modules"
              :key="module.route"
              class="px-3 py-1 bg-slate-900 text-white text-xs rounded-lg"
            >
              {{ module.title }}
            </span>
          </div>
        </div>

      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl relative">

        <button
          @click="showModal = false"
          class="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
        >
          ✕
        </button>

        <h3 class="text-2xl font-bold text-slate-900">
          {{ selectedClassroom?.name }}
        </h3>

        <div class="mt-5 space-y-2 text-sm text-slate-600">
          <p><strong>Section:</strong> {{ selectedClassroom?.section }}</p>
          <p><strong>Instructor:</strong> {{ selectedClassroom?.instructor }}</p>
          <p><strong>Schedule:</strong> {{ selectedClassroom?.schedule }}</p>
          <p><strong>Room:</strong> {{ selectedClassroom?.room }}</p>
          <p><strong>Status:</strong> {{ selectedClassroom?.status }}</p>
        </div>

        <div class="mt-6">
          <p class="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2">
            Available Modules
          </p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="module in selectedClassroom?.modules"
              :key="module.route"
              class="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-lg"
            >
              {{ module.title }}
            </span>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>
