import User from '#models/user'
import { CommandHandler } from '../../../_common/decorators/command_handler_decorator.js'
import { Handler } from '../../../_common/use-cases/base_handler.js'
import { RegisterCommand } from './register_command.js'
import { RegisterResponse } from './register_response.js'

@CommandHandler(RegisterCommand)
export default class RegisterHandler implements Handler<RegisterCommand, RegisterResponse> {
  async execute(command: RegisterCommand): Promise<RegisterResponse> {
    const userExists = await User.query().where('email', command.email).first()

    if (userExists) {
      throw new Error('User with this email already exists')
    }

    const { id } = await User.create({
      username: command.username,
      password: command.password,
      email: command.email,
    })

    return new RegisterResponse({
      userId: id,
    })
  }
}
