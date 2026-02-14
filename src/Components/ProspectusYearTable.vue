<template>
  <div class="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
    <div class="flex items-center justify-between gap-2 mb-4">
      <h4 class="text-base font-bold text-slate-800">{{ year }}</h4>
      <span class="text-xs text-slate-500">{{ totalUnits }} units</span>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead class="text-xs uppercase tracking-wider text-slate-500">
          <tr class="border-b border-slate-200">
            <th class="py-2 pr-4 text-left">Code</th>
            <th class="py-2 pr-4 text-left">Subject</th>
            <th class="py-2 pr-4 text-left">Units</th>
            <th class="py-2 pr-4 text-left">Type</th>
            <th class="py-2 pr-4 text-left">Grade</th>
            <th class="py-2 pr-4 text-left">Status</th>
            <th class="py-2 text-left">Remarks</th>
          </tr>
        </thead>
        <tbody class="text-slate-700">
          <tr v-for="row in rows" :key="row.code" class="border-b border-slate-100">
            <td class="py-2 pr-4 font-semibold">{{ row.code }}</td>
            <td class="py-2 pr-4">{{ row.title }}</td>
            <td class="py-2 pr-4">{{ row.units || '-' }}</td>
            <td class="py-2 pr-4">{{ row.type }}</td>
            <td class="py-2 pr-4">{{ row.grade }}</td>
            <td class="py-2 pr-4">
              <span
                class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold"
                :class="row.status === 'Passed'
                  ? 'bg-emerald-100 text-emerald-700'
                  : row.status === 'Failed'
                    ? 'bg-rose-100 text-rose-700'
                    : row.status === 'Incomplete'
                      ? 'bg-amber-100 text-amber-700'
                      : row.status === 'Dropped'
                        ? 'bg-slate-200 text-slate-700'
                        : 'bg-slate-100 text-slate-600'"
              >
                {{ row.status }}
              </span>
            </td>
            <td class="py-2">{{ row.remarks }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  year: { type: String, required: true },
  rows: { type: Array, default: () => [] },
  totalUnits: { type: Number, default: 0 }
})
</script>
