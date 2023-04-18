import ButtonLink from "app/components/UI/Button/ButtonLink"
import Switcher from "app/components/UI/Switcher/Switcher"
import ProfilePurchasesContainer from "areas/profile/containers/ProfilePurchasesContainer"
import { Outlet, Route, Routes } from "react-router-dom"

import ProfileDisputeView from "../sales~purchases/dispute/ProfileDisputeView"
import ProfileSeeDisputeView from "../sales~purchases/see-dispute/ProfileSeeDisputeView"
import ProfilePurchasesCheckoutView from "./views/checkout/ProfilePurchasesCheckoutView"
import ProfilePurchasesConfirmDeliveryView from "./views/confirm-delivery/ProfilePurchasesConfirmDeliveryView"

function ProfilePurchasesView() {
  return (
    <Routes>
      <Route element={(
        <>
          <Switcher>
            <ButtonLink to="" end>Статус покупок</ButtonLink>
            {/* <ButtonLink to="reviews">Отзывы</ButtonLink> */}
          </Switcher>
          <Outlet />
        </>
      )}>
        <Route index element={<ProfilePurchasesContainer />} />
        {/* <Route path="reviews" element={<ProfileReviewsContainer type="purchases" />} /> */}
      </Route>

      <Route path="checkout/:lotId" element={<ProfilePurchasesCheckoutView />} />
      <Route path="confirm-delivery/:lotId" element={<ProfilePurchasesConfirmDeliveryView />} />

      <Route path="dispute/:lotId" element={<ProfileDisputeView />} />
      <Route path="see-dispute/:lotId" element={<ProfileSeeDisputeView />} />
    </Routes>
  )
}

export default ProfilePurchasesView