import "./Main.scss"

import { ReactNode } from "react"

interface MainProps {
  children: ReactNode
}

function Main(props: MainProps) {
  return (
    <main className="main">{props.children}</main>
  )
}

export default Main
