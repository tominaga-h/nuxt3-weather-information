<script setup lang="ts"></script>

<template>
  <p class="mb-5 wi-section-title">
    <slot></slot>
  </p>
</template>

<style lang="scss" scoped>
.wi-section-title {
  font-size: 18px;
  font-weight: 700;
  font-family: $font-oswald;
  text-transform: uppercase;
  letter-spacing: 0.07rem;
}
</style>
