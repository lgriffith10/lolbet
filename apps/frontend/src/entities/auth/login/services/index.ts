import type { LoginRequest, LoginResponse } from '@/entities/auth/login/types'
import { api, type ApiResponse, unwrap } from '@/utils/services/api.ts'

export async function loginMutation(request: LoginRequest): Promise<LoginResponse | null> {
  return unwrap(api.post<ApiResponse<LoginResponse>>('/auth/login', request))
}
