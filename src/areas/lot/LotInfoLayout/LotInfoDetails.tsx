import Backward from "app/components/UI/Backward/Backward"
import ButtonLink from "app/components/UI/Button/ButtonLink"
import CountableTimer from "app/components/UI/CountableTimer/CountableTimer"
import Icon from "app/components/UI/Icon/Icon"
import Entries from "app/layouts/Entries/Entries"
import Entry from "app/layouts/Entries/Entry"
import {useEffect, useState} from "react"
import {useSelector} from "react-redux"

import {LotDelivery, LotInfoType, LotStatus} from "../types"

interface LotInfoDetailsProps
  extends Pick<
    LotInfoType,
    | "id"
    | "title"
    | "city"
    | "startPrice"
    | "currentPrice"
    | "startEndInterval"
    | "status"
    | "delivery"
    | "buyerId"
    | "user_id"
    | "tradeStatus"
  > {}

function LotInfoDetails(props: LotInfoDetailsProps) {
  const user = useSelector(state => state.user)
  const [tradable, setTradable] = useState(
    props.startEndInterval.isInInterval(new Date())
  )
  const [isWin, setIsWin] = useState(false)

  const event = useSelector(state => state.event)

  useEffect(() => {
    if (
      event.user_id === user.id &&
      props.id === event?.data?.id &&
      event?.data?.trade_status === "awaiting_payment"
    ) {
      setIsWin(true)
    }
  }, [event])

  return (
    <div className="lot-info-details">
      <Backward>{props.title}</Backward>
      <div className="lot-info-details__city">
        <span>{props.city}</span>
        <Icon
          name={props.delivery === LotDelivery.all ? "truck" : "building"}
        />
      </div>
      <Entries>
        <Entry>
          <span>Начальная стоимость</span>
          <big>{props.startPrice.format()}</big>
        </Entry>
        {props.currentPrice && props.status === "sold" && (
          <Entry>
            <span>Сумма выкупа</span>
            <big>{props.currentPrice.format()}</big>
          </Entry>
        )}
        <Entry>
          <span>Начало торгов</span>
          <span>{props.startEndInterval.humanizedDate1}</span>
        </Entry>
        <Entry>
          <span>Окончание торгов</span>
          {tradable ? (
            <big>
              <CountableTimer
                until={props.startEndInterval.date2}
                onEnd={() => setTradable(false)}
              />
            </big>
          ) : (
            <span>{props.startEndInterval.humanizedDate2}</span>
          )}
        </Entry>
      </Entries>

      {isWin && (
        <div>
          <ButtonLink to={`/profile/purchases/checkout/${props.id}`}>
            Перейти к оплате
          </ButtonLink>
        </div>
      )}
    </div>
  )
}

export default LotInfoDetails
