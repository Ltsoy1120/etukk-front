import "./Button.scss"

import {MouseEventHandler} from "react"
import {NavLink, useLocation} from "react-router-dom"
import {classMerge, classWithModifiers} from "utils/common"

import {ButtonBaseProps} from "./Button.types"

interface ButtonLinkProps extends ButtonBaseProps {
  to: string
  state?: any
  nav?: boolean
  end?: boolean
  disabled?: boolean
  replace?: boolean
  publish?: boolean
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

function ButtonLink(props: ButtonLinkProps) {
  const location = useLocation()

  const modifiers: string[] = []
  if (props.color) modifiers.push(props.color)
  if (props.small) modifiers.push("small")
  if (props.outline) modifiers.push("outline")
  if (props.disabled) modifiers.push("disabled")
  if (props.publish) modifiers.push("publish")
  return (
    <NavLink
      className={link =>
        classMerge(
          classWithModifiers(
            "button",
            ...modifiers,
            props.outline && props.nav && !link.isActive && "gray"
          ),
          props.className
        )
      }
      replace={props.replace}
      to={props.disabled ? location : props.to}
      state={props.state}
      onClick={props.onClick}
      end={props.end}>
      {props.iconLeft && <div className="button__icon">{props.iconLeft}</div>}
      <div className="button__text">{props.children}</div>
      {props.iconRight && <div className="button__icon">{props.iconRight}</div>}
    </NavLink>
  )
}

export default ButtonLink
