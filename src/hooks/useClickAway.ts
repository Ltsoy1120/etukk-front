import { MutableRefObject, useEffect } from "react"

type Callback = (event: MouseEvent) => void

function useClickAway(ref: MutableRefObject<HTMLElement | null | undefined>, callback: Callback) {
  useEffect(() => {
    function listener(event: MouseEvent) {
      if (!(event.target instanceof Element)) return
      if (!ref.current) return
      if (ref.current.contains(event.target)) return

      callback(event)
    }

    document.addEventListener("click", listener, { passive: true, capture: true })
    return () => document.removeEventListener("click", listener)
  }, [callback])
}

export default useClickAway
