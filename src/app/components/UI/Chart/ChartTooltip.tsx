import "./Chart.scss"

import { ChartEntryType } from "./Chart.types"

interface ChartTooltipProps {
  entries: Pick<ChartEntryType, "key" | "value">[]
}

function ChartTooltip(props: ChartTooltipProps) {
  return (
    <div className="chart-tooltip">
      {props.entries.map((entry, index) => (
        <div className="chart-tooltip__entry" key={index}>
          <span>{entry.key}</span>
          <span>{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

export default ChartTooltip
