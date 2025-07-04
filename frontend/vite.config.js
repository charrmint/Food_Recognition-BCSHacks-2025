import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server:{
    proxy:{
      "/api": {
        target:"http://localhost:5050", //shorthand
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
