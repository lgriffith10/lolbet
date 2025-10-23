import { Command } from '../../../_common/use-cases/command.js'

export class LoginCommand implements Command {
  constructor(
    public email: string,
    public password: string
  ) {}
}
