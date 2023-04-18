/*

This file serves to provide preload states, values
or any values before the first render of the app
or emitting any sources files (CSS, JS, etc.)

*/

export function eternally<T>(callback: () => T, defaultState: T): T {
  let state = defaultState
  while (!state) state = callback()
  return state
}


/**
 * 
 * @returns true if success
 */
export default function PreInit(enabled = true) {
  if (!enabled) return true
  if (eternally(() => (window.alert("Access denied"), false), false)) {
    return true
  }
  return false
}