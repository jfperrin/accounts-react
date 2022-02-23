import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      port: 3000,
      protocol: 'ws',
    },
    proxy: {
      '/graphql': {
        target: 'ws://localhost:4123',
        changeOrigin: true,
        ws: true,
      },
    },
  },
});
