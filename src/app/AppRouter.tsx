import LotNotification from "areas/lot/LotNotification"
import React, {lazy, Suspense} from "react"
import {Route, Routes} from "react-router"

import {ScrollToTop} from "./views/lot-new/edit/helpers"

const HomeView = lazy(() => import("./views/home"))
const ViewLayout = lazy(() => import("./layouts/ViewLayout/ViewLayout"))
const ContactsView = lazy(() => import("./views/contacts"))
const ErrorView = lazy(() => import("./views/error"))
const FavouritesView = lazy(() => import("./views/favourites"))
const LotView = lazy(() => import("./views/lot"))
const LotEditView = lazy(() => import("./views/lot/edit/LotEditView"))
const LotPreviewView = lazy(() => import("./views/lot/preview"))
const LotDraftView = lazy(() => import("./views/lot-new/edit"))
const NotificationsView = lazy(() => import("./views/notifications"))
const ProfileView = lazy(() => import("./views/profile/ProfileView"))
const SupportView = lazy(() => import("./views/support"))
const TermsView = lazy(() => import("./views/terms"))
const UserView = lazy(() => import("./views/user/UserView"))
const AboutView = lazy(() => import("./views/about/AboutView"))
const FullscreenSignIn = lazy(
  () => import("./components/containers/Auth/FullscreenSignIn")
)
const FullscreenSignUp = lazy(
  () => import("./components/containers/Auth/FullscreenSignUp")
)
const FullscreenSignUpEntity = lazy(
  () => import("./components/containers/Auth/FullscreenSignUpEntity")
)
const FullscreenSignUpPerson = lazy(
  () => import("./components/containers/Auth/FullscreenSignUpPerson")
)
const SiteRepair = lazy(
  () => import("./components/containers/SiteRepair/SiteRepair")
)

function AppRouter() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        <Route path="/">
          <Route path="*" element={<ErrorView />} />
          <Route path="login" element={<FullscreenSignIn />} />
          <Route path="register" element={<FullscreenSignUp />} />
          <Route path="registerPerson" element={<FullscreenSignUpPerson />} />
          <Route path="registerEntity" element={<FullscreenSignUpEntity />} />
          <Route path="repair" element={<SiteRepair />} />
          <Route element={<ViewLayout />}>
            <Route index element={<HomeView />} />
            <Route path="hot" element={<HomeView />} />
            <Route path="search/:categoryId/*" element={<HomeView />} />
            <Route path="lots/:lotId" element={<LotView />} />
            <Route path="lots/:lotId/edit" element={<LotEditView />} />
            <Route path="lots/:lotId/preview" element={<LotPreviewView />} />
            <Route
              path="lots/:lotId/notifications"
              element={<LotNotification />}
            />
            <Route path="lots/draft/*" element={<LotDraftView />} />

            <Route path="favourites/*" element={<FavouritesView />} />
            <Route path="notifications/*" element={<NotificationsView />} />
            <Route path="support/*" element={<SupportView />} />
            <Route path="profile/*" element={<ProfileView />} />
            <Route path="user/:userId/*" element={<UserView />} />

            <Route path="terms/*" element={<TermsView />} />
            <Route path="contacts/*" element={<ContactsView />} />
            <Route path="about" element={<AboutView />} />
          </Route>
        </Route>
      </Routes>
      <ScrollToTop />
    </Suspense>
  )
}

export default AppRouter
