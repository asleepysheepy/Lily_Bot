import { Events } from './events'
import { Logger, LilyClient } from './core'

function onFailedStartUp (error: any): void {
  const errorMessage: string = error.toString()
  Logger.error(`Unable to start Bot.\n${errorMessage}`)
  process.exit()
}

(new LilyClient())
  .start(Events.eventsList)
  .catch(onFailedStartUp)
