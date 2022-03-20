import { Client, CommandInteraction } from 'discord.js'
import { Command } from '../../types'
import { ConfigWelcomeMessageChannelCommand } from './welcome-channel'
import { ConfigWelcomeMessageCommand } from './welcome-message'
import { Logger } from '../../core'
import { SlashCommandBuilder, SlashCommandSubcommandGroupBuilder } from '@discordjs/builders'

const commands = [
  ConfigWelcomeMessageChannelCommand,
  ConfigWelcomeMessageCommand
]

export const ConfigCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('config')
    .setDescription('')
    .addSubcommandGroup(ConfigWelcomeMessageChannelCommand.data as SlashCommandSubcommandGroupBuilder)
    .addSubcommandGroup(ConfigWelcomeMessageCommand.data as SlashCommandSubcommandGroupBuilder),
  execute: async (interaction: CommandInteraction, client: Client): Promise<void> => {
    const subcommand = interaction.options.getSubcommandGroup(false)

    const command = commands.find((c) => c.data.name === subcommand)
    if (command == null) { return }

    try {
      await command.execute(interaction, client)
    } catch (error: any) {
      const subcommandName = subcommand != null ? `::${subcommand}` : ''
      const errorMessage: string = error.toString()
      Logger.error(`An Error occured while executing the command ${interaction.commandName}${subcommandName}: ${errorMessage}`)
    }
  }
}
