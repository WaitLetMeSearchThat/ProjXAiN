<script setup>
const props = defineProps({
  cards: { type: Array, default: () => [] },
  memberCounts: { type: Object, default: () => ({}) },
  selectedId: { type: String, default: '' }
})

const emit = defineEmits(['select', 'open-section'])

const formatCount = (classroomId) => {
  const count = props.memberCounts[classroomId]
  if (Number.isFinite(count)) return count
  return 'N/A'
}

const statusLabel = (status) => {
  if (status === 'pending') return 'Pending'
  if (status === 'approved') return 'Approved'
  if (status === 'active') return 'Live'
  return 'Unknown'
}

const statusClass = (status) => {
  if (status === 'pending') return 'bg-amber-500/15 text-amber-200'
  if (status === 'approved') return 'bg-emerald-500/15 text-emerald-200'
  if (status === 'active') return 'bg-sky-500/15 text-sky-200'
  return 'bg-slate-700/60 text-slate-200'
}
</script>

<template>
  <div class="p-4 space-y-4">
    <div v-if="!cards.length" class="text-sm text-slate-400">
      No enrolled classrooms yet.
    </div>
    <div
      v-for="card in cards"
      :key="card.id"
      :class="[
        'rounded-2xl border bg-slate-900/60 p-4 shadow-lg transition',
        card.id === selectedId ? 'border-emerald-400 ring-2 ring-emerald-400/30' : 'border-slate-700/60'
      ]"
    >
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div class="flex items-start gap-3">
          <div class="h-14 w-20 rounded-xl bg-gradient-to-br from-blue-500 via-emerald-400 to-teal-300 text-white shadow-inner">
            <div class="flex h-full w-full items-center justify-center text-[10px] font-semibold uppercase tracking-wide">
              Enrolled
            </div>
          </div>
          <div>
          <div class="text-lg font-bold text-slate-100">
            {{ card.subjectCode }} <span class="text-slate-500">-</span> Section {{ card.section }}
          </div>
          <div class="text-sm text-slate-400">{{ card.subjectTitle }}</div>
          </div>
        </div>
        <span class="rounded-full px-2.5 py-1 text-xs font-semibold" :class="statusClass(card.status)">
          {{ statusLabel(card.status) }}
        </span>
      </div>

      <div class="mt-3 grid gap-2 text-xs text-slate-300 sm:grid-cols-2">
        <div><span class="font-semibold text-slate-200">Schedule:</span> {{ card.scheduleDay }} | {{ card.scheduleTime }}</div>
        <div><span class="font-semibold text-slate-200">Room:</span> {{ card.room || 'TBA' }}</div>
        <div><span class="font-semibold text-slate-200">Teacher:</span> {{ card.instructorName || card.instructorEmail || 'TBA' }}</div>
        <div><span class="font-semibold text-slate-200">Students Enrolled:</span> {{ formatCount(card.id) }}</div>
      </div>

      <div class="mt-4 flex flex-wrap gap-2">
        <button
          class="rounded-lg border border-slate-600 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800"
          @click="emit('select', card.id)"
        >
          Preview
        </button>
        <button
          class="rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-600"
          @click="emit('select', card.id)"
        >
          Open Group
        </button>
        <button
          class="rounded-lg bg-sky-500 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-600"
          @click="emit('open-section', card.id)"
        >
          Section View
        </button>
      </div>
    </div>
  </div>
</template>
