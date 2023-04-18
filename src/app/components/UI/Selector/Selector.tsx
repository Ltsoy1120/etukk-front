import "./Selector.scss"

import useClickAway from "hooks/useClickAway"
import useDeviceWidth from "hooks/useDeviceWidth"
import {DeviceWidths} from "hooks/useResizeObserverEntry"
import {
  Children,
  ComponentProps,
  Dispatch,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react"
import {Modal} from "react-modal-global"
import {classWithModifiers} from "utils/common"

import DropDown from "../DropDown/DropDown"
import DropDownDialog from "../DropDown/DropDownDialog"
import Icon from "../Icon/Icon"

interface SelectorProps<V> {
  name?: string
  width?: string
  defaultValue?: V
  onChange?: Dispatch<V>
  children:
    | ReactElement<ComponentProps<"option"> & {value: V}>
    | ReactElement<ComponentProps<"option"> & {value: V}>[]
  label?: ReactNode
}

function Selector<V = string | undefined>(props: SelectorProps<V>) {
  const options = Children.map(props.children, child => child.props)

  const parentRef = useRef<HTMLDivElement>(null)
  const [children, setChildren] = useState<ReactNode>(
    (props.defaultValue &&
      options.find(option => option.value === props.defaultValue)?.children) ||
      null
  )
  const [expanded, setExpanded] = useState(false)
  function onChange(value: V, children: ReactNode) {
    props.onChange?.(value)
    setChildren(children)
    setExpanded(false)
  }
  useClickAway(parentRef, () => setExpanded(false))

  const [isMobile] = useDeviceWidth(DeviceWidths.Mobile)

  useEffect(() => {
    if (!isMobile) return
    if (!expanded) return

    const modal = Modal.open(DropDownDialog, {
      name: props.name,
      default: props.defaultValue,
      expanded,
      onChange,
      children: props.children,

      fork: true,
    })

    return () => {
      modal.window.close()
    }
  }, [isMobile, expanded])

  return (
    <div
      className="selector"
      style={{"--selector-width": props.width}}
      ref={parentRef}>
      {props.label && <div className="selector__label">{props.label}</div>}
      <button
        className="selector__appearance"
        type="button"
        onClick={() => setExpanded(!expanded)}>
        <div
          className={classWithModifiers(
            "selector__current",
            !children && "empty"
          )}>
          {children || "Выбрать из списка..."}
        </div>
        <Icon
          className={classWithModifiers("selector__icon", expanded && "up")}
          name="chevron"
        />
      </button>
      {/* {!isMobile && ( */}
      <DropDown
        name={props.name}
        default={props.defaultValue}
        expanded={expanded}
        onChange={onChange}>
        {props.children}
      </DropDown>
      {/* )} */}
    </div>
  )
}

export default Selector
