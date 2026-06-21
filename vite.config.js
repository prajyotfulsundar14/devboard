import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Both servers forward /api to the Go backend, stripping the /api prefix
// (the backend mounts its routes at the root: /projects, /tasks, /search).
//
//   server.proxy  → `npm run dev` (local dev on :5173) → backend on localhost:8080
//   preview.proxy → `npm run preview` (the Docker container) → backend on the
//                   compose network, reachable by its service name `backend`.
export default defineConfig({
  root: __dirname,
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [resolve(__dirname, './src/test/setup.js')],
    css: false,
  },
});
