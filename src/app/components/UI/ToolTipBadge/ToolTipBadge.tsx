import "./ToolTipBadge.scss"

import { ReactNode } from "react"

interface ToolTipBadgeProps {
  children: ReactNode
}

function ToolTipBadge(props: ToolTipBadgeProps) {
  return (
    <div className="tool-tip-badge">
      <div className="tool-tip-badge__mark">?</div>
      <div className="tool-tip-badge__container">{props.children}</div>
    </div>
  )
}

export default ToolTipBadge
