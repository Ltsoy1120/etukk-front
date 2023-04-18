import { ReactNode } from "react"

type ButtonColor = "white" | "gray"

export interface ButtonBaseProps {
  small?: boolean
  outline?: boolean
  color?: ButtonColor

  className?: string

  iconLeft?: ReactNode
  iconRight?: ReactNode

  children: ReactNode
}
