import "./Filters.scss"

import {
  Filter,
  filterCategoryStorage,
  FilterInputs,
  FilterMobile,
  FilterPriceRange,
  FilterRadios,
  FiltersToolbox,
} from "app/components/containers/Filters/Filters"
import Button from "app/components/UI/Button/Button"
import Checkbox from "app/components/UI/Checkbox/Checkbox"
import CheckboxCategory from "app/components/UI/Checkbox/CheckboxCategory"
import CloseButton from "app/components/UI/CloseButton/CloseButton"
import Icon from "app/components/UI/Icon/Icon"
import Input from "app/components/UI/Input/Input"
import Radio from "app/components/UI/Radio/Radio"
import ToolTip from "app/components/UI/ToolTip/ToolTip"
import {filterStorage} from "app/views/home"
import {breakDownCategories} from "app/views/lot-new/edit/EditLotCategory"
import {LotDelivery} from "areas/lot/types"
import {isValidResponse} from "infrastructure/persistence/api/client"
import {
  getCategory,
  getCategoryByCategoryId,
} from "infrastructure/persistence/api/data/actions"
import {
  mapFiltersCategory,
  RecursiveTreeElement,
} from "infrastructure/persistence/api/mappings/lots"
import {Dispatch, useEffect, useState} from "react"
import {useClient} from "react-fetching-library"
import {classWithModifiers, inputValue} from "utils/common"

import QueryContainer from "../QueryContainer/QueryContainer"
import {FiltersState, FiltersType} from "./Filters.types"
import filtersContext from "./filtersContext"

interface FiltersContainerProps {
  pending?: boolean
  currentId?: number
  clear?: Dispatch<FiltersType>
  onSubmit: Dispatch<FiltersType>
}

function turnBigMinHeight(onOff: boolean) {
  const d = document.querySelector("#jj")
  if (!(d instanceof HTMLElement)) return

  if (onOff) {
    d.style.minHeight = "65em"
  } else {
    d.style.minHeight = "18em"
  }
}

function FiltersContainer(props: FiltersContainerProps) {
  const [state, setState] = useState<FiltersState>()
  const reducer = useState<FiltersType>(filterStorage.get("filters") || {})
  const [filters] = reducer
  const [currentCategoryId, setCurrentCategoryId] = useState<number>(
    filterCategoryStorage.get("filter-category") || 0
  )

  async function onSubmit() {
    const newFilters = {...filters, categories: currentCategoryId}
    await props.onSubmit?.(newFilters)
    setState(undefined)
  }
  useEffect(() => {
    if (props.currentId) {
      setCurrentCategoryId(props.currentId)
    }
  }, [props.currentId])

  useEffect(() => {
    if (state === "expanded") {
      turnBigMinHeight(true)
    }
  }, [state])
  return (
    <filtersContext.Provider value={reducer}>
      <div
        className={classWithModifiers("filters", state)}
        onAnimationEnd={() => turnBigMinHeight(false)}>
        <button
          className="filters__toggle"
          type="button"
          onClick={() => setState(state && undefined)}>
          <Icon name="filter" />
          <ToolTip>Развернуть фильтр</ToolTip>
        </button>
        <div className="filters__inner">
          <div className="filters__header">
            <div className="filters__title">Фильтр</div>
            <FiltersToolbox
              state={state}
              onChange={setState}
              clear={props.clear}
              currentCategoryId={currentCategoryId}
              onChangeCategory={setCurrentCategoryId}
              onSubmit={props.onSubmit}
            />
          </div>
          <div className="filters__container">
            <FiltersTreeContainer
              currentCategoryId={currentCategoryId}
              onChange={setCurrentCategoryId}
              onSubmit={props.onSubmit}
            />
          </div>
          <Button
            className="filters__submit"
            pending={props.pending}
            await
            onClick={onSubmit}>
            Применить
          </Button>
        </div>
      </div>
    </filtersContext.Provider>
  )
}
type Category = {
  id: number
  name: string
  parent_category_id?: number | null
}
export function FiltersContainerMobile(props: FiltersContainerProps) {
  const client = useClient()
  const [state, setState] = useState<FiltersState>()
  const reducer = useState<FiltersType>({})
  const [filters, setFilters] = reducer
  const [parentCategory, setParentCategory] = useState<Category | null>()
  const [currentCategory, setCurrentCategory] = useState<Category | null>()
  const [categories, setCategories] = useState<Category[]>()

  useEffect(() => {
    async function getCategories() {
      const response = await client.query(getCategory())
      if (!isValidResponse(response)) return
      const {options} = breakDownCategories(
        response.payload,
        currentCategory?.id
      )
      setCategories(options)
      if (options[0].parent_category_id) {
        const {payload} = await client.query(
          getCategoryByCategoryId(options[0].parent_category_id)
        )
        setParentCategory(payload)
      }
    }
    getCategories()
  }, [currentCategory])

  async function onSubmit() {
    await props.onSubmit?.(filters)
    setState(undefined)
  }

  function chooseCategory(category: Category) {
    setCurrentCategory(category)
    const nextFilters = {...filters, categories: category.id.toString()}
    setFilters(nextFilters)
    props.onSubmit?.(nextFilters)
  }

  async function goToUp(category: Category) {
    if (category.parent_category_id) {
      const {payload} = await client.query(
        getCategoryByCategoryId(category.parent_category_id)
      )
      setCurrentCategory(payload)
      const nextFilters = {...filters, categories: payload?.id.toString()}
      setFilters(nextFilters)
      props.onSubmit?.(nextFilters)
    } else {
      setCurrentCategory(null)
      setParentCategory(null)
      setFilters({})
      props.onSubmit?.({})
    }
  }

  function clear() {
    props.clear?.({})
    setFilters({})
  }

  return (
    <filtersContext.Provider value={reducer}>
      <div className={classWithModifiers("mobile-filters", state)}>
        {parentCategory && (
          <div
            className="mobile-filters__container"
            onClick={() => goToUp(parentCategory)}>
            <p className="filters__title">{parentCategory.name}</p>
            <CloseButton />
          </div>
        )}
        <div className="mobile-filters__container">
          <button
            className="mobile-filters__toggle"
            type="button"
            onClick={() => setState("expanded")}>
            <Icon name="filter" />
            <ToolTip>Развернуть фильтр</ToolTip>
          </button>
          <div className="mobile-filters__categories">
            {categories &&
              categories?.map(category => (
                <Button
                  color={
                    category.id === currentCategory?.id ? undefined : "gray"
                  }
                  small
                  outline
                  onClick={() => chooseCategory(category)}
                  key={category.id}>
                  {category.name}
                </Button>
              ))}
          </div>
        </div>
        <div className="mobile-filters__window">
          <button
            className="mobile-filters__close"
            type="button"
            onClick={() => setState(undefined)}>
            <Icon name="cross" />
          </button>
          <div className="mobile-filters__header">
            <div className="mobile-filters__title">Фильтр</div>
            <button
              className={classWithModifiers(
                "mobile-filters__clear",
                Object.keys(filters).length >= 1 && "active"
              )}
              type="button"
              onClick={clear}>
              Сбросить фильтр
            </button>
          </div>
          <div className="mobile-filters__tree">
            <FiltersTreeContainer isMobile />
          </div>
          <Button
            className="filters__submit"
            pending={props.pending}
            await
            onClick={onSubmit}>
            Применить
          </Button>
        </div>
      </div>
    </filtersContext.Provider>
  )
}

interface FiltersTreeContainerProps {
  currentCategoryId?: number | null
  onChange?: Dispatch<number>
  onSubmit?: Dispatch<FiltersType>
  isMobile?: boolean
}
function FiltersTreeContainer(props: FiltersTreeContainerProps) {
  const dateNow = new Date(new Date().setUTCHours(0)).toISOString().slice(0, 16)
  const [tradeStart, setTradeStart] = useState(dateNow)
  if (props.isMobile) {
    return (
      <>
        <FilterMobile group label="КАТЕГОРИИ">
          <QueryContainer action={getCategory()} mapping={mapFiltersCategory}>
            {payload => (
              <FilterRecursion name="categories" elements={payload} isMobile />
            )}
          </QueryContainer>
        </FilterMobile>
        <FilterMobile label="СТАТУС ТОРГОВ">
          <FilterRadios name="started">
            <Radio value="started">Торги начаты</Radio>
            {/* <Radio value="ended">Торги окончены</Radio> */}
            <Radio value="waiting">Торги ожидают начала</Radio>
          </FilterRadios>
        </FilterMobile>
        <FilterMobile label="СТОИМОСТЬ ЛОТА">
          <FilterPriceRange name="price" defaultValue={[0, 0]} />
        </FilterMobile>
        <FilterMobile label="ПРОДАВЕЦ">
          <FilterRadios name="seller">
            <Radio value="user">Частное лицо</Radio>
            <Radio value="organization">Юридическое лицо</Radio>
          </FilterRadios>
        </FilterMobile>
        <FilterMobile label="ДОСТАВКА">
          <FilterRadios name="delivery">
            <Radio value={LotDelivery.all}>В другие регионы</Radio>
            <Radio value={LotDelivery.local}>Только по городу продажи</Radio>
          </FilterRadios>
        </FilterMobile>
        <FilterMobile label="ПЕРИОД ПРОВЕДЕНИЯ">
          <FilterInputs>
            <Input
              name="tradeStart"
              type="datetime-local"
              min={dateNow}
              max="9999-06-14T00:00"
              onChange={inputValue(setTradeStart)}>
              Если необходимо, уточните период начала торгов
            </Input>
            <Input
              name="tradeEnd"
              type="datetime-local"
              min={tradeStart}
              max="9999-06-14T00:00">
              Если необходимо, уточните период окончания торгов FilterMobile
            </Input>
          </FilterInputs>
        </FilterMobile>
      </>
    )
  }

  return (
    <>
      <Filter group label="КАТЕГОРИИ">
        <QueryContainer action={getCategory()} mapping={mapFiltersCategory}>
          {payload => (
            <FilterRecursion
              name="categories"
              elements={payload}
              currentCategoryId={props.currentCategoryId}
              onChange={props.onChange}
              onSubmit={props.onSubmit}
            />
          )}
        </QueryContainer>
      </Filter>
      <Filter label="СТАТУС ТОРГОВ">
        <FilterRadios name="started">
          <Radio value="started">Торги начаты</Radio>
          {/* <Radio value="ended">Торги окончены</Radio> */}
          <Radio value="waiting">Торги ожидают начала</Radio>
        </FilterRadios>
      </Filter>
      <Filter label="СТОИМОСТЬ ЛОТА">
        <FilterPriceRange name="price" defaultValue={[0, 0]} />
      </Filter>
      <Filter label="ПРОДАВЕЦ">
        <FilterRadios name="seller">
          <Radio value="user">Частное лицо</Radio>
          <Radio value="organization">Юридическое лицо</Radio>
        </FilterRadios>
      </Filter>
      <Filter label="ДОСТАВКА">
        <FilterRadios name="delivery">
          <Radio value={LotDelivery.all}>В другие регионы</Radio>
          <Radio value={LotDelivery.local}>Только по городу продажи</Radio>
        </FilterRadios>
      </Filter>
      <Filter label="ПЕРИОД ПРОВЕДЕНИЯ">
        <FilterInputs>
          <Input
            name="tradeStart"
            type="datetime-local"
            min={dateNow}
            max="9999-06-14T00:00"
            onChange={inputValue(setTradeStart)}>
            Если необходимо, уточните период начала торгов
          </Input>
          <Input
            name="tradeEnd"
            type="datetime-local"
            min={tradeStart}
            max="9999-06-14T00:00">
            Если необходимо, уточните период окончания торгов
          </Input>
        </FilterInputs>
      </Filter>
    </>
  )
}

interface FilterRecursionProps {
  name: string
  currentCategoryId?: number | null
  elements: RecursiveTreeElement[]
  onChange?: Dispatch<number>
  onSubmit?: Dispatch<FiltersType>
  isMobile?: boolean
}

function FilterRecursion(props: FilterRecursionProps) {
  if (props.elements.length === 0) return null

  if (props.isMobile) {
    return (
      <>
        {props.elements.map(element => (
          <FilterMobile
            id={element.id}
            name={element.name}
            label={element.name}
            key={element.id}>
            <FilterRecursion
              name={props.name}
              elements={element.children.filter(
                child => child.children.length > 0
              )}
            />
            <div className="filter__inputs">
              <FilterRadios name={props.name} removeAll>
                {element.children
                  .filter(child => child.children.length === 0)
                  .map(child => (
                    <Checkbox
                      name={props.name}
                      value={child.id.toString()}
                      key={child.id}>
                      {child.name}
                    </Checkbox>
                  ))}
              </FilterRadios>
            </div>
          </FilterMobile>
        ))}
      </>
    )
  }

  return (
    <>
      {props.elements.map(element => (
        <Filter
          id={element.id}
          name={element.name}
          label={element.name}
          key={element.id}
          onChange={props.onChange}
          onSubmit={props.onSubmit}>
          <FilterRecursion
            name={props.name}
            elements={element.children.filter(
              child => child.children.length > 0
            )}
            currentCategoryId={props.currentCategoryId}
            onChange={props.onChange}
            onSubmit={props.onSubmit}
          />
          <div className="filter__inputs">
            {element.children
              .filter(child => child.children.length === 0)
              .map(child => (
                <CheckboxCategory
                  name={props.name}
                  child={child}
                  currentCategoryId={props.currentCategoryId}
                  key={child.id}
                  onChange={props.onChange}
                  onSubmit={props.onSubmit}
                />
              ))}
          </div>
        </Filter>
      ))}
    </>
  )
}
export default FiltersContainer
