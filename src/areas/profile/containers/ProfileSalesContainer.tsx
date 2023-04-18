import QueryContainer from "app/components/containers/QueryContainer/QueryContainer"
import Dropper from "app/components/UI/Droppers/Dropper"
import Droppers from "app/components/UI/Droppers/Droppers"
import LotPreviews from "areas/lot/LotPreview/LotPreviews"
import {LotStatus, LotTradeStatus} from "areas/lot/types"
import useDeviceWidth from "hooks/useDeviceWidth"
import {DeviceWidths} from "hooks/useResizeObserverEntry"
import {getLotByUser} from "infrastructure/persistence/api/data/actions"
import {mapLotsLists} from "infrastructure/persistence/api/mappings/lots"
import {useSelector} from "react-redux"

function ProfileSalesContainer() {
  const [isMobile] = useDeviceWidth(DeviceWidths.Mobile)
  const user = useSelector(state => state.user)
  if (!user.auth) return null

  const action = getLotByUser<{
    user_id?: number
    buyer_id?: number
  }>(0, 0, {user_id: user.id})

  return (
    <QueryContainer action={action} mapping={mapLotsLists}>
      {payload => {
        const drafted = payload.items.filter(
          item => item.status === LotStatus.DRAFTED && !item.archived
        )
        const moderation = payload.items.filter(
          item => item.status === LotStatus.MODERATION
        )
        const published = payload.items.filter(
          item => item.status === LotStatus.PUBLISHED
        )
        const rejected = payload.items.filter(
          item => item.status === LotStatus.REJECTED
        )
        const sold = payload.items.filter(
          item => item.status === LotStatus.SOLD
        )

        const archived = payload.items.filter(
          item => item.status === LotStatus.CLOSED || item.archived
        )
        const disputed = payload.items.filter(
          item => item.tradeStatus === LotTradeStatus.DELIVERY_REJECTED
        )
        return (
          <Droppers type={isMobile ? "__NAMING__1" : "__NAMING__2"}>
            <Dropper name="drafted" label="Черновики" amount={drafted.length}>
              <LotPreviews merchant="seller" previews={drafted} />
            </Dropper>
            <Dropper
              name="moderation"
              label="На проверке"
              amount={moderation.length}>
              <LotPreviews merchant="seller" previews={moderation} />
            </Dropper>
            <Dropper
              name="published"
              label="Опубликовано"
              amount={published.length}>
              <LotPreviews merchant="seller" previews={published} />
            </Dropper>
            <Dropper name="rejected" label="Отклонено" amount={rejected.length}>
              <LotPreviews merchant="seller" previews={rejected} />
            </Dropper>
            <Dropper name="sold" label="Продано" amount={sold.length}>
              <LotPreviews merchant="seller" previews={sold} />
            </Dropper>
            <Dropper name="archived" label="Архив" amount={archived.length}>
              <LotPreviews merchant="seller" previews={archived} />
            </Dropper>
            <Dropper
              name="disputed"
              label="Открыто споров"
              amount={disputed.length}>
              <LotPreviews merchant="seller" previews={disputed} />
            </Dropper>
          </Droppers>
        )
      }}
    </QueryContainer>
  )
}

export default ProfileSalesContainer
