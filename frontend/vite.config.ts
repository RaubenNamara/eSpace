import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(() => ({
  // Production is deployed under a subdirectory (https://stmark.sc.ug/eSpace/), and the dev
  // server mirrors that same /eSpace/ prefix (http://localhost:3000/eSpace/) so routes, the
  // API base URL, and asset URLs behave identically in both environments. Vite's dev server
  // strips the base off incoming requests itself before resolving modules/assets, so this one
  // setting is enough - see the proxy rewrite below for the one place that still needs to know
  // about it explicitly (the proxy sees the raw URL before Vite's base-stripping runs).
  base: '/eSpace/',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      // Registered explicitly in main.ts instead (with a periodic update check + forced
      // reload on update) - the default auto-injected script only ever calls
      // navigator.serviceWorker.register() once on load, with no logic to actively check for
      // a new deployment, so a tab left open (or a browser that only checks on its own
      // schedule) could stay on a stale cached build indefinitely. That matters here because
      // security-relevant changes (e.g. the mandatory teacher password-change screen) need
      // the app shell to actually be current, not just eventually.
      injectRegister: false,
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'eSpace - eLearning Management System',
        short_name: 'eSpace',
        description: 'Enterprise eLearning Management System for Secondary Schools',
        theme_color: '#4f46e5',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.espace\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 // 24 hours
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000,
    proxy: {
      // The proxy sees the raw incoming request URL (e.g. /eSpace/api/...) since it runs before
      // Vite's own base-stripping middleware, so the /eSpace prefix has to be matched here and
      // stripped again before forwarding to the backend, which expects plain /api/... paths.
      '/eSpace/api': {
        target: 'http://localhost/eSpace/backend/public',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/eSpace/, '')
      },
      '/eSpace/uploads': {
        target: 'http://localhost/eSpace/backend/public',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/eSpace/, '')
      }
    }
  }
}))
