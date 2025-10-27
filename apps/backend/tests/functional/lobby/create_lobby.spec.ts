import { test } from '@japa/runner'
import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { UserFactory } from '#database/factories/user_factory'
import { CreateLobbyCommandFactory } from '#tests/factories/lobby/create_lobby_command_factory'
import Lobby from '#models/lobby'
import { CommandResult } from '#common/utils/command_result'
import { CreateLobbyResponse } from '#use-cases/lobby/create_lobby/create_lobby_response'

test.group('Lobby - CreateLobby', (group) => {
  let user: User

  group.setup(() => testUtils.db().withGlobalTransaction())
  group.setup(async () => {
    user = await UserFactory.create()
  })

  test('should succeed', async ({ client }) => {
    const request = CreateLobbyCommandFactory.create().get()

    const result = await client
      .post('/api/lobby/create')
      .form({ ...request })
      .loginAs(user)

    result.assertStatus(201)

    const body: CommandResult<CreateLobbyResponse> = result.body()

    const createdLobby = await Lobby.findOrFail(body.data.id)

    console.log({ createdLobby })
  })
})
