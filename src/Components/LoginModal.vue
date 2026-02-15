<template>
  <Teleport to="body" >
    <Transition name="modal-fade">
      <div v-if="isOpen" class="fixed inset-0 z-[100] backdrop-blur-xl flex items-start sm:items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <div class="absolute inset-0 " @click="handleClose"></div>

        <div class="relative w-full max-w-6xl rounded-3xl sm:rounded-[2.5rem] shadow-2xl border border-white/50 overflow-hidden transition-all duration-500 max-h-[92vh] overflow-y-auto">

          <div class="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
            <div class="absolute inset-0  animate-pulse"></div>
          </div>

          <!-- Close Button -->
          <button @click="handleClose" class="absolute top-3 right-3 sm:top-6 sm:right-6 p-2 sm:p-3 rounded-full hover:bg-slate-100 transition-colors z-50">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="relative grid grid-cols-1 lg:grid-cols-2 lg:min-h-[600px]">
            <!-- Left Side - Logo and Brand -->
            <div class="relative bg-gradient-to-br from-teal-600 via-purple-300 to-purple-700 p-6 sm:p-10 lg:p-12 flex flex-col justify-center items-center text-white overflow-hidden lg:order-first">
              <!-- Background Pattern -->
              <div class="absolute inset-0 opacity-20">
                <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
              </div>

              <!-- Logo and Brand Content -->
              <div class="relative z-10 text-center ">
                <!-- Logo Image -->
                <div class="relative  mb-3">
                  <img src="/images/logo.png" alt="BCC Logo" class="shadow-2xl rounded-xl w-32 h-32 sm:w-40 sm:h-40 mx-auto drop-shadow-2xl filter" />
                  
                </div>
                  <div class="my-4 text-sm sm:text-base font-semibold">New Member?</div>
                  <button @click="currentSection = 'register'; startCamera()"
                      class="w-full hover:scale-105 hover:bg-teal-500 hover:border-purple border-2 hover:text-white py-4 bg-gray-100 p-4 text-purple-700 font-bold hover:bg-blue-50 rounded-2xl transition-all text-sm sm:text-base">
                      Quick Register with your student ID
                    </button>
               

                <!-- Brand Name -->
                

                <!-- Decorative Elements -->
                <div class="flex justify-center space-x-3 sm:space-x-4 mt-6 sm:mt-8">
                  <div class="w-3 h-3 bg-white/60 rounded-full animate-pulse"></div>
                  <div class="w-3 h-3 bg-white/40 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
                  <div class="w-3 h-3 bg-white/20 rounded-full animate-pulse" style="animation-delay: 0.4s"></div>
                </div>
              </div>
            </div>

            <!-- Right Side - Login Form -->
            <div class="relative  sm:p-10 lg:p-12 flex flex-col bg-gray-200 justify-center lg:order-last">
              <Transition name="form-transition" mode="out-in">
                <div v-if="currentSection === 'login'" key="login" class="space-y-8">
                  <div class="text-center space-y-3">
                    <h2 class="text-2xl sm:text-3xl font-black bg-gradient-to-r from-blue-700 vzia-red-600 to-yellow-500 bg-clip-text text-transparent">Log in</h2>
                    <p class="text-slate-500 font-medium">Personalize your progress</p>

                  </div>

                  <Transition name="notice-slide">
                    <div
                      v-if="authNotice.visible"
                      class="rounded-2xl border px-4 py-3 flex items-start gap-3"
                      :class="authNotice.type === 'error'
                        ? 'bg-rose-50 border-rose-200 text-rose-800'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-800'"
                    >
                      <div
                        class="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full"
                        :class="authNotice.type === 'error' ? 'bg-rose-100' : 'bg-emerald-100'"
                      >
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
                      <button @click="clearAuthNotice" class="text-xs font-bold opacity-70 hover:opacity-100 transition">
                        Close
                      </button>
                    </div>
                  </Transition>

                  <form @submit.prevent="handlePasswordLogin" class="space-y-4">
                    <div class="group">
                      <label class="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Username or Email</label>
                      <input v-model="loginForm.email" type="text" required placeholder="yourmailregistered@mail.com"
                        class="w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-800 font-medium mt-2" />
                    </div>
                    <div class="group">
                      <label class="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                      <input v-model="loginForm.password" type="password" required placeholder="••••••••"
                        class="w-full px-4 sm:px-5 py-3 sm:py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all text-slate-800 mt-2" />
                    </div>
                
                    <button type="submit" :disabled="isLoading"
                      class="w-full py-4 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400 hover:from-blue-700 hover:via-red-600 hover:to-yellow-600 text-white rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                      {{ isLoading ? 'Signing in...' : 'Sign In' }}
                    </button>
                  </form>

                  

                  <div class="relative py-4">
                    <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-slate-100"></div></div>
                    <div class="relative flex justify-center text-xs uppercase"><span class="bg-white px-4 text-slate-400 font-bold tracking-tighter">Or Social Login</span></div>
                  </div>

                  <div class="space-y-3">
                    <button @click="handleGoogleSignIn" :disabled="isLoading"
                      class="w-full flex items-center justify-center gap-3 py-4 bg-white border-2 border-slate-100 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm text-sm sm:text-base">
                      <img src="https://services.google.com/fh/files/misc/google_g_icon_download.png" class="w-6 h-6" />
                      <span>Google Account</span>
                    </button>
                    
                  </div>
                </div>

                <div v-else-if="currentSection === 'register'" key="register" class="space-y-6">
                  <div class="text-center">
                    <h2 class="text-xl sm:text-2xl font-black text-slate-900">Registration From ID Scan</h2>
                    <p class="text-xs sm:text-sm text-slate-500">We pre-fill your details and generate your email</p>

                  </div>

                  <div v-if="ocrLoading" class="text-center py-8">
                    <div class="w-16 h-16 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p class="font-bold text-slate-800 text-lg sm:text-xl tracking-tight">Reading ID: {{ ocrProgress }}%</p>
                    <p class="text-slate-500 mt-2">Processing image filters...</p>
                  </div>

                  <div v-if="!extractedData" class="space-y-4">
                    <div class="relative aspect-video bg-black rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                      <video ref="videoPlayer" autoplay playsinline class="w-full h-full object-cover"></video>
                      <div class="absolute inset-0 border-2 border-dashed border-white/50 m-6 rounded-2xl pointer-events-none"></div>
                    </div>
                    <div class="text-center text-xs sm:text-sm text-slate-500 font-semibold">
                      Sample ID format: <span class="font-mono text-slate-700">12-3456</span>
                    </div>
                    <div class="grid grid-cols-1 gap-3">
                      <button @click="captureAndScan" class="w-full py-5 bg-blue-600 text-white rounded-3xl text-lg sm:text-xl font-bold shadow-lg active:scale-95 transition-all">
                        Capture ID Photo
                      </button>
                      <button @click="$refs.fileInput.click()" class="w-full py-3 bg-slate-100 text-slate-600 rounded-2xl font-bold text-sm">
                        Choose from Gallery
                      </button>
                      <input type="file" ref="fileInput" class="hidden" @change="handleFileSelect" accept="image/*" />
                    </div>
                  </div>

                  <div v-else class="space-y-4">
                    <div class="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 space-y-4">
                      <div class="group">
                        <label class="text-xs font-black text-blue-500 uppercase tracking-widest ml-1">Full Name</label>
                        <input v-model="editableName" type="text" placeholder="e.g. JUAN DELA CRUZ"
                          class="w-full bg-white/80 border-2 border-white rounded-2xl px-5 py-4 font-bold text-slate-800 outline-none mt-2" />
                        <p class="text-[11px] text-blue-500/80 mt-2 ml-1">You can edit your name if OCR is unclear.</p>
                      </div>
                      <div class="group">
                        <label class="text-xs font-black text-blue-500 uppercase tracking-widest ml-1">Student ID Number</label>
                        <input :value="extractedData.idNumber" readonly aria-readonly="true"
                          class="w-full bg-white/80 border-2 border-white rounded-2xl px-5 py-4 font-mono font-bold text-slate-700 outline-none mt-2" />
                        <p class="text-[11px] text-blue-500/80 mt-2 ml-1">Student ID is read-only.</p>
                      </div>
                      <div class="group">
                        <label class="text-xs font-black text-blue-500 uppercase tracking-widest ml-1">Generated Email</label>
                        <input :value="generatedEmail" readonly aria-readonly="true"
                          class="w-full bg-white/80 border-2 border-white rounded-2xl px-4 sm:px-5 py-3 sm:py-4 font-mono font-bold text-slate-700 outline-none mt-2 text-sm sm:text-base" />
                        <p class="text-[11px] text-blue-500/80 mt-2 ml-1">Format: name + unique + combine@duyanSaKatawhan.com</p>
                      </div>
                    </div>

                    <div class="bg-white p-6 rounded-2xl border border-slate-100 space-y-4">
                      <div class="group">
                        <label class="text-xs font-black text-blue-500 uppercase tracking-widest ml-1">Role</label>
                        <input :value="registrationRole" readonly aria-readonly="true"
                          class="w-full bg-white/80 border-2 border-slate-100 rounded-2xl px-5 py-4 font-bold text-slate-700 outline-none mt-2" />
                      </div>
                      <div v-if="loginMode === 'faculty'" class="group">
                        <label class="text-xs font-black text-blue-500 uppercase tracking-widest ml-1">Faculty Code</label>
                        <input v-model="registrationForm.facultyCode" type="text" placeholder="BSISFACULTYCode"
                          class="w-full bg-white border-2 border-slate-100 focus:border-blue-400 rounded-2xl px-4 sm:px-5 py-3 sm:py-4 font-bold text-slate-800 outline-none transition-all mt-2" />
                      </div>
                      <div class="group">
                        <label class="text-xs font-black text-blue-500 uppercase tracking-widest ml-1">Create Password</label>
                        <input v-model="registrationForm.password" type="password" placeholder="Minimum 8 characters"
                          class="w-full bg-white border-2 border-slate-100 focus:border-blue-400 rounded-2xl px-4 sm:px-5 py-3 sm:py-4 font-bold text-slate-800 outline-none transition-all mt-2" />
                        <p class="text-[11px] text-slate-400 mt-2 ml-1">
                          {{ loginMode === 'faculty' ? 'Faculty registration requires the code above.' : (isValidStudentId ? 'Valid ID detected. You will be registered as student.' : 'Invalid ID format. Account will be users-notverified.') }}
                        </p>
                      </div>
                    </div>

                    <button @click="handleRegistrationComplete" :disabled="isLoading"
                      class="w-full py-5 bg-green-600 text-white rounded-3xl text-lg sm:text-xl font-bold shadow-xl shadow-green-100 active:scale-95 transition-all">
                      {{ isLoading ? 'Creating Account...' : 'Finish & Save Profile' }}
                    </button>

                    <button @click="extractedData = null; emailSeed = ''; startCamera()" class="w-full text-slate-400 font-bold text-sm">
                      Retake Photo
                    </button>
                  </div>

                  <button v-if="!extractedData" @click="currentSection = 'login'; stopCamera()" class="w-full mt-4 text-slate-400 font-bold text-sm">
                    Back to Login
                  </button>
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
          <p class="mt-2 text-sm text-slate-500">You are signed in. Continue to the home page.</p>
          <button
            @click="handleSuccessProceed"
            class="mt-6 w-full rounded-2xl bg-emerald-600 text-white font-semibold py-3 hover:bg-emerald-700 transition"
          >
            Proceed
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, reactive, onUnmounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { getRoleDefaultRoute } from '@/Components/roleNavigation';

const { loginWithGoogle, login, registerWithRole, isAuthenticated, isInitialized, role, userProfile } = useAuth();
const router = useRouter();
const props = defineProps({ isOpen: Boolean });
const emit = defineEmits(['close', 'login-success']);

const currentSection = ref('login');
const showSuccess = ref(false);
const authNotice = ref({
  visible: false,
  type: 'error',
  title: '',
  message: ''
});
const loginMode = ref('student');
const isLoading = ref(false);
const ocrLoading = ref(false);
const ocrProgress = ref(0);

const loginForm = reactive({ email: '', password: '' });
const registrationForm = reactive({ password: '', role: 'users-notverified', facultyCode: '' });
const loginFacultyCode = ref('');
const FACULTY_CODE = import.meta.env.VITE_FACULTY_CODE || 'BSISFACULTYTest';

const videoPlayer = ref(null);
const fileInput = ref(null);
const stream = ref(null);
const extractedData = ref(null);
const editableName = ref('');
const emailSeed = ref('');
const EMAIL_DOMAIN = 'bacolodcitycollege.com';
const ID_REGEX = /\b\d{2}-\d{4}\b/;
const STUDENT_ROLE = 'role_student';
const UNVERIFIED_ROLE = 'users-notverified';
const ID_CROP = { x: 0.58, y: 0.50, w: 0.36, h: 0.16 };
const OCR_FILTER = { brightness: 1.1, contrast: 1.4, saturation: 1.3, hue: -5 };

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

const toEmailLocalPart = (name) => {
  const normalized = (name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '')
    .slice(0, 18);
  return normalized || 'user';
};

const getUniqueToken = (idNumber) => {
  const digits = (idNumber || '').replace(/\D/g, '');
  if (digits.length >= 4) return digits.slice(-4);
  return String(Math.floor(1000 + Math.random() * 9000));
};

const generatedEmail = computed(() => {
  if (!extractedData.value?.fullName) return '';
  const local = toEmailLocalPart(extractedData.value.fullName);
  const unique = emailSeed.value || getUniqueToken(extractedData.value.idNumber);
  return `${local}${unique}combine@${EMAIL_DOMAIN}`;
});

const isValidStudentId = computed(() => Boolean(extractedData.value?.idNumber && ID_REGEX.test(extractedData.value.idNumber)));
const registrationRole = computed(() => {
  if (loginMode.value === 'faculty') return 'faculty';
  return isValidStudentId.value ? STUDENT_ROLE : UNVERIFIED_ROLE;
});

const setExtractedData = (data) => {
  extractedData.value = data;
  emailSeed.value = getUniqueToken(data?.idNumber);
  editableName.value = data?.fullName || '';
};

const cropToIdRegion = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const x = Math.floor(img.width * ID_CROP.x);
      const y = Math.floor(img.height * ID_CROP.y);
      const w = Math.floor(img.width * ID_CROP.w);
      const h = Math.floor(img.height * ID_CROP.h);
      canvas.width = Math.max(1, w);
      canvas.height = Math.max(1, h);
      ctx.drawImage(img, x, y, w, h, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL());
    };
    img.onerror = reject;
    img.src = src;
  });
};

const preprocessImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.filter = `brightness(${OCR_FILTER.brightness}) contrast(${OCR_FILTER.contrast}) saturate(${OCR_FILTER.saturation}) hue-rotate(${OCR_FILTER.hue}deg)`;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        const v = avg > 135 ? 255 : 0;
        data[i] = data[i + 1] = data[i + 2] = v;
      }
      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL());
    };
    img.onerror = reject;
    img.src = src;
  });
};

// Auth Handlers
const handleGoogleSignIn = async () => {
  isLoading.value = true;
  clearAuthNotice();
  try {
    if (loginMode.value === 'faculty' && loginFacultyCode.value.trim() !== FACULTY_CODE) {
      showAuthNotice('error', 'Login failed', 'Invalid faculty code.');
      return;
    }
    const result = await loginWithGoogle();
    if (result.success) {
      await waitForAuthState();
      const resolvedRole = role.value || userProfile.value?.role || '';
      showAuthNotice('success', 'Login successful', 'Your account is now signed in.');
      router.push(getRoleDefaultRoute(resolvedRole));
      showSuccess.value = true;
      emit('login-success');
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
    if (loginMode.value === 'faculty' && loginFacultyCode.value.trim() !== FACULTY_CODE) {
      showAuthNotice('error', 'Login failed', 'Invalid faculty code.');
      return;
    }
    const result = await login(loginForm.email, loginForm.password);
    if (result.success) {
      await waitForAuthState();
      const resolvedRole = role.value || userProfile.value?.role || '';
      showAuthNotice('success', 'Login successful', 'Your account is now signed in.');
      router.push(getRoleDefaultRoute(resolvedRole));
      showSuccess.value = true;
      emit('login-success');
    } else {
      showAuthNotice('error', 'Login failed', toFriendlyAuthMessage(result.error));
    }
  } finally {
    isLoading.value = false;
  }
};

// Helper function to wait for auth state
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

// Camera/OCR Logic
const startCamera = async () => {
  try {
    stream.value = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
    if (videoPlayer.value) videoPlayer.value.srcObject = stream.value;
  } catch (err) { alert("Camera access denied."); }
};

const stopCamera = () => {
  if (stream.value) stream.value.getTracks().forEach(t => t.stop());
};

const captureAndScan = async () => {
  const canvas = document.createElement('canvas');
  canvas.width = videoPlayer.value.videoWidth;
  canvas.height = videoPlayer.value.videoHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(videoPlayer.value, 0, 0);

  stopCamera();
  const processed = await preprocessImage(canvas.toDataURL());
  await runOCR(processed);
};
 
const runOCR = async (src) => {
  ocrLoading.value = true;
  try {
    const { createWorker } = await import('tesseract.js');
    const worker = await createWorker('eng', 1, {
      logger: m => { if (m.status === 'recognizing text') ocrProgress.value = Math.round(m.progress * 100); }
    });
    const { data: { text } } = await worker.recognize(src);
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 4);
    const idSrc = await cropToIdRegion(src);
    await worker.setParameters({
      tessedit_char_whitelist: '0123456789-',
      preserve_interword_spaces: '1'
    });
    const { data: { text: idText } } = await worker.recognize(idSrc);
    const idLines = idText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    setExtractedData({
      fullName: lines.find(l => /^[A-Z\s,.-]{5,}$/.test(l)) || "",
      idNumber: idLines.find(l => ID_REGEX.test(l)) || ""
    });
    await worker.terminate();
  } finally { ocrLoading.value = false; }
};

const handleFileSelect = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = async (ev) => {
      stopCamera();
      const processed = await preprocessImage(ev.target.result);
      runOCR(processed);
    };
    reader.readAsDataURL(file);
  }
};

const handleRegistrationComplete = async () => {
  if (!registrationForm.password) {
    alert("Please fill in all required fields.");
    return;
  }
  if (loginMode.value === 'faculty' && registrationForm.facultyCode.trim() !== FACULTY_CODE) {
    alert("Invalid faculty code.");
    return;
  }

  if (!extractedData.value?.fullName) {
    alert("Please scan or enter a valid name.");
    return;
  }
  const hasValidId = isValidStudentId.value;
  if (!generatedEmail.value) {
    alert("Email generation failed. Please rescan the ID.");
    return;
  }

  if (registrationForm.password.length < 8) {
    alert("Password must be at least 8 characters.");
    return;
  }

  isLoading.value = true;
  try {
    const roleToApply = registrationRole.value;
    const result = await registerWithRole(
      generatedEmail.value,
      registrationForm.password,
      editableName.value || extractedData.value.fullName,
      roleToApply,
      hasValidId ? extractedData.value.idNumber : null
    );
    if (result.success) {
      const profile = localStorage.getItem('userProfile');
      if (profile) {
        const parsed = JSON.parse(profile);
        if (hasValidId) {
          parsed.studentId = extractedData.value.idNumber;
        }
        parsed.role = roleToApply;
        localStorage.setItem('userProfile', JSON.stringify(parsed));
      } else {
        if (hasValidId) {
          localStorage.setItem('studentId', extractedData.value.idNumber);
        }
      }
      await waitForAuthState();
      const resolvedRole = role.value || userProfile.value?.role || roleToApply;
      router.push(getRoleDefaultRoute(resolvedRole));
      showSuccess.value = true;
      emit('login-success');
      emit('close');
    } else {
      alert(result.error || "Registration failed.");
    }
  } finally {
    isLoading.value = false;
  }
};

const handleClose = () => {
  stopCamera();
  currentSection.value = 'login';
  loginMode.value = 'student';
  loginFacultyCode.value = '';
  registrationForm.facultyCode = '';
  extractedData.value = null;
  showSuccess.value = false;
  clearAuthNotice();
  emit('close');
};

const handleSuccessProceed = () => {
  showSuccess.value = false;
  clearAuthNotice();
  emit('close');
  const resolvedRole = role.value || userProfile.value?.role || '';
  router.push(getRoleDefaultRoute(resolvedRole));
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

onUnmounted(stopCamera);
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
