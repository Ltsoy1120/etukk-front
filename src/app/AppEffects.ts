/**
 * SCSS Preload to stop unexpected overwriting styles
 */
import "app/layouts/Modal/FullscreenLayout/FullscreenLayout.scss"

import {EventSourcePolyfill} from "event-source-polyfill"
import {eventUpdate} from "infrastructure/persistence/redux/reducers/event"
import {userFetch} from "infrastructure/persistence/redux/reducers/user"
// import { Modal } from "react-modal-global"
import {useEffect} from "react"
import {Modal} from "react-modal-global"
// import ReactGA from "react-ga4"
import {useDispatch} from "react-redux"
import {useSearchParams} from "react-router-dom"

import FullscreenPasswordRecovery from "./components/modals/auth/FullscreenPasswordRecovery"

function AppEffects() {
  const dispatch = useDispatch()
  useRoutedModalView()
  // const { inlineSize: bodySize } = useResizeObserverSize(document.body)
  // useEffect(() => {
  //   document.head.gete
  // }, [bodySize])

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token == null) return

    dispatch(userFetch({access_token: token}))
  }, [])

  useEffect(() => {
    subscribe()
  }, [])

  const subscribe = async () => {
    // const eventSource = new EventSource(
    //   process.env.REACT_APP_API_HOST + "/events"
    // )
    const eventSource = new EventSourcePolyfill(
      process.env.REACT_APP_API_HOST + "/events",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token") || "",
          // "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    )

    // eventSource.addEventListener("open", listener)
    eventSource.addEventListener("updated", listener)
    eventSource.addEventListener("personal", listener)
    // eventSource.addEventListener("error", listener)
  }

  const listener = function (event: any) {
    console.log("event.type", event.type)

    if (event.type === "updated" || event.type === "personal") {
      console.log("JSON.parse(event.data)", JSON.parse(event.data))

      dispatch(eventUpdate(JSON.parse(event.data)))
      // const newPrice = JSON.parse(event.data).data.now_price
      // setCurrentPrice(new Price(newPrice))
    }
    // if (type === "updated" || type === "personal") {
    //   eventSource.close()
    // }
  }
  return null
}

function useRoutedModalView() {
  const [searchParams] = useSearchParams()

  const modal = searchParams.get("modal")
  const recoveryToken = searchParams.get("recovery_token")

  useEffect(() => {
    switch (modal) {
      case "password_recovery":
        if (recoveryToken == null) break
        Modal.open(FullscreenPasswordRecovery, {recoveryToken})
        break

      default:
        break
    }
  }, [modal])
}

export default AppEffects

// if (process.env.REACT_APP_API_GA) {
//   ReactGA.initialize(process.env.REACT_APP_API_GA)
// } else {
//   const message = ".env variable `REACT_APP_API_GA` is empty, GA will not be initialized."
//   alert(message)
//   console.warn(message)
// }
