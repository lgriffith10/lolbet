import { Handler } from '../use-cases/base_handler.js'
import { CommandBus } from '../use-cases/command_bus.js'

export function CommandHandler<C extends object, R>(commandClass: new (...args: any[]) => C) {
  return function <T extends new (...args: any[]) => Handler<C, R>>(target: T) {
    CommandBus.register(commandClass, new target())
  }
}
