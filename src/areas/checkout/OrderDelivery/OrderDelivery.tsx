import "./OrderDelivery.scss"

import QueryContainer from "app/components/containers/QueryContainer/QueryContainer"
import Backward from "app/components/UI/Backward/Backward"
import Button from "app/components/UI/Button/Button"
import CountableTimer from "app/components/UI/CountableTimer/CountableTimer"
import Input from "app/components/UI/Input/Input"
import InputAddress from "app/components/UI/Input/InputAddress"
import Textarea from "app/components/UI/Textarea/Textarea"
import {Row} from "app/layouts/BaseLayouts/BaseLayouts"
import Entry from "app/layouts/Entries/Entry"
import Form, {FormState} from "app/layouts/Form/Form"
import {LotInfoType} from "areas/lot/types"
import {isValidResponse} from "infrastructure/persistence/api/client"
import {
  getDeliveryTimers,
  postLotByLotCalcDelivery,
} from "infrastructure/persistence/api/data/actions"
import {useEffect, useState} from "react"
import {useClient} from "react-fetching-library"
import {inputValue} from "utils/common"
import {offsetDateMinutes} from "utils/date.helpers"
import {Price} from "utils/extensions"

export enum OrderDeliveryFormInputs {
  date = "date",
  timeStart = "timeStart",
  timeEnd = "timeEnd",
  address = "address",
  phone = "phone",
  comment = "comment",
}

interface OrderDeliveryProps {
  lot: LotInfoType
  tax: number

  onSubmit?(
    values: FormState<OrderDeliveryFormInputs, string>["values"]
  ): Promise<void>
}

function OrderDelivery(props: OrderDeliveryProps) {
  const [pending, setPending] = useState(false)
  async function onSubmit(state: FormState<OrderDeliveryFormInputs, string>) {
    setPending(true)
    await props.onSubmit?.(state.values)
    setPending(false)
  }

  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [deliveryPrice, setDeliveryPrice] = useState(0)
  const [commission, setCommission] = useState(0)
  const client = useClient()

  useEffect(() => {
    if (deliveryAddress.length === 0) return
    ;(async () => {
      const response = await client.query(
        postLotByLotCalcDelivery(props.lot.id, {
          delivery_address: deliveryAddress,
        })
      )
      if (!isValidResponse(response)) return

      setDeliveryPrice(response.payload.delivery_price)
      setCommission(response.payload.service_commission)
    })()
  }, [deliveryAddress])

  // const nowDate = new Date()
  // const nowDateYear = nowDate.getFullYear()
  // const nowDateMonth = nowDate.toLocaleString("ru", {month: "2-digit"})
  // const nowDateDay = nowDate.toLocaleString("ru", {day: "2-digit"})

  const nowDate = new Date()
  const tomorrow = nowDate.setDate(nowDate.getDate() + 1)
  const nowDateYear = new Date(tomorrow).getFullYear()
  const nowDateMonth = new Date(tomorrow).toLocaleString("ru", {
    month: "2-digit",
  })
  const nowDateDay = new Date(tomorrow).toLocaleString("ru", {day: "2-digit"})

  const totalPrice =
    props.lot.currentPrice.valueOf() + commission + deliveryPrice

  return (
    <Form className="order-delivery" onSubmit={onSubmit}>
      <div className="order-delivery__header">
        <Backward>ОФОРМИТЬ ДОСТАВКУ И ОПЛАТИТЬ</Backward>
        <QueryContainer action={getDeliveryTimers()}>
          {payload => (
            <time className="order-delivery__time">
              <CountableTimer
                until={offsetDateMinutes(
                  props.lot.editedAt,
                  payload.find(p => p.type === "fill_delivery")?.value ?? 0
                )}
                slice={[2]}
              />
            </time>
          )}
        </QueryContainer>
      </div>
      <div className="order-delivery__column">
        <Entry>
          <span>
            Стоимость лота <br /> по результатам торгов
          </span>
          <big>{props.lot.currentPrice.format()}</big>
        </Entry>
        <hr />
        <Entry>
          <span>
            “Безопасная сделка” <br /> и комиссия площадки
          </span>
          <big>{Price.format(commission)}</big>
        </Entry>
        <hr />
      </div>
      <p className="order-delivery__text">
        Для расчета стоимости доставки заполните следующие поля.
        <br />
        Внимание! Пожалуйста укажите актуальные дату, время, адрес и номер
        телефона. После нажатия кнопки “оплатить”,они будут переданы службу
        доставки.
        <br />
      </p>
      <div className="order-delivery__inputs">
        <Input
          type="date"
          defaultValue={`${nowDateYear}-${nowDateMonth}-${nowDateDay}`}
          name={OrderDeliveryFormInputs.date}
          required
          placeholder="Дата забора груза"
        />
        <Row>
          <Input
            type="time"
            name={OrderDeliveryFormInputs.timeStart}
            required
            placeholder="Время забора груза c"
          />
          <Input
            type="time"
            name={OrderDeliveryFormInputs.timeEnd}
            required
            placeholder="Время забора по"
          />
        </Row>
        <InputAddress
          name={OrderDeliveryFormInputs.address}
          required
          placeholder="Адрес доставки"
          onChange={inputValue(setDeliveryAddress)}
        />
        <Input
          type="tel"
          name={OrderDeliveryFormInputs.phone}
          required
          placeholder="Номер телефона"
          defaultValue="+7"
        />
        <Textarea
          rows={10}
          name={OrderDeliveryFormInputs.comment}
          placeholder="Комментарий"
        />
      </div>
      <div className="order-delivery__column">
        <Entry>
          <span>Стоимость доставки лота по указанному адресу</span>
          <big>{Price.format(deliveryPrice)}</big>
        </Entry>
        <hr />
        <Entry>
          <big style={{color: "#333"}}>ИТОГО К ОПЛАТЕ</big>
          <big>{Price.format(totalPrice)}</big>
        </Entry>
      </div>
      <div>
        <Button type="submit" pending={pending}>
          Оплатить
        </Button>
      </div>
    </Form>
  )
}

export default OrderDelivery
