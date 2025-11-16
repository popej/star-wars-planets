// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: process.env.NODE_ENV !== 'production' },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      }
    }
  },

  typescript: {
    strict: true,
    typeCheck: false
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/test-utils/module',
    '@vee-validate/nuxt'
  ],

  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },

  css: ['@/assets/styles/main.scss'],

  // Nitro configuration for server optimizations
  nitro: {
    compressPublicAssets: true, // Enable gzip/brotli compression
    minify: true,
    sourceMap: false,
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },

  // Router optimizations
  router: {
    options: {
      strict: true,
      hashMode: false
    }
  },

  // Experimental features for better performance
  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
    viewTransition: true
  },

  // Build optimizations
  build: {
    transpile: []
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: '@use "@/assets/styles/variables.scss" as *;'
        }
      }
    },
    build: {
      // Modern browser targets to reduce legacy JavaScript
      target: 'esnext',
      // Enable minification
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: process.env.NODE_ENV === 'production',
          drop_debugger: process.env.NODE_ENV === 'production',
          pure_funcs: process.env.NODE_ENV === 'production' ? ['console.log', 'console.info'] : []
        }
      },
      // Code splitting
      rollupOptions: {
        output: {
          manualChunks: {
            'vee-validate': ['vee-validate', '@vee-validate/yup'],
            'yup': ['yup']
          }
        }
      },
      // Chunk size warnings
      chunkSizeWarningLimit: 1000,
      // Enable CSS code splitting
      cssCodeSplit: true
    },
    // Performance optimizations
    optimizeDeps: {
      include: ['vee-validate', '@vee-validate/yup', 'yup']
    }
  },

  // Fonts optimization
  fonts: {
    defaults: {
      weights: [400, 700],
      styles: ['normal'],
      subsets: ['latin']
    }
  }
})