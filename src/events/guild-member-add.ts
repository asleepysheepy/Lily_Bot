import { GuildMember, TextChannel } from 'discord.js'
import { Logger } from '../core'
import { GuildConfig } from '../models'
import { MessageFormatService } from '../services'
import { Event } from '../types'

/**
 * Fired when a user joins a server.
 *
 * Used for:
 *  - Sending a welcome message to new users.
 */
export const GuildMemberAddEvent: Event = {
  eventName: 'guildMemberAdd',
  handle: async (member: GuildMember): Promise<void> => {
    const guildConfig = await GuildConfig.findOrCreate(member.guild.id)

    // If there is not a welcome message and a welcome message channel set, xit
    if (guildConfig.welcomeMessageChannelId == null || guildConfig.welcomeMessage == null) { return }

    // Attempt to get the welcome message channel, exit if not found
    const welcomeMessageChannel = await member.guild.channels.fetch(guildConfig.welcomeMessageChannelId)
    if (welcomeMessageChannel == null) { return }

    // Format the welcome message by preforming template substitutions
    const message = MessageFormatService.formatTemplateString(guildConfig.welcomeMessage, member)

    // Attempt to send the message, log an error if it fails.
    try {
      const welcomeMessageTextChannel = welcomeMessageChannel as TextChannel
      await welcomeMessageTextChannel.send(message)
    } catch (error: any) {
      Logger.error(`An error occured attempting to send a welcome message in guild "${member.guild.name}" with id: \`${member.guild.id}\``)
      Logger.error(error)
    }
  }
}
