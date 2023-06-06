<script setup lang="ts">
/**
 * Component: <Loading />
 */

defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div v-if="isLoading" class="base-loading">
    <div class="loading-inner">Loading...</div>
  </div>
</template>

<style scoped lang="scss">
/* Just demo. Custom your style loading */
.base-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgb(0 0 0 / 50%);
  display: flex;
  align-items: center;
  justify-content: center;
  .loading-inner {
    font-weight: bold;
    font-size: 30px;
    letter-spacing: 2px;
    opacity: 1;
    z-index: 1;
    color: #fff;
  }
}
</style>
