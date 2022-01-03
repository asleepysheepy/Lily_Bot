import { Commands } from '../commands'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { Snowflake } from 'discord.js'

function canUserDeploy (userId: Snowflake): boolean {
  if (process.env.USERS_WHO_CAN_DEPLOY == null) { return false }
  if (!process.env.USERS_WHO_CAN_DEPLOY.includes(userId)) { return false }

  return true
}

async function deployCommands (token: string, clientId: string, guildId?: Snowflake): Promise<void> {
  // Set the bot token
  const rest = new REST({ version: '9' }).setToken(token)

  // Transform command data to be sent to Discord
  const commandData = Commands.commandList.map(command => command.data.toJSON())

  if (guildId == null) {
    await rest.put(Routes.applicationCommands(clientId), { body: commandData })
  } else {
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commandData })
  }
}

export const CommandService = {
  canUserDeploy,
  deployCommands
}
