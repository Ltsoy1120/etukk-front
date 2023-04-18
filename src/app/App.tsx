import "app/assets/scss/base.scss"
import "react-modal-global/styles/modal.scss"

import MobileNavigator from "areas/navigation/MobileNavigator/MobileNavigator"
import ClientAPI from "infrastructure/persistence/api/client"
import store from "infrastructure/persistence/redux/store"
import {ReactNode, StrictMode, Suspense} from "react"
import {ClientContextProvider} from "react-fetching-library"
import {ModalContainer} from "react-modal-global"
import {Provider} from "react-redux"
import {BrowserRouter} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import {injectStyle} from "react-toastify/dist/inject-style"

import AppEffects from "./AppEffects"
import AppRouter from "./AppRouter"
import CookiesNotice from "./components/containers/CookiesNotice/CookiesNotice"
import ErrorBoundary from "./components/containers/ErrorBoundary/ErrorBoundary"
import {QueryErrorCoverBoundary} from "./components/containers/QueryErrorCoverBoundary/QueryErrorCoverBoundary"
import ErrorFallback from "./views/error/ErrorFallback"

injectStyle()

function App() {
  return (
    <StrictMode>
      <AppProviders>
        <Suspense fallback="Loading...">
          <ErrorBoundary fallback={ErrorFallback}>
            <QueryErrorCoverBoundary>
              <div className="wrapper">
                <AppRouter />
                <MobileNavigator />
              </div>
            </QueryErrorCoverBoundary>

            <CookiesNotice />
            <ModalContainer />
            <ToastContainer />

            <AppEffects />
          </ErrorBoundary>
        </Suspense>
      </AppProviders>
    </StrictMode>
  )
}

function AppProviders(props: {children: ReactNode}) {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ClientContextProvider client={ClientAPI}>
          {props.children}
        </ClientContextProvider>
      </Provider>
    </BrowserRouter>
  )
}

export default App
