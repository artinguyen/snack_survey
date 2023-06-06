<script setup lang="ts">
/**
 * Component: <UIDialog />
 */
// TODO: layout is demo not working

defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen">
      <divy class="fixed inset-0 bg-black opacity-30" />
      <div class="relative bg-white rounded-lg w-1/2">
        <div class="text-lg font-bold text-center p-4">
          <slot name="header"></slot>
        </div>
        <div class="p-4">
          <slot name="body"></slot>
        </div>
        <div class="flex justify-end p-4">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
