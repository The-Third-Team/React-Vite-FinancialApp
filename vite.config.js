import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://newleafbe-d8d834bde5db.herokuapp.com/',
        changeOrigin: true,
      },
    }
  }
})