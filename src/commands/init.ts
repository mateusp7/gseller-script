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
  TAILWIND_CONFIG,
  TAILWIND_CONFIG_TS,
  UTILS,
  UTILS_JS,
} from '../helpers/constants'
import {
  Config,
  getConfig,
  rawConfigSchema,
  resolveConfigPaths,
} from '../helpers/get-config'
import { getPackageManager } from '../helpers/get-package-manager'
import { logger } from '../helpers/logger'

const initOptionsSchema = z.object({
  cwd: z.string(),
  yes: z.boolean(),
})

export const init = new Command()
  .command('init')
  .description('Iniciar projeto boilerplate Gseller')
  .option('-y, --yes', 'pular a confirmação de criação do projeto', false)
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
    } catch (err) {}
  })

export async function promptForConfig(defaultConfig: Config | null = null) {
  const highlight = (text: string) => chalk.cyan(text)

  const options = await prompts([
    {
      type: 'text',
      name: 'graphql',
      message: `Aonde está localizado a pasta ${highlight('graphql')}?`,
      initial: defaultConfig?.graphql ?? DEFAULT_GRAPHQL,
    },
    {
      type: 'text',
      name: 'tailwindConfig',
      message: `Aonde está localizado a pasta ${highlight(
        'tailwind.config.js'
      )}?`,
      initial: defaultConfig?.tailwind.config ?? DEFAULT_TAILWIND_CONFIG,
    },
    {
      type: 'text',
      name: 'tailwindCss',
      message: `Aonde está localizado o arquivo ${highlight('global CSS')}?`,
      initial: defaultConfig?.tailwind.css ?? DEFAULT_TAILWIND_CSS,
    },
    {
      type: 'text',
      name: 'components',
      message: `Configure o alias de importação para ${highlight(
        'components'
      )}:`,
      initial: defaultConfig?.aliases['components'] ?? DEFAULT_COMPONENTS,
    },
    {
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
  const spinner = ora(`Criando arquivo gseller.json...`).start()

  const targetPath = path.resolve(cwd, 'gseller.json')
  await fs.writeFile(targetPath, JSON.stringify(config, null, 2), 'utf-8')
  spinner.succeed()

  return await resolveConfigPaths(cwd, config)
}

export async function runInit(cwd: string, config: Config) {
  const spinner = ora(`Iniciando projeto`)?.start()

  for (const [key, resolvedPath] of Object.entries(config.resolvedPaths)) {
    // Determine if the path is a file or directory.
    // TODO: is there a better way to do this?
    let dirname = path.extname(resolvedPath)
      ? path.dirname(resolvedPath)
      : resolvedPath

    // If the utils alias is set to something like "@/lib/utils",
    // assume this is a file and remove the "utils" file name.
    // TODO: In future releases we should add support for individual utils.
    if (key === 'utils' && resolvedPath.endsWith('/utils')) {
      // Remove /utils at the end.
      dirname = dirname.replace(/\/utils$/, '')
    }

    if (!existsSync(dirname)) {
      await fs.mkdir(dirname, { recursive: true })
    }
  }

  const extension = config.tsx ? 'ts' : 'js'

  const tailwindConfigExtension = path.extname(
    config.resolvedPaths.tailwindConfig
  )

  let tailwindConfigTemplate: string
  if (tailwindConfigExtension === '.ts') {
    tailwindConfigTemplate = TAILWIND_CONFIG_TS
  } else {
    tailwindConfigTemplate = TAILWIND_CONFIG
  }

  await fs.writeFile(
    config.resolvedPaths.tailwindConfig,
    template(tailwindConfigTemplate)({
      extension,
      prefix: '',
    }),
    'utf8'
  )

  await fs.writeFile(
    `${config.resolvedPaths.utils}.${extension}`,
    extension === 'ts' ? UTILS : UTILS_JS,
    'utf8'
  )

  spinner.succeed()
  logger.info('')

  const dependenciesSpinner = ora(`Instalando dependências...`)?.start()

  const packageManager = await getPackageManager(cwd)

  const deps = [...PROJECT_DEPENDENCIES]

  await execa(
    packageManager,
    [packageManager === 'npm' ? 'install' : 'add', ...deps],
    {
      cwd,
    }
  )

  dependenciesSpinner?.succeed()
}
