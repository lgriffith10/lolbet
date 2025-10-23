import { Handler } from './../../../_common/use-cases/base_handler.js'
import User from '#models/user'
import { CommandHandler } from '../../../_common/decorators/command_handler_decorator.js'
import { LoginCommand } from './login_command.js'
import { LoginResponse } from './login_response.js'

@CommandHandler(LoginCommand)
export class LoginHandler implements Handler<LoginCommand, LoginResponse> {
  async execute(request: LoginCommand): Promise<LoginResponse> {
    const user = await User.verifyCredentials(request.email, request.password)
    const token = await User.accessTokens.create(user)

    return {
      token: token.toJSON().token,
    }
  }
}
