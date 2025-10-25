<template>
  <form class="flex flex-col" @submit="onSubmit">
    <BetLoader :is-loading="isPending" />
    <div class="mb-2">
      <BetInputText
        v-model="email"
        v-bind="emailAttrs"
        type="email"
        label="Email"
        placeholder="john@doe.com"
        :error="errors.email"
        is-required
      />
      <BetInputText
        v-model="password"
        v-bind="passwordAttrs"
        type="password"
        label="Password"
        placeholder="******"
        :error="errors.password"
        is-required
      />
    </div>
    <button type="submit" :disabled="isPending" class="btn btn-primary">Login</button>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import BetInputText from '@/common/components/form/inputs/text/BetInputText.vue'
import { loginFormSchema } from '@/entities/auth/login/schema'
import { useLoginMutation } from '@/entities/auth/login/composables'
import BetLoader from '@/common/components/loaders/BetLoader.vue'
import { useToast } from 'vue-toastification'

const { mutateAsync, data, isError, isPending } = useLoginMutation()
const toast = useToast()

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(loginFormSchema),
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(async (form) => {
  mutateAsync({
    email: form.email,
    password: form.password,
  })
    .then(() => {
      console.log('data', data.value)
    })
    .catch(() => {
      toast.error('Invalid user credentials.')
    })
})
</script>
