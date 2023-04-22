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
const queryLang = route.query.lang as string

const menu = ref<boolean>(false)
const menuItems = ref<MenuItem[]>([])
const langModel = ref<boolean>(queryLang ? queryLang === 'ja' : true)
const forms = reactive({
  city: '',
})

const language = computed<Language>(() => {
  // true -> 日本語
  return langModel.value ? 'ja' : 'en'
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
  <div v-if="isDeviceMobile" class="wi-search-bar">
    <v-text-field
      v-model="forms.city"
      class="wi-search-bar__field"
      variant="solo"
      density="compact"
      placeholder="Search City"
      hide-details="auto"
      prepend-inner-icon="mdi-magnify"
      @keyup="search"
    />
    <v-menu
      v-model="menu"
      activator=".wi-search-bar__field"
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
    <v-switch
      v-model="langModel"
      :label="language"
      class="wi-search-bar__switch"
      hide-details="auto"
      inset
      @change="onChangeLanguage"
    ></v-switch>
  </div>
</template>

<style lang="scss" scoped>
.wi-search-bar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 0 16px;

  &__field {
    width: 210px;
    margin-right: 16px;
  }

  &__switch {
    :deep(.v-label) {
      color: color('white') !important;
      opacity: 1 !important;
    }
  }

  :deep(.v-text-field .v-field) {
    border-radius: 100px;
  }

  :deep(.v-list-item__prepend > .v-icon) {
    margin-inline-end: 13px !important;
  }
}
</style>
