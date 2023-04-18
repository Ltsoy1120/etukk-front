import QueryContainer from "app/components/containers/QueryContainer/QueryContainer"
import Slider from "app/components/containers/Slider/Slider"
import Author from "app/components/UI/Author/Author"
import Backward from "app/components/UI/Backward/Backward"
import ButtonLink from "app/components/UI/Button/ButtonLink"
import CountableTimer from "app/components/UI/CountableTimer/CountableTimer"
import { Column } from "app/layouts/BaseLayouts/BaseLayouts"
import Buttons from "app/layouts/Buttons/Buttons"
import Entries from "app/layouts/Entries/Entries"
import Entry from "app/layouts/Entries/Entry"
import LotPage from "app/layouts/LotPage/LotPage"
import useParam from "hooks/useParam"
import { getLotByLotId } from "infrastructure/persistence/api/data/actions"
import { mapLot } from "infrastructure/persistence/api/mappings/lots"
import { offsetDateDay } from "utils/date.helpers"

function ProfileSeeDisputeView() {
  const lotId = useParam("lotId", true)

  return (
    <QueryContainer action={getLotByLotId(lotId)} mapping={mapLot}>
      {payload => (
        <LotPage spaceAround>
          <div>
            <Slider slides={payload.slides} />
            <h5>Описание лота</h5>
            <p className="lot-info-summary__description">{payload.description}</p>
            <h5>Характеристики</h5>
            <Entries>
              {payload.specifications.map(((specification, index) => (
                <Entry key={index}>
                  <span>{specification.key}</span>
                  <span>{specification.value}</span>
                </Entry>
              )))}
            </Entries>
          </div>
          <Column gap="2em">
            <Backward>{payload.title}</Backward>
            {payload.seller && (
              <Author {...payload.seller} />
            )}
            <Entries>
              <Entry>
                <span>Сумма выкупа</span>
                <big>{payload.currentPrice.format()}</big>
              </Entry>
              <hr />
              <Entry>
                <em>Претензия на рассмотрении</em>
                <big><CountableTimer until={offsetDateDay(new Date, 2)} slice={[1]} /></big>
              </Entry>
            </Entries>
            <Buttons spaceBetween>
              <ButtonLink to="../dispute/123">Посмотреть содержание претензии</ButtonLink>
            </Buttons>
          </Column>
        </LotPage>
      )}
    </QueryContainer>
  )
}

export default ProfileSeeDisputeView
