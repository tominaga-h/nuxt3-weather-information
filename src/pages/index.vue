<script setup lang="ts">
import {
  CurrentWeatherApiParams,
  CurrentWeatherApiResponse,
  ForecastApiParams,
  ForecastApiResponse,
} from '@/types/weather'
import { WEATHER_API_URL, FORECAST_API_URL } from '@/lib/api'
import { Language } from '@/composables/useLang'

const appid = useRuntimeConfig().public.OPEN_WEATHER_API_KEY
const weather = ref<CurrentWeatherApiResponse | null>()

const route = useRoute()
const { description, setLang } = useLang()

const name = ref<string>('tokyo')
const lat = ref<string>((route.query.lat as string) ?? '35.6828387')
const lon = ref<string>((route.query.lon as string) ?? '139.7594549')
const language = ref<Language>((route.query.lang as Language) ?? 'ja')

setLang(language.value)

/**
 * Functions
 */

async function fetchForecast() {
  const query: ForecastApiParams = {
    appid,
    lat: lat.value,
    lon: lon.value,
    units: 'metric',
    cnt: 10,
  }
  const { data, error } = await useFetch<ForecastApiResponse>(
    FORECAST_API_URL,
    {
      method: 'GET',
      query,
    }
  )

  if (error.value) {
    console.log(error.value)
    return
  }
  if (data.value) {
    console.log(data.value.city.name)
    data.value.list.forEach((data) => {
      console.log(data.dt_txt)
    })
  }
}

async function fetchWeather() {
  const query: CurrentWeatherApiParams = {
    appid,
    lat: lat.value,
    lon: lon.value,
    units: 'metric',
    lang: language.value,
  }
  const { data, error } = await useFetch<CurrentWeatherApiResponse>(
    WEATHER_API_URL,
    {
      method: 'GET',
      query,
    }
  )

  if (error.value) {
    console.error(error.value)
    return null
  }
  if (data.value) {
    // await fetchReverseGeo()
    name.value = data.value.name
    return data.value
  }
}

watch(route, async () => {
  const { lat: _lat, lon: _lon, lang: _lang } = route.query
  lat.value = _lat as string
  lon.value = _lon as string
  language.value = _lang as Language
  setLang(language.value)
  console.log(_lat, _lon, _lang)
  await fetchWeather()
})

onMounted(async () => {
  weather.value = await fetchWeather()
  // await fetchForecast()
})
</script>

<template>
  <v-container class="wi-app">
    <v-row justify="center">
      <v-col cols="12" md="4">
        <wi-box color="teal-lighten-2" class="wi-app__wrapper">
          <wi-main-temperature
            :weather="weather"
            :name="name"
          ></wi-main-temperature>
        </wi-box>
      </v-col>

      <v-col cols="12" md="8">
        <wi-box color="teal-lighten-2">
          <wi-section-title>INFORMATION</wi-section-title>
          <v-row class="information-list">
            <v-col cols="12" md="6">
              <wi-information-list-item
                icon="mdi-thermometer-chevron-up"
                :value="weather?.main.temp_max"
                unit="℃"
                :description="description.max"
              ></wi-information-list-item>
            </v-col>
            <v-col cols="12" md="6">
              <wi-information-list-item
                icon="mdi-thermometer-chevron-down"
                :value="weather?.main.temp_min"
                unit="℃"
                :description="description.min"
              ></wi-information-list-item>
            </v-col>
            <v-col cols="12" md="6">
              <wi-information-list-item
                icon="mdi-weather-windy"
                :value="weather?.wind.speed"
                unit="m/sec"
                :description="description.wind.speed"
              />
            </v-col>
            <v-col cols="12" md="6">
              <wi-information-list-item
                :icon="`wi:wi-wind towards-${weather?.wind.deg}-deg`"
                :value="weather?.wind.deg"
                unit="deg"
                :description="description.wind.degree"
              />
            </v-col>
            <v-col cols="12" md="6">
              <wi-information-list-item
                icon="mdi-water-percent"
                :value="weather?.main.humidity"
                unit="%"
                :description="description.humidity"
              />
            </v-col>
            <v-col cols="12" md="6">
              <wi-information-list-item
                icon="wi:wi-tornado"
                :value="weather?.main.pressure"
                unit="hPa"
                :description="description.pressure"
              ></wi-information-list-item>
            </v-col>
          </v-row>
        </wi-box>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.wi-app {
  &__wrapper {
    height: auto;
  }
}
</style>
