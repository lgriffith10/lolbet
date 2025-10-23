import { faker } from '@faker-js/faker'
import { RegisterCommand } from '#use-cases/auth/register/register_command'

export class RegisterCommandFactory {
  private _request: RegisterCommand

  private constructor(request: RegisterCommand) {
    this._request = request
  }

  public static create(): RegisterCommandFactory {
    return new RegisterCommandFactory(
      new RegisterCommand(
        faker.internet.username(),
        faker.internet.email(),
        faker.internet.password()
      )
    )
  }

  public withEmail(email: string): RegisterCommandFactory {
    this._request.email = email
    return this
  }

  public withUsername(username: string): RegisterCommandFactory {
    this._request.username = username
    return this
  }

  public withPassword(password: string): RegisterCommandFactory {
    this._request.password = password
    return this
  }

  public get(): RegisterCommand {
    return this._request
  }
}
