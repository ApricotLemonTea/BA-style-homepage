import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteCompression from 'vite-plugin-compression'
import viteImagemin from 'vite-plugin-imagemin'
import { VitePWA } from 'vite-plugin-pwa'
import { createHtmlPlugin } from 'vite-plugin-html'
import config from './_config.json'
import Font from 'vite-plugin-font'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    assetsInlineLimit: 0,
    minify: 'esbuild',
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    Font.vite({
      css: {
        fontFamily: 'BlueakaBeta2GBK'
      }
    }),
    createHtmlPlugin({
      inject: {
        data: {
          title: config.title,
          favicon: config.favicon,
          themeColor: config.manifest.theme_color,
          description: config.description,
          keywords: config.keywords
        }
      }
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      optipng: {
        optimizationLevel: 3
      },
      mozjpeg: {
        quality: 50
      },
      pngquant: {
        quality: [0.9, 1],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    }),
    VitePWA({
      mode: 'production',
      base: '/',
      registerType: 'prompt',
      injectRegister: 'auto',
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'ba-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 30
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      manifest: config.manifest
    }),
    viteCompression({
      threshold: 10240 // the unit is Bytes
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
