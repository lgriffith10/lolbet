import { test } from '@japa/runner'
import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { UserFactory } from '#database/factories/user_factory'
import { RegisterCommandFactory } from '#tests/factories/auth/register_command_factory'
import { RegisterResponse } from '#use-cases/auth/register/register_response'

test.group('Auth - RegisterHandler', (group) => {
  let user: User

  group.setup(() => testUtils.db().withGlobalTransaction())

  group.setup(async () => {
    user = await UserFactory.create()
  })

  test('should succeed', async ({ client, assert }) => {
    const request = RegisterCommandFactory.create().get()

    const result = await client.post('/api/auth/register').form({
      ...request,
    })

    result.assertStatus(201)

    const body: RegisterResponse = result.body()

    const createdUser = await User.findBy('email', request.email)
    assert.isNotNull(body.data.userId, createdUser!.id)
  })

  test('should fail with already taken email', async ({ client, assert }) => {
    const request = RegisterCommandFactory.create().withEmail(user.email).get()

    const result = await client.post('/api/auth/register').form({
      ...request,
    })

    result.assertStatus(500)
    assert.isTrue(result.hasError())
  })
})
