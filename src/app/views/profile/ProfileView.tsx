import "./ProfileView.scss"

import RequiredAuthCover from "app/components/containers/QueryContainer/RequiredAuthCover"
import ButtonLink from "app/components/UI/Button/ButtonLink"
import Buttons from "app/layouts/Buttons/Buttons"
import { Helmet } from "react-helmet"
import { useSelector } from "react-redux"
import { Navigate, Route, Routes } from "react-router"

import ProfileBidsView from "./views/bids/ProfileBidsView"
import ProfilePersonalView from "./views/personal/ProfilePersonalView"
import ProfilePurchasesView from "./views/purchases/ProfilePurchasesView"
import ProfileSalesView from "./views/sales/ProfileSalesView"

function ProfileView() {
  const user = useSelector(state => state.user)
  if (!user.auth) {
    return (
      <RequiredAuthCover />
    )
  }
  return (
    <div className="profile-view">
      <div className="profile-view__container">
        <Helmet>
          <title>Личный профиль | etukk.ru</title>
        </Helmet>
        <h2 className="heading">Личный профиль</h2>
        <Buttons>
          <ButtonLink small outline nav to="personal">Личная информация</ButtonLink>
          <ButtonLink small outline nav to="bids">Ставки</ButtonLink>
          <ButtonLink small outline nav to="sales">Продажи</ButtonLink>
          <ButtonLink small outline nav to="purchases">Покупки</ButtonLink>
        </Buttons>
        <Routes>
          <Route index element={<Navigate replace to="personal" />} />

          <Route path="personal/*" element={<ProfilePersonalView />} />
          <Route path="bids/*" element={<ProfileBidsView />} />

          <Route path="sales/*" element={<ProfileSalesView />} />
          <Route path="purchases/*" element={<ProfilePurchasesView />} />
        </Routes>
      </div>
    </div>
  )
}

export default ProfileView
