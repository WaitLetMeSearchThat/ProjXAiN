<template>
  <nav v-if="isMobileViewport" class="mobile-footer-nav">
    <div class="mobile-footer-nav__inner">
      <button
        v-for="link in navLinks"
        :key="`mobile-${link.href}`"
        type="button"
        @click="navigate(link.href)"
        class="mobile-footer-nav__item"
        :class="{ 'is-active': activeLink === link.href }"
      >
        <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="navIconPath(link.icon)" />
        </svg>
        <span>{{ link.label }}</span>
      </button>

      <button type="button" @click="handleMobileAccount" class="mobile-footer-nav__item">
        <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="isAuthenticated ? 'M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 4v4m4-4v4m4-12l2 3' : 'M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'"
          />
        </svg>
        <span>{{ isAuthenticated ? 'Dashboard' : 'Login' }}</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const emit = defineEmits(['open-login']);
const router = useRouter();
const { isAuthenticated } = useAuth();

const isMobileViewport = ref(false);
const activeLink = ref('/');
const navLinks = ref([
  { href: '/', label: 'Home', icon: 'home' },
  { href: '#features', label: 'Features', icon: 'spark' },
  { href: '#services', label: 'Services', icon: 'medical' },
  { href: '#contact', label: 'Contact', icon: 'phone' }
]);

const navIconPath = (icon) => {
  const iconMap = {
    home: 'M3 10.5l9-7 9 7M5 9.5V20h14V9.5',
    spark: 'M12 3l2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5L12 3z',
    medical: 'M9 4h6v4h4v6h-4v6H9v-6H5V8h4V4z',
    phone: 'M3 5a2 2 0 012-2h3l2 5-2 2a14 14 0 006 6l2-2 5 2v3a2 2 0 01-2 2h-1C9.82 21 3 14.18 3 6V5z'
  };
  return iconMap[icon] || iconMap.home;
};

const syncActiveLinkByScroll = () => {
  const sectionLinks = navLinks.value.filter((link) => link.href.startsWith('#'));
  const probeLine = window.scrollY + 140;
  let currentHash = '/';

  for (const link of sectionLinks) {
    const section = document.querySelector(link.href);
    if (!section) continue;
    if (probeLine >= section.offsetTop) currentHash = link.href;
  }

  activeLink.value = window.scrollY < 40 ? '/' : currentHash;
};

const navigate = (href) => {
  activeLink.value = href;
  if (href.startsWith('#')) {
    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (router.currentRoute.value.path !== '/') {
      router.push({ path: '/', hash: href });
    }
    return;
  }
  router.push(href);
};

const handleMobileAccount = () => {
  if (isAuthenticated.value) {
    router.push('/dashboardview');
    return;
  }
  emit('open-login');
};

const updateMobileViewport = () => {
  isMobileViewport.value = window.innerWidth < 768;
  document.body.classList.toggle('has-mobile-footer-nav', isMobileViewport.value);
};

const handleScroll = () => {
  syncActiveLinkByScroll();
};

watch(
  () => router.currentRoute.value.fullPath,
  () => {
    syncActiveLinkByScroll();
  }
);

onMounted(() => {
  updateMobileViewport();
  syncActiveLinkByScroll();
  window.addEventListener('resize', updateMobileViewport);
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  document.body.classList.remove('has-mobile-footer-nav');
  window.removeEventListener('resize', updateMobileViewport);
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.mobile-footer-nav {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 70;
  display: flex;
  justify-content: center;
  padding: 0.5rem 0.75rem calc(env(safe-area-inset-bottom) + 0.5rem);
  pointer-events: none;
}

.mobile-footer-nav__inner {
  pointer-events: auto;
  width: min(36rem, 100%);
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.25rem;
  border-radius: 1rem;
  border: 1px solid rgba(251, 146, 60, 0.35);
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.16);
  backdrop-filter: blur(10px);
}

.mobile-footer-nav__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.125rem;
  min-height: 4rem;
  color: #6b7280;
  border-radius: 0.8rem;
  pointer-events: auto;
  touch-action: manipulation;
  transition: color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
}

.mobile-footer-nav__item span {
  font-size: 0.62rem;
  line-height: 1;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.mobile-footer-nav__item.is-active,
.mobile-footer-nav__item:hover {
  color: #ea580c;
  background: rgba(255, 237, 213, 0.88);
  transform: translateY(-1px);
}

:global(body.has-mobile-footer-nav) {
  padding-bottom: 5.5rem;
}
</style>
