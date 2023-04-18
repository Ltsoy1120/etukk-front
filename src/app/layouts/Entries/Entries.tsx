import "./Entries.scss"

import { ReactNode } from "react"

interface EntriesProps {
  children: ReactNode[]
}

function Entries(props: EntriesProps) {
  return (
    <div className="entries">{props.children}</div>
  )
}

export default Entries
