import QueryContainer from "app/components/containers/QueryContainer/QueryContainer"
import Slider from "app/components/containers/Slider/Slider"
import Author from "app/components/UI/Author/Author"
import Backward from "app/components/UI/Backward/Backward"
import Button from "app/components/UI/Button/Button"
import CountableTimer from "app/components/UI/CountableTimer/CountableTimer"
import { FAQ, FAQClause } from "app/components/UI/FAQ/FAQ"
import Entries from "app/layouts/Entries/Entries"
import Entry from "app/layouts/Entries/Entry"
import LotPage from "app/layouts/LotPage/LotPage"
import { LotInfoType } from "areas/lot/types"
import { IMAGE_MOCKS } from "constants/mocks"
import { getLotByLotId } from "infrastructure/persistence/api/data/actions"
import { mapLot } from "infrastructure/persistence/api/mappings/lots"

interface ProfileStatusLotCoverProps {
  id: number
}

function ProfileStatusLotCover(props: ProfileStatusLotCoverProps) {
  return (
    <QueryContainer action={getLotByLotId(props.id)} mapping={mapLot}>
      {payload => (
        <LotPage spaceAround>
          <div>
            <Slider slides={IMAGE_MOCKS} />
            <FAQ>
              <FAQClause summary="Описание лота">
                {payload.description}
              </FAQClause>
              <FAQClause summary="Характеристики">
                <Entries>
                  {payload.specifications.map(((specification, index) => (
                    <Entry key={index}>
                      <span>{specification.key}</span>
                      <span>{specification.value}</span>
                    </Entry>
                  )))}
                </Entries>
              </FAQClause>
            </FAQ>
          </div>
          <div>
            <Backward>
              <h2 className="heading">{payload.title}</h2>
            </Backward>
            <ProfileStatusLotCoverSwitchableContent lot={payload} />
          </div>
        </LotPage>
      )}
    </QueryContainer>
  )
}

function ProfileStatusLotCoverSwitchableContent(props: { lot: LotInfoType }) {
  const AUTHOR = props.lot.seller && <Author firstName={props.lot.seller.firstName} avatar={props.lot.seller.avatar} city={"" + props.lot.city} />

  // switch (props.lot.status) {
  //   case LotStatus.MODERATION:
  //     return (

  //     )

  //   default:
  //     throw new Error("Unexpected status")
  // }

  return (
    <>
      <Entries>
        {AUTHOR}

        <Entry>
          <span>Сумма выкупа</span>
          <big>11 000 ₽</big>
        </Entry>
        <hr />
        <Entry>
          <em>Претензия на рассмотрении</em>
          <big><CountableTimer until={new Date} /></big>
        </Entry>
      </Entries>
      <div>
        <Button>Посмотреть содержание претензии</Button>
      </div>
    </>
  )
}

export default ProfileStatusLotCover