import pkg from './package.json'
import NuxtConfiguration from '@nuxt/config'
import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import { NuxtConfigurationModule } from '@nuxt/config/types/module'
import { PluginItem } from '@babel/core'

const modules: NuxtConfigurationModule[] = ['@nuxtjs/axios']

if (process.env.REDDITDECK_PWA) {
  modules.push('@nuxtjs/pwa')
}

if (process.env.REDDITDECK_TRACKING) {
  modules.push([
    '@nuxtjs/google-analytics',
    {
      id: 'UA-137863717-1',
      dev: false
    }
  ])
}

const config: NuxtConfiguration = {
  mode: 'spa',
  modern: false,

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  router: {
    mode: 'hash'
  },

  /*
   ** Customize the progress-bar color
   */
  loading: false,

  /*
   ** Global CSS
   */
  css: ['~/assets/style/app.styl'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/localStorage',
    '@/plugins/vuetify',
    '@/plugins/promised'
  ],

  /*
   ** Nuxt.js modules
   */
  modules,

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    babel: {
      presets(_, [preset, options]): PluginItem[] {
        return [
          [
            preset,
            {
              ...options,
              ...{
                targets: {
                  browsers: ['last 2 Chrome versions']
                }
              }
            }
          ]
        ]
      }
    },
    publicPath: '/assets',
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient && config.module) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

export default config
