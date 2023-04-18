import "./ChartBars.scss"

import { Dispatch } from "react"
import { classWithModifiers } from "utils/common"

import { ChartBarType } from "./Chart.types"

interface ChartBarsProps {
  bars: ChartBarType[]
  activeBar?: number

  onClick?: Dispatch<ChartBarType>
  onPointerEnter?: Dispatch<ChartBarType>
}

function ChartBars(props: ChartBarsProps) {
  const max = Math.max(...props.bars.map(bar => bar.value))
  const percentages = props.bars.map(bar => bar.value / max)
  return (
    <div className="chart-bars">
      <div className="chart-bars__bars">
        {percentages.map((percentage, index) => (
          <div
            className={classWithModifiers("chart-bars__bar", props.activeBar === index && "active")}
            style={{ "--bar-percent-height": percentage }}
            onClick={() => props.onClick?.(props.bars[index])}
            onPointerEnter={() => props.onPointerEnter?.(props.bars[index])}
            key={index}
          />
        ))}
      </div>
      <div className="chart-bars__labels">
        {props.bars.map((bar, index) => (
          <div className="chart-bars__label" key={index}>{bar.label}</div>
        ))}
      </div>
    </div>
  )
}

export default ChartBars
