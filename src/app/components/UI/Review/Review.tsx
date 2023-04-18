import "./Review.scss"

import SliderPopup from "app/components/modals/SliderPopup/SliderPopup"
import {SchemaLotReviewPhotos} from "infrastructure/persistence/api/data/schemas"
import {mapImageUrl} from "infrastructure/persistence/api/mappings/helpers"
import {UserSigned} from "infrastructure/persistence/redux/reducers/user/types"
import {useEffect, useState} from "react"
import {Modal} from "react-modal-global"
import {Link} from "react-router-dom"

interface ReviewProps {
  user: Pick<UserSigned, "id" | "avatar" | "firstName">
  product?: string | null
  comment: string
  attachments?: SchemaLotReviewPhotos[]
  date: Date
}

function Review(props: ReviewProps) {
  const [photos, setPhotos] = useState<string[]>()
  const date = props.date.toLocaleDateString("ru")

  useEffect(() => {
    const lotReviewPhotos = [] as string[]
    props.attachments?.forEach(photo =>
      lotReviewPhotos.push(mapImageUrl(photo.filename))
    )
    setPhotos(lotReviewPhotos)
  }, [props.attachments])

  return (
    <div className="review">
      <div className="review__header">
        <div className="review-user">
          <img
            src={props.user.avatar}
            alt="avatar"
            className="review-user__avatar"
          />
          <div className="review-user__info">
            <div className="review-user__name">{props.user.firstName}</div>
            {props.product && (
              <div className="review__product">{props.product}</div>
            )}
          </div>
          <Link className="ghost" to={"/user/" + props.user.id} />
        </div>
        <time className="review__date">{date}</time>
      </div>
      <p className="review__text">{props.comment}</p>
      {photos && photos.length > 0 && (
        <div
          className="review__attachments"
          onClick={() => Modal.open(SliderPopup, {slides: photos})}>
          {photos?.map((photo, index) => (
            <img
              className="review__attachment"
              src={photo}
              alt="attachment"
              key={index}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Review
