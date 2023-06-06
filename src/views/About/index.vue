<script setup lang="ts">
import useCommon from '@/core/hooks/useCommon'

/**
 * Page view: About
 */

const { storeGetters, storeDispatch } = useCommon('useCounterStore')
const { count, doubleCount } = storeGetters()

const incremente = () => {
  storeDispatch('increment')
}
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>couter: {{ count }}</div>
    <div>doubleCount: {{ doubleCount }}</div>
    <button @click="incremente">increment</button>
  </div>
</template>

<style scoped lang="scss">
@import './styles.scss';
</style>
