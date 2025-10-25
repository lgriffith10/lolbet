<template>
  <Transition name="fade" mode="out-in" :duration="200">
    <div
      v-if="isLoading"
      class="absolute flex justify-center items-center bg-gray-500/30 z-50 top-0 left-0 w-full h-full"
    >
      <span class="loading loading-spinner loading-xl"></span>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
interface Props {
  isLoading: boolean
}

defineProps<Props>()
</script>
