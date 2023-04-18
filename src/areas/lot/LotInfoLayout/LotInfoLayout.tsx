import "../Lot.scss"

import useDeviceWidth from "hooks/useDeviceWidth"
import {DeviceWidths} from "hooks/useResizeObserverEntry"
import _ from "lodash"
import {ReactNode, useEffect, useState} from "react"
import {useSelector} from "react-redux"

import {LotInfoType} from "../types"
import LotInfoBid from "./LotInfoBid"
import LotInfoDetails from "./LotInfoDetails"
import LotInfoPreview from "./LotInfoPreview"
import LotInfoSummary from "./LotInfoSummary"

interface LotInfoProps extends LotInfoType {
  children?: ReactNode
}

function LotInfoLayout(props: LotInfoProps) {
  console.log("LotInfoLayout", props)
  const user = useSelector(state => state.user)

  const started = Date.now() > props.startEndInterval.date1.getTime()
  const ended = Date.now() >= props.startEndInterval.date2.getTime()
  const [tradable, setTradable] = useState(started && !ended && user.auth)

  useEffect(() => {
    const interval = setInterval(() => {
      const started = Date.now() > props.startEndInterval.date1.getTime()
      const ended = Date.now() >= props.startEndInterval.date2.getTime()

      setTradable(started && !ended && user.auth)
    }, 500)

    return () => {
      clearInterval(interval)
    }
  }, [props])

  const Preview = (
    <LotInfoPreview
      {..._.pick(props, "id", "slides", "bookmarked", "user_id", "video")}
    />
  )
  const Summary = (
    <LotInfoSummary
      {..._.pick(props, "description", "specifications", "seller")}
    />
  )
  const Details = (
    <LotInfoDetails
      {..._.pick(
        props,
        "id",
        "title",
        "city",
        "startPrice",
        "currentPrice",
        "startEndInterval",
        "status",
        "delivery",
        "buyerId",
        "user_id",
        "tradeStatus"
      )}
    />
  )
  const BidOrChildren =
    props.children ||
    (tradable && (
      <LotInfoBid {..._.pick(props, "id", "currentPrice", "betStep")} />
    ))

  const [isMobile] = useDeviceWidth(DeviceWidths.Mobile)
  if (isMobile) {
    return (
      <div className="lot-info-layout">
        {Preview}
        {Details}
        {Summary}
        <div className="lot-info-layout__fixed">{BidOrChildren}</div>
      </div>
    )
  }
  return (
    <div className="lot-info-layout">
      <div className="lot-info-layout__section">
        {Preview}
        {Summary}
      </div>
      <div className="lot-info-layout__section">
        {Details}
        {BidOrChildren}
      </div>
    </div>
  )
}

export default LotInfoLayout
