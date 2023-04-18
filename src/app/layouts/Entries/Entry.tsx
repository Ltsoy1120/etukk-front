import "./Entries.scss"

import { ReactNode } from "react"
import { classWithModifiers } from "utils/common"

interface EntryProps {
  column?: boolean
  reverse?: boolean

  children: ReactNode[]
}

function Entry(props: EntryProps) {
  return (
    <div className={classWithModifiers("entry", props.column && "column", props.reverse && "reverse")}>{props.children}</div>
  )
}

export default Entry
