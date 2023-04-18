import "./Entries.scss"

import { ReactNode } from "react"

interface EntryCounterProps {
  title: ReactNode
  children: ReactNode
}

function EntryCounter(props: EntryCounterProps) {
  return (
    <div className="entry-counter">
      <div className="entry-counter__key">{props.title}</div>
      <div className="entry-counter__value">{props.children}</div>
    </div>
  )
}

export default EntryCounter
