import { useEffect, useState } from "react"

type Reached = boolean
type ResetReached = () => void

function useScrollReach(disabled?: boolean, offset = 0): [Reached, ResetReached] {
  const [reached, setReached] = useState<Reached>(false)
  useEffect(() => {
    function onScroll() {
      if (disabled) {
        setReached(false)
        return
      }

      const { scrollTop, clientHeight, scrollHeight } = document.documentElement
      if ((scrollTop + clientHeight) >= (scrollHeight - offset)) {
        setReached(true)
      } else {
        setReached(false)
      }
    }
    window.addEventListener("scroll", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [disabled, offset])
  return [reached, () => setReached(false)]
}

export default useScrollReach