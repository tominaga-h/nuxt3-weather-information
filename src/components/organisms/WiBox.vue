<script setup lang="ts">
interface Props {
  color?: string
}

defineProps<Props>()
</script>

<template>
  <v-sheet :color="color" class="wi-box" v-bind="$attrs">
    <slot></slot>
  </v-sheet>
</template>

<style lang="scss" scoped>
.wi-box {
  border-radius: 6px;
  border: 1px solid color('white', 0.1);
  padding: 16px;
}
</style>
