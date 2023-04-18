import _ from "lodash"
import { createContext, Dispatch, SetStateAction } from "react"

import { FiltersType } from "./Filters.types"

const filtersContext = createContext<[FiltersType, Dispatch<SetStateAction<FiltersType>>]>([{}, _.noop])
export default filtersContext
