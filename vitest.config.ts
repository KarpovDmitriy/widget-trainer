import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@c': path.resolve(__dirname, './src/components'),
      '@p': path.resolve(__dirname, './src/pages'),
      '@s': path.resolve(__dirname, './src/store'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@data': path.resolve(__dirname, './src/data'),
      '@features': path.resolve(__dirname, './src/features'),
      '@locales': path.resolve(__dirname, './src/locales'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@api': path.resolve(__dirname, './src/api'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
