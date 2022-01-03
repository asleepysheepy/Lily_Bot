import { Logger } from './core'
import { CommandService } from './services'

// Get the bot token and client id from the envvars, exit if the aren't set.
const token = process.env.BOT_TOKEN
const clientId = process.env.BOT_CLIENT_ID
if (token == null || clientId == null) {
  Logger.error('Make sure the BOT_TOKEN and and BOT_CLIENT_ID envvars are set.')
  process.exit()
}

// Register the commands with discord.
CommandService.deployCommands(token, clientId)
  .then(() => Logger.info('Successfully registered bot commands.'))
  .catch(Logger.error)
