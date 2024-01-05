import { Command } from 'commander'
import { existsSync, promises as fs } from 'fs'
import ora from 'ora'
import path from 'path'

import chalk from 'chalk'
import prompts from 'prompts'
import { z } from 'zod'
import { createApp } from '../helpers/create-app'
import {
  Config,
  DEFAULT_COMPONENTS,
  DEFAULT_GRAPHQL,
  DEFAULT_TAILWIND_CONFIG,
  DEFAULT_TAILWIND_CSS,
  DEFAULT_UTILS,
  getConfig,
  rawConfigSchema,
} from '../helpers/get-config'
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
    const example = 'https://github.com/mateusp7/grv'

    try {
      const options = initOptionsSchema.parse(opts)
      const cwd = path.resolve(options.cwd)

      if (!existsSync(cwd)) {
        logger.error(`O caminho ${cwd} não existe. Por favor, tente novamente.`)
        process.exit(1)
      }

      const existingConfig = await getConfig(cwd)
      const prompt = await promptForConfig(existingConfig)

      // await runInit(prompt, example)

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

  createGsellerJson(resolvedProjectPath, config)

  return resolvedProjectPath
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
}

export async function runInit(cwd: string, example: string) {
  // await addNextGlobal()
  // await startNextProject(cwd)
  try {
    await createApp({
      appPath: cwd,
      example: example,
    })
  } catch (reason) {}
}
