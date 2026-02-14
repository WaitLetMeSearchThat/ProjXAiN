<template>
  <div class="messages-panel">
    <button class="floating-btn" @click="togglePanel">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      <span>E-Kontak ang Owner! Click Here!</span>
    </button>

    <transition name="slide">
      <div v-if="isOpen" class="chat-panel">
        <div class="chat-header">
          <div class="admin-status">
            <span class="status-dot online"></span>
            <span>We are Actively Online</span>
          </div>
          <button class="close-btn" @click="togglePanel">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="chat-content">
          <!-- Email Option -->
          <div class="contact-option" v-if="showEmail">
            <div class="option-icon">📧</div>
            <div class="option-content">
              <h3>{{ emailTitle }}</h3>
              <p>{{ emailDescription }}</p>
              <div class="contact-info">
                <span class="contact-label">Email:</span>
                <span class="contact-value">{{ sellerEmail }}</span>
              </div>
              <button @click="sendEmail" class="action-btn email-btn">
                <span>Open Gmail</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Phone Option -->
          <div class="contact-option" v-if="showPhone">
            <div class="option-icon">📱</div>
            <div class="option-content">
              <h3>{{ phoneTitle }}</h3>
              <p>{{ phoneDescription }}</p>
              <div class="contact-info">
                <span class="contact-label">Phone:</span>
                <span class="contact-value">{{ sellerPhone }}</span>
              </div>
              <button @click="makeCall" class="action-btn phone-btn">
                <span>Call Now</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Copy Option -->
          <div class="contact-copy" v-if="showCopy">
            <p>{{ copyText }}</p>
            <div class="copy-buttons">
              <button @click="copyToClipboard(sellerEmail, 'email')" class="copy-btn" v-if="showEmail">
                Copy Email
              </button>
              <button @click="copyToClipboard(sellerPhone, 'phone')" class="copy-btn" v-if="showPhone">
                Copy Phone
              </button>
            </div>
          </div>
        </div>

        <div class="chat-footer">
          <p>Response time: 24-48 hours</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Props for customization
const props = defineProps({
  // Contact details
  sellerEmail: {
    type: String,
    default: 'feleciano.ssr@gmail.com'
  },
  sellerPhone: {
    type: String,
    default: '+639935871508'
  },
  
  // Content customization
  emailTitle: {
    type: String,
    default: 'Send Email'
  },
  emailDescription: {
    type: String,
    default: 'Typically reply within 15-25 mins.'
  },
  phoneTitle: {
    type: String,
    default: 'Call or SMS'
  },
  phoneDescription: {
    type: String,
    default: 'Prefer to text first:'
  },
  copyText: {
    type: String,
    default: 'Or copy the contact information:'
  },
  
  // Toggle features
  showEmail: {
    type: Boolean,
    default: true
  },
  showPhone: {
    type: Boolean,
    default: true
  },
  showCopy: {
    type: Boolean,
    default: true
  }
})

// Reactive state
const isOpen = ref(false)

// Toggle panel
const togglePanel = () => {
  isOpen.value = !isOpen.value
}

// Email function
const sendEmail = () => {
  window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${props.sellerEmail}`, '_blank')
}

// Phone function
const makeCall = () => {
  window.open(`tel:${props.sellerPhone}`, '_blank')
}

// Copy to clipboard function
const copyToClipboard = async (text, type) => {
  try {
    await navigator.clipboard.writeText(text)
    alert(`${type === 'email' ? 'Email' : 'Phone number'} copied to clipboard!`)
  } catch (err) {
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    alert(`${type === 'email' ? 'Email' : 'Phone number'} copied to clipboard!`)
  }
}
</script>

<style scoped>
.messages-panel { position: fixed; bottom: 20px; right: 20px; z-index: 1000; }

.floating-btn { 
  display: flex; 
  align-items: center; 
  gap: 0.75rem; 
  background: linear-gradient(135deg, #2d5a27, #4a7c43); 
  color: white; 
  border: none; 
  padding: 1rem 1.5rem; 
  border-radius: 50px; 
  font-size: 1rem; 
  font-weight: 600; 
  cursor: pointer; 
  box-shadow: 0 10px 40px rgba(45, 90, 39, 0.3);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.floating-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s ease;
}

.floating-btn:hover::before {
  left: 100%;
}

.floating-btn:hover { 
  transform: translateY(-3px); 
  box-shadow: 0 15px 50px rgba(45, 90, 39, 0.4);
}

.chat-panel { 
  position: absolute; 
  bottom: 80px; 
  right: 0; 
  width: 380px; 
  max-height: 70vh; 
  background: white; 
  border-radius: 20px; 
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15); 
  overflow: hidden; 
  display: flex; 
  flex-direction: column; 
  border: 1px solid rgba(45, 90, 39, 0.1);
}

.chat-header { 
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
  padding: 1.25rem 1.5rem; 
  background: linear-gradient(135deg, #2d5a27, #4a7c43); 
  color: white;
  position: relative;
}

.chat-header::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #ffd700, #ffec8b);
}

.admin-status { 
  display: flex; 
  align-items: center; 
  gap: 0.75rem; 
  font-weight: 600;
  font-size: 0.95rem;
}

.status-dot { 
  width: 10px; 
  height: 10px; 
  border-radius: 50%; 
  background: #ccc; 
  position: relative;
}

.status-dot.online { 
  background: #4ade80; 
  box-shadow: 0 0 10px rgba(74, 222, 128, 0.5); 
  animation: pulse 2s infinite; 
}

@keyframes pulse { 
  0%, 100% { opacity: 1; transform: scale(1); } 
  50% { opacity: 0.8; transform: scale(1.1); } 
}

.close-btn { 
  background: rgba(255, 255, 255, 0.2); 
  border: none; 
  color: white; 
  padding: 0.5rem; 
  border-radius: 8px; 
  cursor: pointer; 
  font-size: 1.5rem; 
  width: 36px; 
  height: 36px; 
  display: flex; 
  align-items: center; 
  justify-content: center;
  transition: all 0.2s ease;
}

.close-btn:hover { 
  background: rgba(255, 255, 255, 0.3); 
  transform: rotate(90deg);
}

.chat-content { 
  padding: 1.5rem; 
  overflow-y: auto; 
  flex: 1; 
  max-height: 60vh; 
}

/* Contact Options */
.contact-option { 
  display: flex; 
  gap: 15px; 
  margin-bottom: 20px; 
  padding: 20px; 
  background: #f9f9f9; 
  border-radius: 16px; 
  border: 1px solid #e8f5e9;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.contact-option::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #2d5a27, #4a7c43);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.contact-option:hover { 
  transform: translateY(-5px); 
  box-shadow: 0 10px 30px rgba(45, 90, 39, 0.15);
  border-color: #c8e6c9;
}

.contact-option:hover::before {
  transform: scaleX(1);
}

.option-icon { 
  font-size: 2.5rem; 
  flex-shrink: 0; 
  transition: transform 0.3s ease;
}

.contact-option:hover .option-icon {
  transform: scale(1.15);
}

.option-content { flex: 1; }

.option-content h3 { 
  margin: 0 0 8px 0; 
  color: #1a1a1a; 
  font-size: 1.1rem;
  font-weight: 600;
}

.option-content p { 
  margin: 0 0 12px 0; 
  color: #666; 
  font-size: 0.9rem;
  line-height: 1.5;
}

.contact-info { 
  background: white; 
  padding: 10px 14px; 
  border-radius: 8px; 
  margin-bottom: 12px; 
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.contact-label { 
  font-weight: 600; 
  color: #555; 
  font-size: 0.85rem; 
}

.contact-value { 
  color: #2d5a27; 
  font-weight: 500; 
  font-size: 0.9rem; 
  word-break: break-all;
}

/* Action Buttons */
.action-btn { 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  gap: 10px; 
  width: 100%; 
  padding: 14px; 
  border: none; 
  border-radius: 12px; 
  font-size: 0.95rem; 
  font-weight: 600; 
  cursor: pointer; 
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.email-btn { 
  background: linear-gradient(135deg, #ea4335, #d33426); 
  color: white; 
}

.email-btn:hover { 
  background: linear-gradient(135deg, #d33426, #c22e1f); 
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(234, 67, 53, 0.3);
}

.phone-btn { 
  background: linear-gradient(135deg, #34a853, #2d9248); 
  color: white; 
}

.phone-btn:hover { 
  background: linear-gradient(135deg, #2d9248, #26803d); 
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(52, 168, 83, 0.3);
}

/* Copy Section */
.contact-copy { 
  margin-top: 20px; 
  padding-top: 20px; 
  border-top: 1px solid #eee; 
  text-align: center; 
  position: relative;
}

.contact-copy::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #ffd700, #ffec8b);
  border-radius: 2px;
}

.contact-copy p { 
  color: #555; 
  margin-bottom: 15px; 
  font-size: 0.9rem;
  font-weight: 500;
}

.copy-buttons { 
  display: flex; 
  gap: 12px; 
  justify-content: center; 
}

.copy-btn { 
  padding: 10px 20px; 
  background: white; 
  border: 2px solid #2d5a27; 
  border-radius: 8px; 
  color: #2d5a27; 
  font-weight: 600; 
  cursor: pointer; 
  font-size: 0.85rem; 
  transition: all 0.3s ease;
}

.copy-btn:hover { 
  background: #2d5a27; 
  color: white; 
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(45, 90, 39, 0.2);
}

.chat-footer { 
  padding: 1rem 1.5rem; 
  background: #f8f9fa; 
  border-top: 1px solid #e5e7eb; 
}

.chat-footer p { 
  font-size: 0.8rem; 
  color: #888; 
  text-align: center; 
  margin: 0; 
  font-weight: 500;
}

/* Transitions */
.slide-enter-active, .slide-leave-active { 
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
}

.slide-enter-from, .slide-leave-to { 
  opacity: 0; 
  transform: translateY(30px) scale(0.95); 
}

/* Responsive */
@media (max-width: 480px) { 
  .chat-panel { 
    width: calc(100vw - 40px); 
    right: -10px; 
  } 
  .floating-btn span { 
    display: none; 
  } 
  .floating-btn { 
    padding: 1rem; 
  }
}

@media (max-width: 360px) {
  .chat-panel {
    width: calc(100vw - 20px);
    right: -5px;
  }
  
  .copy-buttons {
    flex-direction: column;
  }
  
  .copy-btn {
    width: 100%;
  }
}
</style>

