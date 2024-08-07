import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  assetsInclude: ['**/*.PNG'],
  plugins: [react()],
  optimizeDeps: {
    include: ['jquery'],
  },
});

