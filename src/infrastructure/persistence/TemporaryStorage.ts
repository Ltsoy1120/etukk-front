class TemporaryStorage {
  private storage: Map<unknown, unknown>
  private callbacks = new Set<Function>()

  constructor(public name: string) {
    try {
      const serializedMapValues = sessionStorage.getItem(name)
      const mapValues = JSON.parse(serializedMapValues || "[]")

      this.storage = new Map(mapValues instanceof Array ? mapValues : [])
    } catch (error) {
      this.storage = new Map

      if (process.env.NODE_ENV === "development") {
        console.error(error)
      }
    }
  }

  private serialize() {
    sessionStorage.setItem(this.name, JSON.stringify([...this.storage.entries()]))
  }

  set<K, V>(key: K, value: V) {
    // Object.seal(value)
    this.storage.set(key, value)
    this.serialize()

    for (const callback of this.callbacks) callback()
  }

  get<V, K = unknown>(key: K): V | null {
    return this.storage.get(key) as V
  }

  state<V, K = unknown>(key: K, init?: V): [V, (value: V | ((state: V) => V)) => void] {
    const state = (this.get(key) as never) || init
    const setState = (value: V | ((state: V) => V)) => {
      if (value instanceof Function) {
        this.set(key, value((this.get(key) as never) || init))
        return
      }

      this.set(key, value)
    }

    return [state, setState]
  }

  clear() {
    this.storage.clear()
    this.serialize()
  }

  keys() {
    return [...this.storage.keys()]
  }

  on(callback: Function) {
    this.callbacks.add(callback)
    return () => {
      this.callbacks.delete(callback)
    }
  }
}

export default TemporaryStorage