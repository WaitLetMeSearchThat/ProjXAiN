<template>
  <div class="view-shell">
    <div class="view-content py-10 space-y-6">
      <ClassroomSection />
      <InstructorClassroomList v-if="isInstructor" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuth } from '@/composables/useAuth'
import ClassroomSection from '@/Components/ClassroomSection.vue'
import InstructorClassroomList from '@/Components/InstructorClassroomList.vue'

const { role, userProfile } = useAuth()
const isInstructor = computed(() => (role.value || userProfile.value?.role) === 'role_instructor')
</script>
