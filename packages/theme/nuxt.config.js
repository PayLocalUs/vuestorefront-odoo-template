import webpack from 'webpack';
import theme from './themeConfig';
const isDev = process.env.NODE_ENV !== 'production';

export default {
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  components: ['~/components/'],
  css: ['@/assets/styles.scss'],
  head: {
    title: 'Cooke Contemporary Furniture',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'This project is a Odoo integration with Vue Storefront 2. This integration is being developed and maintained by ODOOGAP / PROMPTEQUATION'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'crossorigin'
      },
      {
        rel: 'preload',
        href: 'https://fonts.googleapis.com/css?family=Raleway:300,400,400i,500,600,700|Roboto:300,300i,400,400i,500,700&display=swap',
        as: 'style'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Raleway:300,400,400i,500,600,700|Roboto:300,300i,400,400i,500,700&display=swap',
        media: 'print',
        onload: 'this.media=\'all\''
      }
    ]
  },
  router: {
    middleware: ['checkout']
  },
  pwa: {
    manifest: {
      name: 'VSF Odoo ',
      lang: 'en',
      useWebmanifestExtension: false
    }
  },
  loading: { color: '#fff' },
  plugins: ['~/plugins/getImage.ts'],
  serverMiddleware: [
    // Server-side redirects
    '~/serverMiddleware/redirects'
  ],
  buildModules: [
    // to core
    '@nuxtjs/composition-api/module',
    '@nuxt/image',
    '@nuxtjs/pwa',
    '@nuxtjs/web-vitals',
    '@nuxtjs/tailwindcss',
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
    [
      '@vue-storefront/nuxt-theme',
      {
        generate: {
          replace: {
            apiClient: '@vue-storefront/odoo-api',
            composables: '@vue-storefront/odoo'
          }
        }
      }
    ],
    ['@vue-storefront/odoo/nuxt', {}],
    [
      '@vue-storefront/nuxt',
      {
        performance: {
          httpPush: true,
          purgeCSS: {
            enabled: false,
            paths: ['**/*.vue']
          }
        },
        // @core-development-only-start
        coreDevelopment: true,
        // @core-development-only-end
        useRawSource: {
          dev: ['@vue-storefront/odoo', '@vue-storefront/core'],
          prod: ['@vue-storefront/odoo', '@vue-storefront/core']
        }
      }
    ]
  ],
  publicRuntimeConfig: {
    theme,
    baseURL:
      process.env.PUBLIC_PATH ||
      process.env.BASE_URL ||
      'https://vsfdemo.labs.odoogap.com/'
  },
  modules: [
    '@nuxtjs/pwa',
    'nuxt-precompress',
    '@nuxt/image',
    '@vue-storefront/middleware/nuxt',
    'cookie-universal-nuxt',
    'vue-scrollto/nuxt',
    [
      '~/helpers/cache/nuxt',
      {
        invalidation: {
          endpoint: '/cache-invalidate',
          key: '0ead60c3-d118-40be-9519-d531462ddc60',
          handlers: ['./helpers/cache/defaultHandler']
        },
        driver: [
          './helpers/cache.js',
          {
            isDev,
            redis: {
              host: process.env.REDIS_HOST,
              port: process.env.REDIS_PORT,
              password: process.env.REDIS_PASSWORD,
              defaultTimeout: 86400
            }
          }
        ]
      }
    ],
    [
      'nuxt-i18n',
      {
        baseUrl: process.env.BASE_URL || 'http://localhost:3000'
      }
    ]
  ],
  nuxtPrecompress: {
    enabled: true,
    report: false,
    test: /\.(js|css|html|txt|xml|svg)$/,
    // Serving options
    middleware: {
      // You can disable middleware if you serve static files using nginx...
      enabled: true,
      // Enable if you have .gz or .br files in /static/ folder
      enabledStatic: true,
      // Priority of content-encodings, first matched with request Accept-Encoding will me served
      encodingsPriority: ['br', 'gzip']
    },

    // build time compression settings
    gzip: {
      // should compress to gzip?
      enabled: true,
      // compression config
      // https://www.npmjs.com/package/compression-webpack-plugin
      filename: '[path].gz[query]',
      threshold: 10240,
      minRatio: 0.8,
      compressionOptions: { level: 9 }
    },
    brotli: {
      // should compress to brotli?
      enabled: true,
      // compression config
      // https://www.npmjs.com/package/compression-webpack-plugin
      filename: '[path].br[query]',
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8
    }
  },
  i18n: {
    currency: 'USD',
    country: 'US',
    countries: [
      { name: 'US', label: 'United States' },
      { name: 'DE', label: 'Germany' }
    ],
    currencies: [
      { name: 'EUR', label: 'Euro' },
      { name: 'USD', label: 'Dollar' }
    ],
    locales: [
      {
        code: 'en',
        label: 'English',
        file: 'en.js',
        iso: 'en'
      },
      {
        code: 'de',
        label: 'German',
        file: 'de.js',
        iso: 'de'
      }
    ],
    defaultLocale: 'en',
    lazy: true,
    seo: true,
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: 'en',
      numberFormats: {
        en: {
          currency: {
            style: 'currency',
            currency: 'USD',
            currencyDisplay: 'symbol'
          }
        },
        de: {
          currency: {
            style: 'currency',
            currency: 'EUR',
            currencyDisplay: 'symbol'
          }
        }
      }
    },
    detectBrowserLanguage: false
  },
  styleResources: {
    scss: [
      require.resolve('@storefront-ui/shared/styles/_helpers.scss', {
        paths: [process.cwd()]
      })
    ]
  },
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
      ]
    },
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    },
    transpile: ['vee-validate/dist/rules'],
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map';
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': JSON.stringify({
          // eslint-disable-next-line global-require
          version: require('./package.json').version,
          lastCommit: process.env.LAST_COMMIT || ''
        })
      })
    ]
  }
};
