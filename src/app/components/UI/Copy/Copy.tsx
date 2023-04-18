import "./Copy.scss"

import Icon from "../Icon/Icon"

interface CopyProps {
  value: string
  link: string
}

function Copy(props: CopyProps) {
  function onCopy() {
    if (navigator.clipboard == null) return
    navigator.clipboard.writeText(props.link)
  }
  return (
    <button className="copy" type="button" onClick={onCopy}>
      <div className="copy__text">{props.value}</div>
      <Icon className="copy__icon" name="copy" />
    </button>
  )
}

export default Copy
