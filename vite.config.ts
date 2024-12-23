import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '@data': resolve(__dirname, 'src/.vitepress/data'),
    },
  },
})
