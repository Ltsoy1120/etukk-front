import {combineReducers} from "redux"

import event from "./reducers/event"
import user from "./reducers/user"

export const reducers = {
  user,
  event,
}

const combinedReducers = combineReducers(reducers)
export default combinedReducers
