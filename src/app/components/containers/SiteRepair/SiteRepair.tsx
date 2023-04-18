import "./SiteRepair.scss"

import useDeviceWidth from "hooks/useDeviceWidth"
import {DeviceWidths} from "hooks/useResizeObserverEntry"

function SiteRepair() {
  const [isMobile] = useDeviceWidth(DeviceWidths.Mobile)

  if (isMobile) {
    return (
      <div className="repair-layout" style={{"--repair-width": "20em"}}>
        <div className="repair-layout__container">
          <img
            className="repair-layout__logo"
            src="/static/images/logo.svg"
            alt="etukk logo"
          />
          <div className="center">
            <h3 className="heading">УПС! Технические работы!</h3>
            <br />
            <span>
              Приносим свои извинения, на данной странице ведутся технические
              работы. Скоро этот раздел будет вновь доступен для использования
            </span>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="repair-layout" style={{"--repair-width": "20em"}}>
      <div className="repair-layout__icon">
        <img src="/static/images/logo.svg" alt="etukk logo" />
      </div>
      <div className="repair-layout__container">
        <div className="center">
          <h3 className="heading">УПС! Технические работы!</h3>
          <br />
          <span>
            Приносим свои извинения, на данной странице ведутся технические
            работы. Скоро этот раздел будет вновь доступен для использования
          </span>
        </div>
      </div>
    </div>
  )
}

export default SiteRepair
