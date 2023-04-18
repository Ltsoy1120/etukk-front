import Icon from "app/components/UI/Icon/Icon"
import {
  deleteUserFavoriteLotByLotsId,
  deleteUserFavoriteUserByUserId,
  postUserFavoriteLot,
  postUserFavoriteUser,
} from "infrastructure/persistence/api/data/actions"
import {useState} from "react"
import {useClient} from "react-fetching-library"
import {classWithModifiers} from "utils/common"

interface BookmarkProps {
  id: `${number}` | number
  type: "lot" | "user"
  className: string
  defaultValue?: boolean
}

function Bookmark(props: BookmarkProps) {
  const client = useClient()
  const [bookmarked, setBookmarked] = useState(props.defaultValue)
  async function onClick() {
    setBookmarked(!bookmarked)

    const actionOn =
      props.type === "lot"
        ? postUserFavoriteLot({lot_id: Number(props.id)})
        : postUserFavoriteUser({fav_user_id: Number(props.id)})
    const actionOff =
      props.type === "lot"
        ? deleteUserFavoriteLotByLotsId(Number(props.id))
        : deleteUserFavoriteUserByUserId(Number(props.id))

    const {error} = await client.query(bookmarked ? actionOff : actionOn)
    if (error) setBookmarked(bookmarked)
  }

  if (bookmarked == null) return null
  return (
    <button
      className={classWithModifiers(props.className, bookmarked && "active")}
      onClick={onClick}>
      <Icon name="bookmark-3d" />
    </button>
  )
}

export default Bookmark
