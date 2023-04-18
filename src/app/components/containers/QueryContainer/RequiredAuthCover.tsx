// import "./RequiredAuthCover.scss"

import ButtonLink from "app/components/UI/Button/ButtonLink"
import ErrorCover from "app/components/UI/ErrorCover/ErrorCover"

function RequiredAuthCover() {
  return (
    <ErrorCover>
      <p>Пока ничего нет, пожалуйста, авторизуйтесь</p>
      <ButtonLink to="/login">Войти</ButtonLink>
    </ErrorCover>
  )
}

export default RequiredAuthCover
