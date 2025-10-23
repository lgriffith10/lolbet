import { test } from '@japa/runner'
import { loginValidator } from '#validators/auth/login_validator'
import { LoginCommandFactory } from '#tests/factories/auth/login_command_factory'

test.group('Auth - loginValidator', () => {
  test('should succeed', async ({ assert }) => {
    const request = LoginCommandFactory.create().get()

    const result = await loginValidator.validate(request)
    assert.equal(result.email, request.email)
    assert.equal(result.password, request.password)
  })

  test('should fail when email is missing', async ({ assert }) => {
    const request = LoginCommandFactory.create().withEmail('').get()

    try {
      await loginValidator.validate(request)
      assert.fail('Validator should have thrown an error for email')
    } catch (error: any) {
      assert.equal(error.messages[0].message, 'The email field must be a valid email address')
    }
  })

  test('should fail when password is too short', async ({ assert }) => {
    const request = LoginCommandFactory.create().withPassword('123').get()

    try {
      await loginValidator.validate(request)
      assert.fail('Validator should have thrown an error for password')
    } catch (error: any) {
      assert.equal(error.messages[0].message, 'The password field must have at least 8 characters')
    }
  })

  test('should fail when password is too long', async ({ assert }) => {
    const request = LoginCommandFactory.create().withPassword('a'.repeat(65)).get()

    try {
      await loginValidator.validate(request)
      assert.fail('Validator should have thrown an error for password')
    } catch (error: any) {
      assert.equal(
        error.messages[0].message,
        'The password field must not be greater than 64 characters'
      )
    }
  })
})
