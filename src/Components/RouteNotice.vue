<template>
  <Teleport to="body">
    <Transition name="route-notice-fade">
      <div v-if="modelValue" class="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="handleClose"></div>
        <div class="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-slate-100 p-6 sm:p-8 text-center">
          <div class="mx-auto h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center">
            <svg class="h-7 w-7 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
            </svg>
          </div>
          <h3 class="mt-4 text-xl font-bold text-slate-900">{{ title }}</h3>
          <p class="mt-2 text-sm text-slate-500">{{ message }}</p>
          <div class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              v-if="secondaryLabel"
              @click="handleSecondary"
              class="w-full rounded-2xl border border-slate-200 text-slate-700 font-semibold py-3 hover:bg-slate-50 transition"
            >
              {{ secondaryLabel }}
            </button>
            <button
              @click="handlePrimary"
              class="w-full rounded-2xl bg-blue-600 text-white font-semibold py-3 hover:bg-blue-700 transition"
            >
              {{ primaryLabel }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
   <div v-if="resolvedRole === 'role_registrar'" class="px-4 pb-4 border-t border-white/10 space-y-3">
          <button
            @click="showRegistrarChat = !showRegistrarChat"
            class="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition"
          >
            {{ showRegistrarChat ? 'Hide Chatbot' : 'Open Chatbot' }}
          </button>
          <div
            v-if="showRegistrarChat"
            class="rounded-2xl bg-white/5 border border-white/10 p-2 max-h-[60vh] overflow-y-auto"
          >
            <GradeInquiryChatbot />
          </div>
        </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: true },
  title: { type: String, default: 'Notice' },
  message: { type: String, default: 'This page contains restricted content.' },
  primaryLabel: { type: String, default: 'Continue' },
  secondaryLabel: { type: String, default: '' }
});

const emit = defineEmits(['update:modelValue', 'primary', 'secondary', 'close']);

const handleClose = () => {
  emit('update:modelValue', false);
  emit('close');
};

const handlePrimary = () => {
  emit('primary');
  handleClose();
};

const handleSecondary = () => {
  emit('secondary');
  handleClose();
};
</script>

<style scoped>
.route-notice-fade-enter-active,
.route-notice-fade-leave-active {
  transition: all 0.25s ease;
}
.route-notice-fade-enter-from,
.route-notice-fade-leave-to {
  opacity: 0;
  transform: scale(0.97);
}
</style>
