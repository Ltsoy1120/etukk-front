import "./ViewNarrow.scss"

import { ReactNode } from "react"
import { Outlet } from "react-router"

interface ViewNarrowProps {
  children?: ReactNode
}

function ViewNarrow(props: ViewNarrowProps) {
  return (
    <div className="view-narrow">
      {props.children || <Outlet />}
    </div>
  )
}

export default ViewNarrow
