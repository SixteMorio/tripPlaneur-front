import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: "./",
  plugins: [vue()],
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg', '**/*.Vue'],
});

