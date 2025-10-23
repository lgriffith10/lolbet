import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { inject } from '@adonisjs/core'
import { CommandBus } from '#common/use-cases/command_bus'
import { LoginCommand } from '#use-cases/auth/login/login_command'
import { toClassInstance } from '#common/helpers/to_class_instance'
import { RegisterCommand } from '#use-cases/auth/register/register_command'
import { loginValidator } from '#validators/auth/login_validator'
import { registerValidator } from '#validators/auth/register_validator'

@inject()
export default class AuthController {
  constructor(private readonly _commandBus: CommandBus) {}

  async login({ request, response }: HttpContext) {
    const payload = await request.validateUsing(loginValidator)
    const command = toClassInstance(LoginCommand, payload)
    return response.ok(await this._commandBus.execute(command))
  }

  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)
    const command = toClassInstance(RegisterCommand, payload)

    return response.created(await this._commandBus.execute(command))
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
