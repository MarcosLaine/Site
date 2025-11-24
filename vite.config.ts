import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Como você tem domínio customizado (marcoslaine.com)
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // Otimizações de build - usando esbuild (mais rápido que terser)
    minify: 'esbuild',
    // Chunking otimizado
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
        },
        // Otimização de nomes de arquivos
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
    // Limite de aviso de tamanho
    chunkSizeWarningLimit: 1000,
  },
  // Otimizações de servidor
  server: {
    compress: true,
  },
  // Preview também com compressão
  preview: {
    compress: true,
  },
})

