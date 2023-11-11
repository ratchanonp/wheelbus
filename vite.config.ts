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

          // Chakra UI Icons
          if (id.includes('@chakra-ui/icons')) {
            return 'chakra-ui-icons';
          }

          // Split every page into a separate chunk splitting by the last `/`
          if (id.includes('src/pages')) {
            return 'page-' + id.slice(id.lastIndexOf('/') + 1).toLowerCase();
          }
        }
      }
    }
  },
  // https://vitejs.dev/config/#resolve-alias
  resolve: {
    alias: {
      "@": "/src",
    }
  }
})
