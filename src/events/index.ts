import { InteractionEvent } from './interaction-create'
import { MessageEvent } from './message-create'
import { ReadyEvent } from './ready'

const eventsList = [
  InteractionEvent,
  MessageEvent,
  ReadyEvent
]

export const Events = {
  eventsList
}
