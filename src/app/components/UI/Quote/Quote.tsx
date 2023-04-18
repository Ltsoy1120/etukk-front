import "./Quote.scss"

import { ReactNode } from "react"

import Icon from "../Icon/Icon"

interface QuoteProps {
  author: ReactNode
  children: ReactNode
}

function Quote(props: QuoteProps) {
  return (
    <div className="quote">
      <Icon className="quote__icon" name="hammer" />
      <div className="quote__container">
        <div className="quote__content">{props.children}</div>
        <div className="quote__author">{props.author}</div>
      </div>
    </div>
  )
}

export default Quote
