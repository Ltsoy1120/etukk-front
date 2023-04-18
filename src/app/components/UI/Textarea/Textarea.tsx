import "./Textarea.scss"

import _ from "lodash"
import {DetailedHTMLProps, TextareaHTMLAttributes} from "react"
import {classMerge} from "utils/common"

interface TextareaProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  width?: string
}

function Textarea(props: TextareaProps) {
  return (
    <label className="textarea" style={{"--textarea-width": props.width}}>
      {props.children && (
        <div className="textarea__label">{props.children}</div>
      )}
      <textarea
        {..._.omit(props, "children")}
        className={classMerge("textarea__appearance", props.className)}
      />
    </label>
  )
}

export default Textarea
