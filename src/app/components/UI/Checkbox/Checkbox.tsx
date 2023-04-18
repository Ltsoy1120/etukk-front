import "./Checkbox.scss"

import _ from "lodash"
import {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from "react"

import Icon from "../Icon/Icon"

export interface CheckboxProps
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "onChange"
  > {
  onChange?(value: unknown, name?: string, checked?: boolean): void
}

function Checkbox(props: CheckboxProps) {
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    props.onChange?.(props.value, props.name, event.currentTarget.checked)
  }
  return (
    <label className="checkbox" style={props.style}>
      <input
        {..._.omit(props, "children", "style")}
        type="checkbox"
        className="checkbox__input"
        onChange={onChange}
      />
      <div className="checkbox__appearance">
        <Icon className="checkbox__icon" name="check" />
      </div>
      {props.children && (
        <div className="checkbox__label">{props.children}</div>
      )}
    </label>
  )
}

export default Checkbox
