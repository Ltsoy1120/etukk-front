import {userUpdate} from "infrastructure/persistence/redux/reducers/user"
import store from "infrastructure/persistence/redux/store"
import {QueryError, QueryResponse} from "react-fetching-library"
import {toast} from "react-toastify"
import {createQuery, isDictionary} from "utils/common"

import {Action} from "./client.types"

type Response<T = unknown> = QueryResponse<T>

export function endpointTransform(action: Action) {
  const endpoint = process.env.REACT_APP_API_HOST + action.endpoint + "/"
  const query = createQuery(action.params)

  return endpoint + (query && "?" + query)
}

function bodyTransform(
  body: unknown,
  type: "multipart/form-data" | "application/json"
) {
  if (type === "multipart/form-data") {
    if (!isDictionary(body)) return body

    const formData = new FormData()
    try {
      mapFormData(body).forEach(([key, value]) => {
        formData.append(key, value)
      })
    } catch (error) {
      console.log(error)
    }
    // throw new Error
    return formData
  }
  return body
}

function mapFormData(
  value: unknown,
  key?: string | number
): [string, Blob | string][] {
  const result: [string, Blob | string][] = []

  if (value instanceof Array) {
    value.forEach(value2 => {
      const key2 = (key ?? "") + "[]"

      // result.push([key2, (value instanceof Blob) ? value : String(value)])
      // console.log(value2, typeof value2 === "object")
      result.push(
        ...(typeof value2 === "object"
          ? mapFormData(value2, key2)
          : ([[key2, value2]] as never))
      )
    })
    return result
  }

  if (isDictionary(value)) {
    Object.keys(value).forEach(key2 => {
      const value2 = value[key2]
      const key3 = key ? `${key}[${key2}]` : key2
      // console.log(mapFormData(value2, key3))
      result.push(
        ...(typeof value2 === "object"
          ? mapFormData(value2, key3)
          : ([[key3, value2]] as never))
      )
    })
    return result
  }

  result.push([
    String(key ?? ""),
    value instanceof Blob ? value : String(value),
  ])
  // console.log(result)
  return result
}

export function requestInterceptor() {
  return async (action: Action): Promise<Action> => {
    return {
      ...action,
      endpoint: endpointTransform(action),
      // cache: "no-cache",
      credentials: "same-origin",
      // redirect: "follow",
      referrerPolicy: "no-referrer",

      body: bodyTransform(action.body, "application/json"),

      headers: {
        Authorization:
          ("Bearer " + !action.config?.skipAuth &&
            localStorage.getItem("token")) ||
          "",
        // "Content-Type": "application/json",
        accept: "application/json",
        // "Accept-Language": Localization.lang
      },
    }
  }
}
export function responseInterceptor() {
  return async (action: Action, response: Response) => {
    if (responseHasError(response)) {
      responseErrorHandling(action, response)
      return {...response, error: true}
    }

    // if (response.payload?.uid) {
    //   localStorage.setItem("token", response.payload.uid)
    // }

    return response
  }
}

function responseHasError(response: Response): boolean {
  if ((response.status || 0) >= 400) {
    return true
  }

  if (response.payload == null && response.status === 200) {
    return true
  }

  // if (response.payload?.status !== true) {
  //   return true
  // }

  return false
}

function responseErrorHandling(action: Action, response: Response) {
  if (response.status === 401) {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    toast.info("Неправильный логин или пароль")
    store.dispatch(userUpdate({auth: false}))

    if (process.env.NODE_ENV === "production") {
      return
    }
  }
  console.log("response.error", response.error)

  const payloadAny = response.payload as any
  console.log("toast.error======", payloadAny)
  toast.error(
    transformPayloadErrorMessage(
      payloadAny?.message || payloadAny?.error?.comment
    )
  )
  if (response.status === 404) {
    return // Should be handled by initializer
  }

  if (response.error)
    console.error(
      new QueryError(`${action.endpoint}: unexpected error`, response)
    )
  if (response.payload == null) {
    console.error(new QueryError(`${action.endpoint}: no payload`, response))
  }
}

function transformPayloadErrorMessage(codeOrMessage?: string | null) {
  if (codeOrMessage == null) return "Got no code nor message"
  if (codeOrMessage in errors) return errors[codeOrMessage]

  return codeOrMessage
}

const errors: Record<string, string> = {
  "Not Found": "Не найдено",
  UsersNotFound: "Пользователь не найден",
}
