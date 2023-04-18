import ButtonLink from "app/components/UI/Button/ButtonLink"
import Switcher from "app/components/UI/Switcher/Switcher"
import ProfileReviewsContainer from "areas/profile/containers/ProfileReviewsContainer"
import ProfileSalesContainer from "areas/profile/containers/ProfileSalesContainer"
import { Outlet, Route, Routes } from "react-router-dom"

import ProfileDisputeView from "../sales~purchases/dispute/ProfileDisputeView"
import ProfileSeeDisputeView from "../sales~purchases/see-dispute/ProfileSeeDisputeView"
import ProfileSalesCallACourierView from "./views/call-a-courier/ProfileSalesCallACourierView"

function ProfileSalesView() {
  return (
    <Routes>
      <Route element={(
        <>
          <Switcher>
            <ButtonLink to="" end>Статус продаж</ButtonLink>
            <ButtonLink to="reviews">Отзывы</ButtonLink>
          </Switcher>
          <Outlet />
        </>
      )}>
        <Route index element={<ProfileSalesContainer />} />
        <Route path="reviews" element={<ProfileReviewsContainer type="sales" />} />
      </Route>

      <Route path="call-a-courier/:lotId" element={<ProfileSalesCallACourierView />} />

      <Route path="dispute/:lotId" element={<ProfileDisputeView />} />
      <Route path="see-dispute/:lotId" element={<ProfileSeeDisputeView />} />
    </Routes>
  )
}

export default ProfileSalesView