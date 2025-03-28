import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { copyFileSync } from 'fs'

function copy404Plugin() {
  return {
    name: 'copy-404',
    closeBundle() {
      copyFileSync(resolve(__dirname, 'dist/index.html'), resolve(__dirname, 'dist/404.html'))
    }
  }
}

export default defineConfig({
  plugins: [react(), copy404Plugin()]
})
