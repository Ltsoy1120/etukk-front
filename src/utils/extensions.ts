export class Price {
  constructor(
    private value: number,
    public originLocale?: string,
    public originCurrency?: Intl.NumberFormatOptions["currency"]
  ) { }

  add(value: number): Price
  add(price: Price): Price
  add(arg1: number | Price): Price {
    if (typeof arg1 === "number") {
      return new Price(this.value + arg1)
    }

    return new Price(this.value + arg1.value)
  }

  multiply(by: number): Price {
    return new Price(this.value * by)
  }

  format() {
    return Price.format(this.value, this.originCurrency, this.originLocale)
  }

  static format(value: number, locale = "RU", currency: Intl.NumberFormatOptions["currency"] = "RUB"): string {
    try {
      return value.toLocaleString(locale, { style: "currency", currency, minimumFractionDigits: 0 })
    } catch (error) {
      if (process.env.NODE_ENV === "production") {
        if (error instanceof Error) {
          if (error.message.includes("tag") || error.message.includes("locale")) {
            return "Invalid language tag"
          }

          return "Invalid currency code"
        }
      }

      throw error
    }
  }

  valueOf(): number {
    return this.value
  }
}

export class PhoneNumber {
  public readonly phone: number
  public readonly length: number

  constructor(phone: number)
  constructor(phone: string)
  constructor(phone: number | string) {
    if (typeof phone === "number") {
      this.phone = phone
      this.length = String(phone).length
      return
    }

    const parsedPhoneString = phone.replace(/[^\d]/g, "")
    const parsedPhone = parseInt(parsedPhoneString) || 0

    this.phone = parsedPhone
    this.length = parsedPhoneString.length
  }

  format(template?: string): string {
    if (this.phone <= 0) return ""

    if (template) {
      // template = "+# (###) ### ##-##"

      const phone = [...String(this.phone)]
      // if (phone.length < (template.match(/#/g) || []).length) return String(this.phone)
      let formattedPhone = phone.reduce((result, next) => result.replace("#", next), template)
      if (formattedPhone.search("#") > -1) {
        formattedPhone = formattedPhone.slice(0, formattedPhone.search("#"))
      }
      return formattedPhone
    }

    const numberString = String(this.phone)
    let phoneNumberArray = []
    switch (numberString.length) {
      case 0: return ""
      // Skip some numbers
      case 1:
      case 2:
      case 3:
        return numberString
      case 4:
        phoneNumberArray = numberString.split(/^(\d{1})(\d{3})$/)
        break
      case 6:
        return numberString.match(/\d{2}/g)?.join(" ") ?? ""

      default:
        phoneNumberArray = numberString.split(/^(\d+?)(\d{3})?(\d{3})?(\d{2})?(\d{2})?$/)
        break
    }

    return "+" + phoneNumberArray.filter(Boolean).join(" ").trim()
  }

  valueOf(): number {
    return this.phone
  }
}

export default {}
