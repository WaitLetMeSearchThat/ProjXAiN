<template>
  <div class="max-w-6xl mx-auto">
    <div class="relative rounded-2xl shadow-2xl border border-slate-200/70 bg-white/90 overflow-hidden">
   
      <div class="relative px-4 py-4 bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-200 text-white">
        <div class="flex items-start justify-between ">
          <div class="flex flex-col items-start pr-20 sm:pr-28">
            <h2 class="text-2xl sm:text-3xl font-black tracking-tight">Project Y-xx01 Assistant</h2>
            <p class="text-sm sm:text-base text-white/90">
The Only Limitation is our Imagination.
            </p>

            <div class="mt-2 inline-flex items-center gap-2 bg-white/20 px-3 py-2 rounded-full">
              <label class="text-[11px] font-semibold text-white/90 uppercase tracking-wider">Language</label>
              <select
                v-model="botLanguage"
                class="bg-white/90 text-slate-700 text-xs font-semibold rounded-md px-2 py-1 outline-none"
              >
                <option v-for="lang in languageOptions" :key="lang.value" :value="lang.value">
                  {{ lang.label }}
                </option>
              </select>
            </div>
          </div>

          
        </div>
      </div>

      <div class="relative bg-slate-300 border-2 glass-effect h-full  sm:p-4">
        <div class="grid grid-cols-1 lg:grid-cols-3 ">
          <!-- Column 1: Chatbox -->
          <div class="flex flex-col justify-center space-y-2 lg:col-span-2">
            <div v-if="isStudent" class="rounded-2xl border border-slate-200/70 bg-white  sm:p-5 shadow-sm">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div class="text-xs font-semibold uppercase tracking-widest text-slate-800">Student Services</div>
                  <div class="text-sm font-bold text-slate-800"></div>
                </div>
                <div class="flex flex-wrap gap-2">
                  <button
                    :disabled="isTicketServiceDisabled('Certificate of Grades')"
                    class="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    @click="selectTicketService('Certificate of Grades')"
                  >
                    Certificate of Grades
                  </button>
                  <button
                    :disabled="isTicketServiceDisabled('Transcript of Records (TOR)')"
                    class="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    @click="selectTicketService('Transcript of Records (TOR)')"
                  >
                    Transcript of Records
                  </button>
                  <button
                    :disabled="isTicketServiceDisabled('Diploma Request')"
                    class="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    @click="selectTicketService('Diploma Request')"
                  >
                    Diploma Request
                  </button>
                  <button
                    :disabled="isTicketServiceDisabled('Certification / Good Moral')"
                    class="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    @click="selectTicketService('Certification / Good Moral')"
                  >
                    Certification / Good Moral
                  </button>
                  <button
                    :disabled="isTicketServiceDisabled('Grade Assessment')"
                    class="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    @click="selectTicketService('Grade Assessment')"
                  >
                    Grade Assessment
                  </button>
                </div>
              </div>
            </div>
            <div class="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6 min-h-[420px] shadow-sm">
             
              <div class="relative h-full w-full z-10 flex flex-col">
                <div ref="chatFeedRef" class="flex-1 min-h-[14rem] sm:min-h-[16rem] overflow-y-auto overflow-x-hidden pr-1 flex flex-col justify-end gap-3">
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
                                <th>Subject Code</th>
                                <th>Subject Description</th>
                                <th>Student Name</th>
                                <th>School Year</th>
                                <th>Yr/Sec</th>
                                <th>Grade</th>
                                <th>Remarks</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(row, rowIndex) in message.tableRows" :key="`${row.subjectCode || row.subjectDescription || 'row'}-${rowIndex}`">
                                <td>{{ row.subjectCode }}</td>
                                <td>{{ row.subjectDescription }}</td>
                                <td>{{ row.studentName }}</td>
                                <td>{{ row.schoolYear }}</td>
                                <td>{{ row.yearSection }}</td>
                                <td>{{ row.grade }}</td>
                                <td>{{ row.remarks }}</td>
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
                        {{ isInquiryProcessing ? 'Checking...' : 'Send' }}
                      </button>
                    </div>
                  </form>
                </div>
                <div v-if="conversationStep === 'await_guest_email'" class="chat-row chat-row--ai">
                  <form class="chat-inline-form" @submit.prevent="submitInlineGuestEmail">
                    <label class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Email Verification</label>
                    <div class="mt-2 flex items-center gap-2">
                      <input
                        ref="inlineGuestEmailFieldRef"
                        v-model="inlineGuestEmailInput"
                        type="email"
                        placeholder="your school email"
                        class="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="submit"
                        class="rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
                        :disabled="isProcessing || !inlineGuestEmailInput.trim()"
                      >
                        {{ isInquiryProcessing ? 'Verifying...' : 'Verify' }}
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
                </div>
              </div>
          

            <div class="grid gap-4">
              <!-- Student Inquiry Section -->
              <div v-if="canInquire" class="rounded-2xl border border-slate-200/70 bg-white p-4 sm:p-6 shadow-sm">
                <div class="flex flex-col w-full h-full">
                  <label class="text-xs font-black text-slate-500 uppercase tracking-widest">Chat</label>
                  <div class="flex items-center justify-between gap-3">
                    <div class="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white shadow-sm">
                      Quick Options
                    </div>
                    <button
                      type="button"
                      class="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white p-2 text-slate-600 transition hover:bg-slate-50 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                      :disabled="isProcessing"
                      title="Reset inquiry conversation"
                      aria-label="Reset inquiry conversation"
                      @click="handleResetButtonClick"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M3 2v6h6" />
                        <path d="M3 8a9 9 0 1 0 3-6.7L3 4" />
                      </svg>
                    </button>
                  </div>
                  <div class="mt-2 space-y-2 rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-200 via-blue-50 to-emerald-200 p-3">
                    <div class="flex flex-wrap gap-2">
                      <button
                        v-for="tab in primaryTabs"
                        :key="tab.id"
                        :disabled="isOptionDisabled(tab)"
                        class="rounded-xl px-3 py-2 text-xs font-semibold transition border"
                        :class="[
                          activePrimaryTab === tab.id
                            ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-blue-600 shadow-sm'
                            : 'bg-yellow-100 text-slate-700 border-blue-100 hover:bg-blue-50 hover:border-blue-200',
                          isOptionDisabled(tab) ? 'opacity-50 cursor-not-allowed hover:bg-white' : ''
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
                          :disabled="isOptionDisabled(option)"
                          class="rounded-xl px-3 py-2 text-xs font-semibold transition border"
                          :class="[
                            activeSecondaryTab === option.id
                              ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white border-emerald-600 shadow-sm'
                              : 'bg-yellow-100 text-slate-700 border-emerald-100 hover:bg-emerald-50 hover:border-emerald-200',
                            isOptionDisabled(option) ? 'opacity-50 cursor-not-allowed hover:bg-white' : ''
                          ]"
                          @click="handleOptionSelect(option)"
                        >
                          {{ option.label }}
                        </button>
                    </div>
                    <div class="pointer-events-none rounded-xl border border-cyan-100 bg-white/80 p-1.5 flex items-center justify-center min-h-[96px]">
                      <DotLottieVue
                        ref="lottieRef"
                        class="h-48 w-48 fixed sm:h-44 sm:w-44 "
                        :autoplay="true"
                        :loop="true"
                        src="/images/x-AI-n.json"
                      />
                    </div>
                  </div>

                    <input
                      v-model="chatInput"
                      type="text"
                      :placeholder="chatPlaceholder"
                      :disabled="conversationStep === 'await_student_id' || conversationStep === 'await_guest_email'"
                      class="mt-2 px-4 py-3 rounded-2xl border-2 outline-none text-slate-800 font-semibold transition"
                      :class="[
                        isInputRequired
                          ? 'border-emerald-400 focus:border-emerald-500 ring-1 ring-emerald-200 bg-emerald-50/40'
                          : 'border-slate-200 focus:border-blue-500 bg-white'
                      ]"
                      @keydown.enter.prevent="handleChatSubmit"
                    />
                  <button
                    class="mt-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-400 text-white font-bold text-sm sm:text-base hover:bg-blue-700 transition shadow-sm"
                    @click="handleChatSubmit"
                    :disabled="!canSubmitChat"
                  >
                    {{ chatSubmitLabel }}
                  </button>
                  <div v-if="showSuggestions" class="mt-2">
                    <div class="text-[11px] font-semibold uppercase tracking-widest text-slate-400">{{ t('suggest_label') }}</div>
                    <div class="mt-1 flex flex-wrap gap-2">
                      <button
                        v-for="prompt in displayedPrompts"
                        :key="prompt"
                        type="button"
                        class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                        @click="submitSuggestedPrompt(prompt)"
                      >
                        {{ prompt }}
                      </button>
                    </div>
                  </div>
                  <div class="mt-2 text-xs text-slate-400">
                    Session ID (optional): <span class="font-semibold">{{ sessionStudentId || 'Not available' }}</span>
                  </div>
                </div>
              </div>

              <div v-if="isGuest" class="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-700">
                Public mode enabled. Grade inquiry requires student ID and matching school email verification.
              </div>
              <div v-if="errorMessage" class="rounded-2xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
                {{ errorMessage }}
              </div>
              <div v-if="successMessage" class="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-700">
                {{ successMessage }}
              </div>
            </div>
          </div>
  </div>
          <!-- Column 3: Results / Registrar tools -->
          <div class="space-y-4 ">
            <div class="rounded-2xl border border-slate-200/70 bg-white p-4 sm:p-6 shadow-sm">
              <div class="text-xs font-semibold uppercase tracking-widest text-slate-500">Quick Options</div>
              <h3 class="text-base sm:text-lg font-bold text-slate-800 mt-1">About This Chatbot</h3>
              <p class="text-xs sm:text-sm text-slate-500 mt-2">
                This assistant helps with grade inquiry, document request guidance, and school service information.
              </p>

              <div class="mt-4 grid gap-3 text-sm">
                <div class="flex items-start gap-3">
                  <span class="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold">1</span>
                  <span class="text-slate-700">Use Quick Options to start faster instead of typing from scratch.</span>
                </div>
                <div class="flex items-start gap-3">
                  <span class="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-white text-xs font-bold">2</span>
                  <span class="text-slate-700">For grade inquiry, student ID is required. Guests also need school email verification.</span>
                </div>
                <div class="flex items-start gap-3">
                  <span class="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-bold">3</span>
                  <span class="text-slate-700">Responses can include status updates, grade tables, and request/ticket instructions.</span>
                </div>
              </div>

              <div v-if="isStudent" class="mt-4 text-xs text-slate-600 rounded-xl border border-blue-100 bg-blue-50 p-3">
                Student mode: Grade inquiry, document requests, and ticket tracking are enabled.
              </div>
              <div v-else-if="canUploadGrades" class="mt-4 text-xs text-slate-600 rounded-xl border border-emerald-100 bg-emerald-50 p-3">
                Staff mode: Upload tools, classroom controls, and registrar/instructor actions are enabled.
              </div>
              <div v-else-if="isGuest" class="mt-4 text-xs text-slate-600 rounded-xl border border-amber-100 bg-amber-50 p-3">
                Guest mode: Public guidance is available. Grade viewing requires identity verification.
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
                  :disabled="isTicketServiceDisabled(option)"
                  class="rounded-xl px-3 py-2 text-xs font-semibold transition border"
                  :class="[
                    ticketForm.service === option
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50',
                    isTicketServiceDisabled(option) ? 'opacity-50 cursor-not-allowed hover:bg-white' : ''
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
                    {{ isTicketProcessing ? 'Submitting...' : 'Submit Ticket' }}
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
                  {{ isUploadProcessing ? 'Uploading...' : 'Upload to Database' }}
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

            <div v-if="isInstructor" class="rounded-2xl border border-slate-200/70 bg-white p-4 sm:p-6 shadow-sm">
              <h3 class="text-base sm:text-lg font-bold text-slate-800">My Subject Document Links</h3>
              <p class="text-xs text-slate-500 mt-1">Add per-subject links for your uploaded/reference documents.</p>

              <div class="mt-3 grid gap-2">
                <input
                  v-model="instructorDocForm.subjectLabel"
                  type="text"
                  placeholder="Subject label (e.g. DM103 - Section A)"
                  class="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                />
                <input
                  v-model="instructorDocForm.url"
                  type="url"
                  placeholder="Document link (Google Drive / Sheets / PDF)"
                  class="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                />
                <button
                  class="rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                  :disabled="isSavingInstructorDoc || !instructorDocForm.subjectLabel.trim() || !instructorDocForm.url.trim()"
                  @click="handleAddInstructorDocument"
                >
                  {{ isSavingInstructorDoc ? 'Saving...' : 'Save Link' }}
                </button>
              </div>

              <div v-if="instructorDocuments.length" class="mt-4 overflow-x-auto">
                <table class="min-w-full text-sm">
                  <thead>
                    <tr class="border-b border-slate-200 text-left text-slate-500">
                      <th class="py-2 pr-3 font-semibold">Subject</th>
                      <th class="py-2 pr-3 font-semibold">Link</th>
                      <th class="py-2 pr-3 font-semibold">Added</th>
                      <th class="py-2 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="doc in instructorDocuments" :key="doc.id" class="border-b border-slate-100">
                      <td class="py-2 pr-3 font-medium text-slate-700">{{ doc.subjectLabel }}</td>
                      <td class="py-2 pr-3">
                        <a
                          :href="doc.url"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="text-blue-600 hover:underline break-all"
                        >
                          Open Link
                        </a>
                      </td>
                      <td class="py-2 pr-3 text-slate-500">{{ formatDocDate(doc.createdAt) }}</td>
                      <td class="py-2">
                        <button
                          class="rounded-lg bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-100 disabled:opacity-60"
                          :disabled="deletingInstructorDocId === doc.id"
                          @click="handleDeleteInstructorDocument(doc.id)"
                        >
                          {{ deletingInstructorDocId === doc.id ? 'Removing...' : 'Remove' }}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-else class="mt-4 text-sm text-slate-500">No subject document links yet.</div>
            </div>

            <div v-if="isRegistrar" class="rounded-2xl border border-slate-200/70 bg-white p-4 sm:p-6 shadow-sm">
              <h3 class="text-base sm:text-lg font-bold text-slate-800">Instructor Document Registry</h3>
              <p class="text-xs text-slate-500 mt-1">Grouped by instructor email with subject labels and links.</p>

              <div class="mt-3">
                <input
                  v-model="registrarDocumentSearchQuery"
                  type="text"
                  placeholder="Search by instructor email or subject label"
                  class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                />
              </div>

              <div v-if="registrarDocumentGroups.length" class="mt-4 space-y-4">
                <div
                  v-for="group in registrarDocumentGroups"
                  :key="group.email"
                  class="rounded-xl border border-slate-200 bg-slate-50 p-3"
                >
                  <div class="text-xs font-semibold uppercase tracking-widest text-slate-500">Instructor</div>
                  <div class="text-sm font-bold text-slate-800 mt-1">{{ group.email }}</div>

                  <div class="mt-2 overflow-x-auto">
                    <table class="min-w-full text-sm">
                      <thead>
                        <tr class="border-b border-slate-200 text-left text-slate-500">
                          <th class="py-2 pr-3 font-semibold">Subject</th>
                          <th class="py-2 pr-3 font-semibold">Link</th>
                          <th class="py-2 pr-3 font-semibold">Added</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="doc in group.rows" :key="doc.id" class="border-b border-slate-100">
                          <td class="py-2 pr-3 font-medium text-slate-700">{{ doc.subjectLabel }}</td>
                          <td class="py-2 pr-3">
                            <a
                              :href="doc.url"
                              target="_blank"
                              rel="noopener noreferrer"
                              class="text-blue-600 hover:underline break-all"
                            >
                              Open Link
                            </a>
                          </td>
                          <td class="py-2 pr-3 text-slate-500">{{ formatDocDate(doc.createdAt) }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div v-else class="mt-4 text-sm text-slate-500">
                {{ registrarDocumentSearchQuery.trim() ? 'No matching instructor links found.' : 'No instructor document links available.' }}
              </div>
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
                      <div class="text-xs text-slate-500 mt-1">
                        {{ grade.studentName || 'N/A' }} | {{ grade.academicYear || 'N/A' }} | {{ grade.yearSection || 'N/A' }}
                      </div>
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
import { getStudentById, verifyStudentIdentity } from '@/firebase/studentService'
import { getSubjectsByProgram } from '@/firebase/subjectService'
import { getStudentEnrollments } from '@/firebase/classroomService'
import { createInquiryTicket, listStudentTicketsByStudentId, subscribeRegistrarTickets, subscribeStudentTickets } from '@/firebase/ticketService'
import {
  addInstructorDocumentLink,
  deleteInstructorDocumentLink,
  listAllInstructorDocumentLinks,
  listInstructorDocumentLinksByEmail
} from '@/firebase/instructorDocumentService'
import ProspectusYearTable from '@/Components/ProspectusYearTable.vue'

const { role, userProfile } = useAuth()

const resolvedRole = computed(() => role.value || userProfile.value?.role || '')
const isGuest = computed(() => !resolvedRole.value)
const isRegistrar = computed(() => resolvedRole.value === 'role_registrar')
const isInstructor = computed(() => resolvedRole.value === 'role_instructor')
const isStudent = computed(() => resolvedRole.value === 'role_student')
const canUploadGrades = computed(() => isRegistrar.value || isInstructor.value)
const canInquire = computed(() => isStudent.value || isGuest.value)
const botLanguage = ref('en')
const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'tl', label: 'Tagalog' },
  { value: 'hil', label: 'Hiligaynon' }
]

const i18n = {
  en: {
    seed_upload_hello: 'Hello, {name}. Upload grade files to update the database.',
    seed_guest_hello: 'Hello. Public grade inquiry is available.',
    seed_user_hello: 'Hello, {name}. How are you?',
    seed_upload_hint: 'Upload history and registrar actions are on the right.',
    seed_guest_hint: 'For student-specific data, I will verify student ID and school email first.',
    seed_user_hint: 'I am your assistant for today.',
    seed_upload_parsed: 'Parsed rows will show here before you send them to Firestore.',
    seed_user_service: 'How can I be of service?',
    seed_upload_need: 'Need anything else?',
    seed_user_mind: 'Do you have something in mind?',
    ph_student_id: 'Enter your student ID (e.g., 21-1234)',
    ph_verify_email: 'Enter your school email for verification',
    ph_doc_wait_id: 'Enter your student ID to continue the request',
    ph_grade_confirm: 'Confirm your student ID or choose a quick option',
    ph_doc_contact: 'Enter your contact (email or phone)',
    ph_doc_purpose: 'Enter the purpose of your request',
    ph_doc_notes: 'Add notes or type "skip"',
    ph_documents: 'Pick a document from quick options',
    ph_services: 'Pick a service from quick options',
    ph_default: 'Type a request like: Show my grades',
    msg_enter_email_verify: 'Now enter your school email to verify identity.',
    msg_checking_grades: 'Checking grades for {studentId}...',
    msg_verifying_identity: 'Verifying identity for {studentId}...',
    msg_confirm_student_id: 'Please confirm your student ID to proceed.',
    msg_choose_quick_option: 'Choose a quick option below to continue.',
    msg_service_locked_flow: 'Service locked for this flow. Click the reset button to switch service.',
    msg_flow_active_back: 'your inquiry is out of the current choosen services, kindly click reset button to open new conversation for services',
    msg_finish_doc_first: 'Please finish the current document request first.',
    msg_grade_selected_lock: 'Grade Inquiry selected. Other options are disabled until you click reset.',
    msg_documents_selected_lock: 'Document Requests selected. Other options are disabled until you click reset.',
    msg_services_selected_lock: 'Other Services selected. Other options are disabled until you click reset.',
    msg_select_document: 'Select the document you want to request.',
    msg_select_service_info: 'Select a service for more info.',
    msg_session_id_unavailable: 'Session ID not available. Please enter your student ID.',
    msg_using_session_checking: 'Using session ID {studentId}. Checking grades...',
    msg_type_student_id_continue: 'Please type your student ID to continue.',
    msg_using_session_open_tor: 'Using session ID {studentId}. Opening TOR / Prospectus...',
    msg_need_id_tor_guest: 'Please type your student ID. We will verify your school email before showing TOR / Prospectus.',
    msg_need_id_tor: 'Please type your student ID to open TOR / Prospectus view.',
    msg_info_handled_direct: '{label} inquiries are handled directly in chat. Ask your question and I will assist you.',
    msg_selection_unlocked: 'Selection unlocked. You can now choose another service.',
    msg_choose_option_continue: 'Choose an option to continue.',
    msg_no_pending_doc: 'No pending document request found. Choose an option to continue.',
    msg_doc_purpose_question: 'What is the purpose of this document request?',
    msg_doc_notes_question: 'Any additional notes? Type "skip" to leave it blank.',
    msg_student_id_required_proceed: 'Student ID is required to proceed. Please enter your student ID.',
    msg_document_request_started: 'Document request started: {service}.',
    msg_provide_contact: 'Please provide your contact (email or phone).',
    msg_ticket_submission_failed: 'Ticket submission failed. Please try again.',
    msg_request_noted: 'Request noted for {service}. Ticket ID: {ticketId}.',
    msg_ticket_submitted_service: 'Ticket submitted for {service}. Transaction ID: {ticketId}.',
    msg_verify_email_required: 'Enter your school email to verify identity.',
    msg_verification_failed: 'Verification failed. Please check your student ID and school email, then try again.',
    msg_student_not_found: 'Student record not found. Please verify your student ID.',
    msg_records_found_for: 'Found {count} record(s). Here are the latest details:',
    msg_latest_grade_records: 'Latest grade records:',
    msg_no_direct_loaded_tor: 'No direct grade rows were found. I loaded your TOR / Prospectus subjects so you can still review your curriculum.',
    msg_guest_doc_selected: 'You selected "{service}". Guests can browse requirements, but ticket submission requires a signed-in student account.',
    msg_service_available_chat: '{service} is available in chat. Ask your question and I will help.',
    msg_selected_complete_ticket: 'Selected "{service}". Please complete the Request Document Ticket form in the ticket section for transaction tracing.',
    msg_service_handled_no_ticket: '{service} is handled directly in chat. No ticket is required.',
    msg_ticket_service_locked: 'You selected "{service}" first. Click reset before choosing another service.',
    msg_ticket_service_selected_lock: 'Service "{service}" selected. Other service buttons are now disabled. Click reset to switch.',
    msg_language_changed: 'Language changed to {language}.',
    msg_greeting_response: 'Hi {name}, I am here. You can ask grades, TOR/Prospectus, or document requests.',
    msg_thanks_response: 'You are welcome. If you want, I can continue with your next request.',
    msg_help_response: 'I can help with: Grade Inquiry, TOR/Prospectus view, Document Requests, and registrar-related guidance.',
    msg_service_info_enrollment: 'For enrollment assistance: prepare your student ID, latest enrollment form, and required clearances.',
    msg_service_info_records: 'For student records: provide your student ID and the specific document you need so we can guide the process.',
    msg_service_info_announcements: 'For announcements: check the Announcements section for the latest official updates.',
    msg_unclear_response: 'I did not fully catch that yet. Try: "show my grades", "open TOR", or "request certificate of grades".',
    msg_llm_fallback_error: 'I could not reach the assistant fallback right now. Please try again or use the quick options.',
    suggest_label: 'Suggestions',
    suggest_grades: 'Show my grades',
    suggest_tor: 'Open TOR / Prospectus',
    suggest_certificate: 'Request certificate of grades',
    suggest_enrollment: 'I need enrollment assistance',
    suggest_records: 'How to request student records'
  },
  tl: {
    seed_upload_hello: 'Kumusta, {name}. Mag-upload ng grade files para ma-update ang database.',
    seed_guest_hello: 'Kumusta. Available ang public grade inquiry.',
    seed_user_hello: 'Kumusta, {name}. Kamusta ka?',
    seed_upload_hint: 'Makikita sa kanan ang upload history at registrar actions.',
    seed_guest_hint: 'Para sa student-specific data, ibe-verify ko muna ang student ID at school email.',
    seed_user_hint: 'Ako ang assistant mo ngayon.',
    seed_upload_parsed: 'Lalabas dito ang parsed rows bago mo ipadala sa Firestore.',
    seed_user_service: 'Paano kita matutulungan?',
    seed_upload_need: 'May iba ka pa bang kailangan?',
    seed_user_mind: 'May gusto ka bang itanong?',
    ph_student_id: 'Ilagay ang iyong student ID (hal. 21-1234)',
    ph_verify_email: 'Ilagay ang iyong school email para sa verification',
    ph_doc_wait_id: 'Ilagay ang iyong student ID para magpatuloy sa request',
    ph_grade_confirm: 'Kumpirmahin ang student ID o pumili ng quick option',
    ph_doc_contact: 'Ilagay ang contact mo (email o phone)',
    ph_doc_purpose: 'Ilagay ang purpose ng request',
    ph_doc_notes: 'Maglagay ng notes o i-type ang "skip"',
    ph_documents: 'Pumili ng dokumento sa quick options',
    ph_services: 'Pumili ng service sa quick options',
    ph_default: 'Mag-type ng request tulad ng: Show my grades',
    msg_enter_email_verify: 'Ilagay naman ang school email mo para sa verification.',
    msg_checking_grades: 'Sinusuri ang grades para kay {studentId}...',
    msg_verifying_identity: 'Tine-verify ang identity para kay {studentId}...',
    msg_confirm_student_id: 'Pakikumpirma ang student ID mo para magpatuloy.',
    msg_choose_quick_option: 'Pumili ng quick option sa ibaba para magpatuloy.',
    msg_service_locked_flow: 'Naka-lock ang service para sa flow na ito. I-click ang reset button para magpalit.',
    msg_flow_active_back: 'your inquiry is out of the current choosen services, kindly click reset button to open new conversation for services',
    msg_finish_doc_first: 'Tapusin muna ang kasalukuyang document request.',
    msg_grade_selected_lock: 'Napili ang Grade Inquiry. Disabled muna ang ibang options hanggang i-click mo ang reset.',
    msg_documents_selected_lock: 'Napili ang Document Requests. Disabled muna ang ibang options hanggang i-click mo ang reset.',
    msg_services_selected_lock: 'Napili ang Other Services. Disabled muna ang ibang options hanggang i-click mo ang reset.',
    msg_select_document: 'Piliin ang dokumentong gusto mong i-request.',
    msg_select_service_info: 'Pumili ng service para sa karagdagang info.',
    msg_session_id_unavailable: 'Walang available na session ID. Pakilagay ang student ID mo.',
    msg_using_session_checking: 'Ginagamit ang session ID {studentId}. Sinusuri ang grades...',
    msg_type_student_id_continue: 'Pakitype ang student ID mo para magpatuloy.',
    msg_using_session_open_tor: 'Ginagamit ang session ID {studentId}. Binubuksan ang TOR / Prospectus...',
    msg_need_id_tor_guest: 'Pakitype ang student ID mo. Ibe-verify muna ang school email bago ipakita ang TOR / Prospectus.',
    msg_need_id_tor: 'Pakitype ang student ID mo para buksan ang TOR / Prospectus view.',
    msg_info_handled_direct: 'Ang {label} inquiries ay diretsong hinahandle sa chat. Magtanong ka lang at tutulungan kita.',
    msg_selection_unlocked: 'Na-unlock na ang selection. Maaari ka nang pumili ng ibang service.',
    msg_choose_option_continue: 'Pumili ng option para magpatuloy.',
    msg_no_pending_doc: 'Walang pending document request. Pumili ng option para magpatuloy.',
    msg_doc_purpose_question: 'Ano ang purpose ng document request na ito?',
    msg_doc_notes_question: 'May dagdag na notes ka ba? I-type ang "skip" kung wala.',
    msg_student_id_required_proceed: 'Kailangan ang student ID para magpatuloy. Pakilagay ang student ID mo.',
    msg_document_request_started: 'Nagsimula ang document request: {service}.',
    msg_provide_contact: 'Pakibigay ang contact mo (email o phone).',
    msg_ticket_submission_failed: 'Hindi naisumite ang ticket. Pakisubukan ulit.',
    msg_request_noted: 'Naitala ang request para sa {service}. Ticket ID: {ticketId}.',
    msg_ticket_submitted_service: 'Naisumite ang ticket para sa {service}. Transaction ID: {ticketId}.',
    msg_verify_email_required: 'Ilagay ang school email mo para sa verification.',
    msg_verification_failed: 'Nabigo ang verification. Paki-check ang student ID at school email, tapos subukan ulit.',
    msg_student_not_found: 'Hindi nakita ang student record. Paki-verify ang student ID mo.',
    msg_records_found_for: 'May {count} record(s). Narito ang pinakabagong detalye:',
    msg_latest_grade_records: 'Pinakabagong grade records:',
    msg_no_direct_loaded_tor: 'Walang direct grade rows na nakita. Na-load ko ang TOR / Prospectus subjects mo para ma-review mo pa rin ang curriculum.',
    msg_guest_doc_selected: 'Napili mo ang "{service}". Puwedeng mag-browse ang guest ng requirements pero kailangan naka-sign in na student account para mag-submit ng ticket.',
    msg_service_available_chat: 'Available sa chat ang {service}. Magtanong ka lang at tutulungan kita.',
    msg_selected_complete_ticket: 'Napili ang "{service}". Kumpletuhin ang Request Document Ticket form sa ticket section para sa transaction tracing.',
    msg_service_handled_no_ticket: 'Ang {service} ay hinahandle direkta sa chat. Walang ticket na kailangan.',
    msg_ticket_service_locked: 'Napili mo na muna ang "{service}". I-click ang reset bago pumili ng ibang service.',
    msg_ticket_service_selected_lock: 'Napili ang service na "{service}". Disabled muna ang ibang service buttons. I-click ang reset para magpalit.',
    msg_language_changed: 'Napalitan na ang wika sa {language}.',
    msg_greeting_response: 'Hi {name}, nandito ako. Maaari kang magtanong ng grades, TOR/Prospectus, o document requests.',
    msg_thanks_response: 'Walang anuman. Kung gusto mo, ituloy natin ang susunod mong request.',
    msg_help_response: 'Matutulungan kita sa: Grade Inquiry, TOR/Prospectus view, Document Requests, at registrar-related guidance.',
    msg_service_info_enrollment: 'Para sa enrollment assistance: ihanda ang student ID, latest enrollment form, at required clearances.',
    msg_service_info_records: 'Para sa student records: ibigay ang student ID at specific document na kailangan mo para maguide ka namin.',
    msg_service_info_announcements: 'Para sa announcements: tingnan ang Announcements section para sa pinakabagong official updates.',
    msg_unclear_response: 'Hindi ko pa lubos nakuha. Subukan mo: "show my grades", "open TOR", o "request certificate of grades".',
    msg_llm_fallback_error: 'Hindi ko maabot ang assistant fallback ngayon. Pakisubukan ulit o gamitin ang quick options.',
    suggest_label: 'Mga Suggestion',
    suggest_grades: 'Ipakita ang grades ko',
    suggest_tor: 'Buksan ang TOR / Prospectus',
    suggest_certificate: 'Mag-request ng certificate of grades',
    suggest_enrollment: 'Kailangan ko ng enrollment assistance',
    suggest_records: 'Paano mag-request ng student records'
  },
  hil: {
    seed_upload_hello: 'Maayong adlaw, {name}. Mag-upload sang grade files para ma-update ang database.',
    seed_guest_hello: 'Maayong adlaw. Available ang public grade inquiry.',
    seed_user_hello: 'Maayong adlaw, {name}. Kumusta ka?',
    seed_upload_hint: 'Ara sa tuo ang upload history kag registrar actions.',
    seed_guest_hint: 'Para sa student-specific data, i-verify ko anay ang student ID kag school email.',
    seed_user_hint: 'Ako ang imo assistant subong.',
    seed_upload_parsed: 'Maguwa diri ang parsed rows antes ipadala sa Firestore.',
    seed_user_service: 'Paano ko ikaw mabuligan?',
    seed_upload_need: 'May iban ka pa nga kinahanglan?',
    seed_user_mind: 'May pamangkot ka bala?',
    ph_student_id: 'Ibutang ang imo student ID (hal. 21-1234)',
    ph_verify_email: 'Ibutang ang imo school email para sa verification',
    ph_doc_wait_id: 'Ibutang ang imo student ID para magpadayon sa request',
    ph_grade_confirm: 'I-confirm ang student ID ukon pili sang quick option',
    ph_doc_contact: 'Ibutang ang imo contact (email ukon phone)',
    ph_doc_purpose: 'Ibutang ang purpose sang imo request',
    ph_doc_notes: 'Magbutang notes ukon i-type ang "skip"',
    ph_documents: 'Pili sang dokumento sa quick options',
    ph_services: 'Pili sang service sa quick options',
    ph_default: 'Mag-type request pareho sang: Show my grades',
    msg_enter_email_verify: 'Sunod, ibutang ang imo school email para sa verification.',
    msg_checking_grades: 'Ginacheck ang grades para kay {studentId}...',
    msg_verifying_identity: 'Ginaverify ang identity para kay {studentId}...',
    msg_confirm_student_id: 'Palihog confirm sang imo student ID para makapadayon.',
    msg_choose_quick_option: 'Pili sang quick option sa idalom para magpadayon.',
    msg_service_locked_flow: 'Naka-lock ang service para sini nga flow. I-click ang reset button para mag-ilis.',
    msg_flow_active_back: 'your inquiry is out of the current choosen services, kindly click reset button to open new conversation for services',
    msg_finish_doc_first: 'Tapusa anay ang kasubong nga document request.',
    msg_grade_selected_lock: 'Napilian ang Grade Inquiry. Disabled anay ang iban nga options tubtob i-click mo ang reset.',
    msg_documents_selected_lock: 'Napilian ang Document Requests. Disabled anay ang iban nga options tubtob i-click mo ang reset.',
    msg_services_selected_lock: 'Napilian ang Other Services. Disabled anay ang iban nga options tubtob i-click mo ang reset.',
    msg_select_document: 'Pili-a ang dokumento nga gusto mo i-request.',
    msg_select_service_info: 'Pili sang service para sa dugang nga impormasyon.',
    msg_session_id_unavailable: 'Wala sang available nga session ID. Palihog butang sang imo student ID.',
    msg_using_session_checking: 'Ginausar ang session ID {studentId}. Ginacheck ang grades...',
    msg_type_student_id_continue: 'Palihog i-type ang imo student ID para magpadayon.',
    msg_using_session_open_tor: 'Ginausar ang session ID {studentId}. Ginabuksan ang TOR / Prospectus...',
    msg_need_id_tor_guest: 'Palihog i-type ang imo student ID. I-verify anay ang school email antes ipakita ang TOR / Prospectus.',
    msg_need_id_tor: 'Palihog i-type ang imo student ID para mabuksan ang TOR / Prospectus view.',
    msg_info_handled_direct: 'Ang {label} inquiries ginahandle direkta sa chat. Pamangkot lang kag buligan ta ikaw.',
    msg_selection_unlocked: 'Na-unlock na ang selection. Makapili ka na sang iban nga service.',
    msg_choose_option_continue: 'Pili sang option para magpadayon.',
    msg_no_pending_doc: 'Wala pending document request. Pili sang option para magpadayon.',
    msg_doc_purpose_question: 'Ano ang purpose sini nga document request?',
    msg_doc_notes_question: 'May dugang ka nga notes? I-type ang "skip" kon wala.',
    msg_student_id_required_proceed: 'Kinahanglan ang student ID para magpadayon. Palihog ibutang ang imo student ID.',
    msg_document_request_started: 'Nagsugod ang document request: {service}.',
    msg_provide_contact: 'Palihog ihatag ang imo contact (email ukon phone).',
    msg_ticket_submission_failed: 'Wala na-submit ang ticket. Palihog liwat liwat.',
    msg_request_noted: 'Natala ang request para sa {service}. Ticket ID: {ticketId}.',
    msg_ticket_submitted_service: 'Na-submit ang ticket para sa {service}. Transaction ID: {ticketId}.',
    msg_verify_email_required: 'Ibutang ang imo school email para sa verification.',
    msg_verification_failed: 'Napaslawan ang verification. Pakicheck ang student ID kag school email, dayon liwat.',
    msg_student_not_found: 'Wala nakita ang student record. Palihog verify sang imo student ID.',
    msg_records_found_for: 'May {count} ka record(s). Amo ini ang pinakabag-o nga detalye:',
    msg_latest_grade_records: 'Pinakabag-o nga grade records:',
    msg_no_direct_loaded_tor: 'Wala direct grade rows nga nakita. Gina-load ko ang imo TOR / Prospectus subjects para ma-review mo gihapon ang curriculum.',
    msg_guest_doc_selected: 'Napilian mo ang "{service}". Pwede ang guest mag-browse sang requirements pero kinahanglan naka-sign in nga student account para makasubmit ticket.',
    msg_service_available_chat: 'Available sa chat ang {service}. Pamangkot lang kag buligan ta ikaw.',
    msg_selected_complete_ticket: 'Napilian ang "{service}". Kumpletuha ang Request Document Ticket form sa ticket section para sa transaction tracing.',
    msg_service_handled_no_ticket: 'Ang {service} ginahandle direkta sa chat. Wala na ticket nga kinahanglan.',
    msg_ticket_service_locked: 'Napilian mo anay ang "{service}". I-click ang reset antes magpili sang iban nga service.',
    msg_ticket_service_selected_lock: 'Napilian ang service nga "{service}". Disabled anay ang iban nga service buttons. I-click ang reset para mag-ilis.',
    msg_language_changed: 'Nailisan ang lengguwahe sa {language}.',
    msg_greeting_response: 'Hi {name}, ari ako. Pwede ka makapamangkot sang grades, TOR/Prospectus, ukon document requests.',
    msg_thanks_response: 'Wala sing ano man. Kon gusto mo, padayunon ta ang sunod mo nga request.',
    msg_help_response: 'Mabuligan ta ikaw sa: Grade Inquiry, TOR/Prospectus view, Document Requests, kag registrar-related guidance.',
    msg_service_info_enrollment: 'Para sa enrollment assistance: ihanda ang student ID, latest enrollment form, kag required clearances.',
    msg_service_info_records: 'Para sa student records: ihatag ang student ID kag specific nga dokumento nga kinahanglan mo para maguide ta ikaw.',
    msg_service_info_announcements: 'Para sa announcements: lantawa ang Announcements section para sa pinakabag-o nga official updates.',
    msg_unclear_response: 'Wala ko pa nakuhaan gid. Sulayi: "show my grades", "open TOR", ukon "request certificate of grades".',
    msg_llm_fallback_error: 'Hindi ko ma-reach ang assistant fallback subong. Palihog liwat ukon gamita ang quick options.',
    suggest_label: 'Mga Sugestyon',
    suggest_grades: 'Ipakita ang akon grades',
    suggest_tor: 'Buksan ang TOR / Prospectus',
    suggest_certificate: 'Mag-request certificate of grades',
    suggest_enrollment: 'Kinahanglan ko enrollment assistance',
    suggest_records: 'Paano mag-request student records'
  }
}

const t = (key, vars = {}) => {
  const langPack = i18n[botLanguage.value] || i18n.en
  const base = langPack[key] || i18n.en[key] || key
  return base.replace(/\{(\w+)\}/g, (_, name) => String(vars[name] ?? ''))
}

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
        ? t('seed_upload_hello', { name: sessionName.value })
        : isGuest.value
          ? t('seed_guest_hello')
          : t('seed_user_hello', { name: sessionName.value })
    },
    {
      role: 'assistant',
      text: canUploadGrades.value
        ? t('seed_upload_hint')
        : isGuest.value
          ? t('seed_guest_hint')
          : t('seed_user_hint')
    },
    {
      role: 'assistant',
      text: canUploadGrades.value
        ? t('seed_upload_parsed')
        : t('seed_user_service')
    },
    {
      role: 'assistant',
      text: canUploadGrades.value
        ? t('seed_upload_need')
        : t('seed_user_mind')
    }
  ]
}

watchEffect(() => {
  if (!messages.value.length) seedMessages()
})

watch(botLanguage, async () => {
  await pushAssistantMessage(
    t('msg_language_changed', {
      language: languageOptions.find((item) => item.value === botLanguage.value)?.label || 'English'
    }),
    'success'
  )
})

const uploadedFiles = ref([])
const parsedRecords = ref([])
const enteredStudentId = ref('')
const chatInput = ref('')
const conversationStep = ref('root')
const errorMessage = ref('')
const successMessage = ref('')
const isProcessing = ref(false)
const processingAction = ref('idle')
const matchedRecords = ref([])
const prospectusRows = ref([])
const gradeResultView = ref('grades')
const pendingGradeView = ref('grades')
const hasSearched = ref(false)
const uploadHistory = ref([])
const instructorDocuments = ref([])
const registrarDocuments = ref([])
const registrarDocumentSearchQuery = ref('')
const instructorDocForm = ref({
  subjectLabel: '',
  url: ''
})
const isSavingInstructorDoc = ref(false)
const deletingInstructorDocId = ref('')
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
const activeServiceLock = ref('')
const ticketServiceLock = ref('')
const selectedTicket = ref(null)
const lottieRef = ref(null)
const isLottiePlaying = ref(true)
const isTyping = ref(false)
const chatFeedRef = ref(null)
const inlineStudentIdFieldRef = ref(null)
const inlineStudentIdInput = ref('')
const inlineGuestEmailFieldRef = ref(null)
const inlineGuestEmailInput = ref('')
const guestEmail = ref('')
const verifiedGuestProfile = ref(null)
const llmSuggestedPrompts = ref([])

const startProcessing = (action) => {
  processingAction.value = action
  isProcessing.value = true
}

const stopProcessing = () => {
  isProcessing.value = false
  processingAction.value = 'idle'
}

const isInquiryProcessing = computed(() => isProcessing.value && processingAction.value === 'inquiry')
const isUploadProcessing = computed(() => isProcessing.value && processingAction.value === 'upload')
const isTicketProcessing = computed(() => isProcessing.value && processingAction.value === 'ticket')

const isChatInputLocked = computed(() =>
  conversationStep.value === 'await_student_id' || conversationStep.value === 'await_guest_email'
)
const hasChatInput = computed(() => Boolean(String(chatInput.value || '').trim()))
const canSubmitChat = computed(() => !isProcessing.value && !isChatInputLocked.value && hasChatInput.value)
const chatSubmitLabel = computed(() => (isInquiryProcessing.value ? 'Checking...' : 'Send'))

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
  enteredStudentId.value = value

  if (isGuest.value) {
    conversationStep.value = 'await_guest_email'
    await pushAssistantMessage(t('msg_enter_email_verify'))
    return
  }

  await pushAssistantMessage(t('msg_checking_grades', { studentId: enteredStudentId.value }))
  await handleInquiry(pendingGradeView.value)
  conversationStep.value = 'root'
  pendingGradeView.value = 'grades'
}

const submitInlineGuestEmail = async () => {
  const value = String(inlineGuestEmailInput.value || '').trim()
  if (!value || isProcessing.value) return

  pushMessage('user', value)
  inlineGuestEmailInput.value = ''
  guestEmail.value = value.toLowerCase()
  conversationStep.value = 'root'

  await pushAssistantMessage(t('msg_verifying_identity', { studentId: enteredStudentId.value }))
  await handleInquiry(pendingGradeView.value)
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
      await nextTick()
      inlineStudentIdFieldRef.value?.focus?.()
    }
    if (step === 'await_guest_email') {
      inlineGuestEmailInput.value = guestEmail.value || ''
      await nextTick()
      inlineGuestEmailFieldRef.value?.focus?.()
    }
    scrollChatToLatest()
  },
  { immediate: true }
)

const isInputRequired = computed(() =>
  [
    'await_student_id',
    'await_guest_email',
    'grade_confirm',
    'doc_wait_id',
    'doc_contact',
    'doc_purpose',
    'doc_notes'
  ].includes(conversationStep.value)
)

const chatPlaceholder = computed(() => {
  if (conversationStep.value === 'await_student_id') {
    return t('ph_student_id')
  }
  if (conversationStep.value === 'await_guest_email') {
    return t('ph_verify_email')
  }
  if (conversationStep.value === 'doc_wait_id') {
    return t('ph_doc_wait_id')
  }
  if (conversationStep.value === 'grade_confirm') {
    return t('ph_grade_confirm')
  }
  if (conversationStep.value === 'doc_contact') {
    return t('ph_doc_contact')
  }
  if (conversationStep.value === 'doc_purpose') {
    return t('ph_doc_purpose')
  }
  if (conversationStep.value === 'doc_notes') {
    return t('ph_doc_notes')
  }
  if (conversationStep.value === 'documents') {
    return t('ph_documents')
  }
  if (conversationStep.value === 'services') {
    return t('ph_services')
  }
  return t('ph_default')
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
  if (!canInquire.value) return []
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
    return options
  }
  if (conversationStep.value === 'documents') {
    return [
      { id: 'doc_cog', label: 'Certificate of Grades', action: 'ticket_doc' },
      { id: 'doc_tor', label: 'Transcript of Records (TOR)', action: 'ticket_doc' },
      { id: 'doc_diploma', label: 'Diploma Request', action: 'ticket_doc' },
      { id: 'doc_gm', label: 'Certification / Good Moral', action: 'ticket_doc' },
      { id: 'doc_grade_assess', label: 'Grade Assessment', action: 'ticket_doc' }
    ]
  }
  if (conversationStep.value === 'services') {
    return [
      { id: 'svc_prospectus', label: 'TOR / Prospectus View', action: 'show_prospectus' },
      { id: 'svc_enroll', label: 'Enrollment Assistance', action: 'info' },
      { id: 'svc_records', label: 'Student Records', action: 'info' },
      { id: 'svc_announce', label: 'Announcements', action: 'info' }
    ]
  }
  if (conversationStep.value === 'await_student_id' || conversationStep.value === 'await_guest_email') {
    return [{ id: 'cancel_id', label: 'Cancel', action: 'back' }]
  }
  return []
})

const getOptionGroup = (option) => {
  const action = String(option?.action || '')
  if (!action) return ''
  if (action === 'back') return 'back'
  if (['grade', 'use_session', 'enter_id', 'show_prospectus'].includes(action)) return 'grade'
  if (['documents', 'ticket_doc'].includes(action)) return 'documents'
  if (['services', 'info'].includes(action)) return 'services'
  return ''
}

const isOptionDisabled = (option) => {
  if (!activeServiceLock.value) return false
  const group = getOptionGroup(option)
  if (!group || group === 'back') return false
  return group !== activeServiceLock.value
}

const isTicketServiceDisabled = (serviceName) => {
  if (!ticketServiceLock.value) return false
  return ticketServiceLock.value !== serviceName
}

const clearServiceLocks = () => {
  activeServiceLock.value = ''
  ticketServiceLock.value = ''
}

const resetInquiryConversation = () => {
  conversationStep.value = 'root'
  pendingGradeView.value = 'grades'
  enteredStudentId.value = ''
  guestEmail.value = ''
  verifiedGuestProfile.value = null
  inlineStudentIdInput.value = ''
  inlineGuestEmailInput.value = ''
  llmSuggestedPrompts.value = []
  errorMessage.value = ''
  successMessage.value = ''
  matchedRecords.value = []
  prospectusRows.value = []
  hasSearched.value = false
  gradeResultView.value = 'grades'
  clearServiceLocks()
  seedMessages()
}

const handleResetButtonClick = () => {
  if (isProcessing.value) return
  resetInquiryConversation()
}

const showSuggestions = computed(() =>
  canInquire.value &&
  !isProcessing.value &&
  !['await_student_id', 'await_guest_email'].includes(conversationStep.value)
)

const suggestedPrompts = computed(() => {
  const prompts = [
    t('suggest_tor'),
    t('suggest_certificate'),
    t('suggest_enrollment'),
    t('suggest_records')
  ]
  if (!activeServiceLock.value) return prompts
  if (activeServiceLock.value === 'grade') return [t('suggest_tor')]
  if (activeServiceLock.value === 'documents') return [t('suggest_certificate')]
  if (activeServiceLock.value === 'services') return [t('suggest_enrollment'), t('suggest_records')]
  return prompts
})

const displayedPrompts = computed(() => {
  if (llmSuggestedPrompts.value.length) {
    return llmSuggestedPrompts.value.slice(0, 5)
  }
  return suggestedPrompts.value
})

const detectIntent = (rawText) => {
  const text = String(rawText || '').toLowerCase()
  const hasAny = (keywords) => keywords.some((kw) => text.includes(kw))

  if (hasAny(['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'kumusta', 'kamusta', 'maayong adlaw'])) {
    return { intent: 'greeting', group: '' }
  }
  if (hasAny(['thanks', 'thank you', 'salamat', 'thank'])) {
    return { intent: 'thanks', group: '' }
  }
  if (hasAny(['help', 'assist', 'tabang', 'tulong', 'guide'])) {
    return { intent: 'help', group: '' }
  }
  if (hasAny(['prospectus', 'tor view', 'tor / prospectus', 'open tor', 'tor'])) {
    return { intent: 'tor_view', group: 'grade' }
  }
  if (hasAny(['grade', 'grades', 'final grade', 'remark'])) {
    return { intent: 'grade_inquiry', group: 'grade' }
  }
  if (hasAny(['certificate of grades', 'certificate'])) {
    return { intent: 'document', group: 'documents', serviceName: 'Certificate of Grades' }
  }
  if (hasAny(['transcript', 'tor'])) {
    return { intent: 'document', group: 'documents', serviceName: 'Transcript of Records (TOR)' }
  }
  if (hasAny(['diploma'])) {
    return { intent: 'document', group: 'documents', serviceName: 'Diploma Request' }
  }
  if (hasAny(['good moral', 'certification'])) {
    return { intent: 'document', group: 'documents', serviceName: 'Certification / Good Moral' }
  }
  if (hasAny(['assessment'])) {
    return { intent: 'document', group: 'documents', serviceName: 'Grade Assessment' }
  }
  if (hasAny(['enrollment', 'enrol'])) {
    return { intent: 'service_info', group: 'services', topic: 'enrollment' }
  }
  if (hasAny(['records', 'student record'])) {
    return { intent: 'service_info', group: 'services', topic: 'records' }
  }
  if (hasAny(['announcement', 'announcements'])) {
    return { intent: 'service_info', group: 'services', topic: 'announcements' }
  }
  return { intent: 'unknown', group: '' }
}

const handleHybridFallback = async (rawText) => {
  try {
    const endpoint = import.meta.env.VITE_CHAT_FALLBACK_URL || '/api/hybrid-chat'
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      message: rawText,
      language: botLanguage.value,
      context: {
        isGuest: isGuest.value,
        isStudent: isStudent.value,
        conversationStep: conversationStep.value,
        activeServiceLock: activeServiceLock.value,
        isIdentityVerified: Boolean(verifiedGuestProfile.value)
      }
    })
    })

    if (!response.ok) {
      llmSuggestedPrompts.value = []
      return false
    }

    const payload = await response.json()
    const reply = String(payload.reply || '').trim()
    const suggestions = Array.isArray(payload.suggestions)
      ? payload.suggestions.map((item) => String(item).trim()).filter(Boolean)
      : []
    llmSuggestedPrompts.value = suggestions.slice(0, 5)

    if (payload.requiresVerification) {
      pendingGradeView.value = 'grades'
      conversationStep.value = 'await_student_id'
      await pushAssistantMessage(reply || t('msg_verify_email_required'), 'warning')
      return true
    }

    await pushAssistantMessage(reply || t('msg_unclear_response'))
    return true
  } catch (error) {
    llmSuggestedPrompts.value = []
    return false
  }
}

const primaryTabs = computed(() => {
  if (!canInquire.value) return []
  return [
    { id: 'grade', label: 'Grade Inquiry', action: 'grade' },
    { id: 'documents', label: 'Request Documents', action: 'documents' },
    { id: 'services', label: 'Other Services', action: 'services' }
  ]
})

const secondaryTabs = computed(() => {
  if (!canInquire.value) return []
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
    return options
  }
  if (conversationStep.value === 'documents') {
    return [
      { id: 'doc_cog', label: 'Certificate of Grades', action: 'ticket_doc' },
      { id: 'doc_tor', label: 'Transcript of Records (TOR)', action: 'ticket_doc' },
      { id: 'doc_diploma', label: 'Diploma Request', action: 'ticket_doc' },
      { id: 'doc_gm', label: 'Certification / Good Moral', action: 'ticket_doc' },
      { id: 'doc_grade_assess', label: 'Grade Assessment', action: 'ticket_doc' }
    ]
  }
  if (conversationStep.value === 'services') {
    return [
      { id: 'svc_prospectus', label: 'TOR / Prospectus View', action: 'show_prospectus' },
      { id: 'svc_enroll', label: 'Enrollment Assistance', action: 'info' },
      { id: 'svc_records', label: 'Student Records', action: 'info' },
      { id: 'svc_announce', label: 'Announcements', action: 'info' }
    ]
  }
  if (conversationStep.value === 'await_student_id' || conversationStep.value === 'await_guest_email') {
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

const extractTicketSubjectCodes = (rows = []) => {
  const codes = new Set()
  rows.forEach((ticket) => {
    const details = ticket?.details || {}
    const candidates = [
      details.subjectCode,
      details.subject,
      details.courseCode,
      details.code,
      details.relatedSubjectCode,
      ticket?.subjectCode,
      ticket?.subject
    ]
    candidates.forEach((value) => {
      const normalized = normalizeSubjectCode(value)
      if (normalized) codes.add(normalized)
    })
  })
  return Array.from(codes)
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
    studentName: grade.studentName || '',
    yearSection: grade.programYearSection || '',
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

const formatDocDate = (value) => {
  if (value?.toDate) return value.toDate().toLocaleString()
  if (typeof value === 'string' && value) return value
  return 'Pending timestamp'
}

const registrarDocumentGroups = computed(() => {
  const queryText = String(registrarDocumentSearchQuery.value || '').trim().toLowerCase()
  const filtered = !queryText
    ? registrarDocuments.value
    : registrarDocuments.value.filter((item) => {
      const email = String(item.uploaderEmail || '').trim().toLowerCase()
      const subject = String(item.subjectLabel || '').trim().toLowerCase()
      return email.includes(queryText) || subject.includes(queryText)
    })

  const grouped = new Map()
  filtered.forEach((item) => {
    const email = String(item.uploaderEmail || '').trim().toLowerCase() || 'unknown'
    if (!grouped.has(email)) grouped.set(email, [])
    grouped.get(email).push(item)
  })
  return Array.from(grouped.entries()).map(([email, rows]) => ({ email, rows }))
})

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

const loadInstructorDocuments = async () => {
  if (!isInstructor.value) {
    instructorDocuments.value = []
    return
  }
  const email = String(userProfile.value?.email || '').trim().toLowerCase()
  if (!email) {
    instructorDocuments.value = []
    return
  }
  const result = await listInstructorDocumentLinksByEmail(email, 50)
  if (result.success) {
    instructorDocuments.value = result.documents || []
  }
}

const loadRegistrarDocuments = async () => {
  if (!isRegistrar.value) {
    registrarDocuments.value = []
    return
  }
  const result = await listAllInstructorDocumentLinks(300)
  if (result.success) {
    registrarDocuments.value = result.documents || []
  }
}

const handleAddInstructorDocument = async () => {
  if (!isInstructor.value || isSavingInstructorDoc.value) return
  const subjectLabel = String(instructorDocForm.value.subjectLabel || '').trim()
  const url = String(instructorDocForm.value.url || '').trim()
  if (!subjectLabel || !url) {
    errorMessage.value = 'Subject label and document link are required.'
    return
  }

  isSavingInstructorDoc.value = true
  errorMessage.value = ''
  try {
    const result = await addInstructorDocumentLink({
      subjectLabel,
      url,
      uploaderEmail: userProfile.value?.email || '',
      uploaderName: sessionName.value
    })
    if (!result.success) {
      errorMessage.value = result.message || 'Unable to save document link.'
      return
    }
    successMessage.value = 'Document link saved.'
    instructorDocForm.value = { subjectLabel: '', url: '' }
    await loadInstructorDocuments()
  } catch (_) {
    errorMessage.value = 'Error saving document link.'
  } finally {
    isSavingInstructorDoc.value = false
  }
}

const handleDeleteInstructorDocument = async (id) => {
  if (!isInstructor.value || !id || deletingInstructorDocId.value) return
  deletingInstructorDocId.value = id
  errorMessage.value = ''
  try {
    const result = await deleteInstructorDocumentLink(id)
    if (!result.success) {
      errorMessage.value = result.message || 'Unable to remove document link.'
      return
    }
    successMessage.value = 'Document link removed.'
    await loadInstructorDocuments()
  } catch (_) {
    errorMessage.value = 'Error removing document link.'
  } finally {
    deletingInstructorDocId.value = ''
  }
}

onMounted(() => {
  loadUploadHistory()
  loadTickets()
  loadInstructorDocuments()
  loadRegistrarDocuments()
})

watch(
  [isStudent, canUploadGrades, resolvedStudentId],
  () => {
    loadTickets()
  }
)

watch(
  [isInstructor, () => userProfile.value?.email],
  () => {
    loadInstructorDocuments()
  }
)

watch(
  [isRegistrar, () => userProfile.value?.email],
  () => {
    loadRegistrarDocuments()
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

const selectTicketService = async (serviceName) => {
  if (ticketServiceLock.value && ticketServiceLock.value !== serviceName) {
    await pushAssistantMessage(t('msg_ticket_service_locked', { service: ticketServiceLock.value }), 'warning')
    return
  }
  if (!ticketServiceLock.value) {
    ticketServiceLock.value = serviceName
    await pushAssistantMessage(t('msg_ticket_service_selected_lock', { service: serviceName }), 'warning')
  }
  ticketForm.value.service = serviceName
  if (!ticketForm.value.studentId && resolvedStudentId.value) {
    ticketForm.value.studentId = resolvedStudentId.value
  }
}

const resetTicketForm = () => {
  ticketServiceLock.value = ''
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

  startProcessing('ticket')
  let ticketResult
  try {
    ticketResult = await createTicket(service, {
      requestType: ticketForm.value.requestType,
      priority: ticketForm.value.priority,
      purpose: String(ticketForm.value.purpose || '').trim(),
      contact: String(ticketForm.value.contact || '').trim(),
      comment,
      notes: String(ticketForm.value.notes || '').trim()
    })
  } finally {
    stopProcessing()
  }

  if (!ticketResult.success) {
    errorMessage.value = ticketResult.message || 'Unable to submit ticket.'
    return
  }

  const ticket = ticketResult.ticket
  successMessage.value = `Ticket submitted. Ticket ID: ${ticket.ticketId || ticket.id}.`
  await pushAssistantMessage(
    t('msg_ticket_submitted_service', { service, ticketId: ticket.ticketId || ticket.id }),
    'success'
  )
  resetTicketForm()
}

const startDocumentRequest = async (serviceName) => {
  pendingServiceName.value = serviceName
  requestForm.value = { purpose: '', contact: '', notes: '' }
  conversationStep.value = 'doc_contact'
  await pushAssistantMessage(t('msg_document_request_started', { service: serviceName }))
  await pushAssistantMessage(t('msg_provide_contact'))
}

const finalizeDocumentRequest = async () => {
  const ticketResult = await createTicket(pendingServiceName.value, {
    contact: requestForm.value.contact,
    purpose: requestForm.value.purpose,
    notes: requestForm.value.notes
  })
  if (!ticketResult.success) {
    errorMessage.value = ticketResult.message || 'Unable to submit request ticket.'
    await pushAssistantMessage(t('msg_ticket_submission_failed'), 'error')
    return
  }

  const ticket = ticketResult.ticket
  successMessage.value = `Request submitted. Ticket ID: ${ticket.ticketId || ticket.id}`
  await pushAssistantMessage(
    t('msg_request_noted', { service: ticket.service, ticketId: ticket.ticketId || ticket.id })
  )
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
  llmSuggestedPrompts.value = []

  if (conversationStep.value === 'doc_wait_id') {
    enteredStudentId.value = value
    if (!pendingServiceName.value) {
      conversationStep.value = 'root'
      await pushAssistantMessage(t('msg_no_pending_doc'))
      return
    }
    await startDocumentRequest(pendingServiceName.value)
    return
  }

  if (conversationStep.value === 'doc_contact') {
    requestForm.value.contact = value
    conversationStep.value = 'doc_purpose'
    await pushAssistantMessage(t('msg_doc_purpose_question'))
    return
  }

  if (conversationStep.value === 'doc_purpose') {
    requestForm.value.purpose = value
    conversationStep.value = 'doc_notes'
    await pushAssistantMessage(t('msg_doc_notes_question'))
    return
  }

  if (conversationStep.value === 'doc_notes') {
    requestForm.value.notes = value.toLowerCase() === 'skip' ? '' : value
    if (!resolvedStudentId.value) {
      await pushAssistantMessage(t('msg_student_id_required_proceed'), 'error')
      conversationStep.value = 'doc_wait_id'
      return
    }
    await finalizeDocumentRequest()
    return
  }

  if (conversationStep.value === 'await_student_id') {
    enteredStudentId.value = value
    if (isGuest.value) {
      conversationStep.value = 'await_guest_email'
      await pushAssistantMessage(t('msg_enter_email_verify'))
      return
    }
    await pushAssistantMessage(t('msg_checking_grades', { studentId: enteredStudentId.value }))
    await handleInquiry(pendingGradeView.value)
    conversationStep.value = 'root'
    pendingGradeView.value = 'grades'
    return
  }

  if (conversationStep.value === 'await_guest_email') {
    guestEmail.value = value.toLowerCase()
    conversationStep.value = 'root'
    await pushAssistantMessage(t('msg_verifying_identity', { studentId: enteredStudentId.value }))
    await handleInquiry(pendingGradeView.value)
    pendingGradeView.value = 'grades'
    return
  }

  const detected = detectIntent(value)
  const intendedGroup = detected.group || ''

  if (activeServiceLock.value && intendedGroup && intendedGroup !== activeServiceLock.value) {
    await pushAssistantMessage(t('msg_flow_active_back'), 'warning')
    return
  }
  if (!activeServiceLock.value && intendedGroup) {
    activeServiceLock.value = intendedGroup
    await pushAssistantMessage(t('msg_service_locked_flow'), 'warning')
  }

  if (detected.intent === 'greeting') {
    await pushAssistantMessage(t('msg_greeting_response', { name: sessionName.value }))
    return
  }

  if (detected.intent === 'thanks') {
    await pushAssistantMessage(t('msg_thanks_response'), 'success')
    return
  }

  if (detected.intent === 'help') {
    await pushAssistantMessage(t('msg_help_response'))
    return
  }

  if (detected.intent === 'grade_inquiry') {
    pendingGradeView.value = 'grades'
    await pushAssistantMessage(t('msg_confirm_student_id'))
    conversationStep.value = 'await_student_id'
    return
  }

  if (detected.intent === 'tor_view') {
    pendingGradeView.value = 'prospectus'
    if (sessionStudentId.value && !isGuest.value) {
      enteredStudentId.value = sessionStudentId.value
      await pushAssistantMessage(t('msg_using_session_open_tor', { studentId: enteredStudentId.value }))
      await handleInquiry('prospectus')
    } else {
      conversationStep.value = 'await_student_id'
      await pushAssistantMessage(
        isGuest.value
          ? t('msg_need_id_tor_guest')
          : t('msg_need_id_tor')
      )
      return
    }
    conversationStep.value = 'root'
    return
  }

  if (detected.intent === 'document' && detected.serviceName) {
    await handleServiceRequest(detected.serviceName)
    conversationStep.value = 'root'
    return
  }

  if (detected.intent === 'service_info') {
    if (detected.topic === 'enrollment') {
      await pushAssistantMessage(t('msg_service_info_enrollment'))
    } else if (detected.topic === 'records') {
      await pushAssistantMessage(t('msg_service_info_records'))
    } else if (detected.topic === 'announcements') {
      await pushAssistantMessage(t('msg_service_info_announcements'))
    }
    conversationStep.value = 'root'
    return
  }

  const usedLlmFallback = await handleHybridFallback(value)
  if (!usedLlmFallback) {
    await pushAssistantMessage(t('msg_llm_fallback_error'), 'warning')
    await pushAssistantMessage(t('msg_unclear_response'))
  }
}

const submitSuggestedPrompt = async (prompt) => {
  if (!prompt || isProcessing.value) return
  chatInput.value = prompt
  await handleChatSubmit()
}

const handleOptionSelect = async (option) => {
  llmSuggestedPrompts.value = []
  const optionGroup = getOptionGroup(option)
  if (activeServiceLock.value && optionGroup && optionGroup !== 'back' && optionGroup !== activeServiceLock.value) {
    await pushAssistantMessage(t('msg_flow_active_back'), 'warning')
    return
  }

  pushMessage('user', option.label)

  if (
    conversationStep.value === 'doc_wait_id' ||
    conversationStep.value === 'doc_contact' ||
    conversationStep.value === 'doc_purpose' ||
    conversationStep.value === 'doc_notes'
  ) {
    await pushAssistantMessage(t('msg_finish_doc_first'))
    return
  }

  if (option.action === 'grade') {
    if (!activeServiceLock.value) {
      activeServiceLock.value = 'grade'
      await pushAssistantMessage(t('msg_grade_selected_lock'), 'warning')
    }
    pendingGradeView.value = 'grades'
    await pushAssistantMessage(t('msg_confirm_student_id'))
    conversationStep.value = 'await_student_id'
    return
  }

  if (option.action === 'documents') {
    if (!activeServiceLock.value) {
      activeServiceLock.value = 'documents'
      await pushAssistantMessage(t('msg_documents_selected_lock'), 'warning')
    }
    conversationStep.value = 'documents'
    await pushAssistantMessage(t('msg_select_document'))
    return
  }

  if (option.action === 'services') {
    if (!activeServiceLock.value) {
      activeServiceLock.value = 'services'
      await pushAssistantMessage(t('msg_services_selected_lock'), 'warning')
    }
    conversationStep.value = 'services'
    await pushAssistantMessage(t('msg_select_service_info'))
    return
  }

  if (option.action === 'use_session') {
    if (!sessionStudentId.value) {
      await pushAssistantMessage(t('msg_session_id_unavailable'))
      conversationStep.value = 'await_student_id'
      return
    }
    enteredStudentId.value = sessionStudentId.value
    await pushAssistantMessage(t('msg_using_session_checking', { studentId: enteredStudentId.value }))
    await handleInquiry(pendingGradeView.value)
    conversationStep.value = 'root'
    pendingGradeView.value = 'grades'
    return
  }

  if (option.action === 'enter_id') {
    pendingGradeView.value = pendingGradeView.value || 'grades'
    conversationStep.value = 'await_student_id'
    await pushAssistantMessage(t('msg_type_student_id_continue'))
    return
  }

  if (option.action === 'show_prospectus') {
    pendingGradeView.value = 'prospectus'
    if (sessionStudentId.value && !isGuest.value) {
      enteredStudentId.value = sessionStudentId.value
      await pushAssistantMessage(t('msg_using_session_open_tor', { studentId: enteredStudentId.value }))
      await handleInquiry('prospectus')
      conversationStep.value = 'root'
      pendingGradeView.value = 'grades'
      return
    }
    conversationStep.value = 'await_student_id'
    await pushAssistantMessage(
      isGuest.value
        ? t('msg_need_id_tor_guest')
        : t('msg_need_id_tor')
    )
    return
  }

  if (option.action === 'ticket_doc') {
    await handleServiceRequest(option.label)
    conversationStep.value = 'root'
    return
  }

  if (option.action === 'info') {
    await pushAssistantMessage(t('msg_info_handled_direct', { label: option.label }))
    conversationStep.value = 'root'
    return
  }

  if (option.action === 'back') {
    conversationStep.value = 'root'
    clearServiceLocks()
    await pushAssistantMessage(t('msg_selection_unlocked'), 'success')
    await pushAssistantMessage(t('msg_choose_option_continue'))
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
  let verifiedStudentRecord = null

  if (isStudent.value && normalizedSessionStudentId && normalizedEntered !== normalizedSessionStudentId) {
    errorMessage.value = ''
    await pushNotice(
      'You can only view your own grades. Please use your session student ID.'
    )
    return
  }

  if (isGuest.value) {
    const emailForVerification = String(guestEmail.value || '').trim().toLowerCase()
    if (!emailForVerification) {
      errorMessage.value = 'Email verification is required for guest inquiries.'
      conversationStep.value = 'await_guest_email'
      await pushAssistantMessage(t('msg_verify_email_required'), 'warning')
      return
    }

    const verifyResult = await verifyStudentIdentity(normalizedEntered, emailForVerification)
    if (!verifyResult.success) {
      errorMessage.value = verifyResult.message || 'Unable to verify your identity.'
      await pushAssistantMessage(t('msg_verification_failed'), 'error')
      conversationStep.value = 'await_student_id'
      return
    }

    verifiedStudentRecord = verifyResult.student
    verifiedGuestProfile.value = {
      studentId: normalizedEntered,
      email: emailForVerification,
      fullName: verifiedStudentRecord?.fullName || ''
    }
  }

  startProcessing('inquiry')
  try {
    const studentResponse = verifiedStudentRecord
      ? { success: true, student: verifiedStudentRecord }
      : await getStudentById(normalizedEntered)
    const studentRecord = studentResponse.success
      ? studentResponse.student
      : { studentId: normalizedEntered }

    const studentYearLevel = String(studentRecord?.yearLevel || '').trim()
    const yearValue = yearOrder[studentYearLevel] || null
    const programCode = String(studentRecord?.program || '').trim()

    let eligibleSubjects = []
    let subjectCodesByProgram = []
    if (programCode) {
      const subjectsResponse = await getSubjectsByProgram(programCode)
      if (!subjectsResponse.success) {
        errorMessage.value = subjectsResponse.message
        return
      }

      eligibleSubjects = (subjectsResponse.subjects || []).filter((subject) => {
        if (!yearValue) return true
        const subjectYear = yearOrder[String(subject.yearLevel || '').trim()] || null
        if (!subjectYear) return true
        return subjectYear <= yearValue
      })

      subjectCodesByProgram = eligibleSubjects
        .map((subject) => normalizeSubjectCode(subject.code || subject.subject || ''))
        .filter(Boolean)
    }

    const enrollmentsResult = await getStudentEnrollments(normalizedEntered)
    const approvedEnrollments = (enrollmentsResult.success ? (enrollmentsResult.enrollments || []) : [])
      .filter((row) => row.status === 'approved')
    const subjectCodesByEnrollment = approvedEnrollments
      .map((row) => normalizeSubjectCode(row.subjectCode || row.subject || ''))
      .filter(Boolean)

    const ticketsResult = await listStudentTicketsByStudentId(normalizedEntered)
    const subjectCodesByTickets = extractTicketSubjectCodes(
      ticketsResult.success ? (ticketsResult.tickets || []) : []
    )

    const allowedSubjectCodes = Array.from(
      new Set([
        ...subjectCodesByProgram,
        ...subjectCodesByEnrollment,
        ...subjectCodesByTickets
      ].filter(Boolean))
    )

    const result = await getGradesByStudentId(normalizedEntered, {
      studentYearLevel,
      ticketCount: ticketsResult.success ? (ticketsResult.tickets || []).length : 0,
      enrolledSubjectCount: approvedEnrollments.length,
      allowedSubjectCodes
    })
    if (!result.success) {
      errorMessage.value = result.message
      return
    }

    matchedRecords.value = result.grades

    const gradeMap = new Map(
      matchedRecords.value.map((grade) => [
        normalizeSubjectCode(grade.subjectCode || grade.subject || ''),
        grade
      ])
    )

    if (eligibleSubjects.length) {
      const sortedSubjects = [...eligibleSubjects].sort((a, b) => {
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
    } else {
      const fallbackRows = new Map()
      matchedRecords.value.forEach((grade) => {
        const code = String(grade.subjectCode || grade.subject || '').trim()
        if (!code || fallbackRows.has(code)) return
        fallbackRows.set(code, {
          code,
          title: grade.subjectTitle || grade.title || '',
          units: '',
          yearLevel: studentYearLevel || 'Unassigned',
          type: 'Major',
          grade: grade.finalGrade ?? grade.grade ?? 'N/A',
          remarks: grade.remarks ?? 'N/A'
        })
      })
      prospectusRows.value = Array.from(fallbackRows.values())
    }

    successMessage.value = matchedRecords.value.length
      ? `Found ${matchedRecords.value.length} record(s) for your student ID.`
      : 'No grade records found. Showing program subjects with N/A grades.'

    if (matchedRecords.value.length) {
      await pushAssistantMessage(
        t('msg_records_found_for', { count: matchedRecords.value.length }),
        'success'
      )
      clearServiceLocks()
      await pushAssistantMessage(t('msg_selection_unlocked'), 'success')

      const latestRecords = [...matchedRecords.value]
        .sort((a, b) => {
          const ayA = String(a.academicYear || '')
          const ayB = String(b.academicYear || '')
          if (ayA !== ayB) return ayB.localeCompare(ayA)
          return String(b.semester || '').localeCompare(String(a.semester || ''))
        })
        .slice(0, 6)

      const tableRows = latestRecords.map((grade) => {
        return {
          studentName: grade.studentName || 'N/A',
          schoolYear: grade.academicYear || 'N/A',
          yearSection: grade.programYearSection || 'N/A',
          subjectCode: grade.subjectCode || grade.subject || 'N/A',
          subjectDescription: grade.subjectTitle || grade.title || 'Untitled Subject',
          grade: String(grade.finalGrade ?? grade.grade ?? 'N/A'),
          remarks: grade.remarks || 'No Grade'
        }
      })
      await pushAssistantTableMessage(t('msg_latest_grade_records'), tableRows)
    } else {
      await pushAssistantMessage(t('msg_no_direct_loaded_tor'), 'warning')
    }

    gradeResultView.value = preferredView === 'prospectus' ? 'prospectus' : 'grades'
  } catch (error) {
    errorMessage.value = 'Error fetching grades from database.'
  } finally {
    stopProcessing()
  }
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

  startProcessing('upload')
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
  } finally {
    stopProcessing()
  }
}

const handleServiceRequest = async (serviceName) => {
  if (!isStudent.value) {
    if (isDocumentRequest(serviceName)) {
      await pushAssistantMessage(t('msg_guest_doc_selected', { service: serviceName }))
      return
    }
    await pushAssistantMessage(t('msg_service_available_chat', { service: serviceName }))
    return
  }
  if (isDocumentRequest(serviceName)) {
    selectTicketService(serviceName)
    await pushAssistantMessage(t('msg_selected_complete_ticket', { service: serviceName }))
    return
  }
  await pushAssistantMessage(t('msg_service_handled_no_ticket', { service: serviceName }))
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
