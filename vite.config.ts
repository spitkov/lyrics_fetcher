import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "lyrics_fetcher",
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
