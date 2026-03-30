// v1.4 - Vite config for Jeremy's personal website (migrated from CRA)
// Uses HashRouter so no special server historyApiFallback needed
// .js files treated as JSX via pre-transform plugin (project uses .js extension for React components)
// blogSavePlugin: dev-only API for in-browser blog editor
import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';
import blogSavePlugin from './vite-plugin-blog-save.js';

export default defineConfig({
  plugins: [
    // Pre-transform plugin: runs before vite:import-analysis to handle JSX in .js files
    {
      name: 'treat-js-files-as-jsx',
      enforce: 'pre',
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) return null;
        return transformWithEsbuild(code, id, { loader: 'jsx', jsx: 'automatic' });
      },
    },
    react(),
    blogSavePlugin(),
  ],
  // Vercel serves from root
  base: '/',
  build: {
    // Output to 'dist/' (gh-pages -d dist)
    outDir: 'dist',
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
});
