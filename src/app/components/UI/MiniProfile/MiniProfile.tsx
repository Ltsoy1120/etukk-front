import "./MiniProfile.scss"

import {UserSigned} from "infrastructure/persistence/redux/reducers/user/types"
import {Link} from "react-router-dom"

function MiniProfile(props: {user: UserSigned}) {
  return (
    <div className="mini-profile">
      <div>
        <img
          src={props.user.avatar}
          alt="avatar"
          className="mini-profile__avatar"
        />
      </div>
      <div className="mini-profile__name">
        {props.user.fullName.slice(0, 10)}
      </div>
      <Link className="ghost" to="/profile" />
    </div>
  )
}

export default MiniProfile
