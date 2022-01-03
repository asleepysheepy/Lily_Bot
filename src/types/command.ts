import { SlashCommandBuilder } from '@discordjs/builders'
import { Client, CommandInteraction } from 'discord.js'

/**
 * Command executable by the command handler.
 */
export interface Command {
  /**
   * Data used to create the command with discord
   */
  data: SlashCommandBuilder

  /**
   * Function containing the command's logic.
   *
   * @param interaction The CommandInteraction that represents the
   *   usage of the command.
   * @param client The client instance
   */
  execute: (interaction: CommandInteraction, client: Client) => void
}
