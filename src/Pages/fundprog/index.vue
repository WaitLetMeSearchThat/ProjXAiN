<template>
  <div class="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
    <button @click="isModalOpen = true" class="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 transition">
      View Process Schedule
    </button>

    <teleport to="body">
      <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
        <div class="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
          
          <header class="p-5 border-b border-gray-200 dark:border-gray-700 relative flex-shrink-0">
            <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-white">
              Calendar of Activities
            </h2>
            <button @click="isModalOpen = false" class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-transform duration-300 hover:rotate-90">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </header>

          <main class="flex-grow p-6 sm:p-8 overflow-y-auto">
            <div class="flex items-center justify-center mb-8">
                <h3 class="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    Schedule for <span class="text-emerald-600 dark:text-emerald-400">{{ formattedDate }}</span>
                </h3>
            </div>

            <div class="relative pl-20 pr-4">
              <!-- Time scale -->
              <div v-for="(time, index) in times" :key="time">
                <div class="absolute text-right -left-4 text-sm font-medium text-gray-500 dark:text-gray-400" :style="{ top: (index * hourPixelHeight - 8) + 'px' }">
                  {{ time }}
                </div>
              </div>
              
              <!-- Grid lines -->
              <div class="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-700 border-t border-gray-200 dark:border-gray-700">
                <div v-for="n in (times.length -1) * 2" :key="n" class="h-12"></div>
              </div>

              <!-- Events -->
              <div class="absolute top-0 left-20 right-4 bottom-0">
                  <div v-for="(slot, index) in scheduleSlots" :key="index"
                       :class="['absolute w-full flex items-center justify-between px-4 py-2 rounded-lg shadow-lg text-white', slot.group.color]"
                       :style="{ top: slot.top + 'px', height: slot.height + 'px', 'min-height': '40px' }">
                    <span class="font-bold text-sm">{{ slot.group.name }}</span>
                    <span class="text-xs font-mono">{{ slot.startTime }} - {{ slot.endTime }}</span>
                  </div>
              </div>
            </div>
          </main>

        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const isModalOpen = ref(true); // Open by default as per user flow.

// Per user request, the date is fixed to December 16, 2025
const displayDate = new Date('2025-12-16T00:00:00');

const formattedDate = computed(() => {
    return displayDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
});

const groups = [
  { name: 'Strong Independent', color: 'bg-rose-500' },
  { name: 'Procastination', color: 'bg-amber-500' },
  { name: 'ElLoQueRy', color: 'bg-teal-500' },
  { name: 'Tech Titans', color: 'bg-sky-500' },
  { name: 'DreamWare', color: 'bg-indigo-500' },
  { name: 'Mash Team', color: 'bg-violet-500' },
  { name: '{FanTasticFour}', color: 'bg-fuchsia-500' }
];

const times = ['1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
const hourPixelHeight = 96; // Corresponds to h-24 (24rem = 96px) in the grid line divs

const scheduleSlots = computed(() => {
  const slots = [];
  const startHour = 13; // 1 PM

  groups.forEach((group, index) => {
    const minutesOffset = index * 30;
    
    // Calculate position and size for the event slot
    const top = (minutesOffset / 60) * hourPixelHeight;
    const height = (30 / 60) * hourPixelHeight;
    
    // Create Date objects for formatting start and end times
    const slotStartDate = new Date(displayDate);
    slotStartDate.setHours(startHour, minutesOffset, 0, 0);

    const slotEndDate = new Date(displayDate);
    slotEndDate.setHours(startHour, minutesOffset + 30, 0, 0);

    const startTime = slotStartDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const endTime = slotEndDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    slots.push({
      group,
      top: top,
      height: height,
      startTime,
      endTime
    });
  });
  
  return slots;
});
</script>
