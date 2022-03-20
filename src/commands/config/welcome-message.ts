import { SlashCommandSubcommandGroupBuilder } from '@discordjs/builders'
import { Client, CommandInteraction } from 'discord.js'
import { Command } from '../../types'
import { GuildConfig } from '../../models'

export const ConfigWelcomeMessageCommand: Command = {
  data: new SlashCommandSubcommandGroupBuilder()
    .setName('welcomeMessage')
    .setDescription('Configure the message posted when new members join the server')
    .addSubcommand((subcommand) => (
      subcommand.setName('set')
        .setDescription('Set the welcome message that gets posted when a new member joins the server')
        .addStringOption((option) => (
          option.setName('message')
            .setRequired(true)
            .setDescription('The message to post')
        ))
    ))
    .addSubcommand((subcommand) => (
      subcommand.setName('get')
        .setDescription('Gets the message that is currently posted when a new member joins the server')
    ))
    .addSubcommand((subcommand) => (
      subcommand.setName('reset')
        .setDescription('Removes the currently set welcome message')
    )),
  execute: async (interaction: CommandInteraction, client: Client): Promise<void> => {
    if (interaction.guildId == null) { return }
    const command = interaction.options.getSubcommand()
    const guildConfig = await GuildConfig.findOrCreate(interaction.guildId)

    switch (command) {
      case 'get':
        await get(interaction, guildConfig)
        break
      case 'reset':
        await reset(interaction, guildConfig)
        break
      case 'set':
        await set(interaction, guildConfig)
        break
      default:
        throw new Error(`Subcommand '${command}' does not exist on the Config command.`)
    }
  }
}

async function get (interaction: CommandInteraction, guildConfig: GuildConfig): Promise<void> {
  if (guildConfig.welcomeMessage == null) {
    await interaction.reply('You currently do not have a message set to post.')
  } else {
    await interaction.reply(`Your welcome message is now:\n\n\`\`\`\n<#${guildConfig.welcomeMessage}>.\n\`\`\``)
  }
}

async function reset (interaction: CommandInteraction, guildConfig: GuildConfig): Promise<void> {
  guildConfig.welcomeMessage = null
  await guildConfig.save()

  if (guildConfig.errors.length > 0) {
    await interaction.reply('An unknown error occurred while resetting your welcome message. This is prorbably the result of a bug and should be reported.')
  } else {
    await interaction.reply('Your welcome message has been unset. You\'ll need to set a new one to get welcome messages again')
  }
}

async function set (interaction: CommandInteraction, guildConfig: GuildConfig): Promise<void> {
  const welcomeMessage = interaction.options.getChannel('message', true).id
  guildConfig.welcomeMessage = welcomeMessage
  await guildConfig.save()

  if (guildConfig.errors.length > 0) {
    await interaction.reply('An unknown error occurred when setting a new welcome message.')
  } else {
    await interaction.reply(`Your welcome message is now:\n\n\`\`\`\n<#${guildConfig.welcomeMessage}>.\n\`\`\``)
  }
}
