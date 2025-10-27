import { useMutation } from '@tanstack/vue-query'
import { loginMutation, registerMutation } from '@/entities/auth/login/services'
import type { LoginRequest } from '@/entities/auth/login/types'

export function useLoginMutation() {
  return useMutation({
    mutationFn: (request: LoginRequest) => loginMutation(request),
  })
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: (request: LoginRequest) => registerMutation(request),
  })
}
