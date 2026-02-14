<template>
  <section class="mt-6">
    <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 class="text-2xl font-black text-slate-900">Program Prospectus Overview</h2>
          <p class="text-sm text-slate-500">Track your subjects, grades, and overall standing at a glance.</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <span class="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            Program: {{ program || 'N/A' }}
          </span>
          <span class="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            Student ID: {{ studentId || 'N/A' }}
          </span>
          <span class="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            Year Level: {{ yearLevel || 'N/A' }}
          </span>
        </div>
      </div>

      <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div class="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <div class="text-xs uppercase tracking-wider text-slate-500">Total Subjects</div>
          <div class="mt-2 text-2xl font-bold text-slate-900">{{ summary.totalSubjects }}</div>
        </div>
        <div class="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <div class="text-xs uppercase tracking-wider text-slate-500">Completed</div>
          <div class="mt-2 text-2xl font-bold text-slate-900">{{ summary.completedSubjects }}</div>
        </div>
        <div class="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <div class="text-xs uppercase tracking-wider text-slate-500">Units Completed</div>
          <div class="mt-2 text-2xl font-bold text-slate-900">{{ summary.completedUnits }}</div>
        </div>
        <div class="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <div class="text-xs uppercase tracking-wider text-slate-500">Passed</div>
          <div class="mt-2 text-2xl font-bold text-emerald-600">{{ summary.passedSubjects }}</div>
        </div>
        <div class="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <div class="text-xs uppercase tracking-wider text-slate-500">Needs Attention</div>
          <div class="mt-2 text-2xl font-bold text-rose-600">{{ summary.failedSubjects }}</div>
        </div>
      </div>

      <div class="mt-6 rounded-2xl border border-slate-100 bg-white p-4">
        <div class="flex items-center justify-between text-sm">
          <span class="font-semibold text-slate-700">Overall Status</span>
          <span
            class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
            :class="overallBadgeClass"
          >
            {{ overallStatusLabel }}
          </span>
        </div>
        <div class="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            class="h-full rounded-full bg-slate-900 transition-all"
            :style="{ width: completionPercent + '%' }"
          ></div>
        </div>
        <div class="mt-2 text-xs text-slate-500">
          {{ completionPercent.toFixed(0) }}% of subjects completed
        </div>
      </div>

      <div class="mt-6 space-y-4">
        <div v-if="loading" class="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
          Loading program prospectus...
        </div>
        <div v-else-if="error" class="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
          {{ error }}
        </div>
        <div v-else-if="!groupedYears.length" class="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
          No prospectus data available for this program.
        </div>
        <ProspectusYearTable
          v-else
          v-for="year in groupedYears"
          :key="year.year"
          :year="year.year"
          :rows="year.rows"
          :total-units="year.totalUnits"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import ProspectusYearTable from '@/Components/ProspectusYearTable.vue'
import { useAuth } from '@/composables/useAuth'
import { getSubjectsByProgram } from '@/firebase/subjectService'
import { getGradesByStudentId } from '@/firebase/gradeService'
import { GRADE_REMARKS, GRADE_PASSING_SCORE, YEAR_LEVELS } from '@/assets/constants'

const { userProfile, user } = useAuth()

const loading = ref(false)
const error = ref('')
const subjects = ref([])
const grades = ref([])

const studentId = computed(() => userProfile.value?.studentId || localStorage.getItem('studentId') || '')
const program = computed(() => userProfile.value?.program || '')
const yearLevel = computed(() => userProfile.value?.yearLevel || '')

const normalizeCode = (value) => String(value || '').trim().toUpperCase()

const gradeMap = computed(() => {
  const map = new Map()
  grades.value.forEach((grade) => {
    const code = normalizeCode(grade.subjectCode)
    if (!code) return
    map.set(code, grade)
  })
  return map
})

const rowsByYear = computed(() => {
  const byYear = new Map()
  subjects.value.forEach((subject) => {
    const year = subject.yearLevel || 'Unassigned'
    if (!byYear.has(year)) byYear.set(year, [])
    const grade = gradeMap.value.get(normalizeCode(subject.code))
    const finalGrade = grade?.finalGrade ?? grade?.finalTermGrade ?? ''
    const numericFinal = typeof finalGrade === 'number' ? finalGrade : Number(finalGrade)
    const hasFinal = Number.isFinite(numericFinal)
    const remarks = grade?.remarks
      || (hasFinal ? (numericFinal >= GRADE_PASSING_SCORE ? GRADE_REMARKS.PASSED : GRADE_REMARKS.FAILED) : 'No Grade')
    const status = remarks === GRADE_REMARKS.PASSED
      ? 'Passed'
      : remarks === GRADE_REMARKS.FAILED
        ? 'Failed'
        : remarks === GRADE_REMARKS.INCOMPLETE
          ? 'Incomplete'
          : remarks === GRADE_REMARKS.DROPPED
            ? 'Dropped'
            : 'Pending'

    byYear.get(year).push({
      code: subject.code,
      title: subject.title,
      units: subject.units,
      type: subject.subjectType || 'Major',
      grade: hasFinal ? numericFinal.toFixed(2) : '-',
      remarks,
      status
    })
  })

  const yearOrder = {
    [YEAR_LEVELS.FIRST_YEAR]: 1,
    [YEAR_LEVELS.SECOND_YEAR]: 2,
    [YEAR_LEVELS.THIRD_YEAR]: 3,
    [YEAR_LEVELS.FOURTH_YEAR]: 4
  }

  return Array.from(byYear.entries())
    .map(([year, rows]) => ({
      year,
      rows,
      totalUnits: rows.reduce((sum, row) => sum + Number(row.units || 0), 0)
    }))
    .sort((a, b) => (yearOrder[a.year] || 99) - (yearOrder[b.year] || 99))
})

const groupedYears = computed(() => rowsByYear.value)

const summary = computed(() => {
  const total = subjects.value.length
  let completed = 0
  let passed = 0
  let failed = 0
  let completedUnits = 0

  subjects.value.forEach((subject) => {
    const grade = gradeMap.value.get(normalizeCode(subject.code))
    if (!grade) return
    const finalGrade = grade?.finalGrade ?? grade?.finalTermGrade ?? ''
    const numericFinal = typeof finalGrade === 'number' ? finalGrade : Number(finalGrade)
    const hasFinal = Number.isFinite(numericFinal)
    if (!hasFinal && !grade?.remarks) return
    completed += 1
    completedUnits += Number(subject.units || 0)
    const remarks = grade?.remarks
      || (hasFinal ? (numericFinal >= GRADE_PASSING_SCORE ? GRADE_REMARKS.PASSED : GRADE_REMARKS.FAILED) : '')
    if (remarks === GRADE_REMARKS.PASSED) passed += 1
    if (remarks === GRADE_REMARKS.FAILED) failed += 1
  })

  return {
    totalSubjects: total,
    completedSubjects: completed,
    completedUnits,
    passedSubjects: passed,
    failedSubjects: failed
  }
})

const completionPercent = computed(() => {
  if (!summary.value.totalSubjects) return 0
  return (summary.value.completedSubjects / summary.value.totalSubjects) * 100
})

const overallStatusLabel = computed(() => {
  if (!summary.value.totalSubjects) return 'No Data'
  if (summary.value.failedSubjects > 0) return 'Needs Attention'
  if (summary.value.completedSubjects === summary.value.totalSubjects) return 'Completed'
  return 'In Progress'
})

const overallBadgeClass = computed(() => {
  if (overallStatusLabel.value === 'Needs Attention') return 'bg-rose-100 text-rose-700'
  if (overallStatusLabel.value === 'Completed') return 'bg-emerald-100 text-emerald-700'
  if (overallStatusLabel.value === 'In Progress') return 'bg-amber-100 text-amber-700'
  return 'bg-slate-100 text-slate-700'
})

const loadData = async () => {
  if (!program.value) {
    subjects.value = []
    return
  }

  loading.value = true
  error.value = ''

  try {
    const [subjectResult, gradeResult] = await Promise.all([
      getSubjectsByProgram(program.value),
      studentId.value ? getGradesByStudentId(studentId.value) : Promise.resolve({ success: true, grades: [] })
    ])

    if (subjectResult.success) {
      subjects.value = subjectResult.subjects
    } else {
      error.value = subjectResult.message || 'Failed to load subjects.'
    }

    if (gradeResult.success) {
      grades.value = gradeResult.grades
    } else {
      error.value = gradeResult.message || 'Failed to load grades.'
    }
  } catch (err) {
    error.value = 'Unable to load program prospectus data.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(loadData)

watch([program, studentId], loadData)
</script>
