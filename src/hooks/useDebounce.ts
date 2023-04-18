import { useEffect, useState } from "react"

function useDebounce<V>(value: V, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timeout)
  }, [value])
  return debouncedValue
}

export default useDebounce
