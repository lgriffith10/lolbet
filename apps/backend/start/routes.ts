/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
const LobbyController = () => import('#controllers/lobby_controller')

router
  .group(() => {
    router
      .group(() => {
        router.post('register', [AuthController, 'register'])
        router.post('login', [AuthController, 'login'])
        router.post('logout', [AuthController, 'logout'])
      })
      .prefix('auth')

    router
      .group(() => {
        router
          .group(() => {
            router.post('create', [LobbyController, 'create'])
          })
          .prefix('lobby')
      })
      .use(
        middleware.auth({
          guards: ['api'],
        })
      )
  })
  .prefix('api')
