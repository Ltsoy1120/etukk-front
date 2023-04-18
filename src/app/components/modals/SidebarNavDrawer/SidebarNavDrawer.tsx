import "./SidebarNavDrawer.scss"

import Icon from "app/components/UI/Icon/Icon"
import OuterLink from "app/components/UI/OuterLink"
import DrawerLayout from "app/layouts/Modal/DrawerLayout/DrawerLayout"
import TopbarActions from "areas/navigation/Topbar/TopbarActions"
import useDeviceWidth from "hooks/useDeviceWidth"
import { DeviceWidths } from "hooks/useResizeObserverEntry"
import { useModalContext } from "react-modal-global"
import { NavLink } from "react-router-dom"

function SidebarNavDrawer() {
  const { close } = useModalContext()
  const [isMobile] = useDeviceWidth(DeviceWidths.Mobile)
  if (isMobile) {
    return (
      <DrawerLayout>
        <div className="sidebar-nav-drawer">
          <div className="sidebar-nav-drawer__header">
            {/* <TopbarActions /> */}
            <button type="button" onClick={close}>
              <Icon className="sidebar-nav-drawer__close" name="cross" />
            </button>
          </div>
          <img className="sidebar-nav-drawer__logo" src="/static/images/logo.svg" alt="etukk logo"></img>
          <nav className="sidebar-nav-drawer__nav">
            <NavLink className="sidebar-nav-drawer__link" to="/favourites/lots" onClick={close}>Избранное</NavLink>
            <NavLink className="sidebar-nav-drawer__link" to="/lots/draft" onClick={close}>Разместить лот</NavLink>
            <NavLink className="sidebar-nav-drawer__link" to="/notifications/lots" onClick={close}>Уведомления</NavLink>
            <NavLink className="sidebar-nav-drawer__link" to="/profile/personal" onClick={close}>Профиль</NavLink>
            <NavLink className="sidebar-nav-drawer__link" to="/support" onClick={close}>Техподдержка</NavLink>
            <NavLink className="sidebar-nav-drawer__link" to="/about" onClick={close}>О нас</NavLink>
            <NavLink className="sidebar-nav-drawer__link" to="/contacts" onClick={close}>Контакты</NavLink>
            <NavLink className="sidebar-nav-drawer__link sidebar-nav-drawer__link--underlined" to="/terms/policy" onClick={close}>Политика конфиденциальности</NavLink>
            <NavLink className="sidebar-nav-drawer__link sidebar-nav-drawer__link--underlined" to="/terms/rules" onClick={close}>Правила пользования сайтом</NavLink>
          </nav>
          <div className="sidebar-nav-drawer__bottom">
            <nav className="sidebar-nav-drawer__nav">
              <OuterLink className="sidebar-nav-drawer__link" to="tel:+7 (495) 324 -09-59" noTarget>+7 (495) 324 -09-59</OuterLink>
              <OuterLink className="sidebar-nav-drawer__link" to="mailto:info@etukk.ru">info@etukk.ru</OuterLink>
            </nav>
          </div>
        </div>
      </DrawerLayout>
    )
  }
  return (
    <DrawerLayout>
      <div className="sidebar-nav-drawer">
        <div className="sidebar-nav-drawer__header">
          <TopbarActions />
          <button type="button" onClick={close}>
            <Icon className="sidebar-nav-drawer__close" name="cross" />
          </button>
        </div>
        <nav className="sidebar-nav-drawer__nav">
          <NavLink className="sidebar-nav-drawer__link" to="/favourites/lots" onClick={close}>Избранное</NavLink>
          <NavLink className="sidebar-nav-drawer__link" to="/lots/draft" onClick={close}>Разместить лот</NavLink>
          <NavLink className="sidebar-nav-drawer__link" to="/notifications/lots" onClick={close}>Уведомления</NavLink>
          <NavLink className="sidebar-nav-drawer__link" to="/profile/personal" onClick={close}>Профиль</NavLink>
          <NavLink className="sidebar-nav-drawer__link" to="/support" onClick={close}>Техподдержка</NavLink>
          <NavLink className="sidebar-nav-drawer__link" to="/about" onClick={close}>О нас</NavLink>
          <NavLink className="sidebar-nav-drawer__link" to="/contacts" onClick={close}>Контакты</NavLink>
          <NavLink className="sidebar-nav-drawer__link sidebar-nav-drawer__link--underlined" to="/terms/policy" onClick={close}>Политика конфиденциальности</NavLink>
          <NavLink className="sidebar-nav-drawer__link sidebar-nav-drawer__link--underlined" to="/terms/rules" onClick={close}>Правила пользования сайтом</NavLink>
        </nav>
        <div className="sidebar-nav-drawer__bottom">
          <nav className="sidebar-nav-drawer__nav">
            <OuterLink className="sidebar-nav-drawer__link" to="tel:+7 (495) 324 -09-59" noTarget>+7 (495) 324 -09-59</OuterLink>
            <OuterLink className="sidebar-nav-drawer__link" to="mailto:info@etukk.ru">info@etukk.ru</OuterLink>
          </nav>
        </div>
      </div>
    </DrawerLayout>
  )
}

export default SidebarNavDrawer
