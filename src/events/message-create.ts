import { Message, Snowflake } from 'discord.js'
import { CommandService } from '../services'
import { Event } from '../types'
import { Logger } from '../core'

/**
 * Fired when a new message is posted.
 *
 * Used for:
 *  - Kicking off the deploy process for commands
 */
export const MessageEvent: Event = {
  eventName: 'messageCreate',
  handle: async (message: Message): Promise<void> => {
    // Ignore direct messages
    if (message.guild == null) { return }

    if (message.content === '!!!deployCommands' && CommandService.canUserDeploy(message.author.id)) {
      deployCommands(message, message.guild.id).catch(Logger.error)
    }
  }
}

async function deployCommands (message: Message, guildId: Snowflake): Promise<void> {
  // Get the bot token and client id from the envvars, exit if the aren't set.
  const token = process.env.BOT_TOKEN
  const clientId = process.env.BOT_CLIENT_ID
  if (token == null || clientId == null) {
    await message.reply('Unable to deploy commands')
    return
  }

  // Register the commands with discord.
  await CommandService.deployCommands(token, clientId, guildId)
    .then(async () => await message.reply('Successfully deployed commands'))
    .catch(async () => await message.reply('Unable to deploy commands'))
}
