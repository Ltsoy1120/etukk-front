import QueryContainer from "app/components/containers/QueryContainer/QueryContainer"
import Slider from "app/components/containers/Slider/Slider"
import Author from "app/components/UI/Author/Author"
import Backward from "app/components/UI/Backward/Backward"
import Button from "app/components/UI/Button/Button"
import CountableTimer from "app/components/UI/CountableTimer/CountableTimer"
import {Column} from "app/layouts/BaseLayouts/BaseLayouts"
import Buttons from "app/layouts/Buttons/Buttons"
import Entries from "app/layouts/Entries/Entries"
import Entry from "app/layouts/Entries/Entry"
import LotPage from "app/layouts/LotPage/LotPage"
import PopupDispute from "app/views/lot/modals/PopupDispute"
import PopupReview from "app/views/lot/modals/PopupReview/PopupReview"
import useDeliveryTimers from "areas/lot/hooks/useDeliveryTimers"
import useParam from "hooks/useParam"
import {
  getLotByLotId,
  postLotByLotConfirmDelivery,
} from "infrastructure/persistence/api/data/actions"
import {mapLot} from "infrastructure/persistence/api/mappings/lots"
import {useClient} from "react-fetching-library"
import {Modal} from "react-modal-global"
import {offsetDateMinutes} from "utils/date.helpers"

function ProfilePurchasesConfirmDeliveryView() {
  const lotId = useParam("lotId", true)
  const {confirmDeliveryTimer} = useDeliveryTimers()
  const client = useClient()

  async function confirmDelivery(userId: number) {
    await client.query(postLotByLotConfirmDelivery(lotId))
    await Modal.open(PopupReview, {lotId, userId})
  }

  function openDispute(userId: number) {
    Modal.open(PopupDispute, {lotId})
  }

  return (
    <QueryContainer action={getLotByLotId(lotId)} mapping={mapLot}>
      {payload => (
        <LotPage spaceAround>
          <div>
            <Slider slides={payload.slides} />
            <h5>Описание лота</h5>
            <p className="lot-info-summary__description">
              {payload.description}
            </p>
            <h5>Характеристики</h5>
            <Entries>
              {payload.specifications.map((specification, index) => (
                <Entry key={index}>
                  <span>{specification.key}</span>
                  <span>{specification.value}</span>
                </Entry>
              ))}
            </Entries>
          </div>
          <Column gap="2em">
            <Backward>{payload.title}</Backward>
            {payload.seller && (
              <Author sellerId={payload.seller.id} city={payload.city} />
            )}
            <Entries>
              <Entry>
                <span>Сумма выкупа</span>
                <big>{payload.currentPrice.format()}</big>
              </Entry>
              <hr />
              <Entry>
                <span>Подтвердить получение</span>
                <big>
                  <CountableTimer
                    until={offsetDateMinutes(
                      payload.editedAt,
                      confirmDeliveryTimer
                    )}
                    slice={[1]}
                  />
                </big>
              </Entry>
            </Entries>
            <Buttons spaceBetween>
              <Button onClick={() => confirmDelivery(payload.seller?.id ?? -1)}>
                Подтвердить получение
              </Button>
              <Button
                outline
                onClick={() => openDispute(payload.seller?.id ?? -1)}>
                Претензия
              </Button>
            </Buttons>
          </Column>
        </LotPage>
      )}
    </QueryContainer>
  )
}

export default ProfilePurchasesConfirmDeliveryView
