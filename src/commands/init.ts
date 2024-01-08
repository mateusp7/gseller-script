import { Command } from 'commander'
import { existsSync, promises as fs } from 'fs'
import ora from 'ora'
import path from 'path'

import chalk from 'chalk'
import { execa } from 'execa'
import template from 'lodash.template'
import prompts from 'prompts'
import { z } from 'zod'
import {
  DEFAULT_COMPONENTS,
  DEFAULT_GRAPHQL,
  DEFAULT_TAILWIND_CONFIG,
  DEFAULT_TAILWIND_CSS,
  DEFAULT_UTILS,
  PROJECT_DEPENDENCIES,
  TAILWIND_CONFIG_TS,
  UTILS,
} from '../helpers/constants'
import {
  Config,
  getConfig,
  rawConfigSchema,
  resolveConfigPaths,
} from '../helpers/get-config'
import { getPackageManager } from '../helpers/get-package-manager'
import { handleError } from '../helpers/handler-error'
import { isWriteable } from '../helpers/is-writeable'
import { logger } from '../helpers/logger'
import { onPromptState } from '../helpers/prompt-state'

const initOptionsSchema = z.object({
  cwd: z.string(),
  yes: z.boolean(),
})

export const init = new Command()
  .command('init')
  .description('Iniciar as configurações para o projeto Gseller')
  .option('-y, --yes', 'Pular a confirmação de criação do projeto', false)
  .option(
    '-c, --cwd <cwd>',
    'Diretório de trabalho. O padrão é o diretório atual.',
    process.cwd()
  )
  .action(async (opts) => {
    try {
      const options = initOptionsSchema.parse(opts)
      const cwd = path.resolve(options.cwd)

      if (!existsSync(cwd)) {
        logger.error(`O caminho ${cwd} não existe. Por favor, tente novamente.`)
        process.exit(1)
      }

      const existingConfig = await getConfig(cwd)
      const promptConfig = await promptForConfig(existingConfig)

      await runInit(cwd, promptConfig)

      logger.info('')
      logger.info(`Inicialização do projeto realizada com sucesso.`)
      logger.info('')
    } catch (err) {
      handleError(err)
    }
  })

export async function promptForConfig(defaultConfig: Config | null = null) {
  const highlight = (text: string) => chalk.cyan(text)

  const options = await prompts([
    {
      onState: onPromptState,
      type: 'text',
      name: 'graphql',
      message: `Aonde está localizado a pasta ${highlight('graphql')}?`,
      initial: defaultConfig?.graphql ?? DEFAULT_GRAPHQL,
    },
    {
      onState: onPromptState,
      type: 'text',
      name: 'tailwindConfig',
      message: `Aonde está localizado a pasta ${highlight(
        'tailwind.config.js'
      )}?`,
      initial: defaultConfig?.tailwind.config ?? DEFAULT_TAILWIND_CONFIG,
    },
    {
      onState: onPromptState,
      type: 'text',
      name: 'tailwindCss',
      message: `Aonde está localizado o arquivo ${highlight('global CSS')}?`,
      initial: defaultConfig?.tailwind.css ?? DEFAULT_TAILWIND_CSS,
    },
    {
      onState: onPromptState,
      type: 'text',
      name: 'components',
      message: `Configure o alias de importação para ${highlight(
        'components'
      )}:`,
      initial: defaultConfig?.aliases['components'] ?? DEFAULT_COMPONENTS,
    },
    {
      onState: onPromptState,
      type: 'text',
      name: 'utils',
      message: `Configure o alias de importação para ${highlight('utils')}:`,
      initial: defaultConfig?.aliases['utils'] ?? DEFAULT_UTILS,
    },
  ])

  const config = rawConfigSchema.parse({
    tsx: true,
    graphql: options.graphql,
    tailwind: {
      config: options.tailwindConfig,
      css: options.tailwindCss,
    },
    aliases: {
      utils: options.utils,
      components: options.components,
    },
  })

  const resolvedProjectPath = path.resolve()
  logger.info('')

  return createGsellerJson(resolvedProjectPath, config)
}

export async function createGsellerJson(
  cwd: string,
  config: z.infer<typeof rawConfigSchema>
) {
  logger.info('')
  const spinner = ora(`Criando arquivo ${chalk.blue('gseller.json')}`).start()

  const isWritable = await isWriteable(cwd)

  if (!isWritable) return undefined

  try {
    const targetPath = path.resolve(cwd, 'gseller.json')
    await fs.writeFile(targetPath, JSON.stringify(config, null, 2), 'utf-8')
    spinner.succeed()
    logger.info('')

    return await resolveConfigPaths(cwd, config)
  } catch (err) {
    logger.error(err)
  }
}

export async function runInit(cwd: string, config: Config | undefined) {
  if (!config) return

  for (const [key, resolvedPath] of Object.entries(config.resolvedPaths)) {
    let dirname = path.extname(resolvedPath)
      ? path.dirname(resolvedPath)
      : resolvedPath

    if (key === 'utils' && resolvedPath.endsWith('/utils')) {
      dirname = dirname.replace(/\/utils$/, '')
    }

    if (!existsSync(dirname)) {
      await fs.mkdir(dirname, { recursive: true })
    }
  }

  const tailwindConfigTemplate = TAILWIND_CONFIG_TS

  const spinnerWriteTailwindConfig = ora(
    `Criando arquivo ${chalk.blue('tailwind.config.ts')}`
  )?.start()
  await fs.writeFile(
    config.resolvedPaths.tailwindConfig,
    template(tailwindConfigTemplate)({
      extension: 'ts',
      prefix: '',
    }),
    'utf8'
  )
  spinnerWriteTailwindConfig.succeed()
  logger.info('')

  const spinnerWriteUtils = ora(
    `Criando arquivo ${chalk.blue('utils')}`
  )?.start()
  await fs.writeFile(`${config.resolvedPaths.utils}.ts`, UTILS, 'utf8')
  spinnerWriteUtils.succeed()
  logger.info('')

  const dependenciesSpinner = ora(`Instalando dependências...`)?.start()
  const packageManager = await getPackageManager(cwd)

  const deps = [...PROJECT_DEPENDENCIES]

  logger.info('')
  logger.info('')
  logger.info('Dependências')
  logger.info('')
  deps.forEach((dep) => {
    logger.info(`- ${dep}`)
  })
  logger.info('')

  await execa(
    packageManager,
    [packageManager === 'npm' ? 'install' : 'add', ...deps],
    {
      cwd,
    }
  )

  dependenciesSpinner?.succeed()
}
