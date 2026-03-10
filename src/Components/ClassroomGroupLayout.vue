<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import {
  createClassroomActivity,
  createClassroomModule,
  subscribeClassroomActivities,
  subscribeClassroomModules
} from '@/firebase/classroomService'

const props = defineProps({
  classroom: { type: Object, default: null },
  selectedCard: { type: Object, default: null },
  selectedEnrollment: { type: Object, default: null },
  selectedMemberCount: { type: Number, default: 0 },
  members: { type: Array, default: () => [] },
  posts: { type: Array, default: () => [] },
  canPost: { type: Boolean, default: false },
  isInstructor: { type: Boolean, default: false },
  isSubmittingAnnouncement: { type: Boolean, default: false },
  announcementDraft: { type: String, default: '' },
  authorName: { type: String, default: 'User' },
  authorEmail: { type: String, default: '' },
  sectionOnly: { type: Boolean, default: false }
})

const emit = defineEmits(['update:announcementDraft', 'submit-announcement'])

const tabs = computed(() => {
  if (props.sectionOnly) {
    return [
      { id: 'announcements', label: 'Announcements' },
      { id: 'modules', label: 'Modules' }
    ]
  }
  return [
    { id: 'announcements', label: 'Announcements' },
    { id: 'activities', label: 'Individual Activity' },
    { id: 'modules', label: 'Modules' }
  ]
})

const activeTab = ref('announcements')
const activities = ref([])
const modules = ref([])
const isLoadingActivities = ref(false)
const isLoadingModules = ref(false)
const isSavingActivity = ref(false)
const isSavingModule = ref(false)
const localMessage = ref('')
const localError = ref('')
const activityForm = ref({ title: '', instructions: '', dueAt: '', points: '' })
const moduleForm = ref({ title: '', description: '', resourceUrl: '' })

let stopActivitiesSub = null
let stopModulesSub = null

const announcementModel = computed({
  get: () => props.announcementDraft,
  set: (value) => emit('update:announcementDraft', value)
})

const selectedStatus = computed(() => props.selectedCard?.status || '')

const resetLocalAlerts = () => {
  localMessage.value = ''
  localError.value = ''
}

const resetForms = () => {
  activityForm.value = { title: '', instructions: '', dueAt: '', points: '' }
  moduleForm.value = { title: '', description: '', resourceUrl: '' }
}

const stopSubscriptions = () => {
  if (stopActivitiesSub) {
    stopActivitiesSub()
    stopActivitiesSub = null
  }
  if (stopModulesSub) {
    stopModulesSub()
    stopModulesSub = null
  }
}

const subscribeGroupResources = (classroomId) => {
  stopSubscriptions()
  activities.value = []
  modules.value = []
  resetLocalAlerts()

  if (!classroomId) return

  isLoadingActivities.value = true
  isLoadingModules.value = true

  stopActivitiesSub = subscribeClassroomActivities(
    classroomId,
    (rows) => {
      activities.value = rows || []
      isLoadingActivities.value = false
    },
    () => {
      localError.value = 'Unable to load classroom activities.'
      isLoadingActivities.value = false
    }
  )

  stopModulesSub = subscribeClassroomModules(
    classroomId,
    (rows) => {
      modules.value = rows || []
      isLoadingModules.value = false
    },
    () => {
      localError.value = 'Unable to load classroom modules.'
      isLoadingModules.value = false
    }
  )
}

const formatDateTime = (value) => {
  if (!value) return 'Just now'
  try {
    const date = typeof value?.toDate === 'function' ? value.toDate() : new Date(value)
    if (Number.isNaN(date.getTime())) return 'Just now'
    return date.toLocaleString()
  } catch (_) {
    return 'Just now'
  }
}

const handleCreateActivity = async () => {
  if (!props.isInstructor || !props.classroom?.id) return
  isSavingActivity.value = true
  resetLocalAlerts()
  try {
    const result = await createClassroomActivity({
      classroomId: props.classroom.id,
      title: activityForm.value.title,
      instructions: activityForm.value.instructions,
      dueAt: activityForm.value.dueAt,
      points: activityForm.value.points,
      authorName: props.authorName,
      authorEmail: props.authorEmail
    })
    if (!result.success) {
      localError.value = result.message || 'Unable to create activity.'
      return
    }
    localMessage.value = 'Individual activity published.'
    activityForm.value = { title: '', instructions: '', dueAt: '', points: '' }
  } finally {
    isSavingActivity.value = false
  }
}

const handleCreateModule = async () => {
  if (!props.isInstructor || !props.classroom?.id) return
  isSavingModule.value = true
  resetLocalAlerts()
  try {
    const result = await createClassroomModule({
      classroomId: props.classroom.id,
      title: moduleForm.value.title,
      description: moduleForm.value.description,
      resourceUrl: moduleForm.value.resourceUrl,
      authorName: props.authorName,
      authorEmail: props.authorEmail
    })
    if (!result.success) {
      localError.value = result.message || 'Unable to create module.'
      return
    }
    localMessage.value = 'Module published to the section page.'
    moduleForm.value = { title: '', description: '', resourceUrl: '' }
  } finally {
    isSavingModule.value = false
  }
}

watch(() => props.classroom?.id, (classroomId) => {
  subscribeGroupResources(classroomId)
  resetForms()
  activeTab.value = 'announcements'
})

watch(tabs, (items) => {
  const allowed = (items || []).map((tab) => tab.id)
  if (!allowed.includes(activeTab.value)) {
    activeTab.value = allowed[0] || 'announcements'
  }
}, { immediate: true })

onMounted(() => {
  subscribeGroupResources(props.classroom?.id)
})

onUnmounted(() => {
  stopSubscriptions()
})
</script>

<template>
  <div class="rounded-2xl border border-slate-700/60 bg-[#11141c] p-5 shadow-xl">
    <template v-if="classroom">
      <div class="flex flex-wrap items-start justify-between gap-3 border-b border-slate-700/60 pb-4">
        <div>
          <div class="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">Section Group Page</div>
          <h2 class="mt-2 text-2xl font-black text-white">{{ classroom.subjectCode }} - Section {{ classroom.section }}</h2>
          <p class="mt-1 text-sm text-slate-400">{{ classroom.subjectTitle || 'Untitled classroom' }}</p>
        </div>
        <div class="flex flex-wrap gap-2 text-xs">
          <span class="rounded-full bg-emerald-500/10 px-3 py-1 font-semibold text-emerald-200">{{ selectedMemberCount }} member(s)</span>
          <span v-if="selectedStatus" class="rounded-full bg-slate-800 px-3 py-1 font-semibold text-slate-200">{{ selectedStatus }}</span>
          <span v-if="classroom.joinCode && isInstructor" class="rounded-full bg-sky-500/10 px-3 py-1 font-semibold text-sky-200">Code {{ classroom.joinCode }}</span>
        </div>
      </div>

      <div class="mt-4 grid gap-3 sm:grid-cols-2 text-sm text-slate-300">
        <div class="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-3">
          <div class="text-xs uppercase tracking-wide text-slate-500">Schedule</div>
          <div class="mt-1 font-semibold text-slate-100">{{ classroom.scheduleDay || 'TBA' }}</div>
          <div class="text-slate-400">{{ classroom.scheduleTime || 'TBA' }}</div>
        </div>
        <div class="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-3">
          <div class="text-xs uppercase tracking-wide text-slate-500">Instructor</div>
          <div class="mt-1 font-semibold text-slate-100">{{ classroom.instructorName || 'Instructor TBA' }}</div>
          <div class="text-slate-400">{{ classroom.instructorEmail || 'No email on record' }}</div>
        </div>
      </div>

      <div class="mt-5 flex flex-wrap gap-2 border-b border-slate-700/60 pb-4">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          class="rounded-full px-4 py-2 text-sm font-semibold transition"
          :class="activeTab === tab.id ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <div v-if="localError" class="mt-4 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{{ localError }}</div>
      <div v-if="localMessage" class="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">{{ localMessage }}</div>

      <section v-if="activeTab === 'announcements'" class="mt-4 space-y-4">
        <div class="flex items-center justify-between gap-3">
          <div>
            <h3 class="text-sm font-bold text-slate-100">Announcements Timeline</h3>
            <p class="text-xs text-slate-500">Section updates, reminders, and discussion posts.</p>
          </div>
          <div class="text-xs text-slate-500">Room {{ classroom.room || 'TBA' }}</div>
        </div>

        <div v-if="canPost" class="rounded-2xl border border-slate-700 bg-slate-950/60 p-3">
          <label class="text-xs font-semibold uppercase tracking-wide text-slate-400">{{ isInstructor ? 'Post section announcement' : 'Post to group timeline' }}</label>
          <textarea
            v-model="announcementModel"
            rows="3"
            class="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
            :placeholder="isInstructor ? 'Share an announcement or instruction for this section.' : 'Share a message with your classmates.'"
          />
          <div class="mt-3 flex justify-end">
            <button class="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-600 disabled:opacity-60" :disabled="isSubmittingAnnouncement || !announcementDraft.trim()" @click="emit('submit-announcement')">
              {{ isSubmittingAnnouncement ? 'Posting...' : 'Post Update' }}
            </button>
          </div>
        </div>
        <div v-else-if="selectedEnrollment?.status === 'pending'" class="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-3 text-sm text-amber-100">Your request to join this classroom is still pending instructor approval.</div>

        <div class="space-y-3 max-h-[420px] overflow-y-auto pr-1">
          <div v-if="posts.length === 0" class="rounded-2xl border border-dashed border-slate-700 bg-slate-950/50 px-4 py-8 text-center text-sm text-slate-500">No announcements yet for this section.</div>
          <article v-for="post in posts" :key="post.id" class="rounded-2xl border border-slate-700/60 bg-slate-950/70 p-4">
            <div class="flex items-center gap-2"><span class="font-semibold text-slate-100">{{ post.authorName || 'Classroom member' }}</span><span class="rounded-full px-2 py-0.5 text-[11px] font-semibold" :class="post.isInstructor ? 'bg-emerald-500/15 text-emerald-200' : 'bg-slate-700 text-slate-200'">{{ post.isInstructor ? 'Announcement' : 'Member Post' }}</span></div>
            <div class="mt-1 text-xs text-slate-500">{{ formatDateTime(post.createdAt) }}</div>
            <p class="mt-3 whitespace-pre-line text-sm leading-6 text-slate-200">{{ post.body }}</p>
          </article>
        </div>
      </section>

      <section v-else-if="activeTab === 'activities'" class="mt-4 space-y-4">
        <div>
          <h3 class="text-sm font-bold text-slate-100">Individual Activities</h3>
          <p class="text-xs text-slate-500">Per-section tasks published for each student in this classroom.</p>
        </div>

        <div v-if="isInstructor" class="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
          <div class="grid gap-3 sm:grid-cols-2">
            <input v-model="activityForm.title" type="text" class="rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100" placeholder="Activity title" />
            <input v-model="activityForm.dueAt" type="datetime-local" class="rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100" />
            <textarea v-model="activityForm.instructions" rows="3" class="sm:col-span-2 rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100" placeholder="Instructions"></textarea>
            <input v-model="activityForm.points" type="number" min="0" class="rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100" placeholder="Points" />
          </div>
          <div class="mt-3 flex justify-end"><button class="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-600 disabled:opacity-60" :disabled="isSavingActivity || !activityForm.title.trim()" @click="handleCreateActivity">{{ isSavingActivity ? 'Publishing...' : 'Publish Activity' }}</button></div>
        </div>

        <div v-if="isLoadingActivities" class="text-sm text-slate-400">Loading activities...</div>
        <div v-else-if="!activities.length" class="rounded-2xl border border-dashed border-slate-700 bg-slate-950/50 px-4 py-8 text-center text-sm text-slate-500">No individual activities published yet.</div>
        <div v-else class="space-y-3">
          <article v-for="activity in activities" :key="activity.id" class="rounded-2xl border border-slate-700/60 bg-slate-950/70 p-4">
            <div class="flex flex-wrap items-start justify-between gap-3"><div><h4 class="text-base font-bold text-slate-100">{{ activity.title }}</h4><p class="mt-1 text-xs text-slate-500">Published {{ formatDateTime(activity.createdAt) }}</p></div><span v-if="activity.points !== null && activity.points !== undefined" class="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-200">{{ activity.points }} pts</span></div>
            <p v-if="activity.instructions" class="mt-3 whitespace-pre-line text-sm leading-6 text-slate-300">{{ activity.instructions }}</p>
            <div class="mt-3 text-xs text-slate-500">Due: {{ activity.dueAt ? formatDateTime(activity.dueAt) : 'No due date set' }}</div>
          </article>
        </div>
      </section>

      <section v-else class="mt-4 space-y-4">
        <div>
          <h3 class="text-sm font-bold text-slate-100">Modules</h3>
          <p class="text-xs text-slate-500">Learning packets, references, and section-specific module drops.</p>
        </div>

        <div v-if="isInstructor" class="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
          <div class="grid gap-3 sm:grid-cols-2">
            <input v-model="moduleForm.title" type="text" class="rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100" placeholder="Module title" />
            <input v-model="moduleForm.resourceUrl" type="url" class="rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100" placeholder="Resource URL (optional)" />
            <textarea v-model="moduleForm.description" rows="3" class="sm:col-span-2 rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100" placeholder="Module summary"></textarea>
          </div>
          <div class="mt-3 flex justify-end"><button class="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-600 disabled:opacity-60" :disabled="isSavingModule || !moduleForm.title.trim()" @click="handleCreateModule">{{ isSavingModule ? 'Publishing...' : 'Publish Module' }}</button></div>
        </div>

        <div v-if="isLoadingModules" class="text-sm text-slate-400">Loading modules...</div>
        <div v-else-if="!modules.length" class="rounded-2xl border border-dashed border-slate-700 bg-slate-950/50 px-4 py-8 text-center text-sm text-slate-500">No modules published for this section yet.</div>
        <div v-else class="space-y-3">
          <article v-for="module in modules" :key="module.id" class="rounded-2xl border border-slate-700/60 bg-slate-950/70 p-4">
            <div class="flex flex-wrap items-start justify-between gap-3"><div><h4 class="text-base font-bold text-slate-100">{{ module.title }}</h4><p class="mt-1 text-xs text-slate-500">Published {{ formatDateTime(module.createdAt) }}</p></div><a v-if="module.resourceUrl" :href="module.resourceUrl" target="_blank" rel="noreferrer" class="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200 hover:bg-emerald-500/20">Open Resource</a></div>
            <p v-if="module.description" class="mt-3 whitespace-pre-line text-sm leading-6 text-slate-300">{{ module.description }}</p>
          </article>
        </div>
      </section>

      <div v-if="!sectionOnly" class="mt-5 rounded-2xl border border-slate-700/60 bg-slate-900/60 p-4">
        <div class="flex items-center justify-between gap-3"><div><h3 class="text-sm font-bold text-slate-100">Members</h3><p class="text-xs text-slate-500">Approved students in this section group.</p></div><div class="text-xs text-slate-500">{{ members.length }} listed</div></div>
        <div v-if="members.length" class="mt-3 space-y-2 max-h-60 overflow-y-auto pr-1"><div v-for="member in members" :key="member.id" class="rounded-xl border border-slate-700/60 bg-slate-950/60 px-3 py-2 text-sm"><div class="font-semibold text-slate-100">{{ member.studentName || member.studentId }}</div><div class="text-xs text-slate-500">{{ member.studentId }} <span v-if="member.studentEmail">• {{ member.studentEmail }}</span></div></div></div>
        <div v-else class="mt-3 text-sm text-slate-500">No approved members yet.</div>
      </div>
    </template>

    <template v-else>
      <div class="rounded-2xl border border-dashed border-slate-700 bg-slate-950/40 px-5 py-12 text-center">
        <h2 class="text-lg font-bold text-slate-100">No Group Page Selected</h2>
        <p class="mt-2 text-sm text-slate-500">Select a classroom from the list to open its group page layout.</p>
      </div>
    </template>
  </div>
</template>




