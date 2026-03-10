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
import PublicFeaturesView from '../views/PublicFeaturesView.vue';
import PublicToolsView from '../views/PublicToolsView.vue';
import PublicBuilderView from '../views/PublicBuilderView.vue';
import StudentManagement from '../views/StudentManagement.vue';
import CalendarView from '../views/CalendarView.vue';
import RegistrarAccountsView from '../views/RegistrarAccountsView.vue';
import StudentPasswordSetupView from '../views/StudentPasswordSetupView.vue';
import UserProfileView from '../views/user/profile/UserProfileView.vue';
import UserPostView from '../views/user/post/UserPostView.vue';
import UserNotificationView from '../views/user/notification/UserNotificationView.vue';
import { getRoleDefaultRoute } from '@/Components/roleNavigation';

const routes = [
  { path: '/', name: 'home', component: LandingPageView },
  { path: '/features', name: 'features', component: PublicFeaturesView, alias: ['/feature'] },
  { path: '/features/tools', name: 'features-tools', component: PublicToolsView },
  { path: '/features/builder', name: 'features-builder', component: PublicBuilderView },
  { path: '/grade-inquiry', component: GradeInquiry },
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
      { path: 'profile', component: UserProfileView },
      { path: 'post', component: UserPostView },
      { path: 'notification', component: UserNotificationView },
      { path: 'security', component: StudentPasswordSetupView },
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
      { path: 'accounts', component: RegistrarAccountsView },
      { path: 'announcements', component: AnnouncementsBlog },
      { path: 'calendar', component: CalendarView }
    ]
  },
  {
    path: '/user',
    component: DashboardLayout,
    meta: { requiresAuth: true, allowedRoles: ['role_admin', 'role_instructor', 'role_student', 'role_registrar'] },
    children: [
      { path: '', redirect: '/user/profile' },
      { path: 'profile', component: UserProfileView },
      { path: 'post', component: UserPostView },
      { path: 'notification', component: UserNotificationView }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const redirectTo = (next, to, targetPath) => {
  if (!targetPath || targetPath === to.path) {
    next();
    return;
  }
  next(targetPath);
};

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
      redirectTo(next, to, '/login');
    } else if (to.meta.allowedRoles) {
      const resolvedRole = role.value || userProfile.value?.role;
      if (!resolvedRole) {
        redirectTo(next, to, '/');
        return;
      }
      if (!to.meta.allowedRoles.includes(resolvedRole)) {
        redirectTo(next, to, '/unauthorized');
        return;
      }
      const needsPasswordSetup = resolvedRole === 'role_student' && Boolean(userProfile.value?.mustChangePassword);
      if (needsPasswordSetup && to.path !== '/student/security') {
        redirectTo(next, to, '/student/security');
        return;
      }
      if (!needsPasswordSetup && to.path === '/student/security') {
        redirectTo(next, to, '/student');
        return;
      }
      next();
    } else {
      next();
    }
  } else {
    if (to.path === '/login' && user.value) {
      const resolvedRole = role.value || userProfile.value?.role;
      const defaultRoute = getRoleDefaultRoute(resolvedRole);
      redirectTo(next, to, defaultRoute);
      return;
    }
    if (to.path === '/' && user.value) {
      const resolvedRole = role.value || userProfile.value?.role;
      const defaultRoute = getRoleDefaultRoute(resolvedRole);
      redirectTo(next, to, defaultRoute);
      return;
    }
    next();
  }
});

export default router;

