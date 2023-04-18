import "./UserProfile.scss"

import QueryContainer from "app/components/containers/QueryContainer/QueryContainer"
import Backward from "app/components/UI/Backward/Backward"
import Button from "app/components/UI/Button/Button"
import Copy from "app/components/UI/Copy/Copy"
import CustomerRating from "app/components/UI/CustomerRating/CustomerRating"
import Switcher from "app/components/UI/Switcher/Switcher"
import Previews from "app/layouts/Previews/Previews"
import LotPreview from "areas/lot/LotPreview/LotPreview"
import {LotStatus} from "areas/lot/types"
import ProfileReviewsContainer from "areas/profile/containers/ProfileReviewsContainer"
import {isValidResponse} from "infrastructure/persistence/api/client"
import {ExtractActionPayload} from "infrastructure/persistence/api/client.types"
import {
  getLot,
  getUserByUserId,
  postUserFavoriteUser,
} from "infrastructure/persistence/api/data/actions"
import {SchemaLot} from "infrastructure/persistence/api/data/schemas"
import {mapImageUrl} from "infrastructure/persistence/api/mappings/helpers"
import {mapLotsLists} from "infrastructure/persistence/api/mappings/lots"
import {FilteringField} from "interfaces/Nodejs"
import {useState} from "react"
import {useClient, useQuery} from "react-fetching-library"
import {useSelector} from "react-redux"
import {Route, Routes} from "react-router"
import {NavLink} from "react-router-dom"
import {humanizeDate} from "utils/date"

interface UserProfileProps {
  userId: number
}

function UserProfile(props: UserProfileProps) {
  const getUserLotsAction = (status: string) =>
    getLot<
      FilteringField<"user_id", "iexact", number> & {
        // | FilteringField<"bidding_end_time", "gte", string>
        status: string
      }
    >(10, 0, {
      user_id__iexact: props.userId,
      // bidding_end_time__gte: endTime?.toISOString(),
      status: status,
    })

  const getUserLotsPublished = getUserLotsAction(LotStatus.PUBLISHED)

  const userLotsClosed = useQuery(
    getUserLotsAction(LotStatus.CLOSED),
    true
  ).payload
  const userLotsSold = useQuery(getUserLotsAction(LotStatus.SOLD), true).payload

  let userLotsCompleted: SchemaLot[] = []
  if (userLotsClosed && userLotsSold) {
    userLotsCompleted = [...userLotsClosed, ...userLotsSold].sort(function (
      a,
      b
    ) {
      if (a.id && b.id && a.id > b.id) {
        return 1
      }
      if (a.id && b.id && a.id < b.id) {
        return -1
      }
      return 0
    })
  } else if (!userLotsClosed && userLotsSold) {
    userLotsCompleted = [...userLotsSold]
  } else if (userLotsClosed && !userLotsSold) {
    userLotsCompleted = [...userLotsClosed]
  }

  return (
    <div className="user-profile">
      <div className="user-profile__container">
        <QueryContainer action={getUserByUserId(props.userId)}>
          {user => <UserProfileInfo user={user} />}
        </QueryContainer>
        <Switcher>
          <NavLink to="" end>
            Отзывы
          </NavLink>
          <NavLink to="placed">Размещенные лоты</NavLink>
          <NavLink to="sold">Завершенные лоты</NavLink>
        </Switcher>
        <Routes>
          <Route
            path=""
            element={
              <ProfileReviewsContainer type="sales" sellerId={props.userId} />
            }
          />
          <Route
            path="placed"
            element={
              <QueryContainer
                action={getUserLotsPublished}
                mapping={mapLotsLists}
                key="all lots">
                {payload => (
                  <Previews>
                    {payload.items.map(lot => (
                      <LotPreview {...lot} key={lot.id} />
                    ))}
                  </Previews>
                )}
              </QueryContainer>
            }
          />
          <Route
            path="sold"
            element={
              <Previews>
                {mapLotsLists(userLotsCompleted).items.map(lot => (
                  <LotPreview {...lot} key={lot.id} />
                ))}
              </Previews>
            }
          />
        </Routes>
      </div>
      <div className="user-profile__container">
        <Backward>НАЗАД</Backward>
        <div className="user-profile__cover" />
      </div>
    </div>
  )
}

interface UserProfileInfoProps {
  user: ExtractActionPayload<ReturnType<typeof getUserByUserId>>
}

function UserProfileInfo(props: UserProfileInfoProps) {
  const myId = useSelector(state => state.user).id
  const isMyUserProfile = Number(myId) === Number(props.user.id)

  const [subscribed, setSubscribed] = useState(props.user.in_user_favorites)
  const client = useClient()
  async function subscribe() {
    setSubscribed(!subscribed)

    const response = await client.query(
      postUserFavoriteUser({fav_user_id: props.user.id})
    )

    if (!isValidResponse(response)) {
      // Fall back if invalid response
      setSubscribed(subscribed)
      return
    }
  }

  return (
    <>
      <div className="user-profile__row">
        <h2 className="heading">{props.user.fullname}</h2>
        <Copy
          value={"id" + props.user.id}
          link={"https://etukk.ru/user/" + props.user.id}
        />
      </div>
      <div className="user-profile__row">
        <div className="user-profile__entry">
          Зарегистрирован {humanizeDate(new Date(props.user.created_at))}
        </div>
        <div className="user-profile__entry">
          {props.user.organization ? "Организация" : "Частное лицо"}
          {props.user.city}
        </div>
      </div>
      <div className="user-profile__general-info">
        <img
          src={mapImageUrl(props.user.user_pic?.filename)}
          alt="avatar"
          className="user-profile__avatar"
        />
        <div className="user-profile__info">
          <CustomerRating
            sellerRating={props.user.seller_rating ?? -1}
            buyerRating={props.user.seller_rating ?? -1}
          />
          {!subscribed && !isMyUserProfile && (
            <div>
              <Button
                color={subscribed ? "gray" : undefined}
                await
                onClick={subscribe}>
                Подписаться
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default UserProfile
