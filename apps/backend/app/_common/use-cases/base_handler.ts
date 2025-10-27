import { HttpContext } from '@adonisjs/core/http'
import { CommandResult } from '#common/utils/command_result'

export interface Handler<C, R = any> {
  execute(command: C): Promise<CommandResult<R | null>> | CommandResult<R | null>
}

export abstract class BaseHandler<C, R = any> implements Handler<C, R> {
  protected context?: HttpContext

  setContext(context: HttpContext): this {
    this.context = context
    return this
  }

  abstract execute(command: C): Promise<CommandResult<R | null>> | CommandResult<R | null>
}
