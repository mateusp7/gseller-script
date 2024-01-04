import { Command } from 'commander'
import { existsSync } from 'fs'
import ora from 'ora'
import path from 'path'

import { z } from 'zod'
import { createApp } from './create-app'
import { logger } from './logger'

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

      // const existingConfig = await getConfig(cwd)
      // const config = await promptForConfig(cwd, options.yes)

      await runInit(cwd, example)

      logger.info('')
      logger.info(`Inicialização do projeto realizada com sucesso.`)
      logger.info('')
    } catch (err) {}
  })

// export async function promptForConfig(
//   cwd: string,
//   // defaultConfig: Config | null = null,
//   skip = false
// ) {
//   const highlight = (text: string) => chalk.cyan(text)

//   const options = await prompts([
//     // {
//     //   type: 'text',
//     //   name: 'path',
//     //   message: 'Qual o nome do projeto?',
//     // },
//     // {
//     //   type: 'text',
//     //   name: 'tailwindCss',
//     //   message: `Qual a localização do seu arquivo ${highlight(
//     //     'global.css'
//     //   )} ou ${highlight('globals.css')}?`,
//     //   initial: defaultConfig?.tailwind.css ?? DEFAULT_TAILWIND_CSS,
//     // },
//     // {
//     //   type: 'text',
//     //   name: 'tailwindConfig',
//     //   message: `Qual a localização do seu arquivo ${highlight(
//     //     'tailwind.config.js'
//     //   )}?`,
//     //   initial: defaultConfig?.tailwind.config ?? DEFAULT_TAILWIND_CONFIG,
//     // },
//     // {
//     //   type: 'text',
//     //   name: 'components',
//     //   message: `Configure alias para sua para de ${highlight('components')}:`,
//     //   initial: defaultConfig?.aliases['components'] ?? DEFAULT_COMPONENTS,
//     // },
//     // {
//     //   type: 'text',
//     //   name: 'utils',
//     //   message: `Configure alias para sua para de ${highlight('utils')}:`,
//     //   initial: defaultConfig?.aliases['utils'] ?? DEFAULT_UTILS,
//     // },
//   ])

//   // const config = rawConfigSchema.parse({
//   //   tsx: true,
//   //   tailwind: {
//   //     config: options.tailwindConfig,
//   //     css: options.tailwindCss,
//   //     cssVariables: false,
//   //   },
//   //   aliases: {
//   //     components: options.components,
//   //     utils: options.utils,
//   //   },
//   // })

//   // if (!skip) {
//   //   const { proceed } = await prompts({
//   //     type: 'confirm',
//   //     name: 'proceed',
//   //     message: `Escrever as configurações para ${highlight(
//   //       'components.json'
//   //     )}?`,
//   //     initial: true,
//   //   })

//   //   if (!proceed) {
//   //     process.exit(0)
//   //   }
//   // }

//   logger.info('')
//   const spinner = ora('Criando arquivo components.json...').start()
//   const targetPath = path.resolve(cwd, 'components.json')
//   await fs.writeFile(targetPath, JSON.stringify(config, null, 2), 'utf8')
//   spinner.succeed()

//   return await resolveConfigPaths(cwd, config)
// }

export async function runInit(cwd: string, example: string) {
  const spinner = ora('Iniciando projeto...')?.start()

  try {
    await createApp({
      appPath: cwd,
      example: example,
    })
  } catch (reason) {}

  // for (const [key, resolvedPath] of Object.entries(config.resolvedPaths)) {
  //   // Determine if the path is a file or directory.
  //   // TODO: is there a better way to do this?
  //   let dirname = path.extname(resolvedPath)
  //     ? path.dirname(resolvedPath)
  //     : resolvedPath

  //   // If the utils alias is set to something like "@/lib/utils",
  //   // assume this is a file and remove the "utils" file name.
  //   // TODO: In future releases we should add support for individual utils.
  //   if (key === 'utils' && resolvedPath.endsWith('/utils')) {
  //     // Remove /utils at the end.
  //     dirname = dirname.replace(/\/utils$/, '')
  //   }

  //   if (!existsSync(dirname)) {
  //     await fs.mkdir(dirname, { recursive: true })
  //   }
  // }

  spinner?.succeed()
}
