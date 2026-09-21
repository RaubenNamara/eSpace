import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(() => ({
  // Production is deployed at the root of its own subdomain (https://espace.stmark.sc.ug/), so
  // every route, asset URL, and API call is root-relative - no prefix to strip anywhere. (An
  // older deployment lived under https://stmark.sc.ug/eSpace/ and needed base: '/eSpace/' plus
  // matching proxy rewrites here; that subpath deployment is no longer used.)
  base: '/',
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
  optimizeDeps: {
    // ckeditor5 is only ever reached through lazy route chunks (AssignmentBuilder.vue,
    // ENoteBuilder.vue - both `() => import(...)` in router/index.ts, never imported eagerly
    // anywhere), so Vite's dependency scanner never finds it at cold start. Left to its default
    // on-demand discovery, the *first* navigation to either page in a given dev server's
    // lifetime forces Vite to stop, re-optimize it mid-navigation, and reload - and CKEditor5's
    // own duplicate-instance guard (`ckeditor-duplicated-modules`) trips during that reload
    // race, since the page ends up with two evaluations of the same module. Pre-bundling it here
    // makes it available from cold start instead, so no lazy navigation ever triggers that path.
    include: ['ckeditor5', '@ckeditor/ckeditor5-vue']
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost/eSpace/backend/public',
        changeOrigin: true,
        secure: false
      },
      '/uploads': {
        target: 'http://localhost/eSpace/backend/public',
        changeOrigin: true
      }
    }
  }
}))
