export interface Handler<C, R = any> {
  execute(command: C): Promise<R> | R
}
