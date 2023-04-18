import QueryContainer from "app/components/containers/QueryContainer/QueryContainer"
import ButtonLink from "app/components/UI/Button/ButtonLink"
import Buttons from "app/layouts/Buttons/Buttons"
import Previews from "app/layouts/Previews/Previews"
import LotNotification from "areas/lot/LotNotification"
import LotPreview from "areas/lot/LotPreview/LotPreview"
import LotSeller from "areas/lot/LotSeller"
import {LotPreviewType} from "areas/lot/types"
import SellerPreview from "areas/seller/SellerPreview/SellerPreview"
import {
  getUserNotifications,
  getUserNotificationsSubscriptions,
} from "infrastructure/persistence/api/data/actions"
import {
  SchemaLot,
  SchemaUserNotifications,
} from "infrastructure/persistence/api/data/schemas"
import {mapLotPreview} from "infrastructure/persistence/api/mappings/lots"
import {mapUser} from "infrastructure/persistence/api/mappings/user"
import {UserSigned} from "infrastructure/persistence/redux/reducers/user/types"
import {useEffect, useState} from "react"
import {useClient} from "react-fetching-library"
import {Helmet} from "react-helmet"
import {useSelector} from "react-redux"
import {Route, Routes} from "react-router"
import {useNavigate} from "react-router-dom"

function NotificationsView() {
  return (
    <>
      <Helmet>
        <title>Уведомления | etukk.ru</title>
      </Helmet>
      <h2 className="heading">Уведомления</h2>
      <Buttons>
        <ButtonLink small outline nav to="lots">
          По лотам
        </ButtonLink>
        <ButtonLink small outline nav to="subs">
          Мои подписки
        </ButtonLink>
        {/* <ButtonLink small outline nav to="support">Тех. поддержка</ButtonLink> */}
      </Buttons>
      <Routes>
        <Route path="lots" element={<NotificationsLotsContainer />} />
        <Route path="subs" element={<NotificationsUsersContainer />} />
      </Routes>
    </>
  )
}

function NotificationsLotsContainer() {
  const client = useClient()
  const navigate = useNavigate()
  const event = useSelector(state => state.event)
  const [notificationsLots, setNotificationsLots] = useState<SchemaLot[]>([])

  useEffect(() => {
    async function getMyNotifications() {
      const {payload} = await client.query(
        getUserNotifications({order_by: "-event_time"})
      )
      payload?.sort(function (a, b) {
        if (a.event_time && b.event_time && a.event_time < b.event_time) {
          return 1
        }
        if (a.event_time && b.event_time && a.event_time > b.event_time) {
          return -1
        }
        return 0
      })
      const notificationsWithLot = payload?.filter(item => item.lot != null)

      const notificationsLots: SchemaLot[] = []

      notificationsWithLot?.forEach(notification => {
        if (notificationsLots.find(note => note.id === notification.lot_id))
          return
        notificationsLots.push(notification.lot)
      })

      setNotificationsLots(notificationsLots)
    }
    getMyNotifications()
  }, [event])

  const LotPreviewClick = (lot: SchemaLot) => {
    navigate(`/lots/${lot.id}/notifications`, {state: {lot: lot}})
  }

  return (
    <Previews>
      {notificationsLots.map(lot => (
        <LotPreview
          key={lot.id}
          {...mapLotPreview(lot)}
          onClick={() => LotPreviewClick(lot)}
        />
      ))}
    </Previews>
  )
}

function NotificationsUsersContainer() {
  const [chosenNotification, setChosenNotification] = useState<{
    id: number
    user: UserSigned
  } | null>(null)

  if (chosenNotification !== null) {
    return <LotSeller {...chosenNotification} />
  }

  return (
    <QueryContainer action={getUserNotificationsSubscriptions()}>
      {payload => (
        <Previews>
          {payload
            .filter(item => item.user != null)
            .map(notification => (
              <button
                type="button"
                onClick={() =>
                  setChosenNotification({
                    id: notification.id,
                    user: mapUser(notification.user),
                  })
                }
                key={notification.user.id}>
                <SellerPreview {...mapUser(notification.user)} />
              </button>
            ))}
        </Previews>
      )}
    </QueryContainer>
  )
}

export default NotificationsView
