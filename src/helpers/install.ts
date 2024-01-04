import chalk from 'chalk'
import spawn from 'cross-spawn'
import ora from 'ora'

export async function install(
  /** Indicate which package manager to use. */
  packageManager: string,
  /** Indicate whether there is an active Internet connection.*/
  isOnline: boolean
): Promise<void> {
  let args: string[] = ['install']
  if (!isOnline) {
    console.log(
      chalk.yellow(
        'You appear to be offline.\nFalling back to the local cache.'
      )
    )
    args.push('--offline')
  }
  /**
   * Return a Promise that resolves once the installation is finished.
   */
  return new Promise((resolve, reject) => {
    /**
     * Spawn the installation process.
     */
    const child = spawn(packageManager, args, {
      stdio: 'inherit',
      env: {
        ...process.env,
        ADBLOCK: '1',
        // we set NODE_ENV to development as pnpm skips dev
        // dependencies when production
        NODE_ENV: 'development',
        DISABLE_OPENCOLLECTIVE: '1',
      },
    })
    child.on('close', (code) => {
      if (code !== 0) {
        reject({ command: `${packageManager} ${args.join(' ')}` })
        return
      }
      resolve()
    })
  })
}

export async function addNextGlobal(): Promise<void> {
  return new Promise((resolve, reject) => {
    const spinner = ora(`Iniciando instalação do next globalmente`).start()
    const child = spawn('npm', ['i', '-g', 'create-next-app'])
    spinner.succeed()
    child.on('close', (code) => {
      if (code !== 0) {
        spinner.fail(
          'Erro ao instalar next globalmente. Por favor, tente novamente'
        )
        return reject(new Error('Failed'))
      }
      return resolve()
    })
  })
}

export async function startNextProject(cwd: string): Promise<void> {
  {
    return new Promise((resolve, reject) => {
      const spinner = ora(`Iniciando instalação do app next`).start()
      const child = spawn('npx', ['create-next-app@latest', cwd], {
        stdio: 'inherit',
        cwd,
      })
      spinner.succeed()
      child.on('close', (code) => {
        if (code !== 0) {
          return reject(new Error('Failed'))
        }
        return resolve()
      })
    })
  }
}
