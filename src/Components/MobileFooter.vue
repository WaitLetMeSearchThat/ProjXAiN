<script setup>
import { computed, h, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { getRoleDefaultRoute, getRoleNavigation } from '@/Components/roleNavigation'

const BODY_CLASS = 'has-mobile-footer'
const PROTECTED_PREFIXES = ['/admin', '/faculty', '/student', '/registrar', '/user']

const route = useRoute()
const { isAuthenticated, role, userProfile } = useAuth()

const isMobileViewport = ref(false)

const createIcon = (children) => ({
  render() {
    return h(
      'svg',
      {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      },
      children
    )
  }
})

const HomeIcon = createIcon([
  h('path', { d: 'M3 10.5L12 3l9 7.5' }),
  h('path', { d: 'M5 9.5V21h14V9.5' })
])

const FeaturesIcon = createIcon([
  h('path', { d: 'M12 3l2.7 5.48L21 9.27l-4.5 4.38 1.06 6.08L12 16.9l-5.56 2.83 1.06-6.08L3 9.27l6.3-.79L12 3z' })
])

const InquiryIcon = createIcon([
  h('path', { d: 'M7 10h10' }),
  h('path', { d: 'M7 14h6' }),
  h('path', { d: 'M21 12a8 8 0 0 1-8 8H5l-2 2v-10a8 8 0 1 1 18 0z' })
])

const ToolsIcon = createIcon([
  h('path', { d: 'M14.7 6.3a4 4 0 1 0 3 3L21 12.6 16.6 17l-3.3-3.3a4 4 0 1 0-3-3L6.4 3 3 6.4l4.3 4.3' })
])

const BuilderIcon = createIcon([
  h('path', { d: 'M4 5h7v7H4z' }),
  h('path', { d: 'M13 5h7v4h-7z' }),
  h('path', { d: 'M13 11h7v8h-7z' }),
  h('path', { d: 'M4 14h7v5H4z' })
])

const DashboardIcon = createIcon([
  h('path', { d: 'M3 13h8V3H3z' }),
  h('path', { d: 'M13 21h8V11h-8z' }),
  h('path', { d: 'M13 3h8v6h-8z' }),
  h('path', { d: 'M3 17h8v4H3z' })
])

const LoginIcon = createIcon([
  h('path', { d: 'M15 3h3a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-3' }),
  h('path', { d: 'M10 17l5-5-5-5' }),
  h('path', { d: 'M15 12H3' })
])

const resolvedRole = computed(() => role.value || userProfile.value?.role || '')
const isProtectedRoute = computed(() =>
  PROTECTED_PREFIXES.some((prefix) => route.path === prefix || route.path.startsWith(`${prefix}/`))
)

const compactLabel = (label) => {
  const labels = {
    Overview: 'Home',
    'User Profile': 'Account',
    'Student Management': 'Students',
    'Student Records': 'Records',
    'Student Accounts': 'Accounts',
    Announcements: 'Updates',
    'Calendar of Activities': 'Calendar'
  }

  return labels[label] || label
}

const getRouteMatchScore = (item) => {
  if (item.exactPaths?.some((path) => route.path === path)) {
    return 7
  }

  if (item.prefixPaths?.length) {
    const prefixMatch = item.prefixPaths.find((prefix) => {
      if (route.path === prefix) return true
      return prefix !== '/' && route.path.startsWith(`${prefix}/`)
    })

    if (prefixMatch) {
      return route.path === prefixMatch ? 6 : 4
    }
  }

  if (!item.to) {
    return -1
  }

  const target = new URL(item.to, 'https://mobile-footer.local')

  if (route.path !== target.pathname && !(target.pathname !== '/' && route.path.startsWith(`${target.pathname}/`))) {
    return -1
  }

  let score = route.path === target.pathname ? 5 : 3

  for (const [key, value] of target.searchParams.entries()) {
    const routeValue = route.query[key]
    const matched = Array.isArray(routeValue) ? routeValue.includes(value) : String(routeValue ?? '') === value
    if (!matched) {
      return -1
    }
    score += 1
  }

  return score
}

const pickCurrentItem = (items) => {
  return items.reduce((best, item) => {
    const score = getRouteMatchScore(item)
    if (score > best.score) {
      return { item, score }
    }
    return best
  }, { item: null, score: -1 }).item
}

const publicActionItem = computed(() => {
  if (isAuthenticated.value && resolvedRole.value) {
    return {
      key: 'dashboard',
      label: 'Dashboard',
      to: getRoleDefaultRoute(resolvedRole.value),
      icon: DashboardIcon,
      prefixPaths: PROTECTED_PREFIXES
    }
  }

  return {
    key: 'login',
    label: 'Login',
    to: '/login',
    icon: LoginIcon,
    exactPaths: ['/login']
  }
})

const publicNavItems = computed(() => {
  const candidates = [
    { key: 'public-home', label: 'Home', to: '/', icon: HomeIcon, exactPaths: ['/'] },
    { key: 'public-features', label: 'Features', to: '/features', icon: FeaturesIcon, exactPaths: ['/features'] },
    { key: 'public-inquiry', label: 'Inquiry', to: '/grade-inquiry', icon: InquiryIcon, exactPaths: ['/grade-inquiry'] },
    { key: 'public-tools', label: 'Tools', to: '/features/tools', icon: ToolsIcon, exactPaths: ['/features/tools', '/tools'] },
    { key: 'public-builder', label: 'Builder', to: '/features/builder', icon: BuilderIcon, exactPaths: ['/features/builder', '/builder'] }
  ]

  const current = pickCurrentItem(candidates)
  const visible = [candidates[0]]

  if (current && current.key !== candidates[0].key) {
    visible.push(current)
  }

  for (const item of candidates.slice(1)) {
    if (visible.length >= 4) {
      break
    }
    if (!visible.some((entry) => entry.key === item.key)) {
      visible.push(item)
    }
  }

  visible.push(publicActionItem.value)
  return visible.slice(0, 5)
})

const protectedNavItems = computed(() => {
  const sourceItems = getRoleNavigation(resolvedRole.value)

  if (!sourceItems.length) {
    return publicNavItems.value
  }

  const overviewSource = sourceItems[0]
  const profileSource = sourceItems.find((item) => String(item.to).includes('/profile'))

  const overviewItem = {
    key: `role-${overviewSource.to}`,
    label: compactLabel(overviewSource.label),
    to: overviewSource.to,
    icon: overviewSource.icon
  }

  const accountItem = {
    key: 'role-account',
    label: 'Account',
    to: resolvedRole.value === 'role_student' ? '/student/profile' : '/user/profile',
    icon: profileSource?.icon || DashboardIcon,
    exactPaths: ['/student/profile', '/student/security'],
    prefixPaths: ['/user']
  }

  const candidates = sourceItems
    .filter((item) => item.to !== overviewSource.to && item.to !== profileSource?.to)
    .map((item) => ({
      key: `role-${item.to}`,
      label: compactLabel(item.label),
      to: item.to,
      icon: item.icon
    }))

  const current = pickCurrentItem(candidates)
  const visible = [overviewItem]

  if (current) {
    visible.push(current)
  }

  for (const item of candidates) {
    if (visible.length >= 4) {
      break
    }
    if (!visible.some((entry) => entry.key === item.key)) {
      visible.push(item)
    }
  }

  visible.push(accountItem)
  return visible.slice(0, 5)
})

const mobileItems = computed(() => {
  if (isProtectedRoute.value && isAuthenticated.value) {
    return protectedNavItems.value
  }

  return publicNavItems.value
})

const activeKey = computed(() => pickCurrentItem(mobileItems.value)?.key || null)

const setBodyClass = (enabled) => {
  document.body.classList.toggle(BODY_CLASS, enabled)
}

const updateViewport = () => {
  isMobileViewport.value = window.innerWidth < 768
  setBodyClass(isMobileViewport.value)
}

onMounted(() => {
  updateViewport()
  window.addEventListener('resize', updateViewport)
})

onUnmounted(() => {
  setBodyClass(false)
  window.removeEventListener('resize', updateViewport)
})
</script>

<template>
  <nav v-if="isMobileViewport" class="mobile-footer" aria-label="Mobile footer navigation">
    <div class="mobile-footer__panel">
      <RouterLink
        v-for="item in mobileItems"
        :key="item.key"
        :to="item.to"
        class="mobile-footer__item"
        :class="{ 'is-active': item.key === activeKey }"
      >
        <span class="mobile-footer__icon" aria-hidden="true">
          <component :is="item.icon" class="mobile-footer__svg" />
        </span>
        <span class="mobile-footer__label">{{ item.label }}</span>
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.mobile-footer {
  position: fixed;
  inset-inline: 0;
  bottom: 0;
  z-index: 120;
  display: flex;
  justify-content: center;
  padding: 0 0.85rem calc(env(safe-area-inset-bottom) + 0.85rem);
  pointer-events: none;
}

.mobile-footer__panel {
  pointer-events: auto;
  width: min(38rem, 100%);
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.35rem;
  padding: 0.4rem;
  border-radius: 1.35rem;
  border: 1px solid color-mix(in srgb, var(--border-subtle, rgba(148, 163, 184, 0.4)) 82%, transparent);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.12), transparent),
    color-mix(in srgb, var(--surface-elevated, rgba(15, 23, 42, 0.94)) 92%, white 8%);
  box-shadow: 0 18px 40px rgba(2, 6, 23, 0.28);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.mobile-footer__item {
  display: flex;
  min-height: 4.25rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.28rem;
  border-radius: 1rem;
  color: var(--text-secondary, #cbd5e1);
  text-decoration: none;
  transition:
    transform 0.2s ease,
    color 0.2s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease;
}

.mobile-footer__item:hover,
.mobile-footer__item:focus-visible {
  color: var(--text-primary, #f8fafc);
  background: color-mix(in srgb, var(--surface-primary, rgba(30, 41, 59, 0.82)) 82%, white 18%);
  transform: translateY(-1px);
}

.mobile-footer__item.is-active {
  color: var(--text-primary, #f8fafc);
  background: color-mix(in srgb, var(--accent-primary, #818cf8) 22%, transparent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent-primary, #818cf8) 40%, transparent);
}

.mobile-footer__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.mobile-footer__svg {
  width: 1.2rem;
  height: 1.2rem;
}

.mobile-footer__label {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  line-height: 1;
}

:global(body.has-mobile-footer) {
  padding-bottom: 6.4rem;
}

@media (min-width: 768px) {
  .mobile-footer {
    display: none;
  }
}
</style>
