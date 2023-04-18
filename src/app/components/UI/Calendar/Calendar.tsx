import "./Calendar.scss"

import { useState } from "react"
import { classWithModifiers } from "utils/common"
import { getFirstWeekday, getLastDate, setDateMonth } from "utils/date.helpers"

import Selector from "../Selector/Selector"

interface CalendarProps { }

function Calendar(props: CalendarProps) {
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth())
  const [day, setDay] = useState(new Date().getDate())
  const date = new Date(year, month, day)
  return (
    <div className="calendar">
      <div className="calendar__header">
        <Selector defaultValue={month} onChange={setMonth}>
          {[...Array(12)].map((_, index) => (
            <option value={index} key={index}>{setDateMonth(date, index).toLocaleDateString("ru", { month: "long" })}</option>
          ))}
        </Selector>
        <Selector defaultValue={year} onChange={setYear}>
          {[...Array(200)].map((_, index) => (
            <option value={year + index - 100} key={-index}>{year + index - 100}</option>
          ))}
        </Selector>
      </div>
      <div className="calendar__grid">
        <div className="calendar__weekday">пн</div>
        <div className="calendar__weekday">вт</div>
        <div className="calendar__weekday">ср</div>
        <div className="calendar__weekday">чт</div>
        <div className="calendar__weekday">пт</div>
        <div className="calendar__weekday">сб</div>
        <div className="calendar__weekday">вс</div>
      </div>
      <div className="calendar__grid" style={{ "--week-day": getFirstWeekday(date) }}>
        {[...Array(getLastDate(date))].map((_, index) => (
          <div className={classWithModifiers("calendar__date", day === index + 1 && "active")} onClick={() => setDay(index + 1)} key={index}>{index + 1}</div>
        ))}
      </div>
    </div >
  )
}

export default Calendar
