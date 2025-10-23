import { inject } from '@adonisjs/core'
import { CommandBus } from '#common/use-cases/command_bus'
import { HttpContext } from '@adonisjs/core/http'
import { CreateLobbyResponse } from '#use-cases/lobby/create_lobby/create_lobby_response'
import { createLobbyValidator } from '#validators/lobby/create_lobby_validator'
import { toClassInstance } from '#common/helpers/to_class_instance'

@inject()
export default class LobbyController {
  constructor(private readonly _commandBus: CommandBus) {}

  async createLobby({ request, response }: HttpContext): Promise<void> {
    const payload = await request.validateUsing(createLobbyValidator)
    const command = toClassInstance(CreateLobbyResponse, payload)

    return response.created(await this._commandBus.execute(command))
  }
}
