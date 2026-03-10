<script setup>
import { RouterLink } from 'vue-router'

const featureCards = [
  {
    id: 'grade-inquiry',
    title: 'Inquiries Assistant',
    to: '/grade-inquiry',
    badge: 'Portal',
    status: 'Live',
    audience: 'Guests, Students',
    thumbnailLabel: 'Rule-Based x Generative AI',
    thumbnailClass: 'from-cyan-500 via-blue-600 to-indigo-700',
    highlights: ['Protected student data', 'Chat + verification flow', 'Multilingual response']
  },
  {
    id: 'tools',
    title: ' Library',
    to: '/features/tools',
    badge: 'Knowledge',
    status: 'Live',
    audience: 'Public Learners',
    thumbnailLabel: 'Learning Resources',
    thumbnailClass: 'from-emerald-500 via-teal-600 to-slate-700',
    highlights: ['Curated links', 'Practical references', 'Skill-building content']
  },
  {
    id: 'builder',
    title: 'Web Builder Studio',
    to: '/features/builder',
    badge: 'Interactive',
    status: 'Live',
    audience: 'Creators, Developers',
    thumbnailLabel: 'Learning Tools',
    thumbnailClass: 'from-amber-500 via-orange-600 to-rose-700',
    highlights: ['Component blocks', 'Live preview', 'Layout experimentation']
  }
]
</script>

<template>
  <section class="feature-nav-shell rounded-3xl border border-elegant shadow-xl p-5 sm:p-7">
    <div class="flex items-center justify-between gap-3">
      <div>
        <div class="text-xs font-semibold uppercase tracking-widest feature-nav-accent">Enhanced Navigation</div>
         </div>
      <RouterLink
        to="/features"
        class="text-xs sm:text-sm font-semibold feature-nav-accent hover:opacity-80"
      >
        Open Hub
      </RouterLink>
    </div>

    <div class="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
      <RouterLink
        v-for="card in featureCards"
        :key="card.id"
        :to="card.to"
        class="group rounded-2xl border border-elegant surface-card p-4 hover:shadow-lg transition"
      >
        <div class="rounded-xl h-28 p-3 bg-gradient-to-br text-white relative overflow-hidden" :class="card.thumbnailClass">
          <div class="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-white/15"></div>
          <div class="absolute -bottom-8 -left-8 h-20 w-20 rounded-full bg-black/20"></div>
          <div class="relative">
            <div class="text-[11px] uppercase tracking-widest font-bold text-white/90">{{ card.badge }}</div>
            <div class="mt-2 text-lg font-black">{{ card.thumbnailLabel }}</div>
          </div>
        </div>

        <div class="mt-4 flex items-center justify-between gap-2">
          <h3 class="text-base font-bold feature-nav-title group-hover:opacity-80 transition">{{ card.title }}</h3>
          <span class="text-[10px] px-2 py-1 rounded-full feature-status-badge font-bold uppercase tracking-wider">
            {{ card.status }}
          </span>
        </div>

        <p class="mt-2 text-sm text-subtle leading-relaxed">{{ card.description }}</p>

        <div class="mt-3 flex flex-wrap gap-2">
          <span
            v-for="item in card.highlights"
            :key="item"
            class="text-[11px] px-2.5 py-1 rounded-full border border-elegant text-subtle"
          >
            {{ item }}
          </span>
        </div>

        <div class="mt-4">
          <span class="feature-open-btn inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wide">
            Open Feature
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.feature-nav-shell {
  background: color-mix(in srgb, var(--surface-primary, #0f172a) 86%, transparent);
}

.feature-nav-title {
  color: var(--text-primary, #f1f5f9);
}

.feature-nav-accent {
  color: var(--accent-primary, #818cf8);
}

.feature-status-badge {
  color: #34d399;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.35);
}

.feature-open-btn {
  color: #fff;
  background: linear-gradient(
    135deg,
    var(--accent-primary, #6366f1),
    color-mix(in srgb, var(--accent-secondary, #a855f7) 80%, #0f172a)
  );
  border: 1px solid color-mix(in srgb, var(--accent-primary, #6366f1) 55%, transparent);
  box-shadow: 0 10px 22px -14px color-mix(in srgb, var(--accent-primary, #6366f1) 60%, transparent);
  transition: transform 0.2s ease, filter 0.2s ease, box-shadow 0.2s ease;
}

.group:hover .feature-open-btn {
  transform: translateY(-1px);
  filter: brightness(1.08);
  box-shadow: 0 14px 30px -14px color-mix(in srgb, var(--accent-primary, #6366f1) 70%, transparent);
}
</style>
