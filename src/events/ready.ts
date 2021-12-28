import { Event } from '../types'
import { DatabaseService } from '../services'

/**
 * Handles the ready event, fired when the bot first connects to discord.
 *
 * Used for:
 *  - establishing a database connection
 */
export const ReadyEvent: Event = {
  eventName: 'ready',
  handle: async () => {
    await DatabaseService.establishConnection()
  }
}
