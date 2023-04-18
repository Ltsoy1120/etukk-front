import ClientAPI from "infrastructure/persistence/api/client"
import {getUser} from "infrastructure/persistence/api/data/actions"
import {mapUser} from "infrastructure/persistence/api/mappings/user"
import {MapActions} from "infrastructure/persistence/redux/store.types"
import {ValuesOf} from "interfaces/utilities"
import {Dispatch} from "redux"

import {User} from "./types"

function getCachedUser(): User | null {
  const value = localStorage.getItem("user")
  if (value === null) return null

  try {
    return JSON.parse(value)
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(error)
    }
    return null
  }
}

const initialState: User = getCachedUser() || {
  auth: false,
}

interface Actions {
  USER_UPDATE: User
}

type Action = ValuesOf<MapActions<Actions>>

export default (state = initialState, action: Action): User => {
  switch (action.type) {
    case "USER_UPDATE": {
      let nextState = {...state}
      if (action.payload.auth) {
        nextState = {...state, ...action.payload}
        localStorage.setItem("user", JSON.stringify(nextState))
      } else {
        nextState = {...action.payload}
      }
      return nextState
    }

    default:
      return state
  }
}

/* Plain Actions */

export const userUpdate = (payload: Actions["USER_UPDATE"]) =>
  ({
    type: "USER_UPDATE",
    payload,
  } as const)

/* Thunk Actions */

export function userFetch(access: {
  access_token: string
  refresh_token?: string
  expire_timestamp?: number
}) {
  localStorage.setItem("token", access.access_token)

  return async (dispatch: Dispatch) => {
    const {error, errorObject, payload} = await ClientAPI.query(getUser())

    if (error) throw errorObject
    if (payload == null) return

    const mappedUser = mapUser(payload)

    dispatch(
      userUpdate({
        ...mappedUser,
        auth: true,
        expires: new Date(
          access.expire_timestamp || Date.now() + 12 * 1000 * 60 * 60
        ), // 12 Hours
      })
    )
  }
}
