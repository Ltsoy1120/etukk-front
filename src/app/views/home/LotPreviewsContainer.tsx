import ErrorCover from "app/components/UI/ErrorCover/ErrorCover"
import LoaderCover from "app/components/UI/Loader/LoaderCover"
import Previews from "app/layouts/Previews/Previews"
import LotPreview from "areas/lot/LotPreview/LotPreview"
import {LotDelivery, LotPreviewType, LotStatus} from "areas/lot/types"
import useScrollReach from "hooks/useScrollReach"
import {isValidResponse} from "infrastructure/persistence/api/client"
import {getLot} from "infrastructure/persistence/api/data/actions"
import {mapLotsLists} from "infrastructure/persistence/api/mappings/lots"
import TemporaryStorage from "infrastructure/persistence/TemporaryStorage"
import {FilteringField} from "interfaces/Nodejs"
import {useEffect, useState} from "react"
import {QueryError, useQuery} from "react-fetching-library"
import {useSelector} from "react-redux"
import {toBase64} from "utils/common"

import {filterStorage} from "."

interface LotPreviewsContainerProps {
  search?: string
  price?: [number, number] // [min, max]
  categories?: number
  seller?: "all" | "user" | "organization"
  delivery?: LotDelivery
  tradeStart?: string
  tradeEnd?: string
  started?: "started" | "ended" | "waiting"
}

function LotPreviewsContainer(props: LotPreviewsContainerProps) {
  const [page, setPage] = useState(1)
  const [pageSize] = useState(12)

  const [endTime] = useState(new Date().toISOString())

  // Filters map
  const filters: Partial<
    FilteringField<"name", "icontains", string> &
      FilteringField<"now_price", "range", [number, number]> &
      // & FilteringField<"categories_id", "iexact", number[]>

      // & FilteringField<"user__organization", "iexact", boolean>
      FilteringField<"delivery_options", "iexact", LotDelivery> &
      FilteringField<"bidding_start_time" | "bidding_end_time", "gte", string> &
      FilteringField<"bidding_start_time" | "bidding_end_time", "lte", string> &
      FilteringField<"status", "not", string> &
      FilteringField<"trade_status", "iexact", string> &
      FilteringField<"user_id", "not", number> & {
        categories: number
        status: string
        user__organization: string | boolean
      }
  > = {
    name__icontains: props.search,
    now_price__range: props.price,
    categories: props.categories,

    // organization__iexact: props.seller != null && props.seller === "organization",
    user__organization:
      props.seller != null && String(props.seller === "organization"),
    delivery_options__iexact: props.delivery,

    // bidding_start_time__gte: new Date().toISOString(),
    bidding_end_time__gte: endTime,
    bidding_start_time__lte:
      props.started && props.started === "started" ? endTime : undefined,
    bidding_start_time__gte: props.tradeStart
      ? new Date(props.tradeStart).toISOString()
      : props.started && props.started === "waiting"
      ? endTime
      : undefined,
    bidding_end_time__lte:
      props.tradeEnd && new Date(props.tradeEnd).toISOString(),

    status: LotStatus.PUBLISHED,
    // status__not: LotStatus.CLOSED,

    // trade_status__iexact: props.started

    // user_id__not: user.auth ? user.id : -1,  // исключает свои лоты
  }

  const [lots, setLots] = useState<LotPreviewType[]>([])
  const response = useQuery(getLot(pageSize, (page - 1) * pageSize, filters))
  const {error, loading, payload} = response
  if (error)
    throw new QueryError(
      "Error during sending request or handling response.",
      response
    )

  const scrollReachDisabled =
    loading || !isValidResponse(response) || response.payload.length === 0
  const [reached, resetReached] = useScrollReach(
    scrollReachDisabled,
    window.innerHeight / 4
  )

  useEffect(() => {
    if (page > 1) {
      setPage(1)
    }
    setLots([])
  }, [toBase64(filters)])

  useEffect(() => {
    if (scrollReachDisabled) return
    if (!reached) return

    setPage(page => page + 1)
  }, [reached])

  useEffect(() => {
    if (payload == null) return
    const mappedPayload = mapLotsLists(payload)
    // console.log(mappedPayload)

    setLots(lots => [...lots, ...mappedPayload.items])
    setTimeout(() => resetReached())
  }, [payload])

  if (lots.length === 0 && !loading) {
    return (
      <ErrorCover>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        Поиск не дал результатов.. Возможно стоит изменить параметры поиска
      </ErrorCover>
    )
  }
  return (
    <Previews>
      {lots.map(lot => (
        <LotPreview {...lot} lookalike key={lot.id} />
      ))}
      {loading && <LoaderCover absolute />}
    </Previews>
  )
}

export default LotPreviewsContainer
