import { customAlphabet } from 'nanoid'
import Lobby from '#models/lobby'
import db from '@adonisjs/lucid/services/db'

export class RandomCharacterGeneratorService {
  async generateRandomCode(size: number = 4, loop: number = 2): Promise<string> {
    const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', size)

    let code: string = nanoid(size)

    if (loop > 1) {
      for (let i = 0; i < loop - 1; i++) {
        code = code.concat(`-${nanoid(size)}`)
      }
    }

    const isLobbyWithCodeExists: Lobby = await db
      .from('lobbies')
      .where('code', code)
      .select('id')
      .first()

    if (isLobbyWithCodeExists) {
      await this.generateRandomCode(size)
    }

    return code
  }
}
