import {filterCategoryStorage} from "app/components/containers/Filters/Filters"
import FiltersContainer, {
  FiltersContainerMobile,
} from "app/components/containers/Filters/FiltersContainer"
import {QueryErrorCoverBoundary} from "app/components/containers/QueryErrorCoverBoundary/QueryErrorCoverBoundary"
import SearchSuggest from "app/components/containers/SearchSuggest/SearchSuggest"
import Switcher from "app/components/UI/Switcher/Switcher"
import Container from "app/layouts/Container/Container"
import useDeviceWidth from "hooks/useDeviceWidth"
import {DeviceWidths} from "hooks/useResizeObserverEntry"
import {getSearch} from "infrastructure/persistence/api/data/actions"
import TemporaryStorage from "infrastructure/persistence/TemporaryStorage"
import {useEffect, useState} from "react"
import {useQuery} from "react-fetching-library"
import {Helmet} from "react-helmet"
// import { useMatch } from "react-router"
import {Route, Routes} from "react-router"
import {NavLink, useLocation, useParams} from "react-router-dom"

import LotPreviewsContainer from "./LotPreviewsContainer"

export const filterStorage = new TemporaryStorage("filters")
export type CategoryState = {categories: number}

function HomeView() {
  // const matchHot = useMatch("hot")
  const categoryId = useParams().categoryId
  const [search, setSearch] = useState("")
  const [filterSearch, setFilterSearch] = useState("")
  const [filtersStorage, setFiltersStorage] = filterStorage.state<any>(
    "filters",
    {}
  )
  const [filters, setFilters] = useState<any>(filtersStorage || {})

  // const isHot = !!matchHot
  const [isMobile] = useDeviceWidth(DeviceWidths.Mobile)

  useEffect(() => {
    if (categoryId) {
      setFilters({categories: Number(categoryId)})
      setFiltersStorage({categories: Number(categoryId)})
      filterCategoryStorage.set("filter-category", Number(categoryId))
    }
  }, [categoryId])

  useEffect(() => {
    setFiltersStorage({...filters})
  }, [filters])

  const response = useQuery(getSearch(search || "!@#*("))
  const options = response.payload || []
  return (
    <>
      <Helmet>
        <title>Главная | etukk.ru</title>
      </Helmet>
      <SearchSuggest
        width="65%"
        placeholder="Поиск по Москве..."
        onChange={setSearch}
        onSubmit={setFilterSearch}>
        {options &&
          options.map((option, index) => (
            <option value={option.name || "unknown"} key={index}>
              {option.name || "unknown"}
            </option>
          ))}
      </SearchSuggest>
      {isMobile && (
        <FiltersContainerMobile
          clear={setFiltersStorage}
          onSubmit={setFilters}
        />
      )}
      <Switcher>
        <NavLink to="/">Все торги</NavLink>
        <NavLink to="/hot">Горячие торги</NavLink>
      </Switcher>
      <Routes>
        <Route
          index
          element={
            <div id="jj" style={{minHeight: "18em"}}>
              <Container row>
                <Container>
                  <QueryErrorCoverBoundary>
                    <LotPreviewsContainer search={filterSearch} {...filters} />
                  </QueryErrorCoverBoundary>
                  {!isMobile && (
                    <FiltersContainer
                      clear={setFiltersStorage}
                      onSubmit={setFilters}
                      currentId={Number(categoryId)}
                    />
                  )}
                </Container>
              </Container>
            </div>
          }
        />
      </Routes>
    </>
  )
}

export default HomeView
