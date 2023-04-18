import RequiredAuthCover from "app/components/containers/QueryContainer/RequiredAuthCover"
import Backward from "app/components/UI/Backward/Backward"
import Button from "app/components/UI/Button/Button"
import ButtonLink from "app/components/UI/Button/ButtonLink"
import Buttons from "app/layouts/Buttons/Buttons"
import ViewNarrow from "app/layouts/ViewNarrow/ViewNarrow"
import EditLotCategory from "app/views/lot-new/edit/EditLotCategory"
import TemporaryStorage from "infrastructure/persistence/TemporaryStorage"
import {useEffect, useState} from "react"
import {Helmet} from "react-helmet"
import {useSelector} from "react-redux"
import {Route, Routes} from "react-router"
import {useParams} from "react-router"
import {isDictionary} from "utils/common"

import EditLotDescription from "./EditLotDescription"
import EditLotFiles from "./EditLotFiles"
import EditLotName from "./EditLotName"
import EditLotSpecifications from "./EditLotSpecifications"
import EditLotTrade from "./EditLotTrade"
import {ScrollToTop, useDraftNewLot} from "./helpers"

export const lotDraftStorage = new TemporaryStorage("lot-new")
const lotDraftEditSectionsOrder = [
  "",
  "title",
  "specifications",
  "description",
  "files",
  "trade",
] as const

type Fields =
  | "date"
  | "category"
  | "title"
  | "description"
  | "files"
  | "price"
  | "city"
  | "specifications"

function LotDraftView() {
  const [, setFlag] = useState(false)

  const params = useParams<"*">()
  /**
   *
   * @returns index of the current section
   */
  function getCurrentPosition() {
    const anyParam = params["*"] as never

    if (!anyParam) return 0
    if (!lotDraftEditSectionsOrder.includes(anyParam)) return 0

    return lotDraftEditSectionsOrder.indexOf(anyParam)
  }

  const currentPosition = getCurrentPosition()
  /**
   *
   * @param by shift by this value
   * @returns next section route
   */
  function getRouteBy(by: -1 | 1) {
    const shiftedPosition = currentPosition + by
    // console.log(by, shiftedPosition)
    return lotDraftEditSectionsOrder[shiftedPosition] || ""
  }

  const prevRoute = getRouteBy(-1)
  const nextRoute = getRouteBy(1)

  const isCurrentRouteBase = currentPosition === 0
  const isCurrentRouteLast =
    currentPosition === lotDraftEditSectionsOrder.length - 1

  const draftLot = useDraftNewLot()

  function validate(key: Fields): boolean {
    const value = lotDraftStorage.get(key)
    if (value == null || value == undefined) return false

    switch (key) {
      case "title": {
        if (typeof value !== "string") return false
        if (!/[a-zа-яё]/i.test(value)) return false

        return value.length >= 5 && value.length <= 40
      }
      case "category": {
        // if (typeof value !== "string") return false
        return true
      }
      case "specifications": {
        if (!(value instanceof Array)) return false

        if (value.length < 4) return false

        return value.every(item => {
          if (!isDictionary(item)) return false

          if (typeof item.key !== "string") return false
          if (typeof item.value !== "string") return false

          if (item.key.length === 0) return false
          if (item.value.length === 0) return false

          if (
            Number(item.id) === 0 &&
            (Number(item.value) > 2.6 || Number(item.value) < 0.001)
          )
            return false
          if (
            Number(item.id) === 1 &&
            (Number(item.value) > 1.3 || Number(item.value) < 0.001)
          )
            return false
          if (
            Number(item.id) === 2 &&
            (Number(item.value) > 1.5 || Number(item.value) < 0.001)
          )
            return false
          if (
            Number(item.id) === 3 &&
            (Number(item.value) > 1400 || Number(item.value) < 0.001)
          )
            return false
          return true
        })
      }
      case "files": {
        let video
        if (value instanceof Array && !value[0]) {
          video = lotDraftStorage.get("video")
        }
        if (
          !(value instanceof Array) &&
          typeof video !== "string" &&
          video === ""
        )
          return false

        return value instanceof Array && value.length >= 4
      }
      case "city": {
        if (typeof value !== "string") return false
        if (!/^([^,]*,){2,5}[^,]*$/.test(value)) return false
        if (!/^(?=.*[0-9])/g.test(value)) return false
        return true
      }

      default:
        return String(value).length > 0
    }
  }
  function validateAll(...keys: Fields[]) {
    const isVal = keys.every(key => validate(key))
    return isVal
  }
  const currentStateKey = (params["*"] || "category") as never
  const nextButtonDisabled = !validate(currentStateKey)
  const previewButtonDisabled = !validateAll(
    "date",
    "category",
    "title",
    "description",
    "files",
    "price",
    "city",
    "specifications"
  )
  useEffect(() => {
    const remove = lotDraftStorage.on(() => {
      setFlag(flag => !flag)
    })

    return () => {
      remove()
    }
  }, [])

  const user = useSelector(state => state.user)
  if (!user.auth) {
    return <RequiredAuthCover />
  }

  return (
    <ViewNarrow>
      <div>
        <Helmet>
          <title>Разместить лот | etukk.ru</title>
        </Helmet>
        <h2 className="heading">Разместить лот</h2>
        <Routes>
          <Route index element={<EditLotCategory />} />
          <Route path="title" element={<EditLotName />} />
          <Route path="specifications" element={<EditLotSpecifications />} />
          <Route path="description" element={<EditLotDescription />} />
          <Route path="files" element={<EditLotFiles />} />
          <Route path="trade" element={<EditLotTrade />} />
        </Routes>
        <ScrollToTop />
      </div>
      <Buttons spaceBetween>
        {isCurrentRouteBase && <div />}
        {!isCurrentRouteBase && <Backward to={prevRoute} />}
        {!isCurrentRouteLast && (
          <ButtonLink to={nextRoute} disabled={nextButtonDisabled}>
            Далее
          </ButtonLink>
        )}
        {!isCurrentRouteBase && isCurrentRouteLast && (
          <Button await onClick={draftLot} disabled={previewButtonDisabled}>
            Предпросмотр
          </Button>
        )}
      </Buttons>
      {/* <Quote author="В.И. Ленин">
        <p>Проблема цитат в интернете в том, что люди безоговорочно верят в их подлинность</p>
      </Quote> */}
    </ViewNarrow>
  )
}

export default LotDraftView
