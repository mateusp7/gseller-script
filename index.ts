#!/usr/bin/env node
import { Command } from 'commander'
import { init } from './helpers/init'

const program = new Command()
async function main() {
  program.name('Gseller').description('Gseller')

  program.addCommand(init)
  program.parse()
}

main()
