import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_lobby'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id')

      table.uuid('user_id').references('users.id')
      table.uuid('lobby_id').references('lobbies.id')
      table.unique(['user_id', 'lobby_id'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
