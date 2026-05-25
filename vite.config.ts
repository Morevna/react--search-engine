import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// vite.config.ts
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/react--search-engine/' : '/',
  plugins: [react()],
});