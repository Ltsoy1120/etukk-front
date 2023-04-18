import {ReactError} from "app/components/containers/ErrorBoundary/ErrorBoundary.errors"
import QueryContainer from "app/components/containers/QueryContainer/QueryContainer"
import Button from "app/components/UI/Button/Button"
import Buttons from "app/layouts/Buttons/Buttons"
import {lotDraftStorage} from "app/views/lot-new/edit"
import LotInfoLayout from "areas/lot/LotInfoLayout/LotInfoLayout"
import {LotPreviewType} from "areas/lot/types"
import {isValidResponse} from "infrastructure/persistence/api/client"
import {
  getLotDraftByDraftId,
  patchLotDraftByDraftId,
  postLotDraftByLotIdModerate,
} from "infrastructure/persistence/api/data/actions"
import {mapLot} from "infrastructure/persistence/api/mappings/lots"
import {useClient} from "react-fetching-library"
import {Helmet} from "react-helmet"
import {useSelector} from "react-redux"
import {useNavigate, useParams} from "react-router-dom"

function LotPreviewView() {
  const {lotId} = useParams()
  if (lotId == null) {
    throw new ReactError(LotPreviewView, "got no lotId")
  }
  if (isNaN(+lotId)) {
    throw new ReactError(LotPreviewView, "lotId is not number")
  }

  const user = useSelector(state => state.user)
  if (!user.auth) return null

  const client = useClient()
  const navigate = useNavigate()

  async function publishNewLot(status: string) {
    if (lotId == null) return

    const response = await client.query(postLotDraftByLotIdModerate(+lotId))
    if (!isValidResponse(response)) return

    navigate(`/lots/${lotId}`, {state: {status: response.payload.status}})
    lotDraftStorage.clear()
  }
  async function saveDraft(payload: LotPreviewType) {
    if (lotId == null) return
    const response = await client.query(patchLotDraftByDraftId(+lotId, payload))
    if (!isValidResponse(response)) return

    navigate(`/lots/${lotId}`, {state: {status: response.payload.status}})
    lotDraftStorage.clear()
  }

  return (
    <>
      <Helmet>
        <title>Просмотр лота перед публикацией | etukk.ru</title>
      </Helmet>
      <QueryContainer action={getLotDraftByDraftId(+lotId)} mapping={mapLot}>
        {payload => (
          <>
            <h2 className="heading">Просмотр лота перед публикацией</h2>
            <LotInfoLayout {...payload} seller={user}>
              <Buttons spaceBetween>
                <Button await onClick={() => publishNewLot(payload.status)}>
                  Опубликовать
                </Button>
                <Button outline onClick={() => saveDraft(payload)}>
                  Сохранить черновик
                </Button>
              </Buttons>
            </LotInfoLayout>
          </>
        )}
      </QueryContainer>
    </>
  )
}

export default LotPreviewView
