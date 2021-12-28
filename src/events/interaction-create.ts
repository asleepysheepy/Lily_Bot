import { Client, Interaction } from 'discord.js'
import { Commands } from '../commands'
import { Event } from '../types'
import { Logger } from '../core'

export const InteractionEvent: Event = {
  eventName: 'interactionCreate',
  handle: async (interaction: Interaction, client: Client) => {
    // If we're not dealing with a command, exit
    if (!interaction.isCommand()) { return } // eslint-disable-line @typescript-eslint/strict-boolean-expressions

    // Find the command that was run. If no command was found, exit
    const commandName: string = interaction.commandName
    const command = Commands.commandList.find((c) => c.data.name === commandName)
    if (command == null) { return }

    // Attempt to execute the command. If the execution fails, report an error.
    try {
      command.execute(interaction, client)
    } catch (error: any) {
      const errorMessage: string = error.toString()
      Logger.error(`Attempted to exectue the command ${commandName} but the following error occured: ${errorMessage}`)

      await interaction.reply({
        content: `An error ocurred executing command: ${commandName}`,
        ephemeral: true
      })
    }
  }
}
