import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/entry.esm.js'),
      name: 'Vue3Easteregg',
      formats: ['es', 'cjs', 'iife'],
      fileName: (format) => {
        if (format === 'es') {
          return 'Vue3Easteregg.esm.js';
        }
        if (format === 'cjs') {
          return 'Vue3Easteregg.ssr.js';
        }
        if (format === 'iife') {
          return 'Vue3Easteregg.min.js';
        }
      }
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})