import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 3000 },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@generated': path.relative(__dirname, './src/__generated__'),
    },
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    svgr(),
  ],
  build: {
    sourcemap: true,
  },
});
