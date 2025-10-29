import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Como você tem domínio customizado (marcoslaine.com)
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
})

