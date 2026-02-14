<template>
  <div class="scheduler-container bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
    <!-- Toolbar -->
    <div class="scheduler-toolbar flex items-center justify-between px-4 py-3 bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-600 text-white">
      <!-- Left: Navigation & Date -->
      <div class="flex items-center space-x-3">
        <button 
          @click="navigateToday" 
          class="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-md text-sm font-medium transition-colors"
        >
          Today
        </button>
        <div class="flex items-center space-x-1">
          <button 
            @click="navigatePrev" 
            class="p-1.5 hover:bg-white/20 rounded-md transition-colors"
            aria-label="Previous"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            @click="navigateNext" 
            class="p-1.5 hover:bg-white/20 rounded-md transition-colors"
            aria-label="Next"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <h2 class="text-lg font-semibold">{{ currentDateDisplay }}</h2>
      </div>

      <!-- Right: View Switcher -->
      <div class="flex items-center space-x-1 bg-white/10 rounded-lg p-1">
        <button 
          v-for="view in views" 
          :key="view.id"
          @click="currentView = view.id"
          :class="[
            'px-3 py-1.5 rounded-md text-sm font-medium transition-all',
            currentView === view.id 
              ? 'bg-white text-blue-700 shadow-sm' 
              : 'text-white/80 hover:text-white hover:bg-white/10'
          ]"
        >
          {{ view.label }}
        </button>
      </div>
    </div>

    <!-- Calendar Views -->
    <div class="scheduler-content">
      <!-- Month View -->
      <div v-if="currentView === 'month'" class="month-view">
        <!-- Weekday Headers -->
        <div class="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
          <div 
            v-for="day in weekDays" 
            :key="day" 
            class="py-2 text-center text-sm font-semibold text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900"
          >
            {{ day }}
          </div>
        </div>
        <!-- Calendar Grid -->
        <div class="grid grid-cols-7">
          <div 
            v-for="(day, index) in monthDays" 
            :key="index"
            :class="[
              'min-h-24 border-b border-r border-gray-200 dark:border-gray-700 p-1 cursor-pointer transition-colors hover:bg-blue-50 dark:hover:bg-gray-700',
              !day.isCurrentMonth && 'bg-gray-50 dark:bg-gray-900 text-gray-400',
              day.isToday && 'bg-blue-50 dark:bg-blue-900/30'
            ]"
            @click="selectDate(day.date)"
          >
            <div class="flex justify-between items-start">
              <span 
                :class="[
                  'text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full',
                  day.isToday 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 dark:text-gray-300'
                ]"
              >
                {{ day.dayNumber }}
              </span>
              <button 
                v-if="day.isCurrentMonth"
                @click.stop="openNewEventModal(day.date)"
                class="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors"
                aria-label="Add event"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            <!-- Events for this day -->
            <div class="mt-1 space-y-1 overflow-hidden">
              <div 
                v-for="event in getDayEvents(day.date).slice(0, 3)" 
                :key="event.id"
                @click.stop="openEditEventModal(event)"
                :class="[
                  'text-xs px-1.5 py-0.5 rounded truncate cursor-pointer text-white',
                  getEventColorClass(event.color)
                ]"
                :title="event.title"
              >
                {{ formatEventTime(event) }} {{ event.title }}
              </div>
              <div 
                v-if="getDayEvents(day.date).length > 3" 
                class="text-xs text-gray-500 dark:text-gray-400 pl-1"
              >
                +{{ getDayEvents(day.date).length - 3 }} more
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Week View -->
      <div v-else-if="currentView === 'week'" class="week-view">
        <!-- Time Column Header -->
        <div class="grid grid-cols-8 border-b border-gray-200 dark:border-gray-700">
          <div class="p-2 text-center text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900"></div>
          <div 
            v-for="(day, index) in weekDaysData" 
            :key="index"
            :class="[
              'p-2 text-center border-l border-gray-200 dark:border-gray-700',
              day.isToday ? 'bg-blue-50 dark:bg-blue-900/30' : 'bg-gray-50 dark:bg-gray-900'
            ]"
          >
            <div class="text-xs text-gray-500 dark:text-gray-400">{{ day.dayName }}</div>
            <div 
              :class="[
                'text-lg font-semibold',
                day.isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
              ]"
            >
              {{ day.dayNumber }}
            </div>
          </div>
        </div>
        <!-- Time Slots -->
        <div class="week-grid max-h-[500px] overflow-y-auto">
          <div 
            v-for="hour in timeSlots" 
            :key="hour"
            class="grid grid-cols-8 border-b border-gray-100 dark:border-gray-700"
          >
            <div class="p-2 text-xs text-gray-500 dark:text-gray-400 text-right pr-3 border-r border-gray-200 dark:border-gray-700">
              {{ formatHour(hour) }}
            </div>
            <div 
              v-for="(day, index) in weekDaysData" 
              :key="index"
              class="min-h-16 border-l border-gray-100 dark:border-gray-700 relative hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer"
              @click="openNewEventModalAtTime(day.date, hour)"
            >
              <!-- Events -->
              <div 
                v-for="event in getHourEvents(day.date, hour)" 
                :key="event.id"
                @click.stop="openEditEventModal(event)"
                :class="[
                  'absolute left-0.5 right-0.5 px-1 py-0.5 rounded text-xs text-white cursor-pointer overflow-hidden',
                  getEventColorClass(event.color),
                  getEventHeightClass(event)
                ]"
                :style="getEventStyle(event)"
                :title="event.title"
              >
                <div class="font-semibold truncate">{{ event.title }}</div>
                <div class="opacity-90 truncate">{{ formatEventTime(event) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Day View -->
      <div v-else-if="currentView === 'day'" class="day-view">
        <div class="grid grid-cols-1">
          <div 
            v-for="hour in timeSlots" 
            :key="hour"
            class="grid grid-cols-12 border-b border-gray-100 dark:border-gray-700"
          >
            <div class="col-span-2 p-2 text-xs text-gray-500 dark:text-gray-400 text-right pr-3 border-r border-gray-200 dark:border-gray-700">
              {{ formatHour(hour) }}
            </div>
            <div 
              class="col-span-10 min-h-20 border-l border-gray-100 dark:border-gray-700 relative hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer"
              @click="openNewEventModalAtTime(selectedDate, hour)"
            >
              <!-- Events -->
              <div 
                v-for="event in getHourEvents(selectedDate, hour)" 
                :key="event.id"
                @click.stop="openEditEventModal(event)"
                :class="[
                  'absolute left-1 right-1 px-2 py-1 rounded text-sm text-white cursor-pointer',
                  getEventColorClass(event.color),
                  getEventHeightClass(event)
                ]"
                :style="getEventStyle(event)"
                :title="event.title"
              >
                <div class="font-semibold">{{ event.title }}</div>
                <div class="opacity-90 text-xs">{{ formatEventTime(event) }}</div>
                <div v-if="event.description" class="opacity-75 text-xs truncate mt-1">{{ event.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Agenda View -->
      <div v-else-if="currentView === 'agenda'" class="agenda-view p-4">
        <div v-if="agendaEvents.length === 0" class="text-center py-12 text-gray-500 dark:text-gray-400">
          <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p class="text-lg">No events scheduled</p>
          <p class="text-sm">Click the button above to create a new event</p>
        </div>
        <div v-else class="space-y-4">
          <div 
            v-for="(events, date) in groupedAgendaEvents" 
            :key="date"
          >
            <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 sticky top-0 bg-white dark:bg-gray-800 py-2">
              {{ formatAgendaDate(date) }}
            </h3>
            <div class="space-y-2">
              <div 
                v-for="event in events" 
                :key="event.id"
                @click="openEditEventModal(event)"
                class="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
              >
                <div :class="['w-2 h-2 rounded-full mt-2', getEventBgClass(event.color)]"></div>
                <div class="flex-1">
                  <div class="font-semibold text-gray-800 dark:text-gray-200">{{ event.title }}</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    {{ formatEventTime(event) }}
                    <span v-if="event.endTime"> - {{ event.endTime }}</span>
                  </div>
                  <div v-if="event.description" class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {{ event.description }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Event Modal -->
    <div 
      v-if="showEventModal" 
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="closeEventModal"
    >
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div class="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <h3 class="text-lg font-semibold">{{ editingEvent?.id ? 'Edit Event' : 'New Event' }}</h3>
        </div>
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
            <input 
              v-model="eventForm.title"
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Event title"
            />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Time</label>
              <input 
                v-model="eventForm.startTime"
                type="time" 
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Time</label>
              <input 
                v-model="eventForm.endTime"
                type="time" 
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Color</label>
            <div class="flex space-x-2">
              <button 
                v-for="color in eventColors" 
                :key="color.value"
                @click="eventForm.color = color.value"
                :class="[
                  'w-8 h-8 rounded-full transition-transform',
                  eventForm.color === color.value ? 'ring-2 ring-offset-2 ring-blue-500 scale-110' : 'hover:scale-110'
                ]"
                :style="{ backgroundColor: color.value }"
                :aria-label="color.name"
              ></button>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea 
              v-model="eventForm.description"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Optional description"
            ></textarea>
          </div>
        </div>
        <div class="px-6 py-4 bg-gray-50 dark:bg-gray-900 flex justify-between">
          <button 
            v-if="editingEvent?.id"
            @click="deleteEvent"
            class="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            Delete
          </button>
          <div class="flex space-x-2 ml-auto">
            <button 
              @click="closeEventModal"
              class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button 
              @click="saveEvent"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Props for external events
const props = defineProps({
  initialDate: {
    type: Date,
    default: () => new Date()
  },
  events: {
    type: Array,
    default: () => []
  }
})

// Emits for event changes
const emit = defineEmits(['event-created', 'event-updated', 'event-deleted'])

// View types
const views = [
  { id: 'day', label: 'Day' },
  { id: 'week', label: 'Week' },
  { id: 'month', label: 'Month' },
  { id: 'agenda', label: 'Agenda' }
]

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// State
const currentView = ref('month')
const currentDate = ref(new Date(props.initialDate))
const selectedDate = ref(new Date(props.initialDate))
const internalEvents = ref([...props.events])
const showEventModal = ref(false)
const editingEvent = ref(null)
const newEventDate = ref(null)
const newEventTime = ref(null)

// Event form
const eventForm = ref({
  title: '',
  startTime: '09:00',
  endTime: '10:00',
  color: '#3B82F6',
  description: ''
})

// Event colors
const eventColors = [
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Green', value: '#10B981' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Orange', value: '#F59E0B' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Cyan', value: '#06B6D4' },
  { name: 'Indigo', value: '#6366F1' }
]

// Time slots (6 AM to 9 PM)
const timeSlots = Array.from({ length: 16 }, (_, i) => i + 6)

// Computed
const currentDateDisplay = computed(() => {
  const options = { month: 'long', year: 'numeric' }
  if (currentView.value === 'day') {
    return currentDate.value.toLocaleDateString('en-US', { ...options, day: 'numeric' })
  } else if (currentView.value === 'week') {
    const start = getWeekStart(currentDate.value)
    const end = new Date(start)
    end.setDate(end.getDate() + 6)
    if (start.getMonth() === end.getMonth()) {
      return `${start.toLocaleDateString('en-US', { month: 'long' })} ${start.getDate()} - ${end.getDate()}, ${start.getFullYear()}`
    } else {
      return `${start.toLocaleDateString('en-US', { month: 'short' })} ${start.getDate()} - ${end.toLocaleDateString('en-US', { month: 'short' })} ${end.getDate()}, ${end.getFullYear()}`
    }
  }
  return currentDate.value.toLocaleDateString('en-US', options)
})

const monthDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  const days = []
  const startDay = firstDay.getDay()
  
  // Previous month days
  const prevMonthLastDay = new Date(year, month, 0).getDate()
  for (let i = startDay - 1; i >= 0; i--) {
    const date = new Date(year, month - 1, prevMonthLastDay - i)
    days.push({
      date,
      dayNumber: prevMonthLastDay - i,
      isCurrentMonth: false,
      isToday: isSameDay(date, new Date())
    })
  }
  
  // Current month days
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, month, i)
    days.push({
      date,
      dayNumber: i,
      isCurrentMonth: true,
      isToday: isSameDay(date, new Date())
    })
  }
  
  // Next month days
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(year, month + 1, i)
    days.push({
      date,
      dayNumber: i,
      isCurrentMonth: false,
      isToday: isSameDay(date, new Date())
    })
  }
  
  return days
})

const weekDaysData = computed(() => {
  const start = getWeekStart(currentDate.value)
  const days = []
  for (let i = 0; i < 7; i++) {
    const date = new Date(start)
    date.setDate(date.getDate() + i)
    days.push({
      date,
      dayName: weekDays[i],
      dayNumber: date.getDate(),
      isToday: isSameDay(date, new Date())
    })
  }
  return days
})

const agendaEvents = computed(() => {
  const sorted = [...internalEvents.value].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.startTime}`)
    const dateB = new Date(`${b.date}T${b.startTime}`)
    return dateA - dateB
  })
  return sorted
})

const groupedAgendaEvents = computed(() => {
  const groups = {}
  agendaEvents.value.forEach(event => {
    if (!groups[event.date]) {
      groups[event.date] = []
    }
    groups[event.date].push(event)
  })
  return groups
})

// Methods
function getWeekStart(date) {
  const d = new Date(date)
  const day = d.getDay()
  d.setDate(d.getDate() - day)
  d.setHours(0, 0, 0, 0)
  return d
}

function isSameDay(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
}

function navigateToday() {
  currentDate.value = new Date()
  selectedDate.value = new Date()
}

function navigatePrev() {
  const newDate = new Date(currentDate.value)
  if (currentView.value === 'month') {
    newDate.setMonth(newDate.getMonth() - 1)
  } else if (currentView.value === 'week') {
    newDate.setDate(newDate.getDate() - 7)
  } else {
    newDate.setDate(newDate.getDate() - 1)
  }
  currentDate.value = newDate
}

function navigateNext() {
  const newDate = new Date(currentDate.value)
  if (currentView.value === 'month') {
    newDate.setMonth(newDate.getMonth() + 1)
  } else if (currentView.value === 'week') {
    newDate.setDate(newDate.getDate() + 7)
  } else {
    newDate.setDate(newDate.getDate() + 1)
  }
  currentDate.value = newDate
}

function selectDate(date) {
  selectedDate.value = date
  currentDate.value = new Date(date)
}

function getDayEvents(date) {
  const dateStr = formatDateString(date)
  return internalEvents.value.filter(e => e.date === dateStr)
}

function getHourEvents(date, hour) {
  const dateStr = formatDateString(date)
  return internalEvents.value.filter(e => {
    if (e.date !== dateStr) return false
    const eventHour = parseInt(e.startTime.split(':')[0])
    return eventHour === hour
  })
}

function formatDateString(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function formatHour(hour) {
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const h = hour % 12 || 12
  return `${h} ${ampm}`
}

function formatEventTime(event) {
  const [hours, minutes] = event.startTime.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const h = hour % 12 || 12
  return `${h}:${minutes} ${ampm}`
}

function formatAgendaDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  if (isSameDay(date, today)) {
    return 'Today'
  } else if (isSameDay(date, tomorrow)) {
    return 'Tomorrow'
  }
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

function getEventColorClass(color) {
  const colorMap = {
    '#3B82F6': 'bg-blue-500',
    '#10B981': 'bg-green-500',
    '#EF4444': 'bg-red-500',
    '#F59E0B': 'bg-yellow-500',
    '#8B5CF6': 'bg-purple-500',
    '#EC4899': 'bg-pink-500',
    '#06B6D4': 'bg-cyan-500',
    '#6366F1': 'bg-indigo-500'
  }
  return colorMap[color] || 'bg-blue-500'
}

function getEventBgClass(color) {
  const colorMap = {
    '#3B82F6': 'bg-blue-500',
    '#10B981': 'bg-green-500',
    '#EF4444': 'bg-red-500',
    '#F59E0B': 'bg-yellow-500',
    '#8B5CF6': 'bg-purple-500',
    '#EC4899': 'bg-pink-500',
    '#06B6D4': 'bg-cyan-500',
    '#6366F1': 'bg-indigo-500'
  }
  return colorMap[color] || 'bg-blue-500'
}

function getEventHeightClass(event) {
  if (!event.endTime) return 'h-auto'
  const start = parseInt(event.startTime.split(':')[0]) * 60 + parseInt(event.startTime.split(':')[1])
  const end = parseInt(event.endTime.split(':')[0]) * 60 + parseInt(event.endTime.split(':')[1])
  const duration = end - start
  const height = Math.max(duration / 30 * 2, 2) // minimum height
  return `h-${height}`
}

function getEventStyle(event) {
  if (!event.endTime) return {}
  const start = parseInt(event.startTime.split(':')[0]) * 60 + parseInt(event.startTime.split(':')[1])
  const top = ((start - 6 * 60) / 30) * 2 // 2rem per 30 min
  return { top: `${top}rem` }
}

function openNewEventModal(date) {
  editingEvent.value = null
  newEventDate.value = formatDateString(date)
  eventForm.value = {
    title: '',
    startTime: '09:00',
    endTime: '10:00',
    color: '#3B82F6',
    description: ''
  }
  showEventModal.value = true
}

function openNewEventModalAtTime(date, hour) {
  const timeStr = `${String(hour).padStart(2, '0')}:00`
  const endHour = hour + 1
  const endTimeStr = `${String(endHour).padStart(2, '0')}:00`
  openNewEventModal(date)
  eventForm.value.startTime = timeStr
  eventForm.value.endTime = endTimeStr
}

function openEditEventModal(event) {
  editingEvent.value = event
  newEventDate.value = event.date
  eventForm.value = {
    title: event.title,
    startTime: event.startTime,
    endTime: event.endTime || '',
    color: event.color,
    description: event.description || ''
  }
  showEventModal.value = true
}

function closeEventModal() {
  showEventModal.value = false
  editingEvent.value = null
  newEventDate.value = null
}

function saveEvent() {
  if (!eventForm.value.title.trim()) return
  
  const eventData = {
    id: editingEvent.value?.id || Date.now().toString(),
    title: eventForm.value.title,
    date: newEventDate.value,
    startTime: eventForm.value.startTime,
    endTime: eventForm.value.endTime || null,
    color: eventForm.value.color,
    description: eventForm.value.description || null
  }
  
  if (editingEvent.value?.id) {
    const index = internalEvents.value.findIndex(e => e.id === editingEvent.value.id)
    if (index !== -1) {
      internalEvents.value[index] = eventData
    }
    emit('event-updated', eventData)
  } else {
    internalEvents.value.push(eventData)
    emit('event-created', eventData)
  }
  
  closeEventModal()
}

function deleteEvent() {
  if (!editingEvent.value?.id) return
  
  internalEvents.value = internalEvents.value.filter(e => e.id !== editingEvent.value.id)
  emit('event-deleted', editingEvent.value)
  closeEventModal()
}

// Watch for view changes to update selected date
watch(currentView, (newView) => {
  if (newView === 'day') {
    currentDate.value = new Date(selectedDate.value)
  }
})
</script>

<style scoped>
.scheduler-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.week-grid {
  scrollbar-width: thin;
  scrollbar-color: #CBD5E1 transparent;
}

.week-grid::-webkit-scrollbar {
  width: 6px;
}

.week-grid::-webkit-scrollbar-track {
  background: transparent;
}

.week-grid::-webkit-scrollbar-thumb {
  background-color: #CBD5E1;
  border-radius: 3px;
}

.dark .week-grid::-webkit-scrollbar-thumb {
  background-color: #4B5563;
}
</style>
