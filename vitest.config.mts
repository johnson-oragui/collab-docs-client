import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  resolve: {
    tsconfigPaths: true,
  },

  test: {
    globals: true,
    environment: 'jsdom',

    setupFiles: ['./vitest.setup.ts'],

    include: ['**/*.{test,spec}.{ts,tsx}'],

    exclude: [
      'node_modules',
      '.next',
      'out',
      'build',
      'dist',
    ],

    clearMocks: true,
    restoreMocks: true,
  },
});