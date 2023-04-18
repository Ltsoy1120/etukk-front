import "./ImageShow.scss"

import { ReactNode } from "react"

interface ImageShowProps {
  children: ReactNode
}

function ImageShow(props: ImageShowProps) {
  return (
    <div className="image-show"></div>
  )
}

export default ImageShow
