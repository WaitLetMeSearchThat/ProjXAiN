<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Student Management System</h1>
        <p class="mt-2 text-gray-600">Manage students, grades, and subjects for your academic institution</p>
      </div>

      <!-- Navigation Tabs -->
      <div class="mb-6">
        <nav class="flex space-x-8" aria-label="Tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm'
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>
<div v-if="resolvedRole === 'role_registrar'" class="px-4 pb-4 border-t border-white/10 space-y-3">
          <button
            @click="showRegistrarChat = !showRegistrarChat"
            class="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition"
          >
            {{ showRegistrarChat ? 'Hide Chatbot' : 'Open Chatbot' }}
          </button>
          <div
            v-if="showRegistrarChat"
            class="rounded-2xl bg-white/5 border border-white/10 p-2 max-h-[60vh] overflow-y-auto"
          >
            <GradeInquiryChatbot />
          </div>
        </div>
      <!-- Tab Content -->
      <div class="bg-white shadow rounded-lg">
        <StudentList v-if="activeTab === 'students'" />
        <GradeList v-if="activeTab === 'grades'" />
        <SubjectList v-if="activeTab === 'subjects'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import StudentList from '@/Components/StudentList.vue'
import GradeList from '@/Components/GradeList.vue'
import SubjectList from '@/Components/SubjectList.vue'

const route = useRoute()

const isValidTab = (tab) => ['students', 'grades', 'subjects'].includes(tab)
const initialTab = isValidTab(route.query.tab) ? route.query.tab : 'students'
const activeTab = ref(initialTab)

const tabs = [
  { id: 'students', name: 'Students' },
  { id: 'grades', name: 'Grades' },
  { id: 'subjects', name: 'Subjects' }
]

watch(
  () => route.query.tab,
  (tab) => {
    if (isValidTab(tab)) activeTab.value = tab
  }
)
</script>
