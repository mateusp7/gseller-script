#!/usr/bin/env node
import { Command } from 'commander'
import { init } from './commands/init'
import { start } from './commands/start'

const program = new Command()
async function main() {
  program
    .name('gseller')
    .description('Criar um template teste')
    .version('1.0.0', '-v, --version', 'display the version number')

  program.addCommand(start).addCommand(init)
  program.parse()
}

main()
