import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/components/tests/setup.ts',
  },
});
