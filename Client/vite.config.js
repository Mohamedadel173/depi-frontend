// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // خليها زي ما هي

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // خليها زي ما هي
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://depi-backend-five.vercel.app',
        changeOrigin: true,
      },
    },
  },
});