<template>
  <div class="max-w-6xl mx-auto">
    <div class="relative rounded-2xl shadow-2xl border border-slate-200/70 bg-white/90 overflow-hidden">
      <div class="absolute inset-0 pointer-events-none opacity-50">
        <div class="absolute -top-28 -right-20 h-64 w-64 rounded-full bg-blue-200/60 blur-3xl"></div>
        <div class="absolute top-24 -left-24 h-72 w-72 rounded-full bg-amber-200/50 blur-3xl"></div>
      </div>
      <div class="relative px-6 sm:px-10 py-6 bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-200 text-white">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl  sm:text-3xl font-black tracking-tight">Project Y-xx01 Assistant</h2>
            <p class="text-sm sm:text-base text-white/90">
The Only Limitation is our Imagination.
            </p>
          </div>
          <div class="hidden sm:flex items-center gap-2 text-xs font-semibold bg-white/20 px-3 py-2 rounded-full">
            <span class="inline-block w-2 h-2 rounded-full bg-emerald-300"></span>
          Charlie Test
          </div>
        </div>
      </div>

      <div class="relative bg-slate-300 border-2 glass-effect h-full p-6 sm:p-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-7">
          <!-- Column 1: Chatbox -->
          <div class="space-y-6 lg:col-span-2">
            <div v-if="isStudent" class="rounded-2xl border border-slate-200/70 bg-white p-4 sm:p-5 shadow-sm">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div class="text-xs font-semibold uppercase tracking-widest text-slate-800">Student Services</div>
                  <div class="text-sm font-bold text-slate-800"></div>
                </div>
                <div class="flex flex-wrap gap-2">
                  <button
                    class="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    @click="handleServiceRequest('Certificate of Grades')"
                  >
                    Certificate of Grades
                  </button>
                  <button
                    class="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    @click="handleServiceRequest('Transcript of Records (TOR)')"
                  >
                    Transcript of Records
                  </button>
                  <button
                    class="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    @click="handleServiceRequest('Diploma Request')"
                  >
                    Diploma Request
                  </button>
                  <button
                    class="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    @click="handleServiceRequest('Certification / Good Moral')"
                  >
                    Certification / Good Moral
                  </button>
                </div>
              </div>
            </div>
            <div class="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6 min-h-[320px] shadow-sm">
              <div class="absolute inset-0 opacity-40">
                <div class="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-blue-200 blur-2xl"></div>
                <div class="absolute bottom-6 left-6 h-32 w-32 rounded-full bg-amber-200 blur-2xl"></div>
                <div class="absolute top-20 left-1/3 h-24 w-24 rounded-full bg-emerald-200 blur-2xl"></div>
              </div>
              <div class="relative h-full w-full z-10">
                <div class="h-56 relative pb-24">
                <div
                  v-for="(message, index) in messages"
                  :key="index"
                  class="chat-bubble absolute"
                  :class="[
                    message.role === 'assistant' ? 'chat-bubble--ai' : 'chat-bubble--user',
                    message.kind === 'warning' ? 'chat-bubble--warning' : '',
                    message.kind === 'error' ? 'chat-bubble--error' : '',
                    message.kind === 'success' ? 'chat-bubble--success' : '',
                    index >= holdMessageStartIndex ? 'chat-bubble--hold' : ''
                  ]"
                  :style="bubbleStyles?.[index % (bubbleStyles?.length || 1)]"
                >
                  <div v-if="message.role === 'user'" class="chat-bubble__row chat-bubble__row--user">
                    <div class="chat-avatar">{{ userInitials }}</div>
                    <span class="chat-text">{{ message.text }}</span>
                  </div>
                  <div v-else class="chat-bubble__row">
                    <span class="chat-text">{{ message.text }}</span>
                  </div>
                </div>
                <div v-if="isTyping" class="absolute bottom-2 left-4 pb-12 z-20">
                  <div class="typing-indicator">
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                  </div>
                </div>  </div>
                <div class="pointer-events-none absolute grid top-6 inset-x-0 bottom-0 flex justify-center">
                  <DotLottieVue
                    ref="lottieRef"
                    class="h-72 w-72 pt-24 opacity-60"
                    :autoplay="true"
                    :loop="true"
                    src="/images/x-AI-n.json"
                  />
               
    <button
      class="text-[10px] hidden font-semibold px-2 py-1 rounded-full bg-white/80 border border-slate-200 text-slate-600 hover:bg-white transition"
      @click="toggleLottiePlayback"
    >
      {{ isLottiePlaying ? 'Pause' : 'Play' }}
    </button>
                </div>
              </div>
            </div>

            <div class="grid gap-4">
              <!-- Student Inquiry Section -->
              <div v-if="isStudent" class="rounded-2xl border border-slate-200/70 bg-white p-4 sm:p-6 shadow-sm">
                <div class="flex flex-col w-full h-full">
                  <label class="text-xs font-black text-slate-500 uppercase tracking-widest">Chat</label>
                  <div class="pt-1">
                    <div class="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Quick Options</div>
                  </div>
                  <div class="mt-2 space-y-2">
                    <div class="flex flex-wrap gap-2">
                      <button
                        v-for="tab in primaryTabs"
                        :key="tab.id"
                        class="rounded-xl px-3 py-2 text-xs font-semibold transition border"
                        :class="[
                          activePrimaryTab === tab.id
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        ]"
                        @click="handleOptionSelect(tab)"
                      >
                        {{ tab.label }}
                      </button>
                    </div>
                    <div v-if="secondaryTabs.length" class="flex flex-wrap gap-2">
                      <button
                        v-for="option in secondaryTabs"
                        :key="option.id"
                        class="rounded-xl px-3 py-2 text-xs font-semibold transition border"
                        :class="[
                          activeSecondaryTab === option.id
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        ]"
                        @click="handleOptionSelect(option)"
                      >
                        {{ option.label }}
                      </button>
                    </div>
                  </div>

                  <div class="flex flex-col sm:flex-row gap-3 mt-3">
                    <input
                      v-model="chatInput"
                      type="text"
                      :placeholder="chatPlaceholder"
                      class="flex-1 px-4 py-3 rounded-2xl border-2 outline-none text-slate-800 font-semibold transition"
                      :class="[
                        isInputRequired
                          ? 'border-emerald-400 focus:border-emerald-500 ring-1 ring-emerald-200 bg-emerald-50/40'
                          : 'border-slate-200 focus:border-blue-500 bg-white'
                      ]"
                      @keydown.enter.prevent="handleChatSubmit"
                    />
                    <button
                      class="px-5 py-3 rounded-2xl bg-blue-600 text-white font-bold text-sm sm:text-base hover:bg-blue-700 transition shadow-sm"
                      @click="handleChatSubmit"
                      :disabled="isProcessing || !chatInput?.trim?.()"
                    >
                      {{ isProcessing ? 'Checking...' : 'Send' }}
                    </button>
                  </div>
                  <p class="text-xs text-slate-400">
                    Session ID (optional): <span class="font-semibold">{{ sessionStudentId || 'Not available' }}</span>
                  </p>
                </div>
              </div>

              <div v-if="!canUploadGrades && !isStudent" class="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-700">
                Access restricted. Please sign in with a registrar, instructor, or student account.
              </div>
              <div v-if="errorMessage" class="rounded-2xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
                {{ errorMessage }}
              </div>
              <div v-if="successMessage" class="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-700">
                {{ successMessage }}
              </div>
            </div>
          </div>

          <!-- Column 3: Results / Registrar tools -->
          <div class="space-y-4 lg:col-span-1">
            <div class="rounded-2xl border border-slate-200/70 bg-white p-4 sm:p-6 shadow-sm">
              <div class="text-xs font-semibold uppercase tracking-widest text-slate-500">Guide</div>
              <h3 class="text-base sm:text-lg font-bold text-slate-800 mt-1">How to Navigate</h3>
              <p class="text-xs sm:text-sm text-slate-500 mt-2">
                Follow this quick flow to understand what you can do in this panel.
              </p>

              <div v-if="isStudent" class="mt-4 grid gap-3 text-sm">
                <div class="flex items-start gap-3">
                  <span class="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold">1</span>
                  <span class="text-slate-700">Pick a quick option like Grade Inquiry or Request Documents.</span>
                </div>
                <div class="flex items-start gap-3">
                  <span class="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-white text-xs font-bold">2</span>
                  <span class="text-slate-700">Confirm your student ID when prompted (green input means required).</span>
                </div>
                <div class="flex items-start gap-3">
                  <span class="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-bold">3</span>
                  <span class="text-slate-700">See results here: grades, documents, or service confirmation.</span>
                </div>
              </div>

              <div v-else-if="canUploadGrades" class="mt-4 grid gap-3 text-sm">
                <div class="flex items-start gap-3">
                  <span class="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold">1</span>
                  <span class="text-slate-700">Upload grade files using the upload card below.</span>
                </div>
                <div class="flex items-start gap-3">
                  <span class="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-white text-xs font-bold">2</span>
                  <span class="text-slate-700">Review parsed rows and confirm before sending to the database.</span>
                </div>
                <div class="flex items-start gap-3">
                  <span class="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-bold">3</span>
                  <span class="text-slate-700">Check upload history and use registrar actions for next steps.</span>
                </div>
              </div>

              <div v-else class="mt-4 text-sm text-slate-600">
                Sign in as a student, registrar, or instructor to unlock personalized guidance.
              </div>

              <div class="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div class="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Flow Diagram</div>
                <div class="mt-2 flex items-center justify-between text-[11px] font-semibold text-slate-600">
                  <span class="rounded-full border border-slate-200 bg-white px-2 py-1">Start</span>
                  <span class="text-slate-400">→</span>
                  <span class="rounded-full border border-slate-200 bg-white px-2 py-1">Choose</span>
                  <span class="text-slate-400">→</span>
                  <span class="rounded-full border border-slate-200 bg-white px-2 py-1">Confirm</span>
                  <span class="text-slate-400">→</span>
                  <span class="rounded-full border border-slate-200 bg-white px-2 py-1">Result</span>
                </div>
              </div>
            </div>

            <div v-if="isStudent" class="rounded-2xl border border-slate-200/70 bg-white p-4 sm:p-6 shadow-sm">
              <h3 class="text-base sm:text-lg font-bold text-slate-800">My Tickets</h3>
              <p class="text-xs text-slate-500 mt-1">Every request creates a ticket with a transaction ID.</p>
              <div v-if="studentTickets.length" class="mt-4 space-y-3 text-sm">
                <button
                  v-for="ticket in studentTickets"
                  :key="ticket.id"
                  class="w-full text-left rounded-xl border border-slate-100 bg-slate-50 px-3 py-3 hover:bg-slate-100/70 transition"
                  @click="openTicketDetails(ticket)"
                >
                  <div class="flex items-center justify-between">
                    <span class="font-semibold text-slate-700">{{ ticket.service }}</span>
                    <span class="text-[11px] px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold">
                      {{ ticket.status }}
                    </span>
                  </div>
                  <div class="text-xs text-slate-500 mt-1">Ticket ID: {{ ticket.id }}</div>
                </button>
              </div>
              <div v-else class="mt-4 text-sm text-slate-500">No tickets yet.</div>
            </div>

            <div v-if="canUploadGrades" class="rounded-2xl border border-slate-200/70 bg-white p-4 sm:p-6 shadow-sm">
              <h3 class="text-base sm:text-lg font-bold text-slate-800">Incoming Tickets</h3>
              <p class="text-xs text-slate-500 mt-1">Student requests appear here with transaction IDs.</p>
              <div v-if="tickets.length" class="mt-4 space-y-3 text-sm">
                <button
                  v-for="ticket in tickets"
                  :key="ticket.id"
                  class="w-full text-left rounded-xl border border-slate-100 bg-slate-50 px-3 py-3 hover:bg-slate-100/70 transition"
                  @click="openTicketDetails(ticket)"
                >
                  <div class="flex items-center justify-between">
                    <span class="font-semibold text-slate-700">{{ ticket.service }}</span>
                    <span class="text-[11px] px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
                      {{ ticket.status }}
                    </span>
                  </div>
                  <div class="text-xs text-slate-500 mt-1">Student ID: {{ ticket.studentId }}</div>
                  <div class="text-xs text-slate-500">Ticket ID: {{ ticket.id }}</div>
                </button>
              </div>
              <div v-else class="mt-4 text-sm text-slate-500">No tickets received.</div>
            </div>

            <div v-if="canUploadGrades" class="rounded-2xl border border-dashed border-slate-300 bg-white p-4 sm:p-6 shadow-sm">
              <div class="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                <div>
                  <h3 class="text-sm sm:text-base font-bold text-slate-800">Upload Grade File(s)</h3>
                  <p class="text-xs sm:text-sm text-slate-500">
                    Supported: `.xlsx`. Upload files to update the grade database.
                  </p>
                </div>
                <label class="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold bg-slate-900 text-white rounded-xl cursor-pointer hover:bg-slate-800 transition">
                  Choose File(s)
                  <input type="file" class="hidden" multiple accept=".xlsx" @change="handleFileUpload" />
                </label>
              </div>
              <div v-if="uploadedFiles.length" class="mt-4 flex flex-wrap gap-2">
                <span
                  v-for="file in uploadedFiles"
                  :key="file.name"
                  class="text-xs sm:text-sm bg-slate-100 text-slate-700 px-3 py-1 rounded-full"
                >
                  {{ file.name }}
                </span>
              </div>
              <div v-if="parsedRecords.length" class="mt-4 space-y-3">
                <div class="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
                  <div class="font-semibold text-slate-700">AI Analysis Summary</div>
                  <div class="mt-1">Rows: {{ analysisSummary.total }}</div>
                  <div>Missing Student ID: {{ analysisSummary.missingStudentId }}</div>
                  <div>Missing Subject Code: {{ analysisSummary.missingSubjectCode }}</div>
                  <div>Invalid Final Grade: {{ analysisSummary.invalidFinalGrade }}</div>
                  <div>Duplicate Entries: {{ analysisSummary.duplicateRows }}</div>
                </div>
                <label class="flex items-center gap-2 text-xs text-slate-600">
                  <input type="checkbox" v-model="analysisConfirmed" />
                  I confirm the analysis and want to save these grades.
                </label>
                <button
                  class="px-5 py-3 rounded-2xl bg-green-600 text-white font-bold text-sm sm:text-base hover:bg-green-700 transition"
                  @click="handleUploadToDatabase"
                  :disabled="isProcessing || !analysisConfirmed"
                >
                  {{ isProcessing ? 'Uploading...' : 'Upload to Database' }}
                </button>
              </div>
            </div>
            <div v-if="canUploadGrades" class="rounded-2xl border border-slate-200/70 bg-white p-4 sm:p-6 shadow-sm">
              <h3 class="text-base sm:text-lg font-bold text-slate-800">Uploaded Files</h3>
              <p class="text-xs text-slate-500 mt-1">Recent selections for grade uploads.</p>
              <div v-if="parsedRecords.length" class="mt-3 text-xs text-slate-500">
                Parsed rows ready: <span class="font-semibold text-slate-700">{{ parsedRecords.length }}</span>
              </div>
              <div v-if="uploadedFiles.length" class="mt-4 space-y-2 text-sm">
                <div
                  v-for="file in uploadedFiles"
                  :key="file.name"
                  class="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2"
                >
                  <span class="truncate">{{ file.name }}</span>
                  <span class="text-xs text-slate-400">{{ Math.round(file.size / 1024) }} KB</span>
                </div>
              </div>
              <div v-else class="mt-4 text-sm text-slate-500">No files selected.</div>
            </div>

            <div v-if="canUploadGrades" class="rounded-2xl border border-slate-200/70 bg-white p-4 sm:p-6 shadow-sm">
              <h3 class="text-base sm:text-lg font-bold text-slate-800">Upload History</h3>
              <p class="text-xs text-slate-500 mt-1">Latest grade uploads.</p>
              <div v-if="uploadHistory.length" class="mt-4 space-y-3 text-sm">
                <div
                  v-for="item in uploadHistory"
                  :key="item.id"
                  class="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2"
                >
                  <div class="font-semibold text-slate-700">{{ item.totalRecords }} records</div>
                  <div class="text-xs text-slate-500">
                    {{ (item.fileNames || []).join(', ') || 'No file names recorded' }}
                  </div>
                </div>
              </div>
              <div v-else class="mt-4 text-sm text-slate-500">No uploads yet.</div>
            </div>

            <div v-if="canUploadGrades" class="rounded-2xl border border-slate-200/70 bg-white p-4 sm:p-6 shadow-sm">
              <h3 class="text-base sm:text-lg font-bold text-slate-800">Registrar Actions</h3>
              <div class="mt-4 grid gap-3">
                <RouterLink to="/registrar/records" class="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  Student Records
                </RouterLink>
                <RouterLink to="/registrar/enrollment" class="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  Enrollment Management
                </RouterLink>
                <RouterLink to="/registrar/announcements" class="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  Announcements
                </RouterLink>
              </div>
            </div>

            <div v-if="prospectusRows.length" class="rounded-2xl border border-slate-200/70 bg-white p-4 sm:p-6 shadow-sm">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <h3 class="text-base sm:text-lg font-bold text-slate-800">Program Prospectus</h3>
                <span class="text-xs text-slate-500">Subjects without grades show as N/A</span>
              </div>
              <div class="grid gap-4">
                <ProspectusYearTable
                  v-for="group in prospectusByYear"
                  :key="group.year"
                  :year="group.year"
                  :rows="group.rows"
                  :totalUnits="group.totalUnits"
                />
              </div>
            </div>

            <div v-else-if="hasSearched" class="rounded-2xl border border-slate-200/70 bg-white p-4 sm:p-6 text-sm text-slate-500 shadow-sm">
              No subjects found for the student program, or no matching grades available.
            </div>
        </div>  </div>
        </div></div>
      </div>

      <div v-if="selectedTicket" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
        <div class="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-200">
          <div class="px-5 py-4 border-b border-slate-100 flex items-start justify-between gap-3">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-slate-800">Ticket Details</h3>
              <p class="text-xs text-slate-500 mt-1">Transaction ID: {{ selectedTicket.id }}</p>
            </div>
            <button class="text-slate-400 hover:text-slate-600" @click="closeTicketDetails">X</button>
          </div>
          <div class="px-5 py-4 text-sm text-slate-700 space-y-2">
            <div><span class="font-semibold">Service:</span> {{ selectedTicket.service }}</div>
            <div><span class="font-semibold">Student ID:</span> {{ selectedTicket.studentId }}</div>
            <div><span class="font-semibold">Status:</span> {{ selectedTicket.status }}</div>
            <div><span class="font-semibold">Requested At:</span> {{ selectedTicket.createdAt }}</div>
            <div v-if="selectedTicket.details?.purpose"><span class="font-semibold">Purpose:</span> {{ selectedTicket.details.purpose }}</div>
            <div v-if="selectedTicket.details?.contact"><span class="font-semibold">Contact:</span> {{ selectedTicket.details.contact }}</div>
            <div v-if="selectedTicket.details?.notes"><span class="font-semibold">Notes:</span> {{ selectedTicket.details.notes }}</div>
            <div class="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
              Current process: {{ selectedTicket.processNote }}
            </div>
          </div>
          <div class="px-5 py-4 border-t border-slate-100 flex justify-end">
            <button
              class="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
              @click="closeTicketDetails"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    
  </template>

<script setup>
import { ref, computed, watchEffect, onMounted } from 'vue'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import { useAuth } from '@/composables/useAuth'
import { uploadGrades, getGradesByStudentId, parseGradeFile, getGradeUploads } from '@/firebase/gradeService'
import { getStudentById } from '@/firebase/studentService'
import { getSubjectsByProgram } from '@/firebase/subjectService'
import ProspectusYearTable from '@/Components/ProspectusYearTable.vue'

const { role, userProfile } = useAuth()

const resolvedRole = computed(() => role.value || userProfile.value?.role || '')
const isRegistrar = computed(() => resolvedRole.value === 'role_registrar')
const isInstructor = computed(() => resolvedRole.value === 'role_instructor')
const isStudent = computed(() => resolvedRole.value === 'role_student')
const canUploadGrades = computed(() => isRegistrar.value || isInstructor.value)

const messages = ref([])
const sessionName = computed(() => {
  return (
    userProfile.value?.fullName ||
    userProfile.value?.displayName ||
    userProfile.value?.name ||
    'there'
  )
})
const userInitials = computed(() => {
  const source =
    userProfile.value?.displayName ||
    userProfile.value?.fullName ||
    userProfile.value?.name ||
    userProfile.value?.email ||
    ''
  const cleaned = String(source).trim()
  if (!cleaned) return 'U'
  const parts = cleaned.split(/\s+/).filter(Boolean)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
})
const bubbleStyles = [
  { top: '6%', left: '6%', animationDelay: '0s' },
  { top: '14%', left: '52%', animationDelay: '1.5s' },
  { top: '26%', left: '18%', animationDelay: '0.7s' },
  { top: '36%', left: '60%', animationDelay: '2.2s' },
  { top: '42%', left: '8%', animationDelay: '1.1s' },
  { top: '46%', left: '54%', animationDelay: '2.8s' }
]
const pushMessage = (role, text, kind = 'default') => {
  messages.value.push({ role, text, kind })
}

const pushNotice = async (text, kind = 'warning') => {
  await pushAssistantMessage(text, kind)
}

const seedMessages = () => {
  messages.value = [
    {
      role: 'assistant',
      text: canUploadGrades.value
        ? `Hello, ${sessionName.value}. Upload grade files to update the database.`
        : `Hello, ${sessionName.value}. How are you?`
    },
    {
      role: 'assistant',
      text: canUploadGrades.value
        ? 'Upload history and registrar actions are on the right.'
        : 'I am your assistant for today.'
    },
    {
      role: 'assistant',
      text: canUploadGrades.value
        ? 'Parsed rows will show here before you send them to Firestore.'
        : 'How can I be of service?'
    },
    {
      role: 'assistant',
      text: canUploadGrades.value
        ? 'Need anything else?'
        : 'Do you have something in mind?'
    }
  ]
}

watchEffect(() => {
  if (!messages.value.length) seedMessages()
})

const uploadedFiles = ref([])
const parsedRecords = ref([])
const enteredStudentId = ref('')
const chatInput = ref('')
const conversationStep = ref('root')
const errorMessage = ref('')
const successMessage = ref('')
const isProcessing = ref(false)
const matchedRecords = ref([])
const prospectusRows = ref([])
const hasSearched = ref(false)
const uploadHistory = ref([])
const analysisSummary = ref({
  total: 0,
  missingStudentId: 0,
  missingSubjectCode: 0,
  invalidFinalGrade: 0,
  duplicateRows: 0
})
const analysisConfirmed = ref(false)
const tickets = ref([])
const pendingServiceName = ref('')
const requestForm = ref({
  purpose: '',
  contact: '',
  notes: ''
})
const selectedTicket = ref(null)
const lottieRef = ref(null)
const isLottiePlaying = ref(true)
const isTyping = ref(false)

const holdMessageCount = 3
const holdMessageStartIndex = computed(() =>
  Math.max(0, messages.value.length - holdMessageCount)
)
const isInputRequired = computed(() =>
  [
    'await_student_id',
    'grade_confirm',
    'doc_wait_id',
    'doc_contact',
    'doc_purpose',
    'doc_notes'
  ].includes(conversationStep.value)
)

const chatPlaceholder = computed(() => {
  if (conversationStep.value === 'await_student_id') {
    return 'Enter your student ID (e.g., 21-1234)'
  }
  if (conversationStep.value === 'doc_wait_id') {
    return 'Enter your student ID to continue the request'
  }
  if (conversationStep.value === 'grade_confirm') {
    return 'Confirm your student ID or choose a quick option'
  }
  if (conversationStep.value === 'doc_contact') {
    return 'Enter your contact (email or phone)'
  }
  if (conversationStep.value === 'doc_purpose') {
    return 'Enter the purpose of your request'
  }
  if (conversationStep.value === 'doc_notes') {
    return 'Add notes or type "skip"'
  }
  if (conversationStep.value === 'documents') {
    return 'Pick a document from quick options'
  }
  if (conversationStep.value === 'services') {
    return 'Pick a service from quick options'
  }
  return 'Type a request like: Show my grades'
})


const sessionStudentId = computed(() => {
  return userProfile.value?.studentId || localStorage.getItem('studentId') || ''
})

const resolvedStudentId = computed(() => {
  return enteredStudentId.value.trim() || sessionStudentId.value || ''
})

const studentTickets = computed(() => {
  if (!resolvedStudentId.value) return []
  return tickets.value.filter((ticket) => ticket.studentId === resolvedStudentId.value)
})

const quickOptions = computed(() => {
  if (!isStudent.value) return []
  if (conversationStep.value === 'root') {
    return [
      { id: 'grade', label: 'Grade Inquiry', action: 'grade' },
      { id: 'documents', label: 'Request Documents', action: 'documents' },
      { id: 'services', label: 'Other Services', action: 'services' }
    ]
  }
  if (conversationStep.value === 'grade_confirm') {
    const options = []
    if (sessionStudentId.value) {
      options.push({
        id: 'use_session',
        label: `Use session ID (${sessionStudentId.value})`,
        action: 'use_session'
      })
    }
    options.push({ id: 'enter_id', label: 'Enter student ID', action: 'enter_id' })
    options.push({ id: 'back_root', label: 'Back', action: 'back' })
    return options
  }
  if (conversationStep.value === 'documents') {
    return [
      { id: 'doc_cog', label: 'Certificate of Grades', action: 'service' },
      { id: 'doc_tor', label: 'Transcript of Records (TOR)', action: 'service' },
      { id: 'doc_diploma', label: 'Diploma Request', action: 'service' },
      { id: 'doc_gm', label: 'Certification / Good Moral', action: 'service' },
      { id: 'back_docs', label: 'Back', action: 'back' }
    ]
  }
  if (conversationStep.value === 'services') {
    return [
      { id: 'svc_enroll', label: 'Enrollment Assistance', action: 'info' },
      { id: 'svc_records', label: 'Student Records', action: 'info' },
      { id: 'svc_announce', label: 'Announcements', action: 'info' },
      { id: 'back_services', label: 'Back', action: 'back' }
    ]
  }
  if (conversationStep.value === 'await_student_id') {
    return [{ id: 'cancel_id', label: 'Cancel', action: 'back' }]
  }
  return []
})

const primaryTabs = computed(() => {
  if (!isStudent.value) return []
  return [
    { id: 'grade', label: 'Grade Inquiry', action: 'grade' },
    { id: 'documents', label: 'Request Documents', action: 'documents' },
    { id: 'services', label: 'Other Services', action: 'services' }
  ]
})

const secondaryTabs = computed(() => {
  if (!isStudent.value) return []
  if (conversationStep.value === 'grade_confirm') {
    const options = []
    if (sessionStudentId.value) {
      options.push({
        id: 'use_session',
        label: `Use session ID (${sessionStudentId.value})`,
        action: 'use_session'
      })
    }
    options.push({ id: 'enter_id', label: 'Enter student ID', action: 'enter_id' })
    options.push({ id: 'back_root', label: 'Back', action: 'back' })
    return options
  }
  if (conversationStep.value === 'documents') {
    return [
      { id: 'doc_cog', label: 'Certificate of Grades', action: 'service' },
      { id: 'doc_tor', label: 'Transcript of Records (TOR)', action: 'service' },
      { id: 'doc_diploma', label: 'Diploma Request', action: 'service' },
      { id: 'doc_gm', label: 'Certification / Good Moral', action: 'service' },
      { id: 'back_docs', label: 'Back', action: 'back' }
    ]
  }
  if (conversationStep.value === 'services') {
    return [
      { id: 'svc_enroll', label: 'Enrollment Assistance', action: 'info' },
      { id: 'svc_records', label: 'Student Records', action: 'info' },
      { id: 'svc_announce', label: 'Announcements', action: 'info' },
      { id: 'back_services', label: 'Back', action: 'back' }
    ]
  }
  if (conversationStep.value === 'await_student_id') {
    return [{ id: 'cancel_id', label: 'Cancel', action: 'back' }]
  }
  return []
})

const activePrimaryTab = computed(() => {
  if (conversationStep.value === 'grade_confirm' || conversationStep.value === 'await_student_id') return 'grade'
  if (conversationStep.value === 'documents' || conversationStep.value.startsWith('doc_')) return 'documents'
  if (conversationStep.value === 'services') return 'services'
  return null
})

const activeSecondaryTab = computed(() => {
  if (conversationStep.value === 'grade_confirm' && sessionStudentId.value) return 'use_session'
  if (conversationStep.value === 'documents') return null
  if (conversationStep.value === 'services') return null
  return null
})

const normalizeId = (value) => {
  return String(value || '').replace(/\s+/g, '').toUpperCase()
}

const normalizeSubjectCode = (value) => {
  return String(value || '').replace(/\s+/g, '').toUpperCase()
}

const analyzeGrades = (rows) => {
  const summary = {
    total: rows.length,
    missingStudentId: 0,
    missingSubjectCode: 0,
    invalidFinalGrade: 0,
    duplicateRows: 0
  }

  const seen = new Set()
  rows.forEach((row) => {
    const studentId = String(row.studentId || '').trim()
    const subjectCode = String(row.subjectCode || '').trim()
    if (!studentId) summary.missingStudentId += 1
    if (!subjectCode) summary.missingSubjectCode += 1

    if (row.finalGrade !== '' && row.finalGrade !== null && row.finalGrade !== undefined) {
      const num = Number(row.finalGrade)
      if (!Number.isFinite(num) || num < 0 || num > 100) summary.invalidFinalGrade += 1
    }

    const key = `${studentId.toUpperCase()}__${subjectCode.toUpperCase()}`
    if (studentId && subjectCode) {
      if (seen.has(key)) summary.duplicateRows += 1
      seen.add(key)
    }
  })

  return summary
}

const yearOrder = {
  '1st Year': 1,
  '2nd Year': 2,
  '3rd Year': 3,
  '4th Year': 4
}

const prospectusByYear = computed(() => {
  const buckets = {}
  prospectusRows.value.forEach((row) => {
    const key = row.yearLevel || 'Unassigned'
    if (!buckets[key]) buckets[key] = []
    buckets[key].push(row)
  })
  return Object.keys(buckets)
    .sort((a, b) => (yearOrder[a] || 99) - (yearOrder[b] || 99))
    .map((year) => ({
      year,
      rows: buckets[year],
      totalUnits: buckets[year].reduce((sum, item) => sum + Number(item.units || 0), 0)
    }))
})
watchEffect(() => {
  if (isStudent.value && sessionStudentId.value && !enteredStudentId.value) {
    enteredStudentId.value = sessionStudentId.value
  }
})

const ticketStorageKey = 'gradeInquiryTickets'

const loadTickets = () => {
  try {
    const raw = localStorage.getItem(ticketStorageKey)
    if (!raw) return
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) tickets.value = parsed
  } catch (error) {
    // Ignore malformed storage
  }
}

const saveTickets = () => {
  localStorage.setItem(ticketStorageKey, JSON.stringify(tickets.value))
}

const loadUploadHistory = async () => {
  if (!canUploadGrades.value) return
  const result = await getGradeUploads(8)
  if (result.success) {
    uploadHistory.value = result.uploads
  }
}

onMounted(() => {
  loadUploadHistory()
  loadTickets()
})

const generateTicketId = () => {
  const rand = Math.floor(Math.random() * 900 + 100)
  return `TKT-${Date.now().toString(36).toUpperCase()}-${rand}`
}

const isDocumentRequest = (serviceName) => {
  const name = String(serviceName || '').toLowerCase()
  return (
    name.includes('certificate') ||
    name.includes('transcript') ||
    name.includes('tor') ||
    name.includes('diploma') ||
    name.includes('good moral') ||
    name.includes('certification')
  )
}

const buildTicket = (serviceName, details = {}) => {
  return {
    id: generateTicketId(),
    service: serviceName,
    studentId: resolvedStudentId.value || 'N/A',
    status: 'Submitted',
    createdAt: new Date().toLocaleString(),
    processNote: 'Submitted. Waiting for registrar verification.',
    details
  }
}

const createTicket = (serviceName, details = {}) => {
  const ticket = buildTicket(serviceName, details)
  tickets.value.unshift(ticket)
  saveTickets()
  return ticket
}

const startDocumentRequest = async (serviceName) => {
  pendingServiceName.value = serviceName
  requestForm.value = { purpose: '', contact: '', notes: '' }
  conversationStep.value = 'doc_contact'
  await pushAssistantMessage(`Document request started: ${serviceName}.`)
  await pushAssistantMessage('Please provide your contact (email or phone).')
}

const finalizeDocumentRequest = async () => {
  const ticket = createTicket(pendingServiceName.value, {
    contact: requestForm.value.contact,
    purpose: requestForm.value.purpose,
    notes: requestForm.value.notes
  })
  successMessage.value = `Request submitted. Ticket ID: ${ticket.id}`
  await pushAssistantMessage(`Request noted for ${ticket.service}. Ticket ID: ${ticket.id}.`)
  pendingServiceName.value = ''
  requestForm.value = { purpose: '', contact: '', notes: '' }
  conversationStep.value = 'root'
}

const openTicketDetails = (ticket) => {
  selectedTicket.value = ticket
}

const closeTicketDetails = () => {
  selectedTicket.value = null
}

const toggleLottiePlayback = () => {
  const player = lottieRef.value?.getDotLottieInstance?.()
  if (!player) return
  if (isLottiePlaying.value) {
    player.pause()
    isLottiePlaying.value = false
  } else {
    player.play()
    isLottiePlaying.value = true
  }
}

const playLottie = () => {
  const player = lottieRef.value?.getDotLottieInstance?.()
  if (!player) return
  player.play()
  isLottiePlaying.value = true
}

const pauseLottie = () => {
  const player = lottieRef.value?.getDotLottieInstance?.()
  if (!player) return
  player.pause()
  isLottiePlaying.value = false
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const pushAssistantMessage = async (text, kind = 'default') => {
  isTyping.value = true
  playLottie()
  await wait(3000)
  pushMessage('assistant', text, kind)
  isTyping.value = false
  pauseLottie()
}

const handleChatSubmit = async () => {
  const value = String(chatInput.value || '').trim()
  if (!value) return
  pushMessage('user', value)
  chatInput.value = ''

  if (conversationStep.value === 'doc_wait_id') {
    enteredStudentId.value = value
    if (!pendingServiceName.value) {
      conversationStep.value = 'root'
      await pushAssistantMessage('No pending document request found. Choose an option to continue.')
      return
    }
    await startDocumentRequest(pendingServiceName.value)
    return
  }

  if (conversationStep.value === 'doc_contact') {
    requestForm.value.contact = value
    conversationStep.value = 'doc_purpose'
    await pushAssistantMessage('What is the purpose of this document request?')
    return
  }

  if (conversationStep.value === 'doc_purpose') {
    requestForm.value.purpose = value
    conversationStep.value = 'doc_notes'
    await pushAssistantMessage('Any additional notes? Type "skip" to leave it blank.')
    return
  }

  if (conversationStep.value === 'doc_notes') {
    requestForm.value.notes = value.toLowerCase() === 'skip' ? '' : value
    if (!resolvedStudentId.value) {
      await pushAssistantMessage('Student ID is required to proceed. Please enter your student ID.', 'error')
      conversationStep.value = 'doc_wait_id'
      return
    }
    await finalizeDocumentRequest()
    return
  }

  if (conversationStep.value === 'await_student_id') {
    enteredStudentId.value = value
    await pushAssistantMessage(`Checking grades for ${enteredStudentId.value}...`)
    await handleInquiry()
    conversationStep.value = 'root'
    return
  }

  const lower = value.toLowerCase()
  if (lower.includes('grade')) {
    conversationStep.value = 'grade_confirm'
    await pushAssistantMessage('Please confirm your student ID to proceed.')
    return
  }

  if (lower.includes('tor') || lower.includes('transcript')) {
    await handleServiceRequest('Transcript of Records (TOR)')
    conversationStep.value = 'root'
    return
  }

  if (lower.includes('certificate')) {
    await handleServiceRequest('Certificate of Grades')
    conversationStep.value = 'root'
    return
  }

  if (lower.includes('diploma')) {
    await handleServiceRequest('Diploma Request')
    conversationStep.value = 'root'
    return
  }

  await pushAssistantMessage('Choose a quick option below to continue.')
}

const handleOptionSelect = async (option) => {
  pushMessage('user', option.label)

  if (
    conversationStep.value === 'doc_wait_id' ||
    conversationStep.value === 'doc_contact' ||
    conversationStep.value === 'doc_purpose' ||
    conversationStep.value === 'doc_notes'
  ) {
    await pushAssistantMessage('Please finish the current document request first.')
    return
  }

  if (option.action === 'grade') {
    conversationStep.value = 'grade_confirm'
    await pushAssistantMessage('Please confirm your student ID to proceed.')
    return
  }

  if (option.action === 'documents') {
    conversationStep.value = 'documents'
    await pushAssistantMessage('Select the document you want to request.')
    return
  }

  if (option.action === 'services') {
    conversationStep.value = 'services'
    await pushAssistantMessage('Select a service for more info.')
    return
  }

  if (option.action === 'use_session') {
    if (!sessionStudentId.value) {
      await pushAssistantMessage('Session ID not available. Please enter your student ID.')
      conversationStep.value = 'await_student_id'
      return
    }
    enteredStudentId.value = sessionStudentId.value
    await pushAssistantMessage(`Using session ID ${enteredStudentId.value}. Checking grades...`)
    await handleInquiry()
    conversationStep.value = 'root'
    return
  }

  if (option.action === 'enter_id') {
    conversationStep.value = 'await_student_id'
    await pushAssistantMessage('Please type your student ID to continue.')
    return
  }

  if (option.action === 'service') {
    await handleServiceRequest(option.label)
    conversationStep.value = 'root'
    return
  }

  if (option.action === 'info') {
    const ticket = createTicket(option.label, { infoRequest: true })
    await pushAssistantMessage(`Ticket ${ticket.id} created for ${option.label}.`)
    conversationStep.value = 'root'
    return
  }

  if (option.action === 'back') {
    conversationStep.value = 'root'
    await pushAssistantMessage('Choose an option to continue.')
  }
}



const handleFileUpload = async (event) => {
  const files = Array.from(event.target.files || [])
  if (!files.length) return

  errorMessage.value = ''
  successMessage.value = ''
  parsedRecords.value = []
  matchedRecords.value = []
  hasSearched.value = false
  analysisConfirmed.value = false

  uploadedFiles.value = files

  const parsed = []
  for (const file of files) {
    const rows = await parseGradeFile(file)
    parsed.push(...rows)
  }

  parsedRecords.value = parsed
  analysisSummary.value = analyzeGrades(parsed)
  successMessage.value = parsed.length
    ? `Loaded ${parsed.length} grade rows. You can now check your grades.`
    : 'No rows detected. Please verify the file format.'
}

const handleInquiry = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  matchedRecords.value = []
  prospectusRows.value = []
  hasSearched.value = true

  if (!enteredStudentId.value.trim()) {
    errorMessage.value = 'Please enter your student ID.'
    return
  }

  if (isStudent.value) {
    const ticket = createTicket('Grade Inquiry', { studentId: enteredStudentId.value.trim() })
    await pushAssistantMessage(`Grade inquiry ticket created: ${ticket.id}.`)
  }

  const normalizedEntered = normalizeId(enteredStudentId.value)

  isProcessing.value = true
  try {
    const result = await getGradesByStudentId(normalizedEntered)
    if (!result.success) {
      errorMessage.value = result.message
      return
    }

    matchedRecords.value = result.grades

    const studentResponse = await getStudentById(enteredStudentId.value.trim())
    if (!studentResponse.success) {
      errorMessage.value = ''
      await pushNotice(
        'I am sorry, but you cant view other students grade other than yourself. Submit student id for reconfirmation.'
      )
      return
    }

    const programCode = studentResponse.student?.program
    if (!programCode) {
      errorMessage.value = 'Student program not found.'
      return
    }

    const subjectsResponse = await getSubjectsByProgram(programCode)
    if (!subjectsResponse.success) {
      errorMessage.value = subjectsResponse.message
      return
    }

    const gradeMap = new Map(
      matchedRecords.value.map((grade) => [
        normalizeSubjectCode(grade.subjectCode || grade.subject || ''),
        grade
      ])
    )

    const sortedSubjects = [...subjectsResponse.subjects].sort((a, b) => {
      const ay = yearOrder[a.yearLevel] || 99
      const by = yearOrder[b.yearLevel] || 99
      if (ay !== by) return ay - by
      return String(a.title || '').localeCompare(String(b.title || ''))
    })

    const unique = new Map()
    for (const subject of sortedSubjects) {
      const code = normalizeSubjectCode(subject.code || subject.subject || '')
      if (!code || unique.has(code)) continue
      unique.set(code, subject)
    }

    prospectusRows.value = Array.from(unique.values()).map((subject) => {
      const code = subject.code || subject.subject || ''
      const match = gradeMap.get(normalizeSubjectCode(code))
      return {
        code,
        title: subject.title || '',
        units: subject.units ?? '',
        yearLevel: subject.yearLevel || 'Unassigned',
        type: subject.subjectType || subject.type || subject.category || 'Major',
        grade: match?.finalGrade ?? match?.grade ?? 'N/A',
        remarks: match?.remarks ?? 'N/A'
      }
    })

    successMessage.value = matchedRecords.value.length
      ? `Found ${matchedRecords.value.length} record(s) for your student ID.`
      : 'No grade records found. Showing program subjects with N/A grades.'
  } catch (error) {
    errorMessage.value = 'Error fetching grades from database.'
  }
  isProcessing.value = false
}

const handleUploadToDatabase = async () => {
  if (!canUploadGrades.value) {
    errorMessage.value = 'Only registrar or instructor accounts can upload grades.'
    return
  }
  if (!parsedRecords.value.length) {
    errorMessage.value = 'No parsed records to upload.'
    return
  }
  if (!analysisConfirmed.value) {
    errorMessage.value = 'Please confirm the analysis before uploading.'
    return
  }

  isProcessing.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const result = await uploadGrades(parsedRecords.value, {
      fileNames: uploadedFiles.value.map((file) => file.name),
      uploadedBy: userProfile.value?.uid || '',
      uploadedByEmail: userProfile.value?.email || ''
    })
    if (result.success) {
      successMessage.value = result.message
      parsedRecords.value = []
      uploadedFiles.value = []
      analysisConfirmed.value = false
      analysisSummary.value = {
        total: 0,
        missingStudentId: 0,
        missingSubjectCode: 0,
        invalidFinalGrade: 0,
        duplicateRows: 0
      }
      await loadUploadHistory()
    } else {
      errorMessage.value = result.message
    }
  } catch (error) {
    errorMessage.value = 'Error uploading grades to database.'
  }
  isProcessing.value = false
}

const handleServiceRequest = async (serviceName) => {
  if (!isStudent.value) return
  if (isDocumentRequest(serviceName)) {
    if (conversationStep.value === 'doc_contact' || conversationStep.value === 'doc_purpose' || conversationStep.value === 'doc_notes') {
      await pushNotice('Please finish the current document request first.')
      return
    }
    if (!resolvedStudentId.value) {
      pendingServiceName.value = serviceName
      await pushAssistantMessage('Please enter your student ID to continue the document request.', 'error')
      conversationStep.value = 'doc_wait_id'
      return
    }
    await startDocumentRequest(serviceName)
    return
  }
  const ticket = createTicket(serviceName)
  successMessage.value = `Request created: ${serviceName}. Ticket ID: ${ticket.id}.`
  await pushAssistantMessage(`Request noted for ${ticket.service}. Ticket ID: ${ticket.id}.`)
}
</script>

<style scoped>
.chat-bubble {
  max-width: 55%;
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 12px;
  line-height: 1.2rem;
  box-shadow: 0 12px 26px -18px rgba(15, 23, 42, 0.6);
  animation: floatUp 6s ease-in-out 1 forwards;
  will-change: transform, opacity;
}

.chat-bubble__row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.chat-bubble__row--user {
  justify-content: flex-start;
}

.chat-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  color: #1d4ed8;
  font-size: 11px;
  font-weight: 700;
  flex: 0 0 auto;
  box-shadow: 0 8px 18px -12px rgba(15, 23, 42, 0.4);
}

.chat-text {
  display: inline-block;
}

.chat-bubble--ai {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(226, 232, 240, 0.9);
  color: #334155;
}

.chat-bubble--user {
  background: rgba(37, 99, 235, 0.9);
  color: white;
}

.chat-bubble--warning {
  background: rgba(251, 191, 36, 0.22);
  border: 1px solid rgba(251, 191, 36, 0.5);
  color: #92400e;
}

.chat-bubble--success {
  background: rgba(16, 185, 129, 0.18);
  border: 1px solid rgba(16, 185, 129, 0.4);
  color: #065f46;
}

.chat-bubble--error {
  background: rgba(248, 113, 113, 0.18);
  border: 1px solid rgba(248, 113, 113, 0.45);
  color: #991b1b;
}

.chat-bubble--hold {
  animation: none;
  opacity: 1;
  transform: translateY(0);
}

@keyframes floatUp {
  0% { transform: translateY(12px); opacity: 0; }
  20% { transform: translateY(4px); opacity: 0.95; }
  60% { transform: translateY(-6px); opacity: 0.9; }
  100% { transform: translateY(-18px); opacity: 0; }
}

</style>
