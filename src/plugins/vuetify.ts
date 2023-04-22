import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { customTheme } from '@/lib/theme'
import { wi } from '@/lib/iconsets/wi'

export const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'custom',
    themes: {
      custom: customTheme
    }
  },
  icons: {
    defaultSet: 'mdi',
    sets: {
      wi
    }
  }
})

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(vuetify)
})
