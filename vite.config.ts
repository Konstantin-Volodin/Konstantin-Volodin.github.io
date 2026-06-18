import { defineConfig } from 'vite'
import { resolve } from 'path'
import { copyFileSync } from 'fs'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'copy-404',
      closeBundle() {
        copyFileSync(resolve('build/index.html'), resolve('build/404.html'))
      },
    },
  ],
  base: '/',
  build: {
    outDir: 'build',
  },
  publicDir: 'public'
})