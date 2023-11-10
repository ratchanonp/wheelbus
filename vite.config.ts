import react from '@vitejs/plugin-react-swc';
import { defineConfig, splitVendorChunkPlugin } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    splitVendorChunkPlugin()
  ],
  server: {
    watch: {
      usePolling: true
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // React
          if (id.includes('react')) {
            return 'react';
          }

          // React Router
          if (id.includes('react-router')) {
            return 'react-router';
          }

          // Firebase
          if (id.includes('firebase')) {
            return 'firebase';
          }

          // Chakra UI
          if (id.includes('@chakra-ui')) {
            return 'chakra-ui';
          }
        }
      }
    }
  }
})
