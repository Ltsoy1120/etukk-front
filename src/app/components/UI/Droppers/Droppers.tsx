import "./Droppers.scss"

import { Children, ReactElement, useState } from "react"

import { DropperGroup, DropperProps } from "./Dropper"

//? __NAMING__ means I didn't come up with any good names; sry :(

interface DroppersProps {
  type?: "__NAMING__1" | "__NAMING__2"
  children: ReactElement<DropperProps>[]
}

function Droppers(props: DroppersProps) {
  if (props.type === "__NAMING__1") {
    return <Droppers__NAMING__1 {...props} />
  }

  if (props.type === "__NAMING__2") {
    const droppersProps = Children.map(props.children, child => child.props)

    return <Droppers__NAMING__2 droppersProps={droppersProps} />
  }

  return <Droppers__NAMING__1 {...props} />
}


interface Droppers__NAMING__1Props extends DroppersProps { }

function Droppers__NAMING__1(props: Droppers__NAMING__1Props) {
  return (
    <div className="droppers">
      <div className="droppers__list">{props.children}</div>
    </div>
  )
}


interface Droppers__NAMING__2Props {
  droppersProps: DropperProps[]
}

function Droppers__NAMING__2(props: Droppers__NAMING__2Props) {
  const [activeName, setActiveName] = useState<string>(props.droppersProps[0].name)
  return (
    <div className="droppers">
      <div className="droppers__container">
        {props.droppersProps.find(dropperProps => dropperProps.name === activeName)?.children || "Unknown"}
      </div>
      <div className="droppers__groups">
        {props.droppersProps.map(dropperProps => (
          <DropperGroup
            label={dropperProps.label}
            amount={dropperProps.amount}
            active={dropperProps.name === activeName}
            onClick={() => (setActiveName(dropperProps.name), dropperProps.onClick?.())}
            key={dropperProps.name} />
        ))}
      </div>
    </div>
  )
}

export default Droppers
