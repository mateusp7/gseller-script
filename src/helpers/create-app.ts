import retry from 'async-retry'
import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import { downloadAndExtractExample, downloadAndExtractRepo } from './download'
import { existsInRepo, getRepoInfo, hasRepo } from './example'
import { install } from './install'
import { isWriteable } from './is-writeable'
import { logger } from './logger'
import { makeDir } from './make-dir'

export type RepoInfo = {
  username: string
  name: string
  branch: string
  filePath: string
}

export class DownloadError extends Error {}

export async function createApp({
  appPath,
  example,
}: {
  appPath: string
  example: string
}): Promise<void> {
  let repoInfo: RepoInfo | undefined

  if (example) {
    let repoUrl: URL | undefined

    try {
      repoUrl = new URL(example)
    } catch (error: unknown) {
      const err = error as Error & { code: string | undefined }
      if (err.code !== 'ERR_INVALID_URL') {
        console.error(error)
        process.exit(1)
      }
    }

    if (repoUrl) {
      if (repoUrl.origin !== 'https://github.com') {
        console.error(
          `URL inválida: ${chalk.red(
            `"${example}"`
          )}. Apenas repositórios do GitHui são permitidos. Por favor, use uma URL de um repositório do GitHub e tente novamente.`
        )
        process.exit(1)
      }

      repoInfo = await getRepoInfo(repoUrl)

      if (!repoInfo) {
        console.error(
          `Pasta inválida nessa URL do GitHub: ${chalk.red(
            `"${example}"`
          )}. Por favor, ajuste a URL e tente novamente.`
        )
        process.exit(1)
      }

      const found = await hasRepo(repoInfo)

      if (!found) {
        console.error(
          `Não podemos encontrar a localização do repositório ${chalk.red(
            `"${example}"`
          )}. Por favor, verifique se o repositório existe e tente novamente.`
        )
        process.exit(1)
      }
    } else if (example !== '__internal-testing-retry') {
      const found = await existsInRepo(example)

      if (!found) {
        console.error(
          `Could not locate an example named ${chalk.red(
            `"${example}"`
          )}. It could be due to the following:\n`,
          `1. Your spelling of example ${chalk.red(
            `"${example}"`
          )} might be incorrect.\n`,
          `2. You might not be connected to the internet or you are behind a proxy.`
        )
        process.exit(1)
      }
    }
  }

  const root = path.resolve(appPath)

  if (!(await isWriteable(path.dirname(root)))) {
    console.error(
      'A aplicação não pode ser escrita, por favor verifique as permissões da pasta e tente novamente.'
    )
    process.exit(1)
  }

  const appName = path.basename(root)

  await makeDir(root)

  logger.info(`Criando um novo projeto Gseller em ${chalk.green(root)}.`)
  logger.info()

  process.chdir(root)

  const packageJsonPath = path.join(root, 'package.json')
  let hasPackageJson = false

  try {
    if (repoInfo) {
      const repoInfo2 = repoInfo
      logger.info(
        `Baixando arquivos do repositório ${chalk.cyan(
          example
        )}. Isso pode demorar um pouco.`
      )
      logger.info()

      await retry(() => downloadAndExtractRepo(root, repoInfo2), {
        retries: 3,
      })
    } else {
      logger.info(
        `Baixando arquivos do repositório ${chalk.cyan(
          example
        )}. Isso pode demorar um pouco.`
      )
      logger.info()
      await retry(() => downloadAndExtractExample(root, example), {
        retries: 3,
      })
    }
  } catch (reason) {
    function isErrorLike(err: unknown): err is { message: string } {
      return (
        typeof err === 'object' &&
        err !== null &&
        typeof (err as { message?: unknown }).message === 'string'
      )
    }
    throw new DownloadError(isErrorLike(reason) ? reason.message : reason + '')
  }
  hasPackageJson = fs.existsSync(packageJsonPath)

  logger.info('')

  if (hasPackageJson) {
    console.log('Instalando pacotes, isso pode demorar um pouco.')
    await install('yarn', true)
  }

  logger.info(`Projeto criado com ${chalk.green('Sucesso!')}`)
  logger.info('')

  logger.info(`Localização: ${chalk.blue(appPath)}`)

  logger.info('')
}
