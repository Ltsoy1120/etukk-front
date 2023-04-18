import "./Lot.scss"

import Backward from "app/components/UI/Backward/Backward"
import Button from "app/components/UI/Button/Button"
import Details from "app/components/UI/Details/Details"
import {isValidResponse} from "infrastructure/persistence/api/client"
import {
  deleteLotByLotIdNotifications,
  getUserNotifications,
} from "infrastructure/persistence/api/data/actions"
import {
  SchemaLot,
  SchemaUserNotifications,
} from "infrastructure/persistence/api/data/schemas"
import {mapLot} from "infrastructure/persistence/api/mappings/lots"
import {useEffect, useState} from "react"
import {useClient} from "react-fetching-library"
import {useLocation} from "react-router-dom"

import LotPreview from "./LotPreview/LotPreview"
import {LotInfoType} from "./types"

type LotState = {
  lot: SchemaLot
}
function LotNotification() {
  const state = useLocation().state as LotState
  const client = useClient()
  const [lotById, setLotById] = useState<LotInfoType>()
  const [subscribe, setSubscribe] = useState<boolean>()
  const [notificationsByLot, setNotificationsByLot] = useState<
    SchemaUserNotifications[]
  >([])

  useEffect(() => {
    if (state) {
      setLotById(mapLot(state.lot))
      setSubscribe(state.lot.notifications)
    }
  }, [])

  useEffect(() => {
    async function getMyNotificationsByLot() {
      if (lotById) {
        const {payload} = await client.query(
          getUserNotifications({lot_id: lotById?.id})
        )
        const sortedNotifications = payload?.sort(function (a, b) {
          if (a.event_time && b.event_time && a.event_time < b.event_time) {
            return 1
          }
          if (a.event_time && b.event_time && a.event_time > b.event_time) {
            return -1
          }
          return 0
        })
        payload &&
          setNotificationsByLot(
            sortedNotifications as SchemaUserNotifications[]
          )
      }
    }
    getMyNotificationsByLot()
  }, [lotById])

  const notificationsUnsubscribe = async () => {
    if (lotById == null) return
    const response = await client.query(
      deleteLotByLotIdNotifications(+lotById?.id)
    )

    if (!isValidResponse(response)) return
    setSubscribe(false)
  }

  return (
    <>
      <Backward />
      <div className="lot-notification">
        <div>
          {lotById && <LotPreview {...lotById} />}
          {notificationsByLot[0] && subscribe ? (
            <Button marginTop={15} onClick={notificationsUnsubscribe}>
              Отписаться
            </Button>
          ) : (
            <p>Вы отписаны от уведомлений</p>
          )}
        </div>
        <div className="lot-notification--column">
          {notificationsByLot[0] &&
            notificationsByLot.map(notification => (
              <Details
                key={notification.id}
                date={new Date(notification.event_time)}
                summary={notification.text}>
                {/* <SellerPreview {...{
              id: 1,
              avatar: IMAGE_MOCKS[0],
              name: "ИП ПОВЕЛИТЕЛЬ МЕБЕЛИ и мира в целом",
              city: "Москва",
              likes: 5,
              dislikes: 1
         }} /> */}
              </Details>
            ))}
        </div>
      </div>
    </>
  )
}

export default LotNotification
