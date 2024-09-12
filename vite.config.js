import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // เปิดให้สามารถเข้าถึงจากภายนอกได้
    proxy: {
      '/api': {
        target: 'http://172.20.213.81:5000', // Backend server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // เปลี่ยน /api เป็น /
      },
    },
  },
});
