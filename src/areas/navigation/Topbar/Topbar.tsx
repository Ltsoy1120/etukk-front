import "./Topbar.scss"

import QueryContainer from "app/components/containers/QueryContainer/QueryContainer"
import SidebarNavDrawer from "app/components/modals/SidebarNavDrawer/SidebarNavDrawer"
import Icon from "app/components/UI/Icon/Icon"
import {getCategory} from "infrastructure/persistence/api/data/actions"
import _ from "lodash"
import {Modal} from "react-modal-global"
import {NavLink} from "react-router-dom"
import {classWithModifiers} from "utils/common"

import TopbarActions from "./TopbarActions"

function Topbar() {
  return (
    <div className="topbar">
      <nav className="topbar-menu">
        <NavLink
          className={link =>
            classWithModifiers("topbar-menu__link", link.isActive && "active")
          }
          to="/">
          <img src="/static/images/logo.svg" alt="etukk logo" />
        </NavLink>
        <QueryContainer action={getCategory()}>
          {payload => (
            <>
              {_.shuffle(
                payload.filter(item => item.parent_category_id === null)
              )
                .slice(0, 3)
                .map(category => (
                  <NavLink
                    className={link =>
                      classWithModifiers(
                        "topbar-menu__link",
                        link.isActive && "active"
                      )
                    }
                    to={"/search/" + category.id}
                    key={category.id}>
                    <span>{category.name}</span>
                  </NavLink>
                ))}
            </>
          )}
        </QueryContainer>
        {/* <NavLink className={"topbar-menu__link"} to="/">
          <span>Еще</span>
        </NavLink> */}
      </nav>
      <TopbarActions />
      <button type="button" onClick={() => Modal.open(SidebarNavDrawer)}>
        <Icon className="topbar-menu__icon" name="menu" />
      </button>
    </div>
  )
}

export default Topbar
