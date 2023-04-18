import {MapActions} from "infrastructure/persistence/redux/store.types"
import {ValuesOf} from "interfaces/utilities"

import {Event} from "./types"

const initialState: Event = {
  time: "",
  event_name: "",
  text: "",
  data: null,
  user_id: null,
}

interface EventActions {
  EVENT_UPDATE: Event
}

type Action = ValuesOf<MapActions<EventActions>>

export default (state = initialState, action: Action): Event => {
  switch (action.type) {
    case "EVENT_UPDATE": {
      state = {...action.payload}
      return state
    }

    default:
      return state
  }
}

export const eventUpdate = (payload: EventActions["EVENT_UPDATE"]) =>
  ({
    type: "EVENT_UPDATE",
    payload,
  } as const)
