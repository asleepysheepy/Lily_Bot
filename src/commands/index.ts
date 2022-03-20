import { Command } from '../types'
import { ConfigCommand } from './config'

/**
 * A list of all commands.
 */
const commandList: Command[] = [
  ConfigCommand
]

export const Commands = {
  commandList
}
