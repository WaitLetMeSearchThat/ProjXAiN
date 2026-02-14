import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import { watch } from 'vue';
import Builder from '@/Pages/Builder/Builder.vue';

// Layouts
import DashboardLayout from '../layouts/DashboardLayout.vue';

// Views
import Login from '../views/Login.vue';
import LandingPageView from '../views/LandingPageView.vue';
import Unauthorized from '../views/Unauthorized.vue';
import AdminDashboard from '../views/AdminDashboard.vue';
import InstructorDashboard from '../views/InstructorDashboard.vue';
import StudentDashboard from '../views/StudentDashboard.vue';
import RegistrarDashboard from '../views/RegistrarDashboard.vue';
import AnnouncementsBlog from '../views/AnnouncementsBlog.vue';
import GradeInquiry from '../views/GradeInquiry.vue';
import Classrooms from '../views/Classrooms.vue';
import Tools from '../views/Tools.vue';
import StudentManagement from '../views/StudentManagement.vue';
import CalendarView from '../views/CalendarView.vue';
import { getRoleDefaultRoute } from '@/Components/roleNavigation';

const routes = [
  { path: '/', component: LandingPageView },
  { path: '/builder', component: Builder },
  { path: '/login', component: Login },
  { path: '/unauthorized', component: Unauthorized },
  { path: '/tools', component: Tools },
  
  // Protected Routes wrapped in Dashboard Layout
  {
    path: '/admin',
    component: DashboardLayout,
    meta: { requiresAuth: true, allowedRoles: ['role_admin'] },
    children: [
      { path: '', component: AdminDashboard },
      { path: 'students', component: StudentManagement },
      { path: 'announcements', component: AnnouncementsBlog },
      { path: 'tools', component: Tools },
      { path: 'calendar', component: CalendarView }
    ]
  },
  {
    path: '/faculty',
    component: DashboardLayout,
    meta: { requiresAuth: true, allowedRoles: ['role_instructor'] },
    children: [
      { path: '', component: InstructorDashboard },
      { path: 'classes', component: Classrooms },
      { path: 'grades', component: GradeInquiry },
      { path: 'announcements', component: AnnouncementsBlog },
      { path: 'calendar', component: CalendarView }
    ]
  },
  {
    path: '/student',
    component: DashboardLayout,
    meta: { requiresAuth: true, allowedRoles: ['role_student'] },
    children: [
      { path: '', component: StudentDashboard },
      { path: 'classes', component: Classrooms },
      { path: 'grades', component: GradeInquiry, meta: { hideSidebar: false } },
      { path: 'announcements', component: AnnouncementsBlog },
      { path: 'calendar', component: CalendarView }
    ]
  },
  {
    path: '/registrar',
    component: DashboardLayout,
    meta: { requiresAuth: true, allowedRoles: ['role_registrar'] },
    children: [
      { path: '', component: RegistrarDashboard },
      { path: 'records', component: StudentManagement },
      { path: 'enrollment', component: StudentManagement },
      { path: 'announcements', component: AnnouncementsBlog },
      { path: 'calendar', component: CalendarView }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation Guard
router.beforeEach(async (to, from, next) => {
  const { user, role, userProfile, loading } = useAuth();

  // Wait for auth to initialize if loading
  if (loading.value) {
    await new Promise(resolve => {
      const unwatch = watch(loading, (newVal) => {
        if (!newVal) {
          unwatch();
          resolve();
        }
      });
    });
  }

  if (to.meta.requiresAuth) {
    if (!user.value) {
      next('/login');
    } else if (to.meta.allowedRoles) {
      const resolvedRole = role.value || userProfile.value?.role;
      if (!to.meta.allowedRoles.includes(resolvedRole)) {
        next('/unauthorized');
        return;
      }
      next();
    } else {
      next();
    }
  } else {
    if (to.path === '/login' && user.value) {
      const resolvedRole = role.value || userProfile.value?.role;
      next(getRoleDefaultRoute(resolvedRole));
      return;
    }
    if (to.path === '/' && user.value) {
      const resolvedRole = role.value || userProfile.value?.role;
      next(getRoleDefaultRoute(resolvedRole));
      return;
    }
    next();
  }
});

export default router;
