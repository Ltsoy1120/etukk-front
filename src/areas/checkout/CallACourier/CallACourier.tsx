import "./CallACourier.scss"

import Backward from "app/components/UI/Backward/Backward"
import Button from "app/components/UI/Button/Button"
import Input from "app/components/UI/Input/Input"
import Textarea from "app/components/UI/Textarea/Textarea"
import {Row} from "app/layouts/BaseLayouts/BaseLayouts"
import Form, {FormState} from "app/layouts/Form/Form"
import {LotInfoType} from "areas/lot/types"
import {useState} from "react"
import {humanizeDate2} from "utils/date"

export enum CallACourierFormInputs {
  date = "date",
  timeStart = "timeStart",
  timeEnd = "timeEnd",
  address = "address",
  phone = "phone",
  comment = "comment",
}

interface CallACourierProps {
  deliveryOrder: Required<LotInfoType>["deliveryOrder"]
  onSubmit?(
    values: FormState<CallACourierFormInputs, string>["values"]
  ): Promise<void>
}

function CallACourier(props: CallACourierProps) {
  const [pending, setPending] = useState(false)
  async function onSubmit(state: FormState<CallACourierFormInputs, string>) {
    setPending(true)
    await props.onSubmit?.(state.values)
    setPending(false)
  }
  const timeZoneMiliSec = new Date().getTimezoneOffset() * 60 * 1000
  const nowDate = new Date(props.deliveryOrder.possibleShipmentDates)
  const nowDateYear = nowDate.getFullYear()
  const nowDateMonth = nowDate.toLocaleString("ru", {month: "2-digit"})
  const nowDateDay = nowDate.toLocaleString("ru", {day: "2-digit"})

  const startHours = props.deliveryOrder.possibleShipmentTimes.slice(0, 2)
  const startMinutes = props.deliveryOrder.possibleShipmentTimes.slice(3, 5)
  const endHours = props.deliveryOrder.possibleShipmentTimes.slice(-14, -12)
  const endMinutes = props.deliveryOrder.possibleShipmentTimes.slice(-11, -9)

  const startTime =
    new Date(
      nowDateYear,
      Number(nowDateMonth) - 1,
      Number(nowDateDay),
      Number(startHours),
      Number(startMinutes)
    ).getTime() - timeZoneMiliSec
  const endTime =
    new Date(
      nowDateYear,
      Number(nowDateMonth) - 1,
      Number(nowDateDay),
      Number(endHours),
      Number(endMinutes)
    ).getTime() - timeZoneMiliSec

  const formateShipmentTimes = () => {
    return `${new Date(startTime).toLocaleString("ru", {
      hour: "2-digit",
      minute: "2-digit",
    })} - ${new Date(endTime).toLocaleString("ru", {
      hour: "2-digit",
      minute: "2-digit",
    })}`
  }

  return (
    <Form onSubmit={onSubmit}>
      <Backward>
        <h2 className="heading">Вызвать курьера</h2>
      </Backward>
      <p>
        Укажите дату, время, актуальный адрес и номер телефона для забора и
        отправки товара. Обратите внимание на дату и время, которые указал
        покупатель! Для того, чтобы служба доставки смогла осуществить перевозку
        товара, вам нужно подстроиться под выбранное покупателем время.
      </p>
      <div className="call-a-courier__inputs">
        <Input
          type="date"
          defaultValue={`${nowDateYear}-${nowDateMonth}-${nowDateDay}`}
          name={CallACourierFormInputs.date}
          required
          placeholder="Дата забора груза">
          Покупатель указал: {humanizeDate2(nowDate)}
        </Input>
        <div className="call-a-courier__column">
          <span>Покупатель указал: {formateShipmentTimes()}</span>
          <Row>
            <Input
              type="time"
              name={CallACourierFormInputs.timeStart}
              required
              placeholder="Время забора груза c"
            />
            <Input
              type="time"
              name={CallACourierFormInputs.timeEnd}
              required
              placeholder="Время забора по"
            />
          </Row>
        </div>
        <input
          type="hidden"
          name={CallACourierFormInputs.address}
          value={props.deliveryOrder.shipmentAddress}
        />
        <Input
          type="tel"
          name={CallACourierFormInputs.phone}
          required
          placeholder="Номер телефона"
          defaultValue="+7"
        />
        <Textarea
          rows={10}
          name={CallACourierFormInputs.comment}
          placeholder="Комментарий"
        />
        <div>
          <Button type="submit" pending={pending}>
            Отправить
          </Button>
        </div>
      </div>
    </Form>
  )
}

export default CallACourier
