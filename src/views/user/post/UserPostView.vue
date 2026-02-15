<template>
  <UserPageShell
    title="User Post"
    description="This page can scale into create, draft, and history flows for user-generated posts."
  >
    <UserTabs />

    <section class="bg-white rounded-2xl border border-slate-200 p-5">
      <h2 class="text-base font-semibold text-slate-900 mb-4">Recent Posts</h2>
      <div v-if="posts.length" class="space-y-3">
        <article
          v-for="post in posts"
          :key="post.id"
          class="rounded-xl border border-slate-200 p-4"
        >
          <h3 class="font-medium text-slate-900">{{ post.title }}</h3>
          <p class="text-sm text-slate-600 mt-1">{{ post.summary }}</p>
          <p class="text-xs text-slate-500 mt-2">Status: {{ post.status }}</p>
        </article>
      </div>
      <p v-else class="text-sm text-slate-500">No posts yet.</p>
    </section>
  </UserPageShell>
</template>

<script setup>
import { ref } from 'vue'
import UserPageShell from '@/Components/user/UserPageShell.vue'
import UserTabs from '@/Components/user/UserTabs.vue'

const posts = ref([
  { id: 'p1', title: 'Welcome Post', summary: 'Start sharing updates with your class or team.', status: 'published' },
  { id: 'p2', title: 'Draft: Semester Reflection', summary: 'Keep private drafts before publishing.', status: 'draft' }
])
</script>
