import "./SellerCompact.scss"

import StarRating from "app/components/UI/StarRating/StarRating"
import {ExtractActionPayload} from "infrastructure/persistence/api/client.types"
import {getUserByUserId} from "infrastructure/persistence/api/data/actions"
import {useSelector} from "react-redux"
import {Link} from "react-router-dom"

interface SellerCompactProps {
  user: ExtractActionPayload<ReturnType<typeof getUserByUserId>>
}

function SellerCompact(props: SellerCompactProps) {
  const user = useSelector(state => state.user)
  const [firstName, lastName] = (
    props.user?.fullname ?? "unknown unknownovich"
  ).split(" ")
  return (
    <div className="seller-compact">
      <div className="seller-compact__entries">
        <div className="seller-compact__name">
          {firstName !== "unknown" && firstName}
        </div>
        <div className="seller-compact__id">
          {props.user.organization ? "Организация" : "Частное лицо"}/ id
          {props.user.id !== -1 ? props.user.id : user.id}
        </div>
      </div>
      <div className="seller-compact__entries seller-compact__entries--right">
        {/* <div className="seller-compact__entry">
          <span>Отзывы</span>
          <CounterIcon icon="like" count={props.likes ?? 0} />
          <CounterIcon icon="dislike" count={props.dislikes ?? 0} />
        </div> */}
        <div className="seller-compact__entry">
          <span>Рейтинг</span>
          <StarRating size="small" readOnly min={props.user.seller_rating} />
        </div>
      </div>
      <Link className="ghost" to={"/user/" + props.user.id} />
    </div>
  )
}

export default SellerCompact
