import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_lobby'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.uuid('lobby_id').references('id').inTable('lobbies').onDelete('CASCADE').notNullable()

      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable()

      table.timestamp('joined_at', { useTz: true }).notNullable()
      table.boolean('is_owner').defaultTo(false)

      table.unique(['lobby_id', 'user_id'])

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
