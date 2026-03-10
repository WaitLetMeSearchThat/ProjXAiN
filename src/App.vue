<script setup>
import { computed, ref, watch } from 'vue';
import Footer from '@/Components/Footer.vue';
import Header from '@/Components/Header.vue';
import MobileFooter from '@/Components/MobileFooter.vue';
import { useAuth } from '@/composables/useAuth';
import { useRoute, useRouter } from 'vue-router';

const { isAuthenticated, userProfile, user, role } = useAuth();
const router = useRouter();
const route = useRoute();
const showAuthNotice = ref(false);

const sessionName = computed(() => {
  return userProfile.value?.displayName || user.value?.displayName || 'Student';
});

const handleProceed = () => {
  const resolvedRole = role.value || userProfile.value?.role || '';
  switch (resolvedRole) {
    case 'role_admin':
      router.push('/admin');
      break;
    case 'role_instructor':
    case 'faculty':
      router.push('/faculty');
      break;
    case 'role_student':
      router.push('/student');
      break;
    case 'role_registrar':
      router.push('/registrar');
      break;
    case 'users-notverified':
      router.push('/');
      break;
    default:
      router.push('/');
      break;
  }
};

watch(
  () => isAuthenticated.value,
  (authed) => {
    showAuthNotice.value = Boolean(authed);
  },
  { immediate: true }
);
</script>

<template>

  <!-- Main wrapper -->
  <div class="min-h-screen flex flex-col">
    <Header v-if="!isAuthenticated" />
   

    <!-- Main Content Area -->
    <main class="flex-grow mt-8 theme-page-shell">
      <router-view v-slot="{ Component }">
        <Transition name="route-fade" mode="out-in">
          <component :is="Component" :key="route.fullPath" class="animate-fade-in" />
        </Transition>
      </router-view>
    </main>

    <!-- Footer -->
    <Footer />
    <MobileFooter />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');

html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  font-family: 'Inter', sans-serif;
}

.route-fade-enter-active,
.route-fade-leave-active {
  transition: opacity 0.22s ease;
}

.route-fade-enter-from,
.route-fade-leave-to {
  opacity: 0;
}
</style>



