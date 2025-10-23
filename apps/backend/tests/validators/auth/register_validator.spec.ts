import { test } from '@japa/runner'
import { RegisterCommandFactory } from '#tests/factories/auth/register_command_factory'
import { registerValidator } from '#validators/auth/register_validator'

test.group('Auth - Register validator', () => {
  test('should succeed', async ({ assert }) => {
    const request = RegisterCommandFactory.create().get()

    const result = await registerValidator.validate(request)
    assert.equal(result.email, request.email)
    assert.equal(result.password, request.password)
  })

  test('should fail with empty username', async ({ assert }) => {
    const request = RegisterCommandFactory.create().withUsername('').get()

    try {
      await registerValidator.validate(request)
      assert.fail('Validator should have thrown an error for username')
    } catch (error: any) {
      assert.equal(error.messages[0].message, 'The username field must have at least 4 characters')
    }
  })

  test('should fail with empty email', async ({ assert }) => {
    const request = RegisterCommandFactory.create().withEmail('').get()

    try {
      await registerValidator.validate(request)
      assert.fail('Validator should have thrown an error for email')
    } catch (error: any) {
      assert.equal(error.messages[0].message, 'The email field must be a valid email address')
    }
  })

  test('should fail with invalid email', async ({ assert }) => {
    const request = RegisterCommandFactory.create().withEmail('test-email.fr').get()

    try {
      await registerValidator.validate(request)
      assert.fail('Validator should have thrown an error for email')
    } catch (error: any) {
      assert.equal(error.messages[0].message, 'The email field must be a valid email address')
    }
  })

  test('should fail with empty password', async ({ assert }) => {
    const request = RegisterCommandFactory.create().withPassword('').get()

    try {
      await registerValidator.validate(request)
      assert.fail('Validator should have thrown an error for password')
    } catch (error: any) {
      assert.equal(error.messages[0].message, 'The password field must have at least 8 characters')
    }
  })
})
