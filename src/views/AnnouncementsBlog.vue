<template>
  <div class="min-h-screen">
    <section class="px-4 sm:px-6 lg:px-8 py-10">
      <div class="grid grid-cols-1 lg:grid-cols-[1.2fr_2fr] gap-8 items-start max-w-7xl mx-auto">
        <div class="space-y-6">
          <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
            <p class="text-xs uppercase tracking-[0.2em] text-slate-400 font-semibold">
              BCC Updates
            </p>
            <h1 class="mt-3 text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
              Announcements & Campus News
            </h1>
            <p class="mt-3 text-slate-600 text-sm sm:text-base">
              Stay aligned with Bacolod City College advisories, events, and important reminders.
              New announcements are posted in real time.
            </p>
            <div class="mt-6 flex flex-wrap gap-3">
              <span class="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">Academic</span>
              <span class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">Events</span>
              <span class="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold">Health & Safety</span>
              <span class="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">Administrative</span>
            </div>
          </div>

          <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
            <h2 class="text-lg font-bold text-slate-900">Quick Notes</h2>
            <ul class="mt-4 space-y-3 text-sm text-slate-600">
              <li class="flex items-start gap-3">
                <span class="mt-1 inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                Check pinned announcements for urgent updates.
              </li>
              <li class="flex items-start gap-3">
                <span class="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
                Staff can post and manage announcements from the list.
              </li>
              <li class="flex items-start gap-3">
                <span class="mt-1 inline-block h-2 w-2 rounded-full bg-amber-500"></span>
                Use the search and filters to find older posts quickly.
              </li>
            </ul>
          </div>
        </div>

        <div class="rounded-3xl border border-slate-200 bg-white shadow-xl p-4 sm:p-6">
          <AnnouncementList />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import AnnouncementList from '@/Components/AnnouncementList.vue'
</script>
