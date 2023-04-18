import RequiredAuthCover from "app/components/containers/QueryContainer/RequiredAuthCover"
import Button from "app/components/UI/Button/Button"
import Buttons from "app/layouts/Buttons/Buttons"
import DialogBidAccepted, {
  DialogError,
} from "app/views/lot/modals/DialogBidAccepted"
import DialogConfirmBidUp from "app/views/lot/modals/DialogConfirmBidUp"
import useDeviceWidth from "hooks/useDeviceWidth"
import {DeviceWidths} from "hooks/useResizeObserverEntry"
import {isValidResponse} from "infrastructure/persistence/api/client"
import {postLotByLotIdBet} from "infrastructure/persistence/api/data/actions"
import {Event} from "infrastructure/persistence/redux/reducers/event/types"
import {UserSigned} from "infrastructure/persistence/redux/reducers/user/types"
import {useEffect, useState} from "react"
import {useClient} from "react-fetching-library"
import {Modal} from "react-modal-global"
import {useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {Price} from "utils/extensions"

import {LotInfoType} from "../types"

// import EventSource from 'event-source'

interface LotInfoBidProps
  extends Pick<LotInfoType, "id" | "currentPrice" | "betStep"> {}

function LotInfoBid(props: LotInfoBidProps) {
  const user = useSelector(state => state.user) as UserSigned
  const event = useSelector(state => state.event) as Event
  const [bidMultiplier, setBidMultiplier] = useState(1)
  const [prevPrice, setPrevPrice] = useState(props.currentPrice)
  const [currentPrice, setCurrentPrice] = useState(props.currentPrice)
  const [stage, setStage] = useState<"default" | "choice" | "confirm">(
    "default"
  )
  const [isMobile] = useDeviceWidth(DeviceWidths.Mobile)
  const client = useClient()
  useEffect(() => {
    if (event && event.data?.now_price && props.id === event.data.id) {
      setCurrentPrice(new Price(event.data?.now_price))
    }
  }, [event])

  function bidUp(on: number) {
    setBidMultiplier(on)
    setCurrentPrice(currentPrice.add(props.betStep.multiply(on)))
    setStage("confirm")
  }
  function cancelBidUp() {
    setStage("default")
    setCurrentPrice(prevPrice)
  }
  async function confirmBidUp() {
    console.log("user.bet_confirmation", user.bet_confirmation)
    if (user.bet_confirmation) {
      await confirmBidUpDialog()
    }

    const response = await client.query(
      postLotByLotIdBet(props.id, bidMultiplier)
    )
    if (!isValidResponse(response)) {
      Modal.open(DialogError)
      cancelBidUp()
      return
    }

    setStage("default")
    setPrevPrice(currentPrice)
    setCurrentPrice(new Price(response.payload.amount))

    Modal.open(DialogBidAccepted)
  }

  function confirmBidUpDialog() {
    return new Promise<void>(resolve => {
      Modal.open(DialogConfirmBidUp, {onSubmit: resolve})
    })
  }

  if (!user.auth) {
    return <RequiredAuthCover />
  }

  switch (stage) {
    case "choice":
      return (
        <div className="lot-info-bid">
          <div className="lot-info-bid__entry">
            <span>Текущая ставка</span>
            <span>{currentPrice.format()}</span>
          </div>
          <div className="lot-info-bid__step">
            <span>Шаг ставки</span>
            <span>{props.betStep.format()}</span>
          </div>
          <p className="lot-info-bid__text">
            *Нажимая “поднять ставку” вы соглашаетесь с{" "}
            <Link to="/terms/serviceOffer">политикой предоставления услуг</Link>
            .
            <br />
            Минимальная стоимость услуг площадки по организации доставки и
            безопасной сделки для данного лота составит от{" "}
            {currentPrice.format()}
          </p>
          <div className="lot-info-bid__buttons">
            <Button onClick={() => bidUp(1)}>Поднять на шаг</Button>
            <Button onClick={() => bidUp(2)}>шаг Х 2</Button>
            <Button onClick={() => bidUp(3)}>шаг Х 3</Button>
          </div>
        </div>
      )

    case "confirm":
      return (
        <div className="lot-info-bid">
          <div className="lot-info-bid__entries">
            <div className="lot-info-bid__entry">
              <span>Текущая ставка</span>
              <span>{prevPrice.format()}</span>
            </div>
            <div className="lot-info-bid__entry">
              <span>Ваша ставка</span>
              <span>{currentPrice.format()}</span>
            </div>
          </div>
          <br />
          <br />
          <Buttons spaceBetween>
            <Button onClick={confirmBidUp}>Отправить</Button>
            <Button outline onClick={cancelBidUp}>
              Отмена
            </Button>
          </Buttons>
        </div>
      )

    default:
      return (
        <div className="lot-info-bid lot-info-bid--box">
          <div className="lot-info-bid__entry lot-info-bid__entry--column">
            <span>Текущая ставка</span>
            <span>{currentPrice.format()}</span>
          </div>
          {isMobile ? (
            <Button onTouchStart={() => setStage("choice")}>
              Поднять ставку
            </Button>
          ) : (
            <Button onClick={() => setStage("choice")}>Поднять ставку</Button>
          )}
        </div>
      )
  }
}

export default LotInfoBid
