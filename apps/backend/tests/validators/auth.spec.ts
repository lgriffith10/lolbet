import { test } from '@japa/runner'
import { loginValidator } from '#validators/auth'

test.group('Auth - loginValidator', () => {
  test('should succeed', async ({ assert }) => {
    const payload = {
      email: 'john@example.com',
      password: 'securepassword123',
    }

    const result = await loginValidator.validate(payload)
    assert.equal(result.email, 'john@example.com')
    assert.equal(result.password, 'securepassword123')
  })

  test('should fail when email is missing', async ({ assert }) => {
    const payload = {
      email: '',
      password: 'securepassword123',
    }

    try {
      await loginValidator.validate(payload)
      assert.fail('Validator should have thrown an error for email')
    } catch (error: any) {
      assert.deepInclude(error.messages, {
        message: 'The email field must be a valid email address',
        rule: 'email',
        field: 'email',
      })
    }
  })

  test('should fail when password is too short', async ({ assert }) => {
    const payload = {
      email: 'test@test.com',
      password: '123',
    }

    try {
      await loginValidator.validate(payload)
      assert.fail('Validator should have thrown an error for password')
    } catch (error: any) {
      assert.deepInclude(error.messages, {
        message: 'The password field must have at least 8 characters',
        rule: 'minLength',
        field: 'password',
        meta: { min: 8 },
      })
    }
  })

  test('should fail when password is too long', async ({ assert }) => {
    const payload = {
      email: 'test@test.com',
      password: '1'.repeat(65),
    }

    try {
      await loginValidator.validate(payload)
      assert.fail('Validator should have thrown an error for password')
    } catch (error: any) {
      assert.deepInclude(error.messages, {
        message: 'The password field must not be greater than 64 characters',
        rule: 'maxLength',
        field: 'password',
        meta: { max: 64 },
      })
    }
  })
})
