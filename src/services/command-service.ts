import { Client, Message } from 'discord.js'
import { Commands } from '../commands'

/**
 * A function to redeploy all the bots commands
 *
 * @param message The message which triggered the redeploy
 * @param client The bot's client instance.
 */
async function handleDeploy (message: Message, client: Client): Promise<void> {
  // Ignore if not the correct deploy message
  if (message.content !== ('deployCommands')) { return }

  // Ignore if the user doesn't have deploy permissions
  if (process.env.USERS_WHO_CAN_DEPLOY == null) { return }
  if (!process.env.USERS_WHO_CAN_DEPLOY.includes(message.author.id)) { return }

  // Register commands
  const commandData = Commands.commandList.map((c) => c.data)
  client.application?.commands.set(commandData)
}

export const CommandService = {
  handleDeploy
}
