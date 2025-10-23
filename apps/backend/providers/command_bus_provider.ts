import { ApplicationService } from '@adonisjs/core/types'
import { CommandBus } from '#common/use-cases/command_bus'
import { readdirSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'

const FileName = fileURLToPath(import.meta.url)
const DirName = dirname(FileName)

export default class CommandBusProvider {
  constructor(protected app: ApplicationService) {}

  register() {
    this.app.container.singleton('CommandBus' as any, () => {
      return new CommandBus()
    })
  }

  private getHandlerFiles(dir: string): string[] {
    let results: string[] = []
    const list = readdirSync(dir)

    for (const file of list) {
      const fullPath = join(dir, file)
      const stat = statSync(fullPath)

      if (stat && stat.isDirectory()) {
        results = results.concat(this.getHandlerFiles(fullPath))
      } else if (file.endsWith('_handler.ts')) {
        results.push(fullPath)
      }
    }
    return results
  }

  public async boot() {
    const handlersDir = join(DirName, '../app/use-cases')

    const handlerFiles = this.getHandlerFiles(handlersDir)

    for (const file of handlerFiles) {
      await import(pathToFileURL(file).href)
    }
  }
}
