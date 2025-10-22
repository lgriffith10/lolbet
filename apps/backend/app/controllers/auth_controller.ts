import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'
import { AuthService } from '#services/auth_service'
import { LoginRequest } from '../dtos/auth/login_request.js'

@inject()
export default class AuthController {
  constructor(private readonly _authService: AuthService) {}

  async login({ request, response }: HttpContext) {
    const loginRequest: LoginRequest = await request.validateUsing(loginValidator)

    const data = await this._authService.login(loginRequest)
    return response.ok(data)
  }
  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    const user = await User.create(payload)

    return response.created(user)
  }

  async logout({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const token = auth.user?.currentAccessToken.identifier
    if (!token) {
      return response.badRequest({ message: 'Token not found' })
    }
    await User.accessTokens.delete(user, token)
    return response.ok({})
  }
}
