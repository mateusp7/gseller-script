import { Command } from 'commander'
import { existsSync } from 'fs'
import ora from 'ora'
import path from 'path'

import chalk from 'chalk'
import prompts from 'prompts'
import { z } from 'zod'
import { createApp } from './create-app'
import { logger } from './logger'
import { makeDir } from './make-dir'

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

      await promptForConfig(cwd)

      await runInit(cwd, example)

      logger.info('')
      logger.info(`Inicialização do projeto realizada com sucesso.`)
      logger.info('')
    } catch (err) {}
  })

export async function promptForConfig(cwd: string) {
  const highlight = (text: string) => chalk.cyan(text)

  const options = await prompts([
    {
      type: 'text',
      name: 'path',
      message: 'Qual o nome do projeto?',
    },
    // {
    //   type: 'text',
    //   name: 'tailwindCss',
    //   message: `Qual a localização do seu arquivo ${highlight(
    //     'global.css'
    //   )} ou ${highlight('globals.css')}?`,
    //   initial: defaultConfig?.tailwind.css ?? DEFAULT_TAILWIND_CSS,
    // },
    // {
    //   type: 'text',
    //   name: 'tailwindConfig',
    //   message: `Qual a localização do seu arquivo ${highlight(
    //     'tailwind.config.js'
    //   )}?`,
    //   initial: defaultConfig?.tailwind.config ?? DEFAULT_TAILWIND_CONFIG,
    // },
    // {
    //   type: 'text',
    //   name: 'components',
    //   message: `Configure alias para sua para de ${highlight('components')}:`,
    //   initial: defaultConfig?.aliases['components'] ?? DEFAULT_COMPONENTS,
    // },
    // {
    //   type: 'text',
    //   name: 'utils',
    //   message: `Configure alias para sua para de ${highlight('utils')}:`,
    //   initial: defaultConfig?.aliases['utils'] ?? DEFAULT_UTILS,
    // },
  ])

  logger.info('')

  const root = cwd + '/' + options.path
  const cwdPath = existsSync(root)

  if (cwdPath) {
    logger.warn(`Já existe uma pasta com o nome de ${highlight(options.path)}`)
    process.exit(1)
  }
  const spinner = ora(
    `Criando pasta ${highlight(options.path)} do projeto.`
  ).start()

  await makeDir(cwd + '/' + options.path)
  spinner.succeed()
}

export async function runInit(cwd: string, example: string) {
  try {
    await createApp({
      appPath: cwd + '/gseller',
      example: example,
    })
  } catch (reason) {}
}
