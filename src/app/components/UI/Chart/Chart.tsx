import "./Chart.scss"

import ChartBars from "./ChartBars"

interface ChartProps { }

function Chart(props: ChartProps) {
  return (
    <div className="chart">
      <ChartBars bars={[]} />
    </div>
  )
}

const data = {
  track: ["12:00", "12:30", "13:00"],
  entries: [
    {
      key: "Время",
      value: "11:30 - 12:00",
      at: "12:00"
    },
    {
      key: "Время",
      value: "11:30 - 12:00",
      at: "12:00"
    }
  ]
}

export default Chart
