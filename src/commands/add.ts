import chalk from 'chalk'
import { Command } from 'commander'
import { existsSync } from 'fs'
import path from 'path'
import prompts from 'prompts'
import { z } from 'zod'
// import { getConfig } from '../helpers/get-config'
import { logger } from '../helpers/logger'

const componentsList = [
  {
    title: 'Login',
    value: 'login',
  },
  {
    title: 'Administradores',
    value: 'administrators',
  },
]

const addOptionsSchema = z.object({
  components: z.array(z.string()).optional(),
  yes: z.boolean(),
  cwd: z.string(),
})

export const add = new Command()
  .name('add')
  .description('Adicionar uma funcionalidade/componente para o projeto Gseller')
  .argument('[components...]', 'componente que irá ser adicionado')
  .option('-y, --yes', 'pular a confirmação de criação do projeto', true)
  .option(
    '-c, --cwd <cwd>',
    'Diretório de trabalho. O padrão é o diretório atual.',
    process.cwd()
  )
  .action(async (components, opts) => {
    try {
      const options = addOptionsSchema.parse({
        components,
        ...opts,
      })

      const cwd = path.resolve(options.cwd)

      if (!existsSync(cwd)) {
        logger.error(`O caminho ${cwd} não existe. Por favor, tente novamente.`)
        process.exit(1)
      }

      await promptQuestions(options)
    } catch (err) {
      console.log('error', err)
    }
  })

export async function promptQuestions(
  options: z.infer<typeof addOptionsSchema>
) {
  const cwd = path.resolve(options.cwd)
  const highlight = (text: string) => chalk.cyan(text)
  let selectedComponents = options.components

  if (!options.components?.length) {
    const { components } = await prompts({
      type: 'multiselect',
      name: 'components',
      message: 'Qual componente você gostaria de adicionar?',
      hint: 'ESPAÇO para selecionar. A para marcar todos. Enter para enviar',
      instructions: false,
      choices: componentsList.map((entry) => ({
        title: entry.title,
        value: entry.value,
        selected: options.components?.includes(entry.value),
      })),
    })
    selectedComponents = components
  }

  if (!selectedComponents?.length) {
    logger.warn('Nenhum componente selecionado. Saindo.')
    process.exit(0)
  }

  // const config = await getConfig(cwd)
  // console.log('config', config)

  // const tree = await resolveTree(registryIndex, selectedComponents)
}
