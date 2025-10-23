import { Handler } from './base_handler.js'

type CommandConstructor<C> = new (...args: any[]) => C

export class CommandBus {
  private static handlers = new Map<CommandConstructor<any>, Handler<any, any>>()

  static register<C extends object, R>(
    command: CommandConstructor<C>,
    handler: Handler<C, R>
  ): void {
    this.handlers.set(command, handler)
  }

  async execute<C extends object, R>(command: C): Promise<R> {
    const CommandClass = command.constructor as CommandConstructor<C>

    const handler = CommandBus.handlers.get(CommandClass)
    if (!handler) {
      throw new Error(`No handler found for ${CommandClass.name}`)
    }

    return handler.execute(command)
  }
}
