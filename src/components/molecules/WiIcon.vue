<script setup lang="ts">
interface Props {
  icon: string
  width?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: '',
  width: '100%',
})

const iconUrl = computed<string>(() => {
  return `/icons/${props.icon}.svg`
})
</script>

<template>
  <img :src="iconUrl" class="wi-icon" />
</template>

<style lang="scss" scoped>
.wi-icon {
  width: v-bind(width);
}
</style>
