import "./extensions"

import { Buffer } from "buffer"
import { ExtractInterpolations } from "interfaces/utilities"
import { Dispatch, SyntheticEvent } from "react"

/**
 *
 * @returns `class1 class2`
 */
export function classMerge(...classNames: Array<string | null | undefined>): string {
  const space = " "
  return classNames.filter(Boolean).join(space)
}

/**
 * Join modifiers with origin class
 * @returns `"origin-class origin-class--modifier"`
 */
export function classWithModifiers(originClass: string, ...modifiers: Array<string | number | false | null | undefined>): string {
  modifiers = modifiers.filter(Boolean)
  if (!modifiers.length) return originClass

  const space = " "
  const separator = "--"

  modifiers = modifiers.map(modifier => originClass + separator + modifier)
  return originClass + space + modifiers.join(space)
}

/**
 * Creates query from given object
 * - Supports deep nesting
 * - Removes empty fields
 * @returns `state1=6&state2=horse` without `?`
 */
export function createQuery(queryObject?: Record<string | number, unknown> | null, keyPrefix?: string): string {
  if (queryObject == null || !Object.keys(queryObject).length) return ""
  keyPrefix = keyPrefix ? (keyPrefix + "_") : ""

  const queryKeys = Object.keys(queryObject)
  const queryArray = queryKeys.map(key => {
    const value = queryObject[key]
    if (value) {
      if (value instanceof Array) {
        return keyPrefix + encodeURIComponent(key) + "=" + encodeURIComponent(`[${String(value)}]`)
      }

      if (isDictionary(value)) {
        return createQuery(value, keyPrefix + key)
      }

      return keyPrefix + encodeURIComponent(key) + "=" + encodeURIComponent(String(value))
    }
    return ""
  })

  return queryArray.filter(Boolean).join("&")
}

const getCircularReplacer = () => {
  const seen = new WeakSet()
  return (_key: string, value: unknown) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return
      }
      seen.add(value)
    }
    return value
  }
}

export function toBase64<T = unknown>(value?: T | null) {
  if (value == null) return String(value)
  const serializedValue = JSON.stringify(value, getCircularReplacer())
  return Buffer.from(serializedValue).toString("base64")
}


/**
 * Interpolates {variable} in string
 */
export function interpolate<T extends string>(value: T, vars: Record<ExtractInterpolations<T>, string | number>): string {
  const varKeys = Object.keys(vars) as ExtractInterpolations<T>[]
  return varKeys.reduce((result: string, next) => result.replace(new RegExp(`{${next}}`, "g"), String(vars[next])), value)
}


/**
 * Stops propagation from container
 * @param callback any function
 * @returns mouse event handler
 */
export function stopPropagation(callback?: Function | null) {
  return ({ target, currentTarget }: Event | SyntheticEvent) => {
    if (target instanceof Element && currentTarget instanceof Element) {
      if (target !== currentTarget) return
    }

    callback?.()
  }
}

export function inputValue(callback: Dispatch<string>) {
  return (event: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    callback(event.currentTarget.value)
  }
}

export function isDictionary(object: unknown): object is Record<keyof never, unknown> {
  return object instanceof Object && object.constructor === Object
}