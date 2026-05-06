import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Test configuration block — only used when running npm test
  test: {
    // jsdom simulates a browser environment for React components
    environment: 'jsdom',
    // globals: true lets us use describe, it, expect without importing them
    globals: true,
    // setupFiles runs before every test file
    setupFiles: './src/test-setup.ts',
  },
});