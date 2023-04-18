import "./Search.scss"

import _ from "lodash"
import { DetailedHTMLProps, Dispatch, InputHTMLAttributes, useRef } from "react"

import Icon from "../Icon/Icon"

interface SearchProps extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "onSubmit"> {
  value?: string
  defaultValue?: string
  onSubmit?: Dispatch<string>
}

function Search(props: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <label className="search">
      <input {..._.omit(props, "onSubmit")} autoComplete="off" className="search__input" ref={inputRef} />
      <button className="search__icon search__icon--close" type="button" onClick={() => props.onSubmit?.("")}>
        <Icon name="cross" />
      </button>
      <button className="search__icon" type="submit" onClick={() => props.onSubmit?.(inputRef.current?.value || "")}>
        <Icon name="search" />
      </button>
    </label>
  )
}

export default Search
