import "./CounterIcon.scss"

import Icon, { IconName } from "../Icon/Icon"

interface CounterIconProps {
  icon: IconName
  count: number
}

function CounterIcon(props: CounterIconProps) {
  return (
    <div className="counter-icon">
      <Icon className="counter-icon__icon" name={props.icon} />
      <span className="counter-icon__count">{props.count}</span>
    </div>
  )
}

export default CounterIcon
