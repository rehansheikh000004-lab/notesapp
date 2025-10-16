import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.',        // project root (frontend folder)
  publicDir: 'public',
  build: {
    outDir: 'dist',
  },
})