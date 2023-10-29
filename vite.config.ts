import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import eslintPlugin from 'vite-plugin-eslint';
import path from 'path';

export default defineConfig({
    base: '',
    plugins: [
      react({
        include: /\.tsx$/,
        babel: {
          plugins: ['styled-components'],
          babelrc: false,
          configFile: false,
        }
      }),
      viteTsconfigPaths(),
      splitVendorChunkPlugin(),
      eslintPlugin({
        cache: false,
        include: ['./src/**/*.ts', './src/**/*.tsx'],
        exclude: ['./node_modules/**'],
      }),
    ],
    build: {
      target: 'esnext',
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) return 'vendor';
          }
        }
      }
    },
    server: {
      open: true,
      port: 3000,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    }
})