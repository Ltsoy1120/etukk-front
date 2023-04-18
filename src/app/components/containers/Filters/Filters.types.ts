export type FilterKey = string
export type FilterValue = unknown

export type FiltersType = Record<FilterKey, FilterValue>
export type FiltersState = "expanded" | "shrunken" | undefined
