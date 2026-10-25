import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // This must match exactly (including the slashes) or the deployed site will
  // show a blank page. Leave as '/' only if you set up a custom domain.
  base: '/',
  define: {
    // Excalidraw requires this in Vite to choose the React build over Preact
    // and avoid "ReferenceError: process is not defined" in browser.
    'process.env.IS_PREACT': JSON.stringify('false'),
  },
})
