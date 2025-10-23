import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { LoginCommandFactory } from '#tests/factories/auth/login_command_factory'
import User from '#models/user'
import { UserFactory } from '#database/factories/user_factory'
import { LoginResponse } from '#use-cases/auth/login/login_response'

test.group('Auth - LoginHandler', (group) => {
  let user: User

  group.setup(() => testUtils.db().withGlobalTransaction())

  group.setup(async () => {
    user = await UserFactory.merge({
      password: 'password123',
    }).create()
  })

  test('should succeed', async ({ client, assert }) => {
    const request = LoginCommandFactory.create()
      .withEmail(user.email)
      .withPassword('password123')
      .get()

    const result = await client.post('/api/auth/login').form({
      ...request,
    })

    result.assertStatus(200)

    const body: LoginResponse = result.body()

    assert.isNotNull(body.token)
  })

  test('should fail with invalid credentials', async ({ client, assert }) => {
    const request = LoginCommandFactory.create().get()

    const result = await client.post('/api/auth/login').form({
      ...request,
    })

    result.assertStatus(400)

    assert.isTrue(result.hasError())

    const errors: string = (result.error() as any).text
    assert.include(errors, 'Invalid user credentials')
  })
})
