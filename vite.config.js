import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('firebase')) return 'vendor-firebase'
            if (id.includes('xlsx')) return 'vendor-xlsx'
            if (id.includes('tesseract.js')) return 'vendor-tesseract'
            if (id.includes('@lottiefiles')) return 'vendor-lottie'
            if (id.includes('vue-router')) return 'vendor-router'
            if (id.includes('vue')) return 'vendor-vue'
            return 'vendor'
          }
        }
      }
    },
    chunkSizeWarningLimit: 700
  }
})
