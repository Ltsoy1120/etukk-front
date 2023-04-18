import "./DialogLayout.scss"

import Icon from "app/components/UI/Icon/Icon"
import useDeviceWidth from "hooks/useDeviceWidth"
import {DeviceWidths} from "hooks/useResizeObserverEntry"
import {ReactNode} from "react"
import {useModalContext} from "react-modal-global"
import {classWithModifiers} from "utils/common"

import PopupLayout from "../PopupLayout/PopupLayout"

interface DialogLayoutProps {
  width?: string
  centered?: boolean
  pushLeft?: boolean
  pushRight?: boolean
  children: ReactNode
}

/**
 *
 * Mobile oriented layout.
 * Falls back to [`PopupLayout`](../PopupLayout/PopupLayout.tsx) when out of `mobile` size.
 */
function DialogLayout(props: DialogLayoutProps) {
  const modal = useModalContext()
  const [isMobile] = useDeviceWidth(DeviceWidths.Mobile)

  if (!isMobile) {
    return <PopupLayout {...props} />
  }

  const modifiers: string[] = []
  if (props.centered) modifiers.push("centered")
  if (props.pushLeft) modifiers.push("push-left")
  if (props.pushRight) modifiers.push("push-right")
  return (
    <dialog className="dialog-layout">
      <div className="dialog-layout__container">
        <div
          className={classWithModifiers("dialog-layout__inner", ...modifiers)}>
          <button
            className={classWithModifiers(
              "dialog-layout__close",
              modal.params.closable === false && "hidden"
            )}
            type="button"
            onClick={modal.close}>
            <Icon name="cross" />
          </button>
          {props.children}
        </div>
      </div>
    </dialog>
  )
}

export default DialogLayout
