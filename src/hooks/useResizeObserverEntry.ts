import { useEffect, useState } from "react"
// import ResizeObserver from "resize-observer-polyfill"

function useResizeObserverSize(target: Element, options?: ResizeObserverOptions): ResizeObserverSize {
  const initHeight = target.clientHeight || target.scrollHeight
  const initWidth = target.clientWidth || target.scrollWidth

  const [size, setSize] = useState<ResizeObserverSize>({ blockSize: initHeight, inlineSize: initWidth })

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      const entry: ResizeObserverEntry | undefined = entries[entries.length - 1]
      if (entry == null) return

      try {
        if (options?.box) {
          if (options.box in entry) {
            // @ts-expect-error: entry can't be indexed by `options.box`
            const sizes: ResizeObserverSize[] = entry[options.box]
            const size: ResizeObserverSize = sizes[sizes.length - 1]

            return setSize(size)
          }
        }

        const size: ResizeObserverSize | undefined = entry.borderBoxSize[entry.borderBoxSize.length - 1]
        if (size) {
          return setSize(size)
        }
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.warn(error)
        }

        // Fallback
        setSize({
          blockSize: entry.contentRect.height,
          inlineSize: entry.contentRect.width,
        })
      }
    })
    resizeObserver.observe(target)
    return () => {
      resizeObserver.disconnect()
    }
  }, [target])
  return size
}

export default useResizeObserverSize

export enum DeviceWidths {
  Desktop = 1100,
  Mobile = 560
}