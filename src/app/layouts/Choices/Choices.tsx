import "./Choices.scss"

import { ReactNode } from "react"

interface ChoicesProps {
  children: ReactNode
}

function Choices(props: ChoicesProps) {
  return (
    <div className="choices">{props.children}</div>
  )
}

export default Choices
