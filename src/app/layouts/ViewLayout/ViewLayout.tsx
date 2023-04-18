import "./ViewLayout.scss"

import { Outlet } from "react-router"

import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import Main from "../Main/Main"

function ViewLayout() {
  return (
    <>
      <Header />
      <Main>
        <div className="view-layout">
          <Outlet />
        </div>
      </Main>
      <Footer />
    </>
  )
}

export default ViewLayout
