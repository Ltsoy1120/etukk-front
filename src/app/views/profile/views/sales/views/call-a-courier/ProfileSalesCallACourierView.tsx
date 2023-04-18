import QueryContainer from "app/components/containers/QueryContainer/QueryContainer"
import {FormState} from "app/layouts/Form/Form"
import LotCompactLayout from "app/layouts/LotCompactLayout/LotCompactLayout"
import CallACourier, {
  CallACourierFormInputs,
} from "areas/checkout/CallACourier/CallACourier"
import DialogCallACourierSuccessful from "areas/checkout/DialogCallACourierSuccessful"
import LotInfoCompact from "areas/lot/LotInfoCompact/LotInfoCompact"
import useParam from "hooks/useParam"
import {isValidResponse} from "infrastructure/persistence/api/client"
import {
  getLotByLotId,
  postLotByLotSellerApprove,
} from "infrastructure/persistence/api/data/actions"
import {mapLot} from "infrastructure/persistence/api/mappings/lots"
import moment from "moment"
import {useClient} from "react-fetching-library"
import {Modal} from "react-modal-global"

function ProfileSalesCallACourierView() {
  const lotId = useParam("lotId", true)
  const client = useClient()
  async function onSubmit(
    values: FormState<CallACourierFormInputs, string>["values"]
  ) {
    const timeZone = moment().format().slice(-6)
    console.log(
      "shipment_datetime_start:",
      values.date + "T" + values.timeStart + timeZone
    )
    const responseSellerApprove = await client.query(
      postLotByLotSellerApprove(lotId, {
        contact_phone: values.phone,
        shipment_datetime_start:
          values.date + "T" + values.timeStart + timeZone,
        shipment_datetime_end: values.date + "T" + values.timeEnd + timeZone,
        comment: values.comment,
      })
    )

    if (!isValidResponse(responseSellerApprove)) return

    Modal.open(DialogCallACourierSuccessful, {closable: false})

    // const responsePay = await client.query(postLotByLotPay(lotId))
    // if (!isValidResponse(responsePay)) return

    // window.open(responsePay.payload.redirect_url)
  }
  return (
    <QueryContainer action={getLotByLotId(lotId)} mapping={mapLot}>
      {payload => (
        <LotCompactLayout>
          <LotInfoCompact
            image={payload.slides[0]}
            title={payload.title}
            seller={payload.seller}
          />
          {payload.deliveryOrder && (
            <CallACourier
              deliveryOrder={payload.deliveryOrder}
              onSubmit={onSubmit}
            />
          )}
        </LotCompactLayout>
      )}
    </QueryContainer>
  )
}

export default ProfileSalesCallACourierView
