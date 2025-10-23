import User from '#models/user'
import { LoginRequest } from '../dtos/auth/login_request.js'
import { LoginResponse } from '../dtos/auth/login_response.js'

export class AuthService {
  async login(request: LoginRequest): Promise<LoginResponse> {
    const user = await User.verifyCredentials(request.email, request.password)
    const token = await User.accessTokens.create(user)

    return {
      token: token.toJSON().token,
    }
  }
}
