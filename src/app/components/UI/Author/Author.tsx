import "./Author.scss"

import QueryContainer from "app/components/containers/QueryContainer/QueryContainer"
import {getUserByUserId} from "infrastructure/persistence/api/data/actions"
import {mapImageUrl} from "infrastructure/persistence/api/mappings/helpers"

export interface AuthorProps {
  buyerId?: number
  sellerId?: number
  avatar?: string
  firstName?: string
  city?: string
}

function Author(props: AuthorProps) {
  if (props.buyerId || props.sellerId) {
    return (
      <QueryContainer action={getUserByUserId(props.buyerId ?? props.sellerId)}>
        {user => (
          <div className="author">
            <img
              src={props.avatar ?? mapImageUrl(user?.user_pic?.filename)}
              alt="avatar"
              className="author__avatar"
            />
            <div className="author__info">
              <div className="author__name">
                {props.firstName ?? user?.fullname.split(" ")[0]}
              </div>
              <div className="author__city">{props.city}</div>
            </div>
          </div>
        )}
      </QueryContainer>
    )
  }

  return (
    <div className="author">
      <img src={props.avatar} alt="avatar" className="author__avatar" />
      <div className="author__info">
        <div className="author__name">{props.firstName}</div>
        <div className="author__city">{props.city}</div>
      </div>
    </div>
  )
}

export default Author
