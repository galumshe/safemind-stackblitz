import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'images', // Point directly to images folder
  build: {
    outDir: 'dist'
  }
});