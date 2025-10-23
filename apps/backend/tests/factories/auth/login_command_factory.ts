import { LoginCommand } from '#use-cases/auth/login/login_command'
import { faker } from '@faker-js/faker'

export class LoginCommandFactory {
  private _request: LoginCommand

  private constructor(request: LoginCommand) {
    this._request = request
  }

  public static create(): LoginCommandFactory {
    return new LoginCommandFactory(
      new LoginCommand(faker.internet.email(), faker.internet.password())
    )
  }

  public withEmail(email: string): LoginCommandFactory {
    this._request.email = email
    return this
  }

  public withPassword(password: string): LoginCommandFactory {
    this._request.password = password
    return this
  }

  public get(): LoginCommand {
    return this._request
  }
}
