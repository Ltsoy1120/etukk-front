import "./FullscreenLayout.scss"

import Icon from "app/components/UI/Icon/Icon"
import useDeviceWidth from "hooks/useDeviceWidth"
import {DeviceWidths} from "hooks/useResizeObserverEntry"
import {ReactNode, useEffect} from "react"
import {useModalContext} from "react-modal-global"
import {classMerge} from "utils/common"

interface FullscreenLayoutProps {
  width?: string
  isPage?: boolean
  className?: string
  children: ReactNode
}

function FullscreenLayout(props: FullscreenLayoutProps) {
  let modal: any
  if (!props.isPage) {
    modal = useModalContext()
  }
  const [isMobile] = useDeviceWidth(DeviceWidths.Mobile)

  useEffect(() => {
    function escapeKeyboardEvent(event: Event) {
      if (!(event instanceof KeyboardEvent)) return
      if (event.key.toLowerCase() !== "escape") return

      event.preventDefault()

      modal && modal.close()
    }

    window.addEventListener("keydown", escapeKeyboardEvent)
    return () => {
      window.removeEventListener("keydown", escapeKeyboardEvent)
    }
  }, [modal])

  if (isMobile) {
    return (
      <div className={classMerge("fullscreen-layout", props.className)}>
        <div className="fullscreen-layout__container">
          {modal && (
            <button
              className="fullscreen-layout__close"
              type="button"
              onClick={modal.close}>
              <Icon name="cross" />
            </button>
          )}
          <div className="fullscreen-layout__inner">
            <img
              className="fullscreen-layout__logo"
              src="/static/images/logo-white.svg"
              alt="etukk logo white"
            />
            {props.children}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div
      className="fullscreen-layout"
      style={{"--fullscreen-width": props.width}}>
      <div className="fullscreen-layout__icon">
        <img src="/static/images/logo.svg" alt="etukk logo" />
      </div>
      <div className="fullscreen-layout__container">
        {modal && (
          <button
            className="fullscreen-layout__close"
            type="button"
            onClick={modal.close}>
            <Icon name="cross" />
          </button>
        )}
        <div className="fullscreen-layout__inner">
          <img
            className="fullscreen-layout__logo"
            src="/static/images/logo.svg"
            alt="etukk logo"
          />
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default FullscreenLayout
