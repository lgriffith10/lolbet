import { CommandHandler } from '#common/decorators/command_handler_decorator'
import { CreateLobbyCommand } from '#use-cases/lobby/create_lobby/create_lobby_command'
import { BaseHandler } from '#common/use-cases/base_handler'
import { CreateLobbyResponse } from '#use-cases/lobby/create_lobby/create_lobby_response'
import Lobby from '#models/lobby'
import { inject } from '@adonisjs/core'
import { CommandResult } from '#common/utils/command_result'
import { RandomCharacterGeneratorService } from '#services/random_character_generator_service'
import LobbyCreatedEvent from '#events/lobby/lobby_created'

@inject()
@CommandHandler(CreateLobbyCommand)
export default class CreateLobbyHandler extends BaseHandler<
  CreateLobbyCommand,
  CreateLobbyResponse
> {
  constructor(private readonly randomCharacterGeneratorService: RandomCharacterGeneratorService) {
    super()
  }

  async execute(command: CreateLobbyCommand): Promise<CommandResult<CreateLobbyResponse | null>> {
    const userId = this.context?.auth.user?.id

    if (!userId) {
      return CommandResult.unauthorized()
    }

    const code = await this.randomCharacterGeneratorService.generateRandomCode()

    const lobby = await Lobby.create({
      code,
      name: command.name,
      description: command.description,
      ownerId: userId,
    })

    await LobbyCreatedEvent.dispatch(lobby)
    return CommandResult.created(new CreateLobbyResponse(lobby.id))
  }
}
