import User from '#models/user'
import { CommandHandler } from '#common/decorators/command_handler_decorator'
import { BaseHandler } from '#common/use-cases/base_handler'
import { RegisterCommand } from './register_command.js'
import { RegisterResponse } from './register_response.js'
import { inject } from '@adonisjs/core'
import { CommandResult } from '#common/utils/commandResult'

@inject()
@CommandHandler(RegisterCommand)
export default class RegisterHandler extends BaseHandler<RegisterCommand, RegisterResponse> {
  async execute(command: RegisterCommand): Promise<CommandResult<RegisterResponse | null>> {
    const userExists = await User.query().where('email', command.email).first()

    if (userExists) {
      throw new Error('User with this email already exists')
    }

    const { id } = await User.create({
      username: command.username,
      password: command.password,
      email: command.email,
    })

    return CommandResult.created(new RegisterResponse(id))
  }
}
