<script setup lang="ts">
import { RouterView } from 'vue-router'
import Loading from '@/components/molecules/Loading/index.vue'
import { computed } from 'vue'
import useCommon from './core/hooks/useCommon'

/**
 * Page: Root page
 */
const { storeGetters } = useCommon('useCommonStore')
const isLoading = computed(() => {
  const { loading } = storeGetters()

  return loading.value
})
</script>

<template>
  <RouterView />
  <Loading :is-loading="isLoading" />
</template>
