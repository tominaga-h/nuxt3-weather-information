<script setup lang="ts">
import {
  CurrentWeatherApiParams,
  CurrentWeatherApiResponse,
} from '@/types/weather'

const appid = useRuntimeConfig().public.OPEN_WEATHER_API_KEY
const Api_URL = 'https://api.openweathermap.org/data/2.5/weather'
const weather = ref<CurrentWeatherApiResponse | null>()

const weatherIconIdentifier = () => {
  if (!weather.value) return ''
  return weather.value.weather[0].icon
}

async function fetch() {
  const query: CurrentWeatherApiParams = {
    appid,
    lat: '35.6828387',
    lon: '139.7594549',
    units: 'metric',
  }
  const { data, error } = await useFetch<CurrentWeatherApiResponse>(Api_URL, {
    method: 'GET',
    query,
  })

  if (error.value) {
    console.error(error.value)
    return
  }
  return data.value
}

onMounted(async () => {
  weather.value = await fetch()
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="d-flex align-center">
              <img :src="`/icons/${weatherIconIdentifier()}.svg`" width="300" />
              <h1 class="text-h1 font-weight-bold">
                {{ weather?.main.feels_like }}℃
              </h1>
            </div>
          </v-col>
          <v-col cols="2">
            <h1>
              <v-icon>mdi-water-percent</v-icon>
              {{ weather?.main.humidity }}%
            </h1>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>
.test {
  color: red;
}
</style>
