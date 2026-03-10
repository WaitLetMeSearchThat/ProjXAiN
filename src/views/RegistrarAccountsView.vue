<template>
  <div class="view-shell">
    <div class="view-content">
      <div class="view-header mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Student Accounts</h1>
        <p class="mt-2 text-gray-600">Registrar-managed spreadsheets are now the official student records source.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="view-card p-4">
          <div class="text-xs uppercase tracking-wider text-slate-500">Total Students</div>
          <div class="text-2xl font-bold text-slate-900 mt-2">{{ stats.totalStudents }}</div>
        </div>
        <div class="view-card p-4">
          <div class="text-xs uppercase tracking-wider text-slate-500">Registered Accounts</div>
          <div class="text-2xl font-bold text-emerald-700 mt-2">{{ stats.registeredStudents }}</div>
        </div>
        <div class="view-card p-4">
          <div class="text-xs uppercase tracking-wider text-slate-500">Missing Accounts</div>
          <div class="text-2xl font-bold text-amber-700 mt-2">{{ stats.missingStudents }}</div>
        </div>
      </div>

      <div class="view-card p-4 sm:p-6 mb-6">
        <div class="flex flex-col sm:flex-row sm:items-end gap-3">
          <div class="flex-1">
            <label class="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              File Label
            </label>
            <input
              v-model="linkForm.label"
              type="text"
              placeholder="e.g. BSIS 1st Year Masterlist"
              class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div class="flex-[2]">
            <label class="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Spreadsheet URL
            </label>
            <input
              v-model="linkForm.url"
              type="url"
              placeholder="https://docs.google.com/spreadsheets/d/..."
              class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            @click="handleAddValidationLink"
            :disabled="addingLink"
            class="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 text-sm font-semibold disabled:opacity-60"
          >
            {{ addingLink ? 'Adding...' : 'Add File' }}
          </button>
        </div>
        <p class="mt-3 text-xs text-slate-500">
          Expand each file below to preview the student records parsed from that spreadsheet.
        </p>

        <div class="mt-4 space-y-3">
          <div v-if="linksLoading" class="text-sm text-slate-500">Loading validation files...</div>
          <div v-else-if="!validationLinks.length" class="text-sm text-slate-500">No validation files configured yet.</div>

          <div v-for="link in validationLinks" :key="link.id" class="border border-slate-200 rounded-xl overflow-hidden">
            <button
              @click="toggleFile(link)"
              class="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left"
            >
              <div>
                <div class="text-sm font-semibold text-slate-800">{{ link.label || 'Untitled file' }}</div>
                <div class="text-xs text-slate-500 break-all">{{ link.url }}</div>
              </div>
              <div class="text-xs font-semibold text-slate-600">
                {{ expandedFiles[link.id] ? 'Collapse' : 'Expand' }}
              </div>
            </button>

            <div v-if="expandedFiles[link.id]" class="p-4 bg-white border-t border-slate-200">
              <div class="flex items-center justify-between mb-3">
                <div class="text-xs text-slate-500">Uploader: {{ link.uploaderEmail || '-' }}</div>
                <button
                  @click="handleDeleteValidationLink(link.id)"
                  class="rounded-md bg-rose-50 text-rose-700 hover:bg-rose-100 px-3 py-1.5 text-xs font-semibold"
                >
                  Remove
                </button>
              </div>

              <div v-if="fileLoading[link.id]" class="text-sm text-slate-500">Loading file preview...</div>
              <div v-else-if="!(fileStudents[link.id] || []).length" class="text-sm text-slate-500">
                No student rows found in this file.
              </div>
              <div v-else class="overflow-x-auto">
                <table class="min-w-full divide-y divide-slate-200">
                  <thead class="bg-slate-50">
                    <tr>
                      <th class="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Student ID</th>
                      <th class="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Name</th>
                      <th class="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Email</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100">
                    <tr v-for="student in fileStudents[link.id]" :key="`${link.id}_${student.studentId}_${student.email}`">
                      <td class="px-3 py-2 text-sm text-slate-800">{{ student.studentId || '-' }}</td>
                      <td class="px-3 py-2 text-sm text-slate-700">{{ student.fullName || '-' }}</td>
                      <td class="px-3 py-2 text-sm text-slate-700">{{ student.email || '-' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="view-card overflow-hidden">
        <div class="px-4 sm:px-6 py-4 border-b border-slate-200">
          <input
            v-model="search"
            type="text"
            placeholder="Search by student ID, name, or email..."
            class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-200">
            <thead class="bg-slate-50">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Student ID</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Name</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Student Account</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Auth User ID</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Status</th>
                <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Password Setup</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-if="loading">
                <td colspan="6" class="px-4 py-8 text-center text-sm text-slate-500">Loading student accounts...</td>
              </tr>
              <tr v-else-if="!filteredRows.length">
                <td colspan="6" class="px-4 py-8 text-center text-sm text-slate-500">No matching records found.</td>
              </tr>
              <tr v-for="row in filteredRows" :key="row.key" class="hover:bg-slate-50">
                <td class="px-4 py-3 text-sm font-medium text-slate-800">{{ row.studentId || '-' }}</td>
                <td class="px-4 py-3 text-sm text-slate-700">{{ row.name || '-' }}</td>
                <td class="px-4 py-3 text-sm text-slate-700">{{ row.email || '-' }}</td>
                <td class="px-4 py-3 text-xs text-slate-600">{{ row.authUserId || '-' }}</td>
                <td class="px-4 py-3 text-sm">
                  <span
                    :class="row.isRegistered ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'"
                    class="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold"
                  >
                    {{ row.isRegistered ? 'Registered' : 'No Account' }}
                  </span>
                </td>
                <td class="px-4 py-3 text-sm">
                  <span
                    :class="row.isRegistered && row.mustChangePassword ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'"
                    class="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold"
                  >
                    {{ row.isRegistered ? (row.mustChangePassword ? 'Pending' : 'Completed') : '-' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { COLLECTIONS } from '@/assets/constants'
import { useAuth } from '@/composables/useAuth'
import { listStudents, listStudentsFromValidationLink } from '@/firebase/studentService'
import {
  addStudentValidationLink,
  deleteStudentValidationLink,
  listAllStudentValidationLinks
} from '@/firebase/studentValidationLinkService'

const loading = ref(true)
const search = ref('')
const rows = ref([])
const linksLoading = ref(true)
const addingLink = ref(false)
const validationLinks = ref([])
const expandedFiles = ref({})
const fileLoading = ref({})
const fileStudents = ref({})
const linkForm = ref({
  label: '',
  url: ''
})
const { userProfile } = useAuth()

const normalize = (value) => String(value || '').trim()
const normalizeEmail = (value) => normalize(value).toLowerCase()

const buildName = (student) => {
  const fullName = normalize(student.fullName)
  if (fullName) return fullName
  const parts = [student.lastName, student.firstName, student.middleName].map(normalize).filter(Boolean)
  return parts.join(', ')
}

const loadStudentAccounts = async () => {
  loading.value = true
  try {
    const [studentsResult, studentRolesSnap] = await Promise.all([
      listStudents(),
      getDocs(query(collection(db, COLLECTIONS.USER_ROLES), where('roleId', '==', 'role_student')))
    ])

    const students = []
    const studentById = new Map()
    const studentByEmail = new Map()

    ;(studentsResult.students || []).forEach((data) => {
      const studentId = normalize(data.studentId || data.id)
      const email = normalizeEmail(data.email)
      const record = {
        studentId,
        name: buildName(data),
        email
      }
      students.push(record)
      if (studentId) studentById.set(studentId, record)
      if (email) studentByEmail.set(email, record)
    })

    const roleByStudentId = new Map()
    const roleByEmail = new Map()
    const unmatchedRoles = []

    studentRolesSnap.forEach((docSnap) => {
      const data = docSnap.data() || {}
      const studentId = normalize(data.studentId)
      const email = normalizeEmail(data.email)
      const authUserId = normalize(data.userId)
      const mustChangePassword = Boolean(data.mustChangePassword)
      const roleRecord = { studentId, email, authUserId, mustChangePassword }

      if (studentId) roleByStudentId.set(studentId, roleRecord)
      if (email) roleByEmail.set(email, roleRecord)

      const matched = (studentId && studentById.has(studentId)) || (email && studentByEmail.has(email))
      if (!matched) unmatchedRoles.push(roleRecord)
    })

    const mergedRows = students.map((student, idx) => {
      const roleRecord =
        roleByStudentId.get(student.studentId) ||
        roleByEmail.get(student.email) ||
        null

      return {
        key: `student_${student.studentId || student.email || idx}`,
        studentId: student.studentId,
        name: student.name,
        email: student.email,
        authUserId: roleRecord?.authUserId || '',
        mustChangePassword: Boolean(roleRecord?.mustChangePassword),
        isRegistered: Boolean(roleRecord)
      }
    })

    unmatchedRoles.forEach((roleRecord, idx) => {
      mergedRows.push({
        key: `unmatched_${roleRecord.studentId || roleRecord.email || idx}`,
        studentId: roleRecord.studentId,
        name: '(No student record)',
        email: roleRecord.email,
        authUserId: roleRecord.authUserId,
        mustChangePassword: Boolean(roleRecord.mustChangePassword),
        isRegistered: true
      })
    })

    rows.value = mergedRows.sort((a, b) => a.studentId.localeCompare(b.studentId))
  } catch (error) {
    console.error('Error loading registrar student accounts:', error)
    rows.value = []
  } finally {
    loading.value = false
  }
}

const loadValidationLinks = async () => {
  linksLoading.value = true
  try {
    const result = await listAllStudentValidationLinks(500)
    validationLinks.value = result.links || []
  } catch (error) {
    console.error('Error loading student validation links:', error)
    validationLinks.value = []
  } finally {
    linksLoading.value = false
  }
}

const loadFileStudents = async (link) => {
  if (!link?.id || !link?.url) return
  fileLoading.value[link.id] = true
  try {
    const result = await listStudentsFromValidationLink(link.url, 200)
    fileStudents.value[link.id] = result.students || []
  } catch (error) {
    console.error('Error loading validation file students:', error)
    fileStudents.value[link.id] = []
  } finally {
    fileLoading.value[link.id] = false
  }
}

const toggleFile = async (link) => {
  if (!link?.id) return
  const next = !expandedFiles.value[link.id]
  expandedFiles.value[link.id] = next
  if (next && !fileStudents.value[link.id]) {
    await loadFileStudents(link)
  }
}

const handleAddValidationLink = async () => {
  const label = normalize(linkForm.value.label)
  const url = normalize(linkForm.value.url)
  if (!label || !url) {
    alert('Please provide both label and spreadsheet URL.')
    return
  }

  addingLink.value = true
  try {
    const result = await addStudentValidationLink({
      label,
      url,
      uploaderEmail: userProfile.value?.email || 'registrar@local',
      uploaderName: userProfile.value?.displayName || 'Registrar'
    })
    if (!result.success) {
      alert(result.message || 'Failed to add validation link.')
      return
    }
    linkForm.value.label = ''
    linkForm.value.url = ''
    await Promise.all([loadValidationLinks(), loadStudentAccounts()])
  } catch (error) {
    console.error('Error adding student validation link:', error)
    alert('Failed to add validation link.')
  } finally {
    addingLink.value = false
  }
}

const handleDeleteValidationLink = async (id) => {
  if (!id) return
  try {
    await deleteStudentValidationLink(id)
    delete expandedFiles.value[id]
    delete fileLoading.value[id]
    delete fileStudents.value[id]
    await Promise.all([loadValidationLinks(), loadStudentAccounts()])
  } catch (error) {
    console.error('Error deleting student validation link:', error)
    alert('Failed to remove validation link.')
  }
}

const filteredRows = computed(() => {
  const queryText = normalize(search.value).toLowerCase()
  if (!queryText) return rows.value
  return rows.value.filter((row) =>
    [row.studentId, row.name, row.email, row.authUserId]
      .join(' ')
      .toLowerCase()
      .includes(queryText)
  )
})

const stats = computed(() => {
  const totalStudents = rows.value.filter((row) => row.name !== '(No student record)').length
  const registeredStudents = rows.value.filter((row) => row.name !== '(No student record)' && row.isRegistered).length
  const missingStudents = Math.max(totalStudents - registeredStudents, 0)
  return { totalStudents, registeredStudents, missingStudents }
})

onMounted(async () => {
  await Promise.all([loadStudentAccounts(), loadValidationLinks()])
})
</script>
