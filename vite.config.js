import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { apiGeneratorPlugin } from './plugins/api-generator.js'

export default defineConfig({
  plugins: [react(), tailwindcss(), apiGeneratorPlugin()],
  base: '/',
  build: {
    outDir: 'build',
    emptyOutDir: true,
  },
})
