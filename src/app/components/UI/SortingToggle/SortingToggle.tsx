import "./SortingToggle.scss"

import DialogLayout from "app/layouts/Modal/DialogLayout/DialogLayout"
import { Children, Dispatch, ReactElement, ReactNode, useState } from "react"
import { useModalContext } from "react-modal-global"
import { Modal } from "react-modal-global"

import Button from "../Button/Button"
import Icon from "../Icon/Icon"
import Selector from "../Selector/Selector"

type SortValueType = string | undefined
interface SortingToggleProps<V> {
  children: ReactElement<{ value: V, children: ReactNode }>[]
  onChange?: Dispatch<V>
}

function SortingToggle<V extends string>(props: SortingToggleProps<V>) {
  const [current, setCurrent] = useState("all")
  function onApply(value: SortValueType) {
    if (value == null) value = "all"

    props.onChange?.(value as never)
    setCurrent(value)
  }
  const options = Children.map(props.children, child => child.props)
  return (
    <button className="sorting-toggle" type="button" onClick={() => Modal.open(DialogApplyFilters, { children: props.children, onApply, weak: true })}>
      <div className="sorting-toggle__text">{options.find(option => option.value === current)?.children || "Выберите фильтр"}</div>
      <Icon className="sorting-toggle__icon" name="sort" />
    </button>
  )
}


interface DialogApplyFiltersProps {
  children: ReactElement<{ value: string, children: ReactNode }>[]
  onApply?: Dispatch<SortValueType>
}

function DialogApplyFilters(props: DialogApplyFiltersProps) {
  const { close } = useModalContext()
  const [value, setValue] = useState<SortValueType>()
  function onApply() {
    props.onApply?.(value)
    close()
  }
  return (
    <DialogLayout centered>
      <h3>Применить сортировку</h3>
      <Selector width="17em" onChange={setValue}>{props.children}</Selector>
      <Button outline onClick={onApply}>Применить</Button>
    </DialogLayout>
  )
}

export default SortingToggle
