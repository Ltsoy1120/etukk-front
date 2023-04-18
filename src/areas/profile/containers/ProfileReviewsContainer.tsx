import QueryContainer from "app/components/containers/QueryContainer/QueryContainer"
import Review from "app/components/UI/Review/Review"
import Reviews from "app/layouts/Reviews/Reviews"
import {
  getLotReview,
  getUserReview,
} from "infrastructure/persistence/api/data/actions"
import {mapUser} from "infrastructure/persistence/api/mappings/user"
import {useSelector} from "react-redux"

interface ProfileReviewsContainerProps {
  type: "sales" | "purchases"
  sellerId?: number
}

function ProfileReviewsContainer(props: ProfileReviewsContainerProps) {
  const user = useSelector(state => state.user)
  if (!user.auth) return null
  const action = getLotReview<{
    user_id?: number
    to_user_id?: number
  }>(
    props.type === "purchases"
      ? {user_id: user.id}
      : {to_user_id: props.sellerId ?? user.id}
  )
  console.log(new Date("2022-09-14T11:51:57.698Z").getTime())
  return (
    <QueryContainer action={action}>
      {payload => (
        <Reviews>
          {payload
            ?.sort(function (a, b) {
              return (
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
              )
            })
            .map(review => (
              <Review
                user={mapUser(review.user)}
                attachments={review.lotreviewphotos ?? []}
                comment={review.text ?? "..."}
                date={new Date(review.created_at)}
                product={review.to_lot?.name}
                key={review.id}
              />
            ))}
        </Reviews>
      )}
    </QueryContainer>
  )
}

export default ProfileReviewsContainer
