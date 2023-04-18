import QueryContainer from "app/components/containers/QueryContainer/QueryContainer"
import {QueryErrorCoverBoundary} from "app/components/containers/QueryErrorCoverBoundary/QueryErrorCoverBoundary"
import Button from "app/components/UI/Button/Button"
import ButtonLink from "app/components/UI/Button/ButtonLink"
import Buttons from "app/layouts/Buttons/Buttons"
import LotInfoLayout from "areas/lot/LotInfoLayout/LotInfoLayout"
import useParam from "hooks/useParam"
import {isValidResponse} from "infrastructure/persistence/api/client"
import {
  getLotByLotId,
  getLotDraftByDraftId,
  patchLotByLotIdUnpublish,
  postLotDraftByLotIdModerate,
} from "infrastructure/persistence/api/data/actions"
import {mapLot} from "infrastructure/persistence/api/mappings/lots"
import {useEffect, useState} from "react"
import {useClient} from "react-fetching-library"
import {Helmet} from "react-helmet"
import {useSelector} from "react-redux"
import {useLocation, useNavigate} from "react-router-dom"

import {LocationState} from "./edit/LotEditView"

function LotView() {
  const lotId = useParam("lotId", true)
  const client = useClient()
  const navigate = useNavigate()

  const {state} = useLocation()
  const [lotStatus, setLotStatus] = useState<string>("")

  if (!state) {
    useEffect(() => {
      async function getLotStatus() {
        const response =
          (await client.query(getLotDraftByDraftId(lotId))) ??
          (await client.query(getLotByLotId(lotId)))
        if (!isValidResponse(response)) return
        setLotStatus(response.payload.status)
      }
      getLotStatus()
    }, [])
  } else {
    useEffect(() => {
      const {status} = state as LocationState
      setLotStatus(status)
    }, [])
  }

  const myId = useSelector(state => state.user).id
  const isEditTime = (date: Date) => {
    return Date.now() < date.getTime() - 3600000 // one hour before start
  }

  async function publishNewLot() {
    if (lotId == null) return
    const response = await client.query(postLotDraftByLotIdModerate(+lotId))
    if (!isValidResponse(response)) return
    setLotStatus(response.payload.status ?? "")
    navigate(`/lots/${lotId}`, {state: {status: response.payload.status}})
  }

  async function unpublishNewLot() {
    if (lotId == null) return
    const response = await client.query(patchLotByLotIdUnpublish(+lotId))
    if (!isValidResponse(response)) return
    setLotStatus(response.payload.status ?? "")
    navigate(`/lots/${lotId}`, {state: {status: response.payload.status}})
  }

  return (
    <div className="lot-view">
      <Helmet>
        <title>Просмотр лота | etukk.ru</title>
      </Helmet>
      <QueryErrorCoverBoundary>
        <QueryContainer
          action={
            lotStatus === "drafted"
              ? getLotDraftByDraftId(lotId)
              : getLotByLotId(lotId)
          }
          mapping={mapLot}>
          {payload =>
            payload.user_id !== myId ? (
              <LotInfoLayout {...payload} />
            ) : (
              <LotInfoLayout {...payload}>
                {payload.status === "published" &&
                  isEditTime(payload.startEndInterval.date1) && (
                    <Buttons spaceBetween>
                      <ButtonLink
                        to={`/lots/${lotId}/edit`}
                        state={{status: payload.status}}>
                        Редактировать
                      </ButtonLink>
                      <Button outline await onClick={unpublishNewLot}>
                        Снять с публикации
                      </Button>
                    </Buttons>
                  )}
                {(payload.status === "drafted" ||
                  payload.status === "closed" ||
                  payload.archived) &&
                  (isEditTime(payload.startEndInterval.date1) ? (
                    <Buttons spaceBetween>
                      <ButtonLink
                        to={`/lots/${lotId}/edit`}
                        state={{status: payload.status}}>
                        Редактировать
                      </ButtonLink>
                      <Button outline await onClick={publishNewLot}>
                        Опубликовать
                      </Button>
                    </Buttons>
                  ) : payload.status !== "sold" &&
                    payload.status !== "closed" &&
                    !payload.archived ? (
                    <Buttons spaceBetween>
                      <ButtonLink
                        to={`/lots/${lotId}/edit`}
                        state={{status: payload.status}}>
                        Редактировать
                      </ButtonLink>
                    </Buttons>
                  ) : null)}
              </LotInfoLayout>
            )
          }
        </QueryContainer>
      </QueryErrorCoverBoundary>
    </div>
  )
}

export default LotView
