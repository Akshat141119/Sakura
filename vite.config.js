import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Load environment variables from .env file
// https://vite.dev/config/
export default defineConfig({
  base: "/Sakura/",
  plugins: [react()],
});
