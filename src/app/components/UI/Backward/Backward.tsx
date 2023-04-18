import "./Backward.scss"

import { ReactNode } from "react"
import { Link, useNavigate } from "react-router-dom"

import Icon from "../Icon/Icon"

interface BackwardProps {
  to?: string
  replace?: boolean
  onClick?(): void

  children?: ReactNode
}

function Backward(props: BackwardProps) {
  const navigate = useNavigate()

  if (props.to != null) {
    return (
      <Link {...props} className="get-back" to={props.to}>
        <Icon className="get-back__icon" name="chevron" />
        <div className="get-back__text">{props.children || "Назад"}</div>
      </Link>
    )
  }

  return (
    <button className="get-back" type="button" onClick={props.onClick || (() => navigate(-1))}>
      <Icon className="get-back__icon" name="chevron" />
      <div className="get-back__text">{props.children || "Назад"}</div>
    </button>
  )
}

export default Backward
