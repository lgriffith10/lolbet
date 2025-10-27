import app from '@adonisjs/core/services/app'
import { HttpContext } from '@adonisjs/core/http'
import { Handler } from './base_handler.js'
import { CommandResult } from '#common/utils/command_result'

type CommandConstructor<C> = new (...args: any[]) => C

export class CommandBus {
  private static handlers = new Map<
    CommandConstructor<any>,
    new (...args: any[]) => Handler<any, any>
  >()

  static register<C extends object, R>(
    command: CommandConstructor<C>,
    handler: new (...args: any[]) => Handler<C, R>
  ): void {
    this.handlers.set(command, handler)
  }

  async execute<C extends object, R extends CommandResult>(
    command: C,
    context?: HttpContext
  ): Promise<R> {
    const CommandClass = command.constructor as CommandConstructor<C>
    const handlerClass = CommandBus.handlers.get(CommandClass)

    if (!handlerClass) {
      throw new Error(`No handler found for ${CommandClass.name}`)
    }

    const handler = await app.container.make(handlerClass)

    if (context) {
      const handlerWithContext = handler as any
      if (handlerWithContext.setContext) {
        handlerWithContext.setContext(context)
      }
    }

    return handler.execute(command) as Promise<R>
  }
}
