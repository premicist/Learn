import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // TODO: replace REPO_NAME with your GitHub repo's name, e.g. '/edusite-economics/'
  // This must match exactly (including the slashes) or the deployed site will
  // show a blank page. Leave as '/' only if you set up a custom domain.
  base: '/Learn.git/',
})
