import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
    base: '',
    plugins: [react({
      include: /\.tsx$/,
      babel: {
        plugins: ['styled-components'],
        babelrc: false,
        configFile: false,
      }
    }), viteTsconfigPaths()],
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