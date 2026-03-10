import { createApp } from 'vue'
import App from './App.vue'
import router from './Router'
import '@/assets/main.css'

const app = createApp(App)

// Apply a subtle fade-in to mounted component roots across the SPA.
app.mixin({
  mounted() {
    const el = this?.$el
    if (!(el instanceof HTMLElement)) return
    if (!el.classList.contains('animate-fade-in')) {
      el.classList.add('animate-fade-in')
    }
  }
})

app.use(router)
app.mount('#app')
