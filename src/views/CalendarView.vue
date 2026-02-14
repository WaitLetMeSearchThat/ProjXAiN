<template>
  <div class="p-4 md:p-6  mx-4 my-4 rounded-lg bg-gray-300 ">
    <div class="mb-6 mx-4 my-4  ">
      <h1 class="text-2xl md:text-3xl text-gradient-to-r from-emerald-600 via-teal-500 to-blue-200 font-bold  dark:text-white">
        Calendar of Activities
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mt-1">
        View and manage school events and activities
      </p>
    </div>
    
    <!-- Sample events for demonstration -->
    <Scheduler 
      :initial-date="new Date()" 
      :events="sampleEvents"
      @event-created="handleEventCreated"
      @event-updated="handleEventUpdated"
      @event-deleted="handleEventDeleted"
    />
 
<AnnouncementList />

  </div>
</template>

<script setup>
import { ref } from 'vue'
import Scheduler from '@/Components/Scheduler.vue'
import AnnouncementList from '@/Components/AnnouncementList.vue'

// Sample events - in a real app, these would come from a database
const sampleEvents = ref([
  {
    id: '1',
    title: 'Mathematics Quiz',
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '10:00',
    color: '#3B82F6',
    description: 'Chapter 1-3 quiz'
  },
  {
    id: '2',
    title: 'Science Lab',
    date: new Date().toISOString().split('T')[0],
    startTime: '13:00',
    endTime: '15:00',
    color: '#10B981',
    description: 'Chemistry lab experiment'
  },
  {
    id: '3',
    title: 'Faculty Meeting',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    startTime: '10:00',
    endTime: '11:30',
    color: '#8B5CF6',
    description: 'Monthly faculty meeting'
  },
  {
    id: '4',
    title: 'Enrollment Deadline',
    date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
    startTime: '17:00',
    endTime: '23:59',
    color: '#EF4444',
    description: 'Last day for late enrollment'
  }
])

// Event handlers
const handleEventCreated = (event) => {
  console.log('Event created:', event)
  // In a real app, you would save this to your database
}

const handleEventUpdated = (event) => {
  console.log('Event updated:', event)
  // In a real app, you would update this in your database
}

const handleEventDeleted = (event) => {
  console.log('Event deleted:', event)
  // In a real app, you would delete this from your database
}
</script>
