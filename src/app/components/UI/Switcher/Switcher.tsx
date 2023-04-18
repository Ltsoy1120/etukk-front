import "./Switcher.scss"

import { Children, ReactElement } from "react"
import { NavLink, NavLinkProps } from "react-router-dom"
import { classWithModifiers } from "utils/common"

interface SwitcherProps {
  children: ReactElement<Exclude<NavLinkProps, "className">> | ReactElement<Exclude<NavLinkProps, "className">>[]
}

/**
 *
 * Accepts `Link`, sets class "switcher__item" to them
 *
 * Must have multiple `children`
 */
function Switcher(props: SwitcherProps) {
  return (
    <div className="switcher">
      {Children.map(props.children, child => (
        <NavLink {...child.props} className={link => classWithModifiers("switcher__item", link.isActive && "active")} key={child.key} />
      ))}
    </div>
  )
}

export default Switcher
