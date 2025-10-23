import Lobby from '#models/lobby'

export default class LobbyCreatedEventListener {
  handle(lobby: Lobby) {
    console.log('lobby', lobby)
  }
}
