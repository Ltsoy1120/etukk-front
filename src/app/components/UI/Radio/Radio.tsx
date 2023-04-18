import "./Radio.scss"

import _ from "lodash"
import { ReactNode } from "react"

export interface RadioProps<V = unknown> {
  name?: string
  value: V
  checked?: boolean
  defaultChecked?: boolean
  onChange?(value: V, name?: string): void

  children?: ReactNode
}

function Radio<V>(props: RadioProps<V>) {
  function onChange() {
    props.onChange?.(props.value, props.name)
  }
  return (
    <label className="radio">
      <input {..._.omit(props, "children", "value")} type="radio" className="radio__input" onChange={onChange} />
      <div className="radio__appearance" />
      {props.children && (
        <div className="radio__label">{props.children}</div>
      )}
    </label>
  )
}

export default Radio
