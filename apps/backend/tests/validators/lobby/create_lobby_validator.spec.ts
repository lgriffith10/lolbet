import { test } from '@japa/runner'
import { CreateLobbyCommandFactory } from '#tests/factories/lobby/create_lobby_command_factory'
import { createLobbyValidator } from '#validators/lobby/create_lobby_validator'

test.group('Lobby - createLobbyValidator', () => {
  test('should succeed', async ({ assert }) => {
    const request = CreateLobbyCommandFactory.create().get()

    const result = await createLobbyValidator.validate(request)

    assert.equal(result.name, request.name)
    assert.equal(result.description, request.description)
  })

  test('should fail if name is empty', async ({ assert }) => {
    const request = CreateLobbyCommandFactory.create().withName('').get()

    const result = await createLobbyValidator.tryValidate(request)

    assert.equal(result[0]!.messages[0].message, 'The name field must have at least 4 characters')
  })

  test('should fail is name is too long', async ({ assert }) => {
    const request = CreateLobbyCommandFactory.create().withName('a'.repeat(65)).get()

    const result = await createLobbyValidator.tryValidate(request)

    assert.equal(
      result[0]!.messages[0].message,
      'The name field must not be greater than 64 characters'
    )
  })

  test('should fail is description is too long', async ({ assert }) => {
    const request = CreateLobbyCommandFactory.create().withDescription('a'.repeat(129)).get()

    const result = await createLobbyValidator.tryValidate(request)

    assert.equal(
      result[0]!.messages[0].message,
      'The description field must not be greater than 128 characters'
    )
  })
})
