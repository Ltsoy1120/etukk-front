import {LotDelivery, LotInfoType} from "areas/lot/types"
import ClientAPI, {isValidResponse} from "infrastructure/persistence/api/client"
import {
  getTimes,
  postLotDraft,
} from "infrastructure/persistence/api/data/actions"
import {useEffect} from "react"
import {useMutation} from "react-fetching-library"
import {useLocation, useNavigate} from "react-router-dom"
import {offsetDateDay} from "utils/date.helpers"
import {FileToURLDataBase64} from "utils/file"

import {lotDraftStorage} from "."

export function useDraftNewLot() {
  const navigate = useNavigate()
  const {mutate} = useMutation(postLotDraft)

  async function draft() {
    const files = lotDraftStorage.get<File[]>("files") || []

    const specifications =
      lotDraftStorage.get<LotInfoType["specifications"]>("specifications") || []
    const description =
      lotDraftStorage.get<LotInfoType["description"]>("description") || ""
    const video = lotDraftStorage.get<string>("video") || ""

    const category = lotDraftStorage.get<number>("category") || -1
    const city = lotDraftStorage.get<LotInfoType["city"]>("city") || ""
    const price = lotDraftStorage.get<string>("price") || ""
    const title =
      lotDraftStorage.get<LotInfoType["title"]>("title") || "unknown"
    const date = lotDraftStorage.get<string>("date") || "1"
    const delivery = (lotDraftStorage.get<string>("delivery") ||
      "all") as LotDelivery

    const [startTime, endTime] = await getBiddingTime(+date)
    const {error, payload: responsePayload} = await mutate({
      city: city.slice(0, city.search(",")),
      shipment_address: city,
      categories: [category],
      name: title,
      start_price: Number(price),
      lotspecifications: specifications.map(spec => ({
        value: spec.value,
        name: spec.key,
      })),
      bidding_start_time: startTime.toJSON(),
      bidding_end_time: endTime.toJSON(),
      description: description,
      delivery_options: delivery === LotDelivery.all ? "intercity" : "in_city",
      video_url: video,
      lotphotos: await Promise.all(files.map(FileToURLDataBase64)),

      length: Number(specifications.find(s => s.key === "Длина (м)")?.value),
      width: Number(specifications.find(s => s.key === "Ширина (м)")?.value),
      height: Number(specifications.find(s => s.key === "Высота (м)")?.value),
      weight: Number(specifications.find(s => s.key === "Вес (кг)")?.value),
    })

    if (error) return
    if (responsePayload == null) return

    navigate(`/lots/${responsePayload.id}/preview`)
  }

  return draft
}

export async function getBiddingTime(index: number): Promise<[Date, Date]> {
  const response = await ClientAPI.query(getTimes())
  if (!isValidResponse(response)) throw new Error("Network error")

  const time = response.payload[index]

  return [new Date(time.begin), new Date(time.end)]
}

export function ScrollToTop() {
  const {pathname} = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
