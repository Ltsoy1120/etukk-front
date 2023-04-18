import "./SellerPreview.scss"

import Bookmark from "app/components/UI/Bookmark/Bookmark"
import CounterIcon from "app/components/UI/CounterIcon/CounterIcon"
import Entries from "app/layouts/Entries/Entries"
import EntryCounter from "app/layouts/Entries/EntryCounter"
import {Link} from "react-router-dom"
import {getRating} from "utils/business"

export interface SellerPreviewProps {
  id: number
  avatar: string
  fullName: string
  city: string
  sellerRating: number
  likes?: number
  dislikes?: number
  lotsCount?: number
  // linkedTo?: string
  bookmarked?: boolean
  created_at: string
}

function SellerPreview(props: SellerPreviewProps) {
  const isToday = new Date() === new Date(props.created_at)
  const isYesterday =
    new Date(new Date().setDate(new Date().getDate() - 1)) ===
    new Date(props.created_at)
  return (
    <div className="seller-preview">
      <div className="seller-preview-avatar">
        <img
          src={props.avatar}
          alt="avatar"
          className="seller-preview-avatar__image"
        />
      </div>
      <div className="seller-preview__details">
        <div className="seller-preview__name">{props.fullName}</div>
        <div className="seller-preview__city">
          зарегистрирован{" "}
          {isToday
            ? "сегодня"
            : isYesterday
            ? "вчера"
            : new Date(props.created_at).toLocaleDateString()}
        </div>
        <div className="seller-preview__entries">
          <Entries>
            <EntryCounter title="Рейтинг продавца">
              <CounterIcon icon="star" count={props.sellerRating} />
            </EntryCounter>
            <EntryCounter title="Отзывы">
              <CounterIcon icon="like" count={props.likes ?? 0} />
              <CounterIcon icon="dislike" count={props.dislikes ?? 0} />
            </EntryCounter>
            <EntryCounter title="Размещено лотов">
              <CounterIcon icon="hammer" count={props.lotsCount ?? 0} />
            </EntryCounter>
          </Entries>
        </div>
      </div>
      <Link className="ghost" to={"/user/" + props.id} />
      <Bookmark
        className="lot-preview__bookmark"
        type="lot"
        id={props.id}
        defaultValue={props.bookmarked}
      />
    </div>
  )
}

export default SellerPreview
