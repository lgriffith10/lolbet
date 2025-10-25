import { BaseHandler } from '#common/use-cases/base_handler'
import User from '#models/user'
import { CommandHandler } from '#common/decorators/command_handler_decorator'
import { LoginCommand } from './login_command.js'
import { LoginResponse } from './login_response.js'
import { inject } from '@adonisjs/core'
import { CommandResult } from '#common/utils/commandResult'

@inject()
@CommandHandler(LoginCommand)
export class LoginHandler extends BaseHandler<LoginCommand, LoginResponse> {
  constructor() {
    super()
  }

  async execute(request: LoginCommand): Promise<CommandResult<LoginResponse | null>> {
    const user = await User.verifyCredentials(request.email, request.password)
    const token = await User.accessTokens.create(user)

    return CommandResult.ok(new LoginResponse(token.toJSON().token!))
  }
}
