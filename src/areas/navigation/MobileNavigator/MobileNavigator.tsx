import "./MobileNavigator.scss"

import Icon, {IconName} from "app/components/UI/Icon/Icon"
import useDeviceWidth from "hooks/useDeviceWidth"
import {DeviceWidths} from "hooks/useResizeObserverEntry"
import {ReactNode} from "react"
import {useSelector} from "react-redux"
import {NavLink, useLocation} from "react-router-dom"
import {classWithModifiers} from "utils/common"

/**
 *
 * This component is mobile oriented
 */
function MobileNavigator() {
  const isAuth = useSelector(state => state.user.auth)
  const [isMobile] = useDeviceWidth(DeviceWidths.Mobile)
  if (!isMobile) return null
  const {pathname} = useLocation()

  return (
    <>
      {isAuth && (
        <nav className="mobile-navigator">
          <MobileNavigatorLink
            iconName="search-filled"
            to={pathname.includes("hot") ? pathname : "/"}>
            Главная
          </MobileNavigatorLink>
          <MobileNavigatorLink
            iconName="bookmark"
            to={
              pathname.includes("favourites") ? pathname : "/favourites/lots"
            }>
            Избранное
          </MobileNavigatorLink>
          <MobileNavigatorLink
            iconName="hammer"
            to={pathname.includes("lots/draft") ? pathname : "/lots/draft"}>
            Разместить лот
          </MobileNavigatorLink>
          <MobileNavigatorLink
            iconName="bell"
            to={
              pathname.includes("notifications")
                ? pathname
                : "/notifications/lots"
            }>
            Уведомления
          </MobileNavigatorLink>
          <MobileNavigatorLink
            iconName="user"
            to={pathname.includes("profile") ? pathname : "/profile/personal"}>
            Профиль
          </MobileNavigatorLink>
        </nav>
      )}
    </>
  )
}

interface MobileNavigatorLinkProps {
  iconName: IconName
  to: string
  children: ReactNode
}

function MobileNavigatorLink(props: MobileNavigatorLinkProps) {
  return (
    <NavLink
      className={link =>
        classWithModifiers("mobile-navigator-link", link.isActive && "active")
      }
      to={props.to}
      end>
      <div className="mobile-navigator-link__circle">
        <Icon className="mobile-navigator-link__icon" name={props.iconName} />
      </div>
      <div className="mobile-navigator-link__label">{props.children}</div>
    </NavLink>
  )
}

export default MobileNavigator
