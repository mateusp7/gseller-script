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

      const prompt = await promptQuestions(cwd)

      await runInit(prompt, example)

      logger.info('')
      logger.info(`Inicialização do projeto realizada com sucesso.`)
      logger.info('')
    } catch (err) {}
  })

export async function promptQuestions(cwd: string) {
  const highlight = (text: string) => chalk.cyan(text)

  const options = await prompts([
    {
      type: 'text',
      name: 'path',
      message: 'Qual o nome do projeto?',
    },
  ])

  logger.info('')

  const root = `${cwd}/${options.path}`
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

  return root
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
