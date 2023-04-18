import "./You.scss"

import { useSelector } from "react-redux"

function You() {
  const user = useSelector(state => state.user)
  if (!user.auth) {
    return null
  }
  return (
    <div className="you">
      <img src={user.avatar} alt="your avatar" className="you__avatar" />
      <div className="you__text">Вы</div>
    </div>
  )
}

export default You
