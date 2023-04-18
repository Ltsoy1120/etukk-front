import "./Picker.scss"

import {
  Children,
  ComponentProps,
  Dispatch,
  ReactElement,
  useEffect,
  useState,
} from "react"
import {classWithModifiers} from "utils/common"

interface PickerProps<V> {
  name?: string
  width?: string
  defaultValue?: V
  onChange?: Dispatch<V>
  children: ReactElement<ComponentProps<"option"> & {value: V}>[]
}

function Picker<V>(props: PickerProps<V>) {
  const [options, setOptions] = useState(
    Children.map(props.children, child => child.props)
  )
  const [choice, setChoice] = useState<unknown>(props.defaultValue)
  useEffect(
    () => setOptions(Children.map(props.children, child => child.props)),
    [props.children]
  )
  function choose(index: number) {
    const value = options[index].value as unknown as V

    setChoice(value)
    props.onChange?.(value)
  }
  return (
    <div className="picker" role="list" aria-details="pick a value">
      {options?.map((option, index) => (
        <div
          className={classWithModifiers(
            "picker__entry",
            choice === option.value && "active"
          )}
          aria-selected={choice === index}
          role="option"
          onClick={() => choose(index)}
          key={index}>
          {option.children}
        </div>
      ))}
    </div>
  )
}

export default Picker
