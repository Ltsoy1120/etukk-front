import "./Loader.scss"

import { classWithModifiers } from "utils/common"

import Loader from "./Loader"

interface LoaderCoverProps {
  absolute?: boolean
}

function LoaderCover(props: LoaderCoverProps) {
  return (
    <div className={classWithModifiers("loader-cover", props.absolute && "absolute")}>
      <Loader className="loader-cover__loader" />
    </div>
  )
}

export default LoaderCover
