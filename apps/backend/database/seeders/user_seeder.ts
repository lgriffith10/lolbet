import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    User.createMany([
      {
        username: 'admin',
        email: 'admin@lolbet.com',
        password: 'lolbet123',
      },
    ])
  }
}
