import "./Previews.scss"

import { ReactNode } from "react"
import { classWithModifiers } from "utils/common"

interface PreviewsProps {
  children: ReactNode
  asd?: boolean
}

function Previews(props: PreviewsProps) {
  return (
    <div className={classWithModifiers("previews", props.asd && "asd")}>{props.children}</div>
  )
}

export default Previews
