import "./LotCompactLayout.scss"

import { ReactNode } from "react"

interface LotCompactLayoutProps {
  children: ReactNode
}

function LotCompactLayout(props: LotCompactLayoutProps) {
  return (
    <div className="lot-compact-layout">{props.children}</div>
  )
}

export default LotCompactLayout
