import { GuildCreateEvent } from './guild-create'
import { InteractionEvent } from './interaction-create'
import { MessageEvent } from './message-create'
import { ReadyEvent } from './ready'

const eventsList = [
  GuildCreateEvent,
  InteractionEvent,
  MessageEvent,
  ReadyEvent
]

export const Events = {
  eventsList
}
