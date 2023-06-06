<script setup lang="ts">
import { decimalTrunc, formatNumber } from '@/core/utils/regexValidate'
import { defineAsyncComponent } from 'vue'
const TheWelcome = defineAsyncComponent(() => import('@/components/templates/home/TheWelcome.vue'))

/**
 * Page view: Home
 */
</script>

<template>
  <main>
    <TheWelcome />

    <div>Format number {{ formatNumber(30000.2342, 2) }}</div>
    <div>decimalTrunc {{ decimalTrunc(3000220.2342, 1) }}</div>
  </main>
</template>

<style scoped lang="scss">
@import './styles.scss';
</style>
