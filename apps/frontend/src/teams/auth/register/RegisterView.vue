<template>
  <div class="flex flex-1 justify-center items-center">
    <div class="card overflow-hidden relative w-96 shadow-sm py-5 px-8">
      <h1 class="card-title">{{ $t('auth.form.register.title') }}</h1>

      <div class="card-body">
        <RegisterForm />

        <p class="text-end">
          You already have an account ?

          <RouterLink :to="{ name: 'Login' }">
            <span class="text-info underline">Login</span>
          </RouterLink>
          !
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import RegisterForm from '@/teams/auth/register/components/RegisterForm.vue'
</script>
