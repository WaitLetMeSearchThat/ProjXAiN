<template>
  <!-- Floating Button -->
  <button 
    @click="showModal = true" 
    class="big-contact-btn"
    :class="{ 'center': position === 'center', 'right': position === 'right', 'pulse': showPulse }"
  >
    <span class="btn-icon">📞</span>
    <span class="btn-text">{{ buttonText }}</span>
  </button>

  <!-- Modal -->
  <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <button class="modal-close" @click="closeModal">×</button>
      
      <div class="modal-header">
        <h2>{{ modalTitle }}</h2>
        <p>{{ modalSubtitle }}</p>
      </div>
      
      <div class="modal-content">
        <!-- Chat Option -->
        <div class="contact-option" v-if="showChat">
          <div class="option-icon">💬</div>
          <div class="option-content">
            <h3>{{ chatTitle }}</h3>
            <p>{{ chatDescription }}</p>
            <div class="contact-info">
              <span class="contact-label">Chat Platform:</span>
              <span class="contact-value">{{ chatPlatform }}</span>
            </div>
            <button @click="openChat" class="action-btn chat-btn">
              <span>Open Chat</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
          </div>
        </div>
        
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
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12-84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
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
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Define props for customization
const props = defineProps({
  // Contact details
  sellerEmail: {
    type: String,
    default: 'your.email@gmail.com'
  },
  sellerPhone: {
    type: String,
    default: '+639123456789'
  },
  
  // Button settings
  buttonText: {
    type: String,
    default: 'Contact Now'
  },
  buttonIcon: {
    type: String,
    default: '📞'
  },
  position: {
    type: String,
    default: 'right', // 'right', 'left', 'center'
  },
  
  // Modal settings
  modalTitle: {
    type: String,
    default: 'Contact Seller Directly'
  },
  modalSubtitle: {
    type: String,
    default: 'Dont Hesitate to contact!'
  },
  emailSubject: {
    type: String,
    default: 'Inquiry about your property'
  },
  emailBody: {
    type: String,
    default: 'Hello,\n\nI\'m interested in your property.\n\nPlease send me more information.\n\nThank you!'
  },
  
  // Content customization
  emailTitle: {
    type: String,
    default: 'Send Email'
  },
  emailDescription: {
    type: String,
    default: 'Email us directly'
  },
  phoneTitle: {
    type: String,
    default: 'Call or SMS'
  },
  phoneDescription: {
    type: String,
    default: 'Call us directly'
  },
  chatTitle: {
    type: String,
    default: 'Chat with Admin'
  },
  chatDescription: {
    type: String,
    default: 'Send us a message directly'
  },
  chatPlatform: {
    type: String,
    default: 'Facebook Messenger'
  },
  chatLink: {
    type: String,
    default: 'https://m.me/username'
  },
  copyText: {
    type: String,
    default: 'Or copy the contact information:'
  },
  
  // Toggle features
  showChat: {
    type: Boolean,
    default: false
  },
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
  },
  showPulse: {
    type: Boolean,
    default: true
  }
})

// Reactive state
const showModal = ref(false)
const modalButton = ref(null)

// Expose methods to parent component
defineExpose({
  openModal: () => { showModal.value = true },
  closeModal: () => { showModal.value = false }
})

// Close modal function
function closeModal() {
  showModal.value = false
}

const sendEmail = () => {
  const subject = encodeURIComponent(props.emailSubject)
  const body = encodeURIComponent(props.emailBody)
  
  window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${props.sellerEmail}&su=${subject}&body=${body}`, '_blank')
}

const makeCall = () => {
  window.open(`tel:${props.sellerPhone}`, '_blank')
}

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

// Close modal with Escape key
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && showModal.value) {
      closeModal()
    }
  })
}
</script>

<style scoped>
/* Big Contact Button */
.big-contact-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 32px;
  background: linear-gradient(135deg, #2d5a27 0%, #4a7c43 100%);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(45, 90, 39, 0.3);
  transition: all 0.3s ease;
  position: fixed;
  bottom: 30px;
  z-index: 1000;
}

.big-contact-btn.center {
  left: 50%;
  transform: translateX(-50%);
}

.big-contact-btn.right {
  right: 30px;
}

.big-contact-btn.left {
  left: 30px;
}

.big-contact-btn:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 12px 35px rgba(45, 90, 39, 0.4);
}

.big-contact-btn.center:hover {
  transform: translateX(-50%) translateY(-5px) scale(1.05);
}

.big-contact-btn:active {
  transform: translateY(-2px) scale(1.02);
}

.big-contact-btn.center:active {
  transform: translateX(-50%) translateY(-2px) scale(1.02);
}

.btn-icon {
  font-size: 1.5rem;
}

.btn-text {
  font-size: 1.1rem;
}

/* Add pulse animation if enabled */
.big-contact-btn.pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 8px 25px rgba(45, 90, 39, 0.3); }
  50% { box-shadow: 0 8px 30px rgba(45, 90, 39, 0.5); }
  100% { box-shadow: 0 8px 25px rgba(45, 90, 39, 0.3); }
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Modal */
.modal {
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.3s ease;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

@keyframes slideUp {
  from { 
    transform: translateY(50px) scale(0.95);
    opacity: 0; 
  }
  to { 
    transform: translateY(0) scale(1);
    opacity: 1; 
  }
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #666;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  z-index: 10;
}

.modal-close:hover {
  background: #f5f5f5;
  color: #333;
}

.modal-header {
  padding: 30px 30px 20px;
  text-align: center;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  color: #2d5a27;
  margin-bottom: 10px;
  font-size: 1.8rem;
}

.modal-header p {
  color: #666;
  margin: 0;
}

.modal-content {
  padding: 30px;
}

/* Contact Options */
.contact-option {
  display: flex;
  gap: 20px;
  margin-bottom: 25px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 12px;
  border: 1px solid #eee;
  transition: transform 0.2s ease;
}

.contact-option:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.option-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.option-content {
  flex: 1;
}

.option-content h3 {
  margin: 0 0 5px 0;
  color: #333;
}

.option-content p {
  margin: 0 0 15px 0;
  color: #666;
  font-size: 0.95rem;
}

.contact-info {
  background: white;
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  border: 1px solid #eee;
}

.contact-label {
  font-weight: 600;
  color: #555;
  margin-right: 10px;
}

.contact-value {
  color: #2d5a27;
  font-weight: 500;
}

/* Action Buttons */
.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.email-btn {
  background: #ea4335;
  color: white;
}

.email-btn:hover {
  background: #d33426;
  transform: translateY(-2px);
}

.phone-btn {
  background: #34a853;
  color: white;
}

.phone-btn:hover {
  background: #2d9248;
  transform: translateY(-2px);
}

/* Copy Section */
.contact-copy {
  margin-top: 30px;
  padding-top: 25px;
  border-top: 1px solid #eee;
  text-align: center;
}

.contact-copy p {
  color: #666;
  margin-bottom: 15px;
}

.copy-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.copy-btn {
  padding: 10px 20px;
  background: #f1f3f4;
  border: 1px solid #dadce0;
  border-radius: 8px;
  color: #333;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.copy-btn:hover {
  background: #e8eaed;
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 768px) {
  .big-contact-btn {
    padding: 16px 24px;
    font-size: 1rem;
  }
  
  .big-contact-btn.right {
    right: 20px;
  }
  
  .big-contact-btn.left {
    left: 20px;
  }
  
  .modal {
    width: 95%;
    margin: 20px;
  }
  
  .contact-option {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
  
  .copy-buttons {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .big-contact-btn {
    padding: 14px 20px;
  }
  
  .big-contact-btn .btn-text {
    display: none;
  }
  
  .big-contact-btn .btn-icon {
    font-size: 1.8rem;
    margin: 0;
  }
  
  .modal-header {
    padding: 25px 20px 15px;
  }
  
  .modal-content {
    padding: 20px;
  }
}
</style>