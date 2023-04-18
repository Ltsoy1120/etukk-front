import "./LotPage.scss"

import { ReactNode } from "react"
import { classWithModifiers } from "utils/common"

interface LotPageProps {
  spaceAround?: boolean
  children: ReactNode
}

function LotPage(props: LotPageProps) {
  return (
    <div className={classWithModifiers("lot-page", props.spaceAround && "spaceAround")}>{props.children}</div>
  )
}

export default LotPage
