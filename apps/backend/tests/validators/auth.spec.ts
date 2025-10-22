import { test } from '@japa/runner'
import { loginValidator } from '#validators/auth'

test.group('Auth - loginValidator', () => {
  test('valide correctement un payload valide', async ({ assert }) => {
    const payload = {
      fullName: 'John Doe',
      email: 'john@example.com',
      password: 'securepassword123',
    }

    const result = await loginValidator.validate(payload)
    assert.equal(result.email, 'john@example.com')
    assert.equal(result.password, 'securepassword123')
  })
})
