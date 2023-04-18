import QueryContainer from "app/components/containers/QueryContainer/QueryContainer"
import Button from "app/components/UI/Button/Button"
import Details from "app/components/UI/Details/Details"
import SubjectLog from "app/layouts/SubjectLog/SubjectLog"
import SellerPreview from "areas/seller/SellerPreview/SellerPreview"
import { getUserNotificationsByNotificationsId } from "infrastructure/persistence/api/data/actions"
import { UserSigned } from "infrastructure/persistence/redux/reducers/user/types"
import { Link } from "react-router-dom"

interface LotSellerProps {
  id: number
  user: UserSigned
}

function LotSeller(props: LotSellerProps) {
  const subject = (
    <>
      <SellerPreview {...props.user} />
      <br />
      <Button>Отписаться</Button>
    </>
  )
  return (
    <QueryContainer action={getUserNotificationsByNotificationsId(props.id)}>
      {payload => (
        <SubjectLog subject={subject}>

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

export default LotSeller
