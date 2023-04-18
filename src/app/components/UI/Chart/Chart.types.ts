import { ReactNode } from "react"

export type ChartLabelType = string
export type ChartValueType = number
export interface ChartEntryType {
  key: ReactNode
  value: ChartValueType
  at: ChartLabelType
}
export interface ChartBarType {
  label: ChartLabelType
  value: ChartValueType
}