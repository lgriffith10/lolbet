<template>
  <div class="flex flex-1 justify-center items-center">
    <div class="card overflow-hidden relative w-96 shadow-sm py-5 px-8">
      <h1 class="card-title">Let's e-bet</h1>

      <div class="card-body">
        <LoginForm />

        <p class="text-end">
          You don't have an account ?

          <RouterLink :to="{ name: 'Register' }">
            <span class="text-info underline">Register</span>
          </RouterLink>
          !
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import LoginForm from '@/teams/auth/login/LoginForm.vue'
</script>
