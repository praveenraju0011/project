import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { path } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   port: 9000,
  //   proxy: {
  //     "/api/users": {
  //       target: "http://localhost:9000",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, "/api/users"),
  //     }
  //   }
  // }
})
