import "./DrawerLayout.scss"

import { ReactNode, useEffect, useRef } from "react"
import { useModalContext } from "react-modal-global"
import { useLocation } from "react-router-dom"
import { stopPropagation } from "utils/common"

interface DrawerLayoutProps {
  width?: string
  children: ReactNode
}

function DrawerLayout(props: DrawerLayoutProps) {
  const { close } = useModalContext()
  const location = useLocation()
  const prevLocationPathname = useRef<string>(location.pathname)
  useEffect(() => {
    if (prevLocationPathname.current == location.pathname) return
    prevLocationPathname.current = location.pathname

    close()
  }, [location.pathname])
  return (
    <div className="drawer-layout" style={{ "--drawer-width": props.width }} onClick={stopPropagation(close)}>
      <div className="drawer-layout__container">
        {props.children}
      </div>
    </div>
  )
}

export default DrawerLayout
