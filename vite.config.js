import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: 'src/assets/**',
  base: process.env.NODE_ENV === 'production' ? '/gallery-models/' : '/',
  plugins: [react()],
})
