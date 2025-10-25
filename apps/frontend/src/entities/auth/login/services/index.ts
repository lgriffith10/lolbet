import type { LoginRequest, LoginResponse } from '@/entities/auth/login/types'
import { api } from '@/services/api.ts'
import type { AxiosResponse } from 'axios'

export async function loginMutation(request: LoginRequest): Promise<AxiosResponse<LoginResponse>> {
  return api.post('/auth/login', request)
}
