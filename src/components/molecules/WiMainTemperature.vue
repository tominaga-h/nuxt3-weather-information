<script setup lang="ts">
import { CurrentWeatherApiResponse } from '@/types/weather'
import { formatDate } from '@/lib/date'

interface Props {
  weather?: CurrentWeatherApiResponse | null
  name: string
  description?: string
}

const props = defineProps<Props>()

/**
 * Helper Functions
 */

const weatherIconIdentifier = () => {
  if (!props.weather) return '01d'
  return props.weather.weather[0].icon
}

const formattedDate = () => {
  return formatDate(new Date(), 'yyyy年M月d日(E) HH時mm分')
}
</script>

<template>
  <section v-if="weather" class="wi-main-temperature">
    <wi-section-title>Now</wi-section-title>
    <div class="weather-image">
      <wi-icon :icon="weatherIconIdentifier()"></wi-icon>
    </div>
    <div class="weather-temperature">
      <span>{{ weather?.main.feels_like }}</span>
      <v-icon class="weather-temperature__unit">
        mdi-temperature-celsius
      </v-icon>
    </div>
    <div class="weather-description">
      <span>{{ description }}</span>
    </div>
    <div class="weather-options">
      <div class="weather-options__data">
        <v-icon>mdi-map-marker-outline</v-icon>
        <span class="text-uppercase font-oswald">{{ name }}</span>
      </div>
      <div class="weather-options__data">
        <v-icon>mdi-calendar-blank-outline</v-icon>
        <span class="ml-1">{{ formattedDate() }}</span>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.wi-main-temperature {
  .weather-image {
    width: 200px;
    margin: 0 auto;
  }

  .weather-temperature {
    width: 100%;
    font-size: 50px;
    font-family: $font-nunito;
    font-weight: 700;
    text-align: center;
    line-height: 60px;

    &__unit {
      font-size: 40px;
    }
  }

  .weather-description {
    width: 100%;
    font-size: 20px;
    font-family: $font-raleway;
    font-weight: 500;
    text-align: center;
  }

  .weather-options {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    height: auto;
    color: color('white', 0.9);
    border-top: 1px solid color('white', 0.6);
    margin-top: 40px;
    padding-top: 15px;
    font-family: $font-nunito;
    font-size: 16px;
    font-weight: 500;
    line-height: 33px;

    @media ($sm <= width <= $md) {
      flex-direction: row;
    }

    @media (max-width: $xs) {
      flex-direction: column;
    }
  }
}
</style>
