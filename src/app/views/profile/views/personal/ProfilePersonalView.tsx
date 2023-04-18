import QueryContainer from "app/components/containers/QueryContainer/QueryContainer"
import Attention from "app/components/UI/Attention/Attention"
import Backward from "app/components/UI/Backward/Backward"
import CustomerRating from "app/components/UI/CustomerRating/CustomerRating"
import EditAvatar from "app/components/UI/EditAvatar/EditAvatar"
import Switcher from "app/components/UI/Switcher/Switcher"
import {IMAGE_MOCKS} from "constants/mocks"
import {getUser, patchUser} from "infrastructure/persistence/api/data/actions"
import {mapUser} from "infrastructure/persistence/api/mappings/user"
import {Mutation} from "react-fetching-library"
import {useSelector} from "react-redux"
import {Route, Routes} from "react-router"
import {NavLink} from "react-router-dom"
import {Link} from "react-router-dom"
import {FileToURLDataBase64} from "utils/file"

import ProfilePersonalExit from "./ProfilePersonalExit"
import ProfilePersonalMe from "./ProfilePersonalMe"
import ProfilePersonalPasswordChange from "./ProfilePersonalPasswordChange"
import ProfilePersonalServices from "./ProfilePersonalServices"
import ProfilePersonalSettings from "./ProfilePersonalSettings"

function ProfilePersonalView() {
  return (
    <div className="profile-view__personal">
      <div className="profile-view__container">
        <Switcher>
          <NavLink to="" end>
            Обо мне
          </NavLink>
          <Link to="password">Смена пароля</Link>
          <Link to="services">Сервисы и услуги</Link>
          <Link to="settings">Настройки</Link>
          <Link to="exit">Выход</Link>
        </Switcher>
        <GeneralInfo />
        <Routes>
          <Route index element={<ProfilePersonalMe />} />
          <Route path="password" element={<ProfilePersonalPasswordChange />} />
          <Route path="services" element={<ProfilePersonalServices />} />
          <Route path="settings" element={<ProfilePersonalSettings />} />
          <Route path="exit" element={<ProfilePersonalExit />} />
        </Routes>
      </div>
      <div className="profile-view__container">
        <Backward to="" />
        <div className="profile-view__cover" />
      </div>
    </div>
  )
}

function GeneralInfo() {
  const isAuth = useSelector(state => state.user.auth)

  if (isAuth) {
    return (
      <>
        <QueryContainer action={getUser()} mapping={mapUser}>
          {payload => (
            <div className="profile-view__general-info">
              <Mutation actionCreator={patchUser}>
                {({mutate}) => (
                  <EditAvatar
                    image={payload.avatar}
                    onChange={async file =>
                      mutate({user_pic: await FileToURLDataBase64(file)})
                    }
                  />
                )}
              </Mutation>
              <CustomerRating
                sellerRating={payload.sellerRating}
                buyerRating={payload.buyerRating}
              />
            </div>
          )}
        </QueryContainer>
      </>
    )
  }

  return (
    <>
      <div className="profile-view__general-info">
        <EditAvatar image={IMAGE_MOCKS[1]} onChange={console.log} />
        <CustomerRating sellerRating={5} buyerRating={5} />
      </div>
      <Attention>
        Уважаемый пользователь, на вас поступила жалоба. На следующие 3 покупки
        или продажи будет удерджана дополнительная комиссия в размере 10%
      </Attention>
    </>
  )
}

export default ProfilePersonalView
