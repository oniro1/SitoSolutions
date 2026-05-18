import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/SitoSolutions/',
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        about: fileURLToPath(new URL('./about.html', import.meta.url)),
        servizi: fileURLToPath(new URL('./servizi.html', import.meta.url)),
        faq: fileURLToPath(new URL('./faq.html', import.meta.url)),
        contact: fileURLToPath(new URL('./contact.html', import.meta.url))
      },
      output: {
        manualChunks: undefined
      }
    }
  }
})
