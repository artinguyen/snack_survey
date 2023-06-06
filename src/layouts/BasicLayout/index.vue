<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
const Header = defineAsyncComponent(() => import('@/components/organisms/Header/index.vue'))

/**
 * Layout: use for pages're logged
 */
</script>

<template>
  <div class="basic-layout">
    <Header />
    <div class="layout-root">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './styles.scss';
</style>
