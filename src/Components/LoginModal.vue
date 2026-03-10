<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] backdrop-blur-xl flex items-start sm:items-center justify-center p-3 sm:p-6 overflow-y-auto"
      >
        <div class="absolute inset-0" @click="handleClose"></div>

        <div class="relative w-full max-w-6xl rounded-3xl sm:rounded-[2.5rem] shadow-2xl border border-white/50 overflow-hidden transition-all duration-500 max-h-[92vh] overflow-y-auto">
          <div class="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
            <div class="absolute inset-0 animate-pulse"></div>
          </div>

          <button @click="handleClose" class="absolute top-3 right-3 sm:top-6 sm:right-6 p-2 sm:p-3 rounded-full hover:bg-slate-100 transition-colors z-50">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="relative grid grid-cols-1 lg:grid-cols-2 lg:min-h-[600px]">
            <div class="relative bg-gradient-to-br from-teal-600 via-purple-300 to-purple-700 p-6 sm:p-10 lg:p-12 flex flex-col justify-center items-center text-white overflow-hidden lg:order-first">
              <div class="absolute inset-0 opacity-20">
                <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
              </div>

              <div class="relative z-10 text-center">
                <div class="relative mb-3">
                  <img src="/images/logo.png" alt="BCC Logo" class="shadow-2xl rounded-xl w-32 h-32 sm:w-40 sm:h-40 mx-auto drop-shadow-2xl filter" />
                </div>
                <div class="my-4 text-sm sm:text-base font-semibold">New Member?</div>
                <button
                  @click="currentSection = 'register'"
                  class="w-full hover:scale-105 hover:bg-teal-500 border-2 hover:text-white py-4 bg-gray-100 p-4 text-purple-700 font-bold rounded-2xl transition-all text-sm sm:text-base"
                >
                  Register Student Account
                </button>

                <div class="flex justify-center space-x-3 sm:space-x-4 mt-6 sm:mt-8">
                  <div class="w-3 h-3 bg-white/60 rounded-full animate-pulse"></div>
                  <div class="w-3 h-3 bg-white/40 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
                  <div class="w-3 h-3 bg-white/20 rounded-full animate-pulse" style="animation-delay: 0.4s"></div>
                </div>
              </div>
            </div>

            <div class="relative sm:p-10 lg:p-12 flex flex-col bg-gray-200 justify-center lg:order-last">
              <Transition name="form-transition" mode="out-in">
                <div v-if="currentSection === 'login'" key="login" class="space-y-8">
                  <div class="text-center space-y-3">
                    <h2 class="text-2xl sm:text-3xl font-black bg-gradient-to-r from-blue-700 via-red-600 to-yellow-500 bg-clip-text text-transparent">Log in</h2>
                    <p class="text-slate-500 font-medium">Use your Student ID, Email, and Password</p>
                  </div>

                  <Transition name="notice-slide">
                    <div
                      v-if="authNotice.visible"
                      class="rounded-2xl border px-4 py-3 flex items-start gap-3"
                      :class="authNotice.type === 'error' ? 'bg-rose-50 border-rose-200 text-rose-800' : 'bg-emerald-50 border-emerald-200 text-emerald-800'"
                    >
                      <div class="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full" :class="authNotice.type === 'error' ? 'bg-rose-100' : 'bg-emerald-100'">
                        <svg v-if="authNotice.type === 'error'" class="h-4 w-4 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01M10.29 3.86l-7.6 13.17A2 2 0 004.4 20h15.2a2 2 0 001.73-2.97l-7.6-13.17a2 2 0 00-3.46 0z" />
                        </svg>
                        <svg v-else class="h-4 w-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div class="flex-1">
                        <p class="text-sm font-semibold leading-5">{{ authNotice.title }}</p>
                        <p class="text-xs mt-0.5 opacity-90">{{ authNotice.message }}</p>
                      </div>
                      <button @click="clearAuthNotice" class="text-xs font-bold opacity-70 hover:opacity-100 transition">Close</button>
                    </div>
                  </Transition>

                  <form @submit.prevent="handlePasswordLogin" class="p-4 space-y-4">
                    <div class="group">
                      <label class="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Student ID Number</label>
                      <input
                        v-model="loginForm.studentId"
                        type="text"
                        required
                        placeholder="e.g. 12-3456"
                        class="w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-800 font-medium mt-2"
                      />
                    </div>
                    <div class="group">
                      <label class="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                      <input
                        v-model="loginForm.email"
                        type="email"
                        required
                        placeholder="student@email.com"
                        class="w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-800 font-medium mt-2"
                      />
                    </div>
                    <div class="group">
                      <label class="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                      <input
                        v-model="loginForm.password"
                        type="password"
                        required
                        placeholder="........"
                        class="w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-800 mt-2"
                      />
                    </div>

                    <button type="submit" :disabled="isLoading" class="w-full py-4 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400 hover:from-blue-700 hover:via-red-600 hover:to-yellow-600 text-white rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                      {{ isLoading ? 'Signing in...' : 'Sign In' }}
                    </button>
                  </form>

                  <div class="relative">
                    <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-slate-100"></div></div>
                    <div class="relative flex justify-center text-xs uppercase"><span class="bg-white px-4 text-slate-400 font-bold tracking-tighter">Or Social Login</span></div>
                  </div>

                  <div class="space-y-3 pb-4">
                    <button @click="handleGoogleSignIn" :disabled="isLoading" class="w-full flex items-center justify-center gap-3 py-4 bg-white border-2 border-slate-100 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm text-sm sm:text-base">
                      <img src="https://services.google.com/fh/files/misc/google_g_icon_download.png" class="w-6 h-6" />
                      <span>Google Account</span>
                    </button>
                  </div>
                </div>

                <div v-else-if="currentSection === 'register'" key="register" class="space-y-6 p-4 sm:p-0">
                  <div class="text-center">
                    <h2 class="text-xl sm:text-2xl font-black text-slate-900">Student Registration</h2>
                    <p class="text-xs sm:text-sm text-slate-500">Fill in your student credentials and personal information.</p>
                  </div>

                  <div class="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 space-y-4">
                    <div class="group">
                      <label class="text-xs font-black text-blue-500 uppercase tracking-widest ml-1">Student ID Number</label>
                      <input v-model="registrationForm.studentId" type="text" placeholder="e.g. 12-3456" class="w-full bg-white/80 border-2 border-white rounded-2xl px-5 py-4 font-mono font-bold text-slate-700 outline-none mt-2" />
                    </div>
                    <div class="group">
                      <label class="text-xs font-black text-blue-500 uppercase tracking-widest ml-1">Email</label>
                      <input v-model="registrationForm.email" type="email" placeholder="student@email.com" class="w-full bg-white/80 border-2 border-white rounded-2xl px-5 py-4 font-bold text-slate-800 outline-none mt-2" />
                    </div>
                  </div>

                  <div class="bg-white p-6 rounded-2xl border border-slate-100 space-y-4">
                    <h3 class="text-sm font-black text-slate-700 uppercase tracking-widest">Personal Info</h3>
                    <div class="group">
                      <label class="text-xs font-black text-blue-500 uppercase tracking-widest ml-1">Last Name</label>
                      <input v-model="registrationForm.lastName" type="text" class="w-full bg-white border-2 border-slate-100 focus:border-blue-400 rounded-2xl px-5 py-4 font-bold text-slate-800 outline-none transition-all mt-2" />
                    </div>
                    <div class="group">
                      <label class="text-xs font-black text-blue-500 uppercase tracking-widest ml-1">First Name</label>
                      <input v-model="registrationForm.firstName" type="text" class="w-full bg-white border-2 border-slate-100 focus:border-blue-400 rounded-2xl px-5 py-4 font-bold text-slate-800 outline-none transition-all mt-2" />
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div class="group">
                        <label class="text-xs font-black text-blue-500 uppercase tracking-widest ml-1">M.I.</label>
                        <input v-model="registrationForm.middleInitial" type="text" maxlength="4" placeholder="M" class="w-full bg-white border-2 border-slate-100 focus:border-blue-400 rounded-2xl px-5 py-4 font-bold text-slate-800 outline-none transition-all mt-2" />
                      </div>
                      <div class="group">
                        <label class="text-xs font-black text-blue-500 uppercase tracking-widest ml-1">Suffix (if applicable)</label>
                        <input v-model="registrationForm.suffix" type="text" placeholder="Jr., Sr., III" class="w-full bg-white border-2 border-slate-100 focus:border-blue-400 rounded-2xl px-5 py-4 font-bold text-slate-800 outline-none transition-all mt-2" />
                      </div>
                    </div>
                    <div class="group">
                      <label class="text-xs font-black text-blue-500 uppercase tracking-widest ml-1">Create Password</label>
                      <input v-model="registrationForm.password" type="password" placeholder="Minimum 8 characters" class="w-full bg-white border-2 border-slate-100 focus:border-blue-400 rounded-2xl px-5 py-4 font-bold text-slate-800 outline-none transition-all mt-2" />
                    </div>
                    <div class="group">
                      <label class="text-xs font-black text-blue-500 uppercase tracking-widest ml-1">Confirm Password</label>
                      <input v-model="registrationForm.confirmPassword" type="password" placeholder="Re-enter password" class="w-full bg-white border-2 border-slate-100 focus:border-blue-400 rounded-2xl px-5 py-4 font-bold text-slate-800 outline-none transition-all mt-2" />
                    </div>
                  </div>

                  <button @click="handleRegistrationComplete" :disabled="isLoading" class="w-full py-5 bg-green-600 text-white rounded-3xl text-lg sm:text-xl font-bold shadow-xl shadow-green-100 active:scale-95 transition-all">
                    {{ isLoading ? 'Creating Account...' : 'Finish & Save Profile' }}
                  </button>

                  <button @click="currentSection = 'login'" class="w-full text-slate-400 font-bold text-sm">Back to Login</button>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="modal-fade">
      <div v-if="showSuccess" class="fixed inset-0 z-[110] backdrop-blur-sm flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/30" @click="handleSuccessProceed"></div>
        <div class="relative w-full max-w-md rounded-3xl bg-white shadow-2xl border border-slate-100 p-6 sm:p-8 text-center">
          <div class="mx-auto h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center">
            <svg class="h-7 w-7 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="mt-4 text-xl font-bold text-slate-900">Login successful</h3>
          <p class="mt-2 text-sm text-slate-500">You are signed in. Continue to your designated {{ proceedLabel }}.</p>
          <button @click="handleSuccessProceed" class="mt-6 w-full rounded-2xl bg-emerald-600 text-white font-semibold py-3 hover:bg-emerald-700 transition">
            Proceed to {{ proceedLabel }}
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, ref, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '@/composables/useAuth';
import { getRoleDefaultRoute } from '@/Components/roleNavigation';
import { db } from '@/firebase/config';
import { COLLECTIONS } from '@/assets/constants';
import { verifyStudentIdentity } from '@/firebase/studentService';

const { loginWithGoogle, login, registerWithRole, isAuthenticated, isInitialized, role, userProfile } = useAuth();
const router = useRouter();
const props = defineProps({ isOpen: Boolean });
const emit = defineEmits(['close', 'login-success']);

const STUDENT_ROLE = 'role_student';
const currentSection = ref('login');
const showSuccess = ref(false);
const isLoading = ref(false);
const authNotice = ref({
  visible: false,
  type: 'error',
  title: '',
  message: ''
});

const loginForm = reactive({
  studentId: '',
  email: '',
  password: ''
});

const registrationForm = reactive({
  studentId: '',
  email: '',
  lastName: '',
  firstName: '',
  middleInitial: '',
  suffix: '',
  password: '',
  confirmPassword: ''
});

const DASHBOARD_LABEL_BY_ROLE = {
  role_admin: 'Admin Dashboard',
  role_instructor: 'Faculty Dashboard',
  role_student: 'Student Dashboard',
  role_registrar: 'Registrar Dashboard'
};

const resolvedRole = computed(() => role.value || userProfile.value?.role || '');
const proceedRoute = computed(() => getRoleDefaultRoute(resolvedRole.value));
const proceedLabel = computed(() => DASHBOARD_LABEL_BY_ROLE[resolvedRole.value] || 'Dashboard');

const showAuthNotice = (type, title, message) => {
  authNotice.value = { visible: true, type, title, message };
};

const clearAuthNotice = () => {
  authNotice.value.visible = false;
};

const toFriendlyAuthMessage = (errorText) => {
  const normalized = String(errorText || '').toLowerCase();
  if (normalized.includes('auth/invalid-login-credentials')) {
    return 'Invalid email or password. Please check your credentials and try again.';
  }
  if (normalized.includes('auth/user-not-found')) {
    return 'No account was found for this email.';
  }
  if (normalized.includes('auth/wrong-password')) {
    return 'Incorrect password. Please try again.';
  }
  if (normalized.includes('auth/too-many-requests')) {
    return 'Too many failed attempts. Please wait a moment before trying again.';
  }
  return 'Unable to sign in right now. Please try again.';
};

const normalizeStudentId = (value) => String(value || '').trim().replace(/\s+/g, '').toUpperCase();

const composeDisplayName = () => {
  const lastName = String(registrationForm.lastName || '').trim();
  const firstName = String(registrationForm.firstName || '').trim();
  const middleInitial = String(registrationForm.middleInitial || '').trim();
  const suffix = String(registrationForm.suffix || '').trim();

  const mi = middleInitial ? `${middleInitial.replace(/\.+$/, '')}.` : '';
  return [lastName, firstName, mi, suffix].filter(Boolean).join(', ').replace(', ,', ',');
};

const verifyStudentRoleIdentity = async (studentId, email) => {
  const normalizedId = normalizeStudentId(studentId);
  const normalizedEmail = String(email || '').trim().toLowerCase();
  if (!normalizedId || !normalizedEmail) {
    return { valid: false, message: 'Student ID and email are required.' };
  }

  const roleQuery = query(
    collection(db, COLLECTIONS.USER_ROLES),
    where('email', '==', normalizedEmail)
  );
  const snapshot = await getDocs(roleQuery);
  if (snapshot.empty) {
    return { valid: false, message: 'No account was found for the provided email.' };
  }

  const matched = snapshot.docs
    .map((docSnap) => docSnap.data() || {})
    .find((entry) => entry.roleId === STUDENT_ROLE && normalizeStudentId(entry.studentId) === normalizedId);

  if (!matched) {
    return { valid: false, message: 'Student ID does not match the provided email.' };
  }

  return { valid: true };
};

const waitForAuthState = () => {
  return new Promise((resolve) => {
    if (isAuthenticated.value && isInitialized.value) {
      resolve();
      return;
    }
    const checkAuth = () => {
      if (isAuthenticated.value && isInitialized.value) {
        resolve();
      } else {
        setTimeout(checkAuth, 50);
      }
    };
    checkAuth();
  });
};

const handleGoogleSignIn = async () => {
  isLoading.value = true;
  clearAuthNotice();
  try {
    const result = await loginWithGoogle();
    if (result.success) {
      await waitForAuthState();
      showAuthNotice('success', 'Login successful', 'Your account is now signed in.');
      showSuccess.value = true;
    } else {
      showAuthNotice('error', 'Login failed', toFriendlyAuthMessage(result.error));
    }
  } finally {
    isLoading.value = false;
  }
};

const handlePasswordLogin = async () => {
  isLoading.value = true;
  clearAuthNotice();
  try {
    const studentId = String(loginForm.studentId || '').trim();
    const email = String(loginForm.email || '').trim();
    const password = String(loginForm.password || '');
    if (!studentId || !email || !password) {
      showAuthNotice('error', 'Login failed', 'Student ID, email, and password are required.');
      return;
    }

    const verification = await verifyStudentRoleIdentity(studentId, email);
    if (!verification.valid) {
      showAuthNotice('error', 'Login failed', verification.message);
      return;
    }

    const result = await login(email, password);
    if (result.success) {
      await waitForAuthState();
      showAuthNotice('success', 'Login successful', 'Your account is now signed in.');
      showSuccess.value = true;
    } else {
      showAuthNotice('error', 'Login failed', toFriendlyAuthMessage(result.error));
    }
  } finally {
    isLoading.value = false;
  }
};

const handleRegistrationComplete = async () => {
  const studentId = String(registrationForm.studentId || '').trim();
  const email = String(registrationForm.email || '').trim();
  const lastName = String(registrationForm.lastName || '').trim();
  const firstName = String(registrationForm.firstName || '').trim();
  const password = String(registrationForm.password || '');
  const confirmPassword = String(registrationForm.confirmPassword || '');

  if (!studentId || !email || !lastName || !firstName || !password || !confirmPassword) {
    alert('Please fill in all required fields.');
    return;
  }
  if (password !== confirmPassword) {
    alert('Password and confirm password do not match.');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }
  if (password.length < 8) {
    alert('Password must be at least 8 characters.');
    return;
  }

  const displayName = composeDisplayName();
  isLoading.value = true;
  try {
    const identityResult = await verifyStudentIdentity(studentId, email, { requireSheetMatch: true });
    if (!identityResult.success) {
      alert(identityResult.message || 'Student ID and email could not be verified from records.');
      return;
    }

    const result = await registerWithRole(
      email,
      password,
      displayName,
      STUDENT_ROLE,
      studentId
    );
    if (!result.success) {
      alert(result.error || 'Registration failed.');
      return;
    }

    const profile = localStorage.getItem('userProfile');
    if (profile) {
      const parsed = JSON.parse(profile);
      parsed.studentId = studentId;
      parsed.role = STUDENT_ROLE;
      parsed.lastName = lastName;
      parsed.firstName = firstName;
      parsed.middleInitial = String(registrationForm.middleInitial || '').trim();
      parsed.suffix = String(registrationForm.suffix || '').trim();
      localStorage.setItem('userProfile', JSON.stringify(parsed));
    }

    localStorage.setItem('studentId', studentId);
    await waitForAuthState();
    showSuccess.value = true;
  } finally {
    isLoading.value = false;
  }
};

const handleClose = () => {
  currentSection.value = 'login';
  showSuccess.value = false;
  clearAuthNotice();

  loginForm.studentId = '';
  loginForm.email = '';
  loginForm.password = '';

  registrationForm.studentId = '';
  registrationForm.email = '';
  registrationForm.lastName = '';
  registrationForm.firstName = '';
  registrationForm.middleInitial = '';
  registrationForm.suffix = '';
  registrationForm.password = '';
  registrationForm.confirmPassword = '';

  emit('close');
};

const handleSuccessProceed = () => {
  showSuccess.value = false;
  clearAuthNotice();
  emit('login-success');
  emit('close');
  router.push(proceedRoute.value);
};

watch(
  () => props.isOpen,
  (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (!isOpen) {
      showSuccess.value = false;
      clearAuthNotice();
    }
  }
);
</script>

<style scoped>
.modal-fade-enter-active, .modal-fade-leave-active {
  transition: all 0.3s ease;
}
.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Fast form transition */
.form-transition-enter-active, .form-transition-leave-active {
  transition: all 0.2s ease;
}
.form-transition-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.form-transition-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.notice-slide-enter-active,
.notice-slide-leave-active {
  transition: all 0.2s ease;
}
.notice-slide-enter-from,
.notice-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@keyframes swing {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}
.animate-swing {
  animation: swing 4s ease-in-out infinite;
}
</style>



