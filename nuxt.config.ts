// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  srcDir: 'src/',
  build: {
    transpile: ['vuetify'],
  },
  modules: ['@nuxtjs/google-fonts'],
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
    '@/assets/css/weather-icons.min.css',
    '@/assets/css/weather-icons-wind.min.css',
  ],
  runtimeConfig: {
    public: {
      OPEN_WEATHER_API_KEY: process.env.OPEN_WEATHER_API_KEY,
    },
  },
  components: {
    dirs: [
      {
        path: '~/components/atoms',
        extensions: ['.vue'],
        pathPrefix: false,
      },
      {
        path: '~/components/molecules',
        extensions: ['.vue'],
        pathPrefix: false,
      },
      {
        path: '~/components/organisms',
        extensions: ['.vue'],
        pathPrefix: false,
      },
    ],
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/global" as *;',
        },
      },
    },
  },
  googleFonts: {
    families: { 'Montserrat': true },
  },
})
