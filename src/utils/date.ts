import _ from "lodash"

export function humanizeDate(date: Date, lang = "ru") {
  const localeString = date.toLocaleString(lang, {
    timeStyle: "short",
    dateStyle: "short",
  })
  return localeString.replace(", ", " в ").replace(".20", ".")
}

/**
 *
 * @returns Пн 13.06.22
 */
export function humanizeDate2(date: Date, lang = "ru") {
  const localeString = date.toLocaleString(lang, {
    weekday: "short",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  })
  return _.capitalize(localeString.replace(" г.", "").replace(",", ""))
}

export function humanizeDate3(date: Date, lang = "ru") {
  const localeString = date.toLocaleString(lang, {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  })
  return _.capitalize(localeString.replace(" г.", "").replace(",", ""))
}

export class DateInterval {
  public date1: Date
  public date2: Date

  constructor(
    date1?: string | number | Date | null,
    date2?: string | number | Date | null
  ) {
    if (date1 == null) {
      date1 = new Date()

      if (process.env.NODE_ENV !== "production") {
        console.warn("`date1` was null, replaced with `new Date`")
      }
    }

    if (date2 == null) {
      date2 = new Date()

      if (process.env.NODE_ENV !== "production") {
        console.warn("`date2` was null, replaced with `new Date`")
      }
    }

    this.date1 = new Date(date1)
    this.date2 = new Date(date2)
  }

  get difference(): Date {
    return new Date(
      this.date1.getUTCMilliseconds() - this.date2.getUTCMilliseconds()
    )
  }

  get humanizedDate1(): string {
    return humanizeDate(this.date1)
  }

  get humanizedDate2(): string {
    return humanizeDate(this.date2)
  }

  humanize(): string {
    return `с ${humanizeDate(this.date1)} по ${humanizeDate(this.date2)}`
  }

  isInInterval(dateOther: Date): boolean {
    if (dateOther.getTime() < this.date1.getTime()) {
      return false
    }

    if (dateOther.getTime() > this.date2.getTime()) {
      return false
    }

    return true
  }
}
