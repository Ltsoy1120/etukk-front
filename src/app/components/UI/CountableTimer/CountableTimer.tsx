import "./CountableTimer.scss"

import { ReactNode, useEffect, useState } from "react"


/**
 * Optimization to support multiple intervals without issues
 */
const countableTimerCallbacks = new Set<Function>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const countableTimerInterval = setInterval(() => {
  for (const callback of countableTimerCallbacks) callback()
}, 500)


interface CountableTimerProps {
  until: Date | string | number
  /**
   * [start, end]
   * 
   * The start and the end of the time periods (days, hours, minutes, seconds) in order.
   * Starts with `zero`.
   * 
   * - 0 - means days
   * - 1 - means hours
   * - 2 - means minutes
   * - 3 - means seconds
   */
  slice?: [number?, number?]
  endLabel?: ReactNode
  splitter?: string
  onEnd?(): void
}

function CountableTimer(props: CountableTimerProps) {
  const [timer, setTimer] = useState<[number, number, number, number] | null>(getTimeDifference(props.until, props.slice))

  useEffect(() => {
    function callback() {
      const nextTimerValue = getTimeDifference(props.until, props.slice)
      if (nextTimerValue === null) {
        props.onEnd?.()
      }
      setTimer(nextTimerValue)
    }

    countableTimerCallbacks.add(callback)
    return () => {
      countableTimerCallbacks.delete(callback)
    }
  }, [props.until, props.slice])
  return (
    <span className="countable-timer">{timer ? timer.map(item => item.toLocaleString("ru", { minimumIntegerDigits: 2 })).join(props.splitter || ":") : (props.endLabel ?? "Таймер вышел")}</span>
  )
}

function getTimeDifference(futureDate: Date | string | number, slice: [number?, number?] = []): [number, number, number, number] | null {
  // https://www.w3schools.com/howto/howto_js_countdown.asp
  const now = Date.now()
  const futureTime = new Date(futureDate).getTime()

  const distance = futureTime - now

  if (distance <= 0) {
    return null
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)

  return [days, hours, minutes, seconds].slice(...slice) as never
}

export default CountableTimer
