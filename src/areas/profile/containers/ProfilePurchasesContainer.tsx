import QueryContainer from "app/components/containers/QueryContainer/QueryContainer"
import Dropper from "app/components/UI/Droppers/Dropper"
import Droppers from "app/components/UI/Droppers/Droppers"
import LotPreviews from "areas/lot/LotPreview/LotPreviews"
import {LotTradeStatus} from "areas/lot/types"
import useDeviceWidth from "hooks/useDeviceWidth"
import {DeviceWidths} from "hooks/useResizeObserverEntry"
import {getLot} from "infrastructure/persistence/api/data/actions"
import {mapLotsLists} from "infrastructure/persistence/api/mappings/lots"
import {useSelector} from "react-redux"

function ProfilePurchasesContainer() {
  const [isMobile] = useDeviceWidth(DeviceWidths.Mobile)
  const user = useSelector(state => state.user)
  if (!user.auth) return null

  const action = getLot<{
    user_id?: number
    buyer_id?: number
  }>(0, 0, {buyer_id: user.id})
  return (
    <QueryContainer action={action} mapping={mapLotsLists}>
      {payload => {
        const won = payload.items.filter(item =>
          [
            LotTradeStatus.AWAITING_PAYMENT,
            LotTradeStatus.PAID,
            LotTradeStatus.AWAITING_SHIPMENT,
          ].includes(item.tradeStatus)
        )
        const delivering = payload.items.filter(
          item => item.tradeStatus === LotTradeStatus.DELIVERY
        )
        const confirmReceipt = payload.items.filter(
          item => item.tradeStatus === LotTradeStatus.CONFIRMATION
        )

        const completed = payload.items.filter(
          item => item.tradeStatus === LotTradeStatus.DELIVERED
        )
        const disputed = payload.items.filter(
          item => item.tradeStatus === LotTradeStatus.DELIVERY_REJECTED
        )
        return (
          <Droppers type={isMobile ? "__NAMING__1" : "__NAMING__2"}>
            <Dropper name="won" label="Выиграно" amount={won.length}>
              <LotPreviews merchant="buyer" previews={won} />
            </Dropper>
            <Dropper
              name="delivering"
              label="В пути"
              amount={delivering.length}>
              <LotPreviews merchant="buyer" previews={delivering} />
            </Dropper>
            <Dropper
              name="confirmReceipt"
              label="Подтвердить получение"
              amount={confirmReceipt.length}>
              <LotPreviews merchant="buyer" previews={confirmReceipt} />
            </Dropper>
            <Dropper
              name="completed"
              label="Завершенные покупки"
              amount={completed.length}>
              <LotPreviews merchant="buyer" previews={completed} />
            </Dropper>
            <Dropper
              name="disputed"
              label="Открыто споров"
              amount={disputed.length}>
              <LotPreviews merchant="buyer" previews={disputed} />
            </Dropper>
          </Droppers>
        )
      }}
    </QueryContainer>
  )
}

export default ProfilePurchasesContainer
