<script setup lang="ts">
import { GeoCodingApiParams, GeoCodingApiResponse } from '@/types/weather'
import { GEOCODING_API_URL } from '@/lib/api'
import { Language } from '@/composables/useLang'

type MenuItem = {
  title: string
  subtitle: string
  lat?: number
  lon?: number
}

const { isDeviceMobile } = useDevice()
const route = useRoute()
const router = useRouter()

const appid = useRuntimeConfig().public.OPEN_WEATHER_API_KEY

const menu = ref<boolean>(false)
const menuItems = ref<MenuItem[]>([])
const languageModel = ref<boolean>((route.query.lang as string) === 'ja') // true -> 日本語
const forms = reactive({
  city: '',
})

const language = computed<Language>(() => {
  // true -> 日本語
  return languageModel.value ? 'ja' : 'en'
})

/**
 * Functions
 */

async function fetchGeoCodings() {
  const query: GeoCodingApiParams = {
    appid,
    q: forms.city,
    limit: 5,
  }
  const { data, error } = await useFetch<GeoCodingApiResponse[]>(
    GEOCODING_API_URL,
    {
      method: 'GET',
      query,
    }
  )
  if (error.value) {
    console.error(error.value)
    return null
  }
  return data.value
}

async function search() {
  console.log(forms.city)
  if (forms.city === '') {
    menuItems.value = []
    menu.value = false
    return
  }
  const response = await fetchGeoCodings()
  if (response && response.length) {
    menuItems.value = response?.map((data) => {
      return {
        title: data.name,
        subtitle: `${data.state ?? ''} ${data.country}`,
        lat: data.lat,
        lon: data.lon,
      }
    })
    // console.log(response)
    menu.value = true
  } else {
    menuItems.value = [
      {
        title: '場所が見つかりませんでした。',
        subtitle: '検索条件を変えてやりなおしてください。',
      },
    ]
  }
}

function onClickMenu(item: MenuItem) {
  router.push({
    query: {
      ...route.query,
      lat: item.lat,
      lon: item.lon,
    },
  })
}

function onChangeLanguage() {
  router.push({
    query: {
      ...route.query,
      lang: language.value,
    },
  })
}
</script>

<template>
  <v-app-bar color="teal" class="wi-app-bar" flat>
    <v-app-bar-title class="wi-app-bar__title">
      <v-icon>mdi-weather-dust</v-icon>
      <span class="ml-2">Weather Information</span>
    </v-app-bar-title>
    <template v-if="!isDeviceMobile">
      <div class="wi-app-bar__search">
        <v-text-field
          v-model="forms.city"
          class="wi-app-bar__field"
          variant="solo"
          density="compact"
          placeholder="Search City"
          hide-details="auto"
          prepend-inner-icon="mdi-magnify"
          @keyup="search"
        />
        <v-menu
          v-model="menu"
          activator=".wi-app-bar__field"
          :open-on-click="false"
        >
          <v-list lines="two">
            <template v-for="(item, i) in menuItems" :key="i">
              <v-list-item
                :title="item.title"
                :subtitle="item.subtitle"
                prepend-icon="mdi-map-marker-outline"
                @click="onClickMenu(item)"
              >
              </v-list-item>
            </template>
          </v-list>
        </v-menu>
      </div>
      <div class="wi-app-bar__switch">
        <v-switch
          v-model="languageModel"
          :label="language"
          hide-details="auto"
          inset
          @change="onChangeLanguage"
        ></v-switch>
      </div>
    </template>
  </v-app-bar>
</template>

<style lang="scss" scoped>
.wi-app-bar {
  width: 100vw !important;

  :deep(.v-toolbar__content) {
    width: 100% !important;
    justify-content: space-between !important;
  }

  &__title {
    font-size: 25px;
    font-family: $font-raleway;
    font-weight: 600;

    :deep(.v-toolbar-title__placeholder) {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }

  &__search {
    flex-grow: 0;
    width: 250px;
    margin: 0 20px;

    :deep(.v-text-field .v-field) {
      border-radius: 100px;
    }

    :deep(.v-list-item__prepend > .v-icon) {
      margin-inline-end: 13px !important;
    }
  }

  &__switch {
    flex-grow: 0;
    width: 100px;

    :deep(.v-label) {
      color: color('white') !important;
      opacity: 1 !important;
    }
  }
}
</style>
