import { Command } from '../../../_common/use-cases/command.js'

export class LoginCommand implements Command {
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}
}
