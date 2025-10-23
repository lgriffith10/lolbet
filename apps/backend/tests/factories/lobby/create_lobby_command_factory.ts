import { CreateLobbyCommand } from '#use-cases/lobby/create_lobby/create_lobby_command'
import { faker } from '@faker-js/faker'

export class CreateLobbyCommandFactory {
  private _command: CreateLobbyCommand

  private constructor(command: CreateLobbyCommand) {
    this._command = command
  }

  static create(): CreateLobbyCommandFactory {
    return new CreateLobbyCommandFactory(
      new CreateLobbyCommand(faker.company.name(), faker.lorem.sentence(), faker.string.uuid())
    )
  }

  withName(name: string): CreateLobbyCommandFactory {
    this._command.name = name
    return this
  }

  withDescription(description: string): CreateLobbyCommandFactory {
    this._command.description = description
    return this
  }

  get(): CreateLobbyCommand {
    return this._command
  }
}
