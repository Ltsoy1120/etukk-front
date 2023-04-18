import Button from "app/components/UI/Button/Button"
import Checkbox from "app/components/UI/Checkbox/Checkbox"
import {Column} from "app/layouts/BaseLayouts/BaseLayouts"
import {
  deleteUserCard,
  getUrlTinkoff,
  getUserCards,
  patchUser,
  patchUserCard,
} from "infrastructure/persistence/api/data/actions"
import {mapUser} from "infrastructure/persistence/api/mappings/user"
import {userUpdate} from "infrastructure/persistence/redux/reducers/user"
import {UserSigned} from "infrastructure/persistence/redux/reducers/user/types"
import {useEffect, useState} from "react"
import {useClient} from "react-fetching-library"
import {useDispatch, useSelector} from "react-redux"
import {classWithModifiers} from "utils/common"
import {humanizeDate3} from "utils/date"

enum FormInputs {
  bidUpConfirm = "increase",
  smsOnSubscriptionsChange = "subscriptions",
  smsOnBidChange = "bidding",
}

function ProfilePersonalSettings() {
  const user = useSelector(state => state.user) as UserSigned
  const [confirm, setConfirm] = useState(user.bet_confirmation)

  const client = useClient()
  const dispatch = useDispatch()

  useEffect(() => {
    async function settingBetConfirm() {
      const {error, payload} = await client.query(
        patchUser({bet_confirmation: confirm})
      )
      if (error) return
      if (payload == null) return
      dispatch(userUpdate(mapUser(payload)))
    }
    settingBetConfirm()
  }, [confirm])

  return (
    <>
      <h5 className="heading">Настройки</h5>
      <Column>
        <Checkbox
          name={FormInputs.bidUpConfirm}
          defaultChecked={!confirm}
          onChange={() => setConfirm(!confirm)}>
          Не запрашивать подтверждение о повышении ставки
        </Checkbox>
      </Column>
      {/* <div>
        <Button onClick={settingBetConfirm}>Сохранить</Button>
      </div> */}
      <FinanceSettings />
    </>
  )
}

export default ProfilePersonalSettings

export type Card = {
  id: number
  pan: string
  user_id: number
  exp_date: string
  status: string
  created_at: string
  default: boolean
}
function FinanceSettings() {
  const client = useClient()

  const [cards, setCards] = useState<Card[]>([])
  const [defaultCard, setDefaultCard] = useState<Card>()

  useEffect(() => {
    async function getCards() {
      const {error, payload} = await client.query(getUserCards())
      console.log("payload", payload)
      if (error) return
      if (payload == null) return
      setCards(payload)
      const defaultCard = payload.find(card => card.default === true)
      setDefaultCard(defaultCard)
    }
    getCards()
  }, [])

  async function goToTinkoff() {
    const {error, payload} = await client.query(getUrlTinkoff())
    if (error) return
    if (payload == null) return
    window.open(payload.redirect_url)
  }

  async function chooseDefaultCard(card: Card) {
    const {error, payload} = await client.query(
      patchUserCard(card.id, {default: true})
    )
    if (error) return
    if (payload == null) return
    setDefaultCard(payload)
  }

  async function removeUserCard(cardId: number) {
    const {error, payload} = await client.query(deleteUserCard(cardId))
    if (error) return
    if (payload == null) return
    const updateCards = cards.filter(card => card.id === payload?.id)
    setCards(updateCards)
  }

  return (
    <div className="profile-view__finance-settings">
      <h2>Финансы и выплаты</h2>
      <span>
        *ООО “АМО Групп” не запрашивает и не хранит данные платежных карт. Все
        выплаты проводятся через гарант-сервис Тинькофф.Касса и только через
        него. На etukk.ru хранится только токен карты.*
      </span>
      {cards.length === 1 && (
        <p className="profile-view__token">
          <span>Токен карты</span> {cards[0].pan.slice(cards[0].pan.length - 5)}{" "}
          от {humanizeDate3(new Date(cards[0].created_at))}{" "}
          <span onClick={() => removeUserCard(cards[0].id)}>удалить</span>
        </p>
      )}
      {cards.length > 1 &&
        cards.map(card => (
          <p className="profile-view__token" key={card.id}>
            <span>Токен карты</span> {card.pan.slice(card.pan.length - 5)} от{" "}
            {humanizeDate3(new Date(cards[0].created_at))}
            <span
              className={classWithModifiers(
                "profile-view__token-default",
                defaultCard?.id === card.id && "choosed"
              )}
              onClick={() => chooseDefaultCard(card)}>
              по умолчанию
            </span>
            <span onClick={() => removeUserCard(card.id)}>удалить</span>
          </p>
        ))}
      <p>
        <span onClick={goToTinkoff}>Сформировать</span> токен карты для выплат
        за проданные лоты
      </p>
    </div>
  )
}
