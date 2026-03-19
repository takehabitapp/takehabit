import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Sitemap({ 
      hostname: 'https://takehabit.com',
      dynamicRoutes: [
        '/',
        '/onboarding',
        '/login',
        '/register',
        '/dashboard',
        '/create-habit',
        '/habits',
        '/privacy-policy',
        '/terms-and-conditions',
      ]
    })
  ],
})
