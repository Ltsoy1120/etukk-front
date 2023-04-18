import "./LotEditView.scss"

import {ReactError} from "app/components/containers/ErrorBoundary/ErrorBoundary.errors"
import QueryContainer from "app/components/containers/QueryContainer/QueryContainer"
import Backward from "app/components/UI/Backward/Backward"
import Button from "app/components/UI/Button/Button"
import ChooseImage from "app/components/UI/ChooseImage/ChooseImage"
import CloseButton from "app/components/UI/CloseButton/CloseButton"
import ErrorCover from "app/components/UI/ErrorCover/ErrorCover"
import Icon from "app/components/UI/Icon/Icon"
import Input from "app/components/UI/Input/Input"
import InputAddress from "app/components/UI/Input/InputAddress"
import Radio from "app/components/UI/Radio/Radio"
import Selector from "app/components/UI/Selector/Selector"
import Textarea from "app/components/UI/Textarea/Textarea"
import Form, {FormState} from "app/layouts/Form/Form"
import {getBiddingTime} from "app/views/lot-new/edit/helpers"
import {SpecificationType} from "areas/lot/components/Specifications/Specifications"
import {LotDelivery} from "areas/lot/types"
import {
  deleteLotDraftByLotIdSpecificationBySpecificationId,
  getLotByLotId,
  getLotDraftByDraftId,
  getTimes,
  patchLotById,
  patchLotDraftByDraftId,
} from "infrastructure/persistence/api/data/actions"
import {SchemaLotDeliveryOptions} from "infrastructure/persistence/api/data/schemas"
import {mapLot} from "infrastructure/persistence/api/mappings/lots"
import {MutableRefObject, ReactNode, useEffect, useRef, useState} from "react"
import {useClient} from "react-fetching-library"
import {Helmet} from "react-helmet"
import {useSelector} from "react-redux"
import {useNavigate, useParams} from "react-router"
import {useLocation} from "react-router-dom"
import {humanizeDate} from "utils/date"
import {FileToURLDataBase64} from "utils/file"

enum FormInputs {
  title = "name",
  images = "lotphotos",
  video = "video_url",
  startPrice = "start_price",
  // publicationPeriod = "trading_start",
  shipment_address = "shipment_address",
  date = "date",
  delivery = "delivery_options",
  description = "description",
  specifications = "specifications",
  category = "categories",

  biddingStartTime = "bidding_start_time",
  biddingEndTime = "bidding_end_time",
}

interface FormValues {
  name: string
  description: string
  start_price: number
  categories: number[] | number
  shipment_address: string
  date: string
  delivery_options: SchemaLotDeliveryOptions
  bidding_start_time: string
  bidding_end_time: string
  video_url: string
  lotphotos: string[]
  specifications: [{id?: string; name: string; value: string}]
}

export type LocationState = {status: string}

function LotEditView() {
  const {lotId} = useParams()
  if (lotId == null) {
    throw new ReactError(LotEditView, "got no lotId")
  }
  if (isNaN(+lotId)) {
    throw new ReactError(LotEditView, "lotId is not number")
  }
  const [newSpecifications, setNewSpecifications] = useState<
    SpecificationType[]
  >([])
  const {state} = useLocation()
  const {status} = state as LocationState
  const [files, setFiles] = useState<File[]>([])
  const navigate = useNavigate()
  const client = useClient()
  const formRef = useRef<HTMLFormElement | null>(null)
  const user = useSelector(state => state.user)
  if (!user.auth) return null

  useEffect(() => {
    async function getLotSpecifications() {
      const {payload} =
        status === "drafted"
          ? await client.query(getLotDraftByDraftId(Number(lotId)))
          : await client.query(getLotByLotId(Number(lotId)))
      const lotspecifications = payload?.lotspecifications
        ?.map(spec => ({
          id: spec.id,
          key: spec.name,
          value: spec.value,
        }))
        .sort(function (a, b) {
          if (a.id && b.id && a.id > b.id) {
            return 1
          }
          if (a.id && b.id && a.id < b.id) {
            return -1
          }
          return 0
        })
      lotspecifications && setNewSpecifications(lotspecifications)
    }
    getLotSpecifications()
  }, [])

  async function onSubmit(state: FormState<FormInputs, FormValues>) {
    const photos = await Promise.all([...files].map(FileToURLDataBase64))
    if (photos[0]) {
      state.values.lotphotos = photos
    }
    console.log("onSubmit", state)

    if (lotId == null) return

    const {error, payload} =
      status === "published"
        ? await client.query(patchLotById(+lotId, state.values))
        : await client.query(patchLotDraftByDraftId(+lotId, state.values))

    if (error) return

    navigate(`/lots/${lotId}`, {state: {status: payload?.status}})
  }

  function addSpecification(key: string, value: string) {
    const id = Date.now()
    setNewSpecifications(state => [...state, {id, key, value}])
  }

  async function removeSpecification(index: number, specificationId: number) {
    if (lotId == null) return
    if (specificationId) {
      const {error} = await client.query(
        deleteLotDraftByLotIdSpecificationBySpecificationId(
          +specificationId,
          +lotId
        )
      )
      if (error) return
    }

    const removedSpecifications = newSpecifications.filter(
      spec => spec.id !== specificationId
    )
    setNewSpecifications(removedSpecifications)
  }

  return (
    <>
      <Helmet>
        <title>Редактировать лот | etukk.ru</title>
      </Helmet>
      <QueryContainer
        action={getLotDraftByDraftId(Number(lotId))}
        mapping={mapLot}>
        {payload => {
          if (payload.user_id !== user.id)
            return <ErrorCover>Это не ваш лот</ErrorCover>

          return (
            <Form
              className="lot-edit-view"
              onSubmit={onSubmit}
              formRef={formRef}>
              <div className="lot-edit-view__header">
                <h2 className="heading">Редактировать лот</h2>
                <Backward />
              </div>
              <div className="lot-edit-view__container">
                <LotEditSetting label="Название лота">
                  <Input
                    width="18em"
                    placeholder="Название лота"
                    defaultValue={payload.title}
                    name={FormInputs.title}
                  />
                  {/* <InputResetButton
                    name={FormInputs.title}
                    in={formRef}
                    defaultValue={payload.title}
                  /> */}
                </LotEditSetting>
                <LotEditSetting label="Фото (минимум 4 шт.)">
                  <ChooseImage
                    defaultValue={payload.slidesWithId}
                    name={FormInputs.images}
                    onChange={setFiles}
                  />
                </LotEditSetting>
                <LotEditSetting label="Видео">
                  <Input
                    placeholder="Ссылка на видео..."
                    width="33.5em"
                    defaultValue={payload.video}
                    name={FormInputs.video}
                  />
                </LotEditSetting>
                <LotEditSetting label="Начальная стоимость">
                  <Input
                    width="16em"
                    type="number"
                    placeholder="Введите  сумму..."
                    iconName="rub"
                    name={FormInputs.startPrice}
                    defaultValue={+payload.startPrice}
                  />
                  {/* <InputResetButton
                    name={FormInputs.startPrice}
                    in={formRef}
                    defaultValue={+payload.startPrice}
                  /> */}
                </LotEditSetting>
                <LotEditSetting
                  label="Период публикации лота и проведения торгов"
                  className="lot-edit-setting__column">
                  <QueryContainer action={getTimes()}>
                    {payload => (
                      <>
                        {payload.map((time, index) => (
                          <div key={index}>
                            <Radio
                              name={FormInputs.date}
                              value={index.toString()}>
                              {new Date().getDate() ===
                              new Date(time.begin).getDate()
                                ? "Сегодня"
                                : new Date().getDate() + 1 ===
                                  new Date(time.begin).getDate()
                                ? "Завтра"
                                : "Послезавтра"}{" "}
                              {humanizeDate(new Date(time.begin))} -{" "}
                              {new Date(time.end).toLocaleString("ru", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </Radio>

                            <br />
                          </div>
                        ))}
                      </>
                    )}
                  </QueryContainer>
                </LotEditSetting>
                <LotEditSetting label="Укажите полный адрес отправки...">
                  <InputAddress
                    width="16em"
                    placeholder="Укажите полный адрес отправки..."
                    name={FormInputs.shipment_address}
                    defaultValue={
                      payload.shipment_address ?? payload.city
                    }></InputAddress>
                </LotEditSetting>
                <LotEditSetting label="Вариант доставки">
                  <Selector
                    width="16em"
                    defaultValue={payload.delivery}
                    name={FormInputs.delivery}>
                    <option value={LotDelivery.all}>Доставка в регионы</option>
                    <option value={LotDelivery.local}>
                      Доставка по городу продажи
                    </option>
                  </Selector>
                </LotEditSetting>
                <LotEditSetting label="Описание лота">
                  <Textarea
                    width="33.5em"
                    rows={16}
                    name={FormInputs.description}
                    defaultValue={payload.description}
                  />
                  <InputResetButton
                    name={FormInputs.description}
                    in={formRef}
                    defaultValue={payload.description}
                  />
                </LotEditSetting>
                <LotEditSetting label="Характеристики">
                  <div className="specifications">
                    <div className="specifications__container">
                      {newSpecifications.map((specification, index) => (
                        <div
                          className="specifications__specification"
                          key={index}>
                          <Input
                            width="15em"
                            placeholder="Название..."
                            required={index < 4 ? true : false}
                            id={String(specification.id)}
                            name={`${FormInputs.specifications}[${index}].key`}
                            disabled={index < 4 ? true : false}
                            defaultValue={specification.key}
                          />
                          <Input
                            placeholder="Значение..."
                            required={index < 4 ? true : false}
                            id={String(specification.id)}
                            name={`${FormInputs.specifications}[${index}].value`}
                            type={index < 4 ? "number" : undefined}
                            step="0.001"
                            max={
                              index === 0
                                ? "2.6"
                                : index === 1
                                ? "1.3"
                                : index === 2
                                ? "1.5"
                                : index === 3
                                ? "1400"
                                : undefined
                            }
                            min={index < 4 ? "0.01" : undefined}
                            width="15em"
                            defaultValue={specification.value}
                          />
                          {index > 3 && (
                            <CloseButton
                              onClick={() =>
                                removeSpecification(
                                  index,
                                  specification.id as number
                                )
                              }
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    {newSpecifications.length < 10 && (
                      <button
                        className="specifications__add"
                        type="button"
                        onClick={() => addSpecification("", "")}>
                        <div className="specifications__text">
                          Добавить характеристику
                        </div>
                        <div className="specifications__circle">
                          <Icon className="specifications__icon" name="plus" />
                        </div>
                      </button>
                    )}
                  </div>
                </LotEditSetting>
              </div>
              <div className="lot-edit-view__buttons">
                <Button type="submit">Сохранить</Button>
                <Button type="reset" outline>
                  Отмена
                </Button>
              </div>
            </Form>
          )
        }}
      </QueryContainer>
    </>
  )
}

interface InputResetButtonProps {
  name: string
  in: MutableRefObject<HTMLFormElement | null | undefined>

  defaultValue: unknown
}

function InputResetButton(props: InputResetButtonProps) {
  function onClick() {
    if (props.in.current == null) return
    const inputElement = props.in.current.elements.namedItem(props.name)
    if (!(inputElement instanceof HTMLInputElement)) return

    inputElement.value = String(props.defaultValue)
  }
  return <CloseButton onClick={onClick} />
}

interface LotEditSettingProps {
  label: string
  className?: string
  children: ReactNode
}

function LotEditSetting(props: LotEditSettingProps) {
  return (
    <div className="lot-edit-setting">
      <div className="lot-edit-setting__label">{props.label}</div>
      <div
        className={
          props.className ? props.className : "lot-edit-setting__container"
        }>
        {props.children}
      </div>
    </div>
  )
}

// interface AwaitPromiseProps<T> {
//   state: Promise<T>
//   children: (result: T) => ReactNode
// }

// function AwaitPromise<T>(props: AwaitPromiseProps<T>) {
//   const [result, setResult] = useState<T | null>(null)

//   useEffect(() => {
//     async function awaitPromises() {
//       // if (props.state instanceof Array) {
//       //   return await Promise.all(props.state)
//       // }
//       return await props.state
//     }

//     awaitPromises().then(setResult)
//   }, [props.children])

//   if (result === null) return <Loader />
//   return <>{props.children(result)}</>
// }

export default LotEditView
