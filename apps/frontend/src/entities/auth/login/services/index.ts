import type { LoginRequest, LoginResponse } from '@/entities/auth/login/types'
import { api } from '@/utils/services/api.ts'

export async function loginMutation(request: LoginRequest): Promise<LoginResponse> {
  return api.post('/auth/login', request)
}
