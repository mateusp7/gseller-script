#!/usr/bin/env node
import { Command } from 'commander'
import { init } from './commands/init'

const program = new Command()
async function main() {
  program
    .name('gseller')
    .description('Criar um template teste')
    .version('1.0.0', '-v, --version', 'display the version number')

  program.addCommand(init)
  program.parse()
}

main()
