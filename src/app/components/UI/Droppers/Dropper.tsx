import useHeight from "hooks/useHeight"
import {ReactNode, useState} from "react"
import {classWithModifiers} from "utils/common"

import Icon from "../Icon/Icon"

export interface DropperProps extends DropperGroupProps {
  name: string
  children?: ReactNode
}

function Dropper(props: DropperProps) {
  const [expanded, setExpanded] = useState(false)
  const [scrollHeight, innerRef] = useHeight<HTMLDivElement>("scrollHeight")
  return (
    <div className="dropper">
      <DropperGroup
        label={props.label}
        amount={props.amount}
        active={props.active || expanded}
        onClick={() => setExpanded(!expanded)}
      />
      {props.children && (
        <div
          className={classWithModifiers(
            "dropper__container",
            expanded && "expanded"
          )}
          style={{"--dropper-height": scrollHeight}}>
          <div className="dropper__inner" ref={innerRef}>
            {props.children}
          </div>
        </div>
      )}
    </div>
  )
}

interface DropperGroupProps {
  active?: boolean
  amount: string | number
  label: string
  onClick?(): void
}
export function DropperGroup(props: DropperGroupProps) {
  return (
    <button
      className={classWithModifiers("dropper-group", props.active && "active")}
      type="button"
      onClick={props.onClick}>
      <div className="dropper-group__text">{props.label}</div>
      <div className="dropper-group__side">
        <div className="dropper-group__amount">{props.amount}</div>
        <Icon className="dropper-group__icon" name="chevron" />
      </div>
    </button>
  )
}

export default Dropper
