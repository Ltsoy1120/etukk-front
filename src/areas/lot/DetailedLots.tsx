import QueryContainer from "app/components/containers/QueryContainer/QueryContainer"
import Button from "app/components/UI/Button/Button"
import Details from "app/components/UI/Details/Details"
import Previews from "app/layouts/Previews/Previews"
import SubjectLog from "app/layouts/SubjectLog/SubjectLog"
import LotPreview from "areas/lot/LotPreview/LotPreview"
import { getUserNotificationsByNotificationsId } from "infrastructure/persistence/api/data/actions"
import { useState } from "react"
import { Link } from "react-router-dom"

import { LotPreviewType } from "./types"

interface LotNotification {
  id: number
  lot: LotPreviewType
}

interface DetailedLotsProps {
  notifications: LotNotification[]
}

function DetailedLots(props: DetailedLotsProps) {
  const [expandedLot, setExpandedLot] = useState<LotPreviewType | null>(null)
  function onSellerClick(lot: LotPreviewType) {
    setExpandedLot(lot)
  }

  if (expandedLot === null) {
    return (
      <Previews>
        {props.notifications.map(notification => (
          <button type="button" key={notification.lot.id}>
            <LotPreview {...notification.lot} onClick={() => onSellerClick(notification.lot)} />
          </button>
        ))}
      </Previews>
    )
  }

  const subject = (
    <>
      <LotPreview {...expandedLot} />
      <br />
      <Button>Отписаться</Button>
    </>
  )

  return (
    <QueryContainer action={getUserNotificationsByNotificationsId()}>
      {payload => (
        <SubjectLog subject={subject} onBackward={() => setExpandedLot(null)}>

          <Details date={new Date} summary={
            <>Продавец разместил новый лот в категории <Link to="/catalog">Мебель</Link></>
          }>
            {/* <SellerPreview {...{
              id: 1,
              avatar: IMAGE_MOCKS[0],
              name: "ИП ПОВЕЛИТЕЛЬ МЕБЕЛИ и мира в целом",
              city: "Москва",
              likes: 5,
              dislikes: 1
            }} /> */}
          </Details>
        </SubjectLog>
      )}
    </QueryContainer>
  )
}


function DetailedLotContainer() {
  return null
  // return (
  //   <QueryContainer action={getGetLotsByIdDetail(1)}>
  //     {payload => (
  //       <SubjectLog subject={subject} onBackward={() => setExpandedLot(null)}>

  //         <Details date={new Date} summary={
  //           <>Продавец разместил новый лот в категории <Link to="/catalog">Мебель</Link></>
  //         }>
  //           <SellerPreview {...{
  //             id: 1,
  //             avatar: IMAGE_MOCKS[0],
  //             name: "ИП ПОВЕЛИТЕЛЬ МЕБЕЛИ и мира в целом",
  //             city: "Москва",
  //             likes: 5,
  //             dislikes: 1
  //           }} />
  //         </Details>
  //       </SubjectLog>
  //     )}
  //   </QueryContainer>
  // )
}

export default DetailedLots