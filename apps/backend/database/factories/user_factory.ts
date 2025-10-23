import User from '#models/user'
import factory from '@adonisjs/lucid/factories'
import hash from '@adonisjs/core/services/hash'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      email: faker.internet.email(),
      username: faker.internet.username(),
      password: await hash.make(faker.internet.password()),
    }
  })
  .build()
