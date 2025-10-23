import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import User from '#models/user'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Lobby extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare code: string

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column()
  declare ownerId: string

  @belongsTo(() => User)
  declare owner: BelongsTo<typeof User>

  @manyToMany(() => User, {
    localKey: 'id',
    pivotForeignKey: 'lobby_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id',
  })
  declare players: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(lobby: Lobby) {
    lobby.id = randomUUID()
  }
}
