import chalk from 'chalk'
import { Command } from 'commander'
import fs, { existsSync } from 'fs'
import path from 'path'
import prompts from 'prompts'
import { z } from 'zod'
import { createApp } from '../helpers/create-app'
import { logger } from '../helpers/logger'

let projectPath: string = ''

const initOptionsSchema = z.object({
  cwd: z.string(),
  yes: z.boolean(),
})

export const start = new Command()
  .command('start')
  .description('Inicia um projeto ')
  .option('-y, --yes', 'Pular a confirmação de criação do projeto', false)
  .option(
    '-c, --cwd <cwd>',
    'Diretório de trabalho. O padrão é o diretório atual.',
    process.cwd()
  )
  .action(async (opts) => {
    const urlGitHub = 'https://github.com/mateusp7/base-gseller'
    try {
      const options = initOptionsSchema.parse(opts)
      const cwd = path.resolve(options.cwd)

      if (!existsSync(cwd)) {
        logger.error(`O caminho ${cwd} não existe. Por favor, tente novamente.`)
        process.exit(1)
      }

      const prompt = await promptForConfig()
      await initStart(prompt.resolvedProjectPath, urlGitHub)
    } catch (err) {}
  })

export async function promptForConfig() {
  if (typeof projectPath === 'string') {
    projectPath = projectPath.trim()
  }

  const res = await prompts({
    type: 'text',
    name: 'path',
    message: `Qual o nome do seu projeto?`,
    initial: 'gseller',
  })

  if (typeof res.path === 'string') {
    projectPath = res.path.trim()
  }

  const resolvedProjectPath = path.resolve(projectPath)

  return { resolvedProjectPath }
}

export async function initStart(
  resolvedProjectPath: string,
  urlGitHub: string
) {
  const highlight = (text: string) => chalk.cyan(text)

  const root = path.resolve(resolvedProjectPath)
  const appName = path.basename(root)
  const folderExists = fs.existsSync(root)

  if (folderExists) {
    process.exit(1)
  }

  logger.info(
    `Criando pasta ${highlight(appName)} no caminho ${highlight(root)}...`
  )

  logger.info('')

  await createApp({
    appPath: resolvedProjectPath,
    example: urlGitHub,
  })
}
