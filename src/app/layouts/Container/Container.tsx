import "./Container.scss"

import { ReactNode } from "react"
import { classWithModifiers } from "utils/common"

interface ContainerProps {
  row?: boolean
  children: ReactNode
}

function Container(props: ContainerProps) {
  return (
    <div className={classWithModifiers("container", props.row && "row")}>{props.children}</div>
  )
}

export default Container
