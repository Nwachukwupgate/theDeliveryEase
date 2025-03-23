import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist', // Ensure Netlify serves from 'dist'
  },
  server: {
    port: 3000, // Optional: Set a custom port
    open: true, // Optional: Open browser on start
  },
});
