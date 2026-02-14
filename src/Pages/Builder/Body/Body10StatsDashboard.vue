<template>
  <section class="py-12 bg-gradient-to-br from-gray-900 to-black">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Stats Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 class="text-3xl font-bold text-white mb-2">Performance Dashboard</h2>
          <p class="text-gray-400">Real-time metrics and analytics</p>
        </div>
        <div class="mt-4 md:mt-0">
          <select class="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last quarter</option>
            <option>Year to date</option>
          </select>
        </div>
      </div>
      
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Stat 1 -->
        <div class="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
          <div class="flex items-center justify-between mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 1.205a9 9 0 00-18 0"></path>
              </svg>
            </div>
            <span class="text-green-400 text-sm font-medium flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
              +12.5%
            </span>
          </div>
          <div class="text-2xl font-bold text-white mb-1">2,847</div>
          <div class="text-gray-400 text-sm">Active Users</div>
        </div>
        
        <!-- Stat 2 -->
        <div class="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
          <div class="flex items-center justify-between mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <span class="text-green-400 text-sm font-medium flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
              +8.3%
            </span>
          </div>
          <div class="text-2xl font-bold text-white mb-1">98.7%</div>
          <div class="text-gray-400 text-sm">Uptime Rate</div>
        </div>
        
        <!-- Stat 3 -->
        <div class="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
          <div class="flex items-center justify-between mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-400 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <span class="text-red-400 text-sm font-medium flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
              -2.1%
            </span>
          </div>
          <div class="text-2xl font-bold text-white mb-1">$24,580</div>
          <div class="text-gray-400 text-sm">Monthly Revenue</div>
        </div>
        
        <!-- Stat 4 -->
        <div class="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
          <div class="flex items-center justify-between mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <span class="text-green-400 text-sm font-medium flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
              +24.7%
            </span>
          </div>
          <div class="text-2xl font-bold text-white mb-1">1,248</div>
          <div class="text-gray-400 text-sm">New Projects</div>
        </div>
      </div>
      
      <!-- Charts Section -->
      <div class="grid lg:grid-cols-2 gap-8">
        <!-- Line Chart -->
        <div class="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold text-white">User Growth</h3>
            <div class="text-sm text-gray-400">Last 30 days</div>
          </div>
          <div class="h-64 flex items-end space-x-2">
            <div v-for="(bar, index) in userGrowthData" :key="index" class="flex flex-col items-center flex-1">
              <div 
                :style="{ height: `${bar.value}%` }" 
                class="w-full bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t"
              ></div>
              <div class="text-gray-400 text-xs mt-2">{{ bar.label }}</div>
            </div>
          </div>
        </div>
        
        <!-- Donut Chart -->
        <div class="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold text-white">Traffic Sources</h3>
            <div class="text-sm text-gray-400">This month</div>
          </div>
          <div class="h-64 flex items-center justify-center">
            <div class="relative w-48 h-48">
              <!-- Donut chart visualization -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center">
                  <div class="text-3xl font-bold text-white">42.8k</div>
                  <div class="text-gray-400 text-sm">Total Visits</div>
                </div>
              </div>
              <svg class="w-full h-full" viewBox="0 0 100 100">
                <!-- Direct -->
                <circle cx="50" cy="50" r="40" fill="none" stroke="#3B82F6" stroke-width="20" stroke-dasharray="40 100" stroke-dashoffset="0" />
                <!-- Organic -->
                <circle cx="50" cy="50" r="40" fill="none" stroke="#10B981" stroke-width="20" stroke-dasharray="30 100" stroke-dashoffset="-40" />
                <!-- Social -->
                <circle cx="50" cy="50" r="40" fill="none" stroke="#8B5CF6" stroke-width="20" stroke-dasharray="20 100" stroke-dashoffset="-70" />
                <!-- Referral -->
                <circle cx="50" cy="50" r="40" fill="none" stroke="#F59E0B" stroke-width="20" stroke-dasharray="10 100" stroke-dashoffset="-90" />
              </svg>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-6">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <div class="text-sm">
                <div class="text-white">Direct</div>
                <div class="text-gray-400">40%</div>
              </div>
            </div>
            <div class="flex items-center">
              <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <div class="text-sm">
                <div class="text-white">Organic</div>
                <div class="text-gray-400">30%</div>
              </div>
            </div>
            <div class="flex items-center">
              <div class="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <div class="text-sm">
                <div class="text-white">Social</div>
                <div class="text-gray-400">20%</div>
              </div>
            </div>
            <div class="flex items-center">
              <div class="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <div class="text-sm">
                <div class="text-white">Referral</div>
                <div class="text-gray-400">10%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Recent Activity -->
      <div class="mt-8 bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
        <h3 class="text-xl font-bold text-white mb-6">Recent Activity</h3>
        <div class="space-y-4">
          <div v-for="activity in recentActivities" :key="activity.id" class="flex items-center p-4 bg-gray-900/50 rounded-lg">
            <div :class="`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${activity.iconBg}`">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path :d="activity.icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
              </svg>
            </div>
            <div class="flex-1">
              <div class="text-white font-medium">{{ activity.title }}</div>
              <div class="text-gray-400 text-sm">{{ activity.description }}</div>
            </div>
            <div class="text-gray-400 text-sm">{{ activity.time }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const userGrowthData = [
  { label: 'Mon', value: 60 },
  { label: 'Tue', value: 75 },
  { label: 'Wed', value: 90 },
  { label: 'Thu', value: 65 },
  { label: 'Fri', value: 85 },
  { label: 'Sat', value: 95 },
  { label: 'Sun', value: 70 }
]

const recentActivities = [
  {
    id: 1,
    title: 'New User Registration',
    description: 'John Smith signed up for a Pro account',
    time: '2 min ago',
    icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
    iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-400'
  },
  {
    id: 2,
    title: 'Project Created',
    description: 'E-commerce website project started',
    time: '15 min ago',
    icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
    iconBg: 'bg-gradient-to-br from-green-500 to-emerald-400'
  },
  {
    id: 3,
    title: 'Payment Received',
    description: 'Payment of $499.99 from TechCorp',
    time: '1 hour ago',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    iconBg: 'bg-gradient-to-br from-purple-500 to-pink-500'
  },
  {
    id: 4,
    title: 'Support Ticket',
    description: 'New support ticket #452 opened',
    time: '3 hours ago',
    icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    iconBg: 'bg-gradient-to-br from-yellow-500 to-orange-500'
  }
]
</script>