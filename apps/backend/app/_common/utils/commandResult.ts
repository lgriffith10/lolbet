export class CommandResult<T = any> {
  constructor(
    public readonly data: T,
    public readonly status: number = 200,
    public readonly message?: string
  ) {}

  static ok<T extends object>(data: T, status: number = 200): CommandResult<T> {
    return new CommandResult({ ...data }, status)
  }

  static created<T>(data: T): CommandResult<T> {
    return new CommandResult({ ...data }, 201)
  }

  static notFound(message: string = 'Not found'): CommandResult<null> {
    return new CommandResult(null, 404, message)
  }

  static badRequest(message: string = 'Bad request'): CommandResult<null> {
    return new CommandResult(null, 400, message)
  }

  static forbidden(message: string = 'Forbidden'): CommandResult<null> {
    return new CommandResult(null, 403, message)
  }

  static unauthorized(message: string = 'Unauthorized'): CommandResult<null> {
    return new CommandResult(null, 401, message)
  }
}
