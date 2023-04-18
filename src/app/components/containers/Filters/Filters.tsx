import "./Filters.scss"

import Checkbox, {CheckboxProps} from "app/components/UI/Checkbox/Checkbox"
import Icon from "app/components/UI/Icon/Icon"
import Input, {InputProps} from "app/components/UI/Input/Input"
import Radio, {RadioProps} from "app/components/UI/Radio/Radio"
import ToolTip from "app/components/UI/ToolTip/ToolTip"
import {Row} from "app/layouts/BaseLayouts/BaseLayouts"
import {CategoryState, filterStorage} from "app/views/home"
import TemporaryStorage from "infrastructure/persistence/TemporaryStorage"
import _ from "lodash"
import {
  ChangeEvent,
  Children,
  cloneElement,
  Dispatch,
  FormEvent,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import {Navigate, NavLink, useNavigate} from "react-router-dom"
import {classWithModifiers} from "utils/common"

import {ReactError} from "../ErrorBoundary/ErrorBoundary.errors"
import {FilterKey, FiltersState, FiltersType} from "./Filters.types"
import filtersContext from "./filtersContext"

interface FilterProps {
  name?: string
  id?: number
  group?: boolean
  label: ReactNode
  children?: ReactNode
  onChange?: Dispatch<number>
  onSubmit?: Dispatch<FiltersType>
}
export const filterCategoryStorage = new TemporaryStorage("filter-category")

export function Filter(props: FilterProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(false)

  const [currentCategoryId, setCurrentCategoryId] =
    filterCategoryStorage.state<number>("filter-category", 0)

  const chooseCategory = (id: any) => {
    setCurrentCategoryId(id)
    props.onChange && props.onChange(id)
    props.onSubmit && props.onSubmit({categories: id})
  }

  return (
    <div
      className={classWithModifiers(
        "filter",
        props.group && "group",
        currentCategoryId &&
          props.id &&
          currentCategoryId === props.id &&
          "choosed"
      )}
      aria-label="filter"
      aria-details="toggle filter">
      <div className="filter__header">
        <div
          className={classWithModifiers(
            "filter__title",
            currentCategoryId &&
              props.id &&
              currentCategoryId === props.id &&
              "choosed"
          )}
          onClick={() => chooseCategory(props.id)}>
          {props.label}
        </div>
        <Icon
          className={classWithModifiers(
            "filter__icon",
            expanded && (props.group ? "rotate" : "up")
          )}
          name={props.group ? "plus" : "chevron"}
          onClick={() => setExpanded(!expanded)}
        />
      </div>
      <div
        className={classWithModifiers(
          "filter__container",
          expanded && "expanded",
          currentCategoryId &&
            props.id &&
            currentCategoryId === props.id &&
            "choosed"
        )}
        ref={containerRef}
        role="group"
        aria-expanded={expanded}>
        <div
          className={classWithModifiers(
            "filter__inner",
            props.group && "group"
          )}>
          {props.children}
        </div>
      </div>
    </div>
  )
}

interface FilterMobileProps {
  name?: string
  id?: number
  group?: boolean
  label: ReactNode
  children: ReactNode
}

export function FilterMobile(props: FilterMobileProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={classWithModifiers("filter", props.group && "group")}
      aria-label="filter"
      aria-details="toggle filter">
      <div className="filter__header" onClick={() => setExpanded(!expanded)}>
        <div className="filter__title">{props.label}</div>
        <Icon
          className={classWithModifiers(
            "filter__icon",
            expanded && (props.group ? "rotate" : "up")
          )}
          name={props.group ? "plus" : "chevron"}
        />
      </div>
      <div
        className={classWithModifiers(
          "filter__container",
          expanded && "expanded"
        )}
        ref={containerRef}
        role="group"
        aria-expanded={expanded}>
        <div
          className={classWithModifiers(
            "filter__inner",
            props.group && "group"
          )}>
          {props.children}
        </div>
      </div>
    </div>
  )
}

interface FiltersToolboxProps {
  state: FiltersState
  currentCategoryId?: number
  clear?: Dispatch<FiltersType>
  onChange: Dispatch<FiltersState>
  onChangeCategory: Dispatch<number>
  onSubmit: Dispatch<FiltersType>
}

export function FiltersToolbox(props: FiltersToolboxProps) {
  const [filters, setFilters] = useContext(filtersContext)
  const navigate = useNavigate()
  function clear() {
    setFilters({})
    props.clear?.({})
    props.onChangeCategory(0)
    props.onSubmit({})
    filterCategoryStorage.clear()
    filterStorage.clear()
    navigate("/")
  }
  const onExpand = () =>
    props.onChange(props.state === "expanded" ? undefined : "expanded")
  const onShrink = () => props.onChange("shrunken")

  return (
    <div className="filters-toolbox" role="toolbar">
      <button
        className="filters-toolbox__reset"
        disabled={
          Object.keys(filters).length === 0 && props.currentCategoryId === 0
        }
        type="reset"
        onClick={clear}>
        Сбросить
      </button>
      <button
        className="filters-toolbox__tool filters-toolbox__tool--expand"
        type="button"
        onClick={onExpand}>
        <Icon
          name={props.state === "expanded" ? "rectangle" : "rectangle-double"}
        />
        <ToolTip>
          {props.state === "expanded"
            ? "Вернуть как было"
            : "Развернуть фильтр на весь экран"}
        </ToolTip>
      </button>
      <button
        className="filters-toolbox__tool"
        type="button"
        onClick={onShrink}>
        <Icon name="line" />
        <ToolTip>Свернуть фильтр</ToolTip>
      </button>
    </div>
  )
}

// interface FiltersProviderProps {
//   children: ReactNode
//   onChange: Dispatch<FiltersType>
// }

// function FiltersProvider(props: FiltersProviderProps) {
//   const reducer = useState<FiltersType>({})
//   useEffect(() => props.onChange(reducer[0]), [props.onChange, reducer[0]])
//   return (
//     <filtersContext.Provider value={reducer}>{props.children}</filtersContext.Provider>
//   )
// }

// export default FiltersProvider

interface FilterCheckboxesProps {
  name: FilterKey
  children: ReactElement<CheckboxProps>[]
}

export function FilterCheckboxes(props: FilterCheckboxesProps) {
  const [filters, setFilters] = useContext(filtersContext)
  const filterValue = (filters[props.name] || []) as string[]
  if (!(filterValue instanceof Array)) {
    throw new ReactError(
      FilterCheckboxes,
      `Got bad value. You probably used "${props.name}" somewhere else.`
    )
  }
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.currentTarget
    if (target.checked === false) {
      return setFilters({
        ...filters,
        [props.name]: filterValue.filter(chunk => chunk !== target.name),
      })
    }
    setFilters({
      ...filters,
      [props.name]: [...new Set([...filterValue, target.name])],
    })
  }
  function reset() {
    setFilters(_.omit(filters, props.name))
  }
  return (
    <>
      {/* <Checkbox onChange={reset} checked={filterValue.length === 0}>Все</Checkbox> */}
      {Children.map(props.children, child =>
        cloneElement<CheckboxProps>(child, {
          ...child.props,
          checked: filterValue.includes(child.props.name || ""),
          onChange,
        })
      )}
    </>
  )
}

interface FilterRadiosProps {
  name: FilterKey
  children: ReactElement<RadioProps>[]

  removeAll?: boolean
}

export function FilterRadios(props: FilterRadiosProps) {
  const [filters, setFilters] = useContext(filtersContext)

  const filterValue = filters[props.name]

  function onChange(value: unknown) {
    setFilters({...filters, [props.name]: value})
  }
  function reset() {
    setFilters(_.omit(filters, props.name))
  }
  return (
    <>
      {!props.removeAll && (
        <Radio value="all" onChange={reset} checked={filterValue == null}>
          Все
        </Radio>
      )}
      {Children.map(props.children, child =>
        cloneElement<RadioProps>(child, {
          ...child.props,
          checked: filterValue === child.props.value,
          onChange,
        })
      )}
    </>
  )
}

interface FilterInputsProps {
  children: ReactElement<InputProps> | ReactElement<InputProps>[]
}

export function FilterInputs(props: FilterInputsProps) {
  const [filters, setFilters] = useContext(filtersContext)
  function onChange(
    event: ChangeEvent<HTMLInputElement> | FormEvent<HTMLInputElement>
  ) {
    const target = event.currentTarget

    setFilters({...filters, [target.name]: event.currentTarget.value})
  }
  return (
    <>
      {Children.map(props.children, child =>
        cloneElement<InputProps>(child, {
          ...child.props,
          onChange: event => (child.props.onChange?.(event), onChange(event)),
          value: String(filters[child.props?.name ?? ""] ?? ""),
        })
      )}
    </>
  )
}

interface FilterPriceRangeProps {
  name: FilterKey
  defaultValue?: [number, number] // [min, max]
}

export function FilterPriceRange(props: FilterPriceRangeProps) {
  const [filters, setFilters] = useContext(filtersContext)
  const [min, max] = (filters[props.name] ||
    props.defaultValue ||
    []) as number[]
  function setMin(value: number) {
    // if (value > max) value = min
    setFilters({...filters, [props.name]: [value, max]})
  }
  function setMax(value: number) {
    // if (value < min) value = max
    setFilters({...filters, [props.name]: [min, value]})
  }
  function onChangeFactory(factory: Dispatch<number>) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const target = event.currentTarget
      factory(Number(target.value))
    }
  }
  return (
    <Row>
      <Input
        type="number"
        placeholder="от"
        iconName="rub"
        value={min || ""}
        onChange={onChangeFactory(setMin)}
      />
      <Input
        type="number"
        placeholder="до"
        iconName="rub"
        value={max || ""}
        onChange={onChangeFactory(setMax)}
      />
    </Row>
  )
}

interface FilterDateRangeProps {
  name: FilterKey
  children: ReactElement<InputProps> | ReactElement<InputProps>[]
}

export function FilterDateRange(props: FilterDateRangeProps) {
  const [filters, setFilters] = useContext(filtersContext)
  const [min, max] = (filters[props.name] || []) as string[]
  // // const filterValue = filters[props.name]
  // function onChange(event: ChangeEvent<HTMLInputElement>) {
  //   setFilters({ ...filters, [props.name]: event.currentTarget.value })
  // }

  function setStart(value: number) {
    // if (value > max) value = min
    setFilters({...filters, [props.name]: [value, max]})
  }
  function setEnd(value: number) {
    // if (value < min) value = max
    setFilters({...filters, [props.name]: [min, value]})
  }
  function onChangeFactory(factory: Dispatch<number>) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const target = event.currentTarget
      factory(Number(target.value))
    }
  }
  return (
    <>
      <Row>
        <Input
          type="datetime-local"
          placeholder="Период от"
          onChange={onChangeFactory(setStart)}
        />
        <Input
          type="datetime-local"
          placeholder="Период до"
          onChange={onChangeFactory(setEnd)}
        />
      </Row>
    </>
  )
}
