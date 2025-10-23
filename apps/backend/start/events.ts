import emitter from '@adonisjs/core/services/emitter'
import LobbyCreatedEvent from '#events/lobby/lobby_created'

const LobbyCreatedEventListener = () => import('#listeners/lobby/lobby_created')

emitter.on(LobbyCreatedEvent, [LobbyCreatedEventListener])
