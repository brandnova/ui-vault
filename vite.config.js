import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ui-vault/',
  build: {
    manifest: true,
    outDir: 'dist'
  },
  server: {
    origin: 'http://localhost:5173',
  },
})
