<template>
  <div class="flex flex-1 h-screen">
    <!-- TODO: Dynamic layout -->
    <component :is="'PublicLayout'">
      <RouterView />
    </component>
  </div>
</template>

<script lang="ts" setup>
import { useLocalStorage } from '@vueuse/core'
import { onMounted } from 'vue'
import { useAuthStore } from '@/entities/store/useAuthStore.ts'

const authStore = useAuthStore()

const token = useLocalStorage('token', undefined)

onMounted(() => {
  console.log('token', token.value)
  if (token.value) {
    authStore.setToken(token.value)
    authStore.setIsAuthenticated(true)
  }
})
</script>
