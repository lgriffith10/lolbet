import { BaseEvent } from '@adonisjs/core/events'
import Lobby from '#models/lobby'

export default class LobbyCreatedEvent extends BaseEvent {
  constructor(public lobby: Lobby) {
    super()
  }
}
