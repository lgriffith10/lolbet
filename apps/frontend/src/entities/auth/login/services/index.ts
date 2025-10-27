import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '@/entities/auth/login/types'
import { api, type ApiResponse, unwrap } from '@/utils/services/api.ts'

export async function loginMutation(request: LoginRequest): Promise<LoginResponse | null> {
  return unwrap(api.post<ApiResponse<LoginResponse>>('/auth/login', request))
}

export async function registerMutation(request: RegisterRequest): Promise<RegisterResponse | null> {
  return unwrap(api.post<ApiResponse<RegisterResponse>>('/auth/register', request))
}
