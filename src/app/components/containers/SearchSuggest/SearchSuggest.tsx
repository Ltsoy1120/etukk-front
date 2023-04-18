import "./SearchSuggest.scss"

import DropDown from "app/components/UI/DropDown/DropDown"
import Search from "app/components/UI/Search/Search"
import useClickAway from "hooks/useClickAway"
import { ChangeEvent, ComponentProps, Dispatch, ReactElement, useRef, useState } from "react"

interface SearchSuggestProps {
  width?: string
  disabled?: boolean
  placeholder?: string
  children?: ReactElement<ComponentProps<"option">>[]

  onChange?: Dispatch<string>
  onSubmit?: Dispatch<string>
}

function SearchSuggest(props: SearchSuggestProps) {
  const parentRef = useRef<HTMLFormElement>(null)
  const [value, setValue] = useState("")
  const [expanded, setExpanded] = useState(false)
  function updateValue(value: string) {
    // if (value.length === 0) return

    props.onSubmit?.(value)
    setValue(value)
    setExpanded(false)
  }
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.currentTarget

    setValue(target.value)
    props.onChange?.(target.value)
  }
  useClickAway(parentRef, () => setExpanded(false))
  return (
    <form onSubmit={event => event.preventDefault()} className="search-suggest" style={{ "--search-width": props.width }} ref={parentRef}>
      <Search
        name="search"
        placeholder={props.placeholder}
        value={value}
        onFocus={() => setExpanded(true)}
        onChange={onChange}
        onSubmit={updateValue}
      />

      {props.children && (
        <DropDown expanded={expanded} onChange={updateValue}>{props.children}</DropDown>
      )}
    </form>
  )
}

export default SearchSuggest
