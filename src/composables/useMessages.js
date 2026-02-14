import { ref } from 'vue'

const API_BASE = 'http://localhost:3000'

// Global state
const messages = ref([])
const loading = ref(false)
const error = ref(null)

export function useMessages() {
  
  // Send a message (for visitors)
  const sendMessage = async (visitorName, visitorEmail, content) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`${API_BASE}/messages/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          visitorName,
          visitorEmail,
          content
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to send message')
      }
      
      const newMessage = await response.json()
      messages.value.unshift(newMessage)
      
      return newMessage
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }
  
  // Fetch all messages (for admin)
  const fetchMessages = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`${API_BASE}/admin/messages`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch messages')
      }
      
      messages.value = await response.json()
      return messages.value
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }
  
  // Mark message as read (for admin)
  const markAsRead = async (messageId) => {
    try {
      const response = await fetch(`${API_BASE}/admin/messages/${messageId}/read`, {
        method: 'PATCH'
      })
      
      if (!response.ok) {
        throw new Error('Failed to mark as read')
      }
      
      const updatedMessage = await response.json()
      const index = messages.value.findIndex(m => m.id === messageId)
      if (index !== -1) {
        messages.value[index] = updatedMessage
      }
      
      return updatedMessage
    } catch (err) {
      error.value = err.message
      throw err
    }
  }
  
  // Mark message as replied (for admin)
  const markAsReplied = async (messageId) => {
    try {
      const response = await fetch(`${API_BASE}/admin/messages/${messageId}/reply`, {
        method: 'PATCH'
      })
      
      if (!response.ok) {
        throw new Error('Failed to mark as replied')
      }
      
      const updatedMessage = await response.json()
      const index = messages.value.findIndex(m => m.id === messageId)
      if (index !== -1) {
        messages.value[index] = updatedMessage
      }
      
      return updatedMessage
    } catch (err) {
      error.value = err.message
      throw err
    }
  }
  
  // Delete message (for admin)
  const deleteMessage = async (messageId) => {
    try {
      const response = await fetch(`${API_BASE}/admin/messages/${messageId}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete message')
      }
      
      messages.value = messages.value.filter(m => m.id !== messageId)
      return true
    } catch (err) {
      error.value = err.message
      throw err
    }
  }
  
  return {
    messages,
    loading,
    error,
    sendMessage,
    fetchMessages,
    markAsRead,
    markAsReplied,
    deleteMessage
  }
}

