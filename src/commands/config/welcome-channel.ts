import { SlashCommandSubcommandGroupBuilder } from '@discordjs/builders'
import { Client, CommandInteraction } from 'discord.js'
import { Command } from '../../types'
import { GuildConfig } from '../../models'

export const ConfigWelcomeMessageChannelCommand: Command = {
  data: new SlashCommandSubcommandGroupBuilder()
    .setName('welcomeMessageChannel')
    .setDescription('Configure the channel where welcome messages are posted.')
    .addSubcommand((subcommand) => (
      subcommand.setName('set')
        .setDescription('Set the channel where welcome messages will be posted')
        .addChannelOption((option) => (
          option.setName('channel')
            .setRequired(true)
            .setDescription('The channel to post messages to, as a mention.')
        ))
    ))
    .addSubcommand((subcommand) => (
      subcommand.setName('get')
        .setDescription('Gets the channel which welcome messages are posted')
    ))
    .addSubcommand((subcommand) => (
      subcommand.setName('reset')
        .setDescription('Removes the currently set welcome message channel')
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
  if (guildConfig.welcomeMessageChannelId == null) {
    await interaction.reply('You currently do not have a channel set for posting welcome messages.')
  } else {
    await interaction.reply(`Welcome messages will be posted in <#${guildConfig.welcomeMessageChannelId}>.`)
  }
}

async function reset (interaction: CommandInteraction, guildConfig: GuildConfig): Promise<void> {
  guildConfig.welcomeMessageChannelId = null
  await guildConfig.save()

  if (guildConfig.errors.length > 0) {
    await interaction.reply('An unknown error occurred while resetting your welcome channel. This is prorbably the result of a bug and should be reported.')
  } else {
    await interaction.reply('Your welcome channel has been unset. You\'ll need to set a new one to get welcome messages again')
  }
}

async function set (interaction: CommandInteraction, guildConfig: GuildConfig): Promise<void> {
  const welcomeMessageChannelId = interaction.options.getChannel('channel', true).id
  guildConfig.welcomeMessageChannelId = welcomeMessageChannelId
  await guildConfig.save()

  if (guildConfig.errors.length > 0) {
    await interaction.reply('An unknown error occurred when setting a new welcome channel.\n\nPlease double check that channel exists and that Lily_Bot can posst messages there.')
  } else {
    await interaction.reply(`Your welcome channel has been set to <#${welcomeMessageChannelId}>.`)
  }
}
