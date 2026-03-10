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

      <div class="relative bg-slate-300 border-2 glass-effect h-full  sm:p-8">
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
                    @click="selectTicketService('Certificate of Grades')"
                  >
                    Certificate of Grades
                  </button>
                  <button
                    class="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    @click="selectTicketService('Transcript of Records (TOR)')"
                  >
                    Transcript of Records
                  </button>
                  <button
                    class="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    @click="selectTicketService('Diploma Request')"
                  >
                    Diploma Request
                  </button>
                  <button
                    class="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    @click="selectTicketService('Certification / Good Moral')"
                  >
                    Certification / Good Moral
                  </button>
                  <button
                    class="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    @click="selectTicketService('Grade Assessment')"
                  >
                    Grade Assessment
                  </button>
                </div>
              </div>
            </div>
            <div class="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6 min-h-[420px] shadow-sm">
              <div class="absolute inset-0 opacity-40">
                <div class="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-blue-200 blur-2xl"></div>
                <div class="absolute bottom-6 left-6 h-32 w-32 rounded-full bg-amber-200 blur-2xl"></div>
                <div class="absolute  left-1/3 h-24 w-24 rounded-full bg-emerald-200 blur-2xl"></div>
              </div>
              <div class="relative h-full w-full z-10 flex flex-col">
                <div ref="chatFeedRef" class="h-56 sm:h-64 overflow-y-auto overflow-x-hidden pr-1 space-y-3">
                <div
                  v-for="(message, index) in messages"
                  :key="index"
                  class="chat-row"
                  :class="[
                    message.role === 'user' ? 'chat-row--user' : 'chat-row--ai',
                    index < staleMessageStartIndex ? 'chat-row--older' : ''
                  ]"
                >
                  <div
                    class="chat-bubble"
                    :class="[
                      message.role === 'assistant' ? 'chat-bubble--ai' : 'chat-bubble--user',
                      message.kind === 'warning' ? 'chat-bubble--warning' : '',
                      message.kind === 'error' ? 'chat-bubble--error' : '',
                      message.kind === 'success' ? 'chat-bubble--success' : ''
                    ]"
                    :style="getMessageBubbleStyle(message, index)"
                  >
                    <div v-if="message.role === 'user'" class="chat-bubble__row chat-bubble__row--user">
                      <div class="chat-avatar">{{ userInitials }}</div>
                      <span class="chat-text">{{ message.text }}</span>
                    </div>
                    <div v-else class="chat-bubble__row chat-bubble__row--ai">
                      <div class="chat-text w-full">
                        <span v-if="message.text">{{ message.text }}</span>
                        <div v-if="message.tableRows?.length" class="chat-table-wrap mt-2">
                          <table class="chat-table">
                            <thead>
                              <tr>
                                <th>Subject</th>
                                <th>Grade</th>
                                <th>Remarks</th>
                                <th>Term</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(row, rowIndex) in message.tableRows" :key="`${row.subject}-${rowIndex}`">
                                <td>{{ row.subject }}</td>
                                <td>{{ row.grade }}</td>
                                <td>{{ row.remarks }}</td>
                                <td>{{ row.term }}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="conversationStep === 'await_student_id'" class="chat-row chat-row--ai">
                  <form class="chat-inline-form" @submit.prevent="submitInlineStudentId">
                    <label class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Student ID Required</label>
                    <div class="mt-2 flex items-center gap-2">
                      <input
                        ref="inlineStudentIdFieldRef"
                        v-model="inlineStudentIdInput"
                        type="text"
                        placeholder="e.g. 23-0073"
                        class="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="submit"
                        class="rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
                        :disabled="isProcessing || !inlineStudentIdInput.trim()"
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </div>
                <div v-if="isTyping" class="chat-row chat-row--ai">
                  <div class="typing-indicator">
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                  </div>
                </div>
                </div>
                
            <div class="pointer-events-none flex justify-center">
                  <DotLottieVue
                    ref="lottieRef"
                    class="h-64 overflow mb-24w-64 opacity-55"
                    :autoplay="true"
                    :loop="true"
                    src="/images/x-AI-n.json"
                  />
               
    <button
      class="text-[10px] hidden font-semibold prounded-full bg-white/80 border border-slate-200 text-slate-600 hover:bg-white transition"
      @click="toggleLottiePlayback"
    >
      {{ isLottiePlaying ? 'Pause' : 'Play' }}
    </button>
              </div>    </div>
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

                    <input
                      v-model="chatInput"
                      type="text"
                      :placeholder="chatPlaceholder"
                      :disabled="conversationStep === 'await_student_id'"
                      class="mt-3 px-4 py-3 rounded-2xl border-2 outline-none text-slate-800 font-semibold transition"
                      :class="[
                        isInputRequired
                          ? 'border-emerald-400 focus:border-emerald-500 ring-1 ring-emerald-200 bg-emerald-50/40'
                          : 'border-slate-200 focus:border-blue-500 bg-white'
                      ]"
                      @keydown.enter.prevent="handleChatSubmit"
                    />
                  <button
                    class="mt-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-400 text-white font-bold text-sm sm:text-base hover:bg-blue-700 transition shadow-sm"
                    @click="handleChatSubmit"
                    :disabled="isProcessing || !chatInput?.trim?.()"
                  >
                    {{ isProcessing ? 'Checking...' : 'Send' }}
                  </button>
                  <div class="mt-2 text-xs text-slate-400">
                    Session ID (optional): <span class="font-semibold">{{ sessionStudentId || 'Not available' }}</span>
                  </div>
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
              <h3 class="text-base sm:text-lg font-bold text-slate-800">Request Document Ticket</h3>
              <p class="text-xs text-slate-500 mt-1">
                Ticketing is for document requests and grade assessment. Grade inquiries and general questions are handled in chat.
              </p>
              <div class="mt-4 text-[11px] font-semibold uppercase tracking-widest text-slate-400">Step 1: Choose a document</div>
              <div class="mt-2 flex flex-wrap gap-2">
                <button
                  v-for="option in documentTicketServices"
                  :key="option"
                  class="rounded-xl px-3 py-2 text-xs font-semibold transition border"
                  :class="[
                    ticketForm.service === option
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  ]"
                  @click="selectTicketService(option)"
                >
                  {{ option }}
                </button>
              </div>

              <div v-if="ticketForm.service" class="mt-4 space-y-3">
                <div class="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Step 2: Fill form details</div>
                <div>
                  <div class="text-xs font-semibold text-slate-500 mb-2">Request Type</div>
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="option in ticketTypeOptions"
                      :key="option"
                      class="rounded-xl px-3 py-2 text-xs font-semibold transition border"
                      :class="[
                        ticketForm.requestType === option
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      ]"
                      @click="ticketForm.requestType = option"
                    >
                      {{ option }}
                    </button>
                  </div>
                </div>

                <div>
                  <div class="text-xs font-semibold text-slate-500 mb-2">Priority</div>
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="option in ticketPriorityOptions"
                      :key="option"
                      class="rounded-xl px-3 py-2 text-xs font-semibold transition border"
                      :class="[
                        ticketForm.priority === option
                          ? 'bg-amber-500 text-white border-amber-500'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      ]"
                      @click="ticketForm.priority = option"
                    >
                      {{ option }}
                    </button>
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    v-model="ticketForm.studentId"
                    type="text"
                    placeholder="Student ID"
                    class="px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                  <input
                    v-model="ticketForm.contact"
                    type="text"
                    placeholder="Contact number or email"
                    class="px-3 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
                <input
                  v-model="ticketForm.purpose"
                  type="text"
                  placeholder="Purpose / short summary"
                  class="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                />
                <textarea
                  v-model="ticketForm.comment"
                  rows="3"
                  placeholder="Comment (required): provide complete details of your request."
                  class="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm resize-none"
                ></textarea>
                <textarea
                  v-model="ticketForm.notes"
                  rows="2"
                  placeholder="Additional notes (optional)"
                  class="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm resize-none"
                ></textarea>

                <div class="flex gap-2">
                  <button
                    class="px-5 py-3 rounded-2xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition shadow-sm"
                    :disabled="isProcessing"
                    @click="submitStudentTicketForm"
                  >
                    {{ isProcessing ? 'Submitting...' : 'Submit Ticket' }}
                  </button>
                  <button
                    class="px-4 py-3 rounded-2xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50"
                    type="button"
                    @click="resetTicketForm"
                  >
                    Reset
                  </button>
                </div>
                <div class="text-xs text-slate-500">
                  After submit, a transaction ticket ID is generated for tracing.
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
                  <div class="text-xs text-slate-500 mt-1">Ticket ID: {{ ticket.ticketId || ticket.id }}</div>
                </button>
              </div>
              <div v-else class="mt-4 text-sm text-slate-500">
                {{ isLoadingTickets ? 'Loading tickets...' : 'No tickets yet.' }}
              </div>
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
                  <div class="text-xs text-slate-500">Ticket ID: {{ ticket.ticketId || ticket.id }}</div>
                </button>
              </div>
              <div v-else class="mt-4 text-sm text-slate-500">
                {{ isLoadingTickets ? 'Loading tickets...' : 'No tickets received.' }}
              </div>
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

            <div v-if="hasSearched && (matchedRecords.length || prospectusRows.length)" class="rounded-2xl border border-slate-200/70 bg-white p-4 sm:p-6 shadow-sm">
              <div class="flex items-center justify-between gap-2 mb-4">
                <h3 class="text-base sm:text-lg font-bold text-slate-800">Grade Results</h3>
                <div class="flex items-center gap-2">
                  <button
                    class="rounded-xl px-3 py-2 text-xs font-semibold transition border"
                    :class="gradeResultView === 'grades' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'"
                    @click="gradeResultView = 'grades'"
                  >
                    Grade List
                  </button>
                  <button
                    class="rounded-xl px-3 py-2 text-xs font-semibold transition border"
                    :class="gradeResultView === 'prospectus' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'"
                    @click="gradeResultView = 'prospectus'"
                  >
                    TOR / Prospectus
                  </button>
                </div>
              </div>

              <div v-if="gradeResultView === 'grades'">
                <div v-if="displayGrades.length" class="space-y-3">
                  <div
                    v-for="grade in displayGrades"
                    :key="`${grade.subjectCode}_${grade.semester || ''}_${grade.academicYear || ''}`"
                    class="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100"
                  >
                    <div>
                      <span class="font-medium text-slate-800">{{ grade.subjectCode || 'N/A' }}</span>
                      <span class="text-slate-500 text-sm ml-2">{{ grade.subjectTitle || 'Untitled Subject' }}</span>
                    </div>
                    <div class="text-right">
                      <span :class="getGradeClass(grade.finalGrade)" class="font-bold text-lg">
                        {{ grade.finalGrade || 'N/A' }}
                      </span>
                      <span :class="getRemarksClass(grade.remarks)" class="block text-xs">
                        {{ grade.remarks || 'No Grade' }}
                      </span>
                    </div>
                  </div>
                </div>
                <div v-else class="text-sm text-slate-500">
                  No direct grade rows were found. Switch to TOR / Prospectus view.
                </div>
              </div>
            </div>

            <div v-if="prospectusRows.length && gradeResultView === 'prospectus'" class="rounded-2xl border border-slate-200/70 bg-white p-4 sm:p-6 shadow-sm">
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
              <p class="text-xs text-slate-500 mt-1">Transaction ID: {{ selectedTicket.ticketId || selectedTicket.id }}</p>
            </div>
            <button class="text-slate-400 hover:text-slate-600" @click="closeTicketDetails">X</button>
          </div>
          <div class="px-5 py-4 text-sm text-slate-700 space-y-2">
            <div><span class="font-semibold">Service:</span> {{ selectedTicket.service }}</div>
            <div><span class="font-semibold">Student ID:</span> {{ selectedTicket.studentId }}</div>
            <div><span class="font-semibold">Status:</span> {{ selectedTicket.status }}</div>
            <div><span class="font-semibold">Requested At:</span> {{ formatTicketDate(selectedTicket) }}</div>
            <div v-if="selectedTicket.details?.purpose"><span class="font-semibold">Purpose:</span> {{ selectedTicket.details.purpose }}</div>
            <div v-if="selectedTicket.details?.contact"><span class="font-semibold">Contact:</span> {{ selectedTicket.details.contact }}</div>
            <div v-if="selectedTicket.details?.comment"><span class="font-semibold">Comment:</span> {{ selectedTicket.details.comment }}</div>
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
import { ref, computed, watchEffect, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import { useAuth } from '@/composables/useAuth'
import { uploadGrades, getGradesByStudentId, parseGradeFile, getGradeUploads } from '@/firebase/gradeService'
import { getStudentById } from '@/firebase/studentService'
import { getSubjectsByProgram } from '@/firebase/subjectService'
import { createInquiryTicket, subscribeRegistrarTickets, subscribeStudentTickets } from '@/firebase/ticketService'
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
const pushMessage = (role, text, kind = 'default', meta = {}) => {
  messages.value.push({ role, text, kind, ...meta })
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
const gradeResultView = ref('grades')
const pendingGradeView = ref('grades')
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
const documentTicketServices = [
  'Certificate of Grades',
  'Transcript of Records (TOR)',
  'Diploma Request',
  'Certification / Good Moral',
  'Grade Assessment'
]
const ticketTypeOptions = ['New Request', 'Follow-up', 'Correction']
const ticketPriorityOptions = ['Low', 'Normal', 'High']
const ticketForm = ref({
  service: '',
  requestType: 'New Request',
  priority: 'Normal',
  studentId: '',
  contact: '',
  purpose: '',
  comment: '',
  notes: ''
})
const selectedTicket = ref(null)
const lottieRef = ref(null)
const isLottiePlaying = ref(true)
const isTyping = ref(false)
const chatFeedRef = ref(null)
const inlineStudentIdFieldRef = ref(null)
const inlineStudentIdInput = ref('')

const freshMessageWindow = 4
const staleMessageStartIndex = computed(() =>
  Math.max(0, messages.value.length - freshMessageWindow)
)

const columnOffsets = [0, 6, 10, 4, 12, 8]
const riseOffsets = [0, 2, 4, 1, 3, 5]

const getMessageBubbleStyle = (message, index) => {
  const roleSeed = message.role === 'assistant' ? 11 : 3
  const seed = (index * 7 + roleSeed) % columnOffsets.length
  return {
    '--chat-offset': `${columnOffsets[seed]}px`,
    '--chat-rise': `${riseOffsets[seed]}px`
  }
}

const scrollChatToLatest = async () => {
  await nextTick()
  const el = chatFeedRef.value
  if (!el) return
  el.scrollTop = el.scrollHeight
}

const submitInlineStudentId = async () => {
  const value = String(inlineStudentIdInput.value || '').trim()
  if (!value || isProcessing.value) return

  pushMessage('user', value)
  inlineStudentIdInput.value = ''
  chatInput.value = ''
  enteredStudentId.value = value

  await pushAssistantMessage(`Checking grades for ${enteredStudentId.value}...`)
  await handleInquiry(pendingGradeView.value)
  conversationStep.value = 'root'
  pendingGradeView.value = 'grades'
}

watch(
  [() => messages.value.length, isTyping],
  () => {
    scrollChatToLatest()
  },
  { immediate: true }
)

watch(
  conversationStep,
  async (step) => {
    if (step === 'await_student_id') {
      inlineStudentIdInput.value = enteredStudentId.value || ''
      chatInput.value = inlineStudentIdInput.value
      await nextTick()
      inlineStudentIdFieldRef.value?.focus?.()
    }
    scrollChatToLatest()
  },
  { immediate: true }
)

watch(inlineStudentIdInput, (value) => {
  if (conversationStep.value === 'await_student_id') {
    chatInput.value = value
  }
})
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
  if (!isStudent.value) return []
  const normalizedStudentId = normalizeId(resolvedStudentId.value)
  if (!normalizedStudentId) return []
  return tickets.value.filter(
    (ticket) => normalizeId(ticket.studentId) === normalizedStudentId
  )
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
      { id: 'doc_cog', label: 'Certificate of Grades', action: 'ticket_doc' },
      { id: 'doc_tor', label: 'Transcript of Records (TOR)', action: 'ticket_doc' },
      { id: 'doc_diploma', label: 'Diploma Request', action: 'ticket_doc' },
      { id: 'doc_gm', label: 'Certification / Good Moral', action: 'ticket_doc' },
      { id: 'doc_grade_assess', label: 'Grade Assessment', action: 'ticket_doc' },
      { id: 'back_docs', label: 'Back', action: 'back' }
    ]
  }
  if (conversationStep.value === 'services') {
    return [
      { id: 'svc_prospectus', label: 'TOR / Prospectus View', action: 'show_prospectus' },
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
    options.push({ id: 'view_tor', label: 'View TOR / Prospectus', action: 'show_prospectus' })
    options.push({ id: 'enter_id', label: 'Enter student ID', action: 'enter_id' })
    options.push({ id: 'back_root', label: 'Back', action: 'back' })
    return options
  }
  if (conversationStep.value === 'documents') {
    return [
      { id: 'doc_cog', label: 'Certificate of Grades', action: 'ticket_doc' },
      { id: 'doc_tor', label: 'Transcript of Records (TOR)', action: 'ticket_doc' },
      { id: 'doc_diploma', label: 'Diploma Request', action: 'ticket_doc' },
      { id: 'doc_gm', label: 'Certification / Good Moral', action: 'ticket_doc' },
      { id: 'doc_grade_assess', label: 'Grade Assessment', action: 'ticket_doc' },
      { id: 'back_docs', label: 'Back', action: 'back' }
    ]
  }
  if (conversationStep.value === 'services') {
    return [
      { id: 'svc_prospectus', label: 'TOR / Prospectus View', action: 'show_prospectus' },
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

const parseNumericGrade = (value) => {
  if (value === null || value === undefined || value === '' || value === 'N/A') return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

const getGradeClass = (grade) => {
  const numeric = parseNumericGrade(grade)
  if (numeric === null) return 'text-slate-400'
  if (numeric >= 80) return 'text-green-600'
  if (numeric >= 75) return 'text-blue-600'
  if (numeric >= 70) return 'text-orange-600'
  return 'text-red-600'
}

const getRemarksClass = (remarks) => {
  const normalized = String(remarks || '').toLowerCase()
  if (normalized.includes('pass')) return 'text-green-600'
  if (normalized.includes('fail')) return 'text-red-600'
  return 'text-slate-500'
}

const displayGrades = computed(() =>
  matchedRecords.value.map((grade) => ({
    subjectCode: grade.subjectCode || grade.subject || grade.code || 'N/A',
    subjectTitle: grade.subjectTitle || grade.title || '',
    finalGrade: grade.finalGrade ?? grade.grade ?? 'N/A',
    remarks: grade.remarks || 'No Grade',
    semester: grade.semester || '',
    academicYear: grade.academicYear || ''
  }))
)

const formatTicketDate = (ticket) => {
  const createdAt = ticket?.createdAt
  if (createdAt?.toDate) {
    return createdAt.toDate().toLocaleString()
  }
  if (typeof createdAt === 'string' && createdAt) {
    return createdAt
  }
  if (ticket?.createdAtMillis) {
    return new Date(ticket.createdAtMillis).toLocaleString()
  }
  return 'Pending timestamp'
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

// GPA Calculation - same as UserPageShell.vue
const GRADE_PASSING_SCORE = 74.4

const currentGradesList = computed(() => {
  // Return grades with actual grades (not N/A)
  return matchedRecords.value.filter(g => g.finalGrade !== null && g.finalGrade !== undefined && g.finalGrade !== 'N/A')
})

const semesterGPA = computed(() => {
  if (!currentGradesList.value.length) return '0.00'
  
  let totalPoints = 0
  let count = 0
  
  currentGradesList.value.forEach(grade => {
    if (grade.finalGrade && typeof grade.finalGrade === 'number') {
      totalPoints += grade.finalGrade
      count++
    }
  })
  
  if (count === 0) return '0.00'
  return (totalPoints / count).toFixed(2)
})

const gpaClass = computed(() => {
  const gpa = parseFloat(semesterGPA.value)
  if (gpa >= 80) return 'text-green-600'
  if (gpa >= 75) return 'text-blue-600'
  if (gpa >= 70) return 'text-orange-600'
  return 'text-red-600'
})

const academicSummary = computed(() => {
  let totalUnits = 0
  let subjectsPassed = 0
  let subjectsFailed = 0
  let totalGradePoints = 0
  let gradeCount = 0
  
  // Calculate from prospectusRows which has all subjects with grades
  prospectusRows.value.forEach(grade => {
    // Assuming each subject is roughly 3 units
    const units = grade.units || 3
    totalUnits += units
    
    if (grade.remarks === 'Passed' || (grade.grade && grade.grade !== 'N/A' && typeof grade.grade === 'number' && grade.grade >= GRADE_PASSING_SCORE)) {
      subjectsPassed++
      if (grade.grade && typeof grade.grade === 'number') {
        totalGradePoints += grade.grade
        gradeCount++
      }
    } else if (grade.remarks === 'Failed' || (grade.grade && grade.grade !== 'N/A' && typeof grade.grade === 'number' && grade.grade < GRADE_PASSING_SCORE)) {
      subjectsFailed++
    }
  })
  
  const gpa = gradeCount > 0 ? totalGradePoints / gradeCount : 0
  
  return {
    totalUnits,
    subjectsPassed,
    subjectsFailed,
    gpa
  }
})

watch(
  [isStudent, sessionStudentId],
  () => {
    if (isStudent.value && sessionStudentId.value && !enteredStudentId.value) {
      enteredStudentId.value = sessionStudentId.value
    }
    if (isStudent.value && sessionStudentId.value && !ticketForm.value.studentId) {
      ticketForm.value.studentId = sessionStudentId.value
    }
  },
  { immediate: true }
)

const isLoadingTickets = ref(false)
let stopTicketsSubscription = null

const clearTicketSubscription = () => {
  if (typeof stopTicketsSubscription === 'function') {
    stopTicketsSubscription()
  }
  stopTicketsSubscription = null
}

const loadTickets = () => {
  clearTicketSubscription()

  if (isStudent.value) {
    const studentId = normalizeId(resolvedStudentId.value)
    if (!studentId) {
      tickets.value = []
      return
    }
    isLoadingTickets.value = true
    stopTicketsSubscription = subscribeStudentTickets(
      studentId,
      (records) => {
        tickets.value = records
        isLoadingTickets.value = false
      },
      () => {
        isLoadingTickets.value = false
      }
    )
    return
  }

  if (canUploadGrades.value) {
    isLoadingTickets.value = true
    stopTicketsSubscription = subscribeRegistrarTickets(
      (records) => {
        tickets.value = records
        isLoadingTickets.value = false
      },
      () => {
        isLoadingTickets.value = false
      }
    )
    return
  }

  tickets.value = []
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

watch(
  [isStudent, canUploadGrades, resolvedStudentId],
  () => {
    loadTickets()
  }
)

onUnmounted(() => {
  clearTicketSubscription()
})

const isDocumentRequest = (serviceName) => {
  const name = String(serviceName || '').toLowerCase()
  return (
    name.includes('certificate') ||
    name.includes('transcript') ||
    name.includes('tor') ||
    name.includes('diploma') ||
    name.includes('good moral') ||
    name.includes('certification') ||
    name.includes('assessment')
  )
}

const createTicket = async (serviceName, details = {}) => {
  const studentId = String(resolvedStudentId.value || '').trim()
  if (!studentId) {
    return { success: false, message: 'Student ID is required to create a ticket.' }
  }

  const result = await createInquiryTicket({
    service: serviceName,
    studentId,
    details,
    createdByUid: userProfile.value?.uid || '',
    createdByEmail: userProfile.value?.email || '',
    createdByName: userProfile.value?.displayName || userProfile.value?.fullName || ''
  })

  if (!result.success) {
    return { success: false, message: result.message || 'Ticket submission failed.' }
  }

  return { success: true, ticket: result.ticket }
}

const selectTicketService = (serviceName) => {
  ticketForm.value.service = serviceName
  if (!ticketForm.value.studentId && resolvedStudentId.value) {
    ticketForm.value.studentId = resolvedStudentId.value
  }
}

const resetTicketForm = () => {
  ticketForm.value = {
    service: '',
    requestType: 'New Request',
    priority: 'Normal',
    studentId: sessionStudentId.value || '',
    contact: '',
    purpose: '',
    comment: '',
    notes: ''
  }
}

const submitStudentTicketForm = async () => {
  if (!isStudent.value) return
  errorMessage.value = ''
  successMessage.value = ''

  const service = String(ticketForm.value.service || '').trim()
  const studentId = String(ticketForm.value.studentId || '').trim()
  const comment = String(ticketForm.value.comment || '').trim()
  if (!service) {
    errorMessage.value = 'Please choose a request from the predefined buttons.'
    return
  }
  if (!documentTicketServices.includes(service)) {
    errorMessage.value = 'Only document requests are allowed in ticket form.'
    return
  }
  if (!studentId) {
    errorMessage.value = 'Student ID is required.'
    return
  }
  if (!comment) {
    errorMessage.value = 'Comment is required for ticket submission.'
    return
  }

  enteredStudentId.value = studentId

  isProcessing.value = true
  const ticketResult = await createTicket(service, {
    requestType: ticketForm.value.requestType,
    priority: ticketForm.value.priority,
    purpose: String(ticketForm.value.purpose || '').trim(),
    contact: String(ticketForm.value.contact || '').trim(),
    comment,
    notes: String(ticketForm.value.notes || '').trim()
  })
  isProcessing.value = false

  if (!ticketResult.success) {
    errorMessage.value = ticketResult.message || 'Unable to submit ticket.'
    return
  }

  const ticket = ticketResult.ticket
  successMessage.value = `Ticket submitted. Ticket ID: ${ticket.ticketId || ticket.id}.`
  await pushAssistantMessage(`Ticket submitted for ${service}. Transaction ID: ${ticket.ticketId || ticket.id}.`, 'success')
  resetTicketForm()
}

const startDocumentRequest = async (serviceName) => {
  pendingServiceName.value = serviceName
  requestForm.value = { purpose: '', contact: '', notes: '' }
  conversationStep.value = 'doc_contact'
  await pushAssistantMessage(`Document request started: ${serviceName}.`)
  await pushAssistantMessage('Please provide your contact (email or phone).')
}

const finalizeDocumentRequest = async () => {
  const ticketResult = await createTicket(pendingServiceName.value, {
    contact: requestForm.value.contact,
    purpose: requestForm.value.purpose,
    notes: requestForm.value.notes
  })
  if (!ticketResult.success) {
    errorMessage.value = ticketResult.message || 'Unable to submit request ticket.'
    await pushAssistantMessage('Ticket submission failed. Please try again.', 'error')
    return
  }

  const ticket = ticketResult.ticket
  successMessage.value = `Request submitted. Ticket ID: ${ticket.ticketId || ticket.id}`
  await pushAssistantMessage(`Request noted for ${ticket.service}. Ticket ID: ${ticket.ticketId || ticket.id}.`)
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

const pushAssistantTableMessage = async (text, rows = [], kind = 'default') => {
  isTyping.value = true
  playLottie()
  await wait(3000)
  pushMessage('assistant', text, kind, { tableRows: rows })
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
    await handleInquiry(pendingGradeView.value)
    conversationStep.value = 'root'
    pendingGradeView.value = 'grades'
    return
  }

  const lower = value.toLowerCase()
  if (lower.includes('grade')) {
    pendingGradeView.value = 'grades'
    await pushAssistantMessage('Please confirm your student ID to proceed.')
    conversationStep.value = 'await_student_id'
    return
  }

  if (lower.includes('prospectus') || lower.includes('tor view') || lower.includes('tor / prospectus')) {
    pendingGradeView.value = 'prospectus'
    if (sessionStudentId.value) {
      enteredStudentId.value = sessionStudentId.value
      await pushAssistantMessage(`Using session ID ${enteredStudentId.value}. Opening TOR / Prospectus...`)
      await handleInquiry('prospectus')
    } else {
      conversationStep.value = 'await_student_id'
      await pushAssistantMessage('Please type your student ID to open TOR / Prospectus view.')
      return
    }
    conversationStep.value = 'root'
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

  if (lower.includes('assessment')) {
    await handleServiceRequest('Grade Assessment')
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
    pendingGradeView.value = 'grades'
    await pushAssistantMessage('Please confirm your student ID to proceed.')
    conversationStep.value = 'await_student_id'
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
    await handleInquiry(pendingGradeView.value)
    conversationStep.value = 'root'
    pendingGradeView.value = 'grades'
    return
  }

  if (option.action === 'enter_id') {
    pendingGradeView.value = pendingGradeView.value || 'grades'
    conversationStep.value = 'await_student_id'
    await pushAssistantMessage('Please type your student ID to continue.')
    return
  }

  if (option.action === 'show_prospectus') {
    pendingGradeView.value = 'prospectus'
    if (sessionStudentId.value) {
      enteredStudentId.value = sessionStudentId.value
      await pushAssistantMessage(`Using session ID ${enteredStudentId.value}. Opening TOR / Prospectus...`)
      await handleInquiry('prospectus')
      conversationStep.value = 'root'
      pendingGradeView.value = 'grades'
      return
    }
    conversationStep.value = 'await_student_id'
    await pushAssistantMessage('Please type your student ID to open TOR / Prospectus view.')
    return
  }

  if (option.action === 'ticket_doc') {
    await handleServiceRequest(option.label)
    conversationStep.value = 'root'
    return
  }

  if (option.action === 'info') {
    await pushAssistantMessage(`${option.label} inquiries are handled directly in chat. Ask your question and I will assist you.`)
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

const handleInquiry = async (preferredView = 'grades') => {
  errorMessage.value = ''
  successMessage.value = ''
  matchedRecords.value = []
  prospectusRows.value = []
  hasSearched.value = true

  if (!enteredStudentId.value.trim()) {
    errorMessage.value = 'Please enter your student ID.'
    return
  }

  const normalizedEntered = normalizeId(enteredStudentId.value)
  const normalizedSessionStudentId = normalizeId(sessionStudentId.value)

  if (isStudent.value && normalizedSessionStudentId && normalizedEntered !== normalizedSessionStudentId) {
    errorMessage.value = ''
    await pushNotice(
      'You can only view your own grades. Please use your session student ID.'
    )
    return
  }

  isProcessing.value = true
  try {
    const result = await getGradesByStudentId(normalizedEntered)
    if (!result.success) {
      errorMessage.value = result.message
      return
    }

    matchedRecords.value = result.grades

    const studentResponse = await getStudentById(normalizedEntered)
    if (!studentResponse.success) {
      errorMessage.value = ''
      await pushNotice(
        'Student record not found. Please verify your student ID. Make sure to '
      )
      return
    }

    if (!matchedRecords.value.every((grade) => grade.studentName)) {
      matchedRecords.value = matchedRecords.value.map((grade) => ({
        ...grade,
        studentName: grade.studentName || studentResponse.student?.fullName || ''
      }))
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

    if (matchedRecords.value.length) {
      const studentName =
        matchedRecords.value[0]?.studentName ||
        studentResponse.student?.fullName ||
        enteredStudentId.value
      await pushAssistantMessage(
        `Found ${matchedRecords.value.length} record(s) for ${studentName}. Here are the latest details:`,
        'success'
      )

      const latestRecords = [...matchedRecords.value]
        .sort((a, b) => {
          const ayA = String(a.academicYear || '')
          const ayB = String(b.academicYear || '')
          if (ayA !== ayB) return ayB.localeCompare(ayA)
          return String(b.semester || '').localeCompare(String(a.semester || ''))
        })
        .slice(0, 6)

      const tableRows = latestRecords.map((grade) => {
        const subjectCode = grade.subjectCode || grade.subject || 'N/A'
        const title = grade.subjectTitle || grade.title || 'Untitled Subject'
        return {
          subject: `${subjectCode} - ${title}`,
          grade: String(grade.finalGrade ?? grade.grade ?? 'N/A'),
          remarks: grade.remarks || 'No Grade',
          term: `${grade.semester || 'N/A'}, ${grade.academicYear || 'N/A'}`
        }
      })
      await pushAssistantTableMessage('Latest grade records:', tableRows)
    } else {
      await pushAssistantMessage(
        'No direct grade rows were found. I loaded your TOR / Prospectus subjects so you can still review your curriculum.',
        'warning'
      )
    }

    gradeResultView.value = preferredView === 'prospectus' ? 'prospectus' : 'grades'
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
    selectTicketService(serviceName)
    await pushAssistantMessage(`Selected "${serviceName}". Please complete the Request Document Ticket form in the ticket section for transaction tracing.`)
    return
  }
  await pushAssistantMessage(`${serviceName} is handled directly in chat. No ticket is required.`)
}
</script>

<style scoped>
.chat-row {
  display: flex;
}

.chat-row--user {
  justify-content: flex-start;
}

.chat-row--ai {
  justify-content: flex-end;
}

.chat-row--older {
  opacity: 0.45;
}

.chat-bubble {
  max-width: 78%;
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 13px;
  line-height: 1.3rem;
  box-shadow: 0 12px 26px -18px rgba(15, 23, 42, 0.6);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.chat-row--user .chat-bubble {
  margin-left: var(--chat-offset, 0px);
  transform: translateY(calc(var(--chat-rise, 0px) * -1));
}

.chat-row--ai .chat-bubble {
  margin-right: var(--chat-offset, 0px);
  transform: translateY(calc(var(--chat-rise, 0px) * -1));
}

.chat-bubble__row {
  display: flex;
  align-items: flex-end;
  gap: 8px;
}

.chat-bubble__row--user {
  justify-content: flex-start;
}

.chat-bubble__row--ai {
  justify-content: flex-end;
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

.chat-table-wrap {
  overflow-x: auto;
}

.chat-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;
}

.chat-table th,
.chat-table td {
  border: 1px solid rgba(148, 163, 184, 0.35);
  padding: 6px 8px;
  text-align: left;
  vertical-align: top;
  white-space: nowrap;
}

.chat-table th {
  font-weight: 700;
  background: rgba(15, 23, 42, 0.06);
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

.chat-inline-form {
  width: min(360px, 100%);
  border-radius: 14px;
  border: 1px solid rgba(148, 163, 184, 0.4);
  background: rgba(255, 255, 255, 0.95);
  padding: 10px 12px;
  box-shadow: 0 12px 26px -18px rgba(15, 23, 42, 0.6);
}

.typing-indicator {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(226, 232, 240, 0.9);
}

.typing-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #64748b;
  animation: typingBlink 1.1s ease-in-out infinite;
}

.typing-dot:nth-child(2) {
  animation-delay: 0.15s;
}

.typing-dot:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes typingBlink {
  0%, 80%, 100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  40% {
    transform: translateY(-3px);
    opacity: 1;
  }
}

</style>
