/**
 * Modified `createCache` function
 * https://github.com/marcin-piela/react-fetching-library/blob/master/src/cache/cache.ts
 */

import { Action } from "./client.types"

/**
 * 
 * @returns endpoint
 */
function getActionId(action: Action) {
  return action.endpoint
}

function createCacheModified<T>(
  isCacheable: (action: Action) => boolean,
  isValid: (response: T & { timestamp: number }) => boolean,
) {
  let items: { [key: string]: any } = {}

  const add = (action: Action, value: T) => {
    if (isCacheable(action)) {
      items[getActionId(action)] = { ...value, timestamp: Date.now() }
    }
  }

  const remove = (action: Action) => {
    delete items[getActionId(action)]
  }

  const get = (action: Action) => {
    const response = items[getActionId(action)]
    const valid = response && isValid(response)

    if (valid) {
      return response
    }

    if (response && !valid) {
      remove(action)
    }
  }

  const setItems = (value: { [key: string]: any }) => {
    items = value
  }

  const getItems = () => {
    return items
  }

  return {
    add,
    get,
    getItems,
    remove,
    setItems,
  } as Cache<T>
}
export type Cache<T> = {
  add: (action: Action, value: T) => void;
  remove: (action: Action) => void;
  get: (action: Action) => T & { timestamp: number } | undefined;
  getItems: () => { [key: string]: T };
  setItems: (items: { [key: string]: T }) => void;
};
export default createCacheModified