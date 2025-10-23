import { inject } from '@adonisjs/core'
import { CommandBus } from '#common/use-cases/command_bus'
import { HttpContext } from '@adonisjs/core/http'
import { createLobbyValidator } from '#validators/lobby/create_lobby_validator'
import { toClassInstance } from '#common/helpers/to_class_instance'
import { CreateLobbyCommand } from '#use-cases/lobby/create_lobby/create_lobby_command'

@inject()
export default class LobbyController {
  constructor(private readonly _commandBus: CommandBus) {}

  async create({ request, response, auth }: HttpContext): Promise<void> {
    const payload = await request.validateUsing(createLobbyValidator)
    const command = toClassInstance(CreateLobbyCommand, payload)

    const result = await this._commandBus.execute(command, { request, auth } as HttpContext)

    return response.status(result.status).json({
      success: result.status < 400,
      message: result.message,
      data: result.data,
    })
  }
}
