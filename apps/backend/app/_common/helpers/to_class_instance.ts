export function toClassInstance<T extends object>(cls: new (...args: any) => T, plain: object): T {
  return Object.assign(new cls(), plain)
}
