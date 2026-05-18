import { defineConfig } from 'vite'

export default defineConfig({
  base: '/SitoSolutions/',
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})
