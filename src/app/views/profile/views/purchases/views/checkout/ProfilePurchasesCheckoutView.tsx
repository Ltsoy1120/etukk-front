import QueryContainer from "app/components/containers/QueryContainer/QueryContainer"
import {FormState} from "app/layouts/Form/Form"
import LotCompactLayout from "app/layouts/LotCompactLayout/LotCompactLayout"
import DialogOrderDeliverySuccessful from "areas/checkout/DialogOrderDeliverySuccessful"
import OrderDelivery, {
  OrderDeliveryFormInputs,
} from "areas/checkout/OrderDelivery/OrderDelivery"
import LotInfoCompact from "areas/lot/LotInfoCompact/LotInfoCompact"
import useParam from "hooks/useParam"
import {isValidResponse} from "infrastructure/persistence/api/client"
import {
  getLotByLotCommission,
  getLotByLotId,
  postLotByLotBuyerApprove,
  postLotByLotPay,
} from "infrastructure/persistence/api/data/actions"
import {mapLot} from "infrastructure/persistence/api/mappings/lots"
import moment from "moment"
import {useClient, useQuery} from "react-fetching-library"
import {Modal} from "react-modal-global"

function ProfilePurchasesCheckoutView() {
  const lotId = useParam("lotId", true)
  const client = useClient()

  const response = useQuery(getLotByLotCommission(lotId))

  async function onSubmit(
    values: FormState<OrderDeliveryFormInputs, string>["values"]
  ) {
    const timeZone = moment().format().slice(-6)

    const responseBuyerApprove = await client.query(
      postLotByLotBuyerApprove(lotId, {
        contact_phone: values.phone,
        // contact_phone: values.phone.replace(/\s|\+/g, ""),
        delivery_address: values.address,
        shipment_dates: [values.date],
        shipment_times: [
          `${values.timeStart}${timeZone}-${values.timeEnd}${timeZone}`,
        ],
      })
    )

    if (!isValidResponse(responseBuyerApprove)) return

    const responsePay = await client.query(postLotByLotPay(lotId))
    if (!isValidResponse(responsePay)) return

    window.open(responsePay.payload.redirect_url)
    Modal.open(DialogOrderDeliverySuccessful, {closable: false})
  }
  return (
    <QueryContainer action={getLotByLotId(lotId)} mapping={mapLot}>
      {payload => (
        <LotCompactLayout>
          <LotInfoCompact
            image={payload.slides[0]}
            title={payload.title}
            seller={payload.seller}
            // price={payload.currentPrice}
          />
          <OrderDelivery
            lot={payload}
            tax={response.payload?.service_commission ?? 0}
            onSubmit={onSubmit}
          />
        </LotCompactLayout>
      )}
    </QueryContainer>
  )
}

export default ProfilePurchasesCheckoutView
