import "./PopupLayout.scss"

import Icon from "app/components/UI/Icon/Icon"
import { ReactNode } from "react"
import { useModalContext } from "react-modal-global"
import { classWithModifiers } from "utils/common"

interface PopupLayoutProps {
  width?: string
  centered?: boolean
  pushLeft?: boolean
  pushRight?: boolean
  children: ReactNode
}

function PopupLayout(props: PopupLayoutProps) {
  const modal = useModalContext()

  const modifiers: string[] = []
  if (props.centered) modifiers.push("centered")
  if (props.pushLeft) modifiers.push("push-left")
  if (props.pushRight) modifiers.push("push-right")
  return (
    <div className="popup-layout" style={{ "--popup-width": props.width }}>
      <div className="popup-layout__container">
        <button className={classWithModifiers("popup-layout__close", !modal.params.closable && "hidden")} type="button" onClick={modal.close}>
          <Icon name="cross" />
        </button>
        <div className={classWithModifiers("popup-layout__inner", ...modifiers)}>{props.children}</div>
      </div>
    </div>
  )
}

export default PopupLayout
