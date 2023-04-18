import "./Attention.scss"

import { ReactNode } from "react"

import Icon from "../Icon/Icon"

interface AttentionProps {
  children: ReactNode
}

function Attention(props: AttentionProps) {
  return (
    <div className="attention">
      <Icon className="attention__icon" name="attention" />
      <p className="attention__text">{props.children}</p>
    </div>
  )
}

export default Attention
