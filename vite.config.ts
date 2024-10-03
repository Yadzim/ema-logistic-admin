import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: "/src/components",
      assets: "/src/assets",
      pages: "/src/pages",
      hooks: "/src/hooks",
      utils: "/src/utils",
      models: "/src/models",
      config: "/src/config",
      routes: "/src/routes",
      stores: "/src/stores",
      services: "/src/services",
      locales: "/src/locales",
    },
  },
})
