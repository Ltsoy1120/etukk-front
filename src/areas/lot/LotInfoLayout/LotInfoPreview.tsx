import Slider from "app/components/containers/Slider/Slider"
import SliderMobile from "app/components/containers/Slider/SliderMobile"
import Bookmark from "app/components/UI/Bookmark/Bookmark"
import useDeviceWidth from "hooks/useDeviceWidth"
import {DeviceWidths} from "hooks/useResizeObserverEntry"
import {useSelector} from "react-redux"

import {LotInfoType} from "../types"

interface LotInfoPreviewProps
  extends Pick<
    LotInfoType,
    "id" | "slides" | "bookmarked" | "user_id" | "video"
  > {}

function LotInfoPreview(props: LotInfoPreviewProps) {
  const myId = useSelector(state => state.user).id
  const isMyLot = Number(myId) === Number(props.user_id)
  const [isMobile] = useDeviceWidth(DeviceWidths.Mobile)
  return (
    <div className="lot-info-preview">
      {!isMobile ? (
        <Slider
          slides={props.video ? [props.video, ...props.slides] : props.slides}
          allowFullscreen
        />
      ) : (
        <SliderMobile slides={props.slides} />
      )}

      {!isMyLot && (
        <Bookmark
          className="lot-info-preview__bookmark"
          type="lot"
          id={props.id}
          defaultValue={props.bookmarked}
        />
      )}
    </div>
  )
}

export default LotInfoPreview
