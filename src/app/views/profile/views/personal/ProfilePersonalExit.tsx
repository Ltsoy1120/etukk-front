import Button from "app/components/UI/Button/Button"
import {userUpdate} from "infrastructure/persistence/redux/reducers/user"
import {useDispatch} from "react-redux"

function ProfilePersonalExit() {
  const dispatch = useDispatch()
  function logout() {
    localStorage.clear()
    dispatch(userUpdate({auth: false}))
  }
  return (
    <>
      <h5 className="heading">Выйти из профиля?</h5>
      <div>
        <Button onClick={logout}>Выйти</Button>
      </div>
    </>
  )
}

export default ProfilePersonalExit
