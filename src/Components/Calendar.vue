<script setup>
import { ref, computed } from 'vue'

// ------------------------------
// State Management
// ------------------------------
const currentDate = ref(new Date()) 
const events = ref({})

// ------------------------------
// Static Data
// ------------------------------
const groups = [
  { name: 'Future', color: '#4A90E2' },
 
]

// ------------------------------
// Date & Time Computations
// ------------------------------
const timeSlots = Array.from({ length: 14 }, (_, i) => {
  const totalMinutes = 660 + i * 30; // 660 = 11*60 (starts at 11:00)
  const hour = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
});

const formattedDate = computed(() => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return currentDate.value.toLocaleDateString(undefined, options);
})

// ------------------------------
// Event/Label Handling
// ------------------------------
function getEventKey(day, time) {
  const year = day.getFullYear()
  const month = String(day.getMonth() + 1).padStart(2, '0')
  const date = String(day.getDate()).padStart(2, '0')
  const [hour, minute] = time.split(':')
  return `${year}-${month}-${date}-${hour}-${minute}`
}

function formatTime12Hour(time) {
  const [hour, minute] = time.split(':');
  const hourInt = parseInt(hour);
  const ampm = hourInt >= 12 ? 'PM' : 'AM';
  let hour12 = hourInt % 12;
  if (hour12 === 0) {
    hour12 = 12;
  }
  return `${hour12}:${minute} ${ampm}`;
}

function populateEvents() {
    const newEvents = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    groups.forEach((group, index) => {
        const eventTime = new Date(today);
        const totalMinutes = 660 + index * 30; // 660 = 11*60 (starts at 11:00)
        eventTime.setHours(Math.floor(totalMinutes / 60), totalMinutes % 60);
        
        const timeString = `${String(eventTime.getHours()).padStart(2, '0')}:${String(eventTime.getMinutes()).padStart(2, '0')}`;
        const key = getEventKey(today, timeString);
        
        newEvents[key] = {
            label: group.name,
            color: group.color,
        };
    });
    events.value = newEvents;
}

// ------------------------------
// Navigation
// ------------------------------
function prevDay() {
  const newDate = new Date(currentDate.value)
  newDate.setDate(newDate.getDate() - 1)
  currentDate.value = newDate
}

function nextDay() {
  const newDate = new Date(currentDate.value)
  newDate.setDate(newDate.getDate() + 1)
  currentDate.value = newDate
}

// ------------------------------
// Lifecycle
// ------------------------------
populateEvents();

</script>

<template>
  <div class="p-6 md:p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-2xl font-sans max-w-4xl mx-auto">
    <!-- Header: Navigation & Date -->
    <div class="flex items-center justify-between mb-8">
      <button @click="prevDay" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 font-semibold shadow-sm">
        &lt; Prev
      </button>
      <h2 class="text-xl md:text-2xl font-bold text-gray-800 dark:text-white text-center">
        {{ formattedDate }}
      </h2>
      <button @click="nextDay" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 font-semibold shadow-sm">
        Next &gt;
      </button>
    </div>

    <!-- Daily Schedule -->
    <div class="relative">
      <!-- Hour lines and time slots -->
      <div v-for="time in timeSlots" :key="time" class="flex h-16">
        <div class="w-20 text-right pr-4 text-sm text-gray-400 dark:text-gray-500 flex-shrink-0 pt-2">
          {{ formatTime12Hour(time) }}
        </div>
        <div class="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
      </div>

      <!-- Events -->
      <div class="absolute inset-0 top-0 left-20">
        <template v-for="(event, key) in events" :key="key">
            <div v-if="key.startsWith(`${currentDate.getFullYear()}-${String(currentDate.getMonth()+1).padStart(2,'0')}-${String(currentDate.getDate()).padStart(2,'0')}`)">
                <div class="absolute w-[calc(100%-1rem)] ml-2" :style="{ top: `${timeSlots.indexOf(key.substring(11).replace('-',':')) * 4}rem`, height: '4rem' }">
                   <div class="rounded-lg h-full p-3 text-white flex items-center" :style="{ backgroundColor: event.color, boxShadow: `0 6px 20px 0 ${event.color}50` }">
                        <strong class="font-semibold text-base">{{ event.label }}</strong>
                    </div>
                </div>
            </div>
        </template>
      </div>
    </div>
  </div>
</template>
