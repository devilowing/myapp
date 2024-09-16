import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // เปิดให้สามารถเข้าถึงจากภายนอกได้
    port: 5173, // ตรวจสอบให้ตรงกับพอร์ตที่ Vite แสดง
    proxy: {
      '/api': {
        target: 'http://10.148.0.4:5000', // Backend server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // เปลี่ยน /api เป็น /
      },
    },
  },
});
