<script setup lang="ts">
interface Props {
  icon: string
  value?: string | number
  unit: string
  description: string
}

defineProps<Props>()
</script>

<template>
  <div class="wi-information-list-item">
    <v-icon class="icon">{{ icon }}</v-icon>
    <div class="info">
      <p class="info-value">
        <span class="value">{{ value }}</span>
        <span class="unit">{{ unit }}</span>
      </p>
      <p class="info-description">{{ description }}</p>
    </div>
    <slot name="option"></slot>
  </div>
</template>

<style lang="scss" scoped>
.wi-information-list-item {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  .icon {
    margin-right: 10px;
    font-size: 50px;
  }

  .info {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    height: 50px;
    line-height: 20px;
    padding-top: 8px;

    .info-value {
      .value {
        font-size: 25px;
        font-family: $font-nunito;
        font-weight: 500;
      }
      .unit {
        font-size: 18px;
        margin-left: 5px;
        letter-spacing: -0.09rem;
        color: color('white', 0.85);
      }
    }

    .info-description {
      font-size: 15px;
    }
  }
}
</style>
