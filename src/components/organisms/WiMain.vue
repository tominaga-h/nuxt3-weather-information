<script setup lang="ts"></script>

<template>
  <div class="wi-main" v-bind="$attrs">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.wi-main {
  display: block;
  width: 100%;
  min-height: 500px;
  background: color('white', 0.3);
  border: 1px solid color('white', 0.8);
  border-radius: 10px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0px 5px 20px color('black', 0.4);
}
</style>
