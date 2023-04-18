import QueryContainer from "app/components/containers/QueryContainer/QueryContainer"
import Slider from "app/components/containers/Slider/Slider"
import Backward from "app/components/UI/Backward/Backward"
import Button from "app/components/UI/Button/Button"
import Review from "app/components/UI/Review/Review"
import { Column } from "app/layouts/BaseLayouts/BaseLayouts"
import Buttons from "app/layouts/Buttons/Buttons"
import Entries from "app/layouts/Entries/Entries"
import Entry from "app/layouts/Entries/Entry"
import LotPage from "app/layouts/LotPage/LotPage"
import useParam from "hooks/useParam"
import { getLotByLotId } from "infrastructure/persistence/api/data/actions"
import { mapLot } from "infrastructure/persistence/api/mappings/lots"

function ProfileDisputeView() {
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
          <div>
            <Column gap="2em">
              <Backward>
                <h2 className="heading">Претензия</h2>
              </Backward>
              <Column gap="1em">
                <h4 style={{ margin: "unset" }}>Заявление</h4>
                {payload.seller && (
                  <Review user={payload.seller} attachments={[]} comment="Вообще шлак, на фото такое ощущение другой товар!" date={new Date} product="Дизайнерский стул..." />
                )}
              </Column>
              <Column gap="1em">
                <h4 style={{ margin: "unset" }}>Решение</h4>
                {payload.seller && (
                  <Review user={payload.seller} attachments={[]} comment="Все фото соответствуют описанию. Вснимательнее смотрите на фото перед покупкой твара. Все деффекты описаны и хорошо видны на видео, которое приложено к карточке лота. Ваша претензия отклонена!" date={new Date} />
                )}
              </Column>
              <Buttons spaceBetween>
                <Button outline>Переместить в архив</Button>
              </Buttons>
            </Column>
          </div>
        </LotPage>
      )}
    </QueryContainer >
  )
}

export default ProfileDisputeView
