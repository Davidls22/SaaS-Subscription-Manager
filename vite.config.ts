import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 500, 
  },
  server: {
    proxy: {
      '/api': 'https://saas-subscription-manager.onrender.com', 
    },
  },
})