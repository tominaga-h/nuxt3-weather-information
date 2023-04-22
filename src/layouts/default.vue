<script setup lang="ts"></script>

<template>
  <v-app theme="custom" class="text-white" full-height>
    <wi-app-bar />
    <v-main>
      <wi-search-bar />
      <slot></slot>
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped></style>
