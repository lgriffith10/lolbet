import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Lobby from '#models/lobby'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import { randomUUID } from 'node:crypto'

export default class LobbyUser extends BaseModel {
  static table = 'lobby_user'

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare lobbyId: string

  @column()
  declare userId: string

  @column.dateTime()
  declare joinedAt: DateTime

  @column()
  declare isOwner: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relations optionnelles
  @belongsTo(() => Lobby)
  declare lobby: BelongsTo<typeof Lobby>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @beforeCreate()
  static assignUuid(lobbyUser: LobbyUser) {
    lobbyUser.id = randomUUID()
    lobbyUser.joinedAt = DateTime.now()
  }
}
