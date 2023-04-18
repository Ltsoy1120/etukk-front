import { MutableRefObject, useEffect, useRef, useState } from "react"

type HeightType = "scrollHeight" | "clientHeight" | "offsetHeight"

function useHeight<E extends HTMLElement>(heightType: HeightType): [number, MutableRefObject<E | null>] {
  const elementRef = useRef<E | null>(null)
  const [height, setHeight] = useState<number>(-1)

  useEffect(() => {
    if (!elementRef.current) return
    setHeight(elementRef.current[heightType])
  }, [heightType])


  return [height, elementRef]
}

export default useHeight